# Stripe Payment Implementation for KoolEvents.app

**Status:** ✅ Complete  
**Date:** 2026-05-06  
**Files Created/Modified:** 5

---

## 📋 What Was Built

### 1. **Environment Configuration** (`.env.local`)
Added Stripe API keys and price ID placeholders:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key (public-safe)
- `STRIPE_SECRET_KEY` — Stripe secret key (keep private)
- `STRIPE_WEBHOOK_SECRET` — Webhook signature verification
- `STRIPE_PRO_MONTHLY_PRICE_ID` — Pro plan monthly subscription
- `STRIPE_PRO_ANNUAL_PRICE_ID` — Pro plan annual subscription
- `STRIPE_UNLIMITED_MONTHLY_PRICE_ID` — Unlimited plan monthly subscription
- `STRIPE_UNLIMITED_ANNUAL_PRICE_ID` — Unlimited plan annual subscription

### 2. **Checkout Route** (`/app/api/stripe/create-checkout/route.ts`)
**POST** endpoint that:
- Accepts `{ plan, billing, userId, email }` in request body
- Validates plan (`pro`, `unlimited`) and billing period (`monthly`, `annual`)
- Looks up the correct Stripe price ID from environment variables
- Creates a Stripe Checkout Session with:
  - Subscription mode
  - Customer email pre-filled
  - Metadata for tracking (userId, plan)
  - Success redirect → `/dashboard?upgraded=true`
  - Cancel redirect → `/pricing`
- Returns `{ url: checkoutSessionUrl }` or error

### 3. **Webhook Handler** (`/app/api/stripe/webhook/route.ts`)
**POST** endpoint that:
- Verifies Stripe webhook signature using `STRIPE_WEBHOOK_SECRET`
- Handles **`checkout.session.completed`** event:
  - Extracts `userId` and `plan` from session metadata
  - Updates user profile in Supabase (`plan` field)
  - Stores Stripe customer ID for future reference
  - Sends welcome email via `/api/email/welcome` with plan info
- Handles **`customer.subscription.deleted`** event:
  - Finds user by Stripe customer ID
  - Downgrades user back to `starter` plan
- Uses `export const dynamic = "force-dynamic"` to ensure raw body parsing
- Always returns `{ received: true }` with HTTP 200 to acknowledge events

### 4. **Signup Page Fix** (`/app/(auth)/signup/page.tsx`)
Updated the paid plan redirect:
- **Old:** GET request to `/api/stripe/checkout?plan=...` (endpoint didn't exist)
- **New:** POST request to `/api/stripe/create-checkout` with full payload
- Awaits the response and redirects to the returned Stripe URL
- Gracefully handles errors if checkout creation fails

### 5. **Database Migration** (`/supabase/migrations/007_stripe_plan_values.sql`)
Updates the `profiles` table:
- **Old check constraint:** `plan in ('free', 'premium')`
- **New check constraint:** `plan in ('starter', 'pro', 'unlimited')`
- Migrates existing data:
  - `'free'` → `'starter'`
  - `'premium'` → `'pro'`

---

## 🛒 Stripe Setup (Paula's Checklist)

### Step 1: Create Products in Stripe Dashboard

**Pro Plan:**
1. Go to **Stripe Dashboard** → **Products**
2. Click **+ Add product**
3. Create **"Pro Plan"**
   - Billing: Recurring
   - Pricing model: Standard
   - **Monthly:** Name "Pro Monthly" — Set price (e.g., $29/month)
   - **Annual:** Name "Pro Annual" — Set price (e.g., $290/year = ~$24/month)
4. Copy the price IDs and set in `.env.local`:
   - `STRIPE_PRO_MONTHLY_PRICE_ID=price_xxxxx` (from monthly)
   - `STRIPE_PRO_ANNUAL_PRICE_ID=price_xxxxx` (from annual)

**Unlimited Plan:**
1. Create **"Unlimited Plan"** (same process)
   - **Monthly:** Name "Unlimited Monthly" — Set price (e.g., $79/month)
   - **Annual:** Name "Unlimited Annual" — Set price (e.g., $790/year = ~$66/month)
2. Copy price IDs:
   - `STRIPE_UNLIMITED_MONTHLY_PRICE_ID=price_xxxxx`
   - `STRIPE_UNLIMITED_ANNUAL_PRICE_ID=price_xxxxx`

### Step 2: Get API Keys

1. **Stripe Dashboard** → **Developers** → **API keys**
2. Under **Standard keys** (or **Live keys** if in production):
   - Copy **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx`
   - Copy **Secret key** → `STRIPE_SECRET_KEY=sk_live_xxxxx`

### Step 3: Create Webhook Endpoint

1. **Stripe Dashboard** → **Developers** → **Webhooks**
2. Click **+ Add endpoint**
3. **Endpoint URL:** `https://koolevents.app/api/stripe/webhook`
4. **Events to send:**
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.deleted`
5. Click **Add endpoint**
6. Find the endpoint and click to view details
7. Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET=whsec_xxxxx`

### Step 4: Update `.env.local`

Replace all `REPLACE_ME` values with the keys from Stripe:

```env
# From Developers → API Keys (Standard/Live)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx

# From Developers → Webhooks → your endpoint
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# From Products → Pro Plan
STRIPE_PRO_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_PRO_ANNUAL_PRICE_ID=price_xxxxx

# From Products → Unlimited Plan
STRIPE_UNLIMITED_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_UNLIMITED_ANNUAL_PRICE_ID=price_xxxxx
```

---

## 🚀 Deployment Checklist

### Before Going Live:

- [ ] All Stripe keys added to `.env.local`
- [ ] All price IDs created in Stripe and added to `.env.local`
- [ ] Webhook URL registered in Stripe Dashboard
- [ ] Test mode keys used first (pk_test_*, sk_test_*) — do a test purchase
- [ ] Switch to live keys (pk_live_*, sk_live_*) when ready
- [ ] Run migration: `supabase migration up` (or via Supabase Studio)
- [ ] Deploy to Vercel

### Testing Before Live:

1. **Create a test checkout:**
   - Sign up with a test email and select "Pro" plan
   - Should redirect to Stripe Checkout
   - Use Stripe test card: `4242 4242 4242 4242` (exp: any future date, CVC: any 3 digits)
   - Complete payment
   - Webhook should fire and user plan should update to `pro` in Supabase
   - Welcome email should send

2. **Test subscription cancellation:**
   - In Stripe Dashboard, find the test customer
   - Cancel their subscription
   - Webhook should fire and user plan should revert to `starter`

3. **Verify email delivery:**
   - Check that welcome emails are being sent to correct addresses
   - Verify Resend API is working (check Resend dashboard for delivery logs)

---

## 📝 Notes

- **Annual billing:** Pricing form on `/pricing` page needs to be updated to accept `billing: 'monthly' | 'annual'` parameter. Currently hardcoded to `monthly` in signup.
- **Stripe Test Mode:** Start with test keys (`pk_test_*`, `sk_test_*`) before switching to live (`pk_live_*`, `sk_live_*`)
- **Webhook Timeout:** Stripe webhooks need to respond with 2xx within 30 seconds. Current implementation is optimized for speed.
- **Email Sending:** Uses existing Resend API. Make sure `RESEND_API_KEY` is valid and account is verified.
- **Customer Portal:** Consider adding Stripe Customer Portal link in dashboard for users to manage subscriptions (docs: https://stripe.com/docs/billing/customer-portal)

---

## ✅ Implementation Complete

All routes are in TypeScript, follow existing code style, and integrate seamlessly with the existing Supabase + Resend setup.

**Next steps:** 
1. Get live Stripe API keys from Paula
2. Create the four price IDs in Stripe
3. Register webhook endpoint
4. Update `.env.local`
5. Deploy and test

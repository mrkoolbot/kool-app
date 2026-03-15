# KOOL — event planning by paula mescolin
### the koolture group

The first event planning platform built by a six sigma-certified brand strategist and 8-year event production founder.

**Website:** kool.events (pending) | Built for: [thekoolturegroup.com](https://thekoolturegroup.com)

---

## stack

- **Frontend:** Next.js 14 App Router + TypeScript + Tailwind CSS
- **Database + Auth:** Supabase
- **Payments:** Stripe
- **Email:** Resend
- **UI Components:** shadcn/ui

## setup

### 1. install dependencies
```bash
npm install
```

### 2. configure environment variables
```bash
cp .env.local.example .env.local
# fill in your Supabase, Stripe, and Resend credentials
```

### 3. set up supabase database
- create a project at supabase.com
- copy your project URL and anon key to .env.local
- run the migration: paste contents of `supabase/migrations/001_initial.sql` in the Supabase SQL editor

### 4. run locally
```bash
npm run dev
```

open [http://localhost:3000](http://localhost:3000)

---

## features (MVP)

- ✅ landing page with TKG FOMO pipeline
- ✅ pricing page (free vs premium)
- ✅ signup + login (Supabase auth)
- ✅ dashboard with event list
- ✅ new event creation (auto-populates smart checklist)
- ✅ guest management + RSVP (free: 25 guests, premium: unlimited)
- ✅ public RSVP page (shareable link)
- ✅ smart checklist (pre-built by event type)
- ✅ event detail page with navigation
- ✅ budget tracker
- ✅ vendor management
- ✅ timeline builder
- ✅ database schema with RLS (Supabase)

## deploy to vercel

1. push to github (already done at github.com/mrkoolbot/kool-app)
2. connect repo to vercel.com
3. add all environment variables in Vercel dashboard
4. deploy

---

## business model

| tier | price | features |
|---|---|---|
| free | $0 | 1 event, 25 guests, basic tools |
| premium monthly | $15/month | unlimited everything |
| premium annual | $99/year | unlimited + 45% savings |

## the tkG fomo pipeline

every page includes a "hire the koolture group" CTA designed to convert app users into TKG clients.

---

*built by mr. kool · the koolture group · march 2026*

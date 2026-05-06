import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-02-25.clover",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plan, billing, userId, email } = body;

    if (!plan || !billing || !userId || !email) {
      return NextResponse.json(
        { error: "missing required fields: plan, billing, userId, email" },
        { status: 400 }
      );
    }

    if (!["pro", "unlimited"].includes(plan)) {
      return NextResponse.json(
        { error: "invalid plan" },
        { status: 400 }
      );
    }

    if (!["monthly", "annual"].includes(billing)) {
      return NextResponse.json(
        { error: "invalid billing period" },
        { status: 400 }
      );
    }

    const priceIdKey =
      plan === "pro"
        ? billing === "monthly"
          ? "STRIPE_PRO_MONTHLY_PRICE_ID"
          : "STRIPE_PRO_ANNUAL_PRICE_ID"
        : billing === "monthly"
        ? "STRIPE_UNLIMITED_MONTHLY_PRICE_ID"
        : "STRIPE_UNLIMITED_ANNUAL_PRICE_ID";

    const priceId = process.env[priceIdKey];

    if (!priceId || priceId.includes("REPLACE_ME")) {
      return NextResponse.json(
        { error: "stripe pricing not configured" },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        plan,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("stripe checkout error:", error);
    return NextResponse.json(
      { error: "failed to create checkout session" },
      { status: 500 }
    );
  }
}

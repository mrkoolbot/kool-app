import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20",
});

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error) {
    console.error("webhook signature verification failed:", error);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;
      const customerEmail = session.customer_email;

      if (!userId || !plan) {
        console.error("missing userId or plan in metadata");
        return NextResponse.json({ received: true });
      }

      // update user plan in supabase
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ plan, stripe_customer_id: session.customer })
        .eq("id", userId);

      if (updateError) {
        console.error("supabase update error:", updateError);
      } else {
        console.log(`user ${userId} upgraded to ${plan}`);
      }

      // send welcome email
      if (customerEmail) {
        try {
          await fetch(new URL("/api/email/welcome", process.env.NEXT_PUBLIC_APP_URL), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: customerEmail, plan }),
          });
        } catch (emailError) {
          console.error("welcome email error:", emailError);
        }
      }
    } else if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      // find user by stripe_customer_id and downgrade to starter
      const { data: profiles, error: fetchError } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single();

      if (fetchError || !profiles) {
        console.error("failed to find user by customer id:", fetchError);
        return NextResponse.json({ received: true });
      }

      const { error: downgradeError } = await supabase
        .from("profiles")
        .update({ plan: "starter" })
        .eq("id", profiles.id);

      if (downgradeError) {
        console.error("supabase downgrade error:", downgradeError);
      } else {
        console.log(`user ${profiles.id} downgraded to starter`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("webhook processing error:", error);
    return NextResponse.json({ received: true }); // always return 200 to acknowledge
  }
}

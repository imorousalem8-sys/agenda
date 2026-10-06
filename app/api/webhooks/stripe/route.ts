import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // In dev or if webhook secret is not set yet, parse the JSON payload
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err: any) {
    console.error("⚠️ Stripe Webhook signature verification failed:", err?.message);
    return NextResponse.json({ error: `Webhook Error: ${err?.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id || session.metadata?.userId;
        const userEmail = session.customer_email || session.customer_details?.email;

        console.log("💳 Checkout completed for user:", userId, userEmail);

        if (userId) {
          const subscriptionEndsAt = new Date(Date.now() + 32 * 24 * 60 * 60 * 1000);
          await prisma.user.update({
            where: { id: userId },
            data: {
              plan: "PRO",
              subscriptionStatus: "ACTIVE",
              subscriptionEndsAt,
            },
          });
        } else if (userEmail) {
          const subscriptionEndsAt = new Date(Date.now() + 32 * 24 * 60 * 60 * 1000);
          await prisma.user.updateMany({
            where: { email: userEmail },
            data: {
              plan: "PRO",
              subscriptionStatus: "ACTIVE",
              subscriptionEndsAt,
            },
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerEmail = invoice.customer_email;
        if (customerEmail) {
          const subscriptionEndsAt = new Date(Date.now() + 32 * 24 * 60 * 60 * 1000);
          await prisma.user.updateMany({
            where: { email: customerEmail },
            data: {
              plan: "PRO",
              subscriptionStatus: "ACTIVE",
              subscriptionEndsAt,
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;
        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              plan: "FREE",
              subscriptionStatus: "EXPIRED",
            },
          });
        }
        break;
      }

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Error processing Stripe webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe, STRIPE_CONFIG } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

function getBaseUrl(req: NextRequest): string {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "https";
  if (host && !host.includes("localhost")) {
    return `${proto}://${host}`;
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://agenda-gamma-orpin.vercel.app";
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: "Veuillez vous connecter pour vous abonner" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    const baseUrl = getBaseUrl(req);
    const body = await req.json().catch(() => ({}));
    const returnUrl = body.returnUrl || "/calendar";

    // Create a Stripe Checkout Session for subscription
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
        userEmail: user.email,
      },
      line_items: [
        {
          price: STRIPE_CONFIG.priceIdPro,
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
          userId: user.id,
        },
      },
      success_url: `${baseUrl}${returnUrl}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}${returnUrl}?payment=cancelled`,
      locale: "fr",
      allow_promotion_codes: true,
      billing_address_collection: "auto",
    });

    return NextResponse.json({
      success: true,
      url: checkoutSession.url,
      sessionId: checkoutSession.id,
    });
  } catch (error: any) {
    console.error("Stripe Checkout Session Error:", error);
    return NextResponse.json(
      { error: error?.message || "Erreur lors de l'initialisation du paiement Stripe" },
      { status: 500 }
    );
  }
}

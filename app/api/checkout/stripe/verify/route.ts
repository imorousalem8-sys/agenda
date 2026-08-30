import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { getUserSubscriptionDetails } from "@/lib/subscription";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID manquant" }, { status: 400 });
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (checkoutSession.payment_status === "paid" || checkoutSession.status === "complete") {
      const subscriptionEndsAt = new Date(Date.now() + 32 * 24 * 60 * 60 * 1000);

      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          plan: "PRO",
          subscriptionStatus: "ACTIVE",
          subscriptionEndsAt,
        },
      });

      const updated = await getUserSubscriptionDetails(session.user.id);

      return NextResponse.json({
        success: true,
        message: "Félicitations ! Votre abonnement AlarmAgenda Pro est actif.",
        subscription: updated,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Le paiement est en cours de traitement.",
    });
  } catch (error: any) {
    console.error("Error verifying Stripe session:", error);
    return NextResponse.json(
      { error: error?.message || "Erreur de vérification du paiement" },
      { status: 500 }
    );
  }
}

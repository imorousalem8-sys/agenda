import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserSubscriptionDetails } from "@/lib/subscription";

// GET: Get current user's subscription details & feature access
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const details = await getUserSubscriptionDetails(session.user.id);
    return NextResponse.json(details);
  } catch (error) {
    console.error("Subscription GET error:", error);
    return NextResponse.json({ error: "Erreur lors de la récupération de l'abonnement" }, { status: 500 });
  }
}

// POST: Upgrade / Activate Pro subscription or start 7-day trial
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action || "ACTIVATE_PRO"; // ACTIVATE_PRO | START_TRIAL | CANCEL

    const now = new Date();

    if (action === "ACTIVATE_PRO") {
      // 1 month duration by default
      const subscriptionEndsAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

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
        message: "Félicitations ! Votre abonnement Pro (9,99 €/mois) est maintenant actif.",
        subscription: updated,
      });
    }

    if (action === "START_TRIAL") {
      const trialEndsAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          plan: "PRO",
          subscriptionStatus: "TRIAL",
          trialEndsAt,
        },
      });

      const updated = await getUserSubscriptionDetails(session.user.id);
      return NextResponse.json({
        success: true,
        message: "Votre période d'essai Pro de 7 jours est activée !",
        subscription: updated,
      });
    }

    if (action === "CANCEL") {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          plan: "FREE",
          subscriptionStatus: "INACTIVE",
        },
      });

      const updated = await getUserSubscriptionDetails(session.user.id);
      return NextResponse.json({
        success: true,
        message: "Abonnement réinitialisé sur la formule Gratuite.",
        subscription: updated,
      });
    }

    return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
  } catch (error) {
    console.error("Subscription POST error:", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour de l'abonnement" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/notifications/subscribe — Save push subscription
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { endpoint, keys } = await req.json();

    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return NextResponse.json({ error: "Subscription invalide" }, { status: 400 });
    }

    await prisma.pushSubscription.upsert({
      where: { endpoint },
      create: {
        userId: session.user.id,
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
      update: {
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Erreur d'abonnement" }, { status: 500 });
  }
}

// DELETE /api/notifications/subscribe — Remove push subscription
export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { endpoint } = await req.json();
    await prisma.pushSubscription.deleteMany({
      where: { endpoint, userId: session.user.id },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

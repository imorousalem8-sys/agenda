import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/lib/validations";
import { addDays, subDays, parseISO } from "date-fns";
import { getUserSubscriptionDetails } from "@/lib/subscription";

// GET /api/events — list all events for the logged-in user
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const events = await prisma.event.findMany({
    where: {
      userId: session.user.id,
      ...(from && to
        ? {
            startAt: {
              gte: new Date(from),
              lte: new Date(to),
            },
          }
        : {}),
    },
    include: {
      reminders: true,
      contact: true,
    },
    orderBy: { startAt: "asc" },
  });

  return NextResponse.json({ events });
}

// POST /api/events — create a new event
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const subDetails = await getUserSubscriptionDetails(session.user.id);
    if (!subDetails.isPro) {
      const currentCount = await prisma.event.count({
        where: { userId: session.user.id },
      });

      if (currentCount >= subDetails.features.maxActiveEvents) {
        return NextResponse.json(
          {
            error: `⚡ Limite du plan Gratuit atteinte (${subDetails.features.maxActiveEvents} rendez-vous max). Passez à l'offre Pro pour des événements et alarmes en illimité !`,
            limitReached: true,
          },
          { status: 403 }
        );
      }
    }

    const body = await req.json();
    const data = eventSchema.parse(body);

    let startAt: Date;
    try {
      const parsed = parseISO(data.startAt);
      startAt = !isNaN(parsed.getTime()) ? parsed : new Date(data.startAt);
    } catch {
      startAt = new Date(data.startAt);
    }
    if (isNaN(startAt.getTime())) {
      startAt = new Date();
    }

    let endAt: Date | undefined = undefined;
    if (data.endAt && typeof data.endAt === "string" && data.endAt.trim()) {
      try {
        const parsedEnd = parseISO(data.endAt.trim());
        endAt = !isNaN(parsedEnd.getTime()) ? parsedEnd : new Date(data.endAt.trim());
      } catch {
        endAt = undefined;
      }
    }

    const event = await prisma.event.create({
      data: {
        userId: session.user.id,
        title: data.title,
        description: data.description || null,
        notes: data.notes || null,
        startAt,
        endAt,
        location: data.location || null,
        category: data.category || "OTHER",
        priority: data.priority || "NORMAL",
        mode: data.mode || "PERSONAL",
        contactId: data.contactId || null,
      },
    });

    // Create reminders
    const remindersToCreate: {
      userId: string;
      eventId: string;
      title: string;
      body: string;
      fireAt: Date;
      method: string;
      isVeille: boolean;
    }[] = [];

    // Reminder la veille (J-1 à la même heure)
    if (data.hasVeilleReminder) {
      const veilleDate = subDays(startAt, 1);
      if (veilleDate > new Date()) {
        remindersToCreate.push({
          userId: session.user.id,
          eventId: event.id,
          title: `Rappel veille : ${event.title}`,
          body: `Votre rendez-vous « ${event.title} » est prévu demain.${event.location ? ` Lieu : ${event.location}.` : ""}`,
          fireAt: veilleDate,
          method: "NOTIFICATION",
          isVeille: true,
        });
      }
    }

    // Reminder X minutes avant
    const minutesBefore = data.reminderMinutesBefore ?? 15;
    if (minutesBefore > 0) {
      const reminderDate = new Date(startAt.getTime() - minutesBefore * 60 * 1000);
      if (reminderDate > new Date()) {
        const timeStr = startAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
        remindersToCreate.push({
          userId: session.user.id,
          eventId: event.id,
          title: `Rappel : ${event.title}`,
          body: `Votre rendez-vous « ${event.title} » commence à ${timeStr}.${event.location ? ` Lieu : ${event.location}.` : ""}`,
          fireAt: reminderDate,
          method: "VOICE", // Default to voice call for maximum anti-forget guarantee
          isVeille: false,
        });
      }
    }

    if (remindersToCreate.length > 0) {
      await prisma.reminder.createMany({ data: remindersToCreate });
    }

    const fullEvent = await prisma.event.findUnique({
      where: { id: event.id },
      include: { reminders: true, contact: true },
    });

    return NextResponse.json({ event: fullEvent }, { status: 201 });
  } catch (error: any) {
    console.error("Create event error:", error);
    const message = error?.errors?.[0]?.message || error?.message || "Erreur lors de la création de l'événement";
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}

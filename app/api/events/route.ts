import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/lib/validations";
import { addDays, subDays, parseISO } from "date-fns";

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

import { getUserSubscriptionDetails } from "@/lib/subscription";

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

    const startAt = parseISO(data.startAt);
    const parsedEnd = data.endAt && data.endAt.trim() ? parseISO(data.endAt.trim()) : null;
    const endAt = parsedEnd && !isNaN(parsedEnd.getTime()) ? parsedEnd : undefined;

    const event = await prisma.event.create({
      data: {
        userId: session.user.id,
        title: data.title,
        description: data.description,
        notes: data.notes,
        startAt,
        endAt,
        location: data.location,
        category: data.category,
        priority: data.priority,
        mode: data.mode,
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
      remindersToCreate.push({
        userId: session.user.id,
        eventId: event.id,
        title: `Rappel demain : ${data.title}`,
        body: data.description || "",
        fireAt: veilleDate,
        method: "NOTIFICATION",
        isVeille: true,
      });
    }

    // Custom reminder X minutes before
    if (data.reminderMinutesBefore && data.reminderMinutesBefore > 0) {
      const reminderDate = new Date(
        startAt.getTime() - data.reminderMinutesBefore * 60 * 1000
      );
      remindersToCreate.push({
        userId: session.user.id,
        eventId: event.id,
        title: data.title,
        body: data.description || "",
        fireAt: reminderDate,
        method: "ALARM",
        isVeille: false,
      });
    }

    if (remindersToCreate.length > 0) {
      await prisma.reminder.createMany({ data: remindersToCreate });
    }

    const fullEvent = await prisma.event.findUnique({
      where: { id: event.id },
      include: { reminders: true, contact: true },
    });

    return NextResponse.json({ event: fullEvent }, { status: 201 });
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'événement" },
      { status: 500 }
    );
  }
}

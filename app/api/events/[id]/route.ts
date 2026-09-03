import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/lib/validations";
import { parseISO, subDays } from "date-fns";

type Params = { params: Promise<{ id: string }> };

// GET /api/events/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
  const { id } = await params;

  const event = await prisma.event.findFirst({
    where: { id, userId: session.user.id },
    include: { reminders: true, contact: true },
  });

  if (!event) {
    return NextResponse.json({ error: "Événement introuvable" }, { status: 404 });
  }

  return NextResponse.json({ event });
}

// PUT /api/events/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
  const { id } = await params;

  const existing = await prisma.event.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Événement introuvable" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const data = eventSchema.parse(body);
    const startAt = parseISO(data.startAt);
    const parsedEnd = data.endAt && data.endAt.trim() ? parseISO(data.endAt.trim()) : null;
    const endAt = parsedEnd && !isNaN(parsedEnd.getTime()) ? parsedEnd : undefined;

    // Delete old reminders and recreate
    await prisma.reminder.deleteMany({ where: { eventId: id } });

    const event = await prisma.event.update({
      where: { id },
      data: {
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

    // Recreate reminders
    const remindersToCreate: {
      userId: string;
      eventId: string;
      title: string;
      body: string;
      fireAt: Date;
      method: string;
      isVeille: boolean;
    }[] = [];

    if (data.hasVeilleReminder) {
      remindersToCreate.push({
        userId: session.user.id,
        eventId: event.id,
        title: `Rappel demain : ${data.title}`,
        body: data.description || "",
        fireAt: subDays(startAt, 1),
        method: "NOTIFICATION",
        isVeille: true,
      });
    }

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

    return NextResponse.json({ event: fullEvent });
  } catch (error) {
    console.error("Update event error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
  const { id } = await params;

  const existing = await prisma.event.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Événement introuvable" }, { status: 404 });
  }

  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

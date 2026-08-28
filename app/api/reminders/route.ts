import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { reminderSchema } from "@/lib/validations";
import { parseISO } from "date-fns";

// GET /api/reminders
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "PENDING";
  const upcoming = searchParams.get("upcoming") === "true";

  const reminders = await prisma.reminder.findMany({
    where: {
      userId: session.user.id,
      ...(status !== "ALL" ? { status } : {}),
      ...(upcoming ? { fireAt: { gte: new Date() } } : {}),
    },
    include: { event: true, task: true },
    orderBy: { fireAt: "asc" },
  });

  return NextResponse.json({ reminders });
}

// POST /api/reminders
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = reminderSchema.parse(body);

    const reminder = await prisma.reminder.create({
      data: {
        userId: session.user.id,
        title: data.title,
        body: data.body,
        fireAt: parseISO(data.fireAt),
        method: data.method,
        eventId: data.eventId || null,
        taskId: data.taskId || null,
      },
    });

    return NextResponse.json({ reminder }, { status: 201 });
  } catch (error) {
    console.error("Create reminder error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du rappel" },
      { status: 500 }
    );
  }
}

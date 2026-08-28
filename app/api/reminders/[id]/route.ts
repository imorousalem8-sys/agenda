import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { reminderSchema } from "@/lib/validations";
import { parseISO } from "date-fns";

type Params = { params: Promise<{ id: string }> };

// GET /api/reminders/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  const { id } = await params;

  const reminder = await prisma.reminder.findFirst({
    where: { id, userId: session.user.id },
    include: { event: true, task: true },
  });

  if (!reminder) return NextResponse.json({ error: "Rappel introuvable" }, { status: 404 });
  return NextResponse.json({ reminder });
}

// PUT /api/reminders/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  const { id } = await params;

  const existing = await prisma.reminder.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) return NextResponse.json({ error: "Rappel introuvable" }, { status: 404 });

  try {
    const body = await req.json();
    const data = reminderSchema.parse(body);

    const reminder = await prisma.reminder.update({
      where: { id },
      data: {
        title: data.title,
        body: data.body,
        fireAt: parseISO(data.fireAt),
        method: data.method,
        status: "PENDING",
      },
    });

    return NextResponse.json({ reminder });
  } catch (error) {
    console.error("Update reminder error:", error);
    return NextResponse.json({ error: "Erreur de mise à jour" }, { status: 500 });
  }
}

// DELETE /api/reminders/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  const { id } = await params;

  const existing = await prisma.reminder.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) return NextResponse.json({ error: "Rappel introuvable" }, { status: 404 });

  await prisma.reminder.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

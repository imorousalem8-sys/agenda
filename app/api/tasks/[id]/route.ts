import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validations";
import { parseISO } from "date-fns";

type Params = { params: Promise<{ id: string }> };

// PUT /api/tasks/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
  const { id } = await params;

  const existing = await prisma.task.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Tâche introuvable" }, { status: 404 });
  }

  const body = await req.json();

  // Toggle done
  if ("isDone" in body) {
    const task = await prisma.task.update({
      where: { id },
      data: { isDone: body.isDone },
    });
    if (body.isDone) {
      // Dismiss any pending reminders for this task
      await prisma.reminder.updateMany({
        where: { taskId: id, status: "PENDING" },
        data: { status: "DISMISSED" },
      });
    }
    return NextResponse.json({ task });
  }

  // Full update
  try {
    const data = taskSchema.parse(body);
    const dueAtDate = data.dueAt ? parseISO(data.dueAt) : null;

    const task = await prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        notes: data.notes,
        dueAt: dueAtDate,
        priority: data.priority,
        mode: data.mode,
        items: data.items ? JSON.stringify(data.items) : null,
      },
    });

    // Sync reminder
    if (dueAtDate) {
      const existingReminder = await prisma.reminder.findFirst({
        where: { taskId: id },
      });
      if (existingReminder) {
        await prisma.reminder.update({
          where: { id: existingReminder.id },
          data: {
            title: task.title,
            body: task.notes ? `Note: ${task.notes}` : "Échéance de votre tâche",
            fireAt: dueAtDate,
            status: "PENDING",
            method: "VOICE",
          },
        });
      } else {
        await prisma.reminder.create({
          data: {
            userId: session.user.id,
            taskId: task.id,
            title: task.title,
            body: task.notes ? `Note: ${task.notes}` : "Échéance de votre tâche",
            fireAt: dueAtDate,
            method: "VOICE",
            status: "PENDING",
          },
        });
      }
    } else {
      // Delete reminders if due date was removed
      await prisma.reminder.deleteMany({
        where: { taskId: id },
      });
    }

    return NextResponse.json({ task });
  } catch (error) {
    console.error("Update task error:", error);
    return NextResponse.json({ error: "Erreur de mise à jour" }, { status: 500 });
  }
}

// DELETE /api/tasks/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
  const { id } = await params;

  const existing = await prisma.task.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Tâche introuvable" }, { status: 404 });
  }

  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

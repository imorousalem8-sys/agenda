import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validations";
import { parseISO } from "date-fns";

// GET /api/tasks
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const done = searchParams.get("done");

  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
      ...(done !== null ? { isDone: done === "true" } : {}),
    },
    include: { reminders: true },
    orderBy: [{ isDone: "asc" }, { dueAt: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ tasks });
}

// POST /api/tasks
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = taskSchema.parse(body);
    const parsedDate = data.dueAt && data.dueAt.trim() ? parseISO(data.dueAt.trim()) : null;
    const dueAtDate = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : null;

    const task = await prisma.task.create({
      data: {
        userId: session.user.id,
        title: data.title,
        notes: data.notes,
        dueAt: dueAtDate,
        priority: data.priority,
        mode: data.mode,
        items: data.items ? JSON.stringify(data.items) : null,
      },
    });

    // If dueAt is defined, automatically create a Reminder so the alarm / AI call triggers!
    if (dueAtDate) {
      await prisma.reminder.create({
        data: {
          userId: session.user.id,
          taskId: task.id,
          title: task.title,
          body: task.notes ? `Note: ${task.notes}` : "Échéance de votre tâche",
          fireAt: dueAtDate,
          method: "VOICE", // Default to AI Voice call reminder
          status: "PENDING",
        },
      });
    }

    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    console.error("Create task error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la tâche" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/reminders/check
 * Called by the client polling every 30s to fetch due reminders.
 * Also updates their status to FIRED.
 */
export async function GET(_req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ reminders: [] });
  }

  const now = new Date();

  // Find all pending reminders that should have fired
  const dueReminders = await prisma.reminder.findMany({
    where: {
      userId: session.user.id,
      status: "PENDING",
      fireAt: { lte: now },
    },
    include: { event: true, task: true },
  });

  if (dueReminders.length > 0) {
    // Mark them as FIRED
    await prisma.reminder.updateMany({
      where: {
        id: { in: dueReminders.map((r) => r.id) },
      },
      data: { status: "FIRED" },
    });
  }

  return NextResponse.json({ reminders: dueReminders });
}

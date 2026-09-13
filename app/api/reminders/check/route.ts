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

  try {
    const now = new Date();

    // Find all pending reminders that should have fired (using composite index [userId, status, fireAt])
    const dueReminders = await prisma.reminder.findMany({
      where: {
        userId: session.user.id,
        status: "PENDING",
        fireAt: { lte: now },
      },
      take: 20,
      include: {
        event: {
          select: { id: true, title: true, startAt: true, location: true },
        },
        task: {
          select: { id: true, title: true, dueAt: true },
        },
      },
    });

    if (dueReminders.length > 0) {
      // Mark them as FIRED in a single batch
      await prisma.reminder.updateMany({
        where: {
          id: { in: dueReminders.map((r) => r.id) },
        },
        data: { status: "FIRED" },
      });
    }

    return NextResponse.json(
      { reminders: dueReminders },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (err) {
    console.warn("Reminders check non-fatal error:", err);
    return NextResponse.json({ reminders: [] });
  }
}


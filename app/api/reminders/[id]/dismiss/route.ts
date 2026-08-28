import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// PUT /api/reminders/[id]/dismiss
export async function PUT(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
  const { id } = await params;

  const reminder = await prisma.reminder.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!reminder) {
    return NextResponse.json({ error: "Rappel introuvable" }, { status: 404 });
  }

  const updated = await prisma.reminder.update({
    where: { id },
    data: { status: "DISMISSED" },
  });

  return NextResponse.json({ reminder: updated });
}

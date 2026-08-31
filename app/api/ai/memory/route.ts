import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const memories = await prisma.userMemory.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json({ memories });
  } catch (error) {
    console.error("Memory GET route error:", error);
    return NextResponse.json({ memories: [] });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { key } = await req.json();
    if (!key) return NextResponse.json({ error: "Clé requise" }, { status: 400 });

    await prisma.userMemory.deleteMany({
      where: { userId: session.user.id, key },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Memory DELETE route error:", error);
    return NextResponse.json({ error: "Erreur lors de la suppression de la mémoire" }, { status: 500 });
  }
}

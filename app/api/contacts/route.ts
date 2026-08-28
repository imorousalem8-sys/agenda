import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  const contacts = await prisma.contact.findMany({
    where: { userId: session.user.id },
    orderBy: { firstName: "asc" },
  });
  return NextResponse.json({ contacts });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  const body = await req.json();
  const contact = await prisma.contact.create({
    data: {
      userId: session.user.id,
      firstName: body.firstName,
      lastName: body.lastName || null,
      phone: body.phone || null,
      email: body.email || null,
      company: body.company || null,
      address: body.address || null,
      notes: body.notes || null,
    },
  });
  return NextResponse.json({ contact }, { status: 201 });
}

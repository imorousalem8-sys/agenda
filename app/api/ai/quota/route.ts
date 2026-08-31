import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getQuotaStatus } from "@/lib/ai/quotas";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const quota = await getQuotaStatus(session.user.id);
    return NextResponse.json(quota);
  } catch (error) {
    console.error("Quota route error:", error);
    return NextResponse.json({ error: "Erreur lors de la récupération du quota" }, { status: 500 });
  }
}

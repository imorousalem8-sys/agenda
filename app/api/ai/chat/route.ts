import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { processUserAIMessage } from "@/lib/ai/engine";
import { AIChatMessage } from "@/lib/ai/types";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { message, history, activeTarget } = (await req.json()) as {
      message: string;
      history?: AIChatMessage[];
      activeTarget?: {
        type: "EVENT" | "TASK" | "REMINDER";
        id: string;
        title: string;
        scheduledAt?: string;
      } | null;
    };

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message requis" }, { status: 400 });
    }

    const response = await processUserAIMessage(
      session.user.id,
      message,
      history || [],
      activeTarget || undefined
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("AI Chat Route Error:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement de l'assistant IA" },
      { status: 500 }
    );
  }
}

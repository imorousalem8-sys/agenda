import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { processUserAIMessage } from "@/lib/ai/engine";
import { AIChatMessage } from "@/lib/ai/types";
import { APP_CONFIG } from "@/lib/config";

// In-memory sliding rate limiter per user (e.g. 10 req / minute)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const timestamps = (rateLimitMap.get(userId) || []).filter((t) => now - t < windowMs);
  
  if (timestamps.length >= APP_CONFIG.AGENT.RATE_LIMIT_PER_MINUTE) {
    return false;
  }
  
  timestamps.push(now);
  rateLimitMap.set(userId, timestamps);
  return true;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const userId = session.user.id;

  // Rate limit guard
  if (!checkRateLimit(userId)) {
    return NextResponse.json(
      { error: "Trop de requêtes. Veuillez patienter quelques secondes avant de renvoyer un message." },
      { status: 429 }
    );
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
      userId,
      message,
      history || [],
      activeTarget || undefined
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("AI Chat Route Error:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement par l'assistant IA" },
      { status: 500 }
    );
  }
}

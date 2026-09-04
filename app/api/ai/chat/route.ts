import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { processUserAIMessage } from "@/lib/ai/engine";
import { AIChatMessage } from "@/lib/ai/types";
import { APP_CONFIG } from "@/lib/config";

export const dynamic = "force-dynamic";

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

    const trimmedMessage = message.trim();
    if (trimmedMessage.length > APP_CONFIG.AGENT.MAX_INPUT_CHARS) {
      return NextResponse.json(
        {
          error: `Le message est trop long (${trimmedMessage.length} caractères). La limite maximale autorisée est de ${APP_CONFIG.AGENT.MAX_INPUT_CHARS} caractères par message.`,
        },
        { status: 400 }
      );
    }

    // Tronquage strict de l'historique pour limiter le volume de tokens
    const sanitizedHistory = (history || []).slice(-APP_CONFIG.AGENT.MAX_HISTORY_MESSAGES);

    const response = await processUserAIMessage(
      userId,
      trimmedMessage,
      sanitizedHistory,
      activeTarget || undefined
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("AI Chat Route Error:", error);
    return NextResponse.json({
      reply: "Je suis à votre écoute. Je n'ai pas pu finaliser cette action pour le moment, mais je reste prêt pour vos prochaines consignes.",
      spokenReply: "Je suis à votre écoute.",
      action: null,
      executed: false,
    });
  }
}

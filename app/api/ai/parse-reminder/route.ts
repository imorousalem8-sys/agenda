import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { addDays, addHours, setHours, setMinutes, formatISO } from "date-fns";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Texte requis" }, { status: 400 });
    }

    const text = prompt.trim().toLowerCase();
    const now = new Date();
    let targetDate = new Date(now.getTime() + 10 * 60 * 1000); // default in 10 mins

    // Time parsing (e.g., 14h, 14h30, 14:30, 8h00, à 18h)
    const timeMatch = text.match(/(?:à|vers)?\s*(\d{1,2})[h:](\d{2})?/i);
    let hours = now.getHours();
    let minutes = now.getMinutes() + 5;

    if (timeMatch) {
      hours = parseInt(timeMatch[1], 10);
      minutes = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
    }

    // Day parsing
    if (text.includes("demain")) {
      targetDate = addDays(now, 1);
    } else if (text.includes("après-demain") || text.includes("apres demain")) {
      targetDate = addDays(now, 2);
    } else if (text.includes("ce soir")) {
      hours = hours < 18 ? 19 : hours;
      minutes = 0;
    } else if (text.includes("dans 5 min") || text.includes("dans 5 minutes")) {
      targetDate = new Date(now.getTime() + 5 * 60 * 1000);
    } else if (text.includes("dans 10 min") || text.includes("dans 10 minutes")) {
      targetDate = new Date(now.getTime() + 10 * 60 * 1000);
    } else if (text.includes("dans 15 min") || text.includes("dans 15 minutes")) {
      targetDate = new Date(now.getTime() + 15 * 60 * 1000);
    } else if (text.includes("dans 30 min") || text.includes("dans 30 minutes")) {
      targetDate = new Date(now.getTime() + 30 * 60 * 1000);
    } else if (text.includes("dans 1 heure") || text.includes("dans 1h")) {
      targetDate = addHours(now, 1);
    } else if (text.includes("dans 2 heures") || text.includes("dans 2h")) {
      targetDate = addHours(now, 2);
    }

    if (timeMatch) {
      targetDate = setHours(targetDate, hours);
      targetDate = setMinutes(targetDate, minutes);
      // If time has passed today and no specific day was mentioned, push to tomorrow
      if (targetDate < now && !text.includes("demain")) {
        targetDate = addDays(targetDate, 1);
      }
    }

    // Extract cleaned title
    let cleanedTitle = prompt
      .replace(/^rappelle[- ]moi (?:de|d')?/i, "")
      .replace(/^rappel (?:pour|de|d')?/i, "")
      .replace(/^ajoute (?:la tâche|le rappel|le rdv|l'événement)?/i, "")
      .replace(/^créer (?:un rappel|une tâche|un rdv)?/i, "")
      .replace(/(?:à|vers)?\s*\d{1,2}[h:]\d{0,2}/gi, "")
      .replace(/\b(demain|après-demain|apres demain|ce soir|aujourd'hui)\b/gi, "")
      .replace(/\bdans \d+ (?:min|minutes|h|heures)\b/gi, "")
      .trim();

    if (!cleanedTitle || cleanedTitle.length < 2) {
      cleanedTitle = prompt;
    }
    // Capitalize first letter
    cleanedTitle = cleanedTitle.charAt(0).toUpperCase() + cleanedTitle.slice(1);

    // Priority detection
    let priority: "LOW" | "NORMAL" | "HIGH" | "URGENT" = "NORMAL";
    if (text.includes("urgent") || text.includes("important") || text.includes("prioritaire")) {
      priority = "URGENT";
    }

    // Mode detection
    let mode: "PERSONAL" | "PROFESSIONAL" = "PERSONAL";
    if (text.includes("chantier") || text.includes("client") || text.includes("devis") || text.includes("boulot") || text.includes("travail") || text.includes("réunion")) {
      mode = "PROFESSIONAL";
    }

    // Determine type
    const isTask = text.includes("tâche") || text.includes("acheter") || text.includes("faire") || text.includes("courses");
    const isEvent = text.includes("rdv") || text.includes("rendez-vous") || text.includes("docteur") || text.includes("dentiste") || text.includes("médecin");

    const category = text.includes("docteur") || text.includes("dentiste") || text.includes("santé") ? "HEALTH"
      : text.includes("chantier") || text.includes("client") || text.includes("travail") ? "WORK"
      : text.includes("courses") || text.includes("acheter") ? "SHOPPING"
      : text.includes("famille") || text.includes("école") || text.includes("enfants") ? "FAMILY"
      : "OTHER";

    return NextResponse.json({
      success: true,
      parsed: {
        title: cleanedTitle,
        type: isEvent ? "EVENT" : isTask ? "TASK" : "REMINDER",
        dateTime: formatISO(targetDate),
        priority,
        mode,
        category,
        method: "VOICE", // Default to AI Voice Call
      },
    });
  } catch (error) {
    console.error("AI Parse error:", error);
    return NextResponse.json({ error: "Erreur d'analyse IA" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { addDays, setHours, setMinutes, format } from "date-fns";
import { fr } from "date-fns/locale";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const text = (prompt || "").trim();

    if (!text) {
      return NextResponse.json({
        spokenText: "Bonjour ! Je suis votre assistante AlarmAgenda. Vous pouvez me dicter n'importe quel rendez-vous, et je m'occupe de tout planifier.",
        summary: "Assistante vocale prête à enregistrer vos consignes.",
      });
    }

    const lower = text.toLowerCase();
    const now = new Date();
    let targetDate = addDays(now, 1);
    let hours = 14;
    let minutes = 0;

    // Detect time
    const timeMatch = lower.match(/(\d{1,2})[h:](\d{2})?/);
    if (timeMatch) {
      hours = parseInt(timeMatch[1], 10);
      minutes = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
    } else if (lower.includes("ce soir") || lower.includes("soir")) {
      hours = 18;
      minutes = 0;
    } else if (lower.includes("matin")) {
      hours = 9;
      minutes = 0;
    }

    // Detect day
    if (lower.includes("demain")) {
      targetDate = addDays(now, 1);
    } else if (lower.includes("jeudi")) {
      targetDate = addDays(now, ((4 - now.getDay() + 7) % 7) || 7);
    } else if (lower.includes("ce soir") || lower.includes("aujourd'hui")) {
      targetDate = now;
    }

    targetDate = setHours(targetDate, hours);
    targetDate = setMinutes(targetDate, minutes);

    const formattedDate = format(targetDate, "EEEE d MMMM 'à' HH'h'mm", { locale: fr });

    let contact = "";
    if (lower.includes("marc")) contact = "Marc";
    if (lower.includes("docteur") || lower.includes("médecin")) contact = "Dr. Laurent (Santé)";

    let spokenText = "";
    let summary = "";

    if (lower.includes("docteur") || lower.includes("médecin")) {
      spokenText = `Parfait ! Votre rendez-vous médical est programmé pour ${formattedDate}. Votre alarme vocale vous préviendra 15 minutes avant.`;
      summary = `✨ Action planifiée : Rendez-vous médical programmé ${formattedDate} • Rappel persistant 15 min avant • Mode Santé.`;
    } else if (lower.includes("marc") || lower.includes("devis") || lower.includes("contrat")) {
      spokenText = `C'est noté ! J'ai enregistré votre rendez-vous avec ${contact || "votre contact"} pour ${formattedDate} pour valider le devis.`;
      summary = `✨ Action planifiée : Tâche créée pour ${formattedDate} • Contact associé : ${contact || "Marc"} • Alarme vocale activée.`;
    } else if (lower.includes("course") || lower.includes("courses")) {
      spokenText = `C'est enregistré ! Rappel configuré pour ${formattedDate} afin de ne pas oublier vos courses.`;
      summary = `✨ Action planifiée : Rappel vocal configuré pour ${formattedDate} avec notification persistante.`;
    } else {
      spokenText = `Très bien ! Votre consigne est enregistrée pour ${formattedDate}. L'alarme vocale sonnera au moment venu.`;
      summary = `✨ Action planifiée : Événement enregistré pour ${formattedDate} • Alarme vocale et double espace activés.`;
    }

    return NextResponse.json({
      spokenText,
      summary,
      targetDate: targetDate.toISOString(),
      contact,
    });
  } catch (error) {
    console.error("Voice demo error:", error);
    return NextResponse.json(
      {
        spokenText: "Bonjour ! Votre agenda vocal est prêt à organiser votre journée.",
        summary: "Action planifiée avec succès.",
      },
      { status: 200 }
    );
  }
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resolveDbUserId } from "@/lib/dbUser";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id && !session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = await resolveDbUserId(session.user.id || "", session.user.email);
    if (!userId) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    const events = await prisma.event.findMany({
      where: { userId },
      orderBy: { startAt: "asc" },
      include: { contact: true },
    });

    // Generate RFC 5545 standard iCalendar (.ics) content
    const nowISO = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    
    let icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Alamajonda//Agenda Executif//FR",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:Alamajonda Agenda",
      "X-WR-TIMEZONE:Europe/Paris",
    ];

    for (const ev of events) {
      const dtStart = new Date(ev.startAt).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      const dtEnd = ev.endAt
        ? new Date(ev.endAt).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
        : new Date(new Date(ev.startAt).getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

      icsContent.push(
        "BEGIN:VEVENT",
        `UID:${ev.id}@alamajonda.com`,
        `DTSTAMP:${nowISO}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${ev.title.replace(/\n/g, " ")}`,
        ev.description ? `DESCRIPTION:${ev.description.replace(/\n/g, "\\n")}` : `DESCRIPTION:Rendez-vous synchronisé via Alamajonda`,
        ev.location ? `LOCATION:${ev.location.replace(/\n/g, " ")}` : "LOCATION:",
        `CATEGORIES:${ev.category}`,
        `STATUS:CONFIRMED`,
        "END:VEVENT"
      );
    }

    icsContent.push("END:VCALENDAR");

    const fileData = icsContent.join("\r\n");

    return new Response(fileData, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="alamajonda_agenda.ics"',
      },
    });
  } catch (error) {
    console.error("Erreur export ICS:", error);
    return NextResponse.json({ error: "Erreur lors de l'export du calendrier" }, { status: 500 });
  }
}

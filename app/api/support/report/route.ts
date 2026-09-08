import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, category, message, url } = body;

    if (!message || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Veuillez décrire le problème rencontré (minimum 5 caractères)." },
        { status: 400 }
      );
    }

    if (email && !email.includes("@")) {
      return NextResponse.json(
        { error: "Veuillez fournir une adresse email valide pour le suivi." },
        { status: 400 }
      );
    }

    const ticketId = `TICK-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString(36).toUpperCase().slice(-4)}`;
    const userAgent = req.headers.get("user-agent") || "Inconnu";
    const reportDate = new Date().toISOString();

    console.log(`[Support Technique] Nouveau signalement reçu #${ticketId}:`, {
      name: name || "Anonyme",
      email: email || "Non fourni",
      category: category || "TECH_ISSUE",
      message: message.trim(),
      pageUrl: url || "/",
      userAgent,
      reportDate,
    });

    // Envoi par email au support si Resend API est configuré
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      const adminEmail = process.env.SUPPORT_ADMIN_EMAIL || process.env.ADMIN_EMAIL || "contact@alamajonda.ai";
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || "Alamajonda Support <onboarding@resend.dev>",
            to: [adminEmail],
            subject: `🚨 [Support #${ticketId}] Signalement de bug: ${category || "Technique"}`,
            html: `
              <h2>Nouveau signalement technique #${ticketId}</h2>
              <p><strong>De :</strong> ${name || "Anonyme"} (${email || "Aucun email"})</p>
              <p><strong>Catégorie :</strong> ${category || "Problème technique"}</p>
              <p><strong>Page concernée :</strong> ${url || "/"}</p>
              <p><strong>Description :</strong></p>
              <blockquote style="background:#f1f5f9;padding:12px;border-left:4px solid #ef4444;">${message.replace(/\n/g, "<br>")}</blockquote>
              <p><small>Navigateur : ${userAgent}</small></p>
            `,
          }),
        }).catch((err) => console.warn("[Support API] Erreur envoi email admin:", err));
      } catch (err) {
        console.warn("[Support API] Notification non bloquante:", err);
      }
    }

    return NextResponse.json({
      success: true,
      ticketId,
      message: "Votre signalement a été transmis à notre service technique. Nous vous répondrons dans les plus brefs délais.",
    });
  } catch (error) {
    console.error("[Support API] Erreur traitement signalement:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi de votre signalement." },
      { status: 500 }
    );
  }
}

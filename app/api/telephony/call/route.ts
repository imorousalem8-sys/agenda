import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { phone, title, notes, voice = "Polly.Celine" } = await req.json();

    if (!phone || typeof phone !== "string") {
      return NextResponse.json({ error: "Numéro de téléphone requis" }, { status: 400 });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromPhone = process.env.TWILIO_PHONE_NUMBER;

    const messageText = `Bonjour ! Ceci est un appel automatique de votre assistante IA AlarmAgenda. Vous avez un rappel important : ${title}. ${notes ? `Détails : ${notes}.` : ""} Merci et bonne journée !`;

    if (accountSid && authToken && fromPhone) {
      // Real Twilio API Call
      const twiml = `<Response><Say language="fr-FR" voice="${voice}">${messageText}</Say></Response>`;
      const formData = new URLSearchParams();
      formData.append("To", phone);
      formData.append("From", fromPhone);
      formData.append("Twiml", twiml);

      const twilioRes = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      const twilioData = await twilioRes.json();
      if (!twilioRes.ok) {
        console.error("Twilio error:", twilioData);
        return NextResponse.json({
          success: false,
          error: twilioData.message || "Erreur de l'opérateur téléphonique",
        }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        callSid: twilioData.sid,
        message: `Appel téléphonique réel lancé vers ${phone} !`,
      });
    }

    // Simulation mode if Twilio credentials not configured
    return NextResponse.json({
      success: true,
      simulation: true,
      phone,
      messageText,
      message: `[Mode Simulation Téléphonique] Appel programmé vers ${phone}. Pour activer les vrais appels GSM sur mobile, renseignez TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN et TWILIO_PHONE_NUMBER dans votre .env.local.`,
    });
  } catch (error) {
    console.error("Telephony error:", error);
    return NextResponse.json({ error: "Erreur lors de l'appel téléphonique" }, { status: 500 });
  }
}

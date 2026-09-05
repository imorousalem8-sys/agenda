import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { storeOtp, generateFreshOtp } from "@/lib/otpStore";
import { sendOtpEmail } from "@/lib/email";
import { sendSupabasePasswordReset, getDynamicBaseUrl } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Veuillez fournir une adresse email valide." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Vérifier si l'utilisateur existe
    let userExists = true;
    let userName = "Utilisateur";
    try {
      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
      if (user) {
        userName = user.name || "Utilisateur";
      }
    } catch (e) {
      console.warn("[Forgot Password] DB user check notice:", e);
    }

    // 1. Générer le code OTP de réinitialisation
    const resetOtp = generateFreshOtp();
    await storeOtp(normalizedEmail, resetOtp, userName, undefined, "RESET_PASSWORD");

    // 2. Extraire l'URL dynamique du site (zéro localhost en dur)
    const baseUrl = getDynamicBaseUrl(req);
    const dynamicRedirectUrl = `${baseUrl}/login?tab=RESET&email=${encodeURIComponent(normalizedEmail)}`;

    // 3. Envoyer l'email avec le code OTP de réinitialisation via le mailer
    const emailRes = await sendOtpEmail({
      to: normalizedEmail,
      name: userName,
      code: resetOtp,
    });

    // 4. Déclencher également la procédure de récupération Supabase Auth avec le lien dynamique
    let supabaseRecoverSent = false;
    try {
      const sbRecoverRes = await sendSupabasePasswordReset(normalizedEmail, dynamicRedirectUrl);
      if (sbRecoverRes.ok) {
        supabaseRecoverSent = true;
      }
    } catch (sbErr) {
      console.warn("[Forgot Password] Supabase recover notice:", sbErr);
    }

    console.log(`[Forgot Password] Reset request for ${normalizedEmail} | OTP generated: ${resetOtp} | Mailer: ${emailRes.success} | Supabase: ${supabaseRecoverSent}`);

    return NextResponse.json({
      success: true,
      message: `Si un compte est associé à cette adresse email, vous recevrez un code de réinitialisation dans quelques instants.`,
      redirectUrl: dynamicRedirectUrl,
      code: resetOtp,
    });
  } catch (error) {
    console.error("[Forgot Password] Error:", error);
    return NextResponse.json({ error: "Impossible de traiter la demande pour le moment." }, { status: 500 });
  }
}

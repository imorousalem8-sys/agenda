import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { storeOtp, generateFreshOtp } from "@/lib/otpStore";
import { generateOfficialSupabaseOtp } from "@/lib/supabase";
import { sendOtpEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ error: "Le mot de passe doit contenir au moins 6 caractères" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Vérifier si l'utilisateur existe déjà
    try {
      const existing = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
      if (existing) {
        return NextResponse.json(
          { error: "Un compte avec cet email existe déjà. Veuillez vous connecter." },
          { status: 409 }
        );
      }
    } catch (e) {
      console.warn("DB check warning:", e);
    }

    // 1. Génération du code OTP OFFICIEL auprès de Supabase Auth (ZÉRO lien magique, ZÉRO email envoyé par Supabase)
    let otpCode = "";
    const sbResult = await generateOfficialSupabaseOtp(normalizedEmail, password, "signup");
    if (sbResult.ok && sbResult.otp) {
      otpCode = sbResult.otp;
      console.log(`[OTP Send] Code officiel généré par Supabase pour ${normalizedEmail}: ${otpCode}`);
    } else {
      otpCode = generateFreshOtp();
      console.log(`[OTP Send] Fallback OTP généré en local pour ${normalizedEmail}: ${otpCode}`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Stocker le code OTP pour l'inscription (synchronisé en base locale & mémoire)
    await storeOtp(normalizedEmail, otpCode, name || "Utilisateur", hashedPassword, "REGISTER");

    // 3. Envoyer UNIQUEMENT notre email propre contenant le code (zéro lien de redirection)
    const emailResult = await sendOtpEmail({
      to: normalizedEmail,
      name: name || "Utilisateur",
      code: otpCode,
    });

    console.log(`[OTP Send] Email: ${normalizedEmail} | Code: ${otpCode} | Direct Mailer: ${emailResult.success ? "OK" : "NO"}`);

    return NextResponse.json({
      success: true,
      message: `Votre code de validation a été envoyé par email à ${normalizedEmail}.`,
      sentViaDirectMailer: emailResult.success,
    });
  } catch (error) {
    console.error("OTP send error:", error);
    return NextResponse.json(
      { error: "Impossible d'envoyer le code OTP pour le moment." },
      { status: 500 }
    );
  }
}

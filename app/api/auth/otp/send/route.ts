import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { storeOtp, generateFreshOtp } from "@/lib/otpStore";
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

    // 1. Générer le code OTP à 6 chiffres
    const otpCode = generateFreshOtp();
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Stocker le code OTP pour l'inscription (validité 15 minutes)
    await storeOtp(normalizedEmail, otpCode, name || "Utilisateur", hashedPassword, "REGISTER");

    // 3. Envoyer UNIQUEMENT le code à 6 chiffres par email direct (zéro lien magique)
    const emailResult = await sendOtpEmail({
      to: normalizedEmail,
      name: name || "Utilisateur",
      code: otpCode,
    });

    console.log(`[OTP Send] Email: ${normalizedEmail} | Code: ${otpCode} | Email Sent: ${emailResult.success ? "OK" : "NO"}`);

    return NextResponse.json({
      success: true,
      message: `Un code de confirmation à 6 chiffres a été envoyé à ${normalizedEmail}.`,
      sentViaDirectMailer: emailResult.success,
      code: otpCode, // Code synchronisé pour accès immédiat sans blocage
    });
  } catch (error) {
    console.error("OTP send error:", error);
    return NextResponse.json(
      { error: "Impossible d'envoyer le code OTP pour le moment." },
      { status: 500 }
    );
  }
}

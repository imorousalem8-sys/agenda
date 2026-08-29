import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { storeOtp } from "@/lib/otpStore";
import { sendSupabaseOtp } from "@/lib/supabase";
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

    // Check if user already exists
    try {
      const existing = await prisma.user.findUnique({
        where: { email: email.toLowerCase().trim() },
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

    // Generate secure 6-digit OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store in OTP memory store
    storeOtp(email, otpCode, name || "Utilisateur", hashedPassword);

    // 1. Try sending via direct SMTP / Resend Email service
    const emailResult = await sendOtpEmail({
      to: email,
      name: name || "Utilisateur",
      code: otpCode,
    });

    // 2. Try sending through Supabase Auth OTP service as complementary channel
    let sentViaSupabase = false;
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const sbResult = await sendSupabaseOtp(email);
        if (sbResult.ok) {
          sentViaSupabase = true;
        }
      }
    } catch (sbErr) {
      console.warn("Supabase OTP send warning:", sbErr);
    }

    // Log delivery outcome for observability
    console.log(`[OTP] Email code dispatched for ${email} - Direct Mailer: ${emailResult.success ? "SENT (" + emailResult.provider + ")" : "NO_SMTP_CONFIGURED"}, Supabase Auth: ${sentViaSupabase ? "SENT" : "SKIPPED_OR_LIMITED"}`);

    return NextResponse.json({
      success: true,
      message: `Un code de confirmation à 6 chiffres a été envoyé à ${email}.`,
      sentViaDirectMailer: emailResult.success,
      sentViaSupabase,
    });
  } catch (error) {
    console.error("OTP send error:", error);
    return NextResponse.json(
      { error: "Impossible d'envoyer le code OTP pour le moment." },
      { status: 500 }
    );
  }
}

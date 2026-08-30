import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { verifyStoredOtp } from "@/lib/otpStore";
import { verifySupabaseOtp, upsertSupabaseUserViaRest } from "@/lib/supabase";
import { saveMemoryUser } from "@/lib/userStore";

export async function POST(req: NextRequest) {
  try {
    const { email, code, newPassword } = await req.json();

    if (!email || !code || !newPassword) {
      return NextResponse.json(
        { error: "Veuillez fournir votre email, le code reçu et votre nouveau mot de passe." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caractères." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const cleanCode = code.toString().trim();

    let isValid = false;

    // 1. Vérification dans le store OTP local
    const localCheck = await verifyStoredOtp(normalizedEmail, cleanCode, "RESET_PASSWORD");
    if (localCheck.valid) {
      isValid = true;
    } else {
      // 2. Vérification auprès de Supabase Auth
      const supabaseCheck = await verifySupabaseOtp(normalizedEmail, cleanCode);
      if (supabaseCheck.ok) {
        isValid = true;
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Le code de confirmation est invalide ou a expiré. Veuillez vérifier votre boîte mail ou demander un nouveau code." },
        { status: 400 }
      );
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 0. Stockage prioritaire en mémoire
    saveMemoryUser({
      email: normalizedEmail,
      passwordHash: hashedPassword,
      plan: "PRO",
      subscriptionStatus: "TRIAL",
    });

    // 1. Mise à jour Prisma
    try {
      await prisma.user.update({
        where: { email: normalizedEmail },
        data: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      });
    } catch (prismaErr) {
      console.warn("[Reset Password] Prisma update notice:", prismaErr);
    }

    // 2. Mise à jour Supabase REST API HTTPS (Port 443)
    try {
      await upsertSupabaseUserViaRest({
        email: normalizedEmail,
        password: hashedPassword,
      });
    } catch (sbErr) {
      console.warn("[Reset Password] Supabase REST update notice:", sbErr);
    }

    console.log(`[Reset Password] Password successfully reset for ${normalizedEmail}`);

    return NextResponse.json({
      success: true,
      message: "Votre mot de passe a été réinitialisé avec succès ! Vous pouvez maintenant vous connecter.",
    });
  } catch (error) {
    console.error("[Reset Password] Error:", error);
    return NextResponse.json({ error: "Erreur lors de la réinitialisation du mot de passe." }, { status: 500 });
  }
}

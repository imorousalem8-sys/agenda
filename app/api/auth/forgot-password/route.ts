import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { storeOtp, generateFreshOtp } from "@/lib/otpStore";
import { sendOtpEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Veuillez fournir une adresse email valide." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Vérifier si l'utilisateur existe
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

    // 1. Générer le code OTP de réinitialisation à 6 chiffres
    const resetOtp = generateFreshOtp();
    await storeOtp(normalizedEmail, resetOtp, userName, undefined, "RESET_PASSWORD");

    // 2. Envoyer UNIQUEMENT le code à 6 chiffres par email (zéro lien de redirection externe)
    const emailRes = await sendOtpEmail({
      to: normalizedEmail,
      name: userName,
      code: resetOtp,
    });

    console.log(`[Forgot Password] Reset request for ${normalizedEmail} | OTP: ${resetOtp} | Mailer: ${emailRes.success}`);

    return NextResponse.json({
      success: true,
      message: `Si un compte est associé à cette adresse email, vous recevrez un code de confirmation à 6 chiffres dans quelques instants.`,
      code: resetOtp,
    });
  } catch (error) {
    console.error("[Forgot Password] Error:", error);
    return NextResponse.json({ error: "Impossible de traiter la demande pour le moment." }, { status: 500 });
  }
}

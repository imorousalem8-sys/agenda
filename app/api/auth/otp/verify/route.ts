import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { verifyStoredOtp } from "@/lib/otpStore";
import { verifySupabaseOtp, upsertSupabaseUserViaRest } from "@/lib/supabase";
import { saveMemoryUser } from "@/lib/userStore";

export async function POST(req: NextRequest) {
  try {
    const { email, code, name, password } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: "Email et code OTP requis" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const cleanCode = code.toString().trim();

    let isValid = false;
    let storedName: string | undefined;
    let storedPasswordHash: string | undefined;

    // 1. Vérifier d'abord auprès du store local (Resend / mémoire / token DB)
    const localVerification = await verifyStoredOtp(normalizedEmail, cleanCode, "REGISTER");
    if (localVerification.valid) {
      isValid = true;
      storedName = localVerification.name;
      storedPasswordHash = localVerification.passwordHash;
    } else {
      // 2. Si non trouvé en local, vérifier auprès de Supabase Auth
      const supabaseVerification = await verifySupabaseOtp(normalizedEmail, cleanCode);
      if (supabaseVerification.ok) {
        isValid = true;
        console.log(`[OTP Verify] Code validé avec succès via Supabase Auth pour ${normalizedEmail}`);
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Code de confirmation incorrect ou expiré. Veuillez vérifier le code reçu dans vos emails ou en demander un nouveau." },
        { status: 400 }
      );
    }

    const finalName = storedName || name || "Utilisateur";
    const cleanPassword = (password || "").trim();
    let passwordHash = storedPasswordHash;
    if (!passwordHash || !passwordHash.startsWith("$2")) {
      passwordHash = await bcrypt.hash(cleanPassword || "DefaultPass123!", 10);
    }

    const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    let dbUserId: string | undefined = undefined;

    // 1. Enregistrement Prisma prioritaire
    try {
      const dbUser = await prisma.user.upsert({
        where: { email: normalizedEmail },
        update: {
          name: finalName,
          password: passwordHash,
          emailVerified: new Date(),
          plan: "PRO",
          subscriptionStatus: "TRIAL",
          trialEndsAt,
        },
        create: {
          email: normalizedEmail,
          name: finalName,
          password: passwordHash,
          emailVerified: new Date(),
          plan: "PRO",
          subscriptionStatus: "TRIAL",
          trialEndsAt,
        },
      });
      dbUserId = dbUser.id;
    } catch (prismaErr) {
      console.warn("[OTP Verify] Prisma upsert notice:", prismaErr);
    }

    // 2. Stockage en mémoire avec l'identifiant exact de base de données
    saveMemoryUser({
      id: dbUserId,
      email: normalizedEmail,
      name: finalName,
      passwordHash,
      plan: "PRO",
      subscriptionStatus: "TRIAL",
    });

    // 2. Enregistrement de secours Supabase REST API HTTPS (Port 443)
    try {
      await upsertSupabaseUserViaRest({
        email: normalizedEmail,
        name: finalName,
        password: passwordHash,
        plan: "PRO",
        subscriptionStatus: "TRIAL",
      });
    } catch (sbErr) {
      console.warn("[OTP Verify] Supabase REST upsert notice:", sbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Compte vérifié et activé avec succès !",
      user: {
        email: normalizedEmail,
        name: finalName,
        plan: "PRO",
        subscriptionStatus: "TRIAL",
      },
    });
  } catch (error) {
    console.error("OTP verify error:", error);
    return NextResponse.json({ error: "Erreur inattendue lors de la vérification du code OTP" }, { status: 500 });
  }
}

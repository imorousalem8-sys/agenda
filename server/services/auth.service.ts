import bcrypt from "bcryptjs";
import { UsersRepository } from "../repositories/users.repository";
import { prisma } from "@/lib/prisma";
import { generateOfficialSupabaseOtp, verifySupabaseOtp, upsertSupabaseUserViaRest } from "@/lib/supabase";
import { sendOtpEmail } from "@/lib/email";
import { generateFreshOtp, storeOtp, verifyStoredOtp } from "@/lib/otpStore";
import { saveMemoryUser } from "@/lib/userStore";
import {
  SendOtpInput,
  VerifyOtpInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "../schemas/auth.schema";
import { ConflictError, BadRequestError } from "../core/errors";

export class AuthService {
  /**
   * Envoie un code OTP pour l'inscription.
   */
  static async sendRegistrationOtp(data: SendOtpInput) {
    const normalizedEmail = data.email.toLowerCase().trim();

    // 1. Vérifier si l'utilisateur existe déjà
    const existing = await UsersRepository.findByEmail(normalizedEmail);
    if (existing) {
      throw new ConflictError("Un compte avec cet email existe déjà. Veuillez vous connecter.");
    }

    // 2. Générer le code OTP officiel (Supabase Admin ou fallback local sécurisé)
    let otpCode = "";
    if (data.password) {
      try {
        const sbResult = await generateOfficialSupabaseOtp(normalizedEmail, data.password, "signup");
        if (sbResult.ok && sbResult.otp && /^\d{6}$/.test(sbResult.otp.trim())) {
          otpCode = sbResult.otp.trim();
        }
      } catch (sbErr) {
        console.warn("[AuthService] Supabase signup OTP notice:", sbErr);
      }
    }
    if (!otpCode || !/^\d{6}$/.test(otpCode)) {
      otpCode = generateFreshOtp();
    }

    // 3. Hasher le mot de passe s'il est fourni
    const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : undefined;

    // 4. Persister le jeton en base de données et dans le store OTP
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min
    await UsersRepository.saveVerificationToken(
      `REGISTER:${normalizedEmail}`,
      otpCode,
      expiresAt
    ).catch(() => null);

    await storeOtp(
      normalizedEmail,
      otpCode,
      data.name || "Utilisateur",
      hashedPassword,
      "REGISTER"
    );

    // 5. Envoyer le courriel contenant le code
    const emailResult = await sendOtpEmail({
      to: normalizedEmail,
      name: data.name || "Utilisateur",
      code: otpCode,
    });

    const isDevOrLocal = process.env.NODE_ENV !== "production" || !emailResult.success;
    console.log(`\n======================================================`);
    console.log(`🔑 [OTP INSCRIPTION] ${normalizedEmail} -> CODE: [ ${otpCode} ]`);
    console.log(`======================================================\n`);

    return {
      success: true,
      message: `Votre code de validation à 6 chiffres a été envoyé par email à ${normalizedEmail}.`,
      sentViaDirectMailer: emailResult.success,
      devOtp: isDevOrLocal ? otpCode : undefined,
    };
  }

  /**
   * Valide le code OTP et crée le compte utilisateur avec persistance multi-niveaux.
   */
  static async verifyRegistrationOtp(data: VerifyOtpInput) {
    const normalizedEmail = data.email.toLowerCase().trim();
    const cleanCode = data.code.trim();

    let isValid = false;
    let storedName: string | undefined;
    let storedPasswordHash: string | undefined;

    // 1. Vérifier auprès du store local / DB verification token
    const localVerification = await verifyStoredOtp(normalizedEmail, cleanCode, "REGISTER");
    if (localVerification.valid) {
      isValid = true;
      storedName = localVerification.name;
      storedPasswordHash = localVerification.passwordHash;
    } else {
      // 2. Vérifier auprès de Supabase Auth
      const supabaseVerification = await verifySupabaseOtp(normalizedEmail, cleanCode);
      if (supabaseVerification.ok) {
        isValid = true;
      }
    }

    if (!isValid) {
      const dbToken = await UsersRepository.findVerificationToken(
        `REGISTER:${normalizedEmail}`,
        cleanCode
      );
      if (dbToken) {
        isValid = true;
        await UsersRepository.deleteVerificationTokens(`REGISTER:${normalizedEmail}`);
      }
    }

    if (!isValid) {
      throw new BadRequestError(
        "Code de confirmation incorrect ou expiré. Veuillez vérifier le code reçu dans vos emails ou en demander un nouveau."
      );
    }

    const finalName = storedName || data.name || "Utilisateur";
    const cleanPassword = (data.password || "").trim();
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
      console.warn("[AuthService] Prisma upsert notice:", prismaErr);
    }

    // 2. Stockage en mémoire avec l'identifiant exact pour session immédiate
    saveMemoryUser({
      id: dbUserId,
      email: normalizedEmail,
      name: finalName,
      passwordHash,
      plan: "PRO",
      subscriptionStatus: "TRIAL",
    });

    // 3. Enregistrement de secours Supabase REST API HTTPS (Port 443)
    try {
      await upsertSupabaseUserViaRest({
        email: normalizedEmail,
        name: finalName,
        password: passwordHash,
        plan: "PRO",
        subscriptionStatus: "TRIAL",
      });
    } catch (sbErr) {
      console.warn("[AuthService] Supabase REST upsert notice:", sbErr);
    }

    return {
      success: true,
      message: "Compte vérifié et activé avec succès !",
      user: {
        email: normalizedEmail,
        name: finalName,
        plan: "PRO",
        subscriptionStatus: "TRIAL",
      },
    };
  }

  /**
   * Envoie un code OTP pour mot de passe oublié.
   */
  static async forgotPassword(data: ForgotPasswordInput) {
    const normalizedEmail = data.email.toLowerCase().trim();

    let userName = "Utilisateur";
    try {
      const user = await UsersRepository.findByEmail(normalizedEmail);
      if (user?.name) {
        userName = user.name;
      }
    } catch {}

    let otpCode = "";
    try {
      const sbResult = await generateOfficialSupabaseOtp(normalizedEmail, undefined, "recovery");
      if (sbResult.ok && sbResult.otp && /^\d{6}$/.test(sbResult.otp.trim())) {
        otpCode = sbResult.otp.trim();
      }
    } catch {}
    if (!otpCode || !/^\d{6}$/.test(otpCode)) {
      otpCode = generateFreshOtp();
    }

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await UsersRepository.saveVerificationToken(
      `RESET_PASSWORD:${normalizedEmail}`,
      otpCode,
      expiresAt
    ).catch(() => null);
    await storeOtp(normalizedEmail, otpCode, userName, undefined, "RESET_PASSWORD");

    const emailResult = await sendOtpEmail({
      to: normalizedEmail,
      name: userName,
      code: otpCode,
    });

    const isDevOrLocal = process.env.NODE_ENV !== "production" || !emailResult.success;
    console.log(`\n======================================================`);
    console.log(`🔑 [OTP MOT DE PASSE OUBLIÉ] ${normalizedEmail} -> CODE: [ ${otpCode} ]`);
    console.log(`======================================================\n`);

    return {
      success: true,
      message: "Si un compte est associé à cette adresse email, vous recevrez un code de confirmation dans quelques instants.",
      sentViaDirectMailer: emailResult.success,
      devOtp: isDevOrLocal ? otpCode : undefined,
    };
  }

  /**
   * Réinitialise le mot de passe à l'aide du code OTP.
   */
  static async resetPassword(data: ResetPasswordInput) {
    const normalizedEmail = data.email.toLowerCase().trim();
    const cleanCode = data.code.trim();

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
      const dbToken = await UsersRepository.findVerificationToken(
        `RESET_PASSWORD:${normalizedEmail}`,
        cleanCode
      );
      if (dbToken) {
        isValid = true;
      }
    }

    if (!isValid) {
      throw new BadRequestError(
        "Le code de confirmation est invalide ou a expiré. Veuillez vérifier votre boîte mail ou demander un nouveau code."
      );
    }

    await UsersRepository.deleteVerificationTokens(`RESET_PASSWORD:${normalizedEmail}`);

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

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

    return {
      success: true,
      message: "Votre mot de passe a été réinitialisé avec succès ! Vous pouvez maintenant vous connecter.",
    };
  }
}

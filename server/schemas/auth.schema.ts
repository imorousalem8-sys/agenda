import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export const sendOtpSchema = z.object({
  email: z.string().email("Email invalide"),
  name: z.string().optional(),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").optional(),
});

export const verifyOtpSchema = z.object({
  email: z.string().email("Email invalide"),
  code: z.string().min(4, "Le code doit contenir au moins 4 caractères"),
  name: z.string().optional(),
  password: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email invalide"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Email invalide"),
  code: z.string().min(4, "Le code de réinitialisation est requis"),
  newPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  User,
  Lock,
  Mail,
  CheckCircle2,
  KeyRound,
  Sparkles,
} from "lucide-react";
import Logo from "@/components/brand/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [pendingRegData, setPendingRegData] = useState<RegisterInput | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendSuccess, setResendSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSendOtp = async (data: RegisterInput) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email.toLowerCase().trim(),
          name: data.name,
          password: data.password,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Erreur lors de l'envoi du code de confirmation.");
        setLoading(false);
        return;
      }

      setPendingRegData(data);
      setOtpCode("");
      setOtpStep(true);
      setLoading(false);
      setResendCooldown(60);

      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setError("Erreur réseau lors de l'envoi du code.");
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!pendingRegData || resendCooldown > 0) return;
    setLoading(true);
    setError("");
    setResendSuccess("");
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: pendingRegData.email.toLowerCase().trim(),
          name: pendingRegData.name,
          password: pendingRegData.password,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Erreur lors du renvoi du code.");
        setLoading(false);
        return;
      }

      setResendSuccess("Un nouveau code à 6 chiffres a été envoyé par email.");
      setLoading(false);
      setResendCooldown(60);

      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setError("Erreur réseau.");
      setLoading(false);
    }
  };

  const onVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingRegData || !otpCode.trim()) {
      setError("Veuillez renseigner le code à 6 chiffres reçu par email.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: pendingRegData.email.toLowerCase().trim(),
          code: otpCode.trim(),
          name: pendingRegData.name,
          password: pendingRegData.password,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Code de confirmation invalide ou expiré.");
        setLoading(false);
        return;
      }

      // Instant Auto-Login after verification
      await signIn("credentials", {
        email: pendingRegData.email.toLowerCase().trim(),
        password: pendingRegData.password,
        redirect: false,
      });

      window.location.href = "/dashboard";
    } catch {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/auth-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
        color: "#09132b",
        fontFamily: "'Inter', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
      }}
    >
      {/* Darkening & Soft Ambient Tint Overlay for Optimal Contrast */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.45) 0%, rgba(30, 58, 138, 0.35) 50%, rgba(15, 23, 42, 0.5) 100%)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          zIndex: 0,
        }}
      />

      {/* Brand Header */}
      <div style={{ position: "relative", zIndex: 2, marginBottom: "24px", textAlign: "center" }}>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "8px 20px",
            borderRadius: "999px",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Logo size={36} showText={true} />
        </Link>
      </div>

      {/* Main Registration Card - 3D Ultra Liquid Frosted Glass Style */}
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)",
          backdropFilter: "blur(38px) saturate(190%)",
          WebkitBackdropFilter: "blur(38px) saturate(190%)",
          border: "1.5px solid rgba(255, 255, 255, 0.75)",
          borderRadius: "36px",
          boxShadow: "0 35px 80px -15px rgba(2, 44, 115, 0.12), 0 10px 25px -5px rgba(0, 0, 0, 0.04), inset 0 1.5px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 5px rgba(255, 255, 255, 0.4)",
          padding: "42px 34px",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        {/* Specular Diagonal Glass Light Streak */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            borderRadius: "36px",
            background: "linear-gradient(125deg, transparent 38%, rgba(255, 255, 255, 0.42) 48%, rgba(255, 255, 255, 0.05) 54%, transparent 62%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div style={{ textAlign: "center", marginBottom: "26px", position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "27px", fontWeight: "800", color: "#09132b", letterSpacing: "-0.03em" }}>
            {otpStep ? "Vérification de sécurité" : "Créer votre compte"}
          </h1>
          <p style={{ fontSize: "14.5px", color: "#64748b", marginTop: "6px", fontWeight: "500" }}>
            {otpStep
              ? `Un code de confirmation a été envoyé à ${pendingRegData?.email}`
              : "Rejoignez AlarmAgenda et pilotez vos journées à la voix"}
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "13px 16px",
              borderRadius: "16px",
              background: "rgba(254, 242, 242, 0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              color: "#b91c1c",
              fontSize: "13.5px",
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "600",
              position: "relative",
              zIndex: 2,
            }}
          >
            {error}
          </div>
        )}

        {resendSuccess && (
          <div
            style={{
              padding: "13px 16px",
              borderRadius: "16px",
              background: "rgba(236, 253, 245, 0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              color: "#047857",
              fontSize: "13.5px",
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "600",
              position: "relative",
              zIndex: 2,
            }}
          >
            {resendSuccess}
          </div>
        )}

        {/* Step 1: Account Information */}
        {!otpStep ? (
          <form onSubmit={handleSubmit(onSendOtp)} style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative", zIndex: 2 }}>
            {/* Full Name */}
            <div>
              <label style={{ fontSize: "14px", fontWeight: "700", color: "#09132b", display: "block", marginBottom: "8px" }}>
                Nom et Prénom
              </label>
              <div style={{ position: "relative" }}>
                <User size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                <input
                  type="text"
                  placeholder="Ex : Salem Imorou"
                  {...register("name")}
                  style={{
                    width: "100%",
                    padding: "15px 18px 15px 48px",
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.32)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: errors.name ? "1.5px solid #ef4444" : "1.5px solid rgba(255, 255, 255, 0.8)",
                    boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.7), 0 2px 8px rgba(0, 30, 80, 0.03)",
                    color: "#09132b",
                    fontSize: "15px",
                    fontWeight: "500",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                />
              </div>
              {errors.name && <p style={{ fontSize: "12px", color: "#dc2626", marginTop: "5px", fontWeight: "600" }}>{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize: "14px", fontWeight: "700", color: "#09132b", display: "block", marginBottom: "8px" }}>
                Adresse Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                <input
                  type="email"
                  placeholder="imorousalem8@gmail.com"
                  {...register("email")}
                  style={{
                    width: "100%",
                    padding: "15px 18px 15px 48px",
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.32)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: errors.email ? "1.5px solid #ef4444" : "1.5px solid rgba(255, 255, 255, 0.8)",
                    boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.7), 0 2px 8px rgba(0, 30, 80, 0.03)",
                    color: "#09132b",
                    fontSize: "15px",
                    fontWeight: "500",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                />
              </div>
              {errors.email && <p style={{ fontSize: "12px", color: "#dc2626", marginTop: "5px", fontWeight: "600" }}>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: "14px", fontWeight: "700", color: "#09132b", display: "block", marginBottom: "8px" }}>
                Mot de Passe (6 caractères min.)
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  style={{
                    width: "100%",
                    padding: "15px 48px 15px 48px",
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.32)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: errors.password ? "1.5px solid #ef4444" : "1.5px solid rgba(255, 255, 255, 0.8)",
                    boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.7), 0 2px 8px rgba(0, 30, 80, 0.03)",
                    color: "#09132b",
                    fontSize: "15px",
                    fontWeight: "500",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "#64748b",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p style={{ fontSize: "12px", color: "#dc2626", marginTop: "5px", fontWeight: "600" }}>{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "10px",
                padding: "16px 24px",
                borderRadius: "20px",
                background: "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)",
                boxShadow: "0 12px 28px -4px rgba(37, 99, 235, 0.45), inset 0 1px 1.5px rgba(255, 255, 255, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "16px",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "all 0.2s ease",
              }}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <span>Continuer</span>}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={onVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: "18px", position: "relative", zIndex: 2 }}>
            <div>
              <label style={{ fontSize: "14px", fontWeight: "700", color: "#09132b", display: "block", marginBottom: "8px" }}>
                Code de validation à 6 chiffres
              </label>
              <div style={{ position: "relative" }}>
                <KeyRound size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "15px 18px 15px 48px",
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "2px solid #2563eb",
                    boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.7), 0 2px 10px rgba(37, 99, 235, 0.1)",
                    color: "#09132b",
                    fontSize: "22px",
                    letterSpacing: "0.25em",
                    fontWeight: "800",
                    outline: "none",
                    textAlign: "center",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otpCode.length < 6}
              style={{
                marginTop: "6px",
                padding: "16px 24px",
                borderRadius: "20px",
                background: "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)",
                boxShadow: "0 12px 28px -4px rgba(37, 99, 235, 0.45), inset 0 1px 1.5px rgba(255, 255, 255, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "16px",
                cursor: otpCode.length === 6 ? "pointer" : "not-allowed",
                opacity: otpCode.length === 6 ? 1 : 0.6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "all 0.2s ease",
              }}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <span>Valider et Accéder à AlarmAgenda</span>}
            </button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px" }}>
              <button
                type="button"
                onClick={() => setOtpStep(false)}
                style={{ background: "transparent", border: "none", color: "#64748b", fontSize: "13.5px", cursor: "pointer", fontWeight: "600" }}
              >
                Modifier mes informations
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || loading}
                style={{
                  background: "transparent",
                  border: "none",
                  color: resendCooldown > 0 ? "#94a3b8" : "#2563eb",
                  fontSize: "13.5px",
                  fontWeight: "700",
                  cursor: resendCooldown > 0 ? "default" : "pointer",
                }}
              >
                {resendCooldown > 0 ? `Renvoyer (${resendCooldown}s)` : "Renvoyer le code"}
              </button>
            </div>
          </form>
        )}

        {/* Footer link to Login */}
        <div style={{ marginTop: "28px", textAlign: "center", position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0, fontWeight: "500" }}>
            Déjà un compte ?{" "}
            <Link href="/login" style={{ color: "#2563eb", fontWeight: "700", textDecoration: "none" }}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

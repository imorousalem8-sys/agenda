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
        background: "linear-gradient(135deg, #f0f4ff 0%, #e2ecfd 50%, #f8fafc 100%)",
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
      {/* Background ambient halos */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "650px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(147, 197, 253, 0.12) 50%, transparent 75%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Brand Header */}
      <div style={{ position: "relative", zIndex: 2, marginBottom: "28px", textAlign: "center" }}>
        <Link href="/" style={{ textDecoration: "none", display: "inline-block" }}>
          <Logo size={38} showText={true} />
        </Link>
      </div>

      {/* Main Registration Card - Pure Frosted White Glass Style */}
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(255, 255, 255, 0.68)",
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.85)",
          borderRadius: "28px",
          boxShadow: "0 25px 65px rgba(30, 58, 138, 0.09), 0 4px 12px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
          padding: "38px 32px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#09132b", letterSpacing: "-0.02em" }}>
            {otpStep ? "Vérification de sécurité" : "Créer votre compte"}
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", marginTop: "6px" }}>
            {otpStep
              ? `Un code de confirmation a été envoyé à ${pendingRegData?.email}`
              : "Rejoignez AlarmAgenda et pilotez vos journées à la voix"}
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "12px",
              background: "rgba(254, 242, 242, 0.9)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#b91c1c",
              fontSize: "13px",
              marginBottom: "18px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {error}
          </div>
        )}

        {resendSuccess && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "12px",
              background: "rgba(236, 253, 245, 0.9)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#047857",
              fontSize: "13px",
              marginBottom: "18px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {resendSuccess}
          </div>
        )}

        {/* Step 1: Account Information */}
        {!otpStep ? (
          <form onSubmit={handleSubmit(onSendOtp)} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* Full Name */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", display: "block", marginBottom: "6px" }}>
                Nom et Prénom
              </label>
              <div style={{ position: "relative" }}>
                <User size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                <input
                  type="text"
                  placeholder="Ex : Salem Imorou"
                  {...register("name")}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 40px",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(12px)",
                    border: errors.name ? "1.5px solid #ef4444" : "1px solid rgba(203, 213, 225, 0.85)",
                    color: "#09132b",
                    fontSize: "14.5px",
                    outline: "none",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)",
                  }}
                />
              </div>
              {errors.name && <p style={{ fontSize: "12px", color: "#dc2626", marginTop: "4px", fontWeight: "500" }}>{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", display: "block", marginBottom: "6px" }}>
                Adresse Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                <input
                  type="email"
                  placeholder="nom@exemple.com"
                  {...register("email")}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 40px",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(12px)",
                    border: errors.email ? "1.5px solid #ef4444" : "1px solid rgba(203, 213, 225, 0.85)",
                    color: "#09132b",
                    fontSize: "14.5px",
                    outline: "none",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)",
                  }}
                />
              </div>
              {errors.email && <p style={{ fontSize: "12px", color: "#dc2626", marginTop: "4px", fontWeight: "500" }}>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", display: "block", marginBottom: "6px" }}>
                Mot de Passe (6 caractères min.)
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 40px",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(12px)",
                    border: errors.password ? "1.5px solid #ef4444" : "1px solid rgba(203, 213, 225, 0.85)",
                    color: "#09132b",
                    fontSize: "14.5px",
                    outline: "none",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "#64748b",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p style={{ fontSize: "12px", color: "#dc2626", marginTop: "4px", fontWeight: "500" }}>{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "10px",
                padding: "14px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow: "0 8px 25px rgba(37, 99, 235, 0.35)",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "15px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <span>Continuer</span>}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={onVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", display: "block", marginBottom: "6px" }}>
                Code de validation à 6 chiffres
              </label>
              <div style={{ position: "relative" }}>
                <KeyRound size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "13px 14px 13px 40px",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(12px)",
                    border: "2px solid #2563eb",
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
                padding: "14px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow: "0 8px 25px rgba(37, 99, 235, 0.35)",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "15px",
                border: "none",
                cursor: otpCode.length === 6 ? "pointer" : "not-allowed",
                opacity: otpCode.length === 6 ? 1 : 0.6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <span>Valider et Accéder à AlarmAgenda</span>}
            </button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
              <button
                type="button"
                onClick={() => setOtpStep(false)}
                style={{ background: "transparent", border: "none", color: "#64748b", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}
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
                  fontSize: "13px",
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
        <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid rgba(226, 232, 240, 0.8)", textAlign: "center" }}>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
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

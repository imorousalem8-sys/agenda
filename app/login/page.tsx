"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations";
import {
  Lock,
  Mail,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import Logo from "@/components/brand/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"LOGIN" | "FORGOT" | "RESET">("LOGIN");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onLogin = async (data: LoginInput) => {
    setLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        email: data.email.toLowerCase().trim(),
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou mot de passe incorrect. Vérifiez vos identifiants.");
        setLoading(false);
      } else {
        window.location.href = "/dashboard";
      }
    } catch {
      setError("Erreur inattendue lors de la connexion.");
      setLoading(false);
    }
  };

  const onForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes("@")) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    setLoading(true);
    setError("");
    setForgotSuccess("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Impossible d'envoyer le code de réinitialisation.");
        setLoading(false);
        return;
      }

      setResetCode("");
      setForgotSuccess("Un code de confirmation vous a été envoyé par email !");
      setMode("RESET");
      setLoading(false);
    } catch {
      setError("Erreur réseau lors de la demande de réinitialisation.");
      setLoading(false);
    }
  };

  const onResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !resetCode || !newPassword) {
      setError("Veuillez renseigner tous les champs.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Le nouveau mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: forgotEmail.trim(),
          code: resetCode.trim(),
          newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de la réinitialisation.");
        setLoading(false);
        return;
      }

      await signIn("credentials", {
        email: forgotEmail.trim(),
        password: newPassword,
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
        background: "linear-gradient(180deg, #070d1e 0%, #0a1432 50%, #060a17 100%)",
        color: "#ffffff",
        fontFamily: "'Inter', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(56, 189, 248, 0.1) 50%, transparent 75%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Brand Header */}
      <div style={{ position: "relative", zIndex: 2, marginBottom: "28px", textAlign: "center" }}>
        <Link href="/" style={{ textDecoration: "none", display: "inline-block" }}>
          <Logo size={36} showText={true} />
        </Link>
      </div>

      {/* Main Login Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(13, 27, 62, 0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(56, 189, 248, 0.3)",
          borderRadius: "24px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(37, 99, 235, 0.2)",
          padding: "36px 32px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
            {mode === "LOGIN"
              ? "Connexion à votre espace"
              : mode === "FORGOT"
              ? "Mot de passe oublié"
              : "Nouveau mot de passe"}
          </h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>
            {mode === "LOGIN"
              ? "Accédez à votre agenda et copilote IA"
              : mode === "FORGOT"
              ? "Entrez votre email pour recevoir un code de récupération"
              : "Saisissez votre code à 6 chiffres et votre nouveau mot de passe"}
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              color: "#fca5a5",
              fontSize: "13px",
              marginBottom: "18px",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {error}
          </div>
        )}

        {forgotSuccess && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              color: "#6ee7b7",
              fontSize: "13px",
              marginBottom: "18px",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {forgotSuccess}
          </div>
        )}

        {/* 1. Mode LOGIN */}
        {mode === "LOGIN" && (
          <form onSubmit={handleSubmit(onLogin)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "12.5px", fontWeight: "700", color: "#cbd5e1", display: "block", marginBottom: "6px" }}>
                Adresse Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="email"
                  placeholder="nom@exemple.com"
                  {...register("email")}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 40px",
                    borderRadius: "12px",
                    background: "rgba(6, 11, 27, 0.8)",
                    border: errors.email ? "1.5px solid #ef4444" : "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>
              {errors.email && <p style={{ fontSize: "11.5px", color: "#f87171", marginTop: "4px" }}>{errors.email.message}</p>}
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <label style={{ fontSize: "12.5px", fontWeight: "700", color: "#cbd5e1" }}>
                  Mot de Passe
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setMode("FORGOT");
                  }}
                  style={{ background: "transparent", border: "none", color: "#38bdf8", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 40px",
                    borderRadius: "12px",
                    background: "rgba(6, 11, 27, 0.8)",
                    border: errors.password ? "1.5px solid #ef4444" : "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
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
                    color: "#94a3b8",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p style={{ fontSize: "11.5px", color: "#f87171", marginTop: "4px" }}>{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "10px",
                padding: "13px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow: "0 6px 20px rgba(37, 99, 235, 0.4)",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "14.5px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <span>Se connecter</span>}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>
        )}

        {/* 2. Mode FORGOT */}
        {mode === "FORGOT" && (
          <form onSubmit={onForgotSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "12.5px", fontWeight: "700", color: "#cbd5e1", display: "block", marginBottom: "6px" }}>
                Adresse Email de récupération
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="email"
                  placeholder="nom@exemple.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 40px",
                    borderRadius: "12px",
                    background: "rgba(6, 11, 27, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "6px",
                padding: "13px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow: "0 6px 20px rgba(37, 99, 235, 0.4)",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "14.5px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <span>Recevoir le code</span>}
            </button>

            <button
              type="button"
              onClick={() => {
                setError("");
                setMode("LOGIN");
              }}
              style={{ background: "transparent", border: "none", color: "#94a3b8", fontSize: "12.5px", cursor: "pointer", marginTop: "4px" }}
            >
              ← Retour à la connexion
            </button>
          </form>
        )}

        {/* 3. Mode RESET */}
        {mode === "RESET" && (
          <form onSubmit={onResetSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#cbd5e1", display: "block", marginBottom: "4px" }}>
                Code à 6 chiffres
              </label>
              <div style={{ position: "relative" }}>
                <KeyRound size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ""))}
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 40px",
                    borderRadius: "12px",
                    background: "rgba(6, 11, 27, 0.8)",
                    border: "1.5px solid #38bdf8",
                    color: "#ffffff",
                    fontSize: "18px",
                    letterSpacing: "0.2em",
                    fontWeight: "800",
                    outline: "none",
                    textAlign: "center",
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#cbd5e1", display: "block", marginBottom: "4px" }}>
                Nouveau mot de passe
              </label>
              <input
                type="password"
                placeholder="6 caractères min."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "12px",
                  background: "rgba(6, 11, 27, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#cbd5e1", display: "block", marginBottom: "4px" }}>
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                placeholder="Retapez le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "12px",
                  background: "rgba(6, 11, 27, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "6px",
                padding: "13px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow: "0 6px 20px rgba(37, 99, 235, 0.4)",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "14.5px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <span>Réinitialiser et Se Connecter</span>}
            </button>
          </form>
        )}

        {/* Footer link to Register */}
        <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", textAlign: "center" }}>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
            Pas encore de compte ?{" "}
            <Link href="/register" style={{ color: "#38bdf8", fontWeight: "700", textDecoration: "none" }}>
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

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
        width: "100%",
        backgroundImage: "url('/images/auth-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "#09132b",
        fontFamily: "'Inter', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        position: "relative",
      }}
    >
      {/* Brand Header */}
      <div style={{ position: "relative", zIndex: 2, marginBottom: "20px", textAlign: "center" }}>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            padding: "8px 24px",
            borderRadius: "999px",
            border: "1.5px solid rgba(255, 255, 255, 1)",
            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Logo size={36} showText={true} theme="light" />
        </Link>
      </div>

      {/* Main Login Card - 3D Ultra Liquid Frosted Glass Style */}
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          border: "1.5px solid rgba(255, 255, 255, 0.95)",
          borderRadius: "36px",
          boxShadow: "0 35px 80px rgba(0, 0, 0, 0.28), 0 10px 30px rgba(0, 0, 0, 0.12), inset 0 2px 3px rgba(255, 255, 255, 0.95), inset 0 -2px 5px rgba(255, 255, 255, 0.4)",
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
            background: "linear-gradient(125deg, transparent 38%, rgba(255, 255, 255, 0.45) 48%, rgba(255, 255, 255, 0.05) 54%, transparent 62%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div style={{ textAlign: "center", marginBottom: "26px", position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "27px", fontWeight: "900", color: "#09132b", letterSpacing: "-0.03em" }}>
            {mode === "LOGIN"
              ? "Connexion à votre espace"
              : mode === "FORGOT"
              ? "Mot de passe oublié"
              : "Nouveau mot de passe"}
          </h1>
          <p style={{ fontSize: "14px", color: "#475569", marginTop: "6px", fontWeight: "600" }}>
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
              padding: "13px 16px",
              borderRadius: "16px",
              background: "rgba(254, 242, 242, 0.92)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#b91c1c",
              fontSize: "13.5px",
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "700",
              position: "relative",
              zIndex: 2,
            }}
          >
            {error}
          </div>
        )}

        {forgotSuccess && (
          <div
            style={{
              padding: "13px 16px",
              borderRadius: "16px",
              background: "rgba(236, 253, 245, 0.92)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#047857",
              fontSize: "13.5px",
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "700",
              position: "relative",
              zIndex: 2,
            }}
          >
            {forgotSuccess}
          </div>
        )}

        {/* 1. Mode LOGIN */}
        {mode === "LOGIN" && (
          <form onSubmit={handleSubmit(onLogin)} style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative", zIndex: 2 }}>
            <div>
              <label style={{ fontSize: "14px", fontWeight: "700", color: "#09132b", display: "block", marginBottom: "8px" }}>
                Adresse Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#475569" }} />
                <input
                  type="email"
                  placeholder="imorousalem8@gmail.com"
                  {...register("email")}
                  style={{
                    width: "100%",
                    padding: "15px 18px 15px 48px",
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: errors.email ? "1.5px solid #ef4444" : "1.5px solid rgba(255, 255, 255, 0.95)",
                    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.03)",
                    color: "#09132b",
                    fontSize: "15px",
                    fontWeight: "600",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                />
              </div>
              {errors.email && <p style={{ fontSize: "12px", color: "#dc2626", marginTop: "5px", fontWeight: "600" }}>{errors.email.message}</p>}
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "14px", fontWeight: "700", color: "#09132b" }}>
                  Mot de Passe
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setMode("FORGOT");
                  }}
                  style={{ background: "transparent", border: "none", color: "#1d4ed8", fontSize: "13px", fontWeight: "800", cursor: "pointer" }}
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#475569" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  style={{
                    width: "100%",
                    padding: "15px 48px 15px 48px",
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: errors.password ? "1.5px solid #ef4444" : "1.5px solid rgba(255, 255, 255, 0.95)",
                    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.03)",
                    color: "#09132b",
                    fontSize: "15px",
                    fontWeight: "600",
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
                    color: "#475569",
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
              {loading ? <Loader2 size={18} className="animate-spin" /> : <span>Se connecter</span>}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        )}

        {/* 2. Mode FORGOT */}
        {mode === "FORGOT" && (
          <form onSubmit={onForgotSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px", position: "relative", zIndex: 2 }}>
            <div>
              <label style={{ fontSize: "14px", fontWeight: "700", color: "#09132b", display: "block", marginBottom: "8px" }}>
                Adresse Email de récupération
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#475569" }} />
                <input
                  type="email"
                  placeholder="imorousalem8@gmail.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "15px 18px 15px 48px",
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "1.5px solid rgba(255, 255, 255, 0.95)",
                    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.03)",
                    color: "#09132b",
                    fontSize: "15px",
                    fontWeight: "600",
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
                padding: "16px 24px",
                borderRadius: "20px",
                background: "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)",
                boxShadow: "0 12px 28px -4px rgba(37, 99, 235, 0.45), inset 0 1px 1.5px rgba(255, 255, 255, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
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
              style={{ background: "transparent", border: "none", color: "#475569", fontSize: "13.5px", cursor: "pointer", marginTop: "6px", fontWeight: "700" }}
            >
              ← Retour à la connexion
            </button>
          </form>
        )}

        {/* 3. Mode RESET */}
        {mode === "RESET" && (
          <form onSubmit={onResetSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: 2 }}>
            <div>
              <label style={{ fontSize: "14px", fontWeight: "700", color: "#09132b", display: "block", marginBottom: "8px" }}>
                Code à 6 chiffres
              </label>
              <div style={{ position: "relative" }}>
                <KeyRound size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#475569" }} />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ""))}
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "15px 18px 15px 48px",
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "2px solid #2563eb",
                    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.05), 0 2px 10px rgba(37, 99, 235, 0.12)",
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

            <div>
              <label style={{ fontSize: "14px", fontWeight: "700", color: "#09132b", display: "block", marginBottom: "8px" }}>
                Nouveau mot de passe
              </label>
              <input
                type="password"
                placeholder="6 caractères min."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "15px 18px",
                  borderRadius: "20px",
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1.5px solid rgba(255, 255, 255, 0.95)",
                  boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.03)",
                  color: "#09132b",
                  fontSize: "15px",
                  fontWeight: "600",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "14px", fontWeight: "700", color: "#09132b", display: "block", marginBottom: "8px" }}>
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                placeholder="Retapez le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "15px 18px",
                  borderRadius: "20px",
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1.5px solid rgba(255, 255, 255, 0.95)",
                  boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.03)",
                  color: "#09132b",
                  fontSize: "15px",
                  fontWeight: "600",
                  outline: "none",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
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
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <span>Réinitialiser et Se Connecter</span>}
            </button>
          </form>
        )}

        {/* Footer link to Register */}
        <div style={{ marginTop: "28px", textAlign: "center", position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: "14px", color: "#475569", margin: 0, fontWeight: "600" }}>
            Pas encore de compte ?{" "}
            <Link href="/register" style={{ color: "#1d4ed8", fontWeight: "800", textDecoration: "none" }}>
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

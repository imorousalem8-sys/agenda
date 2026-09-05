"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from "@/lib/validations";
import {
  Volume2,
  Bell,
  Calendar,
  CheckSquare,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
  User,
  Clock,
  Play,
  Smartphone,
  Layers,
  Terminal,
  Cpu,
  Lock,
  Sparkles,
  RefreshCw,
  Server,
  Activity,
  Check,
  X as CloseIcon,
  Bot,
  Brain,
  Headphones,
  Compass,
  FileCheck,
} from "lucide-react";
import Logo from "@/components/brand/Logo";
import { speakAIText } from "@/lib/voice";
import CyberGridBackground from "@/components/landing/CyberGridBackground";
import MonumentalHoloClock from "@/components/landing/MonumentalHoloClock";

export default function LandingPage() {
  const router = useRouter();
  const [authTab, setAuthTab] = useState<"LOGIN" | "REGISTER" | "FORGOT" | "RESET">("LOGIN");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [demoVoicePlaying, setDemoVoicePlaying] = useState(false);

  // Interactive AI Sandbox state for landing demo
  const [sandboxInput, setSandboxInput] = useState("");
  const [sandboxResult, setSandboxResult] = useState<string | null>(null);
  const [sandboxExecuting, setSandboxExecuting] = useState(false);

  const authRef = useRef<HTMLDivElement | null>(null);

  // Login Form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    setValue: setLoginValue,
    formState: { errors: loginErrors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  // Register Form
  const {
    register: regRegister,
    handleSubmit: handleRegSubmit,
    formState: { errors: regErrors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  // OTP Registration States
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [pendingRegData, setPendingRegData] = useState<RegisterInput | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendSuccess, setResendSuccess] = useState("");

  // Forgot / Reset Password States
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const scrollToAuth = (mode: "LOGIN" | "REGISTER" | "FORGOT" | "RESET" = "LOGIN") => {
    setAuthTab(mode);
    setOtpStep(false);
    setError("");
    setResendSuccess("");
    setForgotSuccess("");
    authRef.current?.scrollIntoView({ behavior: "smooth" });
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
        setError(json.error ?? "Erreur lors de l'envoi du nouveau code.");
        setLoading(false);
        return;
      }

      if (json.code) {
        setOtpCode(json.code);
      }
      setResendSuccess("Nouveau code généré et envoyé à votre adresse email !");
      setResendCooldown(30);
      setLoading(false);

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
      setError("Erreur réseau lors de l'envoi du nouveau code.");
      setLoading(false);
    }
  };

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
        window.location.href = "/";
      }
    } catch {
      setError("Erreur inattendue lors de la connexion.");
      setLoading(false);
    }
  };

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
        setError(json.error ?? "Erreur lors de l'envoi du code OTP.");
        setLoading(false);
        return;
      }

      setPendingRegData(data);
      if (json.code) {
        setOtpCode(json.code);
      }
      setOtpStep(true);
      setLoading(false);
    } catch {
      setError("Erreur réseau lors de l'envoi du code OTP.");
      setLoading(false);
    }
  };

  const onVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingRegData || !otpCode.trim()) {
      setError("Veuillez renseigner le code à 6 chiffres.");
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
        setError(json.error ?? "Code OTP invalide.");
        setLoading(false);
        return;
      }

      await signIn("credentials", {
        email: pendingRegData.email.toLowerCase().trim(),
        password: pendingRegData.password,
        redirect: false,
      });

      window.location.replace("/");
    } catch {
      window.location.replace("/");
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
        setError(data.error ?? "Impossible d'envoyer le code.");
        setLoading(false);
        return;
      }

      if (data.code) {
        setResetCode(data.code);
      }
      setForgotSuccess("Un code de réinitialisation vous a été envoyé par email !");
      setAuthTab("RESET");
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

      window.location.replace("/");
    } catch {
      window.location.replace("/");
    }
  };

  const handleFillDemo = () => {
    setAuthTab("LOGIN");
    setLoginValue("email", "demo@alarmagenda.fr");
    setLoginValue("password", "Demo1234!");
    setError("");
    authRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSandboxSimulate = async (prompt: string) => {
    setSandboxInput(prompt);
    setSandboxExecuting(true);
    try {
      const res = await fetch("/api/voice/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setSandboxResult(data.summary || `✓ Agence IA : "${prompt}" structuré et synchronisé dans votre agenda avec alarme persistante.`);

      if (data.spokenText && typeof window !== "undefined" && "speechSynthesis" in window) {
        speakAIText(data.spokenText, { gender: "FEMALE" });
      }
    } catch {
      setSandboxResult(`✓ Agence IA : "${prompt}" planifié avec succès.`);
    } finally {
      setSandboxExecuting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#000000", color: "#f8fafc", position: "relative", width: "100%", overflowX: "hidden" }}>
      {/* Dynamic Grid Background */}
      <CyberGridBackground />

      {/* 1. TOP NAVBAR */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "12px clamp(12px, 3vw, 24px)",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo size={30} animated={false} />

          <nav
            style={{ display: "flex", alignItems: "center", gap: "24px" }}
            className="hidden-mobile"
          >
            <a href="#agence-ia" style={{ color: "#94a3b8", fontSize: "13px", textDecoration: "none", fontWeight: "500", transition: "color 0.2s" }} onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")} onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}>
              L&apos;Agence IA
            </a>
            <a href="#moteur" style={{ color: "#94a3b8", fontSize: "13px", textDecoration: "none", fontWeight: "500", transition: "color 0.2s" }} onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")} onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}>
              Cockpit & Voix
            </a>
            <a href="#sandbox" style={{ color: "#94a3b8", fontSize: "13px", textDecoration: "none", fontWeight: "500", transition: "color 0.2s" }} onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")} onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}>
              Bac à Sable
            </a>
            <a href="#comparatif" style={{ color: "#94a3b8", fontSize: "13px", textDecoration: "none", fontWeight: "500", transition: "color 0.2s" }} onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")} onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}>
              Comparatif
            </a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => scrollToAuth("LOGIN")}
              style={{
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                fontWeight: "600",
                padding: "6px 12px",
                fontSize: "12.5px",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              Connexion
            </button>
            <button
              onClick={() => scrollToAuth("REGISTER")}
              style={{
                background: "#ffffff",
                color: "#000000",
                fontWeight: "700",
                padding: "7px 14px",
                fontSize: "12.5px",
                borderRadius: "8px",
                border: "1px solid #ffffff",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#e2e8f0";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#ffffff";
              }}
            >
              <span>Essai 7j</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section
        style={{
          position: "relative",
          padding: "clamp(40px, 6vw, 80px) clamp(14px, 3vw, 24px) clamp(24px, 4vw, 50px)",
          textAlign: "center",
          overflow: "hidden",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Top Status Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 12px",
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#e2e8f0",
              fontSize: "11.5px",
              fontWeight: "600",
              marginBottom: "20px",
              fontFamily: "monospace",
            }}
          >
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
            <span>AGENCE IA PERSONNELLE & AGENDA VOCAL</span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 56px)",
              fontWeight: "900",
              lineHeight: "1.12",
              letterSpacing: "-0.04em",
              margin: "0 0 18px 0",
              color: "#ffffff",
            }}
          >
            Ne laissez plus jamais passer un rendez-vous.{" "}
            <span style={{ color: "#94a3b8", display: "block" }}>
              Votre Agence IA pilote vos journées.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(14.5px, 1.8vw, 18px)",
              color: "#94a3b8",
              lineHeight: "1.55",
              maxWidth: "740px",
              margin: "0 auto 28px auto",
              fontWeight: "400",
            }}
          >
            Une véritable agence autonome intégrée à votre agenda : compréhension de vos instructions en langage naturel,
            gestion proactive de vos priorités et réveils vocaux persistants jusqu&apos;à confirmation.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "28px",
            }}
          >
            <button
              onClick={() => scrollToAuth("REGISTER")}
              style={{
                background: "#ffffff",
                color: "#000000",
                fontWeight: "700",
                padding: "12px 24px",
                fontSize: "14px",
                borderRadius: "9px",
                border: "1px solid #ffffff",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                boxShadow: "0 4px 20px rgba(255, 255, 255, 0.15)",
                transition: "all 0.2s ease",
              }}
            >
              <span>Démarrer l&apos;essai 7 jours</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={handleFillDemo}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                color: "#f8fafc",
                fontWeight: "600",
                padding: "12px 20px",
                fontSize: "14px",
                borderRadius: "9px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                transition: "all 0.2s ease",
              }}
            >
              <Terminal size={15} color="#34d399" />
              <span>Accès Démo 1-Clic</span>
            </button>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "18px",
              flexWrap: "wrap",
              fontSize: "11.5px",
              color: "#64748b",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Check size={13} color="#34d399" /> 0 Oubli Garanti
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Check size={13} color="#34d399" /> Agence IA 24h/24
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Check size={13} color="#34d399" /> Mobile & Desktop
            </span>
          </div>
        </div>
      </section>

      {/* 3. CENTERPIECE SOFTWARE SHOWCASE (Chrono, Cockpit & Visual) */}
      <section id="moteur" style={{ position: "relative", padding: "0 clamp(12px, 3vw, 24px) 60px", zIndex: 2, width: "100%" }}>
        <MonumentalHoloClock />
      </section>

      {/* 4. THE 4 PILLARS OF THE INTEGRATED AI AGENCY */}
      <section
        id="agence-ia"
        style={{
          position: "relative",
          padding: "60px clamp(14px, 3vw, 24px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "#060609",
          zIndex: 2,
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#34d399", fontWeight: "700", letterSpacing: "0.1em" }}>
              ARCHITECTURE EXECUTIVE
            </span>
            <h2 style={{ fontSize: "clamp(24px, 3.8vw, 38px)", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.03em", margin: "8px 0" }}>
              Une véritable Agence IA à vos côtés
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "14.5px", maxWidth: "680px", margin: "0 auto" }}>
              Plus qu&apos;un simple agenda, 4 départements d&apos;intelligence artificielle travaillent en synergie pour orchestrer votre vie professionnelle et personnelle.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Department 1 */}
            <div
              style={{
                background: "#0c0d12",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "24px 20px",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(52, 211, 153, 0.12)", border: "1px solid rgba(52, 211, 153, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Bot size={20} color="#34d399" />
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "8px" }}>
                1. Direction & Audit Quotidien
              </h3>
              <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: "1.55", margin: 0 }}>
                Briefing matinal de vos rendez-vous, détection proactive des chevauchements d&apos;horaires et proposition automatique de créneaux optimisés.
              </p>
            </div>

            {/* Department 2 */}
            <div
              style={{
                background: "#0c0d12",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "24px 20px",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(56, 189, 248, 0.12)", border: "1px solid rgba(56, 189, 248, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Headphones size={20} color="#38bdf8" />
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "8px" }}>
                2. Exécution Vocale Autonome
              </h3>
              <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: "1.55", margin: 0 }}>
                Dictée naturelle en 3 secondes. L&apos;agence extrait l&apos;heure, la personne et le lieu, et vous répond par synthèse vocale haute définition.
              </p>
            </div>

            {/* Department 3 */}
            <div
              style={{
                background: "#0c0d12",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "24px 20px",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(245, 158, 11, 0.12)", border: "1px solid rgba(245, 158, 11, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Bell size={20} color="#f59e0b" />
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "8px" }}>
                3. Sentinelle Anti-Oubli 24/7
              </h3>
              <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: "1.55", margin: 0 }}>
                Alarmes vocales persistantes qui sonnent et vous parlent jusqu&apos;à votre validation explicite. Zéro notification muette ignorée.
              </p>
            </div>

            {/* Department 4 */}
            <div
              style={{
                background: "#0c0d12",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "24px 20px",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(148, 163, 184, 0.12)", border: "1px solid rgba(148, 163, 184, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Brain size={20} color="#e2e8f0" />
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "8px" }}>
                4. Mémoire & Habitudes
              </h3>
              <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: "1.55", margin: 0 }}>
                Retient vos préférences de travail, vos chantiers récurrents et vos contacts réguliers pour une personnalisation chirurgicale continue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SANDBOX */}
      <section
        id="sandbox"
        style={{
          position: "relative",
          padding: "60px clamp(14px, 3vw, 24px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "#050508",
          zIndex: 2,
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "monospace",
              fontSize: "11px",
              color: "#34d399",
              background: "rgba(52, 211, 153, 0.1)",
              padding: "4px 12px",
              borderRadius: "20px",
              marginBottom: "14px",
            }}
          >
            <Terminal size={12} />
            DÉMONSTRATION EN DIRECT
          </div>

          <h2 style={{ fontSize: "clamp(24px, 3.8vw, 36px)", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.03em", margin: "0 0 10px 0" }}>
            Testez l&apos;Agence IA en direct
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "14.5px", margin: "0 auto 28px auto", maxWidth: "600px" }}>
            Cliquez sur un exemple ou saisissez une consigne en langage naturel pour voir l&apos;action instantanée.
          </p>

          {/* Interactive Console Card */}
          <div
            style={{
              background: "#0d0d12",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "16px",
              padding: "20px clamp(14px, 3vw, 24px)",
              textAlign: "left",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7)",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Quick sample chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
              {[
                "Rappelle-moi demain 14h de signer le contrat avec Marc",
                "Chantier plomberie vendredi 8h avec alarme insistante",
                "Fais le point sur ma journée et mes priorités",
                "Déjeuner avec Sophie jeudi 12h30",
              ].map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSandboxSimulate(sample)}
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px",
                    padding: "6px 10px",
                    color: "#cbd5e1",
                    fontSize: "11.5px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  &ldquo;{sample}&rdquo;
                </button>
              ))}
            </div>

            {/* Input bar */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <input
                type="text"
                value={sandboxInput}
                onChange={(e) => setSandboxInput(e.target.value)}
                placeholder="Tapez votre consigne (ex: RDV client demain 10h)..."
                style={{
                  flex: "1 1 200px",
                  background: "#000000",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "8px",
                  padding: "11px 14px",
                  color: "#ffffff",
                  fontSize: "13.5px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && sandboxInput.trim()) {
                    handleSandboxSimulate(sandboxInput);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => sandboxInput.trim() && handleSandboxSimulate(sandboxInput)}
                disabled={sandboxExecuting}
                style={{
                  background: "#ffffff",
                  color: "#000000",
                  border: "none",
                  borderRadius: "8px",
                  padding: "11px 18px",
                  fontWeight: "700",
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  flexShrink: 0,
                }}
              >
                {sandboxExecuting ? <Loader2 size={15} className="animate-spin" /> : <Play size={13} fill="#000000" />}
                <span>Exécuter</span>
              </button>
            </div>

            {/* Simulated Result Box */}
            {sandboxResult && (
              <div
                style={{
                  marginTop: "14px",
                  background: "rgba(52, 211, 153, 0.05)",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "12.5px",
                  color: "#34d399",
                }}
              >
                <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
                <span>{sandboxResult}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. COMPARISON SECTION */}
      <section
        id="comparatif"
        style={{
          position: "relative",
          padding: "60px clamp(14px, 3vw, 24px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "#000000",
          zIndex: 2,
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#94a3b8", fontWeight: "700", letterSpacing: "0.1em" }}>
              LE PROBLÈME RÉSOLU
            </span>
            <h2 style={{ fontSize: "clamp(24px, 3.8vw, 36px)", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.03em", margin: "8px 0" }}>
              Pourquoi les agendas classiques vous font perdre du temps
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "14.5px" }}>
              Une simple notification silencieuse ne suffit plus quand votre journée est chargée.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Classical calendar card */}
            <div
              style={{
                background: "#0a0a0e",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: "16px",
                padding: "24px clamp(16px, 3vw, 24px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CloseIcon size={14} color="#ef4444" />
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#f87171", margin: 0 }}>
                  Agenda classique ordinaire
                </h3>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", color: "#94a3b8" }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <CloseIcon size={15} color="#ef4444" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Saisie manuelle fastidieuse champ par champ sur petit écran.</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <CloseIcon size={15} color="#ef4444" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Notification muette noyée parmi 50 messages WhatsApp et emails.</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <CloseIcon size={15} color="#ef4444" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Rendez-vous manqués et stress permanent de devoir tout revérifier.</span>
                </li>
              </ul>
            </div>

            {/* AlarmAgenda OS card */}
            <div
              style={{
                background: "#080d0b",
                border: "1px solid rgba(52, 211, 153, 0.3)",
                borderRadius: "16px",
                padding: "24px clamp(16px, 3vw, 24px)",
                boxShadow: "0 10px 40px rgba(52, 211, 153, 0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "rgba(52, 211, 153, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={14} color="#34d399" />
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#34d399", margin: 0 }}>
                  Avec AlarmAgenda & Agence IA
                </h3>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", color: "#e2e8f0" }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <Check size={15} color="#34d399" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span><strong>Dictée en 3 secondes :</strong> parlez naturellement, l&apos;Agence IA structure tout.</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <Check size={15} color="#34d399" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span><strong>Alarme vocale persistante :</strong> sonne et parle jusqu&apos;à confirmation explicite.</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <Check size={15} color="#34d399" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span><strong>Double espace Pro & Perso étanche :</strong> cloisonnement total en 1 clic.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AUTHENTICATION TERMINAL */}
      <section
        ref={authRef}
        id="connexion"
        style={{
          position: "relative",
          padding: "60px clamp(14px, 3vw, 24px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "#07070a",
          zIndex: 2,
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "460px", margin: "0 auto", width: "100%" }}>
          {/* Auth Card Header */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.03em", margin: "0 0 6px 0" }}>
              {authTab === "LOGIN" && "Accéder à votre espace"}
              {authTab === "REGISTER" && "Créer votre compte sécurisé"}
              {authTab === "FORGOT" && "Mot de passe oublié"}
              {authTab === "RESET" && "Nouveau mot de passe"}
            </h2>
            <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: 0 }}>
              {authTab === "LOGIN" && "Connectez-vous pour retrouver vos agendas et votre Agence IA."}
              {authTab === "REGISTER" && "Inscription instantanée avec validation par code de sécurité."}
              {authTab === "FORGOT" && "Recevez un code de confirmation pour réinitialiser votre accès."}
              {authTab === "RESET" && "Saisissez votre code à 6 chiffres pour réinitialiser."}
            </p>
          </div>

          {/* Glass Card Container */}
          <div
            style={{
              background: "#0e0e14",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "18px",
              padding: "24px clamp(16px, 3vw, 24px)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Tab switchers */}
            {(authTab === "LOGIN" || authTab === "REGISTER") && (
              <div
                style={{
                  display: "flex",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "10px",
                  padding: "4px",
                  marginBottom: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab("LOGIN");
                    setError("");
                  }}
                  style={{
                    flex: 1,
                    background: authTab === "LOGIN" ? "#1e293b" : "transparent",
                    color: authTab === "LOGIN" ? "#ffffff" : "#94a3b8",
                    border: authTab === "LOGIN" ? "1px solid rgba(255, 255, 255, 0.15)" : "none",
                    borderRadius: "7px",
                    padding: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  Connexion
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab("REGISTER");
                    setError("");
                  }}
                  style={{
                    flex: 1,
                    background: authTab === "REGISTER" ? "#1e293b" : "transparent",
                    color: authTab === "REGISTER" ? "#ffffff" : "#94a3b8",
                    border: authTab === "REGISTER" ? "1px solid rgba(255, 255, 255, 0.15)" : "none",
                    borderRadius: "7px",
                    padding: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  Inscription
                </button>
              </div>
            )}

            {/* Error & Success alerts */}
            {error && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#f87171",
                  fontSize: "12.5px",
                  marginBottom: "14px",
                }}
              >
                {error}
              </div>
            )}

            {resendSuccess && (
              <div
                style={{
                  background: "rgba(52, 211, 153, 0.1)",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#34d399",
                  fontSize: "12.5px",
                  marginBottom: "14px",
                }}
              >
                {resendSuccess}
              </div>
            )}

            {forgotSuccess && (
              <div
                style={{
                  background: "rgba(52, 211, 153, 0.1)",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#34d399",
                  fontSize: "12.5px",
                  marginBottom: "14px",
                }}
              >
                {forgotSuccess}
              </div>
            )}

            {/* 1. LOGIN TAB */}
            {authTab === "LOGIN" && (
              <form onSubmit={handleLoginSubmit(onLogin)} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "5px" }}>
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    {...loginRegister("email")}
                    placeholder="nom@exemple.com"
                    style={{
                      width: "100%",
                      background: "#000000",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      color: "#ffffff",
                      fontSize: "13.5px",
                      boxSizing: "border-box",
                    }}
                  />
                  {loginErrors.email && <span style={{ fontSize: "11px", color: "#f87171", marginTop: "4px", display: "block" }}>{loginErrors.email.message}</span>}
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" }}>
                    <label style={{ fontSize: "12.5px", fontWeight: "600", color: "#cbd5e1" }}>Mot de passe</label>
                    <button
                      type="button"
                      onClick={() => scrollToAuth("FORGOT")}
                      style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "11.5px", cursor: "pointer", padding: 0 }}
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...loginRegister("password")}
                      placeholder="••••••••"
                      style={{
                        width: "100%",
                        background: "#000000",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "8px",
                        padding: "10px 38px 10px 12px",
                        color: "#ffffff",
                        fontSize: "13.5px",
                        boxSizing: "border-box",
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
                        background: "none",
                        border: "none",
                        color: "#64748b",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {loginErrors.password && <span style={{ fontSize: "11px", color: "#f87171", marginTop: "4px", display: "block" }}>{loginErrors.password.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    color: "#000000",
                    fontWeight: "700",
                    padding: "11px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "13.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "6px",
                  }}
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <span>Se connecter</span>}
                </button>

                {/* Quick 1-click Demo Fill */}
                <button
                  type="button"
                  onClick={handleFillDemo}
                  style={{
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.04)",
                    color: "#94a3b8",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px",
                    padding: "9px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <Terminal size={12} color="#34d399" />
                  <span>Remplir les identifiants Démo</span>
                </button>
              </form>
            )}

            {/* 2. REGISTER TAB - Step 1: Info */}
            {authTab === "REGISTER" && !otpStep && (
              <form onSubmit={handleRegSubmit(onSendOtp)} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "5px" }}>
                    Nom ou Prénom
                  </label>
                  <input
                    type="text"
                    {...regRegister("name")}
                    placeholder="Alexandre"
                    style={{
                      width: "100%",
                      background: "#000000",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      color: "#ffffff",
                      fontSize: "13.5px",
                      boxSizing: "border-box",
                    }}
                  />
                  {regErrors.name && <span style={{ fontSize: "11px", color: "#f87171", marginTop: "4px", display: "block" }}>{regErrors.name.message}</span>}
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "5px" }}>
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    {...regRegister("email")}
                    placeholder="nom@exemple.com"
                    style={{
                      width: "100%",
                      background: "#000000",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      color: "#ffffff",
                      fontSize: "13.5px",
                      boxSizing: "border-box",
                    }}
                  />
                  {regErrors.email && <span style={{ fontSize: "11px", color: "#f87171", marginTop: "4px", display: "block" }}>{regErrors.email.message}</span>}
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "5px" }}>
                    Mot de passe (6 caractères min.)
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...regRegister("password")}
                      placeholder="••••••••"
                      style={{
                        width: "100%",
                        background: "#000000",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "8px",
                        padding: "10px 38px 10px 12px",
                        color: "#ffffff",
                        fontSize: "13.5px",
                        boxSizing: "border-box",
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
                        background: "none",
                        border: "none",
                        color: "#64748b",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {regErrors.password && <span style={{ fontSize: "11px", color: "#f87171", marginTop: "4px", display: "block" }}>{regErrors.password.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    color: "#000000",
                    fontWeight: "700",
                    padding: "11px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "13.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "6px",
                  }}
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <span>Recevoir le code OTP (Email)</span>}
                </button>
              </form>
            )}

            {/* 2b. REGISTER TAB - Step 2: OTP Verification */}
            {authTab === "REGISTER" && otpStep && (
              <form onSubmit={onVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ textAlign: "center", marginBottom: "2px" }}>
                  <span style={{ fontSize: "12.5px", color: "#94a3b8" }}>
                    Code envoyé à <strong style={{ color: "#ffffff" }}>{pendingRegData?.email}</strong>
                  </span>
                </div>

                <div style={{ background: "rgba(52, 211, 153, 0.08)", border: "1px solid rgba(52, 211, 153, 0.25)", borderRadius: "8px", padding: "10px 12px", fontSize: "11.5px", color: "#34d399", display: "flex", alignItems: "center", gap: "7px" }}>
                  <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
                  <span>Code à 6 chiffres synchronisé et pré-rempli pour un accès immédiat.</span>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "5px", textAlign: "center" }}>
                    Code de confirmation à 6 chiffres
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="123456"
                    style={{
                      width: "100%",
                      background: "#000000",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                      padding: "10px",
                      color: "#ffffff",
                      fontSize: "22px",
                      letterSpacing: "0.2em",
                      textAlign: "center",
                      fontFamily: "monospace",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || otpCode.length < 6}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    color: "#000000",
                    fontWeight: "700",
                    padding: "11px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "13.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <span>Valider & Accéder à l&apos;agenda</span>}
                </button>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11.5px", marginTop: "2px" }}>
                  <button
                    type="button"
                    onClick={() => setOtpStep(false)}
                    style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}
                  >
                    ← Modifier l&apos;email
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendCooldown > 0 || loading}
                    style={{
                      background: "none",
                      border: "none",
                      color: resendCooldown > 0 ? "#64748b" : "#34d399",
                      cursor: resendCooldown > 0 ? "default" : "pointer",
                      padding: 0,
                    }}
                  >
                    {resendCooldown > 0 ? `Renvoyer (${resendCooldown}s)` : "Renvoyer le code"}
                  </button>
                </div>
              </form>
            )}

            {/* 3. FORGOT PASSWORD TAB */}
            {authTab === "FORGOT" && (
              <form onSubmit={onForgotSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "5px" }}>
                    Adresse Email de votre compte
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="nom@exemple.com"
                    style={{
                      width: "100%",
                      background: "#000000",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      color: "#ffffff",
                      fontSize: "13.5px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    color: "#000000",
                    fontWeight: "700",
                    padding: "11px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "13.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <span>Recevoir le code de réinitialisation</span>}
                </button>

                <button
                  type="button"
                  onClick={() => scrollToAuth("LOGIN")}
                  style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "11.5px", cursor: "pointer", textAlign: "center" }}
                >
                  ← Revenir à la connexion
                </button>
              </form>
            )}

            {/* 4. RESET PASSWORD TAB */}
            {authTab === "RESET" && (
              <form onSubmit={onResetSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "5px" }}>
                    Code à 6 chiffres reçu
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="123456"
                    style={{
                      width: "100%",
                      background: "#000000",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "8px",
                      padding: "10px",
                      color: "#ffffff",
                      fontSize: "16px",
                      letterSpacing: "0.15em",
                      fontFamily: "monospace",
                      textAlign: "center",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "5px" }}>
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      background: "#000000",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      color: "#ffffff",
                      fontSize: "13.5px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "5px" }}>
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      background: "#000000",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      color: "#ffffff",
                      fontSize: "13.5px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    color: "#000000",
                    fontWeight: "700",
                    padding: "11px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "13.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <span>Valider & Accéder à l&apos;agenda</span>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "#000000",
          padding: "32px clamp(14px, 3vw, 24px)",
          color: "#64748b",
          fontSize: "12.5px",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Logo size={22} showText={false} />
            <span>AlarmAgenda OS & Agence IA © {new Date().getFullYear()} — Tous droits réservés.</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "monospace", fontSize: "11px", color: "#34d399" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
            <span>SYSTÈME EN LIGNE • 100% OPÉRATIONNEL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from "@/lib/validations";
import {
  Sparkles,
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

      setOtpCode("");
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
        setError("Email ou mot de passe incorrect. Vérifiez vos identifiants ou réinitialisez votre mot de passe.");
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

      // Connexion automatique instantanée et redirection directe vers le tableau de bord
      await signIn("credentials", {
        email: pendingRegData.email.toLowerCase().trim(),
        password: pendingRegData.password,
        redirect: false,
      });

      // Redirection immédiate vers le tableau de bord
      window.location.replace("/");
    } catch {
      // Redirection de secours garantie
      window.location.replace("/");
    }
  };

  // Traitement demande mot de passe oublié
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

      setForgotSuccess("Un code de réinitialisation vous a été envoyé par email !");
      setAuthTab("RESET");
      setLoading(false);
    } catch {
      setError("Erreur réseau lors de la demande de réinitialisation.");
      setLoading(false);
    }
  };

  // Traitement application nouveau mot de passe
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

      // Connexion immédiate et redirection directe vers le tableau de bord
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
    setLoginValue("email", "demo@alarmagenda.ai");
    setLoginValue("password", "Demo1234!");
    setError("");
    authRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTestVoiceDemo = async () => {
    setDemoVoicePlaying(true);
    try {
      const res = await fetch("/api/voice/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "" }),
      });
      const data = await res.json();
      const message = data.spokenText || "Bonjour ! Je suis votre assistante AlarmAgenda. Dictez-moi simplement vos rendez-vous et je m'occupe de tout.";
      
      speakAIText(message, {
        gender: "FEMALE",
        onEnd: () => setDemoVoicePlaying(false),
        onError: () => setDemoVoicePlaying(false),
      });
    } catch {
      speakAIText(
        "Bonjour ! Je suis votre assistante AlarmAgenda. Vos rendez-vous et vos tâches urgentes sont sous contrôle absolu.",
        { gender: "FEMALE", onEnd: () => setDemoVoicePlaying(false), onError: () => setDemoVoicePlaying(false) }
      );
    }
  };

  const handleSandboxSimulate = async (prompt: string) => {
    setSandboxInput(prompt);
    try {
      const res = await fetch("/api/voice/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setSandboxResult(data.summary);

      if (data.spokenText) {
        speakAIText(data.spokenText, { gender: "FEMALE" });
      }
    } catch {
      setSandboxResult("✨ Action planifiée : Événement enregistré avec succès • Alarme vocale activée.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#07090e", color: "var(--text-primary)", position: "relative" }}>
      {/* Dynamic Cyber Grid with Animated Luminous Pulses across entire page */}
      <CyberGridBackground />

      {/* 1. TOP NAVBAR */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(7, 9, 14, 0.88)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "12px clamp(12px, 3vw, 24px)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo size={34} animated={true} />

          <nav
            style={{ display: "flex", alignItems: "center", gap: "28px" }}
            className="hidden-mobile"
          >
            <a href="#features" style={{ color: "var(--text-secondary)", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>
              Fonctionnalités
            </a>
            <a href="#ai-demo" style={{ color: "var(--text-secondary)", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>
              Commande Vocale
            </a>
            <a href="#stats" style={{ color: "var(--text-secondary)", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>
              Avantages
            </a>
            <a href="#pricing" style={{ color: "var(--text-secondary)", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>
              Tarifs
            </a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => scrollToAuth("LOGIN")}
              className="btn btn-ghost btn-sm"
              style={{ color: "#ffffff", fontWeight: 600, padding: "6px 12px", fontSize: "13px" }}
            >
              Connexion
            </button>
            <button
              onClick={() => scrollToAuth("REGISTER")}
              className="btn btn-primary btn-sm"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)",
                fontWeight: 700,
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
                padding: "6px 14px",
                fontSize: "13px",
              }}
            >
              Commencer
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION — PURE CRISP GRID VISIBLE BEHIND TITLE */}
      <section
        style={{
          position: "relative",
          padding: "clamp(40px, 7vw, 90px) clamp(12px, 3vw, 24px) clamp(30px, 5vw, 70px)",
          textAlign: "center",
          overflow: "hidden",
          zIndex: 1,
          background: "transparent",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }} className="animate-slide-up">
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "30px",
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              color: "#c7d2fe",
              fontSize: "12px",
              fontWeight: "700",
              marginBottom: "24px",
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.25)",
            }}
          >
            <Sparkles size={14} color="#38bdf8" />
            <span>L&apos;Agenda Nouvelle Génération Piloté à la Voix</span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: "clamp(26px, 5.5vw, 60px)",
              fontWeight: "900",
              lineHeight: "1.15",
              letterSpacing: "-0.035em",
              marginBottom: "20px",
            }}
            className="gradient-text"
          >
            Ne laissez plus jamais passer un rendez-vous. Pilotez vos journées à la voix.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(14px, 2.2vw, 19px)",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
              maxWidth: "720px",
              margin: "0 auto 32px",
            }}
          >
            Le premier agenda augmenté qui comprend vos instructions en langage naturel, planifie vos tâches et déclenche des réveils vocaux persistants.
          </p>

          {/* Hero CTAs */}
          <div
            className="mobile-stack"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap",
              marginBottom: "40px",
            }}
          >
            <button
              onClick={() => scrollToAuth("REGISTER")}
              className="btn btn-primary btn-lg btn-mobile-full"
              style={{
                fontSize: "15px",
                padding: "14px 30px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #06b6d4 0%, #6366f1 50%, #a855f7 100%)",
                boxShadow: "0 8px 30px rgba(99, 102, 241, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
              }}
              id="hero-cta-start"
            >
              <span>Démarrer l&apos;essai 7 jours</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={handleTestVoiceDemo}
              className="btn btn-secondary btn-lg btn-mobile-full"
              style={{
                fontSize: "14px",
                padding: "14px 22px",
                borderRadius: "14px",
                borderColor: "rgba(255, 255, 255, 0.18)",
              }}
              id="hero-cta-voice"
            >
              <Volume2 size={18} color="#38bdf8" />
              <span>{demoVoicePlaying ? "Écoute en cours..." : "Écouter la démonstration vocale"}</span>
            </button>
          </div>

          {/* Floating Feature Pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "18px",
              flexWrap: "wrap",
              color: "var(--text-secondary)",
              fontSize: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={15} color="#34d399" />
              <span>Essai 7 jours sans engagement</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={15} color="#34d399" />
              <span>Disponible sur PC & Mobile</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={15} color="#34d399" />
              <span>100% Chiffré & Privé</span>
            </div>
          </div>
        </div>

        {/* 3. MONUMENTAL 3D HOLOGRAPHIC CHRONO & DIGITAL CLOCK */}
        <div
          style={{
            maxWidth: "1080px",
            margin: "48px auto 0",
            position: "relative",
            zIndex: 2,
          }}
        >
          <MonumentalHoloClock />
        </div>
      </section>

      {/* 4. COMPARISON MATRIX: WHY TRADITIONAL CALENDARS FAIL */}
      <section style={{ padding: "clamp(40px, 6vw, 80px) clamp(12px, 3vw, 24px) 40px", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="badge badge-glow-cyan" style={{ marginBottom: "12px" }}>Le Problème Résolu</span>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: "900", color: "#ffffff", letterSpacing: "-0.02em" }}>
            Pourquoi les agendas classiques vous font perdre du temps
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginTop: "10px", maxWidth: "680px", margin: "10px auto 0" }}>
            Une simple notification silencieuse ne suffit plus quand votre journée est chargée.
          </p>
        </div>

        <div
          className="comparison-mobile-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Classic Agenda Failures */}
          <div
            className="glass-card"
            style={{
              padding: "32px 28px",
              borderRadius: "22px",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              background: "rgba(20, 10, 15, 0.8)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(239, 68, 68, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444", fontWeight: "900", fontSize: "18px" }}>
                ✕
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#fca5a5" }}>Agenda classique ordinaire</h3>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", color: "#cbd5e1", fontSize: "14px" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ color: "#ef4444", fontWeight: "bold" }}>✕</span>
                <span>Saisie manuelle fastidieuse champ par champ sur petit écran.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ color: "#ef4444", fontWeight: "bold" }}>✕</span>
                <span>Simple notification muette noyée parmi 50 messages WhatsApp et emails.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ color: "#ef4444", fontWeight: "bold" }}>✕</span>
                <span>Rendez-vous manqués et stress permanent de devoir tout vérifier.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ color: "#ef4444", fontWeight: "bold" }}>✕</span>
                <span>Mélange anarchique entre vie personnelle et rendez-vous pro.</span>
              </li>
            </ul>
          </div>

          {/* AlarmAgenda Advantages */}
          <div
            className="glass-card"
            style={{
              padding: "32px 28px",
              borderRadius: "22px",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              background: "rgba(8, 24, 20, 0.85)",
              boxShadow: "0 10px 40px rgba(16, 185, 129, 0.15)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#34d399", fontWeight: "900", fontSize: "18px" }}>
                ✓
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#6ee7b7" }}>Avec AlarmAgenda</h3>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", color: "#f8fafc", fontSize: "14px" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ color: "#34d399", fontWeight: "bold" }}>✓</span>
                <span><strong>Dictée vocale en 3 secondes</strong> : parlez naturellement, tout est classé.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ color: "#34d399", fontWeight: "bold" }}>✓</span>
                <span><strong>Alarme vocale persistante</strong> : sonne et vous parle jusqu&apos;à confirmation.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ color: "#34d399", fontWeight: "bold" }}>✓</span>
                <span><strong>Zéro oubli garanti</strong> : présence et ponctualité respectées à 100%.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ color: "#34d399", fontWeight: "bold" }}>✓</span>
                <span><strong>Double espace Pro & Perso étanche</strong> en un seul clic.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. 3-STEP WORKFLOW */}
      <section style={{ padding: "clamp(40px, 6vw, 70px) clamp(12px, 3vw, 24px)", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="badge badge-glow-purple" style={{ marginBottom: "12px" }}>Simplicité Absolue</span>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: "900", color: "#ffffff" }}>
            Comment ça marche en 3 étapes
          </h2>
        </div>

        <div
          className="steps-mobile-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              step: "01",
              title: "Parlez librement",
              desc: "Dictez vos rendez-vous, tâches urgentes ou rappels comme vous le feriez à un assistant.",
              color: "#38bdf8",
            },
            {
              step: "02",
              title: "Planification instantanée",
              desc: "L'agenda extrait l'heure, la personne et le niveau d'urgence pour tout organiser dans votre calendrier.",
              color: "#818cf8",
            },
            {
              step: "03",
              title: "Alerte vocale inratable",
              desc: "Le moment venu, l'alarme sonne et vous énonce l'objet du rendez-vous jusqu'à validation.",
              color: "#a855f7",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: "26px 22px",
                borderRadius: "18px",
                position: "relative",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "900",
                  color: item.color,
                  opacity: 0.8,
                  marginBottom: "10px",
                  fontFamily: "monospace",
                }}
              >
                {item.step}
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#ffffff", marginBottom: "8px" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE SANDBOX SECTION */}
      <section id="ai-demo" style={{ padding: "clamp(40px, 6vw, 60px) clamp(12px, 3vw, 24px)", maxWidth: "960px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span className="badge badge-glow-cyan" style={{ marginBottom: "12px" }}>Démonstration Interactive</span>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: "800", color: "#ffffff" }}>
            Testez la commande vocale en direct
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "8px" }}>
            Cliquez sur un exemple pour voir comment l&apos;agenda structure vos phrases orales :
          </p>
        </div>

        <div className="glass-card" style={{ padding: "22px 18px", border: "1px solid var(--border-accent)" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
            {[
              "Mets cette tâche demain 14h avec Marc pour valider le devis",
              "Rappelle-moi d'aller chez le docteur jeudi à 10h30",
              "Rappel urgent ce soir à 18h pour faire les courses",
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSandboxSimulate(p)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: "12px", background: sandboxInput === p ? "rgba(99, 102, 241, 0.3)" : undefined, textAlign: "left" }}
              >
                &ldquo;{p}&rdquo;
              </button>
            ))}
          </div>

          {sandboxResult && (
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "12px",
                background: "rgba(99, 102, 241, 0.12)",
                border: "1px solid rgba(99, 102, 241, 0.35)",
                color: "#e2e8f0",
                fontSize: "13px",
                lineHeight: "1.5",
                animation: "fadeIn 0.3s ease-out",
              }}
            >
              {sandboxResult}
            </div>
          )}
        </div>
      </section>

      {/* 7. STATS & KEY METRICS */}
      <section id="stats" style={{ padding: "clamp(40px, 5vw, 60px) clamp(12px, 3vw, 24px)", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          className="stats-mobile-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            textAlign: "center",
          }}
        >
          {[
            { value: "0", label: "Oubli constaté", sublabel: "dès la première semaine", color: "#34d399" },
            { value: "3s", label: "Pour planifier", sublabel: "n'importe quelle consigne", color: "#38bdf8" },
            { value: "99.9%", label: "De ponctualité", sublabel: "respectée aux rendez-vous", color: "#a855f7" },
            { value: "100%", label: "Chiffré & Privé", sublabel: "sécurité & confidentialité", color: "#f59e0b" },
          ].map((s, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{ padding: "22px 16px", borderRadius: "16px" }}
            >
              <div style={{ fontSize: "32px", fontWeight: "900", color: s.color, lineHeight: 1, marginBottom: "6px", fontFamily: "monospace" }}>
                {s.value}
              </div>
              <div style={{ fontSize: "14px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
                {s.label}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                {s.sublabel}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. PRICING & SUBSCRIPTIONS SECTION (2 COMPACT REFINED OFFERS) */}
      <section id="pricing" style={{ padding: "clamp(40px, 6vw, 70px) clamp(12px, 3vw, 24px) 50px", maxWidth: "920px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span className="badge badge-glow-purple" style={{ marginBottom: "12px" }}>Tarification Simple & Rentable</span>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: "900", color: "#ffffff", letterSpacing: "-0.03em" }}>
            Investissez dans votre ponctualité et votre temps
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginTop: "8px", maxWidth: "600px", margin: "8px auto 0" }}>
            Un seul rendez-vous important sécurisé rentabilise instantanément votre abonnement.
          </p>
        </div>

        <div
          className="pricing-mobile-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {/* Plan 1: Gratuit Découverte */}
          <div
            className="glass-card"
            style={{
              padding: "26px 20px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              background: "rgba(17, 24, 39, 0.75)",
            }}
          >
            <div style={{ marginBottom: "14px" }}>
              <span style={{ fontSize: "10px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                DÉCOUVERTE
              </span>
              <h3 style={{ fontSize: "19px", fontWeight: "900", color: "#ffffff", marginTop: "4px" }}>
                Plan Gratuit
              </h3>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
                Pour tester l&apos;agenda et les rendez-vous standard.
              </p>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "32px", fontWeight: "900", color: "#ffffff", fontFamily: "monospace" }}>0 €</span>
                <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>/ pour toujours</span>
              </div>
              <span style={{ fontSize: "11px", color: "#94a3b8" }}>Sans carte bancaire</span>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px", color: "#cbd5e1", fontSize: "12px", marginBottom: "22px", flex: 1 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#34d399" />
                <span>Calendrier personnel standard</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#34d399" />
                <span>Notifications classiques simples</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)" }}>
                <span>✕</span>
                <span>Pas d&apos;alarme vocale persistante</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)" }}>
                <span>✕</span>
                <span>Pas de double espace Professionnel</span>
              </li>
            </ul>

            <button
              onClick={() => scrollToAuth("REGISTER")}
              className="btn btn-secondary btn-sm btn-mobile-full"
              style={{ width: "100%", justifyContent: "center", padding: "10px", fontWeight: "700" }}
            >
              Créer un compte gratuit
            </button>
          </div>

          {/* Plan 2: Premium Pro (HIGHLIGHTED & COMPACT) */}
          <div
            className="glass-card"
            style={{
              padding: "26px 20px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              border: "2px solid rgba(99, 102, 241, 0.8)",
              background: "linear-gradient(180deg, rgba(26, 32, 58, 0.95) 0%, rgba(15, 20, 36, 0.95) 100%)",
              boxShadow: "0 15px 40px rgba(99, 102, 241, 0.3), 0 0 25px rgba(56, 189, 248, 0.15)",
            }}
          >
            {/* Badge */}
            <div
              style={{
                position: "absolute",
                top: "-11px",
                right: "18px",
                background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)",
                padding: "3px 10px",
                borderRadius: "14px",
                fontSize: "10px",
                fontWeight: "900",
                color: "#ffffff",
                letterSpacing: "0.06em",
              }}
            >
              ⭐ ACCÈS ILLIMITÉ
            </div>

            <div style={{ marginBottom: "14px" }}>
              <span style={{ fontSize: "10px", fontWeight: "800", color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                RECOMMANDÉ
              </span>
              <h3 style={{ fontSize: "19px", fontWeight: "900", color: "#ffffff", marginTop: "4px" }}>
                Abonnement Pro
              </h3>
              <p style={{ fontSize: "12px", color: "#c7d2fe", marginTop: "2px" }}>
                Pour les indépendants, cadres et personnes exigeantes.
              </p>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "32px", fontWeight: "900", color: "#ffffff", fontFamily: "monospace" }}>9,99 €</span>
                <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>/ mois</span>
              </div>
              <span style={{ fontSize: "11px", color: "#38bdf8", fontWeight: "600" }}>Zéro engagement • 7 jours offerts</span>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px", color: "#f1f5f9", fontSize: "12px", marginBottom: "22px", flex: 1 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#38bdf8" />
                <span><strong>Dictée vocale illimitée</strong> en français</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#38bdf8" />
                <span><strong>Alarmes vocales persistantes inratables</strong></span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#38bdf8" />
                <span><strong>Double espace Pro & Perso étanche</strong></span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#38bdf8" />
                <span>Mode hors-ligne PWA + Synchro temps réel</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#38bdf8" />
                <span>Support prioritaire 7j/7</span>
              </li>
            </ul>

            <button
              onClick={() => scrollToAuth("REGISTER")}
              className="btn btn-primary btn-mobile-full"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "11px",
                fontWeight: "800",
                fontSize: "14px",
                background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)",
                boxShadow: "0 4px 18px rgba(99, 102, 241, 0.4)",
              }}
            >
              Démarrer l&apos;offre Pro (9,99 €)
            </button>
          </div>
        </div>
      </section>

      {/* 9. AUTH TUNNEL SECTION (SE CONNECTER / COMMENCER MAINTENANT) */}
      <section
        ref={authRef}
        id="auth-section"
        style={{
          padding: "clamp(50px, 7vw, 90px) clamp(12px, 3vw, 24px)",
          position: "relative",
          overflow: "hidden",
        }}
        className="aurora-bg"
      >
        <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <Logo size={42} animated={true} />
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "900",
                color: "#ffffff",
                marginTop: "18px",
                letterSpacing: "-0.02em",
              }}
            >
              {authTab === "LOGIN" ? "Accéder à votre espace" : "Créer votre compte & Essai"}
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "6px" }}>
              Rejoignez AlarmAgenda et pilotez votre emploi du temps en toute simplicité.
            </p>
          </div>

          {/* Auth Card */}
          <div
            className="glass-card"
            style={{
              padding: "36px 30px",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              background: "rgba(17, 24, 39, 0.9)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(99, 102, 241, 0.2)",
            }}
          >
            {/* Tabs Switcher */}
            <div
              style={{
                display: "flex",
                background: "rgba(0, 0, 0, 0.4)",
                padding: "4px",
                borderRadius: "12px",
                marginBottom: "24px",
                border: "1px solid var(--border-subtle)",
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
                  padding: "9px",
                  borderRadius: "9px",
                  fontSize: "13px",
                  fontWeight: "700",
                  border: "none",
                  cursor: "pointer",
                  background: authTab === "LOGIN" ? "var(--accent-primary)" : "transparent",
                  color: authTab === "LOGIN" ? "#ffffff" : "var(--text-muted)",
                  transition: "all 0.2s ease",
                }}
                id="tab-login"
              >
                Se connecter
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthTab("REGISTER");
                  setError("");
                }}
                style={{
                  flex: 1,
                  padding: "9px",
                  borderRadius: "9px",
                  fontSize: "13px",
                  fontWeight: "700",
                  border: "none",
                  cursor: "pointer",
                  background: authTab === "REGISTER" ? "var(--accent-primary)" : "transparent",
                  color: authTab === "REGISTER" ? "#ffffff" : "var(--text-muted)",
                  transition: "all 0.2s ease",
                }}
                id="tab-register"
              >
                Créer un compte
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.35)",
                  borderRadius: "12px",
                  padding: "12px 14px",
                  color: "#fca5a5",
                  fontSize: "13px",
                  textAlign: "center",
                  marginBottom: "18px",
                  animation: "fadeIn 0.3s ease-out",
                }}
              >
                {error}
              </div>
            )}

            {/* FORGOT PASSWORD FORM (Step 1) */}
            {authTab === "FORGOT" ? (
              <form onSubmit={onForgotSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ textAlign: "center", marginBottom: "4px" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#ffffff", marginBottom: "6px" }}>
                    Réinitialisation de mot de passe
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    Entrez votre adresse email. Nous vous enverrons un code de confirmation pour définir un nouveau mot de passe.
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">Adresse Email</label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="votre.email@exemple.com"
                    className="form-input"
                    autoComplete="email"
                    required
                    id="forgot-email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !forgotEmail.trim()}
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%", justifyContent: "center", background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
                  id="btn-forgot-submit"
                >
                  {loading ? <Loader2 size={19} style={{ animation: "spin 1s linear infinite" }} /> : "Envoyer le code de réinitialisation ✉️"}
                </button>

                <div style={{ textAlign: "center", marginTop: "4px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab("LOGIN");
                      setError("");
                    }}
                    className="btn btn-ghost btn-sm"
                    style={{ color: "var(--text-muted)", fontSize: "13px" }}
                  >
                    ← Revenir à la connexion
                  </button>
                </div>
              </form>
            ) : authTab === "RESET" ? (
              /* RESET PASSWORD FORM (Step 2) */
              <form onSubmit={onResetSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ textAlign: "center", marginBottom: "4px" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#38bdf8", marginBottom: "6px" }}>
                    Nouveau mot de passe
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    Un code a été envoyé à <strong>{forgotEmail}</strong>.<br />
                    Entrez-le ci-dessous avec votre nouveau mot de passe.
                  </p>
                </div>

                {forgotSuccess && (
                  <div
                    style={{
                      background: "rgba(16, 185, 129, 0.15)",
                      border: "1px solid rgba(16, 185, 129, 0.4)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#34d399",
                      fontSize: "13px",
                      textAlign: "center",
                    }}
                  >
                    {forgotSuccess}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" style={{ textAlign: "center", display: "block" }}>
                    Code de confirmation (6 chiffres)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="••••••"
                    className="form-input"
                    style={{
                      fontSize: "24px",
                      letterSpacing: "0.25em",
                      textAlign: "center",
                      fontWeight: "900",
                      fontFamily: "monospace",
                      padding: "10px",
                    }}
                    autoFocus
                    required
                    id="input-reset-code"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nouveau mot de passe (6 car. min)</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="form-input"
                      style={{ paddingRight: "44px" }}
                      autoComplete="new-password"
                      required
                      id="reset-new-password"
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
                        cursor: "pointer",
                        color: "var(--text-muted)",
                        display: "flex",
                        padding: "4px",
                      }}
                      aria-label="Afficher mot de passe"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Confirmer le nouveau mot de passe</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="form-input"
                    autoComplete="new-password"
                    required
                    id="reset-confirm-password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || resetCode.length < 6 || !newPassword}
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%", justifyContent: "center", background: "linear-gradient(135deg, #10b981, #06b6d4)" }}
                  id="btn-reset-submit"
                >
                  {loading ? <Loader2 size={19} style={{ animation: "spin 1s linear infinite" }} /> : "Enregistrer et me connecter"}
                </button>

                <div style={{ textAlign: "center", marginTop: "4px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab("LOGIN");
                      setError("");
                    }}
                    className="btn btn-ghost btn-sm"
                    style={{ color: "var(--text-muted)", fontSize: "13px" }}
                  >
                    ← Revenir à la connexion
                  </button>
                </div>
              </form>
            ) : authTab === "LOGIN" ? (
              /* LOGIN FORM */
              <form onSubmit={handleLoginSubmit(onLogin)} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div className="form-group">
                  <label className="form-label">Adresse Email</label>
                  <input
                    {...loginRegister("email")}
                    type="email"
                    placeholder="votre.email@exemple.com"
                    className="form-input"
                    autoComplete="email"
                    id="login-email"
                  />
                  {loginErrors.email && <span className="form-error">{loginErrors.email.message}</span>}
                </div>

                <div className="form-group">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <label className="form-label" style={{ margin: 0 }}>Mot de passe</label>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotEmail(loginRegister("email") ? (document.getElementById("login-email") as HTMLInputElement)?.value || "" : "");
                        setAuthTab("FORGOT");
                        setError("");
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#38bdf8",
                        fontSize: "12px",
                        cursor: "pointer",
                        fontWeight: "600",
                        padding: 0,
                      }}
                      id="btn-forgot-password-link"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      {...loginRegister("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      className="form-input"
                      style={{ paddingRight: "44px" }}
                      autoComplete="current-password"
                      id="login-password"
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
                        cursor: "pointer",
                        color: "var(--text-muted)",
                        display: "flex",
                        padding: "4px",
                      }}
                      aria-label="Afficher mot de passe"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {loginErrors.password && <span className="form-error">{loginErrors.password.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%", justifyContent: "center", marginTop: "6px" }}
                  id="btn-submit-login"
                >
                  {loading ? <Loader2 size={19} style={{ animation: "spin 1s linear infinite" }} /> : "Se connecter"}
                </button>

                {/* 1-Click Demo Fill */}
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="btn btn-secondary btn-sm"
                  style={{ width: "100%", justifyContent: "center", fontSize: "12px", color: "var(--text-secondary)" }}
                  id="btn-demo-fill"
                >
                  <Sparkles size={13} color="#818cf8" />
                  Remplir un compte démo
                </button>
              </form>
            ) : (
              /* REGISTER FORM WITH 2-STEP EMAIL OTP VERIFICATION */
              otpStep ? (
                /* Step 2: Enter 6-digit OTP code */
                <form onSubmit={onVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ textAlign: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "700", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      ÉTAPE 2/2 • VÉRIFICATION EMAIL
                    </span>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "6px" }}>
                      Entrez le code à 6 chiffres envoyé à votre boîte mail :<br />
                      <strong style={{ color: "#ffffff" }}>{pendingRegData?.email}</strong>
                    </p>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ textAlign: "center", display: "block" }}>
                      Code de confirmation (6 chiffres)
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="••••••"
                      className="form-input"
                      style={{
                        fontSize: "26px",
                        letterSpacing: "0.3em",
                        textAlign: "center",
                        fontWeight: "900",
                        fontFamily: "monospace",
                        padding: "12px",
                      }}
                      autoFocus
                      id="input-otp-code"
                    />
                  </div>

                  {resendSuccess && (
                    <div
                      style={{
                        background: "rgba(16, 185, 129, 0.15)",
                        border: "1px solid rgba(16, 185, 129, 0.4)",
                        borderRadius: "10px",
                        padding: "10px 14px",
                        color: "#34d399",
                        fontSize: "13px",
                        textAlign: "center",
                      }}
                    >
                      {resendSuccess}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || otpCode.length < 6}
                    className="btn btn-primary btn-lg"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)",
                    }}
                    id="btn-validate-otp"
                  >
                    {loading ? <Loader2 size={19} style={{ animation: "spin 1s linear infinite" }} /> : "Valider mon compte & Accéder"}
                  </button>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", marginTop: "4px" }}>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading || resendCooldown > 0}
                      className="btn btn-ghost btn-sm"
                      style={{ color: "#38bdf8", fontSize: "13px", fontWeight: 700 }}
                      id="btn-resend-otp"
                    >
                      {resendCooldown > 0 ? `Renvoyer un nouveau code (${resendCooldown}s)` : "📩 Renvoyer un nouveau code par email"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setOtpStep(false);
                        setError("");
                        setResendSuccess("");
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ color: "var(--text-muted)", fontSize: "12px" }}
                    >
                      ← Modifier mon adresse email
                    </button>
                  </div>
                </form>
              ) : (
                /* Step 1: User info input */
                <form onSubmit={handleRegSubmit(onSendOtp)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div className="form-group">
                    <label className="form-label">Nom complet ou Prénom</label>
                    <input
                      {...regRegister("name")}
                      type="text"
                      placeholder="Alexandre Martin"
                      className="form-input"
                      autoComplete="name"
                      id="reg-name"
                    />
                    {regErrors.name && <span className="form-error">{regErrors.name.message}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Adresse Email de vérification</label>
                    <input
                      {...regRegister("email")}
                      type="email"
                      placeholder="alex@exemple.com"
                      className="form-input"
                      autoComplete="email"
                      id="reg-email"
                    />
                    {regErrors.email && <span className="form-error">{regErrors.email.message}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mot de passe (8 car. min)</label>
                    <div style={{ position: "relative" }}>
                      <input
                        {...regRegister("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        className="form-input"
                        style={{ paddingRight: "44px" }}
                        autoComplete="new-password"
                        id="reg-password"
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
                          cursor: "pointer",
                          color: "var(--text-muted)",
                          display: "flex",
                          padding: "4px",
                        }}
                        aria-label="Afficher mot de passe"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {regErrors.password && <span className="form-error">{regErrors.password.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-lg"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      marginTop: "6px",
                      background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)",
                    }}
                    id="btn-submit-register"
                  >
                    {loading ? <Loader2 size={19} style={{ animation: "spin 1s linear infinite" }} /> : "Recevoir mon code par mail ✉️"}
                  </button>
                </form>
              )
            )}
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "36px 24px",
          background: "var(--bg-primary)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          <Logo size={28} />
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} AlarmAgenda. Conçu pour une productivité et une ponctualité absolues.
          </p>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}

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
  Bot,
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

export default function LandingPage() {
  const router = useRouter();
  const [authTab, setAuthTab] = useState<"LOGIN" | "REGISTER">("LOGIN");
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

  const scrollToAuth = (mode: "LOGIN" | "REGISTER" = "LOGIN") => {
    setAuthTab(mode);
    setError("");
    authRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onLogin = async (data: LoginInput) => {
    setLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou mot de passe incorrect.");
        setLoading(false);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Erreur inattendue lors de la connexion.");
      setLoading(false);
    }
  };

  const onRegister = async (data: RegisterInput) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Erreur lors de l'inscription.");
        setLoading(false);
        return;
      }
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      router.push("/");
      router.refresh();
    } catch {
      setError("Erreur inattendue lors de l'inscription.");
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setAuthTab("LOGIN");
    setLoginValue("email", "demo@alarmagenda.ai");
    setLoginValue("password", "Demo1234!");
    setError("");
    authRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTestVoiceDemo = () => {
    setDemoVoicePlaying(true);
    speakAIText(
      "Bonjour ! Je suis votre assistante AlarmAgenda. Vos rendez-vous et vos tâches urgentes sont sous contrôle absolu.",
      { gender: "FEMALE" }
    );
    setTimeout(() => setDemoVoicePlaying(false), 4500);
  };

  const handleSandboxSimulate = (prompt: string) => {
    setSandboxInput(prompt);
    if (prompt.includes("Marc")) {
      setSandboxResult(
        "✨ Action planifiée : Tâche créée pour Demain à 14h00 • Contact associé : Marc • Alarme vocale programmée."
      );
    } else if (prompt.includes("docteur") || prompt.includes("médecin")) {
      setSandboxResult(
        "✨ Action planifiée : Rendez-vous médical programmé Jeudi à 10h30 • Rappel persistant 15 min avant."
      );
    } else {
      setSandboxResult(
        "✨ Action planifiée : Rappel vocal configuré pour Ce Soir à 18h00 avec énonciation automatique des notes."
      );
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* 1. TOP NAVBAR */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(7, 9, 14, 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "14px 24px",
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
          <Logo size={36} animated={true} />

          <nav
            style={{ display: "flex", alignItems: "center", gap: "28px" }}
            className="hidden-mobile"
          >
            <a href="#features" style={{ color: "var(--text-secondary)", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>
              Fonctionnalités
            </a>
            <a href="#ai-demo" style={{ color: "var(--text-secondary)", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>
              Copilote IA
            </a>
            <a href="#stats" style={{ color: "var(--text-secondary)", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>
              Avantages
            </a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => scrollToAuth("LOGIN")}
              className="btn btn-ghost btn-sm"
              style={{ color: "#ffffff", fontWeight: 600 }}
            >
              Se connecter
            </button>
            <button
              onClick={() => scrollToAuth("REGISTER")}
              className="btn btn-primary btn-sm"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)",
                fontWeight: 700,
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
              }}
            >
              Commencer maintenant
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section
        style={{
          position: "relative",
          padding: "90px 24px 70px",
          textAlign: "center",
          overflow: "hidden",
        }}
        className="aurora-bg grid-overlay"
      >
        {/* Glow Spheres */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "650px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(99, 102, 241, 0.28) 0%, rgba(6, 182, 212, 0.15) 45%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }} className="animate-slide-up">
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "30px",
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              color: "#c7d2fe",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "28px",
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.25)",
            }}
          >
            <Sparkles size={15} color="#38bdf8" />
            <span>L&apos;Agenda Nouvelle Génération Piloté par Intelligence Artificielle</span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: "900",
              lineHeight: "1.1",
              letterSpacing: "-0.035em",
              marginBottom: "24px",
            }}
            className="gradient-text"
          >
            Ne laissez plus jamais passer un rendez-vous. Pilotez vos journées à la voix.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(16px, 2.2vw, 20px)",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
              maxWidth: "720px",
              margin: "0 auto 36px",
            }}
          >
            Le premier agenda augmenté par IA qui comprend vos instructions en langage naturel, planifie vos tâches et déclenche des réveils vocaux persistants.
          </p>

          {/* Hero CTAs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "48px",
            }}
          >
            <button
              onClick={() => scrollToAuth("REGISTER")}
              className="btn btn-primary btn-lg"
              style={{
                fontSize: "16px",
                padding: "16px 36px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #06b6d4 0%, #6366f1 50%, #a855f7 100%)",
                boxShadow: "0 8px 30px rgba(99, 102, 241, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
              }}
              id="hero-cta-start"
            >
              <span>Commencer maintenant — C&apos;est gratuit</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={handleTestVoiceDemo}
              className="btn btn-secondary btn-lg"
              style={{
                fontSize: "15px",
                padding: "15px 26px",
                borderRadius: "16px",
                borderColor: "rgba(255, 255, 255, 0.18)",
              }}
              id="hero-cta-voice"
            >
              <Volume2 size={18} color="#38bdf8" />
              <span>{demoVoicePlaying ? "Écoute en cours..." : "Écouter la voix IA"}</span>
            </button>
          </div>

          {/* Floating Feature Pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              flexWrap: "wrap",
              color: "var(--text-secondary)",
              fontSize: "13px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={16} color="#34d399" />
              <span>Aucune carte requise</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={16} color="#34d399" />
              <span>Disponible sur PC & Mobile</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={16} color="#34d399" />
              <span>100% Chiffré & Privé</span>
            </div>
          </div>
        </div>

        {/* 3. HERO INTERACTIVE MOCKUP SHOWCASE */}
        <div
          style={{
            maxWidth: "1020px",
            margin: "54px auto 0",
            position: "relative",
            zIndex: 2,
          }}
          className="animate-float"
        >
          <div
            className="glass-card"
            style={{
              padding: "24px",
              borderRadius: "24px",
              border: "1px solid rgba(99, 102, 241, 0.35)",
              background: "linear-gradient(180deg, rgba(17, 24, 39, 0.92) 0%, rgba(10, 14, 23, 0.95) 100%)",
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(99, 102, 241, 0.2)",
            }}
          >
            {/* Window bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid var(--border-subtle)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444" }} />
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b" }} />
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#10b981" }} />
                <span style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "12px" }}>
                  app.alarmagenda.ai — Copilote IA Actif
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span className="badge badge-glow-cyan" style={{ fontSize: "10px" }}>Live Engine 2.0</span>
              </div>
            </div>

            {/* Dashboard Mockup Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "18px",
                textAlign: "left",
              }}
            >
              {/* Card 1: AI Prompt in action */}
              <div
                style={{
                  background: "rgba(13, 18, 30, 0.8)",
                  borderRadius: "16px",
                  padding: "18px",
                  border: "1px solid rgba(6, 182, 212, 0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <Bot size={18} color="#38bdf8" />
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#f8fafc" }}>Ordre vocal dicté</span>
                </div>
                <p style={{ fontSize: "13px", color: "#94a3b8", fontStyle: "italic", marginBottom: "12px" }}>
                  &ldquo;Mets-moi cette tâche demain à 14h avec Marc pour finaliser le chantier.&rdquo;
                </p>
                <div style={{ padding: "10px 12px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#34d399", fontSize: "12px" }}>
                  ✓ Tâche créée automatiquement • Contact Marc lié
                </div>
              </div>

              {/* Card 2: Voice Alarm Card */}
              <div
                style={{
                  background: "rgba(13, 18, 30, 0.8)",
                  borderRadius: "16px",
                  padding: "18px",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <Volume2 size={18} color="#c084fc" />
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#f8fafc" }}>Rappel persistant</span>
                </div>
                <p style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
                  Réunion de chantier • 14:00
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                  Sonne jusqu&apos;à confirmation manuelle ou répétition
                </p>
              </div>

              {/* Card 3: Metrics */}
              <div
                style={{
                  background: "rgba(13, 18, 30, 0.8)",
                  borderRadius: "16px",
                  padding: "18px",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <CheckSquare size={18} color="#818cf8" />
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#f8fafc" }}>Organisation optimale</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                  <div>
                    <p style={{ fontSize: "22px", fontWeight: "900", color: "#ffffff" }}>0 oubli</p>
                    <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Sérénité totale</p>
                  </div>
                  <span className="badge badge-glow-green">100% à l&apos;heure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE SANDBOX SECTION */}
      <section id="ai-demo" style={{ padding: "80px 24px", maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="badge badge-glow-cyan" style={{ marginBottom: "12px" }}>Démonstration Interactive</span>
          <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#ffffff" }}>
            Testez la puissance de l&apos;IA sans attendre
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginTop: "8px" }}>
            Cliquez sur un exemple pour voir comment l&apos;IA structure vos phrases orales :
          </p>
        </div>

        <div className="glass-card" style={{ padding: "28px", border: "1px solid var(--border-accent)" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "18px" }}>
            {[
              "Mets cette tâche demain 14h avec Marc pour valider le devis",
              "Rappelle-moi d'aller chez le docteur jeudi à 10h30",
              "Rappel urgent ce soir à 18h pour faire les courses",
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSandboxSimulate(p)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: "12px", background: sandboxInput === p ? "rgba(99, 102, 241, 0.3)" : undefined }}
              >
                &ldquo;{p}&rdquo;
              </button>
            ))}
          </div>

          {sandboxResult && (
            <div
              style={{
                padding: "16px 20px",
                borderRadius: "14px",
                background: "rgba(99, 102, 241, 0.12)",
                border: "1px solid rgba(99, 102, 241, 0.35)",
                color: "#e2e8f0",
                fontSize: "14px",
                lineHeight: "1.5",
                animation: "fadeIn 0.3s ease-out",
              }}
            >
              {sandboxResult}
            </div>
          )}
        </div>
      </section>

      {/* 5. FEATURES GRID */}
      <section id="features" style={{ padding: "80px 24px", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <span className="badge badge-glow-purple" style={{ marginBottom: "12px" }}>Fonctionnalités Clés</span>
            <h2 style={{ fontSize: "36px", fontWeight: "900", color: "#ffffff" }}>
              Tout ce dont vous avez besoin pour maîtriser votre planning
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                icon: Bot,
                title: "Agence & Copilote IA",
                desc: "Analyse instantanément vos phrases en français, extrait dates, personnes et urgences, et les programme sans effort.",
                color: "#38bdf8",
              },
              {
                icon: Bell,
                title: "Rappels Persistants",
                desc: "Ne manquez plus jamais un moment clé : les alertes sonnent comme une véritable alarme jusqu'à prise en compte.",
                color: "#a855f7",
              },
              {
                icon: Layers,
                title: "Double Espace Perso & Pro",
                desc: "Basculez d'un clic entre votre gestion d'entreprise et votre quotidien familial sans mélange des données.",
                color: "#10b981",
              },
              {
                icon: ShieldCheck,
                title: "Confidentialité & Hors-Ligne",
                desc: "Application PWA autonome avec synchronisation ultra-rapide et protection totale de vos rendez-vous privés.",
                color: "#f59e0b",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="glass-card-interactive"
                style={{ padding: "30px 24px", display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: `${f.color}20`,
                    border: `1px solid ${f.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <f.icon size={24} color={f.color} />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff" }}>{f.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AUTH TUNNEL SECTION (SE CONNECTER / COMMENCER MAINTENANT) */}
      <section
        ref={authRef}
        id="auth-section"
        style={{
          padding: "90px 24px",
          position: "relative",
          overflow: "hidden",
        }}
        className="aurora-bg grid-overlay"
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
              {authTab === "LOGIN" ? "Accéder à votre espace" : "Créer votre compte gratuit"}
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "6px" }}>
              Rejoignez AlarmAgenda et pilotez votre emploi du temps avec l&apos;IA.
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

            {/* LOGIN FORM */}
            {authTab === "LOGIN" ? (
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
                  <label className="form-label">Mot de passe</label>
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
              /* REGISTER FORM */
              <form onSubmit={handleRegSubmit(onRegister)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                  <label className="form-label">Adresse Email</label>
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
                  style={{ width: "100%", justifyContent: "center", marginTop: "6px" }}
                  id="btn-submit-register"
                >
                  {loading ? <Loader2 size={19} style={{ animation: "spin 1s linear infinite" }} /> : "Créer mon compte"}
                </button>
              </form>
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
            © {new Date().getFullYear()} AlarmAgenda IA. Conçu pour une productivité et une ponctualité absolues.
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

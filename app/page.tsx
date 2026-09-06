"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Volume2,
  Calendar,
  Bell,
  CheckSquare,
  ShieldCheck,
  Zap,
  ArrowRight,
  Play,
  Check,
  Clock,
  Activity,
  Bot,
  Star,
  Users,
  ChevronRight,
  Headphones,
  Smartphone,
  Flame,
} from "lucide-react";
import Logo from "@/components/brand/Logo";
import { speakAIText, playAlertChime } from "@/lib/voice";

export default function LandingPage() {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activeTab, setActiveTab] = useState<"FEMALE" | "MALE">("FEMALE");
  const [liveTime, setLiveTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTestVoice = async (gender: "FEMALE" | "MALE") => {
    setIsPlayingVoice(true);
    await playAlertChime();

    const sample =
      gender === "FEMALE"
        ? "Bonjour ! Je suis votre assistante Alamajonda. À 14h30, vous avez rendez-vous avec le directeur technique à l'Atelier. Tout est synchronisé."
        : "Bonjour ! Je suis votre copilote Alamajonda. Vos tâches prioritaires du jour ont été planifiées avec succès.";

    speakAIText(sample, {
      gender,
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false),
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #060b1b 0%, #0a132e 50%, #060b1b 100%)",
        color: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* 1. Header & Navigation Bar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(6, 11, 27, 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(56, 189, 248, 0.15)",
          padding: "16px 32px",
        }}
      >
        <div
          style={{
            maxWidth: "1350px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo size={32} showText={true} />

          {/* Nav Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
            }}
            className="hidden md:flex"
          >
            <a
              href="#features"
              style={{
                fontSize: "14px",
                color: "#cbd5e1",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.2s",
              }}
              className="hover:text-cyan-400"
            >
              Fonctionnalités
            </a>
            <a
              href="#voice"
              style={{
                fontSize: "14px",
                color: "#cbd5e1",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.2s",
              }}
              className="hover:text-cyan-400"
            >
              Synthèse Vocale
            </a>
            <a
              href="#copilot"
              style={{
                fontSize: "14px",
                color: "#cbd5e1",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.2s",
              }}
              className="hover:text-cyan-400"
            >
              Copilote IA
            </a>
            <a
              href="#pricing"
              style={{
                fontSize: "14px",
                color: "#cbd5e1",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.2s",
              }}
              className="hover:text-cyan-400"
            >
              Tarifs
            </a>
          </nav>

          {/* CTA Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/login"
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                fontSize: "13.5px",
                fontWeight: "600",
                color: "#cbd5e1",
                textDecoration: "none",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                background: "rgba(255, 255, 255, 0.05)",
                transition: "all 0.2s",
              }}
              className="hover:bg-white/10 hover:text-white"
            >
              Connexion
            </Link>

            <Link
              href="/dashboard"
              style={{
                padding: "8px 20px",
                borderRadius: "10px",
                fontSize: "13.5px",
                fontWeight: "700",
                color: "#ffffff",
                textDecoration: "none",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow: "0 0 20px rgba(37, 99, 235, 0.4)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              className="hover:scale-105"
            >
              <span>Tableau de bord</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Ultra Modern Sapphire Glow) */}
      <section
        style={{
          position: "relative",
          padding: "80px 24px 100px",
          maxWidth: "1350px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Glow Spheres */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "350px",
            background: "radial-gradient(ellipse, rgba(37, 99, 235, 0.35) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 75%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          {/* Top Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "30px",
              background: "rgba(37, 99, 235, 0.2)",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              boxShadow: "0 0 20px rgba(37, 99, 235, 0.3)",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#38bdf8",
                boxShadow: "0 0 10px #38bdf8",
              }}
            />
            <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#38bdf8", letterSpacing: "0.04em" }}>
              L&apos;AGENCE IA & AGENDA NOUVELLE GÉNÉRATION
            </span>
          </div>

          {/* Monumental Headline */}
          <h1
            style={{
              fontSize: "clamp(34px, 5.5vw, 64px)",
              fontWeight: "900",
              lineHeight: "1.12",
              letterSpacing: "-0.03em",
              maxWidth: "960px",
              margin: "0 auto 22px",
              background: "linear-gradient(180deg, #ffffff 30%, #93c5fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ne subissez plus vos journées.
            <br />
            Laissez l&apos;IA orchestrer votre quotidien.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 19px)",
              color: "#94a3b8",
              maxWidth: "760px",
              margin: "0 auto 36px",
              lineHeight: "1.6",
            }}
          >
            <strong style={{ color: "#e2e8f0" }}>Alamajonda</strong> fusionne un agenda haute fidélité, des alertes vocales proactives et un copilote IA autonome. Planifiez en langage naturel et ne manquez plus jamais un créneau.
          </p>

          {/* Main Action Buttons */}
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
            <Link
              href="/register"
              style={{
                padding: "15px 34px",
                borderRadius: "14px",
                fontSize: "15.5px",
                fontWeight: "800",
                color: "#ffffff",
                textDecoration: "none",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow: "0 10px 30px rgba(37, 99, 235, 0.5), 0 0 20px rgba(56, 189, 248, 0.3)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
              className="hover:scale-105"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight size={17} />
            </Link>

            <button
              onClick={() => handleTestVoice("FEMALE")}
              style={{
                padding: "15px 28px",
                borderRadius: "14px",
                fontSize: "15px",
                fontWeight: "700",
                color: "#38bdf8",
                background: "rgba(56, 189, 248, 0.08)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                boxShadow: "0 0 20px rgba(56, 189, 248, 0.15)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              className="hover:bg-cyan-500/20"
              id="landing-hero-test-voice"
            >
              <Volume2 size={18} />
              <span>{isPlayingVoice ? "Synthèse en cours..." : "Écouter la Voix IA en direct"}</span>
            </button>
          </div>

          {/* Live Trust Metrics */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "36px",
              flexWrap: "wrap",
              color: "#94a3b8",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldCheck size={16} color="#34d399" />
              <span>Données 100% sécurisées</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Zap size={16} color="#fbbf24" />
              <span>Exécution IA &lt; 2ms</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Headphones size={16} color="#38bdf8" />
              <span>Synthèse vocale native FR</span>
            </div>
          </div>
        </div>

        {/* 3. Hero Interactive Cockpit Preview Card (Glassmorphism Mockup) */}
        <div
          style={{
            marginTop: "60px",
            position: "relative",
            maxWidth: "1080px",
            margin: "60px auto 0",
            borderRadius: "24px",
            background: "linear-gradient(180deg, rgba(13, 27, 62, 0.8) 0%, rgba(6, 11, 27, 0.95) 100%)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.85), 0 0 50px rgba(37, 99, 235, 0.25)",
            padding: "24px",
            backdropFilter: "blur(20px)",
            textAlign: "left",
          }}
        >
          {/* Top Cockpit Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "18px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }} />
              </div>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#cbd5e1" }}>
                Alamajonda Cockpit • {liveTime || "12:00"}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(37, 99, 235, 0.2)",
                padding: "4px 12px",
                borderRadius: "20px",
                border: "1px solid rgba(56, 189, 248, 0.3)",
              }}
            >
              <Sparkles size={13} color="#38bdf8" />
              <span style={{ fontSize: "11.5px", color: "#38bdf8", fontWeight: "700" }}>Copilote IA Actif</span>
            </div>
          </div>

          {/* Grid View inside Mockup */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {/* Mock Card 1: Agenda */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Calendar size={16} color="#38bdf8" />
                <span style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>Prochains Rendez-vous</span>
              </div>
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: "rgba(37, 99, 235, 0.15)",
                  border: "1px solid rgba(56, 189, 248, 0.25)",
                  marginBottom: "8px",
                }}
              >
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff" }}>Rendez-vous avec Paul</div>
                <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>10:00 · Atelier Liège</div>
              </div>
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff" }}>Consultation Clinique</div>
                <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>14:00 · Liège Centre</div>
              </div>
            </div>

            {/* Mock Card 2: Voice Alert */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Volume2 size={16} color="#fbbf24" />
                <span style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>Alerte Vocale Proactive</span>
              </div>
              <div
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  background: "rgba(245, 158, 11, 0.1)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b", animation: "pulse 1.5s infinite" }} />
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "#fbbf24" }}>Déclenchement direct</span>
                </div>
                <div style={{ fontSize: "12.5px", color: "#ffffff", fontStyle: "italic", lineHeight: "1.4" }}>
                  « C&apos;est l&apos;heure d&apos;acheter les pièces de rechange avant la fermeture. »
                </div>
              </div>
            </div>

            {/* Mock Card 3: AI Copilot */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Activity size={16} color="#34d399" />
                <span style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>Efficacité & Impact</span>
              </div>
              <div style={{ fontSize: "24px", fontWeight: "900", color: "#34d399", marginBottom: "4px" }}>
                +4.5h <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "500" }}>/ semaine</span>
              </div>
              <p style={{ fontSize: "11.5px", color: "#94a3b8", lineHeight: "1.4" }}>
                Temps économisé sur la gestion manuelle de vos rendez-vous et priorités.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: Les 4 Piliers Fondamentaux */}
      <section id="features" style={{ padding: "80px 24px", maxWidth: "1350px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span style={{ fontSize: "12px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Technologie & Ergonomie
          </span>
          <h2 style={{ fontSize: "34px", fontWeight: "800", letterSpacing: "-0.02em", color: "#ffffff", marginTop: "8px" }}>
            Pourquoi Alamajonda surpasse un agenda classique
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Feature 1 */}
          <div
            style={{
              padding: "28px",
              borderRadius: "20px",
              background: "linear-gradient(180deg, #0d1b3e 0%, #08112b 100%)",
              border: "1px solid rgba(56, 189, 248, 0.2)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #0284c7, #38bdf8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                marginBottom: "20px",
                boxShadow: "0 0 20px rgba(56, 189, 248, 0.4)",
              }}
            >
              <Volume2 size={24} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", marginBottom: "10px" }}>
              Synthèse & Alertes Vocales
            </h3>
            <p style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: "1.6" }}>
              Fini les simples notifications perdues au milieu des autres. L&apos;IA énonce vos consignes à voix haute avec un timbre fluide et naturel dès l&apos;heure convenue.
            </p>
          </div>

          {/* Feature 2 */}
          <div
            style={{
              padding: "28px",
              borderRadius: "20px",
              background: "linear-gradient(180deg, #0d1b3e 0%, #08112b 100%)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                marginBottom: "20px",
                boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
              }}
            >
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", marginBottom: "10px" }}>
              Copilote IA Ultra-Réactif
            </h3>
            <p style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: "1.6" }}>
              Dites « Prends RDV avec Paul demain à 14h » ou « Rappelle-moi d&apos;appeler la banque à 18h ». L&apos;IA route et enregistre l&apos;action en moins de 2 millisecondes.
            </p>
          </div>

          {/* Feature 3 */}
          <div
            style={{
              padding: "28px",
              borderRadius: "20px",
              background: "linear-gradient(180deg, #0d1b3e 0%, #08112b 100%)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #059669, #10b981)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                marginBottom: "20px",
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
              }}
            >
              <Calendar size={24} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", marginBottom: "10px" }}>
              Agenda Haute Définition
            </h3>
            <p style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: "1.6" }}>
              Une vue mensuelle, hebdomadaire et quotidienne ultra-fluide avec catégorisation couleur (Travail, Personnel, Santé, Urgent) et synchronisation immédiate.
            </p>
          </div>

          {/* Feature 4 */}
          <div
            style={{
              padding: "28px",
              borderRadius: "20px",
              background: "linear-gradient(180deg, #0d1b3e 0%, #08112b 100%)",
              border: "1px solid rgba(234, 88, 12, 0.2)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #ea580c, #f97316)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                marginBottom: "20px",
                boxShadow: "0 0 20px rgba(234, 88, 12, 0.4)",
              }}
            >
              <Smartphone size={24} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", marginBottom: "10px" }}>
              Mode Appel Téléphonique
            </h3>
            <p style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: "1.6" }}>
              Besoin d&apos;une alerte incontournable ? L&apos;application fait sonner votre smartphone ou navigateur comme un vrai appel entrant avec un bouton Décrocher.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Section: Tarifs Clairs & Transparents */}
      <section id="pricing" style={{ padding: "80px 24px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span style={{ fontSize: "12px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Offres & Tarification
          </span>
          <h2 style={{ fontSize: "34px", fontWeight: "800", letterSpacing: "-0.02em", color: "#ffffff", marginTop: "8px" }}>
            Choisissez l&apos;excellence pour votre quotidien
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            alignItems: "center",
          }}
        >
          {/* Plan Gratuit */}
          <div
            style={{
              padding: "32px",
              borderRadius: "20px",
              background: "rgba(13, 27, 62, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff" }}>Gratuit</h3>
            <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>
              Idéal pour découvrir la puissance d&apos;Alamajonda
            </p>
            <div style={{ fontSize: "36px", fontWeight: "900", color: "#ffffff", margin: "20px 0" }}>
              0€ <span style={{ fontSize: "14px", color: "#94a3b8", fontWeight: "500" }}>/ pour toujours</span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "12px", fontSize: "13.5px", color: "#cbd5e1" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Check size={16} color="#38bdf8" />
                <span>Agenda & Calendrier illimité</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Check size={16} color="#38bdf8" />
                <span>Synthèse vocale native standard</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Check size={16} color="#38bdf8" />
                <span>Copilote IA (10 interactions / jour)</span>
              </li>
            </ul>

            <Link
              href="/register"
              style={{
                display: "block",
                textAlign: "center",
                padding: "12px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.08)",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "14px",
                textDecoration: "none",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              Créer un compte gratuit
            </Link>
          </div>

          {/* Plan Pro */}
          <div
            style={{
              padding: "36px",
              borderRadius: "22px",
              background: "linear-gradient(180deg, #11224f 0%, #0b1533 100%)",
              border: "2px solid #38bdf8",
              boxShadow: "0 20px 50px rgba(37, 99, 235, 0.4), 0 0 30px rgba(56, 189, 248, 0.2)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-12px",
                right: "24px",
                padding: "4px 12px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #38bdf8, #2563eb)",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "11px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Recommandé
            </div>

            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff" }}>Pro Illimité</h3>
            <p style={{ fontSize: "13px", color: "#93c5fd", marginTop: "4px" }}>
              Pour les dirigeants, professionnels et exigeants
            </p>
            <div style={{ fontSize: "36px", fontWeight: "900", color: "#ffffff", margin: "20px 0" }}>
              9.99€ <span style={{ fontSize: "14px", color: "#94a3b8", fontWeight: "500" }}>/ mois</span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "12px", fontSize: "13.5px", color: "#ffffff" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Check size={16} color="#38bdf8" />
                <span><strong>Copilote IA illimité</strong> 24/7</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Check size={16} color="#38bdf8" />
                <span><strong>Synthèse vocale HD</strong> multi-voix</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Check size={16} color="#38bdf8" />
                <span>Mode appel & alarmes prioritaires</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Check size={16} color="#38bdf8" />
                <span>Support prioritaire par l&apos;équipe</span>
              </li>
            </ul>

            <Link
              href="/register"
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "14.5px",
                textDecoration: "none",
                boxShadow: "0 8px 25px rgba(37, 99, 235, 0.5)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
              }}
            >
              Passer à Alamajonda Pro
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Section: Call to Action Final */}
      <section style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            padding: "50px 32px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #0d1b3e 100%)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            boxShadow: "0 25px 60px rgba(37, 99, 235, 0.4)",
          }}
        >
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "900", color: "#ffffff", marginBottom: "16px", letterSpacing: "-0.02em" }}>
            Prêt à transformer votre organisation ?
          </h2>
          <p style={{ fontSize: "16px", color: "#e0f2fe", maxWidth: "600px", margin: "0 auto 30px" }}>
            Rejoignez Alamajonda dès aujourd&apos;hui et laissez votre copilote IA gérer vos priorités.
          </p>
          <Link
            href="/register"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "15px 36px",
              borderRadius: "14px",
              background: "#ffffff",
              color: "#1d4ed8",
              fontWeight: "800",
              fontSize: "15.5px",
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            }}
          >
            <span>Créer mon compte gratuit</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* 7. Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "36px 24px",
          background: "#050917",
          textAlign: "center",
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <Logo size={28} showText={true} />
          <p>© {new Date().getFullYear()} Alamajonda. Ton assistant, ton quotidien. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

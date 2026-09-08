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
  Pause,
  Check,
  Clock,
  Activity,
  Users,
  ChevronRight,
  Headphones,
  Smartphone,
  Star,
  Mic,
  Sliders,
  ChevronLeft,
  Flame,
  Target,
  Download,
  Share2,
  CheckCircle2,
  MessageSquare,
  Send,
  CornerDownLeft,
} from "lucide-react";
import Logo from "@/components/brand/Logo";
import { speakAIText, playAlertChime } from "@/lib/voice";

export default function LandingPage() {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activeVoiceGender, setActiveVoiceGender] = useState<"FEMALE" | "MALE">("FEMALE");
  const [interactivePrompt, setInteractivePrompt] = useState("");
  const [simulatedAiResponse, setSimulatedAiResponse] = useState<string | null>(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [task1Done, setTask1Done] = useState(false);
  const [task2Done, setTask2Done] = useState(true);
  const [liveTime, setLiveTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTestVoice = async (gender: "FEMALE" | "MALE" = "FEMALE") => {
    setActiveVoiceGender(gender);
    setIsPlayingVoice(true);
    await playAlertChime();

    const sample =
      gender === "FEMALE"
        ? "Bonjour ! Je suis votre assistante vocale Alamajonda. À 14h30, votre réunion avec le directeur technique est confirmée à l'Atelier. Tout est synchronisé."
        : "Bonjour ! Je suis votre copilote Alamajonda. Votre journée est optimisée : vos 3 rendez-vous sont planifiés et 4 heures de temps libre sont préservées.";

    speakAIText(sample, {
      gender,
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false),
    });
  };

  const handleSimulateAiPrompt = (promptText: string) => {
    setInteractivePrompt(promptText);
    setIsAiTyping(true);
    setSimulatedAiResponse(null);

    setTimeout(() => {
      setIsAiTyping(false);
      if (promptText.includes("Paul")) {
        setSimulatedAiResponse("✅ Rendez-vous avec Paul créé pour demain à 14h00 (Atelier). Rappel vocal configuré 15 min avant.");
      } else if (promptText.includes("pièces")) {
        setSimulatedAiResponse("🔔 Rappel vocal ajouté : 'Acheter les pièces atelier' aujourd'hui à 18h00 avec annonce sonore à voix haute.");
      } else {
        setSimulatedAiResponse("⚡ Consigne enregistrée et synchronisée dans votre agenda et vos rappels prioritaires.");
      }
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #070d1e 0%, #0a1432 40%, #060a17 100%)",
        color: "#ffffff",
        fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Dynamic Ambient Mesh Lighting */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1000px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.28) 0%, rgba(56, 189, 248, 0.12) 45%, transparent 75%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "800px",
          right: "-150px",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 75%)",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* 1. Floating Executive Glass Navigation Header */}
      <header
        style={{
          position: "sticky",
          top: "16px",
          zIndex: 100,
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            borderRadius: "20px",
            background: "rgba(11, 21, 48, 0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(37, 99, 235, 0.15)",
            padding: "14px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo size={32} showText={true} />

          {/* Navigation Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
            className="hidden md:flex"
          >
            <a
              href="#cockpit"
              style={{ fontSize: "14px", fontWeight: "600", color: "#cbd5e1", textDecoration: "none", transition: "color 0.15s" }}
              className="hover:text-cyan-400"
            >
              Cockpit &amp; Démo
            </a>
            <a
              href="#features"
              style={{ fontSize: "14px", fontWeight: "600", color: "#cbd5e1", textDecoration: "none", transition: "color 0.15s" }}
              className="hover:text-cyan-400"
            >
              Fonctionnalités
            </a>
            <a
              href="#testimonials"
              style={{ fontSize: "14px", fontWeight: "600", color: "#cbd5e1", textDecoration: "none", transition: "color 0.15s" }}
              className="hover:text-cyan-400"
            >
              Avis
            </a>
            <a
              href="#pricing"
              style={{ fontSize: "14px", fontWeight: "600", color: "#cbd5e1", textDecoration: "none", transition: "color 0.15s" }}
              className="hover:text-cyan-400"
            >
              Tarifs
            </a>
          </nav>

          {/* Action CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/login"
              style={{
                padding: "8px 18px",
                borderRadius: "12px",
                fontSize: "13.5px",
                fontWeight: "700",
                color: "#e2e8f0",
                textDecoration: "none",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                background: "rgba(255, 255, 255, 0.05)",
                transition: "all 0.15s ease",
              }}
              className="hover:bg-white/10 hover:text-white"
            >
              Connexion
            </Link>

            <Link
              href="/dashboard"
              style={{
                padding: "8px 22px",
                borderRadius: "12px",
                fontSize: "13.5px",
                fontWeight: "800",
                color: "#ffffff",
                textDecoration: "none",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow: "0 0 20px rgba(37, 99, 235, 0.4)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "transform 0.15s ease",
              }}
              className="hover:scale-105"
            >
              <span>Ouvrir l&apos;App</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Monumental Headline & Value Proposition) */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "70px 24px 40px",
          textAlign: "center",
        }}
      >
        {/* Animated Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 18px",
            borderRadius: "30px",
            background: "rgba(37, 99, 235, 0.2)",
            border: "1px solid rgba(56, 189, 248, 0.35)",
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
          <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#38bdf8", letterSpacing: "0.05em" }}>
            L&apos;AGENCE IA &amp; AGENDA NOUVELLE GÉNÉRATION
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(36px, 5.2vw, 68px)",
            fontWeight: "900",
            lineHeight: "1.12",
            letterSpacing: "-0.03em",
            maxWidth: "980px",
            margin: "0 auto 22px",
            background: "linear-gradient(180deg, #ffffff 40%, #93c5fd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Organisez votre vie.
          <br />
          L&apos;IA exécute le reste à la voix.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "#94a3b8",
            maxWidth: "760px",
            margin: "0 auto 36px",
            lineHeight: "1.6",
            fontWeight: "400",
          }}
        >
          <strong style={{ color: "#f8fafc" }}>Alamajonda</strong> combine un agenda intelligent haute fidélité, des alertes vocales proactives et un copilote IA autonome pour libérer jusqu&apos;à <span style={{ color: "#38bdf8", fontWeight: "700" }}>4 heures de temps libre</span> chaque semaine.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "44px",
          }}
        >
          <Link
            href="/register"
            style={{
              padding: "16px 36px",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: "800",
              color: "#ffffff",
              textDecoration: "none",
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              boxShadow: "0 10px 32px rgba(37, 99, 235, 0.5), 0 0 20px rgba(56, 189, 248, 0.3)",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
            className="hover:scale-105"
          >
            <span>Créer mon compte gratuitement</span>
            <ArrowRight size={18} />
          </Link>

          <button
            onClick={() => handleTestVoice("FEMALE")}
            style={{
              padding: "16px 28px",
              borderRadius: "14px",
              fontSize: "15.5px",
              fontWeight: "700",
              color: "#38bdf8",
              background: "rgba(56, 189, 248, 0.1)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              boxShadow: "0 0 25px rgba(56, 189, 248, 0.15)",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            className="hover:bg-cyan-500/20 hover:scale-105"
          >
            <Volume2 size={18} />
            <span>{isPlayingVoice ? "Synthèse vocale en cours..." : "Tester la voix IA en direct"}</span>
          </button>
        </div>

        {/* Live Trust Metrics Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "36px",
            flexWrap: "wrap",
            color: "#94a3b8",
            fontSize: "13.5px",
            fontWeight: "600",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Zap size={16} color="#38bdf8" />
            <span>Exécution IA &lt; 2ms</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Volume2 size={16} color="#fbbf24" />
            <span>Synthèse Vocale HD en Français</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Calendar size={16} color="#34d399" />
            <span>Synchro Google / Apple / Outlook (.ICS)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck size={16} color="#818cf8" />
            <span>Données 100% Chiffrées</span>
          </div>
        </div>
      </section>

      {/* 3. Central Monumental Glass Cockpit (Interactive App Showcase) */}
      <section id="cockpit" style={{ maxWidth: "1280px", margin: "40px auto 80px", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div
          style={{
            borderRadius: "26px",
            background: "linear-gradient(180deg, #0d1a3d 0%, #081026 100%)",
            border: "1.5px solid rgba(56, 189, 248, 0.35)",
            boxShadow: "0 30px 90px rgba(0, 0, 0, 0.8), 0 0 60px rgba(37, 99, 235, 0.25)",
            padding: "26px 32px",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Mac-Style Window Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "20px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              marginBottom: "24px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ef4444" }} />
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#f59e0b" }} />
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#10b981" }} />
              </div>
              <div style={{ fontSize: "14px", fontWeight: "800", color: "#f8fafc" }}>
                Alamajonda Cockpit • {liveTime || "12:00:00"}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(37, 99, 235, 0.2)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                }}
              >
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: "12px", color: "#38bdf8", fontWeight: "700" }}>Copilote IA Actif &bull; Prêt</span>
              </div>
            </div>
          </div>

          {/* Interactive AI Sandbox Simulator Strip */}
          <div
            style={{
              padding: "16px 20px",
              borderRadius: "16px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Testez une consigne IA en direct :
              </span>
              <span style={{ fontSize: "11px", color: "#38bdf8", fontWeight: "600" }}>Cliquez sur un exemple</span>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
              <button
                onClick={() => handleSimulateAiPrompt("Prends rendez-vous avec Paul demain à 14h")}
                style={{
                  padding: "7px 14px",
                  borderRadius: "10px",
                  background: "rgba(37, 99, 235, 0.15)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  color: "#e0f2fe",
                  fontSize: "12.5px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                className="hover:bg-blue-600/30"
              >
                💬 « Prends RDV avec Paul demain à 14h »
              </button>

              <button
                onClick={() => handleSimulateAiPrompt("Rappelle-moi d'acheter les pièces atelier à 18h")}
                style={{
                  padding: "7px 14px",
                  borderRadius: "10px",
                  background: "rgba(245, 158, 11, 0.15)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  color: "#fef3c7",
                  fontSize: "12.5px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                className="hover:bg-amber-600/30"
              >
                🔔 « Rappel vocal : pièces atelier à 18h »
              </button>
            </div>

            {/* AI Output preview */}
            {(isAiTyping || simulatedAiResponse) && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "rgba(37, 99, 235, 0.2)",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  fontSize: "13px",
                  color: "#ffffff",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Sparkles size={16} color="#38bdf8" />
                <span>{isAiTyping ? "Traitement instantané par le Copilote IA..." : simulatedAiResponse}</span>
              </div>
            )}
          </div>

          {/* 3-Column Cockpit Inner Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Card 1: Agenda & Prochains Créneaux */}
            <div
              style={{
                padding: "20px",
                borderRadius: "18px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Calendar size={18} color="#38bdf8" />
                  <span style={{ fontSize: "14.5px", fontWeight: "800", color: "#ffffff" }}>Planning Exécutif</span>
                </div>
                <span style={{ fontSize: "11px", color: "#38bdf8", fontWeight: "700", background: "rgba(56, 189, 248, 0.15)", padding: "2px 8px", borderRadius: "6px" }}>
                  Cette semaine
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(56, 189, 248, 0.15))",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>Rendez-vous Paul Durand</span>
                    <span style={{ fontSize: "11px", color: "#93c5fd", fontWeight: "600" }}>10:00</span>
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#cbd5e1", marginTop: "2px" }}>Atelier Liège · Confirmé</div>
                </div>

                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>Planning Stratégique</span>
                    <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600" }}>14:00</span>
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "2px" }}>Direction &bull; Visioconférence</div>
                </div>

                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>Conseil d&apos;Administration</span>
                    <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600" }}>17:30</span>
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "2px" }}>Bureau Liège · Présentiel</div>
                </div>
              </div>
            </div>

            {/* Card 2: Rappels Vocaux Proactifs */}
            <div
              style={{
                padding: "20px",
                borderRadius: "18px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Volume2 size={18} color="#fbbf24" />
                  <span style={{ fontSize: "14.5px", fontWeight: "800", color: "#ffffff" }}>Synthèse Vocale &amp; Alertes</span>
                </div>
                <span style={{ fontSize: "11px", color: "#fbbf24", fontWeight: "700", background: "rgba(245, 158, 11, 0.15)", padding: "2px 8px", borderRadius: "6px" }}>
                  Voix Haute
                </span>
              </div>

              <div
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  background: "rgba(245, 158, 11, 0.08)",
                  border: "1px solid rgba(245, 158, 11, 0.25)",
                  marginBottom: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b", animation: "pulse 1.5s infinite" }} />
                  <span style={{ fontSize: "12.5px", fontWeight: "800", color: "#fbbf24" }}>Déclenchement direct &bull; 18:00</span>
                </div>
                <p style={{ fontSize: "13px", color: "#ffffff", fontStyle: "italic", lineHeight: "1.4", margin: 0 }}>
                  « C&apos;est l&apos;heure d&apos;acheter les pièces de rechange avant la fermeture de l&apos;atelier. »
                </p>
              </div>

              <button
                onClick={() => handleTestVoice("FEMALE")}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  background: "rgba(56, 189, 248, 0.15)",
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                  color: "#38bdf8",
                  fontWeight: "700",
                  fontSize: "12.5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Play size={14} fill="#38bdf8" />
                <span>Tester la synthèse vocale en direct</span>
              </button>
            </div>

            {/* Card 3: Tâches & Mode Focus */}
            <div
              style={{
                padding: "20px",
                borderRadius: "18px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CheckSquare size={18} color="#34d399" />
                  <span style={{ fontSize: "14.5px", fontWeight: "800", color: "#ffffff" }}>Tâches Prioritaires</span>
                </div>
                <span style={{ fontSize: "11px", color: "#34d399", fontWeight: "700", background: "rgba(16, 185, 129, 0.15)", padding: "2px 8px", borderRadius: "6px" }}>
                  85% accompli
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                <div
                  onClick={() => setTask1Done(!task1Done)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "6px",
                      border: task1Done ? "none" : "2px solid #64748b",
                      background: task1Done ? "#10b981" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                    }}
                  >
                    {task1Done && <Check size={12} />}
                  </div>
                  <span style={{ fontSize: "13px", color: task1Done ? "#94a3b8" : "#ffffff", fontWeight: "600", textDecoration: task1Done ? "line-through" : "none" }}>
                    Vérifier les factures fournisseurs
                  </span>
                </div>

                <div
                  onClick={() => setTask2Done(!task2Done)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "6px",
                      border: task2Done ? "none" : "2px solid #64748b",
                      background: task2Done ? "#10b981" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                    }}
                  >
                    {task2Done && <Check size={12} />}
                  </div>
                  <span style={{ fontSize: "13px", color: task2Done ? "#94a3b8" : "#ffffff", fontWeight: "600", textDecoration: task2Done ? "line-through" : "none" }}>
                    Préparer les pièces pour l&apos;atelier
                  </span>
                </div>
              </div>

              {/* Productivity Stat */}
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontSize: "12.5px", fontWeight: "700", color: "#ffffff" }}>Gain de temps mesuré</div>
                <div style={{ fontSize: "14px", fontWeight: "900", color: "#34d399" }}>+4.5h / semaine</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: Les Piliers Technologiques (Bento Grid) */}
      <section id="features" style={{ maxWidth: "1280px", margin: "0 auto 100px", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span style={{ fontSize: "12.5px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            L&apos;Ingénierie Alamajonda
          </span>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", fontWeight: "900", color: "#ffffff", marginTop: "8px", letterSpacing: "-0.02em" }}>
            Conçu pour éliminer le stress de l&apos;organisation
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Bento 1 */}
          <div
            style={{
              padding: "32px",
              borderRadius: "22px",
              background: "linear-gradient(180deg, rgba(13, 27, 62, 0.7) 0%, rgba(8, 16, 38, 0.9) 100%)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
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
            <h3 style={{ fontSize: "19px", fontWeight: "800", color: "#ffffff", marginBottom: "10px" }}>
              Synthèse Vocale Proactive
            </h3>
            <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6" }}>
              Plus besoin de regarder votre écran en permanence. Dès l&apos;heure arrivée, l&apos;IA énonce vos consignes à voix haute avec une clarté naturelle.
            </p>
          </div>

          {/* Bento 2 */}
          <div
            style={{
              padding: "32px",
              borderRadius: "22px",
              background: "linear-gradient(180deg, rgba(13, 27, 62, 0.7) 0%, rgba(8, 16, 38, 0.9) 100%)",
              border: "1px solid rgba(99, 102, 241, 0.25)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
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
            <h3 style={{ fontSize: "19px", fontWeight: "800", color: "#ffffff", marginBottom: "10px" }}>
              Copilote IA &amp; Intent Router
            </h3>
            <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6" }}>
              Parlez ou écrivez naturellement. L&apos;IA classe automatiquement vos demandes entre rendez-vous, rappels ou tâches en moins de 2 millisecondes.
            </p>
          </div>

          {/* Bento 3 */}
          <div
            style={{
              padding: "32px",
              borderRadius: "22px",
              background: "linear-gradient(180deg, rgba(13, 27, 62, 0.7) 0%, rgba(8, 16, 38, 0.9) 100%)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
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
            <h3 style={{ fontSize: "19px", fontWeight: "800", color: "#ffffff", marginBottom: "10px" }}>
              Synchronisation .ICS Universelle
            </h3>
            <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6" }}>
              Exportez en un clic vers Google Calendar, Apple Calendar et Outlook pour garder votre planning accessible sur tous vos appareils.
            </p>
          </div>

          {/* Bento 4 */}
          <div
            style={{
              padding: "32px",
              borderRadius: "22px",
              background: "linear-gradient(180deg, rgba(13, 27, 62, 0.7) 0%, rgba(8, 16, 38, 0.9) 100%)",
              border: "1px solid rgba(234, 88, 12, 0.25)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
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
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: "19px", fontWeight: "800", color: "#ffffff", marginBottom: "10px" }}>
              Mode Focus &amp; Pomodoro
            </h3>
            <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6" }}>
              Bloquez des sessions de 25 minutes de travail intense sans distraction avec un suivi précis de vos objectifs quotidiens.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Section: Témoignages Clients */}
      <section id="testimonials" style={{ maxWidth: "1280px", margin: "0 auto 100px", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
            Recommandé par les dirigeants et professionnels
          </h2>
          <p style={{ fontSize: "15px", color: "#94a3b8", marginTop: "6px" }}>
            Découvrez comment Alamajonda fait la différence chaque jour.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Testimonial 1 */}
          <div
            style={{
              padding: "28px",
              borderRadius: "20px",
              background: "rgba(13, 27, 62, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "14px",
                }}
              >
                SI
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff" }}>Salem Imorou</div>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>Fondateur &amp; Dirigeant</div>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: "1.6", fontStyle: "italic" }}>
              « L&apos;annonce vocale directe des rendez-vous et le copilote IA sont un vrai tournant. Je ne rate plus aucune priorité de ma journée. »
            </p>
            <div style={{ display: "flex", gap: "4px", marginTop: "14px", color: "#f59e0b" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" />
              ))}
            </div>
          </div>

          {/* Testimonial 2 */}
          <div
            style={{
              padding: "28px",
              borderRadius: "20px",
              background: "rgba(13, 27, 62, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "14px",
                }}
              >
                CL
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff" }}>Claire Laurent</div>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>Consultante Exécutive</div>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: "1.6", fontStyle: "italic" }}>
              « L&apos;IA comprend immédiatement les consignes en langage naturel et organise mon agenda. Plus de 4 heures économisées chaque semaine. »
            </p>
            <div style={{ display: "flex", gap: "4px", marginTop: "14px", color: "#f59e0b" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" />
              ))}
            </div>
          </div>

          {/* Testimonial 3 */}
          <div
            style={{
              padding: "28px",
              borderRadius: "20px",
              background: "rgba(13, 27, 62, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #059669, #10b981)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "14px",
                }}
              >
                MD
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff" }}>Marc Dubois</div>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>Directeur de Projet</div>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: "1.6", fontStyle: "italic" }}>
              « L&apos;interface est ultra-propre, lisible et ultra-réactive. Alamajonda est devenu mon outil incontournable de tous les jours. »
            </p>
            <div style={{ display: "flex", gap: "4px", marginTop: "14px", color: "#f59e0b" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: Grille Tarifaire */}
      <section id="pricing" style={{ maxWidth: "1000px", margin: "0 auto 100px", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ fontSize: "12px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Offres Claires
          </span>
          <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#ffffff", marginTop: "8px" }}>
            Passez à la vitesse supérieure
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
              padding: "36px",
              borderRadius: "22px",
              background: "rgba(13, 27, 62, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff" }}>Gratuit</h3>
            <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>
              Pour découvrir la puissance d&apos;Alamajonda
            </p>
            <div style={{ fontSize: "36px", fontWeight: "900", color: "#ffffff", margin: "20px 0" }}>
              0€ <span style={{ fontSize: "14px", color: "#94a3b8", fontWeight: "500" }}>/ pour toujours</span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "12px", fontSize: "13.5px", color: "#cbd5e1" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Check size={16} color="#38bdf8" />
                <span>Agenda &amp; Calendrier illimité</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Check size={16} color="#38bdf8" />
                <span>Synthèse vocale native standard</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Check size={16} color="#38bdf8" />
                <span>Copilote IA (10 actions / jour)</span>
              </li>
            </ul>

            <Link
              href="/register"
              style={{
                display: "block",
                textAlign: "center",
                padding: "13px",
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
              padding: "38px",
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
                <span>Mode appel &amp; alarmes prioritaires</span>
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

      {/* 7. Section: CTA Final */}
      <section style={{ maxWidth: "1140px", margin: "0 auto 80px", padding: "0 24px", textAlign: "center" }}>
        <div
          style={{
            padding: "54px 36px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #0d1b3e 100%)",
            border: "1.5px solid rgba(56, 189, 248, 0.4)",
            boxShadow: "0 25px 70px rgba(37, 99, 235, 0.45)",
          }}
        >
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "900", color: "#ffffff", marginBottom: "16px", letterSpacing: "-0.02em" }}>
            Prêt à transformer votre quotidien ?
          </h2>
          <p style={{ fontSize: "16.5px", color: "#e0f2fe", maxWidth: "620px", margin: "0 auto 32px", lineHeight: "1.5" }}>
            Rejoignez dès aujourd&apos;hui les professionnels qui automatisent leurs journées avec Alamajonda.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <Link
              href="/register"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 36px",
                borderRadius: "14px",
                background: "#ffffff",
                color: "#1d4ed8",
                fontWeight: "800",
                fontSize: "15.5px",
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              }}
              className="hover:scale-105"
            >
              <span>Créer mon compte gratuit</span>
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 30px",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "15.5px",
                textDecoration: "none",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span>Se connecter</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Footer (Ultra-Clean & High Contrast) */}
      <footer
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "40px 24px",
          background: "#040711",
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "13.5px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          <Logo size={30} showText={true} />
          <p style={{ color: "#64748b" }}>© {new Date().getFullYear()} Alamajonda. Ton assistant, ton quotidien. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

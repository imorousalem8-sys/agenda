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
  Users,
  ChevronRight,
  Headphones,
  Smartphone,
  Star,
  Mic,
  Sliders,
  ChevronLeft,
} from "lucide-react";
import Logo from "@/components/brand/Logo";
import { speakAIText, playAlertChime } from "@/lib/voice";

export default function LandingPage() {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activeVoiceGender, setActiveVoiceGender] = useState<"FEMALE" | "MALE">("FEMALE");
  const [task1Done, setTask1Done] = useState(false);
  const [task2Done, setTask2Done] = useState(true);

  const handleTestVoice = async (gender: "FEMALE" | "MALE" = "FEMALE") => {
    setActiveVoiceGender(gender);
    setIsPlayingVoice(true);
    await playAlertChime();

    const sample =
      gender === "FEMALE"
        ? "Bonjour Salem ! Je suis votre assistante Alamajonda. Vos 3 rendez-vous de la journée sont confirmés et votre rappel atelier est programmé pour 18 heures."
        : "Bonjour Salem ! Je suis votre copilote Alamajonda. Votre planning hebdomadaire est parfaitement optimisé avec 4 heures de temps libre préservées.";

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
        background: "linear-gradient(135deg, #f0f7ff 0%, #e0f0fe 35%, #d4eafc 70%, #eff6ff 100%)",
        color: "#0f172a",
        fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Radiant Giant Royal Sapphire Mesh Orb in Background (as in mockup) */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          right: "-120px",
          width: "720px",
          height: "720px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #2563eb 0%, #1d4ed8 45%, rgba(37, 99, 235, 0.4) 70%, transparent 85%)",
          filter: "blur(50px)",
          opacity: 0.85,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "100px",
          left: "-150px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(37, 99, 235, 0.15) 50%, transparent 75%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* 1. Top Royal Sapphire Navigation Bar (Match Mockup) */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          padding: "12px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1380px",
            margin: "0 auto",
            borderRadius: "18px",
            background: "linear-gradient(90deg, #1d4ed8 0%, #2563eb 60%, #1e40af 100%)",
            boxShadow: "0 10px 30px rgba(37, 99, 235, 0.35)",
            padding: "14px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#ffffff",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Logo size={32} showText={true} />
          </div>

          {/* Nav Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
            className="hidden md:flex"
          >
            <a
              href="#features"
              style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff", textDecoration: "none", opacity: 0.95 }}
              className="hover:opacity-100"
            >
              Fonctionnalités
            </a>
            <a
              href="#voice"
              style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff", textDecoration: "none", opacity: 0.95 }}
              className="hover:opacity-100"
            >
              Synthèse Vocale
            </a>
            <a
              href="#pricing"
              style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff", textDecoration: "none", opacity: 0.95 }}
              className="hover:opacity-100"
            >
              Tarifs
            </a>
            <a
              href="#testimonials"
              style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff", textDecoration: "none", opacity: 0.95 }}
              className="hover:opacity-100"
            >
              Avis
            </a>
          </nav>

          {/* Action Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/login"
              style={{
                padding: "8px 20px",
                borderRadius: "30px",
                fontSize: "13.5px",
                fontWeight: "700",
                color: "#ffffff",
                textDecoration: "none",
                border: "1.5px solid rgba(255, 255, 255, 0.4)",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(6px)",
                transition: "all 0.15s ease",
              }}
              className="hover:bg-white hover:text-blue-700"
            >
              Connexion
            </Link>

            <Link
              href="/dashboard"
              style={{
                padding: "8px 22px",
                borderRadius: "30px",
                fontSize: "13.5px",
                fontWeight: "800",
                color: "#1d4ed8",
                textDecoration: "none",
                background: "#ffffff",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "transform 0.15s ease",
              }}
              className="hover:scale-105"
            >
              <span>Accéder au Cockpit</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (2-Column Architecture from Mockup) */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1380px",
          margin: "0 auto",
          padding: "50px 24px 80px",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "48px",
          alignItems: "center",
        }}
      >
        {/* Left Column: Hero Copy & Feature Badges */}
        <div>
          <h1
            style={{
              fontSize: "clamp(38px, 4.2vw, 56px)",
              fontWeight: "900",
              lineHeight: "1.12",
              letterSpacing: "-0.03em",
              color: "#0b152e",
              marginBottom: "20px",
            }}
          >
            Votre Agenda &amp; Copilote IA d&apos;Action Exécutif
          </h1>

          <p
            style={{
              fontSize: "16.5px",
              color: "#475569",
              lineHeight: "1.6",
              maxWidth: "580px",
              marginBottom: "32px",
              fontWeight: "500",
            }}
          >
            Le copilote intelligent qui simplifie votre vie exécutive. Automatisez vos rappels vocaux, organisez vos rendez-vous et optimisez votre temps, le tout géré par l&apos;IA d&apos;Alamajonda.
          </p>

          {/* Action CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "40px" }}>
            <Link
              href="/register"
              style={{
                padding: "15px 32px",
                borderRadius: "30px",
                fontSize: "15.5px",
                fontWeight: "800",
                color: "#ffffff",
                textDecoration: "none",
                background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                boxShadow: "0 10px 28px rgba(37, 99, 235, 0.45)",
                border: "none",
                display: "inline-flex",
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
                borderRadius: "30px",
                fontSize: "15px",
                fontWeight: "700",
                color: "#0f172a",
                background: "rgba(255, 255, 255, 0.85)",
                border: "1px solid rgba(37, 99, 235, 0.25)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backdropFilter: "blur(10px)",
                transition: "all 0.2s ease",
              }}
              className="hover:bg-white hover:shadow-md"
              id="hero-voice-demo-btn"
            >
              <Volume2 size={18} color="#2563eb" />
              <span>{isPlayingVoice ? "Lecture en cours..." : "Tester la voix IA"}</span>
            </button>
          </div>

          {/* 4 Feature Pill Badges (Exact 2x2 grid from mockup) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              maxWidth: "560px",
            }}
          >
            {/* Badge 1: Vocal Reminders */}
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow: "0 4px 16px rgba(37, 99, 235, 0.08)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Mic size={20} />
              </div>
              <div>
                <div style={{ fontSize: "13.5px", fontWeight: "800", color: "#0b152e" }}>Vocal Reminders</div>
                <div style={{ fontSize: "11.5px", color: "#64748b" }}>Rappels vocaux proactifs</div>
              </div>
            </div>

            {/* Badge 2: Client Management */}
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow: "0 4px 16px rgba(37, 99, 235, 0.08)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Users size={20} />
              </div>
              <div>
                <div style={{ fontSize: "13.5px", fontWeight: "800", color: "#0b152e" }}>Client Management</div>
                <div style={{ fontSize: "11.5px", color: "#64748b" }}>Organisation des RDV</div>
              </div>
            </div>

            {/* Badge 3: Time Optimization */}
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow: "0 4px 16px rgba(37, 99, 235, 0.08)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Clock size={20} />
              </div>
              <div>
                <div style={{ fontSize: "13.5px", fontWeight: "800", color: "#0b152e" }}>Time Optimization</div>
                <div style={{ fontSize: "11.5px", color: "#64748b" }}>Gain de temps garanti</div>
              </div>
            </div>

            {/* Badge 4: Vocal Agent AI */}
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow: "0 4px 16px rgba(37, 99, 235, 0.08)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Sparkles size={20} />
              </div>
              <div>
                <div style={{ fontSize: "13.5px", fontWeight: "800", color: "#0b152e" }}>Vocal Agent AI</div>
                <div style={{ fontSize: "11.5px", color: "#64748b" }}>Copilote IA instantané</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: The Monumental Frosted Glass Cockpit Widget (Directly from Mockup!) */}
        <div style={{ position: "relative" }}>
          {/* Main Agenda Card */}
          <div
            style={{
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.82)",
              backdropFilter: "blur(24px)",
              border: "1.5px solid rgba(255, 255, 255, 0.95)",
              boxShadow: "0 25px 60px rgba(37, 99, 235, 0.2), 0 4px 16px rgba(0, 0, 0, 0.04)",
              padding: "24px",
              position: "relative",
              zIndex: 3,
            }}
          >
            {/* Header of Agenda */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#0b152e" }}>
                Agenda de la semaine
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#64748b",
                    cursor: "pointer",
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#2563eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  <Calendar size={14} />
                </button>
                <button
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#64748b",
                    cursor: "pointer",
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr repeat(6, 1fr)",
                gap: "8px",
                fontSize: "11px",
                fontWeight: "700",
                color: "#64748b",
                textAlign: "center",
                marginBottom: "12px",
                paddingBottom: "8px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
              }}
            >
              <div style={{ textAlign: "left" }}>Utilisateur</div>
              <div>Lun</div>
              <div>Mar</div>
              <div>Mer</div>
              <div>Jeu</div>
              <div>Ven</div>
              <div>Sam</div>
            </div>

            {/* User Row 1 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr repeat(6, 1fr)",
                gap: "8px",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#1e293b",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: "800",
                  }}
                >
                  S
                </div>
                <div>
                  <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#0b152e", lineHeight: 1.1 }}>Salem Imorou</div>
                  <div style={{ fontSize: "9.5px", color: "#64748b" }}>Compte Pro</div>
                </div>
              </div>

              {/* Event 1: Client Imorou */}
              <div
                style={{
                  gridColumn: "2 / 4",
                  padding: "6px 8px",
                  borderRadius: "8px",
                  background: "#2563eb",
                  color: "#ffffff",
                  fontSize: "10.5px",
                  fontWeight: "700",
                  boxShadow: "0 2px 8px rgba(37, 99, 235, 0.3)",
                }}
              >
                <div>Client Imorou</div>
                <div style={{ fontSize: "9px", opacity: 0.85 }}>19 SEP · 18:00</div>
              </div>

              {/* Empty Lun/Mar */}
              <div />
              <div />
            </div>

            {/* User Row 2: Strategic Planning & Board Meeting */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr repeat(6, 1fr)",
                gap: "8px",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#0284c7",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: "800",
                  }}
                >
                  D
                </div>
                <div>
                  <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#0b152e", lineHeight: 1.1 }}>Direction</div>
                  <div style={{ fontSize: "9.5px", color: "#64748b" }}>Atelier</div>
                </div>
              </div>

              <div />
              {/* Event 2: Strategic Planning */}
              <div
                style={{
                  gridColumn: "3 / 5",
                  padding: "6px 8px",
                  borderRadius: "8px",
                  background: "#10b981",
                  color: "#ffffff",
                  fontSize: "10.5px",
                  fontWeight: "700",
                  boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
                }}
              >
                <div>Strategic Planning</div>
                <div style={{ fontSize: "9px", opacity: 0.85 }}>10 SEP · 10:00</div>
              </div>

              {/* Event 3: Board Meeting */}
              <div
                style={{
                  gridColumn: "5 / 7",
                  padding: "6px 8px",
                  borderRadius: "8px",
                  background: "#7c3aed",
                  color: "#ffffff",
                  fontSize: "10.5px",
                  fontWeight: "700",
                  boxShadow: "0 2px 8px rgba(124, 58, 237, 0.3)",
                }}
              >
                <div>Board Meeting</div>
                <div style={{ fontSize: "9px", opacity: 0.85 }}>11 SEP · 14:00</div>
              </div>
            </div>

            {/* Row 3: Workshop */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr repeat(6, 1fr)",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#ea580c",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: "800",
                  }}
                >
                  P
                </div>
                <div>
                  <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#0b152e", lineHeight: 1.1 }}>Paul Durand</div>
                  <div style={{ fontSize: "9.5px", color: "#64748b" }}>Client VIP</div>
                </div>
              </div>

              <div />
              <div
                style={{
                  gridColumn: "3 / 6",
                  padding: "6px 8px",
                  borderRadius: "8px",
                  background: "#f97316",
                  color: "#ffffff",
                  fontSize: "10.5px",
                  fontWeight: "700",
                  boxShadow: "0 2px 8px rgba(249, 115, 22, 0.3)",
                }}
              >
                <div>Atelier &amp; Débriefing Exécutif</div>
                <div style={{ fontSize: "9px", opacity: 0.85 }}>10 SEP · 17:00</div>
              </div>
            </div>
          </div>

          {/* 3 Bottom Floating Interactive Cards (As seen in the Mockup) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {/* Card 1: Parler à l'IA */}
            <div
              onClick={() => handleTestVoice("FEMALE")}
              style={{
                borderRadius: "18px",
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 10px 25px rgba(37, 99, 235, 0.12)",
                padding: "14px",
                cursor: "pointer",
                transition: "transform 0.15s ease",
              }}
              className="hover:scale-105"
            >
              <div style={{ fontSize: "12.5px", fontWeight: "800", color: "#0b152e", marginBottom: "8px" }}>
                Parler à l&apos;IA
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(37, 99, 235, 0.08)",
                  padding: "6px 10px",
                  borderRadius: "10px",
                }}
              >
                <span style={{ fontSize: "11px", color: "#2563eb", fontWeight: "700" }}>
                  {isPlayingVoice ? "En écoute..." : "Activer micro"}
                </span>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "#2563eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                  }}
                >
                  <Volume2 size={13} />
                </div>
              </div>
            </div>

            {/* Card 2: Rappels du jour */}
            <div
              onClick={() => handleTestVoice("MALE")}
              style={{
                borderRadius: "18px",
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 10px 25px rgba(37, 99, 235, 0.12)",
                padding: "14px",
                cursor: "pointer",
                transition: "transform 0.15s ease",
              }}
              className="hover:scale-105"
            >
              <div style={{ fontSize: "12.5px", fontWeight: "800", color: "#0b152e", marginBottom: "8px" }}>
                Rappels du jour
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "10.5px" }}>
                  <span style={{ background: "#fee2e2", color: "#dc2626", fontWeight: "700", padding: "2px 6px", borderRadius: "4px" }}>
                    Priorité
                  </span>
                  <Volume2 size={12} color="#2563eb" />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "10.5px" }}>
                  <span style={{ background: "#fef3c7", color: "#d97706", fontWeight: "700", padding: "2px 6px", borderRadius: "4px" }}>
                    Atelier
                  </span>
                  <Volume2 size={12} color="#2563eb" />
                </div>
              </div>
            </div>

            {/* Card 3: Tâches prioritaires */}
            <div
              style={{
                borderRadius: "18px",
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 10px 25px rgba(37, 99, 235, 0.12)",
                padding: "14px",
              }}
            >
              <div style={{ fontSize: "12.5px", fontWeight: "800", color: "#0b152e", marginBottom: "8px" }}>
                Tâches prioritaires
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div
                  onClick={() => setTask1Done(!task1Done)}
                  style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
                >
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "4px",
                      border: task1Done ? "none" : "1.5px solid #94a3b8",
                      background: task1Done ? "#10b981" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                    }}
                  >
                    {task1Done && <Check size={10} />}
                  </div>
                  <span style={{ fontSize: "10.5px", color: "#334155", fontWeight: "600", textDecoration: task1Done ? "line-through" : "none" }}>
                    Contacter Paul
                  </span>
                </div>

                <div
                  onClick={() => setTask2Done(!task2Done)}
                  style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
                >
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "4px",
                      border: task2Done ? "none" : "1.5px solid #94a3b8",
                      background: task2Done ? "#10b981" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                    }}
                  >
                    {task2Done && <Check size={10} />}
                  </div>
                  <span style={{ fontSize: "10.5px", color: "#334155", fontWeight: "600", textDecoration: task2Done ? "line-through" : "none" }}>
                    Pièces atelier
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section: Témoignages Clients & Succès Exécutifs (Bottom Carousel from Mockup) */}
      <section
        id="testimonials"
        style={{
          padding: "60px 24px 80px",
          maxWidth: "1380px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#0b152e", letterSpacing: "-0.02em" }}>
            Adopté par les professionnels exigeants
          </h2>
          <p style={{ fontSize: "15px", color: "#64748b", marginTop: "6px" }}>
            Voici comment Alamajonda transforme l&apos;organisation quotidienne.
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
              padding: "24px",
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.95)",
              boxShadow: "0 10px 30px rgba(37, 99, 235, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1e293b, #0f172a)",
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
                <div style={{ fontSize: "14.5px", fontWeight: "800", color: "#0b152e" }}>Salem Imorou</div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>Fondateur &amp; Dirigeant</div>
              </div>
            </div>
            <p style={{ fontSize: "13.5px", color: "#334155", lineHeight: "1.6", fontStyle: "italic" }}>
              « La synthèse vocale proactive qui vous parle directement dès l&apos;heure du rendez-vous est un atout révolutionnaire. Je ne rate plus aucune réunion. »
            </p>
            <div style={{ display: "flex", gap: "4px", marginTop: "12px", color: "#f59e0b" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" />
              ))}
            </div>
          </div>

          {/* Testimonial 2 */}
          <div
            style={{
              padding: "24px",
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.95)",
              boxShadow: "0 10px 30px rgba(37, 99, 235, 0.08)",
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
                CL
              </div>
              <div>
                <div style={{ fontSize: "14.5px", fontWeight: "800", color: "#0b152e" }}>Claire Laurent</div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>Consultante Exécutive</div>
              </div>
            </div>
            <p style={{ fontSize: "13.5px", color: "#334155", lineHeight: "1.6", fontStyle: "italic" }}>
              « L&apos;IA comprend mes instructions vocales en une seconde et organise l&apos;agenda instantanément. Un gain de plus de 4 heures chaque semaine. »
            </p>
            <div style={{ display: "flex", gap: "4px", marginTop: "12px", color: "#f59e0b" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" />
              ))}
            </div>
          </div>

          {/* Testimonial 3 */}
          <div
            style={{
              padding: "24px",
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.95)",
              boxShadow: "0 10px 30px rgba(37, 99, 235, 0.08)",
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
                <div style={{ fontSize: "14.5px", fontWeight: "800", color: "#0b152e" }}>Marc Dubois</div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>Directeur de Projet</div>
              </div>
            </div>
            <p style={{ fontSize: "13.5px", color: "#334155", lineHeight: "1.6", fontStyle: "italic" }}>
              « Le design est somptueux, ultra-lisible et réactif. Alamajonda est désormais mon centre névralgique pour toutes mes journées de travail. »
            </p>
            <div style={{ display: "flex", gap: "4px", marginTop: "12px", color: "#f59e0b" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: Call to Action & Tarifs */}
      <section
        id="pricing"
        style={{
          padding: "60px 24px 80px",
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            borderRadius: "28px",
            background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #1e40af 100%)",
            boxShadow: "0 20px 50px rgba(37, 99, 235, 0.35)",
            padding: "48px 36px",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "28px",
          }}
        >
          <div>
            <h3 style={{ fontSize: "30px", fontWeight: "900", letterSpacing: "-0.02em", color: "#ffffff", marginBottom: "8px" }}>
              Prêt à passer à l&apos;action avec Alamajonda ?
            </h3>
            <p style={{ fontSize: "15.5px", color: "rgba(255, 255, 255, 0.9)", maxWidth: "560px", lineHeight: "1.5" }}>
              Créez votre compte en 30 secondes et découvrez la puissance de la synthèse vocale et du copilote IA exécutif.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <Link
              href="/register"
              style={{
                padding: "14px 30px",
                borderRadius: "30px",
                background: "#ffffff",
                color: "#1d4ed8",
                fontWeight: "800",
                fontSize: "15px",
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              className="hover:scale-105"
            >
              <span>Créer mon compte</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/login"
              style={{
                padding: "14px 26px",
                borderRadius: "30px",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                border: "1.5px solid rgba(255, 255, 255, 0.4)",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "15px",
                textDecoration: "none",
              }}
              className="hover:bg-white/25"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(37, 99, 235, 0.15)",
          padding: "32px 24px",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(12px)",
          textAlign: "center",
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <Logo size={28} showText={true} />
          <p>© {new Date().getFullYear()} Alamajonda. Ton assistant, ton quotidien. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

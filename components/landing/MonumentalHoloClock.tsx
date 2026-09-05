"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, Shield, Sparkles, Zap, Radio, BellRing, Volume2, CheckCircle2, Play, Terminal, Cpu } from "lucide-react";
import Image from "next/image";

export default function MonumentalHoloClock() {
  const [time, setTime] = useState<Date | null>(null);
  const [ms, setMs] = useState("00");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<"LIVE_COCKPIT" | "HD_SYSTEM">("LIVE_COCKPIT");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());

    const interval = setInterval(() => {
      const now = new Date();
      setTime(now);
      setMs(Math.floor(now.getMilliseconds() / 10).toString().padStart(2, "0"));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || window.innerWidth < 768) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = -(y / (rect.height / 2)) * 8;
    const tiltY = (x / (rect.width / 2)) * 8;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const playVoiceAlarmSample = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setIsPlayingAudio(true);

    const text = "Bonjour ! Alerte de votre Agence IA. Il est l'heure de votre rendez-vous de 14 heures : Signature du contrat avec Marc. Veuillez confirmer votre prise en charge.";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const hours = time ? time.getHours() : 0;
  const minutes = time ? time.getMinutes() : 0;
  const seconds = time ? time.getSeconds() : 0;
  const milliseconds = time ? time.getMilliseconds() : 0;

  const secAngle = (seconds + milliseconds / 1000) * 6;
  const minAngle = (minutes + seconds / 60) * 6;
  const hourAngle = ((hours % 12) + minutes / 60) * 30;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  const formattedDate = time
    ? time.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  if (!mounted) {
    return <div style={{ minHeight: "360px", width: "100%" }} />;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        maxWidth: "1140px",
        margin: "0 auto",
        perspective: "1600px",
        transformStyle: "preserve-3d",
        width: "100%",
      }}
      className="select-none"
    >
      {/* 3D Wrapper */}
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s ease-out",
          transformStyle: "preserve-3d",
          position: "relative",
          width: "100%",
        }}
      >
        {/* Subtle monochrome ambient light behind the card */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) translateZ(-50px)",
            width: "min(680px, 90vw)",
            height: "min(460px, 80vw)",
            borderRadius: "40px",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(52, 211, 153, 0.04) 45%, transparent 75%)",
            filter: "blur(50px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Outer Titanium & Glass Cockpit Container */}
        <div
          className="chrono-container-pad"
          style={{
            position: "relative",
            zIndex: 1,
            background: "linear-gradient(180deg, #0d0d11 0%, #050507 100%)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow:
              "0 30px 90px rgba(0, 0, 0, 0.95), 0 0 1px 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
            padding: "24px clamp(12px, 3vw, 24px)",
            overflow: "hidden",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Top Window Bar - Developer IDE Style */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
              paddingBottom: "14px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {/* Window Dots & Identifier */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#eab308", display: "inline-block" }} />
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Terminal size={13} color="#34d399" />
                <span style={{ color: "#e2e8f0", fontWeight: "600" }}>agence-ia-core</span>
                <span style={{ color: "#64748b" }} className="hidden-mobile">// v2.4</span>
              </div>
            </div>

            {/* View Switcher Tabs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                padding: "3px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab("LIVE_COCKPIT")}
                style={{
                  background: activeTab === "LIVE_COCKPIT" ? "#1e293b" : "transparent",
                  color: activeTab === "LIVE_COCKPIT" ? "#ffffff" : "#94a3b8",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  border: activeTab === "LIVE_COCKPIT" ? "1px solid rgba(255, 255, 255, 0.15)" : "none",
                }}
              >
                <Cpu size={12} color="#34d399" />
                Cockpit
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("HD_SYSTEM")}
                style={{
                  background: activeTab === "HD_SYSTEM" ? "#1e293b" : "transparent",
                  color: activeTab === "HD_SYSTEM" ? "#ffffff" : "#94a3b8",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  border: activeTab === "HD_SYSTEM" ? "1px solid rgba(255, 255, 255, 0.15)" : "none",
                }}
              >
                <Sparkles size={12} color="#38bdf8" />
                Vue HD
              </button>
            </div>

            {/* Status Telemetry */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                }}
              />
              <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#34d399", fontWeight: "700" }}>
                OPÉRATIONNEL
              </span>
            </div>
          </div>

          {activeTab === "LIVE_COCKPIT" ? (
            /* Tab 1: Live Interactive Software Cockpit */
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  alignItems: "center",
                  gap: "20px",
                }}
                className="chrono-grid"
              >
                {/* Left Column: Voice Agent & Realtime Activity */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                  {/* Voice input card */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "14px",
                      padding: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#94a3b8", fontWeight: "700" }}>
                        AGENCE IA • DICTÉE
                      </span>
                      <span style={{ fontSize: "10px", background: "rgba(52, 211, 153, 0.12)", color: "#34d399", padding: "2px 6px", borderRadius: "10px", border: "1px solid rgba(52, 211, 153, 0.3)" }}>
                        0.4s
                      </span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#f8fafc", fontStyle: "italic", margin: "0 0 8px 0", lineHeight: "1.4" }}>
                      &ldquo;Rappelle-moi demain 14h de signer le contrat avec Marc.&rdquo;
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#34d399" }}>
                      <CheckCircle2 size={13} />
                      <span>Événement synchronisé • Alarme armée</span>
                    </div>
                  </div>

                  {/* Persistent Alarm Widget */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "14px",
                      padding: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#94a3b8", fontWeight: "700" }}>
                        SENTINELLE D&apos;ALARME
                      </span>
                      <BellRing size={14} color="#f59e0b" />
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff", marginBottom: "2px" }}>
                      0 Oubli Garanti
                    </div>
                    <p style={{ fontSize: "11.5px", color: "#94a3b8", margin: 0 }}>
                      Sonnerie + synthèse vocale continue jusqu&apos;à confirmation explicite.
                    </p>
                  </div>
                </div>

                {/* Center: Precision Dark Dial Clock */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "min(210px, 60vw)",
                      height: "min(210px, 60vw)",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, #141419 0%, #09090c 70%, #000000 100%)",
                      border: "2px solid rgba(255, 255, 255, 0.15)",
                      boxShadow: "0 0 30px rgba(0, 0, 0, 0.9), inset 0 0 25px rgba(0, 0, 0, 0.8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {/* Dial Ticks */}
                    {[...Array(12)].map((_, i) => {
                      const isQuarter = i % 3 === 0;
                      return (
                        <div
                          key={i}
                          style={{
                            position: "absolute",
                            top: "6px",
                            left: "calc(50% - 1px)",
                            width: isQuarter ? "2px" : "1px",
                            height: isQuarter ? "10px" : "5px",
                            background: isQuarter ? "#ffffff" : "rgba(255, 255, 255, 0.3)",
                            transformOrigin: "bottom center",
                            transform: `rotate(${i * 30}deg) translateY(0px)`,
                          }}
                        />
                      );
                    })}

                    {/* Quarter Numbers */}
                    <span style={{ position: "absolute", top: "16px", fontSize: "11px", fontWeight: "700", color: "#cbd5e1", fontFamily: "monospace" }}>12</span>
                    <span style={{ position: "absolute", right: "16px", fontSize: "11px", fontWeight: "700", color: "#cbd5e1", fontFamily: "monospace" }}>03</span>
                    <span style={{ position: "absolute", bottom: "16px", fontSize: "11px", fontWeight: "700", color: "#cbd5e1", fontFamily: "monospace" }}>06</span>
                    <span style={{ position: "absolute", left: "16px", fontSize: "11px", fontWeight: "700", color: "#cbd5e1", fontFamily: "monospace" }}>09</span>

                    {/* Hour Hand */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "50%",
                        left: "calc(50% - 2px)",
                        width: "4px",
                        height: "45px",
                        background: "#ffffff",
                        borderRadius: "4px",
                        transformOrigin: "bottom center",
                        transform: `rotate(${hourAngle}deg)`,
                        zIndex: 4,
                        boxShadow: "0 0 6px rgba(255, 255, 255, 0.4)",
                      }}
                    />

                    {/* Minute Hand */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "50%",
                        left: "calc(50% - 1.5px)",
                        width: "3px",
                        height: "65px",
                        background: "#cbd5e1",
                        borderRadius: "3px",
                        transformOrigin: "bottom center",
                        transform: `rotate(${minAngle}deg)`,
                        zIndex: 5,
                      }}
                    />

                    {/* Second Hand (Emerald) */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "35px",
                        left: "calc(50% - 1px)",
                        width: "2px",
                        height: "85px",
                        background: "#34d399",
                        borderRadius: "2px",
                        transformOrigin: "50% 70px",
                        transform: `rotate(${secAngle}deg)`,
                        zIndex: 6,
                        boxShadow: "0 0 8px #34d399",
                      }}
                    />

                    {/* Center Pivot */}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "#ffffff",
                        border: "2px solid #34d399",
                        zIndex: 10,
                      }}
                    />
                  </div>
                </div>

                {/* Right Column: Real Voice Synthesis Tester & Pro/Perso */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                  {/* Interactive Audio Voice Player */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "14px",
                      padding: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#94a3b8", fontWeight: "700" }}>
                        SYNTHÈSE VOCALE HD
                      </span>
                      <Volume2 size={13} color="#38bdf8" />
                    </div>

                    {/* Audio Waveform visualizer */}
                    <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "24px", marginBottom: "10px" }}>
                      {[14, 22, 12, 28, 18, 14, 24, 20, 10, 26, 16, 22, 12, 24, 18, 14].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: isPlayingAudio ? `${Math.max(5, (h * (1 + Math.sin(i + (time?.getMilliseconds() || 0) * 0.01))))}px` : `${h}px`,
                            background: isPlayingAudio ? "#34d399" : "rgba(255, 255, 255, 0.2)",
                            borderRadius: "2px",
                            transition: "height 0.1s ease, background 0.2s ease",
                          }}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={playVoiceAlarmSample}
                      style={{
                        width: "100%",
                        background: isPlayingAudio ? "#10b981" : "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "8px",
                        padding: "7px 10px",
                        color: "#ffffff",
                        fontSize: "11.5px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Play size={11} fill="#ffffff" />
                      <span>{isPlayingAudio ? "Lecture en cours..." : "Tester la synthèse vocale"}</span>
                    </button>
                  </div>

                  {/* Calendar Pipeline */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "14px",
                      padding: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#94a3b8", fontWeight: "700" }}>
                        PIPELINE SÉCURISÉ
                      </span>
                      <Zap size={13} color="#34d399" />
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff", marginBottom: "2px" }}>
                      Double Espace Pro & Perso
                    </div>
                    <p style={{ fontSize: "11.5px", color: "#94a3b8", margin: 0 }}>
                      Cloisonnement étanche et export d&apos;activité instantané.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Atomic Time Display */}
              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px", fontFamily: "monospace" }}>
                  <span style={{ fontSize: "clamp(24px, 5vw, 34px)", fontWeight: "900", color: "#ffffff", letterSpacing: "0.03em" }}>
                    {formattedHours}:{formattedMinutes}:{formattedSeconds}
                  </span>
                  <span style={{ fontSize: "18px", fontWeight: "700", color: "#34d399" }}>
                    .{ms}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "12px", color: "#94a3b8", textTransform: "capitalize" }}>
                    {formattedDate}
                  </span>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#475569" }} />
                  <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#64748b" }}>
                    UTC+2
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: High-Definition Software Architecture Mockup */
            <div style={{ position: "relative", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.1)", width: "100%" }}>
              <Image
                src="/images/dark_software_hud.jpg"
                alt="AlarmAgenda Software Interface Preview"
                width={1200}
                height={675}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "14px",
                }}
                priority
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  background: "rgba(0, 0, 0, 0.8)",
                  backdropFilter: "blur(8px)",
                  padding: "4px 10px",
                  borderRadius: "14px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  color: "#e2e8f0",
                }}
              >
                Moteur v2.4 • Architecture Développeur
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

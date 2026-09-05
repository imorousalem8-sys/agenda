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
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = -(y / (rect.height / 2)) * 10;
    const tiltY = (x / (rect.width / 2)) * 10;
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

    const text = "Bonjour ! Alerte AlarmAgenda Pro. Il est l'heure de votre rendez-vous de 14 heures : Signature du contrat avec Marc. Veuillez confirmer votre prise en charge.";
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
    return <div style={{ minHeight: "520px", width: "100%" }} />;
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
        }}
      >
        {/* Subtle monochrome ambient light behind the card */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) translateZ(-50px)",
            width: "min(720px, 95vw)",
            height: "min(520px, 85vw)",
            borderRadius: "40px",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(52, 211, 153, 0.04) 45%, transparent 75%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Outer Titanium & Glass Cockpit Container */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            background: "linear-gradient(180deg, #0d0d11 0%, #050507 100%)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow:
              "0 30px 90px rgba(0, 0, 0, 0.95), 0 0 1px 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
            padding: "28px 24px",
            overflow: "hidden",
          }}
        >
          {/* Top Window Bar - Developer IDE Style */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
              paddingBottom: "16px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {/* Window Dots & Identifier */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#eab308", display: "inline-block" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
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
                <Terminal size={14} color="#34d399" />
                <span style={{ color: "#e2e8f0", fontWeight: "600" }}>alarmagenda-core</span>
                <span style={{ color: "#64748b" }}>// v2.4.0-stable</span>
              </div>
            </div>

            {/* View Switcher Tabs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "10px",
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
                  padding: "6px 14px",
                  borderRadius: "7px",
                  fontSize: "11px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  border: activeTab === "LIVE_COCKPIT" ? "1px solid rgba(255, 255, 255, 0.15)" : "none",
                }}
              >
                <Cpu size={12} color="#34d399" />
                Cockpit Temps Réel
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("HD_SYSTEM")}
                style={{
                  background: activeTab === "HD_SYSTEM" ? "#1e293b" : "transparent",
                  color: activeTab === "HD_SYSTEM" ? "#ffffff" : "#94a3b8",
                  padding: "6px 14px",
                  borderRadius: "7px",
                  fontSize: "11px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  border: activeTab === "HD_SYSTEM" ? "1px solid rgba(255, 255, 255, 0.15)" : "none",
                }}
              >
                <Sparkles size={12} color="#38bdf8" />
                Vue HD Moteur
              </button>
            </div>

            {/* Status Telemetry */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 10px #10b981",
                  }}
                />
                <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#34d399", fontWeight: "700" }}>
                  SYNC 100%
                </span>
              </div>
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
                  gap: "28px",
                }}
                className="chrono-grid"
              >
                {/* Left Column: Voice Agent & Realtime Activity */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Voice input card */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "16px",
                      padding: "18px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#94a3b8", fontWeight: "700" }}>
                        DICTÉE VOCALE ANALYSÉE
                      </span>
                      <span style={{ fontSize: "10px", background: "rgba(52, 211, 153, 0.12)", color: "#34d399", padding: "2px 8px", borderRadius: "12px", border: "1px solid rgba(52, 211, 153, 0.3)" }}>
                        0.4s
                      </span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#f8fafc", fontStyle: "italic", margin: "0 0 10px 0", lineHeight: "1.4" }}>
                      &ldquo;Rappelle-moi demain 14h de signer le contrat avec Marc.&rdquo;
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#34d399" }}>
                      <CheckCircle2 size={13} />
                      <span>Événement créé • Alarme vocale armée</span>
                    </div>
                  </div>

                  {/* Persistent Alarm Widget */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "16px",
                      padding: "18px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#94a3b8", fontWeight: "700" }}>
                        SENTINELLE D&apos;ALARME
                      </span>
                      <BellRing size={14} color="#f59e0b" />
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: "#ffffff", marginBottom: "4px" }}>
                      0 Oubli Garanti
                    </div>
                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                      Sonnerie + voix continue jusqu&apos;à confirmation explicite.
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
                    padding: "8px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "250px",
                      height: "250px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, #141419 0%, #09090c 70%, #000000 100%)",
                      border: "2px solid rgba(255, 255, 255, 0.15)",
                      boxShadow: "0 0 35px rgba(0, 0, 0, 0.9), inset 0 0 30px rgba(0, 0, 0, 0.8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                            top: "8px",
                            left: "calc(50% - 1px)",
                            width: isQuarter ? "2px" : "1px",
                            height: isQuarter ? "12px" : "6px",
                            background: isQuarter ? "#ffffff" : "rgba(255, 255, 255, 0.3)",
                            transformOrigin: "bottom center",
                            transform: `rotate(${i * 30}deg) translateY(0px)`,
                          }}
                        />
                      );
                    })}

                    {/* Quarter Numbers */}
                    <span style={{ position: "absolute", top: "20px", fontSize: "12px", fontWeight: "700", color: "#cbd5e1", fontFamily: "monospace" }}>12</span>
                    <span style={{ position: "absolute", right: "20px", fontSize: "12px", fontWeight: "700", color: "#cbd5e1", fontFamily: "monospace" }}>03</span>
                    <span style={{ position: "absolute", bottom: "20px", fontSize: "12px", fontWeight: "700", color: "#cbd5e1", fontFamily: "monospace" }}>06</span>
                    <span style={{ position: "absolute", left: "20px", fontSize: "12px", fontWeight: "700", color: "#cbd5e1", fontFamily: "monospace" }}>09</span>

                    {/* Hour Hand */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "50%",
                        left: "calc(50% - 2px)",
                        width: "4px",
                        height: "55px",
                        background: "#ffffff",
                        borderRadius: "4px",
                        transformOrigin: "bottom center",
                        transform: `rotate(${hourAngle}deg)`,
                        zIndex: 4,
                        boxShadow: "0 0 8px rgba(255, 255, 255, 0.4)",
                      }}
                    />

                    {/* Minute Hand */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "50%",
                        left: "calc(50% - 1.5px)",
                        width: "3px",
                        height: "80px",
                        background: "#cbd5e1",
                        borderRadius: "3px",
                        transformOrigin: "bottom center",
                        transform: `rotate(${minAngle}deg)`,
                        zIndex: 5,
                      }}
                    />

                    {/* Second Hand (Emerald & Steel) */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "40px",
                        left: "calc(50% - 1px)",
                        width: "2px",
                        height: "100px",
                        background: "#34d399",
                        borderRadius: "2px",
                        transformOrigin: "50% 85px",
                        transform: `rotate(${secAngle}deg)`,
                        zIndex: 6,
                        boxShadow: "0 0 10px #34d399",
                      }}
                    />

                    {/* Center Pivot */}
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "#ffffff",
                        border: "2px solid #34d399",
                        zIndex: 10,
                      }}
                    />
                  </div>
                </div>

                {/* Right Column: Real Voice Synthesis Tester & Calendar Sync */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Interactive Audio Voice Player */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "16px",
                      padding: "18px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#94a3b8", fontWeight: "700" }}>
                        SYNTHÈSE VOCALE HD
                      </span>
                      <Volume2 size={14} color="#38bdf8" />
                    </div>

                    {/* Audio Waveform visualizer */}
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", height: "28px", marginBottom: "12px" }}>
                      {[18, 28, 14, 34, 22, 16, 30, 24, 12, 32, 20, 26, 15, 30, 22, 18].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: isPlayingAudio ? `${Math.max(6, (h * (1 + Math.sin(i + (time?.getMilliseconds() || 0) * 0.01))))}px` : `${h}px`,
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
                        padding: "8px 12px",
                        color: "#ffffff",
                        fontSize: "12px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Play size={12} fill="#ffffff" />
                      <span>{isPlayingAudio ? "Voix en cours de lecture..." : "Tester l'alarme vocale (Audio)"}</span>
                    </button>
                  </div>

                  {/* Calendar Pipeline */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "16px",
                      padding: "18px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#94a3b8", fontWeight: "700" }}>
                        PIPELINE AUTOMATISÉ
                      </span>
                      <Zap size={14} color="#34d399" />
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: "#ffffff", marginBottom: "4px" }}>
                      Double Espace Pro & Perso
                    </div>
                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                      Cloisonnement étanche et export d&apos;activité instantané.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Atomic Time Display */}
              <div
                style={{
                  marginTop: "28px",
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", fontFamily: "monospace" }}>
                  <span style={{ fontSize: "36px", fontWeight: "900", color: "#ffffff", letterSpacing: "0.04em" }}>
                    {formattedHours}:{formattedMinutes}:{formattedSeconds}
                  </span>
                  <span style={{ fontSize: "20px", fontWeight: "700", color: "#34d399" }}>
                    .{ms}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "13px", color: "#94a3b8", textTransform: "capitalize" }}>
                    {formattedDate}
                  </span>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#475569" }} />
                  <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#64748b" }}>
                    HEURE ATOMIQUE DE RÉFÉRENCE
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: High-Definition Software Architecture Mockup */
            <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <Image
                src="/images/dark_software_hud.jpg"
                alt="AlarmAgenda Software Interface Preview"
                width={1200}
                height={675}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "16px",
                }}
                priority
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  right: "16px",
                  background: "rgba(0, 0, 0, 0.75)",
                  backdropFilter: "blur(8px)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#e2e8f0",
                }}
              >
                Architecture Moteur v2.4 • Obsidian & Steel Engine
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  ShieldCheck,
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  Play,
  Calendar,
  BellRing,
  Activity,
  CheckCircle2,
  Radio,
} from "lucide-react";
import { speakAIText, playAlertChime } from "@/lib/voice";

export default function MonumentalHoloClock() {
  const [time, setTime] = useState<Date | null>(null);
  const [ms, setMs] = useState("00");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [voiceVolume, setVoiceVolume] = useState(1);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());

    const interval = setInterval(() => {
      const now = new Date();
      setTime(now);
      setMs(Math.floor(now.getMilliseconds() / 10).toString().padStart(2, "0"));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || typeof window === "undefined" || window.innerWidth < 768) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = -(y / (rect.height / 2)) * 6;
    const tiltY = (x / (rect.width / 2)) * 6;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const playVoiceAlarmSample = async () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    await playAlertChime();

    const sampleText =
      "Bonjour ! Sentinelle Alamajonda activée. Il est l'heure de votre rendez-vous stratégique. Vos alertes vocales et votre agenda sont parfaitement synchronisés.";

    speakAIText(sampleText, {
      gender: "FEMALE",
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
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
    return <div style={{ minHeight: "440px", width: "100%" }} />;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        maxWidth: "1200px",
        margin: "0 auto",
        perspective: "1400px",
        transformStyle: "preserve-3d",
        width: "100%",
      }}
      className="select-none"
    >
      {/* 3D Wrapper */}
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          transformStyle: "preserve-3d",
          position: "relative",
          width: "100%",
        }}
      >
        {/* Background Ambient Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) translateZ(-40px)",
            width: "min(850px, 95vw)",
            height: "min(500px, 85vw)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 75%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Masterpiece Clock Container */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            background: "linear-gradient(180deg, rgba(13, 27, 62, 0.92) 0%, rgba(7, 14, 34, 0.95) 100%)",
            borderRadius: "28px",
            border: "1.5px solid rgba(56, 189, 248, 0.3)",
            boxShadow:
              "0 30px 90px rgba(0, 0, 0, 0.85), 0 0 50px rgba(37, 99, 235, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
            padding: "36px clamp(16px, 4vw, 40px)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            overflow: "hidden",
          }}
        >
          {/* Top Status Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "32px",
              paddingBottom: "18px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              flexWrap: "wrap",
              gap: "14px",
            }}
          >
            {/* Title & Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, rgba(37, 99, 235, 0.4), rgba(56, 189, 248, 0.2))",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Clock size={18} color="#38bdf8" />
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: "800", color: "#f8fafc", letterSpacing: "-0.01em" }}>
                  Moteur Temporel &amp; Sentinelle Vocale Alamajonda
                </div>
                <div style={{ fontSize: "11.5px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>Synchronisation continue haute fidélité</span>
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#64748b" }} />
                  <span style={{ color: "#38bdf8", fontWeight: "600" }}>Temps Réel</span>
                </div>
              </div>
            </div>

            {/* Live Status Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(16, 185, 129, 0.12)",
                padding: "6px 14px",
                borderRadius: "20px",
                border: "1px solid rgba(16, 185, 129, 0.35)",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 10px #10b981",
                }}
              />
              <span style={{ fontSize: "11.5px", fontFamily: "monospace", color: "#34d399", fontWeight: "800" }}>
                SYNCHRO ATOMIQUE ACTIVE
              </span>
            </div>
          </div>

          {/* Core Content: 3-Column Executive Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: " clamp(20px, 3vw, 36px)",
            }}
            className="flex flex-col lg:grid"
          >
            {/* Left Column: Agenda & Precision Architecture */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              {/* Feature Box 1 */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "18px",
                  padding: "18px",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
                className="hover:border-cyan-500/30 hover:bg-white/[0.05]"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <Calendar size={16} color="#38bdf8" />
                  <span style={{ fontSize: "13px", fontWeight: "800", color: "#ffffff", letterSpacing: "0.02em" }}>
                    PLANNING DE HAUTE PRÉCISION
                  </span>
                </div>
                <p style={{ fontSize: "12.5px", color: "#cbd5e1", lineHeight: "1.5", margin: 0 }}>
                  Chaque rendez-vous et rappel est cadencé avec rigueur. Export instantané compatible Google Calendar, Apple et Outlook (.ics).
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px", fontSize: "11.5px", color: "#38bdf8", fontWeight: "600" }}>
                  <CheckCircle2 size={13} />
                  <span>Compatibilité universelle RFC 5545</span>
                </div>
              </div>

              {/* Feature Box 2 */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "18px",
                  padding: "18px",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
                className="hover:border-blue-500/30 hover:bg-white/[0.05]"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <Zap size={16} color="#fbbf24" />
                  <span style={{ fontSize: "13px", fontWeight: "800", color: "#ffffff", letterSpacing: "0.02em" }}>
                    COPILOTE IA INTELLIGENT
                  </span>
                </div>
                <p style={{ fontSize: "12.5px", color: "#cbd5e1", lineHeight: "1.5", margin: 0 }}>
                  Organisez vos journées en une consigne. L&apos;IA détecte les priorités, optimise vos plages de concentration et préserve votre temps.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px", fontSize: "11.5px", color: "#fbbf24", fontWeight: "600" }}>
                  <Sparkles size={13} />
                  <span>Jusqu&apos;à 4.5h gagnées par semaine</span>
                </div>
              </div>
            </div>

            {/* Center Column: The Monumental Chronometer Dial */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 0",
              }}
            >
              {/* Dial Outer Ring */}
              <div
                style={{
                  position: "relative",
                  width: "min(280px, 75vw)",
                  height: "min(280px, 75vw)",
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 35%, #10224d 0%, #08112b 60%, #030612 100%)",
                  border: "2.5px solid rgba(56, 189, 248, 0.4)",
                  boxShadow:
                    "0 0 50px rgba(37, 99, 235, 0.45), inset 0 0 40px rgba(0, 0, 0, 0.9), 0 10px 30px rgba(0, 0, 0, 0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {/* Outer Holographic Glow Halo */}
                <div
                  style={{
                    position: "absolute",
                    inset: "-8px",
                    borderRadius: "50%",
                    border: "1px dashed rgba(56, 189, 248, 0.3)",
                    animation: "spin 40s linear infinite",
                  }}
                />

                {/* Dial Ticks (60 subdivisions & 12 main hours) */}
                {[...Array(60)].map((_, i) => {
                  const isHour = i % 5 === 0;
                  const isQuarter = i % 15 === 0;
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        top: isQuarter ? "8px" : isHour ? "10px" : "12px",
                        left: "calc(50% - 1px)",
                        width: isQuarter ? "2.5px" : isHour ? "1.5px" : "1px",
                        height: isQuarter ? "12px" : isHour ? "8px" : "4px",
                        background: isQuarter ? "#38bdf8" : isHour ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.2)",
                        transformOrigin: "bottom center",
                        transform: `rotate(${i * 6}deg) translateY(0px)`,
                        boxShadow: isQuarter ? "0 0 8px #38bdf8" : "none",
                      }}
                    />
                  );
                })}

                {/* Chronometer Numbers */}
                <span style={{ position: "absolute", top: "24px", fontSize: "13px", fontWeight: "900", color: "#f8fafc", fontFamily: "monospace" }}>12</span>
                <span style={{ position: "absolute", right: "24px", fontSize: "13px", fontWeight: "900", color: "#f8fafc", fontFamily: "monospace" }}>03</span>
                <span style={{ position: "absolute", bottom: "24px", fontSize: "13px", fontWeight: "900", color: "#f8fafc", fontFamily: "monospace" }}>06</span>
                <span style={{ position: "absolute", left: "24px", fontSize: "13px", fontWeight: "900", color: "#f8fafc", fontFamily: "monospace" }}>09</span>

                {/* Sub-Dial: Brand & Precision */}
                <div
                  style={{
                    position: "absolute",
                    top: "35%",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "10px", fontWeight: "800", color: "#38bdf8", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    ALAMAJONDA
                  </span>
                  <span style={{ fontSize: "8px", fontWeight: "600", color: "#94a3b8", letterSpacing: "0.08em" }}>
                    CHRONOMÈTRE IA
                  </span>
                </div>

                {/* Hour Hand */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "50%",
                    left: "calc(50% - 2.5px)",
                    width: "5px",
                    height: "56px",
                    background: "linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)",
                    borderRadius: "6px",
                    transformOrigin: "bottom center",
                    transform: `rotate(${hourAngle}deg)`,
                    zIndex: 4,
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
                  }}
                />

                {/* Minute Hand */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "50%",
                    left: "calc(50% - 2px)",
                    width: "4px",
                    height: "82px",
                    background: "linear-gradient(180deg, #93c5fd 0%, #3b82f6 100%)",
                    borderRadius: "4px",
                    transformOrigin: "bottom center",
                    transform: `rotate(${minAngle}deg)`,
                    zIndex: 5,
                    boxShadow: "0 0 12px rgba(59, 130, 246, 0.5)",
                  }}
                />

                {/* Second Hand (Electric Cyan with Glow) */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "45px",
                    left: "calc(50% - 1px)",
                    width: "2px",
                    height: "110px",
                    background: "#38bdf8",
                    borderRadius: "2px",
                    transformOrigin: "50% 90px",
                    transform: `rotate(${secAngle}deg)`,
                    zIndex: 6,
                    boxShadow: "0 0 12px #38bdf8, 0 0 20px rgba(56, 189, 248, 0.8)",
                  }}
                />

                {/* Central High-Precision Pivot */}
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    border: "3px solid #38bdf8",
                    boxShadow: "0 0 10px #38bdf8",
                    zIndex: 10,
                  }}
                />
              </div>

              {/* Real-time Telemetry Display under the Dial */}
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
                  fontFamily: "monospace",
                  background: "rgba(11, 21, 48, 0.6)",
                  padding: "6px 16px",
                  borderRadius: "14px",
                  border: "1px solid rgba(56, 189, 248, 0.25)",
                }}
              >
                <span style={{ fontSize: "clamp(20px, 3.5vw, 26px)", fontWeight: "900", color: "#ffffff", letterSpacing: "0.05em" }}>
                  {formattedHours}:{formattedMinutes}:{formattedSeconds}
                </span>
                <span style={{ fontSize: "14px", fontWeight: "800", color: "#38bdf8" }}>
                  .{ms}
                </span>
              </div>
            </div>

            {/* Right Column: Voice Sentinel & Audio Testing Hub */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              {/* Feature Box 3: Voice Alert Sentinelle */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "18px",
                  padding: "18px",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
                className="hover:border-cyan-500/30 hover:bg-white/[0.05]"
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Volume2 size={16} color="#34d399" />
                    <span style={{ fontSize: "13px", fontWeight: "800", color: "#ffffff", letterSpacing: "0.02em" }}>
                      SENTINELLE VOCALE HD
                    </span>
                  </div>
                  <span style={{ fontSize: "10px", color: "#34d399", background: "rgba(16, 185, 129, 0.15)", padding: "2px 8px", borderRadius: "8px", fontWeight: "700" }}>
                    Voix Française
                  </span>
                </div>

                <p style={{ fontSize: "12.5px", color: "#cbd5e1", lineHeight: "1.5", margin: "0 0 12px 0" }}>
                  Alertes sonores proactives prononcées à voix haute pour vos engagements critiques. Zéro oubli garanti.
                </p>

                {/* Animated Sound Waveform */}
                <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "24px", marginBottom: "12px" }}>
                  {[12, 20, 10, 26, 16, 12, 22, 18, 8, 24, 14, 20, 10, 22, 16, 12, 24, 14].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: isPlayingAudio ? `${Math.max(4, h * (1 + Math.sin(i + (time?.getMilliseconds() || 0) * 0.015)))}px` : `${h}px`,
                        background: isPlayingAudio ? "#38bdf8" : "rgba(255, 255, 255, 0.2)",
                        borderRadius: "2px",
                        transition: "height 0.08s ease, background 0.2s ease",
                      }}
                    />
                  ))}
                </div>

                {/* Interactive Speech Test CTA */}
                <button
                  type="button"
                  onClick={playVoiceAlarmSample}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: isPlayingAudio ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(56, 189, 248, 0.2))",
                    border: "1px solid rgba(56, 189, 248, 0.4)",
                    color: "#ffffff",
                    fontSize: "12.5px",
                    fontWeight: "700",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 15px rgba(37, 99, 235, 0.2)",
                  }}
                  className="hover:scale-[1.02]"
                >
                  <Play size={13} fill="#ffffff" />
                  <span>{isPlayingAudio ? "Lecture de l'annonce en cours..." : "Tester la synthèse vocale en direct"}</span>
                </button>
              </div>

              {/* Feature Box 4: Security & Privacy */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "18px",
                  padding: "18px",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
                className="hover:border-emerald-500/30 hover:bg-white/[0.05]"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <ShieldCheck size={16} color="#34d399" />
                  <span style={{ fontSize: "13px", fontWeight: "800", color: "#ffffff", letterSpacing: "0.02em" }}>
                    SÉCURITÉ &amp; CONFIDENTIALITÉ
                  </span>
                </div>
                <p style={{ fontSize: "12.5px", color: "#cbd5e1", lineHeight: "1.5", margin: 0 }}>
                  Vos rendez-vous et vos données personnelles restent strictement sous votre contrôle. Double espace Pro &amp; Perso cloisonné.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px", fontSize: "11.5px", color: "#34d399", fontWeight: "600" }}>
                  <Radio size={13} />
                  <span>Chiffrement bout-en-bout &bull; Serveurs Sécurisés</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Bar: Date & Location telemetry */}
          <div
            style={{
              marginTop: "28px",
              paddingTop: "18px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#38bdf8" }} />
              <span style={{ fontSize: "12.5px", color: "#cbd5e1", textTransform: "capitalize", fontWeight: "600" }}>
                {formattedDate}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "#94a3b8", fontSize: "12px", fontFamily: "monospace" }}>
              <span>FUSEAU : EUROPE/PARIS (UTC+2)</span>
              <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#475569" }} />
              <span style={{ color: "#38bdf8" }}>LATENCE &lt; 1ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

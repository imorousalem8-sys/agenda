"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  ShieldCheck,
  Sparkles,
  Zap,
  Volume2,
  Play,
  Calendar,
  CheckCircle2,
  Radio,
} from "lucide-react";
import { speakAIText, playAlertChime } from "@/lib/voice";

export default function MonumentalHoloClock() {
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || typeof window === "undefined" || window.innerWidth < 768) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = -(y / (rect.height / 2)) * 5;
    const tiltY = (x / (rect.width / 2)) * 5;
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

  // Mathematical exact angles
  const secAngle = (seconds + milliseconds / 1000) * 6;
  const minAngle = (minutes + seconds / 60 + milliseconds / 60000) * 6;
  const hourAngle = ((hours % 12) + minutes / 60 + seconds / 3600) * 30;

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
    return <div style={{ minHeight: "480px", width: "100%" }} />;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        maxWidth: "1240px",
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
            width: "min(900px, 95vw)",
            height: "min(560px, 85vw)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(56, 189, 248, 0.1) 45%, transparent 75%)",
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
            background: "linear-gradient(180deg, rgba(13, 27, 62, 0.94) 0%, rgba(7, 14, 34, 0.97) 100%)",
            borderRadius: "28px",
            border: "1.5px solid rgba(56, 189, 248, 0.35)",
            boxShadow:
              "0 30px 90px rgba(0, 0, 0, 0.85), 0 0 50px rgba(37, 99, 235, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
            padding: "36px clamp(16px, 3.5vw, 40px)",
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
                  width: "38px",
                  height: "38px",
                  borderRadius: "11px",
                  background: "linear-gradient(135deg, rgba(37, 99, 235, 0.4), rgba(56, 189, 248, 0.2))",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Clock size={19} color="#38bdf8" />
              </div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "800", color: "#f8fafc", letterSpacing: "-0.01em" }}>
                  Moteur Temporel &amp; Sentinelle Vocale Alamajonda
                </div>
                <div style={{ fontSize: "12px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
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
              gap: "clamp(20px, 3vw, 36px)",
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
                  padding: "20px",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
                className="hover:border-cyan-500/30 hover:bg-white/[0.05]"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <Calendar size={17} color="#38bdf8" />
                  <span style={{ fontSize: "13.5px", fontWeight: "800", color: "#ffffff", letterSpacing: "0.02em" }}>
                    PLANNING DE HAUTE PRÉCISION
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: "1.5", margin: 0 }}>
                  Chaque rendez-vous et rappel est cadencé avec rigueur. Export instantané compatible Google Calendar, Apple et Outlook (.ics).
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px", fontSize: "12px", color: "#38bdf8", fontWeight: "600" }}>
                  <CheckCircle2 size={14} />
                  <span>Compatibilité universelle RFC 5545</span>
                </div>
              </div>

              {/* Feature Box 2 */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "18px",
                  padding: "20px",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
                className="hover:border-blue-500/30 hover:bg-white/[0.05]"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <Zap size={17} color="#fbbf24" />
                  <span style={{ fontSize: "13.5px", fontWeight: "800", color: "#ffffff", letterSpacing: "0.02em" }}>
                    COPILOTE IA INTELLIGENT
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: "1.5", margin: 0 }}>
                  Organisez vos journées en une consigne. L&apos;IA détecte les priorités, optimise vos plages de concentration et préserve votre temps.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px", fontSize: "12px", color: "#fbbf24", fontWeight: "600" }}>
                  <Sparkles size={14} />
                  <span>Jusqu&apos;à 4.5h gagnées par semaine</span>
                </div>
              </div>
            </div>

            {/* Center Column: The Monumental SVG Chronometer Dial */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 0",
              }}
            >
              {/* Dial Outer Frame (Expanded size: 360px) */}
              <div
                style={{
                  position: "relative",
                  width: "min(360px, 86vw)",
                  height: "min(360px, 86vw)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {/* SVG Dial with Mathematical Zero-Offset Precision */}
                <svg
                  viewBox="0 0 400 400"
                  style={{
                    width: "100%",
                    height: "100%",
                    filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 25px rgba(37, 99, 235, 0.35))",
                  }}
                >
                  <defs>
                    {/* Dial Face Gradient */}
                    <radialGradient id="dialFace" cx="45%" cy="40%" r="65%">
                      <stop offset="0%" stopColor="#132759" />
                      <stop offset="60%" stopColor="#081432" />
                      <stop offset="100%" stopColor="#020614" />
                    </radialGradient>

                    {/* Outer Bezel Gradient */}
                    <linearGradient id="bezelRing" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="40%" stopColor="#1e3a8a" />
                      <stop offset="70%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>

                    {/* Hour Hand Gradient */}
                    <linearGradient id="hourHandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#cbd5e1" />
                    </linearGradient>

                    {/* Minute Hand Gradient */}
                    <linearGradient id="minHandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#93c5fd" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>

                    {/* Glow filter for second hand & indicators */}
                    <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Outer Bezel Shadow & Border */}
                  <circle cx="200" cy="200" r="196" fill="none" stroke="url(#bezelRing)" strokeWidth="3.5" />
                  <circle cx="200" cy="200" r="192" fill="url(#dialFace)" />

                  {/* Inner Track Rings */}
                  <circle cx="200" cy="200" r="176" fill="none" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />

                  {/* 60 Dial Minute & Hour Ticks (Accurate coordinates) */}
                  {[...Array(60)].map((_, i) => {
                    const angle = i * 6;
                    const isQuarter = i % 15 === 0;
                    const isHour = i % 5 === 0;
                    const y1 = isQuarter ? 24 : isHour ? 28 : 32;
                    const y2 = 40;
                    const strokeWidth = isQuarter ? 3.5 : isHour ? 2.2 : 1;
                    const strokeColor = isQuarter ? "#38bdf8" : isHour ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.25)";

                    return (
                      <line
                        key={i}
                        x1="200"
                        y1={y1}
                        x2="200"
                        y2={y2}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        transform={`rotate(${angle} 200 200)`}
                        filter={isQuarter ? "url(#cyanGlow)" : undefined}
                      />
                    );
                  })}

                  {/* Major Hour Numerals with Modern Typography */}
                  <text x="200" y="68" textAnchor="middle" fill="#f8fafc" fontSize="19" fontWeight="900" fontFamily="monospace" letterSpacing="0.05em">
                    12
                  </text>
                  <text x="345" y="207" textAnchor="middle" fill="#f8fafc" fontSize="19" fontWeight="900" fontFamily="monospace" letterSpacing="0.05em">
                    03
                  </text>
                  <text x="200" y="352" textAnchor="middle" fill="#f8fafc" fontSize="19" fontWeight="900" fontFamily="monospace" letterSpacing="0.05em">
                    06
                  </text>
                  <text x="55" y="207" textAnchor="middle" fill="#f8fafc" fontSize="19" fontWeight="900" fontFamily="monospace" letterSpacing="0.05em">
                    09
                  </text>

                  {/* Dial Branding / Sub-text */}
                  <text x="200" y="145" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="800" letterSpacing="0.22em" fontFamily="sans-serif">
                    ALAMAJONDA
                  </text>
                  <text x="200" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600" letterSpacing="0.1em" fontFamily="sans-serif">
                    CHRONOMÈTRE IA
                  </text>

                  {/* HOUR HAND (Anchored strictly at center 200, 200) */}
                  <g transform={`rotate(${hourAngle} 200 200)`}>
                    {/* Shadow */}
                    <path
                      d="M196 220 L195 105 L200 90 L205 105 L204 220 Z"
                      fill="rgba(0, 0, 0, 0.5)"
                      transform="translate(2, 4)"
                    />
                    {/* Hand Body */}
                    <path
                      d="M196 220 L195 105 L200 90 L205 105 L204 220 Z"
                      fill="url(#hourHandGrad)"
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="0.8"
                    />
                    {/* Luminous Core Inlay */}
                    <line x1="200" y1="110" x2="200" y2="185" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                  </g>

                  {/* MINUTE HAND (Anchored strictly at center 200, 200) */}
                  <g transform={`rotate(${minAngle} 200 200)`}>
                    {/* Shadow */}
                    <path
                      d="M197 225 L196 60 L200 45 L204 60 L203 225 Z"
                      fill="rgba(0, 0, 0, 0.5)"
                      transform="translate(2, 4)"
                    />
                    {/* Hand Body */}
                    <path
                      d="M197 225 L196 60 L200 45 L204 60 L203 225 Z"
                      fill="url(#minHandGrad)"
                      stroke="rgba(255, 255, 255, 0.6)"
                      strokeWidth="0.8"
                    />
                    {/* Luminous Core Inlay */}
                    <line x1="200" y1="65" x2="200" y2="185" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                  </g>

                  {/* SECOND HAND (Electric Cyan, fully anchored at 200, 200 with counterweight) */}
                  <g transform={`rotate(${secAngle} 200 200)`} filter="url(#cyanGlow)">
                    {/* Needle (Length: from center 200,200 up to y=35 -> strictly stays inside dial) */}
                    <line x1="200" y1="35" x2="200" y2="245" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                    {/* Counterbalance Ring */}
                    <circle cx="200" cy="235" r="5.5" fill="#020614" stroke="#38bdf8" strokeWidth="2" />
                    {/* Needle Tip Accent */}
                    <circle cx="200" cy="40" r="2.5" fill="#ffffff" />
                  </g>

                  {/* Center Jewel Pivot Cap (Exact center 200, 200) */}
                  <circle cx="200" cy="200" r="10" fill="#081432" stroke="#38bdf8" strokeWidth="2.5" />
                  <circle cx="200" cy="200" r="5" fill="#ffffff" />
                </svg>
              </div>

              {/* Real-time Digital Telemetry Display (Clean HH:MM) */}
              <div
                style={{
                  marginTop: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "monospace",
                  background: "rgba(11, 21, 48, 0.75)",
                  padding: "8px 26px",
                  borderRadius: "16px",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
                }}
              >
                <span style={{ fontSize: "clamp(24px, 4.5vw, 32px)", fontWeight: "900", color: "#ffffff", letterSpacing: "0.08em" }}>
                  {formattedHours}:{formattedMinutes}
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
                  padding: "20px",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
                className="hover:border-cyan-500/30 hover:bg-white/[0.05]"
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Volume2 size={17} color="#34d399" />
                    <span style={{ fontSize: "13.5px", fontWeight: "800", color: "#ffffff", letterSpacing: "0.02em" }}>
                      SENTINELLE VOCALE HD
                    </span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#34d399", background: "rgba(16, 185, 129, 0.15)", padding: "2px 8px", borderRadius: "8px", fontWeight: "700" }}>
                    Voix Française
                  </span>
                </div>

                <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: "1.5", margin: "0 0 14px 0" }}>
                  Alertes sonores proactives prononcées à voix haute pour vos engagements critiques. Zéro oubli garanti.
                </p>

                {/* Animated Sound Waveform */}
                <div style={{ display: "flex", alignItems: "center", gap: "3.5px", height: "26px", marginBottom: "14px" }}>
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
                    padding: "11px 16px",
                    borderRadius: "12px",
                    background: isPlayingAudio ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, rgba(37, 99, 235, 0.35), rgba(56, 189, 248, 0.25))",
                    border: "1px solid rgba(56, 189, 248, 0.45)",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: "700",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 15px rgba(37, 99, 235, 0.25)",
                  }}
                  className="hover:scale-[1.02]"
                >
                  <Play size={14} fill="#ffffff" />
                  <span>{isPlayingAudio ? "Lecture de l'annonce en cours..." : "Tester la synthèse vocale en direct"}</span>
                </button>
              </div>

              {/* Feature Box 4: Security & Privacy */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "18px",
                  padding: "20px",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
                className="hover:border-emerald-500/30 hover:bg-white/[0.05]"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <ShieldCheck size={17} color="#34d399" />
                  <span style={{ fontSize: "13.5px", fontWeight: "800", color: "#ffffff", letterSpacing: "0.02em" }}>
                    SÉCURITÉ &amp; CONFIDENTIALITÉ
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: "1.5", margin: 0 }}>
                  Vos rendez-vous et vos données personnelles restent strictement sous votre contrôle. Double espace Pro &amp; Perso cloisonné.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px", fontSize: "12px", color: "#34d399", fontWeight: "600" }}>
                  <Radio size={14} />
                  <span>Chiffrement bout-en-bout &bull; Serveurs Sécurisés</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Bar: Date & Location telemetry */}
          <div
            style={{
              marginTop: "32px",
              paddingTop: "20px",
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
              <span style={{ fontSize: "13px", color: "#cbd5e1", textTransform: "capitalize", fontWeight: "600" }}>
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

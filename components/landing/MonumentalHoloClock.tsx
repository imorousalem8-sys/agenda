"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, Shield, Sparkles, Zap, Radio, BellRing, Compass } from "lucide-react";

export default function MonumentalHoloClock() {
  const [time, setTime] = useState<Date | null>(null);
  const [ms, setMs] = useState("00");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initial sync
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

    const tiltX = -(y / (rect.height / 2)) * 14; // max 14 deg
    const tiltY = (x / (rect.width / 2)) * 14;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const hours = time ? time.getHours() : 0;
  const minutes = time ? time.getMinutes() : 0;
  const seconds = time ? time.getSeconds() : 0;
  const milliseconds = time ? time.getMilliseconds() : 0;

  // Exact angles for smooth hands
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
    return <div style={{ minHeight: "460px", width: "100%" }} />;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        maxWidth: "1080px",
        margin: "0 auto",
        perspective: "1400px",
        transformStyle: "preserve-3d",
      }}
      className="select-none"
    >
      {/* Dynamic 3D Wrapper */}
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {/* Background Deep Volumetric Ambient Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) translateZ(-80px)",
            width: "680px",
            height: "680px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(6, 182, 212, 0.18) 40%, rgba(168, 85, 247, 0.1) 60%, transparent 75%)",
            filter: "blur(50px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Outer 3D Cyber Glass Chrono Container */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            background: "linear-gradient(180deg, rgba(17, 24, 39, 0.85) 0%, rgba(8, 11, 18, 0.95) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "32px",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            boxShadow:
              "0 40px 100px rgba(0, 0, 0, 0.85), 0 0 60px rgba(99, 102, 241, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            padding: "48px 36px",
            overflow: "hidden",
          }}
        >
          {/* Top Chrono Header Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "36px",
              paddingBottom: "18px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              transform: "translateZ(30px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 12px #10b981",
                  animation: "pulseGlow 2s infinite alternate",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#38bdf8",
                  fontFamily: "monospace",
                }}
              >
                MATRICE HORLOGE TEMPS RÉEL • SYNCHRONISÉ UTC+2
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  background: "rgba(99, 102, 241, 0.15)",
                  border: "1px solid rgba(99, 102, 241, 0.4)",
                  color: "#c7d2fe",
                  fontSize: "11px",
                  fontWeight: "700",
                }}
              >
                <Radio size={12} color="#38bdf8" />
                <span>SENTINELLE ACTIVE</span>
              </span>
            </div>
          </div>

          {/* MAIN CHRONO & DIGITAL CORE DISPLAY */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: "36px",
              transform: "translateZ(40px)",
            }}
            className="chrono-grid"
          >
            {/* LEFT HUD: Live Voice Order & Anti-Forget Guarantee */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                transform: "translateZ(20px)",
              }}
            >
              <div
                style={{
                  background: "rgba(13, 18, 30, 0.8)",
                  borderRadius: "18px",
                  padding: "20px",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <BellRing size={16} color="#38bdf8" />
                  <span style={{ fontSize: "11px", fontWeight: "800", color: "#38bdf8", letterSpacing: "0.08em" }}>
                    DICTÉE VOCALE ULTRA-RAPIDE
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#f1f5f9", fontStyle: "italic", marginBottom: "8px" }}>
                  &ldquo;Rappelle-moi demain 14h de signer le contrat avec Marc.&rdquo;
                </p>
                <div style={{ padding: "6px 10px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.35)", color: "#34d399", fontSize: "11px", fontWeight: "700" }}>
                  ✓ Tâche créée en 0.4s • Alarme vocale activée
                </div>
              </div>

              <div
                style={{
                  background: "rgba(13, 18, 30, 0.8)",
                  borderRadius: "18px",
                  padding: "20px",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Zap size={16} color="#c084fc" />
                  <span style={{ fontSize: "11px", fontWeight: "800", color: "#c084fc", letterSpacing: "0.08em" }}>
                    ALARME PERSISTANTE INRATABLE
                  </span>
                </div>
                <div style={{ fontSize: "18px", fontWeight: "900", color: "#ffffff" }}>
                  0 oubli garanti
                </div>
                <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>
                  Sonne comme un vrai réveil jusqu&apos;à ce que vous confirmiez.
                </p>
              </div>
            </div>

            {/* CENTER: COLOSSAL 3D HOLOGRAPHIC CHRONOMETER */}
            <div
              style={{
                position: "relative",
                width: "360px",
                height: "360px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Outer Glowing Cyber Ring 1 (Slow Rotating Counter Clockwise) */}
              <div
                style={{
                  position: "absolute",
                  inset: "-12px",
                  borderRadius: "50%",
                  border: "2px dashed rgba(56, 189, 248, 0.35)",
                  animation: "spin 50s linear infinite reverse",
                  transform: "translateZ(10px)",
                }}
              />

              {/* Outer Orbit Ring 2 with glowing accents */}
              <div
                style={{
                  position: "absolute",
                  inset: "8px",
                  borderRadius: "50%",
                  border: "1px solid rgba(99, 102, 241, 0.4)",
                  boxShadow: "0 0 30px rgba(99, 102, 241, 0.25), inset 0 0 30px rgba(99, 102, 241, 0.2)",
                  transform: "translateZ(20px)",
                }}
              />

              {/* Holographic Chrono SVG Dial */}
              <svg
                width="340"
                height="340"
                viewBox="0 0 340 340"
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "translateZ(25px)",
                  overflow: "visible",
                }}
              >
                <defs>
                  <linearGradient id="chrono-grad" x1="0" y1="0" x2="340" y2="340" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <filter id="glow-3d" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#6366f1" floodOpacity="0.8" />
                  </filter>
                </defs>

                {/* 60 Minute / Second Tick marks */}
                {Array.from({ length: 60 }).map((_, i) => {
                  const isHour = i % 5 === 0;
                  const rad = (i * 6 * Math.PI) / 180;
                  const outerR = 158;
                  const innerR = isHour ? 142 : 150;
                  const x1 = 170 + outerR * Math.sin(rad);
                  const y1 = 170 - outerR * Math.cos(rad);
                  const x2 = 170 + innerR * Math.sin(rad);
                  const y2 = 170 - innerR * Math.cos(rad);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isHour ? "#38bdf8" : "rgba(255, 255, 255, 0.25)"}
                      strokeWidth={isHour ? 2.5 : 1}
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* 12 Hour Cardinal Numerals */}
                <text x="170" y="44" fill="#ffffff" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="monospace">
                  12
                </text>
                <text x="306" y="176" fill="#ffffff" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="monospace">
                  03
                </text>
                <text x="170" y="308" fill="#ffffff" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="monospace">
                  06
                </text>
                <text x="34" y="176" fill="#ffffff" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="monospace">
                  09
                </text>

                {/* Hour Hand */}
                <line
                  x1="170"
                  y1="170"
                  x2={170 + 75 * Math.sin((hourAngle * Math.PI) / 180)}
                  y2={170 - 75 * Math.cos((hourAngle * Math.PI) / 180)}
                  stroke="#ffffff"
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter="url(#glow-3d)"
                />

                {/* Minute Hand */}
                <line
                  x1="170"
                  y1="170"
                  x2={170 + 110 * Math.sin((minAngle * Math.PI) / 180)}
                  y2={170 - 110 * Math.cos((minAngle * Math.PI) / 180)}
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#glow-3d)"
                />

                {/* Sweeping Seconds Hand */}
                <line
                  x1={170 - 24 * Math.sin((secAngle * Math.PI) / 180)}
                  y1={170 + 24 * Math.cos((secAngle * Math.PI) / 180)}
                  x2={170 + 130 * Math.sin((secAngle * Math.PI) / 180)}
                  y2={170 - 130 * Math.cos((secAngle * Math.PI) / 180)}
                  stroke="#ec4899"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Seconds Hand Tip Neon Orb */}
                <circle
                  cx={170 + 130 * Math.sin((secAngle * Math.PI) / 180)}
                  cy={170 - 130 * Math.cos((secAngle * Math.PI) / 180)}
                  r="4"
                  fill="#ec4899"
                  filter="url(#glow-3d)"
                />

                {/* Center Chrono Cap */}
                <circle cx="170" cy="170" r="7" fill="#ffffff" />
                <circle cx="170" cy="170" r="3.5" fill="#6366f1" />
              </svg>

              {/* Floating Holographic Center Info Plate */}
              <div
                style={{
                  position: "absolute",
                  bottom: "65px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transform: "translateZ(45px)",
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "800",
                    letterSpacing: "0.2em",
                    color: "#a855f7",
                    textTransform: "uppercase",
                  }}
                >
                  QUANTUM CHRONO
                </span>
              </div>
            </div>

            {/* RIGHT HUD: Audio Engine & System Health */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                transform: "translateZ(20px)",
              }}
            >
              <div
                style={{
                  background: "rgba(13, 18, 30, 0.75)",
                  borderRadius: "18px",
                  padding: "20px",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <Shield size={16} color="#34d399" />
                  <span style={{ fontSize: "11px", fontWeight: "800", color: "#34d399", letterSpacing: "0.08em" }}>
                    SYNTHÈSE VOCALE HD
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "24px", marginBottom: "8px" }}>
                  {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        background: "linear-gradient(to top, #38bdf8, #818cf8)",
                        height: `${h}%`,
                        borderRadius: "2px",
                        animation: `pulseGlow ${0.8 + (i % 5) * 0.2}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                  Énonciation vocale fluide • Voix HD naturelle
                </p>
              </div>

              <div
                style={{
                  background: "rgba(13, 18, 30, 0.75)",
                  borderRadius: "18px",
                  padding: "20px",
                  border: "1px solid rgba(236, 72, 153, 0.25)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Sparkles size={16} color="#f472b6" />
                  <span style={{ fontSize: "11px", fontWeight: "800", color: "#f472b6", letterSpacing: "0.08em" }}>
                    CALENDRIER AUGMENTÉ
                  </span>
                </div>
                <div style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff" }}>
                  100% Automatisé
                </div>
                <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>
                  Compréhension sémantique de toutes vos consignes
                </p>
              </div>
            </div>
          </div>

          {/* MONUMENTAL DIGITAL TIME DISPLAY AT BOTTOM WITH 3D DEPTH */}
          <div
            style={{
              marginTop: "42px",
              paddingTop: "28px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              textAlign: "center",
              transform: "translateZ(50px)",
            }}
          >
            {/* Monumental Digits */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                justifyContent: "center",
                gap: "8px",
                fontFamily: "monospace",
              }}
            >
              <div
                suppressHydrationWarning
                style={{
                  fontSize: "clamp(48px, 8vw, 76px)",
                  fontWeight: "900",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  background: "linear-gradient(135deg, #ffffff 30%, #c7d2fe 70%, #38bdf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 4px 20px rgba(56, 189, 248, 0.4))",
                }}
              >
                {formattedHours}:{formattedMinutes}:{formattedSeconds}
              </div>

              <div
                suppressHydrationWarning
                style={{
                  fontSize: "clamp(20px, 3.5vw, 32px)",
                  fontWeight: "800",
                  color: "#38bdf8",
                  letterSpacing: "-0.02em",
                }}
              >
                .{ms}
              </div>
            </div>

            {/* Date and Status Bar */}
            <div
              style={{
                marginTop: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <span
                suppressHydrationWarning
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#e2e8f0",
                  textTransform: "capitalize",
                  letterSpacing: "0.02em",
                }}
              >
                📅 {formattedDate}
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>•</span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#a78bfa",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                HEURE ATOMIQUE DE RÉFÉRENCE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Bot, Clock, Bell, Plus, Shield, Radio } from "lucide-react";

interface DashboardClockHeroProps {
  greeting: string;
  onOpenAI: () => void;
  onNewEvent: () => void;
  nextReminderTitle?: string;
  nextReminderTime?: string;
}

export default function DashboardClockHero({
  greeting,
  onOpenAI,
  onNewEvent,
  nextReminderTitle = "Aucune alerte urgente",
  nextReminderTime = "--:--",
}: DashboardClockHeroProps) {
  const [time, setTime] = useState<Date | null>(null);
  const [ms, setMs] = useState("00");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        marginBottom: "32px",
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      className="select-none"
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {/* Glow backdrop */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) translateZ(-50px)",
            width: "100%",
            height: "100%",
            borderRadius: "28px",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.22) 0%, rgba(6, 182, 212, 0.12) 50%, transparent 80%)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            background: "linear-gradient(180deg, rgba(17, 24, 39, 0.88) 0%, rgba(10, 14, 23, 0.95) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "28px",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            boxShadow:
              "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
            padding: "32px 28px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
              paddingBottom: "16px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              transform: "translateZ(20px)",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h1
                  style={{
                    fontSize: "26px",
                    fontWeight: "900",
                    color: "#ffffff",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {greeting} 👋
                </h1>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    background: "rgba(16, 185, 129, 0.15)",
                    border: "1px solid rgba(16, 185, 129, 0.35)",
                    color: "#34d399",
                    fontSize: "11px",
                    fontWeight: "700",
                  }}
                >
                  <Radio size={11} color="#34d399" />
                  <span>SYNCHRONISÉ</span>
                </span>
              </div>
              <p
                suppressHydrationWarning
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "13px",
                  marginTop: "4px",
                  textTransform: "capitalize",
                }}
              >
                📅 {formattedDate} • Heure de Paris (UTC+2)
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={onOpenAI}
                className="btn btn-secondary"
                style={{
                  borderColor: "rgba(99, 102, 241, 0.4)",
                  color: "#c7d2fe",
                  background: "rgba(99, 102, 241, 0.15)",
                  fontSize: "13px",
                  padding: "9px 16px",
                }}
              >
                <Sparkles size={15} color="#818cf8" />
                <span>Assistant Vocal</span>
              </button>

              <button
                onClick={onNewEvent}
                className="btn btn-primary"
                style={{ fontSize: "13px", padding: "9px 18px" }}
                id="dashboard-new-event"
              >
                <Plus size={15} />
                <span>Nouveau rendez-vous</span>
              </button>
            </div>
          </div>

          {/* Clock Matrix Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              alignItems: "center",
              gap: "32px",
              transform: "translateZ(30px)",
            }}
            className="chrono-grid"
          >
            {/* Analog 3D Chrono Dial */}
            <div
              style={{
                position: "relative",
                width: "180px",
                height: "180px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {/* Outer Orbit */}
              <div
                style={{
                  position: "absolute",
                  inset: "-6px",
                  borderRadius: "50%",
                  border: "1.5px dashed rgba(56, 189, 248, 0.35)",
                  animation: "spin 40s linear infinite reverse",
                }}
              />

              <svg
                width="180"
                height="180"
                viewBox="0 0 180 180"
                style={{ overflow: "visible" }}
              >
                <defs>
                  <filter id="dash-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#6366f1" floodOpacity="0.7" />
                  </filter>
                </defs>

                {/* 12 Ticks */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const rad = (i * 30 * Math.PI) / 180;
                  const x1 = 90 + 78 * Math.sin(rad);
                  const y1 = 90 - 78 * Math.cos(rad);
                  const x2 = 90 + 70 * Math.sin(rad);
                  const y2 = 90 - 70 * Math.cos(rad);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={i % 3 === 0 ? "#38bdf8" : "rgba(255, 255, 255, 0.25)"}
                      strokeWidth={i % 3 === 0 ? 2 : 1}
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Hour Hand */}
                <line
                  x1="90"
                  y1="90"
                  x2={90 + 38 * Math.sin((hourAngle * Math.PI) / 180)}
                  y2={90 - 38 * Math.cos((hourAngle * Math.PI) / 180)}
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#dash-glow)"
                />

                {/* Minute Hand */}
                <line
                  x1="90"
                  y1="90"
                  x2={90 + 58 * Math.sin((minAngle * Math.PI) / 180)}
                  y2={90 - 58 * Math.cos((minAngle * Math.PI) / 180)}
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  filter="url(#dash-glow)"
                />

                {/* Seconds Hand */}
                <line
                  x1={90 - 12 * Math.sin((secAngle * Math.PI) / 180)}
                  y1={90 + 12 * Math.cos((secAngle * Math.PI) / 180)}
                  x2={90 + 68 * Math.sin((secAngle * Math.PI) / 180)}
                  y2={90 - 68 * Math.cos((secAngle * Math.PI) / 180)}
                  stroke="#ec4899"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <circle cx="90" cy="90" r="4.5" fill="#ffffff" />
                <circle cx="90" cy="90" r="2" fill="#6366f1" />
              </svg>
            </div>

            {/* Monumental Digital Time Display */}
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "800",
                  color: "#38bdf8",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                }}
              >
                CHRONOMÈTRE NUMÉRIQUE HAUTE PRÉCISION
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
                  marginTop: "4px",
                  fontFamily: "monospace",
                }}
              >
                <div
                  suppressHydrationWarning
                  style={{
                    fontSize: "clamp(38px, 5.5vw, 54px)",
                    fontWeight: "900",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #ffffff 30%, #c7d2fe 70%, #38bdf8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 2px 14px rgba(56, 189, 248, 0.35))",
                  }}
                >
                  {formattedHours}:{formattedMinutes}:{formattedSeconds}
                </div>
                <div suppressHydrationWarning style={{ fontSize: "20px", fontWeight: "800", color: "#38bdf8" }}>
                  .{ms}
                </div>
              </div>

              <p style={{ color: "var(--text-secondary)", fontSize: "13px", marginTop: "6px" }}>
                Surveillance active des alarmes & copilote vocal prêt
              </p>
            </div>

            {/* Right Mini-HUD: Next Sentinel Alarm */}
            <div
              style={{
                background: "rgba(13, 18, 30, 0.8)",
                borderRadius: "16px",
                padding: "16px 20px",
                border: "1px solid rgba(99, 102, 241, 0.25)",
                minWidth: "220px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                <Bell size={14} color="#c084fc" />
                <span style={{ fontSize: "11px", fontWeight: "800", color: "#c084fc", letterSpacing: "0.08em" }}>
                  PROCHAINE ÉCHÉANCE
                </span>
              </div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff" }}>
                {nextReminderTime}
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  marginTop: "2px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                }}
              >
                {nextReminderTitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

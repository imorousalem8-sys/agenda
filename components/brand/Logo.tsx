import React from "react";

interface LogoProps {
  size?: number;
  showText?: boolean;
  textClassName?: string;
  animated?: boolean;
  className?: string;
  theme?: "dark" | "light";
}

export default function Logo({
  size = 38,
  showText = true,
  animated = true,
  className = "",
  theme = "dark",
}: LogoProps) {
  const isLight = theme === "light";

  return (
    <div
      className={`flex items-center select-none ${className}`}
      style={{ display: "flex", alignItems: "center", gap: `${Math.max(10, size * 0.28)}px` }}
    >
      {/* SVG Icon Container with Ambient Halo */}
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {/* Cyber Neon Glow Layer */}
        <div
          style={{
            position: "absolute",
            inset: "-20%",
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, rgba(59, 130, 246, 0.2) 45%, transparent 70%)",
            filter: "blur(8px)",
            borderRadius: "50%",
            zIndex: 0,
            animation: animated ? "pulseGlow 3s ease-in-out infinite alternate" : undefined,
          }}
        />

        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "relative", zIndex: 1, overflow: "visible" }}
        >
          <defs>
            {/* Cyber Gradient */}
            <linearGradient id="cyber-grad-frame" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            {/* Inner Glass */}
            <linearGradient id="cyber-glass-fill" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0a1532" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>

            {/* Neon Accent */}
            <linearGradient id="cyber-needle-grad" x1="24" y1="12" x2="34" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            {/* Drop Shadow & Glow */}
            <filter id="cyber-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563eb" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Squircle Frame */}
          <rect
            x="3"
            y="3"
            width="42"
            height="42"
            rx="13"
            fill="url(#cyber-glass-fill)"
            stroke="url(#cyber-grad-frame)"
            strokeWidth="1.75"
            filter="url(#cyber-glow-filter)"
          />

          {/* Chrono Orbit Grid */}
          <circle
            cx="24"
            cy="24"
            r="15"
            stroke="rgba(56, 189, 248, 0.25)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* High-Precision Chrono Marks */}
          <circle cx="24" cy="8" r="1.5" fill="#38bdf8" />
          <circle cx="40" cy="24" r="1.5" fill="#60a5fa" />
          <circle cx="24" cy="40" r="1.5" fill="#38bdf8" />
          <circle cx="8" cy="24" r="1.5" fill="#60a5fa" />

          {/* Stylized Chrono Needles */}
          <path
            d="M24 24L33 15"
            stroke="url(#cyber-needle-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M24 24L16 20"
            stroke="#f8fafc"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Core Gem Pivot */}
          <circle cx="24" cy="24" r="3.2" fill="#38bdf8" />
          <circle cx="24" cy="24" r="1.5" fill="#ffffff" />
          <circle cx="33" cy="15" r="2.2" fill="#60a5fa" />
        </svg>
      </div>

      {/* Brand Text & Executive Tag */}
      {showText && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <span
              style={{
                fontSize: `${Math.max(17, size * 0.48)}px`,
                fontWeight: "900",
                letterSpacing: "-0.03em",
                color: isLight ? "#09132b" : "#ffffff",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <span>Alarm</span>
              <span style={{ color: "#2563eb", marginLeft: "1px" }}>Agenda</span>
            </span>
            <span
              style={{
                fontSize: "9.5px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "2.5px 7px",
                borderRadius: "6px",
                background: isLight ? "rgba(37, 99, 235, 0.12)" : "rgba(56, 189, 248, 0.2)",
                border: isLight ? "1px solid rgba(37, 99, 235, 0.3)" : "1px solid rgba(56, 189, 248, 0.4)",
                color: isLight ? "#1d4ed8" : "#38bdf8",
              }}
            >
              EXECUTIVE
            </span>
          </div>
          <span
            style={{
              fontSize: `${Math.max(10.5, size * 0.23)}px`,
              fontWeight: "600",
              color: isLight ? "#475569" : "#94a3b8",
              letterSpacing: "0.01em",
              marginTop: "2px",
            }}
          >
            Cockpit Personnel & IA
          </span>
        </div>
      )}
    </div>
  );
}

import React from "react";

interface LogoProps {
  size?: number;
  showText?: boolean;
  textClassName?: string;
  animated?: boolean;
  className?: string;
}

export default function Logo({
  size = 36,
  showText = true,
  animated = false,
  className = "",
}: LogoProps) {
  return (
    <div
      className={`flex items-center gap-3 select-none ${className}`}
      style={{ display: "flex", alignItems: "center", gap: `${Math.max(8, size * 0.28)}px` }}
    >
      {/* SVG Icon */}
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
        {/* Subtle Ambient Glow */}
        <div
          style={{
            position: "absolute",
            inset: "-15%",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(52, 211, 153, 0.08) 50%, transparent 70%)",
            filter: "blur(6px)",
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
            {/* Developer Titanium & Steel Gradient */}
            <linearGradient id="logo-grad-primary" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            {/* Neural Emerald Accent */}
            <linearGradient id="logo-sparkle" x1="20" y1="12" x2="28" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            {/* Subtle drop shadow */}
            <filter id="logo-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#ffffff" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Outer Titanium Squircle Frame */}
          <rect
            x="3"
            y="3"
            width="42"
            height="42"
            rx="12"
            fill="#09090b"
            stroke="url(#logo-grad-primary)"
            strokeWidth="1.8"
            filter="url(#logo-glow-filter)"
          />

          {/* Chrono Orbit Ring */}
          <circle
            cx="24"
            cy="24"
            r="14"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />

          {/* Precision Markers */}
          <line x1="24" y1="8" x2="24" y2="10.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="24" x2="37.5" y2="24" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="40" x2="24" y2="37.5" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="24" x2="10.5" y2="24" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

          {/* Clock Hands */}
          <path
            d="M24 24L32 16"
            stroke="url(#logo-sparkle)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M24 24L17 21"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Center Pivot */}
          <circle cx="24" cy="24" r="3" fill="#ffffff" />
          <circle cx="24" cy="24" r="1.2" fill="#09090b" />

          {/* Active Emerald Dot */}
          <circle cx="32" cy="16" r="2" fill="#34d399" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                fontSize: `${Math.max(16, size * 0.48)}px`,
                fontWeight: "800",
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              AlarmAgenda
            </span>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: "700",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#94a3b8",
                padding: "1px 5px",
                borderRadius: "4px",
              }}
            >
              OS
            </span>
          </div>
          <span
            style={{
              fontSize: `${Math.max(10, size * 0.24)}px`,
              fontWeight: "500",
              color: "#64748b",
              letterSpacing: "0.02em",
              marginTop: "2px",
            }}
          >
            Système Vocal & Calendrier Intelligent
          </span>
        </div>
      )}
    </div>
  );
}

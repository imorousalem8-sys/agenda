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
        {/* Ambient Glow */}
        <div
          style={{
            position: "absolute",
            inset: "-20%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)",
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
            {/* Primary Gradient */}
            <linearGradient id="logo-grad-primary" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="35%" stopColor="#6366f1" />
              <stop offset="70%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            {/* Shield / Core Glow */}
            <linearGradient id="logo-core-grad" x1="14" y1="14" x2="34" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
            </linearGradient>

            {/* Neural Sparkle Gradient */}
            <linearGradient id="logo-sparkle" x1="20" y1="12" x2="28" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Filter for subtle drop-shadow */}
            <filter id="logo-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#6366f1" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Outer Rounded Squircle Frame with glowing gradient stroke */}
          <rect
            x="3"
            y="3"
            width="42"
            height="42"
            rx="13"
            fill="#0b0f19"
            stroke="url(#logo-grad-primary)"
            strokeWidth="2.2"
            filter="url(#logo-glow-filter)"
          />

          {/* Chrono / Orbit Rings */}
          <circle
            cx="24"
            cy="24"
            r="14"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Outer Time Markers */}
          <line x1="24" y1="8" x2="24" y2="10" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="24" x2="38" y2="24" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="40" x2="24" y2="38" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="24" x2="10" y2="24" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />

          {/* Central AI Neural Core: Diamond / Spark + Clock Needles */}
          {/* Chrono Needle Accent */}
          <path
            d="M24 24L31 17"
            stroke="url(#logo-sparkle)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M24 24L18 20"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Central Pulsing Sparkle Node */}
          <circle cx="24" cy="24" r="3.5" fill="#ffffff" />
          <circle cx="24" cy="24" r="1.5" fill="#6366f1" />

          {/* Dynamic AI Neural Nodes */}
          <circle cx="31" cy="17" r="2.2" fill="#38bdf8" />
          <circle cx="18" cy="20" r="1.8" fill="#a855f7" />
          <circle cx="28" cy="31" r="2" fill="#ec4899" />
          <path
            d="M24 24L28 31"
            stroke="rgba(236, 72, 153, 0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="2 2"
          />

          {/* AI Sparkle Star on top right corner */}
          <path
            d="M34 9L35 12L38 13L35 14L34 17L33 14L30 13L33 12L34 9Z"
            fill="#38bdf8"
          />
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
                background: "linear-gradient(135deg, #ffffff 10%, #dbeafe 45%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AlarmAgenda
            </span>
          </div>
          <span
            style={{
              fontSize: `${Math.max(10, size * 0.26)}px`,
              fontWeight: "500",
              color: "rgba(154, 165, 192, 0.8)",
              letterSpacing: "0.02em",
              marginTop: "2px",
            }}
          >
            Assistant & Agenda Intelligent
          </span>
        </div>
      )}
    </div>
  );
}

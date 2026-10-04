import React from "react";
import Image from "next/image";

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
      {/* Icon Container with Subtle Glow */}
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
            inset: "-15%",
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.45) 0%, rgba(6, 182, 212, 0.25) 45%, transparent 75%)",
            filter: "blur(6px)",
            borderRadius: "14px",
            zIndex: 0,
            animation: animated ? "pulseGlow 3s ease-in-out infinite alternate" : undefined,
          }}
        />

        {/* Official AlarmAgenda App Emblem */}
        <Image
          src="/icons/icon-192.png"
          alt="AlarmAgenda Logo"
          width={size}
          height={size}
          priority
          className="relative z-10 shadow-[0_4px_16px_rgba(37,99,235,0.35)]"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: `${Math.max(8, size * 0.24)}px`,
            objectFit: "cover",
          }}
        />
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

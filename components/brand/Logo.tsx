"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  size?: number;
  showText?: boolean;
  textClassName?: string;
  animated?: boolean;
  className?: string;
  theme?: "dark" | "light";
  subtitle?: string;
}

export default function Logo({
  size = 40,
  showText = true,
  animated = false,
  className = "",
  theme = "light",
  subtitle = "Assistant Vocal & Agenda IA",
}: LogoProps) {
  const isLight = theme === "light";

  return (
    <div
      className={`flex items-center select-none ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: `${Math.max(10, size * 0.26)}px`,
      }}
    >
      {/* Icon Squircle Haute Définition */}
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
        {/* Halo d'ambiance bleu royal doux */}
        <div
          style={{
            position: "absolute",
            inset: "-12%",
            background:
              "radial-gradient(circle, rgba(13, 85, 224, 0.35) 0%, rgba(30, 64, 175, 0.15) 50%, transparent 75%)",
            filter: "blur(6px)",
            borderRadius: `${Math.max(10, size * 0.28)}px`,
            zIndex: 0,
            opacity: animated ? 0.9 : 0.6,
          }}
        />

        {/* Emblème Officiel Alamajonda */}
        <Image
          src="/logo.png"
          alt="Alamajonda"
          width={size}
          height={size}
          priority
          className="relative z-10 transition-transform duration-300 hover:scale-105"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: `${Math.max(8, size * 0.24)}px`,
            objectFit: "contain",
            boxShadow: "0 4px 14px rgba(13, 85, 224, 0.28)",
          }}
        />
      </div>

      {/* Libellé Marque */}
      {showText && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontSize: `${Math.max(18, size * 0.48)}px`,
                fontWeight: "800",
                letterSpacing: "-0.03em",
                color: isLight ? "#0b1736" : "#ffffff",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <span>Alama</span>
              <span style={{ color: "#0d55e0", marginLeft: "1px" }}>jonda</span>
            </span>
            <span
              style={{
                fontSize: "9px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "2px 6px",
                borderRadius: "5px",
                background: isLight ? "rgba(13, 85, 224, 0.08)" : "rgba(13, 85, 224, 0.25)",
                border: isLight ? "1px solid rgba(13, 85, 224, 0.2)" : "1px solid rgba(13, 85, 224, 0.4)",
                color: isLight ? "#0d55e0" : "#60a5fa",
              }}
            >
              AI PRO
            </span>
          </div>
          {subtitle && (
            <span
              style={{
                fontSize: `${Math.max(10, size * 0.22)}px`,
                fontWeight: "500",
                color: isLight ? "#64748b" : "#94a3b8",
                letterSpacing: "0.01em",
                marginTop: "2px",
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

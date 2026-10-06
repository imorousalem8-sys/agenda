"use client";

import { useEffect, useState } from "react";

interface AudioWaveVisualizerProps {
  state: "listening" | "thinking" | "speaking" | "idle";
  size?: "sm" | "md" | "lg";
}

export default function AudioWaveVisualizer({
  state,
  size = "md",
}: AudioWaveVisualizerProps) {
  const [bars, setBars] = useState<number[]>([15, 25, 45, 60, 45, 25, 15]);

  useEffect(() => {
    if (state === "idle") {
      setBars([8, 12, 16, 20, 16, 12, 8]);
      return;
    }

    const interval = setInterval(() => {
      if (state === "listening") {
        setBars(
          Array.from({ length: 9 }, () => Math.floor(Math.random() * 50) + 15)
        );
      } else if (state === "speaking") {
        setBars(
          Array.from({ length: 9 }, () => Math.floor(Math.random() * 65) + 20)
        );
      } else if (state === "thinking") {
        setBars([20, 35, 50, 65, 50, 35, 20, 15, 10]);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [state]);

  const orbSize = size === "lg" ? 140 : size === "md" ? 90 : 50;

  const orbColor =
    state === "listening"
      ? "radial-gradient(circle, #38bdf8 0%, #0284c7 40%, rgba(2, 132, 199, 0) 70%)"
      : state === "speaking"
      ? "radial-gradient(circle, #34d399 0%, #059669 40%, rgba(5, 150, 105, 0) 70%)"
      : state === "thinking"
      ? "radial-gradient(circle, #fbbf24 0%, #d97706 40%, rgba(217, 119, 6, 0) 70%)"
      : "radial-gradient(circle, #475569 0%, #334155 40%, rgba(51, 65, 85, 0) 70%)";

  const glowShadow =
    state === "listening"
      ? "0 0 45px rgba(56, 189, 248, 0.4)"
      : state === "speaking"
      ? "0 0 50px rgba(52, 211, 153, 0.45)"
      : state === "thinking"
      ? "0 0 40px rgba(251, 191, 36, 0.35)"
      : "0 0 15px rgba(71, 85, 105, 0.2)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
      }}
    >
      {/* Dynamic Luminous Orb */}
      <div
        style={{
          width: `${orbSize}px`,
          height: `${orbSize}px`,
          borderRadius: "50%",
          background: orbColor,
          boxShadow: glowShadow,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          position: "relative",
        }}
        className={state !== "idle" ? "animate-pulse" : ""}
      >
        {/* Inner Core */}
        <div
          style={{
            width: `${orbSize * 0.55}px`,
            height: `${orbSize * 0.55}px`,
            borderRadius: "50%",
            background: "#ffffff",
            opacity: state === "idle" ? 0.3 : 0.85,
            filter: "blur(6px)",
          }}
        />
      </div>

      {/* Real-time audio wave bars */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          height: "40px",
        }}
      >
        {bars.map((height, idx) => (
          <div
            key={idx}
            style={{
              width: "4px",
              height: `${height}px`,
              borderRadius: "999px",
              background:
                state === "listening"
                  ? "#38bdf8"
                  : state === "speaking"
                  ? "#34d399"
                  : state === "thinking"
                  ? "#fbbf24"
                  : "#64748b",
              transition: "height 0.08s ease, background 0.2s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

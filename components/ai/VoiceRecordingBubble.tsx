"use client";

import React from "react";
import { Mic, Check, X } from "lucide-react";

interface VoiceRecordingBubbleProps {
  isListening: boolean;
  transcript: string;
  onStop: () => void;
  onCancel: () => void;
}

export default function VoiceRecordingBubble({
  isListening,
  transcript,
  onStop,
  onCancel,
}: VoiceRecordingBubbleProps) {
  if (!isListening) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "90px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        pointerEvents: "auto",
        animation: "slideUpFade 0.25s ease-out",
      }}
    >
      {/* Live Transcript Pill */}
      <div
        style={{
          background: "rgba(15, 17, 26, 0.92)",
          border: "1px solid rgba(52, 211, 153, 0.4)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(52, 211, 153, 0.2)",
          borderRadius: "20px",
          padding: "8px 16px",
          maxWidth: "min(460px, calc(100vw - 32px))",
          textAlign: "center",
          color: "#ffffff",
          fontSize: "13px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#34d399",
            boxShadow: "0 0 10px #34d399",
            animation: "pulse 1.2s infinite",
            flexShrink: 0,
          }}
        />
        <span style={{ fontWeight: "500", color: transcript ? "#ffffff" : "#94a3b8", fontStyle: transcript ? "normal" : "italic" }}>
          {transcript || "Parlez maintenant... (ex: Prends RDV demain 6h avec Dominique)"}
        </span>
      </div>

      {/* Main Animated Recording Bubble & Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          background: "rgba(10, 11, 16, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "8px 14px",
          borderRadius: "40px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.9)",
        }}
      >
        {/* Cancel Button */}
        <button
          type="button"
          onClick={onCancel}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#f87171",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          title="Annuler la dictée"
        >
          <X size={16} />
        </button>

        {/* Pulsing Central Mic Ring */}
        <div
          onClick={onStop}
          style={{
            position: "relative",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #10b981, #059669)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            cursor: "pointer",
            boxShadow: "0 0 25px rgba(16, 185, 129, 0.6)",
          }}
          title="Arrêter et envoyer"
        >
          {/* Animated Wave Rings */}
          <div
            style={{
              position: "absolute",
              inset: "-6px",
              borderRadius: "50%",
              border: "2px solid rgba(52, 211, 153, 0.6)",
              animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "-14px",
              borderRadius: "50%",
              border: "1px solid rgba(52, 211, 153, 0.3)",
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              pointerEvents: "none",
            }}
          />

          {/* Equalizer bars simulation */}
          <div style={{ display: "flex", alignItems: "center", gap: "3px", zIndex: 2 }}>
            <span style={{ width: "3px", height: "14px", background: "#ffffff", borderRadius: "2px", animation: "waveBar 0.6s infinite alternate" }} />
            <span style={{ width: "3px", height: "22px", background: "#ffffff", borderRadius: "2px", animation: "waveBar 0.8s 0.2s infinite alternate" }} />
            <Mic size={18} style={{ margin: "0 1px" }} />
            <span style={{ width: "3px", height: "22px", background: "#ffffff", borderRadius: "2px", animation: "waveBar 0.8s 0.1s infinite alternate" }} />
            <span style={{ width: "3px", height: "14px", background: "#ffffff", borderRadius: "2px", animation: "waveBar 0.6s 0.3s infinite alternate" }} />
          </div>
        </div>

        {/* Confirm & Send Button */}
        <button
          type="button"
          onClick={onStop}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(52, 211, 153, 0.15)",
            border: "1px solid rgba(52, 211, 153, 0.3)",
            color: "#34d399",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          title="Valider la consigne vocale"
        >
          <Check size={16} />
        </button>
      </div>

      <style jsx global>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translate(-50%, 15px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        @keyframes waveBar {
          0% { transform: scaleY(0.4); }
          100% { transform: scaleY(1.3); }
        }
      `}</style>
    </div>
  );
}

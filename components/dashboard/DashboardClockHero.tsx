"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Bot, Clock, Bell, Plus, Calendar } from "lucide-react";

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

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time ? time.getHours().toString().padStart(2, "0") : "12";
  const minutes = time ? time.getMinutes().toString().padStart(2, "0") : "00";
  const seconds = time ? time.getSeconds().toString().padStart(2, "0") : "00";

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
      style={{
        background: "#111827",
        border: "1px solid #1f293d",
        borderRadius: "18px",
        padding: "24px 28px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "20px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Left: Greeting & Current Date */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <span
            style={{
              padding: "3px 10px",
              borderRadius: "20px",
              background: "rgba(99, 102, 241, 0.15)",
              color: "#818cf8",
              fontSize: "12px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Tableau de Bord
          </span>
          <span style={{ fontSize: "13px", color: "var(--text-muted)", textTransform: "capitalize" }}>
            {formattedDate}
          </span>
        </div>
        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
          {greeting}, Alexandre 👋
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "4px" }}>
          Voici le récapitulatif de votre journée et vos prochaines alertes.
        </p>
      </div>

      {/* Right: Clean Live Clock & Quick Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        {/* Time Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#0c101a",
            border: "1px solid #1e293b",
            padding: "10px 18px",
            borderRadius: "14px",
          }}
        >
          <Clock size={20} color="#38bdf8" />
          <div style={{ fontFamily: "monospace", fontSize: "22px", fontWeight: "800", color: "#f8fafc", letterSpacing: "0.05em" }}>
            <span>{hours}:{minutes}</span>
            <span style={{ fontSize: "14px", color: "#64748b", marginLeft: "4px" }}>:{seconds}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <button
          onClick={onNewEvent}
          className="btn btn-primary"
          style={{
            padding: "10px 18px",
            gap: "8px",
            fontWeight: "700",
            fontSize: "13px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          }}
          id="hero-new-event-btn"
        >
          <Plus size={16} />
          <span>Nouveau rendez-vous</span>
        </button>

        <button
          onClick={onOpenAI}
          className="btn btn-secondary"
          style={{
            padding: "10px 16px",
            gap: "8px",
            fontWeight: "700",
            fontSize: "13px",
            borderRadius: "12px",
            color: "#38bdf8",
            border: "1px solid rgba(56, 189, 248, 0.3)",
          }}
          id="hero-copilot-btn"
        >
          <Bot size={16} color="#38bdf8" />
          <span>Assistant Vocal</span>
        </button>
      </div>
    </div>
  );
}

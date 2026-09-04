"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Clock, Bell, Plus, Calendar, Mic } from "lucide-react";

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
    <div className="hero-banner">
      {/* Left: Greeting & Current Date */}
      <div className="hero-left">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
          <span
            style={{
              padding: "3px 10px",
              borderRadius: "20px",
              background: "rgba(99, 102, 241, 0.15)",
              color: "#818cf8",
              fontSize: "11px",
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
        <h1 className="hero-title">
          {greeting}, Alexandre 👋
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "4px" }}>
          Voici le récapitulatif de votre journée et vos prochaines alertes.
        </p>
      </div>

      {/* Right: Clean Live Clock & Quick Actions */}
      <div className="hero-actions">
        {/* Time Badge */}
        <div className="hero-time-badge">
          <Clock size={18} color="#38bdf8" />
          <div style={{ fontFamily: "monospace", fontSize: "20px", fontWeight: "800", color: "#f8fafc", letterSpacing: "0.05em" }}>
            <span>{hours}:{minutes}</span>
            <span style={{ fontSize: "13px", color: "#64748b", marginLeft: "4px" }}>:{seconds}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hero-btn-group">
          <button
            onClick={onNewEvent}
            className="btn btn-primary hero-action-btn"
            id="hero-new-event-btn"
          >
            <Plus size={15} />
            <span>Nouveau rendez-vous</span>
          </button>

          <button
            onClick={onOpenAI}
            className="btn btn-secondary hero-action-btn"
            style={{ color: "#38bdf8", borderColor: "rgba(56, 189, 248, 0.3)" }}
            id="hero-copilot-btn"
          >
            <Mic size={15} color="#38bdf8" />
            <span>Assistant Vocal</span>
          </button>
        </div>
      </div>
    </div>
  );
}

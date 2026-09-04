"use client";

import { useEffect, useState } from "react";
import { Sparkles, Crown } from "lucide-react";
import { QuotaStatus } from "@/lib/ai/quotas";

export default function QuotaIndicator({ compact = false }: { compact?: boolean }) {
  const [quota, setQuota] = useState<QuotaStatus | null>(null);

  const fetchQuota = async () => {
    try {
      const res = await fetch("/api/ai/quota");
      if (res.ok) {
        const data = await res.json();
        setQuota(data);
      }
    } catch {
      // Non-blocking
    }
  };

  useEffect(() => {
    fetchQuota();
    const handleUpdate = () => fetchQuota();
    window.addEventListener("ai-quota-updated", handleUpdate);
    return () => window.removeEventListener("ai-quota-updated", handleUpdate);
  }, []);

  if (!quota) return null;

  const percentage = Math.min(100, Math.round((quota.used / quota.limit) * 100));
  const isLow = quota.remaining <= 5;

  if (compact) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          padding: "2px 7px",
          borderRadius: "6px",
          background: isLow ? "rgba(239, 68, 68, 0.15)" : "rgba(255, 255, 255, 0.05)",
          border: `1px solid ${isLow ? "rgba(239, 68, 68, 0.35)" : "var(--border-subtle)"}`,
          fontSize: "10px",
          fontWeight: "600",
          color: isLow ? "#f87171" : "#94a3b8",
        }}
        title={`Quota IA : ${quota.used}/${quota.limit} ce mois`}
      >
        <Sparkles size={10} color={isLow ? "#f87171" : "#38bdf8"} />
        <span>{quota.remaining} dispo</span>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "12px 14px",
        borderRadius: "8px",
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: "600", color: "#f8fafc" }}>
          <Sparkles size={12} style={{ color: "#38bdf8" }} />
          <span>Quota Assistant IA</span>
        </div>
        <span
          style={{
            fontSize: "9px",
            fontWeight: "700",
            padding: "2px 6px",
            borderRadius: "4px",
            background: quota.plan === "PRO" ? "#10b981" : "rgba(255, 255, 255, 0.06)",
            color: "#ffffff",
          }}
        >
          {quota.plan === "PRO" ? "PRO" : "GRATUIT"}
        </span>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "4px",
          background: "rgba(255, 255, 255, 0.06)",
          borderRadius: "999px",
          overflow: "hidden",
          marginBottom: "6px",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: isLow ? "#ef4444" : "#38bdf8",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--text-muted)" }}>
        <span>{quota.used} / {quota.limit} req</span>
        <span style={{ color: isLow ? "#f87171" : "#38bdf8", fontWeight: "600" }}>
          {quota.remaining} restante{quota.remaining > 1 ? "s" : ""}
        </span>
      </div>

      {quota.plan !== "PRO" && isLow && (
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-upgrade-modal", { detail: { feature: "Quotas IA Illimités" } }))}
          className="btn btn-primary btn-sm"
          style={{
            width: "100%",
            marginTop: "8px",
            padding: "5px",
            fontSize: "11px",
            fontWeight: "600",
            gap: "5px",
          }}
        >
          <Crown size={12} />
          <span>Débloquer 1000 requêtes</span>
        </button>
      )}
    </div>
  );
}

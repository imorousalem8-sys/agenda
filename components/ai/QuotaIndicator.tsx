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
          gap: "6px",
          padding: "3px 8px",
          borderRadius: "999px",
          background: isLow ? "rgba(239, 68, 68, 0.15)" : "rgba(99, 102, 241, 0.12)",
          border: `1px solid ${isLow ? "rgba(239, 68, 68, 0.4)" : "rgba(99, 102, 241, 0.3)"}`,
          fontSize: "11px",
          fontWeight: "600",
          color: isLow ? "#f87171" : "#a5b4fc",
        }}
        title={`Quota IA : ${quota.used}/${quota.limit} ce mois`}
      >
        <Sparkles size={11} />
        <span>{quota.remaining} IA dispo</span>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "12px",
        background: "rgba(15, 23, 42, 0.7)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: "700", color: "#e2e8f0" }}>
          <Sparkles size={13} style={{ color: "#6366f1" }} />
          <span>Quota Assistant IA</span>
        </div>
        <span
          style={{
            fontSize: "10px",
            fontWeight: "800",
            padding: "2px 6px",
            borderRadius: "6px",
            background: quota.plan === "PRO" ? "linear-gradient(135deg, #f59e0b, #ec4899)" : "rgba(255, 255, 255, 0.1)",
            color: "#ffffff",
          }}
        >
          {quota.plan === "PRO" ? "PLAN PRO" : "PLAN GRATUIT"}
        </span>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "6px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "999px",
          overflow: "hidden",
          marginBottom: "6px",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: isLow ? "linear-gradient(90deg, #f59e0b, #ef4444)" : "linear-gradient(90deg, #6366f1, #06b6d4)",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)" }}>
        <span>{quota.used} / {quota.limit} requêtes</span>
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
            marginTop: "10px",
            padding: "6px",
            fontSize: "11px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            gap: "5px",
          }}
        >
          <Crown size={12} />
          <span>Passer à 1000 requêtes</span>
        </button>
      )}
    </div>
  );
}

"use client";

import { CheckCircle2, Clock, AlertCircle, Loader2 } from "lucide-react";
import { AgentStep } from "@/lib/ai/types";

export default function AgentStepCard({ step }: { step: AgentStep }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        padding: "8px 12px",
        borderRadius: "10px",
        background: "rgba(30, 41, 59, 0.6)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        fontSize: "12px",
        marginTop: "4px",
      }}
    >
      <div style={{ marginTop: "2px" }}>
        {step.status === "running" && <Loader2 size={14} className="animate-spin text-indigo-400" />}
        {step.status === "done" && <CheckCircle2 size={14} className="text-emerald-400" />}
        {step.status === "error" && <AlertCircle size={14} className="text-rose-400" />}
        {step.status === "pending" && <Clock size={14} className="text-slate-400" />}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "600", color: "#f1f5f9" }}>{step.label}</div>
        {step.detail && <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{step.detail}</div>}
      </div>
    </div>
  );
}

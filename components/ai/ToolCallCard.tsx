"use client";

import { Calendar, CheckSquare, Bell, User, Sparkles, Trash2, Check } from "lucide-react";
import { AIActionExecutionResult } from "@/lib/ai/types";

interface ToolCallCardProps {
  action: AIActionExecutionResult;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function ToolCallCard({ action, onConfirm, onCancel }: ToolCallCardProps) {
  const getIcon = () => {
    switch (action.type) {
      case "EVENT": return <Calendar size={16} className="text-cyan-400" />;
      case "TASK": return <CheckSquare size={16} className="text-emerald-400" />;
      case "REMINDER": return <Bell size={16} className="text-amber-400" />;
      case "CONTACT": return <User size={16} className="text-purple-400" />;
      case "DELETE_CONFIRM": return <Trash2 size={16} className="text-rose-400" />;
      default: return <Sparkles size={16} className="text-indigo-400" />;
    }
  };

  const getBorderColor = () => {
    switch (action.type) {
      case "EVENT": return "rgba(6, 182, 212, 0.4)";
      case "TASK": return "rgba(16, 185, 129, 0.4)";
      case "REMINDER": return "rgba(245, 158, 11, 0.4)";
      case "DELETE_CONFIRM": return "rgba(239, 68, 68, 0.4)";
      default: return "rgba(99, 102, 241, 0.4)";
    }
  };

  return (
    <div
      style={{
        marginTop: "10px",
        padding: "12px 14px",
        borderRadius: "12px",
        background: "rgba(15, 23, 42, 0.85)",
        border: `1px solid ${getBorderColor()}`,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
        {getIcon()}
        <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px", color: "#94a3b8" }}>
          {action.type === "DELETE_CONFIRM" ? "Confirmation Requise" : action.type}
        </span>
      </div>

      <div style={{ fontSize: "13px", fontWeight: "700", color: "#f8fafc", marginBottom: "4px" }}>
        {action.title}
      </div>

      {action.notes && (
        <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>
          {action.notes}
        </div>
      )}

      {action.requiresConfirmation && (
        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <button
            onClick={onConfirm}
            className="btn btn-primary btn-sm"
            style={{ flex: 1, padding: "6px", fontSize: "12px", background: "linear-gradient(135deg, #ef4444, #dc2626)", gap: "4px" }}
          >
            <Check size={14} />
            <span>Confirmer</span>
          </button>
          <button
            onClick={onCancel}
            className="btn btn-ghost btn-sm"
            style={{ flex: 1, padding: "6px", fontSize: "12px", border: "1px solid var(--border-subtle)" }}
          >
            <span>Annuler</span>
          </button>
        </div>
      )}
    </div>
  );
}

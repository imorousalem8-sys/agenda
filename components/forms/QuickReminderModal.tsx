"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reminderSchema, type ReminderInput } from "@/lib/validations";
import { X, Bell, Clock, Phone, Loader2, Zap } from "lucide-react";
import { addMinutes, addHours, setHours, setMinutes, addDays, format } from "date-fns";

interface QuickReminderModalProps {
  onClose: () => void;
  onSaved: () => void;
}

export default function QuickReminderModal({ onClose, onSaved }: QuickReminderModalProps) {
  const [error, setError] = useState("");

  const defaultFireAt = format(addMinutes(new Date(), 10), "yyyy-MM-dd'T'HH:mm");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReminderInput>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      title: "",
      body: "",
      fireAt: defaultFireAt,
      method: "VOICE", // Default to AI Voice call!
    },
  });

  const setPreset = (type: "5m" | "15m" | "30m" | "1h" | "tomorrow9") => {
    const now = new Date();
    let d = now;
    if (type === "5m") d = addMinutes(now, 5);
    else if (type === "15m") d = addMinutes(now, 15);
    else if (type === "30m") d = addMinutes(now, 30);
    else if (type === "1h") d = addHours(now, 1);
    else if (type === "tomorrow9") {
      d = addDays(now, 1);
      d = setHours(d, 9);
      d = setMinutes(d, 0);
    }
    setValue("fireAt", format(d, "yyyy-MM-dd'T'HH:mm"));
  };

  const onSubmit = async (data: ReminderInput) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json().catch(() => ({}));
      if (res.ok) {
        window.dispatchEvent(new Event("reminder-updated"));
        onSaved();
      } else {
        setError(resData.error || "Erreur lors de la programmation du rappel.");
      }
    } catch {
      setError("Erreur de communication réseau.");
    } finally {
      setLoading(false);
    }
  };

  const currentMethod = watch("method");

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal animate-scale-in" style={{ maxWidth: "500px" }}>
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bell size={18} color="white" />
            </div>
            <div>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "var(--text-primary)" }}>
                Nouveau rappel direct
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Programmez une alerte ou un appel IA immédiat
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: "6px" }} id="quick-reminder-close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {error && (
              <div style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#fca5a5", fontSize: "13px", fontWeight: 600 }}>
                {error}
              </div>
            )}
            {/* Quick Presets */}
            <div>
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Zap size={12} color="var(--accent-warning)" /> Raccourcis rapides
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {[
                  { id: "5m", label: "+5 min" },
                  { id: "15m", label: "+15 min" },
                  { id: "30m", label: "+30 min" },
                  { id: "1h", label: "+1 heure" },
                  { id: "tomorrow9", label: "Demain 9h" },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setPreset(preset.id as "5m" | "15m" | "30m" | "1h" | "tomorrow9")}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: "11px", padding: "4px 8px" }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="form-group">
              <label className="form-label">Titre du rappel *</label>
              <input
                {...register("title")}
                type="text"
                placeholder="Ex: Appeler le fournisseur, Prendre mes médicaments..."
                className="form-input"
                id="quick-reminder-title"
              />
              {errors.title && <span className="form-error">{errors.title.message}</span>}
            </div>

            {/* Details / Body */}
            <div className="form-group">
              <label className="form-label">Détails ou instructions pour l&apos;IA</label>
              <textarea
                {...register("body")}
                rows={2}
                placeholder="Explications que l'IA vous transmettra à l'appel..."
                className="form-input"
                id="quick-reminder-body"
                style={{ resize: "vertical" }}
              />
            </div>

            {/* Date & Time */}
            <div className="form-group">
              <label className="form-label">
                <Clock size={12} style={{ display: "inline", marginRight: "4px" }} />
                Date et heure du déclenchement *
              </label>
              <input
                {...register("fireAt")}
                type="datetime-local"
                className="form-input"
                id="quick-reminder-fireAt"
                style={{ colorScheme: "dark" }}
              />
              {errors.fireAt && <span className="form-error">{errors.fireAt.message}</span>}
            </div>

            {/* Method selection */}
            <div className="form-group">
              <label className="form-label">Mode d&apos;alerte</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {[
                  { value: "VOICE", label: "📞 Appel vocal IA", desc: "Simulateur d'appel avec voix" },
                  { value: "ALARM", label: "🔔 Alarme sonore", desc: "Sonnerie continue & plein écran" },
                  { value: "NOTIFICATION", label: "📲 Notification", desc: "Alerte système push" },
                  { value: "EMAIL", label: "📧 Email", desc: "Envoi par messagerie" },
                ].map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setValue("method", m.value as ReminderInput["method"])}
                    className="card"
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      cursor: "pointer",
                      border: currentMethod === m.value ? "1.5px solid var(--accent-primary)" : "1px solid var(--border-default)",
                      background: currentMethod === m.value ? "rgba(99, 102, 241, 0.12)" : "var(--bg-card)",
                      transition: "all 0.2s",
                    }}
                  >
                    <p style={{ fontSize: "13px", fontWeight: "700", color: currentMethod === m.value ? "var(--accent-primary)" : "var(--text-primary)" }}>
                      {m.label}
                    </p>
                    <p style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>
                      {m.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
            }}
          >
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Annuler
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary" id="quick-reminder-save">
              {loading && <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />}
              {loading ? "Création..." : "Programmer le rappel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

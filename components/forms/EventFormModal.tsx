"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, type EventInput } from "@/lib/validations";
import { X, Calendar, Clock, MapPin, FileText, Bell, Loader2, Briefcase, User } from "lucide-react";

interface EventFormModalProps {
  onClose: () => void;
  onSaved: () => void;
  initialDate?: Date;
  eventToEdit?: {
    id: string;
    title: string;
    description?: string | null;
    notes?: string | null;
    startAt: string;
    endAt?: string | null;
    location?: string | null;
    category: string;
    priority: string;
    mode: string;
  };
}

const CATEGORIES = [
  { value: "HEALTH", label: "Santé" },
  { value: "FAMILY", label: "Famille" },
  { value: "WORK", label: "Travail" },
  { value: "ADMIN", label: "Administratif" },
  { value: "EDUCATION", label: "Études" },
  { value: "SHOPPING", label: "Courses" },
  { value: "TRAVEL", label: "Voyage" },
  { value: "OTHER", label: "Autre" },
];

const REMINDER_OPTIONS = [
  { value: 0, label: "Aucun rappel supplémentaire" },
  { value: 15, label: "15 minutes avant" },
  { value: 30, label: "30 minutes avant" },
  { value: 60, label: "1 heure avant" },
  { value: 120, label: "2 heures avant" },
  { value: 1440, label: "1 jour avant" },
];

export default function EventFormModal({ onClose, onSaved, initialDate, eventToEdit }: EventFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const defaultStart = initialDate
    ? `${initialDate.toISOString().slice(0, 10)}T09:00`
    : new Date().toISOString().slice(0, 16);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: eventToEdit?.title ?? "",
      description: eventToEdit?.description ?? "",
      notes: eventToEdit?.notes ?? "",
      startAt: eventToEdit?.startAt
        ? new Date(eventToEdit.startAt).toISOString().slice(0, 16)
        : defaultStart,
      endAt: eventToEdit?.endAt
        ? new Date(eventToEdit.endAt).toISOString().slice(0, 16)
        : "",
      location: eventToEdit?.location ?? "",
      category: (eventToEdit?.category as EventInput["category"]) ?? "OTHER",
      priority: (eventToEdit?.priority as EventInput["priority"]) ?? "NORMAL",
      mode: (eventToEdit?.mode as EventInput["mode"]) ?? "PERSONAL",
      hasVeilleReminder: false,
      reminderMinutesBefore: 30,
    },
  });

  const mode = watch("mode");

  const [isLimitReached, setIsLimitReached] = useState(false);

  const onSubmit = async (data: EventInput) => {
    setLoading(true);
    setError("");
    setIsLimitReached(false);

    try {
      const url = eventToEdit ? `/api/events/${eventToEdit.id}` : "/api/events";
      const method = eventToEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Erreur lors de la sauvegarde");
        if (json.limitReached) {
          setIsLimitReached(true);
        }
        setLoading(false);
        return;
      }

      onSaved();
    } catch {
      setError("Erreur de connexion");
      setLoading(false);
    }
  };

  const handleOpenUpgradeFromModal = () => {
    onClose();
    window.dispatchEvent(
      new CustomEvent("open-upgrade-modal", {
        detail: { feature: "l'ajout illimité de rendez-vous" },
      })
    );
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal animate-scale-in">
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
          <div>
            <h2 style={{ fontSize: "17px", fontWeight: "700", color: "var(--text-primary)" }}>
              {eventToEdit ? "Modifier l'événement" : "Nouveau rendez-vous"}
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>
              Remplissez les informations de votre rendez-vous
            </p>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: "6px" }} id="event-form-close">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
            {error && (
              <div
                style={{
                  background: isLimitReached ? "rgba(245, 158, 11, 0.12)" : "rgba(239,68,68,0.1)",
                  border: isLimitReached ? "1px solid rgba(245, 158, 11, 0.4)" : "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "12px",
                  padding: "14px",
                  color: isLimitReached ? "#fbbf24" : "#ef4444",
                  fontSize: "13px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div>{error}</div>
                {isLimitReached && (
                  <button
                    type="button"
                    onClick={handleOpenUpgradeFromModal}
                    className="btn btn-primary btn-sm"
                    style={{
                      background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)",
                      color: "#ffffff",
                      fontWeight: "800",
                      alignSelf: "flex-start",
                      padding: "8px 14px",
                    }}
                  >
                    👑 Passer à Pro (9,99 €)
                  </button>
                )}
              </div>
            )}

            {/* Mode */}
            <Controller
              name="mode"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="form-label">Type</label>
                  <div className="mode-toggle">
                    <button
                      type="button"
                      onClick={() => field.onChange("PERSONAL")}
                      className={`mode-toggle-btn ${field.value === "PERSONAL" ? "active" : ""}`}
                      id="event-mode-personal"
                    >
                      <User size={12} style={{ display: "inline", marginRight: "5px" }} />
                      Personnel
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange("PROFESSIONAL")}
                      className={`mode-toggle-btn ${field.value === "PROFESSIONAL" ? "active" : ""}`}
                      id="event-mode-professional"
                    >
                      <Briefcase size={12} style={{ display: "inline", marginRight: "5px" }} />
                      Professionnel
                    </button>
                  </div>
                </div>
              )}
            />

            {/* Title */}
            <div className="form-group">
              <label className="form-label">Titre *</label>
              <input
                {...register("title")}
                type="text"
                placeholder={mode === "PROFESSIONAL" ? "Ex: Chantier chez M. Dupont" : "Ex: Rendez-vous médecin"}
                className="form-input"
                id="event-title"
              />
              {errors.title && <span className="form-error">{errors.title.message}</span>}
            </div>

            {/* Date & Time row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={12} style={{ display: "inline", marginRight: "4px" }} />
                  Date et heure *
                </label>
                <input
                  {...register("startAt")}
                  type="datetime-local"
                  className="form-input"
                  id="event-start"
                  style={{ colorScheme: "dark" }}
                />
                {errors.startAt && <span className="form-error">{errors.startAt.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Clock size={12} style={{ display: "inline", marginRight: "4px" }} />
                  Heure de fin
                </label>
                <input
                  {...register("endAt")}
                  type="datetime-local"
                  className="form-input"
                  id="event-end"
                  style={{ colorScheme: "dark" }}
                />
              </div>
            </div>

            {/* Category + Priority */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Catégorie</label>
                <select {...register("category")} className="form-input" id="event-category">
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value} style={{ background: "var(--bg-elevated)" }}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Priorité</label>
                <select {...register("priority")} className="form-input" id="event-priority">
                  <option value="LOW" style={{ background: "var(--bg-elevated)" }}>Faible</option>
                  <option value="NORMAL" style={{ background: "var(--bg-elevated)" }}>Normale</option>
                  <option value="HIGH" style={{ background: "var(--bg-elevated)" }}>Haute</option>
                  <option value="URGENT" style={{ background: "var(--bg-elevated)" }}>Urgent</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label">
                <MapPin size={12} style={{ display: "inline", marginRight: "4px" }} />
                Lieu
              </label>
              <input
                {...register("location")}
                type="text"
                placeholder={mode === "PROFESSIONAL" ? "Adresse du chantier" : "Adresse, salle, en ligne..."}
                className="form-input"
                id="event-location"
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">
                <FileText size={12} style={{ display: "inline", marginRight: "4px" }} />
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder={mode === "PROFESSIONAL" ? "Détails de l'intervention..." : "Notes sur le rendez-vous..."}
                className="form-input"
                rows={3}
                id="event-description"
                style={{ resize: "vertical" }}
              />
            </div>

            {/* Reminders section */}
            <div
              style={{
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <Bell size={14} color="var(--accent-primary)" />
                <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>
                  Rappels
                </span>
              </div>

              {/* Veille reminder toggle */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)" }}>
                    Rappel la veille
                  </p>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                    J-1 à la même heure
                  </p>
                </div>
                <label className="toggle">
                  <input
                    {...register("hasVeilleReminder")}
                    type="checkbox"
                    id="event-veille-reminder"
                  />
                  <span className="toggle-slider" />
                </label>
              </div>

              {/* Custom reminder */}
              <div className="form-group">
                <label className="form-label" style={{ fontSize: "12px" }}>Rappel avant l&apos;heure</label>
                <select
                  {...register("reminderMinutesBefore", { valueAsNumber: true })}
                  className="form-input"
                  id="event-reminder-before"
                  style={{ fontSize: "13px" }}
                >
                  {REMINDER_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} style={{ background: "var(--bg-elevated)" }}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
            }}
          >
            <button type="button" onClick={onClose} className="btn btn-secondary" id="event-cancel">
              Annuler
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary" id="event-save">
              {loading && <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />}
              {loading ? "Enregistrement..." : eventToEdit ? "Enregistrer les modifications" : "Créer le rendez-vous"}
            </button>
          </div>
        </form>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

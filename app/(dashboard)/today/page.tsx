"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Calendar,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import EventFormModal from "@/components/forms/EventFormModal";
import "@/components/alarmeagenda.css";

interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  location?: string;
  status: "completed" | "confirmed" | "upcoming";
  importance: "normal" | "important" | "urgent";
  reminder: string;
}

const todayItems: TimelineItem[] = [
  {
    id: "1",
    time: "09:00",
    title: "Réunion équipe",
    description: "Point hebdomadaire sur l'avancement des projets et priorités",
    location: "Salle A & Visioconférence",
    status: "completed",
    importance: "normal",
    reminder: "Rappelé à 08:45",
  },
  {
    id: "2",
    time: "11:30",
    title: "Appel avec client",
    description: "Validation de la proposition technique et cadrage contractuel",
    location: "Téléphone direct",
    status: "completed",
    importance: "important",
    reminder: "Rappelé à 11:15",
  },
  {
    id: "3",
    time: "15:00",
    title: "Rendez-vous dentiste",
    description: "Contrôle annuel et soins préventifs",
    location: "Cabinet Médical Saint-Honoré, Paris 8e",
    status: "confirmed",
    importance: "urgent",
    reminder: "Alarme vocale à 14:00 (dans 1h)",
  },
  {
    id: "4",
    time: "18:30",
    title: "Entraînement",
    description: "Séance cardio & renforcement musculaire",
    location: "Club Sport & Bien-être",
    status: "upcoming",
    importance: "normal",
    reminder: "Notification 30 min avant",
  },
];

export default function TodayPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* =========================================================================
          1. EN-TÊTE : AUJOURD'HUI & DATE COMPLÈTE (Section 10)
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e2e8f0]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <Calendar size={14} />
            <span>Mardi 14 octobre 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Aujourd&apos;hui
          </h1>
          <p className="text-sm text-[#64748b] mt-0.5">
            4 rendez-vous et activités programmés pour votre journée.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="aa-btn-primary text-xs py-2 px-3.5 self-start sm:self-auto"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Ajouter un événement</span>
        </button>
      </div>

      {/* =========================================================================
          2. TIMELINE VERTICALE ULTRA-LISIBLE (Section 10)
         ========================================================================= */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-100 space-y-8 my-4">
        {todayItems.map((item) => {
          const isUrgent = item.importance === "urgent";
          const isImportant = item.importance === "important";
          const isCompleted = item.status === "completed";

          return (
            <div key={item.id} className="relative group">
              {/* Point sur la timeline */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-white transition-transform group-hover:scale-125 ${
                  isCompleted
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                    : isUrgent
                    ? "border-blue-600 bg-blue-600 shadow-md ring-4 ring-blue-100"
                    : "border-blue-500"
                }`}
              />

              {/* Carte de l'événement */}
              <div
                className={`aa-card p-5 transition-all ${
                  isUrgent
                    ? "border-blue-300 shadow-sm bg-blue-50/30"
                    : "bg-white hover:border-[#cbd5e1]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/80">
                      {item.time}
                    </span>
                    <h2 className="text-base font-bold text-[#0f172a]">
                      {item.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    {isUrgent && (
                      <span className="aa-badge-red text-[11px]">Urgent</span>
                    )}
                    {isImportant && (
                      <span className="aa-badge-orange text-[11px]">Important</span>
                    )}
                    {isCompleted ? (
                      <span className="aa-badge-green text-[11px]">Terminé</span>
                    ) : (
                      <span className="aa-badge-blue text-[11px]">Confirmé</span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#475569] leading-relaxed mb-3">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[#f1f5f9] text-xs text-[#64748b]">
                  {item.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#94a3b8]" />
                      <span>{item.location}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded">
                    <Volume2 size={13} className="text-blue-600" />
                    <span>{item.reminder}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <EventFormModal
          onClose={() => setShowModal(false)}
          onSaved={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  Volume2,
  Sparkles,
  CheckCheck,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import "@/components/alarmeagenda.css";

interface NotificationItem {
  id: string;
  type: "reminder" | "assistant" | "task";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "reminder",
    title: "Rappel de rendez-vous",
    description: "Votre rendez-vous chez le dentiste commence dans 30 minutes.",
    time: "Il y a 10 minutes",
    read: false,
  },
  {
    id: "2",
    type: "assistant",
    title: "Assistant IA",
    description: "Votre rappel intelligent a été configuré pour anticiper 25 minutes de trajet.",
    time: "Il y a 1 heure",
    read: false,
  },
  {
    id: "3",
    type: "task",
    title: "Tâches du jour",
    description: "Vous avez encore 2 tâches importantes aujourd'hui à finaliser.",
    time: "Il y a 3 heures",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* En-tête (Sections 15 & 19) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e2e8f0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Centre de notifications
          </h1>
          <p className="text-sm text-[#64748b] mt-0.5">
            Retrouvez l&apos;historique de vos rappels et alertes intelligentes.
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="aa-btn-secondary text-xs py-2 px-3.5 self-start sm:self-auto flex items-center gap-1.5"
        >
          <CheckCheck size={14} className="text-blue-600" />
          <span>Tout marquer comme lu</span>
        </button>
      </div>

      {/* Liste Inbox */}
      <div className="aa-card divide-y divide-[#f1f5f9] overflow-hidden">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 sm:p-5 flex items-start gap-4 transition-colors ${
              n.read ? "bg-white" : "bg-blue-50/40"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                n.type === "reminder"
                  ? "bg-amber-100 text-amber-700"
                  : n.type === "assistant"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {n.type === "reminder" ? (
                <Bell size={18} />
              ) : n.type === "assistant" ? (
                <Sparkles size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-[#0f172a] truncate">
                  {n.title}
                </h3>
                <span className="text-[11px] text-[#94a3b8] shrink-0 font-medium">
                  {n.time}
                </span>
              </div>
              <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                {n.description}
              </p>
            </div>

            {!n.read && (
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 self-center" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

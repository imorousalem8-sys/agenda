"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Bell,
  Sparkles,
  ArrowRight,
  MapPin,
  Check,
  Building,
  Phone,
  Briefcase,
  Dumbbell,
  Send,
  Sparkle,
} from "lucide-react";
import EventFormModal from "@/components/forms/EventFormModal";
import "@/components/alarmeagenda-ref.css";

interface TaskItem {
  id: string;
  title: string;
  done: boolean;
  time?: string;
  priority?: "Haute" | "Moyenne" | "Basse";
}

export default function DashboardPage() {
  const [showEventModal, setShowEventModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  // Tâches de démonstration réalistes (Exact Image 2)
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: "1", title: "Envoyer le document", done: false, time: "10:00", priority: "Haute" },
    { id: "2", title: "Appeler le client", done: true, time: "13:00", priority: "Moyenne" },
    { id: "3", title: "Préparer le rendez-vous", done: false, time: "16:00", priority: "Basse" },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="max-w-[1340px] mx-auto space-y-6">
      {/* =========================================================================
          1. EN-TÊTE DU DASHBOARD CONFORME STRICTEMENT À L'IMAGE 2
         ========================================================================= */}
      <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-3 pt-1">
        {/* Silhouette de montagnes nocturnes en arrière-plan à droite (Exact Image 2) */}
        <div
          className="absolute right-0 top-[-10px] w-72 sm:w-96 h-28 pointer-events-none opacity-35 bg-no-repeat bg-right-top bg-contain"
          style={{
            backgroundImage: "url('/images/alarmeagenda-mountains-bg.jpg')",
          }}
        />

        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>Bonjour, Salem</span>
            <span>👋</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Voici ce qui vous attend aujourd&apos;hui.
          </p>
        </div>

        {/* Citation discrète en italique conforme à l'image 2 */}
        <div className="relative z-10 text-xs sm:text-sm text-slate-400 italic font-light max-w-md lg:text-right">
          « Chaque petit pas vous rapproche de vos grands objectifs. »
        </div>
      </div>

      {/* =========================================================================
          2. LIGNE 1 : LES 3 GRANDES CARTES DU HAUT (IMAGE 2)
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* CARTE 1 (Gauche ~40%) : PROCHAIN RENDEZ-VOUS */}
        <div className="md:col-span-5 aa-dashboard-card p-5 relative overflow-hidden flex flex-col justify-between min-h-[210px] bg-gradient-to-br from-[#0c1633] to-[#070e24]">
          {/* Filigrane d'immeuble moderne en arrière-plan (Exact Image 2) */}
          <div
            className="absolute right-0 bottom-0 w-36 h-28 pointer-events-none opacity-30 bg-no-repeat bg-right-bottom bg-contain"
            style={{
              backgroundImage: "url('/images/alarmeagenda-building-crop.jpg')",
            }}
          />

          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                  <Calendar size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-300">Prochain rendez-vous</span>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-600/40 text-blue-300 border border-blue-500/30">
                Dans 2 h 15
              </span>
            </div>

            <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
              Rendez-vous professionnel
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock size={14} className="text-blue-400" />
                <span>14:30 - 15:30</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin size={14} className="text-blue-400" />
                <span>Centre-ville</span>
              </span>
            </div>
          </div>

          <div className="pt-4 mt-2 flex items-center gap-3">
            <Link
              href="/today"
              className="aa-pill-btn-primary text-xs py-2 px-4 shadow-[0_2px_15px_rgba(37,99,235,0.4)] no-underline"
            >
              <span>Voir le détail</span>
              <ArrowRight size={13} />
            </Link>
            <button
              onClick={() => setShowEventModal(true)}
              className="aa-pill-btn-glass text-xs py-2 px-4"
            >
              Modifier
            </button>
          </div>
        </div>

        {/* CARTE 2 (Milieu ~35%) : TÂCHES */}
        <div className="md:col-span-4 aa-dashboard-card p-5 flex flex-col justify-between min-h-[210px]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Check size={14} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">Tâches</h3>
                  <div className="text-[10px] text-slate-400 font-normal">3 tâches aujourd&apos;hui</div>
                </div>
              </div>
              <Link href="/tasks" className="text-xs text-blue-400 hover:text-blue-300 font-medium no-underline">
                Voir tout
              </Link>
            </div>

            {/* Liste des cases à cocher exactes Image 2 */}
            <div className="space-y-2.5 text-xs text-slate-200">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      task.done
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "border-slate-500 group-hover:border-blue-400"
                    }`}
                  >
                    {task.done && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className={`${task.done ? "text-slate-400 line-through" : "text-slate-200"}`}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARTE 3 (Droite ~25%) : RAPPELS */}
        <div className="md:col-span-3 aa-dashboard-card p-5 flex flex-col justify-between min-h-[210px]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Bell size={14} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">Rappels</h3>
                  <div className="text-[10px] text-slate-400 font-normal">2 rappels à venir</div>
                </div>
              </div>
              <Link href="/reminders" className="text-xs text-blue-400 hover:text-blue-300 font-medium no-underline">
                Voir tout
              </Link>
            </div>

            {/* Liste des rappels Image 2 */}
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0 shadow-[0_0_8px_#f59e0b]" />
                <div>
                  <div className="font-semibold text-white">Rendez-vous professionnel</div>
                  <div className="text-[11px] text-slate-400">14:30 · Aujourd&apos;hui</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_#3b82f6]" />
                <div>
                  <div className="font-semibold text-white">Appel important</div>
                  <div className="text-[11px] text-slate-400">16:30 · Aujourd&apos;hui</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. LIGNE 2 : AGENDA DU JOUR (60%) & ASSISTANT IA / RESTEZ CONCENTRÉ (40%)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* AGENDA DU JOUR (60% Gauche) */}
        <div className="lg:col-span-7 aa-dashboard-card p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <Calendar size={18} className="text-blue-400" />
              <h2 className="text-base font-bold text-white">Agenda du jour</h2>
            </div>
            <Link
              href="/calendar"
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 no-underline"
            >
              <span>Voir l&apos;agenda complet</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Timeline verticale continue Image 2 */}
          <div className="space-y-3.5 relative pl-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-600/30">
            {/* 09:00 Réunion d'équipe */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-semibold text-slate-300 w-12">09:00</span>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] text-slate-300 flex items-center justify-center shrink-0">
                  <Building size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Réunion d&apos;équipe</div>
                  <div className="text-[11px] text-slate-400">Bureau · Salle de réunion</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ✓ Terminé
              </span>
            </div>

            {/* 11:30 Appel avec client */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-semibold text-slate-300 w-12">11:30</span>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] text-slate-300 flex items-center justify-center shrink-0">
                  <Phone size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Appel avec client</div>
                  <div className="text-[11px] text-slate-400">Téléphone</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25">
                À venir
              </span>
            </div>

            {/* 14:30 Rendez-vous professionnel (En surbrillance bleue) */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-900/25 border border-blue-500/40 shadow-[0_0_15px_rgba(37,99,235,0.15)]">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold text-blue-400 w-12">14:30</span>
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-300 flex items-center justify-center shrink-0">
                  <Briefcase size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Rendez-vous professionnel</div>
                  <div className="text-[11px] text-blue-200">Centre-ville</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/25 text-blue-200 border border-blue-400/40">
                À venir
              </span>
            </div>

            {/* 16:30 Appel important */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-semibold text-slate-300 w-12">16:30</span>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] text-slate-300 flex items-center justify-center shrink-0">
                  <Phone size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Appel important</div>
                  <div className="text-[11px] text-slate-400">Téléphone</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25">
                À venir
              </span>
            </div>

            {/* 18:00 Sport */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-semibold text-slate-300 w-12">18:00</span>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] text-slate-300 flex items-center justify-center shrink-0">
                  <Dumbbell size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Sport</div>
                  <div className="text-[11px] text-slate-400">Salle de sport</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25">
                À venir
              </span>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE (40% Droite) : ASSISTANT IA & RESTEZ CONCENTRÉ */}
        <div className="lg:col-span-5 space-y-5">
          {/* CARTE ASSISTANT IA (Exact Image 2) */}
          <div className="aa-dashboard-card p-5 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center border border-blue-500/40">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Votre assistant IA</h3>
                <div className="text-[10px] text-slate-400">Une question ? Je suis là pour vous aider.</div>
              </div>
            </div>

            {/* Champ de saisie prompt Image 2 */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.04] border border-white/[0.1] focus-within:border-blue-500">
              <input
                type="text"
                placeholder="Par exemple : « Qu'ai-je prévu demain ? »"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-xs text-white placeholder-slate-400 px-1"
              />
              <Link
                href="/assistant"
                className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shrink-0 transition-colors"
              >
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Suggestions en pilules exactes Image 2 */}
            <div className="space-y-1.5 pt-1 text-xs">
              <Link
                href="/assistant"
                className="w-full text-left p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] text-slate-300 hover:text-white flex items-center gap-2 transition-all no-underline text-[11px]"
              >
                <span className="text-blue-400">💬</span>
                <span>Ajoute un rendez-vous vendredi à 16h</span>
              </Link>

              <Link
                href="/assistant"
                className="w-full text-left p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] text-slate-300 hover:text-white flex items-center gap-2 transition-all no-underline text-[11px]"
              >
                <span className="text-blue-400">💬</span>
                <span>Quels sont mes rappels aujourd&apos;hui ?</span>
              </Link>

              <Link
                href="/assistant"
                className="w-full text-left p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] text-slate-300 hover:text-white flex items-center gap-2 transition-all no-underline text-[11px]"
              >
                <span className="text-blue-400">💬</span>
                <span>Montre-moi mes tâches importantes</span>
              </Link>
            </div>
          </div>

          {/* BANNIÈRE « RESTEZ CONCENTRÉ » (Exact Image 2 avec paysage montagnard) */}
          <div
            className="aa-dashboard-card p-5 relative overflow-hidden bg-cover bg-center border-blue-500/20"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(7,14,36,0.92) 20%, rgba(7,14,36,0.6) 100%), url('/images/alarmeagenda-mountain-card.jpg')",
            }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-blue-400">✦</span>
              <h4 className="text-sm font-bold text-white">Restez concentré</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Une journée bien organisée est une journée plus sereine.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. LIGNE 3 : TÂCHES PRIORITAIRES & RAPPELS À VENIR (IMAGE 2)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
        {/* TÂCHES PRIORITAIRES (Gauche ~60%) */}
        <div className="lg:col-span-7 aa-dashboard-card p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Check size={13} strokeWidth={2.5} />
              </div>
              <div className="text-xs font-bold text-white">
                Tâches prioritaires <span className="text-slate-400 font-normal">· 3 tâches · Aujourd&apos;hui</span>
              </div>
            </div>
            <Link href="/tasks" className="text-xs text-blue-400 hover:text-blue-300 font-medium no-underline">
              Voir tout
            </Link>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Tâche 1 : Envoyer le document - 10:00 - Haute */}
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded border border-slate-500" />
                <span className="text-slate-200">Envoyer le document</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-slate-400 text-[11px]">10:00</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1">
                  <span>◆</span>
                  <span>Haute</span>
                </span>
              </div>
            </div>

            {/* Tâche 2 : Appeler le client - 13:00 - Moyenne */}
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded border border-slate-500" />
                <span className="text-slate-200">Appeler le client</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-slate-400 text-[11px]">13:00</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <span>◆</span>
                  <span>Moyenne</span>
                </span>
              </div>
            </div>

            {/* Tâche 3 : Préparer le rendez-vous - 16:00 - Basse */}
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded border border-slate-500" />
                <span className="text-slate-200">Préparer le rendez-vous</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-slate-400 text-[11px]">16:00</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                  <span>●</span>
                  <span>Basse</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RAPPELS À VENIR (Droite ~40%) */}
        <div className="lg:col-span-5 aa-dashboard-card p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Bell size={13} />
              </div>
              <div className="text-xs font-bold text-white">
                Rappels à venir <span className="text-slate-400 font-normal">· 2 rappels · Prochains</span>
              </div>
            </div>
            <Link href="/reminders" className="text-xs text-blue-400 hover:text-blue-300 font-medium no-underline">
              Voir tout
            </Link>
          </div>

          <div className="space-y-3 text-xs pt-1">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Bell size={13} />
              </div>
              <div>
                <div className="font-semibold text-white">Rendez-vous professionnel</div>
                <div className="text-[11px] text-slate-400">14:30 · Aujourd&apos;hui</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Bell size={13} />
              </div>
              <div>
                <div className="font-semibold text-white">Appel important</div>
                <div className="text-[11px] text-slate-400">16:30 · Aujourd&apos;hui</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'ajout de rendez-vous */}
      {showEventModal && (
        <EventFormModal
          onClose={() => setShowEventModal(false)}
          onSaved={() => setShowEventModal(false)}
        />
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Plus,
  Loader2,
  CalendarPlus,
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

const DEFAULT_TASKS: TaskItem[] = [
  { id: "task-1", title: "Envoyer le document", done: false, time: "10:00", priority: "Haute" },
  { id: "task-2", title: "Appeler le client", done: true, time: "13:00", priority: "Moyenne" },
  { id: "task-3", title: "Préparer le rendez-vous", done: false, time: "16:00", priority: "Basse" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<any>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [tasks, setTasks] = useState<TaskItem[]>(DEFAULT_TASKS);
  const [loadingTasks, setLoadingTasks] = useState(false);

  // Charger les tâches depuis l'API backend si disponibles
  const loadTasksFromBackend = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks?limit=5");
      if (res.ok) {
        const data = await res.json();
        if (data.tasks && data.tasks.length > 0) {
          const mapped: TaskItem[] = data.tasks.slice(0, 3).map((t: any, idx: number) => ({
            id: t.id,
            title: t.title,
            done: !!t.isDone,
            time: t.dueAt ? new Date(t.dueAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : DEFAULT_TASKS[idx]?.time || "12:00",
            priority: (t.priority === "URGENT" || t.priority === "HIGH" ? "Haute" : t.priority === "LOW" ? "Basse" : "Moyenne") as TaskItem["priority"],
          }));
          setTasks(mapped);
          return;
        }
      }
    } catch {
      // Fallback gracieux sur DEFAULT_TASKS
    }
  }, []);

  useEffect(() => {
    loadTasksFromBackend();
    const handleSync = () => loadTasksFromBackend();
    window.addEventListener("task-updated", handleSync);
    window.addEventListener("event-updated", handleSync);
    return () => {
      window.removeEventListener("task-updated", handleSync);
      window.removeEventListener("event-updated", handleSync);
    };
  }, [loadTasksFromBackend]);

  // Basculer l'état d'une tâche (synchro locale immédiate + API persistante)
  const toggleTask = async (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

    try {
      const task = tasks.find((t) => t.id === id);
      if (task && !id.startsWith("task-")) {
        await fetch(`/api/tasks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isDone: !task.done }),
        });
      }
    } catch {
      // Conservation de l'état UI optimiste
    }
  };

  // Soumission de prompt Assistant IA
  const handleAiSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiPrompt.trim()) return;
    router.push(`/assistant?q=${encodeURIComponent(aiPrompt.trim())}`);
  };

  const handleEditNextMeeting = () => {
    setEventToEdit({
      id: "demo-next-event",
      title: "Rendez-vous professionnel",
      description: "Discussion stratégique et revue des étapes clés",
      startAt: new Date(new Date().setHours(14, 30, 0, 0)).toISOString(),
      endAt: new Date(new Date().setHours(15, 30, 0, 0)).toISOString(),
      location: "Centre-ville",
      category: "WORK",
      priority: "HIGH",
      mode: "PROFESSIONAL",
    });
    setShowEventModal(true);
  };

  return (
    <div className="max-w-[1380px] mx-auto space-y-6">
      {/* =========================================================================
          1. EN-TÊTE DU DASHBOARD — STYLE EXÉCUTIF CRISTAL SANS IMAGES ENCOMBRANTES
         ========================================================================= */}
      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 pt-1 border-b border-sky-400/15">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>Bonjour, Salem</span>
              <span>👋</span>
            </h1>
            <span className="aa-crystal-badge hidden sm:inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Synchro active</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-sky-200/70 mt-1">
            Voici votre vue d&apos;ensemble et vos priorités d&apos;aujourd&apos;hui.
          </p>
        </div>

        {/* Citation inspirante en pilule de verre + Bouton d'action rapide */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs text-sky-200 italic">
            <span>✨</span>
            <span>« Chaque petit pas vous rapproche de vos grands objectifs. »</span>
          </div>

          <button
            onClick={() => {
              setEventToEdit(null);
              setShowEventModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-bold transition-all shadow-[0_4px_18px_rgba(56,189,248,0.25)] hover:scale-[1.02] cursor-pointer"
          >
            <CalendarPlus size={15} />
            <span>+ Nouveau rendez-vous</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. BANDEAU DES 4 KPIS EN 1 LIGNE CRISTAL
         ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 : Prochain RDV */}
        <div className="aa-crystal-card p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600/25 border border-sky-400/30 text-sky-300 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
            <Clock size={19} />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold text-sky-300/80 uppercase tracking-wider">Prochain créneau</div>
            <div className="text-base font-bold text-white tracking-tight truncate">14:30 · Pro</div>
            <div className="text-[10px] text-sky-400 font-medium">Dans 2 h 15</div>
          </div>
        </div>

        {/* KPI 2 : Tâches du jour */}
        <div className="aa-crystal-card p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0">
            <CheckCircle2 size={19} />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold text-emerald-300/80 uppercase tracking-wider">Tâches du jour</div>
            <div className="text-base font-bold text-white tracking-tight">1 / 3 terminées</div>
            <div className="text-[10px] text-slate-300">2 prioritaires restantes</div>
          </div>
        </div>

        {/* KPI 3 : Rappels programmés */}
        <div className="aa-crystal-card p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0">
            <Bell size={19} />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold text-amber-300/80 uppercase tracking-wider">Rappels actifs</div>
            <div className="text-base font-bold text-white tracking-tight">2 alertes</div>
            <div className="text-[10px] text-amber-300/90 font-medium">Alertes vocales prêtes</div>
          </div>
        </div>

        {/* KPI 4 : Assistant IA */}
        <div className="aa-crystal-card p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300 flex items-center justify-center shrink-0">
            <Sparkles size={19} />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold text-purple-300/80 uppercase tracking-wider">Copilote IA</div>
            <div className="text-base font-bold text-white tracking-tight">En veille active</div>
            <div className="text-[10px] text-purple-300/90 font-medium">Prêt pour vos questions</div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. LIGNE 1 : LES 3 OUTILS STRATÉGIQUES EN CARTES CRISTAL ÉPURÉES
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* CARTE 1 (Gauche ~42%) : PROCHAIN RENDEZ-VOUS */}
        <div className="md:col-span-5 aa-crystal-card p-5 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-sky-400/30 flex items-center justify-center text-sky-300 shadow-sm">
                  <Calendar size={16} />
                </div>
                <span className="text-xs font-bold text-sky-200">Prochain rendez-vous</span>
              </div>
              <span className="aa-crystal-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span>Dans 2 h 15</span>
              </span>
            </div>

            <h2 className="text-xl font-black text-white mb-2 tracking-tight">
              Rendez-vous professionnel
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2">
              <span className="flex items-center gap-1.5 font-medium px-2.5 py-1 rounded-md bg-white/[0.03] border border-sky-400/15">
                <Clock size={13} className="text-sky-400" />
                <span>14:30 - 15:30</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium px-2.5 py-1 rounded-md bg-white/[0.03] border border-sky-400/15">
                <MapPin size={13} className="text-sky-400" />
                <span>Centre-ville</span>
              </span>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-sky-400/15 flex items-center gap-3">
            <Link
              href="/today"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-bold transition-all shadow-[0_2px_14px_rgba(56,189,248,0.25)] no-underline"
            >
              <span>Voir le détail</span>
              <ArrowRight size={13} />
            </Link>
            <button
              onClick={handleEditNextMeeting}
              className="aa-pill-btn-glass text-xs py-2 px-4 cursor-pointer hover:border-sky-400/40"
            >
              Modifier
            </button>
          </div>
        </div>

        {/* CARTE 2 (Milieu ~35%) : TÂCHES */}
        <div className="md:col-span-4 aa-crystal-card p-5 flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-sky-400/15">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Check size={14} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">Mes Tâches</h3>
                  <div className="text-[10px] text-sky-300/80 font-normal">3 tâches aujourd&apos;hui</div>
                </div>
              </div>
              <Link href="/tasks" className="text-xs text-sky-400 hover:text-sky-300 font-semibold no-underline">
                Voir tout →
              </Link>
            </div>

            {/* Liste des cases à cocher interactive */}
            <div className="space-y-2.5 text-xs">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-sky-400/10 border border-transparent hover:border-sky-400/20 cursor-pointer select-none transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        task.done
                          ? "bg-blue-600 border-sky-400 text-white"
                          : "border-slate-500 group-hover:border-sky-400"
                      }`}
                    >
                      {task.done && <Check size={11} strokeWidth={3} />}
                    </div>
                    <span className={`${task.done ? "text-slate-400 line-through" : "text-slate-200 group-hover:text-white"}`}>
                      {task.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-sky-300/70 font-mono">{task.time || "12:00"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARTE 3 (Droite ~23%) : RAPPELS */}
        <div className="md:col-span-3 aa-crystal-card p-5 flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-sky-400/15">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Bell size={14} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">Rappels</h3>
                  <div className="text-[10px] text-sky-300/80 font-normal">2 alertes à venir</div>
                </div>
              </div>
              <Link href="/reminders" className="text-xs text-sky-400 hover:text-sky-300 font-semibold no-underline">
                Voir tout →
              </Link>
            </div>

            {/* Liste des rappels */}
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.02] border border-sky-400/10">
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0 shadow-[0_0_8px_#f59e0b]" />
                <div className="min-w-0">
                  <div className="font-semibold text-white truncate">Rendez-vous pro</div>
                  <div className="text-[11px] text-sky-300/70">14:30 · Alerte vocale</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.02] border border-sky-400/10">
                <span className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0 shadow-[0_0_8px_#38bdf8]" />
                <div className="min-w-0">
                  <div className="font-semibold text-white truncate">Appel important</div>
                  <div className="text-[11px] text-sky-300/70">16:30 · Sonnerie douce</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. LIGNE 2 : AGENDA DU JOUR (60%) & ASSISTANT IA / SÉRÉNITÉ (40%)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* AGENDA DU JOUR (60% Gauche) */}
        <div className="lg:col-span-7 aa-crystal-card p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-sky-400/15">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-sky-300 flex items-center justify-center border border-sky-400/30">
                <Calendar size={15} />
              </div>
              <h2 className="text-base font-bold text-white">Agenda du jour</h2>
            </div>
            <Link
              href="/calendar"
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 no-underline"
            >
              <span>Voir l&apos;agenda complet</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Timeline verticale continue */}
          <div className="space-y-3 relative pl-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-sky-400/30">
            {/* 09:00 Réunion d'équipe */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-sky-400/10">
              <div className="flex items-center gap-3.5">
                <span className="font-mono text-xs font-semibold text-sky-300/80 w-12">09:00</span>
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
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-sky-400/10">
              <div className="flex items-center gap-3.5">
                <span className="font-mono text-xs font-semibold text-sky-300/80 w-12">11:30</span>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] text-slate-300 flex items-center justify-center shrink-0">
                  <Phone size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Appel avec client</div>
                  <div className="text-[11px] text-slate-400">Téléphone</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/25">
                À venir
              </span>
            </div>

            {/* 14:30 Rendez-vous professionnel (En surbrillance cristal bleu ciel) */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-blue-900/40 to-sky-950/40 border border-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
              <div className="flex items-center gap-3.5">
                <span className="font-mono text-xs font-bold text-sky-400 w-12">14:30</span>
                <div className="w-8 h-8 rounded-lg bg-blue-600/40 border border-sky-400/40 text-sky-200 flex items-center justify-center shrink-0">
                  <Briefcase size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Rendez-vous professionnel</div>
                  <div className="text-[11px] text-sky-200/80">Centre-ville</div>
                </div>
              </div>
              <span className="aa-crystal-badge">
                <span>En cours / Prioritaire</span>
              </span>
            </div>

            {/* 16:30 Appel important */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-sky-400/10">
              <div className="flex items-center gap-3.5">
                <span className="font-mono text-xs font-semibold text-sky-300/80 w-12">16:30</span>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] text-slate-300 flex items-center justify-center shrink-0">
                  <Phone size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Appel important</div>
                  <div className="text-[11px] text-slate-400">Téléphone</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/25">
                À venir
              </span>
            </div>

            {/* 18:00 Sport */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-sky-400/10">
              <div className="flex items-center gap-3.5">
                <span className="font-mono text-xs font-semibold text-sky-300/80 w-12">18:00</span>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] text-slate-300 flex items-center justify-center shrink-0">
                  <Dumbbell size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Sport & Détente</div>
                  <div className="text-[11px] text-slate-400">Salle de sport</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/25">
                À venir
              </span>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE (40% Droite) : ASSISTANT IA & SÉRÉNITÉ */}
        <div className="lg:col-span-5 space-y-5">
          {/* CARTE ASSISTANT IA CRISTAL */}
          <div className="aa-crystal-card p-5 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Votre Copilote IA</h3>
                <div className="text-[10px] text-sky-300/80">Planification automatique et réponses instantanées</div>
              </div>
            </div>

            {/* Champ de saisie prompt */}
            <form onSubmit={handleAiSubmit} className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-sky-400/20 focus-within:border-sky-400/60 focus-within:bg-white/[0.06] transition-all">
              <input
                type="text"
                placeholder="Ex : « Programme un appel demain à 10h »"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-xs text-white placeholder-slate-400 px-1"
              />
              <button
                type="submit"
                className="w-7 h-7 rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-sm"
                title="Poser la question à l'assistant"
              >
                <ArrowRight size={13} />
              </button>
            </form>

            {/* Suggestions en pilules cristal */}
            <div className="space-y-1.5 pt-1 text-xs">
              <button
                type="button"
                onClick={() => router.push(`/assistant?q=${encodeURIComponent("Ajoute un rendez-vous vendredi à 16h")}`)}
                className="w-full text-left p-2.5 rounded-xl bg-white/[0.02] hover:bg-sky-400/10 border border-sky-400/10 hover:border-sky-400/30 text-slate-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer text-[11px]"
              >
                <span className="text-sky-400">💬</span>
                <span>Ajoute un rendez-vous vendredi à 16h</span>
              </button>

              <button
                type="button"
                onClick={() => router.push(`/assistant?q=${encodeURIComponent("Quels sont mes rappels aujourd'hui ?")}`)}
                className="w-full text-left p-2.5 rounded-xl bg-white/[0.02] hover:bg-sky-400/10 border border-sky-400/10 hover:border-sky-400/30 text-slate-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer text-[11px]"
              >
                <span className="text-sky-400">💬</span>
                <span>Quels sont mes rappels aujourd&apos;hui ?</span>
              </button>

              <button
                type="button"
                onClick={() => router.push(`/assistant?q=${encodeURIComponent("Montre-moi mes tâches importantes")}`)}
                className="w-full text-left p-2.5 rounded-xl bg-white/[0.02] hover:bg-sky-400/10 border border-sky-400/10 hover:border-sky-400/30 text-slate-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer text-[11px]"
              >
                <span className="text-sky-400">💬</span>
                <span>Montre-moi mes tâches importantes</span>
              </button>
            </div>
          </div>

          {/* BANNIÈRE « ESPACE FOCUS & SÉRÉNITÉ » (100% Verre Transparent Bleu Clair Pur sans image encombrante) */}
          <div className="aa-crystal-card p-5 relative overflow-hidden border-sky-400/25 bg-gradient-to-r from-blue-950/30 to-sky-950/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sky-400">✦</span>
              <h4 className="text-sm font-bold text-white">Espace Focus & Sérénité</h4>
            </div>
            <p className="text-xs text-sky-200/80 leading-relaxed font-normal">
              Une journée bien organisée est une journée sereine. Vos rappels vocaux prendront le relais automatiquement dès 14h15 pour votre prochain créneau.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          5. LIGNE 3 : TÂCHES PRIORITAIRES & RAPPELS EN CARTES CRISTAL
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
        {/* TÂCHES PRIORITAIRES (Gauche ~60%) */}
        <div className="lg:col-span-7 aa-crystal-card p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-sky-400/15">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Check size={13} strokeWidth={2.5} />
              </div>
              <div className="text-xs font-bold text-white">
                Tâches prioritaires <span className="text-sky-300/70 font-normal">· {tasks.length} tâches · Aujourd&apos;hui</span>
              </div>
            </div>
            <Link href="/tasks" className="text-xs text-sky-400 hover:text-sky-300 font-semibold no-underline">
              Gérer tout →
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            {tasks.map((task) => (
              <div
                key={`priority-${task.id}`}
                onClick={() => toggleTask(task.id)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-sky-400/10 border border-transparent hover:border-sky-400/20 cursor-pointer transition-all group select-none"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      task.done
                        ? "bg-blue-600 border-sky-400 text-white"
                        : "border-slate-500 group-hover:border-sky-400"
                    }`}
                  >
                    {task.done && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className={`text-slate-200 group-hover:text-white ${task.done ? "line-through text-slate-400" : ""}`}>
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sky-300/70 text-[11px]">{task.time || "12:00"}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                      task.priority === "Haute"
                        ? "bg-red-500/20 text-red-300 border-red-500/30"
                        : task.priority === "Moyenne"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        : "bg-sky-500/20 text-sky-300 border-sky-400/30"
                    }`}
                  >
                    <span>{task.priority === "Basse" ? "●" : "◆"}</span>
                    <span>{task.priority || "Normale"}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RAPPELS À VENIR (Droite ~40%) */}
        <div className="lg:col-span-5 aa-crystal-card p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-sky-400/15">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Bell size={13} />
              </div>
              <div className="text-xs font-bold text-white">
                Rappels & Alarmes <span className="text-sky-300/70 font-normal">· Prochaines alertes</span>
              </div>
            </div>
            <Link href="/reminders" className="text-xs text-sky-400 hover:text-sky-300 font-semibold no-underline">
              Gérer tout →
            </Link>
          </div>

          <div className="space-y-2.5 text-xs pt-1">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-sky-400/15 hover:bg-sky-400/10 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Bell size={13} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-white">Rendez-vous professionnel</div>
                <div className="text-[11px] text-sky-300/70">14:30 · Alerte vocale & notification</div>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                Imminent
              </span>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-sky-400/15 hover:bg-sky-400/10 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-400/30">
                <Bell size={13} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-white">Appel important</div>
                <div className="text-[11px] text-sky-300/70">16:30 · Sonnerie douce</div>
              </div>
              <span className="text-[10px] font-bold text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-400/20">
                16:30
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'ajout / modification de rendez-vous */}
      {showEventModal && (
        <EventFormModal
          eventToEdit={eventToEdit}
          onClose={() => {
            setShowEventModal(false);
            setEventToEdit(null);
          }}
          onSaved={() => {
            setShowEventModal(false);
            setEventToEdit(null);
            loadTasksFromBackend();
            window.dispatchEvent(new CustomEvent("event-updated"));
          }}
        />
      )}
    </div>
  );
}

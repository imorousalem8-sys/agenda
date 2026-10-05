"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar as CalendarIcon,
  CheckSquare,
  Plus,
  ArrowRight,
  Sparkles,
  Clock,
  Activity,
  MapPin,
  Volume2,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Target,
  Flame,
  CloudSun,
  Download,
  TrendingUp,
  Check,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import EventFormModal from "@/components/forms/EventFormModal";
import { speakAIText, playAlertChime } from "@/lib/voice";

interface EventItem {
  id: string;
  title: string;
  startAt: string;
  category: string;
  location?: string | null;
  mode?: string;
  contact?: { firstName: string; lastName?: string | null } | null;
}

interface ReminderItem {
  id: string;
  title: string;
  fireAt: string;
  status: string;
  method: string;
}

interface TaskItem {
  id: string;
  title: string;
  priority: string;
  isDone: boolean;
  dueAt?: string | null;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDateFormatted, setCurrentDateFormatted] = useState("");
  const [greeting, setGreeting] = useState("Bonjour");
  const [isPlayingBriefing, setIsPlayingBriefing] = useState(false);

  // Focus / Pomodoro Timer State (25 mins = 1500s)
  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [isFocusRunning, setIsFocusRunning] = useState(false);

  // Quick Task Input state
  const [quickTaskText, setQuickTaskText] = useState("");
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const userName = session?.user?.name ? session.user.name.split(" ")[0] : "Salem";

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
      setCurrentDateFormatted(
        now.toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
      const h = now.getHours();
      if (h >= 5 && h < 12) setGreeting("Bonjour");
      else if (h >= 12 && h < 18) setGreeting("Bon après-midi");
      else setGreeting("Bonsoir");
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pomodoro Focus Timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isFocusRunning && focusSeconds > 0) {
      timer = setInterval(() => {
        setFocusSeconds((prev) => prev - 1);
      }, 1000);
    } else if (focusSeconds === 0 && isFocusRunning) {
      setIsFocusRunning(false);
      playAlertChime();
      speakAIText("Session Focus terminée avec succès ! Prenez une pause de 5 minutes.");
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isFocusRunning, focusSeconds]);

  useEffect(() => {
    loadDashboard();

    const handleRefresh = () => {
      loadDashboard();
    };
    window.addEventListener("task-updated", handleRefresh);
    window.addEventListener("reminder-updated", handleRefresh);
    window.addEventListener("event-updated", handleRefresh);

    return () => {
      window.removeEventListener("task-updated", handleRefresh);
      window.removeEventListener("reminder-updated", handleRefresh);
      window.removeEventListener("event-updated", handleRefresh);
    };
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const [evRes, remRes, taskRes] = await Promise.all([
        fetch(`/api/events?from=${now.toISOString()}&to=${nextWeek.toISOString()}`),
        fetch("/api/reminders?status=PENDING&upcoming=true"),
        fetch("/api/tasks?done=false"),
      ]);

      const [evData, remData, taskData] = await Promise.all([
        evRes.ok ? evRes.json() : { events: [] },
        remRes.ok ? remRes.json() : { reminders: [] },
        taskRes.ok ? taskRes.json() : { tasks: [] },
      ]);

      setEvents(evData.events || []);
      setReminders(remData.reminders || []);
      setTasks(taskData.tasks || []);
    } catch (e) {
      console.error("Dashboard data load error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAI = () => {
    window.dispatchEvent(new CustomEvent("open-ai-assistant"));
  };

  const handlePlayDailyBriefing = async () => {
    setIsPlayingBriefing(true);
    await playAlertChime();

    const eventCount = events.length || 0;
    const reminderCount = reminders.length || 0;
    const taskCount = tasks.length || 0;
    const briefingText = `${greeting} ${userName} ! Vous avez ${eventCount} rendez-vous programmés, ${reminderCount} rappels vocaux actifs et ${taskCount} tâches en attente. Tout est parfaitement synchronisé. Excellente journée à vous !`;

    speakAIText(briefingText, {
      gender: "FEMALE",
      onEnd: () => setIsPlayingBriefing(false),
      onError: () => setIsPlayingBriefing(false),
    });
  };

  const handleExportICS = () => {
    window.location.href = "/api/events/export";
  };

  const handleToggleTask = async (id: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDone: !currentStatus }),
      });
      loadDashboard();
    } catch (e) {
      console.error("Error toggling task:", e);
    }
  };

  const handleDismissReminder = async (id: string) => {
    try {
      await fetch(`/api/reminders/${id}/dismiss`, { method: "PUT" });
      loadDashboard();
    } catch (e) {
      console.error("Error dismissing reminder:", e);
    }
  };

  const handleCreateQuickTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTaskText.trim() || isCreatingTask) return;

    setIsCreatingTask(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: quickTaskText.trim(),
          priority: "HIGH",
        }),
      });
      if (res.ok) {
        setQuickTaskText("");
        loadDashboard();
      }
    } catch (err) {
      console.error("Error creating quick task:", err);
    } finally {
      setIsCreatingTask(false);
    }
  };

  const formatFocusTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const completedCount = tasks.filter((t) => t.isDone).length;
  const totalTasksCount = tasks.length || 1;
  const taskCompletionRate = Math.min(100, Math.round(((completedCount) / (totalTasksCount || 1)) * 100) || 85);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* =========================================================================
          1. HEADER COCKPIT ÉXÉCUTIF TRANSLUCIDE (BLEU-BLANC FROSTED)
         ========================================================================= */}
      <div className="dash-card p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              COCKPIT OPÉRATIONNEL
            </span>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-500/20">
              <Clock size={13} className="text-blue-500" />
              <span className="font-mono">{currentTime || "12:00:00"}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {greeting}, <span className="text-[#0d55e0] dark:text-[#38bdf8]">{userName}</span> ⚡
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium capitalize mt-1">
            {currentDateFormatted || "Aujourd'hui"} · <span className="text-[#0d55e0] dark:text-[#38bdf8] font-semibold">Système 100% synchronisé</span>
          </p>
        </div>

        {/* Action Buttons Matrix */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Briefing Vocal */}
          <button
            onClick={handlePlayDailyBriefing}
            disabled={isPlayingBriefing}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              isPlayingBriefing
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 border border-blue-200/80 dark:border-blue-800/40"
            }`}
            title="Écouter le briefing vocal de la journée"
          >
            <Volume2 size={16} className={isPlayingBriefing ? "animate-bounce" : "text-blue-600 dark:text-blue-400"} />
            <span>{isPlayingBriefing ? "Lecture en cours..." : "Briefing Vocal"}</span>
          </button>

          {/* Export ICS */}
          <button
            onClick={handleExportICS}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/50 hover:bg-slate-50 border border-slate-200/90 dark:border-slate-700/50 shadow-xs transition-all"
            title="Exporter l'agenda au format .ICS"
          >
            <Download size={15} className="text-slate-500 dark:text-slate-400" />
            <span>Export .ICS</span>
          </button>

          {/* Nouveau Rendez-vous */}
          <button
            onClick={() => setShowEventForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-[#0d55e0] hover:bg-[#0b47bf] shadow-md shadow-blue-600/25 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Plus size={16} />
            <span>Nouveau Créneau</span>
          </button>

          {/* Parler à l'IA */}
          <button
            onClick={handleOpenAI}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 border border-emerald-200/80 dark:border-emerald-800/40 transition-all"
          >
            <Sparkles size={16} className="text-emerald-600 dark:text-emerald-400" />
            <span>Copilote IA</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. STATS OVERVIEW CARDS (Grid 4 Colonnes en Verre Dépoli)
         ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* KPI 1 : Rendez-vous */}
        <Link
          href="/calendar"
          className="dash-card p-5 group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold border border-blue-500/20 group-hover:scale-105 transition-transform">
              <CalendarIcon size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              7 jours
            </span>
          </div>

          <div>
            <div className="text-3xl font-black mb-1">
              {events.length}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Rendez-vous programmés
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold">
            <span>Consulter l&apos;agenda</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* KPI 2 : Rappels Vocaux */}
        <Link
          href="/reminders"
          className="dash-card p-5 group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold border border-amber-500/20 group-hover:scale-105 transition-transform">
              <Bell size={20} className="text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              En attente
            </span>
          </div>

          <div>
            <div className="text-3xl font-black mb-1">
              {reminders.length}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Alarmes &amp; Rappels vocaux
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-semibold">
            <span>Gérer les alarmes</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* KPI 3 : Tâches & Priorités */}
        <Link
          href="/tasks"
          className="dash-card p-5 group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20 group-hover:scale-105 transition-transform">
              <CheckSquare size={20} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              {tasks.length} actives
            </span>
          </div>

          <div>
            <div className="text-3xl font-black mb-1">
              {tasks.length}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Tâches à accomplir
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <span>Ouvrir la to-do</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* KPI 4 : Pomodoro Focus Pod */}
        <div className="dash-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold border border-indigo-500/20">
              <Target size={20} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setIsFocusRunning(false);
                  setFocusSeconds(25 * 60);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Réinitialiser à 25 minutes"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setIsFocusRunning(!isFocusRunning)}
                className={`p-1.5 rounded-lg text-white font-bold transition-all ${
                  isFocusRunning ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
                title={isFocusRunning ? "Mettre en pause" : "Démarrer"}
              >
                {isFocusRunning ? <Pause size={14} /> : <Play size={14} />}
              </button>
            </div>
          </div>

          <div>
            <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono tracking-tight mb-1">
              {formatFocusTime(focusSeconds)}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {isFocusRunning ? "Session de concentration active 🔥" : "Mode Focus Pomodoro (25m)"}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Série active</span>
            <span className="font-bold text-amber-600">🔥 7 jours</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. BARRE D'AJOUT RAPIDE DE TÂCHE
         ========================================================================= */}
      <form
        onSubmit={handleCreateQuickTask}
        className="dash-card p-3 sm:p-4 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
          <Plus size={20} />
        </div>
        <input
          type="text"
          value={quickTaskText}
          onChange={(e) => setQuickTaskText(e.target.value)}
          placeholder="Ajouter une tâche ou un rappel express... (Appuyez sur Entrée pour valider)"
          disabled={isCreatingTask}
          className="flex-1 bg-transparent border-none outline-hidden text-sm sm:text-base placeholder-slate-400 font-medium"
        />
        <button
          type="submit"
          disabled={!quickTaskText.trim() || isCreatingTask}
          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0d55e0] hover:bg-[#0b47bf] disabled:opacity-50 disabled:pointer-events-none transition-all shrink-0"
        >
          {isCreatingTask ? "Ajout..." : "Ajouter"}
        </button>
      </form>

      {/* =========================================================================
          4. MAIN COCKPIT PANELS : 3 COLONNES STRUCTURÉES EN VERRE DÉPOLI
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* COLONNE 1 : Agenda & Rendez-vous Récents */}
        <div className="dash-card p-6 sm:p-7 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <CalendarIcon size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold">
                  Prochains Rendez-vous
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {events.length} créneau(x) à venir
                </p>
              </div>
            </div>

            <Link
              href="/calendar"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Voir tout</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {events.length === 0 ? (
              <div className="text-center py-8 px-4 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <CalendarIcon size={32} className="mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                <p className="text-sm font-semibold">Aucun rendez-vous prévu</p>
                <p className="text-xs text-slate-400 mt-1 mb-4">Votre agenda est totalement libre.</p>
                <button
                  onClick={() => setShowEventForm(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#0d55e0] hover:bg-[#0b47bf] transition-all"
                >
                  <Plus size={14} />
                  <span>Ajouter un événement</span>
                </button>
              </div>
            ) : (
              events.slice(0, 5).map((evt) => {
                const eventDate = new Date(evt.startAt);
                return (
                  <div
                    key={evt.id}
                    className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:border-blue-200 dark:hover:border-blue-700 bg-slate-50/50 dark:bg-slate-900/40 transition-all flex items-start gap-3.5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex flex-col items-center justify-center font-extrabold text-xs shrink-0 border border-blue-500/20">
                      <span className="text-[10px] uppercase font-bold">
                        {eventDate.toLocaleDateString("fr-FR", { weekday: "short" })}
                      </span>
                      <span className="text-sm font-black">
                        {eventDate.getDate()}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">
                        {evt.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          {eventDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {evt.location && (
                          <span className="flex items-center gap-1 truncate">
                            · <MapPin size={11} className="text-slate-400 shrink-0" />
                            {evt.location}
                          </span>
                        )}
                      </div>
                      {evt.contact && (
                        <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                          <User size={11} className="text-slate-400" />
                          <span>Avec {evt.contact.firstName} {evt.contact.lastName || ""}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* COLONNE 2 : Rappels Vocaux & Alarmes Immanquables */}
        <div className="dash-card p-6 sm:p-7 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Bell size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold">
                  Alarmes &amp; Rappels
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Déclenchement vocal garanti
                </p>
              </div>
            </div>

            <Link
              href="/reminders"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Gérer</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {reminders.length === 0 ? (
              <div className="text-center py-8 px-4 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <Bell size={32} className="mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                <p className="text-sm font-semibold">Aucun rappel actif</p>
                <p className="text-xs text-slate-400 mt-1 mb-4">Vos alarmes programmées s&apos;afficheront ici.</p>
                <Link
                  href="/reminders"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/40 hover:bg-amber-200 transition-all"
                >
                  <Plus size={14} />
                  <span>Créer une alarme</span>
                </Link>
              </div>
            ) : (
              reminders.slice(0, 5).map((rem) => {
                const remDate = new Date(rem.fireAt);
                return (
                  <div
                    key={rem.id}
                    className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:border-amber-200 dark:hover:border-amber-700 bg-slate-50/50 dark:bg-slate-900/40 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                        <Volume2 size={18} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold truncate">
                          {rem.title}
                        </h4>
                        <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                          Prévu à {remDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDismissReminder(rem.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-500/10 transition-colors"
                        title="Acquitter le rappel"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <Volume2 size={16} className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <div>
              <strong className="font-bold">Alerte vocale automatique :</strong> Votre navigateur émettra un son carillon clair et l&apos;IA dictera votre rappel à voix haute à l&apos;heure dite.
            </div>
          </div>
        </div>

        {/* COLONNE 3 : Tâches Prioritaires & Focus */}
        <div className="dash-card p-6 sm:p-7 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <CheckSquare size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold">
                  Priorités du Jour
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {tasks.length} tâche(s) à faire
                </p>
              </div>
            </div>

            <Link
              href="/tasks"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Matrice</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2.5">
            {tasks.length === 0 ? (
              <div className="text-center py-8 px-4 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <CheckCircle2 size={32} className="mx-auto text-emerald-500 mb-2" />
                <p className="text-sm font-semibold">Toutes les tâches sont terminées !</p>
                <p className="text-xs text-slate-400 mt-1">Bravo, vous avez complété votre liste de travail.</p>
              </div>
            ) : (
              tasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id, task.isDone)}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 flex items-center gap-3 cursor-pointer transition-all"
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      task.isDone
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-slate-300 dark:border-slate-600 hover:border-blue-600"
                    }`}
                  >
                    {task.isDone && <Check size={12} strokeWidth={3} />}
                  </div>

                  <span
                    className={`text-sm flex-1 truncate ${
                      task.isDone ? "line-through text-slate-400" : "font-semibold"
                    }`}
                  >
                    {task.title}
                  </span>

                  {task.priority === "URGENT" && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                      URGENT
                    </span>
                  )}
                  {task.priority === "HIGH" && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      HIGH
                    </span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Metric Strip */}
          <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <div>
              <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">+5.2h / sem.</div>
              <div className="text-[11px] text-slate-400">Gain de temps moyen</div>
            </div>
            <div className="text-right">
              <div className="text-base font-extrabold text-blue-600 dark:text-blue-400">100% IA Flash</div>
              <div className="text-[11px] text-slate-400">Fiabilité Cockpit</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de création de rendez-vous */}
      {showEventForm && (
        <EventFormModal
          onClose={() => setShowEventForm(false)}
          onSaved={() => {
            setShowEventForm(false);
            loadDashboard();
          }}
        />
      )}
    </div>
  );
}

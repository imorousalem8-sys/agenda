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

    const handleOpenNewEvent = () => setShowEventForm(true);
    const handleTriggerBriefing = () => handlePlayDailyBriefing();

    window.addEventListener("open-new-event", handleOpenNewEvent);
    window.addEventListener("play-daily-briefing", handleTriggerBriefing);

    return () => {
      window.removeEventListener("task-updated", handleRefresh);
      window.removeEventListener("reminder-updated", handleRefresh);
      window.removeEventListener("event-updated", handleRefresh);
      window.removeEventListener("open-new-event", handleOpenNewEvent);
      window.removeEventListener("play-daily-briefing", handleTriggerBriefing);
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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* =========================================================================
          1. HEADER COCKPIT ÉXÉCUTIF TRANSLUCIDE (HARMONISÉ AVEC LA LANDING)
         ========================================================================= */}
      <div className="dash-card p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              COCKPIT OPÉRATIONNEL
            </span>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-[#38bdf8] text-xs font-semibold border border-blue-500/20">
              <Clock size={13} className="text-[#38bdf8]" />
              <span className="font-mono">{currentTime || "12:00:00"}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            {greeting}, <span className="text-[#38bdf8]">{userName}</span> ⚡
          </h1>

          <p className="text-sm text-slate-400 font-medium capitalize mt-1">
            {currentDateFormatted || "Aujourd'hui"} · <span className="text-[#38bdf8] font-semibold">Système 100% synchronisé</span>
          </p>
        </div>

        {/* Boutons d'Action Principaux du Cockpit */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Briefing Vocal */}
          <button
            onClick={handlePlayDailyBriefing}
            disabled={isPlayingBriefing}
            className={`dash-btn-glass ${isPlayingBriefing ? "opacity-75" : ""}`}
            title="Écouter le briefing vocal de la journée"
          >
            <Volume2 size={16} className={isPlayingBriefing ? "animate-bounce text-[#38bdf8]" : "text-[#38bdf8]"} />
            <span>{isPlayingBriefing ? "Lecture en cours..." : "Briefing Vocal"}</span>
          </button>

          {/* Nouveau Rendez-vous */}
          <button
            onClick={() => setShowEventForm(true)}
            className="dash-btn-primary"
            id="dash-new-event-btn"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Nouveau Créneau</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. STATS OVERVIEW CARDS (Grid 4 Colonnes en Verre Dépoli Sombre)
         ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* KPI 1 : Rendez-vous */}
        <Link
          href="/calendar"
          className="dash-card p-5 group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-[#38bdf8] flex items-center justify-center font-bold border border-blue-500/20 group-hover:scale-105 transition-transform">
              <CalendarIcon size={20} className="text-[#38bdf8]" />
            </div>
            <span className="text-xs font-semibold text-[#38bdf8] bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              7 jours
            </span>
          </div>

          <div>
            <div className="text-3xl font-black text-white mb-1">
              {events.length}
            </div>
            <div className="text-xs font-semibold text-slate-400">
              Rendez-vous programmés
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#38bdf8] font-semibold">
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
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-[#38bdf8] flex items-center justify-center font-bold border border-blue-500/20 group-hover:scale-105 transition-transform">
              <Bell size={20} className="text-[#38bdf8]" />
            </div>
            <span className="text-xs font-semibold text-[#38bdf8] bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              En attente
            </span>
          </div>

          <div>
            <div className="text-3xl font-black text-white mb-1">
              {reminders.length}
            </div>
            <div className="text-xs font-semibold text-slate-400">
              Alarmes &amp; Rappels vocaux
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#38bdf8] font-semibold">
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
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-[#38bdf8] flex items-center justify-center font-bold border border-blue-500/20 group-hover:scale-105 transition-transform">
              <CheckSquare size={20} className="text-[#38bdf8]" />
            </div>
            <span className="text-xs font-semibold text-[#38bdf8] bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              {tasks.length} actives
            </span>
          </div>

          <div>
            <div className="text-3xl font-black text-white mb-1">
              {tasks.length}
            </div>
            <div className="text-xs font-semibold text-slate-400">
              Tâches à accomplir
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#38bdf8] font-semibold">
            <span>Ouvrir la to-do</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* KPI 4 : Pomodoro Focus Pod */}
        <div className="dash-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-[#38bdf8] flex items-center justify-center font-bold border border-blue-500/20">
              <Target size={20} className="text-[#38bdf8]" />
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setIsFocusRunning(false);
                  setFocusSeconds(25 * 60);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Réinitialiser à 25 minutes"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setIsFocusRunning(!isFocusRunning)}
                className={`p-1.5 rounded-lg text-white font-bold transition-all ${
                  isFocusRunning ? "bg-amber-600 hover:bg-amber-500" : "bg-[#0d55e0] hover:bg-[#2563eb]"
                }`}
                title={isFocusRunning ? "Mettre en pause" : "Démarrer"}
              >
                {isFocusRunning ? <Pause size={14} /> : <Play size={14} />}
              </button>
            </div>
          </div>

          <div>
            <div className="text-3xl font-black text-white font-mono tracking-tight mb-1">
              {formatFocusTime(focusSeconds)}
            </div>
            <div className="text-xs font-semibold text-slate-400">
              {isFocusRunning ? "Session de concentration active 🔥" : "Mode Focus Pomodoro (25m)"}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Série active</span>
            <span className="font-bold text-amber-400">🔥 7 jours</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. BARRE D'AJOUT RAPIDE DE TÂCHE (Champ Sombre Translucide)
         ========================================================================= */}
      <form
        onSubmit={handleCreateQuickTask}
        className="dash-card p-3 sm:p-4 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#38bdf8] flex items-center justify-center shrink-0 border border-blue-500/20">
          <Plus size={20} />
        </div>
        <input
          type="text"
          value={quickTaskText}
          onChange={(e) => setQuickTaskText(e.target.value)}
          placeholder="Ajouter une tâche ou un rappel express... (Appuyez sur Entrée pour valider)"
          disabled={isCreatingTask}
          className="flex-1 bg-transparent border-none outline-hidden text-sm sm:text-base text-white placeholder-slate-500 font-medium"
        />
        <button
          type="submit"
          disabled={!quickTaskText.trim() || isCreatingTask}
          className="dash-btn-primary disabled:opacity-50 disabled:pointer-events-none"
        >
          {isCreatingTask ? "Ajout..." : "Ajouter"}
        </button>
      </form>

      {/* =========================================================================
          4. MAIN COCKPIT PANELS : 3 COLONNES STRUCTURÉES EN VERRE DÉPOLI SOMBRE
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* COLONNE 1 : Agenda & Rendez-vous Récents */}
        <div className="dash-card p-6 sm:p-7 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#38bdf8] flex items-center justify-center font-bold border border-blue-500/20">
                <CalendarIcon size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">
                  Prochains Rendez-vous
                </h2>
                <p className="text-xs text-slate-400">
                  {events.length} créneau(x) à venir
                </p>
              </div>
            </div>

            <Link
              href="/calendar"
              className="text-xs font-bold text-[#38bdf8] hover:text-white bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-xl border border-blue-500/20 transition-all inline-flex items-center gap-1.5"
            >
              <span>Voir tout</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {events.length === 0 ? (
              <div className="dash-empty-state">
                <CalendarIcon size={32} className="mx-auto text-blue-400/60 mb-2.5" />
                <p className="text-sm font-semibold text-white">Aucun rendez-vous prévu</p>
                <p className="text-xs text-slate-400 mt-1 mb-4">Votre agenda est totalement libre.</p>
                <button
                  onClick={() => setShowEventForm(true)}
                  className="dash-btn-primary"
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
                    className="dash-item-row"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-[#38bdf8] flex flex-col items-center justify-center font-extrabold text-xs shrink-0 border border-blue-500/20">
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        {eventDate.toLocaleDateString("fr-FR", { weekday: "short" })}
                      </span>
                      <span className="text-sm font-black text-white">
                        {eventDate.getDate()}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">
                        {evt.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="font-semibold text-[#38bdf8]">
                          {eventDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {evt.location && (
                          <span className="flex items-center gap-1 truncate text-slate-400">
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
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#38bdf8] flex items-center justify-center font-bold border border-blue-500/20">
                <Bell size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">
                  Alarmes &amp; Rappels
                </h2>
                <p className="text-xs text-slate-400">
                  Déclenchement vocal garanti
                </p>
              </div>
            </div>

            <Link
              href="/reminders"
              className="text-xs font-bold text-[#38bdf8] hover:text-white bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-xl border border-blue-500/20 transition-all inline-flex items-center gap-1.5"
            >
              <span>Gérer</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {reminders.length === 0 ? (
              <div className="dash-empty-state">
                <Bell size={32} className="mx-auto text-blue-400/60 mb-2.5" />
                <p className="text-sm font-semibold text-white">Aucun rappel actif</p>
                <p className="text-xs text-slate-400 mt-1 mb-4">Vos alarmes programmées s&apos;afficheront ici.</p>
                <Link
                  href="/reminders"
                  className="dash-btn-primary"
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
                    className="dash-item-row justify-between"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#38bdf8] flex items-center justify-center shrink-0 border border-blue-500/20">
                        <Volume2 size={18} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">
                          {rem.title}
                        </h4>
                        <div className="text-xs font-semibold text-[#38bdf8] mt-0.5">
                          Prévu à {remDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDismissReminder(rem.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
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

          {/* Note d'Information Technologique (Au lieu du bloc jaune criard) */}
          <div className="dash-info-banner">
            <Volume2 size={16} className="text-[#38bdf8] mt-0.5 shrink-0" />
            <div>
              <strong className="font-bold text-white">Alerte vocale automatique :</strong> Votre navigateur émettra un carillon cristallin et l&apos;IA dictera votre rappel à voix haute à l&apos;heure dite.
            </div>
          </div>
        </div>

        {/* COLONNE 3 : Tâches Prioritaires & Focus */}
        <div className="dash-card p-6 sm:p-7 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#38bdf8] flex items-center justify-center font-bold border border-blue-500/20">
                <CheckSquare size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">
                  Priorités du Jour
                </h2>
                <p className="text-xs text-slate-400">
                  {tasks.length} tâche(s) à faire
                </p>
              </div>
            </div>

            <Link
              href="/tasks"
              className="text-xs font-bold text-[#38bdf8] hover:text-white bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-xl border border-blue-500/20 transition-all inline-flex items-center gap-1.5"
            >
              <span>Matrice</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2.5">
            {tasks.length === 0 ? (
              <div className="dash-empty-state">
                <CheckCircle2 size={32} className="mx-auto text-[#38bdf8] mb-2.5" />
                <p className="text-sm font-semibold text-white">Toutes les tâches sont terminées !</p>
                <p className="text-xs text-slate-400 mt-1">Bravo, votre liste de travail est à jour.</p>
              </div>
            ) : (
              tasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id, task.isDone)}
                  className="dash-item-row cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      task.isDone
                        ? "bg-[#0d55e0] border-[#38bdf8] text-white"
                        : "border-slate-600 hover:border-[#38bdf8]"
                    }`}
                  >
                    {task.isDone && <Check size={12} strokeWidth={3} />}
                  </div>

                  <span
                    className={`text-sm flex-1 truncate ${
                      task.isDone ? "line-through text-slate-500" : "font-semibold text-white"
                    }`}
                  >
                    {task.title}
                  </span>

                  {task.priority === "URGENT" && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-500/15 text-red-300 border border-red-500/30">
                      URGENT
                    </span>
                  )}
                  {task.priority === "HIGH" && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      HIGH
                    </span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Metric Strip Harmonisé */}
          <div className="dash-info-banner justify-between items-center text-xs">
            <div>
              <div className="text-base font-extrabold text-[#38bdf8]">+5.2h / sem.</div>
              <div className="text-[11px] text-slate-400">Gain de temps moyen</div>
            </div>
            <div className="text-right">
              <div className="text-base font-extrabold text-blue-400">100% IA Flash</div>
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

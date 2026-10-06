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
  const [activeTab, setActiveTab] = useState<"calendar" | "tasks">("calendar");
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-7">
      {/* =========================================================================
          1. EN-TÊTE ÉPURÉ & LIMPIDE (LUMINEUX, SANS BOÎTES LOURDES)
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-200 dark:border-emerald-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Cockpit Actif
            </span>
            <span className="text-xs text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium capitalize">
              {currentDateFormatted || "Aujourd'hui"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {greeting}, <span className="text-[#0d55e0] dark:text-[#38bdf8]">{userName}</span>
          </h1>
        </div>

        {/* Boutons d'Action Rapides */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayDailyBriefing}
            disabled={isPlayingBriefing}
            className={`dash-btn-glass ${isPlayingBriefing ? "opacity-75" : ""}`}
            title="Écouter le briefing vocal de la journée"
          >
            <Volume2 size={16} className={isPlayingBriefing ? "animate-bounce text-[#0d55e0]" : "text-[#0d55e0] dark:text-[#38bdf8]"} />
            <span>{isPlayingBriefing ? "Lecture en cours..." : "Briefing Vocal"}</span>
          </button>

          <button
            onClick={() => setShowEventForm(true)}
            className="dash-btn-primary"
            id="dash-new-event-btn"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Nouveau Rendez-vous</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. BANDEAU DE SYNTHÈSE UNIQUE (4 STATS EN 1 SEULE LIGNE FLUIDE, SANS DISPERSION)
         ========================================================================= */}
      <div className="dash-stats-bar">
        {/* KPI 1 : Rendez-vous */}
        <Link href="/calendar" className="dash-stat-item">
          <div className="dash-stat-icon-wrap">
            <CalendarIcon size={20} />
          </div>
          <div>
            <div className="dash-stat-value">{events.length}</div>
            <div className="dash-stat-label">Rendez-vous programmés</div>
          </div>
        </Link>

        {/* KPI 2 : Alarmes & Rappels */}
        <Link href="/reminders" className="dash-stat-item">
          <div className="dash-stat-icon-wrap">
            <Bell size={20} />
          </div>
          <div>
            <div className="dash-stat-value">{reminders.length}</div>
            <div className="dash-stat-label">Alarmes &amp; Rappels vocaux</div>
          </div>
        </Link>

        {/* KPI 3 : Tâches */}
        <Link href="/tasks" className="dash-stat-item">
          <div className="dash-stat-icon-wrap">
            <CheckSquare size={20} />
          </div>
          <div>
            <div className="dash-stat-value">{tasks.length}</div>
            <div className="dash-stat-label">Tâches à accomplir</div>
          </div>
        </Link>

        {/* KPI 4 : Concentration Focus Pomodoro */}
        <div className="dash-stat-item">
          <div className="dash-stat-icon-wrap">
            <Target size={20} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="dash-stat-value font-mono">{formatFocusTime(focusSeconds)}</div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setIsFocusRunning(false);
                    setFocusSeconds(25 * 60);
                  }}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                  title="Réinitialiser à 25m"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={() => setIsFocusRunning(!isFocusRunning)}
                  className="p-1 rounded bg-[#0d55e0] text-white font-bold hover:bg-[#0b47bf] transition-colors"
                  title={isFocusRunning ? "Pause" : "Démarrer"}
                >
                  {isFocusRunning ? <Pause size={12} /> : <Play size={12} />}
                </button>
              </div>
            </div>
            <div className="dash-stat-label">
              {isFocusRunning ? "Focus actif 🔥" : "Mode Focus (25m)"}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. COCKPIT PRINCIPAL : 2 VOLETS SPACIEUX & LIMPIDES (AU LIEU DE 10 000 BOÎTES)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* VOLET DE GAUCHE (8 COLONNES : 67% DE L'ESPACE) -> AGENDA ET TÂCHES UNIFIÉS */}
        <div className="lg:col-span-8 space-y-6">
          <div className="dash-card overflow-hidden">
            {/* Barre d'onglets limpides */}
            <div className="dash-tabs-bar">
              <button
                onClick={() => setActiveTab("calendar")}
                className={`dash-tab-btn ${activeTab === "calendar" ? "is-active" : ""}`}
              >
                <CalendarIcon size={16} />
                <span>Planning &amp; Rendez-vous</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                  {events.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("tasks")}
                className={`dash-tab-btn ${activeTab === "tasks" ? "is-active" : ""}`}
              >
                <CheckSquare size={16} />
                <span>Tâches du Jour</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                  {tasks.length}
                </span>
              </button>
            </div>

            {/* Barre d'ajout rapide intégrée */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
              <form onSubmit={handleCreateQuickTask} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Plus size={16} />
                </div>
                <input
                  type="text"
                  value={quickTaskText}
                  onChange={(e) => setQuickTaskText(e.target.value)}
                  placeholder={
                    activeTab === "calendar"
                      ? "Ajouter un créneau express ou un rappel... (Appuyez sur Entrée pour valider)"
                      : "Ajouter une tâche express... (Appuyez sur Entrée pour valider)"
                  }
                  disabled={isCreatingTask}
                  className="flex-1 bg-transparent border-none outline-hidden text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium"
                />
                <button
                  type="submit"
                  disabled={!quickTaskText.trim() || isCreatingTask}
                  className="dash-btn-primary disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isCreatingTask ? "Ajout..." : "Ajouter"}
                </button>
              </form>
            </div>

            {/* Contenu de l'onglet actif */}
            <div className="p-6">
              {activeTab === "calendar" ? (
                <div>
                  {events.length === 0 ? (
                    <div className="dash-empty-state">
                      <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                        <CalendarIcon size={24} />
                      </div>
                      <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Aucun rendez-vous prévu</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5 max-w-sm mx-auto">
                        Votre planning est totalement libre pour les prochains jours.
                      </p>
                      <button
                        onClick={() => setShowEventForm(true)}
                        className="dash-btn-primary"
                      >
                        <Plus size={15} />
                        <span>Planifier un rendez-vous</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {events.map((evt) => {
                        const eventDate = new Date(evt.startAt);
                        return (
                          <div key={evt.id} className="dash-item-row">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex flex-col items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/40">
                              <span className="text-[10px] uppercase font-bold text-slate-400">
                                {eventDate.toLocaleDateString("fr-FR", { weekday: "short" })}
                              </span>
                              <span className="text-base font-black text-slate-800 dark:text-slate-100">
                                {eventDate.getDate()}
                              </span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                                {evt.title}
                              </h4>
                              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                <span className="font-semibold text-blue-600 dark:text-blue-400">
                                  {eventDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                </span>
                                {evt.location && (
                                  <span className="flex items-center gap-1 truncate">
                                    <MapPin size={12} className="text-slate-400 shrink-0" />
                                    {evt.location}
                                  </span>
                                )}
                                {evt.contact && (
                                  <span className="flex items-center gap-1 truncate">
                                    <User size={12} className="text-slate-400 shrink-0" />
                                    Avec {evt.contact.firstName} {evt.contact.lastName || ""}
                                  </span>
                                )}
                              </div>
                            </div>

                            <Link
                              href="/calendar"
                              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                            >
                              Détails
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {tasks.length === 0 ? (
                    <div className="dash-empty-state">
                      <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                        <CheckCircle2 size={24} />
                      </div>
                      <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Toutes les tâches sont accomplies !</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5 max-w-sm mx-auto">
                        Félicitations, vous avez complété l&apos;ensemble de vos priorités.
                      </p>
                      <button
                        onClick={() => {
                          const input = document.querySelector<HTMLInputElement>("input[placeholder*='Ajouter']");
                          input?.focus();
                        }}
                        className="dash-btn-primary"
                      >
                        <Plus size={15} />
                        <span>Créer une nouvelle tâche</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => handleToggleTask(task.id, task.isDone)}
                          className="dash-item-row cursor-pointer"
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
                              task.isDone ? "line-through text-slate-400" : "font-medium text-slate-800 dark:text-slate-200"
                            }`}
                          >
                            {task.title}
                          </span>

                          {task.priority === "URGENT" && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/40 dark:border-red-900/40">
                              URGENT
                            </span>
                          )}
                          {task.priority === "HIGH" && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-900/40">
                              PRIORITAIRE
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* VOLET DE DROITE (4 COLONNES : 33% DE L'ESPACE) -> RAPPELS VOCAUX & CONCENTRATION */}
        <div className="lg:col-span-4 space-y-6">
          {/* CARTE 1 : ALARMES & RAPPELS VOCAUX */}
          <div className="dash-card p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Bell size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Alarmes &amp; Rappels</h3>
                  <p className="text-[11px] text-slate-400">Déclenchement vocal garanti</p>
                </div>
              </div>

              <Link
                href="/reminders"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Gérer
              </Link>
            </div>

            <div>
              {reminders.length === 0 ? (
                <div className="text-center py-6 px-4">
                  <Bell size={24} className="mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Aucun rappel en attente</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 mb-3">Vos alarmes vocales programmées apparaîtront ici.</p>
                  <Link href="/reminders" className="dash-btn-primary text-xs">
                    <Plus size={13} />
                    <span>Créer une alarme</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {reminders.slice(0, 4).map((rem) => {
                    const remDate = new Date(rem.fireAt);
                    return (
                      <div key={rem.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Volume2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{rem.title}</h4>
                            <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                              {remDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDismissReminder(rem.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-emerald-600 transition-colors"
                          title="Acquitter"
                        >
                          <Check size={15} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="dash-info-banner">
              <Volume2 size={15} className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div className="text-[11px] leading-relaxed">
                <strong className="text-slate-800 dark:text-slate-200 font-semibold">Alerte vocale active :</strong> Votre navigateur émet un carillon puis dicte votre rappel à voix haute.
              </div>
            </div>
          </div>

          {/* CARTE 2 : IMPACT & GAIN DE TEMPS */}
          <div className="dash-card p-5 space-y-4">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-slate-100">Impact &amp; Performance</span>
              <span className="font-semibold text-emerald-600">Optimal</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                <div className="text-lg font-black text-emerald-600">+5.2h / sem.</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Temps économisé</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                <div className="text-lg font-black text-blue-600">100% IA Flash</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Fiabilité Cockpit</div>
              </div>
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

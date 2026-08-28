"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  addYears,
  subYears,
  setMonth,
  setYear,
  parseISO,
  startOfWeek,
  endOfWeek,
  getYear,
  getMonth,
} from "date-fns";
import { fr } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Pencil,
  Trash2,
  Bell,
  MapPin,
  Clock,
  Calendar as CalendarIcon,
  Grid,
  Columns,
  List as ListIcon,
  Search,
  Layers,
  ChevronDown,
  LayoutGrid,
  Sparkles,
  Info,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { getCategoryLabel, formatTime } from "@/lib/utils";
import EventFormModal from "@/components/forms/EventFormModal";

interface Reminder {
  id: string;
  fireAt: string;
  status: string;
  isVeille: boolean;
}

interface Event {
  id: string;
  title: string;
  startAt: string;
  endAt?: string | null;
  category: string;
  priority: string;
  mode: string;
  description?: string | null;
  notes?: string | null;
  location?: string | null;
  reminders: Reminder[];
}

type CalendarView = "month" | "week" | "day" | "list" | "year";

const MONTHS_LIST = [
  { index: 0, short: "Jan", full: "Janvier" },
  { index: 1, short: "Fév", full: "Février" },
  { index: 2, short: "Mar", full: "Mars" },
  { index: 3, short: "Avr", full: "Avril" },
  { index: 4, short: "Mai", full: "Mai" },
  { index: 5, short: "Juin", full: "Juin" },
  { index: 6, short: "Juil", full: "Juillet" },
  { index: 7, short: "Août", full: "Août" },
  { index: 8, short: "Sep", full: "Septembre" },
  { index: 9, short: "Oct", full: "Octobre" },
  { index: 10, short: "Nov", full: "Novembre" },
  { index: 11, short: "Déc", full: "Décembre" },
];

const WEEKDAYS_SHORT = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  WORK: { bg: "rgba(59, 130, 246, 0.15)", text: "#93c5fd", border: "rgba(59, 130, 246, 0.35)", dot: "#3b82f6" },
  HEALTH: { bg: "rgba(244, 63, 94, 0.15)", text: "#fda4af", border: "rgba(244, 63, 94, 0.35)", dot: "#f43f5e" },
  FAMILY: { bg: "rgba(168, 85, 247, 0.15)", text: "#d8b4fe", border: "rgba(168, 85, 247, 0.35)", dot: "#a855f7" },
  ADMIN: { bg: "rgba(245, 158, 11, 0.15)", text: "#fcd34d", border: "rgba(245, 158, 11, 0.35)", dot: "#f59e0b" },
  EDUCATION: { bg: "rgba(16, 185, 129, 0.15)", text: "#6ee7b7", border: "rgba(16, 185, 129, 0.35)", dot: "#10b981" },
  OTHER: { bg: "rgba(99, 102, 241, 0.15)", text: "#c7d2fe", border: "rgba(99, 102, 241, 0.35)", dot: "#6366f1" },
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>("month");
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [showMonthPickerModal, setShowMonthPickerModal] = useState(false);

  const currentYear = getYear(currentDate);
  const currentMonthIndex = getMonth(currentDate);

  // Charger les événements pour toute l'année active
  const loadEvents = useCallback(async () => {
    setLoading(true);
    const start = startOfWeek(startOfMonth(new Date(currentYear, 0, 1)), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(new Date(currentYear, 11, 31)), { weekStartsOn: 1 });

    try {
      const res = await fetch(`/api/events?from=${start.toISOString()}&to=${end.toISOString()}`);
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events ?? []);
      }
    } catch (err) {
      console.error("Erreur chargement événements :", err);
    }
    setLoading(false);
  }, [currentYear]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // Filtrage
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesSearch =
        searchQuery === "" ||
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ev.location && ev.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ev.description && ev.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === "ALL" || ev.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [events, searchQuery, selectedCategory]);

  // Navigation
  const handlePrev = () => {
    if (view === "year") setCurrentDate((d) => subYears(d, 1));
    else if (view === "month") setCurrentDate((d) => subMonths(d, 1));
    else if (view === "week") setCurrentDate((d) => subWeeks(d, 1));
    else if (view === "day") {
      const prev = subDays(currentDate, 1);
      setCurrentDate(prev);
      setSelectedDay(prev);
    }
  };

  const handleNext = () => {
    if (view === "year") setCurrentDate((d) => addYears(d, 1));
    else if (view === "month") setCurrentDate((d) => addMonths(d, 1));
    else if (view === "week") setCurrentDate((d) => addWeeks(d, 1));
    else if (view === "day") {
      const next = addDays(currentDate, 1);
      setCurrentDate(next);
      setSelectedDay(next);
    }
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDay(today);
  };

  // Saut direct à un mois
  const jumpToMonth = (monthIdx: number) => {
    const updated = setMonth(currentDate, monthIdx);
    setCurrentDate(updated);
    if (view === "year") setView("month");
  };

  // Saut direct à une année
  const jumpToYear = (year: number) => {
    const updated = setYear(currentDate, year);
    setCurrentDate(updated);
  };

  // Récupérer les événements d'une journée
  const getEventsForDay = useCallback(
    (day: Date) => {
      return filteredEvents
        .filter((e) => isSameDay(parseISO(e.startAt), day))
        .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
    },
    [filteredEvents]
  );

  const selectedDayEvents = getEventsForDay(selectedDay);

  // Nombre d'événements par mois
  const getEventsCountForMonth = useCallback(
    (monthIdx: number) => {
      return filteredEvents.filter((ev) => {
        const d = parseISO(ev.startAt);
        return getYear(d) === currentYear && getMonth(d) === monthIdx;
      }).length;
    },
    [filteredEvents, currentYear]
  );

  // Suppression
  const deleteEvent = async (id: string) => {
    if (!confirm("Supprimer ce rendez-vous et ses alarmes ?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (selectedEvent?.id === id) setSelectedEvent(null);
      loadEvents();
    } catch (err) {
      console.error(err);
    }
    setDeleting(null);
  };

  // Mois courant
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({
    start: startOfWeek(monthStart, { weekStartsOn: 1 }),
    end: endOfWeek(monthEnd, { weekStartsOn: 1 }),
  });

  // Semaine courante
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="pro-calendar-wrapper">
      {/* ── TOP HEADER ── */}
      <header className="pro-cal-header">
        <div className="pro-cal-title-block">
          <div className="pro-cal-icon-wrap">
            <CalendarDays size={22} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <h1 className="pro-cal-heading">Agenda & Planning Professionnel</h1>
              <span className="pro-badge-total">{events.length} rendez-vous en {currentYear}</span>
            </div>
            <p className="pro-cal-subtext">
              Vue complète de l&apos;année, navigation instantanée vers n&apos;importe quel mois et gestion des créneaux
            </p>
          </div>
        </div>

        <div className="pro-cal-header-cta">
          <button
            onClick={() => {
              setEditingEvent(null);
              setShowEventForm(true);
            }}
            className="btn btn-primary pro-add-btn"
            id="calendar-new-event"
          >
            <Plus size={18} />
            <span>Nouveau rendez-vous</span>
          </button>
        </div>
      </header>

      {/* ── BARRE DE SÉLECTION RAPIDE DES 12 MOIS ── */}
      <div className="pro-months-bar-card">
        <div className="pro-year-selector">
          <button onClick={() => jumpToYear(currentYear - 1)} className="pro-year-nav-btn" title="Année précédente">
            <ChevronLeft size={16} />
          </button>
          <span className="pro-year-display">{currentYear}</span>
          <button onClick={() => jumpToYear(currentYear + 1)} className="pro-year-nav-btn" title="Année suivante">
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="pro-months-pills-row">
          {MONTHS_LIST.map((m) => {
            const isCurrent = m.index === currentMonthIndex;
            const count = getEventsCountForMonth(m.index);
            return (
              <button
                key={m.index}
                onClick={() => jumpToMonth(m.index)}
                className={`pro-month-pill ${isCurrent ? "active" : ""}`}
                title={`Aller à ${m.full} ${currentYear}`}
              >
                <span>{m.short}</span>
                {count > 0 && <span className="pro-month-dot-count">{count}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TOOLBAR DE NAVIGATION & MODES DE VUE ── */}
      <div className="pro-cal-toolbar">
        {/* Commandes de période */}
        <div className="pro-period-group">
          <button onClick={handleToday} className="pro-btn-today" id="calendar-btn-today">
            Aujourd&apos;hui
          </button>
          <div className="pro-arrows-group">
            <button onClick={handlePrev} className="pro-arrow-btn" id="calendar-prev" title="Période précédente">
              <ChevronLeft size={18} />
            </button>
            <button onClick={handleNext} className="pro-arrow-btn" id="calendar-next" title="Période suivante">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="pro-period-title">
            {view === "year" && `Année ${currentYear}`}
            {view === "month" && format(currentDate, "MMMM yyyy", { locale: fr })}
            {view === "week" &&
              `Semaine ${format(weekStart, "d MMM", { locale: fr })} — ${format(weekEnd, "d MMM yyyy", { locale: fr })}`}
            {view === "day" && format(currentDate, "EEEE d MMMM yyyy", { locale: fr })}
            {view === "list" && `Planning global (${filteredEvents.length} événements)`}
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="pro-view-switcher">
          <button
            onClick={() => setView("month")}
            className={`pro-view-tab ${view === "month" ? "active" : ""}`}
            id="view-month"
          >
            <Grid size={15} />
            <span>Mois</span>
          </button>
          <button
            onClick={() => setView("week")}
            className={`pro-view-tab ${view === "week" ? "active" : ""}`}
            id="view-week"
          >
            <Columns size={15} />
            <span>Semaine</span>
          </button>
          <button
            onClick={() => {
              setView("day");
              setSelectedDay(currentDate);
            }}
            className={`pro-view-tab ${view === "day" ? "active" : ""}`}
            id="view-day"
          >
            <Clock size={15} />
            <span>Jour</span>
          </button>
          <button
            onClick={() => setView("year")}
            className={`pro-view-tab ${view === "year" ? "active" : ""}`}
            id="view-year"
          >
            <LayoutGrid size={15} />
            <span>Année (12 mois)</span>
          </button>
          <button
            onClick={() => setView("list")}
            className={`pro-view-tab ${view === "list" ? "active" : ""}`}
            id="view-list"
          >
            <ListIcon size={15} />
            <span>Planning</span>
          </button>
        </div>

        {/* Bouton Inspecteur */}
        <button
          onClick={() => setShowSidePanel(!showSidePanel)}
          className={`pro-inspector-toggle ${showSidePanel ? "active" : ""}`}
        >
          <Layers size={16} />
          <span>{showSidePanel ? "Volet actif" : "Inspecteur"}</span>
        </button>
      </div>

      {/* ── BARRE DE RECHERCHE & FILTRES RAPIDES ── */}
      <div className="pro-filters-container">
        <div className="pro-search-box">
          <Search size={15} className="pro-search-icon" />
          <input
            type="text"
            placeholder="Rechercher par titre, lieu, mot-clé..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pro-search-input"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="pro-search-clear">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="pro-quick-categories">
          {[
            { label: "Tous", val: "ALL", color: "#6366f1" },
            { label: "Travail / Pro", val: "WORK", color: "#3b82f6" },
            { label: "Santé", val: "HEALTH", color: "#f43f5e" },
            { label: "Famille", val: "FAMILY", color: "#a855f7" },
            { label: "Administratif", val: "ADMIN", color: "#f59e0b" },
          ].map((cat) => (
            <button
              key={cat.val}
              onClick={() => setSelectedCategory(cat.val)}
              className={`pro-cat-pill ${selectedCategory === cat.val ? "selected" : ""}`}
            >
              <span className="pro-cat-color-dot" style={{ background: cat.color }} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENU PRINCIPAL & GRILLES ── */}
      <div className={`pro-cal-grid-layout ${showSidePanel ? "with-inspector" : "no-inspector"}`}>
        {/* VUE 1: MOIS */}
        {view === "month" && (
          <div className="pro-calendar-card glass-card">
            {/* Ligne des 7 jours (Abréviations nettes, non tronquées) */}
            <div className="pro-month-weekdays-row">
              {WEEKDAYS_SHORT.map((dayName, idx) => (
                <div key={idx} className="pro-weekday-header-cell">
                  {dayName}
                </div>
              ))}
            </div>

            {/* Grille des cellules du mois */}
            <div className="pro-month-days-grid">
              {monthDays.map((day, i) => {
                const dayEvents = getEventsForDay(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isSelected = isSameDay(day, selectedDay);
                const isDayToday = isToday(day);

                return (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedDay(day);
                      if (!showSidePanel) setShowSidePanel(true);
                    }}
                    onDoubleClick={() => {
                      setSelectedDay(day);
                      setEditingEvent(null);
                      setShowEventForm(true);
                    }}
                    className={`pro-day-cell ${!isCurrentMonth ? "is-outside-month" : ""} ${
                      isSelected ? "is-selected-cell" : ""
                    } ${isDayToday ? "is-today-cell" : ""}`}
                    id={`day-cell-${format(day, "yyyy-MM-dd")}`}
                  >
                    <div className="pro-day-cell-top">
                      <span className={`pro-day-number ${isDayToday ? "today-badge" : ""}`}>
                        {format(day, "d")}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="pro-day-event-count-badge">
                          {dayEvents.length}
                        </span>
                      )}
                    </div>

                    {/* Événements de la cellule */}
                    <div className="pro-day-events-stack">
                      {dayEvents.slice(0, 3).map((ev) => {
                        const style = CATEGORY_STYLES[ev.category] || CATEGORY_STYLES.OTHER;
                        const isFocused = selectedEvent?.id === ev.id;
                        return (
                          <div
                            key={ev.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDay(day);
                              setSelectedEvent(ev);
                              if (!showSidePanel) setShowSidePanel(true);
                            }}
                            className={`pro-event-tag ${isFocused ? "focused" : ""}`}
                            style={{
                              background: style.bg,
                              color: style.text,
                              borderColor: style.border,
                            }}
                            title={`${formatTime(ev.startAt)} • ${ev.title}`}
                          >
                            <span className="pro-event-tag-time">{formatTime(ev.startAt)}</span>
                            <span className="pro-event-tag-title">{ev.title}</span>
                          </div>
                        );
                      })}

                      {dayEvents.length > 3 && (
                        <div
                          className="pro-event-more-tag"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDay(day);
                            if (!showSidePanel) setShowSidePanel(true);
                          }}
                        >
                          +{dayEvents.length - 3} autres...
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VUE 2: ANNEE (12 MOIS INTERACTIFS) */}
        {view === "year" && (
          <div className="pro-year-container glass-card">
            <div className="pro-year-grid-12">
              {MONTHS_LIST.map((m) => {
                const miniMonthStart = startOfMonth(new Date(currentYear, m.index, 1));
                const miniMonthEnd = endOfMonth(miniMonthStart);
                const miniDays = eachDayOfInterval({
                  start: startOfWeek(miniMonthStart, { weekStartsOn: 1 }),
                  end: endOfWeek(miniMonthEnd, { weekStartsOn: 1 }),
                });
                const monthEventsCount = getEventsCountForMonth(m.index);
                const isSelectedMonth = m.index === currentMonthIndex;

                return (
                  <div
                    key={m.index}
                    onClick={() => {
                      jumpToMonth(m.index);
                      setView("month");
                    }}
                    className={`pro-mini-month-card ${isSelectedMonth ? "current-m" : ""}`}
                  >
                    <div className="pro-mini-month-head">
                      <h4>{m.full}</h4>
                      {monthEventsCount > 0 && (
                        <span className="pro-mini-event-count">
                          {monthEventsCount} RDV
                        </span>
                      )}
                    </div>

                    <div className="pro-mini-weekdays-row">
                      {["L", "M", "M", "J", "V", "S", "D"].map((d, di) => (
                        <span key={di} className="pro-mini-wk">{d}</span>
                      ))}
                    </div>

                    <div className="pro-mini-days-grid">
                      {miniDays.map((md, mdi) => {
                        const isThisMonth = isSameMonth(md, miniMonthStart);
                        const hasEv = getEventsForDay(md).length > 0;
                        const isMdToday = isToday(md);

                        return (
                          <div
                            key={mdi}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDay(md);
                              setCurrentDate(md);
                              setView("day");
                            }}
                            className={`pro-mini-day-cell ${!isThisMonth ? "dimmed" : ""} ${
                              isMdToday ? "today" : ""
                            } ${hasEv ? "has-event" : ""}`}
                          >
                            <span>{format(md, "d")}</span>
                            {hasEv && <div className="pro-mini-dot" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VUE 3: SEMAINE */}
        {view === "week" && (
          <div className="pro-calendar-card glass-card" style={{ padding: "16px" }}>
            <div className="pro-week-7-columns">
              {weekDays.map((day, idx) => {
                const dayEvs = getEventsForDay(day);
                const isDayToday = isToday(day);
                const isSelected = isSameDay(day, selectedDay);

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDay(day)}
                    className={`pro-week-col ${isSelected ? "selected" : ""} ${isDayToday ? "today" : ""}`}
                  >
                    <div className="pro-week-col-head">
                      <span className="pro-week-day-name">{format(day, "EEEE", { locale: fr })}</span>
                      <span className={`pro-week-day-num ${isDayToday ? "today-badge" : ""}`}>
                        {format(day, "d MMM", { locale: fr })}
                      </span>
                    </div>

                    <div className="pro-week-col-body">
                      {dayEvs.length === 0 ? (
                        <div className="pro-week-col-empty">Aucun RDV</div>
                      ) : (
                        dayEvs.map((ev) => (
                          <div
                            key={ev.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDay(day);
                              setSelectedEvent(ev);
                              setShowSidePanel(true);
                            }}
                            className={`pro-week-item-card ${selectedEvent?.id === ev.id ? "active" : ""}`}
                          >
                            <div className="pro-week-item-time">
                              <Clock size={11} />
                              {formatTime(ev.startAt)}
                              {ev.endAt ? ` - ${formatTime(ev.endAt)}` : ""}
                            </div>
                            <div className="pro-week-item-title">{ev.title}</div>
                            {ev.location && (
                              <div className="pro-week-item-loc">
                                <MapPin size={10} />
                                <span>{ev.location}</span>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDay(day);
                        setEditingEvent(null);
                        setShowEventForm(true);
                      }}
                      className="pro-week-add-slot-btn"
                    >
                      <Plus size={13} />
                      <span>Ajouter</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VUE 4: JOUR / AGENDA HEURE PAR HEURE */}
        {view === "day" && (
          <div className="pro-calendar-card glass-card" style={{ padding: "24px" }}>
            <div className="pro-day-banner">
              <div>
                <h3 className="pro-day-banner-title">
                  {format(selectedDay, "EEEE d MMMM yyyy", { locale: fr })}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
                  {selectedDayEvents.length} rendez-vous programmés pour cette journée
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingEvent(null);
                  setShowEventForm(true);
                }}
                className="btn btn-primary"
              >
                <Plus size={16} />
                Nouveau créneau
              </button>
            </div>

            {selectedDayEvents.length === 0 ? (
              <div className="pro-empty-box">
                <CalendarIcon size={46} style={{ opacity: 0.3, color: "var(--accent-primary)" }} />
                <h4>Aucun événement ce jour</h4>
                <p>Votre emploi du temps est disponible pour cette date.</p>
                <button
                  onClick={() => {
                    setEditingEvent(null);
                    setShowEventForm(true);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: "14px" }}
                >
                  <Plus size={14} />
                  Programmer un rendez-vous
                </button>
              </div>
            ) : (
              <div className="pro-day-timeline-list">
                {selectedDayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => {
                      setSelectedEvent(ev);
                      setShowSidePanel(true);
                    }}
                    className={`pro-timeline-row ${selectedEvent?.id === ev.id ? "focused" : ""}`}
                  >
                    <div className="pro-timeline-time">
                      <span className="start">{formatTime(ev.startAt)}</span>
                      {ev.endAt && <span className="end">{formatTime(ev.endAt)}</span>}
                    </div>

                    <div className="pro-timeline-connector">
                      <div className="dot" />
                      <div className="line" />
                    </div>

                    <div className="pro-timeline-box">
                      <div className="pro-timeline-head">
                        <div>
                          <h4>{ev.title}</h4>
                          {ev.location && (
                            <div className="loc">
                              <MapPin size={13} color="var(--accent-cyan)" />
                              <span>{ev.location}</span>
                            </div>
                          )}
                        </div>
                        <span className="badge-cat">{getCategoryLabel(ev.category)}</span>
                      </div>

                      {ev.description && <p className="desc">{ev.description}</p>}

                      <div className="pro-timeline-foot">
                        {ev.reminders?.length > 0 && (
                          <div className="reminder-tag">
                            <Bell size={13} />
                            <span>{ev.reminders.length} rappel(s) configuré(s)</span>
                          </div>
                        )}
                        <div className="actions">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingEvent(ev);
                              setShowEventForm(true);
                            }}
                            className="btn-act"
                            title="Modifier"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteEvent(ev.id);
                            }}
                            className="btn-act danger"
                            title="Supprimer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VUE 5: PLANNING GLOBAL / LISTE */}
        {view === "list" && (
          <div className="pro-calendar-card glass-card" style={{ padding: "24px" }}>
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>
                Planning chronologique annuel
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Tous vos rendez-vous triés par ordre chronologique
              </p>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="pro-empty-box">
                <CalendarIcon size={46} style={{ opacity: 0.3 }} />
                <h4>Aucun rendez-vous trouvé</h4>
                <p>Ajustez vos filtres ou créez votre premier événement.</p>
              </div>
            ) : (
              <div className="pro-list-rows-group">
                {filteredEvents
                  .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
                  .map((ev) => {
                    const d = parseISO(ev.startAt);
                    const isEvToday = isToday(d);

                    return (
                      <div
                        key={ev.id}
                        onClick={() => {
                          setSelectedDay(d);
                          setSelectedEvent(ev);
                          setShowSidePanel(true);
                        }}
                        className={`pro-list-card ${selectedEvent?.id === ev.id ? "selected" : ""}`}
                      >
                        <div className="pro-list-date-cube">
                          <span className="d">{format(d, "d")}</span>
                          <span className="m">{format(d, "MMM", { locale: fr })}</span>
                        </div>

                        <div className="pro-list-main-info">
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <h4>{ev.title}</h4>
                            {isEvToday && <span className="today-badge-mini">Aujourd&apos;hui</span>}
                          </div>
                          <div className="meta">
                            <span><Clock size={12} /> {formatTime(ev.startAt)} {ev.endAt ? `→ ${formatTime(ev.endAt)}` : ""}</span>
                            {ev.location && <span><MapPin size={12} /> {ev.location}</span>}
                            <span className="cat-badge">{getCategoryLabel(ev.category)}</span>
                          </div>
                        </div>

                        <div className="pro-list-actions-col">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingEvent(ev);
                              setShowEventForm(true);
                            }}
                            className="btn-act"
                            title="Modifier"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteEvent(ev.id);
                            }}
                            className="btn-act danger"
                            title="Supprimer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* ── VOLET LATÉRAL INSPECTEUR ── */}
        {showSidePanel && (
          <aside className="pro-inspector-drawer">
            <div className="pro-inspector-card glass-card">
              <div className="pro-inspector-top">
                <div>
                  <span className="pro-sub-label">Jour sélectionné</span>
                  <h3 className="pro-inspector-day-title">
                    {format(selectedDay, "EEEE d MMMM yyyy", { locale: fr })}
                  </h3>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => {
                      setEditingEvent(null);
                      setShowEventForm(true);
                    }}
                    className="pro-action-icon-btn primary"
                    title="Ajouter un rendez-vous ce jour"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => setShowSidePanel(false)}
                    className="pro-action-icon-btn"
                    title="Fermer le volet"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Liste des RDV de la journée */}
              <div className="pro-inspector-list">
                {loading ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[1, 2].map((i) => (
                      <div key={i} className="skeleton" style={{ height: "55px", borderRadius: "10px" }} />
                    ))}
                  </div>
                ) : selectedDayEvents.length === 0 ? (
                  <div className="pro-empty-inspector">
                    <CalendarIcon size={26} style={{ opacity: 0.3, marginBottom: "8px" }} />
                    <p>Aucun rendez-vous ce jour</p>
                    <button
                      onClick={() => {
                        setEditingEvent(null);
                        setShowEventForm(true);
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ color: "var(--accent-primary)", marginTop: "6px" }}
                    >
                      + Programmer pour cette date
                    </button>
                  </div>
                ) : (
                  selectedDayEvents.map((ev) => {
                    const isSelected = selectedEvent?.id === ev.id;
                    return (
                      <div
                        key={ev.id}
                        onClick={() => setSelectedEvent(ev)}
                        className={`pro-inspector-event-item ${isSelected ? "active" : ""}`}
                      >
                        <div className="accent-bar" />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p className="t">{ev.title}</p>
                          <div className="sub">
                            <span>{formatTime(ev.startAt)}{ev.endAt ? ` - ${formatTime(ev.endAt)}` : ""}</span>
                            <span>•</span>
                            <span>{getCategoryLabel(ev.category)}</span>
                          </div>
                        </div>
                        <ChevronDown
                          size={15}
                          style={{
                            transform: isSelected ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s",
                            color: "var(--text-muted)",
                          }}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Fiche détail du rendez-vous sélectionné */}
            {selectedEvent && (
              <div className="pro-inspector-card glass-card animate-slide-up" style={{ marginTop: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                  <div>
                    <span className="pro-event-category-badge">
                      {getCategoryLabel(selectedEvent.category)}
                    </span>
                    <h3 className="pro-event-detail-title">{selectedEvent.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="pro-action-icon-btn"
                    title="Fermer le détail"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="pro-detail-fields-stack">
                  <div className="field-row">
                    <Clock size={15} className="f-icon" />
                    <div>
                      <span className="lbl">Horaires</span>
                      <p className="val">
                        {format(parseISO(selectedEvent.startAt), "EEEE d MMMM yyyy", { locale: fr })} à{" "}
                        {formatTime(selectedEvent.startAt)}
                        {selectedEvent.endAt ? ` → ${formatTime(selectedEvent.endAt)}` : ""}
                      </p>
                    </div>
                  </div>

                  {selectedEvent.location && (
                    <div className="field-row">
                      <MapPin size={15} className="f-icon" />
                      <div>
                        <span className="lbl">Lieu</span>
                        <p className="val">{selectedEvent.location}</p>
                      </div>
                    </div>
                  )}

                  {selectedEvent.description && (
                    <div className="field-row">
                      <Info size={15} className="f-icon" />
                      <div>
                        <span className="lbl">Description / Notes</span>
                        <p className="val" style={{ whiteSpace: "pre-line" }}>{selectedEvent.description}</p>
                      </div>
                    </div>
                  )}

                  {selectedEvent.reminders?.length > 0 && (
                    <div className="field-row">
                      <Bell size={15} className="f-icon warning" />
                      <div>
                        <span className="lbl">Rappels programmés</span>
                        <div className="val">
                          {selectedEvent.reminders.map((r, i) => (
                            <div key={r.id || i} style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                              • {format(parseISO(r.fireAt), "d MMM à HH:mm", { locale: fr })} ({r.status})
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pro-detail-bottom-actions">
                  <button
                    onClick={() => {
                      setEditingEvent(selectedEvent);
                      setShowEventForm(true);
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    <Pencil size={14} />
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteEvent(selectedEvent.id)}
                    disabled={deleting === selectedEvent.id}
                    className="btn btn-danger btn-sm"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    <Trash2 size={14} />
                    Supprimer
                  </button>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* ── MODAL FORMULAIRE ── */}
      {showEventForm && (
        <EventFormModal
          onClose={() => {
            setShowEventForm(false);
            setEditingEvent(null);
          }}
          onSaved={() => {
            setShowEventForm(false);
            setEditingEvent(null);
            loadEvents();
          }}
          initialDate={selectedDay}
          eventToEdit={editingEvent ?? undefined}
        />
      )}

      {/* ── STYLES CSS PRO & RESPONSIVE ── */}
      <style>{`
        .pro-calendar-wrapper {
          padding: 24px 32px;
          max-width: 1680px;
          margin: 0 auto;
          min-height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Top Header */
        .pro-cal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .pro-cal-title-block {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .pro-cal-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25));
          border: 1px solid rgba(99, 102, 241, 0.4);
          color: var(--accent-primary-hover);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.25);
        }
        .pro-cal-heading {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .pro-badge-total {
          background: rgba(99, 102, 241, 0.15);
          color: #a5b4fc;
          border: 1px solid rgba(99, 102, 241, 0.35);
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
        }
        .pro-cal-subtext {
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .pro-add-btn {
          padding: 10px 18px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 14px;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* 12 Months Quick Bar */
        .pro-months-bar-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 8px 14px;
          overflow-x: auto;
        }
        .pro-year-selector {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 4px 8px;
          flex-shrink: 0;
        }
        .pro-year-nav-btn {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
        }
        .pro-year-nav-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }
        .pro-year-display {
          font-size: 14px;
          font-weight: 800;
          color: var(--text-primary);
          padding: 0 4px;
        }
        .pro-months-pills-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
          overflow-x: auto;
        }
        .pro-month-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }
        .pro-month-pill:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.06);
        }
        .pro-month-pill.active {
          background: var(--accent-primary);
          color: white;
          font-weight: 700;
          box-shadow: 0 2px 10px rgba(99, 102, 241, 0.4);
        }
        .pro-month-dot-count {
          font-size: 10px;
          font-weight: 800;
          background: rgba(255, 255, 255, 0.25);
          color: white;
          padding: 1px 5px;
          border-radius: 8px;
        }

        /* Toolbar */
        .pro-cal-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 10px 16px;
          border-radius: 16px;
          backdrop-filter: blur(16px);
        }
        .pro-period-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pro-btn-today {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          padding: 6px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }
        .pro-btn-today:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: var(--border-default);
        }
        .pro-arrows-group {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .pro-arrow-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
        }
        .pro-arrow-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }
        .pro-period-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: capitalize;
          margin-left: 6px;
        }
        .pro-view-switcher {
          display: flex;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid var(--border-subtle);
          padding: 3px;
          border-radius: 12px;
          gap: 2px;
        }
        .pro-view-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
        }
        .pro-view-tab:hover {
          color: var(--text-primary);
        }
        .pro-view-tab.active {
          background: var(--accent-primary);
          color: white;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
        }
        .pro-inspector-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }
        .pro-inspector-toggle.active {
          border-color: rgba(99, 102, 241, 0.4);
          color: var(--accent-primary-hover);
          background: rgba(99, 102, 241, 0.1);
        }

        /* Filters */
        .pro-filters-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .pro-search-box {
          position: relative;
          min-width: 280px;
          flex: 1;
          max-width: 380px;
        }
        .pro-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .pro-search-input {
          width: 100%;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 8px 32px 8px 34px;
          font-size: 13px;
          color: var(--text-primary);
        }
        .pro-search-input:focus {
          outline: none;
          border-color: var(--accent-primary);
        }
        .pro-search-clear {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }
        .pro-quick-categories {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
        }
        .pro-cat-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          cursor: pointer;
          white-space: nowrap;
        }
        .pro-cat-pill:hover {
          color: var(--text-primary);
          border-color: var(--border-default);
        }
        .pro-cat-pill.selected {
          background: rgba(99, 102, 241, 0.15);
          border-color: var(--accent-primary);
          color: white;
          font-weight: 600;
        }
        .pro-cat-color-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        /* Layout */
        .pro-cal-grid-layout {
          display: grid;
          gap: 20px;
          align-items: start;
          transition: grid-template-columns 0.25s ease;
        }
        .pro-cal-grid-layout.with-inspector {
          grid-template-columns: minmax(0, 1fr) 360px;
        }
        .pro-cal-grid-layout.no-inspector {
          grid-template-columns: minmax(0, 1fr);
        }

        /* Month View Grid */
        .pro-calendar-card {
          overflow: hidden;
          border-radius: 20px;
        }
        .pro-month-weekdays-row {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          background: rgba(0, 0, 0, 0.35);
          border-bottom: 1px solid var(--border-subtle);
        }
        .pro-weekday-header-cell {
          padding: 12px 6px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .pro-month-days-grid {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          background: var(--border-subtle);
          gap: 1px;
        }
        .pro-day-cell {
          background: var(--bg-surface);
          min-height: 120px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .pro-day-cell:hover {
          background: var(--bg-elevated);
        }
        .pro-day-cell.is-outside-month {
          background: rgba(12, 16, 26, 0.6);
          opacity: 0.4;
        }
        .pro-day-cell.is-selected-cell {
          background: rgba(99, 102, 241, 0.12) !important;
          box-shadow: inset 0 0 0 2px var(--accent-primary);
        }
        .pro-day-cell.is-today-cell {
          background: rgba(99, 102, 241, 0.06);
        }
        .pro-day-cell-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pro-day-number {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .pro-day-number.today-badge {
          background: var(--accent-primary);
          color: white;
          font-weight: 800;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.7);
        }
        .pro-day-event-count-badge {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.08);
          padding: 1px 6px;
          border-radius: 10px;
        }
        .pro-day-events-stack {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        .pro-event-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 6px;
          border-radius: 6px;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          gap: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: all 0.15s;
        }
        .pro-event-tag:hover, .pro-event-tag.focused {
          transform: translateY(-1px);
          filter: brightness(1.2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        .pro-event-tag-time {
          font-size: 10px;
          font-weight: 800;
          opacity: 0.9;
        }
        .pro-event-tag-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .pro-event-more-tag {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-primary-hover);
          padding: 2px 4px;
          cursor: pointer;
        }

        /* Year View (12 Months Grid) */
        .pro-year-container {
          padding: 20px;
        }
        .pro-year-grid-12 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .pro-mini-month-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pro-mini-month-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }
        .pro-mini-month-card.current-m {
          border-color: rgba(99, 102, 241, 0.6);
          background: rgba(99, 102, 241, 0.05);
        }
        .pro-mini-month-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .pro-mini-month-head h4 {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .pro-mini-event-count {
          font-size: 10px;
          font-weight: 700;
          background: rgba(99, 102, 241, 0.2);
          color: var(--accent-primary-hover);
          padding: 2px 6px;
          border-radius: 6px;
        }
        .pro-mini-weekdays-row {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          margin-bottom: 6px;
        }
        .pro-mini-wk {
          font-size: 9px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .pro-mini-days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
        }
        .pro-mini-day-cell {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 10px;
          color: var(--text-secondary);
          position: relative;
          cursor: pointer;
        }
        .pro-mini-day-cell:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        .pro-mini-day-cell.dimmed {
          opacity: 0.25;
        }
        .pro-mini-day-cell.today {
          background: var(--accent-primary);
          color: white;
          font-weight: 800;
        }
        .pro-mini-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #38bdf8;
          position: absolute;
          bottom: 2px;
        }

        /* Week 7-Columns */
        .pro-week-7-columns {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 10px;
        }
        .pro-week-col {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 12px 10px;
          display: flex;
          flex-direction: column;
          min-height: 480px;
          gap: 10px;
        }
        .pro-week-col.selected {
          border-color: var(--accent-primary);
          background: rgba(99, 102, 241, 0.05);
        }
        .pro-week-col.today {
          border-color: rgba(99, 102, 241, 0.4);
        }
        .pro-week-col-head {
          text-align: center;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .pro-week-day-name {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: capitalize;
          display: block;
        }
        .pro-week-day-num {
          font-size: 14px;
          font-weight: 800;
          color: var(--text-primary);
          margin-top: 2px;
          display: inline-block;
          padding: 2px 6px;
          border-radius: 6px;
        }
        .pro-week-day-num.today-badge {
          background: var(--accent-primary);
          color: white;
        }
        .pro-week-col-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pro-week-col-empty {
          font-size: 11px;
          color: var(--text-muted);
          text-align: center;
          padding: 24px 0;
          font-style: italic;
        }
        .pro-week-item-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 8px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .pro-week-item-card:hover, .pro-week-item-card.active {
          border-color: var(--accent-primary);
          transform: translateY(-2px);
        }
        .pro-week-item-time {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-primary-hover);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .pro-week-item-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          margin-top: 2px;
        }
        .pro-week-item-loc {
          font-size: 10px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 3px;
          margin-top: 4px;
        }
        .pro-week-add-slot-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 6px;
          border-radius: 8px;
          background: transparent;
          border: 1px dashed var(--border-subtle);
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }
        .pro-week-add-slot-btn:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: rgba(99, 102, 241, 0.05);
        }

        /* Day Timeline */
        .pro-day-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 18px;
          margin-bottom: 20px;
        }
        .pro-day-banner-title {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
          text-transform: capitalize;
        }
        .pro-empty-box {
          text-align: center;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--text-muted);
        }
        .pro-day-timeline-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .pro-timeline-row {
          display: grid;
          grid-template-columns: 80px 24px 1fr;
          gap: 16px;
          cursor: pointer;
        }
        .pro-timeline-time {
          text-align: right;
        }
        .pro-timeline-time .start {
          display: block;
          font-size: 14px;
          font-weight: 800;
          color: var(--text-primary);
        }
        .pro-timeline-time .end {
          display: block;
          font-size: 11px;
          color: var(--text-muted);
        }
        .pro-timeline-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .pro-timeline-connector .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 8px rgba(99, 102, 241, 0.6);
        }
        .pro-timeline-connector .line {
          flex: 1;
          width: 2px;
          background: var(--border-subtle);
          margin-top: 4px;
        }
        .pro-timeline-box {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 16px;
          transition: all 0.2s;
        }
        .pro-timeline-row:hover .pro-timeline-box, .pro-timeline-row.focused .pro-timeline-box {
          border-color: var(--accent-primary);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }
        .pro-timeline-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }
        .pro-timeline-head h4 {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .pro-timeline-head .loc {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .pro-timeline-head .badge-cat {
          font-size: 10px;
          font-weight: 700;
          background: rgba(99, 102, 241, 0.15);
          color: var(--accent-primary-hover);
          padding: 3px 8px;
          border-radius: 6px;
        }
        .pro-timeline-box .desc {
          font-size: 13px;
          color: var(--text-secondary);
          margin-top: 10px;
          line-height: 1.5;
        }
        .pro-timeline-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
        }
        .reminder-tag {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: #f59e0b;
        }
        .btn-act {
          padding: 6px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-act:hover {
          color: white;
          background: rgba(255, 255, 255, 0.12);
        }
        .btn-act.danger:hover {
          color: #ef4444;
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        /* List Rows */
        .pro-list-rows-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pro-list-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 18px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pro-list-card:hover, .pro-list-card.selected {
          border-color: var(--accent-primary);
          background: var(--bg-elevated);
          transform: translateX(4px);
        }
        .pro-list-date-cube {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 12px;
        }
        .pro-list-date-cube .d {
          font-size: 17px;
          font-weight: 800;
          color: var(--accent-primary-hover);
          line-height: 1;
        }
        .pro-list-date-cube .m {
          font-size: 9px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .pro-list-main-info {
          flex: 1;
          min-width: 0;
        }
        .pro-list-main-info h4 {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .today-badge-mini {
          font-size: 9px;
          font-weight: 800;
          background: #10b981;
          color: white;
          padding: 2px 6px;
          border-radius: 6px;
        }
        .pro-list-main-info .meta {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 4px;
          font-size: 12px;
          color: var(--text-secondary);
          flex-wrap: wrap;
        }
        .pro-list-main-info .meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .pro-list-main-info .cat-badge {
          background: rgba(255, 255, 255, 0.08);
          padding: 1px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
        }
        .pro-list-actions-col {
          display: flex;
          gap: 6px;
        }

        /* Inspector Drawer */
        .pro-inspector-drawer {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .pro-inspector-card {
          padding: 20px;
        }
        .pro-inspector-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .pro-sub-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .pro-inspector-day-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: capitalize;
          margin-top: 2px;
        }
        .pro-action-icon-btn {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
        }
        .pro-action-icon-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.08);
        }
        .pro-action-icon-btn.primary {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }
        .pro-inspector-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pro-empty-inspector {
          text-align: center;
          padding: 24px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--text-muted);
          font-size: 13px;
        }
        .pro-inspector-event-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 10px 12px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .pro-inspector-event-item:hover, .pro-inspector-event-item.active {
          border-color: var(--accent-primary);
          background: var(--bg-elevated);
        }
        .pro-inspector-event-item .accent-bar {
          width: 3px;
          height: 32px;
          border-radius: 2px;
          background: linear-gradient(180deg, var(--accent-primary), #a855f7);
          flex-shrink: 0;
        }
        .pro-inspector-event-item .t {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .pro-inspector-event-item .sub {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* Detail Modal */
        .pro-event-category-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-primary-hover);
          background: rgba(99, 102, 241, 0.15);
          padding: 2px 8px;
          border-radius: 6px;
          margin-bottom: 6px;
        }
        .pro-event-detail-title {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
        }
        .pro-detail-fields-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }
        .field-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .f-icon {
          color: var(--accent-primary);
          margin-top: 2px;
          flex-shrink: 0;
        }
        .f-icon.warning {
          color: #f59e0b;
        }
        .field-row .lbl {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          display: block;
        }
        .field-row .val {
          font-size: 13px;
          color: var(--text-primary);
          margin-top: 2px;
        }
        .pro-detail-bottom-actions {
          display: flex;
          gap: 8px;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .pro-year-grid-12 {
            grid-template-columns: repeat(3, 1fr);
          }
          .pro-cal-grid-layout.with-inspector {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 900px) {
          .pro-year-grid-12 {
            grid-template-columns: repeat(2, 1fr);
          }
          .pro-week-7-columns {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .pro-calendar-wrapper {
            padding: 16px;
          }
          .pro-year-grid-12 {
            grid-template-columns: 1fr;
          }
          .pro-weekday-header-cell {
            font-size: 10px;
            padding: 8px 2px;
          }
          .pro-day-cell {
            min-height: 80px;
            padding: 4px;
          }
          .pro-event-tag {
            font-size: 9px;
            padding: 2px 4px;
          }
          .pro-week-7-columns {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

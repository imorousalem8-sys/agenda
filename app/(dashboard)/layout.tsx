"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Home,
  Clock,
  Calendar,
  CheckSquare,
  Bell,
  Sparkles,
  Users,
  Settings,
  Plus,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Search,
  Sun,
} from "lucide-react";
import EventFormModal from "@/components/forms/EventFormModal";
import "@/components/alarmeagenda-ref.css";

// Menus structurés par catégories logiques limpides
const navigationGroups = [
  {
    title: "PLANIFICATION",
    items: [
      { href: "/dashboard", icon: Home, label: "Tableau de bord" },
      { href: "/today", icon: Clock, label: "Aujourd'hui" },
      { href: "/calendar", icon: Calendar, label: "Mon Agenda" },
    ],
  },
  {
    title: "OUTILS D'ACTION",
    items: [
      { href: "/tasks", icon: CheckSquare, label: "Mes Tâches", badge: "3" },
      { href: "/reminders", icon: Bell, label: "Rappels & Alarmes", badge: "2" },
      { href: "/assistant", icon: Sparkles, label: "Assistant IA Vocal", isAi: true },
    ],
  },
  {
    title: "RÉSEAU & ESPACE",
    items: [
      { href: "/contacts", icon: Users, label: "Contacts" },
    ],
  },
  {
    title: "SYSTÈME & COMPTE",
    items: [
      { href: "/notifications", icon: Bell, label: "Notifications", badge: "3", badgeColor: "bg-red-500" },
      { href: "/settings", icon: Settings, label: "Paramètres" },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showEventModal, setShowEventModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userName = session?.user?.name || "Salem Imorou";

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#050a18] text-white flex flex-col md:flex-row font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* =========================================================================
          1. SIDEBAR DESKTOP STRUCTURÉE, TRANSPARENTE EN BLEU CLAIR / BLEU BLANC
         ========================================================================= */}
      <aside className="hidden md:flex w-72 h-screen sticky top-0 bg-[#060e22]/75 backdrop-blur-2xl border-r border-sky-400/15 flex-col justify-between p-4 shrink-0 z-30 shadow-[4px_0_30px_rgba(2,6,23,0.4)]">
        <div className="overflow-y-auto overflow-x-hidden pr-1">
          {/* Logo AlarmeAgenda avec sous-titre officiel et statut live */}
          <div className="pb-5 pt-1 px-2 border-b border-sky-400/15 mb-4">
            <Link href="/dashboard" className="flex items-center gap-3 no-underline text-white group">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.45)] border border-sky-400/30 flex items-center justify-center bg-[#07132e] shrink-0 group-hover:scale-105 group-hover:border-sky-400/60 transition-all duration-300">
                <Image
                  src="/images/alarmagenda-logo.png"
                  alt="Logo AlarmeAgenda"
                  width={40}
                  height={40}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-base tracking-tight leading-tight text-white group-hover:text-sky-300 transition-colors">
                  Alarme<span className="text-sky-400">Agenda</span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5">
                  Organise. Rappelle. Avance.
                </div>
              </div>
            </Link>

            {/* Indicateur de synchro en ligne */}
            <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-[10px] text-sky-300 font-medium w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Synchro Cloud active</span>
            </div>
          </div>

          {/* Menus bien ordonnés par sections claires */}
          <div className="space-y-4">
            {navigationGroups.map((group) => (
              <div key={group.title}>
                <div className="text-[10px] font-bold tracking-wider text-sky-400/70 uppercase px-3 mb-1.5 flex items-center justify-between">
                  <span>{group.title}</span>
                </div>
                <nav className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href === "/dashboard" && pathname === "/") ||
                      (item.href === "/assistant" && pathname === "/agent");

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 no-underline group ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600/40 to-sky-500/20 text-white font-bold border border-sky-400/40 shadow-[0_4px_18px_rgba(56,189,248,0.2)]"
                            : "text-slate-300 hover:text-white hover:bg-sky-400/10 hover:border-sky-400/20 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            size={16}
                            className={`transition-colors ${
                              isActive
                                ? "text-sky-300"
                                : item.isAi
                                ? "text-sky-400 group-hover:text-sky-300"
                                : "text-slate-400 group-hover:text-slate-200"
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight shrink-0 ${
                              item.badgeColor || (isActive ? "bg-sky-400 text-slate-950" : "bg-sky-500/20 text-sky-200 border border-sky-400/30")
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Profil en bas dans une carte transparente en verre poli */}
        <div className="pt-3 border-t border-sky-400/15">
          <Link
            href="/profile"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-sky-400/15 hover:border-sky-400/30 transition-all no-underline text-inherit group"
            title="Mon profil"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 text-white font-bold text-xs flex items-center justify-center shrink-0 border border-white/20 shadow-[0_0_12px_rgba(56,189,248,0.3)]">
                <span>SI</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate group-hover:text-sky-300 transition-colors">
                  Salem Imorou
                </div>
                <div className="text-[10px] text-sky-300/80 font-medium">
                  Plan Élite
                </div>
              </div>
            </div>
            <ChevronRight size={14} className="text-slate-500 group-hover:text-sky-300 transition-colors" />
          </Link>
        </div>
      </aside>

      {/* =========================================================================
          2. HEADER MOBILE
         ========================================================================= */}
      <header className="md:hidden sticky top-0 z-40 bg-[#070d1e]/95 backdrop-blur-md border-b border-white/[0.08] px-4 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5 no-underline text-white">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Calendar size={16} />
          </div>
          <span className="font-bold text-sm text-white">AlarmeAgenda</span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* =========================================================================
          3. WORKSPACE PRINCIPAL
         ========================================================================= */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Topbar Desktop : Style Transparent Bleu Clair / Bleu Blanc Cristal */}
        <header className="hidden md:flex h-16 border-b border-sky-400/15 bg-[#060e22]/70 backdrop-blur-2xl px-8 items-center justify-between shrink-0 shadow-[0_4px_24px_rgba(2,6,23,0.3)]">
          {/* Barre de recherche avec style cristal */}
          <div className="w-96 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-sky-400/20 text-xs text-slate-300 flex items-center gap-2.5 focus-within:border-sky-400/60 focus-within:bg-white/[0.06] focus-within:shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all">
            <Search size={14} className="text-sky-400/70" />
            <input
              type="text"
              placeholder="Rechercher un rendez-vous, une tâche, un contact... (⌘K)"
              className="bg-transparent border-none outline-none w-full text-white placeholder-slate-400 text-xs"
            />
          </div>

          {/* Outils à droite : Nouveau créneau rapide, Cloche notifications, Date dynamique */}
          <div className="flex items-center gap-3.5 text-xs text-slate-300">
            <button
              onClick={() => setShowEventModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-bold transition-all shadow-[0_2px_14px_rgba(56,189,248,0.3)] hover:scale-[1.02] cursor-pointer"
            >
              <Plus size={14} />
              <span>Nouveau</span>
            </button>

            <button
              type="button"
              className="p-2 rounded-xl hover:bg-sky-400/10 text-slate-400 hover:text-sky-300 border border-transparent hover:border-sky-400/20 transition-colors"
              title="Thème"
            >
              <Sun size={17} />
            </button>

            <Link
              href="/notifications"
              className="relative p-2 rounded-xl hover:bg-sky-400/10 text-slate-400 hover:text-sky-300 border border-transparent hover:border-sky-400/20 transition-colors no-underline"
              title="Notifications"
            >
              <Bell size={17} />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                3
              </span>
            </Link>

            <div className="flex items-center gap-2 pl-3 border-l border-sky-400/20 text-slate-200 font-medium">
              <span className="text-sky-300/90">Mardi 6 octobre 2026</span>
              <Calendar size={14} className="text-sky-400" />
            </div>
          </div>
        </header>

        {/* Contenu de la page */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Modal nouveau créneau */}
      {showEventModal && (
        <EventFormModal
          onClose={() => setShowEventModal(false)}
          onSaved={() => {
            setShowEventModal(false);
            window.dispatchEvent(new CustomEvent("event-updated"));
          }}
        />
      )}
    </div>
  );
}

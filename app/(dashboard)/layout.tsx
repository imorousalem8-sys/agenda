"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

const primaryNav = [
  { href: "/dashboard", icon: Home, label: "Accueil" },
  { href: "/today", icon: Clock, label: "Aujourd'hui" },
  { href: "/calendar", icon: Calendar, label: "Agenda" },
  { href: "/tasks", icon: CheckSquare, label: "Tâches" },
  { href: "/reminders", icon: Bell, label: "Rappels" },
  { href: "/assistant", icon: Sparkles, label: "Assistant IA" },
  { href: "/contacts", icon: Users, label: "Contacts" },
];

const secondaryNav = [
  { href: "/notifications", icon: Bell, label: "Notifications", badge: "3" },
  { href: "/settings", icon: Settings, label: "Paramètres" },
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
    <div className="min-h-screen bg-[#070d1e] text-white flex flex-col md:flex-row font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* =========================================================================
          1. SIDEBAR DESKTOP CONFORME STRICTEMENT À L'IMAGE 2
         ========================================================================= */}
      <aside className="hidden md:flex w-64 h-screen sticky top-0 bg-[#070d1e] border-r border-white/[0.08] flex-col justify-between p-4 shrink-0 z-30">
        <div>
          {/* Logo AlarmeAgenda avec sous-titre officiel Image 2 */}
          <div className="pb-6 pt-2 px-2 border-b border-white/[0.08] mb-4">
            <Link href="/dashboard" className="flex items-center gap-3 no-underline text-white">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                <Calendar size={20} className="stroke-[2.2]" />
              </div>
              <div>
                <div className="font-bold text-base tracking-tight leading-tight text-white">
                  AlarmeAgenda
                </div>
                <div className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5">
                  Organise. Rappelle. Avance.
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Principale Conforme Image 2 */}
          <nav className="space-y-1.5">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href === "/dashboard" && pathname === "/") ||
                (item.href === "/assistant" && pathname === "/agent");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all no-underline ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-[0_4px_15px_rgba(37,99,235,0.4)]"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <Icon size={17} className={isActive ? "text-white" : "text-slate-400"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Séparateur discret Image 2 */}
          <div className="my-5 border-t border-white/[0.08]" />

          {/* Navigation Secondaire Conforme Image 2 */}
          <nav className="space-y-1.5">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all no-underline ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-[0_4px_15px_rgba(37,99,235,0.4)]"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={17} className={isActive ? "text-white" : "text-slate-400"} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profil en bas Conforme Image 2 */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between px-2">
          <Link
            href="/profile"
            className="flex items-center gap-3 min-w-0 no-underline text-inherit group"
            title="Mon profil"
          >
            {/* Avatar Salem Imorou */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-700 to-blue-400 text-white font-bold text-xs flex items-center justify-center shrink-0 border border-white/20 shadow-sm overflow-hidden">
              <span className="text-xs">SI</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                Salem Imorou
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                Plan Free
              </div>
            </div>
          </Link>

          <ChevronRight size={14} className="text-slate-500" />
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
        {/* Topbar Desktop Conforme Image 2 */}
        <header className="hidden md:flex h-16 border-b border-white/[0.08] bg-[#070d1e]/80 backdrop-blur-md px-8 items-center justify-between shrink-0">
          {/* Barre de recherche conforme Image 2 */}
          <div className="w-96 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-slate-300 flex items-center gap-2.5 focus-within:border-blue-500 focus-within:bg-white/[0.07] transition-all">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un rendez-vous, une tâche, un contact..."
              className="bg-transparent border-none outline-none w-full text-white placeholder-slate-400 text-xs"
            />
          </div>

          {/* Outils à droite : Soleil, Cloche badge 3, Date avec icône calendrier */}
          <div className="flex items-center gap-4 text-xs text-slate-300">
            <button
              type="button"
              className="p-2 rounded-xl hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors"
              title="Thème"
            >
              <Sun size={17} />
            </button>

            <Link
              href="/notifications"
              className="relative p-2 rounded-xl hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors no-underline"
              title="Notifications"
            >
              <Bell size={17} />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                3
              </span>
            </Link>

            <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08] text-slate-200 font-medium">
              <span>Mardi 5 octobre 2026</span>
              <Calendar size={14} className="text-slate-400" />
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

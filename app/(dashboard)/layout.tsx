"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Bell,
  Calendar,
  CheckSquare,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
  Volume2,
  Sparkles,
  Moon,
  Sun,
  Settings,
  Globe,
  SlidersHorizontal,
} from "lucide-react";
import AlarmOverlay from "@/components/reminders/AlarmOverlay";
import NotificationManager from "@/components/reminders/NotificationManager";
import AIAssistantWidget from "@/components/ai/AIAssistantWidget";
import QuotaIndicator from "@/components/ai/QuotaIndicator";
import VoiceSettingsModal from "@/components/settings/VoiceSettingsModal";
import PhoneSettingsModal from "@/components/settings/PhoneSettingsModal";
import VoiceConversationModal from "@/components/ai/VoiceConversationModal";
import Logo from "@/components/brand/Logo";
import UpgradeModal from "@/components/subscription/UpgradeModal";
import PaymentSuccessToast from "@/components/subscription/PaymentSuccessToast";
import { useSubscription } from "@/lib/useSubscription";
import "@/components/dashboard/dashboard.css";

const mainNavLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
  { href: "/calendar", icon: Calendar, label: "Agenda synchronisé" },
  { href: "/reminders", icon: Bell, label: "Rappels & Alarmes" },
  { href: "/tasks", icon: CheckSquare, label: "Tâches & Priorités" },
];

const smartToolsLinks = [
  { href: "/agent", icon: Sparkles, label: "Copilote Vocal IA", badge: "Pro" },
  { href: "/contacts", icon: Users, label: "Annuaire Contacts" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showPhoneSettings, setShowPhoneSettings] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showVoiceLiveModal, setShowVoiceLiveModal] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState<string | undefined>();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { isPro } = useSubscription();

  const userName = session?.user?.name || "Salem Imorou";

  // Initialisation du thème depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("alamajonda_theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("alamajonda_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const handleOpenUpgrade = (e: CustomEvent<{ feature?: string }>) => {
      setShowVoiceSettings(false);
      setShowPhoneSettings(false);
      setUpgradeFeature(e.detail?.feature);
      setShowUpgradeModal(true);
    };

    const handleOpenVoiceLive = () => {
      setShowVoiceLiveModal(true);
    };

    window.addEventListener("open-upgrade-modal" as any, handleOpenUpgrade as EventListener);
    window.addEventListener("open-voice-live-modal" as any, handleOpenVoiceLive as EventListener);
    return () => {
      window.removeEventListener("open-upgrade-modal" as any, handleOpenUpgrade as EventListener);
      window.removeEventListener("open-voice-live-modal" as any, handleOpenVoiceLive as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowVoiceSettings(false);
        setShowPhoneSettings(false);
        setShowUpgradeModal(false);
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (showVoiceSettings || showPhoneSettings || showUpgradeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showVoiceSettings, showPhoneSettings, showUpgradeModal]);

  const handleOpenVoiceSettings = () => {
    setShowPhoneSettings(false);
    setShowUpgradeModal(false);
    setShowVoiceSettings(true);
  };

  const handleOpenPhoneSettings = () => {
    setShowVoiceSettings(false);
    setShowUpgradeModal(false);
    setShowPhoneSettings(true);
  };

  const handleOpenAI = () => {
    window.dispatchEvent(new CustomEvent("open-ai-assistant"));
  };

  return (
    <div className="dash-layout">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(3, 7, 18, 0.65)",
            zIndex: 40,
            backdropFilter: "blur(6px)",
          }}
          className="mobile-backdrop"
        />
      )}

      {/* Sidebar Cockpit en Verre Dépoli Bleu-Blanc */}
      <aside className={`dash-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        {/* Brand Header */}
        <div className="dash-sidebar-brand">
          <Link href="/" title="Retourner à la page d'accueil" style={{ textDecoration: "none" }}>
            <Logo size={32} showText={true} />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="btn btn-ghost lg:hidden"
            style={{ padding: "4px", color: "var(--text-muted)" }}
            id="sidebar-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Corps de navigation structuré avec catégories claires */}
        <nav className="dash-sidebar-nav">
          
          {/* Section 1 : Navigation Principale */}
          <div>
            <div className="dash-nav-section-title">
              <span>Navigation Principale</span>
            </div>
            <div className="dash-nav-list">
              {mainNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`dash-nav-link ${isActive ? "is-active" : ""}`}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span className="dash-nav-icon">
                        <Icon size={18} />
                      </span>
                      <span>{link.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section 2 : Outils Intelligents & Vocal */}
          <div>
            <div className="dash-nav-section-title">
              <span>Outils Intelligents</span>
            </div>
            <div className="dash-nav-list">
              {smartToolsLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`dash-nav-link ${isActive ? "is-active" : ""}`}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span className="dash-nav-icon">
                        <Icon size={18} />
                      </span>
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="dash-nav-badge">{link.badge}</span>
                    )}
                  </Link>
                );
              })}

              {/* Bouton Voix & Synthèse IA */}
              <button
                onClick={handleOpenVoiceSettings}
                className="dash-nav-action-btn"
                title="Tester et configurer les voix IA"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className="dash-nav-icon">
                    <Volume2 size={17} />
                  </span>
                  <span>Voix & Synthèse IA</span>
                </div>
              </button>
            </div>
          </div>

          {/* Section 3 : Cockpit & Système */}
          <div>
            <div className="dash-nav-section-title">
              <span>Système & Réglages</span>
            </div>
            <div className="dash-nav-list">
              {/* Paramètres Cockpit */}
              <button
                onClick={handleOpenPhoneSettings}
                className="dash-nav-action-btn"
                title="Paramètres de téléphonie et rappels"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className="dash-nav-icon">
                    <SlidersHorizontal size={17} />
                  </span>
                  <span>Paramètres Cockpit</span>
                </div>
              </button>

              {/* Mode Thème */}
              <button
                onClick={toggleTheme}
                className="dash-nav-action-btn"
                title={theme === "light" ? "Activer le Mode Nuit (Sombre)" : "Activer le Mode Jour (Clair)"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className="dash-nav-icon">
                    {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
                  </span>
                  <span>{theme === "light" ? "Mode Nuit (Sombre)" : "Mode Jour (Clair)"}</span>
                </div>
                <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "6px", background: "rgba(13, 85, 224, 0.08)", fontWeight: 700 }}>
                  {theme === "light" ? "OFF" : "ON"}
                </span>
              </button>

              {/* Retour Site Web */}
              <Link
                href="/"
                className="dash-nav-link"
                title="Retourner à la page d'accueil"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className="dash-nav-icon">
                    <Globe size={17} />
                  </span>
                  <span>Site Vitrine</span>
                </div>
              </Link>
            </div>
          </div>

        </nav>

        {/* Live Quota Indicator dans une carte translucide */}
        <div className="dash-quota-wrap">
          <QuotaIndicator />
        </div>

        {/* Profil Utilisateur Exécutif */}
        <div className="dash-sidebar-user">
          <div className="dash-user-avatar">
            {userName[0]?.toUpperCase() || "S"}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="dash-user-name">
              {userName}
            </div>
            <div className="dash-user-plan">
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
              {isPro ? "Compte Pro Actif" : "Membre Standard"}
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="btn btn-ghost"
            style={{ padding: "6px", color: "var(--text-muted)" }}
            title="Se déconnecter"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dash-main">
        {/* Mobile Topbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 14px",
            borderBottom: "1px solid rgba(13, 85, 224, 0.12)",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(16px)",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
          className="mobile-topbar"
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn btn-ghost"
            style={{ padding: "6px" }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div style={{ marginLeft: "8px" }}>
            <Logo size={24} showText={false} />
          </div>
          <div style={{ flex: 1 }} />
          <button
            onClick={handleOpenAI}
            className="btn btn-primary btn-sm"
            style={{
              padding: "6px 12px",
              gap: "6px",
              fontSize: "12px",
            }}
          >
            <Sparkles size={14} />
            <span>Assistant</span>
          </button>
        </div>

        {children}
      </main>

      {/* Persistent Global Overlays */}
      <PaymentSuccessToast />
      <AlarmOverlay />
      <NotificationManager />
      <AIAssistantWidget />

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        featureName={upgradeFeature}
      />

      {showVoiceSettings && (
        <VoiceSettingsModal onClose={() => setShowVoiceSettings(false)} />
      )}

      {showPhoneSettings && (
        <PhoneSettingsModal onClose={() => setShowPhoneSettings(false)} />
      )}

      <VoiceConversationModal
        isOpen={showVoiceLiveModal}
        onClose={() => setShowVoiceLiveModal(false)}
      />

      <style>{`
        @media (min-width: 1024px) {
          .mobile-topbar { display: none !important; }
          .mobile-backdrop { display: none !important; }
        }
        @media (max-width: 1023px) {
          .mobile-topbar { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

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
  Phone,
  Sparkles,
  UserPlus,
  Moon,
  Sun,
  Settings,
  Globe,
  Home,
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

const navLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
  { href: "/calendar", icon: Calendar, label: "Agenda" },
  { href: "/reminders", icon: Bell, label: "Rappels" },
  { href: "/tasks", icon: CheckSquare, label: "Tâches" },
  { href: "/agent", icon: Sparkles, label: "Assistant IA", badge: "Nouveau" },
  { href: "/contacts", icon: Users, label: "Contacts" },
  { href: "/", icon: Globe, label: "Page d'Accueil" },
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
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-app)" }}>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(11, 21, 46, 0.7)",
            zIndex: 40,
            backdropFilter: "blur(6px)",
          }}
          className="mobile-backdrop"
        />
      )}

      {/* Sidebar (Clean Executive White & Light Modern) */}
      <aside
        style={{
          width: "260px",
          flexShrink: 0,
          background: "var(--bg-sidebar)",
          borderRight: "1px solid var(--border-default)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 45,
          transition: "transform 0.2s ease",
          boxShadow: "var(--shadow-card)",
        }}
        className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: "20px 18px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" title="Retourner à la page d'accueil" style={{ textDecoration: "none" }}>
            <Logo size={32} showText={true} />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="btn btn-ghost"
            style={{ padding: "4px", color: "var(--text-muted)" }}
            id="sidebar-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  marginBottom: "6px",
                  fontSize: "13.5px",
                  fontWeight: isActive ? "700" : "500",
                  color: isActive ? "#1d4ed8" : "var(--text-secondary)",
                  background: isActive ? "#eff6ff" : "transparent",
                  border: isActive ? "1px solid #bfdbfe" : "1px solid transparent",
                  boxShadow: isActive ? "0 2px 8px rgba(29, 78, 216, 0.08)" : "none",
                  transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
                  textDecoration: "none",
                }}
                className={isActive ? "" : "hover:bg-slate-100 hover:text-slate-900"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon
                    size={18}
                    style={{
                      color: isActive ? "#1d4ed8" : "var(--text-muted)",
                      flexShrink: 0,
                    }}
                  />
                  <span>{link.label}</span>
                </div>

                {link.badge && (
                  <span
                    style={{
                      fontSize: "9.5px",
                      fontWeight: "800",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      background: "linear-gradient(135deg, #1d4ed8, #4f46e5)",
                      color: "#ffffff",
                      padding: "2px 7px",
                      borderRadius: "6px",
                      boxShadow: "0 2px 6px rgba(29, 78, 216, 0.25)",
                    }}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div style={{ height: "1px", background: "var(--border-subtle)", margin: "14px 4px" }} />

          {/* Bouton de Thème Nuit / Jour Réel */}
          <button
            onClick={toggleTheme}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              padding: "9px 14px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "500",
              color: "#94a3b8",
              background: "transparent",
              border: "1px solid transparent",
              cursor: "pointer",
              textAlign: "left",
              marginBottom: "4px",
              transition: "all 0.15s ease",
            }}
            className="hover:bg-slate-800/60 hover:text-white hover:border-slate-700/50"
            title={theme === "light" ? "Activer le Mode Nuit (Sombre)" : "Activer le Mode Jour (Clair)"}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {theme === "light" ? <Moon size={17} style={{ color: "#38bdf8" }} /> : <Sun size={17} style={{ color: "#f59e0b" }} />}
              <span>{theme === "light" ? "Mode Nuit (Sombre)" : "Mode Jour (Clair)"}</span>
            </div>
            <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "6px", background: "rgba(255, 255, 255, 0.08)", color: "#cbd5e1" }}>
              {theme === "light" ? "OFF" : "ON"}
            </span>
          </button>

          {/* Voix & Synthèse (Test Homme / Femme) */}
          <button
            onClick={handleOpenVoiceSettings}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 14px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "500",
              color: "#94a3b8",
              background: "transparent",
              border: "1px solid transparent",
              cursor: "pointer",
              textAlign: "left",
              marginBottom: "4px",
              transition: "all 0.15s ease",
            }}
            className="hover:bg-slate-800/60 hover:text-white hover:border-slate-700/50"
          >
            <Volume2 size={17} style={{ color: "#38bdf8" }} />
            <span>Voix & Synthèse IA</span>
          </button>

          <button
            onClick={handleOpenPhoneSettings}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 14px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "500",
              color: "#94a3b8",
              background: "transparent",
              border: "1px solid transparent",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease",
            }}
            className="hover:bg-slate-800/60 hover:text-white hover:border-slate-700/50"
          >
            <Settings size={17} style={{ color: "#818cf8" }} />
            <span>Paramètres Cockpit</span>
          </button>
        </nav>

        {/* Live Quota Indicator */}
        <div style={{ padding: "10px 14px" }}>
          <QuotaIndicator />
        </div>

        {/* User Footer (Clean Executive Profile) */}
        <div
          style={{
            padding: "14px",
            borderTop: "1px solid var(--border-default)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "var(--bg-secondary)",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "800",
              fontSize: "14px",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(29, 78, 216, 0.25)",
            }}
          >
            {userName[0]?.toUpperCase() || "S"}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {userName}
            </div>
            <div style={{ fontSize: "11px", color: "#1d4ed8", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
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

      {/* Main Content Area (No overlapping headers!) */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflowY: "auto" }}>
        {/* Mobile Topbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 14px",
            borderBottom: "1px solid var(--border-subtle)",
            background: "var(--bg-sidebar)",
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
        @media (min-width: 769px) {
          .mobile-topbar { display: none !important; }
          .mobile-backdrop { display: none !important; }
        }
        @media (max-width: 768px) {
          .mobile-topbar { display: flex !important; }
          .sidebar {
            position: fixed !important;
            transform: translateX(-100%);
          }
          .sidebar-open {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </div>
  );
}

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
  Search,
  Moon,
  Settings,
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
  { href: "/", icon: LayoutDashboard, label: "Accueil" },
  { href: "/calendar", icon: Calendar, label: "Agenda" },
  { href: "/reminders", icon: Bell, label: "Rappels" },
  { href: "/tasks", icon: CheckSquare, label: "Tâches" },
  { href: "/agent", icon: Sparkles, label: "Assistant IA", badge: "Nouveau" },
  { href: "/contacts", icon: Users, label: "Contacts" },
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
  const [searchQuery, setSearchQuery] = useState("");
  const { isPro } = useSubscription();
  const isDemoUser = session?.user?.email === "demo@alarmagenda.fr";

  const userName = session?.user?.name || "Salem Imorou";

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

  const handleExitDemoAndRegister = async () => {
    await signOut({ redirect: false });
    window.location.href = "/register";
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
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

      {/* Sidebar (Midnight Navy #0b152e) */}
      <aside
        style={{
          width: "250px",
          flexShrink: 0,
          background: "#0b152e",
          borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 45,
          transition: "transform 0.2s ease",
        }}
        className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: "22px 18px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo size={28} showText={true} />
          <button
            onClick={() => setSidebarOpen(false)}
            className="btn btn-ghost"
            style={{ padding: "4px", color: "#94a3b8" }}
            id="sidebar-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: "14px 12px", overflowY: "auto" }}>
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
                  borderRadius: "10px",
                  marginBottom: "4px",
                  fontSize: "13.5px",
                  fontWeight: isActive ? "700" : "500",
                  color: "#ffffff",
                  background: isActive ? "#2563eb" : "transparent",
                  boxShadow: isActive ? "0 4px 16px rgba(37, 99, 235, 0.4)" : "none",
                  transition: "all 0.15s ease",
                  textDecoration: "none",
                }}
                className={isActive ? "" : "hover:bg-slate-800/60"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon
                    size={18}
                    style={{
                      color: isActive ? "#ffffff" : "#94a3b8",
                      flexShrink: 0,
                    }}
                  />
                  <span>{link.label}</span>
                </div>

                {link.badge && (
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "700",
                      background: "#38bdf8",
                      color: "#0f172a",
                      padding: "2px 6px",
                      borderRadius: "6px",
                    }}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.08)", margin: "14px 4px" }} />

          {/* Paramètres & Voix */}
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
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
            className="hover:bg-slate-800/60 hover:text-white"
          >
            <Volume2 size={17} style={{ color: "#94a3b8" }} />
            <span>Voix & Synthèse</span>
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
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
            className="hover:bg-slate-800/60 hover:text-white"
          >
            <Settings size={17} style={{ color: "#94a3b8" }} />
            <span>Paramètres</span>
          </button>
        </nav>

        {/* Live Quota Indicator */}
        <div style={{ padding: "10px 14px" }}>
          <QuotaIndicator />
        </div>

        {/* User Footer (Salem Imorou / Compte Gratuit) */}
        <div
          style={{
            padding: "14px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "9px",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "13px",
              flexShrink: 0,
            }}
          >
            {userName[0]?.toUpperCase() || "S"}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {userName}
            </div>
            <div style={{ fontSize: "11px", color: isPro ? "#10b981" : "#94a3b8", fontWeight: "500" }}>
              {isPro ? "✓ Compte Pro" : "Utilisateur"}
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="btn btn-ghost"
            style={{ padding: "6px", color: "#94a3b8" }}
            title="Se déconnecter"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: "#f8fafc" }}>
        {/* Top Header Bar with Global Search & Quick Actions */}
        <header
          style={{
            height: "64px",
            background: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 36px",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          {/* Global Search Input */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, maxWidth: "480px" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#f1f5f9",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "8px 14px",
              }}
            >
              <Search size={16} style={{ color: "#94a3b8" }} />
              <input
                type="text"
                placeholder="Rechercher un rendez-vous, une tâche, un contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "13px",
                  color: "#0f172a",
                  width: "100%",
                }}
              />
            </div>
          </div>

          {/* Right Controls (Bell, Moon, Profile) */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => (window.location.href = "/reminders")}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "9px",
                background: "#f1f5f9",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                cursor: "pointer",
                position: "relative",
              }}
              title="Notifications"
            >
              <Bell size={16} />
              <span style={{ position: "absolute", top: "7px", right: "7px", width: "6px", height: "6px", background: "#ef4444", borderRadius: "50%" }} />
            </button>

            <button
              onClick={handleOpenVoiceSettings}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "9px",
                background: "#f1f5f9",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                cursor: "pointer",
              }}
              title="Paramètres de voix"
            >
              <Moon size={16} />
            </button>

            {/* Profile Avatar Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "4px 10px 4px 4px",
                borderRadius: "20px",
                background: "#f1f5f9",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                {userName[0]?.toUpperCase() || "S"}
              </div>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>{userName}</span>
            </div>
          </div>
        </header>

        {children}
      </div>

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

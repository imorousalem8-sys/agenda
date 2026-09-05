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
  Crown,
  Sparkles,
  UserPlus,
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
  { href: "/", icon: LayoutDashboard, label: "Tableau de bord" },
  { href: "/agent", icon: Sparkles, label: "Assistant & Copilote IA" },
  { href: "/calendar", icon: Calendar, label: "Agenda & Calendrier" },
  { href: "/reminders", icon: Bell, label: "Rappels & Alarmes Vocales" },
  { href: "/tasks", icon: CheckSquare, label: "Tâches & Priorités" },
  { href: "/contacts", icon: Users, label: "Contacts & Répertoire" },
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
  const { isPro } = useSubscription();
  const isDemoUser = session?.user?.email === "demo@alarmagenda.fr";

  // Listen to open-upgrade-modal & open-voice-live-modal events
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

  // Global Escape key listener to close modals
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

  // Prevent background scroll when any modal is active
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
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-app)" }}>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            zIndex: 40,
            backdropFilter: "blur(6px)",
          }}
          className="mobile-backdrop"
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          flexShrink: 0,
          background: "var(--bg-sidebar)",
          borderRight: "1px solid var(--border-subtle)",
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
            padding: "20px 18px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo size={28} showText={true} />
          <button
            onClick={() => setSidebarOpen(false)}
            className="btn btn-ghost"
            style={{ padding: "4px", color: "var(--text-muted)" }}
            id="sidebar-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick AI Launch Button */}
        <div style={{ padding: "14px 14px 6px" }}>
          <button
            onClick={handleOpenAI}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "10px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-strong)",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            className="hover:border-slate-500"
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                boxShadow: "0 0 12px rgba(37, 99, 235, 0.3)",
              }}
            >
              <Sparkles size={16} />
            </div>
            <div style={{ textAlign: "left", flex: 1 }}>
              <div style={{ color: "#f8fafc" }}>Assistant IA</div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: "500" }}>Commandes & Voix</div>
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: "10px 12px", overflowY: "auto" }}>
          <div
            style={{
              fontSize: "10px",
              fontWeight: "700",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              padding: "6px 12px",
              marginBottom: "4px",
            }}
          >
            Plateforme
          </div>

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
                  gap: "12px",
                  padding: "9px 12px",
                  borderRadius: "8px",
                  marginBottom: "3px",
                  fontSize: "13px",
                  fontWeight: isActive ? "600" : "500",
                  color: isActive ? "#ffffff" : "var(--text-secondary)",
                  background: isActive ? "rgba(255, 255, 255, 0.06)" : "transparent",
                  border: isActive ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid transparent",
                  transition: "all 0.15s ease",
                  textDecoration: "none",
                }}
                className={isActive ? "nav-link-active" : "hover:bg-slate-800/40"}
              >
                <Icon
                  size={17}
                  style={{
                    color: isActive ? "#38bdf8" : "var(--text-muted)",
                    flexShrink: 0,
                  }}
                />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div
            style={{
              fontSize: "10px",
              fontWeight: "700",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              padding: "14px 12px 6px",
            }}
          >
            Paramètres
          </div>

          <button
            onClick={handleOpenVoiceSettings}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "500",
              color: "var(--text-secondary)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
            className="hover:bg-slate-800/40"
          >
            <Volume2 size={17} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <span>Voix & Synthèse</span>
          </button>

          <button
            onClick={handleOpenPhoneSettings}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "500",
              color: "var(--text-secondary)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
            className="hover:bg-slate-800/40"
          >
            <Phone size={17} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <span>Téléphonie & Alertes</span>
          </button>
        </nav>

        {/* Live Quota Indicator Box */}
        <div style={{ padding: "10px 14px" }}>
          <QuotaIndicator />
        </div>

        {/* User Footer */}
        <div
          style={{
            padding: "12px 14px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #1e293b, #334155)",
              border: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "13px",
              color: "#ffffff",
              flexShrink: 0,
            }}
          >
            {session?.user?.name ? session.user.name[0].toUpperCase() : "U"}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#f8fafc", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {session?.user?.name || "Utilisateur"}
            </div>
            <div style={{ fontSize: "11px", color: isPro ? "#10b981" : "var(--text-muted)", fontWeight: isPro ? "600" : "500" }}>
              {isPro ? "✓ Compte Pro" : "Compte Gratuit"}
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
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Demo banner if active */}
        {isDemoUser && (
          <div
            style={{
              background: "#111827",
              borderBottom: "1px solid var(--border-subtle)",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              fontSize: "12px",
              zIndex: 25,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ background: "#f59e0b", color: "#000000", fontWeight: "800", padding: "2px 7px", borderRadius: "4px", fontSize: "10px" }}>
                MODE DÉMO
              </span>
              <span style={{ color: "#94a3b8" }}>
                Vous naviguez sur le compte d&apos;évaluation.
              </span>
            </div>
            <button
              onClick={handleExitDemoAndRegister}
              className="btn btn-primary btn-sm"
              style={{ padding: "4px 10px", fontSize: "11px", fontWeight: "600" }}
            >
              <UserPlus size={12} />
              <span>Créer mon compte</span>
            </button>
          </div>
        )}

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

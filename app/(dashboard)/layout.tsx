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
  Briefcase,
  User,
  Volume2,
  Sparkles,
  Phone,
  Crown,
  Bot,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import AlarmOverlay from "@/components/reminders/AlarmOverlay";
import NotificationManager from "@/components/reminders/NotificationManager";
import AIAssistantWidget from "@/components/ai/AIAssistantWidget";
import VoiceSettingsModal from "@/components/settings/VoiceSettingsModal";
import PhoneSettingsModal from "@/components/settings/PhoneSettingsModal";
import Logo from "@/components/brand/Logo";
import UpgradeModal from "@/components/subscription/UpgradeModal";
import { useSubscription } from "@/lib/useSubscription";

const navLinks = [
  { href: "/", icon: LayoutDashboard, label: "Tableau de bord" },
  { href: "/agent", icon: Bot, label: "Agent & Discussion Vocale" },
  { href: "/calendar", icon: Calendar, label: "Calendrier" },
  { href: "/reminders", icon: Bell, label: "Rappels & Alarmes" },
  { href: "/tasks", icon: CheckSquare, label: "Tâches" },
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
  const [mode, setMode] = useState<"PERSONAL" | "PROFESSIONAL">("PERSONAL");
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showPhoneSettings, setShowPhoneSettings] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState("cette fonctionnalité");

  const { subscription, isPro } = useSubscription();

  const isDemoUser = session?.user?.email === "demo@alarmagenda.ai";

  useEffect(() => {
    const saved = localStorage.getItem("aa-mode") as "PERSONAL" | "PROFESSIONAL" | null;
    if (saved) setMode(saved);

    const handleOpenUpgrade = (e: Event) => {
      const customEvent = e as CustomEvent<{ feature?: string }>;
      setUpgradeFeature(customEvent.detail?.feature || "cette option");
      setShowUpgradeModal(true);
    };

    window.addEventListener("open-upgrade-modal", handleOpenUpgrade);
    return () => window.removeEventListener("open-upgrade-modal", handleOpenUpgrade);
  }, []);

  const toggleMode = (newMode: "PERSONAL" | "PROFESSIONAL") => {
    if (newMode === "PROFESSIONAL" && !isPro) {
      setUpgradeFeature("l'espace Professionnel étanche");
      setShowUpgradeModal(true);
      return;
    }

    setMode(newMode);
    localStorage.setItem("aa-mode", newMode);
    window.dispatchEvent(new CustomEvent("mode-changed", { detail: newMode }));
  };

  const handleOpenAI = () => {
    window.dispatchEvent(new Event("open-ai-assistant"));
  };

  const handleExitDemoAndRegister = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0b0f19", color: "#f8fafc" }}>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 39,
          }}
          className="mobile-backdrop"
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Brand Logo */}
        <div style={{ marginBottom: "28px" }}>
          <Link
            href="/"
            style={{ textDecoration: "none", display: "inline-block" }}
            onClick={() => setSidebarOpen(false)}
          >
            <Logo size={36} animated={true} />
          </Link>
        </div>

        {/* Demo Account Badge & Exit Button inside sidebar */}
        {isDemoUser && (
          <div
            style={{
              marginBottom: "16px",
              padding: "12px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(239, 68, 68, 0.15))",
              border: "1px solid rgba(245, 158, 11, 0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              <Sparkles size={14} color="#f59e0b" />
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#fbbf24", textTransform: "uppercase" }}>
                Mode Démo Actif
              </span>
            </div>
            <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "8px", lineHeight: 1.4 }}>
              Vous testez AlarmAgenda en mode aperçu.
            </p>
            <button
              onClick={handleExitDemoAndRegister}
              className="btn btn-primary btn-sm"
              style={{
                width: "100%",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: "800",
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                gap: "5px",
              }}
              id="sidebar-create-real-account-btn"
            >
              <UserPlus size={13} />
              <span>Créer mon compte</span>
            </button>
          </div>
        )}

        {/* AI Copilot Quick Launcher Button */}
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={handleOpenAI}
            className="btn btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              gap: "8px",
              padding: "11px 14px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #06b6d4 0%, #6366f1 50%, #a855f7 100%)",
              boxShadow: "0 4px 18px rgba(99, 102, 241, 0.4)",
              fontSize: "13px",
              fontWeight: "700",
            }}
            id="sidebar-ai-btn"
          >
            <Sparkles size={16} />
            <span>Copilote Vocal</span>
          </button>
        </div>

        {/* Mode toggle */}
        <div style={{ marginBottom: "20px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: "700",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "8px",
            }}
          >
            Espace actif
          </p>
          <div className="mode-toggle">
            <button
              onClick={() => toggleMode("PERSONAL")}
              className={`mode-toggle-btn ${mode === "PERSONAL" ? "active" : ""}`}
              id="mode-personal"
            >
              <User size={12} style={{ display: "inline", marginRight: "4px" }} />
              Personnel
            </button>
            <button
              onClick={() => toggleMode("PROFESSIONAL")}
              className={`mode-toggle-btn ${mode === "PROFESSIONAL" ? "active" : ""}`}
              id="mode-professional"
            >
              <Briefcase size={12} style={{ display: "inline", marginRight: "4px" }} />
              Professionnel
            </button>
          </div>
        </div>

        {/* Main Navigation */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: "700",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "8px",
            }}
          >
            Menu
          </p>
          {navLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`sidebar-link ${pathname === href ? "active" : ""}`}
              id={`nav-${href.replace("/", "") || "home"}`}
            >
              <Icon size={17} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Subscription Status Card */}
        <div
          style={{
            marginTop: "16px",
            marginBottom: "8px",
            padding: "12px",
            borderRadius: "14px",
            background: isPro
              ? "linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.2))"
              : "rgba(255, 255, 255, 0.04)",
            border: isPro
              ? "1px solid rgba(99, 102, 241, 0.5)"
              : "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {isPro ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Crown size={18} color="#f59e0b" />
              <div>
                <div style={{ fontSize: "12px", fontWeight: "800", color: "#ffffff" }}>
                  MEMBRE PRO ⭐
                </div>
                <div style={{ fontSize: "11px", color: "#34d399" }}>
                  Toutes les options débloquées
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Plan Gratuit
                </span>
              </div>
              <button
                onClick={() => {
                  setUpgradeFeature("l'accès illimité & alarmes vocales");
                  setShowUpgradeModal(true);
                }}
                className="btn btn-primary btn-sm"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "6px 10px",
                  fontSize: "11px",
                  fontWeight: "800",
                  background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)",
                }}
              >
                Passer en Pro (9,99 €)
              </button>
            </div>
          )}
        </div>

        {/* System Settings & Logout */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "14px",
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <button
            onClick={() => setShowVoiceSettings(true)}
            className="sidebar-link btn-ghost"
            style={{ width: "100%", textAlign: "left", color: "#818cf8", cursor: "pointer" }}
            id="voice-settings-btn"
          >
            <Volume2 size={16} />
            <span>Voix & Synthèse Vocale</span>
          </button>
          <button
            onClick={() => setShowPhoneSettings(true)}
            className="sidebar-link btn-ghost"
            style={{ width: "100%", textAlign: "left", color: "#34d399", cursor: "pointer" }}
            id="phone-settings-btn"
          >
            <Phone size={16} />
            <span>Alertes Téléphone</span>
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="sidebar-link btn-ghost"
            style={{ width: "100%", textAlign: "left", color: "#94a3b8", cursor: "pointer" }}
            id="logout-btn"
          >
            <LogOut size={16} />
            <span>{isDemoUser ? "Quitter la Démo" : "Déconnexion"}</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="main-content">
        {/* Top Demo Banner across all pages when in demo mode */}
        {isDemoUser && (
          <div
            style={{
              background: "linear-gradient(90deg, #1e1b4b, #31104b, #1e1b4b)",
              borderBottom: "1px solid rgba(168, 85, 247, 0.4)",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              flexWrap: "wrap",
              fontSize: "12px",
              zIndex: 25,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ background: "#f59e0b", color: "#000000", fontWeight: "900", padding: "2px 7px", borderRadius: "6px", fontSize: "10px" }}>
                MODE DÉMO
              </span>
              <span style={{ color: "#e2e8f0" }}>
                Vous naviguez sur le compte d&apos;évaluation. Vos données de test ne sont pas sauvegardées.
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={handleExitDemoAndRegister}
                className="btn btn-primary btn-sm"
                style={{
                  padding: "5px 12px",
                  fontSize: "11px",
                  fontWeight: "800",
                  background: "linear-gradient(135deg, #10b981, #06b6d4)",
                  gap: "4px",
                }}
                id="banner-create-account-btn"
              >
                <UserPlus size={12} />
                <span>Créer mon compte</span>
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="btn btn-ghost btn-sm"
                style={{ padding: "5px 10px", fontSize: "11px", color: "var(--text-muted)" }}
                id="banner-exit-demo-btn"
              >
                <span>Quitter</span>
              </button>
            </div>
          </div>
        )}

        {/* Mobile Topbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 14px",
            borderBottom: "1px solid var(--border-subtle)",
            background: "#0f1422",
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
            id="mobile-menu-btn"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div style={{ marginLeft: "8px" }}>
            <Logo size={26} showText={false} />
          </div>
          <div style={{ flex: 1 }} />
          {isDemoUser ? (
            <button
              onClick={handleExitDemoAndRegister}
              className="btn btn-primary btn-sm"
              style={{
                padding: "6px 10px",
                fontSize: "11px",
                fontWeight: "800",
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                gap: "4px",
              }}
              id="mobile-create-account-btn"
            >
              <UserPlus size={12} />
              <span>Créer compte</span>
            </button>
          ) : (
            <button
              onClick={handleOpenAI}
              className="btn btn-primary btn-sm"
              style={{
                padding: "6px 10px",
                gap: "5px",
                fontSize: "12px",
                background: "linear-gradient(135deg, #06b6d4, #6366f1)",
              }}
            >
              <Bot size={14} />
              <span>Assistant</span>
            </button>
          )}
        </div>

        {children}
      </div>

      {/* Overlays */}
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

      <style>{`
        @media (min-width: 769px) {
          .mobile-topbar { display: none !important; }
          .mobile-backdrop { display: none !important; }
        }
        @media (max-width: 768px) {
          .mobile-topbar { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

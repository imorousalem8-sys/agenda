"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
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
  Phone,
  Sparkles,
  Bot,
} from "lucide-react";
import AlarmOverlay from "@/components/reminders/AlarmOverlay";
import NotificationManager from "@/components/reminders/NotificationManager";
import AIAssistantWidget from "@/components/ai/AIAssistantWidget";
import VoiceSettingsModal from "@/components/settings/VoiceSettingsModal";
import PhoneSettingsModal from "@/components/settings/PhoneSettingsModal";
import Logo from "@/components/brand/Logo";

const navLinks = [
  { href: "/", icon: LayoutDashboard, label: "Tableau de bord" },
  { href: "/agent", icon: Bot, label: "Agent & Discussion IA" },
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mode, setMode] = useState<"PERSONAL" | "PROFESSIONAL">("PERSONAL");
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showPhoneSettings, setShowPhoneSettings] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("aa-mode") as "PERSONAL" | "PROFESSIONAL" | null;
    if (saved) setMode(saved);
  }, []);

  const toggleMode = (newMode: "PERSONAL" | "PROFESSIONAL") => {
    setMode(newMode);
    localStorage.setItem("aa-mode", newMode);
    window.dispatchEvent(new CustomEvent("mode-changed", { detail: newMode }));
  };

  const handleOpenAI = () => {
    window.dispatchEvent(new Event("open-ai-assistant"));
  };

  return (
    <>
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
            <span>Copilote IA & Voix</span>
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
            <span>Voix & Synthèse IA</span>
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
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="main-content">
        {/* Mobile Topbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 16px",
            borderBottom: "1px solid var(--border-subtle)",
            background: "rgba(12, 16, 26, 0.95)",
            backdropFilter: "blur(12px)",
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
            <Logo size={28} showText={false} />
          </div>
          <div style={{ flex: 1 }} />
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
            <span>IA</span>
          </button>
        </div>

        {children}
      </div>

      {/* Overlays */}
      <AlarmOverlay />
      <NotificationManager />
      <AIAssistantWidget />

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
    </>
  );
}

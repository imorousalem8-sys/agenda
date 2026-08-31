"use client";

import { useState, useEffect } from "react";
import { X, Phone, Smartphone, Monitor, Check, Loader2, PhoneCall, Info } from "lucide-react";

interface PhoneSettingsModalProps {
  onClose: () => void;
}

export default function PhoneSettingsModal({ onClose }: PhoneSettingsModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [defaultChannel, setDefaultChannel] = useState<"PC" | "PHONE_CALL" | "MOBILE_PUSH">("PC");
  const [calling, setCalling] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    const savedPhone = localStorage.getItem("aa-user-phone") || "";
    const savedChannel = (localStorage.getItem("aa-default-channel") as "PC" | "PHONE_CALL" | "MOBILE_PUSH") || "PC";
    setPhoneNumber(savedPhone);
    setDefaultChannel(savedChannel);
  }, []);

  const handleSave = () => {
    localStorage.setItem("aa-user-phone", phoneNumber);
    localStorage.setItem("aa-default-channel", defaultChannel);
    window.dispatchEvent(new Event("phone-settings-changed"));
    onClose();
  };

  const handleTestCall = async () => {
    if (!phoneNumber.trim()) {
      alert("Veuillez renseigner votre numéro de téléphone d'abord.");
      return;
    }

    setCalling(true);
    setTestResult(null);

    try {
      const res = await fetch("/api/telephony/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneNumber,
          title: "Test de rappel téléphonique AlarmAgenda",
          notes: "Votre système d'alerte vocale sur mobile est parfaitement configuré.",
        }),
      });

      const data = await res.json();
      if (data.message) {
        setTestResult(data.message);
      }
    } catch {
      setTestResult("Erreur lors du test d'appel.");
    }
    setCalling(false);
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5, 8, 18, 0.85)",
        backdropFilter: "blur(12px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal animate-scale-in"
        style={{
          maxWidth: "540px",
          background: "#0f172a",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "20px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
          overflow: "hidden",
        }}
      >

        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #10b981, #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Phone size={18} color="white" />
            </div>
            <div>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "var(--text-primary)" }}>
                Routage Téléphone & Mobile
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Recevez vos rappels sur votre smartphone même avec le PC fermé
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: "6px" }} id="phone-modal-close">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Phone input */}
          <div className="form-group">
            <label className="form-label">
              <Phone size={13} style={{ display: "inline", marginRight: "4px" }} />
              Votre Numéro de Téléphone Mobile
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+33 6 12 34 56 78"
                className="form-input"
                id="user-phone-input"
              />
              <button
                type="button"
                onClick={handleTestCall}
                disabled={calling || !phoneNumber.trim()}
                className="btn btn-secondary"
                style={{ flexShrink: 0, gap: "6px" }}
                id="test-phone-call-btn"
              >
                {calling ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <PhoneCall size={14} color="var(--accent-primary)" />}
                Tester l&apos;appel
              </button>
            </div>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
              Format international recommandé (+33 pour la France, +32 pour la Belgique...)
            </p>
          </div>

          {testResult && (
            <div
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "12px",
                padding: "12px",
                fontSize: "12px",
                color: "#10b981",
                lineHeight: "1.4",
              }}
            >
              <Info size={14} style={{ display: "inline", marginRight: "6px" }} />
              {testResult}
            </div>
          )}

          {/* Destination channel */}
          <div>
            <label className="form-label" style={{ marginBottom: "8px" }}>
              Canal de Réception par Défaut
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                {
                  id: "PC",
                  icon: Monitor,
                  title: "💻 Sur cet ordinateur",
                  desc: "Alerte vocale et affichage immédiat dans le navigateur web.",
                },
                {
                  id: "MOBILE_PUSH",
                  icon: Smartphone,
                  title: "📱 Sur mon smartphone (Notification PWA)",
                  desc: "Fait sonner votre téléphone portable via le Service Worker.",
                },
                {
                  id: "PHONE_CALL",
                  icon: PhoneCall,
                  title: "📞 Appel sur mon numéro de mobile",
                  desc: "Vous appelle directement sur votre ligne GSM avec le message de l'IA.",
                },
              ].map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => setDefaultChannel(channel.id as "PC" | "PHONE_CALL" | "MOBILE_PUSH")}
                  className="card"
                  style={{
                    padding: "12px 14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    border: defaultChannel === channel.id ? "1.5px solid var(--accent-primary)" : "1px solid var(--border-default)",
                    background: defaultChannel === channel.id ? "rgba(99, 102, 241, 0.12)" : "var(--bg-card)",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "13px", fontWeight: "700", color: defaultChannel === channel.id ? "var(--accent-primary)" : "var(--text-primary)" }}>
                      {channel.title}
                    </p>
                    <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                      {channel.desc}
                    </p>
                  </div>
                  {defaultChannel === channel.id && <Check size={16} color="var(--accent-primary)" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Annuler
          </button>
          <button type="button" onClick={handleSave} className="btn btn-primary" id="save-phone-settings">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

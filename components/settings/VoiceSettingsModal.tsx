"use client";

import { useState, useEffect } from "react";
import { X, Volume2, Sparkles, User, Check, Play, Settings, Radio, Mic, Activity, Zap, PhoneCall } from "lucide-react";
import {
  type VoiceGender,
  type AlertMode,
  getStoredVoiceSettings,
  saveVoiceSettings,
  speakAIText,
  playAlertChime,
} from "@/lib/voice";

interface VoiceSettingsModalProps {
  onClose: () => void;
}

export default function VoiceSettingsModal({ onClose }: VoiceSettingsModalProps) {
  const [gender, setGender] = useState<VoiceGender>("FEMALE");
  const [alertMode, setAlertMode] = useState<AlertMode>("DIRECT_VOICE");
  const [rate, setRate] = useState<number>(1.0);
  const [playingGender, setPlayingGender] = useState<VoiceGender | null>(null);

  useEffect(() => {
    const s = getStoredVoiceSettings();
    setGender(s.gender);
    setAlertMode(s.alertMode);
    setRate(s.rate);
  }, []);

  const handleSave = () => {
    saveVoiceSettings({ gender, alertMode, rate });
    onClose();
  };

  const handleTestVoice = async (selectedGender: VoiceGender) => {
    setPlayingGender(selectedGender);
    await playAlertChime();

    const sampleText =
      selectedGender === "FEMALE"
        ? "Bonjour ! Je suis votre assistante vocale Alamajonda. À l'heure exacte de vos rendez-vous et de vos tâches, je vous énoncerai directement vos consignes à voix haute."
        : "Bonjour ! Je suis votre assistant vocal Alamajonda. Je me charge d'annoncer avec précision tous vos rendez-vous, alarmes et priorités du jour.";

    speakAIText(sampleText, {
      gender: selectedGender,
      onEnd: () => setPlayingGender(null),
      onError: () => setPlayingGender(null),
    });
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5, 10, 26, 0.85)",
        backdropFilter: "blur(14px)",
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
          maxWidth: "560px",
          width: "100%",
          background: "linear-gradient(180deg, #0d1b3e 0%, #09132b 100%)",
          border: "1px solid rgba(59, 130, 246, 0.35)",
          borderRadius: "22px",
          boxShadow: "0 30px 70px rgba(0, 0, 0, 0.9), 0 0 35px rgba(37, 99, 235, 0.25)",
          overflow: "hidden",
          color: "#ffffff",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            background: "rgba(13, 27, 62, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #2563eb, #38bdf8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(56, 189, 248, 0.4)",
              }}
            >
              <Volume2 size={20} color="white" />
            </div>
            <div>
              <h2 style={{ fontSize: "17px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.01em" }}>
                Synthèse Vocale & Alertes IA
              </h2>
              <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                Personnalisez la voix de votre copilote et le mode d&apos;annonce
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: "6px", color: "#94a3b8" }}
            id="voice-modal-close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            overflowY: "auto",
            maxHeight: "calc(85vh - 150px)",
          }}
        >
          {/* Voice Gender Selection */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <label style={{ fontSize: "13px", fontWeight: "700", color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Choix de la Voix IA
              </label>
              <span style={{ fontSize: "11px", color: "#38bdf8", fontWeight: "600" }}>Français (FR)</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {/* Female Voice Card */}
              <div
                onClick={() => {
                  setGender("FEMALE");
                  saveVoiceSettings({ gender: "FEMALE" });
                }}
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  border: gender === "FEMALE" ? "2px solid #38bdf8" : "1px solid rgba(255, 255, 255, 0.1)",
                  background: gender === "FEMALE" ? "linear-gradient(135deg, rgba(37, 99, 235, 0.25) 0%, rgba(56, 189, 248, 0.15) 100%)" : "rgba(255, 255, 255, 0.03)",
                  boxShadow: gender === "FEMALE" ? "0 0 20px rgba(56, 189, 248, 0.25)" : "none",
                  transition: "all 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                id="voice-select-female"
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #0284c7, #38bdf8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                      }}
                    >
                      <Sparkles size={18} />
                    </div>
                    {gender === "FEMALE" && (
                      <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#38bdf8", color: "#09132b", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "11px" }}>
                        ✓
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff" }}>
                    Voix Féminine
                  </p>
                  <p style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "2px", lineHeight: "1.4" }}>
                    Fluide, dynamique et naturelle
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTestVoice("FEMALE");
                  }}
                  style={{
                    marginTop: "14px",
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: playingGender === "FEMALE" ? "#2563eb" : "rgba(56, 189, 248, 0.15)",
                    border: "1px solid rgba(56, 189, 248, 0.35)",
                    color: "#38bdf8",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    cursor: "pointer",
                  }}
                  id="test-female-voice"
                >
                  <Play size={12} fill="#38bdf8" />
                  <span>{playingGender === "FEMALE" ? "Lecture en cours..." : "Tester l'échantillon"}</span>
                </button>
              </div>

              {/* Male Voice Card */}
              <div
                onClick={() => {
                  setGender("MALE");
                  saveVoiceSettings({ gender: "MALE" });
                }}
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  border: gender === "MALE" ? "2px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.1)",
                  background: gender === "MALE" ? "linear-gradient(135deg, rgba(79, 70, 229, 0.25) 0%, rgba(99, 102, 241, 0.15) 100%)" : "rgba(255, 255, 255, 0.03)",
                  boxShadow: gender === "MALE" ? "0 0 20px rgba(99, 102, 241, 0.25)" : "none",
                  transition: "all 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                id="voice-select-male"
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                      }}
                    >
                      <Mic size={18} />
                    </div>
                    {gender === "MALE" && (
                      <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#6366f1", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "11px" }}>
                        ✓
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff" }}>
                    Voix Masculine
                  </p>
                  <p style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "2px", lineHeight: "1.4" }}>
                    Posée, claire et professionnelle
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTestVoice("MALE");
                  }}
                  style={{
                    marginTop: "14px",
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: playingGender === "MALE" ? "#4f46e5" : "rgba(99, 102, 241, 0.15)",
                    border: "1px solid rgba(99, 102, 241, 0.35)",
                    color: "#a5b4fc",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    cursor: "pointer",
                  }}
                  id="test-male-voice"
                >
                  <Play size={12} fill="#a5b4fc" />
                  <span>{playingGender === "MALE" ? "Lecture en cours..." : "Tester l'échantillon"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Trigger Mode Selection */}
          <div>
            <label style={{ fontSize: "13px", fontWeight: "700", color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "12px" }}>
              Mode d&apos;Annonce Vocale
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* Direct Voice */}
              <div
                onClick={() => setAlertMode("DIRECT_VOICE")}
                style={{
                  padding: "14px 16px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  border: alertMode === "DIRECT_VOICE" ? "1.5px solid #38bdf8" : "1px solid rgba(255, 255, 255, 0.1)",
                  background: alertMode === "DIRECT_VOICE" ? "rgba(37, 99, 235, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  boxShadow: alertMode === "DIRECT_VOICE" ? "0 0 16px rgba(56, 189, 248, 0.2)" : "none",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: alertMode === "DIRECT_VOICE" ? "#2563eb" : "rgba(255, 255, 255, 0.08)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Zap size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>
                    Déclenchement Direct à la Voix (Recommandé)
                  </p>
                  <p style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "2px" }}>
                    L&apos;IA commence immédiatement à vous parler à voix haute dès l&apos;heure arrivée, sans attendre que vous décrochiez.
                  </p>
                </div>
              </div>

              {/* Call Simulation */}
              <div
                onClick={() => setAlertMode("CALL_SIMULATION")}
                style={{
                  padding: "14px 16px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  border: alertMode === "CALL_SIMULATION" ? "1.5px solid #38bdf8" : "1px solid rgba(255, 255, 255, 0.1)",
                  background: alertMode === "CALL_SIMULATION" ? "rgba(37, 99, 235, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  boxShadow: alertMode === "CALL_SIMULATION" ? "0 0 16px rgba(56, 189, 248, 0.2)" : "none",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: alertMode === "CALL_SIMULATION" ? "#2563eb" : "rgba(255, 255, 255, 0.08)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <PhoneCall size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff" }}>
                    Mode Sonnerie d&apos;Appel
                  </p>
                  <p style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "2px" }}>
                    Fait sonner l&apos;application comme un appel téléphonique et attend votre clic sur &quot;Décrocher&quot; pour parler.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            background: "rgba(13, 27, 62, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{
              padding: "9px 18px",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              fontWeight: "600",
            }}
          >
            Fermer
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary btn-sm"
            style={{
              padding: "9px 22px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              boxShadow: "0 4px 18px rgba(37, 99, 235, 0.4)",
              color: "#ffffff",
              fontWeight: "700",
              border: "none",
            }}
          >
            Enregistrer les préférences
          </button>
        </div>
      </div>
    </div>
  );
}

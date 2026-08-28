"use client";

import { useState, useEffect } from "react";
import { X, Volume2, Sparkles, User, Check, Play, Settings, Radio } from "lucide-react";
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
  const [isPlayingTest, setIsPlayingTest] = useState(false);

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
    setIsPlayingTest(true);
    await playAlertChime();

    const sampleText =
      selectedGender === "FEMALE"
        ? "Bonjour ! Je suis votre assistante vocale IA. À l'heure exacte de vos rendez-vous et de vos tâches, je me déclencherai directement pour vous énoncer toutes vos consignes."
        : "Bonjour ! Je suis votre assistant vocal IA. Je me chargerai de vous rappeler directement tous vos rendez-vous et vos tâches importantes à voix haute.";

    speakAIText(sampleText, {
      gender: selectedGender,
      onEnd: () => setIsPlayingTest(false),
      onError: () => setIsPlayingTest(false),
    });
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal animate-scale-in" style={{ maxWidth: "520px" }}>
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
                background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Volume2 size={18} color="white" />
            </div>
            <div>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "var(--text-primary)" }}>
                Réglages de la Voix & Alertes IA
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Personnalisez la voix féminine/masculine et le mode de déclenchement
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: "6px" }} id="voice-modal-close">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Voice Gender Selection */}
          <div>
            <label className="form-label" style={{ marginBottom: "10px" }}>
              Choix de la Voix IA
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {/* Female Voice */}
              <button
                type="button"
                onClick={() => {
                  setGender("FEMALE");
                  saveVoiceSettings({ gender: "FEMALE" });
                }}
                className="card"
                style={{
                  padding: "16px",
                  textAlign: "left",
                  cursor: "pointer",
                  border: gender === "FEMALE" ? "2px solid #ec4899" : "1px solid var(--border-default)",
                  background: gender === "FEMALE" ? "rgba(236, 72, 153, 0.12)" : "var(--bg-card)",
                  transition: "all 0.2s",
                }}
                id="voice-select-female"
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "24px" }}>👩</span>
                  {gender === "FEMALE" && <Check size={16} color="#ec4899" />}
                </div>
                <p style={{ fontSize: "14px", fontWeight: "700", color: gender === "FEMALE" ? "#ec4899" : "var(--text-primary)" }}>
                  Voix Féminine
                </p>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                  Voix fluide, dynamique et naturelle
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTestVoice("FEMALE");
                  }}
                  className="btn btn-ghost btn-sm"
                  style={{ marginTop: "10px", width: "100%", justifyContent: "center", fontSize: "11px", padding: "4px 8px", color: "#ec4899" }}
                  id="test-female-voice"
                >
                  <Play size={11} /> Écouter la voix
                </button>
              </button>

              {/* Male Voice */}
              <button
                type="button"
                onClick={() => {
                  setGender("MALE");
                  saveVoiceSettings({ gender: "MALE" });
                }}
                className="card"
                style={{
                  padding: "16px",
                  textAlign: "left",
                  cursor: "pointer",
                  border: gender === "MALE" ? "2px solid #6366f1" : "1px solid var(--border-default)",
                  background: gender === "MALE" ? "rgba(99, 102, 241, 0.12)" : "var(--bg-card)",
                  transition: "all 0.2s",
                }}
                id="voice-select-male"
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "24px" }}>👨</span>
                  {gender === "MALE" && <Check size={16} color="#6366f1" />}
                </div>
                <p style={{ fontSize: "14px", fontWeight: "700", color: gender === "MALE" ? "#6366f1" : "var(--text-primary)" }}>
                  Voix Masculine
                </p>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                  Voix posée, claire et professionnelle
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTestVoice("MALE");
                  }}
                  className="btn btn-ghost btn-sm"
                  style={{ marginTop: "10px", width: "100%", justifyContent: "center", fontSize: "11px", padding: "4px 8px", color: "#6366f1" }}
                  id="test-male-voice"
                >
                  <Play size={11} /> Écouter la voix
                </button>
              </button>
            </div>
          </div>

          {/* Trigger Mode Selection */}
          <div>
            <label className="form-label" style={{ marginBottom: "10px" }}>
              Mode de Déclenchement du Rappel
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* Direct Voice */}
              <div
                onClick={() => setAlertMode("DIRECT_VOICE")}
                className="card"
                style={{
                  padding: "14px 16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  border: alertMode === "DIRECT_VOICE" ? "1.5px solid var(--accent-primary)" : "1px solid var(--border-default)",
                  background: alertMode === "DIRECT_VOICE" ? "rgba(99,102,241,0.1)" : "var(--bg-card)",
                }}
              >
                <Radio size={18} color={alertMode === "DIRECT_VOICE" ? "var(--accent-primary)" : "var(--text-muted)"} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-primary)" }}>
                    ⚡ Déclenchement Direct & Vocal (Recommandé)
                  </p>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                    L&apos;IA commence immédiatement à vous parler à voix haute dès l&apos;heure arrivée, sans attendre que vous décrochiez.
                  </p>
                </div>
              </div>

              {/* Call Simulation */}
              <div
                onClick={() => setAlertMode("CALL_SIMULATION")}
                className="card"
                style={{
                  padding: "14px 16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  border: alertMode === "CALL_SIMULATION" ? "1.5px solid var(--accent-primary)" : "1px solid var(--border-default)",
                  background: alertMode === "CALL_SIMULATION" ? "rgba(99,102,241,0.1)" : "var(--bg-card)",
                }}
              >
                <Radio size={18} color={alertMode === "CALL_SIMULATION" ? "var(--accent-primary)" : "var(--text-muted)"} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-primary)" }}>
                    📞 Mode Appel Téléphonique (Sonnerie)
                  </p>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                    Fait sonner le smartphone/navigateur et attend que vous cliquiez sur &quot;Décrocher&quot; pour parler.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Speed slider */}
          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label className="form-label">Vitesse d&apos;élocution ({rate}x)</label>
              <button
                type="button"
                onClick={() => setRate(1.0)}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: "11px", padding: 0 }}
              >
                Par défaut
              </button>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.2"
              step="0.05"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent-primary)" }}
            />
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
            Fermer
          </button>
          <button type="button" onClick={handleSave} className="btn btn-primary" id="voice-settings-save">
            Enregistrer les préférences
          </button>
        </div>
      </div>
    </div>
  );
}

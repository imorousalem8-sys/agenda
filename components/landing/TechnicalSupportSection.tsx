"use client";

import React, { useState } from "react";
import {
  Wrench,
  AlertTriangle,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  ShieldAlert,
  Loader2,
  Sparkles,
  LifeBuoy,
} from "lucide-react";

export default function TechnicalSupportSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "BUG_TECHNIQUE",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; msg: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setErrorMessage("Veuillez décrire le problème rencontré en quelques mots.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/support/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          url: typeof window !== "undefined" ? window.location.href : "/",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedTicket({
          id: data.ticketId,
          msg: data.message,
        });
        setFormData({ name: "", email: "", category: "BUG_TECHNIQUE", message: "" });
      } else {
        setErrorMessage(data.error || "Impossible d'envoyer le signalement.");
      }
    } catch (err) {
      setErrorMessage("Erreur de connexion au serveur. Réessayez dans quelques instants.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="support-technique"
      style={{
        maxWidth: "1280px",
        margin: "60px auto 90px",
        padding: "0 24px",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 16px",
            borderRadius: "30px",
            background: "rgba(14, 165, 233, 0.15)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            marginBottom: "14px",
          }}
        >
          <LifeBuoy size={15} color="#38bdf8" />
          <span style={{ fontSize: "12px", fontWeight: "700", color: "#38bdf8", letterSpacing: "0.05em" }}>
            SERVICE TECHNIQUE &amp; ASSISTANCE
          </span>
        </div>

        <h2
          style={{
            fontSize: "clamp(26px, 3.6vw, 38px)",
            fontWeight: "900",
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: "10px",
          }}
        >
          Un problème sur le site ? Signalez-le nous en direct
        </h2>
        <p style={{ fontSize: "15px", color: "#94a3b8", maxWidth: "620px", margin: "0 auto" }}>
          Notre équipe technique traite vos retours et anomalies sous 24h pour garantir une expérience fluide.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "28px",
          alignItems: "start",
        }}
      >
        {/* Left Side: Technical Form */}
        <div
          style={{
            borderRadius: "24px",
            background: "linear-gradient(180deg, rgba(13, 27, 62, 0.85) 0%, rgba(8, 16, 38, 0.95) 100%)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            boxShadow: "0 20px 45px rgba(0, 0, 0, 0.4)",
            padding: "32px",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                boxShadow: "0 0 15px rgba(2, 132, 199, 0.4)",
              }}
            >
              <Wrench size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", margin: 0 }}>
                Signaler un incident ou une anomalie
              </h3>
              <p style={{ fontSize: "12.5px", color: "#64748b", margin: 0 }}>
                Formulaire direct de maintenance
              </p>
            </div>
          </div>

          {submittedTicket ? (
            <div
              style={{
                padding: "24px",
                borderRadius: "16px",
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(52, 211, 153, 0.35)",
                textAlign: "center",
              }}
            >
              <CheckCircle2 size={40} color="#34d399" style={{ margin: "0 auto 12px" }} />
              <h4 style={{ fontSize: "17px", fontWeight: "800", color: "#ffffff", marginBottom: "6px" }}>
                Signalement enregistré avec succès !
              </h4>
              <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "16px" }}>
                Numéro de ticket : <strong style={{ color: "#38bdf8", fontFamily: "monospace" }}>{submittedTicket.id}</strong>
              </p>
              <p style={{ fontSize: "12.5px", color: "#cbd5e1", lineHeight: "1.5", marginBottom: "20px" }}>
                {submittedTicket.msg}
              </p>
              <button
                type="button"
                onClick={() => setSubmittedTicket(null)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "700",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  cursor: "pointer",
                }}
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {errorMessage && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: "rgba(239, 68, 68, 0.15)",
                    border: "1px solid rgba(248, 113, 113, 0.3)",
                    color: "#fca5a5",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <AlertTriangle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "6px" }}>
                    Votre Nom / Pseudo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Jean Dupont"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: "rgba(15, 23, 42, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#ffffff",
                      fontSize: "13.5px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "6px" }}>
                    Votre Email (pour le suivi)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jean@exemple.com"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: "rgba(15, 23, 42, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#ffffff",
                      fontSize: "13.5px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "6px" }}>
                  Nature du signalement
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: "#0f172a",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    fontSize: "13.5px",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="BUG_TECHNIQUE">🐛 Bug / Dysfonctionnement technique</option>
                  <option value="AFFICHAGE">📱 Problème d&apos;affichage ou responsive</option>
                  <option value="AUDIO_VOICE">🎙️ Problème de voix IA / Audio / Synthèse</option>
                  <option value="COMPTE_CONNEXION">🔐 Problème de connexion / Inscription</option>
                  <option value="AMELIORATION">💡 Suggestion d&apos;amélioration</option>
                  <option value="AUTRE">❓ Autre demande</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "6px" }}>
                  Description détaillée du problème <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Décrivez ce qui s'est passé, la page concernée ou le message d'erreur éventuel..."
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: "rgba(15, 23, 42, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    fontSize: "13.5px",
                    outline: "none",
                    resize: "vertical",
                    lineHeight: "1.5",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: "13px 24px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                  color: "#ffffff",
                  fontWeight: "800",
                  fontSize: "14.5px",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 0 20px rgba(2, 132, 199, 0.35)",
                  transition: "transform 0.15s ease",
                  opacity: isSubmitting ? 0.75 : 1,
                }}
                className="hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Transmission en cours...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Envoyer le signalement au service technique</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Facebook Card & Direct Channels */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Facebook Official Page Card */}
          <div
            style={{
              borderRadius: "24px",
              background: "linear-gradient(180deg, rgba(24, 119, 242, 0.12) 0%, rgba(13, 27, 62, 0.8) 100%)",
              border: "1px solid rgba(24, 119, 242, 0.35)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
              padding: "28px",
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "#1877f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: "24px",
                  fontWeight: "900",
                  fontFamily: "sans-serif",
                  boxShadow: "0 0 20px rgba(24, 119, 242, 0.5)",
                }}
              >
                f
              </div>
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "800",
                    color: "#60a5fa",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Page Officielle
                </span>
                <h3 style={{ fontSize: "19px", fontWeight: "800", color: "#ffffff", margin: 0 }}>
                  Rejoignez-nous sur Facebook
                </h3>
              </div>
            </div>

            <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: "1.6", marginBottom: "20px" }}>
              Suivez les actualités, posez vos questions en direct sur Messenger et échangez avec notre communauté d&apos;utilisateurs.
            </p>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "13px 20px",
                borderRadius: "12px",
                background: "#1877f2",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 8px 25px rgba(24, 119, 242, 0.4)",
                transition: "transform 0.15s ease",
              }}
              className="hover:scale-[1.02] hover:bg-[#166fe5]"
            >
              <span>Accéder à la Page Facebook</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* System Status & Guarantees */}
          <div
            style={{
              borderRadius: "20px",
              background: "rgba(11, 21, 48, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "24px",
            }}
          >
            <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldAlert size={18} color="#38bdf8" />
              <span>Engagements du Service Technique</span>
            </h4>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", color: "#94a3b8" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px #34d399" }} />
                <span><strong style={{ color: "#f1f5f9" }}>Serveurs &amp; IA :</strong> 100% opérationnels en temps réel</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#38bdf8" }} />
                <span><strong style={{ color: "#f1f5f9" }}>Prise en charge :</strong> Réponse moyenne en moins de 24h</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#a855f7" }} />
                <span><strong style={{ color: "#f1f5f9" }}>Mises à jour :</strong> Correctifs continus déployés sans interruption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

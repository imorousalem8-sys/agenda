"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Mail,
  Copy,
  LifeBuoy,
  AlertCircle,
} from "lucide-react";

export default function TechnicalSupportSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copySupportEmail = () => {
    navigator.clipboard.writeText("salemimorou129@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!message.trim() || message.trim().length < 3) {
      setErrorMessage("Veuillez saisir votre message.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/support/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          category: "ASSISTANCE_RAPIDE",
          message: message.trim(),
          url: typeof window !== "undefined" ? window.location.href : "/",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedTicket({ id: data.ticketId });
        setEmail("");
        setMessage("");
      } else {
        setErrorMessage(data.error || "Impossible d'envoyer votre message.");
      }
    } catch {
      setErrorMessage("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="support-technique"
      style={{
        maxWidth: "960px",
        margin: "40px auto 70px",
        padding: "0 20px",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          borderRadius: "20px",
          background: "linear-gradient(180deg, rgba(13, 27, 62, 0.9) 0%, rgba(8, 16, 38, 0.95) 100%)",
          border: "1px solid rgba(56, 189, 248, 0.25)",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.45)",
          padding: "24px 28px",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Compact Header & Fast Direct Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            marginBottom: "20px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            paddingBottom: "18px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
              <LifeBuoy size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#ffffff", margin: 0 }}>
                Service Technique &amp; Assistance
              </h3>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                Un problème ou une suggestion ? Écrivez-nous directement ci-dessous.
              </p>
            </div>
          </div>

          {/* 2 Quick Direct Contact Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {/* Direct Email Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "8px",
                background: "rgba(37, 99, 235, 0.15)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                fontSize: "12px",
                color: "#e2e8f0",
              }}
            >
              <Mail size={13} color="#38bdf8" />
              <a
                href="mailto:salemimorou129@gmail.com"
                style={{ color: "#38bdf8", fontWeight: "700", textDecoration: "none" }}
              >
                salemimorou129@gmail.com
              </a>
              <button
                type="button"
                onClick={copySupportEmail}
                title="Copier l'email"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                  padding: "0 2px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {copiedEmail ? <CheckCircle2 size={13} color="#34d399" /> : <Copy size={13} />}
              </button>
            </div>

            {/* Direct Facebook Pill */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "8px",
                background: "#1877f2",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: "700",
                textDecoration: "none",
                transition: "opacity 0.15s ease",
              }}
              className="hover:opacity-90"
            >
              <span>Facebook</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Quick Message Box */}
        {submittedTicket ? (
          <div
            style={{
              padding: "16px 20px",
              borderRadius: "12px",
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(52, 211, 153, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CheckCircle2 size={20} color="#34d399" />
              <div style={{ fontSize: "13px", color: "#f8fafc" }}>
                Message transmis avec succès ! Réf : <strong style={{ color: "#38bdf8" }}>{submittedTicket.id}</strong>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSubmittedTicket(null)}
              style={{
                fontSize: "12px",
                fontWeight: "700",
                padding: "6px 14px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Écrire un autre message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {errorMessage && (
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(248, 113, 113, 0.3)",
                  color: "#fca5a5",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <AlertCircle size={14} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(200px, 1fr) 2fr auto",
                gap: "10px",
                alignItems: "center",
              }}
              className="flex flex-col md:grid"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email (facultatif)"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: "13px",
                  outline: "none",
                }}
              />

              <input
                type="text"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrivez rapidement votre message ou signalez un problème ici..."
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: "13px",
                  outline: "none",
                }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: "13px",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 0 15px rgba(2, 132, 199, 0.3)",
                }}
                className="hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Envoi...</span>
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Envoyer</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, Shield, X, Zap, Crown, ArrowRight, CreditCard, Lock } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
  onSuccess?: () => void;
}

export default function UpgradeModal({
  isOpen,
  onClose,
  featureName = "cette fonctionnalité premium",
  onSuccess,
}: UpgradeModalProps) {
  const [loading, setLoading] = useState(false);
  const [loadingTrial, setLoadingTrial] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  // 1. Redirection vers Stripe Checkout sécurisé
  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          returnUrl: window.location.pathname,
        }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        // Redirection vers la page de paiement officielle Stripe
        window.location.href = data.url;
      } else {
        alert(data.error || "Impossible d'ouvrir la page de paiement");
        setLoading(false);
      }
    } catch {
      alert("Erreur réseau lors de la connexion à Stripe");
      setLoading(false);
    }
  };

  // 2. Essai gratuit 7 jours
  const handleStartTrial = async () => {
    setLoadingTrial(true);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "START_TRIAL" }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message);
        window.dispatchEvent(new CustomEvent("subscription-updated", { detail: data.subscription }));
        setTimeout(() => {
          setLoadingTrial(false);
          setSuccessMsg("");
          if (onSuccess) onSuccess();
          onClose();
        }, 1200);
      } else {
        alert(data.error || "Erreur lors de l'activation de l'essai");
        setLoadingTrial(false);
      }
    } catch {
      alert("Erreur réseau");
      setLoadingTrial(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 9999,
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "linear-gradient(180deg, #131a2a 0%, #0c101d 100%)",
          border: "1px solid rgba(99, 102, 241, 0.45)",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.95), 0 0 50px rgba(99, 102, 241, 0.25)",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "780px",
          padding: "36px 32px",
          position: "relative",
          color: "#ffffff",
          animation: "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#94a3b8",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 14px",
              borderRadius: "20px",
              background: "rgba(99, 102, 241, 0.2)",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              color: "#c7d2fe",
              fontSize: "12px",
              fontWeight: "800",
              marginBottom: "12px",
            }}
          >
            <Crown size={14} color="#f59e0b" />
            <span>PASSERELLES STRIPE SÉCURISÉE</span>
          </div>

          <h2 style={{ fontSize: "26px", fontWeight: "900", color: "#ffffff", letterSpacing: "-0.02em" }}>
            Rejoignez AlarmAgenda Pro
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "6px", maxWidth: "540px", margin: "6px auto 0" }}>
            Débloquez <strong>{featureName}</strong>, l&apos;assistant vocal illimité et les alarmes inratables.
          </p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div
            style={{
              background: "rgba(16, 185, 129, 0.2)",
              border: "1px solid rgba(16, 185, 129, 0.5)",
              color: "#34d399",
              padding: "12px 16px",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            ✓ {successMsg}
          </div>
        )}

        {/* 2 Comparison Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: "20px",
            marginBottom: "24px",
          }}
          className="upgrade-grid"
        >
          {/* Card 1: Gratuit */}
          <div
            style={{
              background: "rgba(18, 24, 38, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "18px",
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ marginBottom: "12px" }}>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase" }}>
                PLAN ACTUEL
              </span>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", marginTop: "2px" }}>
                Gratuit
              </div>
              <div style={{ fontSize: "22px", fontWeight: "900", color: "#ffffff", marginTop: "8px", fontFamily: "monospace" }}>
                0 €
              </div>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", color: "#94a3b8", fontSize: "12px", marginTop: "10px", flex: 1 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>✓</span>
                <span>Calendrier standard</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>✓</span>
                <span>Espace Personnel</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ef4444" }}>
                <span>✕</span>
                <span>Pas d&apos;alarme persistante</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ef4444" }}>
                <span>✕</span>
                <span>Dictée vocale bridée</span>
              </li>
            </ul>

            <button
              onClick={handleStartTrial}
              disabled={loadingTrial || loading}
              style={{
                marginTop: "16px",
                padding: "10px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#e2e8f0",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {loadingTrial ? "Activation essai..." : "🎁 Essayer 7 jours gratuitement"}
            </button>
          </div>

          {/* Card 2: Pro (Stripe Checkout) */}
          <div
            style={{
              background: "linear-gradient(180deg, rgba(30, 41, 72, 0.95) 0%, rgba(17, 24, 48, 0.95) 100%)",
              border: "2px solid rgba(99, 102, 241, 0.75)",
              borderRadius: "18px",
              padding: "24px 22px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow: "0 10px 35px rgba(99, 102, 241, 0.35)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-11px",
                right: "16px",
                background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)",
                padding: "3px 10px",
                borderRadius: "12px",
                fontSize: "10px",
                fontWeight: "900",
                color: "#ffffff",
                letterSpacing: "0.05em",
              }}
            >
              OFFRE PRO RECOMMANDÉE
            </div>

            <div style={{ marginBottom: "12px" }}>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase" }}>
                ACCÈS ILLIMITÉ
              </span>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", marginTop: "2px" }}>
                AlarmAgenda Pro
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "8px" }}>
                <span style={{ fontSize: "28px", fontWeight: "900", color: "#ffffff", fontFamily: "monospace" }}>9,99 €</span>
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>/ mois</span>
              </div>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", color: "#e2e8f0", fontSize: "12px", marginTop: "10px", flex: 1 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#34d399" />
                <span><strong>Dictée vocale & IA Copilote illimités</strong></span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#34d399" />
                <span><strong>Alarmes vocales persistantes inratables</strong></span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#34d399" />
                <span><strong>Double espace Pro & Perso</strong> étanche</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#34d399" />
                <span>Synchronisation multi-écrans & PWA</span>
              </li>
            </ul>

            <button
              onClick={handleStripeCheckout}
              disabled={loading || loadingTrial}
              className="btn btn-primary"
              style={{
                marginTop: "16px",
                width: "100%",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                fontWeight: "800",
                fontSize: "14px",
                background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)",
                boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)",
              }}
            >
              <CreditCard size={18} />
              {loading ? "Redirection Stripe..." : "S'abonner avec Stripe (9,99 €)"}
            </button>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div style={{ textAlign: "center", fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Lock size={12} color="#34d399" /> Paiement 100% sécurisé par Stripe
          </span>
          <span>•</span>
          <span>Sans engagement • Résiliation en 1 clic</span>
        </div>
      </div>
    </div>
  );
}

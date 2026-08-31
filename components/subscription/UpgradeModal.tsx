"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, Shield, X, Zap, Crown, ArrowRight, CreditCard, Lock, ExternalLink, KeyRound } from "lucide-react";

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
  const [loadingInstant, setLoadingInstant] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  if (!isOpen) return null;

  // 1. Redirection vers la page de paiement sécurisée Gumroad
  const handlePaymentCheckout = () => {
    setLoading(true);
    // Gumroad direct product URL
    const gumroadUrl = "https://imorousalem.gumroad.com/l/ulato";
    
    // Ouvrir la page de paiement dans un nouvel onglet
    window.open(gumroadUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  // 2. Activation directe Pro (immédiate)
  const handleDirectActivate = async () => {
    setLoadingInstant(true);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ACTIVATE_PRO" }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || "Félicitations ! Votre compte PRO est maintenant actif.");
        window.dispatchEvent(new CustomEvent("subscription-updated", { detail: data.subscription }));
        setTimeout(() => {
          setLoadingInstant(false);
          setSuccessMsg("");
          if (onSuccess) onSuccess();
          onClose();
        }, 1200);
      } else {
        alert(data.error || "Erreur lors de l'activation");
        setLoadingInstant(false);
      }
    } catch {
      alert("Erreur réseau");
      setLoadingInstant(false);
    }
  };

  // 3. Essai gratuit 7 jours
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
        setSuccessMsg(data.message || "Votre période d'essai Pro de 7 jours est activée !");
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
        background: "rgba(0, 0, 0, 0.88)",
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
          maxWidth: "800px",
          padding: "36px 32px",
          position: "relative",
          color: "#ffffff",
          animation: "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          maxHeight: "90vh",
          overflowY: "auto",
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
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
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
            <span>PAIEMENT SÉCURISÉ CB & PAYPAL</span>
          </div>

          <h2 style={{ fontSize: "26px", fontWeight: "900", color: "#ffffff", letterSpacing: "-0.02em" }}>
            Passez à AlarmAgenda PRO
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "6px", maxWidth: "560px", margin: "6px auto 0" }}>
            Débloquez <strong>{featureName}</strong>, vos rendez-vous en illimité et les alarmes vocales inratables.
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
                <span>Maximum 5 rendez-vous</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>✓</span>
                <span>Espace Personnel standard</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ef4444" }}>
                <span>✕</span>
                <span>Pas d&apos;alarme persistante</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ef4444" }}>
                <span>✕</span>
                <span>Espace Pro verrouillé</span>
              </li>
            </ul>

            <button
              onClick={handleStartTrial}
              disabled={loadingTrial || loading || loadingInstant}
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

          {/* Card 2: Pro */}
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
                <span><strong>Rendez-vous & Événements 100% ILLIMITÉS</strong></span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#34d399" />
                <span><strong>Alarmes vocales & réveil inratable</strong></span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#34d399" />
                <span><strong>Double espace Pro & Perso étanche</strong></span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#34d399" />
                <span>Synchronisation multi-écrans & PWA</span>
              </li>
            </ul>

            <button
              onClick={handlePaymentCheckout}
              disabled={loading || loadingTrial || loadingInstant}
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
                cursor: "pointer",
              }}
            >
              <CreditCard size={18} />
              {loading ? "Ouverture du paiement..." : "Payer par CB / Apple Pay / PayPal (9,99 €)"}
              <ExternalLink size={14} />
            </button>

            {/* Quick direct activation button for buyer validation */}
            <button
              onClick={handleDirectActivate}
              disabled={loadingInstant || loading || loadingTrial}
              style={{
                marginTop: "8px",
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                fontSize: "11px",
                textDecoration: "underline",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              {loadingInstant ? "Activation en cours..." : "✓ Vous avez déjà réglé ? Cliquez ici pour activer votre accès PRO"}
            </button>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div style={{ textAlign: "center", fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Lock size={12} color="#34d399" /> Paiement 100% sécurisé (CB, Apple Pay, PayPal)
          </span>
          <span>•</span>
          <span>Sans engagement • Résiliation en 1 clic</span>
        </div>
      </div>
    </div>
  );
}


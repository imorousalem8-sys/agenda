"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, Shield, X, Zap, Crown, ArrowRight } from "lucide-react";

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
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleUpgrade = async (action: "ACTIVATE_PRO" | "START_TRIAL") => {
    setLoading(true);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message);
        window.dispatchEvent(new CustomEvent("subscription-updated", { detail: data.subscription }));
        setTimeout(() => {
          setLoading(false);
          setSuccessMsg("");
          if (onSuccess) onSuccess();
          onClose();
        }, 1200);
      } else {
        alert(data.error || "Erreur lors de l'activation");
        setLoading(false);
      }
    } catch {
      alert("Erreur réseau");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
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
          border: "1px solid rgba(99, 102, 241, 0.4)",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.9), 0 0 40px rgba(99, 102, 241, 0.25)",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "760px",
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
            <span>DÉVERROUILLER L&apos;OFFRE PRO</span>
          </div>

          <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#ffffff", letterSpacing: "-0.02em" }}>
            Passez à la vitesse supérieure
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "6px", maxWidth: "520px", margin: "6px auto 0" }}>
            Pour utiliser <strong>{featureName}</strong> et éliminer définitivement tout risque d&apos;oubli, rejoignez l&apos;abonnement Pro.
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

        {/* 2 Compact Comparison Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.25fr",
            gap: "20px",
            marginBottom: "28px",
          }}
          className="upgrade-grid"
        >
          {/* Card 1: Gratuit (Actuel) */}
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
                <span>Espace Personnel uniquement</span>
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
          </div>

          {/* Card 2: Pro (Full Features) */}
          <div
            style={{
              background: "linear-gradient(180deg, rgba(30, 41, 72, 0.9) 0%, rgba(17, 24, 48, 0.9) 100%)",
              border: "2px solid rgba(99, 102, 241, 0.7)",
              borderRadius: "18px",
              padding: "24px 22px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
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
              RECOMMANDE
            </div>

            <div style={{ marginBottom: "12px" }}>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase" }}>
                ACCÈS ILLIMITÉ
              </span>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", marginTop: "2px" }}>
                Premium Pro
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "8px" }}>
                <span style={{ fontSize: "26px", fontWeight: "900", color: "#ffffff", fontFamily: "monospace" }}>9,99 €</span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>/ mois</span>
              </div>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", color: "#e2e8f0", fontSize: "12px", marginTop: "10px", flex: 1 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={14} color="#34d399" />
                <span><strong>Dictée vocale illimitée</strong></span>
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
              onClick={() => handleUpgrade("ACTIVATE_PRO")}
              disabled={loading}
              className="btn btn-primary"
              style={{
                marginTop: "16px",
                width: "100%",
                justifyContent: "center",
                padding: "11px",
                fontWeight: "800",
                fontSize: "13px",
                background: "linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)",
              }}
            >
              {loading ? "Activation en cours..." : "Activer l'abonnement Pro (9,99 €)"}
            </button>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div style={{ textAlign: "center", fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <span>🔒 Sans engagement • Résiliation en 1 clic</span>
          <span>•</span>
          <span>🛡️ Zéro rendez-vous manqué garanti</span>
        </div>
      </div>
    </div>
  );
}

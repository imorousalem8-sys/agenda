"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Crown, Sparkles, CheckCircle2, X } from "lucide-react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const payment = searchParams.get("payment");
    const sessionId = searchParams.get("session_id");

    if (payment === "success") {
      setShowSuccessModal(true);
      setVerifying(true);

      const verify = async () => {
        try {
          const url = sessionId
            ? `/api/checkout/stripe/verify?session_id=${sessionId}`
            : "/api/subscription";

          const res = await fetch(url);
          const data = await res.json();

          if (data.subscription) {
            window.dispatchEvent(
              new CustomEvent("subscription-updated", {
                detail: data.subscription,
              })
            );
          }

          setMessage(
            data.message ||
              "Félicitations ! Votre abonnement AlarmAgenda Pro est actif."
          );
        } catch (err) {
          setMessage("Paiement validé avec succès ! Bienvenue dans l'offre Pro.");
        } finally {
          setVerifying(false);
          if (typeof window !== "undefined") {
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
          }
        }
      };

      verify();
    }
  }, [searchParams]);

  if (!showSuccessModal) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 10000,
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <div
        style={{
          background: "linear-gradient(180deg, #131d36 0%, #0c101d 100%)",
          border: "2px solid rgba(52, 211, 153, 0.6)",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(52, 211, 153, 0.3)",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "520px",
          padding: "36px 28px",
          position: "relative",
          textAlign: "center",
          color: "#ffffff",
          animation: "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <button
          onClick={() => setShowSuccessModal(false)}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#94a3b8",
            cursor: "pointer",
          }}
        >
          <X size={16} />
        </button>

        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(6, 182, 212, 0.2))",
            border: "2px solid #34d399",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto",
            boxShadow: "0 0 30px rgba(52, 211, 153, 0.4)",
          }}
        >
          <Crown size={38} color="#34d399" />
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 14px",
            borderRadius: "20px",
            background: "rgba(52, 211, 153, 0.15)",
            border: "1px solid rgba(52, 211, 153, 0.35)",
            color: "#6ee7b7",
            fontSize: "12px",
            fontWeight: "800",
            marginBottom: "12px",
          }}
        >
          <Sparkles size={14} />
          <span>PAIEMENT STRIPE VALIDÉ</span>
        </div>

        <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#ffffff", marginBottom: "10px" }}>
          Bienvenue dans AlarmAgenda Pro ! ⭐
        </h2>

        <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6", marginBottom: "24px" }}>
          {verifying
            ? "Finalisation de l'activation de votre compte..."
            : message || "Toutes les fonctionnalités avancées, l'IA et les alarmes inratables sont maintenant débloquées."}
        </p>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "14px",
            padding: "16px",
            textAlign: "left",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#34d399", fontSize: "13px", fontWeight: "700", marginBottom: "8px" }}>
            <CheckCircle2 size={16} /> Espace Professionnel étanche activé
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#34d399", fontSize: "13px", fontWeight: "700", marginBottom: "8px" }}>
            <CheckCircle2 size={16} /> Dictée vocale & Copilote IA illimités
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#34d399", fontSize: "13px", fontWeight: "700" }}>
            <CheckCircle2 size={16} /> Alarmes vocales inratables
          </div>
        </div>

        <button
          onClick={() => setShowSuccessModal(false)}
          className="btn btn-primary"
          style={{
            width: "100%",
            justifyContent: "center",
            padding: "12px",
            fontSize: "14px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #10b981, #06b6d4)",
          }}
        >
          Accéder à mon agenda Pro
        </button>
      </div>
    </div>
  );
}

export default function PaymentSuccessToast() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

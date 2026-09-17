"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { speakAIText, playAlertChime } from "@/lib/voice";

export default function Hero() {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const handlePlayVoiceDemo = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (isPlayingVoice) {
        window.speechSynthesis.cancel();
        setIsPlayingVoice(false);
        return;
      }
      playAlertChime();
      setIsPlayingVoice(true);
      const utterance = new SpeechSynthesisUtterance(
        "Bonjour ! C'est votre assistant personnel AlarmAgenda. Vous avez votre rendez-vous client important prévu à 14 heures 30. Souhaitez-vous le confirmer ou le reporter de dix minutes ?"
      );
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-white via-[#fcfdff] to-white text-slate-900 pt-6 sm:pt-10 pb-16 sm:pb-24 font-sans overflow-hidden">
      {/* Conteneur fluide et cadré */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        
        {/* =========================================================
            1. HERO STAGE : 2 COLONNES (STYLE MAQUETTE ORIGINALE)
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-16">
          
          {/* A. Colonne Gauche : Grand Titre + Pitch + Bouton En savoir plus */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center pr-0 lg:pr-4 z-10">
            
            {/* Grand Titre Exact */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#09132b] tracking-tight leading-[1.12] mb-6 text-left">
              Ne manquez plus aucun <br className="hidden sm:inline" />
              rendez-vous important
            </h1>

            {/* Sous-titre Explicatif */}
            <p className="text-base sm:text-[18px] text-slate-600 font-normal leading-relaxed mb-8 max-w-lg text-left">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda sans effort, précise et automatisée.
            </p>

            {/* Bouton d'action "En savoir plus" */}
            <Link
              href="#fonctionnalites"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-bold text-white bg-[#1d4ed8] hover:bg-[#1e40af] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 hover:-translate-y-0.5 transition-all"
            >
              En savoir plus
            </Link>

          </div>

          {/* B. Colonne Droite : Photo Femme d'Affaires & Bulle d'Appel Vocal */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            
            {/* Cadre Photo Professionnel */}
            <div className="relative w-full max-w-[560px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 bg-slate-100 group">
              <Image
                src="/images/hero-businesswoman.jpg"
                alt="Femme d'affaires souriante au bureau utilisant l'assistant vocal IA AlarmAgenda"
                fill
                priority
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />

              {/* Bulle d'Appel Vocal Flottante (Style Maquette avec pointeur) */}
              <div
                onClick={handlePlayVoiceDemo}
                className="absolute top-[38%] left-4 sm:left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_30px_rgba(0,0,0,0.12)] border border-blue-100/60 flex items-center gap-3.5 z-20 max-w-[260px] sm:max-w-[280px] cursor-pointer hover:scale-105 transition-all group/bubble"
                title="Cliquer pour écouter l'annonce vocale"
              >
                {/* Icône Ondes Sonores Bleues */}
                <div className="flex items-center gap-0.5 text-blue-600 px-1 py-2">
                  <span className={`w-1 bg-blue-600 rounded-full ${isPlayingVoice ? 'h-5 animate-pulse' : 'h-3'}`}></span>
                  <span className={`w-1 bg-blue-600 rounded-full ${isPlayingVoice ? 'h-7 animate-pulse delay-75' : 'h-5'}`}></span>
                  <span className={`w-1 bg-blue-600 rounded-full ${isPlayingVoice ? 'h-9 animate-pulse delay-150' : 'h-7'}`}></span>
                  <span className={`w-1 bg-blue-600 rounded-full ${isPlayingVoice ? 'h-6 animate-pulse delay-100' : 'h-4'}`}></span>
                  <span className={`w-1 bg-blue-600 rounded-full ${isPlayingVoice ? 'h-3 animate-pulse delay-200' : 'h-2'}`}></span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm sm:text-[15px] font-bold text-[#09132b] leading-snug">
                    Appel Vocal
                  </div>
                  <div className="text-xs text-slate-500 font-medium truncate mt-0.5">
                    {isPlayingVoice ? "Lecture en cours..." : "Programmé à 14h30"}
                  </div>
                </div>

                {/* Petite flèche indicatrice de bulle pointant vers le téléphone */}
                <div className="absolute -bottom-2 left-10 w-4 h-4 bg-white rotate-45 border-r border-b border-blue-100/60 -z-10"></div>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================
            2. SECTION FONCTIONNALITÉS — GLASSMORPHISM CLAIR
           ========================================================= */}
        <div
          id="fonctionnalites"
          style={{
            marginTop: "12px",
            paddingTop: "8px",
          }}
        >
          {/* Titre compact de section */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "rgba(37,99,235,0.08)",
              border: "1px solid rgba(37,99,235,0.18)",
              color: "#2563eb",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.09em",
              textTransform: "uppercase", padding: "5px 14px",
              borderRadius: "999px", marginBottom: "12px",
            }}>
              <span style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: "#2563eb", display: "inline-block",
              }} />
              Fonctionnalités clés
            </span>
            <h2 style={{
              fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 800,
              color: "#09132b", letterSpacing: "-0.02em", lineHeight: 1.2,
              margin: 0,
            }}>
              Tout ce dont vous avez besoin,{" "}
              <span style={{
                background: "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                en un seul endroit
              </span>
            </h2>
          </div>

          {/* ── Grille des 3 cartes ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}>

            {/* ── CARTE 1 — Rappels Vocaux IA (bleu) ── */}
            <div
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(37,99,235,0.16)",
                borderRadius: "20px",
                padding: "24px 22px",
                display: "flex", flexDirection: "column",
                transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease, border-color 0.28s ease",
                boxShadow: "0 2px 16px rgba(37,99,235,0.06)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-5px)";
                el.style.borderColor = "rgba(37,99,235,0.38)";
                el.style.boxShadow = "0 16px 48px rgba(37,99,235,0.14)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(37,99,235,0.16)";
                el.style.boxShadow = "0 2px 16px rgba(37,99,235,0.06)";
              }}
            >
              {/* Icône */}
              <div style={{
                width: "48px", height: "48px", borderRadius: "14px",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "14px", flexShrink: 0,
              }}>
                <svg width="26" height="26" viewBox="0 0 44 44" fill="none">
                  <rect x="15" y="6" width="14" height="22" rx="7" fill="white"/>
                  <path d="M9 20C9 27.18 14.82 33 22 33C29.18 33 35 27.18 35 20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M22 33V39M15 39H29" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M4 17C2 19 2 21 4 25" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M40 17C42 19 42 21 40 25" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                background: "rgba(37,99,235,0.09)", border: "1px solid rgba(37,99,235,0.20)",
                color: "#2563eb", fontSize: "10px", fontWeight: 700,
                padding: "3px 10px", borderRadius: "999px",
                marginBottom: "10px", alignSelf: "flex-start",
              }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
                IA vocale en temps réel
              </div>

              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#09132b", marginBottom: "7px", letterSpacing: "-0.01em" }}>
                Rappels Vocaux IA
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.65, marginBottom: "14px" }}>
                Votre assistant appelle automatiquement vos contacts avant chaque rendez-vous avec une voix naturelle et personnalisée.
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px 0", display: "flex", flexDirection: "column", gap: "7px", flex: 1 }}>
                {[
                  "Voix IA naturelle FR/EN",
                  "Heure & lieu annoncés automatiquement",
                  "Accusé d'écoute et confirmation vocale",
                  "Planification J-1, J-7, 1h avant",
                ].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12.5px", color: "#475569" }}>
                    <span style={{
                      width: "16px", height: "16px", borderRadius: "50%",
                      background: "rgba(37,99,235,0.10)", border: "1px solid rgba(37,99,235,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: "1px",
                    }}>
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path d="M1.5 4.5l2 2 4-4" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid rgba(37,99,235,0.10)" }}>
                <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600 }}>+98% de RDV honorés</span>
                <Link href="/register" style={{
                  display: "inline-flex", alignItems: "center", gap: "4px",
                  fontSize: "11.5px", fontWeight: 700, color: "#2563eb",
                  background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.20)",
                  padding: "5px 12px", borderRadius: "999px", textDecoration: "none",
                }}>
                  Essayer
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5h7M6 3l2.5 2.5L6 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>

            {/* ── CARTE 2 — Multi-Canaux SMS (indigo) ── */}
            <div
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(99,102,241,0.16)",
                borderRadius: "20px",
                padding: "24px 22px",
                display: "flex", flexDirection: "column",
                transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease, border-color 0.28s ease",
                boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-5px)";
                el.style.borderColor = "rgba(99,102,241,0.38)";
                el.style.boxShadow = "0 16px 48px rgba(99,102,241,0.14)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(99,102,241,0.16)";
                el.style.boxShadow = "0 2px 16px rgba(99,102,241,0.06)";
              }}
            >
              <div style={{
                width: "48px", height: "48px", borderRadius: "14px",
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "14px", flexShrink: 0,
              }}>
                <svg width="26" height="26" viewBox="0 0 44 44" fill="none">
                  <rect x="7" y="6" width="20" height="32" rx="4" fill="white"/>
                  <circle cx="17" cy="33" r="1.5" fill="rgba(99,102,241,0.5)"/>
                  <rect x="11" y="10" width="12" height="18" rx="2" fill="rgba(99,102,241,0.12)"/>
                  <rect x="19" y="15" width="19" height="14" rx="4" fill="rgba(255,255,255,0.92)"/>
                  <circle cx="25" cy="22" r="1.5" fill="#6366f1"/>
                  <circle cx="29" cy="22" r="1.5" fill="#6366f1"/>
                  <circle cx="33" cy="22" r="1.5" fill="#6366f1"/>
                </svg>
              </div>

              <div style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                background: "rgba(99,102,241,0.09)", border: "1px solid rgba(99,102,241,0.20)",
                color: "#6366f1", fontSize: "10px", fontWeight: 700,
                padding: "3px 10px", borderRadius: "999px",
                marginBottom: "10px", alignSelf: "flex-start",
              }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#818cf8", display: "inline-block" }} />
                SMS · Email · Push
              </div>

              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#09132b", marginBottom: "7px", letterSpacing: "-0.01em" }}>
                Multi-Canaux SMS
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.65, marginBottom: "14px" }}>
                Touchez chaque client sur le bon canal au bon moment : SMS, email ou notification push, tout est automatique.
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px 0", display: "flex", flexDirection: "column", gap: "7px", flex: 1 }}>
                {[
                  "SMS de confirmation dès la prise de RDV",
                  "Rappel automatique 24 h et 1 h avant",
                  "Email récapitulatif avec lien de modif",
                  "Notification push intégrée à l'appli",
                ].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12.5px", color: "#475569" }}>
                    <span style={{
                      width: "16px", height: "16px", borderRadius: "50%",
                      background: "rgba(99,102,241,0.10)", border: "1px solid rgba(99,102,241,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: "1px",
                    }}>
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path d="M1.5 4.5l2 2 4-4" stroke="#6366f1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid rgba(99,102,241,0.10)" }}>
                <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600 }}>Taux SMS &gt; 95%</span>
                <Link href="/register" style={{
                  display: "inline-flex", alignItems: "center", gap: "4px",
                  fontSize: "11.5px", fontWeight: 700, color: "#6366f1",
                  background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.20)",
                  padding: "5px 12px", borderRadius: "999px", textDecoration: "none",
                }}>
                  Essayer
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5h7M6 3l2.5 2.5L6 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>

            {/* ── CARTE 3 — Agenda Intelligent (vert) ── */}
            <div
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(16,185,129,0.16)",
                borderRadius: "20px",
                padding: "24px 22px",
                display: "flex", flexDirection: "column",
                transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease, border-color 0.28s ease",
                boxShadow: "0 2px 16px rgba(16,185,129,0.06)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-5px)";
                el.style.borderColor = "rgba(16,185,129,0.38)";
                el.style.boxShadow = "0 16px 48px rgba(16,185,129,0.13)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(16,185,129,0.16)";
                el.style.boxShadow = "0 2px 16px rgba(16,185,129,0.06)";
              }}
            >
              <div style={{
                width: "48px", height: "48px", borderRadius: "14px",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                boxShadow: "0 4px 16px rgba(16,185,129,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "14px", flexShrink: 0,
              }}>
                <svg width="26" height="26" viewBox="0 0 44 44" fill="none">
                  <rect x="5" y="10" width="28" height="26" rx="5" fill="white"/>
                  <rect x="5" y="10" width="28" height="9" rx="4" fill="rgba(255,255,255,0.25)"/>
                  <rect x="11" y="5" width="4" height="9" rx="2" fill="rgba(255,255,255,0.80)"/>
                  <rect x="23" y="5" width="4" height="9" rx="2" fill="rgba(255,255,255,0.80)"/>
                  <path d="M13 25L17 29L27 18" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                background: "rgba(16,185,129,0.09)", border: "1px solid rgba(16,185,129,0.22)",
                color: "#059669", fontSize: "10px", fontWeight: 700,
                padding: "3px 10px", borderRadius: "999px",
                marginBottom: "10px", alignSelf: "flex-start",
              }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                Planification auto
              </div>

              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#09132b", marginBottom: "7px", letterSpacing: "-0.01em" }}>
                Agenda Intelligent
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.65, marginBottom: "14px" }}>
                Un calendrier qui s&apos;adapte à votre emploi du temps : détection des conflits, suggestions de créneaux et synchronisation en temps réel.
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px 0", display: "flex", flexDirection: "column", gap: "7px", flex: 1 }}>
                {[
                  "Détection automatique des conflits",
                  "Suggestions de créneaux libres par l'IA",
                  "Sync Google Calendar & Outlook",
                  "Vue semaine, mois et timeline",
                ].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12.5px", color: "#475569" }}>
                    <span style={{
                      width: "16px", height: "16px", borderRadius: "50%",
                      background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: "1px",
                    }}>
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path d="M1.5 4.5l2 2 4-4" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid rgba(16,185,129,0.10)" }}>
                <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600 }}>Zéro double-réservation</span>
                <Link href="/register" style={{
                  display: "inline-flex", alignItems: "center", gap: "4px",
                  fontSize: "11.5px", fontWeight: 700, color: "#059669",
                  background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.22)",
                  padding: "5px 12px", borderRadius: "999px", textDecoration: "none",
                }}>
                  Essayer
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5h7M6 3l2.5 2.5L6 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

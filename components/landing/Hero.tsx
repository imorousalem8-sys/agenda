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
            2. SECTION FONCTIONNALITÉS — DESIGN PREMIUM DARK GLASS
           ========================================================= */}

        {/* Wrapper sombre avec gradient pour donner du contexte visuel aux cartes */}
        <div
          id="fonctionnalites"
          style={{
            background: "linear-gradient(135deg, #0a0f2e 0%, #0d1b4b 45%, #0b1a3f 100%)",
            borderRadius: "32px",
            padding: "clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)",
            marginTop: "16px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Orbes de lumière décoratifs en arrière-plan */}
          <div style={{
            position: "absolute", top: "-80px", left: "10%",
            width: "320px", height: "320px",
            background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
            borderRadius: "50%", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "-60px", right: "8%",
            width: "280px", height: "280px",
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            borderRadius: "50%", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", top: "40%", left: "50%",
            transform: "translateX(-50%)",
            width: "200px", height: "200px",
            background: "radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)",
            borderRadius: "50%", pointerEvents: "none",
          }} />

          {/* Titre de section */}
          <div style={{ textAlign: "center", marginBottom: "clamp(28px, 4vw, 44px)" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.30)",
              color: "#93c5fd",
              fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", padding: "6px 16px",
              borderRadius: "999px", marginBottom: "16px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6", boxShadow: "0 0 8px #3b82f6", display: "inline-block" }} />
              Fonctionnalités clés
            </span>
            <h2 style={{
              fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800,
              color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.2,
              margin: 0,
            }}>
              Tout ce dont vous avez besoin,{" "}
              <span style={{
                background: "linear-gradient(90deg, #60a5fa, #818cf8)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                en un seul endroit
              </span>
            </h2>
          </div>

          {/* Grille des 3 cartes */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>

            {/* ── CARTE 1 : Rappels Vocaux IA ── */}
            <div
              className="feature-card group"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(59,130,246,0.22)",
                borderRadius: "24px",
                padding: "32px 28px",
                display: "flex", flexDirection: "column",
                transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-6px) scale(1.01)";
                el.style.border = "1px solid rgba(59,130,246,0.55)";
                el.style.boxShadow = "0 24px 64px rgba(37,99,235,0.28), inset 0 1px 0 rgba(255,255,255,0.08)";
                el.style.background = "rgba(59,130,246,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0) scale(1)";
                el.style.border = "1px solid rgba(59,130,246,0.22)";
                el.style.boxShadow = "none";
                el.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              {/* Halo d'icône */}
              <div style={{
                width: "60px", height: "60px", borderRadius: "18px",
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                boxShadow: "0 0 24px rgba(37,99,235,0.50), 0 0 6px rgba(37,99,235,0.30)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "22px", flexShrink: 0,
              }}>
                <svg width="30" height="30" viewBox="0 0 44 44" fill="none">
                  <rect x="15" y="6" width="14" height="22" rx="7" fill="white"/>
                  <path d="M9 20C9 27.1797 14.8203 33 22 33C29.1797 33 35 27.1797 35 20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M22 33V39M15 39H29" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M4 17C2 19 2 21 4 25" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M40 17C42 19 42 21 40 25" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.30)",
                color: "#93c5fd", fontSize: "11px", fontWeight: 700,
                padding: "4px 12px", borderRadius: "999px", marginBottom: "14px", alignSelf: "flex-start",
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#60a5fa", animation: "pulse 2s infinite", display: "inline-block" }} />
                IA vocale en temps réel
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                Rappels Vocaux IA
              </h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "20px" }}>
                Votre assistant appelle automatiquement vos contacts avant chaque rendez-vous avec une voix naturelle et personnalisée.
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                {[
                  "Voix IA naturelle FR/EN",
                  "Heure & lieu annoncés automatiquement",
                  "Accusé d'écoute et confirmation vocale",
                  "Planification flexible : J-1, J-7, 1h avant",
                ].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "rgba(255,255,255,0.72)" }}>
                    <span style={{
                      width: "18px", height: "18px", borderRadius: "50%",
                      background: "rgba(59,130,246,0.20)", border: "1px solid rgba(59,130,246,0.40)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px",
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5.5l2 2 4-4" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>+98% de RDV honorés</span>
                <Link href="/register" style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  fontSize: "12px", fontWeight: 700, color: "#60a5fa",
                  background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)",
                  padding: "6px 14px", borderRadius: "999px", textDecoration: "none",
                  transition: "all 0.2s",
                }}>
                  Essayer gratuitement
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>

            {/* ── CARTE 2 : Multi-Canaux SMS ── */}
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(99,102,241,0.22)",
                borderRadius: "24px",
                padding: "32px 28px",
                display: "flex", flexDirection: "column",
                transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-6px) scale(1.01)";
                el.style.border = "1px solid rgba(99,102,241,0.55)";
                el.style.boxShadow = "0 24px 64px rgba(99,102,241,0.28), inset 0 1px 0 rgba(255,255,255,0.08)";
                el.style.background = "rgba(99,102,241,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0) scale(1)";
                el.style.border = "1px solid rgba(99,102,241,0.22)";
                el.style.boxShadow = "none";
                el.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <div style={{
                width: "60px", height: "60px", borderRadius: "18px",
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                boxShadow: "0 0 24px rgba(99,102,241,0.50), 0 0 6px rgba(99,102,241,0.30)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "22px", flexShrink: 0,
              }}>
                <svg width="30" height="30" viewBox="0 0 44 44" fill="none">
                  <rect x="7" y="6" width="20" height="32" rx="4" fill="white"/>
                  <circle cx="17" cy="33" r="1.5" fill="rgba(99,102,241,0.6)"/>
                  <rect x="11" y="10" width="12" height="18" rx="2" fill="rgba(99,102,241,0.15)"/>
                  <rect x="18" y="14" width="20" height="15" rx="4" fill="rgba(255,255,255,0.9)"/>
                  <circle cx="24" cy="21.5" r="1.5" fill="#6366f1"/>
                  <circle cx="28" cy="21.5" r="1.5" fill="#6366f1"/>
                  <circle cx="32" cy="21.5" r="1.5" fill="#6366f1"/>
                </svg>
              </div>

              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.30)",
                color: "#a5b4fc", fontSize: "11px", fontWeight: 700,
                padding: "4px 12px", borderRadius: "999px", marginBottom: "14px", alignSelf: "flex-start",
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#818cf8", display: "inline-block" }} />
                SMS · Email · Push
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                Multi-Canaux SMS
              </h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "20px" }}>
                Touchez chaque client sur le bon canal au bon moment : SMS, email ou notification push, tout est automatique.
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                {[
                  "SMS de confirmation dès la prise de RDV",
                  "Rappel automatique 24 h et 1 h avant",
                  "Email récapitulatif avec lien de modification",
                  "Notification push intégrée à l'appli mobile",
                ].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "rgba(255,255,255,0.72)" }}>
                    <span style={{
                      width: "18px", height: "18px", borderRadius: "50%",
                      background: "rgba(99,102,241,0.20)", border: "1px solid rgba(99,102,241,0.40)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px",
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5.5l2 2 4-4" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>Taux ouverture SMS &gt; 95%</span>
                <Link href="/register" style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  fontSize: "12px", fontWeight: 700, color: "#a5b4fc",
                  background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
                  padding: "6px 14px", borderRadius: "999px", textDecoration: "none",
                }}>
                  Essayer gratuitement
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>

            {/* ── CARTE 3 : Agenda Intelligent ── */}
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(16,185,129,0.22)",
                borderRadius: "24px",
                padding: "32px 28px",
                display: "flex", flexDirection: "column",
                transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-6px) scale(1.01)";
                el.style.border = "1px solid rgba(16,185,129,0.55)";
                el.style.boxShadow = "0 24px 64px rgba(16,185,129,0.20), inset 0 1px 0 rgba(255,255,255,0.08)";
                el.style.background = "rgba(16,185,129,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0) scale(1)";
                el.style.border = "1px solid rgba(16,185,129,0.22)";
                el.style.boxShadow = "none";
                el.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <div style={{
                width: "60px", height: "60px", borderRadius: "18px",
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: "0 0 24px rgba(16,185,129,0.45), 0 0 6px rgba(16,185,129,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "22px", flexShrink: 0,
              }}>
                <svg width="30" height="30" viewBox="0 0 44 44" fill="none">
                  <rect x="5" y="10" width="28" height="26" rx="5" fill="white"/>
                  <rect x="5" y="10" width="28" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>
                  <rect x="11" y="5" width="4" height="8" rx="2" fill="rgba(255,255,255,0.8)"/>
                  <rect x="23" y="5" width="4" height="8" rx="2" fill="rgba(255,255,255,0.8)"/>
                  <path d="M12 24L16 28L25 19" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.28)",
                color: "#6ee7b7", fontSize: "11px", fontWeight: 700,
                padding: "4px 12px", borderRadius: "999px", marginBottom: "14px", alignSelf: "flex-start",
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                Planification auto
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                Agenda Intelligent
              </h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "20px" }}>
                Un calendrier qui s&apos;adapte à votre emploi du temps : détection des conflits, suggestions de créneaux et synchronisation en temps réel.
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                {[
                  "Détection automatique des conflits",
                  "Suggestions de créneaux libres par l'IA",
                  "Sync Google Calendar & Outlook",
                  "Vue semaine, mois et timeline",
                ].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "rgba(255,255,255,0.72)" }}>
                    <span style={{
                      width: "18px", height: "18px", borderRadius: "50%",
                      background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.35)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px",
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5.5l2 2 4-4" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>Zéro double-réservation</span>
                <Link href="/register" style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  fontSize: "12px", fontWeight: 700, color: "#6ee7b7",
                  background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.28)",
                  padding: "6px 14px", borderRadius: "999px", textDecoration: "none",
                }}>
                  Essayer gratuitement
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

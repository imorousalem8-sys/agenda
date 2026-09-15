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
            2. LES 3 TABLEAUX FLOTTANTS STYLISÉS (Copie Conforme de la Maquette)
           ========================================================= */}
        <div id="fonctionnalites" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full pt-4">
          
          {/* CARTE 1 : Rappels Vocaux IA */}
          <div className="bg-white rounded-2xl sm:rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_45px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-start group">
            {/* Badge stat */}
            <div className="mb-4 inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              IA vocale en temps réel
            </div>

            {/* Icône Stylisée Micro + Ondes Bleues */}
            <div className="mb-5 text-blue-600">
              <svg className="w-11 h-11" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="6" width="14" height="22" rx="7" fill="#2563eb"/>
                <path d="M9 20C9 27.1797 14.8203 33 22 33C29.1797 33 35 27.1797 35 20" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round"/>
                <path d="M22 33V39M15 39H29" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round"/>
                <path d="M4 17C4 17 2 19 2 21C2 23 4 25 4 25" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M40 17C40 17 42 19 42 21C42 23 40 25 40 25" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>

            <h3 className="text-xl sm:text-[21px] font-bold text-[#09132b] mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
              Rappels Vocaux IA
            </h3>
            
            <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed font-normal mb-5">
              Votre assistant appelle automatiquement vos contacts avant chaque rendez-vous avec un message vocal naturel et personnalisé.
            </p>

            {/* Liste de fonctionnalités */}
            <ul className="space-y-2 mb-6 flex-1">
              {[
                "Voix naturelle synthétisée par IA (FR/EN)",
                "Heure & lieu du RDV annoncés automatiquement",
                "Accusé d'écoute et confirmation vocale",
                "Planification flexible : J-1, J-7, 1h avant",
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#eff6ff"/>
                    <path d="M5 8.5l2 2 4-4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>

            {/* Stat + Lien */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-medium">+98% de RDV honorés</span>
              <Link href="/register" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                Essayer gratuitement
                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>

          {/* CARTE 2 : Multi-Canaux SMS */}
          <div className="bg-white rounded-2xl sm:rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_45px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-start group">
            {/* Badge stat */}
            <div className="mb-4 inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              SMS · Email · Push
            </div>

            {/* Icône Stylisée Téléphone + Bulle SMS */}
            <div className="mb-5 text-blue-600">
              <svg className="w-11 h-11" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="7" y="6" width="20" height="32" rx="4" fill="#2563eb"/>
                <circle cx="17" cy="33" r="1.5" fill="white"/>
                <rect x="11" y="10" width="12" height="18" rx="2" fill="white"/>
                <rect x="18" y="14" width="20" height="15" rx="4" fill="#1d4ed8"/>
                <circle cx="24" cy="21.5" r="1.5" fill="white"/>
                <circle cx="28" cy="21.5" r="1.5" fill="white"/>
                <circle cx="32" cy="21.5" r="1.5" fill="white"/>
              </svg>
            </div>

            <h3 className="text-xl sm:text-[21px] font-bold text-[#09132b] mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
              Multi-Canaux SMS
            </h3>
            
            <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed font-normal mb-5">
              Touchez chaque client sur le bon canal au bon moment : SMS, email ou notification push, tout est automatique.
            </p>

            {/* Liste de fonctionnalités */}
            <ul className="space-y-2 mb-6 flex-1">
              {[
                "SMS de confirmation dès la prise de RDV",
                "Rappel automatique 24 h et 1 h avant",
                "Email récapitulatif avec lien de modification",
                "Notification push intégrée à l'appli mobile",
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#eef2ff"/>
                    <path d="M5 8.5l2 2 4-4" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>

            {/* Stat + Lien */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-medium">Taux d'ouverture SMS &gt; 95 %</span>
              <Link href="/register" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">
                Essayer gratuitement
                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>

          {/* CARTE 3 : Agenda Intelligent */}
          <div className="bg-white rounded-2xl sm:rounded-[22px] p-7 sm:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_45px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-start group">
            {/* Badge stat */}
            <div className="mb-4 inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Planification auto
            </div>

            {/* Icône Stylisée Calendrier + Engrenage */}
            <div className="mb-5 text-blue-600">
              <svg className="w-11 h-11" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="10" width="28" height="26" rx="5" fill="#2563eb"/>
                <rect x="5" y="10" width="28" height="8" rx="4" fill="#1d4ed8"/>
                <rect x="11" y="5" width="4" height="8" rx="2" fill="#93c5fd"/>
                <rect x="23" y="5" width="4" height="8" rx="2" fill="#93c5fd"/>
                <path d="M12 24L16 28L25 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="33" cy="31" r="7" fill="#1e40af"/>
                <circle cx="33" cy="31" r="3" fill="white"/>
              </svg>
            </div>

            <h3 className="text-xl sm:text-[21px] font-bold text-[#09132b] mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
              Agenda Intelligent
            </h3>
            
            <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed font-normal mb-5">
              Un calendrier qui s&apos;adapte à votre emploi du temps : détection des conflits, suggestions de créneaux et synchronisation en temps réel.
            </p>

            {/* Liste de fonctionnalités */}
            <ul className="space-y-2 mb-6 flex-1">
              {[
                "Détection automatique des conflits de planning",
                "Suggestions de créneaux libres par l'IA",
                "Synchronisation Google Calendar & Outlook",
                "Vue semaine, mois et timeline en un clic",
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#ecfdf5"/>
                    <path d="M5 8.5l2 2 4-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>

            {/* Stat + Lien */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-medium">Zéro double-réservation</span>
              <Link href="/register" className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors flex items-center gap-1">
                Essayer gratuitement
                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

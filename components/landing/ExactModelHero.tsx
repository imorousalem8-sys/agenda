"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { playAlertChime } from "@/lib/voice";

export default function ExactModelHero() {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const handlePlayVoice = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (isPlayingVoice) {
        window.speechSynthesis.cancel();
        setIsPlayingVoice(false);
        return;
      }
      playAlertChime();
      setIsPlayingVoice(true);
      const utterance = new SpeechSynthesisUtterance(
        "Bonjour ! C'est votre assistant vocal Alamajonda. Votre rendez-vous est programmé aujourd'hui à 14 heures 30."
      );
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-[#f9fbff] via-white to-white pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden">
      
      {/* Conteneur principal fluide et cadré exactement comme la maquette */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        
        {/* ========================================================
            STAGE HERO : 2 COLONNES EXACTEMENT COMME LA MAQUETTE
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Colonne Gauche : Titre + Sous-titre + Bouton En savoir plus */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center pr-0 lg:pr-4 z-10">
            
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#09132b] tracking-tight leading-[1.12] mb-6 text-left">
              Ne manquez plus aucun <br className="hidden sm:inline" />
              rendez-vous important
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-lg text-left">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda sans effort, précise et automatisée.
            </p>

            <Link
              href="#cartes-presentation"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-bold text-white bg-[#1d4ed8] hover:bg-[#1e40af] shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all"
            >
              En savoir plus
            </Link>

          </div>

          {/* Colonne Droite : Femme d'affaires au bureau + Bulle d'appel vocal */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            
            <div className="relative w-full max-w-[560px] aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 shadow-xl shadow-slate-200/50 group">
              <Image
                src="/images/hero-businesswoman.jpg"
                alt="Femme d'affaires souriante utilisant l'assistant vocal Alamajonda"
                fill
                priority
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />

              {/* Bulle d'Appel Vocal Flottante (Exactement comme la maquette) */}
              <div
                onClick={handlePlayVoice}
                className="absolute top-[38%] left-4 sm:left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_30px_rgba(0,0,0,0.12)] border border-blue-100/80 flex items-center gap-3.5 z-20 max-w-[270px] sm:max-w-[290px] cursor-pointer hover:scale-105 transition-all group/bubble"
                title="Cliquer pour écouter l'annonce vocale"
              >
                {/* Icône Ondes Sonores Bleues */}
                <div className="flex items-center gap-1 text-blue-600 px-1 py-1.5 shrink-0">
                  <span className={`w-1 bg-blue-600 rounded-full ${isPlayingVoice ? 'h-5 animate-pulse' : 'h-3'}`} />
                  <span className={`w-1 bg-blue-600 rounded-full ${isPlayingVoice ? 'h-7 animate-pulse delay-75' : 'h-5'}`} />
                  <span className={`w-1 bg-blue-600 rounded-full ${isPlayingVoice ? 'h-9 animate-pulse delay-150' : 'h-7'}`} />
                  <span className={`w-1 bg-blue-600 rounded-full ${isPlayingVoice ? 'h-6 animate-pulse delay-100' : 'h-4'}`} />
                  <span className={`w-1 bg-blue-600 rounded-full ${isPlayingVoice ? 'h-3 animate-pulse delay-200' : 'h-2'}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm sm:text-[15px] font-bold text-[#09132b] leading-snug">
                    Appel Vocal
                  </div>
                  <div className="text-xs text-slate-500 font-medium truncate mt-0.5">
                    {isPlayingVoice ? "Lecture en direct..." : "Programmé à 14h30"}
                  </div>
                </div>

                {/* Petite flèche indicatrice de la bulle vers le smartphone */}
                <div className="absolute -bottom-2 left-10 w-4 h-4 bg-white rotate-45 border-r border-b border-blue-100/80 -z-10" />
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================
            3 CARTES BLANCHES AU BAS DU HERO (EXACTEMENT COMME LA MAQUETTE)
           ======================================================== */}
        <div id="cartes-presentation" className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 mt-12 sm:mt-16 items-stretch">
          
          {/* CARTE 1 : Rappels Vocaux IA */}
          <div className="p-7 sm:p-8 rounded-[24px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Icône Micro avec ondes vocales (Style Maquette) */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50/80 text-blue-600 flex items-center justify-center mb-5 border border-blue-100/60 shadow-xs">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                  {/* Petites ondes latérales */}
                  <path d="M2 10a10 10 0 0 0 1 4" strokeWidth="1.5" strokeOpacity="0.7"/>
                  <path d="M22 10a10 10 0 0 1-1 4" strokeWidth="1.5" strokeOpacity="0.7"/>
                </svg>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#09132b] mb-2 tracking-tight">
                Rappels Vocaux IA
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                Planifiez des rappels vocaux clairs et naturels en quelques secondes.
              </p>
            </div>
          </div>

          {/* CARTE 2 : Multi-Canaux SMS */}
          <div className="p-7 sm:p-8 rounded-[24px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Icône Smartphone avec bulle SMS (Style Maquette) */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50/80 text-blue-600 flex items-center justify-center mb-5 border border-blue-100/60 shadow-xs">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                  <path d="M12 18h.01"/>
                  {/* Bulle SMS à côté */}
                  <path d="M16 6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1l-2 2v-2h-1" strokeWidth="1.8"/>
                </svg>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#09132b] mb-2 tracking-tight">
                Multi-Canaux SMS
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                Envoyez des confirmations et rappels automatiques par SMS pour une portée maximale.
              </p>
            </div>
          </div>

          {/* CARTE 3 : Agenda Intelligent */}
          <div className="p-7 sm:p-8 rounded-[24px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Icône Calendrier avec réglage (Style Maquette) */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50/80 text-blue-600 flex items-center justify-center mb-5 border border-blue-100/60 shadow-xs">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <rect width="18" height="18" x="3" y="4" rx="2"/>
                  <path d="M16 2v4"/>
                  <path d="M8 2v4"/>
                  <path d="M3 10h18"/>
                  <path d="m9 16 2 2 4-4"/>
                </svg>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#09132b] mb-2 tracking-tight">
                Agenda Intelligent
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                Organisez vos rendez-vous, réunions et tâches avec une planification intelligente.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

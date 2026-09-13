"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppDetailsModal from "./AppDetailsModal";

export default function Hero() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
    <section className="relative w-full bg-white text-slate-900 pt-8 sm:pt-12 pb-16 sm:pb-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* =========================================================
            1. HERO STAGE : 2 COLONNES (TEXTE GAUCHE / PHOTO DROITE)
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-14">
          
          {/* A. Colonne Gauche : Titre + Sous-Titre + Bouton En Savoir Plus */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center pr-0 lg:pr-2 z-10">
            
            {/* Grand Titre Exact (Identique à la maquette) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[46px] font-black text-[#0b152e] tracking-tight leading-[1.18] mb-4 text-left">
              Ne manquez plus aucun <br className="hidden sm:inline" />
              rendez-vous important
            </h1>

            {/* Sous-titre Exact */}
            <p className="text-base lg:text-[17px] text-slate-600 font-normal leading-relaxed mb-8 max-w-[480px] text-left">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda sans effort, précise et automatisée.
            </p>

            {/* Bouton Bleu En savoir plus */}
            <div>
              <button
                type="button"
                onClick={() => setShowDetailsModal(true)}
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-xl font-semibold text-sm sm:text-base text-white bg-[#155dfc] hover:bg-blue-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                En savoir plus
              </button>
            </div>
          </div>

          {/* B. Colonne Droite : Femme d'Affaires + Bulle Appel Vocal */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
              <Image
                src="/images/hero-businesswoman.jpg"
                alt="Femme professionnelle utilisant l'assistant vocal Alamajonda"
                fill
                priority
                className="object-cover object-center"
              />

              {/* Bulle d'Appel Vocal Flottante (Identique à la maquette) */}
              <div className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-6 bg-[#ebf3ff]/95 backdrop-blur-md border border-[#c7dfff] rounded-2xl p-3 sm:p-3.5 shadow-xl flex items-center gap-3 z-20 max-w-[250px] sm:max-w-[270px]">
                {/* Icône Onde Sonore Bleue */}
                <div className="flex items-center gap-0.5 h-6 px-1">
                  <span className="w-1 h-3 bg-[#155dfc] rounded-full" />
                  <span className="w-1 h-5 bg-[#155dfc] rounded-full" />
                  <span className="w-1 h-6 bg-[#155dfc] rounded-full animate-pulse" />
                  <span className="w-1 h-4 bg-[#155dfc] rounded-full" />
                  <span className="w-1 h-2 bg-[#155dfc] rounded-full" />
                </div>

                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    Appel Vocal
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-600 font-medium mt-0.5">
                    Programmé à 14h30
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================
            2. LES 3 CARTES BLANCHES FLOTTANTES DU BAS (Identique 1:1)
           ========================================================= */}
        <div id="fonctionnalites" className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 w-full max-w-5xl">
          
          {/* CARTE 1 : Rappels Vocaux IA */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_12px_35px_rgba(0,0,0,0.06)] border border-slate-100/90 hover:shadow-[0_16px_45px_rgba(0,0,0,0.09)] transition-all flex flex-col justify-between">
            <div>
              {/* Icône Micro avec Ondes Bleues */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Micro central */}
                  <rect x="15" y="8" width="10" height="16" rx="5" fill="#155dfc" />
                  <path d="M10 18C10 23.5228 14.4772 28 20 28C25.5228 28 30 23.5228 30 18" stroke="#155dfc" strokeWidth="3" strokeLinecap="round" />
                  <line x1="20" y1="28" x2="20" y2="34" stroke="#155dfc" strokeWidth="3" strokeLinecap="round" />
                  <line x1="14" y1="34" x2="26" y2="34" stroke="#155dfc" strokeWidth="3" strokeLinecap="round" />
                  {/* Ondes latérales */}
                  <path d="M6 16C6 14 6 22 6 20" stroke="#155dfc" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M34 16C34 14 34 22 34 20" stroke="#155dfc" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#0b152e] mb-1.5">
                Rappels Vocaux IA
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Planifiez des rappels vocaux clairs et naturels en quelques secondes.
              </p>
            </div>
          </div>

          {/* CARTE 2 : Multi-Canaux SMS */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_12px_35px_rgba(0,0,0,0.06)] border border-slate-100/90 hover:shadow-[0_16px_45px_rgba(0,0,0,0.09)] transition-all flex flex-col justify-between">
            <div>
              {/* Icône Téléphone avec Bulle SMS Bleue */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Téléphone */}
                  <rect x="8" y="6" width="16" height="28" rx="3.5" stroke="#155dfc" strokeWidth="3" fill="none" />
                  <circle cx="16" cy="29" r="1.5" fill="#155dfc" />
                  {/* Bulle SMS */}
                  <rect x="18" y="10" width="16" height="12" rx="3" fill="#155dfc" />
                  <circle cx="22" cy="16" r="1.2" fill="white" />
                  <circle cx="26" cy="16" r="1.2" fill="white" />
                  <circle cx="30" cy="16" r="1.2" fill="white" />
                </svg>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#0b152e] mb-1.5">
                Multi-Canaux SMS
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Envoyez des confirmations et rappels automatiques par SMS pour une portée maximale.
              </p>
            </div>
          </div>

          {/* CARTE 3 : Agenda Intelligent */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_12px_35px_rgba(0,0,0,0.06)] border border-slate-100/90 hover:shadow-[0_16px_45px_rgba(0,0,0,0.09)] transition-all flex flex-col justify-between">
            <div>
              {/* Icône Calendrier avec Engrenage & Coche Bleue */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Calendrier */}
                  <rect x="7" y="10" width="22" height="22" rx="4" stroke="#155dfc" strokeWidth="3" fill="none" />
                  <line x1="7" y1="17" x2="29" y2="17" stroke="#155dfc" strokeWidth="2.5" />
                  <line x1="12" y1="6" x2="12" y2="11" stroke="#155dfc" strokeWidth="3" strokeLinecap="round" />
                  <line x1="24" y1="6" x2="24" y2="11" stroke="#155dfc" strokeWidth="3" strokeLinecap="round" />
                  {/* Coche */}
                  <path d="M13 24L16 27L23 20" stroke="#155dfc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Engrenage */}
                  <circle cx="28" cy="28" r="4.5" fill="#155dfc" stroke="white" strokeWidth="1.5" />
                </svg>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#0b152e] mb-1.5">
                Agenda Intelligent
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Organisez vos rendez-vous, réunions et tâches avec une planification intelligente.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Modale En Savoir Plus */}
      <AppDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />
    </section>
  );
}

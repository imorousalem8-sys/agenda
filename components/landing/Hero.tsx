"use client";

import React, { useState } from "react";
import Image from "next/image";
import AppDetailsModal from "./AppDetailsModal";

export default function Hero() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
    <section className="relative w-full bg-white text-slate-900 pt-6 sm:pt-10 pb-16 sm:pb-24 font-sans overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* =========================================================
            1. HERO TOP ROW : TEXTE À GAUCHE & PHOTO À DROITE
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* A. Colonne Gauche : Titre + Sous-Titre + Bouton En Savoir Plus */}
          <div className="lg:col-span-6 flex flex-col items-start pt-4 lg:pt-8 pr-0 lg:pr-4 z-10">
            
            {/* Grand Titre (Identique à la maquette) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[48px] font-black text-[#0b152e] tracking-tight leading-[1.15] mb-4 text-left">
              Ne manquez plus aucun <br className="hidden sm:inline" />
              rendez-vous important
            </h1>

            {/* Sous-titre */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-[460px] text-left">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda sans effort, précise et automatisée.
            </p>

            {/* Bouton Bleu En savoir plus */}
            <div className="mb-10 lg:mb-12">
              <button
                type="button"
                onClick={() => setShowDetailsModal(true)}
                className="inline-flex items-center justify-center px-7 py-3 rounded-lg font-semibold text-sm sm:text-base text-white bg-[#155dfc] hover:bg-blue-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                En savoir plus
              </button>
            </div>
          </div>

          {/* B. Colonne Droite : Photo Exacte de la Maquette */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[580px] aspect-[1.08] rounded-3xl overflow-hidden shadow-2xl bg-slate-50">
              <Image
                src="/images/businesswoman-reference-photo.jpg"
                alt="Femme professionnelle utilisant l'assistant vocal Alamajonda"
                fill
                priority
                className="object-cover object-top"
              />
            </div>
          </div>

        </div>

        {/* =========================================================
            2. LES 3 CARTES BLANCHES DU BAS (Avec la 3e qui chevauche la photo)
           ========================================================= */}
        <div id="fonctionnalites" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6 max-w-[900px] -mt-6 lg:-mt-24 relative z-30">
          
          {/* CARTE 1 : Rappels Vocaux IA */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100/90 hover:shadow-[0_20px_45px_rgba(0,0,0,0.09)] transition-all flex flex-col justify-between">
            <div>
              {/* Icône Micro avec Ondes Bleues */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="15" y="8" width="10" height="16" rx="5" fill="#155dfc" />
                  <path d="M10 18C10 23.5228 14.4772 28 20 28C25.5228 28 30 23.5228 30 18" stroke="#155dfc" strokeWidth="3" strokeLinecap="round" />
                  <line x1="20" y1="28" x2="20" y2="34" stroke="#155dfc" strokeWidth="3" strokeLinecap="round" />
                  <line x1="14" y1="34" x2="26" y2="34" stroke="#155dfc" strokeWidth="3" strokeLinecap="round" />
                  <path d="M6 16C6 14 6 22 6 20" stroke="#155dfc" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M34 16C34 14 34 22 34 20" stroke="#155dfc" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>

              <h3 className="text-base font-bold text-[#0b152e] mb-1.5">
                Rappels Vocaux IA
              </h3>
              
              <p className="text-xs text-slate-600 leading-relaxed">
                Planifiez des rappels vocaux clairs et naturels en quelques secondes.
              </p>
            </div>
          </div>

          {/* CARTE 2 : Multi-Canaux SMS */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100/90 hover:shadow-[0_20px_45px_rgba(0,0,0,0.09)] transition-all flex flex-col justify-between">
            <div>
              {/* Icône Téléphone avec Bulle SMS Bleue */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="6" width="16" height="28" rx="3.5" stroke="#155dfc" strokeWidth="3" fill="none" />
                  <circle cx="16" cy="29" r="1.5" fill="#155dfc" />
                  <rect x="18" y="10" width="16" height="12" rx="3" fill="#155dfc" />
                  <circle cx="22" cy="16" r="1.2" fill="white" />
                  <circle cx="26" cy="16" r="1.2" fill="white" />
                  <circle cx="30" cy="16" r="1.2" fill="white" />
                </svg>
              </div>

              <h3 className="text-base font-bold text-[#0b152e] mb-1.5">
                Multi-Canaux SMS
              </h3>
              
              <p className="text-xs text-slate-600 leading-relaxed">
                Envoyez des confirmations et rappels automatiques par SMS pour une portée maximale.
              </p>
            </div>
          </div>

          {/* CARTE 3 : Agenda Intelligent (Chevauche la photo comme sur la maquette) */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100/90 hover:shadow-[0_20px_45px_rgba(0,0,0,0.09)] transition-all flex flex-col justify-between">
            <div>
              {/* Icône Calendrier avec Engrenage & Coche Bleue */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="7" y="10" width="22" height="22" rx="4" stroke="#155dfc" strokeWidth="3" fill="none" />
                  <line x1="7" y1="17" x2="29" y2="17" stroke="#155dfc" strokeWidth="2.5" />
                  <line x1="12" y1="6" x2="12" y2="11" stroke="#155dfc" strokeWidth="3" strokeLinecap="round" />
                  <line x1="24" y1="6" x2="24" y2="11" stroke="#155dfc" strokeWidth="3" strokeLinecap="round" />
                  <path d="M13 24L16 27L23 20" stroke="#155dfc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="28" cy="28" r="4.5" fill="#155dfc" stroke="white" strokeWidth="1.5" />
                </svg>
              </div>

              <h3 className="text-base font-bold text-[#0b152e] mb-1.5">
                Agenda Intelligent
              </h3>
              
              <p className="text-xs text-slate-600 leading-relaxed">
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

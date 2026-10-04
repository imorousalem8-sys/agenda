"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Square, ArrowRight, Mic, MessageSquare, Calendar, Sparkles, CheckCircle2 } from "lucide-react";
import { playAlertChime } from "@/lib/voice";

export default function CenteredHero() {
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
    <section className="relative w-full pt-12 sm:pt-16 pb-24 sm:pb-32 overflow-hidden bg-gradient-to-b from-[#f8faff] via-white to-white">
      {/* Halo lumineux d'ambiance centré */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-blue-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            1. TITRE ET SOUS-TITRE ENTIÈREMENT CENTRÉS (ORGANISÉS)
           ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          
          {/* Badge discret */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            <Sparkles size={13} className="text-blue-600" />
            <span>ASSISTANT VOCAL IA · NOUVELLE GÉNÉRATION</span>
          </div>

          {/* Grand Titre Centré */}
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#09132b] tracking-tight leading-[1.10] mb-5">
            Ne manquez plus aucun <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              rendez-vous important
            </span>
          </h1>

          {/* Sous-titre aéré et centré */}
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
            L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda sans effort, précise et automatisée.
          </p>

          {/* Boutons d'Action Centrés */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-[#1d4ed8] hover:bg-[#1e40af] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 hover:-translate-y-0.5 transition-all"
            >
              <span>Commencer Gratuitement</span>
              <ArrowRight size={17} />
            </Link>

            <button
              onClick={handlePlayVoice}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-700 hover:text-blue-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                {isPlayingVoice ? <Square size={11} className="fill-blue-600" /> : <Play size={11} className="fill-blue-600 ml-0.5" />}
              </div>
              <span>{isPlayingVoice ? "Arrêter la voix" : "Écouter l'assistant"}</span>
            </button>
          </div>

        </div>

        {/* ========================================================
            2. L'IMAGE BIEN AU MILIEU (ET NON À CÔTÉ !)
           ======================================================== */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="relative w-full rounded-[32px] overflow-hidden p-2 sm:p-3 bg-white/90 backdrop-blur-2xl border border-white shadow-[0_25px_70px_rgba(37,99,235,0.15)] ring-1 ring-blue-500/10">
            
            {/* Cadre de l'image centrale */}
            <div className="relative w-full h-[340px] sm:h-[460px] lg:h-[500px] rounded-[24px] overflow-hidden bg-slate-100">
              <Image
                src="/images/hero-businesswoman.jpg"
                alt="Femme d'affaires sereine avec l'assistant Alamajonda"
                fill
                priority
                className="object-cover object-[center_20%]"
              />

              {/* Voile translucide pour la bulle */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />

              {/* Bulle d'Appel Vocal Flottante Centrée/À gauche sur l'image */}
              <div
                onClick={handlePlayVoice}
                className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.14)] border border-blue-100 flex items-center gap-3.5 z-20 max-w-[280px] cursor-pointer hover:scale-105 transition-all group"
                title="Cliquer pour écouter l'annonce"
              >
                {/* Logo Officiel ou Onde */}
                <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-sm shrink-0 border border-blue-200">
                  <Image src="/logo.png" alt="Logo" fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-black text-[#09132b] leading-tight">
                    Appel Vocal
                  </div>
                  <div className="text-xs text-blue-600 font-bold mt-0.5">
                    {isPlayingVoice ? "Diffusion vocale en direct..." : "Programmé à 14h30"}
                  </div>
                  {/* Onde sonore animée */}
                  <div className="flex items-center gap-1 mt-1.5 h-2.5">
                    {[40, 85, 50, 100, 65, 90, 45].map((h, i) => (
                      <span
                        key={i}
                        className={`w-0.5 rounded-full bg-blue-600 ${isPlayingVoice ? 'animate-pulse' : 'opacity-50'}`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Badge de statut à droite */}
              <div className="hidden sm:flex absolute bottom-8 right-8 bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 shadow-xl border border-white items-center gap-3 z-20">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <div className="text-xs font-black text-[#09132b]">Agenda Synchronisé</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">Zéro retard garanti</div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================
            3. LES 3 CARTES BIEN ORGANISÉES ET PARFAITEMENT ALIGNÉES
           ======================================================== */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            
            {/* Carte 1 : Rappels Vocaux IA */}
            <div className="p-7 sm:p-8 rounded-[24px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_45px_rgba(37,99,235,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100/60 shadow-xs">
                  <Mic size={22} className="text-blue-600" />
                </div>

                <h3 className="text-lg font-black text-[#09132b] mb-2">
                  Rappels Vocaux IA
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Planifiez des rappels vocaux clairs et naturels en quelques secondes.
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 text-xs font-bold text-blue-600">
                Sonnerie réelle assurée
              </div>
            </div>

            {/* Carte 2 : Multi-Canaux SMS */}
            <div className="p-7 sm:p-8 rounded-[24px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_45px_rgba(37,99,235,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100/60 shadow-xs">
                  <MessageSquare size={22} className="text-blue-600" />
                </div>

                <h3 className="text-lg font-black text-[#09132b] mb-2">
                  Multi-Canaux SMS
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Envoyez des confirmations et rappels automatiques par SMS pour une portée maximale.
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 text-xs font-bold text-blue-600">
                Délivrance 100% garantie
              </div>
            </div>

            {/* Carte 3 : Agenda Intelligent */}
            <div className="p-7 sm:p-8 rounded-[24px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_45px_rgba(37,99,235,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100/60 shadow-xs">
                  <Calendar size={22} className="text-blue-600" />
                </div>

                <h3 className="text-lg font-black text-[#09132b] mb-2">
                  Agenda Intelligent
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Organisez vos rendez-vous, réunions et tâches avec une planification intelligente.
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 text-xs font-bold text-blue-600">
                Synchronisation Google &amp; Outlook
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

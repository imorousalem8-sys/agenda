"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Play, Square, Volume2, PhoneCall, CheckCircle2, ShieldCheck } from "lucide-react";
import { playAlertChime } from "@/lib/voice";

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
        "Bonjour ! C'est votre assistant AlarmAgenda. Vous avez un rendez-vous important aujourd'hui à 14 heures 30. Je reste à votre disposition."
      );
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="relative w-full pt-10 sm:pt-16 pb-16 sm:pb-24 overflow-hidden">
      {/* Halo d'ambiance bleuté et blanc ultra-doux */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-blue-100/60 via-indigo-50/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            1. ÉCRITURES EN HAUT : COURTES, ÉPURÉES & CENTRÉES
           ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          
          {/* Badge discret translucide */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-blue-200/70 shadow-sm text-blue-700 text-xs font-bold uppercase tracking-wider mb-5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>ASSISTANT VOCAL IA · ZÉRO RETARD</span>
          </div>

          {/* Grand Titre net */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#09132b] tracking-tight leading-[1.08] mb-5">
            Ne manquez plus aucun <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              rendez-vous important.
            </span>
          </h1>

          {/* Une seule phrase courte et claire */}
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
            AlarmAgenda vous appelle au bon moment et veille sur chaque échéance de votre journée.
          </p>

          {/* Boutons d'action compacts */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={handlePlayVoiceDemo}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold text-slate-700 hover:text-blue-700 bg-white/85 backdrop-blur-xl border border-blue-100 hover:border-blue-300 shadow-sm transition-all"
            >
              <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200/60">
                {isPlayingVoice ? <Square size={12} className="fill-blue-600" /> : <Play size={12} className="fill-blue-600 ml-0.5" />}
              </div>
              <span>{isPlayingVoice ? "Arrêter la voix" : "Écouter l'assistant"}</span>
            </button>
          </div>

        </div>

        {/* ========================================================
            2. VUE D'IMAGE GRAND FORMAT : OCCUPE L'ENTIÈRETÉ DU PLAN
           ======================================================== */}
        <div className="relative w-full rounded-[36px] overflow-hidden p-2 sm:p-3 bg-white/80 backdrop-blur-2xl border border-white/95 shadow-[0_30px_90px_-20px_rgba(37,99,235,0.22)] group">
          
          <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[560px] rounded-[28px] overflow-hidden bg-slate-100">
            <Image
              src="/images/hero-businesswoman.jpg"
              alt="Femme d'affaires sereine avec son assistant vocal AlarmAgenda"
              fill
              priority
              className="object-cover object-[center_20%] group-hover:scale-102 transition-transform duration-700"
            />

            {/* Voile translucide pour les cartes superposées */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />

            {/* Carte Flottante Gauche : Alerte Vocale avec le logo officiel */}
            <div
              onClick={handlePlayVoiceDemo}
              className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-white/90 backdrop-blur-2xl rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.15)] border border-white/95 flex items-center gap-3.5 z-20 max-w-[280px] cursor-pointer hover:scale-105 transition-all group/call"
              title="Cliquer pour écouter l'annonce"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md shadow-blue-500/25 shrink-0 border border-blue-200">
                <Image
                  src="/logo.png"
                  alt="Logo AlarmAgenda"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#09132b]">
                    Appel Vocal IA
                  </span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="text-[11px] text-blue-600 font-bold truncate mt-0.5">
                  {isPlayingVoice ? "Diffusion vocale en direct..." : "Programmé pour 14h30"}
                </div>
                <div className="flex items-center gap-1 mt-1.5 h-2.5">
                  {[40, 80, 50, 100, 70, 90, 40].map((h, i) => (
                    <span
                      key={i}
                      className={`w-0.5 rounded-full bg-blue-600 ${isPlayingVoice ? 'animate-pulse' : 'opacity-50'}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Carte Flottante Droite : Statut Confirmé */}
            <div className="hidden sm:flex absolute bottom-8 right-8 bg-white/90 backdrop-blur-2xl rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.15)] border border-white/95 items-center gap-3 z-20 max-w-[250px]">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
                <CheckCircle2 size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black text-[#09132b]">
                  Agenda synchronisé
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  Zéro retard · Ponctualité 100%
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================
            3. BARRE DE GARANTIES MINIMALISTE (3 POINTS)
           ======================================================== */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">★★★★★</span>
            <span className="text-slate-700">4.9/5 par les utilisateurs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-emerald-500" />
            <span>Gratuit sans carte bancaire</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-blue-600" />
            <span>Données protégées RGPD</span>
          </div>
        </div>

      </div>
    </section>
  );
}

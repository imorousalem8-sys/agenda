"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Play, Square, Volume2, ShieldCheck, CheckCircle2, PhoneCall, Calendar, Clock, Star, Users } from "lucide-react";
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
        "Bonjour ! C'est votre assistant personnel AlarmAgenda. Vous avez un rendez-vous stratégique aujourd'hui à 14 heures 30. Souhaitez-vous le confirmer ou le reporter de dix minutes ?"
      );
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="relative w-full pt-8 sm:pt-14 pb-14 sm:pb-20 overflow-hidden">
      {/* Halos d'ambiance bleutés et blancs ultra-doux */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-blue-100/60 via-indigo-50/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute top-40 left-10 w-96 h-96 bg-indigo-300/10 rounded-full blur-2xl -z-10 pointer-events-none" />

      {/* Conteneur principal fluide */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ==========================================
              COLONNE GAUCHE : TITRE & CTA
             ========================================== */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center z-10">
            
            {/* Pill Badge Translucide Haut de Gamme */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-blue-200/80 shadow-[0_2px_12px_rgba(37,99,235,0.08)] mb-6 hover:border-blue-300 transition-colors">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Assistant Vocal IA Intelligent · Zéro Retard
              </span>
              <Sparkles size={13} className="text-blue-500" />
            </div>

            {/* Titre Majeur & Percutant */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#09132b] tracking-tight leading-[1.08] mb-6 text-left">
              Ne manquez plus aucun <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                rendez-vous important
              </span>
            </h1>

            {/* Sous-titre Aéré */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-xl text-left">
              L&apos;assistant vocal IA qui appelle directement votre téléphone, synchronise votre calendrier en temps réel et veille à ce que vous soyez toujours à l&apos;heure, sans aucun stress.
            </p>

            {/* Double CTA : Inscription + Démo Audio Immédiate */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                href="/register"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all overflow-hidden"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                <span>Commencer gratuitement</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Bouton Lecteur Démo Vocale en verre dépoli */}
              <button
                onClick={handlePlayVoiceDemo}
                type="button"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold text-slate-700 hover:text-blue-700 bg-white/80 backdrop-blur-xl border border-blue-100 hover:border-blue-300 shadow-md shadow-blue-900/5 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200/60 shadow-inner">
                  {isPlayingVoice ? <Square size={14} className="fill-blue-600" /> : <Play size={14} className="fill-blue-600 ml-0.5" />}
                </div>
                <div className="text-left">
                  <div className="text-xs font-extrabold text-[#09132b]">
                    {isPlayingVoice ? "Arrêter l'écoute" : "Écouter la voix IA"}
                  </div>
                  <div className="text-[11px] text-blue-600 font-semibold">
                    {isPlayingVoice ? "Lecture en direct..." : "Démo en 5 secondes"}
                  </div>
                </div>
              </button>
            </div>

            {/* Preuves Sociales et Garanties */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-200/60 w-full text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold text-sm">★★★★★</span>
                <span className="font-bold text-slate-700">4.9/5</span>
                <span>(+2 400 professionnels conquis)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>Sans carte bancaire</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-blue-600" />
                <span>RGPD &amp; Sécurisé AES-256</span>
              </div>
            </div>

          </div>

          {/* ==========================================
              COLONNE DROITE : VISUEL FOURNI PAR L'UTILISATEUR
             ========================================== */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Halo lumineux d'accentuation */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-blue-600/15 rounded-[40px] blur-2xl -z-10" />

            {/* Cadre Visuel Principal en Verre Dépoli */}
            <div className="relative w-full max-w-[520px] aspect-[4/3] rounded-[32px] overflow-hidden p-2.5 bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_25px_60px_-15px_rgba(37,99,235,0.20)] group">
              
              <div className="relative w-full h-full rounded-[24px] overflow-hidden">
                <Image
                  src="/images/hero-businesswoman.jpg"
                  alt="Femme d'affaires utilisant l'assistant vocal IA AlarmAgenda"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Léger voile dégradé transparent */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Widget Flottant 1 : Appel Vocal IA avec le Logo Officiel */}
              <div
                onClick={handlePlayVoiceDemo}
                className="absolute top-6 left-6 bg-white/90 backdrop-blur-2xl rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.14)] border border-white flex items-center gap-3.5 z-20 max-w-[270px] cursor-pointer hover:scale-105 transition-all group/widget"
                title="Cliquer pour écouter l'annonce vocale"
              >
                {/* Icône du logo officiel */}
                <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-md shadow-blue-500/30 shrink-0 border border-blue-200">
                  <Image
                    src="/logo.png"
                    alt="Logo AlarmAgenda"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#09132b]">
                      Appel Vocal IA
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div className="text-[11px] text-blue-600 font-bold truncate mt-0.5">
                    {isPlayingVoice ? "Onde vocale en cours..." : "Programmé à 14h30"}
                  </div>
                  {/* Barres d'ondes audio animées */}
                  <div className="flex items-center gap-1 mt-1.5 h-3">
                    {[50, 90, 35, 75, 100, 60, 80, 45].map((h, i) => (
                      <span
                        key={i}
                        className={`w-0.5 rounded-full bg-blue-600 transition-all duration-300 ${isPlayingVoice ? 'animate-pulse' : 'opacity-50'}`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Widget Flottant 2 : Statut de Rendez-vous Confirmé */}
              <div className="absolute -bottom-2 right-4 sm:-bottom-4 sm:right-6 bg-white/90 backdrop-blur-2xl rounded-2xl p-4 shadow-[0_15px_35px_rgba(37,99,235,0.18)] border border-white flex items-center gap-3.5 z-20 max-w-[260px]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
                  <Calendar size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-extrabold text-[#09132b]">
                    Réunion Client
                  </div>
                  <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 size={12} />
                    <span>Confirmé &amp; Synchronisé</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ==========================================
            BANDEAU DE CHIFFRES CLÉS EN VERRE DÉPOLI
           ========================================== */}
        <div className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-[28px] bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_15px_35px_rgba(37,99,235,0.05)] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#09132b]">99.8%</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">Taux de ponctualité</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">+2 400</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">Professionnels actifs</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#09132b]">0 retard</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">Garantie d&apos;alerte vocale</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">&lt; 2 min</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">Mise en place immédiate</div>
          </div>
        </div>

      </div>
    </section>
  );
}

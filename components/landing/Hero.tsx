"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Mic,
  PhoneCall,
  Calendar,
  CheckCircle2,
  Clock,
  Play,
  Pause,
  Volume2,
  Zap,
  TrendingUp,
  MessageSquare,
  Lock,
  ChevronRight,
  Phone,
} from "lucide-react";
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
        "Bonjour ! C'est votre assistant personnel Alamajonda. Vous avez votre rendez-vous client important prévu à 14 heures 30. Souhaitez-vous le confirmer ou le reporter de dix minutes ?"
      );
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-white via-[#f8fafc] to-white text-slate-900 pt-8 sm:pt-12 pb-20 sm:pb-28 font-sans overflow-hidden">
      {/* Conteneur avec marges garanties de chaque côté */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        
        {/* =========================================================
            1. HERO STAGE : 2 COLONNES HAUTE COUTURE
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14 sm:mb-20">
          
          {/* A. Colonne Gauche : Eyebrow + Grand Titre + Pitch + CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center pr-0 lg:pr-4 z-10">
            
            {/* Eyebrow Badge Exécutif */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 mb-6 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                NOUVELLE GÉNÉRATION D&apos;AGENDA IA
              </span>
            </div>

            {/* Grand Titre (Typographie Élégante & Cadrée) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black text-[#09132b] tracking-tight leading-[1.14] mb-5 text-left">
              Ne manquez plus aucun <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#09132b] via-[#1d4ed8] to-[#2563eb] bg-clip-text text-transparent">
                rendez-vous important
              </span>
            </h1>

            {/* Sous-titre Explicatif */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-xl text-left">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda sans effort, précise et automatisée. Dictez vos créneaux en langage naturel, l&apos;IA synchronise vos calendriers et <strong className="text-slate-900 font-semibold">vous appelle directement par téléphone</strong> pour vous dicter vos urgences.
            </p>


            {/* Micro-Preuve Sociale */}
            <div className="flex items-center gap-5 text-xs text-slate-500 font-medium flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                Installation en 1 min
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-blue-600 shrink-0" />
                Conforme RGPD
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={15} className="text-amber-500 shrink-0" />
                Zéro friction
              </span>
            </div>

          </div>

          {/* B. Colonne Droite : Photo Haute Définition & Bulle Vocale Interactive */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            
            {/* Halo Décoratif Subtil */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100/60 via-indigo-50/40 to-transparent rounded-[2.5rem] blur-2xl -z-10" />

            {/* Cadre Photo Professionnel */}
            <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 border border-slate-200/80 bg-slate-100 group">
              <Image
                src="/images/hero-businesswoman.jpg"
                alt="Femme professionnelle utilisant l'assistant vocal IA Alamajonda"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Bulle d'Appel Vocal Flottante (Design iOS / Haute Finition) */}
              <div
                onClick={handlePlayVoiceDemo}
                className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-6 bg-white/95 backdrop-blur-xl border border-blue-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xl shadow-slate-900/10 flex items-center gap-3.5 z-20 max-w-[270px] sm:max-w-[300px] cursor-pointer hover:scale-105 transition-all"
                title="Cliquer pour écouter l'annonce vocale"
              >
                {/* Icône Onde Sonore Bleue */}
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/30">
                  {isPlayingVoice ? <Pause size={18} /> : <Volume2 size={18} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-between">
                    <span>Appel Vocal IA</span>
                    <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-bold">
                      {isPlayingVoice ? "EN LECTURE" : "14h30"}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                    {isPlayingVoice ? "Écoute de la voix en cours..." : "Programmé · Rendez-vous client"}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================
            2. LES 3 GRANDS PILIERS BENTO (Cartes Blanches de Luxe)
           ========================================================= */}
        <div id="fonctionnalites" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          
          {/* CARTE 1 : Rappels Vocaux IA */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-[0_15px_40px_rgba(11,21,46,0.06)] border border-slate-100 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(11,21,46,0.1)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Icône Micro Stylisée */}
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1d4ed8] mb-5 group-hover:scale-110 transition-transform">
                <Mic size={22} />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#09132b] mb-2.5 group-hover:text-blue-600 transition-colors">
                Rappels Vocaux IA
              </h3>
              
              <p className="text-sm text-slate-600 leading-relaxed">
                Planifiez des rappels vocaux clairs et naturels en quelques secondes. Parlez librement, l&apos;IA structure vos horaires et vos priorités instantanément.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Voix HD Naturelle</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* CARTE 2 : Multi-Canaux SMS & Appels */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-[0_15px_40px_rgba(11,21,46,0.06)] border border-slate-100 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(11,21,46,0.1)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Icône Téléphone Stylisée */}
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1d4ed8] mb-5 group-hover:scale-110 transition-transform">
                <PhoneCall size={22} />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#09132b] mb-2.5 group-hover:text-blue-600 transition-colors">
                Multi-Canaux SMS &amp; Appels
              </h3>
              
              <p className="text-sm text-slate-600 leading-relaxed">
                Votre téléphone sonne à l&apos;heure exacte et reçoit des confirmations SMS et WhatsApp. Une transmission fiable pour ne plus jamais rien oublier.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Téléphone &amp; SMS</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* CARTE 3 : Agenda Intelligent & Anti-Conflits */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-[0_15px_40px_rgba(11,21,46,0.06)] border border-slate-100 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(11,21,46,0.1)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Icône Calendrier Stylisée */}
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1d4ed8] mb-5 group-hover:scale-110 transition-transform">
                <Calendar size={22} />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#09132b] mb-2.5 group-hover:text-blue-600 transition-colors">
                Agenda Intelligent
              </h3>
              
              <p className="text-sm text-slate-600 leading-relaxed">
                Orchestrez vos rendez-vous, réunions et tâches avec une planification intelligente. Synchronisation automatique Google Calendar &amp; Apple Calendar (.ICS).
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Synchronisation 24/7</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* =========================================================
            3. BANDEAU DE MÉTRIQUES & GAIN DE TEMPS
           ========================================================= */}
        <div className="mt-14 sm:mt-20 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-1">+5.2 Heures</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">Économisées par semaine</div>
          </div>
          <div className="w-[1px] h-10 bg-slate-800 hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">99.8%</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">Ponctualité des rappels</div>
          </div>
          <div className="w-[1px] h-10 bg-slate-800 hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white mb-1">0 Oubli</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">Sérénité d&apos;esprit totale</div>
          </div>
        </div>

      </div>
    </section>
  );
}

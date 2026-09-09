"use client";

import Link from "next/link";
import { ArrowRight, Volume2, Mic, CheckCircle2, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-white pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden text-center">
      
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Monumental Centered Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-black text-slate-900 tracking-tight leading-[1.12] mb-5 max-w-4xl mx-auto">
          Votre temps, orchestré avec <br className="hidden sm:inline" />
          <span className="text-slate-900">une précision absolue.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          L&apos;intelligence vocale qui veille sur vos rendez-vous et vos journées.
        </p>

        {/* Action Button */}
        <div className="flex justify-center mb-16">
          <Link
            href="/register"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5"
          >
            <span>Essayer l&apos;intelligence vocale</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Single Panoramic Stage with Photo & Glowing Soundwave */}
        <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-blue-200/80 bg-slate-950 aspect-[16/8] sm:aspect-[16/7] mb-12">
          
          {/* Panoramic Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/panoramic-hero.jpg"
            alt="AlarmaAgenda - Gestion sereine et intelligente du temps"
            className="w-full h-full object-cover object-center opacity-90"
          />

          {/* Frosted Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20 pointer-events-none" />

          {/* Glowing Voice Waveform Pill in Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-950/80 backdrop-blur-xl border border-blue-400/50 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-2xl shadow-blue-500/40 flex items-center gap-3 text-white max-w-[90%] sm:max-w-md">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-400/50">
              <Mic size={16} className="text-white animate-pulse" />
            </div>
            
            <div className="text-left">
              <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <span>Rappel vocal IA programmé à 14h30</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
              </div>
            </div>
          </div>

        </div>

        {/* Continuous Fluid Vertical Timeline Stream */}
        <div className="max-w-lg mx-auto relative pt-4 pb-8">
          
          {/* Central Vertical Connector Line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-200 pointer-events-none" />

          <div className="space-y-6 relative z-10">
            
            {/* 09:00 Item */}
            <div className="flex items-center justify-start sm:justify-center">
              <div className="bg-white border border-slate-200/90 px-4 py-2 rounded-full shadow-sm text-xs font-semibold text-slate-700 flex items-center gap-2 -translate-x-6 sm:translate-x-0">
                <span className="text-blue-600 font-bold">09:00</span>
                <span className="text-slate-300">|</span>
                <span>Rendez-vous client</span>
              </div>
            </div>

            {/* 12:30 Item */}
            <div className="flex items-center justify-start sm:justify-center">
              <div className="bg-white border border-slate-200/90 px-4 py-2 rounded-full shadow-sm text-xs font-semibold text-slate-700 flex items-center gap-2 -translate-x-10 sm:translate-x-0">
                <span className="text-blue-600 font-bold">12:30</span>
                <span className="text-slate-300">|</span>
                <span>Déjeuner</span>
              </div>
            </div>

            {/* 14:30 Highlighted Active Call Item */}
            <div className="flex items-center justify-center">
              <div className="bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-lg shadow-blue-600/30 text-xs sm:text-sm font-bold flex items-center gap-2.5 scale-105 border border-blue-400">
                <Volume2 size={16} className="text-white animate-pulse" />
                <span>14:30 • Appel vocal automatique</span>
              </div>
            </div>

            {/* 18:00 Item */}
            <div className="flex items-center justify-start sm:justify-center">
              <div className="bg-white border border-slate-200/90 px-4 py-2 rounded-full shadow-sm text-xs font-semibold text-slate-700 flex items-center gap-2 translate-x-4 sm:translate-x-0">
                <span className="text-blue-600 font-bold">18:00</span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5">
                  Fin de journée sereine
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

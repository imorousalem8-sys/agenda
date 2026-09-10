"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Mic, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden bg-slate-950 text-white">
      
      {/* Background Dot Grid Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      
      {/* Glowing Aurora Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/25 via-indigo-600/30 to-purple-600/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs (6.5 cols) */}
          <div className="lg:col-span-6 text-left">
            
            {/* Shimmer Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-300 text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <Sparkles size={13} className="text-cyan-400" />
              <span>L&apos;INTELLIGENCE VOCALE QUI ORGANISE VOS JOURNÉES</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-black text-white tracking-tight leading-[1.12] mb-6">
              Votre temps, orchestré avec <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                une précision absolue.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-lg">
              AlarmaAgenda planifie vos rendez-vous et <strong className="text-white font-semibold">vous appelle directement au téléphone</strong> avec une voix naturelle pour que vous soyez toujours à l&apos;heure, sans stress.
            </p>

            {/* Actions Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Démarrer gratuitement</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all"
              >
                <span>Se connecter</span>
              </Link>
            </div>

            {/* Trust Checks */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                Sans carte bancaire
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                Appels vocaux &amp; SMS inclus
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                Prêt en 2 minutes
              </span>
            </div>

          </div>

          {/* Right Column: 3D Isometric AI Workspace Scene (5.5 cols) */}
          <div className="lg:col-span-6 relative">
            
            {/* Glowing Aura behind 3D image */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/30 via-indigo-600/30 to-purple-600/30 rounded-[2rem] blur-2xl opacity-75 pointer-events-none" />

            {/* 3D Scene Container */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-indigo-950/60 bg-slate-900 group">
              
              {/* 3D Isometric Artwork */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/alarma-hero-3d-workspace.jpg"
                alt="AlarmaAgenda - Espace de travail 3D avec assistant vocal IA"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Glass Overlay on edges */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" />

              {/* Floating Live AI Call Pill in center-bottom */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-xl border border-cyan-400/40 p-3 sm:p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-lg shadow-cyan-500/40">
                    <Mic size={18} className="animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Rappel vocal IA programmé à 14h30</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
                    </div>
                    <div className="text-[11px] text-cyan-200/80">« Chantier client : Matériel &amp; outillage »</div>
                  </div>
                </div>

                <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-bold border border-cyan-400/30">
                  En direct
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

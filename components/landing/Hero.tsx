"use client";

import Link from "next/link";
import { 
  ArrowRight, Check, Volume2, Search, Bell, Home, Calendar, 
  FileText, Settings, Sparkles, Mic, PhoneCall, CheckCircle2, ShieldCheck, Zap
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-slate-50/50">
      
      {/* Background Decorative Mesh & Glowing Auroras */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
      
      {/* Radiant Glow Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-gradient-to-tr from-blue-400/20 via-indigo-500/20 to-purple-400/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Centered Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          
          {/* Shimmering Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-blue-200/80 shadow-sm shadow-blue-500/10 text-blue-700 text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-md hover:border-blue-400 transition-colors">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <Sparkles size={13} className="text-blue-600" />
            <span>L&apos;INTELLIGENCE VOCALE QUI NE VOUS LAISSE RIEN OUBLIER</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
            N&apos;oubliez plus jamais un <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              rendez-vous important.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            AlarmaAgenda planifie votre journée et <strong className="text-slate-900 font-semibold">vous appelle directement</strong> par téléphone avec une voix naturelle pour que vous soyez toujours à l&apos;heure, sans stress.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Démarrer gratuitement</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-semibold text-slate-700 bg-white/90 hover:bg-slate-100 border border-slate-200/80 shadow-sm hover:shadow transition-all"
            >
              <span>Se connecter</span>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
              Sans carte bancaire
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
              Appels vocaux &amp; SMS inclus
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
              Prêt en 2 minutes
            </span>
          </div>

        </div>

        {/* Master Mockup Stage: MacBook Pro & iPhone 16 Pro */}
        <div className="relative max-w-5xl mx-auto pt-4 pb-8">
          
          {/* Ambient Glow underneath mockups */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-indigo-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none -z-10" />

          {/* Device Showcase Grid */}
          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6">
            
            {/* 1. MacBook Pro Desktop App Frame */}
            <div className="w-full lg:w-[72%] bg-slate-900/95 rounded-2xl p-2.5 sm:p-3 shadow-2xl shadow-slate-900/25 border border-slate-700/80 backdrop-blur-xl">
              
              {/* MacBook Top Bar */}
              <div className="bg-slate-800/90 rounded-t-xl px-3 py-2 flex items-center justify-between border-b border-slate-700/60 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300 ml-2">AlarmaAgenda Workspace</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-slate-700/80 text-slate-200 text-[10px] font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Synchronisation active
                  </span>
                </div>
              </div>

              {/* MacBook Screen Content */}
              <div className="bg-slate-950 rounded-b-xl overflow-hidden text-slate-100 flex min-h-[320px] sm:min-h-[360px] text-xs">
                
                {/* App Sidebar */}
                <div className="w-44 bg-slate-900/80 border-r border-slate-800 p-3 space-y-1 hidden sm:block">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Menu</div>
                  <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30">
                    <Calendar size={14} />
                    <span>Mon Agenda</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                    <FileText size={14} />
                    <span>Tâches du jour</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                    <PhoneCall size={14} />
                    <span>Historique d&apos;appels</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                    <Settings size={14} />
                    <span>Paramètres IA</span>
                  </div>

                  {/* Quota Indicator */}
                  <div className="mt-8 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                    <div className="flex items-center justify-between text-[10px] font-medium text-slate-300 mb-1">
                      <span>Rappels IA</span>
                      <span className="text-blue-400 font-bold">18 / 20</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-[90%] h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Main Schedule Workspace */}
                <div className="flex-1 p-3.5 sm:p-5 bg-gradient-to-b from-slate-950 to-slate-900">
                  
                  {/* Header info */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
                    <div>
                      <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <span>Planning d&apos;aujourd&apos;hui</span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-medium border border-blue-500/30">
                          4 événements
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">Assistant vocal prêt à intervenir</div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-semibold text-[11px] shadow-sm shadow-blue-500/30 flex items-center gap-1.5">
                        <Sparkles size={12} />
                        Ajouter un créneau
                      </span>
                    </div>
                  </div>

                  {/* List of Time Slots */}
                  <div className="space-y-2.5">
                    
                    {/* Event 1 */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono font-bold text-[11px]">
                          09:00
                        </div>
                        <div>
                          <div className="font-semibold text-slate-200 text-xs sm:text-sm">Rendez-vous Client (Cabinet)</div>
                          <div className="text-[10px] text-slate-400">Discussion projet &amp; signature contrat</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold flex items-center gap-1">
                        <Check size={11} />
                        Effectué
                      </span>
                    </div>

                    {/* Event 2 - ACTIVE CALL HIGHLIGHT */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-blue-950/90 via-indigo-950/80 to-blue-900/60 border border-blue-500/60 shadow-lg shadow-blue-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="px-2 py-1 rounded bg-blue-600 text-white font-mono font-bold text-[11px] shadow-sm shadow-blue-500/40">
                          14:30
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                            <span>Visite Chantier &amp; Raccords</span>
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                          </div>
                          <div className="text-[10px] text-blue-200">Rue des Tilleuls • Matériel requis</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/30">
                        <Volume2 size={12} className="animate-pulse" />
                        Appel IA dans 15 min
                      </span>
                    </div>

                    {/* Event 3 */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono font-bold text-[11px]">
                          17:00
                        </div>
                        <div>
                          <div className="font-semibold text-slate-200 text-xs sm:text-sm">Bilan Hebdomadaire</div>
                          <div className="text-[10px] text-slate-400">Revue des priorités</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-medium">
                        À venir
                      </span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* 2. iPhone 16 Pro Mobile Live Call Frame */}
            <div className="w-[260px] sm:w-[280px] bg-slate-950 rounded-[2.5rem] p-2.5 shadow-2xl shadow-blue-900/30 border-2 border-slate-700/80 backdrop-blur-2xl -mt-6 lg:-mt-0 lg:-ml-12 z-20 hover:scale-105 transition-transform duration-300">
              
              <div className="bg-slate-950 text-white rounded-[2.1rem] p-4 pt-3 flex flex-col justify-between min-h-[380px] border border-slate-800/80">
                
                {/* Dynamic Island */}
                <div className="w-20 h-4 bg-black rounded-full mx-auto mb-3 flex items-center justify-end px-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500/80" />
                </div>

                {/* Call Status Top */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/30 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                    Appel Vocal en cours
                  </div>
                  
                  <div className="text-lg font-extrabold text-white tracking-tight">AlarmaAgenda IA</div>
                  <div className="text-[11px] text-slate-400">Assistant Personnel Proactif</div>
                </div>

                {/* Voice Soundwave & AI Avatar */}
                <div className="my-4 flex flex-col items-center justify-center">
                  
                  {/* Glowing Circle with Pulsing Waves */}
                  <div className="relative flex items-center justify-center mb-3">
                    <div className="absolute w-20 h-20 rounded-full bg-blue-500/30 animate-ping opacity-75" />
                    <div className="absolute w-16 h-16 rounded-full bg-indigo-500/40 animate-pulse" />
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/50">
                      <Mic size={20} className="animate-bounce" />
                    </div>
                  </div>

                  {/* Equalizer Sound Waves */}
                  <div className="flex items-center gap-1 h-6">
                    <span className="w-1 h-3 bg-blue-400 rounded-full animate-pulse" />
                    <span className="w-1 h-5 bg-indigo-400 rounded-full animate-bounce" />
                    <span className="w-1 h-6 bg-blue-400 rounded-full animate-pulse" />
                    <span className="w-1 h-4 bg-indigo-300 rounded-full animate-bounce" />
                    <span className="w-1 h-2 bg-blue-500 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Spoken Transcription Bubble */}
                <div className="bg-slate-900/90 border border-blue-500/40 rounded-xl p-2.5 text-left mb-3 shadow-md">
                  <div className="text-[9px] font-bold text-blue-400 uppercase mb-0.5">Message prononcé :</div>
                  <p className="text-[10px] text-slate-200 leading-snug italic">
                    « Bonjour Thomas, rappel pour votre visite de chantier à 14h30. Pensez à vos outils et aux raccords. »
                  </p>
                </div>

                {/* Call Control Buttons */}
                <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                  <div className="py-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold flex items-center justify-center gap-1 shadow-sm">
                    <Check size={12} />
                    <span>C&apos;est noté (1)</span>
                  </div>
                  <div className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold flex items-center justify-center gap-1">
                    <span>+10 min (2)</span>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mt-2" />

              </div>

            </div>

          </div>

          {/* Floating Badges */}
          <div className="hidden sm:flex items-center justify-between max-w-4xl mx-auto -mt-4 px-4 relative z-30">
            <div className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-lg shadow-slate-200/50 flex items-center gap-2.5 text-xs font-semibold text-slate-800">
              <ShieldCheck size={18} className="text-blue-600" />
              <span>99.8% de ponctualité constatée</span>
            </div>

            <div className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-lg shadow-slate-200/50 flex items-center gap-2.5 text-xs font-semibold text-slate-800">
              <Zap size={18} className="text-amber-500" />
              <span>Synthèse vocale ultra-naturelle</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

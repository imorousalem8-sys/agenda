"use client";

import { Mic, Calendar, ShieldCheck, Sparkles, Phone, Sliders, CheckCircle2, Zap } from "lucide-react";

export default function Features() {
  return (
    <section className="py-14 sm:py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background Dot Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      
      {/* Soft Aurora Ambient Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 translate-x-1/2 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-300 text-[11px] font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
            <Sparkles size={12} className="text-cyan-400" />
            <span>3 PILIERS ESSENTIELS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            Simple. Puissant. <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">Zéro retard.</span>
          </h2>
        </div>

        {/* 3 Compact & Stylish Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          
          {/* Card 1 : 🎙️ Appel Vocal IA */}
          <div className="group relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800/90 hover:border-cyan-500/50 shadow-xl shadow-black/40 hover:shadow-cyan-500/10 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="absolute top-0 right-8 w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div>
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                  <Mic size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    Appel Vocal IA
                  </h3>
                  <span className="text-[10px] text-cyan-400 font-semibold tracking-wide uppercase">
                    Votre téléphone sonne
                  </span>
                </div>
              </div>

              {/* 3 Concise Lines */}
              <div className="space-y-3.5 text-xs">
                
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-sm shadow-cyan-400" />
                  <p className="text-slate-300 leading-snug">
                    <strong className="text-white font-semibold">Appel réel :</strong> Votre mobile sonne automatiquement à l&apos;heure fixée.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-sm shadow-cyan-400" />
                  <p className="text-slate-300 leading-snug">
                    <strong className="text-white font-semibold">Voix naturelle :</strong> L&apos;IA énonce vos consignes, adresses et urgences.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-sm shadow-cyan-400" />
                  <p className="text-slate-300 leading-snug">
                    <strong className="text-white font-semibold">Acquittement :</strong> Validez ou reportez de 10 min directement au clavier.
                  </p>
                </div>

              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-cyan-300/90 font-medium">
              <span>Zéro oubli garanti</span>
              <CheckCircle2 size={13} className="text-cyan-400" />
            </div>
          </div>

          {/* Card 2 : 📅 Agenda Intelligent */}
          <div className="group relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800/90 hover:border-indigo-500/50 shadow-xl shadow-black/40 hover:shadow-indigo-500/10 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="absolute top-0 right-8 w-24 h-1 bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                  <Calendar size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                    Agenda Intelligent
                  </h3>
                  <span className="text-[10px] text-indigo-400 font-semibold tracking-wide uppercase">
                    Planification fluide
                  </span>
                </div>
              </div>

              {/* 3 Concise Lines */}
              <div className="space-y-3.5 text-xs">
                
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0 shadow-sm shadow-indigo-400" />
                  <p className="text-slate-300 leading-snug">
                    <strong className="text-white font-semibold">Saisie express :</strong> Ajoutez rendez-vous et chantiers en 3 clics.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0 shadow-sm shadow-indigo-400" />
                  <p className="text-slate-300 leading-snug">
                    <strong className="text-white font-semibold">Checklists &amp; Lieux :</strong> Organisez outillage, adresses et priorités.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0 shadow-sm shadow-indigo-400" />
                  <p className="text-slate-300 leading-snug">
                    <strong className="text-white font-semibold">Temps réel :</strong> Synchronisé en direct sur ordinateur et smartphone.
                  </p>
                </div>

              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-indigo-300/90 font-medium">
              <span>Vue claire &amp; organisée</span>
              <CheckCircle2 size={13} className="text-indigo-400" />
            </div>
          </div>

          {/* Card 3 : 🛡️ Sérénité & Fiabilité */}
          <div className="group relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800/90 hover:border-emerald-500/50 shadow-xl shadow-black/40 hover:shadow-emerald-500/10 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="absolute top-0 right-8 w-24 h-1 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Sérénité Totale
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-semibold tracking-wide uppercase">
                    Ponctualité 99.8%
                  </span>
                </div>
              </div>

              {/* 3 Concise Lines */}
              <div className="space-y-3.5 text-xs">
                
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0 shadow-sm shadow-emerald-400" />
                  <p className="text-slate-300 leading-snug">
                    <strong className="text-white font-semibold">Ponctualité :</strong> Arrivez à l&apos;heure et préservez votre crédibilité.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0 shadow-sm shadow-emerald-400" />
                  <p className="text-slate-300 leading-snug">
                    <strong className="text-white font-semibold">Esprit libéré :</strong> L&apos;IA prend le relais, vous restez concentré.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0 shadow-sm shadow-emerald-400" />
                  <p className="text-slate-300 leading-snug">
                    <strong className="text-white font-semibold">Prêt d&apos;office :</strong> Inscription sans carte bancaire en 2 minutes.
                  </p>
                </div>

              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-emerald-300/90 font-medium">
              <span>100% prêt à l&apos;emploi</span>
              <CheckCircle2 size={13} className="text-emerald-400" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

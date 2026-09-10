"use client";

import { Mic, Calendar, ShieldCheck, CheckCircle2, Sparkles, PhoneCall } from "lucide-react";

export default function Features() {
  return (
    <section className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      
      {/* Soft Aurora Glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-cyan-400" />
            <span>FONCTIONNALITÉS EN 3 PILIERS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Tout ce dont vous avez besoin, <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              résumé en 3 axes essentiels.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Une interface simple, une efficacité maximale et zéro superflu.
          </p>
        </div>

        {/* 3 Tables / Cards with Exactly 3 Lines Each */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Tableau 1 : 🎙️ L'Intelligence Vocale */}
          <div className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 shadow-xl shadow-black/40 hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header Tableau 1 */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/25 group-hover:scale-110 transition-transform">
                  <Mic size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    1. L&apos;Appel Vocal IA
                  </h3>
                  <p className="text-[11px] text-slate-400">Votre téléphone sonne à l&apos;heure</p>
                </div>
              </div>

              {/* 3 Lignes d'explication */}
              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Ligne 1 */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">Appel téléphonique réel</strong>
                    <span className="text-slate-400 text-xs">Votre téléphone sonne automatiquement au moment programmé.</span>
                  </div>
                </div>

                {/* Ligne 2 */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">Synthèse vocale naturelle</strong>
                    <span className="text-slate-400 text-xs">L&apos;IA énonce clairement le lieu, l&apos;heure et vos consignes.</span>
                  </div>
                </div>

                {/* Ligne 3 */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">Acquittement direct</strong>
                    <span className="text-slate-400 text-xs">Validez ou décalez votre rappel de 10 min directement au clavier.</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-bold text-cyan-400 flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              <span>Plus aucun rendez-vous manqué</span>
            </div>
          </div>

          {/* Tableau 2 : 📅 L'Agenda Intelligent */}
          <div className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 shadow-xl shadow-black/40 hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header Tableau 2 */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform">
                  <Calendar size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    2. L&apos;Agenda Intelligent
                  </h3>
                  <p className="text-[11px] text-slate-400">Organisation simple et rapide</p>
                </div>
              </div>

              {/* 3 Lignes d'explication */}
              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Ligne 1 */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">Planification instantanée</strong>
                    <span className="text-slate-400 text-xs">Créez vos rendez-vous, chantiers et tâches en quelques clics.</span>
                  </div>
                </div>

                {/* Ligne 2 */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">Gestion des priorités</strong>
                    <span className="text-slate-400 text-xs">Classez par statut, lieu géographique et checklists de matériel.</span>
                  </div>
                </div>

                {/* Ligne 3 */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">Multi-appareils en direct</strong>
                    <span className="text-slate-400 text-xs">Accès synchronisé partout sur ordinateur, tablette et mobile.</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-bold text-indigo-400 flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              <span>Visibilité totale sur votre journée</span>
            </div>
          </div>

          {/* Tableau 3 : 🛡️ Sérénité & Zéro Oubli */}
          <div className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 shadow-xl shadow-black/40 hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header Tableau 3 */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    3. Sérénité &amp; Fiabilité
                  </h3>
                  <p className="text-[11px] text-slate-400">99.8% de ponctualité constatée</p>
                </div>
              </div>

              {/* 3 Lignes d'explication */}
              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Ligne 1 */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">Ponctualité garantie</strong>
                    <span className="text-slate-400 text-xs">Arrivez toujours à l&apos;heure pour vos clients et engagements.</span>
                  </div>
                </div>

                {/* Ligne 2 */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">Charge mentale libérée</strong>
                    <span className="text-slate-400 text-xs">Ne stressez plus, l&apos;assistant IA garde les horaires en mémoire.</span>
                  </div>
                </div>

                {/* Ligne 3 */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">Prêt sans configuration</strong>
                    <span className="text-slate-400 text-xs">Utilisable immédiatement, sans carte bancaire requise.</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              <span>Démarrage 100% offert</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import { User, HardHat, Check, Calendar, Volume2, MapPin, Clock, Sparkles, Play, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function UseCases() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/60">
            <Sparkles size={13} />
            <span>ADAPTÉ À TOUS LES PROFILS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Un agenda sur-mesure pour votre quotidien
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Que vous soyez artisan, entrepreneur ou particulier, AlarmaAgenda s&apos;adapte à vos exigences.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 2 Modes Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              
              {/* Card 1: Mode Personnel */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shadow-sm">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Usage Personnel</h3>
                      <p className="text-[11px] text-slate-500">Vie quotidienne &amp; famille</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                    Allégez votre charge mentale et gardez le contrôle sur tous vos impératifs privés.
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-blue-600 shrink-0 stroke-[2.5]" />
                      <span>Rendez-vous médicaux &amp; spécialistes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-blue-600 shrink-0 stroke-[2.5]" />
                      <span>Démarches administratives &amp; banques</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-blue-600 shrink-0 stroke-[2.5]" />
                      <span>Événements familiaux &amp; anniversaires</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-blue-600 shrink-0 stroke-[2.5]" />
                      <span>Prise de médicaments &amp; soins</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 text-[11px] font-bold text-blue-600">
                  Idéal pour ne rien oublier à la maison
                </div>
              </div>

              {/* Card 2: Mode Professionnel */}
              <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-sm">
                      <HardHat size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Usage Professionnel</h3>
                      <p className="text-[11px] text-emerald-700 font-medium">Artisans, freelances &amp; TPE</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                    Maximisez votre ponctualité sur vos chantiers et rendez-vous clients cruciaux.
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0 stroke-[2.5]" />
                      <span>Interventions &amp; chantiers extérieurs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0 stroke-[2.5]" />
                      <span>Rappels de matériel &amp; outillage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0 stroke-[2.5]" />
                      <span>Rendez-vous clients &amp; devis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0 stroke-[2.5]" />
                      <span>Échéances de facturation &amp; relances</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-200/70 text-[11px] font-bold text-emerald-700">
                  Garantit une image ultra-professionnelle
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Live Interactive Simulation Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 flex flex-col justify-between h-full">
              
              <div>
                {/* Header Widget */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Simulation en direct</span>
                  </div>
                  <span className="text-[11px] font-mono text-blue-400">Demain • 08:45</span>
                </div>

                {/* Event Summary Card */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold text-[10px] border border-blue-500/30">
                      Chantier Artisan
                    </span>
                    <span className="text-xs font-mono font-bold text-white">09:00</span>
                  </div>

                  <h4 className="font-bold text-sm text-white mb-1">
                    Remplacement chaudière &amp; Raccords
                  </h4>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin size={13} className="text-blue-400 shrink-0" />
                    <span>14 Avenue de la République, Lyon</span>
                  </div>
                </div>

                {/* Voice Call Audio Simulation */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/80 via-indigo-950/80 to-blue-900/60 border border-blue-500/50 shadow-lg mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                      <Volume2 size={16} className="text-blue-400 animate-pulse" />
                      <span>Transcription de l&apos;appel vocal</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-300">
                      08:45 (15 min avant)
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed italic mb-3">
                    « Bonjour Thomas, rappel pour votre intervention à 9h00. N&apos;oubliez pas les raccords cuivre, les joints toriques et la mallette de test. »
                  </p>

                  <div className="flex items-center gap-2 pt-2 border-t border-blue-500/20 text-[10px] text-blue-300 font-medium">
                    <CheckCircle2 size={12} className="text-emerald-400" />
                    <span>Appel validé automatiquement sur le téléphone de l&apos;artisan</span>
                  </div>
                </div>

                {/* Checklist Checklist */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-800">
                    <span className="flex items-center gap-2">
                      <Check size={13} className="text-emerald-400" />
                      Matériel et outillage vérifiés
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">OK</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-800">
                    <span className="flex items-center gap-2">
                      <Check size={13} className="text-emerald-400" />
                      Client prévenu par SMS automatique
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">ENVOYÉ</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>AlarmaAgenda Voice Engine v2.4</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Prêt à l&apos;emploi
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

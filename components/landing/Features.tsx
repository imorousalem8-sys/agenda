"use client";

import { Mic, Calendar, Sparkles, CheckCircle2, Zap, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";

export default function Features() {
  return (
    <section id="fonctionnalites" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Halos d'ambiance bleutés */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div
        className="mx-auto relative z-10"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        {/* En-tête centré épuré */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-blue-200/80 shadow-[0_2px_12px_rgba(37,99,235,0.06)] text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} className="text-blue-600" />
            <span>3 PILIERS D&apos;EXCELLENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#09132b] tracking-tight leading-tight mb-4">
            Simple. Puissant. <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Zéro retard.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            La synergie absolue entre un agenda visuel élégant, des appels vocaux automatisés et une intelligence artificielle proactive.
          </p>
        </div>

        {/* 3 Cartes en Verre Dépoli (Bleu & Blanc Transparent) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* CARTE 1 : Appel Vocal IA */}
          <div className="group relative p-8 sm:p-9 rounded-[28px] bg-white/70 backdrop-blur-2xl border border-white/90 hover:border-blue-300 shadow-[0_15px_40px_-10px_rgba(37,99,235,0.07)] hover:shadow-[0_25px_60px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Header de Carte */}
              <div className="flex items-center gap-4 mb-6 pb-5 border-b border-blue-100/60">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
                  <Mic size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#09132b] group-hover:text-blue-600 transition-colors">
                    Appels Vocaux IA
                  </h3>
                  <span className="text-xs text-blue-600 font-bold tracking-wide uppercase">
                    Sonnerie réelle garantie
                  </span>
                </div>
              </div>

              {/* Arguments clés */}
              <div className="space-y-4 text-sm text-slate-600 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0 shadow-sm shadow-blue-500" />
                  <p className="leading-relaxed">
                    <strong className="text-[#09132b] font-bold">Appel automatique :</strong> Votre téléphone sonne et vous énonce l&apos;heure, le lieu et l&apos;objet du rendez-vous.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0 shadow-sm shadow-blue-500" />
                  <p className="leading-relaxed">
                    <strong className="text-[#09132b] font-bold">Voix naturelle HD :</strong> Clarté absolue pour la prononciation des noms, adresses et instructions clés.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0 shadow-sm shadow-blue-500" />
                  <p className="leading-relaxed">
                    <strong className="text-[#09132b] font-bold">Acquittement immédiat :</strong> Confirmez ou reportez de 10 minutes d&apos;un simple mot ou clic.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-blue-100/60 flex items-center justify-between text-xs font-bold text-blue-700">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-blue-600" />
                98% de ponctualité mesurée
              </span>
              <span className="text-slate-400 font-normal">Temps réel</span>
            </div>
          </div>

          {/* CARTE 2 : Agenda Intelligent */}
          <div className="group relative p-8 sm:p-9 rounded-[28px] bg-white/70 backdrop-blur-2xl border border-white/90 hover:border-indigo-300 shadow-[0_15px_40px_-10px_rgba(99,102,241,0.07)] hover:shadow-[0_25px_60px_-15px_rgba(99,102,241,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6 pb-5 border-b border-indigo-100/60">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#09132b] group-hover:text-indigo-600 transition-colors">
                    Agenda Visuel Pro
                  </h3>
                  <span className="text-xs text-indigo-600 font-bold tracking-wide uppercase">
                    Vues Jour · Semaine · Mois
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-600 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0 shadow-sm shadow-indigo-500" />
                  <p className="leading-relaxed">
                    <strong className="text-[#09132b] font-bold">Zéro conflit :</strong> Détection instantanée des chevauchements d&apos;horaires et alertes d&apos;optimisation.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0 shadow-sm shadow-indigo-500" />
                  <p className="leading-relaxed">
                    <strong className="text-[#09132b] font-bold">Synchronisation cloud :</strong> Compatible avec vos calendriers Google, Apple et Microsoft Outlook.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0 shadow-sm shadow-indigo-500" />
                  <p className="leading-relaxed">
                    <strong className="text-[#09132b] font-bold">Fluidité multi-écrans :</strong> Accessible sans accroc sur smartphone, tablette et grand écran de bureau.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-indigo-100/60 flex items-center justify-between text-xs font-bold text-indigo-700">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Export ICS & Webhook
              </span>
              <span className="text-slate-400 font-normal">Cloud 24/7</span>
            </div>
          </div>

          {/* CARTE 3 : Copilote IA & SMS Multi-Canaux */}
          <div className="group relative p-8 sm:p-9 rounded-[28px] bg-white/70 backdrop-blur-2xl border border-white/90 hover:border-blue-400 shadow-[0_15px_40px_-10px_rgba(37,99,235,0.07)] hover:shadow-[0_25px_60px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6 pb-5 border-b border-blue-100/60">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#09132b] group-hover:text-blue-600 transition-colors">
                    Multi-Canaux & SMS
                  </h3>
                  <span className="text-xs text-blue-600 font-bold tracking-wide uppercase">
                    Appels · SMS · Push Web
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-600 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0 shadow-sm shadow-blue-500" />
                  <p className="leading-relaxed">
                    <strong className="text-[#09132b] font-bold">SMS de rappel automatique :</strong> Notifiez vos contacts et vous-même 24h et 1h avant l&apos;échéance.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0 shadow-sm shadow-blue-500" />
                  <p className="leading-relaxed">
                    <strong className="text-[#09132b] font-bold">Assistant IA réactif :</strong> Ajustement automatique du planning en cas de retard imprévu.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0 shadow-sm shadow-blue-500" />
                  <p className="leading-relaxed">
                    <strong className="text-[#09132b] font-bold">Mode Urgence & Priorité :</strong> Sonnerie insistante pour vos engagements à fort enjeu.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-blue-100/60 flex items-center justify-between text-xs font-bold text-blue-700">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={16} className="text-blue-600" />
                Délivrance instantanée
              </span>
              <span className="text-slate-400 font-normal">99.9% Uptime</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import { Mic, Calendar, Bell, Sparkles, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Features() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/50">
            <Sparkles size={13} />
            <span>FONCTIONNALITÉS ESSENTIELLES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Votre agenda. Vos rappels. <br />
            <span className="text-blue-600">Votre tranquillité absolue.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Une combinaison puissante d&apos;outils conçus pour éliminer les retards et la charge mentale.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Rappels Vocaux */}
          <div className="group relative p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-blue-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
            
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
                <Mic size={24} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                Rappels vocaux par IA
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Recevez un véritable appel téléphonique avec un message vocal clair, précis et contextualisé au bon moment.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-blue-600 shrink-0 stroke-[2.5]" />
                  <span>Voix française naturelle &amp; expressive</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-blue-600 shrink-0 stroke-[2.5]" />
                  <span>Décalage possible en direct au clavier</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-blue-600 shrink-0 stroke-[2.5]" />
                  <span>Sonnerie prioritaire pour ne rien rater</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>Découvrir l&apos;appel vocal</span>
              <ArrowRight size={13} className="ml-1" />
            </div>
          </div>

          {/* Card 2: Agenda Intelligent */}
          <div className="group relative p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-indigo-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform" />

            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform">
                <Calendar size={24} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                Agenda tout-en-un
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Organisez vos rendez-vous, tâches, urgences et chantiers sur une interface ultra-rapide et intuitive.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-indigo-600 shrink-0 stroke-[2.5]" />
                  <span>Vues Jour, Semaine et Mois dynamiques</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-indigo-600 shrink-0 stroke-[2.5]" />
                  <span>Gestion des priorités et adresses</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-indigo-600 shrink-0 stroke-[2.5]" />
                  <span>Synchronisation instantanée</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>Explorer le calendrier</span>
              <ArrowRight size={13} className="ml-1" />
            </div>
          </div>

          {/* Card 3: Notifications & Multicanal */}
          <div className="group relative p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" />

            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform">
                <Bell size={24} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                Notifications &amp; SMS
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Choisissez le niveau d&apos;alerte qui correspond à chaque créneau : appel vocal, SMS ou notification Push.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Alertes push web et mobiles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Envoi de SMS de confirmation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Personnalisation des délais de rappel</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Voir les options de notification</span>
              <ArrowRight size={13} className="ml-1" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

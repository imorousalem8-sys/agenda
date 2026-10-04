"use client";

import { Mic, Calendar, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Features() {
  return (
    <section id="fonctionnalites" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Titre ultra-court et ordonné */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-[#09132b] tracking-tight mb-3">
            Tout ce dont vous avez besoin, <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              sans superflu.
            </span>
          </h2>
          <p className="text-base text-slate-500 max-w-md mx-auto">
            Trois fonctionnalités fondamentales conçues pour éliminer les retards.
          </p>
        </div>

        {/* 3 Cartes Épurées en Verre Dépoli */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* Carte 1 */}
          <div className="p-7 sm:p-8 rounded-[28px] bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_15px_35px_rgba(37,99,235,0.06)] hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 border border-blue-100/70 shadow-xs">
                <Mic size={22} />
              </div>
              <h3 className="text-xl font-black text-[#09132b] mb-2">
                Appels Vocaux IA
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Votre téléphone sonne réellement. L&apos;assistant vocal vous énonce le lieu, l&apos;heure et les détails du rendez-vous.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 text-xs font-bold text-blue-600">
              Sonnerie réelle garantie
            </div>
          </div>

          {/* Carte 2 */}
          <div className="p-7 sm:p-8 rounded-[28px] bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_15px_35px_rgba(37,99,235,0.06)] hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 border border-indigo-100/70 shadow-xs">
                <Calendar size={22} />
              </div>
              <h3 className="text-xl font-black text-[#09132b] mb-2">
                Agenda Intelligent
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Synchronisé avec Google Calendar et Outlook. Détection instantanée des chevauchements d&apos;horaires.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 text-xs font-bold text-indigo-600">
              Synchronisation instantanée
            </div>
          </div>

          {/* Carte 3 */}
          <div className="p-7 sm:p-8 rounded-[28px] bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_15px_35px_rgba(37,99,235,0.06)] hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 border border-blue-100/70 shadow-xs">
                <Zap size={22} />
              </div>
              <h3 className="text-xl font-black text-[#09132b] mb-2">
                Multi-Canaux SMS
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rappels automatiques par SMS et notifications push pour vous et vos contacts, 24h et 1h avant.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 text-xs font-bold text-blue-600">
              Délivrance 100% assurée
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

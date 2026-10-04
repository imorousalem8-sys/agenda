"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Titre simple et ordonné */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-[#09132b] tracking-tight mb-3">
            Tarifs clairs et accessibles.
          </h2>
          <p className="text-base text-slate-500">
            Commencez gratuitement dès maintenant. Aucun engagement.
          </p>
        </div>

        {/* 2 Cartes de Tarifs Aérées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
          
          {/* Gratuit */}
          <div className="p-8 rounded-[30px] bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_15px_35px_rgba(37,99,235,0.06)] flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Découverte
              </span>
              <h3 className="text-2xl font-black text-[#09132b] mt-1 mb-4">Gratuit</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-[#09132b]">0€</span>
                <span className="text-slate-500 text-sm">/ mois</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-600 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-blue-600 shrink-0 stroke-[2.5]" />
                  <span>Gestion d&apos;agenda complète</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-blue-600 shrink-0 stroke-[2.5]" />
                  <span>Notifications sonores &amp; web push</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-blue-600 shrink-0 stroke-[2.5]" />
                  <span>Multi-supports mobile &amp; bureau</span>
                </li>
              </ul>
            </div>
            <Link
              href="/register"
              className="w-full text-center py-3.5 px-6 rounded-2xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs transition-all"
            >
              Commencer gratuitement
            </Link>
          </div>

          {/* Pro */}
          <div className="p-8 rounded-[30px] bg-white/90 backdrop-blur-2xl border-2 border-blue-500/80 shadow-[0_20px_50px_rgba(37,99,235,0.18)] ring-4 ring-blue-500/10 flex flex-col justify-between relative">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-sm">
              Recommandé
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Illimité
              </span>
              <h3 className="text-2xl font-black text-[#09132b] mt-1 mb-4">AlarmAgenda Pro</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">9€</span>
                <span className="text-slate-500 text-sm">/ mois</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-blue-600 shrink-0 stroke-[2.5]" />
                  <span className="font-semibold text-[#09132b]">Appels vocaux directs sur votre smartphone</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-blue-600 shrink-0 stroke-[2.5]" />
                  <span>SMS de rappel automatiques illimités</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-blue-600 shrink-0 stroke-[2.5]" />
                  <span>Synchro Google Calendar &amp; Outlook</span>
                </li>
              </ul>
            </div>
            <Link
              href="/register"
              className="w-full text-center py-3.5 px-6 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 transition-all"
            >
              Essayer la formule Pro
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

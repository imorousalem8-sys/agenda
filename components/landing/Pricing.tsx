"use client";

import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-gradient-to-b from-white via-[#f8faff] to-white relative overflow-hidden border-t border-slate-100">
      {/* Halo d'ambiance bleuté */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Titre centré, aéré et élégant */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles size={13} className="text-blue-600" />
            <span>TARIFICATION SIMPLE &amp; TRANSPARENTE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#09132b] tracking-tight leading-tight mb-4">
            Choisissez la formule qui vous correspond
          </h2>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-lg mx-auto">
            Commencez gratuitement dès aujourd&apos;hui, sans engagement et sans carte bancaire requise.
          </p>
        </div>

        {/* 2 Cartes de Tarifs Haut de Gamme et Aérées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* CARTE 1 : Formule Découverte (Gratuit) */}
          <div className="p-8 sm:p-10 rounded-[32px] bg-white border border-slate-200/90 shadow-[0_15px_45px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3.5 py-1.5 rounded-full">
                  DÉCOUVERTE
                </span>
                <span className="text-xs text-slate-400 font-semibold">Pour toujours</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#09132b] mb-2">
                Gratuit
              </h3>
              
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Idéal pour planifier et ne plus jamais oublier ses rendez-vous personnels.
              </p>

              {/* Prix */}
              <div className="flex items-baseline gap-1.5 mb-8 pb-8 border-b border-slate-100">
                <span className="text-5xl font-black text-[#09132b]">0€</span>
                <span className="text-slate-500 text-sm font-semibold">/ pour toujours</span>
              </div>

              {/* Liste d'avantages */}
              <ul className="space-y-4 text-sm text-slate-600 mb-10">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span>Gestion complète de votre agenda</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span>Notifications sonores &amp; alertes web push</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span>Accès mobile &amp; ordinateur</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span>Répertoire de contacts illimité</span>
                </li>
              </ul>
            </div>

            {/* Bouton Formule Gratuite */}
            <Link
              href="/register"
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-sm font-bold text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 shadow-xs transition-all"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* CARTE 2 : Formule Alamajonda Pro (Mise en avant) */}
          <div className="relative p-8 sm:p-10 rounded-[32px] bg-white border-2 border-blue-600 shadow-[0_25px_60px_-15px_rgba(37,99,235,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            
            {/* Badge Recommandé Parfaitement Intégré */}
            <div className="absolute -top-3.5 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-md shadow-blue-500/30 flex items-center gap-1.5">
              <Sparkles size={12} />
              <span>RECOMMANDÉ</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full">
                  PREMIUM ILLIMITÉ
                </span>
                <span className="text-xs text-blue-600 font-bold">14 jours d&apos;essai offert</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#09132b] mb-2">
                Alamajonda Pro
              </h3>
              
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Pour ceux qui exigent la certitude absolue de ne rater aucun rendez-vous important.
              </p>

              {/* Prix */}
              <div className="flex items-baseline gap-1.5 mb-8 pb-8 border-b border-blue-50">
                <span className="text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  9€
                </span>
                <span className="text-slate-500 text-sm font-semibold">/ mois</span>
              </div>

              {/* Liste d'avantages Pro */}
              <ul className="space-y-4 text-sm text-slate-700 mb-10">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span className="font-bold text-[#09132b]">Appels vocaux directs sur votre smartphone</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span className="font-semibold text-slate-800">Rappels par SMS automatiques illimités</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span className="font-semibold text-slate-800">Synchronisation Google Calendar &amp; Outlook</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span className="font-semibold text-slate-800">Mode Priorité &amp; Urgences 24h/24</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span className="font-semibold text-slate-800">Support client prioritaire 7j/7</span>
                </li>
              </ul>
            </div>

            {/* Bouton Formule Pro */}
            <Link
              href="/register"
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all"
            >
              <span>Essayer Alamajonda Pro</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>

        {/* Garanties centrées et réassurance */}
        <div className="mt-14 text-center text-xs text-slate-500 font-semibold flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>14 jours d&apos;essai complet sans engagement</span>
          </span>
          <span className="flex items-center gap-2">
            <Check size={16} className="text-emerald-500 stroke-[3]" />
            <span>Sans carte bancaire requise</span>
          </span>
          <span className="flex items-center gap-2">
            <Check size={16} className="text-emerald-500 stroke-[3]" />
            <span>Annulation en 1 clic à tout moment</span>
          </span>
        </div>

      </div>
    </section>
  );
}

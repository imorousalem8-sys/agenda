"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function Pricing() {
  return (
    <section id="tarifs" className="py-20 sm:py-28 bg-[#f8faff] border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Titre Centré */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0d55e0] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles size={13} className="text-[#0d55e0]" />
            <span>TARIFICATION SIMPLE &amp; SANS SURPRISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b1736] tracking-tight leading-tight mb-4">
            Investissez dans votre ponctualité
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Commencez sans frais, puis passez à la vitesse supérieure quand vos exigences s&apos;intensifient.
          </p>
        </div>

        {/* Grille des Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* PLAN 1 : Découverte Gratuit */}
          <div className="p-8 sm:p-9 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  Découverte
                </span>
                <span className="text-xs text-slate-400 font-medium">Pour toujours</span>
              </div>

              <h3 className="text-2xl font-black text-[#0b1736] mb-2">Gratuit</h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Idéal pour découvrir la puissance de l&apos;agenda intelligent et organiser vos journées.
              </p>

              <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-slate-100">
                <span className="text-4xl sm:text-5xl font-black text-[#0b1736]">0€</span>
                <span className="text-xs text-slate-500 font-semibold">/ pour toujours</span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#0d55e0] shrink-0" />
                  <span>Agenda synchronisé (Google &amp; Outlook)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#0d55e0] shrink-0" />
                  <span>Rappels sonores et notifications Push web</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#0d55e0] shrink-0" />
                  <span>Gestion des tâches et des contacts</span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400 line-through">
                  <span>Appels Vocaux IA réels sur mobile</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-sm font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
            >
              <span>Commencer Gratuitement</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* PLAN 2 : Pro Executive (Mise en avant Bleu Royal) */}
          <div className="relative p-8 sm:p-9 rounded-3xl bg-white border-2 border-[#0d55e0] shadow-[0_20px_60px_rgba(13,85,224,0.18)] flex flex-col justify-between hover:-translate-y-1 transition-all">
            
            {/* Badge Flottant */}
            <div className="absolute -top-3.5 right-8 bg-[#0d55e0] text-white px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md shadow-blue-600/30 flex items-center gap-1.5">
              <Sparkles size={12} />
              <span>LE CHOIX DES DIRIGEANTS</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0d55e0] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                  Pro Executive
                </span>
                <span className="text-xs text-[#0d55e0] font-bold">Essai 14 jours</span>
              </div>

              <h3 className="text-2xl font-black text-[#0b1736] mb-2">Pro Executive</h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Le pack complet avec appels vocaux IA illimités, SMS de secours et copilote conversationnel.
              </p>

              <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-slate-100">
                <span className="text-4xl sm:text-5xl font-black text-[#0d55e0]">19€</span>
                <span className="text-xs text-slate-500 font-semibold">/ mois · sans engagement</span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 mb-8">
                <li className="flex items-center gap-2.5 font-semibold text-[#0b1736]">
                  <Check size={16} className="text-[#0d55e0] shrink-0" />
                  <span>Appels Vocaux IA illimités sur votre mobile</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#0d55e0] shrink-0" />
                  <span>Briefing vocal intelligent avant chaque réunion</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#0d55e0] shrink-0" />
                  <span>Rappels SMS de secours automatiques</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#0d55e0] shrink-0" />
                  <span>Copilote vocal avec commandes en langage naturel</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#0d55e0] shrink-0" />
                  <span>Support VIP prioritaire 7j/7</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-5 rounded-xl text-sm font-bold text-white bg-[#0d55e0] hover:bg-[#0b47bf] shadow-md shadow-blue-600/30 hover:shadow-lg transition-all"
            >
              <span>Démarrer l&apos;essai Pro</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* PLAN 3 : Entreprise & Équipes */}
          <div className="p-8 sm:p-9 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  Entreprise
                </span>
                <span className="text-xs text-slate-400 font-medium">Cabinet &amp; Société</span>
              </div>

              <h3 className="text-2xl font-black text-[#0b1736] mb-2">Sur-Mesure</h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Pour les cabinets, cliniques et directions ayant plusieurs collaborateurs à synchroniser.
              </p>

              <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-slate-100">
                <span className="text-4xl sm:text-5xl font-black text-[#0b1736]">Sur devis</span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#0d55e0] shrink-0" />
                  <span>Comptes collaborateurs multi-utilisateurs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#0d55e0] shrink-0" />
                  <span>Numéro de standard personnalisé pour les appels</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#0d55e0] shrink-0" />
                  <span>Intégration API &amp; Webhooks sur-mesure</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#0d55e0] shrink-0" />
                  <span>Gestionnaire de compte dédié</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-sm font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
            >
              <span>Contacter l&apos;équipe</span>
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

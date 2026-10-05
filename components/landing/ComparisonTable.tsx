"use client";

import React from "react";
import { Check, X, Sparkles } from "lucide-react";
import Image from "next/image";

export default function ComparisonTable() {
  const rows = [
    {
      feature: "Mode de rappel principal",
      classic: "Notification silencieuse souvent manquée",
      alamajonda: "Appel vocal réel entrant sur votre téléphone",
    },
    {
      feature: "Efficacité en déplacement ou en réunion",
      classic: "Faible (écran verrouillé, mode silencieux)",
      alamajonda: "Maximale (sonnerie GSM + récapitulatif SMS)",
    },
    {
      feature: "Saisie et modification d'événements",
      classic: "Formulaires manuels lents",
      alamajonda: "Copilote IA par commande vocale en direct",
    },
    {
      feature: "Anticipation des temps de trajet",
      classic: "Aucune ou complexe à paramétrer",
      alamajonda: "Calcul proactif avec marge de sécurité",
    },
    {
      feature: "Briefing audio personnalisé",
      classic: "Inexistant",
      alamajonda: "Synthèse vocale des points clés et contacts",
    },
    {
      feature: "Garantie anti-retard",
      classic: "Aucune responsabilité",
      alamajonda: "Protocoles d'escalade d'alerte stricts",
    },
  ];

  return (
    <section id="comparatif" className="py-20 sm:py-28 bg-[#f8faff] border-t border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Titre Centré */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0d55e0] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles size={13} className="text-[#0d55e0]" />
            <span>POURQUOI ALAMAJONDA FAIT LA DIFFÉRENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b1736] tracking-tight leading-tight mb-4">
            Bien plus qu&apos;un simple agenda
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Les calendriers classiques attendent que vous regardiez votre écran. Alamajonda vient activement vous chercher là où vous êtes.
          </p>
        </div>

        {/* Tableau Comparatif Design */}
        <div className="rounded-3xl bg-white border border-slate-200 shadow-[0_15px_45px_rgba(11,23,54,0.06)] overflow-hidden">
          <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 p-4 sm:p-6 text-sm font-bold text-[#0b1736]">
            <div className="col-span-5 sm:col-span-4 text-slate-700">
              Fonctionnalité clé
            </div>
            <div className="col-span-3 sm:col-span-4 text-center text-slate-400">
              Agenda Classique
            </div>
            <div className="col-span-4 text-center text-[#0d55e0] flex items-center justify-center gap-2">
              <div className="relative w-5 h-5 rounded-md overflow-hidden shrink-0">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <span className="font-black text-sm sm:text-base">Alamajonda IA</span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {rows.map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-blue-50/30 transition-colors text-xs sm:text-sm"
              >
                <div className="col-span-5 sm:col-span-4 font-bold text-[#0b1736]">
                  {r.feature}
                </div>
                <div className="col-span-3 sm:col-span-4 text-center text-slate-500 flex items-center justify-center gap-1.5 px-2">
                  <X size={15} className="text-slate-400 shrink-0 hidden sm:inline" />
                  <span>{r.classic}</span>
                </div>
                <div className="col-span-4 text-center font-bold text-[#0d55e0] bg-blue-50/60 py-2 sm:py-2.5 px-3 rounded-xl border border-blue-200/50 flex items-center justify-center gap-1.5 shadow-xs">
                  <Check size={16} className="stroke-[3] text-[#0d55e0] shrink-0" />
                  <span>{r.alamajonda}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

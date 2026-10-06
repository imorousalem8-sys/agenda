"use client";

import React from "react";
import { PhoneCall, CalendarCheck2, MessageSquareText, Mic, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Features() {
  const featuresList = [
    {
      icon: PhoneCall,
      tag: "Technologie Brevetée",
      title: "Appels Vocaux IA en Direct",
      desc: "Votre téléphone sonne réellement au moment voulu. Notre IA conversationnelle vous énonce l'objet du rendez-vous, l'adresse exacte et les contacts à rencontrer.",
      badge: "Sonnerie Réelle GSM & Web",
      highlight: true,
    },
    {
      icon: CalendarCheck2,
      tag: "Temps Réel",
      title: "Agenda Intelligent & Zéro Conflit",
      desc: "Synchronisé instantanément avec Google Calendar et Outlook. L'IA anticipe vos temps de trajet et détecte automatiquement les chevauchements d'horaires.",
      badge: "Google & Outlook Sync",
      highlight: false,
    },
    {
      icon: MessageSquareText,
      tag: "Multi-Canaux",
      title: "Alertes SMS & WhatsApp de Secours",
      desc: "Si vous êtes déjà en ligne ou en réunion, Alamajonda envoie automatiquement un SMS récapitulatif pour que vous ne manquiez aucun détail clé.",
      badge: "Délivrance 100% Garantie",
      highlight: false,
    },
    {
      icon: Mic,
      tag: "Copilote Vocal",
      title: "Commandes en Langage Naturel",
      desc: "Dictez vos tâches et rendez-vous sans ouvrir votre calendrier : 'Alamajonda, déplace mon déjeuner de demain à 13h'. L'IA comprend et applique l'ordre.",
      badge: "IA Vocale Compréhensive",
      highlight: false,
    },
  ];

  return (
    <section id="fonctionnalites" className="py-20 sm:py-28 bg-[#f8faff] relative overflow-hidden">
      {/* Texture subtile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Titre Centré */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0d55e0] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles size={13} className="text-[#0d55e0]" />
            <span>FONCTIONNALITÉS EXÉCUTIVES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b1736] tracking-tight leading-tight mb-4">
            Conçu pour ceux qui ne peuvent pas se permettre d&apos;arriver en retard.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Une combinaison unique d&apos;intelligence artificielle vocale et de gestion d&apos;agenda ultra-précise pour libérer votre esprit.
          </p>
        </div>

        {/* Grille de 4 cartes ultra-propres */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {featuresList.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`p-8 sm:p-10 rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                  item.highlight
                    ? "border-[#0d55e0]/40 shadow-[0_15px_40px_rgba(13,85,224,0.12)] relative"
                    : "border-slate-200/90 shadow-[0_10px_30px_rgba(11,23,54,0.04)] hover:border-blue-300 hover:shadow-[0_15px_35px_rgba(13,85,224,0.08)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0d55e0] flex items-center justify-center border border-blue-100 group-hover:scale-110 group-hover:bg-[#0d55e0] group-hover:text-white transition-all duration-300">
                      <Icon size={26} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#0b1736] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0d55e0] bg-blue-50/80 px-3 py-1.5 rounded-lg border border-blue-200/60">
                    {item.badge}
                  </span>
                  <Link
                    href="/register"
                    className="text-xs font-bold text-slate-500 group-hover:text-[#0d55e0] flex items-center gap-1 transition-colors"
                  >
                    <span>Explorer</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

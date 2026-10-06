"use client";

import React from "react";
import { Calendar, PhoneIncoming, CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Calendar,
      title: "Planifiez ou synchronisez",
      desc: "Connectez votre calendrier habituel (Google, Outlook, Apple) ou ajoutez vos rendez-vous directement à la voix avec le copilote Alamajonda.",
    },
    {
      num: "02",
      icon: PhoneIncoming,
      title: "Réglez vos préférences d'appel",
      desc: "Définissez le timing idéal (15 min avant, 1h avant ou la veille). Choisissez si vous souhaitez un appel vocal direct, un SMS ou les deux.",
    },
    {
      num: "03",
      icon: CheckCircle,
      title: "Décrochez et partez à l'heure",
      desc: "Au moment précis, Alamajonda vous appelle sur votre téléphone mobile, vous énonce les informations essentielles et vous met en route.",
    },
  ];

  return (
    <section id="comment-ca-marche" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Titre Centré */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0d55e0] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles size={13} className="text-[#0d55e0]" />
            <span>PROCESSUS FLUIDE EN 3 ÉTAPES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b1736] tracking-tight leading-tight mb-4">
            Comment Alamajonda veille sur vos journées
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Une mise en place en moins de 2 minutes pour une tranquillité d&apos;esprit totale au quotidien.
          </p>
        </div>

        {/* 3 Cartes Numérotées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative p-8 rounded-3xl bg-[#f8faff] border border-slate-200 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-3xl font-black text-blue-200/90 tracking-tighter">
                      {s.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white text-[#0d55e0] flex items-center justify-center border border-slate-200/80 shadow-xs">
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-[#0b1736] mb-3">
                    {s.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/70 text-xs font-bold text-[#0d55e0]">
                  Étape {idx + 1} validée en 30 secondes
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout central */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-blue-50 border border-blue-200 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-[#0b1736]">
              Prêt à expérimenter la ponctualité absolue ?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Aucun matériel spécifique requis. Fonctionne avec votre numéro de mobile habituel.
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#0d55e0] hover:bg-[#0b47bf] shadow-md shadow-blue-600/20 hover:-translate-y-0.5 transition-all"
          >
            Activer mon compte
          </Link>
        </div>

      </div>
    </section>
  );
}

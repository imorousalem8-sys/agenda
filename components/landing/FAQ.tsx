"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Comment fonctionne l'appel vocal sur mon téléphone mobile ?",
      a: "Alamajonda déclenche automatiquement un appel vocal sortant à la seconde exacte programmée. Votre téléphone sonne comme un appel téléphonique classique. Dès que vous décrochez, l'assistant IA vous énonce à haute voix votre briefing (lieu, heure, contacts et notes).",
    },
    {
      q: "Dois-je installer une application spécifique pour recevoir les appels ?",
      a: "Non, c'est toute la force d'Alamajonda. L'appel vocal arrive directement sur votre numéro de téléphone mobile standard (GSM), sans avoir besoin de garder une application ouverte ou un écran allumé.",
    },
    {
      q: "Mes données d'agenda sont-elles sécurisées et confidentielles ?",
      a: "Absolument. Vos données sont chiffrées de bout en bout (AES-256) et hébergées sur des serveurs sécurisés conformes aux normes RGPD les plus strictes. Nous ne vendons et ne partageons jamais vos informations personnelles.",
    },
    {
      q: "Puis-je continuer à utiliser Google Calendar ou Microsoft Outlook ?",
      a: "Oui. Alamajonda se synchronise dans les deux sens. Tout rendez-vous créé dans votre Google Agenda ou Outlook est immédiatement pris en charge par Alamajonda, et inversement.",
    },
    {
      q: "Que se passe-t-il si je suis déjà en ligne ou indisponible au moment de l'appel ?",
      a: "Si vous ne pouvez pas décrocher ou si vous êtes en communication, notre système d'escalade déclenche immédiatement un SMS de secours avec tous les détails du rendez-vous, suivi d'une notification push prioritaire.",
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white border-t border-slate-200/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Titre Centré */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0d55e0] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles size={13} className="text-[#0d55e0]" />
            <span>RÉPONSES CLAIRES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b1736] tracking-tight mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-base text-slate-600">
            Tout ce que vous devez savoir avant de commencer sereinement avec Alamajonda.
          </p>
        </div>

        {/* Accordéon */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? "bg-[#f8faff] border-blue-200 shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-[#0b1736]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#0d55e0] text-white rotate-180"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-blue-100/60 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

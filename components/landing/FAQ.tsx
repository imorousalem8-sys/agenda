"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "Comment fonctionnent les rappels par appel vocal ?",
    answer: "À l'heure définie pour votre rappel, notre système automatique vous appelle directement sur votre smartphone. Une voix naturelle HD vous récite l'intitulé exact de votre rendez-vous, le lieu et vos consignes. Vous pouvez confirmer ou reporter de 10 minutes directement pendant l'appel.",
  },
  {
    question: "Puis-je utiliser AlarmAgenda sur mon téléphone portable ?",
    answer: "Absolument. AlarmAgenda est 100% responsive et fonctionne comme une application web progressive (PWA) sur iPhone, Android, tablette, Mac et PC sans nécessiter d'installation complexe depuis un store.",
  },
  {
    question: "Mes données personnelles et mes rendez-vous sont-ils protégés ?",
    answer: "Oui. La sécurité et la confidentialité sont nos priorités absolues. Vos informations sont chiffrées selon les normes bancaires AES-256, hébergées en Europe en conformité totale avec le RGPD, et ne sont jamais partagées ni vendues.",
  },
  {
    question: "L'inscription est-elle vraiment gratuite ?",
    answer: "Oui, la formule Découverte est gratuite pour toujours, sans limitation de durée et sans avoir à renseigner la moindre carte bancaire.",
  },
  {
    question: "Puis-je modifier ou annuler un rappel à tout moment ?",
    answer: "Oui, d'un simple clic depuis votre tableau de bord ou par commande vocale, vous pouvez modifier l'heure, la consigne ou désactiver le rappel d'un rendez-vous.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Halo d'ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div
        className="mx-auto relative z-10 max-w-4xl"
        style={{
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-blue-200/80 shadow-[0_2px_12px_rgba(37,99,235,0.06)] text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle size={13} className="text-blue-600" />
            <span>RÉPONSES À VOS QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#09132b] tracking-tight leading-tight mb-4">
            Tout ce que vous devez savoir
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Vous avez des questions ? Nous vous répondons avec une transparence totale.
          </p>
        </div>

        {/* Liste Accordéon en Verre Dépoli */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-[24px] transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white/90 backdrop-blur-2xl border-2 border-blue-400/80 shadow-[0_15px_35px_rgba(37,99,235,0.10)]"
                    : "bg-white/65 backdrop-blur-xl border border-white/80 shadow-sm hover:border-blue-200/80 hover:bg-white/80"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 font-bold text-[#09132b] text-base sm:text-lg select-none"
                >
                  <span className={isOpen ? "text-blue-600" : "text-[#09132b]"}>
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed pt-1 border-t border-blue-50">
                    {faq.answer}
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

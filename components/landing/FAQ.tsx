"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Comment fonctionnent les rappels par appel vocal ?",
    answer: "À l'heure définie pour votre rappel, notre système automatique vous appelle sur votre numéro de téléphone. Une voix claire vous rappelle l'intitulé exact de votre rendez-vous, le lieu et l'heure.",
  },
  {
    question: "Puis-je utiliser Alamajonda sur mon téléphone portable ?",
    answer: "Absolument. Alamajonda est 100% responsive et fonctionne comme une application web progressive sur iPhone, Android, tablette, Mac et PC sans nécessiter d'installation lourde.",
  },
  {
    question: "Mes données personnelles et mes rendez-vous sont-ils protégés ?",
    answer: "Oui. La sécurité et la confidentialité sont au cœur d'Alamajonda. Vos informations sont chiffrées, stockées sur des serveurs sécurisés et ne sont jamais vendues ni utilisées à des fins publicitaires.",
  },
  {
    question: "L'inscription est-elle vraiment gratuite ?",
    answer: "Oui, la formule Découverte est gratuite pour toujours, sans limitation de durée et sans avoir à renseigner de carte bancaire.",
  },
  {
    question: "Puis-je modifier ou annuler un rappel à tout moment ?",
    answer: "Oui, en un seul clic depuis votre interface, vous pouvez modifier l'heure, la date ou désactiver le rappel d'un rendez-vous.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
            QUESTIONS FRÉQUENTES
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Tout ce que vous devez savoir
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Vous avez des questions ? Nous avons les réponses.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
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

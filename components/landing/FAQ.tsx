"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Comment fonctionne la synthèse vocale ?",
    a: "Alamajonda utilise une technologie de synthèse vocale en français. Lorsque l'heure d'un rappel arrive, le système énonce vocalement le titre, le lieu et les consignes du rendez-vous.",
  },
  {
    q: "Puis-je synchroniser avec Google ou Apple Calendar ?",
    a: "Oui. Alamajonda propose un export au format .ICS compatible avec Google Calendar, Apple Calendar, Outlook et Thunderbird.",
  },
  {
    q: "Mes données sont-elles confidentielles ?",
    a: "Absolument. Vos événements et contacts sont isolés dans votre compte sécurisé avec chiffrement de bout en bout.",
  },
  {
    q: "L'application fonctionne-t-elle sur mobile ?",
    a: "Oui, Alamajonda est une Progressive Web App conçue pour mobile, tablette et ordinateur de bureau.",
  },
  {
    q: "Puis-je annuler mon abonnement Pro ?",
    a: "Oui, sans engagement. Vous pouvez gérer ou suspendre votre abonnement en un clic depuis vos paramètres.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="max-w-[700px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[12px] font-semibold text-blue-600 tracking-widest uppercase mb-3">
            Questions fréquentes
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-slate-900 tracking-tight">
            Vous avez des questions ?
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-slate-100 rounded-xl overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-[14px] font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                    openIdx === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIdx === i && (
                <div className="px-5 pb-4 text-[13px] text-slate-400 leading-relaxed border-t border-slate-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

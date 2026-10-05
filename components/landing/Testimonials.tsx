"use client";

import React from "react";
import { Star, Quote, Sparkles } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      author: "Alexandre Mercier",
      role: "Directeur Général · Groupe Valmont",
      text: "Alamajonda m'a littéralement sauvé plusieurs signatures de contrats. Être prévenu par un véritable appel vocal 15 minutes avant change tout par rapport aux notifications banales que l'on balaie sans regarder.",
      rating: 5,
    },
    {
      author: "Dr. Sophie Benali",
      role: "Chirurgienne & Responsable de Pôle",
      text: "Entre les gardes et les consultations privées, mon planning est millimétré. Les rappels vocaux me permettent de rester concentrée sans garder les yeux rivés sur mon téléphone. C'est l'outil indispensable.",
      rating: 5,
    },
    {
      author: "Marc Duprès",
      role: "Avocat d'Affaires Associé",
      text: "L'interface est claire, épurée et d'un professionnalisme rare. Mes clients et confrères s'étonnent de ma ponctualité sans faille. Je ne pourrais plus m'en passer.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Titre Centré */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0d55e0] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles size={13} className="text-[#0d55e0]" />
            <span>TÉMOIGNAGES DE PROFESSIONNELS EXÉCUTIFS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b1736] tracking-tight leading-tight mb-4">
            Adopté par ceux dont chaque minute compte
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Découvrez comment nos utilisateurs ont transformé leur gestion du temps et éliminé la charge mentale des retards.
          </p>
        </div>

        {/* 3 Cartes Témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-[#f8faff] border border-slate-200 flex flex-col justify-between hover:border-blue-300 transition-all duration-300"
            >
              <div>
                {/* Étoiles */}
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <Quote size={28} className="text-blue-200 mb-4" />

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-8 italic">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/80">
                <div className="font-bold text-[#0b1736] text-base">{r.author}</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">{r.role}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

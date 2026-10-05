"use client";

import React from "react";
import { CheckCircle2, Clock, Zap, ShieldCheck } from "lucide-react";

export default function MetricsBar() {
  const metrics = [
    {
      value: "99.8%",
      label: "Taux de Ponctualité",
      desc: "Zéro retard signalé sur les rendez-vous prioritaires.",
      icon: CheckCircle2,
    },
    {
      value: "< 2 sec",
      label: "Déclenchement Appel IA",
      desc: "Précision chirurgicale à la seconde programmée.",
      icon: Zap,
    },
    {
      value: "+42 h",
      label: "Gagnées par Mois",
      desc: "Délégation complète de la relance et du timing.",
      icon: Clock,
    },
    {
      value: "100%",
      label: "Sécurité & Chiffrement",
      desc: "Hébergement conforme RGPD, données privées.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center p-3 ${
                  idx > 0 ? "pt-6 sm:pt-3" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b1736] tracking-tight">
                    {item.value}
                  </span>
                </div>
                <div className="text-sm font-bold text-[#0d55e0] mb-1">
                  {item.label}
                </div>
                <p className="text-xs text-slate-500 max-w-[210px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Découverte",
    price: "0€",
    period: "gratuit à vie",
    description: "Pour découvrir la puissance de l'agenda vocal.",
    features: [
      "Jusqu'à 15 rendez-vous actifs",
      "Synthèse vocale standard",
      "Copilote IA (10 actions/jour)",
      "Export calendrier .ICS",
    ],
    cta: "Créer mon compte gratuit",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "9,99€",
    period: "par mois",
    description: "Pour les professionnels et personnes exigeantes.",
    features: [
      "Rendez-vous illimités",
      "Copilote IA sans restriction",
      "Synthèse vocale HD multi-voix",
      "Rappels de veille automatiques",
      "Support prioritaire",
    ],
    cta: "Passer à Alamajonda Pro",
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[12px] font-semibold text-blue-600 tracking-widest uppercase mb-3">
            Tarification
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-slate-900 tracking-tight">
            Des forfaits adaptés à vos besoins
          </h2>
          <p className="text-[15px] text-slate-400 mt-3">
            Commencez gratuitement, passez à Pro quand vous êtes prêt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? "bg-white border-2 border-blue-500 shadow-[0_8px_30px_rgba(37,99,235,0.12)] relative"
                  : "bg-white border border-slate-200"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  Recommandé
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-[18px] font-bold text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-[12px] text-slate-400">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-[2.5rem] font-extrabold text-slate-900">{plan.price}</span>
                <span className="text-[13px] text-slate-400 ml-1">/ {plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-2.5">
                    <Check size={15} className={plan.highlighted ? "text-blue-500 shrink-0" : "text-slate-400 shrink-0"} />
                    <span className="text-[13px] text-slate-600">{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`block text-center py-3 rounded-full text-[14px] font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

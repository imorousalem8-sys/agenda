"use client";

import { CalendarPlus, Sliders, CheckCircle } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: <CalendarPlus className="w-6 h-6 text-blue-600" />,
    title: "1. Enregistrez votre rendez-vous",
    description: "Saisissez l'objet, la date, l'heure et éventuellement le contact concerné en quelques secondes.",
  },
  {
    step: "02",
    icon: <Sliders className="w-6 h-6 text-blue-600" />,
    title: "2. Choisissez vos modes d'alerte",
    description: "Activez le rappel par appel vocal, notification ou SMS avec le timing qui correspond à votre rythme.",
  },
  {
    step: "03",
    icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
    title: "3. Restez serein, Alamajonda veille",
    description: "L'application vous prévient au moment opportun. Vous arrivez toujours à l'heure, sans stress.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
            FONCTIONNEMENT SIMPLE
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Comment fonctionne Alamajonda ?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Pas de configuration complexe ni de prise de tête. Tout a été pensé pour une prise en main immédiate.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between"
            >
              {/* Step number watermark */}
              <span className="absolute top-4 right-6 text-5xl font-extrabold text-blue-50 select-none pointer-events-none">
                {s.step}
              </span>

              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                  {s.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {s.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

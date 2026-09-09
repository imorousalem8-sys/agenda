"use client";

import { CalendarPlus, Sliders, CheckCircle2 } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: <CalendarPlus className="w-5 h-5 text-blue-600" />,
    title: "1. Enregistrez votre rendez-vous",
    description: "Saisissez l'objet, la date, l'heure et éventuellement le contact concerné en quelques secondes.",
  },
  {
    step: "02",
    icon: <Sliders className="w-5 h-5 text-blue-600" />,
    title: "2. Choisissez vos modes d'alerte",
    description: "Activez le rappel par appel vocal, notification ou SMS avec le timing qui correspond à votre rythme.",
  },
  {
    step: "03",
    icon: <CheckCircle2 className="w-5 h-5 text-blue-600" />,
    title: "3. Restez serein, Alamajonda veille",
    description: "L'application vous prévient au moment opportun. Vous arrivez toujours à l'heure, sans stress.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
            FONCTIONNEMENT SIMPLE
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            Comment fonctionne Alamajonda ?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Pas de configuration complexe. Tout a été pensé pour une prise en main immédiate.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 p-6 sm:p-7 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between"
            >
              {/* Step number watermark */}
              <span className="absolute top-3 right-5 text-4xl font-black text-blue-50/80 select-none pointer-events-none">
                {s.step}
              </span>

              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5">
                  {s.icon}
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">
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

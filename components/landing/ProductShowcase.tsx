"use client";

import Link from "next/link";
import { ArrowRight, Volume2, Sparkles } from "lucide-react";

export default function ProductShowcase() {
  return (
    <section id="voice-reminders" className="py-20 md:py-28 bg-[#F8FAFC] text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Phone Voice Reminder Mockup (5 cols) */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
              
              {/* Note / Callout */}
              <div className="absolute -top-6 -left-4 sm:-left-8 z-20 bg-white px-3.5 py-2 rounded-xl shadow-md border border-slate-100 flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700 italic">
                  Votre temps est précieux !
                </span>
                <Sparkles size={14} className="text-amber-500" />
              </div>

              {/* Smartphone Frame */}
              <div className="bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-800">
                <div className="bg-[#0B1120] text-white rounded-[2rem] p-5 pt-8 overflow-hidden min-h-[360px] flex flex-col justify-between">
                  
                  {/* Top status info */}
                  <div>
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-4 bg-slate-800 rounded-full" />
                    </div>

                    <div className="text-center space-y-1 mb-8">
                      <div className="text-xs text-sky-400 font-semibold tracking-wide">
                        ALAMAJONDA VOCAL
                      </div>
                      <h4 className="text-base font-bold text-white">
                        Votre rendez-vous demain à 09:00
                      </h4>
                      <p className="text-xs text-slate-400">
                        Consultation médicale — Dr. Martin
                      </p>
                    </div>
                  </div>

                  {/* Audio Wave Visualizer */}
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 text-center space-y-3">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-sky-300">
                      <Volume2 size={16} className="text-sky-400 animate-pulse" />
                      <span>Rappel vocal en cours...</span>
                    </div>

                    {/* Animated sound waves */}
                    <div className="flex items-center justify-center gap-1 h-8">
                      {[40, 75, 30, 90, 50, 85, 35, 95, 60, 45, 80, 55, 70, 30].map((h, i) => (
                        <span
                          key={i}
                          className="w-1 bg-gradient-to-t from-blue-500 to-sky-400 rounded-full inline-block"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>

                    <p className="text-[10px] text-slate-400">
                      &quot;Bonjour, votre rendez-vous est programmé demain à 9h au cabinet médical.&quot;
                    </p>
                  </div>

                  {/* Bottom indicator */}
                  <div className="mt-6 flex justify-center">
                    <div className="w-28 h-1 bg-slate-700 rounded-full" />
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Right: Explanatory Copy & CTA (7 cols) */}
          <div className="lg:col-span-6 text-left max-w-xl mx-auto lg:mx-0">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 tracking-wider uppercase mb-4">
              <span>UN ASSISTANT QUI VOUS ACCOMPAGNE</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-5">
              Des rappels personnalisés,
              <br />
              par appel ou notification
            </h2>

            {/* Description */}
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              Alamajonda vous rappelle vos rendez-vous la veille ou le jour même,
              selon vos préférences. Vous pouvez également recevoir des
              notifications sur votre téléphone, ou être appelé directement
              avec un message personnalisé.
            </p>

            {/* CTA Button */}
            <div>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all hover:gap-3"
              >
                <span>Découvrir comment ça marche</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

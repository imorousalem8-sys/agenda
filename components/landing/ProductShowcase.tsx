"use client";

import Link from "next/link";
import { ArrowRight, Volume2, Clock, MessageSquare } from "lucide-react";

export default function ProductShowcase() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — Phone Mockup */}
          <div className="relative flex justify-center order-2 md:order-1">
            {/* Speech bubble */}
            <div className="absolute -top-4 -left-2 md:left-4 z-10 bg-white rounded-xl px-4 py-3 shadow-lg max-w-[180px]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock size={12} className="text-blue-600" />
                </div>
                <span className="text-[9px] font-bold text-slate-800">Rappel vocal</span>
              </div>
              <p className="text-[8px] text-slate-500 leading-relaxed">
                Votre rendez-vous est demain à 09:00
              </p>
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white rotate-45 rounded-sm" />
            </div>

            {/* Phone */}
            <div className="w-[220px] sm:w-[260px] bg-slate-700 rounded-[2rem] p-2 shadow-2xl">
              <div className="rounded-[1.5rem] bg-white overflow-hidden">
                {/* Status bar */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-16 h-1 rounded-full bg-slate-200" />
                </div>

                {/* App header */}
                <div className="px-4 pb-3">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-slate-800">Bonjour !</span>
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-blue-600">A</span>
                    </div>
                  </div>

                  {/* Notification card */}
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 mb-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Volume2 size={12} className="text-blue-600" />
                      <span className="text-[9px] font-bold text-blue-700">Rappel vocal en cours...</span>
                    </div>
                    {/* Waveform */}
                    <div className="flex items-end gap-0.5 h-4">
                      {[30, 60, 40, 80, 50, 70, 35, 65, 45, 75, 55, 85].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-full bg-blue-400"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Event list */}
                  <div className="space-y-2">
                    {[
                      { time: "09:00", title: "Consultation médicale", color: "bg-emerald-500" },
                      { time: "14:00", title: "Rendez-vous coiffure", color: "bg-blue-500" },
                      { time: "18:00", title: "Réunion pro.", color: "bg-amber-500" },
                    ].map((evt, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                        <div className={`w-1 h-7 rounded-full ${evt.color} shrink-0`} />
                        <div>
                          <div className="text-[9px] font-semibold text-slate-700">{evt.title}</div>
                          <div className="text-[7px] text-slate-400">{evt.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative note */}
            <div className="absolute bottom-8 -left-6 md:left-0 bg-white rounded-lg px-3 py-2 shadow-md hidden sm:block">
              <div className="flex items-center gap-1.5">
                <MessageSquare size={10} className="text-slate-400" />
                <span className="text-[8px] text-slate-500 italic">
                  &quot;Votre temps est précieux !&quot;
                </span>
              </div>
            </div>
          </div>

          {/* Right — Text */}
          <div className="order-1 md:order-2">
            <p className="text-[11px] font-semibold text-blue-400 tracking-widest uppercase mb-4">
              Un assistant qui vous accompagne
            </p>
            <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-white leading-tight tracking-tight mb-5">
              Des rappels personnalisés,
              <br />
              par appel ou notification
            </h2>
            <p className="text-[15px] text-slate-400 leading-relaxed mb-8 max-w-md">
              Alamajonda vous rappelle vos rendez-vous la veille ou le jour même,
              selon vos préférences. Vous pouvez également recevoir des
              notifications sur votre téléphone, ou être appelé directement
              avec un message personnalisé.
            </p>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
            >
              Découvrir comment ça marche
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, Check, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* Left — Text */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[12px] font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Votre assistant de rendez-vous intelligent
            </div>

            <h1 className="text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-6">
              Vos rendez-vous,
              <br />
              toujours{" "}
              <span className="text-blue-600">au bon moment.</span>
            </h1>

            <p className="text-[17px] text-slate-500 leading-relaxed mb-8 max-w-md">
              Alamajonda est une application intelligente qui planifie, rappelle et
              gère vos rendez-vous automatiquement. Fini les oublis et les
              déplacements inutiles. Prenez le contrôle de votre temps.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-[0_4px_16px_rgba(37,99,235,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]"
              >
                Commencer gratuitement
                <ArrowRight size={16} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                <Play size={14} className="text-slate-500" />
                Voir la démo
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-[13px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-green-500" />
                Aucune carte bancaire requise
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-green-500" />
                Installation rapide
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-green-500" />
                Disponible sur tous vos appareils
              </span>
            </div>
          </div>

          {/* Right — App Mockup (pure HTML/CSS) */}
          <div className="relative flex justify-center md:justify-end">
            {/* Laptop Mockup */}
            <div className="relative w-full max-w-[520px]">
              {/* Laptop frame */}
              <div className="rounded-xl bg-slate-800 p-1.5 shadow-2xl shadow-slate-900/20">
                <div className="rounded-lg bg-white overflow-hidden">
                  {/* Browser top bar */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="px-3 py-1 rounded-md bg-white border border-slate-200 text-[10px] text-slate-400 font-mono">
                        app.alamajonda.com
                      </div>
                    </div>
                  </div>

                  {/* App UI inside laptop */}
                  <div className="flex min-h-[300px]">
                    {/* Sidebar */}
                    <div className="w-[140px] shrink-0 bg-slate-900 p-3 space-y-2 hidden sm:block">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </div>
                        <span className="text-[10px] font-bold text-white">Alamajonda</span>
                      </div>
                      {["Accueil", "Rendez-vous", "Calendrier", "Notifications", "Paramètres"].map((item, i) => (
                        <div
                          key={item}
                          className={`px-2.5 py-1.5 rounded-md text-[9px] font-medium ${
                            i === 1
                              ? "bg-blue-600 text-white"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-4 bg-slate-50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[11px] font-bold text-slate-800">Mes rendez-vous</h3>
                        <div className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[8px] font-bold">
                          Aujourd&apos;hui
                        </div>
                      </div>

                      <div className="space-y-2">
                        {[
                          { time: "09:00", title: "Consultation médicale", subtitle: "Dr. Martin — Cabinet médical", status: "Confirmé", color: "emerald" },
                          { time: "11:30", title: "Rendez-vous coiffure", subtitle: "Salon Élégance", status: "Confirmé", color: "blue" },
                          { time: "16:00", title: "Réunion professionnelle", subtitle: "Agence Digital", status: "À voir", color: "amber" },
                          { time: "18:30", title: "Suivi client", subtitle: "Visio — Google Meet", status: "À voir", color: "slate" },
                        ].map((rdv, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-2.5 rounded-lg bg-white border border-slate-100 shadow-sm"
                          >
                            <div className="text-[9px] font-bold text-slate-400 w-9 shrink-0">{rdv.time}</div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] font-semibold text-slate-800 truncate">{rdv.title}</div>
                              <div className="text-[8px] text-slate-400 truncate">{rdv.subtitle}</div>
                            </div>
                            <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${
                              rdv.color === "emerald"
                                ? "bg-emerald-50 text-emerald-600"
                                : rdv.color === "blue"
                                ? "bg-blue-50 text-blue-600"
                                : rdv.color === "amber"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-slate-50 text-slate-500"
                            }`}>
                              {rdv.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone mockup — floating right */}
              <div className="absolute -right-4 bottom-4 w-[130px] sm:w-[150px] bg-slate-800 rounded-2xl p-1 shadow-xl shadow-slate-900/20 border border-slate-700 hidden lg:block">
                <div className="rounded-xl bg-white overflow-hidden">
                  {/* Phone notch */}
                  <div className="flex justify-center pt-2 pb-1.5 bg-white">
                    <div className="w-12 h-1 rounded-full bg-slate-200" />
                  </div>
                  {/* Phone content */}
                  <div className="px-2.5 pb-3 space-y-2">
                    <div className="text-[8px] font-bold text-slate-800 mb-1">Mes rendez-vous</div>
                    <div className="text-[7px] text-slate-500 mb-2">Aujourd&apos;hui</div>
                    {[
                      { time: "09:00", title: "Consultation médicale", color: "bg-emerald-500" },
                      { time: "11:30", title: "Rendez-vous coiffure", color: "bg-blue-500" },
                      { time: "16:00", title: "Réunion pro.", color: "bg-amber-500" },
                    ].map((rdv, i) => (
                      <div key={i} className="flex items-center gap-1.5 p-1.5 rounded-md bg-slate-50">
                        <div className={`w-1 h-6 rounded-full ${rdv.color} shrink-0`} />
                        <div>
                          <div className="text-[7px] font-semibold text-slate-700">{rdv.title}</div>
                          <div className="text-[6px] text-slate-400">{rdv.time}</div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-2 p-2 rounded-lg bg-blue-50 border border-blue-100">
                      <div className="text-[7px] font-semibold text-blue-700">Rappel vocal activé</div>
                      <div className="text-[6px] text-blue-500 mt-0.5">Aujourd&apos;hui à 08:00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

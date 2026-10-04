"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Volume2, Sparkles, PhoneCall, CheckCircle2, Play, Square, BellRing, Smartphone, ShieldCheck } from "lucide-react";
import { playAlertChime } from "@/lib/voice";

export default function ProductShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVoiceDemo = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }
      playAlertChime();
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(
        "Rappel AlarmAgenda : Votre réunion de cadrage client démarre dans quinze minutes en salle de conférence. Tous les dossiers sont prêts."
      );
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section id="demo-vocale" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Halo lumineux d'arrière-plan */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-100/50 to-indigo-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div
        className="mx-auto relative z-10"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ========================================================
              GAUCHE : COCKPIT INTERACTIF EN VERRE DÉPOLI (BLEU & BLANC)
             ======================================================== */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative w-full max-w-[420px]">
              
              {/* Badge supérieur flottant */}
              <div className="absolute -top-4 -left-3 z-30 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-2xl shadow-[0_8px_25px_rgba(37,99,235,0.12)] border border-white flex items-center gap-2.5">
                <div className="relative w-6 h-6 rounded-lg overflow-hidden shrink-0 border border-blue-200">
                  <Image src="/logo.png" alt="Logo AlarmAgenda" fill className="object-cover" />
                </div>
                <span className="text-xs font-black text-[#09132b] tracking-wide">
                  Technologie d&apos;Appel IA
                </span>
              </div>

              {/* Boîtier Verre Dépoli Haut de Gamme (Fini les vieux cadres noirs !) */}
              <div className="p-4 sm:p-5 rounded-[36px] bg-white/80 backdrop-blur-2xl border border-white/95 shadow-[0_25px_70px_rgba(37,99,235,0.14)] relative">
                
                {/* Écran Cockpit Translucide */}
                <div className="rounded-[28px] bg-gradient-to-b from-blue-50/70 via-white to-blue-50/40 border border-blue-100/70 p-6 flex flex-col justify-between min-h-[380px] shadow-inner">
                  
                  {/* Barre d'état supérieure */}
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-blue-100/60 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-700">Ligne Prioritaire Active</span>
                      </div>
                      <span className="text-[11px] font-bold text-blue-600 bg-blue-100/60 px-2.5 py-0.5 rounded-full">
                        HD Voice
                      </span>
                    </div>

                    {/* Fiche d'alerte vocale */}
                    <div className="text-center space-y-1.5 mb-6">
                      <div className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-extrabold uppercase tracking-wider">
                        <PhoneCall size={13} />
                        <span>Appel Vocal Entrant</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-[#09132b]">
                        Réunion Client Stratégique
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Aujourd&apos;hui à 14h30 · Salle Conférence A
                      </p>
                    </div>
                  </div>

                  {/* Visualiseur d'Ondes Sonores Bleu Électrique */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-blue-100/80 shadow-sm text-center space-y-3.5">
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-blue-700">
                      <Volume2 size={16} className={isPlaying ? "text-blue-600 animate-pulse" : "text-blue-500"} />
                      <span>{isPlaying ? "Diffusion vocale en temps réel..." : "Prêt pour la démonstration"}</span>
                    </div>

                    {/* Barres d'ondes audio animées */}
                    <div className="flex items-center justify-center gap-1.5 h-10 px-2">
                      {[30, 65, 45, 95, 70, 100, 50, 85, 40, 90, 60, 80, 35, 75, 55, 30].map((h, i) => (
                        <span
                          key={i}
                          className={`w-1 rounded-full bg-gradient-to-t from-blue-600 to-indigo-500 transition-all duration-300 ${
                            isPlaying ? "animate-pulse" : "opacity-40"
                          }`}
                          style={{
                            height: isPlaying ? `${h}%` : "25%",
                            animationDelay: `${i * 40}ms`,
                          }}
                        />
                      ))}
                    </div>

                    <p className="text-[11px] text-slate-500 italic leading-relaxed">
                      &quot;Votre réunion de cadrage client démarre dans 15 minutes. Tous les dossiers sont prêts.&quot;
                    </p>
                  </div>

                  {/* Boutons d'interaction du Cockpit */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                      onClick={toggleVoiceDemo}
                      type="button"
                      className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 transition-all"
                    >
                      {isPlaying ? <Square size={13} className="fill-white" /> : <Play size={13} className="fill-white" />}
                      <span>{isPlaying ? "Couper" : "Décrocher & Écouter"}</span>
                    </button>
                    <button
                      onClick={() => alert("Rappel reporté de 10 minutes avec succès !")}
                      type="button"
                      className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <BellRing size={13} className="text-slate-500" />
                      <span>Reporter (10 min)</span>
                    </button>
                  </div>

                </div>
              </div>

              {/* Petit badge inférieur droit */}
              <div className="absolute -bottom-3 -right-2 z-30 bg-white/90 backdrop-blur-xl px-3.5 py-1.5 rounded-xl shadow-md border border-white flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="text-[11px] font-bold text-slate-700">Sonnerie réelle assurée</span>
              </div>

            </div>
          </div>

          {/* ========================================================
              DROITE : EXPLICATION HAUT DE GAMME DU PRODUIT
             ======================================================== */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Smartphone size={13} />
              <span>UN ASSISTANT TOUJOURS À VOS CÔTÉS</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-[#09132b] tracking-tight leading-tight">
              Des rappels personnalisés, <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                par appel vocal direct ou notification.
              </span>
            </h3>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              AlarmAgenda vous contacte automatiquement à l&apos;heure que vous décidez : la veille, 1 heure avant ou à la minute près. Vous pouvez décrocher et écouter le récapitulatif sans toucher à votre écran.
            </p>

            {/* 3 Cartouches d'avantages en verre dépoli */}
            <div className="space-y-3.5 pt-2">
              
              <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-blue-100/70 shadow-sm flex items-start gap-3.5 hover:border-blue-200 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-[#09132b]">
                    Appel téléphonique direct
                  </h5>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Votre smartphone sonne comme un véritable appel entrant. Même en mode silencieux, le signal sonore prioritaire vous alerte.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-blue-100/70 shadow-sm flex items-start gap-3.5 hover:border-blue-200 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-[#09132b]">
                    IA conversationnelle ultra-rapide
                  </h5>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Posez des questions à votre assistant vocal, demandez un itinéraire ou dictez un nouveau rendez-vous en quelques mots.
                  </p>
                </div>
              </div>

            </div>

            {/* Bouton CTA vers l'action */}
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 group"
              >
                <span>Découvrir l&apos;expérience complète en 1 clic</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

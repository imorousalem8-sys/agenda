"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Pricing from "@/components/landing/Pricing";
import CTASection from "@/components/landing/CTASection";
import { ArrowRight, Play, Square, Sparkles, Check, Phone, Shield } from "lucide-react";
import { playAlertChime } from "@/lib/voice";

export default function OptionBPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTestVoice = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }
      playAlertChime();
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(
        "Allo ! C'est AlarmAgenda. Vous avez une réunion dans dix minutes. Voulez-vous que j'envoie un SMS de confirmation ?"
      );
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-b from-[#f8faff] via-[#ffffff] to-[#f1f6ff] text-slate-900 font-sans antialiased flex flex-col relative">
      <div className="fixed inset-0 bg-[radial-gradient(#3b82f6_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none -z-10" />

      {/* Barre de sélection d'options en haut pour le choix de l'utilisateur */}
      <div className="bg-indigo-600 text-white text-xs py-2 px-4 text-center font-bold flex items-center justify-center gap-4 sticky top-0 z-50 shadow-md">
        <span>VOUS REGARDEZ : <strong>PROPOSITION B (Studio Minimaliste Plein Écran)</strong></span>
        <Link href="/option-a" className="bg-white text-indigo-700 px-3 py-1 rounded-full text-[11px] font-extrabold hover:bg-indigo-50 transition-all">
          &larr; Voir la Proposition A
        </Link>
      </div>

      <Navbar />

      {/* HERO PROPOSITION B */}
      <section className="pt-6 sm:pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Titre ultra-court style Apple */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles size={12} />
              <span>PROPOSITION B · STUDIO MINIMALISTE PLEIN ÉCRAN</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-[#09132b] tracking-tight mb-4">
              L&apos;agenda qui vous appelle.
            </h1>
            <p className="text-lg text-slate-500 max-w-lg mx-auto">
              Une interface limpide. Des rappels par vraie voix IA. Rien d&apos;autre.
            </p>
          </div>

          {/* IMMENSE VITRINE PLEINE PAGE AVEC CONSOLE CENTRALE */}
          <div className="relative w-full rounded-[40px] overflow-hidden shadow-[0_30px_100px_rgba(37,99,235,0.25)] border-4 border-white bg-slate-900">
            <div className="relative w-full h-[460px] sm:h-[620px] lg:h-[700px]">
              <Image
                src="/images/hero-businesswoman.jpg"
                alt="Femme d'affaires au bureau"
                fill
                priority
                className="object-cover object-[center_25%]"
              />

              {/* Voile dégradé doux */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Console de commande centrale flottante */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl bg-white/90 backdrop-blur-2xl rounded-[30px] p-6 sm:p-8 shadow-2xl border border-white/90">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  {/* Info Vocale avec le logo officiel */}
                  <div className="flex items-center gap-4 text-left">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-md border border-blue-200">
                      <Image src="/logo.png" alt="Logo" fill className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-[#09132b]">AlarmAgenda Vocal</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Prêt
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Votre assistant veille 24h/24 sur vos rendez-vous et vos urgences.
                      </p>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                    <button
                      onClick={handleTestVoice}
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
                    >
                      {isPlaying ? <Square size={13} className="fill-slate-700" /> : <Play size={13} className="fill-slate-700" />}
                      <span>{isPlaying ? "Couper" : "Tester la voix"}</span>
                    </button>

                    <Link
                      href="/register"
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all"
                    >
                      <span>Commencer</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* 3 chiffres d'impact sous l'image */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-black text-blue-600 mb-1">0 retard</div>
              <p className="text-xs text-slate-500 font-medium">L&apos;appel vocal vous garantit d&apos;être prévenu à la minute.</p>
            </div>
            <div>
              <div className="text-3xl font-black text-[#09132b] mb-1">2 min chrono</div>
              <p className="text-xs text-slate-500 font-medium">Création de compte instantanée, aucun paramétrage fastidieux.</p>
            </div>
            <div>
              <div className="text-3xl font-black text-[#09132b] mb-1">100% gratuit</div>
              <p className="text-xs text-slate-500 font-medium">Formule de base offerte pour toujours, sans carte requise.</p>
            </div>
          </div>

        </div>
      </section>

      <Pricing />
      <CTASection />
      <Footer />
    </main>
  );
}

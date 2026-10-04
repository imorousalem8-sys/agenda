"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { playAlertChime } from "@/lib/voice";

export default function ExactIdenticalLanding() {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const handlePlayVoice = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (isPlayingVoice) {
        window.speechSynthesis.cancel();
        setIsPlayingVoice(false);
        return;
      }
      playAlertChime();
      setIsPlayingVoice(true);
      const utterance = new SpeechSynthesisUtterance(
        "Bonjour ! C'est votre assistant vocal Alamajonda. Votre rendez-vous est programmé aujourd'hui à 14 heures 30."
      );
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full bg-white text-slate-900 font-sans antialiased">
      
      {/* ========================================================
          1. HEADER — fidèle à la maquette (fond blanc + ombre douce)
         ======================================================== */}
      <header className="w-full bg-white sticky top-0 z-50 shadow-[0_6px_24px_rgba(15,27,61,0.07)]">
        <div
          className="mx-auto flex items-center justify-between h-[72px]"
          style={{
            maxWidth: "1536px",
            paddingLeft: "clamp(24px, 8vw, 120px)",
            paddingRight: "clamp(24px, 8vw, 120px)",
          }}
        >
          {/* Logo officiel Alamajonda */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Alamajonda — accueil">
            <div className="relative w-9 h-9 shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="Logo Alamajonda"
                fill
                priority
                sizes="36px"
                className="object-contain"
              />
            </div>
            <span className="text-[22px] font-bold tracking-tight text-[#0b1736]">
              Alamajonda
            </span>
          </Link>

          {/* Menu central */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[15px] font-medium text-[#0b1736]" aria-label="Navigation principale">
            <Link href="#fonctionnalites" className="hover:text-[#1a56d6] transition-colors">Fonctionnalités</Link>
            <Link href="#pricing" className="hover:text-[#1a56d6] transition-colors">Tarifs</Link>
            <Link href="#fonctionnalites" className="hover:text-[#1a56d6] transition-colors">Solutions</Link>
            <Link href="#fonctionnalites" className="hover:text-[#1a56d6] transition-colors">Tutoriels</Link>
            <Link href="#pricing" className="hover:text-[#1a56d6] transition-colors">Blog</Link>
          </nav>

          {/* CTA */}
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-lg text-[13px] sm:text-[15px] font-semibold text-white bg-[#1a56d6] hover:bg-[#1546b3] shadow-[0_4px_14px_rgba(26,86,214,0.28)] transition-all whitespace-nowrap"
          >
            Commencer Gratuitement
          </Link>
        </div>
      </header>

      {/* ========================================================
          2. HERO — bandeau bleu clair à gauche, photo pleine hauteur à droite
         ======================================================== */}
      <section className="relative w-full bg-white">
        <div className="relative w-full bg-[#f3f8ff] lg:aspect-[1024/370]">

          {/* Photo (bord droit de l'écran) */}
          <div className="relative w-full aspect-[512/370] lg:absolute lg:right-0 lg:top-0 lg:w-1/2 lg:h-full lg:aspect-auto">
            <Image
              src="/images/hero-mockup-crop.jpg"
              alt="Femme d'affaires souriante utilisant l'assistant vocal Alamajonda dans un bureau lumineux"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            {/* Zone cliquable sur la bulle « Appel Vocal » */}
            <button
              type="button"
              onClick={handlePlayVoice}
              aria-label="Écouter l'annonce vocale du rendez-vous de 14h30"
              title="Cliquer pour écouter l'annonce vocale"
              className="absolute left-[5%] top-[38.5%] w-[36%] h-[14%] rounded-xl cursor-pointer hover:bg-blue-500/5 focus-visible:outline-2 focus-visible:outline-blue-600 transition-colors"
            >
              {isPlayingVoice && (
                <span className="absolute inset-0 rounded-xl ring-2 ring-blue-500/70 animate-pulse" />
              )}
            </button>
          </div>

          {/* Texte */}
          <div
            className="relative lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 flex flex-col items-start justify-center py-12 lg:py-0 lg:pb-[2vw]"
            style={{
              paddingLeft: "clamp(24px, 8vw, 120px)",
              paddingRight: "clamp(24px, 3vw, 48px)",
            }}
          >
            <h1 className="font-extrabold text-[#0b1736] tracking-tight leading-[1.15] mb-4 text-[clamp(32px,3.7vw,64px)]">
              Ne manquez plus aucun
              <br />
              rendez-vous important
            </h1>

            <p className="text-[clamp(15px,1.45vw,24px)] text-[#0b1736] leading-snug mb-6 max-w-[34ch] lg:max-w-none">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda
              <br className="hidden lg:block" />{" "}
              sans effort, précise et automatisée.
            </p>

            <Link
              href="#fonctionnalites"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm sm:text-[15px] font-semibold text-white bg-[#1a56d6] hover:bg-[#1546b3] shadow-[0_4px_14px_rgba(26,86,214,0.28)] hover:-translate-y-0.5 transition-all"
            >
              En savoir plus
            </Link>
          </div>
        </div>

        {/* ======================================================
            3. LES 3 CARTES — chevauchent le bas du bandeau
           ====================================================== */}
        <div
          id="fonctionnalites"
          className="relative z-10 mx-auto pb-16 lg:pb-20 pt-8 lg:pt-0 lg:-mt-[7.8vw]"
          style={{
            maxWidth: "1536px",
            paddingLeft: "clamp(24px, 8vw, 120px)",
            paddingRight: "clamp(24px, 8vw, 120px)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-[1.4vw] lg:w-[52%] items-stretch">

            {/* Rappels Vocaux IA */}
            <article className="p-5 lg:p-[1.7vw] rounded-xl bg-white border border-slate-100 shadow-[0_8px_28px_rgba(15,27,61,0.09)] hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(26,86,214,0.14)] transition-all duration-300">
              <svg className="w-9 h-9 lg:w-[3.4vw] lg:h-[3.4vw] lg:min-w-9 lg:min-h-9 text-[#1a56d6] mb-4" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="19" y="6" width="10" height="21" rx="5" />
                <path d="M14 22v1a10 10 0 0 0 20 0v-1" />
                <path d="M24 33v8" />
                <path d="M6 18v8M10 14v16M38 14v16M42 18v8" />
              </svg>
              <h3 className="text-[15px] lg:text-[clamp(14px,1.45vw,22px)] font-bold text-[#0b1736] mb-2">Rappels Vocaux IA</h3>
              <p className="text-xs lg:text-[clamp(11px,1.05vw,16px)] text-slate-600 leading-snug">
                Planifiez des rappels vocaux clairs et naturels en quelques secondes.
              </p>
            </article>

            {/* Multi-Canaux SMS */}
            <article className="p-5 lg:p-[1.7vw] rounded-xl bg-white border border-slate-100 shadow-[0_8px_28px_rgba(15,27,61,0.09)] hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(26,86,214,0.14)] transition-all duration-300">
              <svg className="w-9 h-9 lg:w-[3.4vw] lg:h-[3.4vw] lg:min-w-9 lg:min-h-9 text-[#1a56d6] mb-4" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="7" y="6" width="22" height="36" rx="4" />
                <path d="M7 12h22M7 36h22" />
                <rect x="24" y="12" width="18" height="13" rx="3" fill="currentColor" stroke="currentColor" />
                <path d="M28 25v5l5-5" fill="currentColor" />
                <circle cx="29" cy="18.5" r="1" fill="#fff" stroke="#fff" strokeWidth="1.5" />
                <circle cx="33" cy="18.5" r="1" fill="#fff" stroke="#fff" strokeWidth="1.5" />
                <circle cx="37" cy="18.5" r="1" fill="#fff" stroke="#fff" strokeWidth="1.5" />
              </svg>
              <h3 className="text-[15px] lg:text-[clamp(14px,1.45vw,22px)] font-bold text-[#0b1736] mb-2">Multi-Canaux SMS</h3>
              <p className="text-xs lg:text-[clamp(11px,1.05vw,16px)] text-slate-600 leading-snug">
                Envoyez des confirmations et rappels automatiques par SMS pour une portée maximale.
              </p>
            </article>

            {/* Agenda Intelligent */}
            <article className="p-5 lg:p-[1.7vw] rounded-xl bg-white border border-slate-100 shadow-[0_8px_28px_rgba(15,27,61,0.09)] hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(26,86,214,0.14)] transition-all duration-300">
              <svg className="w-9 h-9 lg:w-[3.4vw] lg:h-[3.4vw] lg:min-w-9 lg:min-h-9 text-[#1a56d6] mb-4" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M30 40H10a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3h26a3 3 0 0 1 3 3v12" />
                <path d="M7 18h32M15 4v8M31 4v8" />
                <path d="m15 28 4 4 8-8" />
                <circle cx="36" cy="36" r="3.5" />
                <path d="M36 28.5v3M36 40.5v3M29.5 32.2l2.6 1.5M39.9 38.3l2.6 1.5M29.5 39.8l2.6-1.5M39.9 33.7l2.6-1.5" strokeWidth="2.4" />
              </svg>
              <h3 className="text-[15px] lg:text-[clamp(14px,1.45vw,22px)] font-bold text-[#0b1736] mb-2">Agenda Intelligent</h3>
              <p className="text-xs lg:text-[clamp(11px,1.05vw,16px)] text-slate-600 leading-snug">
                Organisez vos rendez-vous, réunions et tâches avec une planification intelligente.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* ========================================================
          4. SECTION TARIFS (ESPACÉE, PROPRE ET SANS FOUILIS)
         ======================================================== */}
      <section id="pricing" className="py-24 sm:py-32 bg-[#fafcff] border-t border-slate-100">
        <div
          className="mx-auto"
          style={{
            maxWidth: "1280px",
            paddingLeft: "clamp(24px, 5vw, 64px)",
            paddingRight: "clamp(24px, 5vw, 64px)",
          }}
        >
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-[#09132b] tracking-tight mb-3">
              Tarifs clairs et accessibles.
            </h2>
            <p className="text-base text-slate-500">
              Commencez gratuitement dès maintenant. Aucun engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
            
            {/* Découverte */}
            <div className="p-8 sm:p-9 rounded-[28px] bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                  DÉCOUVERTE
                </span>
                <h3 className="text-2xl font-black text-[#09132b] mt-4 mb-2">Gratuit</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Idéal pour planifier et ne plus oublier ses rendez-vous personnels.
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl sm:text-5xl font-black text-[#09132b]">0€</span>
                  <span className="text-slate-500 text-sm font-semibold">/ pour toujours</span>
                </div>
                <ul className="space-y-3.5 text-sm text-slate-600 mb-8">
                  <li className="flex items-center gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Gestion complète de vos rendez-vous</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Notifications sonores &amp; alertes web push</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Accès multi-supports mobile &amp; ordinateur</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/register"
                className="w-full text-center py-3.5 px-6 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
              >
                Commencer gratuitement
              </Link>
            </div>

            {/* Pro */}
            <div className="relative p-8 sm:p-9 rounded-[28px] bg-white border-2 border-blue-600 shadow-xl shadow-blue-600/10 flex flex-col justify-between">
              <div className="absolute -top-3.5 right-6 bg-blue-600 text-white px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase">
                RECOMMANDÉ
              </div>
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  PREMIUM
                </span>
                <h3 className="text-2xl font-black text-[#09132b] mt-4 mb-2">Alamajonda Pro</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Pour ceux qui exigent la certitude absolue de ne rater aucun rendez-vous.
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl sm:text-5xl font-black text-blue-600">9€</span>
                  <span className="text-slate-500 text-sm font-semibold">/ mois</span>
                </div>
                <ul className="space-y-3.5 text-sm text-slate-700 mb-8">
                  <li className="flex items-center gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span className="font-bold text-[#09132b]">Appels vocaux directs sur votre mobile</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Rappels par SMS automatiques illimités</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Synchronisation Google Calendar &amp; Outlook</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/register"
                className="w-full text-center py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#1d4ed8] hover:bg-[#1e40af] shadow-md shadow-blue-600/25 transition-all"
              >
                Essayer Alamajonda Pro
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          5. PIED DE PAGE BLANC AVEC LOGO OFFICIEL
         ======================================================== */}
      <footer className="w-full bg-white border-t border-slate-200/80 text-slate-500 py-12 text-sm">
        <div
          className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            maxWidth: "1280px",
            paddingLeft: "clamp(24px, 5vw, 64px)",
            paddingRight: "clamp(24px, 5vw, 64px)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden shrink-0 border border-blue-200">
              <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-bold text-[#09132b] text-base">Alamajonda</span>
            <span className="text-xs text-slate-400">© {new Date().getFullYear()} Tous droits réservés.</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link href="#fonctionnalites" className="hover:text-blue-600">Fonctionnalités</Link>
            <Link href="#pricing" className="hover:text-blue-600">Tarifs</Link>
            <Link href="/privacy" className="hover:text-blue-600">Confidentialité</Link>
            <Link href="/terms" className="hover:text-blue-600">Mentions Légales</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

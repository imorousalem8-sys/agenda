"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { playAlertChime } from "@/lib/voice";
import "./landing.css";

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
    <div className="lp">
      {/* 1. HEADER */}
      <header className="lp-header">
        <div className="lp-header-inner">
          <Link href="/" className="lp-logo" aria-label="Alamajonda — accueil">
            <span className="lp-logo-img">
              <Image
                src="/logo.png"
                alt="Logo Alamajonda"
                fill
                priority
                sizes="36px"
                style={{ objectFit: "contain" }}
              />
            </span>
            <span className="lp-logo-text">Alamajonda</span>
          </Link>

          <nav className="lp-nav" aria-label="Navigation principale">
            <Link href="#fonctionnalites">Fonctionnalités</Link>
            <Link href="/register">Tarifs</Link>
            <Link href="#fonctionnalites">Solutions</Link>
            <Link href="#fonctionnalites">Tutoriels</Link>
            <Link href="#fonctionnalites">Blog</Link>
          </nav>

          <Link href="/register" className="lp-btn">
            Commencer Gratuitement
          </Link>
        </div>
      </header>

      {/* 2. HERO + 3. CARTES */}
      <section className="lp-hero">
        <div className="lp-band">
          <div className="lp-photo">
            <Image
              src="/images/hero-woman.jpg"
              alt="Femme d'affaires souriante utilisant l'assistant vocal Alamajonda dans un bureau lumineux"
              fill
              priority
              quality={92}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="lp-photo-img"
              style={{ objectFit: "cover", objectPosition: "62% 30%" }}
            />
            <button
              type="button"
              onClick={handlePlayVoice}
              aria-label="Écouter l'annonce vocale du rendez-vous de 14h30"
              className={`lp-bubble${isPlayingVoice ? " is-playing" : ""}`}
            >
              <span className="lp-wave" aria-hidden="true">
                <i /><i /><i /><i /><i /><i /><i />
              </span>
              <span className="lp-bubble-text">
                <strong>Appel Vocal</strong>
                <span>{isPlayingVoice ? "Lecture en cours…" : "Programmé à 14h30"}</span>
              </span>
            </button>
          </div>

          <div className="lp-copy">
            <h1 className="lp-title">
              <span>Ne manquez plus aucun</span>
              <span>rendez-vous important</span>
            </h1>
            <p className="lp-sub">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda
              <br className="lp-br" /> sans effort, précise et automatisée.
            </p>
            <Link href="#fonctionnalites" className="lp-btn">
              En savoir plus
            </Link>
          </div>
        </div>

        <div id="fonctionnalites" className="lp-cards-wrap">
          <div className="lp-cards">
            <article className="lp-card">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="19" y="6" width="10" height="21" rx="5" />
                <path d="M14 22v1a10 10 0 0 0 20 0v-1" />
                <path d="M24 33v8" />
                <path d="M6 18v8M10 14v16M38 14v16M42 18v8" />
              </svg>
              <h3>Rappels Vocaux IA</h3>
              <p>Planifiez des rappels vocaux clairs et naturels en quelques secondes.</p>
            </article>

            <article className="lp-card">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="7" y="6" width="22" height="36" rx="4" />
                <path d="M7 12h22M7 36h22" />
                <rect x="24" y="12" width="18" height="13" rx="3" fill="currentColor" />
                <path d="M28 25v5l5-5" fill="currentColor" />
                <circle cx="29" cy="18.5" r="1" fill="#fff" stroke="#fff" strokeWidth="1.5" />
                <circle cx="33" cy="18.5" r="1" fill="#fff" stroke="#fff" strokeWidth="1.5" />
                <circle cx="37" cy="18.5" r="1" fill="#fff" stroke="#fff" strokeWidth="1.5" />
              </svg>
              <h3>Multi-Canaux SMS</h3>
              <p>Envoyez des confirmations et rappels automatiques par SMS pour une portée maximale.</p>
            </article>

            <article className="lp-card">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M30 40H10a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3h26a3 3 0 0 1 3 3v12" />
                <path d="M7 18h32M15 4v8M31 4v8" />
                <path d="m15 28 4 4 8-8" />
                <circle cx="36" cy="36" r="3.5" />
                <path d="M36 28.5v3M36 40.5v3M29.5 32.2l2.6 1.5M39.9 38.3l2.6 1.5M29.5 39.8l2.6-1.5M39.9 33.7l2.6-1.5" strokeWidth="2.4" />
              </svg>
              <h3>Agenda Intelligent</h3>
              <p>Organisez vos rendez-vous, réunions et tâches avec une planification intelligente.</p>
            </article>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-brand">
            <span className="lp-logo-img">
              <Image src="/logo.png" alt="Logo" fill sizes="28px" style={{ objectFit: "contain" }} />
            </span>
            <strong>Alamajonda</strong>
            <span>© {new Date().getFullYear()} Tous droits réservés.</span>
          </div>
          <div className="lp-footer-links">
            <Link href="#fonctionnalites">Fonctionnalités</Link>
            <Link href="/privacy">Confidentialité</Link>
            <Link href="/terms">Mentions Légales</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

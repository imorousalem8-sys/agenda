"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { playAlertChime } from "@/lib/voice";
import { Check, ChevronDown } from "lucide-react";
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

      {/* Étoiles filantes animées dans le ciel nocturne */}
      <div className="lp-sky-stars" aria-hidden="true">
        <span className="lp-shooting-star" />
        <span className="lp-shooting-star" />
        <span className="lp-shooting-star" />
      </div>

      <div className="lp-main-content">
        {/* ========================================================
            1. HEADER (Navbar) — Menus bien centrés au milieu
           ======================================================== */}
        <header className="lp-header">
        <div className="lp-header-inner">
          
          {/* Logo Officiel avec l'icône squircle fournie */}
          <Link href="/" className="lp-logo" aria-label="Alamajonda — accueil">
            <span className="lp-logo-img">
              <Image
                src="/logo.png"
                alt="Logo Alamajonda"
                fill
                priority
                sizes="40px"
                style={{ objectFit: "contain" }}
              />
            </span>
            <span className="lp-logo-text">
              Alama<span>jonda</span>
            </span>
          </Link>

          {/* Menus bien classés, bien centrés au milieu */}
          <nav className="lp-nav" aria-label="Navigation principale">
            <Link href="#fonctionnalites">Fonctionnalités</Link>
            <Link href="#tarifs">Tarifs</Link>
            <Link href="#solutions">Solutions</Link>
            <Link href="#tutoriels">Tutoriels</Link>
            <Link href="#faq">FAQ</Link>
          </nav>

          {/* Boutons d'action à droite */}
          <div className="lp-header-actions">
            <Link href="/login" className="lp-link-login">
              Connexion
            </Link>
            <Link href="/register" className="lp-btn">
              Commencer Gratuitement
            </Link>
          </div>

        </div>
      </header>

      {/* ========================================================
          2. HERO STAGE (Conforme à 100% à la maquette de référence)
         ======================================================== */}
      <section className="lp-hero">
        <div className="lp-band">
          
          {/* Photo grand format de la femme avec smartphone à droite */}
          <div className="lp-photo">
            <Image
              src="/images/hero-woman.jpg"
              alt="Femme d'affaires souriante utilisant l'assistant vocal Alamajonda dans un bureau lumineux"
              fill
              priority
              quality={95}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="lp-photo-img"
              style={{ objectFit: "cover", objectPosition: "62% 30%" }}
            />

            {/* Bulle interactive flottante « Appel Vocal » */}
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

          {/* Titres et Bouton à gauche */}
          <div className="lp-copy">
            <div className="lp-badge-wrap">
              <span className="lp-badge">
                <span className="lp-badge-dot" />
                Copilote Vocal IA Autonome
              </span>
            </div>

            <h1 className="lp-title">
              <span className="lp-title-line">Ne manquez plus aucun</span>
              <span className="lp-title-line lp-gradient-text">rendez-vous important</span>
            </h1>

            <p className="lp-sub">
              L&apos;assistant vocal IA intelligent pour une gestion d&apos;agenda
              <br className="lp-br" /> sans effort, précise et automatisée.
            </p>

            <div className="lp-hero-btns">
              <Link href="/register" className="lp-btn lp-btn-primary">
                Commencer Gratuitement
              </Link>
              <button
                type="button"
                onClick={handlePlayVoice}
                className="lp-btn lp-btn-glass"
              >
                {isPlayingVoice ? "Arrêter la voix" : "Écouter l'IA en direct"}
              </button>
            </div>
          </div>

        </div>

        {/* ========================================================
            3. LES 3 CARTES BLANCHES FLOTTANTES DE LA MAQUETTE
           ======================================================== */}
        <div id="fonctionnalites" className="lp-cards-wrap">
          <div className="lp-cards">
            
            {/* Carte 1 : Rappels Vocaux IA */}
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

            {/* Carte 2 : Multi-Canaux SMS */}
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

            {/* Carte 3 : Agenda Intelligent */}
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

      {/* ========================================================
          4. SECTION SOLUTIONS & TUTORIELS (Pas de page blanche !)
         ======================================================== */}
      <section id="tutoriels" className="lp-section bg-soft">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <span className="lp-tag">Fonctionnement fluide</span>
            <h2>Comment Alamajonda veille sur votre journée</h2>
            <p>Trois étapes simples et instantanées pour en finir définitivement avec les retards.</p>
          </div>

          <div className="lp-steps-grid">
            <div className="lp-step-card">
              <span className="lp-step-num">01</span>
              <h3>Synchronisation Immédiate</h3>
              <p>Connectez votre calendrier Google ou Outlook en un clic, ou dictez vos rendez-vous à la voix avec le copilote.</p>
            </div>
            <div className="lp-step-card">
              <span className="lp-step-num">02</span>
              <h3>Configuration du Délai</h3>
              <p>Choisissez quand vous souhaitez être briefé (15 min avant, 1h avant ou la veille) selon vos temps de trajet.</p>
            </div>
            <div className="lp-step-card">
              <span className="lp-step-num">03</span>
              <h3>Appel Vocal en Direct</h3>
              <p>Au moment exact, votre téléphone sonne. L&apos;IA vous énonce les détails clés pour arriver serein et ponctuel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. SECTION TARIFS TRANSPARENTS
         ======================================================== */}
      <section id="tarifs" className="lp-section">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <span className="lp-tag">Tarification Claire</span>
            <h2>Des formules adaptées à votre exigence</h2>
            <p>Commencez gratuitement dès aujourd&apos;hui, sans engagement et sans carte bancaire requise.</p>
          </div>

          <div className="lp-pricing-grid">
            {/* Plan Gratuit */}
            <div className="lp-price-card">
              <div>
                <span className="lp-tag">Découverte</span>
                <h3 className="lp-price-title">Gratuit</h3>
                <p className="lp-price-desc">Pour gérer et organiser votre calendrier personnel.</p>
                <div className="lp-price-val">
                  <strong>0€</strong>
                  <span>/ pour toujours</span>
                </div>
                <ul className="lp-price-features">
                  <li><Check size={16} /> Agenda intelligent synchronisé</li>
                  <li><Check size={16} /> Notifications web push et sonores</li>
                  <li><Check size={16} /> Gestion complète des contacts et tâches</li>
                  <li className="lp-feature-disabled">Appels Vocaux IA réels sur mobile</li>
                </ul>
              </div>
              <Link href="/register" className="lp-btn lp-btn-secondary">
                Commencer Gratuitement
              </Link>
            </div>

            {/* Plan Pro Executive */}
            <div className="lp-price-card featured">
              <span className="lp-price-badge">Recommandé</span>
              <div>
                <span className="lp-tag">Pro Executive</span>
                <h3 className="lp-price-title">Pro Executive</h3>
                <p className="lp-price-desc">Pour les dirigeants et professionnels soucieux de ponctualité.</p>
                <div className="lp-price-val">
                  <strong className="lp-price-accent">19€</strong>
                  <span>/ mois · sans engagement</span>
                </div>
                <ul className="lp-price-features">
                  <li className="lp-feature-highlight"><Check size={16} /> Appels Vocaux IA illimités sur votre mobile</li>
                  <li><Check size={16} /> Briefing vocal avant chaque réunion</li>
                  <li><Check size={16} /> Rappels SMS automatiques de secours</li>
                  <li><Check size={16} /> Copilote vocal avec commandes naturelles</li>
                  <li><Check size={16} /> Support prioritaire exécutif 7j/7</li>
                </ul>
              </div>
              <Link href="/register" className="lp-btn lp-btn-primary">
                Démarrer l&apos;essai Pro 14 jours
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. FAQ INTERACTIVE
         ======================================================== */}
      <section id="faq" className="lp-section bg-soft">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <span className="lp-tag">FAQ</span>
            <h2>Questions Fréquentes</h2>
            <p>Tout ce que vous devez savoir pour démarrer avec Alamajonda.</p>
          </div>

          <div className="lp-faq-wrap">
            <details className="lp-faq-item" open>
              <summary>
                <span>Comment l&apos;appel vocal arrive-t-il sur mon téléphone ?</span>
                <ChevronDown size={18} />
              </summary>
              <div className="lp-faq-content">
                Alamajonda compose un appel sortant direct sur votre numéro de téléphone habituel. Dès que vous décrochez, votre copilote vocal vous transmet un briefing clair avec le lieu, l&apos;heure et les détails clés de votre rendez-vous.
              </div>
            </details>

            <details className="lp-faq-item">
              <summary>
                <span>Est-ce compatible avec Google Agenda et Outlook ?</span>
                <ChevronDown size={18} />
              </summary>
              <div className="lp-faq-content">
                Oui. Alamajonda se synchronise en temps réel avec Google Calendar et Microsoft Outlook. Tout rendez-vous ajouté sur l&apos;une des plateformes est immédiatement pris en charge.
              </div>
            </details>

            <details className="lp-faq-item">
              <summary>
                <span>Que se passe-t-il si je suis déjà en communication ?</span>
                <ChevronDown size={18} />
              </summary>
              <div className="lp-faq-content">
                Si votre ligne est occupée ou si vous ne pouvez pas décrocher, le protocole d&apos;escalade d&apos;Alamajonda envoie automatiquement un SMS récapitulatif pour que vous ayez l&apos;information sous les yeux.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. BANNIÈRE D'APPEL À L'ACTION FINALE
         ======================================================== */}
      <section className="lp-section">
        <div className="lp-section-inner">
          <div className="lp-cta-box">
            <h2>Ne laissez plus jamais un retard vous coûter une opportunité.</h2>
            <p>Rejoignez des centaines de dirigeants, médecins et consultants qui font confiance à Alamajonda au quotidien.</p>
            <Link href="/register" className="lp-btn" style={{ padding: "14px 34px", fontSize: "16px" }}>
              Activer mon compte gratuitement
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. FOOTER STRUCTURÉ & SOBRE
         ======================================================== */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-top">
            <div className="lp-logo">
              <span className="lp-logo-img">
                <Image src="/logo.png" alt="Logo" fill sizes="32px" style={{ objectFit: "contain" }} />
              </span>
              <span className="lp-logo-text">Alama<span>jonda</span></span>
            </div>

            <div className="lp-footer-links">
              <Link href="#fonctionnalites">Fonctionnalités</Link>
              <Link href="#tarifs">Tarifs</Link>
              <Link href="/login">Connexion</Link>
              <Link href="/register">Inscription</Link>
              <Link href="/privacy">Confidentialité</Link>
            </div>
          </div>

          <div className="lp-footer-bottom">
            <span>© {new Date().getFullYear()} Alamajonda. Tous droits réservés.</span>
            <span>Chiffrement 256-bit et hébergement haute sécurité certifié.</span>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}

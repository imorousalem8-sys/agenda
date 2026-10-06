"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/90 text-slate-500 py-16 text-sm font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grille principale 4 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          
          {/* Colonne 1 & 2 : Marque et Vision */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm shrink-0 border border-blue-100">
                <Image
                  src="/logo.png"
                  alt="Alamajonda"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-black text-[#0b1736] text-2xl tracking-tight">
                Alama<span className="text-[#0d55e0]">jonda</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              L&apos;assistant vocal IA intelligent qui protège votre ponctualité, synchronise vos rendez-vous et vous alerte par appel téléphonique au timing exact.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/70 inline-flex">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Système d&apos;appels 100% opérationnel</span>
            </div>
          </div>

          {/* Colonne 3 : Produit */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0b1736]">
              Produit
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="#fonctionnalites" className="hover:text-[#0d55e0] transition-colors">
                  Appels Vocaux IA
                </Link>
              </li>
              <li>
                <Link href="#fonctionnalites" className="hover:text-[#0d55e0] transition-colors">
                  Agenda Synchronisé
                </Link>
              </li>
              <li>
                <Link href="#fonctionnalites" className="hover:text-[#0d55e0] transition-colors">
                  Multi-canaux SMS &amp; Push
                </Link>
              </li>
              <li>
                <Link href="#comparatif" className="hover:text-[#0d55e0] transition-colors">
                  Avantages vs Agenda Standard
                </Link>
              </li>
              <li>
                <Link href="#tarifs" className="hover:text-[#0d55e0] transition-colors">
                  Tarifs &amp; Formules
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Accès Rapide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0b1736]">
              Accès Plateforme
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/login" className="hover:text-[#0d55e0] transition-colors">
                  Espace Connexion
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#0d55e0] transition-colors">
                  Inscription Gratuite
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#0d55e0] transition-colors">
                  Tableau de bord
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-[#0d55e0] transition-colors">
                  Vue Calendrier
                </Link>
              </li>
              <li>
                <Link href="/reminders" className="hover:text-[#0d55e0] transition-colors">
                  Gestion des Rappels
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 5 : Sécurité & Légal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0b1736]">
              Sécurité &amp; Légal
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/privacy" className="hover:text-[#0d55e0] transition-colors">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#0d55e0] transition-colors">
                  Conformité RGPD
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#0d55e0] transition-colors">
                  Conditions d&apos;Utilisation
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-[#0d55e0] transition-colors">
                  Centre d&apos;Aide &amp; FAQ
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Ligne inférieure */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#0d55e0]" />
            <span>Chiffrement SSL 256-bit · Données protégées et souveraines.</span>
          </div>
          <div>
            © {new Date().getFullYear()} Alamajonda Inc. Tous droits réservés.
          </div>
        </div>

      </div>
    </footer>
  );
}

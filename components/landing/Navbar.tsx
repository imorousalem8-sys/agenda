"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(11,23,54,0.06)] border-b border-slate-200/80"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* 1. LOGO OFFICIEL (Gauche) */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-blue-600/20 shrink-0 border border-blue-100 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="Logo Alamajonda"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0b1736]">
                  Alama<span className="text-[#0d55e0]">jonda</span>
                </span>
                <span className="hidden sm:inline-flex text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-[#0d55e0] border border-blue-200/60">
                  AI PRO
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 hidden sm:block tracking-wide">
                Assistant Vocal &amp; Agenda
              </span>
            </div>
          </Link>

          {/* 2. MENUS BIEN CLASSÉS ET BIEN CENTRÉS AU MILIEU */}
          <nav
            aria-label="Navigation principale"
            className="hidden lg:flex items-center justify-center gap-8 xl:gap-10 text-[15px] font-medium text-slate-600 flex-1 px-4"
          >
            <Link
              href="#fonctionnalites"
              className="hover:text-[#0d55e0] transition-colors relative py-1 hover:font-semibold"
            >
              Fonctionnalités
            </Link>
            <Link
              href="#comment-ca-marche"
              className="hover:text-[#0d55e0] transition-colors relative py-1 hover:font-semibold"
            >
              Comment ça marche
            </Link>
            <Link
              href="#comparatif"
              className="hover:text-[#0d55e0] transition-colors relative py-1 hover:font-semibold"
            >
              Avantages
            </Link>
            <Link
              href="#tarifs"
              className="hover:text-[#0d55e0] transition-colors relative py-1 hover:font-semibold"
            >
              Tarifs
            </Link>
            <Link
              href="#faq"
              className="hover:text-[#0d55e0] transition-colors relative py-1 hover:font-semibold"
            >
              FAQ
            </Link>
          </nav>

          {/* 3. BOUTONS D'ACTION (Droite) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#0d55e0] hover:bg-slate-50 rounded-xl transition-all"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#0d55e0] hover:bg-[#0b47bf] shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <span>Essai Gratuit</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Bouton Menu Mobile (Burger) */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/register"
              className="inline-flex sm:hidden items-center justify-center px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0d55e0]"
            >
              Essai
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* TIROIR MOBILE */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 space-y-3 shadow-xl">
          <Link
            href="#fonctionnalites"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0d55e0]"
          >
            Fonctionnalités
          </Link>
          <Link
            href="#comment-ca-marche"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0d55e0]"
          >
            Comment ça marche
          </Link>
          <Link
            href="#comparatif"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0d55e0]"
          >
            Avantages
          </Link>
          <Link
            href="#tarifs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0d55e0]"
          >
            Tarifs
          </Link>
          <Link
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0d55e0]"
          >
            FAQ
          </Link>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-white bg-[#0d55e0]"
            >
              Démarrer Gratuitement
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

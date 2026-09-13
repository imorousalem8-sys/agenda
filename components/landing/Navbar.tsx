"use client";

import Link from "next/link";
import { Mic } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Alamajonda (Icône Bleue Stylisée + Nom) */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* SVG Logo Identique à la maquette */}
            <div className="w-9 h-9 flex items-center justify-center">
              <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Stylized 'A' with audio wave */}
                <path d="M7 26L18 6L29 26" stroke="#155dfc" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18H24" stroke="#155dfc" strokeWidth="3" strokeLinecap="round"/>
                {/* Audio Wave Pillars */}
                <line x1="4" y1="18" x2="4" y2="22" stroke="#155dfc" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="32" y1="18" x2="32" y2="22" stroke="#155dfc" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="18" cy="18" r="3" fill="#155dfc" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#0b152e]">
              Alamajonda
            </span>
          </Link>

          {/* Menu Central (Identique à la maquette) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[15px] font-medium text-slate-700">
            <Link href="#fonctionnalites" className="hover:text-[#155dfc] transition-colors">
              Fonctionnalités
            </Link>
            <Link href="#tarifs" className="hover:text-[#155dfc] transition-colors">
              Tarifs
            </Link>
            <Link href="#solutions" className="hover:text-[#155dfc] transition-colors">
              Solutions
            </Link>
            <Link href="#tutoriels" className="hover:text-[#155dfc] transition-colors">
              Tutoriels
            </Link>
            <Link href="#blog" className="hover:text-[#155dfc] transition-colors">
              Blog
            </Link>
          </nav>

          {/* Bouton Droite (Identique à la maquette) */}
          <div className="flex items-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#155dfc] hover:bg-blue-700 transition-all shadow-sm"
            >
              Commencer Gratuitement
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}

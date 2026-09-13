"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all border-b border-slate-100/80">
      <div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Alamajonda avec Icône Onde Vocale */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center text-[#1d4ed8]">
              {/* Icône A & Ondes stylisées */}
              <svg className="w-9 h-9 text-blue-600" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 4L27 28H22L20.2 23H15.8L14 28H9L18 4ZM19.2 19L18 14.5L16.8 19H19.2Z" fill="currentColor"/>
                <circle cx="5" cy="18" r="2.2" fill="currentColor"/>
                <circle cx="31" cy="18" r="2.2" fill="currentColor"/>
                <rect x="2" y="14" width="2" height="8" rx="1" fill="currentColor"/>
                <rect x="32" y="14" width="2" height="8" rx="1" fill="currentColor"/>
              </svg>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-[#09132b]">
              Alamajonda
            </span>
          </Link>

          {/* Menu Central conforme au modèle */}
          <nav className="hidden md:flex items-center gap-9 text-[15px] font-medium text-slate-600">
            <Link href="#fonctionnalites" className="hover:text-[#1d4ed8] transition-colors">
              Fonctionnalités
            </Link>
            <Link href="/pricing" className="hover:text-[#1d4ed8] transition-colors">
              Tarifs
            </Link>
            <Link href="#solutions" className="hover:text-[#1d4ed8] transition-colors">
              Solutions
            </Link>
            <Link href="#tutoriels" className="hover:text-[#1d4ed8] transition-colors">
              Tutoriels
            </Link>
            <Link href="#blog" className="hover:text-[#1d4ed8] transition-colors">
              Blog
            </Link>
          </nav>

          {/* Bouton CTA Principal */}
          <div className="flex items-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1d4ed8] hover:bg-[#1e40af] shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all"
            >
              <span>Commencer Gratuitement</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}

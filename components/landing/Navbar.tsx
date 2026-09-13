"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white/90 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
      <div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Alamajonda Exécutif */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1d4ed8] to-[#2563eb] flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Sparkles size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-[#09132b]">
                Alamajonda
              </span>
              <span className="text-[10px] font-semibold text-blue-600 tracking-wider uppercase -mt-0.5">
                Executive IA
              </span>
            </div>
          </Link>

          {/* Menu Central */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-slate-600">
            <Link href="#fonctionnalites" className="hover:text-[#1d4ed8] transition-colors">
              Fonctionnalités
            </Link>
            <Link href="/pricing" className="hover:text-[#1d4ed8] transition-colors">
              Tarifs
            </Link>
            <Link href="#solutions" className="hover:text-[#1d4ed8] transition-colors">
              Solutions
            </Link>
            <Link href="#temoignages" className="hover:text-[#1d4ed8] transition-colors">
              Témoignages
            </Link>
          </nav>

          {/* Actions Droite */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-[#1d4ed8] transition-colors hidden sm:inline-block px-3 py-2"
            >
              Se connecter
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1d4ed8] hover:bg-[#1e40af] shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all"
            >
              <span>Commencer Gratuitement</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}

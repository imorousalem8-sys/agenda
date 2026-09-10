"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import Logo from "@/components/brand/Logo";

export default function Navbar() {
  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Vrai Logo Officiel de l'application */}
          <Link href="/" className="flex items-center gap-3 group">
            <Logo size={36} showText={true} animated={true} />
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-cyan-300 border border-blue-400/30">
              <Sparkles size={10} className="text-cyan-400" />
              IA Vocale
            </span>
          </Link>

          {/* Actions Droite */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors hidden sm:inline-block"
            >
              Se connecter
            </Link>

            <Link
              href="/register"
              className="relative group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Démarrer gratuitement</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}

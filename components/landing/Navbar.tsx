"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/brand/Logo";

export default function Navbar() {
  return (
    <header className="w-full bg-[#030712]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-800/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Officiel de l'application */}
          <Link href="/" className="flex items-center gap-3 group">
            <Logo size={36} showText={true} animated={false} />
          </Link>

          {/* Actions Droite */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors hidden sm:inline-block"
            >
              Se connecter
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Démarrer gratuitement</span>
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}

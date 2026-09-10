"use client";

import Link from "next/link";
import Logo from "@/components/brand/Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-8 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Vrai Logo de l'application */}
          <Link href="/" className="flex items-center gap-2">
            <Logo size={30} showText={true} />
          </Link>

          {/* Uniquement Confidentialité & Support Technique */}
          <div className="flex items-center gap-6 text-slate-300 font-medium">
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
              Confidentialité &amp; Données
            </Link>
            <a href="mailto:salemimorou129@gmail.com" className="hover:text-cyan-400 transition-colors">
              Support technique
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}

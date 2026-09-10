"use client";

import Link from "next/link";
import { Bell, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-800/80">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <Bell size={16} />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                AlarmaAgenda
              </span>
            </Link>
            <p className="text-slate-400 text-xs max-w-sm">
              L&apos;assistant agenda intelligent qui veille sur vos journées et vos rendez-vous grâce à l&apos;appel vocal par IA.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-medium">
            <Link href="/login" className="hover:text-blue-400 transition-colors">
              Connexion
            </Link>
            <Link href="/register" className="hover:text-blue-400 transition-colors">
              Inscription gratuite
            </Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">
              Conditions Générales
            </Link>
            <Link href="/privacy" className="hover:text-blue-400 transition-colors">
              Confidentialité &amp; Données
            </Link>
            <a href="mailto:contact@alarmaagenda.com" className="hover:text-blue-400 transition-colors">
              Support technique
            </a>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>&copy; {new Date().getFullYear()} AlarmaAgenda SAS. Tous droits réservés.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-400 font-medium">Système et IA Vocale 100% opérationnels</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

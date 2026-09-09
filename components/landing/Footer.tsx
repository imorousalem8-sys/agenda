"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 text-slate-500 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 text-center sm:text-left">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Bell size={12} />
              </div>
              <span className="text-sm font-bold text-slate-900 tracking-tight">
                AlarmaAgenda
              </span>
            </Link>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="text-[11px] text-slate-400">
              Votre agenda, vos rappels, votre tranquillité.
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-600 font-medium">
            <Link href="/login" className="hover:text-blue-600 transition-colors">
              Connexion
            </Link>
            <Link href="/register" className="hover:text-blue-600 transition-colors">
              Inscription
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
              Conditions d&apos;utilisation
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Confidentialité
            </Link>
            <a href="mailto:contact@alarmaagenda.com" className="hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-3 border-t border-slate-100 text-center text-[10px] text-slate-400">
          &copy; 2025 AlarmaAgenda. Tous droits réservés.
        </div>

      </div>
    </footer>
  );
}

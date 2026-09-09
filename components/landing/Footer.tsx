"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-10 text-slate-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6">
          
          {/* Brand & Slogan */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Bell size={14} />
              </div>
              <span className="text-base font-extrabold text-slate-900 tracking-tight">
                AlarmaAgenda
              </span>
            </Link>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="text-slate-400 text-xs">
              Votre agenda, vos rappels, votre tranquillité.
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-600">
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
        <div className="pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
          &copy; 2025 AlarmaAgenda. Tous droits réservés.
        </div>

      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-100">
          
          {/* Brand Logo & Description */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Bell size={16} />
              </div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                Alamajonda
              </span>
            </Link>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="text-xs text-slate-500">
              Vos rendez-vous, toujours au bon moment.
            </span>
          </div>

          {/* Nav & Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium">
            <a href="#features" className="hover:text-blue-600 transition-colors">
              Fonctionnalités
            </a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
              Comment ça marche
            </a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">
              Tarifs
            </a>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
              Conditions d&apos;utilisation
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Confidentialité
            </Link>
            <a href="mailto:contact@alamajonda.com" className="hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Alamajonda. Tous droits réservés.
        </div>

      </div>
    </footer>
  );
}

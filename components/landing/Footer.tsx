"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 text-slate-500 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Copyright */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Bell size={12} />
            </div>
            <span className="font-bold text-slate-800">AlarmaAgenda</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400">&copy; {new Date().getFullYear()} Tous droits réservés.</span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-5 text-slate-500 font-medium">
            <Link href="/login" className="hover:text-blue-600 transition-colors">
              Connexion
            </Link>
            <Link href="/register" className="hover:text-blue-600 transition-colors">
              Inscription
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
              Conditions
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Confidentialité
            </Link>
            <a href="mailto:contact@alarmaagenda.com" className="hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}

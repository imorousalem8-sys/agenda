"use client";

import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 text-sm font-sans">
      <div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* Logo & Description */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
            <div>
              <span className="font-bold text-white text-base">AlarmAgenda</span>
              <span className="text-xs text-slate-500 ml-2">© {new Date().getFullYear()} Tous droits réservés.</span>
            </div>
          </div>

          {/* Liens de Navigation */}
          <div className="flex items-center gap-6 text-slate-300 text-xs font-medium flex-wrap justify-center">
            <Link href="/login" className="hover:text-blue-400 transition-colors">
              Connexion
            </Link>
            <Link href="/register" className="hover:text-blue-400 transition-colors">
              Inscription
            </Link>
            <Link href="/privacy" className="hover:text-blue-400 transition-colors">
              Confidentialité &amp; RGPD
            </Link>
            <a href="mailto:contact@alarmagenda.app" className="hover:text-blue-400 transition-colors">
              Support technique
            </a>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-emerald-500" />
            <span>Chiffrement 256-bit et hébergement haute sécurité certifié.</span>
          </div>
          <div>Orchestré pour entrepreneurs, artisans &amp; professionnels exigeants.</div>
        </div>
      </div>
    </footer>
  );
}

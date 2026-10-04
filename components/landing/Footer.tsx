"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#070e1e] border-t border-blue-900/30 text-slate-400 py-14 text-sm font-sans relative overflow-hidden">
      {/* Reflet lumineux subtil bleu nuit */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div
        className="mx-auto relative z-10"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-blue-950/80">
          
          {/* Logo AlarmAgenda Officiel & Description */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-md shadow-blue-500/30 border border-blue-400/30">
              <Image
                src="/logo.png"
                alt="Logo AlarmAgenda"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-black text-white text-lg tracking-tight">
                AlarmAgenda
              </div>
              <div className="text-xs text-slate-400">
                L&apos;assistant vocal IA des professionnels exigeants.
              </div>
            </div>
          </div>

          {/* Navigation Rapide */}
          <div className="flex items-center gap-7 text-slate-300 text-xs font-semibold flex-wrap justify-center">
            <Link href="#fonctionnalites" className="hover:text-blue-400 transition-colors">
              Fonctionnalités
            </Link>
            <Link href="#demo-vocale" className="hover:text-blue-400 transition-colors">
              Démo Vocale
            </Link>
            <Link href="#pricing" className="hover:text-blue-400 transition-colors">
              Tarifs
            </Link>
            <Link href="#faq" className="hover:text-blue-400 transition-colors">
              FAQ
            </Link>
            <Link href="/privacy" className="hover:text-blue-400 transition-colors">
              Confidentialité &amp; RGPD
            </Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">
              Mentions Légales
            </Link>
          </div>

        </div>

        {/* Bas de pied de page */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-blue-500" />
            <span>Sécurité certifiée AES-256 · Serveurs cloud 99.9% Uptime</span>
          </div>
          <div>
            © {new Date().getFullYear()} AlarmAgenda Inc. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}

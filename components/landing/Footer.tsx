"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 text-slate-500 py-14 text-sm font-sans relative">
      <div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingLeft: "clamp(24px, 5vw, 64px)",
          paddingRight: "clamp(24px, 5vw, 64px)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-100">
          
          {/* Logo Officiel Alamajonda */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-blue-200/60">
              <Image
                src="/logo.png"
                alt="Logo Alamajonda"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-black text-[#09132b] text-xl tracking-tight">
                Alamajonda
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                L&apos;assistant vocal IA intelligent pour votre agenda.
              </p>
            </div>
          </div>

          {/* Navigation Rapide */}
          <div className="flex items-center gap-8 text-slate-600 text-xs font-semibold flex-wrap justify-center">
            <Link href="#cartes-presentation" className="hover:text-blue-600 transition-colors">
              Fonctionnalités
            </Link>
            <Link href="#pricing" className="hover:text-blue-600 transition-colors">
              Tarifs
            </Link>
            <Link href="/login" className="hover:text-blue-600 transition-colors">
              Connexion
            </Link>
            <Link href="/register" className="hover:text-blue-600 transition-colors">
              Inscription
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Confidentialité &amp; RGPD
            </Link>
          </div>

        </div>

        {/* Ligne inférieure */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-blue-600" />
            <span>Chiffrement 256-bit et hébergement haute sécurité certifié.</span>
          </div>
          <div>
            © {new Date().getFullYear()} Alamajonda. Tous droits réservés.
          </div>
        </div>

      </div>
    </footer>
  );
}

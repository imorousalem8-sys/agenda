"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 text-slate-500 text-xs font-sans">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Alamajonda */}
          <Link href="/" className="flex items-center gap-2 group">
            <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 26L18 6L29 26" stroke="#155dfc" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 18H24" stroke="#155dfc" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="18" cy="18" r="3" fill="#155dfc" />
            </svg>
            <span className="font-bold text-slate-900 text-sm">Alamajonda</span>
          </Link>

          {/* Liens légaux & support */}
          <div className="flex items-center gap-6 text-slate-600 font-medium">
            <Link href="/login" className="hover:text-[#155dfc] transition-colors">
              Connexion
            </Link>
            <Link href="/register" className="hover:text-[#155dfc] transition-colors">
              Inscription
            </Link>
            <a href="mailto:contact@alamajonda.app" className="hover:text-[#155dfc] transition-colors">
              Support technique
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

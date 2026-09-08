import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-10 sm:py-12 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">
                Alamajonda
              </span>
            </Link>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="text-slate-400">
              Plus de temps pour ce qui compte.
            </span>
          </div>

          {/* Legal Links & Socials */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/terms" className="hover:text-slate-900 transition-colors">
              Conditions d&apos;utilisation
            </Link>
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">
              Politique de confidentialité
            </Link>
            <a href="mailto:contact@alamajonda.com" className="hover:text-slate-900 transition-colors">
              Contact
            </a>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 text-center text-[11px] text-slate-400">
          &copy; {new Date().getFullYear()} Alamajonda. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-slate-800">Alamajonda</span>
              <span className="text-[12px] text-slate-400">Plus de temps pour ce qui compte.</span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6 text-[12px] text-slate-400">
            <Link href="#" className="hover:text-slate-600 transition-colors">
              Conditions d&apos;utilisation
            </Link>
            <Link href="#" className="hover:text-slate-600 transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="#" className="hover:text-slate-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-50 text-center text-[11px] text-slate-300">
          &copy; {new Date().getFullYear()} Alamajonda. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

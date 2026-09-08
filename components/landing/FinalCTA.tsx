import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <h2 className="text-[1.75rem] md:text-[2.5rem] font-extrabold text-slate-900 tracking-tight mb-4">
          Prêt à reprendre le contrôle de votre temps ?
        </h2>
        <p className="text-[15px] text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
          Rejoignez les utilisateurs qui ne manquent plus jamais un rendez-vous grâce à Alamajonda.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-[15px] font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-[0_4px_16px_rgba(37,99,235,0.3)] transition-all"
          >
            Commencer gratuitement
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </section>
  );
}

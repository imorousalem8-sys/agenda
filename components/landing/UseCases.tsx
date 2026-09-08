import Link from "next/link";
import { User, Briefcase, Building2, Wrench, ArrowRight } from "lucide-react";

const profiles = [
  {
    icon: <User size={20} className="text-blue-600" />,
    bg: "bg-blue-50",
    title: "Particuliers",
    desc: "Gérez vos rendez-vous personnels, familiaux et administratifs.",
    href: "/register",
  },
  {
    icon: <Briefcase size={20} className="text-emerald-600" />,
    bg: "bg-emerald-50",
    title: "Professionnels",
    desc: "Optimisez votre emploi du temps et votre relation client.",
    href: "/register",
  },
  {
    icon: <Building2 size={20} className="text-purple-600" />,
    bg: "bg-purple-50",
    title: "Entreprises",
    desc: "Améliorez la gestion de vos équipes et de vos plannings.",
    href: "/register",
  },
  {
    icon: <Wrench size={20} className="text-amber-600" />,
    bg: "bg-amber-50",
    title: "Artisans & Indépendants",
    desc: "Suivez vos chantiers et vos rendez-vous sur le terrain.",
    href: "/register",
  },
];

export default function UseCases() {
  return (
    <section id="profiles" className="py-20 md:py-24 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Pretitle */}
        <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
          ADAPTÉ À TOUS VOS BESOINS
        </p>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-12 sm:mb-16">
          Une solution pour chaque profil
        </h2>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {profiles.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl ${p.bg} flex items-center justify-center mb-4`}>
                  {p.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {p.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  {p.desc}
                </p>
              </div>

              {/* Link */}
              <Link
                href={p.href}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors pt-2 border-t border-slate-100"
              >
                <span>En savoir plus</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

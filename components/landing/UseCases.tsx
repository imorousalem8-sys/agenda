"use client";

import Link from "next/link";
import { User, Briefcase, Stethoscope, Building2, ArrowRight } from "lucide-react";

const solutions = [
  {
    icon: <User className="w-6 h-6 text-blue-600" />,
    title: "Particuliers & Familles",
    description: "Médecins, rendez-vous administratifs, activités des enfants : gardez le contrôle complet sur votre vie quotidienne.",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-blue-600" />,
    title: "Indépendants & Consultants",
    description: "Ne manquez aucun appel client ni rendez-vous d'affaires. Soignez votre professionnalisme et votre ponctualité.",
  },
  {
    icon: <Stethoscope className="w-6 h-6 text-blue-600" />,
    title: "Professions Médicales",
    description: "Éliminez les oublis de rendez-vous et préservez vos créneaux de consultation grâce aux rappels directs.",
  },
  {
    icon: <Building2 className="w-6 h-6 text-blue-600" />,
    title: "PME & Artisans",
    description: "Organisez vos déplacements sur le terrain, vos interventions clients et vos plannings d'équipes sans friction.",
  },
];

export default function UseCases() {
  return (
    <section id="solutions" className="py-20 md:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
            POUR CHAQUE PROFIL
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Une solution adaptée à votre quotidien
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Que vous soyez un particulier soucieux de ne rien oublier ou un professionnel exigeant, Alamajonda répond à vos attentes.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 hover:border-blue-400 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5">
                  {item.icon}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors pt-4 border-t border-slate-100"
              >
                <span>Découvrir cette formule</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

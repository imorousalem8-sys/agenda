import { User, Briefcase, Building2, Wrench, ArrowRight } from "lucide-react";

const profiles = [
  {
    icon: <User size={20} strokeWidth={1.5} />,
    title: "Particuliers",
    desc: "Gérez vos rendez-vous personnels, familiaux et administratifs.",
    color: "text-blue-500 bg-blue-50",
  },
  {
    icon: <Briefcase size={20} strokeWidth={1.5} />,
    title: "Professionnels",
    desc: "Optimisez votre emploi du temps et votre relation client.",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: <Building2 size={20} strokeWidth={1.5} />,
    title: "Entreprises",
    desc: "Améliorez la gestion de vos équipes et de vos plannings.",
    color: "text-violet-600 bg-violet-50",
  },
  {
    icon: <Wrench size={20} strokeWidth={1.5} />,
    title: "Artisans & Indépendants",
    desc: "Suivez vos chantiers et vos rendez-vous sur le terrain.",
    color: "text-amber-600 bg-amber-50",
  },
];

export default function UseCases() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[12px] font-semibold text-blue-600 tracking-widest uppercase mb-3">
            Adapté à tous vos besoins
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-slate-900 tracking-tight">
            Une solution pour chaque profil
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {profiles.map((p, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center mb-4`}>
                {p.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-slate-800 mb-1.5">{p.title}</h3>
              <p className="text-[12px] text-slate-400 leading-relaxed mb-4">{p.desc}</p>
              <span className="inline-flex items-center gap-1 text-[12px] font-medium text-slate-400 group-hover:text-blue-600 transition-colors">
                En savoir plus
                <ArrowRight size={12} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

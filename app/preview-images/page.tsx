export default function PreviewImagesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 sm:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-white">
            Galerie des Images Générées
          </h1>
          <p className="text-slate-400 text-sm">
            Voici les 3 images prêtes à être intégrées. Regardez-les et choisissez votre préférée.
          </p>
        </div>

        {/* Option Créateur - Plan Complet */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="px-4 py-1.5 rounded-full bg-cyan-600/30 text-cyan-400 border border-cyan-500/40 text-sm font-bold">
              Option 1 — Créateur & Fondateur (Plan Complet : Bureau Skyline, Jogging Large, Hoodie & Sneakers)
            </span>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/founder-office-full.jpg"
              alt="Créateur Fondateur au Bureau - Plan Complet"
              className="w-full h-auto object-cover max-h-[600px]"
            />
          </div>
        </div>

        {/* Option Créateur - Plan Moyen Laptop */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="px-4 py-1.5 rounded-full bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 text-sm font-bold">
              Option 2 — Créateur & Fondateur (Plan Rapproché : Laptop Agenda Pro, Vue Baie Vitrée)
            </span>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/founder-office-medium.jpg"
              alt="Créateur Fondateur au Bureau - Plan Moyen"
              className="w-full h-auto object-cover max-h-[600px]"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

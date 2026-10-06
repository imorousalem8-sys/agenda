"use client";

import React, { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import VariantTwo from "@/components/landing/variants/VariantTwo";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { Check, Star, ArrowLeft } from "lucide-react";

export default function AccueilModele2Page() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSetAsDefault = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selected_homepage_model", "2");
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900 font-sans antialiased flex flex-col">
      {/* Bandeau de contrôle de modèle */}
      <div className="bg-[#09132b] text-white py-2.5 px-4 sticky top-0 z-50 shadow-md border-b border-indigo-500/20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="font-bold text-slate-200">
              MODÈLE 2 : Studio Plein Écran &amp; Console Centrale
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSetAsDefault}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold shadow-sm transition-all"
            >
              {isSaved ? <Check size={13} className="text-white" /> : <Star size={13} className="fill-white" />}
              <span>{isSaved ? "Défini comme page principale !" : "Choisir comme page d'accueil"}</span>
            </button>

            <Link
              href="/accueil-1"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white underline underline-offset-4 font-semibold"
            >
              <ArrowLeft size={13} />
              <span>Voir le Modèle 1</span>
            </Link>
          </div>

        </div>
      </div>

      {/* 1. Header avec logo et navigation */}
      <Navbar />

      {/* 2. Hero Plein Écran Studio avec Console Flottante */}
      <VariantTwo />

      {/* 3. Tarification aérée et ordonnée */}
      <Pricing />

      {/* 4. Pied de page épuré */}
      <Footer />
    </main>
  );
}

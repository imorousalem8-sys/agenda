"use client";

import React from "react";
import { Sparkles, Eye, Check } from "lucide-react";

interface VariantSwitcherProps {
  currentVariant: number;
  onSelectVariant: (v: number) => void;
}

export default function VariantSwitcher({ currentVariant, onSelectVariant }: VariantSwitcherProps) {
  const variants = [
    { id: 1, label: "Modèle 1 : Immersif Grand Format", desc: "Image large royale + texte court au-dessus" },
    { id: 2, label: "Modèle 2 : Studio Minimaliste", desc: "Plein écran Apple + carte centrale verre" },
    { id: 3, label: "Modèle 3 : Cockpit Pro", desc: "Panoramique + simulateur d'appel en direct" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl">
      <div className="bg-slate-900/95 backdrop-blur-2xl text-white p-2.5 sm:p-3 rounded-2xl sm:rounded-full border border-blue-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row items-center justify-between gap-2.5">
        
        <div className="flex items-center gap-2 pl-3">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <Sparkles size={12} className="text-white" />
          </div>
          <span className="text-xs font-bold text-slate-200">
            Tester les 3 propositions :
          </span>
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center">
          {variants.map((v) => {
            const isSelected = currentVariant === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onSelectVariant(v.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/40"
                    : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                title={v.desc}
              >
                {isSelected && <Check size={12} className="stroke-[3]" />}
                <span>V{v.id}</span>
                <span className="hidden md:inline font-normal opacity-80">· {v.id === 1 ? "Immersif" : v.id === 2 ? "Studio" : "Cockpit"}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}

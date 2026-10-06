"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Volume2,
  Sparkles,
  Check,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import "@/components/alarmeagenda.css";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [preferredMethod, setPreferredMethod] = useState<"notif" | "sound" | "voice">("voice");

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans flex items-center justify-center p-6 antialiased">
      <div className="aa-card p-8 sm:p-10 bg-white max-w-lg w-full space-y-8 shadow-md">
        {/* Logo & Barre d'étapes (Section 40) */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Bell size={16} />
              </div>
              <span className="font-bold text-base text-[#0f172a]">
                Alarme<span className="text-blue-600">Agenda</span>
              </span>
            </div>
            <span className="text-xs font-bold text-blue-600">
              Étape {step} sur 4
            </span>
          </div>

          <div className="w-full bg-[#f1f5f9] h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Étape 1 : Bienvenue */}
        {step === 1 && (
          <div className="space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
              <Sparkles size={28} />
            </div>
            <h1 className="text-2xl font-extrabold text-[#0f172a] tracking-tight">
              Bienvenue sur AlarmeAgenda
            </h1>
            <p className="text-sm text-[#64748b] leading-relaxed max-w-sm mx-auto">
              Votre assistant personnel pour organiser vos journées et ne plus jamais oublier ce qui compte.
            </p>
            <div className="pt-6">
              <button
                onClick={() => setStep(2)}
                className="w-full aa-btn-primary py-3 text-sm flex items-center justify-center gap-2"
              >
                <span>Continuer</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Étape 2 : Méthode de rappel */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-[#0f172a]">
                Comment souhaitez-vous être rappelé ?
              </h2>
              <p className="text-xs text-[#64748b]">
                Choisissez votre canal de prédilection (modifiable à tout moment).
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div
                onClick={() => setPreferredMethod("voice")}
                className={`p-4 rounded-xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                  preferredMethod === "voice"
                    ? "border-blue-600 bg-blue-50/50 shadow-2xs"
                    : "border-[#e2e8f0] hover:bg-[#f8fafc]"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Volume2 size={20} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#0f172a]">Rappel vocal oral (Recommandé)</div>
                  <div className="text-xs text-[#64748b]">L&apos;IA énonce votre rendez-vous à voix haute.</div>
                </div>
              </div>

              <div
                onClick={() => setPreferredMethod("sound")}
                className={`p-4 rounded-xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                  preferredMethod === "sound"
                    ? "border-blue-600 bg-blue-50/50 shadow-2xs"
                    : "border-[#e2e8f0] hover:bg-[#f8fafc]"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Bell size={20} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#0f172a]">Signal sonore d&apos;alarme</div>
                  <div className="text-xs text-[#64748b]">Un carillon retentit pour capter votre attention.</div>
                </div>
              </div>

              <div
                onClick={() => setPreferredMethod("notif")}
                className={`p-4 rounded-xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                  preferredMethod === "notif"
                    ? "border-blue-600 bg-blue-50/50 shadow-2xs"
                    : "border-[#e2e8f0] hover:bg-[#f8fafc]"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#0f172a]">Notification push discrète</div>
                  <div className="text-xs text-[#64748b]">Un simple bandeau d&apos;information sur votre écran.</div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 aa-btn-secondary py-2.5 text-xs"
              >
                Retour
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 aa-btn-primary py-2.5 text-xs"
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* Étape 3 : Rappels intelligents */}
        {step === 3 && (
          <div className="space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
              <Clock size={28} />
            </div>
            <h2 className="text-xl font-bold text-[#0f172a]">
              Découvrez les rappels intelligents
            </h2>
            <p className="text-sm text-[#64748b] leading-relaxed max-w-sm mx-auto">
              AlarmeAgenda peut adapter vos rappels selon vos événements et vos temps de trajet pour que vous ne partiez jamais dans la précipitation.
            </p>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-left text-xs space-y-1.5 text-blue-900">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Exemple concret</span>
              </div>
              <p className="text-[#334155] leading-relaxed">
                Rendez-vous à 15:00 à 25 minutes de distance → AlarmeAgenda déclenche l&apos;alerte à 14:30 automatiquement.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 aa-btn-secondary py-2.5 text-xs"
              >
                Retour
              </button>
              <button
                onClick={() => setStep(4)}
                className="w-2/3 aa-btn-primary py-2.5 text-xs"
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* Étape 4 : Vous êtes prêt */}
        {step === 4 && (
          <div className="space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-[#0f172a]">
              Vous êtes prêt.
            </h2>
            <p className="text-sm text-[#64748b] max-w-sm mx-auto">
              Votre espace AlarmeAgenda est configuré. Vous pouvez dès à présent ajouter votre premier rendez-vous.
            </p>

            <div className="pt-6">
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full aa-btn-primary py-3 text-sm flex items-center justify-center gap-2"
              >
                <span>Accéder à mon tableau de bord</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

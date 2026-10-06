"use client";

import { useState } from "react";
import {
  Settings,
  Bell,
  Sparkles,
  Shield,
  CreditCard,
  Check,
  Save,
} from "lucide-react";
import Link from "next/link";
import "@/components/alarmeagenda.css";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "notifications" | "ia" | "security" | "billing">("general");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="pb-4 border-b border-[#e2e8f0]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
          Paramètres
        </h1>
        <p className="text-sm text-[#64748b] mt-0.5">
          Configurez le comportement général d&apos;AlarmeAgenda.
        </p>
      </div>

      {/* Onglets de navigation des paramètres (Section 21) */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#e2e8f0] pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-3 py-2 rounded-lg transition-colors shrink-0 ${
            activeTab === "general" ? "bg-blue-50 text-blue-700 font-bold" : "text-[#64748b] hover:bg-[#f8fafc]"
          }`}
        >
          Général
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-3 py-2 rounded-lg transition-colors shrink-0 ${
            activeTab === "notifications" ? "bg-blue-50 text-blue-700 font-bold" : "text-[#64748b] hover:bg-[#f8fafc]"
          }`}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab("ia")}
          className={`px-3 py-2 rounded-lg transition-colors shrink-0 ${
            activeTab === "ia" ? "bg-blue-50 text-blue-700 font-bold" : "text-[#64748b] hover:bg-[#f8fafc]"
          }`}
        >
          Assistant IA
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-3 py-2 rounded-lg transition-colors shrink-0 ${
            activeTab === "security" ? "bg-blue-50 text-blue-700 font-bold" : "text-[#64748b] hover:bg-[#f8fafc]"
          }`}
        >
          Sécurité
        </button>
        <button
          onClick={() => setActiveTab("billing")}
          className={`px-3 py-2 rounded-lg transition-colors shrink-0 ${
            activeTab === "billing" ? "bg-blue-50 text-blue-700 font-bold" : "text-[#64748b] hover:bg-[#f8fafc]"
          }`}
        >
          Abonnement
        </button>
      </div>

      {/* Contenu selon l'onglet */}
      <div className="aa-card p-6 bg-white space-y-6">
        {activeTab === "general" && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#0f172a]">Préférences générales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[#64748b] font-medium mb-1">Langue de l&apos;application</label>
                <select className="w-full p-2.5 rounded-lg border border-[#cbd5e1] text-[#0f172a] bg-white">
                  <option value="fr">Français (France)</option>
                  <option value="en">English (US)</option>
                </select>
              </div>
              <div>
                <label className="block text-[#64748b] font-medium mb-1">Format horaire</label>
                <select className="w-full p-2.5 rounded-lg border border-[#cbd5e1] text-[#0f172a] bg-white">
                  <option value="24">24 heures (ex: 14:30)</option>
                  <option value="12">12 heures (AM / PM)</option>
                </select>
              </div>
              <div>
                <label className="block text-[#64748b] font-medium mb-1">Premier jour de la semaine</label>
                <select className="w-full p-2.5 rounded-lg border border-[#cbd5e1] text-[#0f172a] bg-white">
                  <option value="1">Lundi</option>
                  <option value="0">Dimanche</option>
                </select>
              </div>
              <div>
                <label className="block text-[#64748b] font-medium mb-1">Fuseau horaire de référence</label>
                <input
                  type="text"
                  defaultValue="Europe/Paris (UTC+02:00)"
                  disabled
                  className="w-full p-2.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-[#64748b]"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#0f172a]">Canaux de notification</h3>
            <div className="space-y-3 pt-2 divide-y divide-[#f1f5f9]">
              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="font-semibold text-[#0f172a]">Alertes push navigateur &amp; mobile</div>
                  <div className="text-[#64748b]">Affichage d&apos;un bandeau sur l&apos;écran au moment du rappel.</div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
              </div>
              <div className="flex items-center justify-between pt-3">
                <div>
                  <div className="font-semibold text-[#0f172a]">Rappels par email récapitulatif</div>
                  <div className="text-[#64748b]">Recevoir chaque matin l&apos;agenda complet de votre journée par email.</div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
              </div>
              <div className="flex items-center justify-between pt-3">
                <div>
                  <div className="font-semibold text-[#0f172a]">Rappel vocal oral en direct</div>
                  <div className="text-[#64748b]">Alarme sonore parlée pour ne jamais manquer un départ.</div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "ia" && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#0f172a]">Paramètres de l&apos;Assistant IA</h3>
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[#64748b] font-medium mb-1">Ton des réponses vocales</label>
                <select className="w-full p-2.5 rounded-lg border border-[#cbd5e1] text-[#0f172a] bg-white">
                  <option value="concis">Concis et professionnel (recommandé)</option>
                  <option value="chaleureux">Chaleureux et détaillé</option>
                </select>
              </div>
              <div>
                <label className="block text-[#64748b] font-medium mb-1">Anticipation intelligente du trajet</label>
                <div className="text-[#64748b] mb-2">L&apos;IA évalue automatiquement la distance pour avancer le rappel si nécessaire.</div>
                <select className="w-full p-2.5 rounded-lg border border-[#cbd5e1] text-[#0f172a] bg-white">
                  <option value="auto">Activé automatiquement</option>
                  <option value="manuel">Désactivé (délai fixe uniquement)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#0f172a]">Sécurité &amp; Sessions</h3>
            <div className="space-y-3 pt-2">
              <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#0f172a]">Session active actuelle</div>
                  <div className="text-[#64748b]">Windows • Navigateur Web • Connecté</div>
                </div>
                <span className="aa-badge-green text-[10px]">Actif</span>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert("Un email de réinitialisation de mot de passe a été envoyé.")}
                  className="aa-btn-secondary text-xs"
                >
                  Modifier le mot de passe
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#0f172a]">Gestion de l&apos;Abonnement (Section 21)</h3>
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-900 text-sm">Formule actuelle : PRO</span>
                <span className="aa-badge-blue text-[10px]">9,90 € / mois</span>
              </div>
              <p className="text-[#475569] text-xs">
                Vous bénéficiez des rappels vocaux illimités, de l&apos;anticipation des trajets et de l&apos;assistant IA complet.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <Link href="/pricing" className="aa-btn-secondary text-xs py-1.5 px-3">
                  Voir les formules
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[#f1f5f9] flex justify-end">
          <button
            onClick={handleSave}
            className="aa-btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
          >
            {saved ? <Check size={14} /> : <Save size={14} />}
            <span>{saved ? "Modifications enregistrées" : "Enregistrer"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

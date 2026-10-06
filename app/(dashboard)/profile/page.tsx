"use client";

import { useState } from "react";
import { User, Bell, Volume2, Shield, Save, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import "@/components/alarmeagenda.css";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);

  const [voiceReminder, setVoiceReminder] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reminderDelay, setReminderDelay] = useState("30");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* En-tête */}
      <div className="pb-4 border-b border-[#e2e8f0]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
          Profil utilisateur
        </h1>
        <p className="text-sm text-[#64748b] mt-0.5">
          Gérez vos informations personnelles et vos préférences de rappel.
        </p>
      </div>

      {/* Carte Informations Personnelles (Section 20) */}
      <div className="aa-card p-6 bg-white space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 font-extrabold text-2xl flex items-center justify-center border-2 border-blue-200">
            S
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0f172a]">Salem Imorou</h2>
            <p className="text-xs text-[#64748b]">salem.imorou@alarmeagenda.com</p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="aa-badge-blue text-[10px]">FORMULE PRO ACTIVE</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#f1f5f9] text-xs">
          <div>
            <label className="block text-[#64748b] font-medium mb-1">Prénom</label>
            <input
              type="text"
              defaultValue="Salem"
              className="w-full p-2.5 rounded-lg border border-[#cbd5e1] text-[#0f172a] font-medium"
            />
          </div>
          <div>
            <label className="block text-[#64748b] font-medium mb-1">Nom</label>
            <input
              type="text"
              defaultValue="Imorou"
              className="w-full p-2.5 rounded-lg border border-[#cbd5e1] text-[#0f172a] font-medium"
            />
          </div>
          <div>
            <label className="block text-[#64748b] font-medium mb-1">Téléphone pour alertes</label>
            <input
              type="tel"
              defaultValue="+33 6 12 34 56 78"
              className="w-full p-2.5 rounded-lg border border-[#cbd5e1] text-[#0f172a] font-medium"
            />
          </div>
          <div>
            <label className="block text-[#64748b] font-medium mb-1">Fuseau horaire</label>
            <input
              type="text"
              defaultValue="Europe/Paris (UTC+2)"
              disabled
              className="w-full p-2.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-[#64748b]"
            />
          </div>
        </div>
      </div>

      {/* Préférences de rappel (Spécifié Section 20) */}
      <div className="aa-card p-6 bg-white space-y-5">
        <h3 className="text-base font-bold text-[#0f172a] flex items-center gap-2">
          <Bell size={18} className="text-blue-600" />
          <span>Préférences de rappel</span>
        </h3>

        <div className="space-y-4 text-xs divide-y divide-[#f1f5f9]">
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="font-semibold text-[#0f172a]">Rappels vocaux parlés</div>
              <div className="text-[#64748b]">L&apos;application énonce le rappel de vive voix pour éviter les oublis.</div>
            </div>
            <input
              type="checkbox"
              checked={voiceReminder}
              onChange={(e) => setVoiceReminder(e.target.checked)}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <div className="font-semibold text-[#0f172a]">Notifications push</div>
              <div className="text-[#64748b]">Recevoir une alerte sur votre téléphone et ordinateur.</div>
            </div>
            <input
              type="checkbox"
              checked={pushNotif}
              onChange={(e) => setPushNotif(e.target.checked)}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <div className="font-semibold text-[#0f172a]">Signal sonore d&apos;attention</div>
              <div className="text-[#64748b]">Faire retentir le carillon audio avant l&apos;annonce vocale.</div>
            </div>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="pt-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-[#0f172a]">Délai d&apos;anticipation par défaut</div>
              <div className="text-[#64748b]">Moment auquel AlarmeAgenda doit vous avertir avant chaque rendez-vous.</div>
            </div>
            <select
              value={reminderDelay}
              onChange={(e) => setReminderDelay(e.target.value)}
              className="p-2 rounded-lg border border-[#cbd5e1] text-xs font-semibold text-[#0f172a] bg-white"
            >
              <option value="15">15 minutes avant</option>
              <option value="30">30 minutes avant</option>
              <option value="60">1 heure avant</option>
              <option value="120">2 heures avant</option>
            </select>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end">
          <button
            onClick={handleSave}
            className="aa-btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
          >
            {saved ? <Check size={14} /> : <Save size={14} />}
            <span>{saved ? "Préférences enregistrées !" : "Enregistrer les modifications"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

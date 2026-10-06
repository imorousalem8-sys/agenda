"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, ArrowLeft, CheckCircle2 } from "lucide-react";
import "@/components/alarmeagenda.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans flex items-center justify-center p-6 antialiased">
      <div className="aa-card p-8 sm:p-10 bg-white max-w-md w-full space-y-6 shadow-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 no-underline mx-auto">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
            <Bell size={18} />
          </div>
          <span className="font-bold text-lg text-[#0f172a]">
            Alarme<span className="text-blue-600">Agenda</span>
          </span>
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Mot de passe oublié</h1>
          <p className="text-xs text-[#64748b] mt-1">
            Indiquez votre adresse email pour recevoir un lien de réinitialisation sécurisé.
          </p>
        </div>

        {sent ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold space-y-2">
            <div className="flex items-center justify-center gap-1.5 font-bold">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Email de réinitialisation envoyé</span>
            </div>
            <p className="font-normal text-[#334155]">
              Veuillez vérifier votre boîte de réception pour réinitialiser votre mot de passe.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                Adresse email
              </label>
              <input
                type="email"
                required
                placeholder="votre.email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#cbd5e1] focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-[#0f172a]"
              />
            </div>

            <button type="submit" className="w-full aa-btn-primary py-3 text-sm">
              Envoyer les instructions
            </button>
          </form>
        )}

        <div className="pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline no-underline"
          >
            <ArrowLeft size={13} />
            <span>Retour à la connexion</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

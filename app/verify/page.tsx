"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ArrowRight, CheckCircle2 } from "lucide-react";
import "@/components/alarmeagenda.css";

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [success, setSuccess] = useState(false);

  const handleChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      router.push("/onboarding");
    }, 1500);
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
          <h1 className="text-2xl font-bold text-[#0f172a]">Vérification du compte</h1>
          <p className="text-xs text-[#64748b] mt-1">
            Entrez le code à 6 chiffres envoyé à votre adresse email.
          </p>
        </div>

        {success ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Code validé ! Redirection vers l&apos;onboarding...</span>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            {/* Grille 6 chiffres OTP (Section 23) */}
            <div className="flex justify-center gap-2.5">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  className="w-11 h-13 text-center text-xl font-bold rounded-xl border border-[#cbd5e1] focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-[#0f172a] bg-[#f8fafc]"
                />
              ))}
            </div>

            <button type="submit" className="w-full aa-btn-primary py-3 text-sm">
              Valider mon code
            </button>
          </form>
        )}

        <div className="text-xs text-[#64748b] pt-2">
          Vous n&apos;avez rien reçu ?{" "}
          <button
            type="button"
            onClick={() => alert("Un nouveau code a été envoyé.")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Renvoyer le code
          </button>
        </div>
      </div>
    </div>
  );
}

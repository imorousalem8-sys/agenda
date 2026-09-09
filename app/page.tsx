import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import UseCases from "@/components/landing/UseCases";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "AlarmaAgenda — Agenda intelligent • Rappels vocaux • Notifications",
  description: "AlarmaAgenda organise vos rendez-vous et vous prévient au bon moment grâce aux rappels vocaux, notifications et SMS.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. Header & Navbar */}
      <Navbar />

      {/* 2. Hero Section Principale */}
      <Hero />

      {/* 3. Votre agenda. Vos rappels. Votre tranquillité. */}
      <Features />

      {/* 4. Comment ça fonctionne en 3 étapes */}
      <HowItWorks />

      {/* 5. Deux modes d'utilisation & Exemple concret */}
      <UseCases />

      {/* 6. Bannière d'action finale */}
      <CTASection />

      {/* 7. Pied de page */}
      <Footer />
    </main>
  );
}

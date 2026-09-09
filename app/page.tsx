import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "AlarmaAgenda — Votre temps, orchestré avec une précision absolue",
  description: "L'intelligence vocale qui veille sur vos rendez-vous et vos journées sans effort.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Hero & Scène Panoramique & Timeline Fluide */}
      <Hero />

      {/* 3. Bannière Royale de Conversion */}
      <CTASection />

      {/* 4. Pied de page minimaliste */}
      <Footer />
    </main>
  );
}

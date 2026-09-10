import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "AlarmaAgenda — Votre temps, orchestré avec une précision absolue",
  description: "L'assistant intelligent qui veille sur vos rendez-vous et vous appelle directement par téléphone grâce à l'IA vocale.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-950 text-white font-sans antialiased selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
      {/* 1. Navigation bar */}
      <Navbar />

      {/* 2. Hero Section Principale avec scène 3D */}
      <div className="flex-1 flex flex-col justify-center">
        <Hero />
      </div>

      {/* 3. Pied de page */}
      <Footer />
    </main>
  );
}

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import ProductShowcase from "@/components/landing/ProductShowcase";
import UseCases from "@/components/landing/UseCases";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "Alamajonda — Vos rendez-vous, toujours au bon moment",
  description: "Alamajonda est une application intelligente qui planifie, rappelle et gère vos rendez-vous automatiquement par appels vocaux et notifications.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. Dark Top Section: Header & Hero */}
      <div className="w-full bg-[#0B1120]">
        <Navbar />
        <Hero />
      </div>

      {/* 2. Features: Pourquoi choisir Alamajonda ? */}
      <Features />

      {/* 3. Product Showcase: Des rappels personnalisés, par appel ou notification */}
      <ProductShowcase />

      {/* 4. Use Cases: Adapté à tous vos besoins */}
      <UseCases />

      {/* 5. Minimalist Footer */}
      <Footer />
    </div>
  );
}

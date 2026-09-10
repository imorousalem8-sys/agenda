"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden bg-slate-950 text-white">
      
      {/* Background Dot Grid Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      
      {/* Glowing Aurora Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/25 via-indigo-600/30 to-purple-600/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Headline Left, 3D Right */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16 sm:mb-24">
          
          {/* Left Column: Headline only */}
          <div className="lg:col-span-6 text-left">
            
            {/* Monumental Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-black text-white tracking-tight leading-[1.12]">
              Votre temps, orchestré avec <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                une précision absolue.
              </span>
            </h1>

          </div>

          {/* Right Column: 3D Isometric AI Workspace Scene (6 cols) */}
          <div className="lg:col-span-6 relative">
            
            {/* Glowing Aura behind 3D image */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/30 via-indigo-600/30 to-purple-600/30 rounded-[2rem] blur-2xl opacity-75 pointer-events-none" />

            {/* 3D Scene Container */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-indigo-950/60 bg-slate-900 group aspect-[16/9]">
              
              {/* Ultra-Fast Next.js Image with Preload Priority */}
              <Image
                src="/images/founder-hero-workspace.webp"
                alt="AlarmaAgenda - Espace de travail 3D avec le créateur et assistant vocal IA"
                width={1376}
                height={768}
                priority={true}
                quality={90}
                sizes="(max-width: 1024px) 100vw, 600px"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Glass Overlay on edges */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-slate-950/10 pointer-events-none" />

            </div>

          </div>

        </div>

        {/* Centered H3 Statement Section - Strictly Centered Across Full Width */}
        <div className="w-full flex justify-center items-center text-center">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h3 className="text-lg sm:text-2xl md:text-[1.65rem] font-medium sm:font-semibold text-slate-200 leading-relaxed tracking-tight text-center">
              AlarmaAgenda planifie vos rendez-vous et{" "}
              <strong className="text-white font-bold bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                vous appelle directement au téléphone
              </strong>{" "}
              avec une voix naturelle pour que vous soyez toujours à l&apos;heure, sans stress.
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}

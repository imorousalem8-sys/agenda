"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // Smoothly redirect to landing page with register tunnel focused
    router.replace("/login#auth-section");
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
      }}
    >
      <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
        Chargement de l&apos;espace d&apos;inscription...
      </div>
    </div>
  );
}

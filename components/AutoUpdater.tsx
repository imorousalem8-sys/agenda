"use client";

import { useEffect } from "react";

const CURRENT_VERSION_KEY = "alarm_agenda_build_version";

export default function AutoUpdater() {
  useEffect(() => {
    // 1. Service Worker auto-update listener
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const reg of registrations) {
          reg.update().catch(() => {});
        }
      });

      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }

    // 2. Automatic version check & cache bust
    const checkVersion = async () => {
      try {
        const res = await fetch(`/api/version?_t=${Date.now()}`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        if (!res.ok) return;

        const data = await res.json();
        const serverVersion = data.version;
        const localVersion = localStorage.getItem(CURRENT_VERSION_KEY);

        if (serverVersion && localVersion && serverVersion !== localVersion) {
          console.log(`[AutoUpdater] New version detected (${serverVersion} vs ${localVersion}). Refreshing in background...`);
          localStorage.setItem(CURRENT_VERSION_KEY, serverVersion);

          // Clear all client caches
          if ("caches" in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map((key) => caches.delete(key)));
          }

          // Force clean reload
          window.location.reload();
        } else if (serverVersion && !localVersion) {
          localStorage.setItem(CURRENT_VERSION_KEY, serverVersion);
        }
      } catch (e) {
        console.warn("[AutoUpdater] Version check failed:", e);
      }
    };

    // Run check on mount
    checkVersion();

    // Run check when window gains focus, becomes visible or comes online
    const handleFocus = () => checkVersion();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") checkVersion();
    };
    window.addEventListener("focus", handleFocus);
    window.addEventListener("online", handleFocus);
    document.addEventListener("visibilitychange", handleVisibility);

    // Fast periodic check every 15 seconds for real-time fleet synchronization
    const interval = setInterval(checkVersion, 15000);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("online", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
      clearInterval(interval);
    };
  }, []);

  return null;
}

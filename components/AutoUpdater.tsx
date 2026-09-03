"use client";

import { useEffect } from "react";

const CURRENT_VERSION_KEY = "alarm_agenda_build_version";

export default function AutoUpdater() {
  useEffect(() => {
    // 1. Service Worker background registration & update
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const reg of registrations) {
          reg.update().catch(() => {});
        }
      });
    }

    // 2. Background version check without interrupting active user forms
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

        if (serverVersion && serverVersion !== localVersion) {
          localStorage.setItem(CURRENT_VERSION_KEY, serverVersion);
        }
      } catch (e) {
        // Non-blocking
      }
    };

    checkVersion();
  }, []);

  return null;
}


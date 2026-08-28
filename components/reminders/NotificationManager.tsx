"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, X } from "lucide-react";

export default function NotificationManager() {
  const [permissionState, setPermissionState] = useState<NotificationPermission | "unsupported">("default");
  const [showBanner, setShowBanner] = useState(false);
  const [swRegistered, setSwRegistered] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          setSwRegistered(true);
          console.log("SW registered:", reg.scope);
        })
        .catch((err) => {
          console.warn("SW registration failed:", err);
        });
    }

    // Check notification permission
    if (!("Notification" in window)) {
      setPermissionState("unsupported");
      return;
    }

    setPermissionState(Notification.permission);

    if (Notification.permission === "default") {
      // Show banner after 2s delay
      const t = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermissionState(result);
    setShowBanner(false);

    if (result === "granted" && swRegistered) {
      subscribeToPush();
    }
  };

  const subscribeToPush = async () => {
    try {
      const reg = await navigator.serviceWorker.ready;
      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      if (!publicKey) {
        console.warn("VAPID public key not configured — push disabled");
        return;
      }

      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey) as unknown as BufferSource,
      });

      await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription.toJSON()),
      });
    } catch (err) {
      console.warn("Push subscription failed:", err);
    }
  };

  if (!showBanner || permissionState !== "default") return null;

  return (
    <div
      className="permission-banner animate-slide-down"
      style={{ position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)", maxWidth: "480px", width: "calc(100% - 32px)", zIndex: 100 }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          background: "rgba(99,102,241,0.2)",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Bell size={18} color="var(--accent-primary)" />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "2px" }}>
          Activer les notifications
        </p>
        <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
          Pour recevoir vos rappels même quand l&apos;app est en arrière-plan
        </p>
      </div>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button
          onClick={requestPermission}
          className="btn btn-primary btn-sm"
          id="enable-notifications"
        >
          Activer
        </button>
        <button
          onClick={() => setShowBanner(false)}
          className="btn btn-ghost"
          style={{ padding: "6px" }}
          id="dismiss-notification-banner"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

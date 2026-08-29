// AlarmAgenda Service Worker
// Handles push notifications and background alarm functionality

const CACHE_NAME = "alarm-agenda-v3";
const STATIC_ASSETS = [
  "/manifest.json",
];

// Install
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Activate - instantly delete all old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch — network first, never cache HTML navigation or APIs
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (event.request.url.includes("/api/")) return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});

// Push notification received
self.addEventListener("push", (event) => {
  let data = {
    title: "AlarmAgenda",
    body: "Vous avez un rappel",
    icon: "/icons/icon-192.png",
    badge: "/icons/badge-72.png",
    tag: "alarm-agenda-reminder",
    requireInteraction: true, // Stays until user interacts
    data: {},
  };

  if (event.data) {
    try {
      const payload = event.data.json();
      data = { ...data, ...payload };
    } catch {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
      tag: data.tag,
      requireInteraction: data.requireInteraction,
      data: data.data,
      actions: [
        { action: "dismiss", title: "J'ai compris" },
        { action: "snooze", title: "Reporter 10 min" },
      ],
      vibrate: [200, 100, 200, 100, 200], // Alarm pattern
    })
  );
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  const notification = event.notification;
  const action = event.action;
  const reminderId = notification.data?.reminderId;

  notification.close();

  if (action === "snooze" && reminderId) {
    // Call snooze API
    event.waitUntil(
      fetch(`/api/reminders/${reminderId}/snooze`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ minutes: 10 }),
      })
    );
    return;
  }

  if (action === "dismiss" && reminderId) {
    event.waitUntil(
      fetch(`/api/reminders/${reminderId}/dismiss`, {
        method: "PUT",
      })
    );
  }

  // Open the app
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow("/");
        }
      })
  );
});

// Background sync for offline-queued reminders
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-reminders") {
    event.waitUntil(syncReminders());
  }
});

async function syncReminders() {
  try {
    await fetch("/api/reminders/check");
  } catch {
    // Will retry on next sync
  }
}

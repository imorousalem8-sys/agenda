"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import AICallModal, { type AICallData } from "./AICallModal";

export default function AlarmOverlay() {
  const [activeCall, setActiveCall] = useState<AICallData | null>(null);
  const [queue, setQueue] = useState<AICallData[]>([]);
  const seenIdsRef = useRef<Set<string>>(new Set());

  const checkReminders = useCallback(async () => {
    try {
      const res = await fetch("/api/reminders/check");
      if (!res.ok) return;
      const { reminders } = await res.json();
      if (reminders && reminders.length > 0) {
        const newOnes = reminders.filter((r: AICallData) => !seenIdsRef.current.has(r.id));
        if (newOnes.length > 0) {
          newOnes.forEach((r: AICallData) => seenIdsRef.current.add(r.id));
          setQueue((prev) => [...prev, ...newOnes]);
        }
      }
    } catch {
      // Silently fail
    }
  }, []);

  // Handle active call queue
  useEffect(() => {
    if (!activeCall && queue.length > 0) {
      const [nextCall, ...remaining] = queue;
      setActiveCall(nextCall);
      setQueue(remaining);
    }
  }, [activeCall, queue]);

  // Listen for custom event for manual test calls: window.dispatchEvent(new CustomEvent('test-ai-call', { detail: { ... } }))
  useEffect(() => {
    const handleTestCall = (e: Event) => {
      const customEvent = e as CustomEvent<AICallData>;
      if (customEvent.detail) {
        setActiveCall(customEvent.detail);
      }
    };
    window.addEventListener("test-ai-call", handleTestCall);
    return () => window.removeEventListener("test-ai-call", handleTestCall);
  }, []);

  useEffect(() => {
    // Check immediately and then every 10 seconds
    checkReminders();
    const interval = setInterval(checkReminders, 10000);

    // Instant trigger when device wakes up, screen is unlocked, or tab gains focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkReminders();
      }
    };
    const handleFocus = () => checkReminders();
    const handleOnline = () => checkReminders();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("online", handleOnline);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("online", handleOnline);
    };
  }, [checkReminders]);

  const dismiss = async (id: string) => {
    window.speechSynthesis?.cancel();
    try {
      if (!id.startsWith("test-")) {
        await fetch(`/api/reminders/${id}/dismiss`, { method: "PUT" });
      }
    } catch {
      // ok
    }
    setActiveCall(null);
  };

  const snooze = async (id: string, minutes = 10) => {
    window.speechSynthesis?.cancel();
    try {
      if (!id.startsWith("test-")) {
        await fetch(`/api/reminders/${id}/snooze`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ minutes }),
        });
      }
    } catch {
      // ok
    }
    setActiveCall(null);
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDone: true }),
      });
      // trigger page refresh or custom event
      window.dispatchEvent(new Event("task-updated"));
    } catch {
      // ok
    }
  };

  return (
    <AICallModal
      call={activeCall}
      onDismiss={dismiss}
      onSnooze={snooze}
      onCompleteTask={handleCompleteTask}
    />
  );
}

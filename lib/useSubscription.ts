"use client";

import { useState, useEffect, useCallback } from "react";
import { UserSubscriptionDetails } from "@/lib/subscription";

export function useSubscription() {
  const [subscription, setSubscription] = useState<UserSubscriptionDetails>({
    plan: "FREE",
    status: "INACTIVE",
    isPro: false,
    features: {
      canUsePersistentAlarm: false,
      canUseProfessionalMode: false,
      canUseUnlimitedVoice: false,
      maxActiveEvents: 15,
      hasPrioritySupport: false,
    },
  });
  const [loading, setLoading] = useState(true);

  const fetchSubscription = useCallback(async () => {
    try {
      const res = await fetch("/api/subscription");
      if (res.ok) {
        const data = await res.json();
        setSubscription(data);
      }
    } catch (e) {
      console.error("Failed to load subscription:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();

    const handleUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<UserSubscriptionDetails>;
      if (customEvent.detail) {
        setSubscription(customEvent.detail);
      } else {
        fetchSubscription();
      }
    };

    window.addEventListener("subscription-updated", handleUpdated);
    return () => window.removeEventListener("subscription-updated", handleUpdated);
  }, [fetchSubscription]);

  return {
    subscription,
    isPro: subscription.isPro,
    loading,
    refresh: fetchSubscription,
  };
}

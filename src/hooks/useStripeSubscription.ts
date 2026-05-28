import { useCallback, useEffect, useState } from "react";

export interface SubscriptionPlan {
  name: string;
  key: string;
  priceId: string;
}

export interface ActiveSubscription {
  plan: SubscriptionPlan;
  status: string;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  seatCount: number;
}

interface UseStripeSubscriptionResult {
  subscription: ActiveSubscription | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useStripeSubscription(): UseStripeSubscriptionResult {
  const [subscription, setSubscription] = useState<ActiveSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchCount, setRefetchCount] = useState(0);

  const refetch = useCallback(() => {
    setRefetchCount(c => c + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/stripe/subscription", { credentials: "same-origin" });

        if (!res.ok) {
          // 401 = no session — treat as no subscription (not an error state)
          if (res.status === 401) {
            if (!cancelled) {
              setSubscription(null);
              setIsLoading(false);
            }
            return;
          }
          throw new Error(`Request failed: ${res.status}`);
        }

        const data = (await res.json()) as { subscription: ActiveSubscription | null };

        if (!cancelled) {
          setSubscription(data.subscription);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setSubscription(null);
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [refetchCount]);

  return { subscription, isLoading, error, refetch };
}

import { SessionContext } from "@/components/SessionContext";
import { ActiveSubscription } from "@/pages/api/stripe/subscription";
import { useCallback, useContext, useEffect, useState } from "react";

export interface UseStripeSubscriptionResult {
  subscription: ActiveSubscription | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Fetches the current user's Stripe subscription from GET /api/stripe/subscription.
 * Uses raw fetch + useState + useEffect (no useSWR / react-query).
 *
 * Returns { subscription: null } when the user has no active subscription — this
 * is not treated as an error.
 */
export function useStripeSubscription(): UseStripeSubscriptionResult {
  const [subscription, setSubscription] = useState<ActiveSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  // Only query the subscription endpoint when the user is authenticated.
  // On unauthenticated pages (e.g. /login) there's no Auth0 session, so the
  // request would 401 — which the browser logs as a red console error even
  // though we handle it. Gating on the access token avoids that noise and the
  // pointless network call.
  const { accessToken } = useContext(SessionContext) ?? {};
  const isAuthenticated = Boolean(accessToken);

  const refetch = useCallback(() => {
    setTick(t => t + 1);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setSubscription(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    const fetchSubscription = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/stripe/subscription");

        if (!res.ok) {
          if (res.status === 401) {
            // Not logged in — treat as no subscription
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
          setError(err instanceof Error ? err.message : "Failed to load subscription");
          setSubscription(null);
          setIsLoading(false);
        }
      }
    };

    fetchSubscription();

    return () => {
      cancelled = true;
    };
  }, [tick, isAuthenticated]);

  return { subscription, isLoading, error, refetch };
}

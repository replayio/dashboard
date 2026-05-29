import { useWorkspaces } from "@/graphql/queries/useWorkspaces";
import { ActiveSubscription } from "@/pages/api/stripe/subscription";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SessionContext } from "@/components/SessionContext";

export type { ActiveSubscription };

export interface UseStripeSubscriptionResult {
  subscription: ActiveSubscription | null;
  isLoading: boolean;
  error: string | null;
  workspaceId: string | null;
  refetch: () => void;
}

/**
 * useStripeSubscription
 *
 * Fetches the current workspace subscription from the backend via
 * GET /api/stripe/subscription?workspaceId=...
 *
 * The backend reads workspace.subscription from backend GraphQL — no direct
 * Stripe API calls are made. Picks the first non-test workspace as the
 * billing workspace.
 *
 * Returns workspaceId so callers (PlanSelection) can pass it to checkout.
 */
export function useStripeSubscription(): UseStripeSubscriptionResult {
  const { workspaces } = useWorkspaces();
  const [subscription, setSubscription] = useState<ActiveSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  // Only query when authenticated
  const { accessToken } = useContext(SessionContext) ?? {};
  const isAuthenticated = Boolean(accessToken);

  // Pick the first non-test workspace as the billing workspace
  const workspaceId = useMemo<string | null>(() => {
    if (!workspaces) return null;
    const primary = workspaces.find(w => !w.isTest) ?? workspaces[0] ?? null;
    return primary?.id ?? null;
  }, [workspaces]);

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

    if (!workspaceId) {
      // Workspaces loaded but none found — or still loading
      if (workspaces !== undefined) {
        setSubscription(null);
        setIsLoading(false);
      }
      return;
    }

    let cancelled = false;

    const fetchSubscription = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = `/api/stripe/subscription?workspaceId=${encodeURIComponent(workspaceId)}`;
        const res = await fetch(url);

        if (!res.ok) {
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
  }, [tick, isAuthenticated, workspaceId, workspaces]);

  return { subscription, isLoading, error, workspaceId, refetch };
}

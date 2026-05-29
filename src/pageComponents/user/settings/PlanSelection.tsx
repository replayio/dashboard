import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useStripeSubscription } from "@/hooks/useStripeSubscription";
import {
  BackendPlan,
  normalizeBackendPlan,
  groupPlansByTier,
  PlanTierGroup,
  StripePlan,
} from "@/lib/stripe-config";
import { useCallback, useEffect, useState } from "react";

type BillingInterval = "month" | "year";

async function fetchPlansFromBackend(): Promise<PlanTierGroup[]> {
  const res = await fetch("/api/stripe/plans");
  if (!res.ok) {
    throw new Error(`Failed to load plans: ${res.status}`);
  }
  const data = (await res.json()) as { plans: BackendPlan[] };
  const normalized = data.plans.map(normalizeBackendPlan);
  return groupPlansByTier(normalized);
}

/**
 * PlanSelection — shows plan tiers with a monthly/yearly billing toggle.
 * Plans are fetched dynamically from the backend availablePlans GraphQL query.
 *
 * Shown in the "subscription" panel of the User Settings modal when the user
 * has no active subscription, and also as the full-screen subscription gate.
 */
export function PlanSelection() {
  const { subscription, isLoading: isSubLoading, workspaceId } = useStripeSubscription();
  const [interval, setInterval] = useState<BillingInterval>("month");
  const [planGroups, setPlanGroups] = useState<PlanTierGroup[] | null>(null);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState<string | null>(null);

  // Fetch available plans from backend
  useEffect(() => {
    let cancelled = false;
    setPlansLoading(true);
    setPlansError(null);

    fetchPlansFromBackend()
      .then(groups => {
        if (!cancelled) {
          setPlanGroups(groups);
          setPlansLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setPlansError(err instanceof Error ? err.message : "Failed to load plans");
          setPlansLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const isLoading = isSubLoading || plansLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (plansError) {
    return (
      <div className="flex flex-col gap-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">{plansError}</p>
        <Button variant="outline" size="small" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  const groups = planGroups ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Choose a Plan</h2>
        {subscription ? (
          <p className="text-sm text-muted-foreground mt-1">
            You are currently on the{" "}
            <span className="font-medium text-foreground">{subscription.plan.name}</span> plan.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground mt-1">
            Select a plan to get started with Replay.
          </p>
        )}
      </div>

      {/* Billing interval toggle */}
      <div className="flex items-center justify-center">
        <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1 gap-1">
          <button
            type="button"
            onClick={() => setInterval("month")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              interval === "month"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setInterval("year")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              interval === "year"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Yearly
            <span className="ml-1.5 rounded-full bg-primary/15 px-1.5 py-0.5 text-xs font-semibold text-primary">
              Save 14%
            </span>
          </button>
        </div>
      </div>

      {/* 3-card grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {groups.map(tierGroup => (
          <PlanCard
            key={tierGroup.tier}
            tierGroup={tierGroup}
            interval={interval}
            currentPlanKey={subscription?.plan.key}
            workspaceId={workspaceId}
          />
        ))}
      </div>
    </div>
  );
}

function PlanCard({
  tierGroup,
  interval,
  currentPlanKey,
  workspaceId,
}: {
  tierGroup: PlanTierGroup;
  interval: BillingInterval;
  currentPlanKey: string | undefined;
  workspaceId: string | null;
}) {
  const plan: StripePlan = interval === "month" ? tierGroup.monthly : tierGroup.yearly;
  const isCurrentPlan = currentPlanKey === plan.key;
  const [isPending, setIsPending] = useState(false);

  const handleSubscribe = useCallback(async () => {
    if (isPending) return;
    if (!workspaceId) {
      console.error("[PlanCard] no workspaceId available");
      return;
    }
    setIsPending(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey: plan.key, workspaceId }),
      });

      if (!res.ok) {
        console.error("[PlanCard] checkout error:", res.status);
        setIsPending(false);
        return;
      }

      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
        // Don't reset isPending — we're navigating away
      } else {
        setIsPending(false);
      }
    } catch (err) {
      console.error("[PlanCard] checkout error:", err);
      setIsPending(false);
    }
  }, [isPending, plan.key, workspaceId]);

  const isHighlighted = tierGroup.tier === "growth";
  const borderClass = isHighlighted ? "border-primary/60" : "border-border";
  const priceLabel = formatPrice(plan);

  return (
    <div className={`relative flex flex-col gap-4 rounded-lg border ${borderClass} bg-card p-5`}>
      {isHighlighted && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
            Popular
          </span>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <div className="text-base font-semibold text-foreground">{tierGroup.name}</div>
        <div className="text-2xl font-bold text-foreground">{priceLabel}</div>
        {tierGroup.tier === "growth" && interval === "year" && plan.monthlyPriceCents !== null && (
          <div className="text-xs text-muted-foreground">
            ${Math.round((plan.monthlyPriceCents * 12) / 100).toLocaleString()} billed annually
          </div>
        )}
      </div>

      {plan.features.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {plan.features.map(feature => (
            <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" type="check" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-2">
        {tierGroup.tier === "enterprise" ? (
          <a
            href="https://www.replay.io/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full" variant="outline">
              Contact Sales
            </Button>
          </a>
        ) : isCurrentPlan ? (
          <Button className="w-full" variant="outline" disabled>
            Current Plan
          </Button>
        ) : (
          <Button
            className="w-full"
            variant={isHighlighted ? "solid" : "outline"}
            disabled={isPending || !workspaceId}
            onClick={handleSubscribe}
          >
            {isPending ? "Redirecting…" : tierGroup.tier === "free" ? "Get Started" : "Subscribe"}
          </Button>
        )}
      </div>
    </div>
  );
}

function formatPrice(plan: StripePlan): string {
  if (plan.tier === "enterprise") return "Custom";
  if (plan.monthlyPriceCents === null) return "—";
  if (plan.monthlyPriceCents === 0) return "$0/mo";

  if (plan.interval === "year") {
    // Show per-month equivalent
    const perMonth = Math.round(plan.monthlyPriceCents / 100);
    return `$${perMonth}/mo`;
  }

  const dollars = Math.round(plan.monthlyPriceCents / 100);
  return `$${dollars}/mo`;
}

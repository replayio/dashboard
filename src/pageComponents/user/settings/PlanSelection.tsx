import { Button } from "@/components/Button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useStripeSubscription } from "@/hooks/useStripeSubscription";
import {
  BackendPlan,
  normalizeBackendPlan,
  groupPlansByTier,
  PLAN_CONTENT,
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
      {/* Header row: title/subtitle on the left, billing toggle centered */}
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Choose a Plan</h2>
          {subscription && subscription.status !== "canceled" ? (
            <div className="mt-1">
              <p className="text-sm text-muted-foreground">
                You are currently on the{" "}
                <span className="font-medium text-foreground">{subscription.plan.name}</span> plan.
              </p>
              {subscription.cancelAtPeriodEnd && subscription.currentPeriodEnd && (
                <p className="text-xs text-amber-500 mt-0.5">
                  Update scheduled — current plan active until{" "}
                  {new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString()}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mt-1">
              Select a plan to get started with Replay.
            </p>
          )}
        </div>

        {/* Billing interval toggle — centered within the header row */}
        <div className="inline-flex shrink-0 self-start rounded-lg border border-border bg-muted/40 p-1 gap-1 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
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

      {/* Plan card grid.
          On large screens each card is a subgrid spanning 3 shared row tracks
          (header+price / copy / CTA) so those sections line up across all cards. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_1fr]">
        {groups.map(tierGroup => (
          <PlanCard
            key={tierGroup.tier}
            tierGroup={tierGroup}
            interval={interval}
            currentPlanKey={
              subscription?.status !== "canceled" ? subscription?.plan.key : undefined
            }
            hasActiveSubscription={!!subscription && subscription.status !== "canceled"}
            cancelAtPeriodEnd={subscription?.cancelAtPeriodEnd ?? false}
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
  hasActiveSubscription,
  cancelAtPeriodEnd,
  workspaceId,
}: {
  tierGroup: PlanTierGroup;
  interval: BillingInterval;
  currentPlanKey: string | undefined;
  hasActiveSubscription: boolean;
  cancelAtPeriodEnd: boolean;
  workspaceId: string | null;
}) {
  const plan: StripePlan = interval === "month" ? tierGroup.monthly : tierGroup.yearly;
  const isCurrentPlan = currentPlanKey === plan.key;
  const isExistingSubscriberChange =
    hasActiveSubscription && !isCurrentPlan && tierGroup.tier !== "enterprise";
  // Free → paid upgrades use Checkout (creates new subscription, auto-cancels free).
  // Paid → paid switches use the portal (avoids Stripe's per-seat "Quantity: 0" issue).
  const currentPlanIsFree = currentPlanKey?.startsWith("free") ?? false;
  const usePortalForChange = isExistingSubscriberChange && !currentPlanIsFree;
  const [isPending, setIsPending] = useState(false);

  const handleSubscribe = useCallback(async () => {
    if (isPending) return;
    setIsPending(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // workspaceId may be null for new users — checkout API auto-creates a workspace
        body: JSON.stringify({ planKey: plan.key, workspaceId: workspaceId ?? undefined }),
      });

      if (!res.ok) {
        console.error("[PlanCard] checkout error:", res.status);
        setIsPending(false);
        return;
      }

      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        setIsPending(false);
      }
    } catch (err) {
      console.error("[PlanCard] checkout error:", err);
      setIsPending(false);
    }
  }, [isPending, plan.key, workspaceId]);

  const handleOpenPortal = useCallback(async () => {
    if (isPending || !workspaceId) return;
    setIsPending(true);
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId }),
      });
      if (!res.ok) {
        console.error("[PlanCard] portal error:", res.status);
        setIsPending(false);
        return;
      }
      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        setIsPending(false);
      }
    } catch (err) {
      console.error("[PlanCard] portal error:", err);
      setIsPending(false);
    }
  }, [isPending, workspaceId]);

  const isHighlighted = tierGroup.highlighted;
  const content = PLAN_CONTENT[tierGroup.tier];
  const tagline = content?.tagline ?? tierGroup.name;
  const description = content?.description ?? null;
  const { priceNumber, pricePeriod } = formatPrice(plan);

  return (
    <div
      className={`relative flex flex-col rounded-lg border bg-card lg:row-span-3 lg:grid lg:[grid-template-rows:subgrid] ${
        isHighlighted ? "border-primary/60" : "border-border"
      }`}
    >
      {isHighlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="w-fit whitespace-nowrap rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
            MOST POPULAR
          </span>
        </div>
      )}

      <div className="flex flex-col gap-4 p-5 pb-0">
        <div
          className={`text-xs font-semibold uppercase tracking-wider ${
            isHighlighted ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {tierGroup.name}
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-[2rem] font-bold leading-none tracking-tight text-foreground">
            {priceNumber}
          </div>
          {pricePeriod && <div className="text-sm text-muted-foreground">{pricePeriod}</div>}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-5 py-5">
        <div className="text-lg font-bold leading-snug text-foreground">{tagline}</div>
        {description && <div className="text-sm leading-relaxed text-muted-foreground">{description}</div>}
      </div>

      <div className="px-5 pb-5 mt-auto">
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
            {cancelAtPeriodEnd ? "Update Scheduled" : "Current Plan"}
          </Button>
        ) : (
          <Button
            className="w-full"
            variant={isHighlighted ? "solid" : "outline"}
            disabled={isPending || (usePortalForChange && !workspaceId)}
            onClick={usePortalForChange ? handleOpenPortal : handleSubscribe}
          >
            {isPending
              ? "Redirecting…"
              : isExistingSubscriberChange
                ? "Update Plan"
                : "Get Started"}
          </Button>
        )}
      </div>
    </div>
  );
}

function formatPrice(plan: StripePlan): { priceNumber: string; pricePeriod: string } {
  if (plan.tier === "enterprise") {
    return {
      priceNumber: "Custom",
      pricePeriod: "usage-based or seat-based · negotiated together",
    };
  }
  if (plan.monthlyPriceCents === null) {
    return { priceNumber: "—", pricePeriod: "" };
  }
  if (plan.monthlyPriceCents === 0) {
    return { priceNumber: "$0", pricePeriod: "always free" };
  }

  const perMonth = Math.round(plan.monthlyPriceCents / 100);
  // Base the period label on the resolved plan's actual interval, not the
  // toggle. Tiers without a yearly variant (e.g. Individual) fall back to their
  // monthly plan in the "yearly" slot, so they must not claim "billed annually".
  if (plan.interval === "year") {
    return {
      priceNumber: `$${perMonth}`,
      pricePeriod: "per month · billed annually",
    };
  }
  return { priceNumber: `$${perMonth}`, pricePeriod: "per month" };
}

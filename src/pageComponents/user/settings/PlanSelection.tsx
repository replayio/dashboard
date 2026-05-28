import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useStripeSubscription } from "@/hooks/useStripeSubscription";
import { PLANS_LIST, StripePlan } from "@/lib/stripe-config";
import { useCallback, useState } from "react";

/**
 * PlanSelection — shows all four pricing tiers (Free, Growth Monthly,
 * Growth Annual, Enterprise) and handles Stripe Checkout redirects.
 *
 * Shown in the "subscription" panel of the User Settings modal when the user
 * has no active subscription.
 */
export function PlanSelection() {
  const { subscription, isLoading } = useStripeSubscription();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Choose a Plan</h2>
        {subscription && (
          <p className="text-sm text-muted-foreground mt-1">
            You are currently on the{" "}
            <span className="font-medium text-foreground">{subscription.plan.name}</span> plan.
          </p>
        )}
        {!subscription && (
          <p className="text-sm text-muted-foreground mt-1">
            Select a plan to get started with Replay.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PLANS_LIST.map(plan => (
          <PlanCard
            key={plan.key}
            plan={plan}
            isCurrentPlan={subscription?.plan.key === plan.key}
          />
        ))}
      </div>
    </div>
  );
}

function PlanCard({ plan, isCurrentPlan }: { plan: StripePlan; isCurrentPlan: boolean }) {
  const [isPending, setIsPending] = useState(false);

  const handleSubscribe = useCallback(async () => {
    if (isPending || !plan.priceId) return;
    setIsPending(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: plan.priceId }),
      });

      if (!res.ok) {
        console.error("[PlanSelection] checkout error:", res.status);
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
      console.error("[PlanSelection] checkout error:", err);
      setIsPending(false);
    }
  }, [isPending, plan.priceId]);

  const priceLabel = formatPrice(plan);

  const isHighlighted = plan.tier === "growth";
  const borderClass = isHighlighted ? "border-primary/60" : "border-border";

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
        <div className="text-base font-semibold text-foreground">{plan.name}</div>
        <div className="text-2xl font-bold text-foreground">{priceLabel}</div>
        {plan.tier === "growth" && plan.interval === "year" && (
          <div className="text-xs text-muted-foreground">$3,588 billed annually</div>
        )}
      </div>

      <ul className="flex flex-col gap-1.5">
        {plan.features.map(feature => (
          <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" type="check" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-2">
        {plan.tier === "enterprise" ? (
          <a href="mailto:sales@replay.io" className="block">
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
            disabled={isPending}
            onClick={handleSubscribe}
          >
            {isPending ? "Redirecting…" : plan.tier === "free" ? "Get Started" : "Subscribe"}
          </Button>
        )}
      </div>
    </div>
  );
}

function formatPrice(plan: StripePlan): string {
  if (plan.tier === "enterprise") return "Custom";
  if (plan.amount === 0) return "$0/mo";
  if (plan.amount === undefined) return "—";

  if (plan.interval === "year") {
    // Show per-month equivalent
    const perMonth = Math.round(plan.amount / 12 / 100);
    return `$${perMonth}/mo`;
  }

  const dollars = Math.round(plan.amount / 100);
  return `$${dollars}/mo`;
}

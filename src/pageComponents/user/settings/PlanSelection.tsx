import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { PLANS_LIST, type StripePlan } from "@/lib/stripe-config";
import { useStripeSubscription } from "@/hooks/useStripeSubscription";
import { useState } from "react";

async function redirectToCheckout(priceId: string): Promise<void> {
  const res = await fetch("/api/stripe/checkout", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId }),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? `Checkout failed: ${res.status}`);
  }

  const { url } = (await res.json()) as { url: string };
  window.location.href = url;
}

async function redirectToPortal(): Promise<void> {
  const res = await fetch("/api/stripe/portal", {
    method: "POST",
    credentials: "same-origin",
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? `Portal failed: ${res.status}`);
  }

  const { url } = (await res.json()) as { url: string };
  window.location.href = url;
}

function formatPrice(plan: StripePlan): string {
  if (plan.amount === undefined) return "Custom";
  if (plan.amount === 0) return "$0/mo";
  if (plan.interval === "year") {
    const monthly = Math.round(plan.amount / 12 / 100);
    return `$${monthly}/mo`;
  }
  const monthly = Math.round(plan.amount / 100);
  return `$${monthly}/mo`;
}

function formatPriceSubline(plan: StripePlan): string | null {
  if (plan.interval === "year" && plan.amount !== undefined) {
    const annual = Math.round(plan.amount / 100);
    return `$${annual.toLocaleString()}/yr billed annually`;
  }
  return null;
}

function PlanCard({
  plan,
  isCurrent,
  onSubscribe,
  isPending,
}: {
  plan: StripePlan;
  isCurrent: boolean;
  onSubscribe: (plan: StripePlan) => void;
  isPending: boolean;
}) {
  const isEnterprise = plan.tier === "enterprise";
  const priceSubline = formatPriceSubline(plan);

  return (
    <div
      className={`flex flex-col rounded-lg border ${
        isCurrent ? "border-primary bg-primary/5" : "border-border bg-card"
      } p-5 gap-4`}
    >
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">{plan.name}</span>
          {isCurrent && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              Current plan
            </span>
          )}
        </div>
        <div className="text-lg font-bold text-foreground">{formatPrice(plan)}</div>
        {priceSubline && (
          <div className="text-xs text-muted-foreground">{priceSubline}</div>
        )}
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-1.5 flex-1">
        {plan.features.map(feature => (
          <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" type="check" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto pt-2">
        {isEnterprise ? (
          <a
            href="mailto:sales@replay.io"
            className="inline-flex w-full items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            Contact Sales
          </a>
        ) : isCurrent ? (
          <Button variant="outline" size="small" className="w-full justify-center" disabled>
            Current plan
          </Button>
        ) : (
          <Button
            variant="solid"
            size="small"
            className="w-full justify-center"
            disabled={isPending}
            onClick={() => onSubscribe(plan)}
          >
            Subscribe
          </Button>
        )}
      </div>
    </div>
  );
}

export function PlanSelection() {
  const { subscription, isLoading } = useStripeSubscription();
  const [pendingPriceId, setPendingPriceId] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [portalPending, setPortalPending] = useState(false);

  const handleSubscribe = async (plan: StripePlan) => {
    if (!plan.priceId) return;
    setPendingPriceId(plan.priceId);
    setCheckoutError(null);
    try {
      await redirectToCheckout(plan.priceId);
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Something went wrong");
      setPendingPriceId(null);
    }
  };

  const handleManage = async () => {
    setPortalPending(true);
    try {
      await redirectToPortal();
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Something went wrong");
      setPortalPending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="text-base font-semibold text-foreground">Subscription</div>
        <div className="text-sm text-muted-foreground">Loading…</div>
      </div>
    );
  }

  // Already subscribed — show management view
  if (subscription) {
    return (
      <div className="flex flex-col gap-6">
        <div className="text-base font-semibold text-foreground">Subscription</div>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="flex flex-row items-center justify-between px-4 py-3 border-b border-border">
            <div className="text-sm text-muted-foreground">Current plan</div>
            <div className="text-sm font-medium">{subscription.plan.name}</div>
          </div>
          <div className="flex flex-row items-center justify-between px-4 py-3 border-b border-border">
            <div className="text-sm text-muted-foreground">Status</div>
            <div className="text-sm font-medium capitalize">{subscription.status}</div>
          </div>
          {subscription.cancelAtPeriodEnd && (
            <div className="flex flex-row items-center justify-between px-4 py-3 border-b border-border">
              <div className="text-sm text-muted-foreground">Cancels at period end</div>
              <div className="text-sm font-medium text-amber-600">
                {new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString()}
              </div>
            </div>
          )}
          <div className="flex flex-row items-center justify-between px-4 py-3">
            <div className="text-sm text-muted-foreground">Next billing date</div>
            <div className="text-sm font-medium">
              {new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString()}
            </div>
          </div>
        </div>
        {checkoutError && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {checkoutError}
          </div>
        )}
        <Button
          variant="solid"
          size="small"
          disabled={portalPending}
          onClick={handleManage}
          className="self-start"
        >
          Manage Subscription
        </Button>
      </div>
    );
  }

  // No subscription — show plan cards
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-base font-semibold text-foreground">Choose a Plan</div>
        <div className="mt-1 text-sm text-muted-foreground">
          Select the plan that works best for you.
        </div>
      </div>

      {checkoutError && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {checkoutError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {PLANS_LIST.map(plan => (
          <PlanCard
            key={plan.key}
            plan={plan}
            isCurrent={false}
            onSubscribe={handleSubscribe}
            isPending={pendingPriceId === plan.priceId}
          />
        ))}
      </div>
    </div>
  );
}

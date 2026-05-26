import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Message } from "@/components/Message";
import { BILLING_V2_CHECKOUT_ENABLED, URLS } from "@/constants";
import { useAvailablePlans } from "@/graphql/queries/useAvailablePlans";
import { useCreateCheckoutSession } from "@/graphql/queries/useCreateCheckoutSession";
import { useSelectFreePlan } from "@/graphql/queries/useSelectFreePlan";
import { Plan, PlanKey } from "@/graphql/types";
import { useRouter } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import {
  BillingCadence,
  MonthlyAnnualToggle,
} from "@/pageComponents/team/id/plans/MonthlyAnnualToggle";
import { PlanCard } from "@/pageComponents/team/id/plans/PlanCard";
import { PLAN_TIER_UI_CONFIG } from "@/pageComponents/team/id/plans/planFeatures";

const ENTERPRISE_CONTACT_URL = "mailto:sales@replay.io?subject=Replay%20Enterprise%20inquiry";

export type PlanPickerProps = {
  workspaceId: string;
  // The plan key of the workspace's current subscription, if any. When set:
  //  - if it matches a v2 key (free-v1, growth-monthly-v1, growth-annual-v1,
  //    enterprise-v1) the matching tier is marked as "Current plan".
  //  - if it is a legacy key, the picker shows a banner above the grid and
  //    the user can voluntarily migrate to a new tier (which cancels the
  //    legacy Stripe sub via the existing change-plan path).
  currentPlanKey?: PlanKey | null;
  currentPlanName?: string | null;
  // When true (post-signup landing page), no header is rendered; the page
  // wraps this with its own marketing layout.
  hideHeader?: boolean;
};

export function PlanPicker({
  workspaceId,
  currentPlanKey,
  currentPlanName,
  hideHeader,
}: PlanPickerProps) {
  const router = useRouter();
  const { plans, isLoading, error } = useAvailablePlans();
  const { createCheckoutSession, isLoading: isCheckoutPending } = useCreateCheckoutSession();
  const { selectFreePlan, isLoading: isFreePending } = useSelectFreePlan();

  const [cadence, setCadence] = useState<BillingCadence>("annual");
  const [actionError, setActionError] = useState<string | null>(null);

  const { freePlan, growthMonthly, growthAnnual, enterprise } = useMemo(() => {
    const find = (key: string) => plans?.find(p => p.key === key);
    return {
      freePlan: find("free-v1"),
      growthMonthly: find("growth-monthly-v1"),
      growthAnnual: find("growth-annual-v1"),
      enterprise: find("enterprise-v1"),
    };
  }, [plans]);

  const isLegacyCurrent = useMemo(() => {
    if (!currentPlanKey) return false;
    return !isV2PlanKey(currentPlanKey);
  }, [currentPlanKey]);

  const onSelectFree = async () => {
    setActionError(null);
    try {
      await selectFreePlan(workspaceId);
      router.replace(`/team/${stripWorkspacePrefix(workspaceId)}/recordings`);
    } catch (e) {
      setActionError(extractErrorMessage(e));
    }
  };

  const onSelectGrowth = async (planKey: PlanKey) => {
    setActionError(null);

    if (!BILLING_V2_CHECKOUT_ENABLED) {
      setActionError("Stripe Checkout is not enabled yet. Please try again later.");
      return;
    }

    try {
      const workspaceShortId = stripWorkspacePrefix(workspaceId);
      const successUrl = `${URLS.app}/team/${workspaceShortId}/plans?checkout=success&session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${URLS.app}/team/${workspaceShortId}/plans?checkout=cancelled`;

      const url = await createCheckoutSession({
        workspaceId,
        planKey,
        successUrl,
        cancelUrl,
      });

      if (url) {
        window.location.href = url;
      } else {
        setActionError("Stripe did not return a Checkout URL. Please try again.");
      }
    } catch (e) {
      setActionError(extractErrorMessage(e));
    }
  };

  const onSelectEnterprise = () => {
    window.open(ENTERPRISE_CONTACT_URL, "_blank", "noopener,noreferrer");
  };

  if (isLoading) {
    return (
      <div className="flex w-full justify-center p-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <Message className="m-6">
        <p className="text-sm text-destructive">Could not load plans: {error.message}</p>
      </Message>
    );
  }

  const growthPlan = cadence === "annual" ? growthAnnual : growthMonthly;

  return (
    <div className="flex flex-col gap-6">
      {!hideHeader && (
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-2xl font-semibold">Choose your plan</h1>
          <p className="text-sm text-muted-foreground">
            Select a subscription tier that fits your needs.
          </p>
        </div>
      )}

      {isLegacyCurrent && (
        <div className="rounded-md border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          You&apos;re on the{" "}
          <span className="font-medium text-foreground">{currentPlanName ?? "legacy"}</span> plan.
          Selecting a new plan below will cancel your current subscription and start a new one.
        </div>
      )}

      <div className="flex justify-center">
        <MonthlyAnnualToggle cadence={cadence} onChange={setCadence} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <PlanCard
          eyebrow={PLAN_TIER_UI_CONFIG.free.eyebrow}
          title={PLAN_TIER_UI_CONFIG.free.title}
          description={PLAN_TIER_UI_CONFIG.free.description}
          priceDisplay={<PriceDisplay amountCents={freePlan?.monthlyPriceCents ?? 0} />}
          priceSubtitle="Always free"
          features={PLAN_TIER_UI_CONFIG.free.features}
          ctaLabel={PLAN_TIER_UI_CONFIG.free.ctaLabel}
          onCtaClick={onSelectFree}
          ctaLoading={isFreePending}
          ctaDisabled={!freePlan}
          isCurrent={currentPlanKey === "free-v1"}
          data-test-id="PlanPicker-Card-Free"
        />

        <PlanCard
          eyebrow={PLAN_TIER_UI_CONFIG.growth.eyebrow}
          badge={PLAN_TIER_UI_CONFIG.growth.badge}
          emphasized
          title={PLAN_TIER_UI_CONFIG.growth.title}
          description={PLAN_TIER_UI_CONFIG.growth.description}
          priceDisplay={<PriceDisplay amountCents={growthPlan?.monthlyPriceCents ?? null} />}
          priceSubtitle={
            cadence === "annual" ? "per month, billed annually" : "per month, billed monthly"
          }
          inheritsFromLabel={PLAN_TIER_UI_CONFIG.growth.inheritsFromLabel}
          features={PLAN_TIER_UI_CONFIG.growth.features}
          ctaLabel={PLAN_TIER_UI_CONFIG.growth.ctaLabel}
          onCtaClick={() => growthPlan && onSelectGrowth(growthPlan.key)}
          ctaLoading={isCheckoutPending}
          ctaDisabled={!growthPlan || !BILLING_V2_CHECKOUT_ENABLED}
          isCurrent={
            currentPlanKey === "growth-monthly-v1" || currentPlanKey === "growth-annual-v1"
          }
          data-test-id="PlanPicker-Card-Growth"
        />

        <PlanCard
          eyebrow={PLAN_TIER_UI_CONFIG.enterprise.eyebrow}
          title={PLAN_TIER_UI_CONFIG.enterprise.title}
          description={PLAN_TIER_UI_CONFIG.enterprise.description}
          priceDisplay={<span className="text-3xl">Custom</span>}
          priceSubtitle="Usage-based or seat-based — negotiated together"
          inheritsFromLabel={PLAN_TIER_UI_CONFIG.enterprise.inheritsFromLabel}
          features={PLAN_TIER_UI_CONFIG.enterprise.features}
          ctaLabel={PLAN_TIER_UI_CONFIG.enterprise.ctaLabel}
          onCtaClick={onSelectEnterprise}
          isCurrent={currentPlanKey === "enterprise-v1"}
          data-test-id="PlanPicker-Card-Enterprise"
        />
      </div>

      {actionError && (
        <div
          className="rounded-md bg-destructive/20 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {actionError}
        </div>
      )}
    </div>
  );
}

function PriceDisplay({ amountCents }: { amountCents: number | null }): ReactNode {
  if (amountCents == null) return <span>—</span>;
  const dollars = Math.round(amountCents / 100);
  return (
    <span>
      <span className="align-top text-base font-semibold">$</span>
      {dollars}
    </span>
  );
}

function isV2PlanKey(key: string): boolean {
  return (
    key === "free-v1" ||
    key === "growth-monthly-v1" ||
    key === "growth-annual-v1" ||
    key === "enterprise-v1"
  );
}

function stripWorkspacePrefix(idOrUuid: string): string {
  // GraphQL IDs come back as prefixed (e.g. "w:<uuid>"); URL paths use the
  // unprefixed UUID. Keep the prefix logic local so we don't add a new dep
  // on the buildId helper here.
  const lastColon = idOrUuid.lastIndexOf(":");
  return lastColon >= 0 ? idOrUuid.slice(lastColon + 1) : idOrUuid;
}

function extractErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  return "Something went wrong. Please try again.";
}

/**
 * stripe-config.ts — type definitions for plan data fetched from the backend.
 *
 * Plans are NO longer hardcoded here — the catalog is sourced from the backend
 * `availablePlans` GraphQL query (plans table, synced from Stripe via webhook).
 *
 * UI components should fetch plans via GET /api/stripe/plans and use the
 * normalizeBackendPlan() helper to convert to the local StripePlan shape.
 */

import { type BackendPlan } from "@/pages/api/stripe/plans";

export type { BackendPlan };

export type PlanTier = "free" | "individual" | "team" | "growth" | "enterprise";
export type PlanInterval = "month" | "year" | "none";

/** Normalised plan shape used by UI components */
export interface StripePlan {
  /** Stable key for referencing this plan in code (e.g., "free-v1") */
  key: string;
  /** Display name shown to users */
  name: string;
  /** Stripe Price ID / billingId — null for enterprise (contact sales) */
  billingId: string | null;
  /** Price per month in cents (0 for free, null for enterprise) */
  monthlyPriceCents: number | null;
  /** Billing interval */
  interval: PlanInterval;
  /** Internal tier grouping */
  tier: PlanTier;
  /**
   * Feature bullet list for plan card UI.
   * Populated by normalizeBackendPlan from the backend features field, or an
   * empty array if the backend does not yet return features.
   */
  features: string[];
}

/** Groups plans by tier for the monthly/yearly billing toggle UI */
export interface PlanTierGroup {
  tier: PlanTier;
  name: string;
  monthly: StripePlan;
  yearly: StripePlan;
  highlighted: boolean;
}

/** Enterprise tier key constant — Contact Sales flow, no checkout */
export const ENTERPRISE_TIER: PlanTier = "enterprise";

export const PLAN_CONTENT: Record<
  string,
  { tagline: string; description: string; featureHeader: string; features: string[] }
> = {
  free: {
    tagline: "Try Replay with no commitment",
    description: "25 analyses a month, no time limit, no credit card required.",
    featureHeader: "INCLUDES",
    features: [
      "25 AI analyses per month",
      "CI Agent integration",
      "Replay MCP for IDE debugging",
      "Replay DevTools access",
      "Community support",
    ],
  },
  individual: {
    tagline: "For individuals using Replay beyond the basics",
    description:
      "150 analyses a month — the right volume for solo builders running a handful of apps or workflows.",
    featureHeader: "EVERYTHING IN FREE, PLUS",
    features: [
      "150 AI analyses per month",
      "Unlimited recordings",
      "All CI integrations",
      "All coding agent integrations",
      "Email support",
    ],
  },
  team: {
    tagline: "For startups and small teams moving fast",
    description:
      "500 analyses a month for teams that ship often and need consistent coverage — however they use Replay.",
    featureHeader: "EVERYTHING IN INDIVIDUAL, PLUS",
    features: [
      "500 AI analyses per month",
      "All CI integrations (GitHub Actions, CircleCI, Jenkins, BuildKite)",
      "All coding agent integrations (Claude Code, Codex, Cursor, Copilot, Windsurf)",
      "Priority email support",
    ],
  },
  growth: {
    tagline: "For startups and small teams moving fast",
    description:
      "500 analyses a month for teams that ship often and need consistent coverage — however they use Replay.",
    featureHeader: "EVERYTHING IN INDIVIDUAL, PLUS",
    features: [
      "500 AI analyses per month",
      "All CI integrations (GitHub Actions, CircleCI, Jenkins, BuildKite)",
      "All coding agent integrations (Claude Code, Codex, Cursor, Copilot, Windsurf)",
      "Priority email support",
    ],
  },
  enterprise: {
    tagline: "For organizations using Replay at scale",
    description:
      "Custom analysis volume, contracts, and support — for however your organization uses Replay.",
    featureHeader: "EVERYTHING IN TEAM, PLUS",
    features: [
      "Unlimited AI analyses",
      "Priority support and dedicated onboarding",
      "SLA guarantees",
      "SSO and advanced access controls",
      "Roadmap input and joint planning",
    ],
  },
};

/**
 * Convert a backend plan response to the normalised StripePlan shape.
 */
export function normalizeBackendPlan(p: BackendPlan): StripePlan {
  return {
    key: p.key,
    name: p.displayName || p.name,
    billingId: p.billingId ?? null,
    monthlyPriceCents: p.monthlyPriceCents ?? null,
    interval: (p.interval as PlanInterval) || "month",
    tier: (p.tier as PlanTier) || "team",
    features: [],
  };
}

/**
 * Group a flat list of normalised plans by tier for the billing-toggle UI.
 * For each tier the monthly and yearly variants are paired; if only one
 * interval is available it is used for both slots.
 * If both `team` and `growth` tiers are present, only `team` is kept.
 */
export function groupPlansByTier(plans: StripePlan[]): PlanTierGroup[] {
  const byTier = new Map<PlanTier, { monthly?: StripePlan; yearly?: StripePlan }>();

  for (const plan of plans) {
    const entry = byTier.get(plan.tier) ?? {};
    if (plan.interval === "year") {
      entry.yearly = plan;
    } else {
      entry.monthly = plan;
    }
    byTier.set(plan.tier, entry);
  }

  const tierOrder: PlanTier[] = ["free", "individual", "team", "growth", "enterprise"];
  const groups: PlanTierGroup[] = [];

  let hasTeam = false;

  for (const tier of tierOrder) {
    const entry = byTier.get(tier);
    if (!entry) continue;

    if (tier === "team") hasTeam = true;
    if (tier === "growth" && hasTeam) continue;

    const monthly = entry.monthly ?? entry.yearly!;
    const yearly = entry.yearly ?? entry.monthly!;
    const highlighted = tier === "team" || tier === "growth";

    groups.push({
      tier,
      name: monthly.name,
      monthly,
      yearly,
      highlighted,
    });
  }

  return groups;
}

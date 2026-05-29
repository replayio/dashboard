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

export type PlanTier = "free" | "growth" | "enterprise";
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
}

/** Enterprise tier key constant — Contact Sales flow, no checkout */
export const ENTERPRISE_TIER: PlanTier = "enterprise";

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
    tier: (p.tier as PlanTier) || "growth",
    features: [],
  };
}

/**
 * Group a flat list of normalised plans by tier for the billing-toggle UI.
 * For each tier the monthly and yearly variants are paired; if only one
 * interval is available it is used for both slots.
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

  const tierOrder: PlanTier[] = ["free", "growth", "enterprise"];
  const groups: PlanTierGroup[] = [];

  for (const tier of tierOrder) {
    const entry = byTier.get(tier);
    if (!entry) continue;
    const monthly = entry.monthly ?? entry.yearly!;
    const yearly = entry.yearly ?? entry.monthly!;
    groups.push({
      tier,
      name: monthly.name,
      monthly,
      yearly,
    });
  }

  return groups;
}

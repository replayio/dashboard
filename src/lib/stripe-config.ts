export type PlanTier = "free" | "growth" | "enterprise";
export type PlanInterval = "month" | "year" | "none";

export interface StripePlan {
  /** Stable key for referencing this plan in code (e.g., "free-v1") */
  key: string;
  /** Display name shown to users */
  name: string;
  /** Stripe Price ID — undefined for enterprise (contact sales) */
  priceId: string | undefined;
  /** Price in cents (0 for free, undefined for enterprise) */
  amount: number | undefined;
  /** Billing interval */
  interval: PlanInterval;
  /** Internal tier grouping */
  tier: PlanTier;
  /** Feature list for marketing / plan comparison UI */
  features: string[];
}

/**
 * PLANS — canonical plan catalog for Replay subscription tiers.
 *
 * All Stripe products are tagged with `metadata.replay_managed=true` in the
 * Stripe dashboard so they can be filtered in queries. Free tier creates a
 * real $0 Stripe subscription — not "no subscription".
 */
const FREE: StripePlan = {
  key: "free-v1",
  name: "Free",
  priceId: "price_1TZEsXEfKucJn4vk68YK7hSN",
  amount: 0,
  interval: "month",
  tier: "free",
  features: ["1 project", "50 AI analyses per month", "1 CI integration", "Community support"],
};

const GROWTH_MONTHLY: StripePlan = {
  key: "growth-monthly-v1",
  name: "Growth (Monthly)",
  priceId: "price_1TZFBKEfKucJn4vkrUyAo6yw",
  amount: 34900, // $349.00
  interval: "month",
  tier: "growth",
  features: [
    "Unlimited projects",
    "500 AI analyses per month",
    "All CI integrations (GitHub Actions, CircleCI, Jenkins, BuildKite)",
    "All coding agent integrations (Claude Code, Codex, Cursor, Copilot, Windsurf)",
    "Email support",
  ],
};

const GROWTH_ANNUAL: StripePlan = {
  key: "growth-annual-v1",
  name: "Growth (Annual)",
  priceId: "price_1TZFClEfKucJn4vkTvonRsAr",
  amount: 358800, // $3,588.00/yr ($299/mo)
  interval: "year",
  tier: "growth",
  features: [
    "Unlimited projects",
    "500 AI analyses per month",
    "All CI integrations (GitHub Actions, CircleCI, Jenkins, BuildKite)",
    "All coding agent integrations (Claude Code, Codex, Cursor, Copilot, Windsurf)",
    "Email support",
  ],
};

const ENTERPRISE: StripePlan = {
  key: "enterprise-v1",
  name: "Enterprise",
  priceId: undefined, // Contact sales
  amount: undefined,
  interval: "none",
  tier: "enterprise",
  features: [
    "Everything in Growth",
    "Custom seat count",
    "Dedicated support",
    "SSO/SAML",
    "Custom contracts",
  ],
};

/** Named plan constants for direct reference in code */
export const PLANS = {
  FREE,
  GROWTH_MONTHLY,
  GROWTH_ANNUAL,
  ENTERPRISE,
} as const;

/** All plans as an ordered array (Free → Growth Monthly → Growth Annual → Enterprise) */
export const PLANS_LIST: StripePlan[] = [FREE, GROWTH_MONTHLY, GROWTH_ANNUAL, ENTERPRISE];

/**
 * Look up a plan by its Stripe Price ID.
 * Returns undefined for Enterprise (no price ID) or unknown IDs.
 */
export function getPlanByPriceId(priceId: string): StripePlan | undefined {
  return PLANS_LIST.find(p => p.priceId === priceId);
}

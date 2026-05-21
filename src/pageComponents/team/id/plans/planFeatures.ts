// UI copy for the v2 plan picker. Backend-stored Plan rows carry only
// pricing + tier + interval; feature lists are dashboard concerns and
// intentionally live here so marketing copy can change without a backend
// deploy.

export type PlanTierUiConfig = {
  tier: "free" | "growth" | "enterprise";
  badge?: string; // e.g. "MOST POPULAR"
  eyebrow: string; // e.g. "FREE", "GROWTH", "ENTERPRISE"
  title: string;
  description: string;
  // CTA copy shown on the action button.
  ctaLabel: string;
  // Used for the "Everything in X, plus" header in the feature list.
  inheritsFromLabel?: string;
  features: string[];
};

export const PLAN_TIER_UI_CONFIG: Record<PlanTierUiConfig["tier"], PlanTierUiConfig> = {
  free: {
    tier: "free",
    eyebrow: "FREE",
    title: "Evaluate Replay with real recordings",
    description:
      "Works with CI Agent and Replay MCP — no time limit, no credit card required.",
    ctaLabel: "Start for free",
    features: [
      "25 AI analyses per month",
      "CI Agent integration",
      "Replay MCP for IDE debugging",
      "Replay DevTools access",
      "Community support",
    ],
  },
  growth: {
    tier: "growth",
    badge: "MOST POPULAR",
    eyebrow: "GROWTH",
    title: "Automated analysis on every CI failure",
    description:
      "Every failed test gets analyzed automatically. Root cause and fix posted to your PR — no manual debugging needed.",
    ctaLabel: "Start subscription",
    inheritsFromLabel: "Everything in Free, plus",
    features: [
      "500 AI analyses per month",
      "Unlimited recordings",
      "All CI integrations (GitHub Actions, CircleCI, Jenkins, BuildKite)",
      "All coding agent integrations (Claude Code, Codex, Cursor, Copilot, Windsurf)",
      "Email support",
    ],
  },
  enterprise: {
    tier: "enterprise",
    eyebrow: "ENTERPRISE",
    title: "For teams running Replay at scale",
    description:
      "Custom contracts, platform integrations, and dedicated support for high-velocity teams.",
    ctaLabel: "Contact sales",
    inheritsFromLabel: "Everything in Growth, plus",
    features: [
      "Unlimited AI analyses",
      "Priority support and dedicated onboarding",
      "SLA guarantees",
      "SSO and advanced access controls",
      "Roadmap input and joint planning",
    ],
  },
};

import stripeClient from "@/lib/stripe";
import { getPlanByPriceId } from "@/lib/stripe-config";
import { findStripeCustomer } from "@/lib/stripe-helpers";
import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";

export interface SubscriptionPlan {
  name: string;
  key: string;
  priceId: string;
}

export interface ActiveSubscription {
  plan: SubscriptionPlan;
  status: string;
  /** Unix timestamp (seconds) when the current billing period ends */
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  seatCount: number;
}

type ResponseBody = { subscription: ActiveSubscription | null } | { error: string };

/**
 * GET /api/stripe/subscription
 *
 * Returns the current user's active (or trialing) Stripe subscription.
 * Stripe is the source of truth — no local subscription state is stored.
 *
 * currentPeriodEnd comes from the first subscription item's current_period_end
 * (the Stripe 2026-05-27 API removed top-level current_period_end in favour of
 * per-item billing periods).
 *
 * Returns { subscription: null } when:
 *   - User has no Stripe customer record
 *   - User has no active or trialing subscription
 *
 * Never returns a 404 for missing subscriptions — always { subscription: null }.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "private, no-store");

  const session = await getSession(req, res);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const customerId = await findStripeCustomer(session.user.sub);
    if (!customerId) {
      return res.status(200).json({ subscription: null });
    }

    // Check active first, then trialing
    const [activeResult, trialingResult] = await Promise.all([
      stripeClient.subscriptions.list({
        customer: customerId,
        status: "active",
        expand: ["data.items.data.price"],
        limit: 1,
      }),
      stripeClient.subscriptions.list({
        customer: customerId,
        status: "trialing",
        expand: ["data.items.data.price"],
        limit: 1,
      }),
    ]);

    const subscription = activeResult.data[0] ?? trialingResult.data[0] ?? null;

    if (!subscription) {
      return res.status(200).json({ subscription: null });
    }

    // Get the first subscription item's price and period info.
    // The Stripe 2026-05-27 API surfaces current_period_end on SubscriptionItem,
    // not on the top-level Subscription object.
    const firstItem = subscription.items.data[0];
    if (!firstItem) {
      return res.status(200).json({ subscription: null });
    }

    const price = firstItem.price;
    const plan = getPlanByPriceId(price.id);

    const resolvedPlan: SubscriptionPlan = plan
      ? { name: plan.name, key: plan.key, priceId: price.id }
      : { name: price.nickname ?? "Unknown Plan", key: price.id, priceId: price.id };

    return res.status(200).json({
      subscription: {
        plan: resolvedPlan,
        status: subscription.status,
        currentPeriodEnd: firstItem.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        seatCount: firstItem.quantity ?? 1,
      },
    });
  } catch (err) {
    console.error("[/api/stripe/subscription] error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

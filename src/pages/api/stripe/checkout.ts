import stripe from "@/lib/stripe";
import { getOrCreateStripeCustomer } from "@/lib/stripe-helpers";
import { PLANS } from "@/lib/stripe-config";
import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";

const APP_URL = process.env.APP_URL || "http://localhost:8080";

type ResponseBody = { url: string } | { error: string };

/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe Checkout Session for the authenticated user.
 * Looks up or creates a Stripe customer mapped to the Auth0 user ID.
 * Returns the Checkout redirect URL.
 *
 * For the free tier ($0), sets payment_method_collection: if_required so
 * Stripe does not prompt the user for a credit card.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "private, no-store");

  const session = await getSession(req, res);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { priceId } = req.body as { priceId?: string };
  if (!priceId) {
    return res.status(400).json({ error: "Missing priceId" });
  }

  try {
    const customerId = await getOrCreateStripeCustomer(
      session.user.sub,
      session.user.email ?? "",
      session.user.name ?? ""
    );

    const isFreeTier = priceId === PLANS.FREE.priceId;

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: APP_URL + "/home?openSettings=subscription&checkout=success",
      cancel_url: APP_URL + "/home?openSettings=subscription&checkout=cancelled",
      // Skip credit card collection for $0 subscriptions
      payment_method_collection: isFreeTier ? "if_required" : "always",
    });

    if (!checkoutSession.url) {
      return res.status(500).json({ error: "Failed to create checkout session" });
    }

    return res.status(200).json({ url: checkoutSession.url });
  } catch (err) {
    console.error("[/api/stripe/checkout] error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

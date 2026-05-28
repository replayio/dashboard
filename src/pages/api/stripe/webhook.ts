import stripeClient from "@/lib/stripe";
import { getRawBody } from "@/lib/stripe-helpers";
import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

/**
 * Disable Next.js body parsing — we need the raw body for Stripe signature verification.
 * Stripe's constructEvent() requires the exact raw bytes that were signed.
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

type ResponseBody = { received: boolean } | { error: string };

/**
 * POST /api/stripe/webhook
 *
 * Receives and verifies Stripe webhook events.
 * Unauthenticated — Stripe signature verification replaces session auth.
 *
 * Handled events:
 *   - checkout.session.completed
 *   - customer.subscription.created
 *   - customer.subscription.updated
 *   - customer.subscription.deleted
 *
 * Stripe is the source of truth for subscription state; no local persistence needed.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[/api/stripe/webhook] STRIPE_WEBHOOK_SECRET is not configured");
    return res.status(500).json({ error: "Webhook secret not configured" });
  }

  if (!sig) {
    return res.status(400).json({ error: "Missing stripe-signature header" });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);
    event = stripeClient.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/stripe/webhook] signature verification failed:", message);
    return res.status(400).json({ error: "Webhook signature verification failed" });
  }

  // Handle events — Stripe is source of truth, log for now
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("[stripe/webhook] checkout.session.completed:", {
        sessionId: session.id,
        customerId: session.customer,
        subscriptionId: session.subscription,
      });
      break;
    }

    case "customer.subscription.created": {
      const subscription = event.data.object;
      console.log("[stripe/webhook] customer.subscription.created:", {
        subscriptionId: subscription.id,
        customerId: subscription.customer,
        status: subscription.status,
      });
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      console.log("[stripe/webhook] customer.subscription.updated:", {
        subscriptionId: subscription.id,
        customerId: subscription.customer,
        status: subscription.status,
      });
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      console.log("[stripe/webhook] customer.subscription.deleted:", {
        subscriptionId: subscription.id,
        customerId: subscription.customer,
      });
      break;
    }

    default:
      console.log("[stripe/webhook] unhandled event type:", event.type);
  }

  return res.status(200).json({ received: true });
}

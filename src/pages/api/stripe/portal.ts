import stripe from "@/lib/stripe";
import { findStripeCustomer } from "@/lib/stripe-helpers";
import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";

const APP_URL = process.env.APP_URL || "http://localhost:8080";

type ResponseBody = { url: string } | { error: string };

/**
 * POST /api/stripe/portal
 *
 * Creates a Stripe Billing Portal session for the authenticated user.
 * The portal lets users manage their subscription, payment methods, and invoices.
 * Returns 400 if the user has no Stripe customer record.
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

  try {
    const customerId = await findStripeCustomer(session.user.sub);
    if (!customerId) {
      return res.status(400).json({ error: "No Stripe customer found for this user" });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: APP_URL + "/home?openSettings=subscription",
    });

    return res.status(200).json({ url: portalSession.url });
  } catch (err) {
    console.error("[/api/stripe/portal] error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

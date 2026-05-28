import type { NextApiRequest } from "next";
import stripe from "@/lib/stripe";

/**
 * Looks up an existing Stripe customer by Auth0 user ID (stored in metadata),
 * or creates a new one if not found.
 *
 * Metadata key: `auth0_user_id` — used to reliably map Auth0 identities to
 * Stripe customers without storing any local mapping.
 */
export async function getOrCreateStripeCustomer(
  userSub: string,
  email: string,
  name: string
): Promise<string> {
  // Search for an existing customer by metadata
  const existing = await stripe.customers.search({
    query: `metadata["auth0_user_id"]:"${userSub}"`,
    limit: 1,
  });

  if (existing.data.length > 0 && existing.data[0]) {
    return existing.data[0].id;
  }

  // Create a new Stripe customer
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      auth0_user_id: userSub,
    },
  });

  return customer.id;
}

/**
 * Looks up an existing Stripe customer ID by Auth0 user ID.
 * Returns null if no customer is found.
 */
export async function findStripeCustomer(userSub: string): Promise<string | null> {
  const existing = await stripe.customers.search({
    query: `metadata["auth0_user_id"]:"${userSub}"`,
    limit: 1,
  });

  if (existing.data.length > 0 && existing.data[0]) {
    return existing.data[0].id;
  }

  return null;
}

/**
 * Collects raw request body chunks into a Buffer.
 * Required for Stripe webhook signature verification — the raw body must be
 * used before any JSON parsing occurs. Export `config = { api: { bodyParser: false } }`
 * in the route to disable Next.js automatic body parsing.
 */
export function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    req.on("error", reject);
  });
}

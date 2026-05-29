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
  const existing = await stripe.customers.search({
    query: `metadata["auth0_user_id"]:"${userSub}"`,
    limit: 1,
  });

  if (existing.data.length > 0 && existing.data[0]) {
    return existing.data[0].id;
  }

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

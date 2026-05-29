/**
 * Dev-mode seeded user configuration.
 *
 * When NEXT_PUBLIC_DEV_SEED_USER=true (and NODE_ENV !== 'production'),
 * the app bypasses Auth0 entirely and uses a hardcoded seed user with
 * mock GraphQL data. This lets sandbox / preview environments load
 * without Auth0 redirect URL configuration.
 *
 * Safe for Edge Runtime (no Node-only APIs).
 */

export const DEV_SEED_ENABLED =
  process.env.NEXT_PUBLIC_DEV_SEED_USER === "true" && process.env.NODE_ENV !== "production";

/** Sentinel access token that signals "dev seed mode" in getCurrentUser. */
export const DEV_SEED_TOKEN = "dev-seed-token";

/** The hardcoded user returned when DEV_SEED_TOKEN is the access token. */
export const DEV_SEED_USER = {
  email: "dev@replay.local",
  id: "dev-user-001",
  isInternal: true,
  nags: [] as string[],
  name: "Dev User",
  picture: "",
};

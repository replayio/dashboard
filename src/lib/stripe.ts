import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is not set");
}

if (!process.env.STRIPE_SECRET_KEY.startsWith("sk_")) {
  throw new Error(
    "STRIPE_SECRET_KEY must start with 'sk_' — check that you are using the secret key, not the publishable key"
  );
}

// Singleton Stripe server client — initialized once at module load time.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-05-27.dahlia",
  typescript: true,
});

export default stripe;

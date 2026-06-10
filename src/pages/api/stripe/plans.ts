import { graphQLQuery } from "@/graphql/graphQLQuery";
import { getSession } from "@auth0/nextjs-auth0";
import { gql } from "@apollo/client";
import type { NextApiRequest, NextApiResponse } from "next";

/** Shape returned by the backend availablePlans GraphQL query */
export interface BackendPlan {
  key: string;
  name: string;
  displayName: string;
  tier: string;
  interval: string;
  visibility: string;
  monthlyPriceCents: number;
  billingId: string | null;
}

type ResponseBody = { plans: BackendPlan[] } | { error: string };

/**
 * GET /api/stripe/plans
 *
 * Fetches available subscription plans from the backend availablePlans
 * GraphQL query. The plans table is the single source of truth for the plan
 * catalog — prices are synced from Stripe via webhook, not hardcoded.
 *
 * Caches for 60s (plans rarely change).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "private, max-age=60");

  const session = await getSession(req, res);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { data, errors } = await graphQLQuery<{ availablePlans: BackendPlan[] }>({
      accessToken: session.accessToken as string,
      mockGraphQLData: null,
      query: gql`
        query AvailablePlans {
          availablePlans {
            key
            name
            displayName
            tier
            interval
            visibility
            monthlyPriceCents
            billingId
          }
        }
      `,
    });

    if (errors && errors.length > 0) {
      console.error("[/api/stripe/plans] GraphQL errors:", errors);
      return res.status(500).json({ error: errors[0]?.message ?? "GraphQL error" });
    }

    const plans = data?.availablePlans ?? [];

    return res.status(200).json({ plans });
  } catch (err) {
    console.error("[/api/stripe/plans] error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

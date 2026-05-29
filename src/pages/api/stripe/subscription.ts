import { graphQLQuery } from "@/graphql/graphQLQuery";
import { getSession } from "@auth0/nextjs-auth0";
import { gql } from "@apollo/client";
import type { NextApiRequest, NextApiResponse } from "next";

export interface SubscriptionPlan {
  name: string;
  key: string;
  /** @deprecated priceId is no longer used — plan catalog lives in the backend */
  priceId?: string;
}

export interface ActiveSubscription {
  plan: SubscriptionPlan;
  status: string;
  /** Unix timestamp (seconds) when the current billing period ends — may be null */
  currentPeriodEnd: number | null;
  cancelAtPeriodEnd: boolean;
  seatCount: number;
}

type ResponseBody = { subscription: ActiveSubscription | null } | { error: string };

/**
 * GET /api/stripe/subscription?workspaceId=...
 *
 * Returns the workspace subscription status by querying the backend GraphQL
 * (node -> Workspace -> subscription). The backend is the source of truth —
 * no direct Stripe API calls are made from the dashboard.
 *
 * Accepts workspaceId as a query param. Returns { subscription: null } when:
 *   - workspaceId is missing
 *   - Backend returns no subscription for the workspace
 *
 * Never returns 404 for missing subscriptions — always { subscription: null }.
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

  const workspaceId = req.query.workspaceId as string | undefined;
  if (!workspaceId) {
    // No workspace — return null gracefully (not an error)
    return res.status(200).json({ subscription: null });
  }

  try {
    const { data, errors } = await graphQLQuery<{
      node: {
        __typename?: string;
        id?: string;
        subscription?: {
          id: string;
          status: string;
          plan?: {
            key: string;
            name: string;
          } | null;
        } | null;
      } | null;
    }>({
      accessToken: session.accessToken as string,
      mockGraphQLData: null,
      query: gql`
        query GetWorkspaceSubscriptionForBilling($workspaceId: ID!) {
          node(id: $workspaceId) {
            ... on Workspace {
              id
              subscription {
                id
                status
                plan {
                  key
                  name
                }
              }
            }
          }
        }
      `,
      variables: { workspaceId },
    });

    if (errors && errors.length > 0) {
      console.error("[/api/stripe/subscription] GraphQL errors:", errors);
      return res.status(500).json({ error: errors[0]?.message ?? "GraphQL error" });
    }

    const workspaceNode = data?.node;
    if (!workspaceNode || !("subscription" in workspaceNode) || !workspaceNode.subscription) {
      return res.status(200).json({ subscription: null });
    }

    const sub = workspaceNode.subscription;

    return res.status(200).json({
      subscription: {
        plan: {
          key: sub.plan?.key ?? "unknown",
          name: sub.plan?.name ?? "Unknown",
        },
        status: sub.status,
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
        seatCount: 1,
      },
    });
  } catch (err) {
    console.error("[/api/stripe/subscription] error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

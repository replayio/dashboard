import { graphQLQuery } from "@/graphql/graphQLQuery";
import { getSession } from "@auth0/nextjs-auth0";
import { gql } from "@apollo/client";
import type { NextApiRequest, NextApiResponse } from "next";

const APP_URL = process.env.APP_URL || "http://localhost:8080";

type ResponseBody = { url: string } | { error: string };

/**
 * POST /api/stripe/portal
 *
 * Creates a Stripe Billing Portal session for the authenticated user's workspace.
 * Body: { workspaceId: string }
 *
 * Delegates to the backend createWorkspaceBillingPortalSession mutation which
 * looks up the org's Stripe customer ID and creates the portal session server-side.
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

  const { workspaceId } = req.body as { workspaceId?: string };
  if (!workspaceId) {
    return res.status(400).json({ error: "Missing workspaceId" });
  }

  const returnUrl = APP_URL + "/home?openSettings=subscription";

  try {
    const accessToken = session.accessToken as string;

    const { data, errors } = await graphQLQuery<{
      createWorkspaceBillingPortalSession: { url: string };
    }>({
      accessToken,
      mockGraphQLData: null,
      query: gql`
        mutation CreateWorkspaceBillingPortalSession($workspaceId: ID!, $returnUrl: String!) {
          createWorkspaceBillingPortalSession(
            input: { workspaceId: $workspaceId, returnUrl: $returnUrl }
          ) {
            url
          }
        }
      `,
      variables: { workspaceId, returnUrl },
    });

    if (errors && errors.length > 0) {
      console.error("[/api/stripe/portal] createWorkspaceBillingPortalSession errors:", errors);
      return res.status(400).json({ error: errors[0]?.message ?? "GraphQL error" });
    }

    const portalUrl = data?.createWorkspaceBillingPortalSession?.url;
    if (!portalUrl) {
      return res.status(500).json({ error: "Failed to create billing portal session" });
    }

    return res.status(200).json({ url: portalUrl });
  } catch (err) {
    console.error("[/api/stripe/portal] error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

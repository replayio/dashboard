import { graphQLQuery } from "@/graphql/graphQLQuery";
import { getSession } from "@auth0/nextjs-auth0";
import { gql } from "@apollo/client";
import type { NextApiRequest, NextApiResponse } from "next";

const APP_URL = process.env.APP_URL || "http://localhost:8080";

type ResponseBody = { url: string } | { error: string };

/**
 * POST /api/stripe/checkout
 *
 * Creates a checkout flow for the authenticated user's workspace.
 * Body: { planKey: string; workspaceId?: string }
 *
 * If workspaceId is omitted (new users with no workspace), a workspace is
 * auto-created via createWorkspaceV2 before proceeding.
 *
 * Free tier (planKey starts with "free"): calls selectFreePlan mutation — no
 * Stripe Checkout session needed. Returns { url: successUrl } for client redirect.
 *
 * Paid plans: calls createWorkspaceCheckoutSession mutation on the backend,
 * which creates the Stripe Checkout session with replay_managed metadata and
 * returns the redirect URL.
 *
 * Dashboard does NOT call the Stripe SDK for checkout — only the backend does.
 * Price IDs are not passed from the client — the backend resolves them from the
 * plans table.
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

  const { planKey, workspaceId: bodyWorkspaceId } = req.body as {
    planKey?: string;
    workspaceId?: string;
  };

  if (!planKey) {
    return res.status(400).json({ error: "Missing planKey" });
  }

  const successUrl = APP_URL + "/home?openSettings=subscription&checkout=success";
  const cancelUrl = APP_URL + "/home?openSettings=subscription&checkout=cancelled";

  try {
    const accessToken = session.accessToken as string;

    // Auto-create a workspace for users who don't have one yet
    let workspaceId: string;
    if (bodyWorkspaceId) {
      workspaceId = bodyWorkspaceId;
    } else {
      const { data: wsData, errors: wsErrors } = await graphQLQuery<{
        createWorkspaceV2: { workspace: { id: string } };
      }>({
        accessToken,
        mockGraphQLData: null,
        query: gql`
          mutation CreateWorkspaceV2($name: String!) {
            createWorkspaceV2(input: { name: $name }) {
              workspace {
                id
              }
            }
          }
        `,
        variables: { name: "My Team" },
      });

      if (wsErrors && wsErrors.length > 0) {
        console.error("[/api/stripe/checkout] createWorkspaceV2 errors:", wsErrors);
        return res
          .status(500)
          .json({ error: wsErrors[0]?.message ?? "Failed to create workspace" });
      }

      const newWorkspaceId = wsData?.createWorkspaceV2?.workspace?.id;
      if (!newWorkspaceId) {
        return res.status(500).json({ error: "Failed to create workspace" });
      }
      workspaceId = newWorkspaceId;
    }

    // Free tier: selectFreePlan mutation — no Stripe Checkout session needed
    if (planKey.startsWith("free")) {
      const { data, errors } = await graphQLQuery<{
        selectFreePlan: { success: boolean };
      }>({
        accessToken,
        mockGraphQLData: null,
        query: gql`
          mutation SelectFreePlan($workspaceId: ID!) {
            selectFreePlan(input: { workspaceId: $workspaceId }) {
              success
            }
          }
        `,
        variables: { workspaceId },
      });

      if (errors && errors.length > 0) {
        console.error("[/api/stripe/checkout] selectFreePlan errors:", errors);
        return res.status(500).json({ error: errors[0]?.message ?? "GraphQL error" });
      }

      if (!data?.selectFreePlan?.success) {
        return res.status(500).json({ error: "Failed to assign free plan" });
      }

      // Return successUrl so client redirects to the success page
      return res.status(200).json({ url: successUrl });
    }

    // Paid plans: backend creates the Stripe Checkout session with correct metadata
    const { data, errors } = await graphQLQuery<{
      createWorkspaceCheckoutSession: { url: string; sessionId: string };
    }>({
      accessToken,
      mockGraphQLData: null,
      query: gql`
        mutation CreateWorkspaceCheckoutSession(
          $workspaceId: ID!
          $planKey: String!
          $successUrl: String!
          $cancelUrl: String!
        ) {
          createWorkspaceCheckoutSession(
            input: {
              workspaceId: $workspaceId
              planKey: $planKey
              successUrl: $successUrl
              cancelUrl: $cancelUrl
            }
          ) {
            url
            sessionId
          }
        }
      `,
      variables: { workspaceId, planKey, successUrl, cancelUrl },
    });

    if (errors && errors.length > 0) {
      console.error("[/api/stripe/checkout] createWorkspaceCheckoutSession errors:", errors);
      return res.status(500).json({ error: errors[0]?.message ?? "GraphQL error" });
    }

    const checkoutUrl = data?.createWorkspaceCheckoutSession?.url;
    if (!checkoutUrl) {
      return res.status(500).json({ error: "Failed to create checkout session" });
    }

    return res.status(200).json({ url: checkoutUrl });
  } catch (err) {
    console.error("[/api/stripe/checkout] error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

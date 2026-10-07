import {
  GetWorkspaceSubscriptionQuery,
  GetWorkspaceSubscriptionQueryVariables,
} from "@/graphql/generated/graphql";
import {
  PlanInterval,
  PlanKey,
  PlanTier,
  PlanVisibility,
  SubscriptionStatus,
  WorkspaceSubscription,
} from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import { useMemo } from "react";

export function useWorkspaceSubscription(workspaceId: string) {
  const {
    data,
    error: didError,
    isLoading,
    refetch,
  } = useGraphQLQuery<GetWorkspaceSubscriptionQuery, GetWorkspaceSubscriptionQueryVariables>(
    gql`
      query GetWorkspaceSubscription($workspaceId: ID!) {
        node(id: $workspaceId) {
          ... on Workspace {
            id
            subscription {
              id
              effectiveFrom
              effectiveUntil
              status
              trialEnds
              seatCount
              paymentMethods {
                id
                type
                default
                card {
                  brand
                  last4
                }
              }
              plan {
                id
                key
                name
                tier
                interval
                visibility
                displayName
                monthlyPriceCents
              }
            }
          }
        }
      }
    `,
    { workspaceId }
  );

  const subscription = useMemo<WorkspaceSubscription | undefined>(() => {
    if (isLoading || didError) return undefined;

    // v2 pricing: workspaces created via createWorkspaceV2 may not have a
    // subscription row yet. Callers (e.g. BillingContext) already treat
    // `undefined` as "still loading/absent", so we mirror that behaviour
    // rather than throwing.
    if (!data?.node || !("subscription" in data.node) || !data.node.subscription) {
      return undefined;
    }

    const { subscription } = data.node;

    // The Plan GraphQL type was extended with v2 fields (tier, interval,
    // visibility, displayName, monthlyPriceCents). Older codegen may emit
    // these as optional/missing; cast through unknown to tolerate either
    // shape until codegen is regenerated.
    const rawPlan = subscription.plan as unknown as
      | {
          id: string;
          key: string;
          name: string;
          tier?: string | null;
          interval?: string | null;
          visibility?: string | null;
          displayName?: string | null;
          monthlyPriceCents?: number | null;
        }
      | null
      | undefined;

    return {
      effectiveFrom: new Date(subscription.effectiveFrom),
      effectiveUntil: new Date(subscription.effectiveUntil),
      id: subscription.id,
      paymentMethods:
        subscription.paymentMethods?.map(paymentMethod => ({
          card: {
            brand: paymentMethod.card.brand,
            last4: paymentMethod.card.last4,
          },
          default: paymentMethod.default,
          id: paymentMethod.id,
          type: paymentMethod.type as any,
        })) ?? [],
      plan: rawPlan
        ? {
            id: rawPlan.id,
            key: rawPlan.key as PlanKey,
            name: rawPlan.name,
            tier: (rawPlan.tier ?? undefined) as PlanTier | undefined,
            interval: (rawPlan.interval ?? null) as PlanInterval | null,
            visibility: (rawPlan.visibility ?? undefined) as PlanVisibility | undefined,
            displayName: rawPlan.displayName ?? null,
            monthlyPriceCents: rawPlan.monthlyPriceCents ?? null,
          }
        : undefined,
      seatCount: subscription.seatCount,
      status: subscription.status as SubscriptionStatus,
      trialEnds: new Date(subscription.trialEnds),
    };
  }, [data, didError, isLoading]);

  return { didError, isLoading, refetch, subscription };
}

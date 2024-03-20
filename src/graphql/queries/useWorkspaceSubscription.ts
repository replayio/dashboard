import {
  GetWorkspaceSubscriptionQuery,
  GetWorkspaceSubscriptionQueryVariables,
} from "@/graphql/generated/graphql";
import {
  PlanKey,
  SubscriptionStatus,
  WorkspaceSubscription,
} from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import assert from "assert";
import { useMemo } from "react";

// TODO limit the number of recordings returned
export function useWorkspaceSubscription(workspaceId: string) {
  const {
    data,
    error: didError,
    isLoading,
  } = useGraphQLQuery<
    GetWorkspaceSubscriptionQuery,
    GetWorkspaceSubscriptionQueryVariables
  >(
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
              }
            }
          }
        }
      }
    `,
    { workspaceId }
  );

  const subscription = useMemo<WorkspaceSubscription | undefined>(() => {
    if (!isLoading && !didError) {
      assert(
        data?.node &&
          "subscription" in data?.node &&
          data.node.subscription &&
          `Subscription could not be found for workspace "${workspaceId}"`
      );

      const { subscription } = data.node;

      return {
        effectiveFrom: new Date(subscription.effectiveFrom),
        effectiveUntil: new Date(subscription.effectiveUntil),
        id: subscription.id,
        paymentMethods:
          subscription.paymentMethods?.map((paymentMethod) => ({
            card: {
              brand: paymentMethod.card.brand,
              last4: paymentMethod.card.last4,
            },
            default: paymentMethod.default,
            id: paymentMethod.id,
            type: paymentMethod.type as any,
          })) ?? [],
        plan: subscription.plan
          ? {
              id: subscription.plan.id,
              key: subscription.plan.key as PlanKey,
              name: subscription.plan.name,
            }
          : undefined,
        seatCount: subscription.seatCount,
        status: subscription.status as SubscriptionStatus,
        trialEnds: new Date(subscription.trialEnds),
      };
    }
  }, [data, didError, isLoading, workspaceId]);

  return { didError, isLoading, subscription };
}

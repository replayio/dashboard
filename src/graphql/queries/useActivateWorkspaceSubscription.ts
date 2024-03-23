import {
  ActivateWorkspaceSubscriptionMutation,
  ActivateWorkspaceSubscriptionMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import { useCallback } from "react";

export function useActivateWorkspaceSubscription() {
  const { error, isLoading, mutate } = useGraphQLMutation<
    ActivateWorkspaceSubscriptionMutation,
    ActivateWorkspaceSubscriptionMutationVariables
  >(
    gql`
      mutation ActivateWorkspaceSubscription(
        $workspaceId: ID!
        $planKey: String!
        $paymentMethodBillingId: String!
      ) {
        setWorkspaceDefaultPaymentMethod(
          input: {
            workspaceId: $workspaceId
            paymentMethodId: $paymentMethodBillingId
          }
        ) {
          success
        }
        activateWorkspaceSubscription(
          input: { workspaceId: $workspaceId, planKey: $planKey }
        ) {
          success
          subscription {
            effectiveUntil
            status
          }
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaceSubscription"],
    }
  );

  const activateWorkspaceSubscription = useCallback(
    async (
      workspaceId: string,
      planKey: string,
      paymentMethodBillingId: string
    ) => {
      const result = await mutate({
        variables: { paymentMethodBillingId, planKey, workspaceId },
      });

      return {
        activateWorkspaceSuccess:
          result.data?.activateWorkspaceSubscription.success == true,
        setWorkspaceDefaultPaymentMethodSuccess:
          result.data?.setWorkspaceDefaultPaymentMethod?.success == true,
      };
    },
    [mutate]
  );

  return { activateWorkspaceSubscription, error, isLoading };
}

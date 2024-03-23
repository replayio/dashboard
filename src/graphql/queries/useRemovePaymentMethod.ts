import {
  RemovePaymentMethodMutation,
  RemovePaymentMethodMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import { useCallback } from "react";

export function useRemovePaymentMethod(onCompleted?: () => void) {
  const { error, isLoading, mutate } = useGraphQLMutation<
    RemovePaymentMethodMutation,
    RemovePaymentMethodMutationVariables
  >(
    gql`
      mutation RemovePaymentMethod(
        $workspaceId: ID!
        $paymentMethodId: String!
      ) {
        deleteWorkspacePaymentMethod(
          input: {
            workspaceId: $workspaceId
            paymentMethodId: $paymentMethodId
          }
        ) {
          success
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaceSubscription"],
      onCompleted,
    }
  );

  const removePaymentMethod = useCallback(
    async (workspaceId: string, paymentMethodId: string) => {
      const result = await mutate({
        variables: { paymentMethodId, workspaceId },
      });

      const { success = false } =
        result.data?.deleteWorkspacePaymentMethod ?? {};

      return success;
    },
    [mutate]
  );

  return { error, isLoading, removePaymentMethod };
}

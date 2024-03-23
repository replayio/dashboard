import {
  PrepareWorkspacePaymentMethodMutation,
  PrepareWorkspacePaymentMethodMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import { useCallback } from "react";

export function usePrepareWorkspacePaymentMethod() {
  const { error, isLoading, mutate } = useGraphQLMutation<
    PrepareWorkspacePaymentMethodMutation,
    PrepareWorkspacePaymentMethodMutationVariables
  >(
    gql`
      mutation PrepareWorkspacePaymentMethod($workspaceId: ID!) {
        prepareWorkspacePaymentMethod(input: { workspaceId: $workspaceId }) {
          success
          paymentSecret
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaceSubscription"],
    }
  );

  const prepareWorkspacePaymentMethod = useCallback(
    async (workspaceId: string) => {
      const result = await mutate({ variables: { workspaceId } });

      const { paymentSecret = null, success = false } =
        result.data?.prepareWorkspacePaymentMethod ?? {};

      return { paymentSecret, success };
    },
    [mutate]
  );

  return { error, isLoading, prepareWorkspacePaymentMethod };
}

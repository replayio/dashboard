import {
  RequestWorkspaceMembershipMutation,
  RequestWorkspaceMembershipMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import { useCallback } from "react";

export function useRequestWorkspaceMembership() {
  const { error, isLoading, mutate } = useGraphQLMutation<
    RequestWorkspaceMembershipMutation,
    RequestWorkspaceMembershipMutationVariables
  >(
    gql`
      mutation RequestWorkspaceMembership($workspaceId: ID!) {
        requestWorkspaceMembership(input: { workspaceId: $workspaceId }) {
          success
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaceSubscription"],
    }
  );

  const requestWorkspaceMembership = useCallback(
    async (workspaceId: string) => {
      const result = await mutate({
        variables: { workspaceId },
      });

      return {
        success: result.data?.requestWorkspaceMembership.success == true,
      };
    },
    [mutate]
  );

  return { requestWorkspaceMembership, error, isLoading };
}

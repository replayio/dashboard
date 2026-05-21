import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import { useCallback } from "react";

type SelectFreePlanMutation = {
  selectFreePlan: {
    success?: boolean;
    subscription?: {
      id: string;
      status: string;
    };
  };
};

type SelectFreePlanVariables = {
  workspaceId: string;
};

export function useSelectFreePlan() {
  const { error, isLoading, mutate } = useGraphQLMutation<
    SelectFreePlanMutation,
    SelectFreePlanVariables
  >(
    gql`
      mutation SelectFreePlan($workspaceId: ID!) {
        selectFreePlan(input: { workspaceId: $workspaceId }) {
          subscription {
            id
            status
          }
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaceSubscription"],
    }
  );

  const selectFreePlan = useCallback(
    async (workspaceId: string) => {
      const result = await mutate({ variables: { workspaceId } });
      return result.data?.selectFreePlan.subscription ?? null;
    },
    [mutate]
  );

  return { error, isLoading, selectFreePlan };
}

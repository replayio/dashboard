import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import { useCallback } from "react";

type CreateWorkspaceCheckoutSessionMutation = {
  createWorkspaceCheckoutSession: {
    url: string;
    sessionId: string;
    success?: boolean;
  };
};

type CreateWorkspaceCheckoutSessionVariables = {
  workspaceId: string;
  planKey: string;
  successUrl: string;
  cancelUrl: string;
};

export function useCreateCheckoutSession() {
  const { error, isLoading, mutate } = useGraphQLMutation<
    CreateWorkspaceCheckoutSessionMutation,
    CreateWorkspaceCheckoutSessionVariables
  >(
    gql`
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
    `
  );

  const createCheckoutSession = useCallback(
    async (vars: CreateWorkspaceCheckoutSessionVariables) => {
      const result = await mutate({ variables: vars });
      return result.data?.createWorkspaceCheckoutSession.url ?? null;
    },
    [mutate]
  );

  return { createCheckoutSession, error, isLoading };
}

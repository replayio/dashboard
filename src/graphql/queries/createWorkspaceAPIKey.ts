import { SessionContext } from "@/components/SessionContext";
import {
  CreateWorkspaceApiKeyMutation,
  CreateWorkspaceApiKeyMutationVariables,
} from "@/graphql/generated/graphql";
import { ApiKeyScope } from "@/graphql/types";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useCreateWorkspaceAPIKey() {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const {
    mutate: createApiKeyMutation,
    isLoading: loading,
    error,
  } = useGraphQLMutation<CreateWorkspaceApiKeyMutation, CreateWorkspaceApiKeyMutationVariables>(
    gql`
      mutation CreateWorkspaceAPIKey(
        $workspaceId: ID!
        $label: String!
        $scopes: [String!]!
        $apiKey: String
      ) {
        createWorkspaceAPIKey(
          input: { workspaceId: $workspaceId, label: $label, scopes: $scopes, apiKey: $apiKey }
        ) {
          key {
            id
            label
          }
          keyValue
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaceApiKeys"],
    }
  );

  if (error) {
    console.error("Apollo error while creating a workspace API key", error);
  }

  const createApiKey = async (
    workspaceId: string,
    label: string,
    scopes: ApiKeyScope[],
    apiKey?: string
  ) => {
    const response = await createApiKeyMutation({
      variables: { apiKey, label, scopes, workspaceId },
    });

    return response.data?.createWorkspaceAPIKey.keyValue;
  };

  return { createApiKey, error, loading };
}

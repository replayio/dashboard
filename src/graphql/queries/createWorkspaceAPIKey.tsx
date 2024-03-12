import { AuthContext } from "@/components/AuthContext";
import {
  CreateWorkspaceApiKeyMutation,
  CreateWorkspaceApiKeyMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientClient } from "@/graphql/graphQLClient";
import { ApiKeyScope } from "@/graphql/types";
import { gql, useMutation } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useCreateWorkspaceAPIKey() {
  const accessToken = useContext(AuthContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClientClient(accessToken);

  const [createApiKeyMutation, { loading, error }] = useMutation<
    CreateWorkspaceApiKeyMutation,
    CreateWorkspaceApiKeyMutationVariables
  >(
    gql`
      mutation CreateWorkspaceAPIKey(
        $workspaceId: ID!
        $label: String!
        $scopes: [String!]!
      ) {
        createWorkspaceAPIKey(
          input: { workspaceId: $workspaceId, label: $label, scopes: $scopes }
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
      client,
      refetchQueries: ["GetWorkspaceApiKeys"],
    }
  );

  if (error) {
    console.error("Apollo error while creating a workspace API key", error);
  }

  const createApiKey = async (
    workspaceId: string,
    label: string,
    scopes: ApiKeyScope[]
  ) => {
    const response = await createApiKeyMutation({
      variables: { label, scopes, workspaceId },
    });

    assert(
      response?.data?.createWorkspaceAPIKey != null,
      "Workspace API key creation failed"
    );

    return response.data.createWorkspaceAPIKey.keyValue;
  };

  return { createApiKey, error, loading };
}

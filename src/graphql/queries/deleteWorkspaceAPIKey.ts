import { SessionContext } from "@/components/SessionContext";
import {
  DeleteWorkspaceApiKeyMutation,
  DeleteWorkspaceApiKeyMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useDeleteWorkspaceAPIKey() {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const {
    mutate: deleteApiKeyMutation,
    error,
    isLoading,
  } = useGraphQLMutation<DeleteWorkspaceApiKeyMutation, DeleteWorkspaceApiKeyMutationVariables>(
    gql`
      mutation DeleteWorkspaceAPIKey($id: ID!) {
        deleteWorkspaceAPIKey(input: { id: $id }) {
          success
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaceApiKeys"],
    }
  );

  if (error) {
    console.error("Apollo error while deleting a user API key", error);
  }

  const deleteApiKey = (id: string) => deleteApiKeyMutation({ variables: { id } });

  return { deleteApiKey, error, isLoading };
}

import { AuthContext } from "@/components/AuthContext";
import {
  DeleteWorkspaceApiKeyMutation,
  DeleteWorkspaceApiKeyMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientClient } from "@/graphql/graphQLClient";
import { gql, useMutation } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useDeleteWorkspaceAPIKey() {
  const accessToken = useContext(AuthContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClientClient(accessToken);

  const [deleteApiKeyMutation, { loading, error }] = useMutation<
    DeleteWorkspaceApiKeyMutation,
    DeleteWorkspaceApiKeyMutationVariables
  >(
    gql`
      mutation DeleteWorkspaceAPIKey($id: ID!) {
        deleteWorkspaceAPIKey(input: { id: $id }) {
          success
        }
      }
    `,
    {
      client,
      refetchQueries: ["GetWorkspaceApiKeys"],
    }
  );

  if (error) {
    console.error("Apollo error while deleting a user API key", error);
  }

  const deleteApiKey = (id: string) =>
    deleteApiKeyMutation({ variables: { id } });

  return { deleteApiKey, error, loading };
}

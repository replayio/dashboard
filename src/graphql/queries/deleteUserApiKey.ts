import { SessionContext } from "@/components/SessionContext";
import {
  DeleteUserApiKeyMutation,
  DeleteUserApiKeyMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useDeleteUserAPIKey() {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const {
    mutate: deleteApiKeyMutation,
    error,
    isLoading,
  } = useGraphQLMutation<DeleteUserApiKeyMutation, DeleteUserApiKeyMutationVariables>(
    gql`
      mutation DeleteUserAPIKey($id: ID!) {
        deleteUserAPIKey(input: { id: $id }) {
          success
        }
      }
    `,
    {
      refetchQueries: ["GetUserSettings"],
    }
  );

  if (error) {
    console.error("Apollo error while deleting a user API key", error);
  }

  const deleteApiKey = (id: string) => deleteApiKeyMutation({ variables: { id } });

  return { deleteApiKey, error, isLoading };
}

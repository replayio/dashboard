import { SessionContext } from "@/components/SessionContext";
import {
  DeleteUserApiKeyMutation,
  DeleteUserApiKeyMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { gql, useMutation } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useDeleteUserAPIKey() {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClient(accessToken);

  const [deleteApiKeyMutation, { loading, error }] = useMutation<
    DeleteUserApiKeyMutation,
    DeleteUserApiKeyMutationVariables
  >(
    gql`
      mutation DeleteUserAPIKey($id: ID!) {
        deleteUserAPIKey(input: { id: $id }) {
          success
        }
      }
    `,
    {
      client,
      refetchQueries: ["GetUserSettings"],
    }
  );

  if (error) {
    console.error("Apollo error while deleting a user API key", error);
  }

  const deleteApiKey = (id: string) => deleteApiKeyMutation({ variables: { id } });

  return { deleteApiKey, error, loading };
}

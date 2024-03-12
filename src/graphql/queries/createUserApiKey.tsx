import { AuthContext } from "@/components/AuthContext";
import {
  CreateUserApiKeyMutation,
  CreateUserApiKeyMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientClient } from "@/graphql/graphQLClient";
import { ApiKeyScope } from "@/graphql/types";
import { gql, useMutation } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useCreateUserAPIKey() {
  const accessToken = useContext(AuthContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClientClient(accessToken);

  const [createApiKeyMutation, { loading, error }] = useMutation<
    CreateUserApiKeyMutation,
    CreateUserApiKeyMutationVariables
  >(
    gql`
      mutation CreateUserAPIKey($label: String!, $scopes: [String!]!) {
        createUserAPIKey(input: { label: $label, scopes: $scopes }) {
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
      refetchQueries: ["GetUserSettings"],
    }
  );

  if (error) {
    console.error("Apollo error while creating a user API key", error);
  }

  const createApiKey = async (label: string, scopes: ApiKeyScope[]) => {
    const response = await createApiKeyMutation({
      variables: { label, scopes },
    });

    assert(
      response?.data?.createUserAPIKey != null,
      "Workspace API key creation failed"
    );

    return response.data.createUserAPIKey.keyValue;
  };

  return { createApiKey, error, loading };
}

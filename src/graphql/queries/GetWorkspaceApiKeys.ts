import { AuthContext } from "@/components/AuthContext";
import {
  GetWorkspaceApiKeysQuery,
  GetWorkspaceApiKeysQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { ApiKey, ApiKeyScope } from "@/graphql/types";
import { ApolloError, gql, useQuery } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useGetWorkspaceApiKeys(workspaceId: string): {
  apiKeys: ApiKey[];
  error: ApolloError | undefined;
  loading: boolean;
} {
  const accessToken = useContext(AuthContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClient(accessToken);

  const { data, error, loading } = useQuery<
    GetWorkspaceApiKeysQuery,
    GetWorkspaceApiKeysQueryVariables
  >(
    gql`
      query GetWorkspaceApiKeys($workspaceId: ID!) {
        node(id: $workspaceId) {
          ... on Workspace {
            apiKeys {
              id
              createdAt
              label
              scopes
              recordingCount
              maxRecordings
            }
          }
        }
      }
    `,
    {
      client,
      variables: { workspaceId },
    }
  );

  const apiKeys: ApiKey[] = [];

  if (data?.node && "apiKeys" in data.node && data.node.apiKeys != null) {
    data.node.apiKeys.forEach((key) => {
      apiKeys.push({
        id: key.id,
        createdAt: new Date(key.createdAt),
        label: key.label,
        scopes: key.scopes as ApiKeyScope[],
        recordingCount: key.recordingCount,
        maxRecordings: key.maxRecordings ?? 0,
      });
    });
  }

  return { apiKeys, error, loading };
}

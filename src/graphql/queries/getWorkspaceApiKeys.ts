import { SessionContext } from "@/components/SessionContext";
import {
  GetWorkspaceApiKeysQuery,
  GetWorkspaceApiKeysQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { ApiKey, ApiKeyScope } from "@/graphql/types";
import { gql, useQuery } from "@apollo/client";
import assert from "assert";
import { useContext, useMemo } from "react";

export function useGetWorkspaceApiKeys(workspaceId: string) {
  const { accessToken } = useContext(SessionContext);
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
            id
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

  const apiKeys = useMemo<ApiKey[] | undefined>(() => {
    if (data) {
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

      return apiKeys;
    }
  }, [data]);

  return { apiKeys, error, loading };
}

import {
  GetWorkspaceApiKeysQuery,
  GetWorkspaceApiKeysQueryVariables,
} from "@/graphql/generated/graphql";
import { ApiKey, ApiKeyScope } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import { useMemo } from "react";

export function useGetWorkspaceApiKeys(workspaceId: string) {
  const { data, error, isLoading } = useGraphQLQuery<
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
    { workspaceId }
  );

  const apiKeys = useMemo<ApiKey[] | undefined>(() => {
    if (data) {
      const apiKeys: ApiKey[] = [];

      if (data?.node && "apiKeys" in data.node && data.node.apiKeys != null) {
        data.node.apiKeys.forEach(key => {
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

  return { apiKeys, error, isLoading };
}

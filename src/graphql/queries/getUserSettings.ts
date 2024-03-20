import { SessionContext } from "@/components/SessionContext";
import {
  GetUserSettingsQuery,
  GetUserSettingsQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { ApiKey, ApiKeyScope } from "@/graphql/types";
import { gql, useQuery } from "@apollo/client";
import assert from "assert";
import { useContext, useMemo } from "react";

export function useGetUserSettings() {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClient(accessToken);

  const { data, error, loading } = useQuery<
    GetUserSettingsQuery,
    GetUserSettingsQueryVariables
  >(
    gql`
      query GetUserSettings {
        viewer {
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
    `,
    {
      client,
    }
  );

  const apiKeys = useMemo<ApiKey[] | undefined>(() => {
    if (data) {
      const apiKeys: ApiKey[] = [];

      data?.viewer?.apiKeys?.forEach((key) => {
        apiKeys.push({
          id: key.id,
          createdAt: new Date(key.createdAt),
          label: key.label,
          scopes: key.scopes as ApiKeyScope[],
          recordingCount: key.recordingCount,
          maxRecordings: key.maxRecordings ?? 0,
        });
      });

      return apiKeys;
    }
  }, [data]);

  return { error, loading, settings: { apiKeys } };
}

import { SessionContext } from "@/components/SessionContext";
import {
  GetUserSettingsQuery,
  GetUserSettingsQueryVariables,
} from "@/graphql/generated/graphql";
import { ApiKey, ApiKeyScope } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import { useContext, useMemo } from "react";

export function useGetUserSettings() {
  const { accessToken } = useContext(SessionContext);
  const { data, error, isLoading } = useGraphQLQuery<
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
    `
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

  return { error, isLoading, settings: { apiKeys } };
}

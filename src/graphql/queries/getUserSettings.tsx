import { AuthContext } from "@/components/AuthContext";
import {
  GetUserSettingsQuery,
  GetUserSettingsQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientClient } from "@/graphql/graphQLClient";
import { ApiKey, ApiKeyScope, UserSettings } from "@/graphql/types";
import { ApolloError, gql, useQuery } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useGetUserSettings(): {
  error: ApolloError | undefined;
  loading: boolean;
  settings: UserSettings;
} {
  const accessToken = useContext(AuthContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClientClient(accessToken);

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

  return { error, loading, settings: { apiKeys } };
}

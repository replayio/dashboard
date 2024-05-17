import { GetWorkspaceQuery, GetWorkspaceQueryVariables } from "@/graphql/generated/graphql";
import { graphQLFetch } from "@/graphql/graphQLFetch";
import { gql } from "@apollo/client";
import assert from "assert";
import { MockGraphQLData } from "tests/mocks/types";

const QUERY = gql`
  query GetWorkspace($workspaceId: ID!) {
    node(id: $workspaceId) {
      ... on Workspace {
        id
        isOrganization
        isTest
        retentionLimit
      }
    }
  }
`;

export async function getWorkspace(
  accessToken: string,
  workspaceId: string,
  mockGraphQLData: MockGraphQLData | null
): Promise<{
  id: string;
  isOrganization: boolean;
  isTest: boolean;
  retentionLimit: number | null;
}> {
  const response = await graphQLFetch<GetWorkspaceQuery, GetWorkspaceQueryVariables>({
    accessToken,
    mockGraphQLData,
    query: QUERY,
    variables: { workspaceId },
  });

  assert(
    response.data?.node != null && "id" in response.data?.node,
    `Workspace not found for id "${workspaceId}"`
  );

  return {
    id: response.data?.node.id,
    isOrganization: response.data?.node.isOrganization,
    isTest: response.data?.node.isTest,
    retentionLimit: response.data?.node.retentionLimit ?? null,
  };
}

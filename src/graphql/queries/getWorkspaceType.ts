import { GetWorkspaceQuery, GetWorkspaceQueryVariables } from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { gql } from "@apollo/client";
import assert from "assert";
import { getMockGraphQLResponse } from "tests/mocks/getMockGraphQLResponse";
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
  const graphQLClient = getGraphQLClient(accessToken);

  const mockResponse = mockGraphQLData
    ? getMockGraphQLResponse<GetWorkspaceQuery>(mockGraphQLData, QUERY)
    : undefined;
  if (mockResponse?.data?.node?.__typename === "Workspace") {
    return {
      id: mockResponse.data.node.id,
      isOrganization: mockResponse.data.node.isOrganization,
      isTest: mockResponse.data.node.isTest,
      retentionLimit: mockResponse.data.node.retentionLimit ?? null,
    };
  }

  const response = await graphQLClient.query<GetWorkspaceQuery, GetWorkspaceQueryVariables>({
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

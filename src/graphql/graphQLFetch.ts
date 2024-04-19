import { URLS } from "@/constants";
import {
  ApolloQueryResult,
  OperationVariables,
  TypedDocumentNode,
} from "@apollo/client";
import assert from "assert";
import { DocumentNode } from "graphql";
import { getMockGraphQLResponse } from "tests/mocks/getMockGraphQLResponse";
import { MockGraphQLData } from "tests/mocks/types";

export async function graphQLFetch<
  Query,
  Variables extends OperationVariables = {}
>({
  accessToken,
  mockGraphQLData,
  query,
  variables = {} as Variables,
}: {
  accessToken?: string;
  mockGraphQLData: MockGraphQLData | null;
  query: DocumentNode | TypedDocumentNode<Query, Variables>;
  variables?: Variables;
}): Promise<ApolloQueryResult<Query>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // Support e2e tests
  const mockResponse = mockGraphQLData
    ? getMockGraphQLResponse(mockGraphQLData, query)
    : undefined;
  if (mockResponse) {
    return mockResponse;
  }

  assert(query.loc?.source.body);

  const response = await fetch(`${URLS.api}/v1/graphql`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: query.loc?.source.body,
      variables,
    }),
  });

  return await response.json();
}

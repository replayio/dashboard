import { URLS } from "@/constants";
import { getMockGraphQLData } from "@/globalMutableState";
import {
  ApolloQueryResult,
  OperationVariables,
  TypedDocumentNode,
} from "@apollo/client";
import assert from "assert";
import { DocumentNode } from "graphql";
import { getMockGraphQLResponse } from "tests/mocks/getMockGraphQLResponse";

export async function graphQLFetch<
  Query,
  Variables extends OperationVariables = {}
>({
  accessToken,
  query,
  variables = {} as Variables,
}: {
  accessToken?: string;
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
  const mockGraphQLData = getMockGraphQLData();
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

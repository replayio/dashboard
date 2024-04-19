import { URLS } from "@/constants";
import {
  ApolloQueryResult,
  OperationVariables,
  TypedDocumentNode,
} from "@apollo/client";
import assert from "assert";
import { DocumentNode } from "graphql";

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

  // TODO Support e2e tests

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

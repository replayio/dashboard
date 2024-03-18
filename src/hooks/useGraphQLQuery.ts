import { SessionContext } from "@/components/SessionContext";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import {
  ApolloError,
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  TypedDocumentNode,
  useQuery,
} from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useGraphQLQuery<
  Query,
  Variables extends OperationVariables = {}
>(
  query: DocumentNode | TypedDocumentNode<Query, Variables>,
  variables: Variables = {} as Variables,
  options: Omit<QueryHookOptions<Query, Variables>, "client" | "variables"> = {}
): {
  data: Query | undefined;
  error: ApolloError | undefined;
  isLoading: boolean;
} {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClient(accessToken);

  const {
    data,
    error,
    loading: isLoading,
  } = useQuery<Query, Variables>(query, { client, variables, ...options });

  return { data, error, isLoading };
}

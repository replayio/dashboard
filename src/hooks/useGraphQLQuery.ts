import { EndToEndTestContext } from "@/components/EndToEndTestContext";
import { SessionContext } from "@/components/SessionContext";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import {
  ApolloError,
  ApolloQueryResult,
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  TypedDocumentNode,
  useQuery,
} from "@apollo/client";
import assert from "assert";
import { useContext } from "react";
import { getMockData } from "../../tests/mocks/data";

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
  refetch: (
    variables?: Partial<Variables>
  ) => Promise<ApolloQueryResult<Query>>;
} {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClient(accessToken);

  // Support e2e tests
  const { mockKey } = useContext(EndToEndTestContext);

  // This looks like a rule violation, but mock data behavior is deterministic
  const {
    data,
    error,
    loading: isLoading,
    refetch,
  } = getMockData<Query>(mockKey, query) ??
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useQuery<Query, Variables>(query, { client, variables, ...options });

  return { data, error, isLoading, refetch };
}

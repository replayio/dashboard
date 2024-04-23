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
import { useContext } from "react";
import { getMockGraphQLResponse } from "../../tests/mocks/getMockGraphQLResponse";

export function useGraphQLQuery<Query, Variables extends OperationVariables = {}>(
  query: DocumentNode | TypedDocumentNode<Query, Variables>,
  variables: Variables = {} as Variables,
  options: Omit<QueryHookOptions<Query, Variables>, "client" | "variables"> = {}
): {
  data: Query | undefined;
  error: ApolloError | undefined;
  isLoading: boolean;
  refetch: (variables?: Partial<Variables>) => Promise<ApolloQueryResult<Query>>;
} {
  const { mockGraphQLData } = useContext(EndToEndTestContext);
  const { accessToken } = useContext(SessionContext);

  const client = getGraphQLClient(accessToken);

  // Support e2e tests
  const mockResponse = mockGraphQLData ? getMockGraphQLResponse(mockGraphQLData, query) : undefined;
  if (mockResponse) {
    return {
      data: mockResponse.data,
      error: mockResponse.error,
      isLoading: mockResponse.loading,
      refetch: async () => mockResponse,
    };
  }

  const {
    data,
    error,
    loading: isLoading,
    refetch,
    // This looks like a rule violation, but mock data behavior is deterministic
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery<Query, Variables>(query, { client, variables, ...options });

  return { data, error, isLoading, refetch };
}

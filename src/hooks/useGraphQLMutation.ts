import { EndToEndTestContext } from "@/components/EndToEndTestContext";
import { SessionContext } from "@/components/SessionContext";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import {
  ApolloError,
  DocumentNode,
  MutationFunction,
  MutationHookOptions,
  OperationVariables,
  TypedDocumentNode,
  useMutation,
} from "@apollo/client";
import assert from "assert";
import { useContext } from "react";
import { getMockGraphQLResponse } from "tests/mocks/getMockGraphQLResponse";

export function useGraphQLMutation<Query, Variables extends OperationVariables = {}>(
  query: DocumentNode | TypedDocumentNode<Query, Variables>,
  options: Omit<MutationHookOptions<Query, Variables>, "client"> = {}
): {
  error: ApolloError | undefined;
  isLoading: boolean;
  mutate: MutationFunction<Query, Variables>;
} {
  const { mockGraphQLData } = useContext(EndToEndTestContext);
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClient(accessToken);

  const [mutate, { error, loading: isLoading }] = useMutation<Query, Variables>(query, {
    client,
    ...options,
  });

  // Support e2e tests
  const mockResponse = mockGraphQLData ? getMockGraphQLResponse(mockGraphQLData, query) : undefined;
  if (mockResponse) {
    const mutate = async () => {
      return {
        called: true,
        client: undefined as any,
        data: mockResponse.data,
        error: mockResponse.error,
        loading: mockResponse.loading,
        reset: undefined as any,
      };
    };

    return {
      error: mockResponse.error,
      isLoading: mockResponse.loading,
      mutate,
    };
  }

  return { error, isLoading, mutate };
}

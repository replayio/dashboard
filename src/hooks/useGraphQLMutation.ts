import { useApolloClient } from "@/components/ApolloContext";
import { EndToEndTestContext } from "@/components/EndToEndTestContext";
import {
  ApolloError,
  DocumentNode,
  FetchResult,
  MutationFunction,
  MutationHookOptions,
  OperationVariables,
  TypedDocumentNode,
  useMutation,
} from "@apollo/client";
import { GraphQLError } from "graphql";
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
  const client = useApolloClient();

  const [mutate, { error, loading: isLoading }] = useMutation<Query, Variables>(query, {
    client,
    ...options,
  });

  // Support e2e tests
  // WARNING: this doesn't quite mimick the real user flow
  // usually the data/error would get returned asynchronously when the mutations happens
  // we are returning it here synchronously so the initial HTML comes "preresolved"
  // so it can be different from the one that would be returned in equivalen scenario in production
  const mockResponse = mockGraphQLData ? getMockGraphQLResponse(mockGraphQLData, query) : undefined;
  if (mockResponse) {
    const mutate: MutationFunction<Query, Variables> = async () => {
      return {
        data: mockResponse.data,
        errors: mockResponse.error ? [mockResponse.error as any as GraphQLError] : [],
      } satisfies FetchResult<Query>;
    };

    return {
      error: mockResponse.error,
      isLoading: mockResponse.loading,
      mutate,
    };
  }

  return { error, isLoading, mutate };
}

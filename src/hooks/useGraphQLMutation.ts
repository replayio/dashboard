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

export function useGraphQLMutation<
  Query,
  Variables extends OperationVariables = {}
>(
  query: DocumentNode | TypedDocumentNode<Query, Variables>,
  options: Omit<MutationHookOptions<Query, Variables>, "client"> = {}
): {
  error: ApolloError | undefined;
  isLoading: boolean;
  mutate: MutationFunction<Query, Variables>;
} {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClient(accessToken);

  const [mutate, { error, loading: isLoading }] = useMutation<Query, Variables>(
    query,
    { client, ...options }
  );

  return { error, isLoading, mutate };
}

import {
  ApolloQueryResult,
  DocumentNode,
  NetworkStatus,
  TypedDocumentNode,
} from "@apollo/client";
import { MockData, MockDataKey } from "./types";

export function getMockGraphQLResponse<Query>(
  mockGraphQLData: MockData,
  query: DocumentNode | TypedDocumentNode<Query, any>
): ApolloQueryResult<Query> | undefined | undefined {
  const definition = query.definitions[0];
  if (definition && "name" in definition && definition.name) {
    const queryName = definition.name.value;
    const value = mockGraphQLData[queryName as MockDataKey];
    if (value) {
      const response = {
        data: value as any,
        error: undefined,
        loading: false,
        networkStatus: NetworkStatus.ready,
        refetch: async () => response,
      };

      return response;
    }
  }
}

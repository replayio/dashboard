import {
  DocumentNode,
  NetworkStatus,
  QueryResult,
  TypedDocumentNode,
} from "@apollo/client";
import { MOCK_DATA, MockData, MockDataKey, MockGraphQLQueryKey } from "./data";

export function getMockData<Query>(
  mockKey: MockDataKey | null,
  query: DocumentNode | TypedDocumentNode<Query, any>
):
  | Pick<QueryResult<Query, any>, "data" | "error" | "loading" | "refetch">
  | undefined {
  const mockQueries = mockKey ? MOCK_DATA[mockKey] : undefined;
  if (mockQueries) {
    const definition = query.definitions[0];
    if (definition && "name" in definition && definition.name) {
      const queryName = definition.name.value;
      const mockData = (mockQueries as MockData)[
        queryName as MockGraphQLQueryKey
      ];
      if (mockData) {
        return {
          data: mockData as any,
          error: undefined,
          loading: false,
          refetch: async () => ({
            data: mockData as any,
            error: undefined,
            loading: false,
            networkStatus: NetworkStatus.ready,
          }),
        };
      }
    }
  }
}

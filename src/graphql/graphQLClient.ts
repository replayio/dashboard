import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

let graphQLClient: ApolloClient<NormalizedCacheObject>;

export function getGraphQLClient(accessToken: string) {
  if (graphQLClient == null) {
    graphQLClient = new ApolloClient({
      cache: new InMemoryCache(),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Replay-Client-Id": "196a9e7b-dba5-46ee-8b81-fac66991f431",
      },
      uri: "https://api.replay.io/v1/graphql",
    });
  }

  return graphQLClient;
}

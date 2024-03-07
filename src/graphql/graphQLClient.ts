import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

export let graphQLClient: ApolloClient<NormalizedCacheObject>;

export function configureGraphQLClient(accessToken: string) {
  graphQLClient = new ApolloClient({
    uri: "https://api.replay.io/v1/graphql",
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Replay-Client-Id": "196a9e7b-dba5-46ee-8b81-fac66991f431",
    },
  });
}

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { loadDevMessages, loadErrorMessageHandler } from "@apollo/client/dev";

if (process.env.NODE_ENV === "development") {
  loadDevMessages();
  loadErrorMessageHandler();
}

let graphQLClient: ApolloClient<NormalizedCacheObject>;

export function getGraphQLClient(accessToken: string) {
  if (graphQLClient == null) {
    graphQLClient = new ApolloClient({
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              viewer: {
                merge: true,
              },
            },
          },
          AuthenticatedUser: {
            merge: true,
          },
          Recording: {
            keyFields: ["uuid"],
            fields: {
              comments: {
                merge: false,
              },
            },
          },
          Comment: {
            fields: {
              replies: {
                merge: false,
              },
            },
          },
        },
      }),
      defaultOptions: {
        query: {
          fetchPolicy: "cache-first",
        },
      },
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

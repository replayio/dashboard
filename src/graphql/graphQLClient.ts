import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  from,
} from "@apollo/client";
import { loadDevMessages, loadErrorMessageHandler } from "@apollo/client/dev";
import { RetryLink } from "@apollo/client/link/retry";

if (process.env.NODE_ENV === "development") {
  loadDevMessages();
  loadErrorMessageHandler();
}

let graphQLClient: ApolloClient<NormalizedCacheObject>;

export function getGraphQLClient(accessToken: string) {
  if (graphQLClient == null) {
    const httpLink = createHttpLink({
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Replay-Client-Id": "196a9e7b-dba5-46ee-8b81-fac66991f431",
      },
      uri: "https://api.replay.io/v1/graphql",
    });
    const retryLink = new RetryLink({
      attempts: {
        retryIf: (error) => {
          // GraphQL errors appear in error?.result?.errors.
          // We don't want to retry requests that failed due to GraphQL errors.
          return !error?.result?.errors?.length;
        },
      },
    });

    graphQLClient = new ApolloClient({
      cache: new InMemoryCache({
        typePolicies: {
          AuthenticatedUser: {
            merge: true,
          },
          Comment: {
            fields: {
              replies: {
                merge: false,
              },
            },
          },
          Query: {
            fields: {
              viewer: {
                merge: true,
              },
            },
          },
          Recording: {
            keyFields: ["uuid"],
            fields: {
              comments: {
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
      link: from([httpLink, retryLink]),
    });
  }

  return graphQLClient;
}

import { URLS } from "@/constants";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  from,
} from "@apollo/client";
import { loadDevMessages, loadErrorMessageHandler } from "@apollo/client/dev";
import { RetryLink } from "@apollo/client/link/retry";
import { v4 as uuid } from "uuid";

if (process.env.NODE_ENV === "development") {
  loadDevMessages();
  loadErrorMessageHandler();
}

let graphQLClientAccessToken: string | undefined;
let graphQLClient: ApolloClient<NormalizedCacheObject>;

// Generate a client ID so that we can easily filter backend requests down to a specific browser tab
// This can be thought of as a session identifier
const clientId = uuid();

export function getGraphQLClient(accessToken?: string) {
  if (graphQLClient == null || graphQLClientAccessToken !== accessToken) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Replay-Client-Id": clientId,
    };
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    const httpLink = createHttpLink({
      headers,
      uri: `${URLS.api}/v1/graphql`,
    });
    const retryLink = new RetryLink({
      attempts: {
        retryIf: error => {
          // GraphQL errors appear in error?.result?.errors.
          // We don't want to retry requests that failed due to GraphQL errors.
          return !error?.result?.errors?.length;
        },
      },
    });

    graphQLClientAccessToken = accessToken;
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
          fetchPolicy: "network-only",
        },
      },
      link: from([retryLink, httpLink]),
    });
  }

  return graphQLClient;
}

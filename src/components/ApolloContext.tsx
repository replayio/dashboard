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
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

if (process.env.NODE_ENV === "development") {
  loadDevMessages();
  loadErrorMessageHandler();
}

export const ApolloContext = createContext<ApolloClient<NormalizedCacheObject>>(null as any);

function createApolloCache() {
  return new InMemoryCache({
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
  });
}

function createApolloLink(accessToken: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (typeof window !== "undefined") {
    // Generate a client ID so that we can easily filter backend requests down to a specific browser tab
    // This can be thought of as a session identifier
    headers["Replay-Client-Id"] = uuid();
  }
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
  return from([retryLink, httpLink]);
}

function createApolloClient(cache: ReturnType<typeof createApolloCache>, accessToken: string) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache,
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
      },
    },
    link: createApolloLink(accessToken),
  });
}

export function ApolloContextProvider({
  accessToken,
  children,
}: PropsWithChildren<{ accessToken: string }>) {
  const [currentToken, setCurrentToken] = useState(accessToken);
  const [cache] = useState(createApolloCache);
  const [client, setClient] = useState(() => createApolloClient(cache, accessToken));

  // when the access token changes rerender asap with the new client but with a reused cache
  if (accessToken !== currentToken) {
    setCurrentToken(accessToken);
    setClient(createApolloClient(cache, accessToken));
  }

  return <ApolloContext.Provider value={client}>{children}</ApolloContext.Provider>;
}

export function useApolloClient() {
  return useContext(ApolloContext);
}

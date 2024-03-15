import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { getAccessToken } from "@auth0/nextjs-auth0";
import assert from "assert";

let graphQLClient: ApolloClient<NormalizedCacheObject>;

export function getGraphQLClientClient(accessToken: string) {
  if (graphQLClient == null) {
    graphQLClient = new ApolloClient({
      uri: "https://api.replay.io/v1/graphql",
      cache: new InMemoryCache({
        resultCaching: false,
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Replay-Client-Id": "196a9e7b-dba5-46ee-8b81-fac66991f431",
      },
    });
  }

  return graphQLClient;
}

export async function getGraphQLClientServer(): Promise<
  ApolloClient<NormalizedCacheObject>
> {
  if (graphQLClient == null) {
    const { accessToken } = await getAccessToken();
    assert(accessToken, "accessToken is required");

    getGraphQLClientClient(accessToken);
  }

  return graphQLClient;
}

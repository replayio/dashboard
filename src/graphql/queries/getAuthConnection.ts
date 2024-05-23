import {
  GetAuthConnectionQuery,
  GetAuthConnectionQueryVariables,
} from "@/graphql/generated/graphql";
import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";

const QUERY = gql`
  query GetAuthConnection($email: String!) {
    auth {
      connection(email: $email)
    }
  }
`;

export async function getAuthConnection(
  client: ApolloClient<NormalizedCacheObject>,
  email: string
): Promise<string | null> {
  const response = await client.query<GetAuthConnectionQuery, GetAuthConnectionQueryVariables>({
    query: QUERY,
    variables: { email },
  });

  return response.data?.auth?.connection ?? null;
}

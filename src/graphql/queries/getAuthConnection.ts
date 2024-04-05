import {
  GetAuthConnectionQuery,
  GetAuthConnectionQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { gql } from "@apollo/client";

const QUERY = gql`
  query GetAuthConnection($email: String!) {
    auth {
      connection(email: $email)
    }
  }
`;

export async function getAuthConnection(email: string): Promise<string | null> {
  const graphQLClient = getGraphQLClient();

  const response = await graphQLClient.query<
    GetAuthConnectionQuery,
    GetAuthConnectionQueryVariables
  >({
    query: QUERY,
    variables: { email },
  });

  return response.data?.auth?.connection ?? null;
}

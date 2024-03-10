import { GetUserQuery } from "@/graphql/generated/graphql";
import { getGraphQLClientServer } from "@/graphql/graphQLClient";
import { User } from "@/graphql/types";
import { gql } from "@apollo/client";
import assert from "assert";

export async function getCurrentUserServer(): Promise<User> {
  const graphQLClient = await getGraphQLClientServer();
  const response = await graphQLClient.query<GetUserQuery>({
    query: gql`
      query GetUser {
        viewer {
          email
          internal
          nags
          user {
            name
            picture
            id
          }
        }
      }
    `,
  });

  assert(response.data?.viewer?.user, "User could not be loaded");

  return {
    email: response.data.viewer.email,
    id: response.data.viewer.user.id,
    isInternal: response.data.viewer.internal,
    nags: response.data.viewer.nags,
    name: response.data.viewer.user.name ?? "",
    picture: response.data.viewer.user.picture ?? "",
  };
}

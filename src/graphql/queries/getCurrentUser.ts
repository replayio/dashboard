import { graphQLClient } from "@/graphql/graphQLClient";
import {
  GetNonPendingWorkspacesQuery,
  GetUserQuery,
} from "@/graphql/generated/graphql";
import { gql } from "@apollo/client";
import assert from "assert";

export async function getCurrentUser() {
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
    internal: response.data.viewer.internal,
    nags: response.data.viewer.nags,
    ...response.data.viewer.user,
  };
}

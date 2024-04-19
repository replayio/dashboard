import {
  GetUserQuery,
  GetUserQueryVariables,
} from "@/graphql/generated/graphql";
import { graphQLFetch } from "@/graphql/graphQLFetch";
import { gql } from "@apollo/client";

export async function getCurrentUser(accessToken: string) {
  const { data, errors } = await graphQLFetch<
    GetUserQuery,
    GetUserQueryVariables
  >({
    accessToken,
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

  if (errors?.length) {
    throw new Error(errors[0]?.message);
  }

  return data.viewer
    ? {
        email: data.viewer.email,
        id: data.viewer.user.id,
        isInternal: data.viewer.internal,
        nags: data.viewer.nags,
        name: data.viewer.user.name ?? "",
        picture: data.viewer.user.picture ?? "",
      }
    : null;
}

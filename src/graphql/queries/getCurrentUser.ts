import { GetUserQuery, GetUserQueryVariables } from "@/graphql/generated/graphql";
import { graphQLQuery } from "@/graphql/graphQLQuery";
import { gql } from "@apollo/client";
import { MockGraphQLData } from "tests/mocks/types";

export async function getCurrentUser(accessToken: string, mockGraphQLData: MockGraphQLData | null) {
  const { data, errors } = await graphQLQuery<GetUserQuery, GetUserQueryVariables>({
    accessToken,
    mockGraphQLData,
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

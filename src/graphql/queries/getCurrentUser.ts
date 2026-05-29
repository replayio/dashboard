import { GetUserQuery, GetUserQueryVariables } from "@/graphql/generated/graphql";
import { graphQLQuery } from "@/graphql/graphQLQuery";
import { DEV_SEED_TOKEN, DEV_SEED_USER } from "@/lib/dev-seed";
import { gql } from "@apollo/client";
import { MockGraphQLData } from "@/testing/mockGraphQLTypes";

export async function getCurrentUser(accessToken: string, mockGraphQLData: MockGraphQLData | null) {
  // Dev-seed bypass: return the hardcoded seed user without hitting GraphQL.
  // DEV_SEED_ENABLED is already gated in middleware before we even get here,
  // but we also check the sentinel token directly for defence-in-depth.
  if (accessToken === DEV_SEED_TOKEN) {
    return DEV_SEED_USER;
  }

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

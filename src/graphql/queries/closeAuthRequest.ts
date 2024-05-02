import {
  CloseAuthRequestMutation,
  CloseAuthRequestMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
} from "@/graphql/generated/graphql";
import { graphQLFetch } from "@/graphql/graphQLFetch";
import { gql } from "@apollo/client";

export async function closeAuthRequest(key: string) {
  const { data, errors } = await graphQLFetch<
    CloseAuthRequestMutation,
    CloseAuthRequestMutationVariables
  >({
    mockGraphQLData: null,
    query: gql`
      mutation CloseAuthRequest($key: String!) {
        closeAuthRequest(input: { key: $key }) {
          success
          token
        }
      }
    `,
    variables: {
      key,
    },
  });

  if (errors?.length) {
    throw new Error(errors[0]?.message);
  }

  return data.closeAuthRequest.token;
}

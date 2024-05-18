import {
  CloseAuthRequestMutation,
  CloseAuthRequestMutationVariables,
} from "@/graphql/generated/graphql";
import { graphQLQuery } from "@/graphql/graphQLQuery";
import { gql } from "@apollo/client";

export async function closeAuthRequest(key: string) {
  const { data, errors } = await graphQLQuery<
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

import {
  InitAutRequestMutation,
  InitAutRequestMutationVariables,
} from "@/graphql/generated/graphql";
import { graphQLQuery } from "@/graphql/graphQLQuery";
import { gql } from "@apollo/client";

export async function initAuthRequest(key: string, source: string) {
  const { data, errors } = await graphQLQuery<
    InitAutRequestMutation,
    InitAutRequestMutationVariables
  >({
    mockGraphQLData: null,
    query: gql`
      mutation InitAutRequest($key: String!, $source: String = "browser") {
        initAuthRequest(input: { key: $key, source: $source }) {
          id
          challenge
          serverKey
        }
      }
    `,
    variables: {
      key,
      source,
    },
  });

  if (errors?.length) {
    throw new Error(errors[0]?.message);
  }

  return data.initAuthRequest;
}

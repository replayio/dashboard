import {
  InitAutRequestMutation,
  InitAutRequestMutationVariables,
} from "@/graphql/generated/graphql";
import { graphQLFetch } from "@/graphql/graphQLFetch";
import { gql } from "@apollo/client";

export async function initAuthRequest(key: string, source: string) {
  const { data, errors } = await graphQLFetch<
    InitAutRequestMutation,
    InitAutRequestMutationVariables
  >({
    // TODO Support e2e test mock mutations
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

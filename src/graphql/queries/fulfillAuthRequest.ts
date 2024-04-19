import {
  FulfillAuthRequestMutation,
  FulfillAuthRequestMutationVariables,
} from "@/graphql/generated/graphql";
import { graphQLFetch } from "@/graphql/graphQLFetch";
import { gql } from "@apollo/client";

export async function fulfillAuthRequest(id: string, token: string) {
  const { data, errors } = await graphQLFetch<
    FulfillAuthRequestMutation,
    FulfillAuthRequestMutationVariables
  >({
    // TODO Support e2e test mock mutations
    mockGraphQLData: null,
    query: gql`
      mutation FulfillAuthRequest(
        $secret: String!
        $id: String!
        $token: String!
      ) {
        fulfillAuthRequest(input: { secret: $secret, id: $id, token: $token }) {
          success
          source
        }
      }
    `,
    variables: {
      secret: process.env.FRONTEND_API_SECRET!,
      id,
      token,
    },
  });

  if (errors && errors.length > 0) {
    throw new Error(errors[0]?.message);
  }

  if (!data.fulfillAuthRequest.success) {
    throw new Error("Failed to fulfill authentication request");
  }

  return data.fulfillAuthRequest.source;
}

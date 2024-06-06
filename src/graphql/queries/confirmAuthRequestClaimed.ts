import {
  GetAuthRequestStatusQuery,
  GetAuthRequestStatusQueryVariables,
} from "@/graphql/generated/graphql";
import { graphQLQuery } from "@/graphql/graphQLQuery";
import { gql } from "@apollo/client";

export async function confirmAuthRequestClaimed(id: string) {
  const { data, errors } = await graphQLQuery<
    GetAuthRequestStatusQuery,
    GetAuthRequestStatusQueryVariables
  >({
    mockGraphQLData: null,
    query: gql`
      query GetAuthRequestStatus($id: String!) {
        authRequestStatus(id: $id) {
          open
        }
      }
    `,
    variables: {
      id,
    },
  });

  if (errors?.length) {
    console.error(errors);

    return false;
  }

  return data?.authRequestStatus?.open === false;
}

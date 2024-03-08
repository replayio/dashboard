import { GetNonPendingWorkspacesQuery } from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { gql } from "@apollo/client";

export async function getNonPendingWorkspaces() {
  const graphQLClient = await getGraphQLClient();
  const response = await graphQLClient.query<GetNonPendingWorkspacesQuery>({
    query: gql`
      query GetNonPendingWorkspaces {
        viewer {
          workspaces {
            edges {
              node {
                id
                name
                isTest
              }
            }
          }
        }
      }
    `,
  });

  return (
    response.data.viewer?.workspaces.edges.map(({ node }) => {
      return node;
    }) ?? []
  );
}

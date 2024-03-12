import { GetNonPendingWorkspacesQuery } from "@/graphql/generated/graphql";
import { getGraphQLClientServer } from "@/graphql/graphQLClient";
import { gql } from "@apollo/client";

export async function getNonPendingWorkspacesServer() {
  const graphQLClient = await getGraphQLClientServer();
  const response = await graphQLClient.query<GetNonPendingWorkspacesQuery>({
    query: gql`
      query GetNonPendingWorkspaces {
        viewer {
          workspaces {
            edges {
              node {
                id
                invitationCode
                isTest
                name
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

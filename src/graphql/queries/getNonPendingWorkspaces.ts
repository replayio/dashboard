import { client } from "@/graphql/client";
import { GetNonPendingWorkspacesQuery } from "@/graphql/generated/graphql";
import { gql } from "@apollo/client";

export async function getNonPendingWorkspaces() {
  const response = await client.query<GetNonPendingWorkspacesQuery>({
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

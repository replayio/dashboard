import { GetPendingWorkspacesQuery } from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { gql } from "@apollo/client";
import { PendingWorkspace } from "../types";

type PendingWorkspaceInvitation = NonNullable<
  GetPendingWorkspacesQuery["viewer"]
>["workspaceInvitations"]["edges"][number]["node"];

export const QUERY = gql`
  query GetPendingWorkspaces {
    viewer {
      workspaceInvitations {
        edges {
          node {
            workspace {
              id
              name
              recordingCount
              isOrganization
              isTest
            }
            inviterEmail
          }
        }
      }
    }
  }
`;

export function toPendingWorkspace(node: PendingWorkspaceInvitation): PendingWorkspace {
  return {
    id: node.workspace.id,
    inviterEmail: node.inviterEmail ?? null,
    isOrganization: node.workspace.isOrganization,
    isTest: node.workspace.isTest,
    name: node.workspace.name,
  };
}

export async function getPendingWorkspaces(accessToken: string): Promise<PendingWorkspace[]> {
  const graphQLClient = getGraphQLClient(accessToken);

  const { data, error } = await graphQLClient.query<GetPendingWorkspacesQuery>({
    query: QUERY,
  });

  if (error) {
    throw error;
  }
  if (!data.viewer) {
    throw new Error("No viewer found");
  }

  return data.viewer.workspaceInvitations.edges.map(({ node }) => {
    return toPendingWorkspace(node);
  });
}

import { GetPendingWorkspacesQuery } from "@/graphql/generated/graphql";
import { PendingWorkspace, Workspace } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import { useMemo } from "react";

export function usePendingWorkspaces() {
  const { data, error, isLoading } = useGraphQLQuery<GetPendingWorkspacesQuery>(
    gql`
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
    `
  );

  const workspaces = useMemo<PendingWorkspace[] | undefined>(() => {
    if (data) {
      return (
        data.viewer?.workspaceInvitations.edges.map(({ node }) => {
          return {
            id: node.workspace.id,
            inviterEmail: node.inviterEmail ?? null,
            isOrganization: node.workspace.isOrganization,
            isTest: node.workspace.isTest,
            name: node.workspace.name,
          };
        }) ?? []
      );
    }
  }, [data]);

  return { error, isLoading, workspaces };
}

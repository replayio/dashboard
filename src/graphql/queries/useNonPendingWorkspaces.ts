import { GetNonPendingWorkspacesQuery } from "@/graphql/generated/graphql";
import { Workspace } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import { useMemo } from "react";

export function useNonPendingWorkspaces() {
  const { data, error, isLoading } =
    useGraphQLQuery<GetNonPendingWorkspacesQuery>(
      gql`
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
      `
    );

  const workspaces = useMemo<Workspace[] | undefined>(() => {
    if (data) {
      return (
        data.viewer?.workspaces.edges.map(({ node }) => {
          return {
            id: node.id,
            invitationCode: node.invitationCode ?? null,
            isTest: node.isTest,
            name: node.name,
          };
        }) ?? []
      );
    }
  }, [data]);

  return { error, isLoading, workspaces };
}

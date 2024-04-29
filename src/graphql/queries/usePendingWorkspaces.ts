import { GetPendingWorkspacesQuery } from "@/graphql/generated/graphql";
import { PendingWorkspace } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { useMemo } from "react";
import { QUERY, toPendingWorkspace } from "./getPendingWorkspaces";

export function usePendingWorkspaces() {
  const { data, error, isLoading } = useGraphQLQuery<GetPendingWorkspacesQuery>(QUERY);

  const workspaces = useMemo<PendingWorkspace[] | undefined>(() => {
    if (data) {
      return (
        data.viewer?.workspaceInvitations.edges.map(({ node }) => {
          return toPendingWorkspace(node);
        }) ?? []
      );
    }
  }, [data]);

  return { error, isLoading, workspaces };
}

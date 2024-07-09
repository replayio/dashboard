import {
  GetWorkspaceMembershipRequestsQuery,
  GetWorkspaceMembershipRequestsQueryVariables,
} from "@/graphql/generated/graphql";
import { PendingWorkspaceMember } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import { useMemo } from "react";

export const QUERY = gql`
  query GetWorkspaceMembershipRequests($workspaceId: ID!) {
    node(id: $workspaceId) {
      ... on Workspace {
        id
        membershipRequests {
          edges {
            node {
              id
              user {
                id
                name
                picture
              }
            }
          }
        }
      }
    }
  }
`;

export function useGetWorkspaceMembershipRequests(workspaceId: string) {
  const { data, error, isLoading, refetch } = useGraphQLQuery<
    GetWorkspaceMembershipRequestsQuery,
    GetWorkspaceMembershipRequestsQueryVariables
  >(QUERY, {
    workspaceId,
  });

  const pendingWorkspaceMembers = useMemo<PendingWorkspaceMember[] | undefined>(() => {
    if (data?.node?.__typename === "Workspace") {
      return data.node.membershipRequests?.edges.map(({ node }) => ({
        id: node.id,
        name: node.user.name || "",
        picture: node.user.picture || null,
      }));
    }
  }, [data]);

  return { error, isLoading, pendingWorkspaceMembers, refetch };
}

import {
  GetWorkspaceMembersQuery,
  GetWorkspaceMembersQueryVariables,
} from "@/graphql/generated/graphql";
import { WorkspaceMember } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import { useMemo } from "react";

export function useGetWorkspaceMembers(workspaceId: string) {
  const { data, error, isLoading } = useGraphQLQuery<
    GetWorkspaceMembersQuery,
    GetWorkspaceMembersQueryVariables
  >(
    gql`
      query GetWorkspaceMembers($workspaceId: ID!) {
        node(id: $workspaceId) {
          ... on Workspace {
            id
            members {
              edges {
                node {
                  ... on WorkspacePendingEmailMember {
                    __typename
                    id
                    roles
                    email
                    createdAt
                  }
                  ... on WorkspacePendingUserMember {
                    __typename
                    id
                    roles
                    user {
                      id
                      name
                      picture
                    }
                  }
                  ... on WorkspaceUserMember {
                    __typename
                    id
                    roles
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
      }
    `,
    { workspaceId }
  );

  const members = useMemo<WorkspaceMember[] | undefined>(() => {
    if (data) {
      const members: WorkspaceMember[] = [];

      if (data?.node && "members" in data?.node && data.node.members) {
        data.node.members.edges.forEach(({ node }) => {
          if ("user" in node) {
            members.push({
              id: node.user.id,
              isPending: node.__typename === "WorkspacePendingUserMember",
              name: node.user.name ?? "User",
              picture: node.user.picture ?? null,
              roles: node.roles,
            });
          } else {
            members.push({
              id: node.id,
              isPending: true,
              name: node.email,
              picture: null,
              roles: node.roles,
            });
          }
        });
      }
      return members;
    }
  }, [data]);

  return { error, isLoading, members };
}

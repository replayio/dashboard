import { SessionContext } from "@/components/SessionContext";
import {
  GetWorkspaceMembersQuery,
  GetWorkspaceMembersQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { WorkspaceMember } from "@/graphql/types";
import { ApolloError, gql, useQuery } from "@apollo/client";
import assert from "assert";
import { useContext, useMemo } from "react";

export function useGetWorkspaceMembers(workspaceId: string) {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClient(accessToken);

  const { data, error, loading } = useQuery<
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
    {
      client,
      variables: { workspaceId },
    }
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

  return { error, members, loading };
}

import { AuthContext } from "@/components/AuthContext";
import {
  GetWorkspaceMembersQuery,
  GetWorkspaceMembersQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientClient } from "@/graphql/graphQLClient";
import { WorkspaceMember } from "@/graphql/types";
import { ApolloError, gql, useQuery } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useGetWorkspaceMembers(workspaceId: string): {
  error: ApolloError | undefined;
  loading: boolean;
  members: WorkspaceMember[];
} {
  const accessToken = useContext(AuthContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClientClient(accessToken);

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

  const members: WorkspaceMember[] = [];

  if (data?.node && "members" in data?.node && data.node.members) {
    data.node.members.edges.forEach(({ node }) => {
      if ("user" in node) {
        members.push({
          isPending: node.__typename === "WorkspacePendingUserMember",
          name: node.user.name ?? "User",
          picture: node.user.picture ?? null,
          roles: node.roles,
        });
      } else {
        members.push({
          isPending: true,
          name: node.email,
          picture: null,
          roles: node.roles,
        });
      }
    });
  }

  return { error, members, loading };
}

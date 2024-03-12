import { AuthContext } from "@/components/AuthContext";
import {
  InviteWorkspaceMemberMutation,
  InviteWorkspaceMemberMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientClient } from "@/graphql/graphQLClient";
import { gql, useMutation } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useInviteWorkspaceMember(onCompleted: () => void) {
  const accessToken = useContext(AuthContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClientClient(accessToken);

  const [inviteWorkspaceMemberMutation, { loading, error }] = useMutation<
    InviteWorkspaceMemberMutation,
    InviteWorkspaceMemberMutationVariables
  >(
    gql`
      mutation InviteWorkspaceMember(
        $email: String!
        $workspaceId: ID!
        $roles: [String!]
      ) {
        addWorkspaceMember(
          input: { email: $email, workspaceId: $workspaceId, roles: $roles }
        ) {
          success
        }
      }
    `,
    {
      client,
      refetchQueries: ["GetWorkspaceMembers"],
      onCompleted,
    }
  );

  if (error) {
    console.error("Apollo error while adding a collaborator", error);
  }

  const inviteWorkspaceMember = (workspaceId: string, email: string) =>
    inviteWorkspaceMemberMutation({ variables: { email, workspaceId } });

  return { inviteWorkspaceMember, error, loading };
}

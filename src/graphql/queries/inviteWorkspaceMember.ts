import { SessionContext } from "@/components/SessionContext";
import {
  InviteWorkspaceMemberMutation,
  InviteWorkspaceMemberMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { gql, useMutation } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useInviteWorkspaceMember(onCompleted: () => void) {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClient(accessToken);

  const [inviteWorkspaceMemberMutation, { loading, error }] = useMutation<
    InviteWorkspaceMemberMutation,
    InviteWorkspaceMemberMutationVariables
  >(
    gql`
      mutation InviteWorkspaceMember($email: String!, $workspaceId: ID!, $roles: [String!]) {
        addWorkspaceMember(input: { email: $email, workspaceId: $workspaceId, roles: $roles }) {
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

  const inviteWorkspaceMember = (workspaceId: string, email: string) =>
    inviteWorkspaceMemberMutation({ variables: { email, workspaceId } });

  return { inviteWorkspaceMember, error, loading };
}

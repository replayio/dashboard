import {
  AcceptPendingWorkspaceInvitationMutation,
  AcceptPendingWorkspaceInvitationMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { gql } from "@apollo/client";

export async function acceptPendingWorkspaceInvitation(
  accessToken: string,
  workspaceId: string
): Promise<boolean> {
  const graphQLClient = getGraphQLClient(accessToken);

  const response = await graphQLClient.mutate<
    AcceptPendingWorkspaceInvitationMutation,
    AcceptPendingWorkspaceInvitationMutationVariables
  >({
    mutation: gql`
      mutation AcceptPendingWorkspaceInvitation($workspaceId: ID!) {
        acceptWorkspaceMembership(input: { id: $workspaceId }) {
          success
        }
      }
    `,
    refetchQueries: ["GetNonPendingWorkspaces", "GetPendingWorkspaces"],
    variables: { workspaceId },
  });

  return response.data?.acceptWorkspaceMembership?.success == true;
}

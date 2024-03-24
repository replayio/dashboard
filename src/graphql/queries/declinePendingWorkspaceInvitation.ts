import {
  DeclinePendingWorkspaceInvitationMutation,
  DeclinePendingWorkspaceInvitationMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { gql } from "@apollo/client";

export async function declinePendingWorkspaceInvitation(
  accessToken: string,
  workspaceId: string
): Promise<boolean> {
  const graphQLClient = getGraphQLClient(accessToken);

  const response = await graphQLClient.mutate<
    DeclinePendingWorkspaceInvitationMutation,
    DeclinePendingWorkspaceInvitationMutationVariables
  >({
    mutation: gql`
      mutation DeclinePendingWorkspaceInvitation($workspaceId: ID!) {
        rejectWorkspaceMembership(input: { id: $workspaceId }) {
          success
        }
      }
    `,
    refetchQueries: ["GetNonPendingWorkspaces", "GetPendingWorkspaces"],
    variables: { workspaceId },
  });

  return response.data?.rejectWorkspaceMembership?.success == true;
}

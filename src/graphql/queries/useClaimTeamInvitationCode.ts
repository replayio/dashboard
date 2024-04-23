import {
  ClaimTeamInvitationCodeMutation,
  ClaimTeamInvitationCodeMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import { useCallback } from "react";

export function useClaimTeamInvitationCode(onCompleted: (workspaceId: string) => void) {
  const {
    error,
    isLoading,
    mutate: claimInvitationMutation,
  } = useGraphQLMutation<ClaimTeamInvitationCodeMutation, ClaimTeamInvitationCodeMutationVariables>(
    gql`
      mutation ClaimTeamInvitationCode($code: ID!) {
        claimTeamInvitationCode(input: { code: $code }) {
          success
          workspaceId
        }
      }
    `,
    {
      refetchQueries: ["GetOwnerAndCollaborators"],
      onCompleted: data => {
        const workspaceId = data.claimTeamInvitationCode.workspaceId;
        onCompleted(workspaceId);
      },
    }
  );

  if (error) {
    console.error("Apollo error while deleting a collaborator", error);
  }

  const claimInvitation = useCallback(
    (code: string) => {
      claimInvitationMutation({ variables: { code } });
    },
    [claimInvitationMutation]
  );

  return { claimInvitation, error, isLoading };
}

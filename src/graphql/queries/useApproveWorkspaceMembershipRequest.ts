import {
  ApproveWorkspaceMembershipRequestMutation,
  ApproveWorkspaceMembershipRequestMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";

export function useApproveWorkspaceMembershipRequest(onCompleted?: () => void) {
  const { error, isLoading, mutate } = useGraphQLMutation<
    ApproveWorkspaceMembershipRequestMutation,
    ApproveWorkspaceMembershipRequestMutationVariables
  >(
    gql`
      mutation ApproveWorkspaceMembershipRequest($requestId: ID!) {
        acceptWorkspaceMembershipRequest(input: { id: $requestId }) {
          success
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaceMembers", "GetWorkspaceMembershipRequests"],
      onCompleted,
    }
  );

  const acceptRequest = (requestId: string) => mutate({ variables: { requestId } });

  return { acceptRequest, error, isLoading };
}

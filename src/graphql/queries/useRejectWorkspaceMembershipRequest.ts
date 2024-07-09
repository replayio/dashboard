import {
  RejectWorkspaceMembershipRequestMutation,
  RejectWorkspaceMembershipRequestMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";

export function useRejectWorkspaceMembershipRequest(onCompleted?: () => void) {
  const { error, isLoading, mutate } = useGraphQLMutation<
    RejectWorkspaceMembershipRequestMutation,
    RejectWorkspaceMembershipRequestMutationVariables
  >(
    gql`
      mutation RejectWorkspaceMembershipRequest($requestId: ID!) {
        rejectWorkspaceMembershipRequest(input: { id: $requestId }) {
          success
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaceMembers", "GetWorkspaceMembershipRequests"],
      onCompleted,
    }
  );

  const rejectRequest = (requestId: string) => mutate({ variables: { requestId } });

  return { rejectRequest, error, isLoading };
}

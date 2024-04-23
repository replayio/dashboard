import {
  RemoveUserFromWorkspaceMutation,
  RemoveUserFromWorkspaceMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";

export function useRemoveUserFromWorkspace(onCompleted?: () => void) {
  const {
    error,
    isLoading,
    mutate: RemoveUserFromWorkspaceMutation,
  } = useGraphQLMutation<RemoveUserFromWorkspaceMutation, RemoveUserFromWorkspaceMutationVariables>(
    gql`
      mutation RemoveUserFromWorkspace($membershipId: ID!) {
        removeWorkspaceMember(input: { id: $membershipId }) {
          success
        }
      }
    `,
    {
      onCompleted,
      refetchQueries: ["GetWorkspaceMembers"],
    }
  );

  if (error) {
    console.error("Apollo error while removing a user from a workspace", error);
  }

  const removeUserFromWorkspace = (membershipId: string) => {
    RemoveUserFromWorkspaceMutation({ variables: { membershipId } });
  };

  return { error, isLoading, removeUserFromWorkspace };
}

import { SessionContext } from "@/components/SessionContext";
import {
  DeleteWorkspaceMutation,
  DeleteWorkspaceMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useDeleteWorkspace() {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const {
    mutate: deleteWorkspaceMutation,
    error,
    isLoading,
  } = useGraphQLMutation<DeleteWorkspaceMutation, DeleteWorkspaceMutationVariables>(
    gql`
      mutation DeleteWorkspace($workspaceId: ID!, $shouldDeleteRecordings: Boolean!) {
        deleteWorkspace(
          input: { workspaceId: $workspaceId, shouldDeleteRecordings: $shouldDeleteRecordings }
        ) {
          success
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaces"],
    }
  );

  const deleteWorkspace = (workspaceId: string) =>
    deleteWorkspaceMutation({
      variables: { shouldDeleteRecordings: true, workspaceId },
    });

  return { deleteWorkspace, error, isLoading };
}

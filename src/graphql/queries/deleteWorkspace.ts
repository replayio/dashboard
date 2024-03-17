import { SessionContext } from "@/components/SessionContext";
import {
  DeleteWorkspaceMutation,
  DeleteWorkspaceMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { gql, useMutation } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useDeleteWorkspace() {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClient(accessToken);

  const [deleteWorkspaceMutation, { loading, error }] = useMutation<
    DeleteWorkspaceMutation,
    DeleteWorkspaceMutationVariables
  >(
    gql`
      mutation DeleteWorkspace(
        $workspaceId: ID!
        $shouldDeleteRecordings: Boolean!
      ) {
        deleteWorkspace(
          input: {
            workspaceId: $workspaceId
            shouldDeleteRecordings: $shouldDeleteRecordings
          }
        ) {
          success
        }
      }
    `,
    {
      client,
      refetchQueries: ["GetNonPendingWorkspaces"],
    }
  );

  if (error) {
    console.error("Apollo error while adding a collaborator", error);
  }

  const deleteWorkspace = (workspaceId: string) =>
    deleteWorkspaceMutation({
      variables: { shouldDeleteRecordings: true, workspaceId },
    });

  return { deleteWorkspace, error, loading };
}

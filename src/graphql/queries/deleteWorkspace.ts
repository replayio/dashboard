import { AuthContext } from "@/components/AuthContext";
import {
  DeleteWorkspaceMutation,
  DeleteWorkspaceMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientClient } from "@/graphql/graphQLClient";
import { gql, useMutation } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useDeleteWorkspace() {
  const accessToken = useContext(AuthContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClientClient(accessToken);

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
      variables: { workspaceId, shouldDeleteRecordings: true },
    });

  return { deleteWorkspace, error, loading };
}

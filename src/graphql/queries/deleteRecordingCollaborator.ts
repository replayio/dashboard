import { AuthContext } from "@/components/AuthContext";
import {
  DeleteCollaboratorMutation,
  DeleteCollaboratorMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientClient } from "@/graphql/graphQLClient";
import { gql, useMutation } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useDeleteRecordingCollaborator() {
  const accessToken = useContext(AuthContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClientClient(accessToken);

  const [deleteCollaboratorMutation, { loading, error }] = useMutation<
    DeleteCollaboratorMutation,
    DeleteCollaboratorMutationVariables
  >(
    gql`
      mutation DeleteCollaborator($collaborationId: ID!) {
        removeRecordingCollaborator(input: { id: $collaborationId }) {
          success
        }
      }
    `,
    {
      client,
      refetchQueries: ["GetOwnerAndCollaborators"],
    }
  );

  if (error) {
    console.error("Apollo error while deleting a collaborator", error);
  }

  const deleteCollaborator = (collaborationId: string) => {
    deleteCollaboratorMutation({ variables: { collaborationId } });
  };

  return { deleteCollaborator, error, loading };
}

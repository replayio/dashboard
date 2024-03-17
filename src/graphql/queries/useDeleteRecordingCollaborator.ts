import {
  DeleteCollaboratorMutation,
  DeleteCollaboratorMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";

export function useDeleteRecordingCollaborator() {
  const {
    error,
    isLoading,
    mutate: deleteCollaboratorMutation,
  } = useGraphQLMutation<
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
      refetchQueries: ["GetOwnerAndCollaborators"],
    }
  );

  if (error) {
    console.error("Apollo error while deleting a collaborator", error);
  }

  const deleteCollaborator = (collaborationId: string) => {
    deleteCollaboratorMutation({ variables: { collaborationId } });
  };

  return { deleteCollaborator, error, isLoading };
}

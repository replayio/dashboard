import {
  AddCollaboratorMutation,
  AddCollaboratorMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";

export function useAddRecordingCollaborator(onCompleted: () => void) {
  const {
    error,
    isLoading,
    mutate: addNewCollaboratorMutation,
  } = useGraphQLMutation<AddCollaboratorMutation, AddCollaboratorMutationVariables>(
    gql`
      mutation AddCollaborator($email: String!, $recordingId: ID!) {
        addRecordingCollaborator(input: { email: $email, recordingId: $recordingId }) {
          success
        }
      }
    `,
    {
      refetchQueries: ["GetOwnerAndCollaborators"],
      onCompleted,
    }
  );

  const addCollaborator = (recordingId: string, email: string) =>
    addNewCollaboratorMutation({ variables: { email, recordingId } });

  return { addCollaborator, error, isLoading };
}

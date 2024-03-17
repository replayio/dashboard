import {
  DeleteRecordingMutation,
  DeleteRecordingMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";

export function useDeleteRecording(onCompleted: () => void) {
  const {
    error,
    isLoading,
    mutate: deleteRecordingMutation,
  } = useGraphQLMutation<
    DeleteRecordingMutation,
    DeleteRecordingMutationVariables
  >(
    gql`
      mutation DeleteRecording($recordingId: ID!) {
        deleteRecording(input: { id: $recordingId }) {
          success
        }
      }
    `,
    {
      onCompleted,
      refetchQueries: ["GetPersonalRecordings", "GetWorkspaceRecordings"],
    }
  );

  if (error) {
    console.error("Apollo error while deleting a recording", error);
  }

  const deleteRecording = (recordingId: string) => {
    deleteRecordingMutation({ variables: { recordingId } });
  };

  return { deleteRecording, error, isLoading };
}

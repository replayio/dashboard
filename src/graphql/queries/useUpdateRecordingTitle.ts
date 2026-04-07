import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";

type UpdateRecordingTitleMutation = {
  updateRecordingTitle: {
    success: boolean | null;
    recording: { uuid: string; title: string | null } | null;
  };
};

type UpdateRecordingTitleMutationVariables = {
  recordingId: string;
  title: string;
};

export function useUpdateRecordingTitle(onCompleted?: () => void) {
  const {
    error,
    isLoading,
    mutate: updateTitleMutation,
  } = useGraphQLMutation<UpdateRecordingTitleMutation, UpdateRecordingTitleMutationVariables>(
    gql`
      mutation UpdateRecordingTitle($recordingId: ID!, $title: String!) {
        updateRecordingTitle(input: { id: $recordingId, title: $title }) {
          success
          recording {
            uuid
            title
          }
        }
      }
    `,
    {
      onCompleted,
      refetchQueries: ["GetPersonalRecordings", "GetWorkspaceRecordings"],
    }
  );

  const updateRecordingTitle = (recordingId: string, title: string) =>
    updateTitleMutation({ variables: { recordingId, title } });

  return { updateRecordingTitle, error, isLoading };
}

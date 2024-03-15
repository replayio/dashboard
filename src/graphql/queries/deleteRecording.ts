import { AuthContext } from "@/components/AuthContext";
import {
  DeleteRecordingMutation,
  DeleteRecordingMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { gql, useMutation } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useDeleteRecording(onCompleted: () => void) {
  const accessToken = useContext(AuthContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClient(accessToken);

  const [deleteRecordingMutation, { loading, error }] = useMutation<
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
      client,
      onCompleted,
      refetchQueries: ["GetMyRecordings", "GetWorkspaceRecordings"],
    }
  );

  if (error) {
    console.error("Apollo error while deleting a recording", error);
  }

  const deleteRecording = (recordingId: string) => {
    deleteRecordingMutation({ variables: { recordingId } });
  };

  return { deleteRecording, error, loading };
}

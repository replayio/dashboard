import {
  GetRecordingPhotoQuery,
  GetRecordingPhotoQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientClient } from "@/graphql/graphQLClient";
import { gql } from "@apollo/client";

const QUERY = gql`
  query getRecordingPhoto($recordingId: UUID!) {
    recording(uuid: $recordingId) {
      thumbnail
    }
  }
`;

export async function getRecordingThumbnailClient(
  accessToken: string,
  recordingId: string
): Promise<string | null> {
  const graphQLClient = getGraphQLClientClient(accessToken);

  const response = await graphQLClient.query<
    GetRecordingPhotoQuery,
    GetRecordingPhotoQueryVariables
  >({
    query: QUERY,
    variables: { recordingId },
  });

  return response.data?.recording?.thumbnail ?? null;
}

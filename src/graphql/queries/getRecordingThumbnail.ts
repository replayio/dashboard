import {
  GetRecordingPhotoQuery,
  GetRecordingPhotoQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { gql } from "@apollo/client";

const QUERY = gql`
  query GetRecordingPhoto($recordingId: UUID!) {
    recording(uuid: $recordingId) {
      thumbnail
      uuid
    }
  }
`;

export async function getRecordingThumbnailClient(
  accessToken: string,
  recordingId: string
): Promise<string | null> {
  const graphQLClient = getGraphQLClient(accessToken);

  const response = await graphQLClient.query<
    GetRecordingPhotoQuery,
    GetRecordingPhotoQueryVariables
  >({
    query: QUERY,
    variables: { recordingId },
  });

  return response.data?.recording?.thumbnail ?? null;
}

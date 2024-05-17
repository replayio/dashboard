import {
  GetRecordingPhotoQuery,
  GetRecordingPhotoQueryVariables,
} from "@/graphql/generated/graphql";
import { graphQLFetch } from "@/graphql/graphQLFetch";
import { gql } from "@apollo/client";
import { MockGraphQLData } from "tests/mocks/types";

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
  recordingId: string,
  mockGraphQLData: MockGraphQLData | null
): Promise<string | null> {
  const response = await graphQLFetch<GetRecordingPhotoQuery, GetRecordingPhotoQueryVariables>({
    accessToken,
    mockGraphQLData,
    query: QUERY,
    variables: { recordingId },
  });

  return response.data?.recording?.thumbnail ?? null;
}

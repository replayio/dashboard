import { GetRecordingQuery, GetRecordingQueryVariables } from "@/graphql/generated/graphql";
import { graphQLQuery } from "@/graphql/graphQLQuery";
import { gql } from "@apollo/client";
import { MockGraphQLData } from "tests/mocks/types";

// Copied from the query in devtools
export const GET_RECORDING_QUERY = gql`
  query GetRecording($recordingId: UUID!) {
    recording(uuid: $recordingId) {
      uuid
      url
      title
      duration
      createdAt
      private
      isInitialized
      ownerNeedsInvite
      userRole
      operations
      resolution
      metadata
      isTest
      isProcessed
      isInTestWorkspace
      testRun {
        id
      }
      owner {
        id
        name
        picture
        internal
      }
      workspace {
        id
        name
      }
    }
  }
`;

export type Recording = NonNullable<GetRecordingQuery["recording"]>;

export async function getRecording(
  accessToken: string,
  recordingId: string,
  mockGraphQLData: MockGraphQLData | null
): Promise<Recording | null> {
  const response = await graphQLQuery<GetRecordingQuery, GetRecordingQueryVariables>({
    accessToken,
    mockGraphQLData,
    query: GET_RECORDING_QUERY,
    variables: { recordingId },
  });

  return response.data?.recording ?? null;
}

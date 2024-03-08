import { AuthContext } from "@/components/AuthContext";

import {
  GetRecordingPhotoQuery,
  GetRecordingPhotoQueryVariables,
} from "@/graphql/generated/graphql";
import {
  getGraphQLClientClient,
  getGraphQLClientServer,
} from "@/graphql/graphQLClient";
import { gql, useQuery } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

const QUERY = gql`
  query getRecordingPhoto($recordingId: UUID!) {
    recording(uuid: $recordingId) {
      thumbnail
    }
  }
`;

export async function getRecordingThumbnail(
  recordingId: string
): Promise<string | null> {
  const graphQLClient = await getGraphQLClientServer();
  const response = await graphQLClient.query<
    GetRecordingPhotoQuery,
    GetRecordingPhotoQueryVariables
  >({
    query: QUERY,
    variables: { recordingId },
  });

  return response.data?.recording?.thumbnail ?? null;
}

export function useRecordingThumbnail(recordingId: string) {
  const accessToken = useContext(AuthContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClientClient(accessToken);

  // const client = getGraphQLClient();
  const response = useQuery<
    GetRecordingPhotoQuery,
    GetRecordingPhotoQueryVariables
  >(QUERY, { client, variables: { recordingId } });

  return response.data?.recording?.thumbnail ?? null;
}

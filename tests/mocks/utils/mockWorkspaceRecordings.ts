import { GetWorkspaceRecordingsQuery } from "@/graphql/generated/graphql";
import { WorkspaceRecording } from "@/graphql/types";
import { getRelativeDate } from "@/utils/date";
import { DeepPartial } from "@apollo/client/utilities";
import { DEFAULT_WORKSPACE_ID } from "tests/mocks/constants";
import { MockGraphQLResponse } from "tests/mocks/types";
import { getUID } from "tests/mocks/utils/getUID";

export function mockWorkspaceRecordings(
  workspaceId: string = DEFAULT_WORKSPACE_ID,
  partialRecordings: DeepPartial<WorkspaceRecording>[] = []
): MockGraphQLResponse<GetWorkspaceRecordingsQuery> {
  return {
    data: {
      node: {
        __typename: "Workspace",
        id: workspaceId,
        recordings: {
          __typename: "WorkspaceRecordingConnection",
          edges: partialRecordings.map(partialRecording => ({
            __typename: "WorkspaceRecordingEdge",
            node: {
              __typename: "Recording",
              buildId: partialRecording.buildId,
              comments: [],
              createdAt: partialRecording.createdAt ?? getRelativeDate({ daysAgo: 1 }),
              duration: partialRecording.duration ?? 0,
              metadata: {},
              owner: partialRecording.owner
                ? {
                    id: partialRecording.owner.id ?? getUID("user"),
                    name: partialRecording.owner.name,
                    picture: partialRecording.owner.picture,
                  }
                : undefined,
              private: partialRecording.private ?? false,
              title: partialRecording.title ?? "Untitled",
              url: partialRecording.url,
              uuid: partialRecording.uuid ?? getUID("recording"),
              workspace: {
                __typename: "Workspace",
                id: workspaceId,
              },
            },
          })),
        },
      },
    },
  };
}

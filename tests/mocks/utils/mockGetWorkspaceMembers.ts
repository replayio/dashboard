import { GetWorkspaceMembersQuery } from "@/graphql/generated/graphql";
import { WorkspaceMember } from "@/graphql/types";
import { getRelativeDate } from "@/utils/date";
import { DEFAULT_WORKSPACE_ID } from "../constants";
import { getUID } from "./getUID";

export function mockGetWorkspaceMembers(
  partialMembers: Partial<WorkspaceMember>[],
  workspaceId: string = DEFAULT_WORKSPACE_ID
): GetWorkspaceMembersQuery {
  return {
    node: {
      __typename: "Workspace",
      id: workspaceId,
      members: {
        __typename: "WorkspaceMemberConnection",
        edges: partialMembers.map(
          ({
            id = getUID("workspace-member"),
            isPending = false,
            name = "Test User",
            picture = "",
            roles = ["viewer"],
          }) => ({
            __typename: "WorkspaceMemberEdge",
            node: isPending
              ? {
                  __typename: "WorkspacePendingEmailMember",
                  createdAt: getRelativeDate({ minutesAgo: 1 }),
                  id,
                  roles,
                  email: `${name.toLowerCase().replace(/ /g, "-")}@fake.com`,
                }
              : {
                  __typename: "WorkspaceUserMember",
                  id,
                  roles,
                  user: {
                    __typename: "User",
                    id,
                    name,
                    picture,
                  },
                },
          })
        ),
      },
    },
  };
}

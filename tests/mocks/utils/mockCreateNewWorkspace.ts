import { CreateNewWorkspaceMutation } from "@/graphql/generated/graphql";
import { Workspace } from "@/graphql/types";
import { DeepPartial } from "@apollo/client/utilities";
import { DEFAULT_WORKSPACE_ID } from "tests/mocks/constants";
import { MockGraphQLResponse } from "tests/mocks/types";

export function mockCreateNewWorkspace(
  workspace: DeepPartial<Workspace>
): MockGraphQLResponse<CreateNewWorkspaceMutation> {
  return {
    data: {
      createWorkspace: {
        __typename: "CreateWorkspace",
        success: true,
        workspace: {
          __typename: "Workspace",
          id: workspace.id ?? DEFAULT_WORKSPACE_ID,
          invitationCode: workspace.invitationCode ?? "11111111-2222-3333-4444-55555555",
          domain: "replay.io",
          isDomainLimitedCode: false,
        },
      },
    },
  };
}

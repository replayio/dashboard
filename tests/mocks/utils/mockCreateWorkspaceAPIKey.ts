import { CreateWorkspaceApiKeyMutation } from "@/graphql/generated/graphql";
import { MockGraphQLResponse } from "tests/mocks/types";
import { getUID } from "tests/mocks/utils/getUID";

export function mockCreateWorkspaceAPIKey(
  response: {
    apiKey?: string;
    id?: string;
    label?: string;
  } = {}
): MockGraphQLResponse<CreateWorkspaceApiKeyMutation> {
  return {
    data: {
      createWorkspaceAPIKey: {
        key: {
          __typename: "WorkspaceAPIKey",
          id: response.id ?? getUID("test-api-key-id"),
          label: response.label ?? "Default",
        },
        keyValue: "rwk_12345678901234567890123456789012",
      },
    },
  };
}

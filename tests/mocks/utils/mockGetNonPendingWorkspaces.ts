import { GetNonPendingWorkspacesQuery } from "@/graphql/generated/graphql";
import { Workspace } from "@/graphql/types";
import { DeepPartial } from "@apollo/client/utilities";
import { DEFAULT_WORKSPACE_ID } from "../constants";
import { getUID } from "./getUID";

export function mockGetNonPendingWorkspaces(
  partialWorkspaces: DeepPartial<Workspace>[]
): GetNonPendingWorkspacesQuery {
  return {
    viewer: {
      __typename: "AuthenticatedUser",
      workspaces: {
        __typename: "UserWorkspaceConnection",
        edges: partialWorkspaces.map((workspace) => ({
          __typename: "UserWorkspaceEdge",
          node: {
            __typename: "Workspace",
            hasPaymentMethod: workspace.hasPaymentMethod ?? false,
            id: workspace.id ?? DEFAULT_WORKSPACE_ID,
            invitationCode:
              workspace.invitationCode ?? "11111111-2222-3333-4444-55555555",
            isOrganization: workspace.isOrganization ?? false,
            isTest: workspace.isTest ?? false,
            name: workspace.name ?? "Fake Worksapce",
            settings: workspace.settings
              ? {
                  __typename: "WorkspaceSettings",
                  features: {
                    user: {
                      library: true,
                      autoJoin:
                        workspace.settings.features?.user?.autoJoin ?? false,
                    },
                    recording: {
                      public:
                        workspace.settings.features?.recording?.public ?? true,
                      allowList: [],
                      blockList: [],
                    },
                    testSuites: {
                      env: {},
                    },
                  },
                }
              : undefined,
            subscription: workspace.subscriptionPlanKey
              ? {
                  __typename: "WorkspaceSubscription",
                  id: getUID("subscription"),
                  plan: {
                    __typename: "Plan",
                    id: getUID("subscription-plan"),
                    key: workspace.subscriptionPlanKey,
                  },
                }
              : undefined,
          },
        })),
      },
    },
  };
}

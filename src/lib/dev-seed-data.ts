/**
 * Realistic mock GraphQL data for dev-seed mode.
 *
 * Provides responses for every query the dashboard makes so pages
 * render fully populated without hitting the real API.
 *
 * Query names must exactly match the `query <Name>` in each gql tag
 * because getMockGraphQLResponse looks up by operation name.
 */

import { MockGraphQLData } from "@/testing/mockGraphQLTypes";
import { DEV_SEED_USER } from "./dev-seed";

const DEV_WORKSPACE_ID = "dev-workspace-001";
const DEV_PROJECT_ID_1 = "dev-project-001";
const DEV_PROJECT_ID_2 = "dev-project-002";

const devSeedData: MockGraphQLData = {
  // ----------------------------------------------------------------
  // GetUser — used by getCurrentUser (server-side) and any client query
  // ----------------------------------------------------------------
  GetUser: {
    data: {
      viewer: {
        email: DEV_SEED_USER.email,
        internal: DEV_SEED_USER.isInternal,
        nags: DEV_SEED_USER.nags,
        user: {
          id: DEV_SEED_USER.id,
          name: DEV_SEED_USER.name,
          picture: DEV_SEED_USER.picture,
        },
      },
    },
  },

  // ----------------------------------------------------------------
  // GetWorkspaces — used by useWorkspaces → DefaultNav sidebar
  // ----------------------------------------------------------------
  GetWorkspaces: {
    data: {
      viewer: {
        workspaces: {
          edges: [
            {
              node: {
                hasPaymentMethod: false,
                id: DEV_WORKSPACE_ID,
                invitationCode: "DEV-INVITE",
                isOrganization: true,
                isTest: false,
                name: "Dev Workspace",
                retentionLimit: null,
                settings: {
                  features: null,
                },
                subscription: {
                  id: "dev-sub-001",
                  plan: {
                    id: "dev-plan-001",
                    key: "team",
                  },
                },
              },
            },
            {
              node: {
                hasPaymentMethod: false,
                id: DEV_PROJECT_ID_1,
                invitationCode: "DEV-INVITE-2",
                isOrganization: false,
                isTest: true,
                name: "Frontend Tests",
                retentionLimit: null,
                settings: {
                  features: null,
                },
                subscription: null,
              },
            },
          ],
        },
      },
    },
  },

  // ----------------------------------------------------------------
  // GetWorkspace — used by useGetWorkspaceType, settings
  // ----------------------------------------------------------------
  GetWorkspace: {
    data: {
      node: {
        __typename: "Workspace",
        id: DEV_WORKSPACE_ID,
        isOrganization: true,
        isTest: false,
        retentionLimit: null,
      },
    },
  },

  // ----------------------------------------------------------------
  // GetWorkspaceRecordings — workspace recording list
  // ----------------------------------------------------------------
  GetWorkspaceRecordings: {
    data: {
      node: {
        __typename: "Workspace",
        id: DEV_WORKSPACE_ID,
        recordings: {
          edges: [
            {
              node: {
                buildId: "dev-build-001",
                comments: [],
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                duration: 45200,
                metadata: null,
                owner: {
                  id: DEV_SEED_USER.id,
                  name: DEV_SEED_USER.name,
                  picture: "",
                },
                private: false,
                title: "Login flow regression",
                url: "https://app.replay.local/login",
                uuid: "dev-rec-001",
                workspace: {
                  id: DEV_WORKSPACE_ID,
                },
              },
            },
            {
              node: {
                buildId: "dev-build-002",
                comments: [],
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
                duration: 12400,
                metadata: null,
                owner: {
                  id: DEV_SEED_USER.id,
                  name: DEV_SEED_USER.name,
                  picture: "",
                },
                private: false,
                title: "Dashboard checkout bug",
                url: "https://app.replay.local/checkout",
                uuid: "dev-rec-002",
                workspace: {
                  id: DEV_WORKSPACE_ID,
                },
              },
            },
          ],
        },
      },
    },
  },

  // ----------------------------------------------------------------
  // GetTestsRunsForWorkspace — test runs list in team view
  // ----------------------------------------------------------------
  GetTestsRunsForWorkspace: {
    data: {
      node: {
        __typename: "Workspace",
        id: DEV_PROJECT_ID_1,
        testRuns: {
          edges: [
            {
              node: {
                id: "dev-run-001",
                date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                mode: "record",
                results: {
                  counts: {
                    failed: 1,
                    flaky: 2,
                    passed: 47,
                  },
                },
                source: {
                  branchName: "main",
                  commitId: "a1b2c3d",
                  commitTitle: "fix: checkout redirect",
                  groupLabel: null,
                  isPrimaryBranch: true,
                  prNumber: null,
                  prTitle: null,
                  repository: "replayio/dashboard",
                  triggerUrl: null,
                  user: DEV_SEED_USER.name,
                },
              },
            },
            {
              node: {
                id: "dev-run-002",
                date: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
                mode: "record",
                results: {
                  counts: {
                    failed: 0,
                    flaky: 1,
                    passed: 50,
                  },
                },
                source: {
                  branchName: "feat/stripe-subscription",
                  commitId: "e4f5g6h",
                  commitTitle: "feat: add subscription UI",
                  groupLabel: null,
                  isPrimaryBranch: false,
                  prNumber: 208,
                  prTitle: "feat(stripe): Stripe subscription integration",
                  repository: "replayio/dashboard",
                  triggerUrl: null,
                  user: DEV_SEED_USER.name,
                },
              },
            },
          ],
        },
      },
    },
  },

  // ----------------------------------------------------------------
  // GetWorkspaceSubscriptionStatus — used by billing checks
  // ----------------------------------------------------------------
  GetWorkspaceSubscriptionStatus: {
    data: {
      node: {
        __typename: "Workspace",
        id: DEV_WORKSPACE_ID,
        subscription: {
          id: "dev-sub-001",
          status: "active",
        },
      },
    },
  },

  // ----------------------------------------------------------------
  // GetWorkspaceSubscription — used by subscription settings panel
  // ----------------------------------------------------------------
  GetWorkspaceSubscription: {
    data: {
      node: {
        __typename: "Workspace",
        id: DEV_WORKSPACE_ID,
        subscription: {
          id: "dev-sub-001",
          effectiveFrom: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
          effectiveUntil: null,
          status: "active",
          trialEnds: null,
          seatCount: 5,
          paymentMethods: [],
          plan: {
            id: "dev-plan-001",
            key: "team",
            name: "Team",
          },
        },
      },
    },
  },

  // ----------------------------------------------------------------
  // GetWorkspaceMembers
  // ----------------------------------------------------------------
  GetWorkspaceMembers: {
    data: {
      node: {
        __typename: "Workspace",
        id: DEV_WORKSPACE_ID,
        members: {
          edges: [
            {
              node: {
                __typename: "WorkspaceUserMember",
                id: "dev-member-001",
                roles: ["admin"],
                user: {
                  id: DEV_SEED_USER.id,
                  name: DEV_SEED_USER.name,
                  picture: "",
                },
              },
            },
          ],
        },
      },
    },
  },

  // ----------------------------------------------------------------
  // GetWorkspaceMemberRoles
  // ----------------------------------------------------------------
  GetWorkspaceMemberRoles: {
    data: {
      node: {
        __typename: "Workspace",
        id: DEV_WORKSPACE_ID,
        members: {
          edges: [
            {
              node: {
                __typename: "WorkspaceUserMember",
                id: "dev-member-001",
                roles: ["admin"],
                user: {
                  id: DEV_SEED_USER.id,
                },
              },
            },
          ],
        },
      },
    },
  },

  // ----------------------------------------------------------------
  // GetUserSettings — API keys tab
  // ----------------------------------------------------------------
  GetUserSettings: {
    data: {
      viewer: {
        apiKeys: [],
      },
    },
  },
};

export default devSeedData;

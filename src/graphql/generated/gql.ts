/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n      mutation CloseAuthRequest($key: String!) {\n        closeAuthRequest(input: { key: $key }) {\n          success\n          token\n        }\n      }\n    ":
    types.CloseAuthRequestDocument,
  "\n      mutation CreateUserAPIKey($label: String!, $scopes: [String!]!) {\n        createUserAPIKey(input: { label: $label, scopes: $scopes }) {\n          key {\n            id\n            label\n          }\n          keyValue\n        }\n      }\n    ":
    types.CreateUserApiKeyDocument,
  "\n      mutation CreateNewWorkspace($name: String!, $planKey: String!) {\n        createWorkspace(input: { name: $name, planKey: $planKey }) {\n          success\n          workspace {\n            id\n            invitationCode\n            domain\n            isDomainLimitedCode\n          }\n        }\n      }\n    ":
    types.CreateNewWorkspaceDocument,
  "\n      mutation CreateWorkspaceAPIKey(\n        $workspaceId: ID!\n        $label: String!\n        $scopes: [String!]!\n        $apiKey: String\n      ) {\n        createWorkspaceAPIKey(\n          input: { workspaceId: $workspaceId, label: $label, scopes: $scopes, apiKey: $apiKey }\n        ) {\n          key {\n            id\n            label\n          }\n          keyValue\n        }\n      }\n    ":
    types.CreateWorkspaceApiKeyDocument,
  "\n      mutation DeleteUserAPIKey($id: ID!) {\n        deleteUserAPIKey(input: { id: $id }) {\n          success\n        }\n      }\n    ":
    types.DeleteUserApiKeyDocument,
  "\n      mutation DeleteWorkspace($workspaceId: ID!, $shouldDeleteRecordings: Boolean!) {\n        deleteWorkspace(\n          input: { workspaceId: $workspaceId, shouldDeleteRecordings: $shouldDeleteRecordings }\n        ) {\n          success\n        }\n      }\n    ":
    types.DeleteWorkspaceDocument,
  "\n      mutation DeleteWorkspaceAPIKey($id: ID!) {\n        deleteWorkspaceAPIKey(input: { id: $id }) {\n          success\n        }\n      }\n    ":
    types.DeleteWorkspaceApiKeyDocument,
  "\n      mutation FulfillAuthRequest($secret: String!, $id: String!, $token: String!) {\n        fulfillAuthRequest(input: { secret: $secret, id: $id, token: $token }) {\n          success\n          source\n        }\n      }\n    ":
    types.FulfillAuthRequestDocument,
  "\n  query GetAuthConnection($email: String!) {\n    auth {\n      connection(email: $email)\n    }\n  }\n":
    types.GetAuthConnectionDocument,
  "\n      query GetUser {\n        viewer {\n          email\n          internal\n          nags\n          user {\n            name\n            picture\n            id\n          }\n        }\n      }\n    ":
    types.GetUserDocument,
  "\n  query GetRecordingPhoto($recordingId: UUID!) {\n    recording(uuid: $recordingId) {\n      thumbnail\n      uuid\n    }\n  }\n":
    types.GetRecordingPhotoDocument,
  "\n      query GetWorkspaceMemberRoles($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            members {\n              edges {\n                node {\n                  ... on WorkspaceUserMember {\n                    __typename\n                    id\n                    roles\n                    user {\n                      id\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    ":
    types.GetWorkspaceMemberRolesDocument,
  "\n      query GetWorkspaceMembers($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            members {\n              edges {\n                node {\n                  ... on WorkspaceUserMember {\n                    __typename\n                    id\n                    roles\n                    user {\n                      id\n                      name\n                      picture\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    ":
    types.GetWorkspaceMembersDocument,
  "\n      query GetWorkspaceSubscriptionStatus($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            subscription {\n              id\n              status\n            }\n          }\n        }\n      }\n    ":
    types.GetWorkspaceSubscriptionStatusDocument,
  "\n  query GetWorkspace($workspaceId: ID!) {\n    node(id: $workspaceId) {\n      ... on Workspace {\n        id\n        isOrganization\n        isTest\n        retentionLimit\n      }\n    }\n  }\n":
    types.GetWorkspaceDocument,
  '\n      mutation InitAutRequest($key: String!, $source: String = "browser") {\n        initAuthRequest(input: { key: $key, source: $source }) {\n          id\n          challenge\n          serverKey\n        }\n      }\n    ':
    types.InitAutRequestDocument,
  "\n      mutation InviteWorkspaceMember($email: String!, $workspaceId: ID!, $roles: [String!]) {\n        addWorkspaceMember(input: { email: $email, workspaceId: $workspaceId, roles: $roles }) {\n          success\n        }\n      }\n    ":
    types.InviteWorkspaceMemberDocument,
  "\n      mutation ActivateWorkspaceSubscription(\n        $workspaceId: ID!\n        $planKey: String!\n        $paymentMethodBillingId: String!\n      ) {\n        setWorkspaceDefaultPaymentMethod(\n          input: { workspaceId: $workspaceId, paymentMethodId: $paymentMethodBillingId }\n        ) {\n          success\n        }\n        activateWorkspaceSubscription(input: { workspaceId: $workspaceId, planKey: $planKey }) {\n          success\n          subscription {\n            effectiveUntil\n            status\n          }\n        }\n      }\n    ":
    types.ActivateWorkspaceSubscriptionDocument,
  "\n      mutation AddCollaborator($email: String!, $recordingId: ID!) {\n        addRecordingCollaborator(input: { email: $email, recordingId: $recordingId }) {\n          success\n        }\n      }\n    ":
    types.AddCollaboratorDocument,
  "\n      mutation ClaimTeamInvitationCode($code: ID!) {\n        claimTeamInvitationCode(input: { code: $code }) {\n          success\n          workspaceId\n        }\n      }\n    ":
    types.ClaimTeamInvitationCodeDocument,
  "\n      mutation DeleteRecording($recordingId: ID!) {\n        deleteRecording(input: { id: $recordingId }) {\n          success\n        }\n      }\n    ":
    types.DeleteRecordingDocument,
  "\n      mutation DeleteCollaborator($collaborationId: ID!) {\n        removeRecordingCollaborator(input: { id: $collaborationId }) {\n          success\n        }\n      }\n    ":
    types.DeleteCollaboratorDocument,
  "\n    query GetUserSettings {\n      viewer {\n        apiKeys {\n          id\n          createdAt\n          label\n          scopes\n          recordingCount\n          maxRecordings\n        }\n      }\n    }\n  ":
    types.GetUserSettingsDocument,
  "\n      query GetWorkspaceApiKeys($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            apiKeys {\n              id\n              createdAt\n              label\n              scopes\n              recordingCount\n              maxRecordings\n            }\n          }\n        }\n      }\n    ":
    types.GetWorkspaceApiKeysDocument,
  "\n      query GetPersonalRecordings($filter: String) {\n        viewer {\n          recordings(filter: $filter) {\n            edges {\n              node {\n                buildId\n                duration\n                comments {\n                  id\n                }\n                createdAt\n                owner {\n                  id\n                  name\n                  picture\n                }\n                private\n                title\n                url\n                uuid\n                workspace {\n                  id\n                }\n              }\n            }\n          }\n        }\n      }\n    ":
    types.GetPersonalRecordingsDocument,
  "\n      mutation PrepareWorkspacePaymentMethod($workspaceId: ID!) {\n        prepareWorkspacePaymentMethod(input: { workspaceId: $workspaceId }) {\n          success\n          paymentSecret\n        }\n      }\n    ":
    types.PrepareWorkspacePaymentMethodDocument,
  "\n      query GetOwnerAndCollaborators($recordingId: UUID!) {\n        recording(uuid: $recordingId) {\n          uuid\n          collaborators {\n            edges {\n              node {\n                ... on RecordingPendingEmailCollaborator {\n                  id\n                  email\n                  createdAt\n                }\n                ... on RecordingPendingUserCollaborator {\n                  id\n                  user {\n                    name\n                    picture\n                  }\n                }\n                ... on RecordingUserCollaborator {\n                  id\n                  user {\n                    name\n                    picture\n                  }\n                }\n              }\n            }\n          }\n          collaboratorRequests {\n            edges {\n              node {\n                ... on RecordingCollaboratorRequest {\n                  id\n                  user {\n                    name\n                    picture\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    ":
    types.GetOwnerAndCollaboratorsDocument,
  "\n      mutation RemovePaymentMethod($workspaceId: ID!, $paymentMethodId: String!) {\n        deleteWorkspacePaymentMethod(\n          input: { workspaceId: $workspaceId, paymentMethodId: $paymentMethodId }\n        ) {\n          success\n        }\n      }\n    ":
    types.RemovePaymentMethodDocument,
  "\n      query GetTestsRunsForWorkspace($workspaceId: ID!, $startTime: String, $endTime: String) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            testRuns(filter: { startTime: $startTime, endTime: $endTime }) {\n              edges {\n                node {\n                  id\n                  date\n                  mode\n                  results {\n                    counts {\n                      failed\n                      flaky\n                      passed\n                    }\n                  }\n                  source {\n                    commitId\n                    commitTitle\n                    groupLabel\n                    isPrimaryBranch\n                    branchName\n                    prNumber\n                    prTitle\n                    repository\n                    triggerUrl\n                    user\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    ":
    types.GetTestsRunsForWorkspaceDocument,
  "\n      query GetTests($workspaceId: ID!, $id: String!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            testRuns(id: $id) {\n              edges {\n                node {\n                  tests(includeNonRecorded: true) {\n                    testId\n                    title\n                    scope\n                    sourcePath\n                    result\n                    errors\n                    durationMs\n                    executions {\n                      result\n                      recordings {\n                        buildId\n                        uuid\n                        duration\n                        isProcessed\n                        createdAt\n                        comments {\n                          user {\n                            id\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    ":
    types.GetTestsDocument,
  "\n      mutation UpdateUserPreferences($preferences: JSONObject!) {\n        updateUserPreferences(input: { preferences: $preferences }) {\n          success\n        }\n      }\n    ":
    types.UpdateUserPreferencesDocument,
  "\n      mutation UpdateWorkspaceMemberRoles($id: ID!, $roles: [String!]!) {\n        updateWorkspaceMemberRole(input: { id: $id, roles: $roles }) {\n          success\n        }\n      }\n    ":
    types.UpdateWorkspaceMemberRolesDocument,
  "\n      mutation UpdateWorkspacePreferences($workspaceId: ID!, $name: String, $features: JSONObject) {\n        updateWorkspaceSettings(\n          input: { workspaceId: $workspaceId, name: $name, features: $features }\n        ) {\n          success\n        }\n      }\n    ":
    types.UpdateWorkspacePreferencesDocument,
  "\n      query GetWorkspaceRecordings($id: ID!, $filter: String) {\n        node(id: $id) {\n          ... on Workspace {\n            id\n            recordings(filter: $filter) {\n              edges {\n                node {\n                  buildId\n                  comments {\n                    id\n                  }\n                  createdAt\n                  duration\n                  metadata\n                  owner {\n                    id\n                    name\n                    picture\n                  }\n                  private\n                  title\n                  url\n                  uuid\n                  workspace {\n                    id\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    ":
    types.GetWorkspaceRecordingsDocument,
  "\n      query GetWorkspaceSubscription($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            subscription {\n              id\n              effectiveFrom\n              effectiveUntil\n              status\n              trialEnds\n              seatCount\n              paymentMethods {\n                id\n                type\n                default\n                card {\n                  brand\n                  last4\n                }\n              }\n              plan {\n                id\n                key\n                name\n              }\n            }\n          }\n        }\n      }\n    ":
    types.GetWorkspaceSubscriptionDocument,
  "\n      query GetWorkspaceTestExecutions(\n        $workspaceId: ID!\n        $testId: String\n        $startTime: String\n        $endTime: String\n      ) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            tests(filter: { testId: $testId, startTime: $startTime, endTime: $endTime }) {\n              edges {\n                node {\n                  executions {\n                    testRunId\n                    errors\n                    createdAt\n                    commitTitle\n                    commitAuthor\n                    result\n                    recordings {\n                      buildId\n                      id\n                      uuid\n                      title\n                      isProcessed\n                      duration\n                      createdAt\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    ":
    types.GetWorkspaceTestExecutionsDocument,
  "\n      query GetWorkspaceTests($workspaceId: ID!, $startTime: String, $endTime: String) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            tests(filter: { startTime: $startTime, endTime: $endTime }) {\n              edges {\n                node {\n                  testId\n                  title\n                  scope\n                  stats {\n                    passed\n                    failed\n                    flaky\n                    skipped\n                    unknown\n                    failureRate\n                    flakyRate\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    ":
    types.GetWorkspaceTestsDocument,
  "\n    query GetWorkspaces {\n      viewer {\n        workspaces {\n          edges {\n            node {\n              hasPaymentMethod\n              id\n              invitationCode\n              isOrganization\n              isTest\n              name\n              retentionLimit\n              settings {\n                features\n              }\n              subscription {\n                id\n                plan {\n                  id\n                  key\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ":
    types.GetWorkspacesDocument,
  "\n      mutation RemoveUserFromWorkspace($membershipId: ID!) {\n        removeWorkspaceMember(input: { id: $membershipId }) {\n          success\n        }\n      }\n    ":
    types.RemoveUserFromWorkspaceDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation CloseAuthRequest($key: String!) {\n        closeAuthRequest(input: { key: $key }) {\n          success\n          token\n        }\n      }\n    "
): (typeof documents)["\n      mutation CloseAuthRequest($key: String!) {\n        closeAuthRequest(input: { key: $key }) {\n          success\n          token\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation CreateUserAPIKey($label: String!, $scopes: [String!]!) {\n        createUserAPIKey(input: { label: $label, scopes: $scopes }) {\n          key {\n            id\n            label\n          }\n          keyValue\n        }\n      }\n    "
): (typeof documents)["\n      mutation CreateUserAPIKey($label: String!, $scopes: [String!]!) {\n        createUserAPIKey(input: { label: $label, scopes: $scopes }) {\n          key {\n            id\n            label\n          }\n          keyValue\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation CreateNewWorkspace($name: String!, $planKey: String!) {\n        createWorkspace(input: { name: $name, planKey: $planKey }) {\n          success\n          workspace {\n            id\n            invitationCode\n            domain\n            isDomainLimitedCode\n          }\n        }\n      }\n    "
): (typeof documents)["\n      mutation CreateNewWorkspace($name: String!, $planKey: String!) {\n        createWorkspace(input: { name: $name, planKey: $planKey }) {\n          success\n          workspace {\n            id\n            invitationCode\n            domain\n            isDomainLimitedCode\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation CreateWorkspaceAPIKey(\n        $workspaceId: ID!\n        $label: String!\n        $scopes: [String!]!\n        $apiKey: String\n      ) {\n        createWorkspaceAPIKey(\n          input: { workspaceId: $workspaceId, label: $label, scopes: $scopes, apiKey: $apiKey }\n        ) {\n          key {\n            id\n            label\n          }\n          keyValue\n        }\n      }\n    "
): (typeof documents)["\n      mutation CreateWorkspaceAPIKey(\n        $workspaceId: ID!\n        $label: String!\n        $scopes: [String!]!\n        $apiKey: String\n      ) {\n        createWorkspaceAPIKey(\n          input: { workspaceId: $workspaceId, label: $label, scopes: $scopes, apiKey: $apiKey }\n        ) {\n          key {\n            id\n            label\n          }\n          keyValue\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation DeleteUserAPIKey($id: ID!) {\n        deleteUserAPIKey(input: { id: $id }) {\n          success\n        }\n      }\n    "
): (typeof documents)["\n      mutation DeleteUserAPIKey($id: ID!) {\n        deleteUserAPIKey(input: { id: $id }) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation DeleteWorkspace($workspaceId: ID!, $shouldDeleteRecordings: Boolean!) {\n        deleteWorkspace(\n          input: { workspaceId: $workspaceId, shouldDeleteRecordings: $shouldDeleteRecordings }\n        ) {\n          success\n        }\n      }\n    "
): (typeof documents)["\n      mutation DeleteWorkspace($workspaceId: ID!, $shouldDeleteRecordings: Boolean!) {\n        deleteWorkspace(\n          input: { workspaceId: $workspaceId, shouldDeleteRecordings: $shouldDeleteRecordings }\n        ) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation DeleteWorkspaceAPIKey($id: ID!) {\n        deleteWorkspaceAPIKey(input: { id: $id }) {\n          success\n        }\n      }\n    "
): (typeof documents)["\n      mutation DeleteWorkspaceAPIKey($id: ID!) {\n        deleteWorkspaceAPIKey(input: { id: $id }) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation FulfillAuthRequest($secret: String!, $id: String!, $token: String!) {\n        fulfillAuthRequest(input: { secret: $secret, id: $id, token: $token }) {\n          success\n          source\n        }\n      }\n    "
): (typeof documents)["\n      mutation FulfillAuthRequest($secret: String!, $id: String!, $token: String!) {\n        fulfillAuthRequest(input: { secret: $secret, id: $id, token: $token }) {\n          success\n          source\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetAuthConnection($email: String!) {\n    auth {\n      connection(email: $email)\n    }\n  }\n"
): (typeof documents)["\n  query GetAuthConnection($email: String!) {\n    auth {\n      connection(email: $email)\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetUser {\n        viewer {\n          email\n          internal\n          nags\n          user {\n            name\n            picture\n            id\n          }\n        }\n      }\n    "
): (typeof documents)["\n      query GetUser {\n        viewer {\n          email\n          internal\n          nags\n          user {\n            name\n            picture\n            id\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetRecordingPhoto($recordingId: UUID!) {\n    recording(uuid: $recordingId) {\n      thumbnail\n      uuid\n    }\n  }\n"
): (typeof documents)["\n  query GetRecordingPhoto($recordingId: UUID!) {\n    recording(uuid: $recordingId) {\n      thumbnail\n      uuid\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetWorkspaceMemberRoles($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            members {\n              edges {\n                node {\n                  ... on WorkspaceUserMember {\n                    __typename\n                    id\n                    roles\n                    user {\n                      id\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      query GetWorkspaceMemberRoles($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            members {\n              edges {\n                node {\n                  ... on WorkspaceUserMember {\n                    __typename\n                    id\n                    roles\n                    user {\n                      id\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetWorkspaceMembers($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            members {\n              edges {\n                node {\n                  ... on WorkspaceUserMember {\n                    __typename\n                    id\n                    roles\n                    user {\n                      id\n                      name\n                      picture\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      query GetWorkspaceMembers($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            members {\n              edges {\n                node {\n                  ... on WorkspaceUserMember {\n                    __typename\n                    id\n                    roles\n                    user {\n                      id\n                      name\n                      picture\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetWorkspaceSubscriptionStatus($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            subscription {\n              id\n              status\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      query GetWorkspaceSubscriptionStatus($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            subscription {\n              id\n              status\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetWorkspace($workspaceId: ID!) {\n    node(id: $workspaceId) {\n      ... on Workspace {\n        id\n        isOrganization\n        isTest\n        retentionLimit\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetWorkspace($workspaceId: ID!) {\n    node(id: $workspaceId) {\n      ... on Workspace {\n        id\n        isOrganization\n        isTest\n        retentionLimit\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation InitAutRequest($key: String!, $source: String = "browser") {\n        initAuthRequest(input: { key: $key, source: $source }) {\n          id\n          challenge\n          serverKey\n        }\n      }\n    '
): (typeof documents)['\n      mutation InitAutRequest($key: String!, $source: String = "browser") {\n        initAuthRequest(input: { key: $key, source: $source }) {\n          id\n          challenge\n          serverKey\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation InviteWorkspaceMember($email: String!, $workspaceId: ID!, $roles: [String!]) {\n        addWorkspaceMember(input: { email: $email, workspaceId: $workspaceId, roles: $roles }) {\n          success\n        }\n      }\n    "
): (typeof documents)["\n      mutation InviteWorkspaceMember($email: String!, $workspaceId: ID!, $roles: [String!]) {\n        addWorkspaceMember(input: { email: $email, workspaceId: $workspaceId, roles: $roles }) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation ActivateWorkspaceSubscription(\n        $workspaceId: ID!\n        $planKey: String!\n        $paymentMethodBillingId: String!\n      ) {\n        setWorkspaceDefaultPaymentMethod(\n          input: { workspaceId: $workspaceId, paymentMethodId: $paymentMethodBillingId }\n        ) {\n          success\n        }\n        activateWorkspaceSubscription(input: { workspaceId: $workspaceId, planKey: $planKey }) {\n          success\n          subscription {\n            effectiveUntil\n            status\n          }\n        }\n      }\n    "
): (typeof documents)["\n      mutation ActivateWorkspaceSubscription(\n        $workspaceId: ID!\n        $planKey: String!\n        $paymentMethodBillingId: String!\n      ) {\n        setWorkspaceDefaultPaymentMethod(\n          input: { workspaceId: $workspaceId, paymentMethodId: $paymentMethodBillingId }\n        ) {\n          success\n        }\n        activateWorkspaceSubscription(input: { workspaceId: $workspaceId, planKey: $planKey }) {\n          success\n          subscription {\n            effectiveUntil\n            status\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation AddCollaborator($email: String!, $recordingId: ID!) {\n        addRecordingCollaborator(input: { email: $email, recordingId: $recordingId }) {\n          success\n        }\n      }\n    "
): (typeof documents)["\n      mutation AddCollaborator($email: String!, $recordingId: ID!) {\n        addRecordingCollaborator(input: { email: $email, recordingId: $recordingId }) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation ClaimTeamInvitationCode($code: ID!) {\n        claimTeamInvitationCode(input: { code: $code }) {\n          success\n          workspaceId\n        }\n      }\n    "
): (typeof documents)["\n      mutation ClaimTeamInvitationCode($code: ID!) {\n        claimTeamInvitationCode(input: { code: $code }) {\n          success\n          workspaceId\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation DeleteRecording($recordingId: ID!) {\n        deleteRecording(input: { id: $recordingId }) {\n          success\n        }\n      }\n    "
): (typeof documents)["\n      mutation DeleteRecording($recordingId: ID!) {\n        deleteRecording(input: { id: $recordingId }) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation DeleteCollaborator($collaborationId: ID!) {\n        removeRecordingCollaborator(input: { id: $collaborationId }) {\n          success\n        }\n      }\n    "
): (typeof documents)["\n      mutation DeleteCollaborator($collaborationId: ID!) {\n        removeRecordingCollaborator(input: { id: $collaborationId }) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query GetUserSettings {\n      viewer {\n        apiKeys {\n          id\n          createdAt\n          label\n          scopes\n          recordingCount\n          maxRecordings\n        }\n      }\n    }\n  "
): (typeof documents)["\n    query GetUserSettings {\n      viewer {\n        apiKeys {\n          id\n          createdAt\n          label\n          scopes\n          recordingCount\n          maxRecordings\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetWorkspaceApiKeys($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            apiKeys {\n              id\n              createdAt\n              label\n              scopes\n              recordingCount\n              maxRecordings\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      query GetWorkspaceApiKeys($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            apiKeys {\n              id\n              createdAt\n              label\n              scopes\n              recordingCount\n              maxRecordings\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetPersonalRecordings($filter: String) {\n        viewer {\n          recordings(filter: $filter) {\n            edges {\n              node {\n                buildId\n                duration\n                comments {\n                  id\n                }\n                createdAt\n                owner {\n                  id\n                  name\n                  picture\n                }\n                private\n                title\n                url\n                uuid\n                workspace {\n                  id\n                }\n              }\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      query GetPersonalRecordings($filter: String) {\n        viewer {\n          recordings(filter: $filter) {\n            edges {\n              node {\n                buildId\n                duration\n                comments {\n                  id\n                }\n                createdAt\n                owner {\n                  id\n                  name\n                  picture\n                }\n                private\n                title\n                url\n                uuid\n                workspace {\n                  id\n                }\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation PrepareWorkspacePaymentMethod($workspaceId: ID!) {\n        prepareWorkspacePaymentMethod(input: { workspaceId: $workspaceId }) {\n          success\n          paymentSecret\n        }\n      }\n    "
): (typeof documents)["\n      mutation PrepareWorkspacePaymentMethod($workspaceId: ID!) {\n        prepareWorkspacePaymentMethod(input: { workspaceId: $workspaceId }) {\n          success\n          paymentSecret\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetOwnerAndCollaborators($recordingId: UUID!) {\n        recording(uuid: $recordingId) {\n          uuid\n          collaborators {\n            edges {\n              node {\n                ... on RecordingPendingEmailCollaborator {\n                  id\n                  email\n                  createdAt\n                }\n                ... on RecordingPendingUserCollaborator {\n                  id\n                  user {\n                    name\n                    picture\n                  }\n                }\n                ... on RecordingUserCollaborator {\n                  id\n                  user {\n                    name\n                    picture\n                  }\n                }\n              }\n            }\n          }\n          collaboratorRequests {\n            edges {\n              node {\n                ... on RecordingCollaboratorRequest {\n                  id\n                  user {\n                    name\n                    picture\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      query GetOwnerAndCollaborators($recordingId: UUID!) {\n        recording(uuid: $recordingId) {\n          uuid\n          collaborators {\n            edges {\n              node {\n                ... on RecordingPendingEmailCollaborator {\n                  id\n                  email\n                  createdAt\n                }\n                ... on RecordingPendingUserCollaborator {\n                  id\n                  user {\n                    name\n                    picture\n                  }\n                }\n                ... on RecordingUserCollaborator {\n                  id\n                  user {\n                    name\n                    picture\n                  }\n                }\n              }\n            }\n          }\n          collaboratorRequests {\n            edges {\n              node {\n                ... on RecordingCollaboratorRequest {\n                  id\n                  user {\n                    name\n                    picture\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation RemovePaymentMethod($workspaceId: ID!, $paymentMethodId: String!) {\n        deleteWorkspacePaymentMethod(\n          input: { workspaceId: $workspaceId, paymentMethodId: $paymentMethodId }\n        ) {\n          success\n        }\n      }\n    "
): (typeof documents)["\n      mutation RemovePaymentMethod($workspaceId: ID!, $paymentMethodId: String!) {\n        deleteWorkspacePaymentMethod(\n          input: { workspaceId: $workspaceId, paymentMethodId: $paymentMethodId }\n        ) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetTestsRunsForWorkspace($workspaceId: ID!, $startTime: String, $endTime: String) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            testRuns(filter: { startTime: $startTime, endTime: $endTime }) {\n              edges {\n                node {\n                  id\n                  date\n                  mode\n                  results {\n                    counts {\n                      failed\n                      flaky\n                      passed\n                    }\n                  }\n                  source {\n                    commitId\n                    commitTitle\n                    groupLabel\n                    isPrimaryBranch\n                    branchName\n                    prNumber\n                    prTitle\n                    repository\n                    triggerUrl\n                    user\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      query GetTestsRunsForWorkspace($workspaceId: ID!, $startTime: String, $endTime: String) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            testRuns(filter: { startTime: $startTime, endTime: $endTime }) {\n              edges {\n                node {\n                  id\n                  date\n                  mode\n                  results {\n                    counts {\n                      failed\n                      flaky\n                      passed\n                    }\n                  }\n                  source {\n                    commitId\n                    commitTitle\n                    groupLabel\n                    isPrimaryBranch\n                    branchName\n                    prNumber\n                    prTitle\n                    repository\n                    triggerUrl\n                    user\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetTests($workspaceId: ID!, $id: String!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            testRuns(id: $id) {\n              edges {\n                node {\n                  tests(includeNonRecorded: true) {\n                    testId\n                    title\n                    scope\n                    sourcePath\n                    result\n                    errors\n                    durationMs\n                    executions {\n                      result\n                      recordings {\n                        buildId\n                        uuid\n                        duration\n                        isProcessed\n                        createdAt\n                        comments {\n                          user {\n                            id\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      query GetTests($workspaceId: ID!, $id: String!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            testRuns(id: $id) {\n              edges {\n                node {\n                  tests(includeNonRecorded: true) {\n                    testId\n                    title\n                    scope\n                    sourcePath\n                    result\n                    errors\n                    durationMs\n                    executions {\n                      result\n                      recordings {\n                        buildId\n                        uuid\n                        duration\n                        isProcessed\n                        createdAt\n                        comments {\n                          user {\n                            id\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation UpdateUserPreferences($preferences: JSONObject!) {\n        updateUserPreferences(input: { preferences: $preferences }) {\n          success\n        }\n      }\n    "
): (typeof documents)["\n      mutation UpdateUserPreferences($preferences: JSONObject!) {\n        updateUserPreferences(input: { preferences: $preferences }) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation UpdateWorkspaceMemberRoles($id: ID!, $roles: [String!]!) {\n        updateWorkspaceMemberRole(input: { id: $id, roles: $roles }) {\n          success\n        }\n      }\n    "
): (typeof documents)["\n      mutation UpdateWorkspaceMemberRoles($id: ID!, $roles: [String!]!) {\n        updateWorkspaceMemberRole(input: { id: $id, roles: $roles }) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation UpdateWorkspacePreferences($workspaceId: ID!, $name: String, $features: JSONObject) {\n        updateWorkspaceSettings(\n          input: { workspaceId: $workspaceId, name: $name, features: $features }\n        ) {\n          success\n        }\n      }\n    "
): (typeof documents)["\n      mutation UpdateWorkspacePreferences($workspaceId: ID!, $name: String, $features: JSONObject) {\n        updateWorkspaceSettings(\n          input: { workspaceId: $workspaceId, name: $name, features: $features }\n        ) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetWorkspaceRecordings($id: ID!, $filter: String) {\n        node(id: $id) {\n          ... on Workspace {\n            id\n            recordings(filter: $filter) {\n              edges {\n                node {\n                  buildId\n                  comments {\n                    id\n                  }\n                  createdAt\n                  duration\n                  metadata\n                  owner {\n                    id\n                    name\n                    picture\n                  }\n                  private\n                  title\n                  url\n                  uuid\n                  workspace {\n                    id\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      query GetWorkspaceRecordings($id: ID!, $filter: String) {\n        node(id: $id) {\n          ... on Workspace {\n            id\n            recordings(filter: $filter) {\n              edges {\n                node {\n                  buildId\n                  comments {\n                    id\n                  }\n                  createdAt\n                  duration\n                  metadata\n                  owner {\n                    id\n                    name\n                    picture\n                  }\n                  private\n                  title\n                  url\n                  uuid\n                  workspace {\n                    id\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetWorkspaceSubscription($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            subscription {\n              id\n              effectiveFrom\n              effectiveUntil\n              status\n              trialEnds\n              seatCount\n              paymentMethods {\n                id\n                type\n                default\n                card {\n                  brand\n                  last4\n                }\n              }\n              plan {\n                id\n                key\n                name\n              }\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      query GetWorkspaceSubscription($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            subscription {\n              id\n              effectiveFrom\n              effectiveUntil\n              status\n              trialEnds\n              seatCount\n              paymentMethods {\n                id\n                type\n                default\n                card {\n                  brand\n                  last4\n                }\n              }\n              plan {\n                id\n                key\n                name\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetWorkspaceTestExecutions(\n        $workspaceId: ID!\n        $testId: String\n        $startTime: String\n        $endTime: String\n      ) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            tests(filter: { testId: $testId, startTime: $startTime, endTime: $endTime }) {\n              edges {\n                node {\n                  executions {\n                    testRunId\n                    errors\n                    createdAt\n                    commitTitle\n                    commitAuthor\n                    result\n                    recordings {\n                      buildId\n                      id\n                      uuid\n                      title\n                      isProcessed\n                      duration\n                      createdAt\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      query GetWorkspaceTestExecutions(\n        $workspaceId: ID!\n        $testId: String\n        $startTime: String\n        $endTime: String\n      ) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            tests(filter: { testId: $testId, startTime: $startTime, endTime: $endTime }) {\n              edges {\n                node {\n                  executions {\n                    testRunId\n                    errors\n                    createdAt\n                    commitTitle\n                    commitAuthor\n                    result\n                    recordings {\n                      buildId\n                      id\n                      uuid\n                      title\n                      isProcessed\n                      duration\n                      createdAt\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetWorkspaceTests($workspaceId: ID!, $startTime: String, $endTime: String) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            tests(filter: { startTime: $startTime, endTime: $endTime }) {\n              edges {\n                node {\n                  testId\n                  title\n                  scope\n                  stats {\n                    passed\n                    failed\n                    flaky\n                    skipped\n                    unknown\n                    failureRate\n                    flakyRate\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      query GetWorkspaceTests($workspaceId: ID!, $startTime: String, $endTime: String) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            tests(filter: { startTime: $startTime, endTime: $endTime }) {\n              edges {\n                node {\n                  testId\n                  title\n                  scope\n                  stats {\n                    passed\n                    failed\n                    flaky\n                    skipped\n                    unknown\n                    failureRate\n                    flakyRate\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query GetWorkspaces {\n      viewer {\n        workspaces {\n          edges {\n            node {\n              hasPaymentMethod\n              id\n              invitationCode\n              isOrganization\n              isTest\n              name\n              retentionLimit\n              settings {\n                features\n              }\n              subscription {\n                id\n                plan {\n                  id\n                  key\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  "
): (typeof documents)["\n    query GetWorkspaces {\n      viewer {\n        workspaces {\n          edges {\n            node {\n              hasPaymentMethod\n              id\n              invitationCode\n              isOrganization\n              isTest\n              name\n              retentionLimit\n              settings {\n                features\n              }\n              subscription {\n                id\n                plan {\n                  id\n                  key\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation RemoveUserFromWorkspace($membershipId: ID!) {\n        removeWorkspaceMember(input: { id: $membershipId }) {\n          success\n        }\n      }\n    "
): (typeof documents)["\n      mutation RemoveUserFromWorkspace($membershipId: ID!) {\n        removeWorkspaceMember(input: { id: $membershipId }) {\n          success\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

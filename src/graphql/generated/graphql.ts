/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: { input: any; output: any; }
  bigint: { input: any; output: any; }
  interval: { input: any; output: any; }
  json: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamp: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

export type AcceptRecordingCollaboratorRequest = {
  __typename?: 'AcceptRecordingCollaboratorRequest';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AcceptRecordingCollaboratorRequestInput = {
  id: Scalars['ID']['input'];
};

export type AcceptTermsOfService = {
  __typename?: 'AcceptTermsOfService';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AcceptTermsOfServiceInput = {
  version: Scalars['Int']['input'];
};

export type AcceptWorkspaceMembership = {
  __typename?: 'AcceptWorkspaceMembership';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AcceptWorkspaceMembershipInput = {
  id: Scalars['ID']['input'];
};

export type ActivateWorkspaceSubscription = {
  __typename?: 'ActivateWorkspaceSubscription';
  subscription?: Maybe<WorkspaceSubscription>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ActivateWorkspaceSubscriptionInput = {
  planKey: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};

export type ActiveSession = {
  __typename?: 'ActiveSession';
  id: Scalars['ID']['output'];
  user?: Maybe<User>;
};

export type AddComment = {
  __typename?: 'AddComment';
  comment: Comment;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AddCommentInput = {
  content: Scalars['String']['input'];
  hasFrames: Scalars['Boolean']['input'];
  isPublished: Scalars['Boolean']['input'];
  point: Scalars['String']['input'];
  recordingId: Scalars['ID']['input'];
  time: Scalars['Float']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
  typeData?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type AddCommentReply = {
  __typename?: 'AddCommentReply';
  commentReply: CommentReply;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AddCommentReplyInput = {
  commentId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  isPublished: Scalars['Boolean']['input'];
};

export type AddPoint = {
  __typename?: 'AddPoint';
  point: Point;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AddPointInput = {
  badge?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  key: Scalars['String']['input'];
  recordingId: Scalars['ID']['input'];
  sourceLocation: Scalars['JSONObject']['input'];
};

export type AddRecordingCollaborator = {
  __typename?: 'AddRecordingCollaborator';
  collaborator: RecordingCollaborator;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AddRecordingCollaboratorInput = {
  email: Scalars['String']['input'];
  recordingId: Scalars['ID']['input'];
};

export type AddTestsToShard = {
  __typename?: 'AddTestsToShard';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AddTestsToShardInput = {
  testRunShardId: Scalars['String']['input'];
  tests: Array<TestRunTestInputType>;
};

export type AddWorkspaceMember = {
  __typename?: 'AddWorkspaceMember';
  member: WorkspaceMember;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AddWorkspaceMemberInput = {
  email: Scalars['String']['input'];
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
  workspaceId: Scalars['ID']['input'];
};

export type AuthenticatedUser = {
  __typename?: 'AuthenticatedUser';
  acceptedTOSVersion?: Maybe<Scalars['Int']['output']>;
  apiKeys: Array<AuthenticatedUserApiKey>;
  availableInvitations: Scalars['Int']['output'];
  canRecordUrl?: Maybe<Scalars['Boolean']['output']>;
  defaultWorkspace?: Maybe<Workspace>;
  email: Scalars['String']['output'];
  features: AuthenticatedUserFeatures;
  internal: Scalars['Boolean']['output'];
  invited: Scalars['Boolean']['output'];
  motd?: Maybe<Scalars['String']['output']>;
  nags: Array<Scalars['String']['output']>;
  preferences: Scalars['JSONObject']['output'];
  recordings: UserRecordingConnection;
  sentInvitations: UserSentInvitationConnection;
  settings: AuthenticatedUserSettings;
  unsubscribedEmailTypes: Array<Scalars['String']['output']>;
  user: User;
  workspaceInvitations: UserWorkspaceInvitationConnection;
  workspaces: UserWorkspaceConnection;
};


export type AuthenticatedUserCanRecordUrlArgs = {
  url: Scalars['String']['input'];
};


export type AuthenticatedUserRecordingsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthenticatedUserSentInvitationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthenticatedUserWorkspaceInvitationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthenticatedUserWorkspacesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AuthenticatedUserApiKey = {
  __typename?: 'AuthenticatedUserAPIKey';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  maxRecordings?: Maybe<Scalars['Int']['output']>;
  recordingCount: Scalars['Int']['output'];
  scopes: Array<Scalars['String']['output']>;
};

export type AuthenticatedUserFeatures = {
  __typename?: 'AuthenticatedUserFeatures';
  library: Scalars['Boolean']['output'];
};

export type AuthenticatedUserSettings = {
  __typename?: 'AuthenticatedUserSettings';
  disableLogRocket: Scalars['Boolean']['output'];
  enableEventLink: Scalars['Boolean']['output'];
  enableGlobalSearch: Scalars['Boolean']['output'];
  enableNetworkMonitor: Scalars['Boolean']['output'];
  enableRepaint: Scalars['Boolean']['output'];
  enableTeams: Scalars['Boolean']['output'];
  role: Scalars['String']['output'];
  showElements: Scalars['Boolean']['output'];
  showReact: Scalars['Boolean']['output'];
};

export type Authentication = {
  __typename?: 'Authentication';
  connection?: Maybe<Scalars['String']['output']>;
  details: Scalars['JSONObject']['output'];
  workspaces: WorkspacesConnection;
};


export type AuthenticationConnectionArgs = {
  email: Scalars['String']['input'];
};


export type AuthenticationDetailsArgs = {
  secret: Scalars['String']['input'];
};


export type AuthenticationWorkspacesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export type CancelWorkspaceSubscription = {
  __typename?: 'CancelWorkspaceSubscription';
  subscription?: Maybe<WorkspaceSubscription>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CancelWorkspaceSubscriptionInput = {
  workspaceId: Scalars['ID']['input'];
};

export type ClaimTeamInvitationCode = {
  __typename?: 'ClaimTeamInvitationCode';
  success?: Maybe<Scalars['Boolean']['output']>;
  workspaceId: Scalars['String']['output'];
};

export type ClaimTeamInvitationCodeInput = {
  code: Scalars['ID']['input'];
};

export type CloneTestRecording = {
  __typename?: 'CloneTestRecording';
  recordingId: Scalars['String']['output'];
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CloneTestRecordingInput = {
  recordingId: Scalars['UUID']['input'];
  secret: Scalars['String']['input'];
};

export type CloseAuthRequest = {
  __typename?: 'CloseAuthRequest';
  success?: Maybe<Scalars['Boolean']['output']>;
  token: Scalars['String']['output'];
};

export type CloseAuthRequestInput = {
  key: Scalars['String']['input'];
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  hasFrames: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isPublished?: Maybe<Scalars['Boolean']['output']>;
  point: Scalars['String']['output'];
  replies: Array<CommentReply>;
  time: Scalars['Float']['output'];
  type?: Maybe<Scalars['String']['output']>;
  typeData?: Maybe<Scalars['JSONObject']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type CommentReply = {
  __typename?: 'CommentReply';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isPublished?: Maybe<Scalars['Boolean']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type CompleteTestRunShard = {
  __typename?: 'CompleteTestRunShard';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CompleteTestRunShardInput = {
  testRunShardId: Scalars['String']['input'];
};

export type CreatePlan = {
  __typename?: 'CreatePlan';
  plan?: Maybe<Plan>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CreatePlanInput = {
  billingId: Scalars['String']['input'];
  key: Scalars['String']['input'];
  maxRecordings?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  trialDurationDays?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};

export type CreateRecording = {
  __typename?: 'CreateRecording';
  recording?: Maybe<Recording>;
  result: Scalars['String']['output'];
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateRecordingInput = {
  buildId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  secret: Scalars['String']['input'];
};

export type CreateUserApiKey = {
  __typename?: 'CreateUserAPIKey';
  key: WorkspaceApiKey;
  keyValue: Scalars['String']['output'];
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateUserApiKeyInput = {
  label: Scalars['String']['input'];
  scopes: Array<Scalars['String']['input']>;
};

export type CreateWorkspace = {
  __typename?: 'CreateWorkspace';
  success?: Maybe<Scalars['Boolean']['output']>;
  workspace?: Maybe<Workspace>;
};

export type CreateWorkspaceApiKey = {
  __typename?: 'CreateWorkspaceAPIKey';
  key: WorkspaceApiKey;
  keyValue: Scalars['String']['output'];
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateWorkspaceApiKeyInput = {
  label: Scalars['String']['input'];
  scopes: Array<Scalars['String']['input']>;
  workspaceId: Scalars['ID']['input'];
};

export type CreateWorkspaceInput = {
  name: Scalars['String']['input'];
  planKey: Scalars['String']['input'];
};

export type DeleteComment = {
  __typename?: 'DeleteComment';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteCommentInput = {
  id: Scalars['ID']['input'];
};

export type DeleteCommentReply = {
  __typename?: 'DeleteCommentReply';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteCommentReplyInput = {
  id: Scalars['ID']['input'];
};

export type DeleteExpiredRecording = {
  __typename?: 'DeleteExpiredRecording';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteExpiredRecordingInput = {
  recordingId: Scalars['UUID']['input'];
  secret: Scalars['String']['input'];
};

export type DeletePoint = {
  __typename?: 'DeletePoint';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeletePointInput = {
  key: Scalars['String']['input'];
  recordingId: Scalars['String']['input'];
};

export type DeleteRecording = {
  __typename?: 'DeleteRecording';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteRecordingInput = {
  id: Scalars['ID']['input'];
};

export type DeleteTestRecording = {
  __typename?: 'DeleteTestRecording';
  recordingId: Scalars['String']['output'];
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteTestRecordingInput = {
  recordingId: Scalars['UUID']['input'];
  secret: Scalars['String']['input'];
};

export type DeleteUserApiKey = {
  __typename?: 'DeleteUserAPIKey';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteUserApiKeyInput = {
  id: Scalars['ID']['input'];
};

export type DeleteWorkspace = {
  __typename?: 'DeleteWorkspace';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteWorkspaceApiKey = {
  __typename?: 'DeleteWorkspaceAPIKey';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteWorkspaceApiKeyInput = {
  id: Scalars['ID']['input'];
};

export type DeleteWorkspaceInput = {
  shouldDeleteRecordings: Scalars['Boolean']['input'];
  workspaceId: Scalars['ID']['input'];
};

export type DeleteWorkspacePaymentMethod = {
  __typename?: 'DeleteWorkspacePaymentMethod';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteWorkspacePaymentMethodInput = {
  paymentMethodId: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};

export type DismissNag = {
  __typename?: 'DismissNag';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DismissNagInput = {
  nag: Scalars['String']['input'];
};

export type EnsureUserForAuth = {
  __typename?: 'EnsureUserForAuth';
  id: Scalars['String']['output'];
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type EnsureUserForAuthInput = {
  authId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  idp?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  nickname?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  secret: Scalars['String']['input'];
};

export type FulfillAuthRequest = {
  __typename?: 'FulfillAuthRequest';
  id: Scalars['String']['output'];
  source: Scalars['String']['output'];
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type FulfillAuthRequestInput = {
  id: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type InitAuthRequest = {
  __typename?: 'InitAuthRequest';
  challenge: Scalars['String']['output'];
  id: Scalars['String']['output'];
  serverKey: Scalars['String']['output'];
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type InitAuthRequestInput = {
  key: Scalars['String']['input'];
  source?: InputMaybe<Scalars['String']['input']>;
};

export type InitializeRecording = {
  __typename?: 'InitializeRecording';
  recording?: Maybe<Recording>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type InitializeRecordingInput = {
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type MaybeAcceptWorkspaceMembershipForRecording = {
  __typename?: 'MaybeAcceptWorkspaceMembershipForRecording';
  isWorkspaceMember: Scalars['Boolean']['output'];
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type MaybeAcceptWorkspaceMembershipForRecordingInput = {
  recordingId: Scalars['ID']['input'];
};

export type MaybeMarkRecordingViewed = {
  __typename?: 'MaybeMarkRecordingViewed';
  success?: Maybe<Scalars['Boolean']['output']>;
  viewed: Scalars['Boolean']['output'];
};

export type MaybeMarkRecordingViewedInput = {
  recordingId: Scalars['UUID']['input'];
  secret: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptRecordingCollaboratorRequest: AcceptRecordingCollaboratorRequest;
  acceptTermsOfService: AcceptTermsOfService;
  acceptWorkspaceMembership: AcceptWorkspaceMembership;
  activateWorkspaceSubscription: ActivateWorkspaceSubscription;
  addComment: AddComment;
  addCommentReply: AddCommentReply;
  addPoint: AddPoint;
  addRecordingCollaborator: AddRecordingCollaborator;
  addTestsToShard: AddTestsToShard;
  addWorkspaceMember: AddWorkspaceMember;
  cancelWorkspaceSubscription: CancelWorkspaceSubscription;
  claimTeamInvitationCode: ClaimTeamInvitationCode;
  cloneTestRecording: CloneTestRecording;
  closeAuthRequest: CloseAuthRequest;
  completeTestRunShard: CompleteTestRunShard;
  createPlan: CreatePlan;
  createRecording: CreateRecording;
  createUserAPIKey: CreateUserApiKey;
  createWorkspace: CreateWorkspace;
  createWorkspaceAPIKey: CreateWorkspaceApiKey;
  deleteComment: DeleteComment;
  deleteCommentReply: DeleteCommentReply;
  deleteExpiredRecording: DeleteExpiredRecording;
  deletePoint: DeletePoint;
  deleteRecording: DeleteRecording;
  deleteTestRecording: DeleteTestRecording;
  deleteUserAPIKey: DeleteUserApiKey;
  deleteWorkspace: DeleteWorkspace;
  deleteWorkspaceAPIKey: DeleteWorkspaceApiKey;
  deleteWorkspacePaymentMethod: DeleteWorkspacePaymentMethod;
  dismissNag: DismissNag;
  ensureUserForAuth: EnsureUserForAuth;
  fulfillAuthRequest: FulfillAuthRequest;
  initAuthRequest: InitAuthRequest;
  initializeRecording: InitializeRecording;
  maybeAcceptWorkspaceMembershipForRecording: MaybeAcceptWorkspaceMembershipForRecording;
  maybeMarkRecordingViewed: MaybeMarkRecordingViewed;
  prepareWorkspacePaymentMethod: PrepareWorkspacePaymentMethod;
  rejectWorkspaceMembership: RejectWorkspaceMembership;
  removeRecordingCollaborator: RemoveRecordingCollaborator;
  removeWorkspaceMember: RemoveWorkspaceMember;
  requestRecordingAccess: RequestRecordingAccess;
  resetTestUser: ResetTestUser;
  sendUserInvitation: SendUserInvitation;
  setRecordingMetadata: SetRecordingMetadata;
  setWorkspaceDefaultPaymentMethod: SetWorkspaceDefaultPaymentMethod;
  startTestRunShard: StartTestRunShard;
  subscribeToEmailType: SubscribeToEmailType;
  unsubscribeToEmailType: UnsubscribeToEmailType;
  updateComment: UpdateComment;
  updateCommentReply: UpdateCommentReply;
  updatePoint: UpdatePoint;
  updateRecordingPrivacy: UpdateRecordingPrivacy;
  updateRecordingResolution: UpdateRecordingResolution;
  updateRecordingTitle: UpdateRecordingTitle;
  updateRecordingWorkspace: UpdateRecordingWorkspace;
  updateSubscriptionStatus: UpdateSubscriptionStatus;
  updateUserDefaultWorkspace: UpdateUserDefaultWorkspace;
  updateUserPreferences: UpdateUserPreferences;
  updateUserSettings: UpdateUserSettings;
  updateWorkspaceCodeDomainLimitations: UpdateWorkspaceCodeDomainLimitations;
  updateWorkspaceLogo: UpdateWorkspaceLogo;
  updateWorkspaceMemberRole: UpdateWorkspaceMemberRole;
  updateWorkspaceSettings: UpdateWorkspaceSettings;
  updateWorkspaceSubscriptionStatus: UpdateWorkspaceSubscriptionStatus;
};


export type MutationAcceptRecordingCollaboratorRequestArgs = {
  input: AcceptRecordingCollaboratorRequestInput;
};


export type MutationAcceptTermsOfServiceArgs = {
  input: AcceptTermsOfServiceInput;
};


export type MutationAcceptWorkspaceMembershipArgs = {
  input: AcceptWorkspaceMembershipInput;
};


export type MutationActivateWorkspaceSubscriptionArgs = {
  input: ActivateWorkspaceSubscriptionInput;
};


export type MutationAddCommentArgs = {
  input: AddCommentInput;
};


export type MutationAddCommentReplyArgs = {
  input: AddCommentReplyInput;
};


export type MutationAddPointArgs = {
  input: AddPointInput;
};


export type MutationAddRecordingCollaboratorArgs = {
  input: AddRecordingCollaboratorInput;
};


export type MutationAddTestsToShardArgs = {
  input: AddTestsToShardInput;
};


export type MutationAddWorkspaceMemberArgs = {
  input: AddWorkspaceMemberInput;
};


export type MutationCancelWorkspaceSubscriptionArgs = {
  input: CancelWorkspaceSubscriptionInput;
};


export type MutationClaimTeamInvitationCodeArgs = {
  input: ClaimTeamInvitationCodeInput;
};


export type MutationCloneTestRecordingArgs = {
  input: CloneTestRecordingInput;
};


export type MutationCloseAuthRequestArgs = {
  input: CloseAuthRequestInput;
};


export type MutationCompleteTestRunShardArgs = {
  input: CompleteTestRunShardInput;
};


export type MutationCreatePlanArgs = {
  input: CreatePlanInput;
};


export type MutationCreateRecordingArgs = {
  input: CreateRecordingInput;
};


export type MutationCreateUserApiKeyArgs = {
  input: CreateUserApiKeyInput;
};


export type MutationCreateWorkspaceArgs = {
  input: CreateWorkspaceInput;
};


export type MutationCreateWorkspaceApiKeyArgs = {
  input: CreateWorkspaceApiKeyInput;
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type MutationDeleteCommentReplyArgs = {
  input: DeleteCommentReplyInput;
};


export type MutationDeleteExpiredRecordingArgs = {
  input: DeleteExpiredRecordingInput;
};


export type MutationDeletePointArgs = {
  input: DeletePointInput;
};


export type MutationDeleteRecordingArgs = {
  input: DeleteRecordingInput;
};


export type MutationDeleteTestRecordingArgs = {
  input: DeleteTestRecordingInput;
};


export type MutationDeleteUserApiKeyArgs = {
  input: DeleteUserApiKeyInput;
};


export type MutationDeleteWorkspaceArgs = {
  input: DeleteWorkspaceInput;
};


export type MutationDeleteWorkspaceApiKeyArgs = {
  input: DeleteWorkspaceApiKeyInput;
};


export type MutationDeleteWorkspacePaymentMethodArgs = {
  input: DeleteWorkspacePaymentMethodInput;
};


export type MutationDismissNagArgs = {
  input: DismissNagInput;
};


export type MutationEnsureUserForAuthArgs = {
  input: EnsureUserForAuthInput;
};


export type MutationFulfillAuthRequestArgs = {
  input: FulfillAuthRequestInput;
};


export type MutationInitAuthRequestArgs = {
  input: InitAuthRequestInput;
};


export type MutationInitializeRecordingArgs = {
  input: InitializeRecordingInput;
};


export type MutationMaybeAcceptWorkspaceMembershipForRecordingArgs = {
  input: MaybeAcceptWorkspaceMembershipForRecordingInput;
};


export type MutationMaybeMarkRecordingViewedArgs = {
  input: MaybeMarkRecordingViewedInput;
};


export type MutationPrepareWorkspacePaymentMethodArgs = {
  input: PrepareWorkspacePaymentMethodInput;
};


export type MutationRejectWorkspaceMembershipArgs = {
  input: RejectWorkspaceMembershipInput;
};


export type MutationRemoveRecordingCollaboratorArgs = {
  input: RemoveRecordingCollaboratorInput;
};


export type MutationRemoveWorkspaceMemberArgs = {
  input: RemoveWorkspaceMemberInput;
};


export type MutationRequestRecordingAccessArgs = {
  input: RequestRecordingAccessInput;
};


export type MutationResetTestUserArgs = {
  input: ResetTestUserInput;
};


export type MutationSendUserInvitationArgs = {
  input: SendUserInvitationInput;
};


export type MutationSetRecordingMetadataArgs = {
  input: SetRecordingMetadataInput;
};


export type MutationSetWorkspaceDefaultPaymentMethodArgs = {
  input: SetWorkspaceDefaultPaymentMethodInput;
};


export type MutationStartTestRunShardArgs = {
  input: StartTestRunShardInput;
};


export type MutationSubscribeToEmailTypeArgs = {
  input: SubscribeToEmailTypeInput;
};


export type MutationUnsubscribeToEmailTypeArgs = {
  input: UnsubscribeToEmailTypeInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdateCommentReplyArgs = {
  input: UpdateCommentReplyInput;
};


export type MutationUpdatePointArgs = {
  input: UpdatePointInput;
};


export type MutationUpdateRecordingPrivacyArgs = {
  input: UpdateRecordingPrivacyInput;
};


export type MutationUpdateRecordingResolutionArgs = {
  input: UpdateRecordingResolutionInput;
};


export type MutationUpdateRecordingTitleArgs = {
  input: UpdateRecordingTitleInput;
};


export type MutationUpdateRecordingWorkspaceArgs = {
  input: UpdateRecordingWorkspaceInput;
};


export type MutationUpdateSubscriptionStatusArgs = {
  input: UpdateSubscriptionStatusInput;
};


export type MutationUpdateUserDefaultWorkspaceArgs = {
  input: UpdateUserDefaultWorkspaceInput;
};


export type MutationUpdateUserPreferencesArgs = {
  input: UpdateUserPreferencesInput;
};


export type MutationUpdateUserSettingsArgs = {
  input: UpdateUserSettingsInput;
};


export type MutationUpdateWorkspaceCodeDomainLimitationsArgs = {
  input: UpdateWorkspaceCodeDomainLimitationsInput;
};


export type MutationUpdateWorkspaceLogoArgs = {
  input: UpdateWorkspaceLogoInput;
};


export type MutationUpdateWorkspaceMemberRoleArgs = {
  input: UpdateWorkspaceMemberRoleInput;
};


export type MutationUpdateWorkspaceSettingsArgs = {
  input: UpdateWorkspaceSettingsInput;
};


export type MutationUpdateWorkspaceSubscriptionStatusArgs = {
  input: UpdateWorkspaceSubscriptionStatusInput;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  card: PaymentMethodCard;
  default: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
};

export type PaymentMethodCard = {
  __typename?: 'PaymentMethodCard';
  brand: Scalars['String']['output'];
  last4: Scalars['String']['output'];
};

export type Plan = {
  __typename?: 'Plan';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Point = {
  __typename?: 'Point';
  badge?: Maybe<Scalars['String']['output']>;
  condition?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  key: Scalars['String']['output'];
  sourceLocation: Scalars['JSONObject']['output'];
  user?: Maybe<User>;
};

export type PrepareWorkspacePaymentMethod = {
  __typename?: 'PrepareWorkspacePaymentMethod';
  paymentSecret?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PrepareWorkspacePaymentMethodInput = {
  workspaceId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  auth: Authentication;
  expiredRecordingsByWorkspaceId: Array<Scalars['String']['output']>;
  node?: Maybe<Node>;
  recording?: Maybe<Recording>;
  testRun?: Maybe<TestRun>;
  testRuns: TestRunsConnection;
  viewer?: Maybe<AuthenticatedUser>;
  workspace?: Maybe<Workspace>;
};


export type QueryExpiredRecordingsByWorkspaceIdArgs = {
  secret: Scalars['String']['input'];
  uuid: Scalars['UUID']['input'];
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRecordingArgs = {
  uuid: Scalars['UUID']['input'];
};


export type QueryTestRunArgs = {
  clientKey?: InputMaybe<Scalars['String']['input']>;
  mergeId?: InputMaybe<Scalars['String']['input']>;
  repository?: InputMaybe<Scalars['String']['input']>;
  secret: Scalars['String']['input'];
};


export type QueryTestRunsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  mergeId?: InputMaybe<Scalars['String']['input']>;
  repository?: InputMaybe<Scalars['String']['input']>;
  secret: Scalars['String']['input'];
};


export type QueryWorkspaceArgs = {
  uuid: Scalars['UUID']['input'];
};

export type Recording = Node & {
  __typename?: 'Recording';
  activeSessions?: Maybe<Array<ActiveSession>>;
  buildId?: Maybe<Scalars['String']['output']>;
  collaboratorRequests?: Maybe<RecordingCollaboratorRequestsConnection>;
  collaborators?: Maybe<RecordingCollaboratorsConnection>;
  comments: Array<Comment>;
  createdAt: Scalars['DateTime']['output'];
  duration?: Maybe<Scalars['Int']['output']>;
  hasCrashed?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  isInTestWorkspace: Scalars['Boolean']['output'];
  isInitialized: Scalars['Boolean']['output'];
  isProcessed?: Maybe<Scalars['Boolean']['output']>;
  isTest: Scalars['Boolean']['output'];
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  operations?: Maybe<Scalars['JSONObject']['output']>;
  owner?: Maybe<User>;
  ownerNeedsInvite: Scalars['Boolean']['output'];
  private: Scalars['Boolean']['output'];
  recording_points: Array<Point>;
  resolution?: Maybe<Scalars['JSONObject']['output']>;
  rootCauseAnalysis?: Maybe<RootCauseAnalysis>;
  testRun?: Maybe<TestRun>;
  test_runner?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  userRole: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
  workspace?: Maybe<Workspace>;
};


export type RecordingCollaboratorRequestsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type RecordingCollaboratorsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type RecordingCollaborator = RecordingPendingEmailCollaborator | RecordingPendingUserCollaborator | RecordingUserCollaborator;

export type RecordingCollaboratorRequest = {
  __typename?: 'RecordingCollaboratorRequest';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  user: User;
};

export type RecordingCollaboratorRequestsConnection = {
  __typename?: 'RecordingCollaboratorRequestsConnection';
  edges: Array<RecordingCollaboratorRequestsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RecordingCollaboratorRequestsEdge = {
  __typename?: 'RecordingCollaboratorRequestsEdge';
  cursor: Scalars['String']['output'];
  node: RecordingCollaboratorRequest;
};

export type RecordingCollaboratorsConnection = {
  __typename?: 'RecordingCollaboratorsConnection';
  edges: Array<RecordingCollaboratorsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RecordingCollaboratorsEdge = {
  __typename?: 'RecordingCollaboratorsEdge';
  cursor: Scalars['String']['output'];
  node: RecordingCollaborator;
};

export type RecordingPendingEmailCollaborator = {
  __typename?: 'RecordingPendingEmailCollaborator';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  inviterEmail?: Maybe<Scalars['String']['output']>;
};

export type RecordingPendingUserCollaborator = {
  __typename?: 'RecordingPendingUserCollaborator';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  inviterEmail?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type RecordingUserCollaborator = {
  __typename?: 'RecordingUserCollaborator';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  inviterEmail?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type RejectWorkspaceMembership = {
  __typename?: 'RejectWorkspaceMembership';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RejectWorkspaceMembershipInput = {
  id: Scalars['ID']['input'];
};

export type RemoveRecordingCollaborator = {
  __typename?: 'RemoveRecordingCollaborator';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RemoveRecordingCollaboratorInput = {
  id: Scalars['ID']['input'];
};

export type RemoveWorkspaceMember = {
  __typename?: 'RemoveWorkspaceMember';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RemoveWorkspaceMemberInput = {
  id: Scalars['ID']['input'];
};

export type RequestRecordingAccess = {
  __typename?: 'RequestRecordingAccess';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RequestRecordingAccessInput = {
  recordingId: Scalars['ID']['input'];
};

export type ResetTestUser = {
  __typename?: 'ResetTestUser';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ResetTestUserInput = {
  email: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type RootCauseAnalysis = Node & {
  __typename?: 'RootCauseAnalysis';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  recordingId?: Maybe<Scalars['String']['output']>;
  result?: Maybe<Scalars['JSONObject']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  version?: Maybe<Scalars['Int']['output']>;
};

export type SampleInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SampleOutput = {
  __typename?: 'SampleOutput';
  auth_id: Scalars['String']['output'];
};

export type SendUserInvitation = {
  __typename?: 'SendUserInvitation';
  invitation: SentInvitation;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SendUserInvitationInput = {
  email: Scalars['String']['input'];
};

export type SentInvitation = {
  __typename?: 'SentInvitation';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
};

export type SetRecordingMetadata = {
  __typename?: 'SetRecordingMetadata';
  recording?: Maybe<Recording>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SetRecordingMetadataInput = {
  duration: Scalars['Int']['input'];
  extended?: InputMaybe<Scalars['JSONObject']['input']>;
  id: Scalars['ID']['input'];
  operations?: InputMaybe<Scalars['JSONObject']['input']>;
  secret: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type SetWorkspaceDefaultPaymentMethod = {
  __typename?: 'SetWorkspaceDefaultPaymentMethod';
  paymentMethodId?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SetWorkspaceDefaultPaymentMethodInput = {
  paymentMethodId: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};

export type StartTestRunShard = {
  __typename?: 'StartTestRunShard';
  success?: Maybe<Scalars['Boolean']['output']>;
  testRunId?: Maybe<Scalars['String']['output']>;
  testRunShardId?: Maybe<Scalars['String']['output']>;
};

export type StartTestRunShardInput = {
  clientKey: Scalars['String']['input'];
  testRun: TestRunShardInput;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  _nlike?: InputMaybe<Scalars['String']['input']>;
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  _similar?: InputMaybe<Scalars['String']['input']>;
};

export type SubscribeToEmailType = {
  __typename?: 'SubscribeToEmailType';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SubscribeToEmailTypeInput = {
  emailType: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  recording?: Maybe<Recording>;
};


export type SubscriptionRecordingArgs = {
  uuid?: InputMaybe<Scalars['UUID']['input']>;
};

export type TestExecution = {
  __typename?: 'TestExecution';
  attempt: Scalars['Int']['output'];
  branch?: Maybe<Scalars['String']['output']>;
  clientKey: Scalars['String']['output'];
  commitAuthor?: Maybe<Scalars['String']['output']>;
  commitId?: Maybe<Scalars['String']['output']>;
  commitTitle?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  durationMs: Scalars['Int']['output'];
  errors?: Maybe<Array<Scalars['String']['output']>>;
  index: Scalars['Int']['output'];
  mode?: Maybe<Scalars['String']['output']>;
  pullRequestId?: Maybe<Scalars['String']['output']>;
  pullRequestTitle?: Maybe<Scalars['String']['output']>;
  recordings: Array<Recording>;
  repository?: Maybe<Scalars['String']['output']>;
  result: Scalars['String']['output'];
  runTitle?: Maybe<Scalars['String']['output']>;
  runnerName?: Maybe<Scalars['String']['output']>;
  runnerVersion?: Maybe<Scalars['String']['output']>;
  scope: Scalars['JSONObject']['output'];
  sourcePath: Scalars['String']['output'];
  testId: Scalars['String']['output'];
  testRunId: Scalars['String']['output'];
  testRunShardId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  triggerReason?: Maybe<Scalars['String']['output']>;
  triggerUrl?: Maybe<Scalars['String']['output']>;
  triggerUser?: Maybe<Scalars['String']['output']>;
  workspaceId: Scalars['String']['output'];
};

export type TestRun = {
  __typename?: 'TestRun';
  date: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  mode?: Maybe<Scalars['String']['output']>;
  results: TestRunResults;
  shards: Array<TestRunShard>;
  source: TestRunSource;
  tests: Array<TestRunTest>;
  workspaceId: Scalars['String']['output'];
};


export type TestRunTestsArgs = {
  includeNonRecorded?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TestRunConnection = {
  __typename?: 'TestRunConnection';
  edges: Array<TestRunEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TestRunEdge = {
  __typename?: 'TestRunEdge';
  cursor: Scalars['String']['output'];
  node: TestRun;
};

export type TestRunResults = {
  __typename?: 'TestRunResults';
  counts: TestRunStats;
  recordings: Array<Recording>;
};

export type TestRunShard = {
  __typename?: 'TestRunShard';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
};

export type TestRunShardInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  commitId?: InputMaybe<Scalars['String']['input']>;
  commitTitle?: InputMaybe<Scalars['String']['input']>;
  commitUser?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  pullRequestId?: InputMaybe<Scalars['String']['input']>;
  pullRequestTitle?: InputMaybe<Scalars['String']['input']>;
  repository?: InputMaybe<Scalars['String']['input']>;
  runnerName?: InputMaybe<Scalars['String']['input']>;
  runnerVersion?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  triggerReason?: InputMaybe<Scalars['String']['input']>;
  triggerUrl?: InputMaybe<Scalars['String']['input']>;
  triggerUser?: InputMaybe<Scalars['String']['input']>;
};

export type TestRunSource = {
  __typename?: 'TestRunSource';
  branchName?: Maybe<Scalars['String']['output']>;
  commitId?: Maybe<Scalars['String']['output']>;
  commitTitle?: Maybe<Scalars['String']['output']>;
  groupLabel?: Maybe<Scalars['String']['output']>;
  isPrimaryBranch?: Maybe<Scalars['Boolean']['output']>;
  prNumber?: Maybe<Scalars['Int']['output']>;
  prTitle?: Maybe<Scalars['String']['output']>;
  repository?: Maybe<Scalars['String']['output']>;
  triggerUrl?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['String']['output']>;
};

export type TestRunStats = {
  __typename?: 'TestRunStats';
  failed: Scalars['Int']['output'];
  flaky: Scalars['Int']['output'];
  passed: Scalars['Int']['output'];
};

export type TestRunTest = {
  __typename?: 'TestRunTest';
  attempt: Scalars['Int']['output'];
  durationMs: Scalars['Int']['output'];
  errors?: Maybe<Array<Scalars['String']['output']>>;
  executions: Array<TestRunTestExecution>;
  id: Scalars['String']['output'];
  index: Scalars['Int']['output'];
  recordings: Array<Recording>;
  result: Scalars['String']['output'];
  scope: Array<Scalars['String']['output']>;
  sourcePath: Scalars['String']['output'];
  testId: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TestRunTestExecution = {
  __typename?: 'TestRunTestExecution';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  recordings: Array<Recording>;
  result: Scalars['String']['output'];
};

export type TestRunTestInputType = {
  attempt: Scalars['Int']['input'];
  duration: Scalars['Float']['input'];
  error?: InputMaybe<Scalars['String']['input']>;
  index: Scalars['Int']['input'];
  recordingIds: Array<Scalars['String']['input']>;
  result: Scalars['String']['input'];
  runnerGroupId?: InputMaybe<Scalars['String']['input']>;
  scope: Array<Scalars['String']['input']>;
  sourcePath: Scalars['String']['input'];
  testId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type TestRunsConnection = {
  __typename?: 'TestRunsConnection';
  edges: Array<TestRunsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TestRunsEdge = {
  __typename?: 'TestRunsEdge';
  cursor: Scalars['String']['output'];
  node: TestRun;
};

export type TestRunsFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export type Tests = {
  __typename?: 'Tests';
  executions: Array<TestExecution>;
  scope: Array<Scalars['String']['output']>;
  stats: TestsStats;
  testId: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TestsConnection = {
  __typename?: 'TestsConnection';
  edges: Array<TestsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TestsEdge = {
  __typename?: 'TestsEdge';
  cursor: Scalars['String']['output'];
  node: Tests;
};

export type TestsFilterInput = {
  endTime?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  testId?: InputMaybe<Scalars['String']['input']>;
};

export type TestsStats = {
  __typename?: 'TestsStats';
  failed: Scalars['Int']['output'];
  failureRate: Scalars['Float']['output'];
  flaky: Scalars['Int']['output'];
  flakyRate: Scalars['Float']['output'];
  passed: Scalars['Int']['output'];
  skipped: Scalars['Int']['output'];
  unknown: Scalars['Int']['output'];
};

export type UnsubscribeToEmailType = {
  __typename?: 'UnsubscribeToEmailType';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UnsubscribeToEmailTypeInput = {
  emailType: Scalars['String']['input'];
};

export type UpdateComment = {
  __typename?: 'UpdateComment';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateCommentInput = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  isPublished: Scalars['Boolean']['input'];
  position?: InputMaybe<Scalars['JSONObject']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  typeData?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type UpdateCommentReply = {
  __typename?: 'UpdateCommentReply';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateCommentReplyInput = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  isPublished: Scalars['Boolean']['input'];
};

export type UpdatePoint = {
  __typename?: 'UpdatePoint';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdatePointInput = {
  badge?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  key: Scalars['String']['input'];
  recordingId: Scalars['String']['input'];
};

export type UpdateRecordingPrivacy = {
  __typename?: 'UpdateRecordingPrivacy';
  recording?: Maybe<Recording>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateRecordingPrivacyInput = {
  id: Scalars['ID']['input'];
  private: Scalars['Boolean']['input'];
};

export type UpdateRecordingResolution = {
  __typename?: 'UpdateRecordingResolution';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateRecordingResolutionInput = {
  id: Scalars['ID']['input'];
  isResolved: Scalars['Boolean']['input'];
};

export type UpdateRecordingTitle = {
  __typename?: 'UpdateRecordingTitle';
  recording?: Maybe<Recording>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateRecordingTitleInput = {
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type UpdateRecordingWorkspace = {
  __typename?: 'UpdateRecordingWorkspace';
  recording: Recording;
  success?: Maybe<Scalars['Boolean']['output']>;
  workspace?: Maybe<Workspace>;
};

export type UpdateRecordingWorkspaceInput = {
  id: Scalars['ID']['input'];
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateSubscriptionStatus = {
  __typename?: 'UpdateSubscriptionStatus';
  subscription?: Maybe<WorkspaceSubscription>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateSubscriptionStatusInput = {
  effectiveUntil: Scalars['String']['input'];
  organizationUuid: Scalars['UUID']['input'];
  secret: Scalars['String']['input'];
  status: Scalars['String']['input'];
  subscriptionBillingId?: InputMaybe<Scalars['String']['input']>;
  trialEnds?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserDefaultWorkspace = {
  __typename?: 'UpdateUserDefaultWorkspace';
  success?: Maybe<Scalars['Boolean']['output']>;
  workspace?: Maybe<Workspace>;
};

export type UpdateUserDefaultWorkspaceInput = {
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateUserPreferences = {
  __typename?: 'UpdateUserPreferences';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateUserPreferencesInput = {
  preferences: Scalars['JSONObject']['input'];
};

export type UpdateUserSettings = {
  __typename?: 'UpdateUserSettings';
  success?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
};

export type UpdateUserSettingsInput = {
  disableLogRocket?: InputMaybe<Scalars['Boolean']['input']>;
  enableEventLink?: InputMaybe<Scalars['Boolean']['input']>;
  enableGlobalSearch?: InputMaybe<Scalars['Boolean']['input']>;
  enableNetworkMonitor?: InputMaybe<Scalars['Boolean']['input']>;
  enableRepaint?: InputMaybe<Scalars['Boolean']['input']>;
  enableTeams?: InputMaybe<Scalars['Boolean']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  showElements?: InputMaybe<Scalars['Boolean']['input']>;
  showReact?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateWorkspaceCodeDomainLimitations = {
  __typename?: 'UpdateWorkspaceCodeDomainLimitations';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateWorkspaceCodeDomainLimitationsInput = {
  isLimited: Scalars['Boolean']['input'];
  workspaceId: Scalars['ID']['input'];
};

export type UpdateWorkspaceLogo = {
  __typename?: 'UpdateWorkspaceLogo';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateWorkspaceLogoInput = {
  format?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  workspaceId: Scalars['ID']['input'];
};

export type UpdateWorkspaceMemberRole = {
  __typename?: 'UpdateWorkspaceMemberRole';
  member: WorkspaceMember;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateWorkspaceMemberRoleInput = {
  id: Scalars['ID']['input'];
  roles: Array<Scalars['String']['input']>;
};

export type UpdateWorkspaceSettings = {
  __typename?: 'UpdateWorkspaceSettings';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateWorkspaceSettingsInput = {
  features?: InputMaybe<Scalars['JSONObject']['input']>;
  motd?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  workspaceId: Scalars['ID']['input'];
};

export type UpdateWorkspaceSubscriptionStatus = {
  __typename?: 'UpdateWorkspaceSubscriptionStatus';
  subscription?: Maybe<WorkspaceSubscription>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateWorkspaceSubscriptionStatusInput = {
  effectiveUntil: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  status: Scalars['String']['input'];
  subscriptionBillingId?: InputMaybe<Scalars['String']['input']>;
  trialEnds?: InputMaybe<Scalars['String']['input']>;
  workspaceUuid: Scalars['UUID']['input'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  internal: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  priority: Scalars['Int']['output'];
  uuid: Scalars['UUID']['output'];
};

export type UserRecordingConnection = {
  __typename?: 'UserRecordingConnection';
  edges: Array<UserRecordingEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserRecordingEdge = {
  __typename?: 'UserRecordingEdge';
  cursor: Scalars['String']['output'];
  node: Recording;
};

export type UserSentInvitationConnection = {
  __typename?: 'UserSentInvitationConnection';
  edges: Array<UserSentInvitationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserSentInvitationEdge = {
  __typename?: 'UserSentInvitationEdge';
  cursor: Scalars['String']['output'];
  node: SentInvitation;
};

export type UserWorkspaceConnection = {
  __typename?: 'UserWorkspaceConnection';
  edges: Array<UserWorkspaceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserWorkspaceEdge = {
  __typename?: 'UserWorkspaceEdge';
  cursor: Scalars['String']['output'];
  node: Workspace;
};

export type UserWorkspaceInvitationConnection = {
  __typename?: 'UserWorkspaceInvitationConnection';
  edges: Array<UserWorkspaceInvitationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserWorkspaceInvitationEdge = {
  __typename?: 'UserWorkspaceInvitationEdge';
  cursor: Scalars['String']['output'];
  node: WorkspaceInvitation;
};

export type Workspace = Node & {
  __typename?: 'Workspace';
  apiKeys?: Maybe<Array<WorkspaceApiKey>>;
  creator?: Maybe<User>;
  domain?: Maybe<Scalars['String']['output']>;
  hasPaymentMethod: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  invitationCode?: Maybe<Scalars['String']['output']>;
  isDomainLimitedCode?: Maybe<Scalars['Boolean']['output']>;
  isOrganization: Scalars['Boolean']['output'];
  isTest: Scalars['Boolean']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  logoFormat?: Maybe<Scalars['String']['output']>;
  members?: Maybe<WorkspaceMemberConnection>;
  name: Scalars['String']['output'];
  recordingCount: Scalars['Int']['output'];
  recordings?: Maybe<WorkspaceRecordingConnection>;
  retentionLimit?: Maybe<Scalars['Int']['output']>;
  settings?: Maybe<WorkspaceSettings>;
  subscription?: Maybe<WorkspaceSubscription>;
  testRuns?: Maybe<TestRunConnection>;
  tests?: Maybe<TestsConnection>;
  uuid: Scalars['UUID']['output'];
};


export type WorkspaceMembersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type WorkspaceRecordingsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type WorkspaceTestRunsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<TestRunsFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type WorkspaceTestsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<TestsFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
};

export type WorkspaceApiKey = {
  __typename?: 'WorkspaceAPIKey';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  maxRecordings?: Maybe<Scalars['Int']['output']>;
  recordingCount: Scalars['Int']['output'];
  scopes: Array<Scalars['String']['output']>;
};

export type WorkspaceInvitation = {
  __typename?: 'WorkspaceInvitation';
  createdAt: Scalars['DateTime']['output'];
  inviterEmail?: Maybe<Scalars['String']['output']>;
  workspace: Workspace;
};

export type WorkspaceMember = WorkspacePendingEmailMember | WorkspacePendingUserMember | WorkspaceUserMember;

export type WorkspaceMemberConnection = {
  __typename?: 'WorkspaceMemberConnection';
  edges: Array<WorkspaceMemberEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type WorkspaceMemberEdge = {
  __typename?: 'WorkspaceMemberEdge';
  cursor: Scalars['String']['output'];
  node: WorkspaceMember;
};

export type WorkspacePendingEmailMember = {
  __typename?: 'WorkspacePendingEmailMember';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  roles: Array<Scalars['String']['output']>;
};

export type WorkspacePendingUserMember = {
  __typename?: 'WorkspacePendingUserMember';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  roles: Array<Scalars['String']['output']>;
  user: User;
};

export type WorkspaceRecordingConnection = {
  __typename?: 'WorkspaceRecordingConnection';
  edges: Array<WorkspaceRecordingEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type WorkspaceRecordingEdge = {
  __typename?: 'WorkspaceRecordingEdge';
  cursor: Scalars['String']['output'];
  node: Recording;
};

export type WorkspaceSettings = {
  __typename?: 'WorkspaceSettings';
  features?: Maybe<Scalars['JSONObject']['output']>;
  motd?: Maybe<Scalars['String']['output']>;
};

export type WorkspaceSubscription = {
  __typename?: 'WorkspaceSubscription';
  availableSeatCount?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  effectiveFrom?: Maybe<Scalars['DateTime']['output']>;
  effectiveUntil?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  paymentMethods?: Maybe<Array<PaymentMethod>>;
  plan?: Maybe<Plan>;
  seatCount: Scalars['Int']['output'];
  status?: Maybe<Scalars['String']['output']>;
  trialEnds?: Maybe<Scalars['DateTime']['output']>;
};

export type WorkspaceUserMember = {
  __typename?: 'WorkspaceUserMember';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  roles: Array<Scalars['String']['output']>;
  user: User;
};

export type WorkspacesConnection = {
  __typename?: 'WorkspacesConnection';
  edges: Array<WorkspacesEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type WorkspacesEdge = {
  __typename?: 'WorkspacesEdge';
  cursor: Scalars['String']['output'];
  node: Workspace;
};

/** columns and relationships of "api_keys" */
export type Api_Keys = {
  __typename?: 'api_keys';
  created_at: Scalars['timestamptz']['output'];
  /** A user might want to regenerate a token, so we don't want to use the SHA as the ID. */
  id: Scalars['uuid']['output'];
  /** A label for users to describe what this token is. */
  label: Scalars['String']['output'];
  max_recordings?: Maybe<Scalars['Int']['output']>;
  recording_count: Scalars['Int']['output'];
  revoked: Scalars['Boolean']['output'];
  /** A JSON array of strings representing the permissions the key has. */
  scopes: Scalars['jsonb']['output'];
  /** The SHA256 hash of the token. */
  sha: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  /** The user who created this key. If this key has no workspace, recordings using this key will be assigned to this user. */
  user_id: Scalars['uuid']['output'];
  /** An object relationship */
  workspace?: Maybe<Workspaces>;
  /** The workspace that this key will work with, otherwise operations will be scoped to the user. */
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "api_keys" */
export type Api_KeysScopesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "api_keys" */
export type Api_Keys_Aggregate = {
  __typename?: 'api_keys_aggregate';
  aggregate?: Maybe<Api_Keys_Aggregate_Fields>;
  nodes: Array<Api_Keys>;
};

/** aggregate fields of "api_keys" */
export type Api_Keys_Aggregate_Fields = {
  __typename?: 'api_keys_aggregate_fields';
  avg?: Maybe<Api_Keys_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Api_Keys_Max_Fields>;
  min?: Maybe<Api_Keys_Min_Fields>;
  stddev?: Maybe<Api_Keys_Stddev_Fields>;
  stddev_pop?: Maybe<Api_Keys_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Api_Keys_Stddev_Samp_Fields>;
  sum?: Maybe<Api_Keys_Sum_Fields>;
  var_pop?: Maybe<Api_Keys_Var_Pop_Fields>;
  var_samp?: Maybe<Api_Keys_Var_Samp_Fields>;
  variance?: Maybe<Api_Keys_Variance_Fields>;
};


/** aggregate fields of "api_keys" */
export type Api_Keys_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Api_Keys_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "api_keys" */
export type Api_Keys_Aggregate_Order_By = {
  avg?: InputMaybe<Api_Keys_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Api_Keys_Max_Order_By>;
  min?: InputMaybe<Api_Keys_Min_Order_By>;
  stddev?: InputMaybe<Api_Keys_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Api_Keys_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Api_Keys_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Api_Keys_Sum_Order_By>;
  var_pop?: InputMaybe<Api_Keys_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Api_Keys_Var_Samp_Order_By>;
  variance?: InputMaybe<Api_Keys_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Api_Keys_Append_Input = {
  scopes?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "api_keys" */
export type Api_Keys_Arr_Rel_Insert_Input = {
  data: Array<Api_Keys_Insert_Input>;
  on_conflict?: InputMaybe<Api_Keys_On_Conflict>;
};

/** aggregate avg on columns */
export type Api_Keys_Avg_Fields = {
  __typename?: 'api_keys_avg_fields';
  max_recordings?: Maybe<Scalars['Float']['output']>;
  recording_count?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "api_keys" */
export type Api_Keys_Avg_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  recording_count?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "api_keys". All fields are combined with a logical 'AND'. */
export type Api_Keys_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Api_Keys_Bool_Exp>>>;
  _not?: InputMaybe<Api_Keys_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Api_Keys_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
  max_recordings?: InputMaybe<Int_Comparison_Exp>;
  recording_count?: InputMaybe<Int_Comparison_Exp>;
  revoked?: InputMaybe<Boolean_Comparison_Exp>;
  scopes?: InputMaybe<Jsonb_Comparison_Exp>;
  sha?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  workspace?: InputMaybe<Workspaces_Bool_Exp>;
  workspace_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "api_keys" */
export enum Api_Keys_Constraint {
  /** unique or primary key constraint */
  ApiKeysPkey = 'api_keys_pkey',
  /** unique or primary key constraint */
  ApiKeysShaKey = 'api_keys_sha_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Api_Keys_Delete_At_Path_Input = {
  scopes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Api_Keys_Delete_Elem_Input = {
  scopes?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Api_Keys_Delete_Key_Input = {
  scopes?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing integer column in table "api_keys" */
export type Api_Keys_Inc_Input = {
  max_recordings?: InputMaybe<Scalars['Int']['input']>;
  recording_count?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "api_keys" */
export type Api_Keys_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  max_recordings?: InputMaybe<Scalars['Int']['input']>;
  recording_count?: InputMaybe<Scalars['Int']['input']>;
  revoked?: InputMaybe<Scalars['Boolean']['input']>;
  scopes?: InputMaybe<Scalars['jsonb']['input']>;
  sha?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workspace?: InputMaybe<Workspaces_Obj_Rel_Insert_Input>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Api_Keys_Max_Fields = {
  __typename?: 'api_keys_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  max_recordings?: Maybe<Scalars['Int']['output']>;
  recording_count?: Maybe<Scalars['Int']['output']>;
  sha?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "api_keys" */
export type Api_Keys_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  max_recordings?: InputMaybe<Order_By>;
  recording_count?: InputMaybe<Order_By>;
  sha?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Api_Keys_Min_Fields = {
  __typename?: 'api_keys_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  max_recordings?: Maybe<Scalars['Int']['output']>;
  recording_count?: Maybe<Scalars['Int']['output']>;
  sha?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "api_keys" */
export type Api_Keys_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  max_recordings?: InputMaybe<Order_By>;
  recording_count?: InputMaybe<Order_By>;
  sha?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "api_keys" */
export type Api_Keys_Mutation_Response = {
  __typename?: 'api_keys_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Api_Keys>;
};

/** input type for inserting object relation for remote table "api_keys" */
export type Api_Keys_Obj_Rel_Insert_Input = {
  data: Api_Keys_Insert_Input;
  on_conflict?: InputMaybe<Api_Keys_On_Conflict>;
};

/** on conflict condition type for table "api_keys" */
export type Api_Keys_On_Conflict = {
  constraint: Api_Keys_Constraint;
  update_columns: Array<Api_Keys_Update_Column>;
  where?: InputMaybe<Api_Keys_Bool_Exp>;
};

/** ordering options when selecting data from "api_keys" */
export type Api_Keys_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  max_recordings?: InputMaybe<Order_By>;
  recording_count?: InputMaybe<Order_By>;
  revoked?: InputMaybe<Order_By>;
  scopes?: InputMaybe<Order_By>;
  sha?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  workspace?: InputMaybe<Workspaces_Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "api_keys" */
export type Api_Keys_Pk_Columns_Input = {
  /** A user might want to regenerate a token, so we don't want to use the SHA as the ID. */
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Api_Keys_Prepend_Input = {
  scopes?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "api_keys" */
export enum Api_Keys_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  MaxRecordings = 'max_recordings',
  /** column name */
  RecordingCount = 'recording_count',
  /** column name */
  Revoked = 'revoked',
  /** column name */
  Scopes = 'scopes',
  /** column name */
  Sha = 'sha',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** input type for updating data in table "api_keys" */
export type Api_Keys_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  max_recordings?: InputMaybe<Scalars['Int']['input']>;
  recording_count?: InputMaybe<Scalars['Int']['input']>;
  revoked?: InputMaybe<Scalars['Boolean']['input']>;
  scopes?: InputMaybe<Scalars['jsonb']['input']>;
  sha?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Api_Keys_Stddev_Fields = {
  __typename?: 'api_keys_stddev_fields';
  max_recordings?: Maybe<Scalars['Float']['output']>;
  recording_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "api_keys" */
export type Api_Keys_Stddev_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  recording_count?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Api_Keys_Stddev_Pop_Fields = {
  __typename?: 'api_keys_stddev_pop_fields';
  max_recordings?: Maybe<Scalars['Float']['output']>;
  recording_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "api_keys" */
export type Api_Keys_Stddev_Pop_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  recording_count?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Api_Keys_Stddev_Samp_Fields = {
  __typename?: 'api_keys_stddev_samp_fields';
  max_recordings?: Maybe<Scalars['Float']['output']>;
  recording_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "api_keys" */
export type Api_Keys_Stddev_Samp_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  recording_count?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Api_Keys_Sum_Fields = {
  __typename?: 'api_keys_sum_fields';
  max_recordings?: Maybe<Scalars['Int']['output']>;
  recording_count?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "api_keys" */
export type Api_Keys_Sum_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  recording_count?: InputMaybe<Order_By>;
};

/** update columns of table "api_keys" */
export enum Api_Keys_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  MaxRecordings = 'max_recordings',
  /** column name */
  RecordingCount = 'recording_count',
  /** column name */
  Revoked = 'revoked',
  /** column name */
  Scopes = 'scopes',
  /** column name */
  Sha = 'sha',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** aggregate var_pop on columns */
export type Api_Keys_Var_Pop_Fields = {
  __typename?: 'api_keys_var_pop_fields';
  max_recordings?: Maybe<Scalars['Float']['output']>;
  recording_count?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "api_keys" */
export type Api_Keys_Var_Pop_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  recording_count?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Api_Keys_Var_Samp_Fields = {
  __typename?: 'api_keys_var_samp_fields';
  max_recordings?: Maybe<Scalars['Float']['output']>;
  recording_count?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "api_keys" */
export type Api_Keys_Var_Samp_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  recording_count?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Api_Keys_Variance_Fields = {
  __typename?: 'api_keys_variance_fields';
  max_recordings?: Maybe<Scalars['Float']['output']>;
  recording_count?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "api_keys" */
export type Api_Keys_Variance_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  recording_count?: InputMaybe<Order_By>;
};

/** columns and relationships of "auth_requests" */
export type Auth_Requests = {
  __typename?: 'auth_requests';
  client_key: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  source: Scalars['String']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "auth_requests" */
export type Auth_Requests_Aggregate = {
  __typename?: 'auth_requests_aggregate';
  aggregate?: Maybe<Auth_Requests_Aggregate_Fields>;
  nodes: Array<Auth_Requests>;
};

/** aggregate fields of "auth_requests" */
export type Auth_Requests_Aggregate_Fields = {
  __typename?: 'auth_requests_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Auth_Requests_Max_Fields>;
  min?: Maybe<Auth_Requests_Min_Fields>;
};


/** aggregate fields of "auth_requests" */
export type Auth_Requests_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Auth_Requests_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "auth_requests" */
export type Auth_Requests_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Auth_Requests_Max_Order_By>;
  min?: InputMaybe<Auth_Requests_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth_requests" */
export type Auth_Requests_Arr_Rel_Insert_Input = {
  data: Array<Auth_Requests_Insert_Input>;
  on_conflict?: InputMaybe<Auth_Requests_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth_requests". All fields are combined with a logical 'AND'. */
export type Auth_Requests_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Auth_Requests_Bool_Exp>>>;
  _not?: InputMaybe<Auth_Requests_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Auth_Requests_Bool_Exp>>>;
  client_key?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  source?: InputMaybe<String_Comparison_Exp>;
  token?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth_requests" */
export enum Auth_Requests_Constraint {
  /** unique or primary key constraint */
  AuthRequestsPkey = 'auth_requests_pkey'
}

/** input type for inserting data into table "auth_requests" */
export type Auth_Requests_Insert_Input = {
  client_key?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Auth_Requests_Max_Fields = {
  __typename?: 'auth_requests_max_fields';
  client_key?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "auth_requests" */
export type Auth_Requests_Max_Order_By = {
  client_key?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Auth_Requests_Min_Fields = {
  __typename?: 'auth_requests_min_fields';
  client_key?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "auth_requests" */
export type Auth_Requests_Min_Order_By = {
  client_key?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth_requests" */
export type Auth_Requests_Mutation_Response = {
  __typename?: 'auth_requests_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Auth_Requests>;
};

/** input type for inserting object relation for remote table "auth_requests" */
export type Auth_Requests_Obj_Rel_Insert_Input = {
  data: Auth_Requests_Insert_Input;
  on_conflict?: InputMaybe<Auth_Requests_On_Conflict>;
};

/** on conflict condition type for table "auth_requests" */
export type Auth_Requests_On_Conflict = {
  constraint: Auth_Requests_Constraint;
  update_columns: Array<Auth_Requests_Update_Column>;
  where?: InputMaybe<Auth_Requests_Bool_Exp>;
};

/** ordering options when selecting data from "auth_requests" */
export type Auth_Requests_Order_By = {
  client_key?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "auth_requests" */
export type Auth_Requests_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "auth_requests" */
export enum Auth_Requests_Select_Column {
  /** column name */
  ClientKey = 'client_key',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Id = 'id',
  /** column name */
  Source = 'source',
  /** column name */
  Token = 'token'
}

/** input type for updating data in table "auth_requests" */
export type Auth_Requests_Set_Input = {
  client_key?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "auth_requests" */
export enum Auth_Requests_Update_Column {
  /** column name */
  ClientKey = 'client_key',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Id = 'id',
  /** column name */
  Source = 'source',
  /** column name */
  Token = 'token'
}

/** columns and relationships of "base_snapshots" */
export type Base_Snapshots = {
  __typename?: 'base_snapshots';
  asset_id: Scalars['String']['output'];
  checkpoint: Scalars['Int']['output'];
  created_at: Scalars['timestamptz']['output'];
  recording_id: Scalars['uuid']['output'];
  version_id: Scalars['Int']['output'];
};

/** aggregated selection of "base_snapshots" */
export type Base_Snapshots_Aggregate = {
  __typename?: 'base_snapshots_aggregate';
  aggregate?: Maybe<Base_Snapshots_Aggregate_Fields>;
  nodes: Array<Base_Snapshots>;
};

/** aggregate fields of "base_snapshots" */
export type Base_Snapshots_Aggregate_Fields = {
  __typename?: 'base_snapshots_aggregate_fields';
  avg?: Maybe<Base_Snapshots_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Base_Snapshots_Max_Fields>;
  min?: Maybe<Base_Snapshots_Min_Fields>;
  stddev?: Maybe<Base_Snapshots_Stddev_Fields>;
  stddev_pop?: Maybe<Base_Snapshots_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Base_Snapshots_Stddev_Samp_Fields>;
  sum?: Maybe<Base_Snapshots_Sum_Fields>;
  var_pop?: Maybe<Base_Snapshots_Var_Pop_Fields>;
  var_samp?: Maybe<Base_Snapshots_Var_Samp_Fields>;
  variance?: Maybe<Base_Snapshots_Variance_Fields>;
};


/** aggregate fields of "base_snapshots" */
export type Base_Snapshots_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Base_Snapshots_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "base_snapshots" */
export type Base_Snapshots_Aggregate_Order_By = {
  avg?: InputMaybe<Base_Snapshots_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Base_Snapshots_Max_Order_By>;
  min?: InputMaybe<Base_Snapshots_Min_Order_By>;
  stddev?: InputMaybe<Base_Snapshots_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Base_Snapshots_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Base_Snapshots_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Base_Snapshots_Sum_Order_By>;
  var_pop?: InputMaybe<Base_Snapshots_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Base_Snapshots_Var_Samp_Order_By>;
  variance?: InputMaybe<Base_Snapshots_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "base_snapshots" */
export type Base_Snapshots_Arr_Rel_Insert_Input = {
  data: Array<Base_Snapshots_Insert_Input>;
  on_conflict?: InputMaybe<Base_Snapshots_On_Conflict>;
};

/** aggregate avg on columns */
export type Base_Snapshots_Avg_Fields = {
  __typename?: 'base_snapshots_avg_fields';
  checkpoint?: Maybe<Scalars['Float']['output']>;
  version_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "base_snapshots" */
export type Base_Snapshots_Avg_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "base_snapshots". All fields are combined with a logical 'AND'. */
export type Base_Snapshots_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Base_Snapshots_Bool_Exp>>>;
  _not?: InputMaybe<Base_Snapshots_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Base_Snapshots_Bool_Exp>>>;
  asset_id?: InputMaybe<String_Comparison_Exp>;
  checkpoint?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  version_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "base_snapshots" */
export enum Base_Snapshots_Constraint {
  /** unique or primary key constraint */
  BaseSnapshotsAssetIdKey = 'base_snapshots_asset_id_key',
  /** unique or primary key constraint */
  BaseSnapshotsPkey = 'base_snapshots_pkey'
}

/** input type for incrementing integer column in table "base_snapshots" */
export type Base_Snapshots_Inc_Input = {
  checkpoint?: InputMaybe<Scalars['Int']['input']>;
  version_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "base_snapshots" */
export type Base_Snapshots_Insert_Input = {
  asset_id?: InputMaybe<Scalars['String']['input']>;
  checkpoint?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  version_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Base_Snapshots_Max_Fields = {
  __typename?: 'base_snapshots_max_fields';
  asset_id?: Maybe<Scalars['String']['output']>;
  checkpoint?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  version_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "base_snapshots" */
export type Base_Snapshots_Max_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  checkpoint?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Base_Snapshots_Min_Fields = {
  __typename?: 'base_snapshots_min_fields';
  asset_id?: Maybe<Scalars['String']['output']>;
  checkpoint?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  version_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "base_snapshots" */
export type Base_Snapshots_Min_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  checkpoint?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "base_snapshots" */
export type Base_Snapshots_Mutation_Response = {
  __typename?: 'base_snapshots_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Base_Snapshots>;
};

/** input type for inserting object relation for remote table "base_snapshots" */
export type Base_Snapshots_Obj_Rel_Insert_Input = {
  data: Base_Snapshots_Insert_Input;
  on_conflict?: InputMaybe<Base_Snapshots_On_Conflict>;
};

/** on conflict condition type for table "base_snapshots" */
export type Base_Snapshots_On_Conflict = {
  constraint: Base_Snapshots_Constraint;
  update_columns: Array<Base_Snapshots_Update_Column>;
  where?: InputMaybe<Base_Snapshots_Bool_Exp>;
};

/** ordering options when selecting data from "base_snapshots" */
export type Base_Snapshots_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  checkpoint?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "base_snapshots" */
export type Base_Snapshots_Pk_Columns_Input = {
  checkpoint: Scalars['Int']['input'];
  recording_id: Scalars['uuid']['input'];
  version_id: Scalars['Int']['input'];
};

/** select columns of table "base_snapshots" */
export enum Base_Snapshots_Select_Column {
  /** column name */
  AssetId = 'asset_id',
  /** column name */
  Checkpoint = 'checkpoint',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  VersionId = 'version_id'
}

/** input type for updating data in table "base_snapshots" */
export type Base_Snapshots_Set_Input = {
  asset_id?: InputMaybe<Scalars['String']['input']>;
  checkpoint?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  version_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Base_Snapshots_Stddev_Fields = {
  __typename?: 'base_snapshots_stddev_fields';
  checkpoint?: Maybe<Scalars['Float']['output']>;
  version_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "base_snapshots" */
export type Base_Snapshots_Stddev_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Base_Snapshots_Stddev_Pop_Fields = {
  __typename?: 'base_snapshots_stddev_pop_fields';
  checkpoint?: Maybe<Scalars['Float']['output']>;
  version_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "base_snapshots" */
export type Base_Snapshots_Stddev_Pop_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Base_Snapshots_Stddev_Samp_Fields = {
  __typename?: 'base_snapshots_stddev_samp_fields';
  checkpoint?: Maybe<Scalars['Float']['output']>;
  version_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "base_snapshots" */
export type Base_Snapshots_Stddev_Samp_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Base_Snapshots_Sum_Fields = {
  __typename?: 'base_snapshots_sum_fields';
  checkpoint?: Maybe<Scalars['Int']['output']>;
  version_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "base_snapshots" */
export type Base_Snapshots_Sum_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** update columns of table "base_snapshots" */
export enum Base_Snapshots_Update_Column {
  /** column name */
  AssetId = 'asset_id',
  /** column name */
  Checkpoint = 'checkpoint',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  VersionId = 'version_id'
}

/** aggregate var_pop on columns */
export type Base_Snapshots_Var_Pop_Fields = {
  __typename?: 'base_snapshots_var_pop_fields';
  checkpoint?: Maybe<Scalars['Float']['output']>;
  version_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "base_snapshots" */
export type Base_Snapshots_Var_Pop_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Base_Snapshots_Var_Samp_Fields = {
  __typename?: 'base_snapshots_var_samp_fields';
  checkpoint?: Maybe<Scalars['Float']['output']>;
  version_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "base_snapshots" */
export type Base_Snapshots_Var_Samp_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Base_Snapshots_Variance_Fields = {
  __typename?: 'base_snapshots_variance_fields';
  checkpoint?: Maybe<Scalars['Float']['output']>;
  version_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "base_snapshots" */
export type Base_Snapshots_Variance_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** expression to compare columns of type bigint. All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** columns and relationships of "cache_warming_results" */
export type Cache_Warming_Results = {
  __typename?: 'cache_warming_results';
  created_at: Scalars['timestamptz']['output'];
  finished_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  recording_id: Scalars['String']['output'];
  report?: Maybe<Scalars['jsonb']['output']>;
  session_id: Scalars['String']['output'];
  status: Scalars['String']['output'];
};


/** columns and relationships of "cache_warming_results" */
export type Cache_Warming_ResultsReportArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "cache_warming_results" */
export type Cache_Warming_Results_Aggregate = {
  __typename?: 'cache_warming_results_aggregate';
  aggregate?: Maybe<Cache_Warming_Results_Aggregate_Fields>;
  nodes: Array<Cache_Warming_Results>;
};

/** aggregate fields of "cache_warming_results" */
export type Cache_Warming_Results_Aggregate_Fields = {
  __typename?: 'cache_warming_results_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Cache_Warming_Results_Max_Fields>;
  min?: Maybe<Cache_Warming_Results_Min_Fields>;
};


/** aggregate fields of "cache_warming_results" */
export type Cache_Warming_Results_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Cache_Warming_Results_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "cache_warming_results" */
export type Cache_Warming_Results_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Cache_Warming_Results_Max_Order_By>;
  min?: InputMaybe<Cache_Warming_Results_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Cache_Warming_Results_Append_Input = {
  report?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "cache_warming_results" */
export type Cache_Warming_Results_Arr_Rel_Insert_Input = {
  data: Array<Cache_Warming_Results_Insert_Input>;
  on_conflict?: InputMaybe<Cache_Warming_Results_On_Conflict>;
};

/** Boolean expression to filter rows from the table "cache_warming_results". All fields are combined with a logical 'AND'. */
export type Cache_Warming_Results_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Cache_Warming_Results_Bool_Exp>>>;
  _not?: InputMaybe<Cache_Warming_Results_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Cache_Warming_Results_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  finished_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  recording_id?: InputMaybe<String_Comparison_Exp>;
  report?: InputMaybe<Jsonb_Comparison_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "cache_warming_results" */
export enum Cache_Warming_Results_Constraint {
  /** unique or primary key constraint */
  CacheWarmingResultsPkey = 'cache_warming_results_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Cache_Warming_Results_Delete_At_Path_Input = {
  report?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Cache_Warming_Results_Delete_Elem_Input = {
  report?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Cache_Warming_Results_Delete_Key_Input = {
  report?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "cache_warming_results" */
export type Cache_Warming_Results_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  finished_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  recording_id?: InputMaybe<Scalars['String']['input']>;
  report?: InputMaybe<Scalars['jsonb']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Cache_Warming_Results_Max_Fields = {
  __typename?: 'cache_warming_results_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  finished_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  recording_id?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "cache_warming_results" */
export type Cache_Warming_Results_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  finished_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Cache_Warming_Results_Min_Fields = {
  __typename?: 'cache_warming_results_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  finished_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  recording_id?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "cache_warming_results" */
export type Cache_Warming_Results_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  finished_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "cache_warming_results" */
export type Cache_Warming_Results_Mutation_Response = {
  __typename?: 'cache_warming_results_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Cache_Warming_Results>;
};

/** input type for inserting object relation for remote table "cache_warming_results" */
export type Cache_Warming_Results_Obj_Rel_Insert_Input = {
  data: Cache_Warming_Results_Insert_Input;
  on_conflict?: InputMaybe<Cache_Warming_Results_On_Conflict>;
};

/** on conflict condition type for table "cache_warming_results" */
export type Cache_Warming_Results_On_Conflict = {
  constraint: Cache_Warming_Results_Constraint;
  update_columns: Array<Cache_Warming_Results_Update_Column>;
  where?: InputMaybe<Cache_Warming_Results_Bool_Exp>;
};

/** ordering options when selecting data from "cache_warming_results" */
export type Cache_Warming_Results_Order_By = {
  created_at?: InputMaybe<Order_By>;
  finished_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  report?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "cache_warming_results" */
export type Cache_Warming_Results_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Cache_Warming_Results_Prepend_Input = {
  report?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "cache_warming_results" */
export enum Cache_Warming_Results_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FinishedAt = 'finished_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Report = 'report',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "cache_warming_results" */
export type Cache_Warming_Results_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  finished_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  recording_id?: InputMaybe<Scalars['String']['input']>;
  report?: InputMaybe<Scalars['jsonb']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "cache_warming_results" */
export enum Cache_Warming_Results_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FinishedAt = 'finished_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Report = 'report',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Status = 'status'
}

/** columns and relationships of "collaborator_requests" */
export type Collaborator_Requests = {
  __typename?: 'collaborator_requests';
  accepted: Scalars['Boolean']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  recording?: Maybe<Recordings>;
  recording_id: Scalars['uuid']['output'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "collaborator_requests" */
export type Collaborator_Requests_Aggregate = {
  __typename?: 'collaborator_requests_aggregate';
  aggregate?: Maybe<Collaborator_Requests_Aggregate_Fields>;
  nodes: Array<Collaborator_Requests>;
};

/** aggregate fields of "collaborator_requests" */
export type Collaborator_Requests_Aggregate_Fields = {
  __typename?: 'collaborator_requests_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Collaborator_Requests_Max_Fields>;
  min?: Maybe<Collaborator_Requests_Min_Fields>;
};


/** aggregate fields of "collaborator_requests" */
export type Collaborator_Requests_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Collaborator_Requests_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "collaborator_requests" */
export type Collaborator_Requests_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Collaborator_Requests_Max_Order_By>;
  min?: InputMaybe<Collaborator_Requests_Min_Order_By>;
};

/** input type for inserting array relation for remote table "collaborator_requests" */
export type Collaborator_Requests_Arr_Rel_Insert_Input = {
  data: Array<Collaborator_Requests_Insert_Input>;
  on_conflict?: InputMaybe<Collaborator_Requests_On_Conflict>;
};

/** Boolean expression to filter rows from the table "collaborator_requests". All fields are combined with a logical 'AND'. */
export type Collaborator_Requests_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Collaborator_Requests_Bool_Exp>>>;
  _not?: InputMaybe<Collaborator_Requests_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Collaborator_Requests_Bool_Exp>>>;
  accepted?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  recording?: InputMaybe<Recordings_Bool_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "collaborator_requests" */
export enum Collaborator_Requests_Constraint {
  /** unique or primary key constraint */
  CollaboratorRequestsPkey = 'collaborator_requests_pkey'
}

/** input type for inserting data into table "collaborator_requests" */
export type Collaborator_Requests_Insert_Input = {
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  recording?: InputMaybe<Recordings_Obj_Rel_Insert_Input>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Collaborator_Requests_Max_Fields = {
  __typename?: 'collaborator_requests_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "collaborator_requests" */
export type Collaborator_Requests_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Collaborator_Requests_Min_Fields = {
  __typename?: 'collaborator_requests_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "collaborator_requests" */
export type Collaborator_Requests_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "collaborator_requests" */
export type Collaborator_Requests_Mutation_Response = {
  __typename?: 'collaborator_requests_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Collaborator_Requests>;
};

/** input type for inserting object relation for remote table "collaborator_requests" */
export type Collaborator_Requests_Obj_Rel_Insert_Input = {
  data: Collaborator_Requests_Insert_Input;
  on_conflict?: InputMaybe<Collaborator_Requests_On_Conflict>;
};

/** on conflict condition type for table "collaborator_requests" */
export type Collaborator_Requests_On_Conflict = {
  constraint: Collaborator_Requests_Constraint;
  update_columns: Array<Collaborator_Requests_Update_Column>;
  where?: InputMaybe<Collaborator_Requests_Bool_Exp>;
};

/** ordering options when selecting data from "collaborator_requests" */
export type Collaborator_Requests_Order_By = {
  accepted?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording?: InputMaybe<Recordings_Order_By>;
  recording_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "collaborator_requests" */
export type Collaborator_Requests_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "collaborator_requests" */
export enum Collaborator_Requests_Select_Column {
  /** column name */
  Accepted = 'accepted',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "collaborator_requests" */
export type Collaborator_Requests_Set_Input = {
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "collaborator_requests" */
export enum Collaborator_Requests_Update_Column {
  /** column name */
  Accepted = 'accepted',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "collaborators" */
export type Collaborators = {
  __typename?: 'collaborators';
  created_at: Scalars['timestamptz']['output'];
  inviter_user_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  recording: Recordings;
  recording_id: Scalars['uuid']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
  /** An array relationship */
  users: Array<Users>;
  /** An aggregated array relationship */
  users_aggregate: Users_Aggregate;
};


/** columns and relationships of "collaborators" */
export type CollaboratorsUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** columns and relationships of "collaborators" */
export type CollaboratorsUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** aggregated selection of "collaborators" */
export type Collaborators_Aggregate = {
  __typename?: 'collaborators_aggregate';
  aggregate?: Maybe<Collaborators_Aggregate_Fields>;
  nodes: Array<Collaborators>;
};

/** aggregate fields of "collaborators" */
export type Collaborators_Aggregate_Fields = {
  __typename?: 'collaborators_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Collaborators_Max_Fields>;
  min?: Maybe<Collaborators_Min_Fields>;
};


/** aggregate fields of "collaborators" */
export type Collaborators_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Collaborators_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "collaborators" */
export type Collaborators_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Collaborators_Max_Order_By>;
  min?: InputMaybe<Collaborators_Min_Order_By>;
};

/** input type for inserting array relation for remote table "collaborators" */
export type Collaborators_Arr_Rel_Insert_Input = {
  data: Array<Collaborators_Insert_Input>;
  on_conflict?: InputMaybe<Collaborators_On_Conflict>;
};

/** Boolean expression to filter rows from the table "collaborators". All fields are combined with a logical 'AND'. */
export type Collaborators_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Collaborators_Bool_Exp>>>;
  _not?: InputMaybe<Collaborators_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Collaborators_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  inviter_user_id?: InputMaybe<Uuid_Comparison_Exp>;
  recording?: InputMaybe<Recordings_Bool_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  users?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "collaborators" */
export enum Collaborators_Constraint {
  /** unique or primary key constraint */
  CollaboratorsPkey = 'collaborators_pkey'
}

/** input type for inserting data into table "collaborators" */
export type Collaborators_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  inviter_user_id?: InputMaybe<Scalars['uuid']['input']>;
  recording?: InputMaybe<Recordings_Obj_Rel_Insert_Input>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  users?: InputMaybe<Users_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Collaborators_Max_Fields = {
  __typename?: 'collaborators_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  inviter_user_id?: Maybe<Scalars['uuid']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "collaborators" */
export type Collaborators_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  inviter_user_id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Collaborators_Min_Fields = {
  __typename?: 'collaborators_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  inviter_user_id?: Maybe<Scalars['uuid']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "collaborators" */
export type Collaborators_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  inviter_user_id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "collaborators" */
export type Collaborators_Mutation_Response = {
  __typename?: 'collaborators_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Collaborators>;
};

/** input type for inserting object relation for remote table "collaborators" */
export type Collaborators_Obj_Rel_Insert_Input = {
  data: Collaborators_Insert_Input;
  on_conflict?: InputMaybe<Collaborators_On_Conflict>;
};

/** on conflict condition type for table "collaborators" */
export type Collaborators_On_Conflict = {
  constraint: Collaborators_Constraint;
  update_columns: Array<Collaborators_Update_Column>;
  where?: InputMaybe<Collaborators_Bool_Exp>;
};

/** ordering options when selecting data from "collaborators" */
export type Collaborators_Order_By = {
  created_at?: InputMaybe<Order_By>;
  inviter_user_id?: InputMaybe<Order_By>;
  recording?: InputMaybe<Recordings_Order_By>;
  recording_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  users_aggregate?: InputMaybe<Users_Aggregate_Order_By>;
};

/** primary key columns input for table: "collaborators" */
export type Collaborators_Pk_Columns_Input = {
  recording_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};

/** select columns of table "collaborators" */
export enum Collaborators_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InviterUserId = 'inviter_user_id',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "collaborators" */
export type Collaborators_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  inviter_user_id?: InputMaybe<Scalars['uuid']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "collaborators" */
export enum Collaborators_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InviterUserId = 'inviter_user_id',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "comments" */
export type Comments = {
  __typename?: 'comments';
  content: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  has_frames: Scalars['Boolean']['output'];
  id: Scalars['uuid']['output'];
  is_published: Scalars['Boolean']['output'];
  parent_id?: Maybe<Scalars['uuid']['output']>;
  point: Scalars['String']['output'];
  /** An object relationship */
  recording: Recordings;
  recording_id: Scalars['uuid']['output'];
  /** An array relationship */
  replies: Array<Comments>;
  /** An aggregated array relationship */
  replies_aggregate: Comments_Aggregate;
  scope?: Maybe<Scalars['String']['output']>;
  time: Scalars['numeric']['output'];
  type?: Maybe<Scalars['String']['output']>;
  type_data?: Maybe<Scalars['jsonb']['output']>;
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};


/** columns and relationships of "comments" */
export type CommentsRepliesArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


/** columns and relationships of "comments" */
export type CommentsReplies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


/** columns and relationships of "comments" */
export type CommentsType_DataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "comments" */
export type Comments_Aggregate = {
  __typename?: 'comments_aggregate';
  aggregate?: Maybe<Comments_Aggregate_Fields>;
  nodes: Array<Comments>;
};

/** aggregate fields of "comments" */
export type Comments_Aggregate_Fields = {
  __typename?: 'comments_aggregate_fields';
  avg?: Maybe<Comments_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Comments_Max_Fields>;
  min?: Maybe<Comments_Min_Fields>;
  stddev?: Maybe<Comments_Stddev_Fields>;
  stddev_pop?: Maybe<Comments_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Comments_Stddev_Samp_Fields>;
  sum?: Maybe<Comments_Sum_Fields>;
  var_pop?: Maybe<Comments_Var_Pop_Fields>;
  var_samp?: Maybe<Comments_Var_Samp_Fields>;
  variance?: Maybe<Comments_Variance_Fields>;
};


/** aggregate fields of "comments" */
export type Comments_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Comments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "comments" */
export type Comments_Aggregate_Order_By = {
  avg?: InputMaybe<Comments_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Comments_Max_Order_By>;
  min?: InputMaybe<Comments_Min_Order_By>;
  stddev?: InputMaybe<Comments_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Comments_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Comments_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Comments_Sum_Order_By>;
  var_pop?: InputMaybe<Comments_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Comments_Var_Samp_Order_By>;
  variance?: InputMaybe<Comments_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Comments_Append_Input = {
  type_data?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "comments" */
export type Comments_Arr_Rel_Insert_Input = {
  data: Array<Comments_Insert_Input>;
  on_conflict?: InputMaybe<Comments_On_Conflict>;
};

/** aggregate avg on columns */
export type Comments_Avg_Fields = {
  __typename?: 'comments_avg_fields';
  time?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "comments" */
export type Comments_Avg_Order_By = {
  time?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "comments". All fields are combined with a logical 'AND'. */
export type Comments_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Comments_Bool_Exp>>>;
  _not?: InputMaybe<Comments_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Comments_Bool_Exp>>>;
  content?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  has_frames?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_published?: InputMaybe<Boolean_Comparison_Exp>;
  parent_id?: InputMaybe<Uuid_Comparison_Exp>;
  point?: InputMaybe<String_Comparison_Exp>;
  recording?: InputMaybe<Recordings_Bool_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  replies?: InputMaybe<Comments_Bool_Exp>;
  scope?: InputMaybe<String_Comparison_Exp>;
  time?: InputMaybe<Numeric_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  type_data?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "comments" */
export enum Comments_Constraint {
  /** unique or primary key constraint */
  CommentsPkey = 'comments_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Comments_Delete_At_Path_Input = {
  type_data?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Comments_Delete_Elem_Input = {
  type_data?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Comments_Delete_Key_Input = {
  type_data?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing integer column in table "comments" */
export type Comments_Inc_Input = {
  time?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "comments" */
export type Comments_Insert_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  has_frames?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_published?: InputMaybe<Scalars['Boolean']['input']>;
  parent_id?: InputMaybe<Scalars['uuid']['input']>;
  point?: InputMaybe<Scalars['String']['input']>;
  recording?: InputMaybe<Recordings_Obj_Rel_Insert_Input>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  replies?: InputMaybe<Comments_Arr_Rel_Insert_Input>;
  scope?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['numeric']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  type_data?: InputMaybe<Scalars['jsonb']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Comments_Max_Fields = {
  __typename?: 'comments_max_fields';
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  parent_id?: Maybe<Scalars['uuid']['output']>;
  point?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['numeric']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "comments" */
export type Comments_Max_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  point?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Comments_Min_Fields = {
  __typename?: 'comments_min_fields';
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  parent_id?: Maybe<Scalars['uuid']['output']>;
  point?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['numeric']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "comments" */
export type Comments_Min_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  point?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "comments" */
export type Comments_Mutation_Response = {
  __typename?: 'comments_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Comments>;
};

/** input type for inserting object relation for remote table "comments" */
export type Comments_Obj_Rel_Insert_Input = {
  data: Comments_Insert_Input;
  on_conflict?: InputMaybe<Comments_On_Conflict>;
};

/** on conflict condition type for table "comments" */
export type Comments_On_Conflict = {
  constraint: Comments_Constraint;
  update_columns: Array<Comments_Update_Column>;
  where?: InputMaybe<Comments_Bool_Exp>;
};

/** ordering options when selecting data from "comments" */
export type Comments_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  has_frames?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_published?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  point?: InputMaybe<Order_By>;
  recording?: InputMaybe<Recordings_Order_By>;
  recording_id?: InputMaybe<Order_By>;
  replies_aggregate?: InputMaybe<Comments_Aggregate_Order_By>;
  scope?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  type_data?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "comments" */
export type Comments_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Comments_Prepend_Input = {
  type_data?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "comments" */
export enum Comments_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  HasFrames = 'has_frames',
  /** column name */
  Id = 'id',
  /** column name */
  IsPublished = 'is_published',
  /** column name */
  ParentId = 'parent_id',
  /** column name */
  Point = 'point',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Scope = 'scope',
  /** column name */
  Time = 'time',
  /** column name */
  Type = 'type',
  /** column name */
  TypeData = 'type_data',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "comments" */
export type Comments_Set_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  has_frames?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_published?: InputMaybe<Scalars['Boolean']['input']>;
  parent_id?: InputMaybe<Scalars['uuid']['input']>;
  point?: InputMaybe<Scalars['String']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['numeric']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  type_data?: InputMaybe<Scalars['jsonb']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Comments_Stddev_Fields = {
  __typename?: 'comments_stddev_fields';
  time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "comments" */
export type Comments_Stddev_Order_By = {
  time?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Comments_Stddev_Pop_Fields = {
  __typename?: 'comments_stddev_pop_fields';
  time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "comments" */
export type Comments_Stddev_Pop_Order_By = {
  time?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Comments_Stddev_Samp_Fields = {
  __typename?: 'comments_stddev_samp_fields';
  time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "comments" */
export type Comments_Stddev_Samp_Order_By = {
  time?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Comments_Sum_Fields = {
  __typename?: 'comments_sum_fields';
  time?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "comments" */
export type Comments_Sum_Order_By = {
  time?: InputMaybe<Order_By>;
};

/** update columns of table "comments" */
export enum Comments_Update_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  HasFrames = 'has_frames',
  /** column name */
  Id = 'id',
  /** column name */
  IsPublished = 'is_published',
  /** column name */
  ParentId = 'parent_id',
  /** column name */
  Point = 'point',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Scope = 'scope',
  /** column name */
  Time = 'time',
  /** column name */
  Type = 'type',
  /** column name */
  TypeData = 'type_data',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Comments_Var_Pop_Fields = {
  __typename?: 'comments_var_pop_fields';
  time?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "comments" */
export type Comments_Var_Pop_Order_By = {
  time?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Comments_Var_Samp_Fields = {
  __typename?: 'comments_var_samp_fields';
  time?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "comments" */
export type Comments_Var_Samp_Order_By = {
  time?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Comments_Variance_Fields = {
  __typename?: 'comments_variance_fields';
  time?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "comments" */
export type Comments_Variance_Order_By = {
  time?: InputMaybe<Order_By>;
};

/** columns and relationships of "controllers" */
export type Controllers = {
  __typename?: 'controllers';
  build_id?: Maybe<Scalars['String']['output']>;
  crash_report?: Maybe<Scalars['jsonb']['output']>;
  created_at: Scalars['timestamptz']['output'];
  destroyed_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['String']['output'];
  is_wau: Scalars['Boolean']['output'];
  issue?: Maybe<Scalars['String']['output']>;
  issue_description?: Maybe<Scalars['String']['output']>;
  kube_node?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  recording?: Maybe<Recordings>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregated array relationship */
  sessions_aggregate: Sessions_Aggregate;
};


/** columns and relationships of "controllers" */
export type ControllersCrash_ReportArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "controllers" */
export type ControllersSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};


/** columns and relationships of "controllers" */
export type ControllersSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** aggregated selection of "controllers" */
export type Controllers_Aggregate = {
  __typename?: 'controllers_aggregate';
  aggregate?: Maybe<Controllers_Aggregate_Fields>;
  nodes: Array<Controllers>;
};

/** aggregate fields of "controllers" */
export type Controllers_Aggregate_Fields = {
  __typename?: 'controllers_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Controllers_Max_Fields>;
  min?: Maybe<Controllers_Min_Fields>;
};


/** aggregate fields of "controllers" */
export type Controllers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Controllers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "controllers" */
export type Controllers_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Controllers_Max_Order_By>;
  min?: InputMaybe<Controllers_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Controllers_Append_Input = {
  crash_report?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "controllers" */
export type Controllers_Arr_Rel_Insert_Input = {
  data: Array<Controllers_Insert_Input>;
  on_conflict?: InputMaybe<Controllers_On_Conflict>;
};

/** Boolean expression to filter rows from the table "controllers". All fields are combined with a logical 'AND'. */
export type Controllers_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Controllers_Bool_Exp>>>;
  _not?: InputMaybe<Controllers_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Controllers_Bool_Exp>>>;
  build_id?: InputMaybe<String_Comparison_Exp>;
  crash_report?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  destroyed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  is_wau?: InputMaybe<Boolean_Comparison_Exp>;
  issue?: InputMaybe<String_Comparison_Exp>;
  issue_description?: InputMaybe<String_Comparison_Exp>;
  kube_node?: InputMaybe<String_Comparison_Exp>;
  recording?: InputMaybe<Recordings_Bool_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  sessions?: InputMaybe<Sessions_Bool_Exp>;
};

/** unique or primary key constraints on table "controllers" */
export enum Controllers_Constraint {
  /** unique or primary key constraint */
  ControllersPkey = 'controllers_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Controllers_Delete_At_Path_Input = {
  crash_report?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Controllers_Delete_Elem_Input = {
  crash_report?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Controllers_Delete_Key_Input = {
  crash_report?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "controllers" */
export type Controllers_Insert_Input = {
  build_id?: InputMaybe<Scalars['String']['input']>;
  crash_report?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  destroyed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_wau?: InputMaybe<Scalars['Boolean']['input']>;
  issue?: InputMaybe<Scalars['String']['input']>;
  issue_description?: InputMaybe<Scalars['String']['input']>;
  kube_node?: InputMaybe<Scalars['String']['input']>;
  recording?: InputMaybe<Recordings_Obj_Rel_Insert_Input>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  sessions?: InputMaybe<Sessions_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Controllers_Max_Fields = {
  __typename?: 'controllers_max_fields';
  build_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  destroyed_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  issue?: Maybe<Scalars['String']['output']>;
  issue_description?: Maybe<Scalars['String']['output']>;
  kube_node?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "controllers" */
export type Controllers_Max_Order_By = {
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  destroyed_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  issue?: InputMaybe<Order_By>;
  issue_description?: InputMaybe<Order_By>;
  kube_node?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Controllers_Min_Fields = {
  __typename?: 'controllers_min_fields';
  build_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  destroyed_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  issue?: Maybe<Scalars['String']['output']>;
  issue_description?: Maybe<Scalars['String']['output']>;
  kube_node?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "controllers" */
export type Controllers_Min_Order_By = {
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  destroyed_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  issue?: InputMaybe<Order_By>;
  issue_description?: InputMaybe<Order_By>;
  kube_node?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "controllers" */
export type Controllers_Mutation_Response = {
  __typename?: 'controllers_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Controllers>;
};

/** input type for inserting object relation for remote table "controllers" */
export type Controllers_Obj_Rel_Insert_Input = {
  data: Controllers_Insert_Input;
  on_conflict?: InputMaybe<Controllers_On_Conflict>;
};

/** on conflict condition type for table "controllers" */
export type Controllers_On_Conflict = {
  constraint: Controllers_Constraint;
  update_columns: Array<Controllers_Update_Column>;
  where?: InputMaybe<Controllers_Bool_Exp>;
};

/** ordering options when selecting data from "controllers" */
export type Controllers_Order_By = {
  build_id?: InputMaybe<Order_By>;
  crash_report?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  destroyed_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_wau?: InputMaybe<Order_By>;
  issue?: InputMaybe<Order_By>;
  issue_description?: InputMaybe<Order_By>;
  kube_node?: InputMaybe<Order_By>;
  recording?: InputMaybe<Recordings_Order_By>;
  recording_id?: InputMaybe<Order_By>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Order_By>;
};

/** primary key columns input for table: "controllers" */
export type Controllers_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Controllers_Prepend_Input = {
  crash_report?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "controllers" */
export enum Controllers_Select_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  CrashReport = 'crash_report',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DestroyedAt = 'destroyed_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsWau = 'is_wau',
  /** column name */
  Issue = 'issue',
  /** column name */
  IssueDescription = 'issue_description',
  /** column name */
  KubeNode = 'kube_node',
  /** column name */
  RecordingId = 'recording_id'
}

/** input type for updating data in table "controllers" */
export type Controllers_Set_Input = {
  build_id?: InputMaybe<Scalars['String']['input']>;
  crash_report?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  destroyed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_wau?: InputMaybe<Scalars['Boolean']['input']>;
  issue?: InputMaybe<Scalars['String']['input']>;
  issue_description?: InputMaybe<Scalars['String']['input']>;
  kube_node?: InputMaybe<Scalars['String']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "controllers" */
export enum Controllers_Update_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  CrashReport = 'crash_report',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DestroyedAt = 'destroyed_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsWau = 'is_wau',
  /** column name */
  Issue = 'issue',
  /** column name */
  IssueDescription = 'issue_description',
  /** column name */
  KubeNode = 'kube_node',
  /** column name */
  RecordingId = 'recording_id'
}

/** columns and relationships of "crash_reports" */
export type Crash_Reports = {
  __typename?: 'crash_reports';
  bucket?: Maybe<Scalars['String']['output']>;
  bucketfixed?: Maybe<Scalars['String']['output']>;
  buildid?: Maybe<Scalars['String']['output']>;
  controller_id?: Maybe<Scalars['String']['output']>;
  crash_report?: Maybe<Scalars['jsonb']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  recording?: Maybe<Recordings>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  session?: Maybe<Sessions>;
  session_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "crash_reports" */
export type Crash_ReportsCrash_ReportArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "crash_reports" */
export type Crash_Reports_Aggregate = {
  __typename?: 'crash_reports_aggregate';
  aggregate?: Maybe<Crash_Reports_Aggregate_Fields>;
  nodes: Array<Crash_Reports>;
};

/** aggregate fields of "crash_reports" */
export type Crash_Reports_Aggregate_Fields = {
  __typename?: 'crash_reports_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Crash_Reports_Max_Fields>;
  min?: Maybe<Crash_Reports_Min_Fields>;
};


/** aggregate fields of "crash_reports" */
export type Crash_Reports_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Crash_Reports_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "crash_reports" */
export type Crash_Reports_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Crash_Reports_Max_Order_By>;
  min?: InputMaybe<Crash_Reports_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Crash_Reports_Append_Input = {
  crash_report?: InputMaybe<Scalars['jsonb']['input']>;
};

/** Boolean expression to filter rows from the table "crash_reports". All fields are combined with a logical 'AND'. */
export type Crash_Reports_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Crash_Reports_Bool_Exp>>>;
  _not?: InputMaybe<Crash_Reports_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Crash_Reports_Bool_Exp>>>;
  bucket?: InputMaybe<String_Comparison_Exp>;
  bucketfixed?: InputMaybe<String_Comparison_Exp>;
  buildid?: InputMaybe<String_Comparison_Exp>;
  controller_id?: InputMaybe<String_Comparison_Exp>;
  crash_report?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<String_Comparison_Exp>;
  recording?: InputMaybe<Recordings_Bool_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  session?: InputMaybe<Sessions_Bool_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Crash_Reports_Delete_At_Path_Input = {
  crash_report?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Crash_Reports_Delete_Elem_Input = {
  crash_report?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Crash_Reports_Delete_Key_Input = {
  crash_report?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Crash_Reports_Max_Fields = {
  __typename?: 'crash_reports_max_fields';
  bucket?: Maybe<Scalars['String']['output']>;
  bucketfixed?: Maybe<Scalars['String']['output']>;
  buildid?: Maybe<Scalars['String']['output']>;
  controller_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "crash_reports" */
export type Crash_Reports_Max_Order_By = {
  bucket?: InputMaybe<Order_By>;
  bucketfixed?: InputMaybe<Order_By>;
  buildid?: InputMaybe<Order_By>;
  controller_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Crash_Reports_Min_Fields = {
  __typename?: 'crash_reports_min_fields';
  bucket?: Maybe<Scalars['String']['output']>;
  bucketfixed?: Maybe<Scalars['String']['output']>;
  buildid?: Maybe<Scalars['String']['output']>;
  controller_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "crash_reports" */
export type Crash_Reports_Min_Order_By = {
  bucket?: InputMaybe<Order_By>;
  bucketfixed?: InputMaybe<Order_By>;
  buildid?: InputMaybe<Order_By>;
  controller_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** ordering options when selecting data from "crash_reports" */
export type Crash_Reports_Order_By = {
  bucket?: InputMaybe<Order_By>;
  bucketfixed?: InputMaybe<Order_By>;
  buildid?: InputMaybe<Order_By>;
  controller_id?: InputMaybe<Order_By>;
  crash_report?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  recording?: InputMaybe<Recordings_Order_By>;
  recording_id?: InputMaybe<Order_By>;
  session?: InputMaybe<Sessions_Order_By>;
  session_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Crash_Reports_Prepend_Input = {
  crash_report?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "crash_reports" */
export enum Crash_Reports_Select_Column {
  /** column name */
  Bucket = 'bucket',
  /** column name */
  Bucketfixed = 'bucketfixed',
  /** column name */
  Buildid = 'buildid',
  /** column name */
  ControllerId = 'controller_id',
  /** column name */
  CrashReport = 'crash_report',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "dojo_sessions" */
export type Dojo_Sessions = {
  __typename?: 'dojo_sessions';
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  protocol_events?: Maybe<Scalars['jsonb']['output']>;
  recording_id: Scalars['uuid']['output'];
  /** An object relationship */
  recordings?: Maybe<Recordings>;
  results: Scalars['jsonb']['output'];
  session_id?: Maybe<Scalars['String']['output']>;
  sha?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "dojo_sessions" */
export type Dojo_SessionsProtocol_EventsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "dojo_sessions" */
export type Dojo_SessionsResultsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "dojo_sessions" */
export type Dojo_Sessions_Aggregate = {
  __typename?: 'dojo_sessions_aggregate';
  aggregate?: Maybe<Dojo_Sessions_Aggregate_Fields>;
  nodes: Array<Dojo_Sessions>;
};

/** aggregate fields of "dojo_sessions" */
export type Dojo_Sessions_Aggregate_Fields = {
  __typename?: 'dojo_sessions_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Dojo_Sessions_Max_Fields>;
  min?: Maybe<Dojo_Sessions_Min_Fields>;
};


/** aggregate fields of "dojo_sessions" */
export type Dojo_Sessions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dojo_Sessions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "dojo_sessions" */
export type Dojo_Sessions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Dojo_Sessions_Max_Order_By>;
  min?: InputMaybe<Dojo_Sessions_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Dojo_Sessions_Append_Input = {
  protocol_events?: InputMaybe<Scalars['jsonb']['input']>;
  results?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "dojo_sessions" */
export type Dojo_Sessions_Arr_Rel_Insert_Input = {
  data: Array<Dojo_Sessions_Insert_Input>;
  on_conflict?: InputMaybe<Dojo_Sessions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "dojo_sessions". All fields are combined with a logical 'AND'. */
export type Dojo_Sessions_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Dojo_Sessions_Bool_Exp>>>;
  _not?: InputMaybe<Dojo_Sessions_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Dojo_Sessions_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  protocol_events?: InputMaybe<Jsonb_Comparison_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  recordings?: InputMaybe<Recordings_Bool_Exp>;
  results?: InputMaybe<Jsonb_Comparison_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  sha?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "dojo_sessions" */
export enum Dojo_Sessions_Constraint {
  /** unique or primary key constraint */
  DojoSessionsPkey = 'dojo_sessions_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Dojo_Sessions_Delete_At_Path_Input = {
  protocol_events?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  results?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Dojo_Sessions_Delete_Elem_Input = {
  protocol_events?: InputMaybe<Scalars['Int']['input']>;
  results?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Dojo_Sessions_Delete_Key_Input = {
  protocol_events?: InputMaybe<Scalars['String']['input']>;
  results?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "dojo_sessions" */
export type Dojo_Sessions_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  protocol_events?: InputMaybe<Scalars['jsonb']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  recordings?: InputMaybe<Recordings_Obj_Rel_Insert_Input>;
  results?: InputMaybe<Scalars['jsonb']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  sha?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Dojo_Sessions_Max_Fields = {
  __typename?: 'dojo_sessions_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  sha?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "dojo_sessions" */
export type Dojo_Sessions_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  sha?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Dojo_Sessions_Min_Fields = {
  __typename?: 'dojo_sessions_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  sha?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "dojo_sessions" */
export type Dojo_Sessions_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  sha?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "dojo_sessions" */
export type Dojo_Sessions_Mutation_Response = {
  __typename?: 'dojo_sessions_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Dojo_Sessions>;
};

/** input type for inserting object relation for remote table "dojo_sessions" */
export type Dojo_Sessions_Obj_Rel_Insert_Input = {
  data: Dojo_Sessions_Insert_Input;
  on_conflict?: InputMaybe<Dojo_Sessions_On_Conflict>;
};

/** on conflict condition type for table "dojo_sessions" */
export type Dojo_Sessions_On_Conflict = {
  constraint: Dojo_Sessions_Constraint;
  update_columns: Array<Dojo_Sessions_Update_Column>;
  where?: InputMaybe<Dojo_Sessions_Bool_Exp>;
};

/** ordering options when selecting data from "dojo_sessions" */
export type Dojo_Sessions_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  protocol_events?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  recordings?: InputMaybe<Recordings_Order_By>;
  results?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  sha?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "dojo_sessions" */
export type Dojo_Sessions_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Dojo_Sessions_Prepend_Input = {
  protocol_events?: InputMaybe<Scalars['jsonb']['input']>;
  results?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "dojo_sessions" */
export enum Dojo_Sessions_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ProtocolEvents = 'protocol_events',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Results = 'results',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Sha = 'sha'
}

/** input type for updating data in table "dojo_sessions" */
export type Dojo_Sessions_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  protocol_events?: InputMaybe<Scalars['jsonb']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  results?: InputMaybe<Scalars['jsonb']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  sha?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "dojo_sessions" */
export enum Dojo_Sessions_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ProtocolEvents = 'protocol_events',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Results = 'results',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Sha = 'sha'
}

/** columns and relationships of "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters = {
  __typename?: 'experimental_crash_reports_filters';
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  filter: Filters;
  filter_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  /** An object relationship */
  runtime_crash_report: Runtime_Crash_Reports;
  runtime_crash_report_id: Scalars['uuid']['output'];
};

/** aggregated selection of "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Aggregate = {
  __typename?: 'experimental_crash_reports_filters_aggregate';
  aggregate?: Maybe<Experimental_Crash_Reports_Filters_Aggregate_Fields>;
  nodes: Array<Experimental_Crash_Reports_Filters>;
};

/** aggregate fields of "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Aggregate_Fields = {
  __typename?: 'experimental_crash_reports_filters_aggregate_fields';
  avg?: Maybe<Experimental_Crash_Reports_Filters_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Experimental_Crash_Reports_Filters_Max_Fields>;
  min?: Maybe<Experimental_Crash_Reports_Filters_Min_Fields>;
  stddev?: Maybe<Experimental_Crash_Reports_Filters_Stddev_Fields>;
  stddev_pop?: Maybe<Experimental_Crash_Reports_Filters_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Experimental_Crash_Reports_Filters_Stddev_Samp_Fields>;
  sum?: Maybe<Experimental_Crash_Reports_Filters_Sum_Fields>;
  var_pop?: Maybe<Experimental_Crash_Reports_Filters_Var_Pop_Fields>;
  var_samp?: Maybe<Experimental_Crash_Reports_Filters_Var_Samp_Fields>;
  variance?: Maybe<Experimental_Crash_Reports_Filters_Variance_Fields>;
};


/** aggregate fields of "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Experimental_Crash_Reports_Filters_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Aggregate_Order_By = {
  avg?: InputMaybe<Experimental_Crash_Reports_Filters_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Experimental_Crash_Reports_Filters_Max_Order_By>;
  min?: InputMaybe<Experimental_Crash_Reports_Filters_Min_Order_By>;
  stddev?: InputMaybe<Experimental_Crash_Reports_Filters_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Experimental_Crash_Reports_Filters_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Experimental_Crash_Reports_Filters_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Experimental_Crash_Reports_Filters_Sum_Order_By>;
  var_pop?: InputMaybe<Experimental_Crash_Reports_Filters_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Experimental_Crash_Reports_Filters_Var_Samp_Order_By>;
  variance?: InputMaybe<Experimental_Crash_Reports_Filters_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Arr_Rel_Insert_Input = {
  data: Array<Experimental_Crash_Reports_Filters_Insert_Input>;
  on_conflict?: InputMaybe<Experimental_Crash_Reports_Filters_On_Conflict>;
};

/** aggregate avg on columns */
export type Experimental_Crash_Reports_Filters_Avg_Fields = {
  __typename?: 'experimental_crash_reports_filters_avg_fields';
  filter_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Avg_Order_By = {
  filter_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "experimental_crash_reports_filters". All fields are combined with a logical 'AND'. */
export type Experimental_Crash_Reports_Filters_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Experimental_Crash_Reports_Filters_Bool_Exp>>>;
  _not?: InputMaybe<Experimental_Crash_Reports_Filters_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Experimental_Crash_Reports_Filters_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  filter?: InputMaybe<Filters_Bool_Exp>;
  filter_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  runtime_crash_report?: InputMaybe<Runtime_Crash_Reports_Bool_Exp>;
  runtime_crash_report_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "experimental_crash_reports_filters" */
export enum Experimental_Crash_Reports_Filters_Constraint {
  /** unique or primary key constraint */
  ExperimentalCrashReportsFiRuntimeCrashReportIdFilteKey = 'experimental_crash_reports_fi_runtime_crash_report_id_filte_key',
  /** unique or primary key constraint */
  ExperimentalCrashReportsFiltersPkey = 'experimental_crash_reports_filters_pkey'
}

/** input type for incrementing integer column in table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Inc_Input = {
  filter_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  filter?: InputMaybe<Filters_Obj_Rel_Insert_Input>;
  filter_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  runtime_crash_report?: InputMaybe<Runtime_Crash_Reports_Obj_Rel_Insert_Input>;
  runtime_crash_report_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Experimental_Crash_Reports_Filters_Max_Fields = {
  __typename?: 'experimental_crash_reports_filters_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  filter_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  runtime_crash_report_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  filter_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  runtime_crash_report_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Experimental_Crash_Reports_Filters_Min_Fields = {
  __typename?: 'experimental_crash_reports_filters_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  filter_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  runtime_crash_report_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  filter_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  runtime_crash_report_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Mutation_Response = {
  __typename?: 'experimental_crash_reports_filters_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Experimental_Crash_Reports_Filters>;
};

/** input type for inserting object relation for remote table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Obj_Rel_Insert_Input = {
  data: Experimental_Crash_Reports_Filters_Insert_Input;
  on_conflict?: InputMaybe<Experimental_Crash_Reports_Filters_On_Conflict>;
};

/** on conflict condition type for table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_On_Conflict = {
  constraint: Experimental_Crash_Reports_Filters_Constraint;
  update_columns: Array<Experimental_Crash_Reports_Filters_Update_Column>;
  where?: InputMaybe<Experimental_Crash_Reports_Filters_Bool_Exp>;
};

/** ordering options when selecting data from "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Order_By = {
  created_at?: InputMaybe<Order_By>;
  filter?: InputMaybe<Filters_Order_By>;
  filter_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  runtime_crash_report?: InputMaybe<Runtime_Crash_Reports_Order_By>;
  runtime_crash_report_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "experimental_crash_reports_filters" */
export enum Experimental_Crash_Reports_Filters_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FilterId = 'filter_id',
  /** column name */
  Id = 'id',
  /** column name */
  RuntimeCrashReportId = 'runtime_crash_report_id'
}

/** input type for updating data in table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  filter_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  runtime_crash_report_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Experimental_Crash_Reports_Filters_Stddev_Fields = {
  __typename?: 'experimental_crash_reports_filters_stddev_fields';
  filter_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Stddev_Order_By = {
  filter_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Experimental_Crash_Reports_Filters_Stddev_Pop_Fields = {
  __typename?: 'experimental_crash_reports_filters_stddev_pop_fields';
  filter_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Stddev_Pop_Order_By = {
  filter_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Experimental_Crash_Reports_Filters_Stddev_Samp_Fields = {
  __typename?: 'experimental_crash_reports_filters_stddev_samp_fields';
  filter_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Stddev_Samp_Order_By = {
  filter_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Experimental_Crash_Reports_Filters_Sum_Fields = {
  __typename?: 'experimental_crash_reports_filters_sum_fields';
  filter_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Sum_Order_By = {
  filter_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** update columns of table "experimental_crash_reports_filters" */
export enum Experimental_Crash_Reports_Filters_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FilterId = 'filter_id',
  /** column name */
  Id = 'id',
  /** column name */
  RuntimeCrashReportId = 'runtime_crash_report_id'
}

/** aggregate var_pop on columns */
export type Experimental_Crash_Reports_Filters_Var_Pop_Fields = {
  __typename?: 'experimental_crash_reports_filters_var_pop_fields';
  filter_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Var_Pop_Order_By = {
  filter_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Experimental_Crash_Reports_Filters_Var_Samp_Fields = {
  __typename?: 'experimental_crash_reports_filters_var_samp_fields';
  filter_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Var_Samp_Order_By = {
  filter_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Experimental_Crash_Reports_Filters_Variance_Fields = {
  __typename?: 'experimental_crash_reports_filters_variance_fields';
  filter_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "experimental_crash_reports_filters" */
export type Experimental_Crash_Reports_Filters_Variance_Order_By = {
  filter_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** columns and relationships of "filters" */
export type Filters = {
  __typename?: 'filters';
  assignee?: Maybe<Scalars['String']['output']>;
  bucket: Scalars['String']['output'];
  crash_kind: Scalars['String']['output'];
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  dateBuildFixed?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  linear_last_updated?: Maybe<Scalars['timestamptz']['output']>;
  predicate: Scalars['jsonb']['output'];
  state?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['timestamptz']['output'];
};


/** columns and relationships of "filters" */
export type FiltersPredicateArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "filters" */
export type Filters_Aggregate = {
  __typename?: 'filters_aggregate';
  aggregate?: Maybe<Filters_Aggregate_Fields>;
  nodes: Array<Filters>;
};

/** aggregate fields of "filters" */
export type Filters_Aggregate_Fields = {
  __typename?: 'filters_aggregate_fields';
  avg?: Maybe<Filters_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Filters_Max_Fields>;
  min?: Maybe<Filters_Min_Fields>;
  stddev?: Maybe<Filters_Stddev_Fields>;
  stddev_pop?: Maybe<Filters_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Filters_Stddev_Samp_Fields>;
  sum?: Maybe<Filters_Sum_Fields>;
  var_pop?: Maybe<Filters_Var_Pop_Fields>;
  var_samp?: Maybe<Filters_Var_Samp_Fields>;
  variance?: Maybe<Filters_Variance_Fields>;
};


/** aggregate fields of "filters" */
export type Filters_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Filters_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "filters" */
export type Filters_Aggregate_Order_By = {
  avg?: InputMaybe<Filters_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Filters_Max_Order_By>;
  min?: InputMaybe<Filters_Min_Order_By>;
  stddev?: InputMaybe<Filters_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Filters_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Filters_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Filters_Sum_Order_By>;
  var_pop?: InputMaybe<Filters_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Filters_Var_Samp_Order_By>;
  variance?: InputMaybe<Filters_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Filters_Append_Input = {
  predicate?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "filters" */
export type Filters_Arr_Rel_Insert_Input = {
  data: Array<Filters_Insert_Input>;
  on_conflict?: InputMaybe<Filters_On_Conflict>;
};

/** aggregate avg on columns */
export type Filters_Avg_Fields = {
  __typename?: 'filters_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "filters" */
export type Filters_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "filters". All fields are combined with a logical 'AND'. */
export type Filters_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Filters_Bool_Exp>>>;
  _not?: InputMaybe<Filters_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Filters_Bool_Exp>>>;
  assignee?: InputMaybe<String_Comparison_Exp>;
  bucket?: InputMaybe<String_Comparison_Exp>;
  crash_kind?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  dateBuildFixed?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  linear_last_updated?: InputMaybe<Timestamptz_Comparison_Exp>;
  predicate?: InputMaybe<Jsonb_Comparison_Exp>;
  state?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "filters" */
export enum Filters_Constraint {
  /** unique or primary key constraint */
  FiltersIdKey = 'filters_id_key',
  /** unique or primary key constraint */
  FiltersPkey = 'filters_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Filters_Delete_At_Path_Input = {
  predicate?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Filters_Delete_Elem_Input = {
  predicate?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Filters_Delete_Key_Input = {
  predicate?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing integer column in table "filters" */
export type Filters_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "filters" */
export type Filters_Insert_Input = {
  assignee?: InputMaybe<Scalars['String']['input']>;
  bucket?: InputMaybe<Scalars['String']['input']>;
  crash_kind?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  dateBuildFixed?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  linear_last_updated?: InputMaybe<Scalars['timestamptz']['input']>;
  predicate?: InputMaybe<Scalars['jsonb']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Filters_Max_Fields = {
  __typename?: 'filters_max_fields';
  assignee?: Maybe<Scalars['String']['output']>;
  bucket?: Maybe<Scalars['String']['output']>;
  crash_kind?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  dateBuildFixed?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  linear_last_updated?: Maybe<Scalars['timestamptz']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "filters" */
export type Filters_Max_Order_By = {
  assignee?: InputMaybe<Order_By>;
  bucket?: InputMaybe<Order_By>;
  crash_kind?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dateBuildFixed?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  linear_last_updated?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Filters_Min_Fields = {
  __typename?: 'filters_min_fields';
  assignee?: Maybe<Scalars['String']['output']>;
  bucket?: Maybe<Scalars['String']['output']>;
  crash_kind?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  dateBuildFixed?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  linear_last_updated?: Maybe<Scalars['timestamptz']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "filters" */
export type Filters_Min_Order_By = {
  assignee?: InputMaybe<Order_By>;
  bucket?: InputMaybe<Order_By>;
  crash_kind?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dateBuildFixed?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  linear_last_updated?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "filters" */
export type Filters_Mutation_Response = {
  __typename?: 'filters_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Filters>;
};

/** input type for inserting object relation for remote table "filters" */
export type Filters_Obj_Rel_Insert_Input = {
  data: Filters_Insert_Input;
  on_conflict?: InputMaybe<Filters_On_Conflict>;
};

/** on conflict condition type for table "filters" */
export type Filters_On_Conflict = {
  constraint: Filters_Constraint;
  update_columns: Array<Filters_Update_Column>;
  where?: InputMaybe<Filters_Bool_Exp>;
};

/** ordering options when selecting data from "filters" */
export type Filters_Order_By = {
  assignee?: InputMaybe<Order_By>;
  bucket?: InputMaybe<Order_By>;
  crash_kind?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dateBuildFixed?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  linear_last_updated?: InputMaybe<Order_By>;
  predicate?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "filters" */
export type Filters_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Filters_Prepend_Input = {
  predicate?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "filters" */
export enum Filters_Select_Column {
  /** column name */
  Assignee = 'assignee',
  /** column name */
  Bucket = 'bucket',
  /** column name */
  CrashKind = 'crash_kind',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DateBuildFixed = 'dateBuildFixed',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  LinearLastUpdated = 'linear_last_updated',
  /** column name */
  Predicate = 'predicate',
  /** column name */
  State = 'state',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "filters" */
export type Filters_Set_Input = {
  assignee?: InputMaybe<Scalars['String']['input']>;
  bucket?: InputMaybe<Scalars['String']['input']>;
  crash_kind?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  dateBuildFixed?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  linear_last_updated?: InputMaybe<Scalars['timestamptz']['input']>;
  predicate?: InputMaybe<Scalars['jsonb']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Filters_Stddev_Fields = {
  __typename?: 'filters_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "filters" */
export type Filters_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Filters_Stddev_Pop_Fields = {
  __typename?: 'filters_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "filters" */
export type Filters_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Filters_Stddev_Samp_Fields = {
  __typename?: 'filters_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "filters" */
export type Filters_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Filters_Sum_Fields = {
  __typename?: 'filters_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "filters" */
export type Filters_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** update columns of table "filters" */
export enum Filters_Update_Column {
  /** column name */
  Assignee = 'assignee',
  /** column name */
  Bucket = 'bucket',
  /** column name */
  CrashKind = 'crash_kind',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DateBuildFixed = 'dateBuildFixed',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  LinearLastUpdated = 'linear_last_updated',
  /** column name */
  Predicate = 'predicate',
  /** column name */
  State = 'state',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Filters_Var_Pop_Fields = {
  __typename?: 'filters_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "filters" */
export type Filters_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Filters_Var_Samp_Fields = {
  __typename?: 'filters_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "filters" */
export type Filters_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Filters_Variance_Fields = {
  __typename?: 'filters_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "filters" */
export type Filters_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** expression to compare columns of type interval. All fields are combined with logical 'AND'. */
export type Interval_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['interval']['input']>;
  _gt?: InputMaybe<Scalars['interval']['input']>;
  _gte?: InputMaybe<Scalars['interval']['input']>;
  _in?: InputMaybe<Array<Scalars['interval']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['interval']['input']>;
  _lte?: InputMaybe<Scalars['interval']['input']>;
  _neq?: InputMaybe<Scalars['interval']['input']>;
  _nin?: InputMaybe<Array<Scalars['interval']['input']>>;
};

/** columns and relationships of "invitations" */
export type Invitations = {
  __typename?: 'invitations';
  created_at: Scalars['timestamptz']['output'];
  invited_email: Scalars['String']['output'];
  /** An object relationship */
  invited_user?: Maybe<Users>;
  /** Indicates whether or not the record's email has a corresponding user record. This happens after a user signs up using the invited email address. */
  pending: Scalars['Boolean']['output'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_id: Scalars['uuid']['output'];
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "invitations" */
export type Invitations_Aggregate = {
  __typename?: 'invitations_aggregate';
  aggregate?: Maybe<Invitations_Aggregate_Fields>;
  nodes: Array<Invitations>;
};

/** aggregate fields of "invitations" */
export type Invitations_Aggregate_Fields = {
  __typename?: 'invitations_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Invitations_Max_Fields>;
  min?: Maybe<Invitations_Min_Fields>;
};


/** aggregate fields of "invitations" */
export type Invitations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Invitations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "invitations" */
export type Invitations_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Invitations_Max_Order_By>;
  min?: InputMaybe<Invitations_Min_Order_By>;
};

/** input type for inserting array relation for remote table "invitations" */
export type Invitations_Arr_Rel_Insert_Input = {
  data: Array<Invitations_Insert_Input>;
  on_conflict?: InputMaybe<Invitations_On_Conflict>;
};

/** Boolean expression to filter rows from the table "invitations". All fields are combined with a logical 'AND'. */
export type Invitations_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Invitations_Bool_Exp>>>;
  _not?: InputMaybe<Invitations_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Invitations_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  invited_email?: InputMaybe<String_Comparison_Exp>;
  invited_user?: InputMaybe<Users_Bool_Exp>;
  pending?: InputMaybe<Boolean_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  workspace_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "invitations" */
export enum Invitations_Constraint {
  /** unique or primary key constraint */
  InvitationsPkey = 'invitations_pkey'
}

/** input type for inserting data into table "invitations" */
export type Invitations_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  invited_email?: InputMaybe<Scalars['String']['input']>;
  invited_user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  pending?: InputMaybe<Scalars['Boolean']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Invitations_Max_Fields = {
  __typename?: 'invitations_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  invited_email?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "invitations" */
export type Invitations_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  invited_email?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Invitations_Min_Fields = {
  __typename?: 'invitations_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  invited_email?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "invitations" */
export type Invitations_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  invited_email?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "invitations" */
export type Invitations_Mutation_Response = {
  __typename?: 'invitations_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Invitations>;
};

/** input type for inserting object relation for remote table "invitations" */
export type Invitations_Obj_Rel_Insert_Input = {
  data: Invitations_Insert_Input;
  on_conflict?: InputMaybe<Invitations_On_Conflict>;
};

/** on conflict condition type for table "invitations" */
export type Invitations_On_Conflict = {
  constraint: Invitations_Constraint;
  update_columns: Array<Invitations_Update_Column>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};

/** ordering options when selecting data from "invitations" */
export type Invitations_Order_By = {
  created_at?: InputMaybe<Order_By>;
  invited_email?: InputMaybe<Order_By>;
  invited_user?: InputMaybe<Users_Order_By>;
  pending?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "invitations" */
export type Invitations_Pk_Columns_Input = {
  invited_email: Scalars['String']['input'];
  user_id: Scalars['uuid']['input'];
};

/** select columns of table "invitations" */
export enum Invitations_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InvitedEmail = 'invited_email',
  /** column name */
  Pending = 'pending',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** input type for updating data in table "invitations" */
export type Invitations_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  invited_email?: InputMaybe<Scalars['String']['input']>;
  pending?: InputMaybe<Scalars['Boolean']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "invitations" */
export enum Invitations_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InvitedEmail = 'invited_email',
  /** column name */
  Pending = 'pending',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']['input']>;
  _gt?: InputMaybe<Scalars['json']['input']>;
  _gte?: InputMaybe<Scalars['json']['input']>;
  _in?: InputMaybe<Array<Scalars['json']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['json']['input']>;
  _lte?: InputMaybe<Scalars['json']['input']>;
  _neq?: InputMaybe<Scalars['json']['input']>;
  _nin?: InputMaybe<Array<Scalars['json']['input']>>;
};

/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  acceptRecordingCollaboratorRequest: AcceptRecordingCollaboratorRequest;
  acceptTermsOfService: AcceptTermsOfService;
  acceptWorkspaceMembership: AcceptWorkspaceMembership;
  /** perform the action: "actionName" */
  actionName?: Maybe<SampleOutput>;
  activateWorkspaceSubscription: ActivateWorkspaceSubscription;
  addComment: AddComment;
  addCommentReply: AddCommentReply;
  addPoint: AddPoint;
  addRecordingCollaborator: AddRecordingCollaborator;
  addTestsToShard: AddTestsToShard;
  addWorkspaceMember: AddWorkspaceMember;
  cancelWorkspaceSubscription: CancelWorkspaceSubscription;
  claimTeamInvitationCode: ClaimTeamInvitationCode;
  cloneTestRecording: CloneTestRecording;
  closeAuthRequest: CloseAuthRequest;
  completeTestRunShard: CompleteTestRunShard;
  createPlan: CreatePlan;
  createRecording: CreateRecording;
  createUserAPIKey: CreateUserApiKey;
  createWorkspace: CreateWorkspace;
  createWorkspaceAPIKey: CreateWorkspaceApiKey;
  deleteComment: DeleteComment;
  deleteCommentReply: DeleteCommentReply;
  deleteExpiredRecording: DeleteExpiredRecording;
  deletePoint: DeletePoint;
  deleteRecording: DeleteRecording;
  deleteTestRecording: DeleteTestRecording;
  deleteUserAPIKey: DeleteUserApiKey;
  deleteWorkspace: DeleteWorkspace;
  deleteWorkspaceAPIKey: DeleteWorkspaceApiKey;
  deleteWorkspacePaymentMethod: DeleteWorkspacePaymentMethod;
  /** delete data from the table: "api_keys" */
  delete_api_keys?: Maybe<Api_Keys_Mutation_Response>;
  /** delete single row from the table: "api_keys" */
  delete_api_keys_by_pk?: Maybe<Api_Keys>;
  /** delete data from the table: "auth_requests" */
  delete_auth_requests?: Maybe<Auth_Requests_Mutation_Response>;
  /** delete single row from the table: "auth_requests" */
  delete_auth_requests_by_pk?: Maybe<Auth_Requests>;
  /** delete data from the table: "base_snapshots" */
  delete_base_snapshots?: Maybe<Base_Snapshots_Mutation_Response>;
  /** delete single row from the table: "base_snapshots" */
  delete_base_snapshots_by_pk?: Maybe<Base_Snapshots>;
  /** delete data from the table: "cache_warming_results" */
  delete_cache_warming_results?: Maybe<Cache_Warming_Results_Mutation_Response>;
  /** delete single row from the table: "cache_warming_results" */
  delete_cache_warming_results_by_pk?: Maybe<Cache_Warming_Results>;
  /** delete data from the table: "collaborator_requests" */
  delete_collaborator_requests?: Maybe<Collaborator_Requests_Mutation_Response>;
  /** delete single row from the table: "collaborator_requests" */
  delete_collaborator_requests_by_pk?: Maybe<Collaborator_Requests>;
  /** delete data from the table: "collaborators" */
  delete_collaborators?: Maybe<Collaborators_Mutation_Response>;
  /** delete single row from the table: "collaborators" */
  delete_collaborators_by_pk?: Maybe<Collaborators>;
  /** delete data from the table: "comments" */
  delete_comments?: Maybe<Comments_Mutation_Response>;
  /** delete single row from the table: "comments" */
  delete_comments_by_pk?: Maybe<Comments>;
  /** delete data from the table: "controllers" */
  delete_controllers?: Maybe<Controllers_Mutation_Response>;
  /** delete single row from the table: "controllers" */
  delete_controllers_by_pk?: Maybe<Controllers>;
  /** delete data from the table: "dojo_sessions" */
  delete_dojo_sessions?: Maybe<Dojo_Sessions_Mutation_Response>;
  /** delete single row from the table: "dojo_sessions" */
  delete_dojo_sessions_by_pk?: Maybe<Dojo_Sessions>;
  /** delete data from the table: "experimental_crash_reports_filters" */
  delete_experimental_crash_reports_filters?: Maybe<Experimental_Crash_Reports_Filters_Mutation_Response>;
  /** delete single row from the table: "experimental_crash_reports_filters" */
  delete_experimental_crash_reports_filters_by_pk?: Maybe<Experimental_Crash_Reports_Filters>;
  /** delete data from the table: "filters" */
  delete_filters?: Maybe<Filters_Mutation_Response>;
  /** delete single row from the table: "filters" */
  delete_filters_by_pk?: Maybe<Filters>;
  /** delete data from the table: "invitations" */
  delete_invitations?: Maybe<Invitations_Mutation_Response>;
  /** delete single row from the table: "invitations" */
  delete_invitations_by_pk?: Maybe<Invitations>;
  /** delete data from the table: "organizations" */
  delete_organizations?: Maybe<Organizations_Mutation_Response>;
  /** delete single row from the table: "organizations" */
  delete_organizations_by_pk?: Maybe<Organizations>;
  /** delete data from the table: "plans" */
  delete_plans?: Maybe<Plans_Mutation_Response>;
  /** delete single row from the table: "plans" */
  delete_plans_by_pk?: Maybe<Plans>;
  /** delete data from the table: "processing_task_state" */
  delete_processing_task_state?: Maybe<Processing_Task_State_Mutation_Response>;
  /** delete single row from the table: "processing_task_state" */
  delete_processing_task_state_by_pk?: Maybe<Processing_Task_State>;
  /** delete data from the table: "recording_assets" */
  delete_recording_assets?: Maybe<Recording_Assets_Mutation_Response>;
  /** delete single row from the table: "recording_assets" */
  delete_recording_assets_by_pk?: Maybe<Recording_Assets>;
  /** delete data from the table: "recording_checkpoints" */
  delete_recording_checkpoints?: Maybe<Recording_Checkpoints_Mutation_Response>;
  /** delete single row from the table: "recording_checkpoints" */
  delete_recording_checkpoints_by_pk?: Maybe<Recording_Checkpoints>;
  /** delete data from the table: "recording_originalsources" */
  delete_recording_originalsources?: Maybe<Recording_Originalsources_Mutation_Response>;
  /** delete single row from the table: "recording_originalsources" */
  delete_recording_originalsources_by_pk?: Maybe<Recording_Originalsources>;
  /** delete data from the table: "recording_points" */
  delete_recording_points?: Maybe<Recording_Points_Mutation_Response>;
  /** delete single row from the table: "recording_points" */
  delete_recording_points_by_pk?: Maybe<Recording_Points>;
  /** delete data from the table: "recording_regions" */
  delete_recording_regions?: Maybe<Recording_Regions_Mutation_Response>;
  /** delete single row from the table: "recording_regions" */
  delete_recording_regions_by_pk?: Maybe<Recording_Regions>;
  /** delete data from the table: "recording_sourcemaps" */
  delete_recording_sourcemaps?: Maybe<Recording_Sourcemaps_Mutation_Response>;
  /** delete single row from the table: "recording_sourcemaps" */
  delete_recording_sourcemaps_by_pk?: Maybe<Recording_Sourcemaps>;
  /** delete data from the table: "recordings" */
  delete_recordings?: Maybe<Recordings_Mutation_Response>;
  /** delete single row from the table: "recordings" */
  delete_recordings_by_pk?: Maybe<Recordings>;
  /** delete data from the table: "release_build_files" */
  delete_release_build_files?: Maybe<Release_Build_Files_Mutation_Response>;
  /** delete single row from the table: "release_build_files" */
  delete_release_build_files_by_pk?: Maybe<Release_Build_Files>;
  /** delete data from the table: "releases" */
  delete_releases?: Maybe<Releases_Mutation_Response>;
  /** delete single row from the table: "releases" */
  delete_releases_by_pk?: Maybe<Releases>;
  /** delete data from the table: "root_cause_analysis_results" */
  delete_root_cause_analysis_results?: Maybe<Root_Cause_Analysis_Results_Mutation_Response>;
  /** delete single row from the table: "root_cause_analysis_results" */
  delete_root_cause_analysis_results_by_pk?: Maybe<Root_Cause_Analysis_Results>;
  /** delete data from the table: "runtime_crash_report_sessions" */
  delete_runtime_crash_report_sessions?: Maybe<Runtime_Crash_Report_Sessions_Mutation_Response>;
  /** delete single row from the table: "runtime_crash_report_sessions" */
  delete_runtime_crash_report_sessions_by_pk?: Maybe<Runtime_Crash_Report_Sessions>;
  /** delete data from the table: "runtime_crash_reports" */
  delete_runtime_crash_reports?: Maybe<Runtime_Crash_Reports_Mutation_Response>;
  /** delete single row from the table: "runtime_crash_reports" */
  delete_runtime_crash_reports_by_pk?: Maybe<Runtime_Crash_Reports>;
  /** delete data from the table: "sessions" */
  delete_sessions?: Maybe<Sessions_Mutation_Response>;
  /** delete single row from the table: "sessions" */
  delete_sessions_by_pk?: Maybe<Sessions>;
  /** delete data from the table: "simple_inbox" */
  delete_simple_inbox?: Maybe<Simple_Inbox_Mutation_Response>;
  /** delete single row from the table: "simple_inbox" */
  delete_simple_inbox_by_pk?: Maybe<Simple_Inbox>;
  /** delete data from the table: "snapshot_diffs" */
  delete_snapshot_diffs?: Maybe<Snapshot_Diffs_Mutation_Response>;
  /** delete single row from the table: "snapshot_diffs" */
  delete_snapshot_diffs_by_pk?: Maybe<Snapshot_Diffs>;
  /** delete data from the table: "test_run_metrics" */
  delete_test_run_metrics?: Maybe<Test_Run_Metrics_Mutation_Response>;
  /** delete single row from the table: "test_run_metrics" */
  delete_test_run_metrics_by_pk?: Maybe<Test_Run_Metrics>;
  /** delete data from the table: "test_run_results" */
  delete_test_run_results?: Maybe<Test_Run_Results_Mutation_Response>;
  /** delete single row from the table: "test_run_results" */
  delete_test_run_results_by_pk?: Maybe<Test_Run_Results>;
  /** delete data from the table: "test_run_shards" */
  delete_test_run_shards?: Maybe<Test_Run_Shards_Mutation_Response>;
  /** delete single row from the table: "test_run_shards" */
  delete_test_run_shards_by_pk?: Maybe<Test_Run_Shards>;
  /** delete data from the table: "test_run_test_recordings" */
  delete_test_run_test_recordings?: Maybe<Test_Run_Test_Recordings_Mutation_Response>;
  /** delete data from the table: "test_run_tests" */
  delete_test_run_tests?: Maybe<Test_Run_Tests_Mutation_Response>;
  /** delete single row from the table: "test_run_tests" */
  delete_test_run_tests_by_pk?: Maybe<Test_Run_Tests>;
  /** delete data from the table: "test_runs" */
  delete_test_runs?: Maybe<Test_Runs_Mutation_Response>;
  /** delete single row from the table: "test_runs" */
  delete_test_runs_by_pk?: Maybe<Test_Runs>;
  /** delete data from the table: "test_runs_new" */
  delete_test_runs_new?: Maybe<Test_Runs_New_Mutation_Response>;
  /** delete single row from the table: "test_runs_new" */
  delete_test_runs_new_by_pk?: Maybe<Test_Runs_New>;
  /** delete data from the table: "user_ids" */
  delete_user_ids?: Maybe<User_Ids_Mutation_Response>;
  /** delete single row from the table: "user_ids" */
  delete_user_ids_by_pk?: Maybe<User_Ids>;
  /** delete data from the table: "user_settings" */
  delete_user_settings?: Maybe<User_Settings_Mutation_Response>;
  /** delete single row from the table: "user_settings" */
  delete_user_settings_by_pk?: Maybe<User_Settings>;
  /** delete data from the table: "user_tos" */
  delete_user_tos?: Maybe<User_Tos_Mutation_Response>;
  /** delete single row from the table: "user_tos" */
  delete_user_tos_by_pk?: Maybe<User_Tos>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** delete data from the table: "workspace_sourcemaps" */
  delete_workspace_sourcemaps?: Maybe<Workspace_Sourcemaps_Mutation_Response>;
  /** delete single row from the table: "workspace_sourcemaps" */
  delete_workspace_sourcemaps_by_pk?: Maybe<Workspace_Sourcemaps>;
  /** delete data from the table: "workspace_tests" */
  delete_workspace_tests?: Maybe<Workspace_Tests_Mutation_Response>;
  /** delete single row from the table: "workspace_tests" */
  delete_workspace_tests_by_pk?: Maybe<Workspace_Tests>;
  /** delete data from the table: "workspaces" */
  delete_workspaces?: Maybe<Workspaces_Mutation_Response>;
  /** delete single row from the table: "workspaces" */
  delete_workspaces_by_pk?: Maybe<Workspaces>;
  /** delete data from the table: "workspaces_subscription" */
  delete_workspaces_subscription?: Maybe<Workspaces_Subscription_Mutation_Response>;
  /** delete single row from the table: "workspaces_subscription" */
  delete_workspaces_subscription_by_pk?: Maybe<Workspaces_Subscription>;
  /** delete data from the table: "workspaces_user" */
  delete_workspaces_user?: Maybe<Workspaces_User_Mutation_Response>;
  /** delete single row from the table: "workspaces_user" */
  delete_workspaces_user_by_pk?: Maybe<Workspaces_User>;
  dismissNag: DismissNag;
  ensureUserForAuth: EnsureUserForAuth;
  fulfillAuthRequest: FulfillAuthRequest;
  initAuthRequest: InitAuthRequest;
  initializeRecording: InitializeRecording;
  /** insert data into the table: "api_keys" */
  insert_api_keys?: Maybe<Api_Keys_Mutation_Response>;
  /** insert a single row into the table: "api_keys" */
  insert_api_keys_one?: Maybe<Api_Keys>;
  /** insert data into the table: "auth_requests" */
  insert_auth_requests?: Maybe<Auth_Requests_Mutation_Response>;
  /** insert a single row into the table: "auth_requests" */
  insert_auth_requests_one?: Maybe<Auth_Requests>;
  /** insert data into the table: "base_snapshots" */
  insert_base_snapshots?: Maybe<Base_Snapshots_Mutation_Response>;
  /** insert a single row into the table: "base_snapshots" */
  insert_base_snapshots_one?: Maybe<Base_Snapshots>;
  /** insert data into the table: "cache_warming_results" */
  insert_cache_warming_results?: Maybe<Cache_Warming_Results_Mutation_Response>;
  /** insert a single row into the table: "cache_warming_results" */
  insert_cache_warming_results_one?: Maybe<Cache_Warming_Results>;
  /** insert data into the table: "collaborator_requests" */
  insert_collaborator_requests?: Maybe<Collaborator_Requests_Mutation_Response>;
  /** insert a single row into the table: "collaborator_requests" */
  insert_collaborator_requests_one?: Maybe<Collaborator_Requests>;
  /** insert data into the table: "collaborators" */
  insert_collaborators?: Maybe<Collaborators_Mutation_Response>;
  /** insert a single row into the table: "collaborators" */
  insert_collaborators_one?: Maybe<Collaborators>;
  /** insert data into the table: "comments" */
  insert_comments?: Maybe<Comments_Mutation_Response>;
  /** insert a single row into the table: "comments" */
  insert_comments_one?: Maybe<Comments>;
  /** insert data into the table: "controllers" */
  insert_controllers?: Maybe<Controllers_Mutation_Response>;
  /** insert a single row into the table: "controllers" */
  insert_controllers_one?: Maybe<Controllers>;
  /** insert data into the table: "dojo_sessions" */
  insert_dojo_sessions?: Maybe<Dojo_Sessions_Mutation_Response>;
  /** insert a single row into the table: "dojo_sessions" */
  insert_dojo_sessions_one?: Maybe<Dojo_Sessions>;
  /** insert data into the table: "experimental_crash_reports_filters" */
  insert_experimental_crash_reports_filters?: Maybe<Experimental_Crash_Reports_Filters_Mutation_Response>;
  /** insert a single row into the table: "experimental_crash_reports_filters" */
  insert_experimental_crash_reports_filters_one?: Maybe<Experimental_Crash_Reports_Filters>;
  /** insert data into the table: "filters" */
  insert_filters?: Maybe<Filters_Mutation_Response>;
  /** insert a single row into the table: "filters" */
  insert_filters_one?: Maybe<Filters>;
  /** insert data into the table: "invitations" */
  insert_invitations?: Maybe<Invitations_Mutation_Response>;
  /** insert a single row into the table: "invitations" */
  insert_invitations_one?: Maybe<Invitations>;
  /** insert data into the table: "organizations" */
  insert_organizations?: Maybe<Organizations_Mutation_Response>;
  /** insert a single row into the table: "organizations" */
  insert_organizations_one?: Maybe<Organizations>;
  /** insert data into the table: "plans" */
  insert_plans?: Maybe<Plans_Mutation_Response>;
  /** insert a single row into the table: "plans" */
  insert_plans_one?: Maybe<Plans>;
  /** insert data into the table: "processing_task_state" */
  insert_processing_task_state?: Maybe<Processing_Task_State_Mutation_Response>;
  /** insert a single row into the table: "processing_task_state" */
  insert_processing_task_state_one?: Maybe<Processing_Task_State>;
  /** insert data into the table: "recording_assets" */
  insert_recording_assets?: Maybe<Recording_Assets_Mutation_Response>;
  /** insert a single row into the table: "recording_assets" */
  insert_recording_assets_one?: Maybe<Recording_Assets>;
  /** insert data into the table: "recording_checkpoints" */
  insert_recording_checkpoints?: Maybe<Recording_Checkpoints_Mutation_Response>;
  /** insert a single row into the table: "recording_checkpoints" */
  insert_recording_checkpoints_one?: Maybe<Recording_Checkpoints>;
  /** insert data into the table: "recording_originalsources" */
  insert_recording_originalsources?: Maybe<Recording_Originalsources_Mutation_Response>;
  /** insert a single row into the table: "recording_originalsources" */
  insert_recording_originalsources_one?: Maybe<Recording_Originalsources>;
  /** insert data into the table: "recording_points" */
  insert_recording_points?: Maybe<Recording_Points_Mutation_Response>;
  /** insert a single row into the table: "recording_points" */
  insert_recording_points_one?: Maybe<Recording_Points>;
  /** insert data into the table: "recording_regions" */
  insert_recording_regions?: Maybe<Recording_Regions_Mutation_Response>;
  /** insert a single row into the table: "recording_regions" */
  insert_recording_regions_one?: Maybe<Recording_Regions>;
  /** insert data into the table: "recording_sourcemaps" */
  insert_recording_sourcemaps?: Maybe<Recording_Sourcemaps_Mutation_Response>;
  /** insert a single row into the table: "recording_sourcemaps" */
  insert_recording_sourcemaps_one?: Maybe<Recording_Sourcemaps>;
  /** insert data into the table: "recordings" */
  insert_recordings?: Maybe<Recordings_Mutation_Response>;
  /** insert a single row into the table: "recordings" */
  insert_recordings_one?: Maybe<Recordings>;
  /** insert data into the table: "release_build_files" */
  insert_release_build_files?: Maybe<Release_Build_Files_Mutation_Response>;
  /** insert a single row into the table: "release_build_files" */
  insert_release_build_files_one?: Maybe<Release_Build_Files>;
  /** insert data into the table: "releases" */
  insert_releases?: Maybe<Releases_Mutation_Response>;
  /** insert a single row into the table: "releases" */
  insert_releases_one?: Maybe<Releases>;
  /** insert data into the table: "root_cause_analysis_results" */
  insert_root_cause_analysis_results?: Maybe<Root_Cause_Analysis_Results_Mutation_Response>;
  /** insert a single row into the table: "root_cause_analysis_results" */
  insert_root_cause_analysis_results_one?: Maybe<Root_Cause_Analysis_Results>;
  /** insert data into the table: "runtime_crash_report_sessions" */
  insert_runtime_crash_report_sessions?: Maybe<Runtime_Crash_Report_Sessions_Mutation_Response>;
  /** insert a single row into the table: "runtime_crash_report_sessions" */
  insert_runtime_crash_report_sessions_one?: Maybe<Runtime_Crash_Report_Sessions>;
  /** insert data into the table: "runtime_crash_reports" */
  insert_runtime_crash_reports?: Maybe<Runtime_Crash_Reports_Mutation_Response>;
  /** insert a single row into the table: "runtime_crash_reports" */
  insert_runtime_crash_reports_one?: Maybe<Runtime_Crash_Reports>;
  /** insert data into the table: "sessions" */
  insert_sessions?: Maybe<Sessions_Mutation_Response>;
  /** insert a single row into the table: "sessions" */
  insert_sessions_one?: Maybe<Sessions>;
  /** insert data into the table: "simple_inbox" */
  insert_simple_inbox?: Maybe<Simple_Inbox_Mutation_Response>;
  /** insert a single row into the table: "simple_inbox" */
  insert_simple_inbox_one?: Maybe<Simple_Inbox>;
  /** insert data into the table: "snapshot_diffs" */
  insert_snapshot_diffs?: Maybe<Snapshot_Diffs_Mutation_Response>;
  /** insert a single row into the table: "snapshot_diffs" */
  insert_snapshot_diffs_one?: Maybe<Snapshot_Diffs>;
  /** insert data into the table: "test_run_metrics" */
  insert_test_run_metrics?: Maybe<Test_Run_Metrics_Mutation_Response>;
  /** insert a single row into the table: "test_run_metrics" */
  insert_test_run_metrics_one?: Maybe<Test_Run_Metrics>;
  /** insert data into the table: "test_run_results" */
  insert_test_run_results?: Maybe<Test_Run_Results_Mutation_Response>;
  /** insert a single row into the table: "test_run_results" */
  insert_test_run_results_one?: Maybe<Test_Run_Results>;
  /** insert data into the table: "test_run_shards" */
  insert_test_run_shards?: Maybe<Test_Run_Shards_Mutation_Response>;
  /** insert a single row into the table: "test_run_shards" */
  insert_test_run_shards_one?: Maybe<Test_Run_Shards>;
  /** insert data into the table: "test_run_test_recordings" */
  insert_test_run_test_recordings?: Maybe<Test_Run_Test_Recordings_Mutation_Response>;
  /** insert a single row into the table: "test_run_test_recordings" */
  insert_test_run_test_recordings_one?: Maybe<Test_Run_Test_Recordings>;
  /** insert data into the table: "test_run_tests" */
  insert_test_run_tests?: Maybe<Test_Run_Tests_Mutation_Response>;
  /** insert a single row into the table: "test_run_tests" */
  insert_test_run_tests_one?: Maybe<Test_Run_Tests>;
  /** insert data into the table: "test_runs" */
  insert_test_runs?: Maybe<Test_Runs_Mutation_Response>;
  /** insert data into the table: "test_runs_new" */
  insert_test_runs_new?: Maybe<Test_Runs_New_Mutation_Response>;
  /** insert a single row into the table: "test_runs_new" */
  insert_test_runs_new_one?: Maybe<Test_Runs_New>;
  /** insert a single row into the table: "test_runs" */
  insert_test_runs_one?: Maybe<Test_Runs>;
  /** insert data into the table: "user_ids" */
  insert_user_ids?: Maybe<User_Ids_Mutation_Response>;
  /** insert a single row into the table: "user_ids" */
  insert_user_ids_one?: Maybe<User_Ids>;
  /** insert data into the table: "user_settings" */
  insert_user_settings?: Maybe<User_Settings_Mutation_Response>;
  /** insert a single row into the table: "user_settings" */
  insert_user_settings_one?: Maybe<User_Settings>;
  /** insert data into the table: "user_tos" */
  insert_user_tos?: Maybe<User_Tos_Mutation_Response>;
  /** insert a single row into the table: "user_tos" */
  insert_user_tos_one?: Maybe<User_Tos>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** insert data into the table: "workspace_sourcemaps" */
  insert_workspace_sourcemaps?: Maybe<Workspace_Sourcemaps_Mutation_Response>;
  /** insert a single row into the table: "workspace_sourcemaps" */
  insert_workspace_sourcemaps_one?: Maybe<Workspace_Sourcemaps>;
  /** insert data into the table: "workspace_tests" */
  insert_workspace_tests?: Maybe<Workspace_Tests_Mutation_Response>;
  /** insert a single row into the table: "workspace_tests" */
  insert_workspace_tests_one?: Maybe<Workspace_Tests>;
  /** insert data into the table: "workspaces" */
  insert_workspaces?: Maybe<Workspaces_Mutation_Response>;
  /** insert a single row into the table: "workspaces" */
  insert_workspaces_one?: Maybe<Workspaces>;
  /** insert data into the table: "workspaces_subscription" */
  insert_workspaces_subscription?: Maybe<Workspaces_Subscription_Mutation_Response>;
  /** insert a single row into the table: "workspaces_subscription" */
  insert_workspaces_subscription_one?: Maybe<Workspaces_Subscription>;
  /** insert data into the table: "workspaces_user" */
  insert_workspaces_user?: Maybe<Workspaces_User_Mutation_Response>;
  /** insert a single row into the table: "workspaces_user" */
  insert_workspaces_user_one?: Maybe<Workspaces_User>;
  maybeAcceptWorkspaceMembershipForRecording: MaybeAcceptWorkspaceMembershipForRecording;
  maybeMarkRecordingViewed: MaybeMarkRecordingViewed;
  prepareWorkspacePaymentMethod: PrepareWorkspacePaymentMethod;
  rejectWorkspaceMembership: RejectWorkspaceMembership;
  removeRecordingCollaborator: RemoveRecordingCollaborator;
  removeWorkspaceMember: RemoveWorkspaceMember;
  requestRecordingAccess: RequestRecordingAccess;
  resetTestUser: ResetTestUser;
  sendUserInvitation: SendUserInvitation;
  setRecordingMetadata: SetRecordingMetadata;
  setWorkspaceDefaultPaymentMethod: SetWorkspaceDefaultPaymentMethod;
  startTestRunShard: StartTestRunShard;
  subscribeToEmailType: SubscribeToEmailType;
  unsubscribeToEmailType: UnsubscribeToEmailType;
  updateComment: UpdateComment;
  updateCommentReply: UpdateCommentReply;
  updatePoint: UpdatePoint;
  updateRecordingPrivacy: UpdateRecordingPrivacy;
  updateRecordingResolution: UpdateRecordingResolution;
  updateRecordingTitle: UpdateRecordingTitle;
  updateRecordingWorkspace: UpdateRecordingWorkspace;
  updateSubscriptionStatus: UpdateSubscriptionStatus;
  updateUserDefaultWorkspace: UpdateUserDefaultWorkspace;
  updateUserPreferences: UpdateUserPreferences;
  updateUserSettings: UpdateUserSettings;
  updateWorkspaceCodeDomainLimitations: UpdateWorkspaceCodeDomainLimitations;
  updateWorkspaceLogo: UpdateWorkspaceLogo;
  updateWorkspaceMemberRole: UpdateWorkspaceMemberRole;
  updateWorkspaceSettings: UpdateWorkspaceSettings;
  updateWorkspaceSubscriptionStatus: UpdateWorkspaceSubscriptionStatus;
  /** update data of the table: "api_keys" */
  update_api_keys?: Maybe<Api_Keys_Mutation_Response>;
  /** update single row of the table: "api_keys" */
  update_api_keys_by_pk?: Maybe<Api_Keys>;
  /** update data of the table: "auth_requests" */
  update_auth_requests?: Maybe<Auth_Requests_Mutation_Response>;
  /** update single row of the table: "auth_requests" */
  update_auth_requests_by_pk?: Maybe<Auth_Requests>;
  /** update data of the table: "base_snapshots" */
  update_base_snapshots?: Maybe<Base_Snapshots_Mutation_Response>;
  /** update single row of the table: "base_snapshots" */
  update_base_snapshots_by_pk?: Maybe<Base_Snapshots>;
  /** update data of the table: "cache_warming_results" */
  update_cache_warming_results?: Maybe<Cache_Warming_Results_Mutation_Response>;
  /** update single row of the table: "cache_warming_results" */
  update_cache_warming_results_by_pk?: Maybe<Cache_Warming_Results>;
  /** update data of the table: "collaborator_requests" */
  update_collaborator_requests?: Maybe<Collaborator_Requests_Mutation_Response>;
  /** update single row of the table: "collaborator_requests" */
  update_collaborator_requests_by_pk?: Maybe<Collaborator_Requests>;
  /** update data of the table: "collaborators" */
  update_collaborators?: Maybe<Collaborators_Mutation_Response>;
  /** update single row of the table: "collaborators" */
  update_collaborators_by_pk?: Maybe<Collaborators>;
  /** update data of the table: "comments" */
  update_comments?: Maybe<Comments_Mutation_Response>;
  /** update single row of the table: "comments" */
  update_comments_by_pk?: Maybe<Comments>;
  /** update data of the table: "controllers" */
  update_controllers?: Maybe<Controllers_Mutation_Response>;
  /** update single row of the table: "controllers" */
  update_controllers_by_pk?: Maybe<Controllers>;
  /** update data of the table: "dojo_sessions" */
  update_dojo_sessions?: Maybe<Dojo_Sessions_Mutation_Response>;
  /** update single row of the table: "dojo_sessions" */
  update_dojo_sessions_by_pk?: Maybe<Dojo_Sessions>;
  /** update data of the table: "experimental_crash_reports_filters" */
  update_experimental_crash_reports_filters?: Maybe<Experimental_Crash_Reports_Filters_Mutation_Response>;
  /** update single row of the table: "experimental_crash_reports_filters" */
  update_experimental_crash_reports_filters_by_pk?: Maybe<Experimental_Crash_Reports_Filters>;
  /** update data of the table: "filters" */
  update_filters?: Maybe<Filters_Mutation_Response>;
  /** update single row of the table: "filters" */
  update_filters_by_pk?: Maybe<Filters>;
  /** update data of the table: "invitations" */
  update_invitations?: Maybe<Invitations_Mutation_Response>;
  /** update single row of the table: "invitations" */
  update_invitations_by_pk?: Maybe<Invitations>;
  /** update data of the table: "organizations" */
  update_organizations?: Maybe<Organizations_Mutation_Response>;
  /** update single row of the table: "organizations" */
  update_organizations_by_pk?: Maybe<Organizations>;
  /** update data of the table: "plans" */
  update_plans?: Maybe<Plans_Mutation_Response>;
  /** update single row of the table: "plans" */
  update_plans_by_pk?: Maybe<Plans>;
  /** update data of the table: "processing_task_state" */
  update_processing_task_state?: Maybe<Processing_Task_State_Mutation_Response>;
  /** update single row of the table: "processing_task_state" */
  update_processing_task_state_by_pk?: Maybe<Processing_Task_State>;
  /** update data of the table: "recording_assets" */
  update_recording_assets?: Maybe<Recording_Assets_Mutation_Response>;
  /** update single row of the table: "recording_assets" */
  update_recording_assets_by_pk?: Maybe<Recording_Assets>;
  /** update data of the table: "recording_checkpoints" */
  update_recording_checkpoints?: Maybe<Recording_Checkpoints_Mutation_Response>;
  /** update single row of the table: "recording_checkpoints" */
  update_recording_checkpoints_by_pk?: Maybe<Recording_Checkpoints>;
  /** update data of the table: "recording_originalsources" */
  update_recording_originalsources?: Maybe<Recording_Originalsources_Mutation_Response>;
  /** update single row of the table: "recording_originalsources" */
  update_recording_originalsources_by_pk?: Maybe<Recording_Originalsources>;
  /** update data of the table: "recording_points" */
  update_recording_points?: Maybe<Recording_Points_Mutation_Response>;
  /** update single row of the table: "recording_points" */
  update_recording_points_by_pk?: Maybe<Recording_Points>;
  /** update data of the table: "recording_regions" */
  update_recording_regions?: Maybe<Recording_Regions_Mutation_Response>;
  /** update single row of the table: "recording_regions" */
  update_recording_regions_by_pk?: Maybe<Recording_Regions>;
  /** update data of the table: "recording_sourcemaps" */
  update_recording_sourcemaps?: Maybe<Recording_Sourcemaps_Mutation_Response>;
  /** update single row of the table: "recording_sourcemaps" */
  update_recording_sourcemaps_by_pk?: Maybe<Recording_Sourcemaps>;
  /** update data of the table: "recordings" */
  update_recordings?: Maybe<Recordings_Mutation_Response>;
  /** update single row of the table: "recordings" */
  update_recordings_by_pk?: Maybe<Recordings>;
  /** update data of the table: "release_build_files" */
  update_release_build_files?: Maybe<Release_Build_Files_Mutation_Response>;
  /** update single row of the table: "release_build_files" */
  update_release_build_files_by_pk?: Maybe<Release_Build_Files>;
  /** update data of the table: "releases" */
  update_releases?: Maybe<Releases_Mutation_Response>;
  /** update single row of the table: "releases" */
  update_releases_by_pk?: Maybe<Releases>;
  /** update data of the table: "root_cause_analysis_results" */
  update_root_cause_analysis_results?: Maybe<Root_Cause_Analysis_Results_Mutation_Response>;
  /** update single row of the table: "root_cause_analysis_results" */
  update_root_cause_analysis_results_by_pk?: Maybe<Root_Cause_Analysis_Results>;
  /** update data of the table: "runtime_crash_report_sessions" */
  update_runtime_crash_report_sessions?: Maybe<Runtime_Crash_Report_Sessions_Mutation_Response>;
  /** update single row of the table: "runtime_crash_report_sessions" */
  update_runtime_crash_report_sessions_by_pk?: Maybe<Runtime_Crash_Report_Sessions>;
  /** update data of the table: "runtime_crash_reports" */
  update_runtime_crash_reports?: Maybe<Runtime_Crash_Reports_Mutation_Response>;
  /** update single row of the table: "runtime_crash_reports" */
  update_runtime_crash_reports_by_pk?: Maybe<Runtime_Crash_Reports>;
  /** update data of the table: "sessions" */
  update_sessions?: Maybe<Sessions_Mutation_Response>;
  /** update single row of the table: "sessions" */
  update_sessions_by_pk?: Maybe<Sessions>;
  /** update data of the table: "simple_inbox" */
  update_simple_inbox?: Maybe<Simple_Inbox_Mutation_Response>;
  /** update single row of the table: "simple_inbox" */
  update_simple_inbox_by_pk?: Maybe<Simple_Inbox>;
  /** update data of the table: "snapshot_diffs" */
  update_snapshot_diffs?: Maybe<Snapshot_Diffs_Mutation_Response>;
  /** update single row of the table: "snapshot_diffs" */
  update_snapshot_diffs_by_pk?: Maybe<Snapshot_Diffs>;
  /** update data of the table: "test_run_metrics" */
  update_test_run_metrics?: Maybe<Test_Run_Metrics_Mutation_Response>;
  /** update single row of the table: "test_run_metrics" */
  update_test_run_metrics_by_pk?: Maybe<Test_Run_Metrics>;
  /** update data of the table: "test_run_results" */
  update_test_run_results?: Maybe<Test_Run_Results_Mutation_Response>;
  /** update single row of the table: "test_run_results" */
  update_test_run_results_by_pk?: Maybe<Test_Run_Results>;
  /** update data of the table: "test_run_shards" */
  update_test_run_shards?: Maybe<Test_Run_Shards_Mutation_Response>;
  /** update single row of the table: "test_run_shards" */
  update_test_run_shards_by_pk?: Maybe<Test_Run_Shards>;
  /** update data of the table: "test_run_test_recordings" */
  update_test_run_test_recordings?: Maybe<Test_Run_Test_Recordings_Mutation_Response>;
  /** update data of the table: "test_run_tests" */
  update_test_run_tests?: Maybe<Test_Run_Tests_Mutation_Response>;
  /** update single row of the table: "test_run_tests" */
  update_test_run_tests_by_pk?: Maybe<Test_Run_Tests>;
  /** update data of the table: "test_runs" */
  update_test_runs?: Maybe<Test_Runs_Mutation_Response>;
  /** update single row of the table: "test_runs" */
  update_test_runs_by_pk?: Maybe<Test_Runs>;
  /** update data of the table: "test_runs_new" */
  update_test_runs_new?: Maybe<Test_Runs_New_Mutation_Response>;
  /** update single row of the table: "test_runs_new" */
  update_test_runs_new_by_pk?: Maybe<Test_Runs_New>;
  /** update data of the table: "user_ids" */
  update_user_ids?: Maybe<User_Ids_Mutation_Response>;
  /** update single row of the table: "user_ids" */
  update_user_ids_by_pk?: Maybe<User_Ids>;
  /** update data of the table: "user_settings" */
  update_user_settings?: Maybe<User_Settings_Mutation_Response>;
  /** update single row of the table: "user_settings" */
  update_user_settings_by_pk?: Maybe<User_Settings>;
  /** update data of the table: "user_tos" */
  update_user_tos?: Maybe<User_Tos_Mutation_Response>;
  /** update single row of the table: "user_tos" */
  update_user_tos_by_pk?: Maybe<User_Tos>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update data of the table: "workspace_sourcemaps" */
  update_workspace_sourcemaps?: Maybe<Workspace_Sourcemaps_Mutation_Response>;
  /** update single row of the table: "workspace_sourcemaps" */
  update_workspace_sourcemaps_by_pk?: Maybe<Workspace_Sourcemaps>;
  /** update data of the table: "workspace_tests" */
  update_workspace_tests?: Maybe<Workspace_Tests_Mutation_Response>;
  /** update single row of the table: "workspace_tests" */
  update_workspace_tests_by_pk?: Maybe<Workspace_Tests>;
  /** update data of the table: "workspaces" */
  update_workspaces?: Maybe<Workspaces_Mutation_Response>;
  /** update single row of the table: "workspaces" */
  update_workspaces_by_pk?: Maybe<Workspaces>;
  /** update data of the table: "workspaces_subscription" */
  update_workspaces_subscription?: Maybe<Workspaces_Subscription_Mutation_Response>;
  /** update single row of the table: "workspaces_subscription" */
  update_workspaces_subscription_by_pk?: Maybe<Workspaces_Subscription>;
  /** update data of the table: "workspaces_user" */
  update_workspaces_user?: Maybe<Workspaces_User_Mutation_Response>;
  /** update single row of the table: "workspaces_user" */
  update_workspaces_user_by_pk?: Maybe<Workspaces_User>;
};


/** mutation root */
export type Mutation_RootAcceptRecordingCollaboratorRequestArgs = {
  input: AcceptRecordingCollaboratorRequestInput;
};


/** mutation root */
export type Mutation_RootAcceptTermsOfServiceArgs = {
  input: AcceptTermsOfServiceInput;
};


/** mutation root */
export type Mutation_RootAcceptWorkspaceMembershipArgs = {
  input: AcceptWorkspaceMembershipInput;
};


/** mutation root */
export type Mutation_RootActionNameArgs = {
  arg1: SampleInput;
};


/** mutation root */
export type Mutation_RootActivateWorkspaceSubscriptionArgs = {
  input: ActivateWorkspaceSubscriptionInput;
};


/** mutation root */
export type Mutation_RootAddCommentArgs = {
  input: AddCommentInput;
};


/** mutation root */
export type Mutation_RootAddCommentReplyArgs = {
  input: AddCommentReplyInput;
};


/** mutation root */
export type Mutation_RootAddPointArgs = {
  input: AddPointInput;
};


/** mutation root */
export type Mutation_RootAddRecordingCollaboratorArgs = {
  input: AddRecordingCollaboratorInput;
};


/** mutation root */
export type Mutation_RootAddTestsToShardArgs = {
  input: AddTestsToShardInput;
};


/** mutation root */
export type Mutation_RootAddWorkspaceMemberArgs = {
  input: AddWorkspaceMemberInput;
};


/** mutation root */
export type Mutation_RootCancelWorkspaceSubscriptionArgs = {
  input: CancelWorkspaceSubscriptionInput;
};


/** mutation root */
export type Mutation_RootClaimTeamInvitationCodeArgs = {
  input: ClaimTeamInvitationCodeInput;
};


/** mutation root */
export type Mutation_RootCloneTestRecordingArgs = {
  input: CloneTestRecordingInput;
};


/** mutation root */
export type Mutation_RootCloseAuthRequestArgs = {
  input: CloseAuthRequestInput;
};


/** mutation root */
export type Mutation_RootCompleteTestRunShardArgs = {
  input: CompleteTestRunShardInput;
};


/** mutation root */
export type Mutation_RootCreatePlanArgs = {
  input: CreatePlanInput;
};


/** mutation root */
export type Mutation_RootCreateRecordingArgs = {
  input: CreateRecordingInput;
};


/** mutation root */
export type Mutation_RootCreateUserApiKeyArgs = {
  input: CreateUserApiKeyInput;
};


/** mutation root */
export type Mutation_RootCreateWorkspaceArgs = {
  input: CreateWorkspaceInput;
};


/** mutation root */
export type Mutation_RootCreateWorkspaceApiKeyArgs = {
  input: CreateWorkspaceApiKeyInput;
};


/** mutation root */
export type Mutation_RootDeleteCommentArgs = {
  input: DeleteCommentInput;
};


/** mutation root */
export type Mutation_RootDeleteCommentReplyArgs = {
  input: DeleteCommentReplyInput;
};


/** mutation root */
export type Mutation_RootDeleteExpiredRecordingArgs = {
  input: DeleteExpiredRecordingInput;
};


/** mutation root */
export type Mutation_RootDeletePointArgs = {
  input: DeletePointInput;
};


/** mutation root */
export type Mutation_RootDeleteRecordingArgs = {
  input: DeleteRecordingInput;
};


/** mutation root */
export type Mutation_RootDeleteTestRecordingArgs = {
  input: DeleteTestRecordingInput;
};


/** mutation root */
export type Mutation_RootDeleteUserApiKeyArgs = {
  input: DeleteUserApiKeyInput;
};


/** mutation root */
export type Mutation_RootDeleteWorkspaceArgs = {
  input: DeleteWorkspaceInput;
};


/** mutation root */
export type Mutation_RootDeleteWorkspaceApiKeyArgs = {
  input: DeleteWorkspaceApiKeyInput;
};


/** mutation root */
export type Mutation_RootDeleteWorkspacePaymentMethodArgs = {
  input: DeleteWorkspacePaymentMethodInput;
};


/** mutation root */
export type Mutation_RootDelete_Api_KeysArgs = {
  where: Api_Keys_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Api_Keys_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Auth_RequestsArgs = {
  where: Auth_Requests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Auth_Requests_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Base_SnapshotsArgs = {
  where: Base_Snapshots_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Base_Snapshots_By_PkArgs = {
  checkpoint: Scalars['Int']['input'];
  recording_id: Scalars['uuid']['input'];
  version_id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Cache_Warming_ResultsArgs = {
  where: Cache_Warming_Results_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Cache_Warming_Results_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Collaborator_RequestsArgs = {
  where: Collaborator_Requests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Collaborator_Requests_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_CollaboratorsArgs = {
  where: Collaborators_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Collaborators_By_PkArgs = {
  recording_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_CommentsArgs = {
  where: Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Comments_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ControllersArgs = {
  where: Controllers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Controllers_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Dojo_SessionsArgs = {
  where: Dojo_Sessions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Dojo_Sessions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Experimental_Crash_Reports_FiltersArgs = {
  where: Experimental_Crash_Reports_Filters_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Experimental_Crash_Reports_Filters_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_FiltersArgs = {
  where: Filters_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Filters_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_InvitationsArgs = {
  where: Invitations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Invitations_By_PkArgs = {
  invited_email: Scalars['String']['input'];
  user_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_OrganizationsArgs = {
  where: Organizations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Organizations_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_PlansArgs = {
  where: Plans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Plans_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Processing_Task_StateArgs = {
  where: Processing_Task_State_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Processing_Task_State_By_PkArgs = {
  recording_id: Scalars['uuid']['input'];
  type: Scalars['String']['input'];
  version: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recording_AssetsArgs = {
  where: Recording_Assets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recording_Assets_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recording_CheckpointsArgs = {
  where: Recording_Checkpoints_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recording_Checkpoints_By_PkArgs = {
  checkpoint: Scalars['Int']['input'];
  recording_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recording_OriginalsourcesArgs = {
  where: Recording_Originalsources_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recording_Originalsources_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recording_PointsArgs = {
  where: Recording_Points_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recording_Points_By_PkArgs = {
  key: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recording_RegionsArgs = {
  where: Recording_Regions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recording_Regions_By_PkArgs = {
  recording_id: Scalars['String']['input'];
  region_idx: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recording_SourcemapsArgs = {
  where: Recording_Sourcemaps_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recording_Sourcemaps_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_RecordingsArgs = {
  where: Recordings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recordings_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Release_Build_FilesArgs = {
  where: Release_Build_Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Release_Build_Files_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ReleasesArgs = {
  where: Releases_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Releases_By_PkArgs = {
  build_id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Root_Cause_Analysis_ResultsArgs = {
  where: Root_Cause_Analysis_Results_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Root_Cause_Analysis_Results_By_PkArgs = {
  recording_id: Scalars['uuid']['input'];
  version: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Runtime_Crash_Report_SessionsArgs = {
  where: Runtime_Crash_Report_Sessions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Runtime_Crash_Report_Sessions_By_PkArgs = {
  runtime_crash_report_id: Scalars['uuid']['input'];
  session_id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Runtime_Crash_ReportsArgs = {
  where: Runtime_Crash_Reports_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Runtime_Crash_Reports_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_SessionsArgs = {
  where: Sessions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Sessions_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Simple_InboxArgs = {
  where: Simple_Inbox_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Simple_Inbox_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Snapshot_DiffsArgs = {
  where: Snapshot_Diffs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Snapshot_Diffs_By_PkArgs = {
  end_checkpoint: Scalars['Int']['input'];
  recording_id: Scalars['uuid']['input'];
  version_id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Test_Run_MetricsArgs = {
  where: Test_Run_Metrics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Test_Run_Metrics_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Test_Run_ResultsArgs = {
  where: Test_Run_Results_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Test_Run_Results_By_PkArgs = {
  test_id: Scalars['String']['input'];
  test_run_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Test_Run_ShardsArgs = {
  where: Test_Run_Shards_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Test_Run_Shards_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Test_Run_Test_RecordingsArgs = {
  where: Test_Run_Test_Recordings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Test_Run_TestsArgs = {
  where: Test_Run_Tests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Test_Run_Tests_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Test_RunsArgs = {
  where: Test_Runs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Test_Runs_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Test_Runs_NewArgs = {
  where: Test_Runs_New_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Test_Runs_New_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_IdsArgs = {
  where: User_Ids_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Ids_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_SettingsArgs = {
  where: User_Settings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Settings_By_PkArgs = {
  user_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_TosArgs = {
  where: User_Tos_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Tos_By_PkArgs = {
  tos_version: Scalars['Int']['input'];
  user_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Workspace_SourcemapsArgs = {
  where: Workspace_Sourcemaps_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Workspace_Sourcemaps_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Workspace_TestsArgs = {
  where: Workspace_Tests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Workspace_Tests_By_PkArgs = {
  test_id: Scalars['String']['input'];
  workspace_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_WorkspacesArgs = {
  where: Workspaces_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Workspaces_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Workspaces_SubscriptionArgs = {
  where: Workspaces_Subscription_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Workspaces_Subscription_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Workspaces_UserArgs = {
  where: Workspaces_User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Workspaces_User_By_PkArgs = {
  user_id: Scalars['uuid']['input'];
  workspace_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDismissNagArgs = {
  input: DismissNagInput;
};


/** mutation root */
export type Mutation_RootEnsureUserForAuthArgs = {
  input: EnsureUserForAuthInput;
};


/** mutation root */
export type Mutation_RootFulfillAuthRequestArgs = {
  input: FulfillAuthRequestInput;
};


/** mutation root */
export type Mutation_RootInitAuthRequestArgs = {
  input: InitAuthRequestInput;
};


/** mutation root */
export type Mutation_RootInitializeRecordingArgs = {
  input: InitializeRecordingInput;
};


/** mutation root */
export type Mutation_RootInsert_Api_KeysArgs = {
  objects: Array<Api_Keys_Insert_Input>;
  on_conflict?: InputMaybe<Api_Keys_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Api_Keys_OneArgs = {
  object: Api_Keys_Insert_Input;
  on_conflict?: InputMaybe<Api_Keys_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Auth_RequestsArgs = {
  objects: Array<Auth_Requests_Insert_Input>;
  on_conflict?: InputMaybe<Auth_Requests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Auth_Requests_OneArgs = {
  object: Auth_Requests_Insert_Input;
  on_conflict?: InputMaybe<Auth_Requests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Base_SnapshotsArgs = {
  objects: Array<Base_Snapshots_Insert_Input>;
  on_conflict?: InputMaybe<Base_Snapshots_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Base_Snapshots_OneArgs = {
  object: Base_Snapshots_Insert_Input;
  on_conflict?: InputMaybe<Base_Snapshots_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Cache_Warming_ResultsArgs = {
  objects: Array<Cache_Warming_Results_Insert_Input>;
  on_conflict?: InputMaybe<Cache_Warming_Results_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Cache_Warming_Results_OneArgs = {
  object: Cache_Warming_Results_Insert_Input;
  on_conflict?: InputMaybe<Cache_Warming_Results_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Collaborator_RequestsArgs = {
  objects: Array<Collaborator_Requests_Insert_Input>;
  on_conflict?: InputMaybe<Collaborator_Requests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Collaborator_Requests_OneArgs = {
  object: Collaborator_Requests_Insert_Input;
  on_conflict?: InputMaybe<Collaborator_Requests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CollaboratorsArgs = {
  objects: Array<Collaborators_Insert_Input>;
  on_conflict?: InputMaybe<Collaborators_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Collaborators_OneArgs = {
  object: Collaborators_Insert_Input;
  on_conflict?: InputMaybe<Collaborators_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CommentsArgs = {
  objects: Array<Comments_Insert_Input>;
  on_conflict?: InputMaybe<Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Comments_OneArgs = {
  object: Comments_Insert_Input;
  on_conflict?: InputMaybe<Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ControllersArgs = {
  objects: Array<Controllers_Insert_Input>;
  on_conflict?: InputMaybe<Controllers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Controllers_OneArgs = {
  object: Controllers_Insert_Input;
  on_conflict?: InputMaybe<Controllers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dojo_SessionsArgs = {
  objects: Array<Dojo_Sessions_Insert_Input>;
  on_conflict?: InputMaybe<Dojo_Sessions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dojo_Sessions_OneArgs = {
  object: Dojo_Sessions_Insert_Input;
  on_conflict?: InputMaybe<Dojo_Sessions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Experimental_Crash_Reports_FiltersArgs = {
  objects: Array<Experimental_Crash_Reports_Filters_Insert_Input>;
  on_conflict?: InputMaybe<Experimental_Crash_Reports_Filters_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Experimental_Crash_Reports_Filters_OneArgs = {
  object: Experimental_Crash_Reports_Filters_Insert_Input;
  on_conflict?: InputMaybe<Experimental_Crash_Reports_Filters_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FiltersArgs = {
  objects: Array<Filters_Insert_Input>;
  on_conflict?: InputMaybe<Filters_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Filters_OneArgs = {
  object: Filters_Insert_Input;
  on_conflict?: InputMaybe<Filters_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_InvitationsArgs = {
  objects: Array<Invitations_Insert_Input>;
  on_conflict?: InputMaybe<Invitations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitations_OneArgs = {
  object: Invitations_Insert_Input;
  on_conflict?: InputMaybe<Invitations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OrganizationsArgs = {
  objects: Array<Organizations_Insert_Input>;
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Organizations_OneArgs = {
  object: Organizations_Insert_Input;
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PlansArgs = {
  objects: Array<Plans_Insert_Input>;
  on_conflict?: InputMaybe<Plans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Plans_OneArgs = {
  object: Plans_Insert_Input;
  on_conflict?: InputMaybe<Plans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Processing_Task_StateArgs = {
  objects: Array<Processing_Task_State_Insert_Input>;
  on_conflict?: InputMaybe<Processing_Task_State_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Processing_Task_State_OneArgs = {
  object: Processing_Task_State_Insert_Input;
  on_conflict?: InputMaybe<Processing_Task_State_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recording_AssetsArgs = {
  objects: Array<Recording_Assets_Insert_Input>;
  on_conflict?: InputMaybe<Recording_Assets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recording_Assets_OneArgs = {
  object: Recording_Assets_Insert_Input;
  on_conflict?: InputMaybe<Recording_Assets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recording_CheckpointsArgs = {
  objects: Array<Recording_Checkpoints_Insert_Input>;
  on_conflict?: InputMaybe<Recording_Checkpoints_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recording_Checkpoints_OneArgs = {
  object: Recording_Checkpoints_Insert_Input;
  on_conflict?: InputMaybe<Recording_Checkpoints_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recording_OriginalsourcesArgs = {
  objects: Array<Recording_Originalsources_Insert_Input>;
  on_conflict?: InputMaybe<Recording_Originalsources_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recording_Originalsources_OneArgs = {
  object: Recording_Originalsources_Insert_Input;
  on_conflict?: InputMaybe<Recording_Originalsources_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recording_PointsArgs = {
  objects: Array<Recording_Points_Insert_Input>;
  on_conflict?: InputMaybe<Recording_Points_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recording_Points_OneArgs = {
  object: Recording_Points_Insert_Input;
  on_conflict?: InputMaybe<Recording_Points_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recording_RegionsArgs = {
  objects: Array<Recording_Regions_Insert_Input>;
  on_conflict?: InputMaybe<Recording_Regions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recording_Regions_OneArgs = {
  object: Recording_Regions_Insert_Input;
  on_conflict?: InputMaybe<Recording_Regions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recording_SourcemapsArgs = {
  objects: Array<Recording_Sourcemaps_Insert_Input>;
  on_conflict?: InputMaybe<Recording_Sourcemaps_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recording_Sourcemaps_OneArgs = {
  object: Recording_Sourcemaps_Insert_Input;
  on_conflict?: InputMaybe<Recording_Sourcemaps_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RecordingsArgs = {
  objects: Array<Recordings_Insert_Input>;
  on_conflict?: InputMaybe<Recordings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recordings_OneArgs = {
  object: Recordings_Insert_Input;
  on_conflict?: InputMaybe<Recordings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Release_Build_FilesArgs = {
  objects: Array<Release_Build_Files_Insert_Input>;
  on_conflict?: InputMaybe<Release_Build_Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Release_Build_Files_OneArgs = {
  object: Release_Build_Files_Insert_Input;
  on_conflict?: InputMaybe<Release_Build_Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ReleasesArgs = {
  objects: Array<Releases_Insert_Input>;
  on_conflict?: InputMaybe<Releases_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Releases_OneArgs = {
  object: Releases_Insert_Input;
  on_conflict?: InputMaybe<Releases_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Root_Cause_Analysis_ResultsArgs = {
  objects: Array<Root_Cause_Analysis_Results_Insert_Input>;
  on_conflict?: InputMaybe<Root_Cause_Analysis_Results_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Root_Cause_Analysis_Results_OneArgs = {
  object: Root_Cause_Analysis_Results_Insert_Input;
  on_conflict?: InputMaybe<Root_Cause_Analysis_Results_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Runtime_Crash_Report_SessionsArgs = {
  objects: Array<Runtime_Crash_Report_Sessions_Insert_Input>;
  on_conflict?: InputMaybe<Runtime_Crash_Report_Sessions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Runtime_Crash_Report_Sessions_OneArgs = {
  object: Runtime_Crash_Report_Sessions_Insert_Input;
  on_conflict?: InputMaybe<Runtime_Crash_Report_Sessions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Runtime_Crash_ReportsArgs = {
  objects: Array<Runtime_Crash_Reports_Insert_Input>;
  on_conflict?: InputMaybe<Runtime_Crash_Reports_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Runtime_Crash_Reports_OneArgs = {
  object: Runtime_Crash_Reports_Insert_Input;
  on_conflict?: InputMaybe<Runtime_Crash_Reports_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SessionsArgs = {
  objects: Array<Sessions_Insert_Input>;
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Sessions_OneArgs = {
  object: Sessions_Insert_Input;
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Simple_InboxArgs = {
  objects: Array<Simple_Inbox_Insert_Input>;
  on_conflict?: InputMaybe<Simple_Inbox_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Simple_Inbox_OneArgs = {
  object: Simple_Inbox_Insert_Input;
  on_conflict?: InputMaybe<Simple_Inbox_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Snapshot_DiffsArgs = {
  objects: Array<Snapshot_Diffs_Insert_Input>;
  on_conflict?: InputMaybe<Snapshot_Diffs_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Snapshot_Diffs_OneArgs = {
  object: Snapshot_Diffs_Insert_Input;
  on_conflict?: InputMaybe<Snapshot_Diffs_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Test_Run_MetricsArgs = {
  objects: Array<Test_Run_Metrics_Insert_Input>;
  on_conflict?: InputMaybe<Test_Run_Metrics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Test_Run_Metrics_OneArgs = {
  object: Test_Run_Metrics_Insert_Input;
  on_conflict?: InputMaybe<Test_Run_Metrics_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Test_Run_ResultsArgs = {
  objects: Array<Test_Run_Results_Insert_Input>;
  on_conflict?: InputMaybe<Test_Run_Results_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Test_Run_Results_OneArgs = {
  object: Test_Run_Results_Insert_Input;
  on_conflict?: InputMaybe<Test_Run_Results_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Test_Run_ShardsArgs = {
  objects: Array<Test_Run_Shards_Insert_Input>;
  on_conflict?: InputMaybe<Test_Run_Shards_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Test_Run_Shards_OneArgs = {
  object: Test_Run_Shards_Insert_Input;
  on_conflict?: InputMaybe<Test_Run_Shards_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Test_Run_Test_RecordingsArgs = {
  objects: Array<Test_Run_Test_Recordings_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Test_Run_Test_Recordings_OneArgs = {
  object: Test_Run_Test_Recordings_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Test_Run_TestsArgs = {
  objects: Array<Test_Run_Tests_Insert_Input>;
  on_conflict?: InputMaybe<Test_Run_Tests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Test_Run_Tests_OneArgs = {
  object: Test_Run_Tests_Insert_Input;
  on_conflict?: InputMaybe<Test_Run_Tests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Test_RunsArgs = {
  objects: Array<Test_Runs_Insert_Input>;
  on_conflict?: InputMaybe<Test_Runs_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Test_Runs_NewArgs = {
  objects: Array<Test_Runs_New_Insert_Input>;
  on_conflict?: InputMaybe<Test_Runs_New_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Test_Runs_New_OneArgs = {
  object: Test_Runs_New_Insert_Input;
  on_conflict?: InputMaybe<Test_Runs_New_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Test_Runs_OneArgs = {
  object: Test_Runs_Insert_Input;
  on_conflict?: InputMaybe<Test_Runs_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_IdsArgs = {
  objects: Array<User_Ids_Insert_Input>;
  on_conflict?: InputMaybe<User_Ids_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Ids_OneArgs = {
  object: User_Ids_Insert_Input;
  on_conflict?: InputMaybe<User_Ids_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_SettingsArgs = {
  objects: Array<User_Settings_Insert_Input>;
  on_conflict?: InputMaybe<User_Settings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Settings_OneArgs = {
  object: User_Settings_Insert_Input;
  on_conflict?: InputMaybe<User_Settings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_TosArgs = {
  objects: Array<User_Tos_Insert_Input>;
  on_conflict?: InputMaybe<User_Tos_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Tos_OneArgs = {
  object: User_Tos_Insert_Input;
  on_conflict?: InputMaybe<User_Tos_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Workspace_SourcemapsArgs = {
  objects: Array<Workspace_Sourcemaps_Insert_Input>;
  on_conflict?: InputMaybe<Workspace_Sourcemaps_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Workspace_Sourcemaps_OneArgs = {
  object: Workspace_Sourcemaps_Insert_Input;
  on_conflict?: InputMaybe<Workspace_Sourcemaps_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Workspace_TestsArgs = {
  objects: Array<Workspace_Tests_Insert_Input>;
  on_conflict?: InputMaybe<Workspace_Tests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Workspace_Tests_OneArgs = {
  object: Workspace_Tests_Insert_Input;
  on_conflict?: InputMaybe<Workspace_Tests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WorkspacesArgs = {
  objects: Array<Workspaces_Insert_Input>;
  on_conflict?: InputMaybe<Workspaces_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Workspaces_OneArgs = {
  object: Workspaces_Insert_Input;
  on_conflict?: InputMaybe<Workspaces_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Workspaces_SubscriptionArgs = {
  objects: Array<Workspaces_Subscription_Insert_Input>;
  on_conflict?: InputMaybe<Workspaces_Subscription_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Workspaces_Subscription_OneArgs = {
  object: Workspaces_Subscription_Insert_Input;
  on_conflict?: InputMaybe<Workspaces_Subscription_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Workspaces_UserArgs = {
  objects: Array<Workspaces_User_Insert_Input>;
  on_conflict?: InputMaybe<Workspaces_User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Workspaces_User_OneArgs = {
  object: Workspaces_User_Insert_Input;
  on_conflict?: InputMaybe<Workspaces_User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootMaybeAcceptWorkspaceMembershipForRecordingArgs = {
  input: MaybeAcceptWorkspaceMembershipForRecordingInput;
};


/** mutation root */
export type Mutation_RootMaybeMarkRecordingViewedArgs = {
  input: MaybeMarkRecordingViewedInput;
};


/** mutation root */
export type Mutation_RootPrepareWorkspacePaymentMethodArgs = {
  input: PrepareWorkspacePaymentMethodInput;
};


/** mutation root */
export type Mutation_RootRejectWorkspaceMembershipArgs = {
  input: RejectWorkspaceMembershipInput;
};


/** mutation root */
export type Mutation_RootRemoveRecordingCollaboratorArgs = {
  input: RemoveRecordingCollaboratorInput;
};


/** mutation root */
export type Mutation_RootRemoveWorkspaceMemberArgs = {
  input: RemoveWorkspaceMemberInput;
};


/** mutation root */
export type Mutation_RootRequestRecordingAccessArgs = {
  input: RequestRecordingAccessInput;
};


/** mutation root */
export type Mutation_RootResetTestUserArgs = {
  input: ResetTestUserInput;
};


/** mutation root */
export type Mutation_RootSendUserInvitationArgs = {
  input: SendUserInvitationInput;
};


/** mutation root */
export type Mutation_RootSetRecordingMetadataArgs = {
  input: SetRecordingMetadataInput;
};


/** mutation root */
export type Mutation_RootSetWorkspaceDefaultPaymentMethodArgs = {
  input: SetWorkspaceDefaultPaymentMethodInput;
};


/** mutation root */
export type Mutation_RootStartTestRunShardArgs = {
  input: StartTestRunShardInput;
};


/** mutation root */
export type Mutation_RootSubscribeToEmailTypeArgs = {
  input: SubscribeToEmailTypeInput;
};


/** mutation root */
export type Mutation_RootUnsubscribeToEmailTypeArgs = {
  input: UnsubscribeToEmailTypeInput;
};


/** mutation root */
export type Mutation_RootUpdateCommentArgs = {
  input: UpdateCommentInput;
};


/** mutation root */
export type Mutation_RootUpdateCommentReplyArgs = {
  input: UpdateCommentReplyInput;
};


/** mutation root */
export type Mutation_RootUpdatePointArgs = {
  input: UpdatePointInput;
};


/** mutation root */
export type Mutation_RootUpdateRecordingPrivacyArgs = {
  input: UpdateRecordingPrivacyInput;
};


/** mutation root */
export type Mutation_RootUpdateRecordingResolutionArgs = {
  input: UpdateRecordingResolutionInput;
};


/** mutation root */
export type Mutation_RootUpdateRecordingTitleArgs = {
  input: UpdateRecordingTitleInput;
};


/** mutation root */
export type Mutation_RootUpdateRecordingWorkspaceArgs = {
  input: UpdateRecordingWorkspaceInput;
};


/** mutation root */
export type Mutation_RootUpdateSubscriptionStatusArgs = {
  input: UpdateSubscriptionStatusInput;
};


/** mutation root */
export type Mutation_RootUpdateUserDefaultWorkspaceArgs = {
  input: UpdateUserDefaultWorkspaceInput;
};


/** mutation root */
export type Mutation_RootUpdateUserPreferencesArgs = {
  input: UpdateUserPreferencesInput;
};


/** mutation root */
export type Mutation_RootUpdateUserSettingsArgs = {
  input: UpdateUserSettingsInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkspaceCodeDomainLimitationsArgs = {
  input: UpdateWorkspaceCodeDomainLimitationsInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkspaceLogoArgs = {
  input: UpdateWorkspaceLogoInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkspaceMemberRoleArgs = {
  input: UpdateWorkspaceMemberRoleInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkspaceSettingsArgs = {
  input: UpdateWorkspaceSettingsInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkspaceSubscriptionStatusArgs = {
  input: UpdateWorkspaceSubscriptionStatusInput;
};


/** mutation root */
export type Mutation_RootUpdate_Api_KeysArgs = {
  _append?: InputMaybe<Api_Keys_Append_Input>;
  _delete_at_path?: InputMaybe<Api_Keys_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Api_Keys_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Api_Keys_Delete_Key_Input>;
  _inc?: InputMaybe<Api_Keys_Inc_Input>;
  _prepend?: InputMaybe<Api_Keys_Prepend_Input>;
  _set?: InputMaybe<Api_Keys_Set_Input>;
  where: Api_Keys_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Api_Keys_By_PkArgs = {
  _append?: InputMaybe<Api_Keys_Append_Input>;
  _delete_at_path?: InputMaybe<Api_Keys_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Api_Keys_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Api_Keys_Delete_Key_Input>;
  _inc?: InputMaybe<Api_Keys_Inc_Input>;
  _prepend?: InputMaybe<Api_Keys_Prepend_Input>;
  _set?: InputMaybe<Api_Keys_Set_Input>;
  pk_columns: Api_Keys_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Auth_RequestsArgs = {
  _set?: InputMaybe<Auth_Requests_Set_Input>;
  where: Auth_Requests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Auth_Requests_By_PkArgs = {
  _set?: InputMaybe<Auth_Requests_Set_Input>;
  pk_columns: Auth_Requests_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Base_SnapshotsArgs = {
  _inc?: InputMaybe<Base_Snapshots_Inc_Input>;
  _set?: InputMaybe<Base_Snapshots_Set_Input>;
  where: Base_Snapshots_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Base_Snapshots_By_PkArgs = {
  _inc?: InputMaybe<Base_Snapshots_Inc_Input>;
  _set?: InputMaybe<Base_Snapshots_Set_Input>;
  pk_columns: Base_Snapshots_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Cache_Warming_ResultsArgs = {
  _append?: InputMaybe<Cache_Warming_Results_Append_Input>;
  _delete_at_path?: InputMaybe<Cache_Warming_Results_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Cache_Warming_Results_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Cache_Warming_Results_Delete_Key_Input>;
  _prepend?: InputMaybe<Cache_Warming_Results_Prepend_Input>;
  _set?: InputMaybe<Cache_Warming_Results_Set_Input>;
  where: Cache_Warming_Results_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Cache_Warming_Results_By_PkArgs = {
  _append?: InputMaybe<Cache_Warming_Results_Append_Input>;
  _delete_at_path?: InputMaybe<Cache_Warming_Results_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Cache_Warming_Results_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Cache_Warming_Results_Delete_Key_Input>;
  _prepend?: InputMaybe<Cache_Warming_Results_Prepend_Input>;
  _set?: InputMaybe<Cache_Warming_Results_Set_Input>;
  pk_columns: Cache_Warming_Results_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Collaborator_RequestsArgs = {
  _set?: InputMaybe<Collaborator_Requests_Set_Input>;
  where: Collaborator_Requests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Collaborator_Requests_By_PkArgs = {
  _set?: InputMaybe<Collaborator_Requests_Set_Input>;
  pk_columns: Collaborator_Requests_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CollaboratorsArgs = {
  _set?: InputMaybe<Collaborators_Set_Input>;
  where: Collaborators_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Collaborators_By_PkArgs = {
  _set?: InputMaybe<Collaborators_Set_Input>;
  pk_columns: Collaborators_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CommentsArgs = {
  _append?: InputMaybe<Comments_Append_Input>;
  _delete_at_path?: InputMaybe<Comments_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Comments_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Comments_Delete_Key_Input>;
  _inc?: InputMaybe<Comments_Inc_Input>;
  _prepend?: InputMaybe<Comments_Prepend_Input>;
  _set?: InputMaybe<Comments_Set_Input>;
  where: Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Comments_By_PkArgs = {
  _append?: InputMaybe<Comments_Append_Input>;
  _delete_at_path?: InputMaybe<Comments_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Comments_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Comments_Delete_Key_Input>;
  _inc?: InputMaybe<Comments_Inc_Input>;
  _prepend?: InputMaybe<Comments_Prepend_Input>;
  _set?: InputMaybe<Comments_Set_Input>;
  pk_columns: Comments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ControllersArgs = {
  _append?: InputMaybe<Controllers_Append_Input>;
  _delete_at_path?: InputMaybe<Controllers_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Controllers_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Controllers_Delete_Key_Input>;
  _prepend?: InputMaybe<Controllers_Prepend_Input>;
  _set?: InputMaybe<Controllers_Set_Input>;
  where: Controllers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Controllers_By_PkArgs = {
  _append?: InputMaybe<Controllers_Append_Input>;
  _delete_at_path?: InputMaybe<Controllers_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Controllers_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Controllers_Delete_Key_Input>;
  _prepend?: InputMaybe<Controllers_Prepend_Input>;
  _set?: InputMaybe<Controllers_Set_Input>;
  pk_columns: Controllers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Dojo_SessionsArgs = {
  _append?: InputMaybe<Dojo_Sessions_Append_Input>;
  _delete_at_path?: InputMaybe<Dojo_Sessions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Dojo_Sessions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Dojo_Sessions_Delete_Key_Input>;
  _prepend?: InputMaybe<Dojo_Sessions_Prepend_Input>;
  _set?: InputMaybe<Dojo_Sessions_Set_Input>;
  where: Dojo_Sessions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Dojo_Sessions_By_PkArgs = {
  _append?: InputMaybe<Dojo_Sessions_Append_Input>;
  _delete_at_path?: InputMaybe<Dojo_Sessions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Dojo_Sessions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Dojo_Sessions_Delete_Key_Input>;
  _prepend?: InputMaybe<Dojo_Sessions_Prepend_Input>;
  _set?: InputMaybe<Dojo_Sessions_Set_Input>;
  pk_columns: Dojo_Sessions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Experimental_Crash_Reports_FiltersArgs = {
  _inc?: InputMaybe<Experimental_Crash_Reports_Filters_Inc_Input>;
  _set?: InputMaybe<Experimental_Crash_Reports_Filters_Set_Input>;
  where: Experimental_Crash_Reports_Filters_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Experimental_Crash_Reports_Filters_By_PkArgs = {
  _inc?: InputMaybe<Experimental_Crash_Reports_Filters_Inc_Input>;
  _set?: InputMaybe<Experimental_Crash_Reports_Filters_Set_Input>;
  pk_columns: Experimental_Crash_Reports_Filters_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_FiltersArgs = {
  _append?: InputMaybe<Filters_Append_Input>;
  _delete_at_path?: InputMaybe<Filters_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Filters_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Filters_Delete_Key_Input>;
  _inc?: InputMaybe<Filters_Inc_Input>;
  _prepend?: InputMaybe<Filters_Prepend_Input>;
  _set?: InputMaybe<Filters_Set_Input>;
  where: Filters_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Filters_By_PkArgs = {
  _append?: InputMaybe<Filters_Append_Input>;
  _delete_at_path?: InputMaybe<Filters_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Filters_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Filters_Delete_Key_Input>;
  _inc?: InputMaybe<Filters_Inc_Input>;
  _prepend?: InputMaybe<Filters_Prepend_Input>;
  _set?: InputMaybe<Filters_Set_Input>;
  pk_columns: Filters_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_InvitationsArgs = {
  _set?: InputMaybe<Invitations_Set_Input>;
  where: Invitations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Invitations_By_PkArgs = {
  _set?: InputMaybe<Invitations_Set_Input>;
  pk_columns: Invitations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_OrganizationsArgs = {
  _append?: InputMaybe<Organizations_Append_Input>;
  _delete_at_path?: InputMaybe<Organizations_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Organizations_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Organizations_Delete_Key_Input>;
  _prepend?: InputMaybe<Organizations_Prepend_Input>;
  _set?: InputMaybe<Organizations_Set_Input>;
  where: Organizations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Organizations_By_PkArgs = {
  _append?: InputMaybe<Organizations_Append_Input>;
  _delete_at_path?: InputMaybe<Organizations_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Organizations_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Organizations_Delete_Key_Input>;
  _prepend?: InputMaybe<Organizations_Prepend_Input>;
  _set?: InputMaybe<Organizations_Set_Input>;
  pk_columns: Organizations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PlansArgs = {
  _inc?: InputMaybe<Plans_Inc_Input>;
  _set?: InputMaybe<Plans_Set_Input>;
  where: Plans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Plans_By_PkArgs = {
  _inc?: InputMaybe<Plans_Inc_Input>;
  _set?: InputMaybe<Plans_Set_Input>;
  pk_columns: Plans_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Processing_Task_StateArgs = {
  _inc?: InputMaybe<Processing_Task_State_Inc_Input>;
  _set?: InputMaybe<Processing_Task_State_Set_Input>;
  where: Processing_Task_State_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Processing_Task_State_By_PkArgs = {
  _inc?: InputMaybe<Processing_Task_State_Inc_Input>;
  _set?: InputMaybe<Processing_Task_State_Set_Input>;
  pk_columns: Processing_Task_State_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recording_AssetsArgs = {
  _inc?: InputMaybe<Recording_Assets_Inc_Input>;
  _set?: InputMaybe<Recording_Assets_Set_Input>;
  where: Recording_Assets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recording_Assets_By_PkArgs = {
  _inc?: InputMaybe<Recording_Assets_Inc_Input>;
  _set?: InputMaybe<Recording_Assets_Set_Input>;
  pk_columns: Recording_Assets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recording_CheckpointsArgs = {
  _inc?: InputMaybe<Recording_Checkpoints_Inc_Input>;
  _set?: InputMaybe<Recording_Checkpoints_Set_Input>;
  where: Recording_Checkpoints_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recording_Checkpoints_By_PkArgs = {
  _inc?: InputMaybe<Recording_Checkpoints_Inc_Input>;
  _set?: InputMaybe<Recording_Checkpoints_Set_Input>;
  pk_columns: Recording_Checkpoints_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recording_OriginalsourcesArgs = {
  _inc?: InputMaybe<Recording_Originalsources_Inc_Input>;
  _set?: InputMaybe<Recording_Originalsources_Set_Input>;
  where: Recording_Originalsources_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recording_Originalsources_By_PkArgs = {
  _inc?: InputMaybe<Recording_Originalsources_Inc_Input>;
  _set?: InputMaybe<Recording_Originalsources_Set_Input>;
  pk_columns: Recording_Originalsources_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recording_PointsArgs = {
  _append?: InputMaybe<Recording_Points_Append_Input>;
  _delete_at_path?: InputMaybe<Recording_Points_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Recording_Points_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Recording_Points_Delete_Key_Input>;
  _prepend?: InputMaybe<Recording_Points_Prepend_Input>;
  _set?: InputMaybe<Recording_Points_Set_Input>;
  where: Recording_Points_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recording_Points_By_PkArgs = {
  _append?: InputMaybe<Recording_Points_Append_Input>;
  _delete_at_path?: InputMaybe<Recording_Points_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Recording_Points_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Recording_Points_Delete_Key_Input>;
  _prepend?: InputMaybe<Recording_Points_Prepend_Input>;
  _set?: InputMaybe<Recording_Points_Set_Input>;
  pk_columns: Recording_Points_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recording_RegionsArgs = {
  _inc?: InputMaybe<Recording_Regions_Inc_Input>;
  _set?: InputMaybe<Recording_Regions_Set_Input>;
  where: Recording_Regions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recording_Regions_By_PkArgs = {
  _inc?: InputMaybe<Recording_Regions_Inc_Input>;
  _set?: InputMaybe<Recording_Regions_Set_Input>;
  pk_columns: Recording_Regions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recording_SourcemapsArgs = {
  _set?: InputMaybe<Recording_Sourcemaps_Set_Input>;
  where: Recording_Sourcemaps_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recording_Sourcemaps_By_PkArgs = {
  _set?: InputMaybe<Recording_Sourcemaps_Set_Input>;
  pk_columns: Recording_Sourcemaps_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_RecordingsArgs = {
  _append?: InputMaybe<Recordings_Append_Input>;
  _delete_at_path?: InputMaybe<Recordings_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Recordings_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Recordings_Delete_Key_Input>;
  _inc?: InputMaybe<Recordings_Inc_Input>;
  _prepend?: InputMaybe<Recordings_Prepend_Input>;
  _set?: InputMaybe<Recordings_Set_Input>;
  where: Recordings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recordings_By_PkArgs = {
  _append?: InputMaybe<Recordings_Append_Input>;
  _delete_at_path?: InputMaybe<Recordings_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Recordings_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Recordings_Delete_Key_Input>;
  _inc?: InputMaybe<Recordings_Inc_Input>;
  _prepend?: InputMaybe<Recordings_Prepend_Input>;
  _set?: InputMaybe<Recordings_Set_Input>;
  pk_columns: Recordings_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Release_Build_FilesArgs = {
  _set?: InputMaybe<Release_Build_Files_Set_Input>;
  where: Release_Build_Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Release_Build_Files_By_PkArgs = {
  _set?: InputMaybe<Release_Build_Files_Set_Input>;
  pk_columns: Release_Build_Files_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ReleasesArgs = {
  _set?: InputMaybe<Releases_Set_Input>;
  where: Releases_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Releases_By_PkArgs = {
  _set?: InputMaybe<Releases_Set_Input>;
  pk_columns: Releases_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Root_Cause_Analysis_ResultsArgs = {
  _append?: InputMaybe<Root_Cause_Analysis_Results_Append_Input>;
  _delete_at_path?: InputMaybe<Root_Cause_Analysis_Results_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Root_Cause_Analysis_Results_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Root_Cause_Analysis_Results_Delete_Key_Input>;
  _inc?: InputMaybe<Root_Cause_Analysis_Results_Inc_Input>;
  _prepend?: InputMaybe<Root_Cause_Analysis_Results_Prepend_Input>;
  _set?: InputMaybe<Root_Cause_Analysis_Results_Set_Input>;
  where: Root_Cause_Analysis_Results_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Root_Cause_Analysis_Results_By_PkArgs = {
  _append?: InputMaybe<Root_Cause_Analysis_Results_Append_Input>;
  _delete_at_path?: InputMaybe<Root_Cause_Analysis_Results_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Root_Cause_Analysis_Results_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Root_Cause_Analysis_Results_Delete_Key_Input>;
  _inc?: InputMaybe<Root_Cause_Analysis_Results_Inc_Input>;
  _prepend?: InputMaybe<Root_Cause_Analysis_Results_Prepend_Input>;
  _set?: InputMaybe<Root_Cause_Analysis_Results_Set_Input>;
  pk_columns: Root_Cause_Analysis_Results_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Runtime_Crash_Report_SessionsArgs = {
  _set?: InputMaybe<Runtime_Crash_Report_Sessions_Set_Input>;
  where: Runtime_Crash_Report_Sessions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Runtime_Crash_Report_Sessions_By_PkArgs = {
  _set?: InputMaybe<Runtime_Crash_Report_Sessions_Set_Input>;
  pk_columns: Runtime_Crash_Report_Sessions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Runtime_Crash_ReportsArgs = {
  _append?: InputMaybe<Runtime_Crash_Reports_Append_Input>;
  _delete_at_path?: InputMaybe<Runtime_Crash_Reports_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Runtime_Crash_Reports_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Runtime_Crash_Reports_Delete_Key_Input>;
  _prepend?: InputMaybe<Runtime_Crash_Reports_Prepend_Input>;
  _set?: InputMaybe<Runtime_Crash_Reports_Set_Input>;
  where: Runtime_Crash_Reports_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Runtime_Crash_Reports_By_PkArgs = {
  _append?: InputMaybe<Runtime_Crash_Reports_Append_Input>;
  _delete_at_path?: InputMaybe<Runtime_Crash_Reports_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Runtime_Crash_Reports_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Runtime_Crash_Reports_Delete_Key_Input>;
  _prepend?: InputMaybe<Runtime_Crash_Reports_Prepend_Input>;
  _set?: InputMaybe<Runtime_Crash_Reports_Set_Input>;
  pk_columns: Runtime_Crash_Reports_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_SessionsArgs = {
  _append?: InputMaybe<Sessions_Append_Input>;
  _delete_at_path?: InputMaybe<Sessions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Sessions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Sessions_Delete_Key_Input>;
  _inc?: InputMaybe<Sessions_Inc_Input>;
  _prepend?: InputMaybe<Sessions_Prepend_Input>;
  _set?: InputMaybe<Sessions_Set_Input>;
  where: Sessions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Sessions_By_PkArgs = {
  _append?: InputMaybe<Sessions_Append_Input>;
  _delete_at_path?: InputMaybe<Sessions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Sessions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Sessions_Delete_Key_Input>;
  _inc?: InputMaybe<Sessions_Inc_Input>;
  _prepend?: InputMaybe<Sessions_Prepend_Input>;
  _set?: InputMaybe<Sessions_Set_Input>;
  pk_columns: Sessions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Simple_InboxArgs = {
  _inc?: InputMaybe<Simple_Inbox_Inc_Input>;
  _set?: InputMaybe<Simple_Inbox_Set_Input>;
  where: Simple_Inbox_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Simple_Inbox_By_PkArgs = {
  _inc?: InputMaybe<Simple_Inbox_Inc_Input>;
  _set?: InputMaybe<Simple_Inbox_Set_Input>;
  pk_columns: Simple_Inbox_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Snapshot_DiffsArgs = {
  _inc?: InputMaybe<Snapshot_Diffs_Inc_Input>;
  _set?: InputMaybe<Snapshot_Diffs_Set_Input>;
  where: Snapshot_Diffs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Snapshot_Diffs_By_PkArgs = {
  _inc?: InputMaybe<Snapshot_Diffs_Inc_Input>;
  _set?: InputMaybe<Snapshot_Diffs_Set_Input>;
  pk_columns: Snapshot_Diffs_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Test_Run_MetricsArgs = {
  _append?: InputMaybe<Test_Run_Metrics_Append_Input>;
  _delete_at_path?: InputMaybe<Test_Run_Metrics_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Test_Run_Metrics_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Test_Run_Metrics_Delete_Key_Input>;
  _inc?: InputMaybe<Test_Run_Metrics_Inc_Input>;
  _prepend?: InputMaybe<Test_Run_Metrics_Prepend_Input>;
  _set?: InputMaybe<Test_Run_Metrics_Set_Input>;
  where: Test_Run_Metrics_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Test_Run_Metrics_By_PkArgs = {
  _append?: InputMaybe<Test_Run_Metrics_Append_Input>;
  _delete_at_path?: InputMaybe<Test_Run_Metrics_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Test_Run_Metrics_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Test_Run_Metrics_Delete_Key_Input>;
  _inc?: InputMaybe<Test_Run_Metrics_Inc_Input>;
  _prepend?: InputMaybe<Test_Run_Metrics_Prepend_Input>;
  _set?: InputMaybe<Test_Run_Metrics_Set_Input>;
  pk_columns: Test_Run_Metrics_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Test_Run_ResultsArgs = {
  _set?: InputMaybe<Test_Run_Results_Set_Input>;
  where: Test_Run_Results_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Test_Run_Results_By_PkArgs = {
  _set?: InputMaybe<Test_Run_Results_Set_Input>;
  pk_columns: Test_Run_Results_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Test_Run_ShardsArgs = {
  _set?: InputMaybe<Test_Run_Shards_Set_Input>;
  where: Test_Run_Shards_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Test_Run_Shards_By_PkArgs = {
  _set?: InputMaybe<Test_Run_Shards_Set_Input>;
  pk_columns: Test_Run_Shards_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Test_Run_Test_RecordingsArgs = {
  _set?: InputMaybe<Test_Run_Test_Recordings_Set_Input>;
  where: Test_Run_Test_Recordings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Test_Run_TestsArgs = {
  _append?: InputMaybe<Test_Run_Tests_Append_Input>;
  _delete_at_path?: InputMaybe<Test_Run_Tests_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Test_Run_Tests_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Test_Run_Tests_Delete_Key_Input>;
  _inc?: InputMaybe<Test_Run_Tests_Inc_Input>;
  _prepend?: InputMaybe<Test_Run_Tests_Prepend_Input>;
  _set?: InputMaybe<Test_Run_Tests_Set_Input>;
  where: Test_Run_Tests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Test_Run_Tests_By_PkArgs = {
  _append?: InputMaybe<Test_Run_Tests_Append_Input>;
  _delete_at_path?: InputMaybe<Test_Run_Tests_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Test_Run_Tests_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Test_Run_Tests_Delete_Key_Input>;
  _inc?: InputMaybe<Test_Run_Tests_Inc_Input>;
  _prepend?: InputMaybe<Test_Run_Tests_Prepend_Input>;
  _set?: InputMaybe<Test_Run_Tests_Set_Input>;
  pk_columns: Test_Run_Tests_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Test_RunsArgs = {
  _append?: InputMaybe<Test_Runs_Append_Input>;
  _delete_at_path?: InputMaybe<Test_Runs_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Test_Runs_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Test_Runs_Delete_Key_Input>;
  _inc?: InputMaybe<Test_Runs_Inc_Input>;
  _prepend?: InputMaybe<Test_Runs_Prepend_Input>;
  _set?: InputMaybe<Test_Runs_Set_Input>;
  where: Test_Runs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Test_Runs_By_PkArgs = {
  _append?: InputMaybe<Test_Runs_Append_Input>;
  _delete_at_path?: InputMaybe<Test_Runs_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Test_Runs_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Test_Runs_Delete_Key_Input>;
  _inc?: InputMaybe<Test_Runs_Inc_Input>;
  _prepend?: InputMaybe<Test_Runs_Prepend_Input>;
  _set?: InputMaybe<Test_Runs_Set_Input>;
  pk_columns: Test_Runs_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Test_Runs_NewArgs = {
  _inc?: InputMaybe<Test_Runs_New_Inc_Input>;
  _set?: InputMaybe<Test_Runs_New_Set_Input>;
  where: Test_Runs_New_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Test_Runs_New_By_PkArgs = {
  _inc?: InputMaybe<Test_Runs_New_Inc_Input>;
  _set?: InputMaybe<Test_Runs_New_Set_Input>;
  pk_columns: Test_Runs_New_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_IdsArgs = {
  _set?: InputMaybe<User_Ids_Set_Input>;
  where: User_Ids_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Ids_By_PkArgs = {
  _set?: InputMaybe<User_Ids_Set_Input>;
  pk_columns: User_Ids_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_SettingsArgs = {
  _set?: InputMaybe<User_Settings_Set_Input>;
  where: User_Settings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Settings_By_PkArgs = {
  _set?: InputMaybe<User_Settings_Set_Input>;
  pk_columns: User_Settings_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_TosArgs = {
  _inc?: InputMaybe<User_Tos_Inc_Input>;
  _set?: InputMaybe<User_Tos_Set_Input>;
  where: User_Tos_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Tos_By_PkArgs = {
  _inc?: InputMaybe<User_Tos_Inc_Input>;
  _set?: InputMaybe<User_Tos_Set_Input>;
  pk_columns: User_Tos_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _append?: InputMaybe<Users_Append_Input>;
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  _inc?: InputMaybe<Users_Inc_Input>;
  _prepend?: InputMaybe<Users_Prepend_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _append?: InputMaybe<Users_Append_Input>;
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  _inc?: InputMaybe<Users_Inc_Input>;
  _prepend?: InputMaybe<Users_Prepend_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Workspace_SourcemapsArgs = {
  _set?: InputMaybe<Workspace_Sourcemaps_Set_Input>;
  where: Workspace_Sourcemaps_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Workspace_Sourcemaps_By_PkArgs = {
  _set?: InputMaybe<Workspace_Sourcemaps_Set_Input>;
  pk_columns: Workspace_Sourcemaps_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Workspace_TestsArgs = {
  _append?: InputMaybe<Workspace_Tests_Append_Input>;
  _delete_at_path?: InputMaybe<Workspace_Tests_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Workspace_Tests_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Workspace_Tests_Delete_Key_Input>;
  _prepend?: InputMaybe<Workspace_Tests_Prepend_Input>;
  _set?: InputMaybe<Workspace_Tests_Set_Input>;
  where: Workspace_Tests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Workspace_Tests_By_PkArgs = {
  _append?: InputMaybe<Workspace_Tests_Append_Input>;
  _delete_at_path?: InputMaybe<Workspace_Tests_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Workspace_Tests_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Workspace_Tests_Delete_Key_Input>;
  _prepend?: InputMaybe<Workspace_Tests_Prepend_Input>;
  _set?: InputMaybe<Workspace_Tests_Set_Input>;
  pk_columns: Workspace_Tests_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_WorkspacesArgs = {
  _append?: InputMaybe<Workspaces_Append_Input>;
  _delete_at_path?: InputMaybe<Workspaces_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Workspaces_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Workspaces_Delete_Key_Input>;
  _inc?: InputMaybe<Workspaces_Inc_Input>;
  _prepend?: InputMaybe<Workspaces_Prepend_Input>;
  _set?: InputMaybe<Workspaces_Set_Input>;
  where: Workspaces_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Workspaces_By_PkArgs = {
  _append?: InputMaybe<Workspaces_Append_Input>;
  _delete_at_path?: InputMaybe<Workspaces_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Workspaces_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Workspaces_Delete_Key_Input>;
  _inc?: InputMaybe<Workspaces_Inc_Input>;
  _prepend?: InputMaybe<Workspaces_Prepend_Input>;
  _set?: InputMaybe<Workspaces_Set_Input>;
  pk_columns: Workspaces_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Workspaces_SubscriptionArgs = {
  _inc?: InputMaybe<Workspaces_Subscription_Inc_Input>;
  _set?: InputMaybe<Workspaces_Subscription_Set_Input>;
  where: Workspaces_Subscription_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Workspaces_Subscription_By_PkArgs = {
  _inc?: InputMaybe<Workspaces_Subscription_Inc_Input>;
  _set?: InputMaybe<Workspaces_Subscription_Set_Input>;
  pk_columns: Workspaces_Subscription_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Workspaces_UserArgs = {
  _inc?: InputMaybe<Workspaces_User_Inc_Input>;
  _set?: InputMaybe<Workspaces_User_Set_Input>;
  where: Workspaces_User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Workspaces_User_By_PkArgs = {
  _inc?: InputMaybe<Workspaces_User_Inc_Input>;
  _set?: InputMaybe<Workspaces_User_Set_Input>;
  pk_columns: Workspaces_User_Pk_Columns_Input;
};

/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "organizations" */
export type Organizations = {
  __typename?: 'organizations';
  billing_id?: Maybe<Scalars['String']['output']>;
  bucket?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  domains: Scalars['jsonb']['output'];
  features: Scalars['jsonb']['output'];
  has_payment_method: Scalars['Boolean']['output'];
  id: Scalars['uuid']['output'];
  identity_providers?: Maybe<Scalars['jsonb']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  logo_format?: Maybe<Scalars['String']['output']>;
  motd?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** An array relationship */
  subs: Array<Workspaces_Subscription>;
  /** An aggregated array relationship */
  subs_aggregate: Workspaces_Subscription_Aggregate;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
  /** An array relationship */
  workspaces: Array<Workspaces>;
  /** An aggregated array relationship */
  workspaces_aggregate: Workspaces_Aggregate;
};


/** columns and relationships of "organizations" */
export type OrganizationsDomainsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "organizations" */
export type OrganizationsFeaturesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "organizations" */
export type OrganizationsIdentity_ProvidersArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "organizations" */
export type OrganizationsSubsArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Subscription_Order_By>>;
  where?: InputMaybe<Workspaces_Subscription_Bool_Exp>;
};


/** columns and relationships of "organizations" */
export type OrganizationsSubs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Subscription_Order_By>>;
  where?: InputMaybe<Workspaces_Subscription_Bool_Exp>;
};


/** columns and relationships of "organizations" */
export type OrganizationsWorkspacesArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Order_By>>;
  where?: InputMaybe<Workspaces_Bool_Exp>;
};


/** columns and relationships of "organizations" */
export type OrganizationsWorkspaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Order_By>>;
  where?: InputMaybe<Workspaces_Bool_Exp>;
};

/** aggregated selection of "organizations" */
export type Organizations_Aggregate = {
  __typename?: 'organizations_aggregate';
  aggregate?: Maybe<Organizations_Aggregate_Fields>;
  nodes: Array<Organizations>;
};

/** aggregate fields of "organizations" */
export type Organizations_Aggregate_Fields = {
  __typename?: 'organizations_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Organizations_Max_Fields>;
  min?: Maybe<Organizations_Min_Fields>;
};


/** aggregate fields of "organizations" */
export type Organizations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Organizations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "organizations" */
export type Organizations_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Organizations_Max_Order_By>;
  min?: InputMaybe<Organizations_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Organizations_Append_Input = {
  domains?: InputMaybe<Scalars['jsonb']['input']>;
  features?: InputMaybe<Scalars['jsonb']['input']>;
  identity_providers?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "organizations" */
export type Organizations_Arr_Rel_Insert_Input = {
  data: Array<Organizations_Insert_Input>;
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
};

/** Boolean expression to filter rows from the table "organizations". All fields are combined with a logical 'AND'. */
export type Organizations_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Organizations_Bool_Exp>>>;
  _not?: InputMaybe<Organizations_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Organizations_Bool_Exp>>>;
  billing_id?: InputMaybe<String_Comparison_Exp>;
  bucket?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  domains?: InputMaybe<Jsonb_Comparison_Exp>;
  features?: InputMaybe<Jsonb_Comparison_Exp>;
  has_payment_method?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  identity_providers?: InputMaybe<Jsonb_Comparison_Exp>;
  logo?: InputMaybe<String_Comparison_Exp>;
  logo_format?: InputMaybe<String_Comparison_Exp>;
  motd?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  subs?: InputMaybe<Workspaces_Subscription_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  workspaces?: InputMaybe<Workspaces_Bool_Exp>;
};

/** unique or primary key constraints on table "organizations" */
export enum Organizations_Constraint {
  /** unique or primary key constraint */
  OrganizationsPkey = 'organizations_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Organizations_Delete_At_Path_Input = {
  domains?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  features?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  identity_providers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Organizations_Delete_Elem_Input = {
  domains?: InputMaybe<Scalars['Int']['input']>;
  features?: InputMaybe<Scalars['Int']['input']>;
  identity_providers?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Organizations_Delete_Key_Input = {
  domains?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Scalars['String']['input']>;
  identity_providers?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "organizations" */
export type Organizations_Insert_Input = {
  billing_id?: InputMaybe<Scalars['String']['input']>;
  bucket?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  domains?: InputMaybe<Scalars['jsonb']['input']>;
  features?: InputMaybe<Scalars['jsonb']['input']>;
  has_payment_method?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  identity_providers?: InputMaybe<Scalars['jsonb']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  logo_format?: InputMaybe<Scalars['String']['input']>;
  motd?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  subs?: InputMaybe<Workspaces_Subscription_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workspaces?: InputMaybe<Workspaces_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Organizations_Max_Fields = {
  __typename?: 'organizations_max_fields';
  billing_id?: Maybe<Scalars['String']['output']>;
  bucket?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  logo_format?: Maybe<Scalars['String']['output']>;
  motd?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "organizations" */
export type Organizations_Max_Order_By = {
  billing_id?: InputMaybe<Order_By>;
  bucket?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  logo_format?: InputMaybe<Order_By>;
  motd?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Organizations_Min_Fields = {
  __typename?: 'organizations_min_fields';
  billing_id?: Maybe<Scalars['String']['output']>;
  bucket?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  logo_format?: Maybe<Scalars['String']['output']>;
  motd?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "organizations" */
export type Organizations_Min_Order_By = {
  billing_id?: InputMaybe<Order_By>;
  bucket?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  logo_format?: InputMaybe<Order_By>;
  motd?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "organizations" */
export type Organizations_Mutation_Response = {
  __typename?: 'organizations_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Organizations>;
};

/** input type for inserting object relation for remote table "organizations" */
export type Organizations_Obj_Rel_Insert_Input = {
  data: Organizations_Insert_Input;
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
};

/** on conflict condition type for table "organizations" */
export type Organizations_On_Conflict = {
  constraint: Organizations_Constraint;
  update_columns: Array<Organizations_Update_Column>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};

/** ordering options when selecting data from "organizations" */
export type Organizations_Order_By = {
  billing_id?: InputMaybe<Order_By>;
  bucket?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  domains?: InputMaybe<Order_By>;
  features?: InputMaybe<Order_By>;
  has_payment_method?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  identity_providers?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  logo_format?: InputMaybe<Order_By>;
  motd?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  subs_aggregate?: InputMaybe<Workspaces_Subscription_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  workspaces_aggregate?: InputMaybe<Workspaces_Aggregate_Order_By>;
};

/** primary key columns input for table: "organizations" */
export type Organizations_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Organizations_Prepend_Input = {
  domains?: InputMaybe<Scalars['jsonb']['input']>;
  features?: InputMaybe<Scalars['jsonb']['input']>;
  identity_providers?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "organizations" */
export enum Organizations_Select_Column {
  /** column name */
  BillingId = 'billing_id',
  /** column name */
  Bucket = 'bucket',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Domains = 'domains',
  /** column name */
  Features = 'features',
  /** column name */
  HasPaymentMethod = 'has_payment_method',
  /** column name */
  Id = 'id',
  /** column name */
  IdentityProviders = 'identity_providers',
  /** column name */
  Logo = 'logo',
  /** column name */
  LogoFormat = 'logo_format',
  /** column name */
  Motd = 'motd',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "organizations" */
export type Organizations_Set_Input = {
  billing_id?: InputMaybe<Scalars['String']['input']>;
  bucket?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  domains?: InputMaybe<Scalars['jsonb']['input']>;
  features?: InputMaybe<Scalars['jsonb']['input']>;
  has_payment_method?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  identity_providers?: InputMaybe<Scalars['jsonb']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  logo_format?: InputMaybe<Scalars['String']['input']>;
  motd?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "organizations" */
export enum Organizations_Update_Column {
  /** column name */
  BillingId = 'billing_id',
  /** column name */
  Bucket = 'bucket',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Domains = 'domains',
  /** column name */
  Features = 'features',
  /** column name */
  HasPaymentMethod = 'has_payment_method',
  /** column name */
  Id = 'id',
  /** column name */
  IdentityProviders = 'identity_providers',
  /** column name */
  Logo = 'logo',
  /** column name */
  LogoFormat = 'logo_format',
  /** column name */
  Motd = 'motd',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "plans" */
export type Plans = {
  __typename?: 'plans';
  billing_id: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  key: Scalars['String']['output'];
  max_recordings?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  trial_duration_days: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

/** aggregated selection of "plans" */
export type Plans_Aggregate = {
  __typename?: 'plans_aggregate';
  aggregate?: Maybe<Plans_Aggregate_Fields>;
  nodes: Array<Plans>;
};

/** aggregate fields of "plans" */
export type Plans_Aggregate_Fields = {
  __typename?: 'plans_aggregate_fields';
  avg?: Maybe<Plans_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Plans_Max_Fields>;
  min?: Maybe<Plans_Min_Fields>;
  stddev?: Maybe<Plans_Stddev_Fields>;
  stddev_pop?: Maybe<Plans_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Plans_Stddev_Samp_Fields>;
  sum?: Maybe<Plans_Sum_Fields>;
  var_pop?: Maybe<Plans_Var_Pop_Fields>;
  var_samp?: Maybe<Plans_Var_Samp_Fields>;
  variance?: Maybe<Plans_Variance_Fields>;
};


/** aggregate fields of "plans" */
export type Plans_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Plans_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "plans" */
export type Plans_Aggregate_Order_By = {
  avg?: InputMaybe<Plans_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Plans_Max_Order_By>;
  min?: InputMaybe<Plans_Min_Order_By>;
  stddev?: InputMaybe<Plans_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Plans_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Plans_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Plans_Sum_Order_By>;
  var_pop?: InputMaybe<Plans_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Plans_Var_Samp_Order_By>;
  variance?: InputMaybe<Plans_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "plans" */
export type Plans_Arr_Rel_Insert_Input = {
  data: Array<Plans_Insert_Input>;
  on_conflict?: InputMaybe<Plans_On_Conflict>;
};

/** aggregate avg on columns */
export type Plans_Avg_Fields = {
  __typename?: 'plans_avg_fields';
  max_recordings?: Maybe<Scalars['Float']['output']>;
  trial_duration_days?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "plans" */
export type Plans_Avg_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  trial_duration_days?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "plans". All fields are combined with a logical 'AND'. */
export type Plans_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Plans_Bool_Exp>>>;
  _not?: InputMaybe<Plans_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Plans_Bool_Exp>>>;
  billing_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  key?: InputMaybe<String_Comparison_Exp>;
  max_recordings?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  trial_duration_days?: InputMaybe<Int_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "plans" */
export enum Plans_Constraint {
  /** unique or primary key constraint */
  PlansKeyKey = 'plans_key_key',
  /** unique or primary key constraint */
  PlansPkey = 'plans_pkey'
}

/** input type for incrementing integer column in table "plans" */
export type Plans_Inc_Input = {
  max_recordings?: InputMaybe<Scalars['Int']['input']>;
  trial_duration_days?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "plans" */
export type Plans_Insert_Input = {
  billing_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  max_recordings?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  trial_duration_days?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Plans_Max_Fields = {
  __typename?: 'plans_max_fields';
  billing_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  max_recordings?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  trial_duration_days?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "plans" */
export type Plans_Max_Order_By = {
  billing_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  max_recordings?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  trial_duration_days?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Plans_Min_Fields = {
  __typename?: 'plans_min_fields';
  billing_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  max_recordings?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  trial_duration_days?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "plans" */
export type Plans_Min_Order_By = {
  billing_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  max_recordings?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  trial_duration_days?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "plans" */
export type Plans_Mutation_Response = {
  __typename?: 'plans_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Plans>;
};

/** input type for inserting object relation for remote table "plans" */
export type Plans_Obj_Rel_Insert_Input = {
  data: Plans_Insert_Input;
  on_conflict?: InputMaybe<Plans_On_Conflict>;
};

/** on conflict condition type for table "plans" */
export type Plans_On_Conflict = {
  constraint: Plans_Constraint;
  update_columns: Array<Plans_Update_Column>;
  where?: InputMaybe<Plans_Bool_Exp>;
};

/** ordering options when selecting data from "plans" */
export type Plans_Order_By = {
  billing_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  max_recordings?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  trial_duration_days?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "plans" */
export type Plans_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "plans" */
export enum Plans_Select_Column {
  /** column name */
  BillingId = 'billing_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  MaxRecordings = 'max_recordings',
  /** column name */
  Name = 'name',
  /** column name */
  TrialDurationDays = 'trial_duration_days',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "plans" */
export type Plans_Set_Input = {
  billing_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  max_recordings?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  trial_duration_days?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Plans_Stddev_Fields = {
  __typename?: 'plans_stddev_fields';
  max_recordings?: Maybe<Scalars['Float']['output']>;
  trial_duration_days?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "plans" */
export type Plans_Stddev_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  trial_duration_days?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Plans_Stddev_Pop_Fields = {
  __typename?: 'plans_stddev_pop_fields';
  max_recordings?: Maybe<Scalars['Float']['output']>;
  trial_duration_days?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "plans" */
export type Plans_Stddev_Pop_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  trial_duration_days?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Plans_Stddev_Samp_Fields = {
  __typename?: 'plans_stddev_samp_fields';
  max_recordings?: Maybe<Scalars['Float']['output']>;
  trial_duration_days?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "plans" */
export type Plans_Stddev_Samp_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  trial_duration_days?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Plans_Sum_Fields = {
  __typename?: 'plans_sum_fields';
  max_recordings?: Maybe<Scalars['Int']['output']>;
  trial_duration_days?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "plans" */
export type Plans_Sum_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  trial_duration_days?: InputMaybe<Order_By>;
};

/** update columns of table "plans" */
export enum Plans_Update_Column {
  /** column name */
  BillingId = 'billing_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  MaxRecordings = 'max_recordings',
  /** column name */
  Name = 'name',
  /** column name */
  TrialDurationDays = 'trial_duration_days',
  /** column name */
  Type = 'type'
}

/** aggregate var_pop on columns */
export type Plans_Var_Pop_Fields = {
  __typename?: 'plans_var_pop_fields';
  max_recordings?: Maybe<Scalars['Float']['output']>;
  trial_duration_days?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "plans" */
export type Plans_Var_Pop_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  trial_duration_days?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Plans_Var_Samp_Fields = {
  __typename?: 'plans_var_samp_fields';
  max_recordings?: Maybe<Scalars['Float']['output']>;
  trial_duration_days?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "plans" */
export type Plans_Var_Samp_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  trial_duration_days?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Plans_Variance_Fields = {
  __typename?: 'plans_variance_fields';
  max_recordings?: Maybe<Scalars['Float']['output']>;
  trial_duration_days?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "plans" */
export type Plans_Variance_Order_By = {
  max_recordings?: InputMaybe<Order_By>;
  trial_duration_days?: InputMaybe<Order_By>;
};

/** columns and relationships of "processing_task_state" */
export type Processing_Task_State = {
  __typename?: 'processing_task_state';
  created_at: Scalars['timestamptz']['output'];
  recording_id: Scalars['uuid']['output'];
  session_id?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

/** aggregated selection of "processing_task_state" */
export type Processing_Task_State_Aggregate = {
  __typename?: 'processing_task_state_aggregate';
  aggregate?: Maybe<Processing_Task_State_Aggregate_Fields>;
  nodes: Array<Processing_Task_State>;
};

/** aggregate fields of "processing_task_state" */
export type Processing_Task_State_Aggregate_Fields = {
  __typename?: 'processing_task_state_aggregate_fields';
  avg?: Maybe<Processing_Task_State_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Processing_Task_State_Max_Fields>;
  min?: Maybe<Processing_Task_State_Min_Fields>;
  stddev?: Maybe<Processing_Task_State_Stddev_Fields>;
  stddev_pop?: Maybe<Processing_Task_State_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Processing_Task_State_Stddev_Samp_Fields>;
  sum?: Maybe<Processing_Task_State_Sum_Fields>;
  var_pop?: Maybe<Processing_Task_State_Var_Pop_Fields>;
  var_samp?: Maybe<Processing_Task_State_Var_Samp_Fields>;
  variance?: Maybe<Processing_Task_State_Variance_Fields>;
};


/** aggregate fields of "processing_task_state" */
export type Processing_Task_State_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Processing_Task_State_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "processing_task_state" */
export type Processing_Task_State_Aggregate_Order_By = {
  avg?: InputMaybe<Processing_Task_State_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Processing_Task_State_Max_Order_By>;
  min?: InputMaybe<Processing_Task_State_Min_Order_By>;
  stddev?: InputMaybe<Processing_Task_State_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Processing_Task_State_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Processing_Task_State_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Processing_Task_State_Sum_Order_By>;
  var_pop?: InputMaybe<Processing_Task_State_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Processing_Task_State_Var_Samp_Order_By>;
  variance?: InputMaybe<Processing_Task_State_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "processing_task_state" */
export type Processing_Task_State_Arr_Rel_Insert_Input = {
  data: Array<Processing_Task_State_Insert_Input>;
  on_conflict?: InputMaybe<Processing_Task_State_On_Conflict>;
};

/** aggregate avg on columns */
export type Processing_Task_State_Avg_Fields = {
  __typename?: 'processing_task_state_avg_fields';
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "processing_task_state" */
export type Processing_Task_State_Avg_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "processing_task_state". All fields are combined with a logical 'AND'. */
export type Processing_Task_State_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Processing_Task_State_Bool_Exp>>>;
  _not?: InputMaybe<Processing_Task_State_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Processing_Task_State_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  version?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "processing_task_state" */
export enum Processing_Task_State_Constraint {
  /** unique or primary key constraint */
  ProcessingTaskStatePkey = 'processing_task_state_pkey'
}

/** input type for incrementing integer column in table "processing_task_state" */
export type Processing_Task_State_Inc_Input = {
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "processing_task_state" */
export type Processing_Task_State_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Processing_Task_State_Max_Fields = {
  __typename?: 'processing_task_state_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "processing_task_state" */
export type Processing_Task_State_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Processing_Task_State_Min_Fields = {
  __typename?: 'processing_task_state_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "processing_task_state" */
export type Processing_Task_State_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "processing_task_state" */
export type Processing_Task_State_Mutation_Response = {
  __typename?: 'processing_task_state_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Processing_Task_State>;
};

/** input type for inserting object relation for remote table "processing_task_state" */
export type Processing_Task_State_Obj_Rel_Insert_Input = {
  data: Processing_Task_State_Insert_Input;
  on_conflict?: InputMaybe<Processing_Task_State_On_Conflict>;
};

/** on conflict condition type for table "processing_task_state" */
export type Processing_Task_State_On_Conflict = {
  constraint: Processing_Task_State_Constraint;
  update_columns: Array<Processing_Task_State_Update_Column>;
  where?: InputMaybe<Processing_Task_State_Bool_Exp>;
};

/** ordering options when selecting data from "processing_task_state" */
export type Processing_Task_State_Order_By = {
  created_at?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "processing_task_state" */
export type Processing_Task_State_Pk_Columns_Input = {
  recording_id: Scalars['uuid']['input'];
  type: Scalars['String']['input'];
  version: Scalars['Int']['input'];
};

/** select columns of table "processing_task_state" */
export enum Processing_Task_State_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Type = 'type',
  /** column name */
  Version = 'version'
}

/** input type for updating data in table "processing_task_state" */
export type Processing_Task_State_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Processing_Task_State_Stddev_Fields = {
  __typename?: 'processing_task_state_stddev_fields';
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "processing_task_state" */
export type Processing_Task_State_Stddev_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Processing_Task_State_Stddev_Pop_Fields = {
  __typename?: 'processing_task_state_stddev_pop_fields';
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "processing_task_state" */
export type Processing_Task_State_Stddev_Pop_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Processing_Task_State_Stddev_Samp_Fields = {
  __typename?: 'processing_task_state_stddev_samp_fields';
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "processing_task_state" */
export type Processing_Task_State_Stddev_Samp_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Processing_Task_State_Sum_Fields = {
  __typename?: 'processing_task_state_sum_fields';
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "processing_task_state" */
export type Processing_Task_State_Sum_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** update columns of table "processing_task_state" */
export enum Processing_Task_State_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Type = 'type',
  /** column name */
  Version = 'version'
}

/** aggregate var_pop on columns */
export type Processing_Task_State_Var_Pop_Fields = {
  __typename?: 'processing_task_state_var_pop_fields';
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "processing_task_state" */
export type Processing_Task_State_Var_Pop_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Processing_Task_State_Var_Samp_Fields = {
  __typename?: 'processing_task_state_var_samp_fields';
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "processing_task_state" */
export type Processing_Task_State_Var_Samp_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Processing_Task_State_Variance_Fields = {
  __typename?: 'processing_task_state_variance_fields';
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "processing_task_state" */
export type Processing_Task_State_Variance_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "api_keys" */
  api_keys: Array<Api_Keys>;
  /** fetch aggregated fields from the table: "api_keys" */
  api_keys_aggregate: Api_Keys_Aggregate;
  /** fetch data from the table: "api_keys" using primary key columns */
  api_keys_by_pk?: Maybe<Api_Keys>;
  auth: Authentication;
  /** fetch data from the table: "auth_requests" */
  auth_requests: Array<Auth_Requests>;
  /** fetch aggregated fields from the table: "auth_requests" */
  auth_requests_aggregate: Auth_Requests_Aggregate;
  /** fetch data from the table: "auth_requests" using primary key columns */
  auth_requests_by_pk?: Maybe<Auth_Requests>;
  /** fetch data from the table: "base_snapshots" */
  base_snapshots: Array<Base_Snapshots>;
  /** fetch aggregated fields from the table: "base_snapshots" */
  base_snapshots_aggregate: Base_Snapshots_Aggregate;
  /** fetch data from the table: "base_snapshots" using primary key columns */
  base_snapshots_by_pk?: Maybe<Base_Snapshots>;
  /** fetch data from the table: "cache_warming_results" */
  cache_warming_results: Array<Cache_Warming_Results>;
  /** fetch aggregated fields from the table: "cache_warming_results" */
  cache_warming_results_aggregate: Cache_Warming_Results_Aggregate;
  /** fetch data from the table: "cache_warming_results" using primary key columns */
  cache_warming_results_by_pk?: Maybe<Cache_Warming_Results>;
  /** fetch data from the table: "collaborator_requests" */
  collaborator_requests: Array<Collaborator_Requests>;
  /** fetch aggregated fields from the table: "collaborator_requests" */
  collaborator_requests_aggregate: Collaborator_Requests_Aggregate;
  /** fetch data from the table: "collaborator_requests" using primary key columns */
  collaborator_requests_by_pk?: Maybe<Collaborator_Requests>;
  /** fetch data from the table: "collaborators" */
  collaborators: Array<Collaborators>;
  /** fetch aggregated fields from the table: "collaborators" */
  collaborators_aggregate: Collaborators_Aggregate;
  /** fetch data from the table: "collaborators" using primary key columns */
  collaborators_by_pk?: Maybe<Collaborators>;
  /** fetch data from the table: "comments" */
  comments: Array<Comments>;
  /** fetch aggregated fields from the table: "comments" */
  comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "comments" using primary key columns */
  comments_by_pk?: Maybe<Comments>;
  /** fetch data from the table: "controllers" */
  controllers: Array<Controllers>;
  /** fetch aggregated fields from the table: "controllers" */
  controllers_aggregate: Controllers_Aggregate;
  /** fetch data from the table: "controllers" using primary key columns */
  controllers_by_pk?: Maybe<Controllers>;
  /** fetch data from the table: "crash_reports" */
  crash_reports: Array<Crash_Reports>;
  /** fetch aggregated fields from the table: "crash_reports" */
  crash_reports_aggregate: Crash_Reports_Aggregate;
  /** fetch data from the table: "dojo_sessions" */
  dojo_sessions: Array<Dojo_Sessions>;
  /** fetch aggregated fields from the table: "dojo_sessions" */
  dojo_sessions_aggregate: Dojo_Sessions_Aggregate;
  /** fetch data from the table: "dojo_sessions" using primary key columns */
  dojo_sessions_by_pk?: Maybe<Dojo_Sessions>;
  /** fetch data from the table: "experimental_crash_reports_filters" */
  experimental_crash_reports_filters: Array<Experimental_Crash_Reports_Filters>;
  /** fetch aggregated fields from the table: "experimental_crash_reports_filters" */
  experimental_crash_reports_filters_aggregate: Experimental_Crash_Reports_Filters_Aggregate;
  /** fetch data from the table: "experimental_crash_reports_filters" using primary key columns */
  experimental_crash_reports_filters_by_pk?: Maybe<Experimental_Crash_Reports_Filters>;
  expiredRecordingsByWorkspaceId: Array<Scalars['String']['output']>;
  /** fetch data from the table: "filters" */
  filters: Array<Filters>;
  /** fetch aggregated fields from the table: "filters" */
  filters_aggregate: Filters_Aggregate;
  /** fetch data from the table: "filters" using primary key columns */
  filters_by_pk?: Maybe<Filters>;
  /** perform the action: "getCommentsWithAuthId" */
  getCommentsWithAuthId?: Maybe<SampleOutput>;
  /** fetch data from the table: "invitations" */
  invitations: Array<Invitations>;
  /** fetch aggregated fields from the table: "invitations" */
  invitations_aggregate: Invitations_Aggregate;
  /** fetch data from the table: "invitations" using primary key columns */
  invitations_by_pk?: Maybe<Invitations>;
  node?: Maybe<Node>;
  /** fetch data from the table: "organizations" */
  organizations: Array<Organizations>;
  /** fetch aggregated fields from the table: "organizations" */
  organizations_aggregate: Organizations_Aggregate;
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** fetch data from the table: "plans" */
  plans: Array<Plans>;
  /** fetch aggregated fields from the table: "plans" */
  plans_aggregate: Plans_Aggregate;
  /** fetch data from the table: "plans" using primary key columns */
  plans_by_pk?: Maybe<Plans>;
  /** fetch data from the table: "processing_task_state" */
  processing_task_state: Array<Processing_Task_State>;
  /** fetch aggregated fields from the table: "processing_task_state" */
  processing_task_state_aggregate: Processing_Task_State_Aggregate;
  /** fetch data from the table: "processing_task_state" using primary key columns */
  processing_task_state_by_pk?: Maybe<Processing_Task_State>;
  recording?: Maybe<Recording>;
  /** fetch data from the table: "recording_assets" */
  recording_assets: Array<Recording_Assets>;
  /** fetch aggregated fields from the table: "recording_assets" */
  recording_assets_aggregate: Recording_Assets_Aggregate;
  /** fetch data from the table: "recording_assets" using primary key columns */
  recording_assets_by_pk?: Maybe<Recording_Assets>;
  /** fetch data from the table: "recording_checkpoints" */
  recording_checkpoints: Array<Recording_Checkpoints>;
  /** fetch aggregated fields from the table: "recording_checkpoints" */
  recording_checkpoints_aggregate: Recording_Checkpoints_Aggregate;
  /** fetch data from the table: "recording_checkpoints" using primary key columns */
  recording_checkpoints_by_pk?: Maybe<Recording_Checkpoints>;
  /** fetch data from the table: "recording_originalsources" */
  recording_originalsources: Array<Recording_Originalsources>;
  /** fetch aggregated fields from the table: "recording_originalsources" */
  recording_originalsources_aggregate: Recording_Originalsources_Aggregate;
  /** fetch data from the table: "recording_originalsources" using primary key columns */
  recording_originalsources_by_pk?: Maybe<Recording_Originalsources>;
  /** fetch data from the table: "recording_points" */
  recording_points: Array<Recording_Points>;
  /** fetch aggregated fields from the table: "recording_points" */
  recording_points_aggregate: Recording_Points_Aggregate;
  /** fetch data from the table: "recording_points" using primary key columns */
  recording_points_by_pk?: Maybe<Recording_Points>;
  /** fetch data from the table: "recording_regions" */
  recording_regions: Array<Recording_Regions>;
  /** fetch aggregated fields from the table: "recording_regions" */
  recording_regions_aggregate: Recording_Regions_Aggregate;
  /** fetch data from the table: "recording_regions" using primary key columns */
  recording_regions_by_pk?: Maybe<Recording_Regions>;
  /** fetch data from the table: "recording_sourcemaps" */
  recording_sourcemaps: Array<Recording_Sourcemaps>;
  /** fetch aggregated fields from the table: "recording_sourcemaps" */
  recording_sourcemaps_aggregate: Recording_Sourcemaps_Aggregate;
  /** fetch data from the table: "recording_sourcemaps" using primary key columns */
  recording_sourcemaps_by_pk?: Maybe<Recording_Sourcemaps>;
  /** fetch data from the table: "recordings" */
  recordings: Array<Recordings>;
  /** fetch aggregated fields from the table: "recordings" */
  recordings_aggregate: Recordings_Aggregate;
  /** fetch data from the table: "recordings" using primary key columns */
  recordings_by_pk?: Maybe<Recordings>;
  /** fetch data from the table: "release_build_files" */
  release_build_files: Array<Release_Build_Files>;
  /** fetch aggregated fields from the table: "release_build_files" */
  release_build_files_aggregate: Release_Build_Files_Aggregate;
  /** fetch data from the table: "release_build_files" using primary key columns */
  release_build_files_by_pk?: Maybe<Release_Build_Files>;
  /** fetch data from the table: "releases" */
  releases: Array<Releases>;
  /** fetch aggregated fields from the table: "releases" */
  releases_aggregate: Releases_Aggregate;
  /** fetch data from the table: "releases" using primary key columns */
  releases_by_pk?: Maybe<Releases>;
  /** fetch data from the table: "root_cause_analysis_results" */
  root_cause_analysis_results: Array<Root_Cause_Analysis_Results>;
  /** fetch aggregated fields from the table: "root_cause_analysis_results" */
  root_cause_analysis_results_aggregate: Root_Cause_Analysis_Results_Aggregate;
  /** fetch data from the table: "root_cause_analysis_results" using primary key columns */
  root_cause_analysis_results_by_pk?: Maybe<Root_Cause_Analysis_Results>;
  /** fetch data from the table: "runtime_crash_report_sessions" */
  runtime_crash_report_sessions: Array<Runtime_Crash_Report_Sessions>;
  /** fetch aggregated fields from the table: "runtime_crash_report_sessions" */
  runtime_crash_report_sessions_aggregate: Runtime_Crash_Report_Sessions_Aggregate;
  /** fetch data from the table: "runtime_crash_report_sessions" using primary key columns */
  runtime_crash_report_sessions_by_pk?: Maybe<Runtime_Crash_Report_Sessions>;
  /** fetch data from the table: "runtime_crash_reports" */
  runtime_crash_reports: Array<Runtime_Crash_Reports>;
  /** fetch aggregated fields from the table: "runtime_crash_reports" */
  runtime_crash_reports_aggregate: Runtime_Crash_Reports_Aggregate;
  /** fetch data from the table: "runtime_crash_reports" using primary key columns */
  runtime_crash_reports_by_pk?: Maybe<Runtime_Crash_Reports>;
  /** fetch data from the table: "sessions" */
  sessions: Array<Sessions>;
  /** fetch aggregated fields from the table: "sessions" */
  sessions_aggregate: Sessions_Aggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  sessions_by_pk?: Maybe<Sessions>;
  /** fetch data from the table: "simple_inbox" */
  simple_inbox: Array<Simple_Inbox>;
  /** fetch aggregated fields from the table: "simple_inbox" */
  simple_inbox_aggregate: Simple_Inbox_Aggregate;
  /** fetch data from the table: "simple_inbox" using primary key columns */
  simple_inbox_by_pk?: Maybe<Simple_Inbox>;
  /** fetch data from the table: "snapshot_diffs" */
  snapshot_diffs: Array<Snapshot_Diffs>;
  /** fetch aggregated fields from the table: "snapshot_diffs" */
  snapshot_diffs_aggregate: Snapshot_Diffs_Aggregate;
  /** fetch data from the table: "snapshot_diffs" using primary key columns */
  snapshot_diffs_by_pk?: Maybe<Snapshot_Diffs>;
  testRun?: Maybe<TestRun>;
  testRuns: TestRunsConnection;
  /** fetch data from the table: "test_run_metrics" */
  test_run_metrics: Array<Test_Run_Metrics>;
  /** fetch aggregated fields from the table: "test_run_metrics" */
  test_run_metrics_aggregate: Test_Run_Metrics_Aggregate;
  /** fetch data from the table: "test_run_metrics" using primary key columns */
  test_run_metrics_by_pk?: Maybe<Test_Run_Metrics>;
  /** fetch data from the table: "test_run_results" */
  test_run_results: Array<Test_Run_Results>;
  /** fetch aggregated fields from the table: "test_run_results" */
  test_run_results_aggregate: Test_Run_Results_Aggregate;
  /** fetch data from the table: "test_run_results" using primary key columns */
  test_run_results_by_pk?: Maybe<Test_Run_Results>;
  /** fetch data from the table: "test_run_shards" */
  test_run_shards: Array<Test_Run_Shards>;
  /** fetch aggregated fields from the table: "test_run_shards" */
  test_run_shards_aggregate: Test_Run_Shards_Aggregate;
  /** fetch data from the table: "test_run_shards" using primary key columns */
  test_run_shards_by_pk?: Maybe<Test_Run_Shards>;
  /** fetch data from the table: "test_run_test_recordings" */
  test_run_test_recordings: Array<Test_Run_Test_Recordings>;
  /** fetch aggregated fields from the table: "test_run_test_recordings" */
  test_run_test_recordings_aggregate: Test_Run_Test_Recordings_Aggregate;
  /** fetch data from the table: "test_run_tests" */
  test_run_tests: Array<Test_Run_Tests>;
  /** fetch aggregated fields from the table: "test_run_tests" */
  test_run_tests_aggregate: Test_Run_Tests_Aggregate;
  /** fetch data from the table: "test_run_tests" using primary key columns */
  test_run_tests_by_pk?: Maybe<Test_Run_Tests>;
  /** fetch data from the table: "test_runs" */
  test_runs: Array<Test_Runs>;
  /** fetch aggregated fields from the table: "test_runs" */
  test_runs_aggregate: Test_Runs_Aggregate;
  /** fetch data from the table: "test_runs" using primary key columns */
  test_runs_by_pk?: Maybe<Test_Runs>;
  /** fetch data from the table: "test_runs_new" */
  test_runs_new: Array<Test_Runs_New>;
  /** fetch aggregated fields from the table: "test_runs_new" */
  test_runs_new_aggregate: Test_Runs_New_Aggregate;
  /** fetch data from the table: "test_runs_new" using primary key columns */
  test_runs_new_by_pk?: Maybe<Test_Runs_New>;
  /** fetch data from the table: "user_ids" */
  user_ids: Array<User_Ids>;
  /** fetch aggregated fields from the table: "user_ids" */
  user_ids_aggregate: User_Ids_Aggregate;
  /** fetch data from the table: "user_ids" using primary key columns */
  user_ids_by_pk?: Maybe<User_Ids>;
  /** fetch data from the table: "user_settings" */
  user_settings: Array<User_Settings>;
  /** fetch aggregated fields from the table: "user_settings" */
  user_settings_aggregate: User_Settings_Aggregate;
  /** fetch data from the table: "user_settings" using primary key columns */
  user_settings_by_pk?: Maybe<User_Settings>;
  /** fetch data from the table: "user_tos" */
  user_tos: Array<User_Tos>;
  /** fetch aggregated fields from the table: "user_tos" */
  user_tos_aggregate: User_Tos_Aggregate;
  /** fetch data from the table: "user_tos" using primary key columns */
  user_tos_by_pk?: Maybe<User_Tos>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users_activity" */
  users_activity: Array<Users_Activity>;
  /** fetch aggregated fields from the table: "users_activity" */
  users_activity_aggregate: Users_Activity_Aggregate;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  viewer?: Maybe<AuthenticatedUser>;
  workspace?: Maybe<Workspace>;
  /** fetch data from the table: "workspace_sourcemaps" */
  workspace_sourcemaps: Array<Workspace_Sourcemaps>;
  /** fetch aggregated fields from the table: "workspace_sourcemaps" */
  workspace_sourcemaps_aggregate: Workspace_Sourcemaps_Aggregate;
  /** fetch data from the table: "workspace_sourcemaps" using primary key columns */
  workspace_sourcemaps_by_pk?: Maybe<Workspace_Sourcemaps>;
  /** fetch data from the table: "workspace_tests" */
  workspace_tests: Array<Workspace_Tests>;
  /** fetch aggregated fields from the table: "workspace_tests" */
  workspace_tests_aggregate: Workspace_Tests_Aggregate;
  /** fetch data from the table: "workspace_tests" using primary key columns */
  workspace_tests_by_pk?: Maybe<Workspace_Tests>;
  /** fetch data from the table: "workspaces" */
  workspaces: Array<Workspaces>;
  /** fetch aggregated fields from the table: "workspaces" */
  workspaces_aggregate: Workspaces_Aggregate;
  /** fetch data from the table: "workspaces" using primary key columns */
  workspaces_by_pk?: Maybe<Workspaces>;
  /** fetch data from the table: "workspaces_subscription" */
  workspaces_subscription: Array<Workspaces_Subscription>;
  /** fetch aggregated fields from the table: "workspaces_subscription" */
  workspaces_subscription_aggregate: Workspaces_Subscription_Aggregate;
  /** fetch data from the table: "workspaces_subscription" using primary key columns */
  workspaces_subscription_by_pk?: Maybe<Workspaces_Subscription>;
  /** fetch data from the table: "workspaces_user" */
  workspaces_user: Array<Workspaces_User>;
  /** fetch aggregated fields from the table: "workspaces_user" */
  workspaces_user_aggregate: Workspaces_User_Aggregate;
  /** fetch data from the table: "workspaces_user" using primary key columns */
  workspaces_user_by_pk?: Maybe<Workspaces_User>;
};


/** query root */
export type Query_RootApi_KeysArgs = {
  distinct_on?: InputMaybe<Array<Api_Keys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Api_Keys_Order_By>>;
  where?: InputMaybe<Api_Keys_Bool_Exp>;
};


/** query root */
export type Query_RootApi_Keys_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Api_Keys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Api_Keys_Order_By>>;
  where?: InputMaybe<Api_Keys_Bool_Exp>;
};


/** query root */
export type Query_RootApi_Keys_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootAuth_RequestsArgs = {
  distinct_on?: InputMaybe<Array<Auth_Requests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auth_Requests_Order_By>>;
  where?: InputMaybe<Auth_Requests_Bool_Exp>;
};


/** query root */
export type Query_RootAuth_Requests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Auth_Requests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auth_Requests_Order_By>>;
  where?: InputMaybe<Auth_Requests_Bool_Exp>;
};


/** query root */
export type Query_RootAuth_Requests_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootBase_SnapshotsArgs = {
  distinct_on?: InputMaybe<Array<Base_Snapshots_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Base_Snapshots_Order_By>>;
  where?: InputMaybe<Base_Snapshots_Bool_Exp>;
};


/** query root */
export type Query_RootBase_Snapshots_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Base_Snapshots_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Base_Snapshots_Order_By>>;
  where?: InputMaybe<Base_Snapshots_Bool_Exp>;
};


/** query root */
export type Query_RootBase_Snapshots_By_PkArgs = {
  checkpoint: Scalars['Int']['input'];
  recording_id: Scalars['uuid']['input'];
  version_id: Scalars['Int']['input'];
};


/** query root */
export type Query_RootCache_Warming_ResultsArgs = {
  distinct_on?: InputMaybe<Array<Cache_Warming_Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cache_Warming_Results_Order_By>>;
  where?: InputMaybe<Cache_Warming_Results_Bool_Exp>;
};


/** query root */
export type Query_RootCache_Warming_Results_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cache_Warming_Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cache_Warming_Results_Order_By>>;
  where?: InputMaybe<Cache_Warming_Results_Bool_Exp>;
};


/** query root */
export type Query_RootCache_Warming_Results_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootCollaborator_RequestsArgs = {
  distinct_on?: InputMaybe<Array<Collaborator_Requests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaborator_Requests_Order_By>>;
  where?: InputMaybe<Collaborator_Requests_Bool_Exp>;
};


/** query root */
export type Query_RootCollaborator_Requests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Collaborator_Requests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaborator_Requests_Order_By>>;
  where?: InputMaybe<Collaborator_Requests_Bool_Exp>;
};


/** query root */
export type Query_RootCollaborator_Requests_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootCollaboratorsArgs = {
  distinct_on?: InputMaybe<Array<Collaborators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaborators_Order_By>>;
  where?: InputMaybe<Collaborators_Bool_Exp>;
};


/** query root */
export type Query_RootCollaborators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Collaborators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaborators_Order_By>>;
  where?: InputMaybe<Collaborators_Bool_Exp>;
};


/** query root */
export type Query_RootCollaborators_By_PkArgs = {
  recording_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootCommentsArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


/** query root */
export type Query_RootComments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


/** query root */
export type Query_RootComments_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootControllersArgs = {
  distinct_on?: InputMaybe<Array<Controllers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Controllers_Order_By>>;
  where?: InputMaybe<Controllers_Bool_Exp>;
};


/** query root */
export type Query_RootControllers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Controllers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Controllers_Order_By>>;
  where?: InputMaybe<Controllers_Bool_Exp>;
};


/** query root */
export type Query_RootControllers_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** query root */
export type Query_RootCrash_ReportsArgs = {
  distinct_on?: InputMaybe<Array<Crash_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Crash_Reports_Order_By>>;
  where?: InputMaybe<Crash_Reports_Bool_Exp>;
};


/** query root */
export type Query_RootCrash_Reports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Crash_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Crash_Reports_Order_By>>;
  where?: InputMaybe<Crash_Reports_Bool_Exp>;
};


/** query root */
export type Query_RootDojo_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Dojo_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dojo_Sessions_Order_By>>;
  where?: InputMaybe<Dojo_Sessions_Bool_Exp>;
};


/** query root */
export type Query_RootDojo_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dojo_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dojo_Sessions_Order_By>>;
  where?: InputMaybe<Dojo_Sessions_Bool_Exp>;
};


/** query root */
export type Query_RootDojo_Sessions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootExperimental_Crash_Reports_FiltersArgs = {
  distinct_on?: InputMaybe<Array<Experimental_Crash_Reports_Filters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Experimental_Crash_Reports_Filters_Order_By>>;
  where?: InputMaybe<Experimental_Crash_Reports_Filters_Bool_Exp>;
};


/** query root */
export type Query_RootExperimental_Crash_Reports_Filters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Experimental_Crash_Reports_Filters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Experimental_Crash_Reports_Filters_Order_By>>;
  where?: InputMaybe<Experimental_Crash_Reports_Filters_Bool_Exp>;
};


/** query root */
export type Query_RootExperimental_Crash_Reports_Filters_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** query root */
export type Query_RootExpiredRecordingsByWorkspaceIdArgs = {
  secret: Scalars['String']['input'];
  uuid: Scalars['UUID']['input'];
};


/** query root */
export type Query_RootFiltersArgs = {
  distinct_on?: InputMaybe<Array<Filters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Filters_Order_By>>;
  where?: InputMaybe<Filters_Bool_Exp>;
};


/** query root */
export type Query_RootFilters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Filters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Filters_Order_By>>;
  where?: InputMaybe<Filters_Bool_Exp>;
};


/** query root */
export type Query_RootFilters_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** query root */
export type Query_RootGetCommentsWithAuthIdArgs = {
  arg1: Scalars['String']['input'];
};


/** query root */
export type Query_RootInvitationsArgs = {
  distinct_on?: InputMaybe<Array<Invitations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitations_Order_By>>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};


/** query root */
export type Query_RootInvitations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitations_Order_By>>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};


/** query root */
export type Query_RootInvitations_By_PkArgs = {
  invited_email: Scalars['String']['input'];
  user_id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootNodeArgs = {
  id: Scalars['ID']['input'];
};


/** query root */
export type Query_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


/** query root */
export type Query_RootOrganizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


/** query root */
export type Query_RootOrganizations_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootPlansArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


/** query root */
export type Query_RootPlans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


/** query root */
export type Query_RootPlans_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootProcessing_Task_StateArgs = {
  distinct_on?: InputMaybe<Array<Processing_Task_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Processing_Task_State_Order_By>>;
  where?: InputMaybe<Processing_Task_State_Bool_Exp>;
};


/** query root */
export type Query_RootProcessing_Task_State_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Processing_Task_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Processing_Task_State_Order_By>>;
  where?: InputMaybe<Processing_Task_State_Bool_Exp>;
};


/** query root */
export type Query_RootProcessing_Task_State_By_PkArgs = {
  recording_id: Scalars['uuid']['input'];
  type: Scalars['String']['input'];
  version: Scalars['Int']['input'];
};


/** query root */
export type Query_RootRecordingArgs = {
  uuid: Scalars['UUID']['input'];
};


/** query root */
export type Query_RootRecording_AssetsArgs = {
  distinct_on?: InputMaybe<Array<Recording_Assets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Assets_Order_By>>;
  where?: InputMaybe<Recording_Assets_Bool_Exp>;
};


/** query root */
export type Query_RootRecording_Assets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recording_Assets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Assets_Order_By>>;
  where?: InputMaybe<Recording_Assets_Bool_Exp>;
};


/** query root */
export type Query_RootRecording_Assets_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** query root */
export type Query_RootRecording_CheckpointsArgs = {
  distinct_on?: InputMaybe<Array<Recording_Checkpoints_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Checkpoints_Order_By>>;
  where?: InputMaybe<Recording_Checkpoints_Bool_Exp>;
};


/** query root */
export type Query_RootRecording_Checkpoints_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recording_Checkpoints_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Checkpoints_Order_By>>;
  where?: InputMaybe<Recording_Checkpoints_Bool_Exp>;
};


/** query root */
export type Query_RootRecording_Checkpoints_By_PkArgs = {
  checkpoint: Scalars['Int']['input'];
  recording_id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootRecording_OriginalsourcesArgs = {
  distinct_on?: InputMaybe<Array<Recording_Originalsources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Originalsources_Order_By>>;
  where?: InputMaybe<Recording_Originalsources_Bool_Exp>;
};


/** query root */
export type Query_RootRecording_Originalsources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recording_Originalsources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Originalsources_Order_By>>;
  where?: InputMaybe<Recording_Originalsources_Bool_Exp>;
};


/** query root */
export type Query_RootRecording_Originalsources_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootRecording_PointsArgs = {
  distinct_on?: InputMaybe<Array<Recording_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Points_Order_By>>;
  where?: InputMaybe<Recording_Points_Bool_Exp>;
};


/** query root */
export type Query_RootRecording_Points_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recording_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Points_Order_By>>;
  where?: InputMaybe<Recording_Points_Bool_Exp>;
};


/** query root */
export type Query_RootRecording_Points_By_PkArgs = {
  key: Scalars['String']['input'];
};


/** query root */
export type Query_RootRecording_RegionsArgs = {
  distinct_on?: InputMaybe<Array<Recording_Regions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Regions_Order_By>>;
  where?: InputMaybe<Recording_Regions_Bool_Exp>;
};


/** query root */
export type Query_RootRecording_Regions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recording_Regions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Regions_Order_By>>;
  where?: InputMaybe<Recording_Regions_Bool_Exp>;
};


/** query root */
export type Query_RootRecording_Regions_By_PkArgs = {
  recording_id: Scalars['String']['input'];
  region_idx: Scalars['Int']['input'];
};


/** query root */
export type Query_RootRecording_SourcemapsArgs = {
  distinct_on?: InputMaybe<Array<Recording_Sourcemaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Sourcemaps_Order_By>>;
  where?: InputMaybe<Recording_Sourcemaps_Bool_Exp>;
};


/** query root */
export type Query_RootRecording_Sourcemaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recording_Sourcemaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Sourcemaps_Order_By>>;
  where?: InputMaybe<Recording_Sourcemaps_Bool_Exp>;
};


/** query root */
export type Query_RootRecording_Sourcemaps_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootRecordingsArgs = {
  distinct_on?: InputMaybe<Array<Recordings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recordings_Order_By>>;
  where?: InputMaybe<Recordings_Bool_Exp>;
};


/** query root */
export type Query_RootRecordings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recordings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recordings_Order_By>>;
  where?: InputMaybe<Recordings_Bool_Exp>;
};


/** query root */
export type Query_RootRecordings_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootRelease_Build_FilesArgs = {
  distinct_on?: InputMaybe<Array<Release_Build_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Release_Build_Files_Order_By>>;
  where?: InputMaybe<Release_Build_Files_Bool_Exp>;
};


/** query root */
export type Query_RootRelease_Build_Files_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Release_Build_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Release_Build_Files_Order_By>>;
  where?: InputMaybe<Release_Build_Files_Bool_Exp>;
};


/** query root */
export type Query_RootRelease_Build_Files_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootReleasesArgs = {
  distinct_on?: InputMaybe<Array<Releases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Releases_Order_By>>;
  where?: InputMaybe<Releases_Bool_Exp>;
};


/** query root */
export type Query_RootReleases_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Releases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Releases_Order_By>>;
  where?: InputMaybe<Releases_Bool_Exp>;
};


/** query root */
export type Query_RootReleases_By_PkArgs = {
  build_id: Scalars['String']['input'];
};


/** query root */
export type Query_RootRoot_Cause_Analysis_ResultsArgs = {
  distinct_on?: InputMaybe<Array<Root_Cause_Analysis_Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Root_Cause_Analysis_Results_Order_By>>;
  where?: InputMaybe<Root_Cause_Analysis_Results_Bool_Exp>;
};


/** query root */
export type Query_RootRoot_Cause_Analysis_Results_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Root_Cause_Analysis_Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Root_Cause_Analysis_Results_Order_By>>;
  where?: InputMaybe<Root_Cause_Analysis_Results_Bool_Exp>;
};


/** query root */
export type Query_RootRoot_Cause_Analysis_Results_By_PkArgs = {
  recording_id: Scalars['uuid']['input'];
  version: Scalars['Int']['input'];
};


/** query root */
export type Query_RootRuntime_Crash_Report_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Order_By>>;
  where?: InputMaybe<Runtime_Crash_Report_Sessions_Bool_Exp>;
};


/** query root */
export type Query_RootRuntime_Crash_Report_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Order_By>>;
  where?: InputMaybe<Runtime_Crash_Report_Sessions_Bool_Exp>;
};


/** query root */
export type Query_RootRuntime_Crash_Report_Sessions_By_PkArgs = {
  runtime_crash_report_id: Scalars['uuid']['input'];
  session_id: Scalars['String']['input'];
};


/** query root */
export type Query_RootRuntime_Crash_ReportsArgs = {
  distinct_on?: InputMaybe<Array<Runtime_Crash_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Runtime_Crash_Reports_Order_By>>;
  where?: InputMaybe<Runtime_Crash_Reports_Bool_Exp>;
};


/** query root */
export type Query_RootRuntime_Crash_Reports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Runtime_Crash_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Runtime_Crash_Reports_Order_By>>;
  where?: InputMaybe<Runtime_Crash_Reports_Bool_Exp>;
};


/** query root */
export type Query_RootRuntime_Crash_Reports_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};


/** query root */
export type Query_RootSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};


/** query root */
export type Query_RootSessions_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** query root */
export type Query_RootSimple_InboxArgs = {
  distinct_on?: InputMaybe<Array<Simple_Inbox_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Simple_Inbox_Order_By>>;
  where?: InputMaybe<Simple_Inbox_Bool_Exp>;
};


/** query root */
export type Query_RootSimple_Inbox_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Simple_Inbox_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Simple_Inbox_Order_By>>;
  where?: InputMaybe<Simple_Inbox_Bool_Exp>;
};


/** query root */
export type Query_RootSimple_Inbox_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** query root */
export type Query_RootSnapshot_DiffsArgs = {
  distinct_on?: InputMaybe<Array<Snapshot_Diffs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Snapshot_Diffs_Order_By>>;
  where?: InputMaybe<Snapshot_Diffs_Bool_Exp>;
};


/** query root */
export type Query_RootSnapshot_Diffs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Snapshot_Diffs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Snapshot_Diffs_Order_By>>;
  where?: InputMaybe<Snapshot_Diffs_Bool_Exp>;
};


/** query root */
export type Query_RootSnapshot_Diffs_By_PkArgs = {
  end_checkpoint: Scalars['Int']['input'];
  recording_id: Scalars['uuid']['input'];
  version_id: Scalars['Int']['input'];
};


/** query root */
export type Query_RootTestRunArgs = {
  clientKey?: InputMaybe<Scalars['String']['input']>;
  mergeId?: InputMaybe<Scalars['String']['input']>;
  repository?: InputMaybe<Scalars['String']['input']>;
  secret: Scalars['String']['input'];
};


/** query root */
export type Query_RootTestRunsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  mergeId?: InputMaybe<Scalars['String']['input']>;
  repository?: InputMaybe<Scalars['String']['input']>;
  secret: Scalars['String']['input'];
};


/** query root */
export type Query_RootTest_Run_MetricsArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Metrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Metrics_Order_By>>;
  where?: InputMaybe<Test_Run_Metrics_Bool_Exp>;
};


/** query root */
export type Query_RootTest_Run_Metrics_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Metrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Metrics_Order_By>>;
  where?: InputMaybe<Test_Run_Metrics_Bool_Exp>;
};


/** query root */
export type Query_RootTest_Run_Metrics_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootTest_Run_ResultsArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Results_Order_By>>;
  where?: InputMaybe<Test_Run_Results_Bool_Exp>;
};


/** query root */
export type Query_RootTest_Run_Results_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Results_Order_By>>;
  where?: InputMaybe<Test_Run_Results_Bool_Exp>;
};


/** query root */
export type Query_RootTest_Run_Results_By_PkArgs = {
  test_id: Scalars['String']['input'];
  test_run_id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootTest_Run_ShardsArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Shards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Shards_Order_By>>;
  where?: InputMaybe<Test_Run_Shards_Bool_Exp>;
};


/** query root */
export type Query_RootTest_Run_Shards_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Shards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Shards_Order_By>>;
  where?: InputMaybe<Test_Run_Shards_Bool_Exp>;
};


/** query root */
export type Query_RootTest_Run_Shards_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootTest_Run_Test_RecordingsArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Test_Recordings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Test_Recordings_Order_By>>;
  where?: InputMaybe<Test_Run_Test_Recordings_Bool_Exp>;
};


/** query root */
export type Query_RootTest_Run_Test_Recordings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Test_Recordings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Test_Recordings_Order_By>>;
  where?: InputMaybe<Test_Run_Test_Recordings_Bool_Exp>;
};


/** query root */
export type Query_RootTest_Run_TestsArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Tests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Tests_Order_By>>;
  where?: InputMaybe<Test_Run_Tests_Bool_Exp>;
};


/** query root */
export type Query_RootTest_Run_Tests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Tests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Tests_Order_By>>;
  where?: InputMaybe<Test_Run_Tests_Bool_Exp>;
};


/** query root */
export type Query_RootTest_Run_Tests_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootTest_RunsArgs = {
  distinct_on?: InputMaybe<Array<Test_Runs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Runs_Order_By>>;
  where?: InputMaybe<Test_Runs_Bool_Exp>;
};


/** query root */
export type Query_RootTest_Runs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Runs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Runs_Order_By>>;
  where?: InputMaybe<Test_Runs_Bool_Exp>;
};


/** query root */
export type Query_RootTest_Runs_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootTest_Runs_NewArgs = {
  distinct_on?: InputMaybe<Array<Test_Runs_New_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Runs_New_Order_By>>;
  where?: InputMaybe<Test_Runs_New_Bool_Exp>;
};


/** query root */
export type Query_RootTest_Runs_New_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Runs_New_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Runs_New_Order_By>>;
  where?: InputMaybe<Test_Runs_New_Bool_Exp>;
};


/** query root */
export type Query_RootTest_Runs_New_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootUser_IdsArgs = {
  distinct_on?: InputMaybe<Array<User_Ids_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Ids_Order_By>>;
  where?: InputMaybe<User_Ids_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Ids_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Ids_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Ids_Order_By>>;
  where?: InputMaybe<User_Ids_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Ids_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootUser_SettingsArgs = {
  distinct_on?: InputMaybe<Array<User_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Settings_Order_By>>;
  where?: InputMaybe<User_Settings_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Settings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Settings_Order_By>>;
  where?: InputMaybe<User_Settings_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Settings_By_PkArgs = {
  user_id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootUser_TosArgs = {
  distinct_on?: InputMaybe<Array<User_Tos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Tos_Order_By>>;
  where?: InputMaybe<User_Tos_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Tos_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Tos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Tos_Order_By>>;
  where?: InputMaybe<User_Tos_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Tos_By_PkArgs = {
  tos_version: Scalars['Int']['input'];
  user_id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_ActivityArgs = {
  distinct_on?: InputMaybe<Array<Users_Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Activity_Order_By>>;
  where?: InputMaybe<Users_Activity_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_Activity_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Activity_Order_By>>;
  where?: InputMaybe<Users_Activity_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootWorkspaceArgs = {
  uuid: Scalars['UUID']['input'];
};


/** query root */
export type Query_RootWorkspace_SourcemapsArgs = {
  distinct_on?: InputMaybe<Array<Workspace_Sourcemaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspace_Sourcemaps_Order_By>>;
  where?: InputMaybe<Workspace_Sourcemaps_Bool_Exp>;
};


/** query root */
export type Query_RootWorkspace_Sourcemaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspace_Sourcemaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspace_Sourcemaps_Order_By>>;
  where?: InputMaybe<Workspace_Sourcemaps_Bool_Exp>;
};


/** query root */
export type Query_RootWorkspace_Sourcemaps_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootWorkspace_TestsArgs = {
  distinct_on?: InputMaybe<Array<Workspace_Tests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspace_Tests_Order_By>>;
  where?: InputMaybe<Workspace_Tests_Bool_Exp>;
};


/** query root */
export type Query_RootWorkspace_Tests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspace_Tests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspace_Tests_Order_By>>;
  where?: InputMaybe<Workspace_Tests_Bool_Exp>;
};


/** query root */
export type Query_RootWorkspace_Tests_By_PkArgs = {
  test_id: Scalars['String']['input'];
  workspace_id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootWorkspacesArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Order_By>>;
  where?: InputMaybe<Workspaces_Bool_Exp>;
};


/** query root */
export type Query_RootWorkspaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Order_By>>;
  where?: InputMaybe<Workspaces_Bool_Exp>;
};


/** query root */
export type Query_RootWorkspaces_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootWorkspaces_SubscriptionArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Subscription_Order_By>>;
  where?: InputMaybe<Workspaces_Subscription_Bool_Exp>;
};


/** query root */
export type Query_RootWorkspaces_Subscription_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Subscription_Order_By>>;
  where?: InputMaybe<Workspaces_Subscription_Bool_Exp>;
};


/** query root */
export type Query_RootWorkspaces_Subscription_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** query root */
export type Query_RootWorkspaces_UserArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_User_Order_By>>;
  where?: InputMaybe<Workspaces_User_Bool_Exp>;
};


/** query root */
export type Query_RootWorkspaces_User_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_User_Order_By>>;
  where?: InputMaybe<Workspaces_User_Bool_Exp>;
};


/** query root */
export type Query_RootWorkspaces_User_By_PkArgs = {
  user_id: Scalars['uuid']['input'];
  workspace_id: Scalars['uuid']['input'];
};

/** columns and relationships of "recording_assets" */
export type Recording_Assets = {
  __typename?: 'recording_assets';
  asset_id: Scalars['String']['output'];
  controller_id: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['Int']['output'];
  recording_id: Scalars['String']['output'];
  size?: Maybe<Scalars['bigint']['output']>;
  state: Scalars['String']['output'];
  type: Scalars['String']['output'];
  written_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregated selection of "recording_assets" */
export type Recording_Assets_Aggregate = {
  __typename?: 'recording_assets_aggregate';
  aggregate?: Maybe<Recording_Assets_Aggregate_Fields>;
  nodes: Array<Recording_Assets>;
};

/** aggregate fields of "recording_assets" */
export type Recording_Assets_Aggregate_Fields = {
  __typename?: 'recording_assets_aggregate_fields';
  avg?: Maybe<Recording_Assets_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Recording_Assets_Max_Fields>;
  min?: Maybe<Recording_Assets_Min_Fields>;
  stddev?: Maybe<Recording_Assets_Stddev_Fields>;
  stddev_pop?: Maybe<Recording_Assets_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recording_Assets_Stddev_Samp_Fields>;
  sum?: Maybe<Recording_Assets_Sum_Fields>;
  var_pop?: Maybe<Recording_Assets_Var_Pop_Fields>;
  var_samp?: Maybe<Recording_Assets_Var_Samp_Fields>;
  variance?: Maybe<Recording_Assets_Variance_Fields>;
};


/** aggregate fields of "recording_assets" */
export type Recording_Assets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recording_Assets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recording_assets" */
export type Recording_Assets_Aggregate_Order_By = {
  avg?: InputMaybe<Recording_Assets_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recording_Assets_Max_Order_By>;
  min?: InputMaybe<Recording_Assets_Min_Order_By>;
  stddev?: InputMaybe<Recording_Assets_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recording_Assets_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recording_Assets_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recording_Assets_Sum_Order_By>;
  var_pop?: InputMaybe<Recording_Assets_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recording_Assets_Var_Samp_Order_By>;
  variance?: InputMaybe<Recording_Assets_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recording_assets" */
export type Recording_Assets_Arr_Rel_Insert_Input = {
  data: Array<Recording_Assets_Insert_Input>;
  on_conflict?: InputMaybe<Recording_Assets_On_Conflict>;
};

/** aggregate avg on columns */
export type Recording_Assets_Avg_Fields = {
  __typename?: 'recording_assets_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "recording_assets" */
export type Recording_Assets_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recording_assets". All fields are combined with a logical 'AND'. */
export type Recording_Assets_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Recording_Assets_Bool_Exp>>>;
  _not?: InputMaybe<Recording_Assets_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Recording_Assets_Bool_Exp>>>;
  asset_id?: InputMaybe<String_Comparison_Exp>;
  controller_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  recording_id?: InputMaybe<String_Comparison_Exp>;
  size?: InputMaybe<Bigint_Comparison_Exp>;
  state?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  written_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "recording_assets" */
export enum Recording_Assets_Constraint {
  /** unique or primary key constraint */
  RecordingAssetsAssetIdKey = 'recording_assets_asset_id_key',
  /** unique or primary key constraint */
  RecordingAssetsPkey = 'recording_assets_pkey'
}

/** input type for incrementing integer column in table "recording_assets" */
export type Recording_Assets_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "recording_assets" */
export type Recording_Assets_Insert_Input = {
  asset_id?: InputMaybe<Scalars['String']['input']>;
  controller_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  recording_id?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['bigint']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  written_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Recording_Assets_Max_Fields = {
  __typename?: 'recording_assets_max_fields';
  asset_id?: Maybe<Scalars['String']['output']>;
  controller_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  recording_id?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['bigint']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  written_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "recording_assets" */
export type Recording_Assets_Max_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  controller_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  written_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recording_Assets_Min_Fields = {
  __typename?: 'recording_assets_min_fields';
  asset_id?: Maybe<Scalars['String']['output']>;
  controller_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  recording_id?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['bigint']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  written_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "recording_assets" */
export type Recording_Assets_Min_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  controller_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  written_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recording_assets" */
export type Recording_Assets_Mutation_Response = {
  __typename?: 'recording_assets_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Recording_Assets>;
};

/** input type for inserting object relation for remote table "recording_assets" */
export type Recording_Assets_Obj_Rel_Insert_Input = {
  data: Recording_Assets_Insert_Input;
  on_conflict?: InputMaybe<Recording_Assets_On_Conflict>;
};

/** on conflict condition type for table "recording_assets" */
export type Recording_Assets_On_Conflict = {
  constraint: Recording_Assets_Constraint;
  update_columns: Array<Recording_Assets_Update_Column>;
  where?: InputMaybe<Recording_Assets_Bool_Exp>;
};

/** ordering options when selecting data from "recording_assets" */
export type Recording_Assets_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  controller_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  written_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "recording_assets" */
export type Recording_Assets_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "recording_assets" */
export enum Recording_Assets_Select_Column {
  /** column name */
  AssetId = 'asset_id',
  /** column name */
  ControllerId = 'controller_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Size = 'size',
  /** column name */
  State = 'state',
  /** column name */
  Type = 'type',
  /** column name */
  WrittenAt = 'written_at'
}

/** input type for updating data in table "recording_assets" */
export type Recording_Assets_Set_Input = {
  asset_id?: InputMaybe<Scalars['String']['input']>;
  controller_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  recording_id?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['bigint']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  written_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Recording_Assets_Stddev_Fields = {
  __typename?: 'recording_assets_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "recording_assets" */
export type Recording_Assets_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recording_Assets_Stddev_Pop_Fields = {
  __typename?: 'recording_assets_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "recording_assets" */
export type Recording_Assets_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recording_Assets_Stddev_Samp_Fields = {
  __typename?: 'recording_assets_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "recording_assets" */
export type Recording_Assets_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recording_Assets_Sum_Fields = {
  __typename?: 'recording_assets_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "recording_assets" */
export type Recording_Assets_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** update columns of table "recording_assets" */
export enum Recording_Assets_Update_Column {
  /** column name */
  AssetId = 'asset_id',
  /** column name */
  ControllerId = 'controller_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Size = 'size',
  /** column name */
  State = 'state',
  /** column name */
  Type = 'type',
  /** column name */
  WrittenAt = 'written_at'
}

/** aggregate var_pop on columns */
export type Recording_Assets_Var_Pop_Fields = {
  __typename?: 'recording_assets_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "recording_assets" */
export type Recording_Assets_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recording_Assets_Var_Samp_Fields = {
  __typename?: 'recording_assets_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "recording_assets" */
export type Recording_Assets_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recording_Assets_Variance_Fields = {
  __typename?: 'recording_assets_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "recording_assets" */
export type Recording_Assets_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** columns and relationships of "recording_checkpoints" */
export type Recording_Checkpoints = {
  __typename?: 'recording_checkpoints';
  checkpoint: Scalars['Int']['output'];
  created_at: Scalars['timestamptz']['output'];
  elapsed: Scalars['bigint']['output'];
  flushed?: Maybe<Scalars['Boolean']['output']>;
  progress: Scalars['bigint']['output'];
  recording_id: Scalars['uuid']['output'];
  recording_length: Scalars['bigint']['output'];
  time: Scalars['bigint']['output'];
};

/** aggregated selection of "recording_checkpoints" */
export type Recording_Checkpoints_Aggregate = {
  __typename?: 'recording_checkpoints_aggregate';
  aggregate?: Maybe<Recording_Checkpoints_Aggregate_Fields>;
  nodes: Array<Recording_Checkpoints>;
};

/** aggregate fields of "recording_checkpoints" */
export type Recording_Checkpoints_Aggregate_Fields = {
  __typename?: 'recording_checkpoints_aggregate_fields';
  avg?: Maybe<Recording_Checkpoints_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Recording_Checkpoints_Max_Fields>;
  min?: Maybe<Recording_Checkpoints_Min_Fields>;
  stddev?: Maybe<Recording_Checkpoints_Stddev_Fields>;
  stddev_pop?: Maybe<Recording_Checkpoints_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recording_Checkpoints_Stddev_Samp_Fields>;
  sum?: Maybe<Recording_Checkpoints_Sum_Fields>;
  var_pop?: Maybe<Recording_Checkpoints_Var_Pop_Fields>;
  var_samp?: Maybe<Recording_Checkpoints_Var_Samp_Fields>;
  variance?: Maybe<Recording_Checkpoints_Variance_Fields>;
};


/** aggregate fields of "recording_checkpoints" */
export type Recording_Checkpoints_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recording_Checkpoints_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recording_checkpoints" */
export type Recording_Checkpoints_Aggregate_Order_By = {
  avg?: InputMaybe<Recording_Checkpoints_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recording_Checkpoints_Max_Order_By>;
  min?: InputMaybe<Recording_Checkpoints_Min_Order_By>;
  stddev?: InputMaybe<Recording_Checkpoints_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recording_Checkpoints_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recording_Checkpoints_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recording_Checkpoints_Sum_Order_By>;
  var_pop?: InputMaybe<Recording_Checkpoints_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recording_Checkpoints_Var_Samp_Order_By>;
  variance?: InputMaybe<Recording_Checkpoints_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recording_checkpoints" */
export type Recording_Checkpoints_Arr_Rel_Insert_Input = {
  data: Array<Recording_Checkpoints_Insert_Input>;
  on_conflict?: InputMaybe<Recording_Checkpoints_On_Conflict>;
};

/** aggregate avg on columns */
export type Recording_Checkpoints_Avg_Fields = {
  __typename?: 'recording_checkpoints_avg_fields';
  checkpoint?: Maybe<Scalars['Float']['output']>;
  elapsed?: Maybe<Scalars['Float']['output']>;
  progress?: Maybe<Scalars['Float']['output']>;
  recording_length?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "recording_checkpoints" */
export type Recording_Checkpoints_Avg_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  elapsed?: InputMaybe<Order_By>;
  progress?: InputMaybe<Order_By>;
  recording_length?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recording_checkpoints". All fields are combined with a logical 'AND'. */
export type Recording_Checkpoints_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Recording_Checkpoints_Bool_Exp>>>;
  _not?: InputMaybe<Recording_Checkpoints_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Recording_Checkpoints_Bool_Exp>>>;
  checkpoint?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  elapsed?: InputMaybe<Bigint_Comparison_Exp>;
  flushed?: InputMaybe<Boolean_Comparison_Exp>;
  progress?: InputMaybe<Bigint_Comparison_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  recording_length?: InputMaybe<Bigint_Comparison_Exp>;
  time?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "recording_checkpoints" */
export enum Recording_Checkpoints_Constraint {
  /** unique or primary key constraint */
  RecordingCheckpointsPkey = 'recording_checkpoints_pkey'
}

/** input type for incrementing integer column in table "recording_checkpoints" */
export type Recording_Checkpoints_Inc_Input = {
  checkpoint?: InputMaybe<Scalars['Int']['input']>;
  elapsed?: InputMaybe<Scalars['bigint']['input']>;
  progress?: InputMaybe<Scalars['bigint']['input']>;
  recording_length?: InputMaybe<Scalars['bigint']['input']>;
  time?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "recording_checkpoints" */
export type Recording_Checkpoints_Insert_Input = {
  checkpoint?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  elapsed?: InputMaybe<Scalars['bigint']['input']>;
  flushed?: InputMaybe<Scalars['Boolean']['input']>;
  progress?: InputMaybe<Scalars['bigint']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  recording_length?: InputMaybe<Scalars['bigint']['input']>;
  time?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate max on columns */
export type Recording_Checkpoints_Max_Fields = {
  __typename?: 'recording_checkpoints_max_fields';
  checkpoint?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  elapsed?: Maybe<Scalars['bigint']['output']>;
  progress?: Maybe<Scalars['bigint']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  recording_length?: Maybe<Scalars['bigint']['output']>;
  time?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "recording_checkpoints" */
export type Recording_Checkpoints_Max_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  elapsed?: InputMaybe<Order_By>;
  progress?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  recording_length?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recording_Checkpoints_Min_Fields = {
  __typename?: 'recording_checkpoints_min_fields';
  checkpoint?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  elapsed?: Maybe<Scalars['bigint']['output']>;
  progress?: Maybe<Scalars['bigint']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  recording_length?: Maybe<Scalars['bigint']['output']>;
  time?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "recording_checkpoints" */
export type Recording_Checkpoints_Min_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  elapsed?: InputMaybe<Order_By>;
  progress?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  recording_length?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recording_checkpoints" */
export type Recording_Checkpoints_Mutation_Response = {
  __typename?: 'recording_checkpoints_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Recording_Checkpoints>;
};

/** input type for inserting object relation for remote table "recording_checkpoints" */
export type Recording_Checkpoints_Obj_Rel_Insert_Input = {
  data: Recording_Checkpoints_Insert_Input;
  on_conflict?: InputMaybe<Recording_Checkpoints_On_Conflict>;
};

/** on conflict condition type for table "recording_checkpoints" */
export type Recording_Checkpoints_On_Conflict = {
  constraint: Recording_Checkpoints_Constraint;
  update_columns: Array<Recording_Checkpoints_Update_Column>;
  where?: InputMaybe<Recording_Checkpoints_Bool_Exp>;
};

/** ordering options when selecting data from "recording_checkpoints" */
export type Recording_Checkpoints_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  elapsed?: InputMaybe<Order_By>;
  flushed?: InputMaybe<Order_By>;
  progress?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  recording_length?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "recording_checkpoints" */
export type Recording_Checkpoints_Pk_Columns_Input = {
  checkpoint: Scalars['Int']['input'];
  recording_id: Scalars['uuid']['input'];
};

/** select columns of table "recording_checkpoints" */
export enum Recording_Checkpoints_Select_Column {
  /** column name */
  Checkpoint = 'checkpoint',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Elapsed = 'elapsed',
  /** column name */
  Flushed = 'flushed',
  /** column name */
  Progress = 'progress',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  RecordingLength = 'recording_length',
  /** column name */
  Time = 'time'
}

/** input type for updating data in table "recording_checkpoints" */
export type Recording_Checkpoints_Set_Input = {
  checkpoint?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  elapsed?: InputMaybe<Scalars['bigint']['input']>;
  flushed?: InputMaybe<Scalars['Boolean']['input']>;
  progress?: InputMaybe<Scalars['bigint']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  recording_length?: InputMaybe<Scalars['bigint']['input']>;
  time?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate stddev on columns */
export type Recording_Checkpoints_Stddev_Fields = {
  __typename?: 'recording_checkpoints_stddev_fields';
  checkpoint?: Maybe<Scalars['Float']['output']>;
  elapsed?: Maybe<Scalars['Float']['output']>;
  progress?: Maybe<Scalars['Float']['output']>;
  recording_length?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "recording_checkpoints" */
export type Recording_Checkpoints_Stddev_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  elapsed?: InputMaybe<Order_By>;
  progress?: InputMaybe<Order_By>;
  recording_length?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recording_Checkpoints_Stddev_Pop_Fields = {
  __typename?: 'recording_checkpoints_stddev_pop_fields';
  checkpoint?: Maybe<Scalars['Float']['output']>;
  elapsed?: Maybe<Scalars['Float']['output']>;
  progress?: Maybe<Scalars['Float']['output']>;
  recording_length?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "recording_checkpoints" */
export type Recording_Checkpoints_Stddev_Pop_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  elapsed?: InputMaybe<Order_By>;
  progress?: InputMaybe<Order_By>;
  recording_length?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recording_Checkpoints_Stddev_Samp_Fields = {
  __typename?: 'recording_checkpoints_stddev_samp_fields';
  checkpoint?: Maybe<Scalars['Float']['output']>;
  elapsed?: Maybe<Scalars['Float']['output']>;
  progress?: Maybe<Scalars['Float']['output']>;
  recording_length?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "recording_checkpoints" */
export type Recording_Checkpoints_Stddev_Samp_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  elapsed?: InputMaybe<Order_By>;
  progress?: InputMaybe<Order_By>;
  recording_length?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recording_Checkpoints_Sum_Fields = {
  __typename?: 'recording_checkpoints_sum_fields';
  checkpoint?: Maybe<Scalars['Int']['output']>;
  elapsed?: Maybe<Scalars['bigint']['output']>;
  progress?: Maybe<Scalars['bigint']['output']>;
  recording_length?: Maybe<Scalars['bigint']['output']>;
  time?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "recording_checkpoints" */
export type Recording_Checkpoints_Sum_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  elapsed?: InputMaybe<Order_By>;
  progress?: InputMaybe<Order_By>;
  recording_length?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** update columns of table "recording_checkpoints" */
export enum Recording_Checkpoints_Update_Column {
  /** column name */
  Checkpoint = 'checkpoint',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Elapsed = 'elapsed',
  /** column name */
  Flushed = 'flushed',
  /** column name */
  Progress = 'progress',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  RecordingLength = 'recording_length',
  /** column name */
  Time = 'time'
}

/** aggregate var_pop on columns */
export type Recording_Checkpoints_Var_Pop_Fields = {
  __typename?: 'recording_checkpoints_var_pop_fields';
  checkpoint?: Maybe<Scalars['Float']['output']>;
  elapsed?: Maybe<Scalars['Float']['output']>;
  progress?: Maybe<Scalars['Float']['output']>;
  recording_length?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "recording_checkpoints" */
export type Recording_Checkpoints_Var_Pop_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  elapsed?: InputMaybe<Order_By>;
  progress?: InputMaybe<Order_By>;
  recording_length?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recording_Checkpoints_Var_Samp_Fields = {
  __typename?: 'recording_checkpoints_var_samp_fields';
  checkpoint?: Maybe<Scalars['Float']['output']>;
  elapsed?: Maybe<Scalars['Float']['output']>;
  progress?: Maybe<Scalars['Float']['output']>;
  recording_length?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "recording_checkpoints" */
export type Recording_Checkpoints_Var_Samp_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  elapsed?: InputMaybe<Order_By>;
  progress?: InputMaybe<Order_By>;
  recording_length?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recording_Checkpoints_Variance_Fields = {
  __typename?: 'recording_checkpoints_variance_fields';
  checkpoint?: Maybe<Scalars['Float']['output']>;
  elapsed?: Maybe<Scalars['Float']['output']>;
  progress?: Maybe<Scalars['Float']['output']>;
  recording_length?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "recording_checkpoints" */
export type Recording_Checkpoints_Variance_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  elapsed?: InputMaybe<Order_By>;
  progress?: InputMaybe<Order_By>;
  recording_length?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** columns and relationships of "recording_originalsources" */
export type Recording_Originalsources = {
  __typename?: 'recording_originalsources';
  content_hash: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  offset: Scalars['Int']['output'];
  sourcemap_id: Scalars['uuid']['output'];
};

/** aggregated selection of "recording_originalsources" */
export type Recording_Originalsources_Aggregate = {
  __typename?: 'recording_originalsources_aggregate';
  aggregate?: Maybe<Recording_Originalsources_Aggregate_Fields>;
  nodes: Array<Recording_Originalsources>;
};

/** aggregate fields of "recording_originalsources" */
export type Recording_Originalsources_Aggregate_Fields = {
  __typename?: 'recording_originalsources_aggregate_fields';
  avg?: Maybe<Recording_Originalsources_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Recording_Originalsources_Max_Fields>;
  min?: Maybe<Recording_Originalsources_Min_Fields>;
  stddev?: Maybe<Recording_Originalsources_Stddev_Fields>;
  stddev_pop?: Maybe<Recording_Originalsources_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recording_Originalsources_Stddev_Samp_Fields>;
  sum?: Maybe<Recording_Originalsources_Sum_Fields>;
  var_pop?: Maybe<Recording_Originalsources_Var_Pop_Fields>;
  var_samp?: Maybe<Recording_Originalsources_Var_Samp_Fields>;
  variance?: Maybe<Recording_Originalsources_Variance_Fields>;
};


/** aggregate fields of "recording_originalsources" */
export type Recording_Originalsources_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recording_Originalsources_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recording_originalsources" */
export type Recording_Originalsources_Aggregate_Order_By = {
  avg?: InputMaybe<Recording_Originalsources_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recording_Originalsources_Max_Order_By>;
  min?: InputMaybe<Recording_Originalsources_Min_Order_By>;
  stddev?: InputMaybe<Recording_Originalsources_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recording_Originalsources_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recording_Originalsources_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recording_Originalsources_Sum_Order_By>;
  var_pop?: InputMaybe<Recording_Originalsources_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recording_Originalsources_Var_Samp_Order_By>;
  variance?: InputMaybe<Recording_Originalsources_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recording_originalsources" */
export type Recording_Originalsources_Arr_Rel_Insert_Input = {
  data: Array<Recording_Originalsources_Insert_Input>;
  on_conflict?: InputMaybe<Recording_Originalsources_On_Conflict>;
};

/** aggregate avg on columns */
export type Recording_Originalsources_Avg_Fields = {
  __typename?: 'recording_originalsources_avg_fields';
  offset?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "recording_originalsources" */
export type Recording_Originalsources_Avg_Order_By = {
  offset?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recording_originalsources". All fields are combined with a logical 'AND'. */
export type Recording_Originalsources_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Recording_Originalsources_Bool_Exp>>>;
  _not?: InputMaybe<Recording_Originalsources_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Recording_Originalsources_Bool_Exp>>>;
  content_hash?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  offset?: InputMaybe<Int_Comparison_Exp>;
  sourcemap_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "recording_originalsources" */
export enum Recording_Originalsources_Constraint {
  /** unique or primary key constraint */
  RecordingOriginalsourcesPkey = 'recording_originalsources_pkey'
}

/** input type for incrementing integer column in table "recording_originalsources" */
export type Recording_Originalsources_Inc_Input = {
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "recording_originalsources" */
export type Recording_Originalsources_Insert_Input = {
  content_hash?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sourcemap_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Recording_Originalsources_Max_Fields = {
  __typename?: 'recording_originalsources_max_fields';
  content_hash?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  sourcemap_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "recording_originalsources" */
export type Recording_Originalsources_Max_Order_By = {
  content_hash?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  offset?: InputMaybe<Order_By>;
  sourcemap_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recording_Originalsources_Min_Fields = {
  __typename?: 'recording_originalsources_min_fields';
  content_hash?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  sourcemap_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "recording_originalsources" */
export type Recording_Originalsources_Min_Order_By = {
  content_hash?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  offset?: InputMaybe<Order_By>;
  sourcemap_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recording_originalsources" */
export type Recording_Originalsources_Mutation_Response = {
  __typename?: 'recording_originalsources_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Recording_Originalsources>;
};

/** input type for inserting object relation for remote table "recording_originalsources" */
export type Recording_Originalsources_Obj_Rel_Insert_Input = {
  data: Recording_Originalsources_Insert_Input;
  on_conflict?: InputMaybe<Recording_Originalsources_On_Conflict>;
};

/** on conflict condition type for table "recording_originalsources" */
export type Recording_Originalsources_On_Conflict = {
  constraint: Recording_Originalsources_Constraint;
  update_columns: Array<Recording_Originalsources_Update_Column>;
  where?: InputMaybe<Recording_Originalsources_Bool_Exp>;
};

/** ordering options when selecting data from "recording_originalsources" */
export type Recording_Originalsources_Order_By = {
  content_hash?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  offset?: InputMaybe<Order_By>;
  sourcemap_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "recording_originalsources" */
export type Recording_Originalsources_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "recording_originalsources" */
export enum Recording_Originalsources_Select_Column {
  /** column name */
  ContentHash = 'content_hash',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Offset = 'offset',
  /** column name */
  SourcemapId = 'sourcemap_id'
}

/** input type for updating data in table "recording_originalsources" */
export type Recording_Originalsources_Set_Input = {
  content_hash?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sourcemap_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Recording_Originalsources_Stddev_Fields = {
  __typename?: 'recording_originalsources_stddev_fields';
  offset?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "recording_originalsources" */
export type Recording_Originalsources_Stddev_Order_By = {
  offset?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recording_Originalsources_Stddev_Pop_Fields = {
  __typename?: 'recording_originalsources_stddev_pop_fields';
  offset?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "recording_originalsources" */
export type Recording_Originalsources_Stddev_Pop_Order_By = {
  offset?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recording_Originalsources_Stddev_Samp_Fields = {
  __typename?: 'recording_originalsources_stddev_samp_fields';
  offset?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "recording_originalsources" */
export type Recording_Originalsources_Stddev_Samp_Order_By = {
  offset?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recording_Originalsources_Sum_Fields = {
  __typename?: 'recording_originalsources_sum_fields';
  offset?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "recording_originalsources" */
export type Recording_Originalsources_Sum_Order_By = {
  offset?: InputMaybe<Order_By>;
};

/** update columns of table "recording_originalsources" */
export enum Recording_Originalsources_Update_Column {
  /** column name */
  ContentHash = 'content_hash',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Offset = 'offset',
  /** column name */
  SourcemapId = 'sourcemap_id'
}

/** aggregate var_pop on columns */
export type Recording_Originalsources_Var_Pop_Fields = {
  __typename?: 'recording_originalsources_var_pop_fields';
  offset?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "recording_originalsources" */
export type Recording_Originalsources_Var_Pop_Order_By = {
  offset?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recording_Originalsources_Var_Samp_Fields = {
  __typename?: 'recording_originalsources_var_samp_fields';
  offset?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "recording_originalsources" */
export type Recording_Originalsources_Var_Samp_Order_By = {
  offset?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recording_Originalsources_Variance_Fields = {
  __typename?: 'recording_originalsources_variance_fields';
  offset?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "recording_originalsources" */
export type Recording_Originalsources_Variance_Order_By = {
  offset?: InputMaybe<Order_By>;
};

/** columns and relationships of "recording_points" */
export type Recording_Points = {
  __typename?: 'recording_points';
  badge?: Maybe<Scalars['String']['output']>;
  condition?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  key: Scalars['String']['output'];
  /** An object relationship */
  recording: Recordings;
  recording_id: Scalars['uuid']['output'];
  scope?: Maybe<Scalars['String']['output']>;
  source_location: Scalars['jsonb']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};


/** columns and relationships of "recording_points" */
export type Recording_PointsSource_LocationArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "recording_points" */
export type Recording_Points_Aggregate = {
  __typename?: 'recording_points_aggregate';
  aggregate?: Maybe<Recording_Points_Aggregate_Fields>;
  nodes: Array<Recording_Points>;
};

/** aggregate fields of "recording_points" */
export type Recording_Points_Aggregate_Fields = {
  __typename?: 'recording_points_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Recording_Points_Max_Fields>;
  min?: Maybe<Recording_Points_Min_Fields>;
};


/** aggregate fields of "recording_points" */
export type Recording_Points_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recording_Points_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recording_points" */
export type Recording_Points_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recording_Points_Max_Order_By>;
  min?: InputMaybe<Recording_Points_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Recording_Points_Append_Input = {
  source_location?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "recording_points" */
export type Recording_Points_Arr_Rel_Insert_Input = {
  data: Array<Recording_Points_Insert_Input>;
  on_conflict?: InputMaybe<Recording_Points_On_Conflict>;
};

/** Boolean expression to filter rows from the table "recording_points". All fields are combined with a logical 'AND'. */
export type Recording_Points_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Recording_Points_Bool_Exp>>>;
  _not?: InputMaybe<Recording_Points_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Recording_Points_Bool_Exp>>>;
  badge?: InputMaybe<String_Comparison_Exp>;
  condition?: InputMaybe<String_Comparison_Exp>;
  content?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  key?: InputMaybe<String_Comparison_Exp>;
  recording?: InputMaybe<Recordings_Bool_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  scope?: InputMaybe<String_Comparison_Exp>;
  source_location?: InputMaybe<Jsonb_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "recording_points" */
export enum Recording_Points_Constraint {
  /** unique or primary key constraint */
  PointsKeyRecordingIdKey = 'points_key_recording_id_key',
  /** unique or primary key constraint */
  PointsPkey = 'points_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Recording_Points_Delete_At_Path_Input = {
  source_location?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Recording_Points_Delete_Elem_Input = {
  source_location?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Recording_Points_Delete_Key_Input = {
  source_location?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "recording_points" */
export type Recording_Points_Insert_Input = {
  badge?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  recording?: InputMaybe<Recordings_Obj_Rel_Insert_Input>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  source_location?: InputMaybe<Scalars['jsonb']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Recording_Points_Max_Fields = {
  __typename?: 'recording_points_max_fields';
  badge?: Maybe<Scalars['String']['output']>;
  condition?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "recording_points" */
export type Recording_Points_Max_Order_By = {
  badge?: InputMaybe<Order_By>;
  condition?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recording_Points_Min_Fields = {
  __typename?: 'recording_points_min_fields';
  badge?: Maybe<Scalars['String']['output']>;
  condition?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "recording_points" */
export type Recording_Points_Min_Order_By = {
  badge?: InputMaybe<Order_By>;
  condition?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recording_points" */
export type Recording_Points_Mutation_Response = {
  __typename?: 'recording_points_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Recording_Points>;
};

/** input type for inserting object relation for remote table "recording_points" */
export type Recording_Points_Obj_Rel_Insert_Input = {
  data: Recording_Points_Insert_Input;
  on_conflict?: InputMaybe<Recording_Points_On_Conflict>;
};

/** on conflict condition type for table "recording_points" */
export type Recording_Points_On_Conflict = {
  constraint: Recording_Points_Constraint;
  update_columns: Array<Recording_Points_Update_Column>;
  where?: InputMaybe<Recording_Points_Bool_Exp>;
};

/** ordering options when selecting data from "recording_points" */
export type Recording_Points_Order_By = {
  badge?: InputMaybe<Order_By>;
  condition?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  recording?: InputMaybe<Recordings_Order_By>;
  recording_id?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  source_location?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "recording_points" */
export type Recording_Points_Pk_Columns_Input = {
  key: Scalars['String']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Recording_Points_Prepend_Input = {
  source_location?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "recording_points" */
export enum Recording_Points_Select_Column {
  /** column name */
  Badge = 'badge',
  /** column name */
  Condition = 'condition',
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Key = 'key',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Scope = 'scope',
  /** column name */
  SourceLocation = 'source_location',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "recording_points" */
export type Recording_Points_Set_Input = {
  badge?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  source_location?: InputMaybe<Scalars['jsonb']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "recording_points" */
export enum Recording_Points_Update_Column {
  /** column name */
  Badge = 'badge',
  /** column name */
  Condition = 'condition',
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Key = 'key',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Scope = 'scope',
  /** column name */
  SourceLocation = 'source_location',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "recording_regions" */
export type Recording_Regions = {
  __typename?: 'recording_regions';
  created_at: Scalars['timestamptz']['output'];
  end_time: Scalars['Int']['output'];
  endpoint_checkpoint: Scalars['Int']['output'];
  endpoint_progress: Scalars['bigint']['output'];
  recording_id: Scalars['String']['output'];
  region_idx: Scalars['Int']['output'];
  segment_start: Scalars['Boolean']['output'];
  start_time: Scalars['Int']['output'];
  startpoint_checkpoint: Scalars['Int']['output'];
  startpoint_progress: Scalars['bigint']['output'];
};

/** aggregated selection of "recording_regions" */
export type Recording_Regions_Aggregate = {
  __typename?: 'recording_regions_aggregate';
  aggregate?: Maybe<Recording_Regions_Aggregate_Fields>;
  nodes: Array<Recording_Regions>;
};

/** aggregate fields of "recording_regions" */
export type Recording_Regions_Aggregate_Fields = {
  __typename?: 'recording_regions_aggregate_fields';
  avg?: Maybe<Recording_Regions_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Recording_Regions_Max_Fields>;
  min?: Maybe<Recording_Regions_Min_Fields>;
  stddev?: Maybe<Recording_Regions_Stddev_Fields>;
  stddev_pop?: Maybe<Recording_Regions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recording_Regions_Stddev_Samp_Fields>;
  sum?: Maybe<Recording_Regions_Sum_Fields>;
  var_pop?: Maybe<Recording_Regions_Var_Pop_Fields>;
  var_samp?: Maybe<Recording_Regions_Var_Samp_Fields>;
  variance?: Maybe<Recording_Regions_Variance_Fields>;
};


/** aggregate fields of "recording_regions" */
export type Recording_Regions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recording_Regions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recording_regions" */
export type Recording_Regions_Aggregate_Order_By = {
  avg?: InputMaybe<Recording_Regions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recording_Regions_Max_Order_By>;
  min?: InputMaybe<Recording_Regions_Min_Order_By>;
  stddev?: InputMaybe<Recording_Regions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recording_Regions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recording_Regions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recording_Regions_Sum_Order_By>;
  var_pop?: InputMaybe<Recording_Regions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recording_Regions_Var_Samp_Order_By>;
  variance?: InputMaybe<Recording_Regions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recording_regions" */
export type Recording_Regions_Arr_Rel_Insert_Input = {
  data: Array<Recording_Regions_Insert_Input>;
  on_conflict?: InputMaybe<Recording_Regions_On_Conflict>;
};

/** aggregate avg on columns */
export type Recording_Regions_Avg_Fields = {
  __typename?: 'recording_regions_avg_fields';
  end_time?: Maybe<Scalars['Float']['output']>;
  endpoint_checkpoint?: Maybe<Scalars['Float']['output']>;
  endpoint_progress?: Maybe<Scalars['Float']['output']>;
  region_idx?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
  startpoint_checkpoint?: Maybe<Scalars['Float']['output']>;
  startpoint_progress?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "recording_regions" */
export type Recording_Regions_Avg_Order_By = {
  end_time?: InputMaybe<Order_By>;
  endpoint_checkpoint?: InputMaybe<Order_By>;
  endpoint_progress?: InputMaybe<Order_By>;
  region_idx?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  startpoint_checkpoint?: InputMaybe<Order_By>;
  startpoint_progress?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recording_regions". All fields are combined with a logical 'AND'. */
export type Recording_Regions_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Recording_Regions_Bool_Exp>>>;
  _not?: InputMaybe<Recording_Regions_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Recording_Regions_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_time?: InputMaybe<Int_Comparison_Exp>;
  endpoint_checkpoint?: InputMaybe<Int_Comparison_Exp>;
  endpoint_progress?: InputMaybe<Bigint_Comparison_Exp>;
  recording_id?: InputMaybe<String_Comparison_Exp>;
  region_idx?: InputMaybe<Int_Comparison_Exp>;
  segment_start?: InputMaybe<Boolean_Comparison_Exp>;
  start_time?: InputMaybe<Int_Comparison_Exp>;
  startpoint_checkpoint?: InputMaybe<Int_Comparison_Exp>;
  startpoint_progress?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "recording_regions" */
export enum Recording_Regions_Constraint {
  /** unique or primary key constraint */
  RecordingRegionsPkey = 'recording_regions_pkey'
}

/** input type for incrementing integer column in table "recording_regions" */
export type Recording_Regions_Inc_Input = {
  end_time?: InputMaybe<Scalars['Int']['input']>;
  endpoint_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  endpoint_progress?: InputMaybe<Scalars['bigint']['input']>;
  region_idx?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['Int']['input']>;
  startpoint_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  startpoint_progress?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "recording_regions" */
export type Recording_Regions_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  end_time?: InputMaybe<Scalars['Int']['input']>;
  endpoint_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  endpoint_progress?: InputMaybe<Scalars['bigint']['input']>;
  recording_id?: InputMaybe<Scalars['String']['input']>;
  region_idx?: InputMaybe<Scalars['Int']['input']>;
  segment_start?: InputMaybe<Scalars['Boolean']['input']>;
  start_time?: InputMaybe<Scalars['Int']['input']>;
  startpoint_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  startpoint_progress?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate max on columns */
export type Recording_Regions_Max_Fields = {
  __typename?: 'recording_regions_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  end_time?: Maybe<Scalars['Int']['output']>;
  endpoint_checkpoint?: Maybe<Scalars['Int']['output']>;
  endpoint_progress?: Maybe<Scalars['bigint']['output']>;
  recording_id?: Maybe<Scalars['String']['output']>;
  region_idx?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['Int']['output']>;
  startpoint_checkpoint?: Maybe<Scalars['Int']['output']>;
  startpoint_progress?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "recording_regions" */
export type Recording_Regions_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  endpoint_checkpoint?: InputMaybe<Order_By>;
  endpoint_progress?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  region_idx?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  startpoint_checkpoint?: InputMaybe<Order_By>;
  startpoint_progress?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recording_Regions_Min_Fields = {
  __typename?: 'recording_regions_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  end_time?: Maybe<Scalars['Int']['output']>;
  endpoint_checkpoint?: Maybe<Scalars['Int']['output']>;
  endpoint_progress?: Maybe<Scalars['bigint']['output']>;
  recording_id?: Maybe<Scalars['String']['output']>;
  region_idx?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['Int']['output']>;
  startpoint_checkpoint?: Maybe<Scalars['Int']['output']>;
  startpoint_progress?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "recording_regions" */
export type Recording_Regions_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  endpoint_checkpoint?: InputMaybe<Order_By>;
  endpoint_progress?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  region_idx?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  startpoint_checkpoint?: InputMaybe<Order_By>;
  startpoint_progress?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recording_regions" */
export type Recording_Regions_Mutation_Response = {
  __typename?: 'recording_regions_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Recording_Regions>;
};

/** input type for inserting object relation for remote table "recording_regions" */
export type Recording_Regions_Obj_Rel_Insert_Input = {
  data: Recording_Regions_Insert_Input;
  on_conflict?: InputMaybe<Recording_Regions_On_Conflict>;
};

/** on conflict condition type for table "recording_regions" */
export type Recording_Regions_On_Conflict = {
  constraint: Recording_Regions_Constraint;
  update_columns: Array<Recording_Regions_Update_Column>;
  where?: InputMaybe<Recording_Regions_Bool_Exp>;
};

/** ordering options when selecting data from "recording_regions" */
export type Recording_Regions_Order_By = {
  created_at?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  endpoint_checkpoint?: InputMaybe<Order_By>;
  endpoint_progress?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  region_idx?: InputMaybe<Order_By>;
  segment_start?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  startpoint_checkpoint?: InputMaybe<Order_By>;
  startpoint_progress?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "recording_regions" */
export type Recording_Regions_Pk_Columns_Input = {
  recording_id: Scalars['String']['input'];
  region_idx: Scalars['Int']['input'];
};

/** select columns of table "recording_regions" */
export enum Recording_Regions_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  EndpointCheckpoint = 'endpoint_checkpoint',
  /** column name */
  EndpointProgress = 'endpoint_progress',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  RegionIdx = 'region_idx',
  /** column name */
  SegmentStart = 'segment_start',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  StartpointCheckpoint = 'startpoint_checkpoint',
  /** column name */
  StartpointProgress = 'startpoint_progress'
}

/** input type for updating data in table "recording_regions" */
export type Recording_Regions_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  end_time?: InputMaybe<Scalars['Int']['input']>;
  endpoint_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  endpoint_progress?: InputMaybe<Scalars['bigint']['input']>;
  recording_id?: InputMaybe<Scalars['String']['input']>;
  region_idx?: InputMaybe<Scalars['Int']['input']>;
  segment_start?: InputMaybe<Scalars['Boolean']['input']>;
  start_time?: InputMaybe<Scalars['Int']['input']>;
  startpoint_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  startpoint_progress?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate stddev on columns */
export type Recording_Regions_Stddev_Fields = {
  __typename?: 'recording_regions_stddev_fields';
  end_time?: Maybe<Scalars['Float']['output']>;
  endpoint_checkpoint?: Maybe<Scalars['Float']['output']>;
  endpoint_progress?: Maybe<Scalars['Float']['output']>;
  region_idx?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
  startpoint_checkpoint?: Maybe<Scalars['Float']['output']>;
  startpoint_progress?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "recording_regions" */
export type Recording_Regions_Stddev_Order_By = {
  end_time?: InputMaybe<Order_By>;
  endpoint_checkpoint?: InputMaybe<Order_By>;
  endpoint_progress?: InputMaybe<Order_By>;
  region_idx?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  startpoint_checkpoint?: InputMaybe<Order_By>;
  startpoint_progress?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recording_Regions_Stddev_Pop_Fields = {
  __typename?: 'recording_regions_stddev_pop_fields';
  end_time?: Maybe<Scalars['Float']['output']>;
  endpoint_checkpoint?: Maybe<Scalars['Float']['output']>;
  endpoint_progress?: Maybe<Scalars['Float']['output']>;
  region_idx?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
  startpoint_checkpoint?: Maybe<Scalars['Float']['output']>;
  startpoint_progress?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "recording_regions" */
export type Recording_Regions_Stddev_Pop_Order_By = {
  end_time?: InputMaybe<Order_By>;
  endpoint_checkpoint?: InputMaybe<Order_By>;
  endpoint_progress?: InputMaybe<Order_By>;
  region_idx?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  startpoint_checkpoint?: InputMaybe<Order_By>;
  startpoint_progress?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recording_Regions_Stddev_Samp_Fields = {
  __typename?: 'recording_regions_stddev_samp_fields';
  end_time?: Maybe<Scalars['Float']['output']>;
  endpoint_checkpoint?: Maybe<Scalars['Float']['output']>;
  endpoint_progress?: Maybe<Scalars['Float']['output']>;
  region_idx?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
  startpoint_checkpoint?: Maybe<Scalars['Float']['output']>;
  startpoint_progress?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "recording_regions" */
export type Recording_Regions_Stddev_Samp_Order_By = {
  end_time?: InputMaybe<Order_By>;
  endpoint_checkpoint?: InputMaybe<Order_By>;
  endpoint_progress?: InputMaybe<Order_By>;
  region_idx?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  startpoint_checkpoint?: InputMaybe<Order_By>;
  startpoint_progress?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recording_Regions_Sum_Fields = {
  __typename?: 'recording_regions_sum_fields';
  end_time?: Maybe<Scalars['Int']['output']>;
  endpoint_checkpoint?: Maybe<Scalars['Int']['output']>;
  endpoint_progress?: Maybe<Scalars['bigint']['output']>;
  region_idx?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['Int']['output']>;
  startpoint_checkpoint?: Maybe<Scalars['Int']['output']>;
  startpoint_progress?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "recording_regions" */
export type Recording_Regions_Sum_Order_By = {
  end_time?: InputMaybe<Order_By>;
  endpoint_checkpoint?: InputMaybe<Order_By>;
  endpoint_progress?: InputMaybe<Order_By>;
  region_idx?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  startpoint_checkpoint?: InputMaybe<Order_By>;
  startpoint_progress?: InputMaybe<Order_By>;
};

/** update columns of table "recording_regions" */
export enum Recording_Regions_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  EndpointCheckpoint = 'endpoint_checkpoint',
  /** column name */
  EndpointProgress = 'endpoint_progress',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  RegionIdx = 'region_idx',
  /** column name */
  SegmentStart = 'segment_start',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  StartpointCheckpoint = 'startpoint_checkpoint',
  /** column name */
  StartpointProgress = 'startpoint_progress'
}

/** aggregate var_pop on columns */
export type Recording_Regions_Var_Pop_Fields = {
  __typename?: 'recording_regions_var_pop_fields';
  end_time?: Maybe<Scalars['Float']['output']>;
  endpoint_checkpoint?: Maybe<Scalars['Float']['output']>;
  endpoint_progress?: Maybe<Scalars['Float']['output']>;
  region_idx?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
  startpoint_checkpoint?: Maybe<Scalars['Float']['output']>;
  startpoint_progress?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "recording_regions" */
export type Recording_Regions_Var_Pop_Order_By = {
  end_time?: InputMaybe<Order_By>;
  endpoint_checkpoint?: InputMaybe<Order_By>;
  endpoint_progress?: InputMaybe<Order_By>;
  region_idx?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  startpoint_checkpoint?: InputMaybe<Order_By>;
  startpoint_progress?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recording_Regions_Var_Samp_Fields = {
  __typename?: 'recording_regions_var_samp_fields';
  end_time?: Maybe<Scalars['Float']['output']>;
  endpoint_checkpoint?: Maybe<Scalars['Float']['output']>;
  endpoint_progress?: Maybe<Scalars['Float']['output']>;
  region_idx?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
  startpoint_checkpoint?: Maybe<Scalars['Float']['output']>;
  startpoint_progress?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "recording_regions" */
export type Recording_Regions_Var_Samp_Order_By = {
  end_time?: InputMaybe<Order_By>;
  endpoint_checkpoint?: InputMaybe<Order_By>;
  endpoint_progress?: InputMaybe<Order_By>;
  region_idx?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  startpoint_checkpoint?: InputMaybe<Order_By>;
  startpoint_progress?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recording_Regions_Variance_Fields = {
  __typename?: 'recording_regions_variance_fields';
  end_time?: Maybe<Scalars['Float']['output']>;
  endpoint_checkpoint?: Maybe<Scalars['Float']['output']>;
  endpoint_progress?: Maybe<Scalars['Float']['output']>;
  region_idx?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
  startpoint_checkpoint?: Maybe<Scalars['Float']['output']>;
  startpoint_progress?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "recording_regions" */
export type Recording_Regions_Variance_Order_By = {
  end_time?: InputMaybe<Order_By>;
  endpoint_checkpoint?: InputMaybe<Order_By>;
  endpoint_progress?: InputMaybe<Order_By>;
  region_idx?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  startpoint_checkpoint?: InputMaybe<Order_By>;
  startpoint_progress?: InputMaybe<Order_By>;
};

/** columns and relationships of "recording_sourcemaps" */
export type Recording_Sourcemaps = {
  __typename?: 'recording_sourcemaps';
  base_url: Scalars['String']['output'];
  content_hash: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  /** An array relationship */
  originalsources: Array<Recording_Originalsources>;
  /** An aggregated array relationship */
  originalsources_aggregate: Recording_Originalsources_Aggregate;
  /** An object relationship */
  recording: Recordings;
  recording_id: Scalars['uuid']['output'];
  target_content_hash?: Maybe<Scalars['String']['output']>;
  target_map_url_hash?: Maybe<Scalars['String']['output']>;
  target_url_hash?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "recording_sourcemaps" */
export type Recording_SourcemapsOriginalsourcesArgs = {
  distinct_on?: InputMaybe<Array<Recording_Originalsources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Originalsources_Order_By>>;
  where?: InputMaybe<Recording_Originalsources_Bool_Exp>;
};


/** columns and relationships of "recording_sourcemaps" */
export type Recording_SourcemapsOriginalsources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recording_Originalsources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Originalsources_Order_By>>;
  where?: InputMaybe<Recording_Originalsources_Bool_Exp>;
};

/** aggregated selection of "recording_sourcemaps" */
export type Recording_Sourcemaps_Aggregate = {
  __typename?: 'recording_sourcemaps_aggregate';
  aggregate?: Maybe<Recording_Sourcemaps_Aggregate_Fields>;
  nodes: Array<Recording_Sourcemaps>;
};

/** aggregate fields of "recording_sourcemaps" */
export type Recording_Sourcemaps_Aggregate_Fields = {
  __typename?: 'recording_sourcemaps_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Recording_Sourcemaps_Max_Fields>;
  min?: Maybe<Recording_Sourcemaps_Min_Fields>;
};


/** aggregate fields of "recording_sourcemaps" */
export type Recording_Sourcemaps_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recording_Sourcemaps_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recording_sourcemaps" */
export type Recording_Sourcemaps_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recording_Sourcemaps_Max_Order_By>;
  min?: InputMaybe<Recording_Sourcemaps_Min_Order_By>;
};

/** input type for inserting array relation for remote table "recording_sourcemaps" */
export type Recording_Sourcemaps_Arr_Rel_Insert_Input = {
  data: Array<Recording_Sourcemaps_Insert_Input>;
  on_conflict?: InputMaybe<Recording_Sourcemaps_On_Conflict>;
};

/** Boolean expression to filter rows from the table "recording_sourcemaps". All fields are combined with a logical 'AND'. */
export type Recording_Sourcemaps_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Recording_Sourcemaps_Bool_Exp>>>;
  _not?: InputMaybe<Recording_Sourcemaps_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Recording_Sourcemaps_Bool_Exp>>>;
  base_url?: InputMaybe<String_Comparison_Exp>;
  content_hash?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  originalsources?: InputMaybe<Recording_Originalsources_Bool_Exp>;
  recording?: InputMaybe<Recordings_Bool_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  target_content_hash?: InputMaybe<String_Comparison_Exp>;
  target_map_url_hash?: InputMaybe<String_Comparison_Exp>;
  target_url_hash?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "recording_sourcemaps" */
export enum Recording_Sourcemaps_Constraint {
  /** unique or primary key constraint */
  RecordingSourcemapsPkey = 'recording_sourcemaps_pkey'
}

/** input type for inserting data into table "recording_sourcemaps" */
export type Recording_Sourcemaps_Insert_Input = {
  base_url?: InputMaybe<Scalars['String']['input']>;
  content_hash?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  originalsources?: InputMaybe<Recording_Originalsources_Arr_Rel_Insert_Input>;
  recording?: InputMaybe<Recordings_Obj_Rel_Insert_Input>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  target_content_hash?: InputMaybe<Scalars['String']['input']>;
  target_map_url_hash?: InputMaybe<Scalars['String']['input']>;
  target_url_hash?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Recording_Sourcemaps_Max_Fields = {
  __typename?: 'recording_sourcemaps_max_fields';
  base_url?: Maybe<Scalars['String']['output']>;
  content_hash?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  target_content_hash?: Maybe<Scalars['String']['output']>;
  target_map_url_hash?: Maybe<Scalars['String']['output']>;
  target_url_hash?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "recording_sourcemaps" */
export type Recording_Sourcemaps_Max_Order_By = {
  base_url?: InputMaybe<Order_By>;
  content_hash?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  target_content_hash?: InputMaybe<Order_By>;
  target_map_url_hash?: InputMaybe<Order_By>;
  target_url_hash?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recording_Sourcemaps_Min_Fields = {
  __typename?: 'recording_sourcemaps_min_fields';
  base_url?: Maybe<Scalars['String']['output']>;
  content_hash?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  target_content_hash?: Maybe<Scalars['String']['output']>;
  target_map_url_hash?: Maybe<Scalars['String']['output']>;
  target_url_hash?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "recording_sourcemaps" */
export type Recording_Sourcemaps_Min_Order_By = {
  base_url?: InputMaybe<Order_By>;
  content_hash?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  target_content_hash?: InputMaybe<Order_By>;
  target_map_url_hash?: InputMaybe<Order_By>;
  target_url_hash?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recording_sourcemaps" */
export type Recording_Sourcemaps_Mutation_Response = {
  __typename?: 'recording_sourcemaps_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Recording_Sourcemaps>;
};

/** input type for inserting object relation for remote table "recording_sourcemaps" */
export type Recording_Sourcemaps_Obj_Rel_Insert_Input = {
  data: Recording_Sourcemaps_Insert_Input;
  on_conflict?: InputMaybe<Recording_Sourcemaps_On_Conflict>;
};

/** on conflict condition type for table "recording_sourcemaps" */
export type Recording_Sourcemaps_On_Conflict = {
  constraint: Recording_Sourcemaps_Constraint;
  update_columns: Array<Recording_Sourcemaps_Update_Column>;
  where?: InputMaybe<Recording_Sourcemaps_Bool_Exp>;
};

/** ordering options when selecting data from "recording_sourcemaps" */
export type Recording_Sourcemaps_Order_By = {
  base_url?: InputMaybe<Order_By>;
  content_hash?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  originalsources_aggregate?: InputMaybe<Recording_Originalsources_Aggregate_Order_By>;
  recording?: InputMaybe<Recordings_Order_By>;
  recording_id?: InputMaybe<Order_By>;
  target_content_hash?: InputMaybe<Order_By>;
  target_map_url_hash?: InputMaybe<Order_By>;
  target_url_hash?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "recording_sourcemaps" */
export type Recording_Sourcemaps_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "recording_sourcemaps" */
export enum Recording_Sourcemaps_Select_Column {
  /** column name */
  BaseUrl = 'base_url',
  /** column name */
  ContentHash = 'content_hash',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  TargetContentHash = 'target_content_hash',
  /** column name */
  TargetMapUrlHash = 'target_map_url_hash',
  /** column name */
  TargetUrlHash = 'target_url_hash'
}

/** input type for updating data in table "recording_sourcemaps" */
export type Recording_Sourcemaps_Set_Input = {
  base_url?: InputMaybe<Scalars['String']['input']>;
  content_hash?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  target_content_hash?: InputMaybe<Scalars['String']['input']>;
  target_map_url_hash?: InputMaybe<Scalars['String']['input']>;
  target_url_hash?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "recording_sourcemaps" */
export enum Recording_Sourcemaps_Update_Column {
  /** column name */
  BaseUrl = 'base_url',
  /** column name */
  ContentHash = 'content_hash',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  TargetContentHash = 'target_content_hash',
  /** column name */
  TargetMapUrlHash = 'target_map_url_hash',
  /** column name */
  TargetUrlHash = 'target_url_hash'
}

/** columns and relationships of "recordings" */
export type Recordings = {
  __typename?: 'recordings';
  api_key_id?: Maybe<Scalars['uuid']['output']>;
  build_id?: Maybe<Scalars['String']['output']>;
  cloned_from?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  collaborators: Array<Collaborators>;
  /** An aggregated array relationship */
  collaborators_aggregate: Collaborators_Aggregate;
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregated array relationship */
  comments_aggregate: Comments_Aggregate;
  /** An array relationship */
  crash_reports: Array<Crash_Reports>;
  /** An aggregated array relationship */
  crash_reports_aggregate: Crash_Reports_Aggregate;
  date: Scalars['timestamptz']['output'];
  deleted_at?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  example?: Maybe<Scalars['Boolean']['output']>;
  has_crashed: Scalars['Boolean']['output'];
  id: Scalars['uuid']['output'];
  is_initialized: Scalars['Boolean']['output'];
  is_private: Scalars['Boolean']['output'];
  last_screen_data?: Maybe<Scalars['String']['output']>;
  last_screen_mime_type?: Maybe<Scalars['String']['output']>;
  last_viewed_at?: Maybe<Scalars['timestamptz']['output']>;
  metadata: Scalars['jsonb']['output'];
  never_delete?: Maybe<Scalars['Boolean']['output']>;
  operations?: Maybe<Scalars['jsonb']['output']>;
  recordingTitle?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregated array relationship */
  sessions_aggregate: Sessions_Aggregate;
  size?: Maybe<Scalars['bigint']['output']>;
  /** An array relationship */
  sourceMaps: Array<Recording_Sourcemaps>;
  /** An aggregated array relationship */
  sourceMaps_aggregate: Recording_Sourcemaps_Aggregate;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  workspace?: Maybe<Workspaces>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "recordings" */
export type RecordingsCollaboratorsArgs = {
  distinct_on?: InputMaybe<Array<Collaborators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaborators_Order_By>>;
  where?: InputMaybe<Collaborators_Bool_Exp>;
};


/** columns and relationships of "recordings" */
export type RecordingsCollaborators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Collaborators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaborators_Order_By>>;
  where?: InputMaybe<Collaborators_Bool_Exp>;
};


/** columns and relationships of "recordings" */
export type RecordingsCommentsArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


/** columns and relationships of "recordings" */
export type RecordingsComments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


/** columns and relationships of "recordings" */
export type RecordingsCrash_ReportsArgs = {
  distinct_on?: InputMaybe<Array<Crash_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Crash_Reports_Order_By>>;
  where?: InputMaybe<Crash_Reports_Bool_Exp>;
};


/** columns and relationships of "recordings" */
export type RecordingsCrash_Reports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Crash_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Crash_Reports_Order_By>>;
  where?: InputMaybe<Crash_Reports_Bool_Exp>;
};


/** columns and relationships of "recordings" */
export type RecordingsMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "recordings" */
export type RecordingsOperationsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "recordings" */
export type RecordingsSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};


/** columns and relationships of "recordings" */
export type RecordingsSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};


/** columns and relationships of "recordings" */
export type RecordingsSourceMapsArgs = {
  distinct_on?: InputMaybe<Array<Recording_Sourcemaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Sourcemaps_Order_By>>;
  where?: InputMaybe<Recording_Sourcemaps_Bool_Exp>;
};


/** columns and relationships of "recordings" */
export type RecordingsSourceMaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recording_Sourcemaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Sourcemaps_Order_By>>;
  where?: InputMaybe<Recording_Sourcemaps_Bool_Exp>;
};

/** aggregated selection of "recordings" */
export type Recordings_Aggregate = {
  __typename?: 'recordings_aggregate';
  aggregate?: Maybe<Recordings_Aggregate_Fields>;
  nodes: Array<Recordings>;
};

/** aggregate fields of "recordings" */
export type Recordings_Aggregate_Fields = {
  __typename?: 'recordings_aggregate_fields';
  avg?: Maybe<Recordings_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Recordings_Max_Fields>;
  min?: Maybe<Recordings_Min_Fields>;
  stddev?: Maybe<Recordings_Stddev_Fields>;
  stddev_pop?: Maybe<Recordings_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recordings_Stddev_Samp_Fields>;
  sum?: Maybe<Recordings_Sum_Fields>;
  var_pop?: Maybe<Recordings_Var_Pop_Fields>;
  var_samp?: Maybe<Recordings_Var_Samp_Fields>;
  variance?: Maybe<Recordings_Variance_Fields>;
};


/** aggregate fields of "recordings" */
export type Recordings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recordings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recordings" */
export type Recordings_Aggregate_Order_By = {
  avg?: InputMaybe<Recordings_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recordings_Max_Order_By>;
  min?: InputMaybe<Recordings_Min_Order_By>;
  stddev?: InputMaybe<Recordings_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recordings_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recordings_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recordings_Sum_Order_By>;
  var_pop?: InputMaybe<Recordings_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recordings_Var_Samp_Order_By>;
  variance?: InputMaybe<Recordings_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Recordings_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  operations?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "recordings" */
export type Recordings_Arr_Rel_Insert_Input = {
  data: Array<Recordings_Insert_Input>;
  on_conflict?: InputMaybe<Recordings_On_Conflict>;
};

/** aggregate avg on columns */
export type Recordings_Avg_Fields = {
  __typename?: 'recordings_avg_fields';
  duration?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "recordings" */
export type Recordings_Avg_Order_By = {
  duration?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recordings". All fields are combined with a logical 'AND'. */
export type Recordings_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Recordings_Bool_Exp>>>;
  _not?: InputMaybe<Recordings_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Recordings_Bool_Exp>>>;
  api_key_id?: InputMaybe<Uuid_Comparison_Exp>;
  build_id?: InputMaybe<String_Comparison_Exp>;
  cloned_from?: InputMaybe<Uuid_Comparison_Exp>;
  collaborators?: InputMaybe<Collaborators_Bool_Exp>;
  comments?: InputMaybe<Comments_Bool_Exp>;
  crash_reports?: InputMaybe<Crash_Reports_Bool_Exp>;
  date?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  duration?: InputMaybe<Int_Comparison_Exp>;
  example?: InputMaybe<Boolean_Comparison_Exp>;
  has_crashed?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_initialized?: InputMaybe<Boolean_Comparison_Exp>;
  is_private?: InputMaybe<Boolean_Comparison_Exp>;
  last_screen_data?: InputMaybe<String_Comparison_Exp>;
  last_screen_mime_type?: InputMaybe<String_Comparison_Exp>;
  last_viewed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  never_delete?: InputMaybe<Boolean_Comparison_Exp>;
  operations?: InputMaybe<Jsonb_Comparison_Exp>;
  recordingTitle?: InputMaybe<String_Comparison_Exp>;
  recording_id?: InputMaybe<String_Comparison_Exp>;
  sessions?: InputMaybe<Sessions_Bool_Exp>;
  size?: InputMaybe<Bigint_Comparison_Exp>;
  sourceMaps?: InputMaybe<Recording_Sourcemaps_Bool_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  workspace?: InputMaybe<Workspaces_Bool_Exp>;
  workspace_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "recordings" */
export enum Recordings_Constraint {
  /** unique or primary key constraint */
  RecordingsPkey = 'recordings_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Recordings_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  operations?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Recordings_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']['input']>;
  operations?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Recordings_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']['input']>;
  operations?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing integer column in table "recordings" */
export type Recordings_Inc_Input = {
  duration?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "recordings" */
export type Recordings_Insert_Input = {
  api_key_id?: InputMaybe<Scalars['uuid']['input']>;
  build_id?: InputMaybe<Scalars['String']['input']>;
  cloned_from?: InputMaybe<Scalars['uuid']['input']>;
  collaborators?: InputMaybe<Collaborators_Arr_Rel_Insert_Input>;
  comments?: InputMaybe<Comments_Arr_Rel_Insert_Input>;
  date?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  example?: InputMaybe<Scalars['Boolean']['input']>;
  has_crashed?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_initialized?: InputMaybe<Scalars['Boolean']['input']>;
  is_private?: InputMaybe<Scalars['Boolean']['input']>;
  last_screen_data?: InputMaybe<Scalars['String']['input']>;
  last_screen_mime_type?: InputMaybe<Scalars['String']['input']>;
  last_viewed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  never_delete?: InputMaybe<Scalars['Boolean']['input']>;
  operations?: InputMaybe<Scalars['jsonb']['input']>;
  recordingTitle?: InputMaybe<Scalars['String']['input']>;
  recording_id?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<Sessions_Arr_Rel_Insert_Input>;
  size?: InputMaybe<Scalars['bigint']['input']>;
  sourceMaps?: InputMaybe<Recording_Sourcemaps_Arr_Rel_Insert_Input>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workspace?: InputMaybe<Workspaces_Obj_Rel_Insert_Input>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Recordings_Max_Fields = {
  __typename?: 'recordings_max_fields';
  api_key_id?: Maybe<Scalars['uuid']['output']>;
  build_id?: Maybe<Scalars['String']['output']>;
  cloned_from?: Maybe<Scalars['uuid']['output']>;
  date?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  last_screen_data?: Maybe<Scalars['String']['output']>;
  last_screen_mime_type?: Maybe<Scalars['String']['output']>;
  last_viewed_at?: Maybe<Scalars['timestamptz']['output']>;
  recordingTitle?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['bigint']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "recordings" */
export type Recordings_Max_Order_By = {
  api_key_id?: InputMaybe<Order_By>;
  build_id?: InputMaybe<Order_By>;
  cloned_from?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_screen_data?: InputMaybe<Order_By>;
  last_screen_mime_type?: InputMaybe<Order_By>;
  last_viewed_at?: InputMaybe<Order_By>;
  recordingTitle?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recordings_Min_Fields = {
  __typename?: 'recordings_min_fields';
  api_key_id?: Maybe<Scalars['uuid']['output']>;
  build_id?: Maybe<Scalars['String']['output']>;
  cloned_from?: Maybe<Scalars['uuid']['output']>;
  date?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  last_screen_data?: Maybe<Scalars['String']['output']>;
  last_screen_mime_type?: Maybe<Scalars['String']['output']>;
  last_viewed_at?: Maybe<Scalars['timestamptz']['output']>;
  recordingTitle?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['bigint']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "recordings" */
export type Recordings_Min_Order_By = {
  api_key_id?: InputMaybe<Order_By>;
  build_id?: InputMaybe<Order_By>;
  cloned_from?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_screen_data?: InputMaybe<Order_By>;
  last_screen_mime_type?: InputMaybe<Order_By>;
  last_viewed_at?: InputMaybe<Order_By>;
  recordingTitle?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recordings" */
export type Recordings_Mutation_Response = {
  __typename?: 'recordings_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Recordings>;
};

/** input type for inserting object relation for remote table "recordings" */
export type Recordings_Obj_Rel_Insert_Input = {
  data: Recordings_Insert_Input;
  on_conflict?: InputMaybe<Recordings_On_Conflict>;
};

/** on conflict condition type for table "recordings" */
export type Recordings_On_Conflict = {
  constraint: Recordings_Constraint;
  update_columns: Array<Recordings_Update_Column>;
  where?: InputMaybe<Recordings_Bool_Exp>;
};

/** ordering options when selecting data from "recordings" */
export type Recordings_Order_By = {
  api_key_id?: InputMaybe<Order_By>;
  build_id?: InputMaybe<Order_By>;
  cloned_from?: InputMaybe<Order_By>;
  collaborators_aggregate?: InputMaybe<Collaborators_Aggregate_Order_By>;
  comments_aggregate?: InputMaybe<Comments_Aggregate_Order_By>;
  crash_reports_aggregate?: InputMaybe<Crash_Reports_Aggregate_Order_By>;
  date?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  example?: InputMaybe<Order_By>;
  has_crashed?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_initialized?: InputMaybe<Order_By>;
  is_private?: InputMaybe<Order_By>;
  last_screen_data?: InputMaybe<Order_By>;
  last_screen_mime_type?: InputMaybe<Order_By>;
  last_viewed_at?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  never_delete?: InputMaybe<Order_By>;
  operations?: InputMaybe<Order_By>;
  recordingTitle?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Order_By>;
  size?: InputMaybe<Order_By>;
  sourceMaps_aggregate?: InputMaybe<Recording_Sourcemaps_Aggregate_Order_By>;
  title?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  workspace?: InputMaybe<Workspaces_Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "recordings" */
export type Recordings_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Recordings_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  operations?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "recordings" */
export enum Recordings_Select_Column {
  /** column name */
  ApiKeyId = 'api_key_id',
  /** column name */
  BuildId = 'build_id',
  /** column name */
  ClonedFrom = 'cloned_from',
  /** column name */
  Date = 'date',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Description = 'description',
  /** column name */
  Duration = 'duration',
  /** column name */
  Example = 'example',
  /** column name */
  HasCrashed = 'has_crashed',
  /** column name */
  Id = 'id',
  /** column name */
  IsInitialized = 'is_initialized',
  /** column name */
  IsPrivate = 'is_private',
  /** column name */
  LastScreenData = 'last_screen_data',
  /** column name */
  LastScreenMimeType = 'last_screen_mime_type',
  /** column name */
  LastViewedAt = 'last_viewed_at',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NeverDelete = 'never_delete',
  /** column name */
  Operations = 'operations',
  /** column name */
  RecordingTitle = 'recordingTitle',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Size = 'size',
  /** column name */
  Title = 'title',
  /** column name */
  Url = 'url',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** input type for updating data in table "recordings" */
export type Recordings_Set_Input = {
  api_key_id?: InputMaybe<Scalars['uuid']['input']>;
  build_id?: InputMaybe<Scalars['String']['input']>;
  cloned_from?: InputMaybe<Scalars['uuid']['input']>;
  date?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  example?: InputMaybe<Scalars['Boolean']['input']>;
  has_crashed?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_initialized?: InputMaybe<Scalars['Boolean']['input']>;
  is_private?: InputMaybe<Scalars['Boolean']['input']>;
  last_screen_data?: InputMaybe<Scalars['String']['input']>;
  last_screen_mime_type?: InputMaybe<Scalars['String']['input']>;
  last_viewed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  never_delete?: InputMaybe<Scalars['Boolean']['input']>;
  operations?: InputMaybe<Scalars['jsonb']['input']>;
  recordingTitle?: InputMaybe<Scalars['String']['input']>;
  recording_id?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['bigint']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Recordings_Stddev_Fields = {
  __typename?: 'recordings_stddev_fields';
  duration?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "recordings" */
export type Recordings_Stddev_Order_By = {
  duration?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recordings_Stddev_Pop_Fields = {
  __typename?: 'recordings_stddev_pop_fields';
  duration?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "recordings" */
export type Recordings_Stddev_Pop_Order_By = {
  duration?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recordings_Stddev_Samp_Fields = {
  __typename?: 'recordings_stddev_samp_fields';
  duration?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "recordings" */
export type Recordings_Stddev_Samp_Order_By = {
  duration?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recordings_Sum_Fields = {
  __typename?: 'recordings_sum_fields';
  duration?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "recordings" */
export type Recordings_Sum_Order_By = {
  duration?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** update columns of table "recordings" */
export enum Recordings_Update_Column {
  /** column name */
  ApiKeyId = 'api_key_id',
  /** column name */
  BuildId = 'build_id',
  /** column name */
  ClonedFrom = 'cloned_from',
  /** column name */
  Date = 'date',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Description = 'description',
  /** column name */
  Duration = 'duration',
  /** column name */
  Example = 'example',
  /** column name */
  HasCrashed = 'has_crashed',
  /** column name */
  Id = 'id',
  /** column name */
  IsInitialized = 'is_initialized',
  /** column name */
  IsPrivate = 'is_private',
  /** column name */
  LastScreenData = 'last_screen_data',
  /** column name */
  LastScreenMimeType = 'last_screen_mime_type',
  /** column name */
  LastViewedAt = 'last_viewed_at',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NeverDelete = 'never_delete',
  /** column name */
  Operations = 'operations',
  /** column name */
  RecordingTitle = 'recordingTitle',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Size = 'size',
  /** column name */
  Title = 'title',
  /** column name */
  Url = 'url',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** aggregate var_pop on columns */
export type Recordings_Var_Pop_Fields = {
  __typename?: 'recordings_var_pop_fields';
  duration?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "recordings" */
export type Recordings_Var_Pop_Order_By = {
  duration?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recordings_Var_Samp_Fields = {
  __typename?: 'recordings_var_samp_fields';
  duration?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "recordings" */
export type Recordings_Var_Samp_Order_By = {
  duration?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recordings_Variance_Fields = {
  __typename?: 'recordings_variance_fields';
  duration?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "recordings" */
export type Recordings_Variance_Order_By = {
  duration?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** columns and relationships of "release_build_files" */
export type Release_Build_Files = {
  __typename?: 'release_build_files';
  build_id: Scalars['String']['output'];
  file_name: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
};

/** aggregated selection of "release_build_files" */
export type Release_Build_Files_Aggregate = {
  __typename?: 'release_build_files_aggregate';
  aggregate?: Maybe<Release_Build_Files_Aggregate_Fields>;
  nodes: Array<Release_Build_Files>;
};

/** aggregate fields of "release_build_files" */
export type Release_Build_Files_Aggregate_Fields = {
  __typename?: 'release_build_files_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Release_Build_Files_Max_Fields>;
  min?: Maybe<Release_Build_Files_Min_Fields>;
};


/** aggregate fields of "release_build_files" */
export type Release_Build_Files_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Release_Build_Files_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "release_build_files" */
export type Release_Build_Files_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Release_Build_Files_Max_Order_By>;
  min?: InputMaybe<Release_Build_Files_Min_Order_By>;
};

/** input type for inserting array relation for remote table "release_build_files" */
export type Release_Build_Files_Arr_Rel_Insert_Input = {
  data: Array<Release_Build_Files_Insert_Input>;
  on_conflict?: InputMaybe<Release_Build_Files_On_Conflict>;
};

/** Boolean expression to filter rows from the table "release_build_files". All fields are combined with a logical 'AND'. */
export type Release_Build_Files_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Release_Build_Files_Bool_Exp>>>;
  _not?: InputMaybe<Release_Build_Files_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Release_Build_Files_Bool_Exp>>>;
  build_id?: InputMaybe<String_Comparison_Exp>;
  file_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "release_build_files" */
export enum Release_Build_Files_Constraint {
  /** unique or primary key constraint */
  ReleaseBuildFilesBuildIdFileNameKey = 'release_build_files_build_id_file_name_key',
  /** unique or primary key constraint */
  ReleaseBuildFilesPkey = 'release_build_files_pkey'
}

/** input type for inserting data into table "release_build_files" */
export type Release_Build_Files_Insert_Input = {
  build_id?: InputMaybe<Scalars['String']['input']>;
  file_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Release_Build_Files_Max_Fields = {
  __typename?: 'release_build_files_max_fields';
  build_id?: Maybe<Scalars['String']['output']>;
  file_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "release_build_files" */
export type Release_Build_Files_Max_Order_By = {
  build_id?: InputMaybe<Order_By>;
  file_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Release_Build_Files_Min_Fields = {
  __typename?: 'release_build_files_min_fields';
  build_id?: Maybe<Scalars['String']['output']>;
  file_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "release_build_files" */
export type Release_Build_Files_Min_Order_By = {
  build_id?: InputMaybe<Order_By>;
  file_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "release_build_files" */
export type Release_Build_Files_Mutation_Response = {
  __typename?: 'release_build_files_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Release_Build_Files>;
};

/** input type for inserting object relation for remote table "release_build_files" */
export type Release_Build_Files_Obj_Rel_Insert_Input = {
  data: Release_Build_Files_Insert_Input;
  on_conflict?: InputMaybe<Release_Build_Files_On_Conflict>;
};

/** on conflict condition type for table "release_build_files" */
export type Release_Build_Files_On_Conflict = {
  constraint: Release_Build_Files_Constraint;
  update_columns: Array<Release_Build_Files_Update_Column>;
  where?: InputMaybe<Release_Build_Files_Bool_Exp>;
};

/** ordering options when selecting data from "release_build_files" */
export type Release_Build_Files_Order_By = {
  build_id?: InputMaybe<Order_By>;
  file_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "release_build_files" */
export type Release_Build_Files_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "release_build_files" */
export enum Release_Build_Files_Select_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  FileName = 'file_name',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "release_build_files" */
export type Release_Build_Files_Set_Input = {
  build_id?: InputMaybe<Scalars['String']['input']>;
  file_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "release_build_files" */
export enum Release_Build_Files_Update_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  FileName = 'file_name',
  /** column name */
  Id = 'id'
}

/** columns and relationships of "releases" */
export type Releases = {
  __typename?: 'releases';
  build_file: Scalars['String']['output'];
  build_id: Scalars['String']['output'];
  created_at: Scalars['timestamp']['output'];
  platform: Scalars['String']['output'];
  release_file: Scalars['String']['output'];
  runtime: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updated_at: Scalars['timestamp']['output'];
  version?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "releases" */
export type Releases_Aggregate = {
  __typename?: 'releases_aggregate';
  aggregate?: Maybe<Releases_Aggregate_Fields>;
  nodes: Array<Releases>;
};

/** aggregate fields of "releases" */
export type Releases_Aggregate_Fields = {
  __typename?: 'releases_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Releases_Max_Fields>;
  min?: Maybe<Releases_Min_Fields>;
};


/** aggregate fields of "releases" */
export type Releases_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Releases_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "releases" */
export type Releases_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Releases_Max_Order_By>;
  min?: InputMaybe<Releases_Min_Order_By>;
};

/** input type for inserting array relation for remote table "releases" */
export type Releases_Arr_Rel_Insert_Input = {
  data: Array<Releases_Insert_Input>;
  on_conflict?: InputMaybe<Releases_On_Conflict>;
};

/** Boolean expression to filter rows from the table "releases". All fields are combined with a logical 'AND'. */
export type Releases_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Releases_Bool_Exp>>>;
  _not?: InputMaybe<Releases_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Releases_Bool_Exp>>>;
  build_file?: InputMaybe<String_Comparison_Exp>;
  build_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  platform?: InputMaybe<String_Comparison_Exp>;
  release_file?: InputMaybe<String_Comparison_Exp>;
  runtime?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "releases" */
export enum Releases_Constraint {
  /** unique or primary key constraint */
  ReleasesPkey = 'releases_pkey'
}

/** input type for inserting data into table "releases" */
export type Releases_Insert_Input = {
  build_file?: InputMaybe<Scalars['String']['input']>;
  build_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  release_file?: InputMaybe<Scalars['String']['input']>;
  runtime?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Releases_Max_Fields = {
  __typename?: 'releases_max_fields';
  build_file?: Maybe<Scalars['String']['output']>;
  build_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  release_file?: Maybe<Scalars['String']['output']>;
  runtime?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "releases" */
export type Releases_Max_Order_By = {
  build_file?: InputMaybe<Order_By>;
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  platform?: InputMaybe<Order_By>;
  release_file?: InputMaybe<Order_By>;
  runtime?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Releases_Min_Fields = {
  __typename?: 'releases_min_fields';
  build_file?: Maybe<Scalars['String']['output']>;
  build_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  release_file?: Maybe<Scalars['String']['output']>;
  runtime?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "releases" */
export type Releases_Min_Order_By = {
  build_file?: InputMaybe<Order_By>;
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  platform?: InputMaybe<Order_By>;
  release_file?: InputMaybe<Order_By>;
  runtime?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "releases" */
export type Releases_Mutation_Response = {
  __typename?: 'releases_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Releases>;
};

/** input type for inserting object relation for remote table "releases" */
export type Releases_Obj_Rel_Insert_Input = {
  data: Releases_Insert_Input;
  on_conflict?: InputMaybe<Releases_On_Conflict>;
};

/** on conflict condition type for table "releases" */
export type Releases_On_Conflict = {
  constraint: Releases_Constraint;
  update_columns: Array<Releases_Update_Column>;
  where?: InputMaybe<Releases_Bool_Exp>;
};

/** ordering options when selecting data from "releases" */
export type Releases_Order_By = {
  build_file?: InputMaybe<Order_By>;
  build_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  platform?: InputMaybe<Order_By>;
  release_file?: InputMaybe<Order_By>;
  runtime?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "releases" */
export type Releases_Pk_Columns_Input = {
  build_id: Scalars['String']['input'];
};

/** select columns of table "releases" */
export enum Releases_Select_Column {
  /** column name */
  BuildFile = 'build_file',
  /** column name */
  BuildId = 'build_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Platform = 'platform',
  /** column name */
  ReleaseFile = 'release_file',
  /** column name */
  Runtime = 'runtime',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Version = 'version'
}

/** input type for updating data in table "releases" */
export type Releases_Set_Input = {
  build_file?: InputMaybe<Scalars['String']['input']>;
  build_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  release_file?: InputMaybe<Scalars['String']['input']>;
  runtime?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "releases" */
export enum Releases_Update_Column {
  /** column name */
  BuildFile = 'build_file',
  /** column name */
  BuildId = 'build_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Platform = 'platform',
  /** column name */
  ReleaseFile = 'release_file',
  /** column name */
  Runtime = 'runtime',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Version = 'version'
}

/** columns and relationships of "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results = {
  __typename?: 'root_cause_analysis_results';
  created_at: Scalars['timestamptz']['output'];
  recording_id: Scalars['uuid']['output'];
  result: Scalars['jsonb']['output'];
  updated_at: Scalars['timestamptz']['output'];
  version: Scalars['Int']['output'];
};


/** columns and relationships of "root_cause_analysis_results" */
export type Root_Cause_Analysis_ResultsResultArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Aggregate = {
  __typename?: 'root_cause_analysis_results_aggregate';
  aggregate?: Maybe<Root_Cause_Analysis_Results_Aggregate_Fields>;
  nodes: Array<Root_Cause_Analysis_Results>;
};

/** aggregate fields of "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Aggregate_Fields = {
  __typename?: 'root_cause_analysis_results_aggregate_fields';
  avg?: Maybe<Root_Cause_Analysis_Results_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Root_Cause_Analysis_Results_Max_Fields>;
  min?: Maybe<Root_Cause_Analysis_Results_Min_Fields>;
  stddev?: Maybe<Root_Cause_Analysis_Results_Stddev_Fields>;
  stddev_pop?: Maybe<Root_Cause_Analysis_Results_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Root_Cause_Analysis_Results_Stddev_Samp_Fields>;
  sum?: Maybe<Root_Cause_Analysis_Results_Sum_Fields>;
  var_pop?: Maybe<Root_Cause_Analysis_Results_Var_Pop_Fields>;
  var_samp?: Maybe<Root_Cause_Analysis_Results_Var_Samp_Fields>;
  variance?: Maybe<Root_Cause_Analysis_Results_Variance_Fields>;
};


/** aggregate fields of "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Root_Cause_Analysis_Results_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Aggregate_Order_By = {
  avg?: InputMaybe<Root_Cause_Analysis_Results_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Root_Cause_Analysis_Results_Max_Order_By>;
  min?: InputMaybe<Root_Cause_Analysis_Results_Min_Order_By>;
  stddev?: InputMaybe<Root_Cause_Analysis_Results_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Root_Cause_Analysis_Results_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Root_Cause_Analysis_Results_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Root_Cause_Analysis_Results_Sum_Order_By>;
  var_pop?: InputMaybe<Root_Cause_Analysis_Results_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Root_Cause_Analysis_Results_Var_Samp_Order_By>;
  variance?: InputMaybe<Root_Cause_Analysis_Results_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Root_Cause_Analysis_Results_Append_Input = {
  result?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Arr_Rel_Insert_Input = {
  data: Array<Root_Cause_Analysis_Results_Insert_Input>;
  on_conflict?: InputMaybe<Root_Cause_Analysis_Results_On_Conflict>;
};

/** aggregate avg on columns */
export type Root_Cause_Analysis_Results_Avg_Fields = {
  __typename?: 'root_cause_analysis_results_avg_fields';
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Avg_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "root_cause_analysis_results". All fields are combined with a logical 'AND'. */
export type Root_Cause_Analysis_Results_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Root_Cause_Analysis_Results_Bool_Exp>>>;
  _not?: InputMaybe<Root_Cause_Analysis_Results_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Root_Cause_Analysis_Results_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  result?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  version?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "root_cause_analysis_results" */
export enum Root_Cause_Analysis_Results_Constraint {
  /** unique or primary key constraint */
  RootCauseAnalysisResultsPkey = 'root_cause_analysis_results_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Root_Cause_Analysis_Results_Delete_At_Path_Input = {
  result?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Root_Cause_Analysis_Results_Delete_Elem_Input = {
  result?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Root_Cause_Analysis_Results_Delete_Key_Input = {
  result?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing integer column in table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Inc_Input = {
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  result?: InputMaybe<Scalars['jsonb']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Root_Cause_Analysis_Results_Max_Fields = {
  __typename?: 'root_cause_analysis_results_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Root_Cause_Analysis_Results_Min_Fields = {
  __typename?: 'root_cause_analysis_results_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Mutation_Response = {
  __typename?: 'root_cause_analysis_results_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Root_Cause_Analysis_Results>;
};

/** input type for inserting object relation for remote table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Obj_Rel_Insert_Input = {
  data: Root_Cause_Analysis_Results_Insert_Input;
  on_conflict?: InputMaybe<Root_Cause_Analysis_Results_On_Conflict>;
};

/** on conflict condition type for table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_On_Conflict = {
  constraint: Root_Cause_Analysis_Results_Constraint;
  update_columns: Array<Root_Cause_Analysis_Results_Update_Column>;
  where?: InputMaybe<Root_Cause_Analysis_Results_Bool_Exp>;
};

/** ordering options when selecting data from "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Order_By = {
  created_at?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Pk_Columns_Input = {
  recording_id: Scalars['uuid']['input'];
  version: Scalars['Int']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Root_Cause_Analysis_Results_Prepend_Input = {
  result?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "root_cause_analysis_results" */
export enum Root_Cause_Analysis_Results_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Result = 'result',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Version = 'version'
}

/** input type for updating data in table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  result?: InputMaybe<Scalars['jsonb']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Root_Cause_Analysis_Results_Stddev_Fields = {
  __typename?: 'root_cause_analysis_results_stddev_fields';
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Stddev_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Root_Cause_Analysis_Results_Stddev_Pop_Fields = {
  __typename?: 'root_cause_analysis_results_stddev_pop_fields';
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Stddev_Pop_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Root_Cause_Analysis_Results_Stddev_Samp_Fields = {
  __typename?: 'root_cause_analysis_results_stddev_samp_fields';
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Stddev_Samp_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Root_Cause_Analysis_Results_Sum_Fields = {
  __typename?: 'root_cause_analysis_results_sum_fields';
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Sum_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** update columns of table "root_cause_analysis_results" */
export enum Root_Cause_Analysis_Results_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Result = 'result',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Version = 'version'
}

/** aggregate var_pop on columns */
export type Root_Cause_Analysis_Results_Var_Pop_Fields = {
  __typename?: 'root_cause_analysis_results_var_pop_fields';
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Var_Pop_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Root_Cause_Analysis_Results_Var_Samp_Fields = {
  __typename?: 'root_cause_analysis_results_var_samp_fields';
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Var_Samp_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Root_Cause_Analysis_Results_Variance_Fields = {
  __typename?: 'root_cause_analysis_results_variance_fields';
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "root_cause_analysis_results" */
export type Root_Cause_Analysis_Results_Variance_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** columns and relationships of "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions = {
  __typename?: 'runtime_crash_report_sessions';
  /** An object relationship */
  runtime_crash_report: Runtime_Crash_Reports;
  runtime_crash_report_id: Scalars['uuid']['output'];
  /** An object relationship */
  session: Sessions;
  session_id: Scalars['String']['output'];
};

/** aggregated selection of "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions_Aggregate = {
  __typename?: 'runtime_crash_report_sessions_aggregate';
  aggregate?: Maybe<Runtime_Crash_Report_Sessions_Aggregate_Fields>;
  nodes: Array<Runtime_Crash_Report_Sessions>;
};

/** aggregate fields of "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions_Aggregate_Fields = {
  __typename?: 'runtime_crash_report_sessions_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Runtime_Crash_Report_Sessions_Max_Fields>;
  min?: Maybe<Runtime_Crash_Report_Sessions_Min_Fields>;
};


/** aggregate fields of "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Runtime_Crash_Report_Sessions_Max_Order_By>;
  min?: InputMaybe<Runtime_Crash_Report_Sessions_Min_Order_By>;
};

/** input type for inserting array relation for remote table "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions_Arr_Rel_Insert_Input = {
  data: Array<Runtime_Crash_Report_Sessions_Insert_Input>;
  on_conflict?: InputMaybe<Runtime_Crash_Report_Sessions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "runtime_crash_report_sessions". All fields are combined with a logical 'AND'. */
export type Runtime_Crash_Report_Sessions_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Runtime_Crash_Report_Sessions_Bool_Exp>>>;
  _not?: InputMaybe<Runtime_Crash_Report_Sessions_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Runtime_Crash_Report_Sessions_Bool_Exp>>>;
  runtime_crash_report?: InputMaybe<Runtime_Crash_Reports_Bool_Exp>;
  runtime_crash_report_id?: InputMaybe<Uuid_Comparison_Exp>;
  session?: InputMaybe<Sessions_Bool_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "runtime_crash_report_sessions" */
export enum Runtime_Crash_Report_Sessions_Constraint {
  /** unique or primary key constraint */
  RuntimeCrashReportSessionsPkey = 'runtime_crash_report_sessions_pkey'
}

/** input type for inserting data into table "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions_Insert_Input = {
  runtime_crash_report?: InputMaybe<Runtime_Crash_Reports_Obj_Rel_Insert_Input>;
  runtime_crash_report_id?: InputMaybe<Scalars['uuid']['input']>;
  session?: InputMaybe<Sessions_Obj_Rel_Insert_Input>;
  session_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Runtime_Crash_Report_Sessions_Max_Fields = {
  __typename?: 'runtime_crash_report_sessions_max_fields';
  runtime_crash_report_id?: Maybe<Scalars['uuid']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions_Max_Order_By = {
  runtime_crash_report_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Runtime_Crash_Report_Sessions_Min_Fields = {
  __typename?: 'runtime_crash_report_sessions_min_fields';
  runtime_crash_report_id?: Maybe<Scalars['uuid']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions_Min_Order_By = {
  runtime_crash_report_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions_Mutation_Response = {
  __typename?: 'runtime_crash_report_sessions_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Runtime_Crash_Report_Sessions>;
};

/** input type for inserting object relation for remote table "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions_Obj_Rel_Insert_Input = {
  data: Runtime_Crash_Report_Sessions_Insert_Input;
  on_conflict?: InputMaybe<Runtime_Crash_Report_Sessions_On_Conflict>;
};

/** on conflict condition type for table "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions_On_Conflict = {
  constraint: Runtime_Crash_Report_Sessions_Constraint;
  update_columns: Array<Runtime_Crash_Report_Sessions_Update_Column>;
  where?: InputMaybe<Runtime_Crash_Report_Sessions_Bool_Exp>;
};

/** ordering options when selecting data from "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions_Order_By = {
  runtime_crash_report?: InputMaybe<Runtime_Crash_Reports_Order_By>;
  runtime_crash_report_id?: InputMaybe<Order_By>;
  session?: InputMaybe<Sessions_Order_By>;
  session_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions_Pk_Columns_Input = {
  runtime_crash_report_id: Scalars['uuid']['input'];
  session_id: Scalars['String']['input'];
};

/** select columns of table "runtime_crash_report_sessions" */
export enum Runtime_Crash_Report_Sessions_Select_Column {
  /** column name */
  RuntimeCrashReportId = 'runtime_crash_report_id',
  /** column name */
  SessionId = 'session_id'
}

/** input type for updating data in table "runtime_crash_report_sessions" */
export type Runtime_Crash_Report_Sessions_Set_Input = {
  runtime_crash_report_id?: InputMaybe<Scalars['uuid']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "runtime_crash_report_sessions" */
export enum Runtime_Crash_Report_Sessions_Update_Column {
  /** column name */
  RuntimeCrashReportId = 'runtime_crash_report_id',
  /** column name */
  SessionId = 'session_id'
}

/** columns and relationships of "runtime_crash_reports" */
export type Runtime_Crash_Reports = {
  __typename?: 'runtime_crash_reports';
  build_id: Scalars['String']['output'];
  controller_id: Scalars['String']['output'];
  crash_report: Scalars['jsonb']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  kind: Scalars['String']['output'];
  /** An object relationship */
  recording: Recordings;
  recording_id: Scalars['uuid']['output'];
  /** An array relationship */
  runtime_crash_report_sessions: Array<Runtime_Crash_Report_Sessions>;
  /** An aggregated array relationship */
  runtime_crash_report_sessions_aggregate: Runtime_Crash_Report_Sessions_Aggregate;
};


/** columns and relationships of "runtime_crash_reports" */
export type Runtime_Crash_ReportsCrash_ReportArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "runtime_crash_reports" */
export type Runtime_Crash_ReportsRuntime_Crash_Report_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Order_By>>;
  where?: InputMaybe<Runtime_Crash_Report_Sessions_Bool_Exp>;
};


/** columns and relationships of "runtime_crash_reports" */
export type Runtime_Crash_ReportsRuntime_Crash_Report_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Order_By>>;
  where?: InputMaybe<Runtime_Crash_Report_Sessions_Bool_Exp>;
};

/** aggregated selection of "runtime_crash_reports" */
export type Runtime_Crash_Reports_Aggregate = {
  __typename?: 'runtime_crash_reports_aggregate';
  aggregate?: Maybe<Runtime_Crash_Reports_Aggregate_Fields>;
  nodes: Array<Runtime_Crash_Reports>;
};

/** aggregate fields of "runtime_crash_reports" */
export type Runtime_Crash_Reports_Aggregate_Fields = {
  __typename?: 'runtime_crash_reports_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Runtime_Crash_Reports_Max_Fields>;
  min?: Maybe<Runtime_Crash_Reports_Min_Fields>;
};


/** aggregate fields of "runtime_crash_reports" */
export type Runtime_Crash_Reports_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Runtime_Crash_Reports_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "runtime_crash_reports" */
export type Runtime_Crash_Reports_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Runtime_Crash_Reports_Max_Order_By>;
  min?: InputMaybe<Runtime_Crash_Reports_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Runtime_Crash_Reports_Append_Input = {
  crash_report?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "runtime_crash_reports" */
export type Runtime_Crash_Reports_Arr_Rel_Insert_Input = {
  data: Array<Runtime_Crash_Reports_Insert_Input>;
  on_conflict?: InputMaybe<Runtime_Crash_Reports_On_Conflict>;
};

/** Boolean expression to filter rows from the table "runtime_crash_reports". All fields are combined with a logical 'AND'. */
export type Runtime_Crash_Reports_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Runtime_Crash_Reports_Bool_Exp>>>;
  _not?: InputMaybe<Runtime_Crash_Reports_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Runtime_Crash_Reports_Bool_Exp>>>;
  build_id?: InputMaybe<String_Comparison_Exp>;
  controller_id?: InputMaybe<String_Comparison_Exp>;
  crash_report?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<String_Comparison_Exp>;
  recording?: InputMaybe<Recordings_Bool_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  runtime_crash_report_sessions?: InputMaybe<Runtime_Crash_Report_Sessions_Bool_Exp>;
};

/** unique or primary key constraints on table "runtime_crash_reports" */
export enum Runtime_Crash_Reports_Constraint {
  /** unique or primary key constraint */
  RuntimeCrashReportsPkey = 'runtime_crash_reports_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Runtime_Crash_Reports_Delete_At_Path_Input = {
  crash_report?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Runtime_Crash_Reports_Delete_Elem_Input = {
  crash_report?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Runtime_Crash_Reports_Delete_Key_Input = {
  crash_report?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "runtime_crash_reports" */
export type Runtime_Crash_Reports_Insert_Input = {
  build_id?: InputMaybe<Scalars['String']['input']>;
  controller_id?: InputMaybe<Scalars['String']['input']>;
  crash_report?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  recording?: InputMaybe<Recordings_Obj_Rel_Insert_Input>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  runtime_crash_report_sessions?: InputMaybe<Runtime_Crash_Report_Sessions_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Runtime_Crash_Reports_Max_Fields = {
  __typename?: 'runtime_crash_reports_max_fields';
  build_id?: Maybe<Scalars['String']['output']>;
  controller_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "runtime_crash_reports" */
export type Runtime_Crash_Reports_Max_Order_By = {
  build_id?: InputMaybe<Order_By>;
  controller_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Runtime_Crash_Reports_Min_Fields = {
  __typename?: 'runtime_crash_reports_min_fields';
  build_id?: Maybe<Scalars['String']['output']>;
  controller_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "runtime_crash_reports" */
export type Runtime_Crash_Reports_Min_Order_By = {
  build_id?: InputMaybe<Order_By>;
  controller_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "runtime_crash_reports" */
export type Runtime_Crash_Reports_Mutation_Response = {
  __typename?: 'runtime_crash_reports_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Runtime_Crash_Reports>;
};

/** input type for inserting object relation for remote table "runtime_crash_reports" */
export type Runtime_Crash_Reports_Obj_Rel_Insert_Input = {
  data: Runtime_Crash_Reports_Insert_Input;
  on_conflict?: InputMaybe<Runtime_Crash_Reports_On_Conflict>;
};

/** on conflict condition type for table "runtime_crash_reports" */
export type Runtime_Crash_Reports_On_Conflict = {
  constraint: Runtime_Crash_Reports_Constraint;
  update_columns: Array<Runtime_Crash_Reports_Update_Column>;
  where?: InputMaybe<Runtime_Crash_Reports_Bool_Exp>;
};

/** ordering options when selecting data from "runtime_crash_reports" */
export type Runtime_Crash_Reports_Order_By = {
  build_id?: InputMaybe<Order_By>;
  controller_id?: InputMaybe<Order_By>;
  crash_report?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  recording?: InputMaybe<Recordings_Order_By>;
  recording_id?: InputMaybe<Order_By>;
  runtime_crash_report_sessions_aggregate?: InputMaybe<Runtime_Crash_Report_Sessions_Aggregate_Order_By>;
};

/** primary key columns input for table: "runtime_crash_reports" */
export type Runtime_Crash_Reports_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Runtime_Crash_Reports_Prepend_Input = {
  crash_report?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "runtime_crash_reports" */
export enum Runtime_Crash_Reports_Select_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  ControllerId = 'controller_id',
  /** column name */
  CrashReport = 'crash_report',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
  /** column name */
  RecordingId = 'recording_id'
}

/** input type for updating data in table "runtime_crash_reports" */
export type Runtime_Crash_Reports_Set_Input = {
  build_id?: InputMaybe<Scalars['String']['input']>;
  controller_id?: InputMaybe<Scalars['String']['input']>;
  crash_report?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "runtime_crash_reports" */
export enum Runtime_Crash_Reports_Update_Column {
  /** column name */
  BuildId = 'build_id',
  /** column name */
  ControllerId = 'controller_id',
  /** column name */
  CrashReport = 'crash_report',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
  /** column name */
  RecordingId = 'recording_id'
}

/** columns and relationships of "sessions" */
export type Sessions = {
  __typename?: 'sessions';
  /** An object relationship */
  controller?: Maybe<Controllers>;
  controller_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  crashReport?: Maybe<Crash_Reports>;
  created_at: Scalars['timestamptz']['output'];
  destroyed_at?: Maybe<Scalars['timestamptz']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  recording: Recordings;
  recording_id: Scalars['uuid']['output'];
  report?: Maybe<Scalars['jsonb']['output']>;
  /** An array relationship */
  runtime_crash_report_sessions: Array<Runtime_Crash_Report_Sessions>;
  /** An aggregated array relationship */
  runtime_crash_report_sessions_aggregate: Runtime_Crash_Report_Sessions_Aggregate;
  status_code?: Maybe<Scalars['Int']['output']>;
  test: Scalars['Boolean']['output'];
  type?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "sessions" */
export type SessionsReportArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "sessions" */
export type SessionsRuntime_Crash_Report_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Order_By>>;
  where?: InputMaybe<Runtime_Crash_Report_Sessions_Bool_Exp>;
};


/** columns and relationships of "sessions" */
export type SessionsRuntime_Crash_Report_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Order_By>>;
  where?: InputMaybe<Runtime_Crash_Report_Sessions_Bool_Exp>;
};

/** aggregated selection of "sessions" */
export type Sessions_Aggregate = {
  __typename?: 'sessions_aggregate';
  aggregate?: Maybe<Sessions_Aggregate_Fields>;
  nodes: Array<Sessions>;
};

/** aggregate fields of "sessions" */
export type Sessions_Aggregate_Fields = {
  __typename?: 'sessions_aggregate_fields';
  avg?: Maybe<Sessions_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Sessions_Max_Fields>;
  min?: Maybe<Sessions_Min_Fields>;
  stddev?: Maybe<Sessions_Stddev_Fields>;
  stddev_pop?: Maybe<Sessions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Sessions_Stddev_Samp_Fields>;
  sum?: Maybe<Sessions_Sum_Fields>;
  var_pop?: Maybe<Sessions_Var_Pop_Fields>;
  var_samp?: Maybe<Sessions_Var_Samp_Fields>;
  variance?: Maybe<Sessions_Variance_Fields>;
};


/** aggregate fields of "sessions" */
export type Sessions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Sessions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "sessions" */
export type Sessions_Aggregate_Order_By = {
  avg?: InputMaybe<Sessions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Sessions_Max_Order_By>;
  min?: InputMaybe<Sessions_Min_Order_By>;
  stddev?: InputMaybe<Sessions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Sessions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Sessions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Sessions_Sum_Order_By>;
  var_pop?: InputMaybe<Sessions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Sessions_Var_Samp_Order_By>;
  variance?: InputMaybe<Sessions_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Sessions_Append_Input = {
  report?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "sessions" */
export type Sessions_Arr_Rel_Insert_Input = {
  data: Array<Sessions_Insert_Input>;
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};

/** aggregate avg on columns */
export type Sessions_Avg_Fields = {
  __typename?: 'sessions_avg_fields';
  status_code?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "sessions" */
export type Sessions_Avg_Order_By = {
  status_code?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "sessions". All fields are combined with a logical 'AND'. */
export type Sessions_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Sessions_Bool_Exp>>>;
  _not?: InputMaybe<Sessions_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Sessions_Bool_Exp>>>;
  controller?: InputMaybe<Controllers_Bool_Exp>;
  controller_id?: InputMaybe<String_Comparison_Exp>;
  crashReport?: InputMaybe<Crash_Reports_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  destroyed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  error?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  recording?: InputMaybe<Recordings_Bool_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  report?: InputMaybe<Jsonb_Comparison_Exp>;
  runtime_crash_report_sessions?: InputMaybe<Runtime_Crash_Report_Sessions_Bool_Exp>;
  status_code?: InputMaybe<Int_Comparison_Exp>;
  test?: InputMaybe<Boolean_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "sessions" */
export enum Sessions_Constraint {
  /** unique or primary key constraint */
  SessionsPkey = 'sessions_pkey',
  /** unique or primary key constraint */
  SessionsSessionIdKey = 'sessions_session_id_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Sessions_Delete_At_Path_Input = {
  report?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Sessions_Delete_Elem_Input = {
  report?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Sessions_Delete_Key_Input = {
  report?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing integer column in table "sessions" */
export type Sessions_Inc_Input = {
  status_code?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "sessions" */
export type Sessions_Insert_Input = {
  controller?: InputMaybe<Controllers_Obj_Rel_Insert_Input>;
  controller_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  destroyed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recording?: InputMaybe<Recordings_Obj_Rel_Insert_Input>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  report?: InputMaybe<Scalars['jsonb']['input']>;
  runtime_crash_report_sessions?: InputMaybe<Runtime_Crash_Report_Sessions_Arr_Rel_Insert_Input>;
  status_code?: InputMaybe<Scalars['Int']['input']>;
  test?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Sessions_Max_Fields = {
  __typename?: 'sessions_max_fields';
  controller_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  destroyed_at?: Maybe<Scalars['timestamptz']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  status_code?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "sessions" */
export type Sessions_Max_Order_By = {
  controller_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  destroyed_at?: InputMaybe<Order_By>;
  error?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  status_code?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Sessions_Min_Fields = {
  __typename?: 'sessions_min_fields';
  controller_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  destroyed_at?: Maybe<Scalars['timestamptz']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  status_code?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "sessions" */
export type Sessions_Min_Order_By = {
  controller_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  destroyed_at?: InputMaybe<Order_By>;
  error?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  status_code?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "sessions" */
export type Sessions_Mutation_Response = {
  __typename?: 'sessions_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Sessions>;
};

/** input type for inserting object relation for remote table "sessions" */
export type Sessions_Obj_Rel_Insert_Input = {
  data: Sessions_Insert_Input;
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};

/** on conflict condition type for table "sessions" */
export type Sessions_On_Conflict = {
  constraint: Sessions_Constraint;
  update_columns: Array<Sessions_Update_Column>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** ordering options when selecting data from "sessions" */
export type Sessions_Order_By = {
  controller?: InputMaybe<Controllers_Order_By>;
  controller_id?: InputMaybe<Order_By>;
  crashReport?: InputMaybe<Crash_Reports_Order_By>;
  created_at?: InputMaybe<Order_By>;
  destroyed_at?: InputMaybe<Order_By>;
  error?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording?: InputMaybe<Recordings_Order_By>;
  recording_id?: InputMaybe<Order_By>;
  report?: InputMaybe<Order_By>;
  runtime_crash_report_sessions_aggregate?: InputMaybe<Runtime_Crash_Report_Sessions_Aggregate_Order_By>;
  status_code?: InputMaybe<Order_By>;
  test?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "sessions" */
export type Sessions_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Sessions_Prepend_Input = {
  report?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "sessions" */
export enum Sessions_Select_Column {
  /** column name */
  ControllerId = 'controller_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DestroyedAt = 'destroyed_at',
  /** column name */
  Error = 'error',
  /** column name */
  Id = 'id',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Report = 'report',
  /** column name */
  StatusCode = 'status_code',
  /** column name */
  Test = 'test',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "sessions" */
export type Sessions_Set_Input = {
  controller_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  destroyed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  report?: InputMaybe<Scalars['jsonb']['input']>;
  status_code?: InputMaybe<Scalars['Int']['input']>;
  test?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Sessions_Stddev_Fields = {
  __typename?: 'sessions_stddev_fields';
  status_code?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "sessions" */
export type Sessions_Stddev_Order_By = {
  status_code?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Sessions_Stddev_Pop_Fields = {
  __typename?: 'sessions_stddev_pop_fields';
  status_code?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "sessions" */
export type Sessions_Stddev_Pop_Order_By = {
  status_code?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Sessions_Stddev_Samp_Fields = {
  __typename?: 'sessions_stddev_samp_fields';
  status_code?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "sessions" */
export type Sessions_Stddev_Samp_Order_By = {
  status_code?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Sessions_Sum_Fields = {
  __typename?: 'sessions_sum_fields';
  status_code?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "sessions" */
export type Sessions_Sum_Order_By = {
  status_code?: InputMaybe<Order_By>;
};

/** update columns of table "sessions" */
export enum Sessions_Update_Column {
  /** column name */
  ControllerId = 'controller_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DestroyedAt = 'destroyed_at',
  /** column name */
  Error = 'error',
  /** column name */
  Id = 'id',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Report = 'report',
  /** column name */
  StatusCode = 'status_code',
  /** column name */
  Test = 'test',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Sessions_Var_Pop_Fields = {
  __typename?: 'sessions_var_pop_fields';
  status_code?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "sessions" */
export type Sessions_Var_Pop_Order_By = {
  status_code?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Sessions_Var_Samp_Fields = {
  __typename?: 'sessions_var_samp_fields';
  status_code?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "sessions" */
export type Sessions_Var_Samp_Order_By = {
  status_code?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Sessions_Variance_Fields = {
  __typename?: 'sessions_variance_fields';
  status_code?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "sessions" */
export type Sessions_Variance_Order_By = {
  status_code?: InputMaybe<Order_By>;
};

/**
 * This is an internal table that will be used to track the status of recordings in a new test inbox called the simple inbox
 *
 *
 * columns and relationships of "simple_inbox"
 */
export type Simple_Inbox = {
  __typename?: 'simple_inbox';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['Int']['output'];
  /** An object relationship */
  recording: Recordings;
  recording_id: Scalars['uuid']['output'];
  status: Scalars['Int']['output'];
};

/** aggregated selection of "simple_inbox" */
export type Simple_Inbox_Aggregate = {
  __typename?: 'simple_inbox_aggregate';
  aggregate?: Maybe<Simple_Inbox_Aggregate_Fields>;
  nodes: Array<Simple_Inbox>;
};

/** aggregate fields of "simple_inbox" */
export type Simple_Inbox_Aggregate_Fields = {
  __typename?: 'simple_inbox_aggregate_fields';
  avg?: Maybe<Simple_Inbox_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Simple_Inbox_Max_Fields>;
  min?: Maybe<Simple_Inbox_Min_Fields>;
  stddev?: Maybe<Simple_Inbox_Stddev_Fields>;
  stddev_pop?: Maybe<Simple_Inbox_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Simple_Inbox_Stddev_Samp_Fields>;
  sum?: Maybe<Simple_Inbox_Sum_Fields>;
  var_pop?: Maybe<Simple_Inbox_Var_Pop_Fields>;
  var_samp?: Maybe<Simple_Inbox_Var_Samp_Fields>;
  variance?: Maybe<Simple_Inbox_Variance_Fields>;
};


/** aggregate fields of "simple_inbox" */
export type Simple_Inbox_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Simple_Inbox_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "simple_inbox" */
export type Simple_Inbox_Aggregate_Order_By = {
  avg?: InputMaybe<Simple_Inbox_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Simple_Inbox_Max_Order_By>;
  min?: InputMaybe<Simple_Inbox_Min_Order_By>;
  stddev?: InputMaybe<Simple_Inbox_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Simple_Inbox_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Simple_Inbox_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Simple_Inbox_Sum_Order_By>;
  var_pop?: InputMaybe<Simple_Inbox_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Simple_Inbox_Var_Samp_Order_By>;
  variance?: InputMaybe<Simple_Inbox_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "simple_inbox" */
export type Simple_Inbox_Arr_Rel_Insert_Input = {
  data: Array<Simple_Inbox_Insert_Input>;
  on_conflict?: InputMaybe<Simple_Inbox_On_Conflict>;
};

/** aggregate avg on columns */
export type Simple_Inbox_Avg_Fields = {
  __typename?: 'simple_inbox_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "simple_inbox" */
export type Simple_Inbox_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "simple_inbox". All fields are combined with a logical 'AND'. */
export type Simple_Inbox_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Simple_Inbox_Bool_Exp>>>;
  _not?: InputMaybe<Simple_Inbox_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Simple_Inbox_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  recording?: InputMaybe<Recordings_Bool_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "simple_inbox" */
export enum Simple_Inbox_Constraint {
  /** unique or primary key constraint */
  SimpleInboxPkey = 'simple_inbox_pkey'
}

/** input type for incrementing integer column in table "simple_inbox" */
export type Simple_Inbox_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "simple_inbox" */
export type Simple_Inbox_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  recording?: InputMaybe<Recordings_Obj_Rel_Insert_Input>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Simple_Inbox_Max_Fields = {
  __typename?: 'simple_inbox_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "simple_inbox" */
export type Simple_Inbox_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Simple_Inbox_Min_Fields = {
  __typename?: 'simple_inbox_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "simple_inbox" */
export type Simple_Inbox_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "simple_inbox" */
export type Simple_Inbox_Mutation_Response = {
  __typename?: 'simple_inbox_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Simple_Inbox>;
};

/** input type for inserting object relation for remote table "simple_inbox" */
export type Simple_Inbox_Obj_Rel_Insert_Input = {
  data: Simple_Inbox_Insert_Input;
  on_conflict?: InputMaybe<Simple_Inbox_On_Conflict>;
};

/** on conflict condition type for table "simple_inbox" */
export type Simple_Inbox_On_Conflict = {
  constraint: Simple_Inbox_Constraint;
  update_columns: Array<Simple_Inbox_Update_Column>;
  where?: InputMaybe<Simple_Inbox_Bool_Exp>;
};

/** ordering options when selecting data from "simple_inbox" */
export type Simple_Inbox_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recording?: InputMaybe<Recordings_Order_By>;
  recording_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "simple_inbox" */
export type Simple_Inbox_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "simple_inbox" */
export enum Simple_Inbox_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "simple_inbox" */
export type Simple_Inbox_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Simple_Inbox_Stddev_Fields = {
  __typename?: 'simple_inbox_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "simple_inbox" */
export type Simple_Inbox_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Simple_Inbox_Stddev_Pop_Fields = {
  __typename?: 'simple_inbox_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "simple_inbox" */
export type Simple_Inbox_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Simple_Inbox_Stddev_Samp_Fields = {
  __typename?: 'simple_inbox_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "simple_inbox" */
export type Simple_Inbox_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Simple_Inbox_Sum_Fields = {
  __typename?: 'simple_inbox_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "simple_inbox" */
export type Simple_Inbox_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** update columns of table "simple_inbox" */
export enum Simple_Inbox_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Status = 'status'
}

/** aggregate var_pop on columns */
export type Simple_Inbox_Var_Pop_Fields = {
  __typename?: 'simple_inbox_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "simple_inbox" */
export type Simple_Inbox_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Simple_Inbox_Var_Samp_Fields = {
  __typename?: 'simple_inbox_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "simple_inbox" */
export type Simple_Inbox_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Simple_Inbox_Variance_Fields = {
  __typename?: 'simple_inbox_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "simple_inbox" */
export type Simple_Inbox_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** columns and relationships of "snapshot_diffs" */
export type Snapshot_Diffs = {
  __typename?: 'snapshot_diffs';
  asset_id: Scalars['String']['output'];
  base_snapshot_checkpoint: Scalars['Int']['output'];
  created_at: Scalars['timestamptz']['output'];
  end_checkpoint: Scalars['Int']['output'];
  recording_id: Scalars['uuid']['output'];
  start_checkpoint: Scalars['Int']['output'];
  version_id: Scalars['Int']['output'];
};

/** aggregated selection of "snapshot_diffs" */
export type Snapshot_Diffs_Aggregate = {
  __typename?: 'snapshot_diffs_aggregate';
  aggregate?: Maybe<Snapshot_Diffs_Aggregate_Fields>;
  nodes: Array<Snapshot_Diffs>;
};

/** aggregate fields of "snapshot_diffs" */
export type Snapshot_Diffs_Aggregate_Fields = {
  __typename?: 'snapshot_diffs_aggregate_fields';
  avg?: Maybe<Snapshot_Diffs_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Snapshot_Diffs_Max_Fields>;
  min?: Maybe<Snapshot_Diffs_Min_Fields>;
  stddev?: Maybe<Snapshot_Diffs_Stddev_Fields>;
  stddev_pop?: Maybe<Snapshot_Diffs_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Snapshot_Diffs_Stddev_Samp_Fields>;
  sum?: Maybe<Snapshot_Diffs_Sum_Fields>;
  var_pop?: Maybe<Snapshot_Diffs_Var_Pop_Fields>;
  var_samp?: Maybe<Snapshot_Diffs_Var_Samp_Fields>;
  variance?: Maybe<Snapshot_Diffs_Variance_Fields>;
};


/** aggregate fields of "snapshot_diffs" */
export type Snapshot_Diffs_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Snapshot_Diffs_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "snapshot_diffs" */
export type Snapshot_Diffs_Aggregate_Order_By = {
  avg?: InputMaybe<Snapshot_Diffs_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Snapshot_Diffs_Max_Order_By>;
  min?: InputMaybe<Snapshot_Diffs_Min_Order_By>;
  stddev?: InputMaybe<Snapshot_Diffs_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Snapshot_Diffs_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Snapshot_Diffs_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Snapshot_Diffs_Sum_Order_By>;
  var_pop?: InputMaybe<Snapshot_Diffs_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Snapshot_Diffs_Var_Samp_Order_By>;
  variance?: InputMaybe<Snapshot_Diffs_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "snapshot_diffs" */
export type Snapshot_Diffs_Arr_Rel_Insert_Input = {
  data: Array<Snapshot_Diffs_Insert_Input>;
  on_conflict?: InputMaybe<Snapshot_Diffs_On_Conflict>;
};

/** aggregate avg on columns */
export type Snapshot_Diffs_Avg_Fields = {
  __typename?: 'snapshot_diffs_avg_fields';
  base_snapshot_checkpoint?: Maybe<Scalars['Float']['output']>;
  end_checkpoint?: Maybe<Scalars['Float']['output']>;
  start_checkpoint?: Maybe<Scalars['Float']['output']>;
  version_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "snapshot_diffs" */
export type Snapshot_Diffs_Avg_Order_By = {
  base_snapshot_checkpoint?: InputMaybe<Order_By>;
  end_checkpoint?: InputMaybe<Order_By>;
  start_checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "snapshot_diffs". All fields are combined with a logical 'AND'. */
export type Snapshot_Diffs_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Snapshot_Diffs_Bool_Exp>>>;
  _not?: InputMaybe<Snapshot_Diffs_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Snapshot_Diffs_Bool_Exp>>>;
  asset_id?: InputMaybe<String_Comparison_Exp>;
  base_snapshot_checkpoint?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_checkpoint?: InputMaybe<Int_Comparison_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  start_checkpoint?: InputMaybe<Int_Comparison_Exp>;
  version_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "snapshot_diffs" */
export enum Snapshot_Diffs_Constraint {
  /** unique or primary key constraint */
  SnapshotDiffsAssetIdKey = 'snapshot_diffs_asset_id_key',
  /** unique or primary key constraint */
  SnapshotDiffsPkey = 'snapshot_diffs_pkey'
}

/** input type for incrementing integer column in table "snapshot_diffs" */
export type Snapshot_Diffs_Inc_Input = {
  base_snapshot_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  end_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  start_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  version_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "snapshot_diffs" */
export type Snapshot_Diffs_Insert_Input = {
  asset_id?: InputMaybe<Scalars['String']['input']>;
  base_snapshot_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  end_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  start_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  version_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Snapshot_Diffs_Max_Fields = {
  __typename?: 'snapshot_diffs_max_fields';
  asset_id?: Maybe<Scalars['String']['output']>;
  base_snapshot_checkpoint?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  end_checkpoint?: Maybe<Scalars['Int']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  start_checkpoint?: Maybe<Scalars['Int']['output']>;
  version_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "snapshot_diffs" */
export type Snapshot_Diffs_Max_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  base_snapshot_checkpoint?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  end_checkpoint?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  start_checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Snapshot_Diffs_Min_Fields = {
  __typename?: 'snapshot_diffs_min_fields';
  asset_id?: Maybe<Scalars['String']['output']>;
  base_snapshot_checkpoint?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  end_checkpoint?: Maybe<Scalars['Int']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  start_checkpoint?: Maybe<Scalars['Int']['output']>;
  version_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "snapshot_diffs" */
export type Snapshot_Diffs_Min_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  base_snapshot_checkpoint?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  end_checkpoint?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  start_checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "snapshot_diffs" */
export type Snapshot_Diffs_Mutation_Response = {
  __typename?: 'snapshot_diffs_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Snapshot_Diffs>;
};

/** input type for inserting object relation for remote table "snapshot_diffs" */
export type Snapshot_Diffs_Obj_Rel_Insert_Input = {
  data: Snapshot_Diffs_Insert_Input;
  on_conflict?: InputMaybe<Snapshot_Diffs_On_Conflict>;
};

/** on conflict condition type for table "snapshot_diffs" */
export type Snapshot_Diffs_On_Conflict = {
  constraint: Snapshot_Diffs_Constraint;
  update_columns: Array<Snapshot_Diffs_Update_Column>;
  where?: InputMaybe<Snapshot_Diffs_Bool_Exp>;
};

/** ordering options when selecting data from "snapshot_diffs" */
export type Snapshot_Diffs_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  base_snapshot_checkpoint?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  end_checkpoint?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  start_checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "snapshot_diffs" */
export type Snapshot_Diffs_Pk_Columns_Input = {
  end_checkpoint: Scalars['Int']['input'];
  recording_id: Scalars['uuid']['input'];
  version_id: Scalars['Int']['input'];
};

/** select columns of table "snapshot_diffs" */
export enum Snapshot_Diffs_Select_Column {
  /** column name */
  AssetId = 'asset_id',
  /** column name */
  BaseSnapshotCheckpoint = 'base_snapshot_checkpoint',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EndCheckpoint = 'end_checkpoint',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  StartCheckpoint = 'start_checkpoint',
  /** column name */
  VersionId = 'version_id'
}

/** input type for updating data in table "snapshot_diffs" */
export type Snapshot_Diffs_Set_Input = {
  asset_id?: InputMaybe<Scalars['String']['input']>;
  base_snapshot_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  end_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  start_checkpoint?: InputMaybe<Scalars['Int']['input']>;
  version_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Snapshot_Diffs_Stddev_Fields = {
  __typename?: 'snapshot_diffs_stddev_fields';
  base_snapshot_checkpoint?: Maybe<Scalars['Float']['output']>;
  end_checkpoint?: Maybe<Scalars['Float']['output']>;
  start_checkpoint?: Maybe<Scalars['Float']['output']>;
  version_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "snapshot_diffs" */
export type Snapshot_Diffs_Stddev_Order_By = {
  base_snapshot_checkpoint?: InputMaybe<Order_By>;
  end_checkpoint?: InputMaybe<Order_By>;
  start_checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Snapshot_Diffs_Stddev_Pop_Fields = {
  __typename?: 'snapshot_diffs_stddev_pop_fields';
  base_snapshot_checkpoint?: Maybe<Scalars['Float']['output']>;
  end_checkpoint?: Maybe<Scalars['Float']['output']>;
  start_checkpoint?: Maybe<Scalars['Float']['output']>;
  version_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "snapshot_diffs" */
export type Snapshot_Diffs_Stddev_Pop_Order_By = {
  base_snapshot_checkpoint?: InputMaybe<Order_By>;
  end_checkpoint?: InputMaybe<Order_By>;
  start_checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Snapshot_Diffs_Stddev_Samp_Fields = {
  __typename?: 'snapshot_diffs_stddev_samp_fields';
  base_snapshot_checkpoint?: Maybe<Scalars['Float']['output']>;
  end_checkpoint?: Maybe<Scalars['Float']['output']>;
  start_checkpoint?: Maybe<Scalars['Float']['output']>;
  version_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "snapshot_diffs" */
export type Snapshot_Diffs_Stddev_Samp_Order_By = {
  base_snapshot_checkpoint?: InputMaybe<Order_By>;
  end_checkpoint?: InputMaybe<Order_By>;
  start_checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Snapshot_Diffs_Sum_Fields = {
  __typename?: 'snapshot_diffs_sum_fields';
  base_snapshot_checkpoint?: Maybe<Scalars['Int']['output']>;
  end_checkpoint?: Maybe<Scalars['Int']['output']>;
  start_checkpoint?: Maybe<Scalars['Int']['output']>;
  version_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "snapshot_diffs" */
export type Snapshot_Diffs_Sum_Order_By = {
  base_snapshot_checkpoint?: InputMaybe<Order_By>;
  end_checkpoint?: InputMaybe<Order_By>;
  start_checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** update columns of table "snapshot_diffs" */
export enum Snapshot_Diffs_Update_Column {
  /** column name */
  AssetId = 'asset_id',
  /** column name */
  BaseSnapshotCheckpoint = 'base_snapshot_checkpoint',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EndCheckpoint = 'end_checkpoint',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  StartCheckpoint = 'start_checkpoint',
  /** column name */
  VersionId = 'version_id'
}

/** aggregate var_pop on columns */
export type Snapshot_Diffs_Var_Pop_Fields = {
  __typename?: 'snapshot_diffs_var_pop_fields';
  base_snapshot_checkpoint?: Maybe<Scalars['Float']['output']>;
  end_checkpoint?: Maybe<Scalars['Float']['output']>;
  start_checkpoint?: Maybe<Scalars['Float']['output']>;
  version_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "snapshot_diffs" */
export type Snapshot_Diffs_Var_Pop_Order_By = {
  base_snapshot_checkpoint?: InputMaybe<Order_By>;
  end_checkpoint?: InputMaybe<Order_By>;
  start_checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Snapshot_Diffs_Var_Samp_Fields = {
  __typename?: 'snapshot_diffs_var_samp_fields';
  base_snapshot_checkpoint?: Maybe<Scalars['Float']['output']>;
  end_checkpoint?: Maybe<Scalars['Float']['output']>;
  start_checkpoint?: Maybe<Scalars['Float']['output']>;
  version_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "snapshot_diffs" */
export type Snapshot_Diffs_Var_Samp_Order_By = {
  base_snapshot_checkpoint?: InputMaybe<Order_By>;
  end_checkpoint?: InputMaybe<Order_By>;
  start_checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Snapshot_Diffs_Variance_Fields = {
  __typename?: 'snapshot_diffs_variance_fields';
  base_snapshot_checkpoint?: Maybe<Scalars['Float']['output']>;
  end_checkpoint?: Maybe<Scalars['Float']['output']>;
  start_checkpoint?: Maybe<Scalars['Float']['output']>;
  version_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "snapshot_diffs" */
export type Snapshot_Diffs_Variance_Order_By = {
  base_snapshot_checkpoint?: InputMaybe<Order_By>;
  end_checkpoint?: InputMaybe<Order_By>;
  start_checkpoint?: InputMaybe<Order_By>;
  version_id?: InputMaybe<Order_By>;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "api_keys" */
  api_keys: Array<Api_Keys>;
  /** fetch aggregated fields from the table: "api_keys" */
  api_keys_aggregate: Api_Keys_Aggregate;
  /** fetch data from the table: "api_keys" using primary key columns */
  api_keys_by_pk?: Maybe<Api_Keys>;
  /** fetch data from the table: "auth_requests" */
  auth_requests: Array<Auth_Requests>;
  /** fetch aggregated fields from the table: "auth_requests" */
  auth_requests_aggregate: Auth_Requests_Aggregate;
  /** fetch data from the table: "auth_requests" using primary key columns */
  auth_requests_by_pk?: Maybe<Auth_Requests>;
  /** fetch data from the table: "base_snapshots" */
  base_snapshots: Array<Base_Snapshots>;
  /** fetch aggregated fields from the table: "base_snapshots" */
  base_snapshots_aggregate: Base_Snapshots_Aggregate;
  /** fetch data from the table: "base_snapshots" using primary key columns */
  base_snapshots_by_pk?: Maybe<Base_Snapshots>;
  /** fetch data from the table: "cache_warming_results" */
  cache_warming_results: Array<Cache_Warming_Results>;
  /** fetch aggregated fields from the table: "cache_warming_results" */
  cache_warming_results_aggregate: Cache_Warming_Results_Aggregate;
  /** fetch data from the table: "cache_warming_results" using primary key columns */
  cache_warming_results_by_pk?: Maybe<Cache_Warming_Results>;
  /** fetch data from the table: "collaborator_requests" */
  collaborator_requests: Array<Collaborator_Requests>;
  /** fetch aggregated fields from the table: "collaborator_requests" */
  collaborator_requests_aggregate: Collaborator_Requests_Aggregate;
  /** fetch data from the table: "collaborator_requests" using primary key columns */
  collaborator_requests_by_pk?: Maybe<Collaborator_Requests>;
  /** fetch data from the table: "collaborators" */
  collaborators: Array<Collaborators>;
  /** fetch aggregated fields from the table: "collaborators" */
  collaborators_aggregate: Collaborators_Aggregate;
  /** fetch data from the table: "collaborators" using primary key columns */
  collaborators_by_pk?: Maybe<Collaborators>;
  /** fetch data from the table: "comments" */
  comments: Array<Comments>;
  /** fetch aggregated fields from the table: "comments" */
  comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "comments" using primary key columns */
  comments_by_pk?: Maybe<Comments>;
  /** fetch data from the table: "controllers" */
  controllers: Array<Controllers>;
  /** fetch aggregated fields from the table: "controllers" */
  controllers_aggregate: Controllers_Aggregate;
  /** fetch data from the table: "controllers" using primary key columns */
  controllers_by_pk?: Maybe<Controllers>;
  /** fetch data from the table: "crash_reports" */
  crash_reports: Array<Crash_Reports>;
  /** fetch aggregated fields from the table: "crash_reports" */
  crash_reports_aggregate: Crash_Reports_Aggregate;
  /** fetch data from the table: "dojo_sessions" */
  dojo_sessions: Array<Dojo_Sessions>;
  /** fetch aggregated fields from the table: "dojo_sessions" */
  dojo_sessions_aggregate: Dojo_Sessions_Aggregate;
  /** fetch data from the table: "dojo_sessions" using primary key columns */
  dojo_sessions_by_pk?: Maybe<Dojo_Sessions>;
  /** fetch data from the table: "experimental_crash_reports_filters" */
  experimental_crash_reports_filters: Array<Experimental_Crash_Reports_Filters>;
  /** fetch aggregated fields from the table: "experimental_crash_reports_filters" */
  experimental_crash_reports_filters_aggregate: Experimental_Crash_Reports_Filters_Aggregate;
  /** fetch data from the table: "experimental_crash_reports_filters" using primary key columns */
  experimental_crash_reports_filters_by_pk?: Maybe<Experimental_Crash_Reports_Filters>;
  /** fetch data from the table: "filters" */
  filters: Array<Filters>;
  /** fetch aggregated fields from the table: "filters" */
  filters_aggregate: Filters_Aggregate;
  /** fetch data from the table: "filters" using primary key columns */
  filters_by_pk?: Maybe<Filters>;
  /** perform the action: "getCommentsWithAuthId" */
  getCommentsWithAuthId?: Maybe<SampleOutput>;
  /** fetch data from the table: "invitations" */
  invitations: Array<Invitations>;
  /** fetch aggregated fields from the table: "invitations" */
  invitations_aggregate: Invitations_Aggregate;
  /** fetch data from the table: "invitations" using primary key columns */
  invitations_by_pk?: Maybe<Invitations>;
  /** fetch data from the table: "organizations" */
  organizations: Array<Organizations>;
  /** fetch aggregated fields from the table: "organizations" */
  organizations_aggregate: Organizations_Aggregate;
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** fetch data from the table: "plans" */
  plans: Array<Plans>;
  /** fetch aggregated fields from the table: "plans" */
  plans_aggregate: Plans_Aggregate;
  /** fetch data from the table: "plans" using primary key columns */
  plans_by_pk?: Maybe<Plans>;
  /** fetch data from the table: "processing_task_state" */
  processing_task_state: Array<Processing_Task_State>;
  /** fetch aggregated fields from the table: "processing_task_state" */
  processing_task_state_aggregate: Processing_Task_State_Aggregate;
  /** fetch data from the table: "processing_task_state" using primary key columns */
  processing_task_state_by_pk?: Maybe<Processing_Task_State>;
  recording?: Maybe<Recording>;
  /** fetch data from the table: "recording_assets" */
  recording_assets: Array<Recording_Assets>;
  /** fetch aggregated fields from the table: "recording_assets" */
  recording_assets_aggregate: Recording_Assets_Aggregate;
  /** fetch data from the table: "recording_assets" using primary key columns */
  recording_assets_by_pk?: Maybe<Recording_Assets>;
  /** fetch data from the table: "recording_checkpoints" */
  recording_checkpoints: Array<Recording_Checkpoints>;
  /** fetch aggregated fields from the table: "recording_checkpoints" */
  recording_checkpoints_aggregate: Recording_Checkpoints_Aggregate;
  /** fetch data from the table: "recording_checkpoints" using primary key columns */
  recording_checkpoints_by_pk?: Maybe<Recording_Checkpoints>;
  /** fetch data from the table: "recording_originalsources" */
  recording_originalsources: Array<Recording_Originalsources>;
  /** fetch aggregated fields from the table: "recording_originalsources" */
  recording_originalsources_aggregate: Recording_Originalsources_Aggregate;
  /** fetch data from the table: "recording_originalsources" using primary key columns */
  recording_originalsources_by_pk?: Maybe<Recording_Originalsources>;
  /** fetch data from the table: "recording_points" */
  recording_points: Array<Recording_Points>;
  /** fetch aggregated fields from the table: "recording_points" */
  recording_points_aggregate: Recording_Points_Aggregate;
  /** fetch data from the table: "recording_points" using primary key columns */
  recording_points_by_pk?: Maybe<Recording_Points>;
  /** fetch data from the table: "recording_regions" */
  recording_regions: Array<Recording_Regions>;
  /** fetch aggregated fields from the table: "recording_regions" */
  recording_regions_aggregate: Recording_Regions_Aggregate;
  /** fetch data from the table: "recording_regions" using primary key columns */
  recording_regions_by_pk?: Maybe<Recording_Regions>;
  /** fetch data from the table: "recording_sourcemaps" */
  recording_sourcemaps: Array<Recording_Sourcemaps>;
  /** fetch aggregated fields from the table: "recording_sourcemaps" */
  recording_sourcemaps_aggregate: Recording_Sourcemaps_Aggregate;
  /** fetch data from the table: "recording_sourcemaps" using primary key columns */
  recording_sourcemaps_by_pk?: Maybe<Recording_Sourcemaps>;
  /** fetch data from the table: "recordings" */
  recordings: Array<Recordings>;
  /** fetch aggregated fields from the table: "recordings" */
  recordings_aggregate: Recordings_Aggregate;
  /** fetch data from the table: "recordings" using primary key columns */
  recordings_by_pk?: Maybe<Recordings>;
  /** fetch data from the table: "release_build_files" */
  release_build_files: Array<Release_Build_Files>;
  /** fetch aggregated fields from the table: "release_build_files" */
  release_build_files_aggregate: Release_Build_Files_Aggregate;
  /** fetch data from the table: "release_build_files" using primary key columns */
  release_build_files_by_pk?: Maybe<Release_Build_Files>;
  /** fetch data from the table: "releases" */
  releases: Array<Releases>;
  /** fetch aggregated fields from the table: "releases" */
  releases_aggregate: Releases_Aggregate;
  /** fetch data from the table: "releases" using primary key columns */
  releases_by_pk?: Maybe<Releases>;
  /** fetch data from the table: "root_cause_analysis_results" */
  root_cause_analysis_results: Array<Root_Cause_Analysis_Results>;
  /** fetch aggregated fields from the table: "root_cause_analysis_results" */
  root_cause_analysis_results_aggregate: Root_Cause_Analysis_Results_Aggregate;
  /** fetch data from the table: "root_cause_analysis_results" using primary key columns */
  root_cause_analysis_results_by_pk?: Maybe<Root_Cause_Analysis_Results>;
  /** fetch data from the table: "runtime_crash_report_sessions" */
  runtime_crash_report_sessions: Array<Runtime_Crash_Report_Sessions>;
  /** fetch aggregated fields from the table: "runtime_crash_report_sessions" */
  runtime_crash_report_sessions_aggregate: Runtime_Crash_Report_Sessions_Aggregate;
  /** fetch data from the table: "runtime_crash_report_sessions" using primary key columns */
  runtime_crash_report_sessions_by_pk?: Maybe<Runtime_Crash_Report_Sessions>;
  /** fetch data from the table: "runtime_crash_reports" */
  runtime_crash_reports: Array<Runtime_Crash_Reports>;
  /** fetch aggregated fields from the table: "runtime_crash_reports" */
  runtime_crash_reports_aggregate: Runtime_Crash_Reports_Aggregate;
  /** fetch data from the table: "runtime_crash_reports" using primary key columns */
  runtime_crash_reports_by_pk?: Maybe<Runtime_Crash_Reports>;
  /** fetch data from the table: "sessions" */
  sessions: Array<Sessions>;
  /** fetch aggregated fields from the table: "sessions" */
  sessions_aggregate: Sessions_Aggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  sessions_by_pk?: Maybe<Sessions>;
  /** fetch data from the table: "simple_inbox" */
  simple_inbox: Array<Simple_Inbox>;
  /** fetch aggregated fields from the table: "simple_inbox" */
  simple_inbox_aggregate: Simple_Inbox_Aggregate;
  /** fetch data from the table: "simple_inbox" using primary key columns */
  simple_inbox_by_pk?: Maybe<Simple_Inbox>;
  /** fetch data from the table: "snapshot_diffs" */
  snapshot_diffs: Array<Snapshot_Diffs>;
  /** fetch aggregated fields from the table: "snapshot_diffs" */
  snapshot_diffs_aggregate: Snapshot_Diffs_Aggregate;
  /** fetch data from the table: "snapshot_diffs" using primary key columns */
  snapshot_diffs_by_pk?: Maybe<Snapshot_Diffs>;
  /** fetch data from the table: "test_run_metrics" */
  test_run_metrics: Array<Test_Run_Metrics>;
  /** fetch aggregated fields from the table: "test_run_metrics" */
  test_run_metrics_aggregate: Test_Run_Metrics_Aggregate;
  /** fetch data from the table: "test_run_metrics" using primary key columns */
  test_run_metrics_by_pk?: Maybe<Test_Run_Metrics>;
  /** fetch data from the table: "test_run_results" */
  test_run_results: Array<Test_Run_Results>;
  /** fetch aggregated fields from the table: "test_run_results" */
  test_run_results_aggregate: Test_Run_Results_Aggregate;
  /** fetch data from the table: "test_run_results" using primary key columns */
  test_run_results_by_pk?: Maybe<Test_Run_Results>;
  /** fetch data from the table: "test_run_shards" */
  test_run_shards: Array<Test_Run_Shards>;
  /** fetch aggregated fields from the table: "test_run_shards" */
  test_run_shards_aggregate: Test_Run_Shards_Aggregate;
  /** fetch data from the table: "test_run_shards" using primary key columns */
  test_run_shards_by_pk?: Maybe<Test_Run_Shards>;
  /** fetch data from the table: "test_run_test_recordings" */
  test_run_test_recordings: Array<Test_Run_Test_Recordings>;
  /** fetch aggregated fields from the table: "test_run_test_recordings" */
  test_run_test_recordings_aggregate: Test_Run_Test_Recordings_Aggregate;
  /** fetch data from the table: "test_run_tests" */
  test_run_tests: Array<Test_Run_Tests>;
  /** fetch aggregated fields from the table: "test_run_tests" */
  test_run_tests_aggregate: Test_Run_Tests_Aggregate;
  /** fetch data from the table: "test_run_tests" using primary key columns */
  test_run_tests_by_pk?: Maybe<Test_Run_Tests>;
  /** fetch data from the table: "test_runs" */
  test_runs: Array<Test_Runs>;
  /** fetch aggregated fields from the table: "test_runs" */
  test_runs_aggregate: Test_Runs_Aggregate;
  /** fetch data from the table: "test_runs" using primary key columns */
  test_runs_by_pk?: Maybe<Test_Runs>;
  /** fetch data from the table: "test_runs_new" */
  test_runs_new: Array<Test_Runs_New>;
  /** fetch aggregated fields from the table: "test_runs_new" */
  test_runs_new_aggregate: Test_Runs_New_Aggregate;
  /** fetch data from the table: "test_runs_new" using primary key columns */
  test_runs_new_by_pk?: Maybe<Test_Runs_New>;
  /** fetch data from the table: "user_ids" */
  user_ids: Array<User_Ids>;
  /** fetch aggregated fields from the table: "user_ids" */
  user_ids_aggregate: User_Ids_Aggregate;
  /** fetch data from the table: "user_ids" using primary key columns */
  user_ids_by_pk?: Maybe<User_Ids>;
  /** fetch data from the table: "user_settings" */
  user_settings: Array<User_Settings>;
  /** fetch aggregated fields from the table: "user_settings" */
  user_settings_aggregate: User_Settings_Aggregate;
  /** fetch data from the table: "user_settings" using primary key columns */
  user_settings_by_pk?: Maybe<User_Settings>;
  /** fetch data from the table: "user_tos" */
  user_tos: Array<User_Tos>;
  /** fetch aggregated fields from the table: "user_tos" */
  user_tos_aggregate: User_Tos_Aggregate;
  /** fetch data from the table: "user_tos" using primary key columns */
  user_tos_by_pk?: Maybe<User_Tos>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users_activity" */
  users_activity: Array<Users_Activity>;
  /** fetch aggregated fields from the table: "users_activity" */
  users_activity_aggregate: Users_Activity_Aggregate;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "workspace_sourcemaps" */
  workspace_sourcemaps: Array<Workspace_Sourcemaps>;
  /** fetch aggregated fields from the table: "workspace_sourcemaps" */
  workspace_sourcemaps_aggregate: Workspace_Sourcemaps_Aggregate;
  /** fetch data from the table: "workspace_sourcemaps" using primary key columns */
  workspace_sourcemaps_by_pk?: Maybe<Workspace_Sourcemaps>;
  /** fetch data from the table: "workspace_tests" */
  workspace_tests: Array<Workspace_Tests>;
  /** fetch aggregated fields from the table: "workspace_tests" */
  workspace_tests_aggregate: Workspace_Tests_Aggregate;
  /** fetch data from the table: "workspace_tests" using primary key columns */
  workspace_tests_by_pk?: Maybe<Workspace_Tests>;
  /** fetch data from the table: "workspaces" */
  workspaces: Array<Workspaces>;
  /** fetch aggregated fields from the table: "workspaces" */
  workspaces_aggregate: Workspaces_Aggregate;
  /** fetch data from the table: "workspaces" using primary key columns */
  workspaces_by_pk?: Maybe<Workspaces>;
  /** fetch data from the table: "workspaces_subscription" */
  workspaces_subscription: Array<Workspaces_Subscription>;
  /** fetch aggregated fields from the table: "workspaces_subscription" */
  workspaces_subscription_aggregate: Workspaces_Subscription_Aggregate;
  /** fetch data from the table: "workspaces_subscription" using primary key columns */
  workspaces_subscription_by_pk?: Maybe<Workspaces_Subscription>;
  /** fetch data from the table: "workspaces_user" */
  workspaces_user: Array<Workspaces_User>;
  /** fetch aggregated fields from the table: "workspaces_user" */
  workspaces_user_aggregate: Workspaces_User_Aggregate;
  /** fetch data from the table: "workspaces_user" using primary key columns */
  workspaces_user_by_pk?: Maybe<Workspaces_User>;
};


/** subscription root */
export type Subscription_RootApi_KeysArgs = {
  distinct_on?: InputMaybe<Array<Api_Keys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Api_Keys_Order_By>>;
  where?: InputMaybe<Api_Keys_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootApi_Keys_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Api_Keys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Api_Keys_Order_By>>;
  where?: InputMaybe<Api_Keys_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootApi_Keys_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootAuth_RequestsArgs = {
  distinct_on?: InputMaybe<Array<Auth_Requests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auth_Requests_Order_By>>;
  where?: InputMaybe<Auth_Requests_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAuth_Requests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Auth_Requests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Auth_Requests_Order_By>>;
  where?: InputMaybe<Auth_Requests_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAuth_Requests_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootBase_SnapshotsArgs = {
  distinct_on?: InputMaybe<Array<Base_Snapshots_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Base_Snapshots_Order_By>>;
  where?: InputMaybe<Base_Snapshots_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBase_Snapshots_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Base_Snapshots_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Base_Snapshots_Order_By>>;
  where?: InputMaybe<Base_Snapshots_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBase_Snapshots_By_PkArgs = {
  checkpoint: Scalars['Int']['input'];
  recording_id: Scalars['uuid']['input'];
  version_id: Scalars['Int']['input'];
};


/** subscription root */
export type Subscription_RootCache_Warming_ResultsArgs = {
  distinct_on?: InputMaybe<Array<Cache_Warming_Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cache_Warming_Results_Order_By>>;
  where?: InputMaybe<Cache_Warming_Results_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCache_Warming_Results_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cache_Warming_Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cache_Warming_Results_Order_By>>;
  where?: InputMaybe<Cache_Warming_Results_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCache_Warming_Results_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootCollaborator_RequestsArgs = {
  distinct_on?: InputMaybe<Array<Collaborator_Requests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaborator_Requests_Order_By>>;
  where?: InputMaybe<Collaborator_Requests_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCollaborator_Requests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Collaborator_Requests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaborator_Requests_Order_By>>;
  where?: InputMaybe<Collaborator_Requests_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCollaborator_Requests_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootCollaboratorsArgs = {
  distinct_on?: InputMaybe<Array<Collaborators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaborators_Order_By>>;
  where?: InputMaybe<Collaborators_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCollaborators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Collaborators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaborators_Order_By>>;
  where?: InputMaybe<Collaborators_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCollaborators_By_PkArgs = {
  recording_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootCommentsArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootComments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootComments_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootControllersArgs = {
  distinct_on?: InputMaybe<Array<Controllers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Controllers_Order_By>>;
  where?: InputMaybe<Controllers_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootControllers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Controllers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Controllers_Order_By>>;
  where?: InputMaybe<Controllers_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootControllers_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** subscription root */
export type Subscription_RootCrash_ReportsArgs = {
  distinct_on?: InputMaybe<Array<Crash_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Crash_Reports_Order_By>>;
  where?: InputMaybe<Crash_Reports_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCrash_Reports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Crash_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Crash_Reports_Order_By>>;
  where?: InputMaybe<Crash_Reports_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDojo_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Dojo_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dojo_Sessions_Order_By>>;
  where?: InputMaybe<Dojo_Sessions_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDojo_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dojo_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dojo_Sessions_Order_By>>;
  where?: InputMaybe<Dojo_Sessions_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDojo_Sessions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootExperimental_Crash_Reports_FiltersArgs = {
  distinct_on?: InputMaybe<Array<Experimental_Crash_Reports_Filters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Experimental_Crash_Reports_Filters_Order_By>>;
  where?: InputMaybe<Experimental_Crash_Reports_Filters_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootExperimental_Crash_Reports_Filters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Experimental_Crash_Reports_Filters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Experimental_Crash_Reports_Filters_Order_By>>;
  where?: InputMaybe<Experimental_Crash_Reports_Filters_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootExperimental_Crash_Reports_Filters_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** subscription root */
export type Subscription_RootFiltersArgs = {
  distinct_on?: InputMaybe<Array<Filters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Filters_Order_By>>;
  where?: InputMaybe<Filters_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFilters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Filters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Filters_Order_By>>;
  where?: InputMaybe<Filters_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFilters_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** subscription root */
export type Subscription_RootGetCommentsWithAuthIdArgs = {
  arg1: Scalars['String']['input'];
};


/** subscription root */
export type Subscription_RootInvitationsArgs = {
  distinct_on?: InputMaybe<Array<Invitations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitations_Order_By>>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootInvitations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitations_Order_By>>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootInvitations_By_PkArgs = {
  invited_email: Scalars['String']['input'];
  user_id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOrganizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOrganizations_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootPlansArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlans_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootProcessing_Task_StateArgs = {
  distinct_on?: InputMaybe<Array<Processing_Task_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Processing_Task_State_Order_By>>;
  where?: InputMaybe<Processing_Task_State_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProcessing_Task_State_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Processing_Task_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Processing_Task_State_Order_By>>;
  where?: InputMaybe<Processing_Task_State_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProcessing_Task_State_By_PkArgs = {
  recording_id: Scalars['uuid']['input'];
  type: Scalars['String']['input'];
  version: Scalars['Int']['input'];
};


/** subscription root */
export type Subscription_RootRecordingArgs = {
  uuid?: InputMaybe<Scalars['UUID']['input']>;
};


/** subscription root */
export type Subscription_RootRecording_AssetsArgs = {
  distinct_on?: InputMaybe<Array<Recording_Assets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Assets_Order_By>>;
  where?: InputMaybe<Recording_Assets_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecording_Assets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recording_Assets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Assets_Order_By>>;
  where?: InputMaybe<Recording_Assets_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecording_Assets_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** subscription root */
export type Subscription_RootRecording_CheckpointsArgs = {
  distinct_on?: InputMaybe<Array<Recording_Checkpoints_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Checkpoints_Order_By>>;
  where?: InputMaybe<Recording_Checkpoints_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecording_Checkpoints_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recording_Checkpoints_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Checkpoints_Order_By>>;
  where?: InputMaybe<Recording_Checkpoints_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecording_Checkpoints_By_PkArgs = {
  checkpoint: Scalars['Int']['input'];
  recording_id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootRecording_OriginalsourcesArgs = {
  distinct_on?: InputMaybe<Array<Recording_Originalsources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Originalsources_Order_By>>;
  where?: InputMaybe<Recording_Originalsources_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecording_Originalsources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recording_Originalsources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Originalsources_Order_By>>;
  where?: InputMaybe<Recording_Originalsources_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecording_Originalsources_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootRecording_PointsArgs = {
  distinct_on?: InputMaybe<Array<Recording_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Points_Order_By>>;
  where?: InputMaybe<Recording_Points_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecording_Points_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recording_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Points_Order_By>>;
  where?: InputMaybe<Recording_Points_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecording_Points_By_PkArgs = {
  key: Scalars['String']['input'];
};


/** subscription root */
export type Subscription_RootRecording_RegionsArgs = {
  distinct_on?: InputMaybe<Array<Recording_Regions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Regions_Order_By>>;
  where?: InputMaybe<Recording_Regions_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecording_Regions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recording_Regions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Regions_Order_By>>;
  where?: InputMaybe<Recording_Regions_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecording_Regions_By_PkArgs = {
  recording_id: Scalars['String']['input'];
  region_idx: Scalars['Int']['input'];
};


/** subscription root */
export type Subscription_RootRecording_SourcemapsArgs = {
  distinct_on?: InputMaybe<Array<Recording_Sourcemaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Sourcemaps_Order_By>>;
  where?: InputMaybe<Recording_Sourcemaps_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecording_Sourcemaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recording_Sourcemaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recording_Sourcemaps_Order_By>>;
  where?: InputMaybe<Recording_Sourcemaps_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecording_Sourcemaps_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootRecordingsArgs = {
  distinct_on?: InputMaybe<Array<Recordings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recordings_Order_By>>;
  where?: InputMaybe<Recordings_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecordings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recordings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recordings_Order_By>>;
  where?: InputMaybe<Recordings_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecordings_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootRelease_Build_FilesArgs = {
  distinct_on?: InputMaybe<Array<Release_Build_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Release_Build_Files_Order_By>>;
  where?: InputMaybe<Release_Build_Files_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRelease_Build_Files_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Release_Build_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Release_Build_Files_Order_By>>;
  where?: InputMaybe<Release_Build_Files_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRelease_Build_Files_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootReleasesArgs = {
  distinct_on?: InputMaybe<Array<Releases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Releases_Order_By>>;
  where?: InputMaybe<Releases_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootReleases_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Releases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Releases_Order_By>>;
  where?: InputMaybe<Releases_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootReleases_By_PkArgs = {
  build_id: Scalars['String']['input'];
};


/** subscription root */
export type Subscription_RootRoot_Cause_Analysis_ResultsArgs = {
  distinct_on?: InputMaybe<Array<Root_Cause_Analysis_Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Root_Cause_Analysis_Results_Order_By>>;
  where?: InputMaybe<Root_Cause_Analysis_Results_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRoot_Cause_Analysis_Results_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Root_Cause_Analysis_Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Root_Cause_Analysis_Results_Order_By>>;
  where?: InputMaybe<Root_Cause_Analysis_Results_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRoot_Cause_Analysis_Results_By_PkArgs = {
  recording_id: Scalars['uuid']['input'];
  version: Scalars['Int']['input'];
};


/** subscription root */
export type Subscription_RootRuntime_Crash_Report_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Order_By>>;
  where?: InputMaybe<Runtime_Crash_Report_Sessions_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRuntime_Crash_Report_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Runtime_Crash_Report_Sessions_Order_By>>;
  where?: InputMaybe<Runtime_Crash_Report_Sessions_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRuntime_Crash_Report_Sessions_By_PkArgs = {
  runtime_crash_report_id: Scalars['uuid']['input'];
  session_id: Scalars['String']['input'];
};


/** subscription root */
export type Subscription_RootRuntime_Crash_ReportsArgs = {
  distinct_on?: InputMaybe<Array<Runtime_Crash_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Runtime_Crash_Reports_Order_By>>;
  where?: InputMaybe<Runtime_Crash_Reports_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRuntime_Crash_Reports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Runtime_Crash_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Runtime_Crash_Reports_Order_By>>;
  where?: InputMaybe<Runtime_Crash_Reports_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRuntime_Crash_Reports_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSessions_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** subscription root */
export type Subscription_RootSimple_InboxArgs = {
  distinct_on?: InputMaybe<Array<Simple_Inbox_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Simple_Inbox_Order_By>>;
  where?: InputMaybe<Simple_Inbox_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSimple_Inbox_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Simple_Inbox_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Simple_Inbox_Order_By>>;
  where?: InputMaybe<Simple_Inbox_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSimple_Inbox_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** subscription root */
export type Subscription_RootSnapshot_DiffsArgs = {
  distinct_on?: InputMaybe<Array<Snapshot_Diffs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Snapshot_Diffs_Order_By>>;
  where?: InputMaybe<Snapshot_Diffs_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSnapshot_Diffs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Snapshot_Diffs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Snapshot_Diffs_Order_By>>;
  where?: InputMaybe<Snapshot_Diffs_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSnapshot_Diffs_By_PkArgs = {
  end_checkpoint: Scalars['Int']['input'];
  recording_id: Scalars['uuid']['input'];
  version_id: Scalars['Int']['input'];
};


/** subscription root */
export type Subscription_RootTest_Run_MetricsArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Metrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Metrics_Order_By>>;
  where?: InputMaybe<Test_Run_Metrics_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTest_Run_Metrics_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Metrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Metrics_Order_By>>;
  where?: InputMaybe<Test_Run_Metrics_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTest_Run_Metrics_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootTest_Run_ResultsArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Results_Order_By>>;
  where?: InputMaybe<Test_Run_Results_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTest_Run_Results_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Results_Order_By>>;
  where?: InputMaybe<Test_Run_Results_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTest_Run_Results_By_PkArgs = {
  test_id: Scalars['String']['input'];
  test_run_id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootTest_Run_ShardsArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Shards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Shards_Order_By>>;
  where?: InputMaybe<Test_Run_Shards_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTest_Run_Shards_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Shards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Shards_Order_By>>;
  where?: InputMaybe<Test_Run_Shards_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTest_Run_Shards_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootTest_Run_Test_RecordingsArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Test_Recordings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Test_Recordings_Order_By>>;
  where?: InputMaybe<Test_Run_Test_Recordings_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTest_Run_Test_Recordings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Test_Recordings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Test_Recordings_Order_By>>;
  where?: InputMaybe<Test_Run_Test_Recordings_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTest_Run_TestsArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Tests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Tests_Order_By>>;
  where?: InputMaybe<Test_Run_Tests_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTest_Run_Tests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Tests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Tests_Order_By>>;
  where?: InputMaybe<Test_Run_Tests_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTest_Run_Tests_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootTest_RunsArgs = {
  distinct_on?: InputMaybe<Array<Test_Runs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Runs_Order_By>>;
  where?: InputMaybe<Test_Runs_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTest_Runs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Runs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Runs_Order_By>>;
  where?: InputMaybe<Test_Runs_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTest_Runs_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootTest_Runs_NewArgs = {
  distinct_on?: InputMaybe<Array<Test_Runs_New_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Runs_New_Order_By>>;
  where?: InputMaybe<Test_Runs_New_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTest_Runs_New_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Runs_New_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Runs_New_Order_By>>;
  where?: InputMaybe<Test_Runs_New_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTest_Runs_New_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootUser_IdsArgs = {
  distinct_on?: InputMaybe<Array<User_Ids_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Ids_Order_By>>;
  where?: InputMaybe<User_Ids_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Ids_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Ids_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Ids_Order_By>>;
  where?: InputMaybe<User_Ids_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Ids_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootUser_SettingsArgs = {
  distinct_on?: InputMaybe<Array<User_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Settings_Order_By>>;
  where?: InputMaybe<User_Settings_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Settings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Settings_Order_By>>;
  where?: InputMaybe<User_Settings_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Settings_By_PkArgs = {
  user_id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootUser_TosArgs = {
  distinct_on?: InputMaybe<Array<User_Tos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Tos_Order_By>>;
  where?: InputMaybe<User_Tos_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Tos_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Tos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Tos_Order_By>>;
  where?: InputMaybe<User_Tos_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Tos_By_PkArgs = {
  tos_version: Scalars['Int']['input'];
  user_id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_ActivityArgs = {
  distinct_on?: InputMaybe<Array<Users_Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Activity_Order_By>>;
  where?: InputMaybe<Users_Activity_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_Activity_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Activity_Order_By>>;
  where?: InputMaybe<Users_Activity_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootWorkspace_SourcemapsArgs = {
  distinct_on?: InputMaybe<Array<Workspace_Sourcemaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspace_Sourcemaps_Order_By>>;
  where?: InputMaybe<Workspace_Sourcemaps_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootWorkspace_Sourcemaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspace_Sourcemaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspace_Sourcemaps_Order_By>>;
  where?: InputMaybe<Workspace_Sourcemaps_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootWorkspace_Sourcemaps_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootWorkspace_TestsArgs = {
  distinct_on?: InputMaybe<Array<Workspace_Tests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspace_Tests_Order_By>>;
  where?: InputMaybe<Workspace_Tests_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootWorkspace_Tests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspace_Tests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspace_Tests_Order_By>>;
  where?: InputMaybe<Workspace_Tests_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootWorkspace_Tests_By_PkArgs = {
  test_id: Scalars['String']['input'];
  workspace_id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootWorkspacesArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Order_By>>;
  where?: InputMaybe<Workspaces_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootWorkspaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Order_By>>;
  where?: InputMaybe<Workspaces_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootWorkspaces_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootWorkspaces_SubscriptionArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Subscription_Order_By>>;
  where?: InputMaybe<Workspaces_Subscription_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootWorkspaces_Subscription_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Subscription_Order_By>>;
  where?: InputMaybe<Workspaces_Subscription_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootWorkspaces_Subscription_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** subscription root */
export type Subscription_RootWorkspaces_UserArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_User_Order_By>>;
  where?: InputMaybe<Workspaces_User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootWorkspaces_User_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_User_Order_By>>;
  where?: InputMaybe<Workspaces_User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootWorkspaces_User_By_PkArgs = {
  user_id: Scalars['uuid']['input'];
  workspace_id: Scalars['uuid']['input'];
};

/** columns and relationships of "test_run_metrics" */
export type Test_Run_Metrics = {
  __typename?: 'test_run_metrics';
  client_key?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamp']['output'];
  duration: Scalars['numeric']['output'];
  env: Scalars['jsonb']['output'];
  id: Scalars['uuid']['output'];
  platform: Scalars['String']['output'];
  recorded: Scalars['Boolean']['output'];
  recording_id?: Maybe<Scalars['uuid']['output']>;
  runner: Scalars['String']['output'];
  runtime?: Maybe<Scalars['String']['output']>;
  source_path: Scalars['String']['output'];
  source_title: Scalars['String']['output'];
  test_key: Scalars['String']['output'];
  test_run_id: Scalars['uuid']['output'];
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "test_run_metrics" */
export type Test_Run_MetricsEnvArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "test_run_metrics" */
export type Test_Run_Metrics_Aggregate = {
  __typename?: 'test_run_metrics_aggregate';
  aggregate?: Maybe<Test_Run_Metrics_Aggregate_Fields>;
  nodes: Array<Test_Run_Metrics>;
};

/** aggregate fields of "test_run_metrics" */
export type Test_Run_Metrics_Aggregate_Fields = {
  __typename?: 'test_run_metrics_aggregate_fields';
  avg?: Maybe<Test_Run_Metrics_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Test_Run_Metrics_Max_Fields>;
  min?: Maybe<Test_Run_Metrics_Min_Fields>;
  stddev?: Maybe<Test_Run_Metrics_Stddev_Fields>;
  stddev_pop?: Maybe<Test_Run_Metrics_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Test_Run_Metrics_Stddev_Samp_Fields>;
  sum?: Maybe<Test_Run_Metrics_Sum_Fields>;
  var_pop?: Maybe<Test_Run_Metrics_Var_Pop_Fields>;
  var_samp?: Maybe<Test_Run_Metrics_Var_Samp_Fields>;
  variance?: Maybe<Test_Run_Metrics_Variance_Fields>;
};


/** aggregate fields of "test_run_metrics" */
export type Test_Run_Metrics_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Test_Run_Metrics_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "test_run_metrics" */
export type Test_Run_Metrics_Aggregate_Order_By = {
  avg?: InputMaybe<Test_Run_Metrics_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Test_Run_Metrics_Max_Order_By>;
  min?: InputMaybe<Test_Run_Metrics_Min_Order_By>;
  stddev?: InputMaybe<Test_Run_Metrics_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Test_Run_Metrics_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Test_Run_Metrics_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Test_Run_Metrics_Sum_Order_By>;
  var_pop?: InputMaybe<Test_Run_Metrics_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Test_Run_Metrics_Var_Samp_Order_By>;
  variance?: InputMaybe<Test_Run_Metrics_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Test_Run_Metrics_Append_Input = {
  env?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "test_run_metrics" */
export type Test_Run_Metrics_Arr_Rel_Insert_Input = {
  data: Array<Test_Run_Metrics_Insert_Input>;
  on_conflict?: InputMaybe<Test_Run_Metrics_On_Conflict>;
};

/** aggregate avg on columns */
export type Test_Run_Metrics_Avg_Fields = {
  __typename?: 'test_run_metrics_avg_fields';
  duration?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "test_run_metrics" */
export type Test_Run_Metrics_Avg_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "test_run_metrics". All fields are combined with a logical 'AND'. */
export type Test_Run_Metrics_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Test_Run_Metrics_Bool_Exp>>>;
  _not?: InputMaybe<Test_Run_Metrics_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Test_Run_Metrics_Bool_Exp>>>;
  client_key?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  duration?: InputMaybe<Numeric_Comparison_Exp>;
  env?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  platform?: InputMaybe<String_Comparison_Exp>;
  recorded?: InputMaybe<Boolean_Comparison_Exp>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  runner?: InputMaybe<String_Comparison_Exp>;
  runtime?: InputMaybe<String_Comparison_Exp>;
  source_path?: InputMaybe<String_Comparison_Exp>;
  source_title?: InputMaybe<String_Comparison_Exp>;
  test_key?: InputMaybe<String_Comparison_Exp>;
  test_run_id?: InputMaybe<Uuid_Comparison_Exp>;
  workspace_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "test_run_metrics" */
export enum Test_Run_Metrics_Constraint {
  /** unique or primary key constraint */
  TestRunMetricsPkey = 'test_run_metrics_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Test_Run_Metrics_Delete_At_Path_Input = {
  env?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Test_Run_Metrics_Delete_Elem_Input = {
  env?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Test_Run_Metrics_Delete_Key_Input = {
  env?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing integer column in table "test_run_metrics" */
export type Test_Run_Metrics_Inc_Input = {
  duration?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "test_run_metrics" */
export type Test_Run_Metrics_Insert_Input = {
  client_key?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  duration?: InputMaybe<Scalars['numeric']['input']>;
  env?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  recorded?: InputMaybe<Scalars['Boolean']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  runner?: InputMaybe<Scalars['String']['input']>;
  runtime?: InputMaybe<Scalars['String']['input']>;
  source_path?: InputMaybe<Scalars['String']['input']>;
  source_title?: InputMaybe<Scalars['String']['input']>;
  test_key?: InputMaybe<Scalars['String']['input']>;
  test_run_id?: InputMaybe<Scalars['uuid']['input']>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Test_Run_Metrics_Max_Fields = {
  __typename?: 'test_run_metrics_max_fields';
  client_key?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  duration?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  runner?: Maybe<Scalars['String']['output']>;
  runtime?: Maybe<Scalars['String']['output']>;
  source_path?: Maybe<Scalars['String']['output']>;
  source_title?: Maybe<Scalars['String']['output']>;
  test_key?: Maybe<Scalars['String']['output']>;
  test_run_id?: Maybe<Scalars['uuid']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "test_run_metrics" */
export type Test_Run_Metrics_Max_Order_By = {
  client_key?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  platform?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  runner?: InputMaybe<Order_By>;
  runtime?: InputMaybe<Order_By>;
  source_path?: InputMaybe<Order_By>;
  source_title?: InputMaybe<Order_By>;
  test_key?: InputMaybe<Order_By>;
  test_run_id?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Test_Run_Metrics_Min_Fields = {
  __typename?: 'test_run_metrics_min_fields';
  client_key?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  duration?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  recording_id?: Maybe<Scalars['uuid']['output']>;
  runner?: Maybe<Scalars['String']['output']>;
  runtime?: Maybe<Scalars['String']['output']>;
  source_path?: Maybe<Scalars['String']['output']>;
  source_title?: Maybe<Scalars['String']['output']>;
  test_key?: Maybe<Scalars['String']['output']>;
  test_run_id?: Maybe<Scalars['uuid']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "test_run_metrics" */
export type Test_Run_Metrics_Min_Order_By = {
  client_key?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  platform?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  runner?: InputMaybe<Order_By>;
  runtime?: InputMaybe<Order_By>;
  source_path?: InputMaybe<Order_By>;
  source_title?: InputMaybe<Order_By>;
  test_key?: InputMaybe<Order_By>;
  test_run_id?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "test_run_metrics" */
export type Test_Run_Metrics_Mutation_Response = {
  __typename?: 'test_run_metrics_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Test_Run_Metrics>;
};

/** input type for inserting object relation for remote table "test_run_metrics" */
export type Test_Run_Metrics_Obj_Rel_Insert_Input = {
  data: Test_Run_Metrics_Insert_Input;
  on_conflict?: InputMaybe<Test_Run_Metrics_On_Conflict>;
};

/** on conflict condition type for table "test_run_metrics" */
export type Test_Run_Metrics_On_Conflict = {
  constraint: Test_Run_Metrics_Constraint;
  update_columns: Array<Test_Run_Metrics_Update_Column>;
  where?: InputMaybe<Test_Run_Metrics_Bool_Exp>;
};

/** ordering options when selecting data from "test_run_metrics" */
export type Test_Run_Metrics_Order_By = {
  client_key?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  env?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  platform?: InputMaybe<Order_By>;
  recorded?: InputMaybe<Order_By>;
  recording_id?: InputMaybe<Order_By>;
  runner?: InputMaybe<Order_By>;
  runtime?: InputMaybe<Order_By>;
  source_path?: InputMaybe<Order_By>;
  source_title?: InputMaybe<Order_By>;
  test_key?: InputMaybe<Order_By>;
  test_run_id?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "test_run_metrics" */
export type Test_Run_Metrics_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Test_Run_Metrics_Prepend_Input = {
  env?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "test_run_metrics" */
export enum Test_Run_Metrics_Select_Column {
  /** column name */
  ClientKey = 'client_key',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Duration = 'duration',
  /** column name */
  Env = 'env',
  /** column name */
  Id = 'id',
  /** column name */
  Platform = 'platform',
  /** column name */
  Recorded = 'recorded',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Runner = 'runner',
  /** column name */
  Runtime = 'runtime',
  /** column name */
  SourcePath = 'source_path',
  /** column name */
  SourceTitle = 'source_title',
  /** column name */
  TestKey = 'test_key',
  /** column name */
  TestRunId = 'test_run_id',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** input type for updating data in table "test_run_metrics" */
export type Test_Run_Metrics_Set_Input = {
  client_key?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  duration?: InputMaybe<Scalars['numeric']['input']>;
  env?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  recorded?: InputMaybe<Scalars['Boolean']['input']>;
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  runner?: InputMaybe<Scalars['String']['input']>;
  runtime?: InputMaybe<Scalars['String']['input']>;
  source_path?: InputMaybe<Scalars['String']['input']>;
  source_title?: InputMaybe<Scalars['String']['input']>;
  test_key?: InputMaybe<Scalars['String']['input']>;
  test_run_id?: InputMaybe<Scalars['uuid']['input']>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Test_Run_Metrics_Stddev_Fields = {
  __typename?: 'test_run_metrics_stddev_fields';
  duration?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "test_run_metrics" */
export type Test_Run_Metrics_Stddev_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Test_Run_Metrics_Stddev_Pop_Fields = {
  __typename?: 'test_run_metrics_stddev_pop_fields';
  duration?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "test_run_metrics" */
export type Test_Run_Metrics_Stddev_Pop_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Test_Run_Metrics_Stddev_Samp_Fields = {
  __typename?: 'test_run_metrics_stddev_samp_fields';
  duration?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "test_run_metrics" */
export type Test_Run_Metrics_Stddev_Samp_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Test_Run_Metrics_Sum_Fields = {
  __typename?: 'test_run_metrics_sum_fields';
  duration?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "test_run_metrics" */
export type Test_Run_Metrics_Sum_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** update columns of table "test_run_metrics" */
export enum Test_Run_Metrics_Update_Column {
  /** column name */
  ClientKey = 'client_key',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Duration = 'duration',
  /** column name */
  Env = 'env',
  /** column name */
  Id = 'id',
  /** column name */
  Platform = 'platform',
  /** column name */
  Recorded = 'recorded',
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  Runner = 'runner',
  /** column name */
  Runtime = 'runtime',
  /** column name */
  SourcePath = 'source_path',
  /** column name */
  SourceTitle = 'source_title',
  /** column name */
  TestKey = 'test_key',
  /** column name */
  TestRunId = 'test_run_id',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** aggregate var_pop on columns */
export type Test_Run_Metrics_Var_Pop_Fields = {
  __typename?: 'test_run_metrics_var_pop_fields';
  duration?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "test_run_metrics" */
export type Test_Run_Metrics_Var_Pop_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Test_Run_Metrics_Var_Samp_Fields = {
  __typename?: 'test_run_metrics_var_samp_fields';
  duration?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "test_run_metrics" */
export type Test_Run_Metrics_Var_Samp_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Test_Run_Metrics_Variance_Fields = {
  __typename?: 'test_run_metrics_variance_fields';
  duration?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "test_run_metrics" */
export type Test_Run_Metrics_Variance_Order_By = {
  duration?: InputMaybe<Order_By>;
};

/** columns and relationships of "test_run_results" */
export type Test_Run_Results = {
  __typename?: 'test_run_results';
  created_at: Scalars['timestamptz']['output'];
  result: Scalars['String']['output'];
  test_id: Scalars['String']['output'];
  test_run_id: Scalars['uuid']['output'];
};

/** aggregated selection of "test_run_results" */
export type Test_Run_Results_Aggregate = {
  __typename?: 'test_run_results_aggregate';
  aggregate?: Maybe<Test_Run_Results_Aggregate_Fields>;
  nodes: Array<Test_Run_Results>;
};

/** aggregate fields of "test_run_results" */
export type Test_Run_Results_Aggregate_Fields = {
  __typename?: 'test_run_results_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Test_Run_Results_Max_Fields>;
  min?: Maybe<Test_Run_Results_Min_Fields>;
};


/** aggregate fields of "test_run_results" */
export type Test_Run_Results_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Test_Run_Results_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "test_run_results" */
export type Test_Run_Results_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Test_Run_Results_Max_Order_By>;
  min?: InputMaybe<Test_Run_Results_Min_Order_By>;
};

/** input type for inserting array relation for remote table "test_run_results" */
export type Test_Run_Results_Arr_Rel_Insert_Input = {
  data: Array<Test_Run_Results_Insert_Input>;
  on_conflict?: InputMaybe<Test_Run_Results_On_Conflict>;
};

/** Boolean expression to filter rows from the table "test_run_results". All fields are combined with a logical 'AND'. */
export type Test_Run_Results_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Test_Run_Results_Bool_Exp>>>;
  _not?: InputMaybe<Test_Run_Results_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Test_Run_Results_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  result?: InputMaybe<String_Comparison_Exp>;
  test_id?: InputMaybe<String_Comparison_Exp>;
  test_run_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "test_run_results" */
export enum Test_Run_Results_Constraint {
  /** unique or primary key constraint */
  TestRunResultsPkey = 'test_run_results_pkey'
}

/** input type for inserting data into table "test_run_results" */
export type Test_Run_Results_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  result?: InputMaybe<Scalars['String']['input']>;
  test_id?: InputMaybe<Scalars['String']['input']>;
  test_run_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Test_Run_Results_Max_Fields = {
  __typename?: 'test_run_results_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  test_id?: Maybe<Scalars['String']['output']>;
  test_run_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "test_run_results" */
export type Test_Run_Results_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  test_id?: InputMaybe<Order_By>;
  test_run_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Test_Run_Results_Min_Fields = {
  __typename?: 'test_run_results_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  test_id?: Maybe<Scalars['String']['output']>;
  test_run_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "test_run_results" */
export type Test_Run_Results_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  test_id?: InputMaybe<Order_By>;
  test_run_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "test_run_results" */
export type Test_Run_Results_Mutation_Response = {
  __typename?: 'test_run_results_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Test_Run_Results>;
};

/** input type for inserting object relation for remote table "test_run_results" */
export type Test_Run_Results_Obj_Rel_Insert_Input = {
  data: Test_Run_Results_Insert_Input;
  on_conflict?: InputMaybe<Test_Run_Results_On_Conflict>;
};

/** on conflict condition type for table "test_run_results" */
export type Test_Run_Results_On_Conflict = {
  constraint: Test_Run_Results_Constraint;
  update_columns: Array<Test_Run_Results_Update_Column>;
  where?: InputMaybe<Test_Run_Results_Bool_Exp>;
};

/** ordering options when selecting data from "test_run_results" */
export type Test_Run_Results_Order_By = {
  created_at?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  test_id?: InputMaybe<Order_By>;
  test_run_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "test_run_results" */
export type Test_Run_Results_Pk_Columns_Input = {
  test_id: Scalars['String']['input'];
  test_run_id: Scalars['uuid']['input'];
};

/** select columns of table "test_run_results" */
export enum Test_Run_Results_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Result = 'result',
  /** column name */
  TestId = 'test_id',
  /** column name */
  TestRunId = 'test_run_id'
}

/** input type for updating data in table "test_run_results" */
export type Test_Run_Results_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  result?: InputMaybe<Scalars['String']['input']>;
  test_id?: InputMaybe<Scalars['String']['input']>;
  test_run_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "test_run_results" */
export enum Test_Run_Results_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Result = 'result',
  /** column name */
  TestId = 'test_id',
  /** column name */
  TestRunId = 'test_run_id'
}

/** columns and relationships of "test_run_shards" */
export type Test_Run_Shards = {
  __typename?: 'test_run_shards';
  completed_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at: Scalars['timestamptz']['output'];
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  test_run_id: Scalars['uuid']['output'];
  /** An array relationship */
  test_run_tests: Array<Test_Run_Tests>;
  /** An aggregated array relationship */
  test_run_tests_aggregate: Test_Run_Tests_Aggregate;
  /** An object relationship */
  test_runs_new: Test_Runs_New;
  updated_at: Scalars['timestamptz']['output'];
};


/** columns and relationships of "test_run_shards" */
export type Test_Run_ShardsTest_Run_TestsArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Tests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Tests_Order_By>>;
  where?: InputMaybe<Test_Run_Tests_Bool_Exp>;
};


/** columns and relationships of "test_run_shards" */
export type Test_Run_ShardsTest_Run_Tests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Tests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Tests_Order_By>>;
  where?: InputMaybe<Test_Run_Tests_Bool_Exp>;
};

/** aggregated selection of "test_run_shards" */
export type Test_Run_Shards_Aggregate = {
  __typename?: 'test_run_shards_aggregate';
  aggregate?: Maybe<Test_Run_Shards_Aggregate_Fields>;
  nodes: Array<Test_Run_Shards>;
};

/** aggregate fields of "test_run_shards" */
export type Test_Run_Shards_Aggregate_Fields = {
  __typename?: 'test_run_shards_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Test_Run_Shards_Max_Fields>;
  min?: Maybe<Test_Run_Shards_Min_Fields>;
};


/** aggregate fields of "test_run_shards" */
export type Test_Run_Shards_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Test_Run_Shards_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "test_run_shards" */
export type Test_Run_Shards_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Test_Run_Shards_Max_Order_By>;
  min?: InputMaybe<Test_Run_Shards_Min_Order_By>;
};

/** input type for inserting array relation for remote table "test_run_shards" */
export type Test_Run_Shards_Arr_Rel_Insert_Input = {
  data: Array<Test_Run_Shards_Insert_Input>;
  on_conflict?: InputMaybe<Test_Run_Shards_On_Conflict>;
};

/** Boolean expression to filter rows from the table "test_run_shards". All fields are combined with a logical 'AND'. */
export type Test_Run_Shards_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Test_Run_Shards_Bool_Exp>>>;
  _not?: InputMaybe<Test_Run_Shards_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Test_Run_Shards_Bool_Exp>>>;
  completed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  test_run_id?: InputMaybe<Uuid_Comparison_Exp>;
  test_run_tests?: InputMaybe<Test_Run_Tests_Bool_Exp>;
  test_runs_new?: InputMaybe<Test_Runs_New_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "test_run_shards" */
export enum Test_Run_Shards_Constraint {
  /** unique or primary key constraint */
  TestRunShardsPkey = 'test_run_shards_pkey'
}

/** input type for inserting data into table "test_run_shards" */
export type Test_Run_Shards_Insert_Input = {
  completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  test_run_id?: InputMaybe<Scalars['uuid']['input']>;
  test_run_tests?: InputMaybe<Test_Run_Tests_Arr_Rel_Insert_Input>;
  test_runs_new?: InputMaybe<Test_Runs_New_Obj_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Test_Run_Shards_Max_Fields = {
  __typename?: 'test_run_shards_max_fields';
  completed_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  test_run_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "test_run_shards" */
export type Test_Run_Shards_Max_Order_By = {
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  test_run_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Test_Run_Shards_Min_Fields = {
  __typename?: 'test_run_shards_min_fields';
  completed_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  test_run_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "test_run_shards" */
export type Test_Run_Shards_Min_Order_By = {
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  test_run_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "test_run_shards" */
export type Test_Run_Shards_Mutation_Response = {
  __typename?: 'test_run_shards_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Test_Run_Shards>;
};

/** input type for inserting object relation for remote table "test_run_shards" */
export type Test_Run_Shards_Obj_Rel_Insert_Input = {
  data: Test_Run_Shards_Insert_Input;
  on_conflict?: InputMaybe<Test_Run_Shards_On_Conflict>;
};

/** on conflict condition type for table "test_run_shards" */
export type Test_Run_Shards_On_Conflict = {
  constraint: Test_Run_Shards_Constraint;
  update_columns: Array<Test_Run_Shards_Update_Column>;
  where?: InputMaybe<Test_Run_Shards_Bool_Exp>;
};

/** ordering options when selecting data from "test_run_shards" */
export type Test_Run_Shards_Order_By = {
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  test_run_id?: InputMaybe<Order_By>;
  test_run_tests_aggregate?: InputMaybe<Test_Run_Tests_Aggregate_Order_By>;
  test_runs_new?: InputMaybe<Test_Runs_New_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "test_run_shards" */
export type Test_Run_Shards_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "test_run_shards" */
export enum Test_Run_Shards_Select_Column {
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Id = 'id',
  /** column name */
  TestRunId = 'test_run_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "test_run_shards" */
export type Test_Run_Shards_Set_Input = {
  completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  test_run_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "test_run_shards" */
export enum Test_Run_Shards_Update_Column {
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Id = 'id',
  /** column name */
  TestRunId = 'test_run_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "test_run_test_recordings" */
export type Test_Run_Test_Recordings = {
  __typename?: 'test_run_test_recordings';
  recording_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  test_run_test: Test_Run_Tests;
  test_run_test_id: Scalars['uuid']['output'];
};

/** aggregated selection of "test_run_test_recordings" */
export type Test_Run_Test_Recordings_Aggregate = {
  __typename?: 'test_run_test_recordings_aggregate';
  aggregate?: Maybe<Test_Run_Test_Recordings_Aggregate_Fields>;
  nodes: Array<Test_Run_Test_Recordings>;
};

/** aggregate fields of "test_run_test_recordings" */
export type Test_Run_Test_Recordings_Aggregate_Fields = {
  __typename?: 'test_run_test_recordings_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Test_Run_Test_Recordings_Max_Fields>;
  min?: Maybe<Test_Run_Test_Recordings_Min_Fields>;
};


/** aggregate fields of "test_run_test_recordings" */
export type Test_Run_Test_Recordings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Test_Run_Test_Recordings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "test_run_test_recordings" */
export type Test_Run_Test_Recordings_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Test_Run_Test_Recordings_Max_Order_By>;
  min?: InputMaybe<Test_Run_Test_Recordings_Min_Order_By>;
};

/** input type for inserting array relation for remote table "test_run_test_recordings" */
export type Test_Run_Test_Recordings_Arr_Rel_Insert_Input = {
  data: Array<Test_Run_Test_Recordings_Insert_Input>;
};

/** Boolean expression to filter rows from the table "test_run_test_recordings". All fields are combined with a logical 'AND'. */
export type Test_Run_Test_Recordings_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Test_Run_Test_Recordings_Bool_Exp>>>;
  _not?: InputMaybe<Test_Run_Test_Recordings_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Test_Run_Test_Recordings_Bool_Exp>>>;
  recording_id?: InputMaybe<Uuid_Comparison_Exp>;
  test_run_test?: InputMaybe<Test_Run_Tests_Bool_Exp>;
  test_run_test_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** input type for inserting data into table "test_run_test_recordings" */
export type Test_Run_Test_Recordings_Insert_Input = {
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  test_run_test?: InputMaybe<Test_Run_Tests_Obj_Rel_Insert_Input>;
  test_run_test_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Test_Run_Test_Recordings_Max_Fields = {
  __typename?: 'test_run_test_recordings_max_fields';
  recording_id?: Maybe<Scalars['uuid']['output']>;
  test_run_test_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "test_run_test_recordings" */
export type Test_Run_Test_Recordings_Max_Order_By = {
  recording_id?: InputMaybe<Order_By>;
  test_run_test_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Test_Run_Test_Recordings_Min_Fields = {
  __typename?: 'test_run_test_recordings_min_fields';
  recording_id?: Maybe<Scalars['uuid']['output']>;
  test_run_test_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "test_run_test_recordings" */
export type Test_Run_Test_Recordings_Min_Order_By = {
  recording_id?: InputMaybe<Order_By>;
  test_run_test_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "test_run_test_recordings" */
export type Test_Run_Test_Recordings_Mutation_Response = {
  __typename?: 'test_run_test_recordings_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Test_Run_Test_Recordings>;
};

/** input type for inserting object relation for remote table "test_run_test_recordings" */
export type Test_Run_Test_Recordings_Obj_Rel_Insert_Input = {
  data: Test_Run_Test_Recordings_Insert_Input;
};

/** ordering options when selecting data from "test_run_test_recordings" */
export type Test_Run_Test_Recordings_Order_By = {
  recording_id?: InputMaybe<Order_By>;
  test_run_test?: InputMaybe<Test_Run_Tests_Order_By>;
  test_run_test_id?: InputMaybe<Order_By>;
};

/** select columns of table "test_run_test_recordings" */
export enum Test_Run_Test_Recordings_Select_Column {
  /** column name */
  RecordingId = 'recording_id',
  /** column name */
  TestRunTestId = 'test_run_test_id'
}

/** input type for updating data in table "test_run_test_recordings" */
export type Test_Run_Test_Recordings_Set_Input = {
  recording_id?: InputMaybe<Scalars['uuid']['input']>;
  test_run_test_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "test_run_tests" */
export type Test_Run_Tests = {
  __typename?: 'test_run_tests';
  attempt: Scalars['Int']['output'];
  created_at: Scalars['timestamptz']['output'];
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  duration_ms: Scalars['numeric']['output'];
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  index: Scalars['Int']['output'];
  result: Scalars['String']['output'];
  runner_group_id?: Maybe<Scalars['String']['output']>;
  scope: Scalars['jsonb']['output'];
  source_path: Scalars['String']['output'];
  test_id: Scalars['String']['output'];
  /** An object relationship */
  test_run_shard: Test_Run_Shards;
  test_run_shard_id: Scalars['uuid']['output'];
  /** An array relationship */
  test_run_test_recordings: Array<Test_Run_Test_Recordings>;
  /** An aggregated array relationship */
  test_run_test_recordings_aggregate: Test_Run_Test_Recordings_Aggregate;
  title: Scalars['String']['output'];
};


/** columns and relationships of "test_run_tests" */
export type Test_Run_TestsScopeArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "test_run_tests" */
export type Test_Run_TestsTest_Run_Test_RecordingsArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Test_Recordings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Test_Recordings_Order_By>>;
  where?: InputMaybe<Test_Run_Test_Recordings_Bool_Exp>;
};


/** columns and relationships of "test_run_tests" */
export type Test_Run_TestsTest_Run_Test_Recordings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Test_Recordings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Test_Recordings_Order_By>>;
  where?: InputMaybe<Test_Run_Test_Recordings_Bool_Exp>;
};

/** aggregated selection of "test_run_tests" */
export type Test_Run_Tests_Aggregate = {
  __typename?: 'test_run_tests_aggregate';
  aggregate?: Maybe<Test_Run_Tests_Aggregate_Fields>;
  nodes: Array<Test_Run_Tests>;
};

/** aggregate fields of "test_run_tests" */
export type Test_Run_Tests_Aggregate_Fields = {
  __typename?: 'test_run_tests_aggregate_fields';
  avg?: Maybe<Test_Run_Tests_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Test_Run_Tests_Max_Fields>;
  min?: Maybe<Test_Run_Tests_Min_Fields>;
  stddev?: Maybe<Test_Run_Tests_Stddev_Fields>;
  stddev_pop?: Maybe<Test_Run_Tests_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Test_Run_Tests_Stddev_Samp_Fields>;
  sum?: Maybe<Test_Run_Tests_Sum_Fields>;
  var_pop?: Maybe<Test_Run_Tests_Var_Pop_Fields>;
  var_samp?: Maybe<Test_Run_Tests_Var_Samp_Fields>;
  variance?: Maybe<Test_Run_Tests_Variance_Fields>;
};


/** aggregate fields of "test_run_tests" */
export type Test_Run_Tests_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Test_Run_Tests_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "test_run_tests" */
export type Test_Run_Tests_Aggregate_Order_By = {
  avg?: InputMaybe<Test_Run_Tests_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Test_Run_Tests_Max_Order_By>;
  min?: InputMaybe<Test_Run_Tests_Min_Order_By>;
  stddev?: InputMaybe<Test_Run_Tests_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Test_Run_Tests_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Test_Run_Tests_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Test_Run_Tests_Sum_Order_By>;
  var_pop?: InputMaybe<Test_Run_Tests_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Test_Run_Tests_Var_Samp_Order_By>;
  variance?: InputMaybe<Test_Run_Tests_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Test_Run_Tests_Append_Input = {
  scope?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "test_run_tests" */
export type Test_Run_Tests_Arr_Rel_Insert_Input = {
  data: Array<Test_Run_Tests_Insert_Input>;
  on_conflict?: InputMaybe<Test_Run_Tests_On_Conflict>;
};

/** aggregate avg on columns */
export type Test_Run_Tests_Avg_Fields = {
  __typename?: 'test_run_tests_avg_fields';
  attempt?: Maybe<Scalars['Float']['output']>;
  duration_ms?: Maybe<Scalars['Float']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "test_run_tests" */
export type Test_Run_Tests_Avg_Order_By = {
  attempt?: InputMaybe<Order_By>;
  duration_ms?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "test_run_tests". All fields are combined with a logical 'AND'. */
export type Test_Run_Tests_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Test_Run_Tests_Bool_Exp>>>;
  _not?: InputMaybe<Test_Run_Tests_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Test_Run_Tests_Bool_Exp>>>;
  attempt?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  duration_ms?: InputMaybe<Numeric_Comparison_Exp>;
  error?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  index?: InputMaybe<Int_Comparison_Exp>;
  result?: InputMaybe<String_Comparison_Exp>;
  runner_group_id?: InputMaybe<String_Comparison_Exp>;
  scope?: InputMaybe<Jsonb_Comparison_Exp>;
  source_path?: InputMaybe<String_Comparison_Exp>;
  test_id?: InputMaybe<String_Comparison_Exp>;
  test_run_shard?: InputMaybe<Test_Run_Shards_Bool_Exp>;
  test_run_shard_id?: InputMaybe<Uuid_Comparison_Exp>;
  test_run_test_recordings?: InputMaybe<Test_Run_Test_Recordings_Bool_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "test_run_tests" */
export enum Test_Run_Tests_Constraint {
  /** unique or primary key constraint */
  TestRunTestsPkey = 'test_run_tests_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Test_Run_Tests_Delete_At_Path_Input = {
  scope?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Test_Run_Tests_Delete_Elem_Input = {
  scope?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Test_Run_Tests_Delete_Key_Input = {
  scope?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing integer column in table "test_run_tests" */
export type Test_Run_Tests_Inc_Input = {
  attempt?: InputMaybe<Scalars['Int']['input']>;
  duration_ms?: InputMaybe<Scalars['numeric']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "test_run_tests" */
export type Test_Run_Tests_Insert_Input = {
  attempt?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  duration_ms?: InputMaybe<Scalars['numeric']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  result?: InputMaybe<Scalars['String']['input']>;
  runner_group_id?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['jsonb']['input']>;
  source_path?: InputMaybe<Scalars['String']['input']>;
  test_id?: InputMaybe<Scalars['String']['input']>;
  test_run_shard?: InputMaybe<Test_Run_Shards_Obj_Rel_Insert_Input>;
  test_run_shard_id?: InputMaybe<Scalars['uuid']['input']>;
  test_run_test_recordings?: InputMaybe<Test_Run_Test_Recordings_Arr_Rel_Insert_Input>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Test_Run_Tests_Max_Fields = {
  __typename?: 'test_run_tests_max_fields';
  attempt?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  duration_ms?: Maybe<Scalars['numeric']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  runner_group_id?: Maybe<Scalars['String']['output']>;
  source_path?: Maybe<Scalars['String']['output']>;
  test_id?: Maybe<Scalars['String']['output']>;
  test_run_shard_id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "test_run_tests" */
export type Test_Run_Tests_Max_Order_By = {
  attempt?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  duration_ms?: InputMaybe<Order_By>;
  error?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  runner_group_id?: InputMaybe<Order_By>;
  source_path?: InputMaybe<Order_By>;
  test_id?: InputMaybe<Order_By>;
  test_run_shard_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Test_Run_Tests_Min_Fields = {
  __typename?: 'test_run_tests_min_fields';
  attempt?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  duration_ms?: Maybe<Scalars['numeric']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  runner_group_id?: Maybe<Scalars['String']['output']>;
  source_path?: Maybe<Scalars['String']['output']>;
  test_id?: Maybe<Scalars['String']['output']>;
  test_run_shard_id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "test_run_tests" */
export type Test_Run_Tests_Min_Order_By = {
  attempt?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  duration_ms?: InputMaybe<Order_By>;
  error?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  runner_group_id?: InputMaybe<Order_By>;
  source_path?: InputMaybe<Order_By>;
  test_id?: InputMaybe<Order_By>;
  test_run_shard_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "test_run_tests" */
export type Test_Run_Tests_Mutation_Response = {
  __typename?: 'test_run_tests_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Test_Run_Tests>;
};

/** input type for inserting object relation for remote table "test_run_tests" */
export type Test_Run_Tests_Obj_Rel_Insert_Input = {
  data: Test_Run_Tests_Insert_Input;
  on_conflict?: InputMaybe<Test_Run_Tests_On_Conflict>;
};

/** on conflict condition type for table "test_run_tests" */
export type Test_Run_Tests_On_Conflict = {
  constraint: Test_Run_Tests_Constraint;
  update_columns: Array<Test_Run_Tests_Update_Column>;
  where?: InputMaybe<Test_Run_Tests_Bool_Exp>;
};

/** ordering options when selecting data from "test_run_tests" */
export type Test_Run_Tests_Order_By = {
  attempt?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  duration_ms?: InputMaybe<Order_By>;
  error?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  runner_group_id?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  source_path?: InputMaybe<Order_By>;
  test_id?: InputMaybe<Order_By>;
  test_run_shard?: InputMaybe<Test_Run_Shards_Order_By>;
  test_run_shard_id?: InputMaybe<Order_By>;
  test_run_test_recordings_aggregate?: InputMaybe<Test_Run_Test_Recordings_Aggregate_Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "test_run_tests" */
export type Test_Run_Tests_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Test_Run_Tests_Prepend_Input = {
  scope?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "test_run_tests" */
export enum Test_Run_Tests_Select_Column {
  /** column name */
  Attempt = 'attempt',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DurationMs = 'duration_ms',
  /** column name */
  Error = 'error',
  /** column name */
  Id = 'id',
  /** column name */
  Index = 'index',
  /** column name */
  Result = 'result',
  /** column name */
  RunnerGroupId = 'runner_group_id',
  /** column name */
  Scope = 'scope',
  /** column name */
  SourcePath = 'source_path',
  /** column name */
  TestId = 'test_id',
  /** column name */
  TestRunShardId = 'test_run_shard_id',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "test_run_tests" */
export type Test_Run_Tests_Set_Input = {
  attempt?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  duration_ms?: InputMaybe<Scalars['numeric']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  result?: InputMaybe<Scalars['String']['input']>;
  runner_group_id?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['jsonb']['input']>;
  source_path?: InputMaybe<Scalars['String']['input']>;
  test_id?: InputMaybe<Scalars['String']['input']>;
  test_run_shard_id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Test_Run_Tests_Stddev_Fields = {
  __typename?: 'test_run_tests_stddev_fields';
  attempt?: Maybe<Scalars['Float']['output']>;
  duration_ms?: Maybe<Scalars['Float']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "test_run_tests" */
export type Test_Run_Tests_Stddev_Order_By = {
  attempt?: InputMaybe<Order_By>;
  duration_ms?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Test_Run_Tests_Stddev_Pop_Fields = {
  __typename?: 'test_run_tests_stddev_pop_fields';
  attempt?: Maybe<Scalars['Float']['output']>;
  duration_ms?: Maybe<Scalars['Float']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "test_run_tests" */
export type Test_Run_Tests_Stddev_Pop_Order_By = {
  attempt?: InputMaybe<Order_By>;
  duration_ms?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Test_Run_Tests_Stddev_Samp_Fields = {
  __typename?: 'test_run_tests_stddev_samp_fields';
  attempt?: Maybe<Scalars['Float']['output']>;
  duration_ms?: Maybe<Scalars['Float']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "test_run_tests" */
export type Test_Run_Tests_Stddev_Samp_Order_By = {
  attempt?: InputMaybe<Order_By>;
  duration_ms?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Test_Run_Tests_Sum_Fields = {
  __typename?: 'test_run_tests_sum_fields';
  attempt?: Maybe<Scalars['Int']['output']>;
  duration_ms?: Maybe<Scalars['numeric']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "test_run_tests" */
export type Test_Run_Tests_Sum_Order_By = {
  attempt?: InputMaybe<Order_By>;
  duration_ms?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** update columns of table "test_run_tests" */
export enum Test_Run_Tests_Update_Column {
  /** column name */
  Attempt = 'attempt',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  DurationMs = 'duration_ms',
  /** column name */
  Error = 'error',
  /** column name */
  Id = 'id',
  /** column name */
  Index = 'index',
  /** column name */
  Result = 'result',
  /** column name */
  RunnerGroupId = 'runner_group_id',
  /** column name */
  Scope = 'scope',
  /** column name */
  SourcePath = 'source_path',
  /** column name */
  TestId = 'test_id',
  /** column name */
  TestRunShardId = 'test_run_shard_id',
  /** column name */
  Title = 'title'
}

/** aggregate var_pop on columns */
export type Test_Run_Tests_Var_Pop_Fields = {
  __typename?: 'test_run_tests_var_pop_fields';
  attempt?: Maybe<Scalars['Float']['output']>;
  duration_ms?: Maybe<Scalars['Float']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "test_run_tests" */
export type Test_Run_Tests_Var_Pop_Order_By = {
  attempt?: InputMaybe<Order_By>;
  duration_ms?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Test_Run_Tests_Var_Samp_Fields = {
  __typename?: 'test_run_tests_var_samp_fields';
  attempt?: Maybe<Scalars['Float']['output']>;
  duration_ms?: Maybe<Scalars['Float']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "test_run_tests" */
export type Test_Run_Tests_Var_Samp_Order_By = {
  attempt?: InputMaybe<Order_By>;
  duration_ms?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Test_Run_Tests_Variance_Fields = {
  __typename?: 'test_run_tests_variance_fields';
  attempt?: Maybe<Scalars['Float']['output']>;
  duration_ms?: Maybe<Scalars['Float']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "test_run_tests" */
export type Test_Run_Tests_Variance_Order_By = {
  attempt?: InputMaybe<Order_By>;
  duration_ms?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** columns and relationships of "test_runs" */
export type Test_Runs = {
  __typename?: 'test_runs';
  created_at: Scalars['timestamptz']['output'];
  failed_count: Scalars['Int']['output'];
  flaky_count: Scalars['Int']['output'];
  id: Scalars['uuid']['output'];
  merge_id?: Maybe<Scalars['String']['output']>;
  metadata: Scalars['jsonb']['output'];
  mode?: Maybe<Scalars['String']['output']>;
  passed_count: Scalars['Int']['output'];
  repository?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  suite?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  workspace_id: Scalars['uuid']['output'];
};


/** columns and relationships of "test_runs" */
export type Test_RunsMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "test_runs" */
export type Test_Runs_Aggregate = {
  __typename?: 'test_runs_aggregate';
  aggregate?: Maybe<Test_Runs_Aggregate_Fields>;
  nodes: Array<Test_Runs>;
};

/** aggregate fields of "test_runs" */
export type Test_Runs_Aggregate_Fields = {
  __typename?: 'test_runs_aggregate_fields';
  avg?: Maybe<Test_Runs_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Test_Runs_Max_Fields>;
  min?: Maybe<Test_Runs_Min_Fields>;
  stddev?: Maybe<Test_Runs_Stddev_Fields>;
  stddev_pop?: Maybe<Test_Runs_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Test_Runs_Stddev_Samp_Fields>;
  sum?: Maybe<Test_Runs_Sum_Fields>;
  var_pop?: Maybe<Test_Runs_Var_Pop_Fields>;
  var_samp?: Maybe<Test_Runs_Var_Samp_Fields>;
  variance?: Maybe<Test_Runs_Variance_Fields>;
};


/** aggregate fields of "test_runs" */
export type Test_Runs_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Test_Runs_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "test_runs" */
export type Test_Runs_Aggregate_Order_By = {
  avg?: InputMaybe<Test_Runs_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Test_Runs_Max_Order_By>;
  min?: InputMaybe<Test_Runs_Min_Order_By>;
  stddev?: InputMaybe<Test_Runs_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Test_Runs_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Test_Runs_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Test_Runs_Sum_Order_By>;
  var_pop?: InputMaybe<Test_Runs_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Test_Runs_Var_Samp_Order_By>;
  variance?: InputMaybe<Test_Runs_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Test_Runs_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "test_runs" */
export type Test_Runs_Arr_Rel_Insert_Input = {
  data: Array<Test_Runs_Insert_Input>;
  on_conflict?: InputMaybe<Test_Runs_On_Conflict>;
};

/** aggregate avg on columns */
export type Test_Runs_Avg_Fields = {
  __typename?: 'test_runs_avg_fields';
  failed_count?: Maybe<Scalars['Float']['output']>;
  flaky_count?: Maybe<Scalars['Float']['output']>;
  passed_count?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "test_runs" */
export type Test_Runs_Avg_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "test_runs". All fields are combined with a logical 'AND'. */
export type Test_Runs_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Test_Runs_Bool_Exp>>>;
  _not?: InputMaybe<Test_Runs_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Test_Runs_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  failed_count?: InputMaybe<Int_Comparison_Exp>;
  flaky_count?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  merge_id?: InputMaybe<String_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  mode?: InputMaybe<String_Comparison_Exp>;
  passed_count?: InputMaybe<Int_Comparison_Exp>;
  repository?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  suite?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  workspace_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "test_runs" */
export enum Test_Runs_Constraint {
  /** unique or primary key constraint */
  TestRunsPkey = 'test_runs_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Test_Runs_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Test_Runs_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Test_Runs_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing integer column in table "test_runs" */
export type Test_Runs_Inc_Input = {
  failed_count?: InputMaybe<Scalars['Int']['input']>;
  flaky_count?: InputMaybe<Scalars['Int']['input']>;
  passed_count?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "test_runs" */
export type Test_Runs_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  failed_count?: InputMaybe<Scalars['Int']['input']>;
  flaky_count?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  merge_id?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  passed_count?: InputMaybe<Scalars['Int']['input']>;
  repository?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  suite?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Test_Runs_Max_Fields = {
  __typename?: 'test_runs_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  failed_count?: Maybe<Scalars['Int']['output']>;
  flaky_count?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  merge_id?: Maybe<Scalars['String']['output']>;
  mode?: Maybe<Scalars['String']['output']>;
  passed_count?: Maybe<Scalars['Int']['output']>;
  repository?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  suite?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "test_runs" */
export type Test_Runs_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  merge_id?: InputMaybe<Order_By>;
  mode?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
  repository?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  suite?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Test_Runs_Min_Fields = {
  __typename?: 'test_runs_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  failed_count?: Maybe<Scalars['Int']['output']>;
  flaky_count?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  merge_id?: Maybe<Scalars['String']['output']>;
  mode?: Maybe<Scalars['String']['output']>;
  passed_count?: Maybe<Scalars['Int']['output']>;
  repository?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  suite?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "test_runs" */
export type Test_Runs_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  merge_id?: InputMaybe<Order_By>;
  mode?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
  repository?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  suite?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "test_runs" */
export type Test_Runs_Mutation_Response = {
  __typename?: 'test_runs_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Test_Runs>;
};

/** columns and relationships of "test_runs_new" */
export type Test_Runs_New = {
  __typename?: 'test_runs_new';
  branch?: Maybe<Scalars['String']['output']>;
  client_key: Scalars['String']['output'];
  commit_author?: Maybe<Scalars['String']['output']>;
  commit_id?: Maybe<Scalars['String']['output']>;
  commit_title?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamptz']['output'];
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  failed_count: Scalars['Int']['output'];
  flaky_count: Scalars['Int']['output'];
  id: Scalars['uuid']['output'];
  mode?: Maybe<Scalars['String']['output']>;
  passed_count: Scalars['Int']['output'];
  pull_request_id?: Maybe<Scalars['String']['output']>;
  pull_request_title?: Maybe<Scalars['String']['output']>;
  repository?: Maybe<Scalars['String']['output']>;
  runner_name?: Maybe<Scalars['String']['output']>;
  runner_version?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  test_run_shards: Array<Test_Run_Shards>;
  /** An aggregated array relationship */
  test_run_shards_aggregate: Test_Run_Shards_Aggregate;
  title?: Maybe<Scalars['String']['output']>;
  trigger_reason?: Maybe<Scalars['String']['output']>;
  trigger_url?: Maybe<Scalars['String']['output']>;
  trigger_user?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  workspace: Workspaces;
  workspace_id: Scalars['uuid']['output'];
};


/** columns and relationships of "test_runs_new" */
export type Test_Runs_NewTest_Run_ShardsArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Shards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Shards_Order_By>>;
  where?: InputMaybe<Test_Run_Shards_Bool_Exp>;
};


/** columns and relationships of "test_runs_new" */
export type Test_Runs_NewTest_Run_Shards_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Run_Shards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Run_Shards_Order_By>>;
  where?: InputMaybe<Test_Run_Shards_Bool_Exp>;
};

/** aggregated selection of "test_runs_new" */
export type Test_Runs_New_Aggregate = {
  __typename?: 'test_runs_new_aggregate';
  aggregate?: Maybe<Test_Runs_New_Aggregate_Fields>;
  nodes: Array<Test_Runs_New>;
};

/** aggregate fields of "test_runs_new" */
export type Test_Runs_New_Aggregate_Fields = {
  __typename?: 'test_runs_new_aggregate_fields';
  avg?: Maybe<Test_Runs_New_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Test_Runs_New_Max_Fields>;
  min?: Maybe<Test_Runs_New_Min_Fields>;
  stddev?: Maybe<Test_Runs_New_Stddev_Fields>;
  stddev_pop?: Maybe<Test_Runs_New_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Test_Runs_New_Stddev_Samp_Fields>;
  sum?: Maybe<Test_Runs_New_Sum_Fields>;
  var_pop?: Maybe<Test_Runs_New_Var_Pop_Fields>;
  var_samp?: Maybe<Test_Runs_New_Var_Samp_Fields>;
  variance?: Maybe<Test_Runs_New_Variance_Fields>;
};


/** aggregate fields of "test_runs_new" */
export type Test_Runs_New_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Test_Runs_New_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "test_runs_new" */
export type Test_Runs_New_Aggregate_Order_By = {
  avg?: InputMaybe<Test_Runs_New_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Test_Runs_New_Max_Order_By>;
  min?: InputMaybe<Test_Runs_New_Min_Order_By>;
  stddev?: InputMaybe<Test_Runs_New_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Test_Runs_New_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Test_Runs_New_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Test_Runs_New_Sum_Order_By>;
  var_pop?: InputMaybe<Test_Runs_New_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Test_Runs_New_Var_Samp_Order_By>;
  variance?: InputMaybe<Test_Runs_New_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "test_runs_new" */
export type Test_Runs_New_Arr_Rel_Insert_Input = {
  data: Array<Test_Runs_New_Insert_Input>;
  on_conflict?: InputMaybe<Test_Runs_New_On_Conflict>;
};

/** aggregate avg on columns */
export type Test_Runs_New_Avg_Fields = {
  __typename?: 'test_runs_new_avg_fields';
  failed_count?: Maybe<Scalars['Float']['output']>;
  flaky_count?: Maybe<Scalars['Float']['output']>;
  passed_count?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "test_runs_new" */
export type Test_Runs_New_Avg_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "test_runs_new". All fields are combined with a logical 'AND'. */
export type Test_Runs_New_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Test_Runs_New_Bool_Exp>>>;
  _not?: InputMaybe<Test_Runs_New_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Test_Runs_New_Bool_Exp>>>;
  branch?: InputMaybe<String_Comparison_Exp>;
  client_key?: InputMaybe<String_Comparison_Exp>;
  commit_author?: InputMaybe<String_Comparison_Exp>;
  commit_id?: InputMaybe<String_Comparison_Exp>;
  commit_title?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  failed_count?: InputMaybe<Int_Comparison_Exp>;
  flaky_count?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  mode?: InputMaybe<String_Comparison_Exp>;
  passed_count?: InputMaybe<Int_Comparison_Exp>;
  pull_request_id?: InputMaybe<String_Comparison_Exp>;
  pull_request_title?: InputMaybe<String_Comparison_Exp>;
  repository?: InputMaybe<String_Comparison_Exp>;
  runner_name?: InputMaybe<String_Comparison_Exp>;
  runner_version?: InputMaybe<String_Comparison_Exp>;
  test_run_shards?: InputMaybe<Test_Run_Shards_Bool_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  trigger_reason?: InputMaybe<String_Comparison_Exp>;
  trigger_url?: InputMaybe<String_Comparison_Exp>;
  trigger_user?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  workspace?: InputMaybe<Workspaces_Bool_Exp>;
  workspace_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "test_runs_new" */
export enum Test_Runs_New_Constraint {
  /** unique or primary key constraint */
  TestRunsNewPkey = 'test_runs_new_pkey',
  /** unique or primary key constraint */
  TestRunsNewWorkspaceIdClientKeyKey = 'test_runs_new_workspace_id_client_key_key'
}

/** input type for incrementing integer column in table "test_runs_new" */
export type Test_Runs_New_Inc_Input = {
  failed_count?: InputMaybe<Scalars['Int']['input']>;
  flaky_count?: InputMaybe<Scalars['Int']['input']>;
  passed_count?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "test_runs_new" */
export type Test_Runs_New_Insert_Input = {
  branch?: InputMaybe<Scalars['String']['input']>;
  client_key?: InputMaybe<Scalars['String']['input']>;
  commit_author?: InputMaybe<Scalars['String']['input']>;
  commit_id?: InputMaybe<Scalars['String']['input']>;
  commit_title?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  failed_count?: InputMaybe<Scalars['Int']['input']>;
  flaky_count?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  passed_count?: InputMaybe<Scalars['Int']['input']>;
  pull_request_id?: InputMaybe<Scalars['String']['input']>;
  pull_request_title?: InputMaybe<Scalars['String']['input']>;
  repository?: InputMaybe<Scalars['String']['input']>;
  runner_name?: InputMaybe<Scalars['String']['input']>;
  runner_version?: InputMaybe<Scalars['String']['input']>;
  test_run_shards?: InputMaybe<Test_Run_Shards_Arr_Rel_Insert_Input>;
  title?: InputMaybe<Scalars['String']['input']>;
  trigger_reason?: InputMaybe<Scalars['String']['input']>;
  trigger_url?: InputMaybe<Scalars['String']['input']>;
  trigger_user?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  workspace?: InputMaybe<Workspaces_Obj_Rel_Insert_Input>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Test_Runs_New_Max_Fields = {
  __typename?: 'test_runs_new_max_fields';
  branch?: Maybe<Scalars['String']['output']>;
  client_key?: Maybe<Scalars['String']['output']>;
  commit_author?: Maybe<Scalars['String']['output']>;
  commit_id?: Maybe<Scalars['String']['output']>;
  commit_title?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  failed_count?: Maybe<Scalars['Int']['output']>;
  flaky_count?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  mode?: Maybe<Scalars['String']['output']>;
  passed_count?: Maybe<Scalars['Int']['output']>;
  pull_request_id?: Maybe<Scalars['String']['output']>;
  pull_request_title?: Maybe<Scalars['String']['output']>;
  repository?: Maybe<Scalars['String']['output']>;
  runner_name?: Maybe<Scalars['String']['output']>;
  runner_version?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  trigger_reason?: Maybe<Scalars['String']['output']>;
  trigger_url?: Maybe<Scalars['String']['output']>;
  trigger_user?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "test_runs_new" */
export type Test_Runs_New_Max_Order_By = {
  branch?: InputMaybe<Order_By>;
  client_key?: InputMaybe<Order_By>;
  commit_author?: InputMaybe<Order_By>;
  commit_id?: InputMaybe<Order_By>;
  commit_title?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mode?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
  pull_request_id?: InputMaybe<Order_By>;
  pull_request_title?: InputMaybe<Order_By>;
  repository?: InputMaybe<Order_By>;
  runner_name?: InputMaybe<Order_By>;
  runner_version?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  trigger_reason?: InputMaybe<Order_By>;
  trigger_url?: InputMaybe<Order_By>;
  trigger_user?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Test_Runs_New_Min_Fields = {
  __typename?: 'test_runs_new_min_fields';
  branch?: Maybe<Scalars['String']['output']>;
  client_key?: Maybe<Scalars['String']['output']>;
  commit_author?: Maybe<Scalars['String']['output']>;
  commit_id?: Maybe<Scalars['String']['output']>;
  commit_title?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  failed_count?: Maybe<Scalars['Int']['output']>;
  flaky_count?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  mode?: Maybe<Scalars['String']['output']>;
  passed_count?: Maybe<Scalars['Int']['output']>;
  pull_request_id?: Maybe<Scalars['String']['output']>;
  pull_request_title?: Maybe<Scalars['String']['output']>;
  repository?: Maybe<Scalars['String']['output']>;
  runner_name?: Maybe<Scalars['String']['output']>;
  runner_version?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  trigger_reason?: Maybe<Scalars['String']['output']>;
  trigger_url?: Maybe<Scalars['String']['output']>;
  trigger_user?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "test_runs_new" */
export type Test_Runs_New_Min_Order_By = {
  branch?: InputMaybe<Order_By>;
  client_key?: InputMaybe<Order_By>;
  commit_author?: InputMaybe<Order_By>;
  commit_id?: InputMaybe<Order_By>;
  commit_title?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mode?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
  pull_request_id?: InputMaybe<Order_By>;
  pull_request_title?: InputMaybe<Order_By>;
  repository?: InputMaybe<Order_By>;
  runner_name?: InputMaybe<Order_By>;
  runner_version?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  trigger_reason?: InputMaybe<Order_By>;
  trigger_url?: InputMaybe<Order_By>;
  trigger_user?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "test_runs_new" */
export type Test_Runs_New_Mutation_Response = {
  __typename?: 'test_runs_new_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Test_Runs_New>;
};

/** input type for inserting object relation for remote table "test_runs_new" */
export type Test_Runs_New_Obj_Rel_Insert_Input = {
  data: Test_Runs_New_Insert_Input;
  on_conflict?: InputMaybe<Test_Runs_New_On_Conflict>;
};

/** on conflict condition type for table "test_runs_new" */
export type Test_Runs_New_On_Conflict = {
  constraint: Test_Runs_New_Constraint;
  update_columns: Array<Test_Runs_New_Update_Column>;
  where?: InputMaybe<Test_Runs_New_Bool_Exp>;
};

/** ordering options when selecting data from "test_runs_new" */
export type Test_Runs_New_Order_By = {
  branch?: InputMaybe<Order_By>;
  client_key?: InputMaybe<Order_By>;
  commit_author?: InputMaybe<Order_By>;
  commit_id?: InputMaybe<Order_By>;
  commit_title?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mode?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
  pull_request_id?: InputMaybe<Order_By>;
  pull_request_title?: InputMaybe<Order_By>;
  repository?: InputMaybe<Order_By>;
  runner_name?: InputMaybe<Order_By>;
  runner_version?: InputMaybe<Order_By>;
  test_run_shards_aggregate?: InputMaybe<Test_Run_Shards_Aggregate_Order_By>;
  title?: InputMaybe<Order_By>;
  trigger_reason?: InputMaybe<Order_By>;
  trigger_url?: InputMaybe<Order_By>;
  trigger_user?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  workspace?: InputMaybe<Workspaces_Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "test_runs_new" */
export type Test_Runs_New_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "test_runs_new" */
export enum Test_Runs_New_Select_Column {
  /** column name */
  Branch = 'branch',
  /** column name */
  ClientKey = 'client_key',
  /** column name */
  CommitAuthor = 'commit_author',
  /** column name */
  CommitId = 'commit_id',
  /** column name */
  CommitTitle = 'commit_title',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  FailedCount = 'failed_count',
  /** column name */
  FlakyCount = 'flaky_count',
  /** column name */
  Id = 'id',
  /** column name */
  Mode = 'mode',
  /** column name */
  PassedCount = 'passed_count',
  /** column name */
  PullRequestId = 'pull_request_id',
  /** column name */
  PullRequestTitle = 'pull_request_title',
  /** column name */
  Repository = 'repository',
  /** column name */
  RunnerName = 'runner_name',
  /** column name */
  RunnerVersion = 'runner_version',
  /** column name */
  Title = 'title',
  /** column name */
  TriggerReason = 'trigger_reason',
  /** column name */
  TriggerUrl = 'trigger_url',
  /** column name */
  TriggerUser = 'trigger_user',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** input type for updating data in table "test_runs_new" */
export type Test_Runs_New_Set_Input = {
  branch?: InputMaybe<Scalars['String']['input']>;
  client_key?: InputMaybe<Scalars['String']['input']>;
  commit_author?: InputMaybe<Scalars['String']['input']>;
  commit_id?: InputMaybe<Scalars['String']['input']>;
  commit_title?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  failed_count?: InputMaybe<Scalars['Int']['input']>;
  flaky_count?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  passed_count?: InputMaybe<Scalars['Int']['input']>;
  pull_request_id?: InputMaybe<Scalars['String']['input']>;
  pull_request_title?: InputMaybe<Scalars['String']['input']>;
  repository?: InputMaybe<Scalars['String']['input']>;
  runner_name?: InputMaybe<Scalars['String']['input']>;
  runner_version?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  trigger_reason?: InputMaybe<Scalars['String']['input']>;
  trigger_url?: InputMaybe<Scalars['String']['input']>;
  trigger_user?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Test_Runs_New_Stddev_Fields = {
  __typename?: 'test_runs_new_stddev_fields';
  failed_count?: Maybe<Scalars['Float']['output']>;
  flaky_count?: Maybe<Scalars['Float']['output']>;
  passed_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "test_runs_new" */
export type Test_Runs_New_Stddev_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Test_Runs_New_Stddev_Pop_Fields = {
  __typename?: 'test_runs_new_stddev_pop_fields';
  failed_count?: Maybe<Scalars['Float']['output']>;
  flaky_count?: Maybe<Scalars['Float']['output']>;
  passed_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "test_runs_new" */
export type Test_Runs_New_Stddev_Pop_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Test_Runs_New_Stddev_Samp_Fields = {
  __typename?: 'test_runs_new_stddev_samp_fields';
  failed_count?: Maybe<Scalars['Float']['output']>;
  flaky_count?: Maybe<Scalars['Float']['output']>;
  passed_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "test_runs_new" */
export type Test_Runs_New_Stddev_Samp_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Test_Runs_New_Sum_Fields = {
  __typename?: 'test_runs_new_sum_fields';
  failed_count?: Maybe<Scalars['Int']['output']>;
  flaky_count?: Maybe<Scalars['Int']['output']>;
  passed_count?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "test_runs_new" */
export type Test_Runs_New_Sum_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** update columns of table "test_runs_new" */
export enum Test_Runs_New_Update_Column {
  /** column name */
  Branch = 'branch',
  /** column name */
  ClientKey = 'client_key',
  /** column name */
  CommitAuthor = 'commit_author',
  /** column name */
  CommitId = 'commit_id',
  /** column name */
  CommitTitle = 'commit_title',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  FailedCount = 'failed_count',
  /** column name */
  FlakyCount = 'flaky_count',
  /** column name */
  Id = 'id',
  /** column name */
  Mode = 'mode',
  /** column name */
  PassedCount = 'passed_count',
  /** column name */
  PullRequestId = 'pull_request_id',
  /** column name */
  PullRequestTitle = 'pull_request_title',
  /** column name */
  Repository = 'repository',
  /** column name */
  RunnerName = 'runner_name',
  /** column name */
  RunnerVersion = 'runner_version',
  /** column name */
  Title = 'title',
  /** column name */
  TriggerReason = 'trigger_reason',
  /** column name */
  TriggerUrl = 'trigger_url',
  /** column name */
  TriggerUser = 'trigger_user',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** aggregate var_pop on columns */
export type Test_Runs_New_Var_Pop_Fields = {
  __typename?: 'test_runs_new_var_pop_fields';
  failed_count?: Maybe<Scalars['Float']['output']>;
  flaky_count?: Maybe<Scalars['Float']['output']>;
  passed_count?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "test_runs_new" */
export type Test_Runs_New_Var_Pop_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Test_Runs_New_Var_Samp_Fields = {
  __typename?: 'test_runs_new_var_samp_fields';
  failed_count?: Maybe<Scalars['Float']['output']>;
  flaky_count?: Maybe<Scalars['Float']['output']>;
  passed_count?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "test_runs_new" */
export type Test_Runs_New_Var_Samp_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Test_Runs_New_Variance_Fields = {
  __typename?: 'test_runs_new_variance_fields';
  failed_count?: Maybe<Scalars['Float']['output']>;
  flaky_count?: Maybe<Scalars['Float']['output']>;
  passed_count?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "test_runs_new" */
export type Test_Runs_New_Variance_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** input type for inserting object relation for remote table "test_runs" */
export type Test_Runs_Obj_Rel_Insert_Input = {
  data: Test_Runs_Insert_Input;
  on_conflict?: InputMaybe<Test_Runs_On_Conflict>;
};

/** on conflict condition type for table "test_runs" */
export type Test_Runs_On_Conflict = {
  constraint: Test_Runs_Constraint;
  update_columns: Array<Test_Runs_Update_Column>;
  where?: InputMaybe<Test_Runs_Bool_Exp>;
};

/** ordering options when selecting data from "test_runs" */
export type Test_Runs_Order_By = {
  created_at?: InputMaybe<Order_By>;
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  merge_id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  mode?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
  repository?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  suite?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "test_runs" */
export type Test_Runs_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Test_Runs_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "test_runs" */
export enum Test_Runs_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FailedCount = 'failed_count',
  /** column name */
  FlakyCount = 'flaky_count',
  /** column name */
  Id = 'id',
  /** column name */
  MergeId = 'merge_id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Mode = 'mode',
  /** column name */
  PassedCount = 'passed_count',
  /** column name */
  Repository = 'repository',
  /** column name */
  Status = 'status',
  /** column name */
  Suite = 'suite',
  /** column name */
  Title = 'title',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** input type for updating data in table "test_runs" */
export type Test_Runs_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  failed_count?: InputMaybe<Scalars['Int']['input']>;
  flaky_count?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  merge_id?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  passed_count?: InputMaybe<Scalars['Int']['input']>;
  repository?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  suite?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Test_Runs_Stddev_Fields = {
  __typename?: 'test_runs_stddev_fields';
  failed_count?: Maybe<Scalars['Float']['output']>;
  flaky_count?: Maybe<Scalars['Float']['output']>;
  passed_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "test_runs" */
export type Test_Runs_Stddev_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Test_Runs_Stddev_Pop_Fields = {
  __typename?: 'test_runs_stddev_pop_fields';
  failed_count?: Maybe<Scalars['Float']['output']>;
  flaky_count?: Maybe<Scalars['Float']['output']>;
  passed_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "test_runs" */
export type Test_Runs_Stddev_Pop_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Test_Runs_Stddev_Samp_Fields = {
  __typename?: 'test_runs_stddev_samp_fields';
  failed_count?: Maybe<Scalars['Float']['output']>;
  flaky_count?: Maybe<Scalars['Float']['output']>;
  passed_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "test_runs" */
export type Test_Runs_Stddev_Samp_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Test_Runs_Sum_Fields = {
  __typename?: 'test_runs_sum_fields';
  failed_count?: Maybe<Scalars['Int']['output']>;
  flaky_count?: Maybe<Scalars['Int']['output']>;
  passed_count?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "test_runs" */
export type Test_Runs_Sum_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** update columns of table "test_runs" */
export enum Test_Runs_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FailedCount = 'failed_count',
  /** column name */
  FlakyCount = 'flaky_count',
  /** column name */
  Id = 'id',
  /** column name */
  MergeId = 'merge_id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Mode = 'mode',
  /** column name */
  PassedCount = 'passed_count',
  /** column name */
  Repository = 'repository',
  /** column name */
  Status = 'status',
  /** column name */
  Suite = 'suite',
  /** column name */
  Title = 'title',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** aggregate var_pop on columns */
export type Test_Runs_Var_Pop_Fields = {
  __typename?: 'test_runs_var_pop_fields';
  failed_count?: Maybe<Scalars['Float']['output']>;
  flaky_count?: Maybe<Scalars['Float']['output']>;
  passed_count?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "test_runs" */
export type Test_Runs_Var_Pop_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Test_Runs_Var_Samp_Fields = {
  __typename?: 'test_runs_var_samp_fields';
  failed_count?: Maybe<Scalars['Float']['output']>;
  flaky_count?: Maybe<Scalars['Float']['output']>;
  passed_count?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "test_runs" */
export type Test_Runs_Var_Samp_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Test_Runs_Variance_Fields = {
  __typename?: 'test_runs_variance_fields';
  failed_count?: Maybe<Scalars['Float']['output']>;
  flaky_count?: Maybe<Scalars['Float']['output']>;
  passed_count?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "test_runs" */
export type Test_Runs_Variance_Order_By = {
  failed_count?: InputMaybe<Order_By>;
  flaky_count?: InputMaybe<Order_By>;
  passed_count?: InputMaybe<Order_By>;
};

/** expression to compare columns of type timestamp. All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "user_ids" */
export type User_Ids = {
  __typename?: 'user_ids';
  id: Scalars['uuid']['output'];
};

/** aggregated selection of "user_ids" */
export type User_Ids_Aggregate = {
  __typename?: 'user_ids_aggregate';
  aggregate?: Maybe<User_Ids_Aggregate_Fields>;
  nodes: Array<User_Ids>;
};

/** aggregate fields of "user_ids" */
export type User_Ids_Aggregate_Fields = {
  __typename?: 'user_ids_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<User_Ids_Max_Fields>;
  min?: Maybe<User_Ids_Min_Fields>;
};


/** aggregate fields of "user_ids" */
export type User_Ids_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Ids_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_ids" */
export type User_Ids_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Ids_Max_Order_By>;
  min?: InputMaybe<User_Ids_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_ids" */
export type User_Ids_Arr_Rel_Insert_Input = {
  data: Array<User_Ids_Insert_Input>;
  on_conflict?: InputMaybe<User_Ids_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_ids". All fields are combined with a logical 'AND'. */
export type User_Ids_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<User_Ids_Bool_Exp>>>;
  _not?: InputMaybe<User_Ids_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<User_Ids_Bool_Exp>>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_ids" */
export enum User_Ids_Constraint {
  /** unique or primary key constraint */
  UserIdsPkey = 'user_ids_pkey'
}

/** input type for inserting data into table "user_ids" */
export type User_Ids_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type User_Ids_Max_Fields = {
  __typename?: 'user_ids_max_fields';
  id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "user_ids" */
export type User_Ids_Max_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Ids_Min_Fields = {
  __typename?: 'user_ids_min_fields';
  id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "user_ids" */
export type User_Ids_Min_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_ids" */
export type User_Ids_Mutation_Response = {
  __typename?: 'user_ids_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<User_Ids>;
};

/** input type for inserting object relation for remote table "user_ids" */
export type User_Ids_Obj_Rel_Insert_Input = {
  data: User_Ids_Insert_Input;
  on_conflict?: InputMaybe<User_Ids_On_Conflict>;
};

/** on conflict condition type for table "user_ids" */
export type User_Ids_On_Conflict = {
  constraint: User_Ids_Constraint;
  update_columns: Array<User_Ids_Update_Column>;
  where?: InputMaybe<User_Ids_Bool_Exp>;
};

/** ordering options when selecting data from "user_ids" */
export type User_Ids_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "user_ids" */
export type User_Ids_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "user_ids" */
export enum User_Ids_Select_Column {
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "user_ids" */
export type User_Ids_Set_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "user_ids" */
export enum User_Ids_Update_Column {
  /** column name */
  Id = 'id'
}

/** columns and relationships of "user_settings" */
export type User_Settings = {
  __typename?: 'user_settings';
  default_workspace_id?: Maybe<Scalars['uuid']['output']>;
  disable_logrocket: Scalars['Boolean']['output'];
  enable_event_link?: Maybe<Scalars['Boolean']['output']>;
  enable_global_search: Scalars['Boolean']['output'];
  enable_network_monitor: Scalars['Boolean']['output'];
  enable_repaint: Scalars['Boolean']['output'];
  enable_teams: Scalars['Boolean']['output'];
  role?: Maybe<Scalars['String']['output']>;
  show_elements: Scalars['Boolean']['output'];
  show_react: Scalars['Boolean']['output'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "user_settings" */
export type User_Settings_Aggregate = {
  __typename?: 'user_settings_aggregate';
  aggregate?: Maybe<User_Settings_Aggregate_Fields>;
  nodes: Array<User_Settings>;
};

/** aggregate fields of "user_settings" */
export type User_Settings_Aggregate_Fields = {
  __typename?: 'user_settings_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<User_Settings_Max_Fields>;
  min?: Maybe<User_Settings_Min_Fields>;
};


/** aggregate fields of "user_settings" */
export type User_Settings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Settings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_settings" */
export type User_Settings_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Settings_Max_Order_By>;
  min?: InputMaybe<User_Settings_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_settings" */
export type User_Settings_Arr_Rel_Insert_Input = {
  data: Array<User_Settings_Insert_Input>;
  on_conflict?: InputMaybe<User_Settings_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_settings". All fields are combined with a logical 'AND'. */
export type User_Settings_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<User_Settings_Bool_Exp>>>;
  _not?: InputMaybe<User_Settings_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<User_Settings_Bool_Exp>>>;
  default_workspace_id?: InputMaybe<Uuid_Comparison_Exp>;
  disable_logrocket?: InputMaybe<Boolean_Comparison_Exp>;
  enable_event_link?: InputMaybe<Boolean_Comparison_Exp>;
  enable_global_search?: InputMaybe<Boolean_Comparison_Exp>;
  enable_network_monitor?: InputMaybe<Boolean_Comparison_Exp>;
  enable_repaint?: InputMaybe<Boolean_Comparison_Exp>;
  enable_teams?: InputMaybe<Boolean_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  show_elements?: InputMaybe<Boolean_Comparison_Exp>;
  show_react?: InputMaybe<Boolean_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_settings" */
export enum User_Settings_Constraint {
  /** unique or primary key constraint */
  UserSettingsPkey = 'user_settings_pkey'
}

/** input type for inserting data into table "user_settings" */
export type User_Settings_Insert_Input = {
  default_workspace_id?: InputMaybe<Scalars['uuid']['input']>;
  disable_logrocket?: InputMaybe<Scalars['Boolean']['input']>;
  enable_event_link?: InputMaybe<Scalars['Boolean']['input']>;
  enable_global_search?: InputMaybe<Scalars['Boolean']['input']>;
  enable_network_monitor?: InputMaybe<Scalars['Boolean']['input']>;
  enable_repaint?: InputMaybe<Scalars['Boolean']['input']>;
  enable_teams?: InputMaybe<Scalars['Boolean']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  show_elements?: InputMaybe<Scalars['Boolean']['input']>;
  show_react?: InputMaybe<Scalars['Boolean']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type User_Settings_Max_Fields = {
  __typename?: 'user_settings_max_fields';
  default_workspace_id?: Maybe<Scalars['uuid']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "user_settings" */
export type User_Settings_Max_Order_By = {
  default_workspace_id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Settings_Min_Fields = {
  __typename?: 'user_settings_min_fields';
  default_workspace_id?: Maybe<Scalars['uuid']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "user_settings" */
export type User_Settings_Min_Order_By = {
  default_workspace_id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_settings" */
export type User_Settings_Mutation_Response = {
  __typename?: 'user_settings_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<User_Settings>;
};

/** input type for inserting object relation for remote table "user_settings" */
export type User_Settings_Obj_Rel_Insert_Input = {
  data: User_Settings_Insert_Input;
  on_conflict?: InputMaybe<User_Settings_On_Conflict>;
};

/** on conflict condition type for table "user_settings" */
export type User_Settings_On_Conflict = {
  constraint: User_Settings_Constraint;
  update_columns: Array<User_Settings_Update_Column>;
  where?: InputMaybe<User_Settings_Bool_Exp>;
};

/** ordering options when selecting data from "user_settings" */
export type User_Settings_Order_By = {
  default_workspace_id?: InputMaybe<Order_By>;
  disable_logrocket?: InputMaybe<Order_By>;
  enable_event_link?: InputMaybe<Order_By>;
  enable_global_search?: InputMaybe<Order_By>;
  enable_network_monitor?: InputMaybe<Order_By>;
  enable_repaint?: InputMaybe<Order_By>;
  enable_teams?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  show_elements?: InputMaybe<Order_By>;
  show_react?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "user_settings" */
export type User_Settings_Pk_Columns_Input = {
  user_id: Scalars['uuid']['input'];
};

/** select columns of table "user_settings" */
export enum User_Settings_Select_Column {
  /** column name */
  DefaultWorkspaceId = 'default_workspace_id',
  /** column name */
  DisableLogrocket = 'disable_logrocket',
  /** column name */
  EnableEventLink = 'enable_event_link',
  /** column name */
  EnableGlobalSearch = 'enable_global_search',
  /** column name */
  EnableNetworkMonitor = 'enable_network_monitor',
  /** column name */
  EnableRepaint = 'enable_repaint',
  /** column name */
  EnableTeams = 'enable_teams',
  /** column name */
  Role = 'role',
  /** column name */
  ShowElements = 'show_elements',
  /** column name */
  ShowReact = 'show_react',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_settings" */
export type User_Settings_Set_Input = {
  default_workspace_id?: InputMaybe<Scalars['uuid']['input']>;
  disable_logrocket?: InputMaybe<Scalars['Boolean']['input']>;
  enable_event_link?: InputMaybe<Scalars['Boolean']['input']>;
  enable_global_search?: InputMaybe<Scalars['Boolean']['input']>;
  enable_network_monitor?: InputMaybe<Scalars['Boolean']['input']>;
  enable_repaint?: InputMaybe<Scalars['Boolean']['input']>;
  enable_teams?: InputMaybe<Scalars['Boolean']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  show_elements?: InputMaybe<Scalars['Boolean']['input']>;
  show_react?: InputMaybe<Scalars['Boolean']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "user_settings" */
export enum User_Settings_Update_Column {
  /** column name */
  DefaultWorkspaceId = 'default_workspace_id',
  /** column name */
  DisableLogrocket = 'disable_logrocket',
  /** column name */
  EnableEventLink = 'enable_event_link',
  /** column name */
  EnableGlobalSearch = 'enable_global_search',
  /** column name */
  EnableNetworkMonitor = 'enable_network_monitor',
  /** column name */
  EnableRepaint = 'enable_repaint',
  /** column name */
  EnableTeams = 'enable_teams',
  /** column name */
  Role = 'role',
  /** column name */
  ShowElements = 'show_elements',
  /** column name */
  ShowReact = 'show_react',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "user_tos" */
export type User_Tos = {
  __typename?: 'user_tos';
  accepted_at: Scalars['timestamptz']['output'];
  tos_version: Scalars['Int']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "user_tos" */
export type User_Tos_Aggregate = {
  __typename?: 'user_tos_aggregate';
  aggregate?: Maybe<User_Tos_Aggregate_Fields>;
  nodes: Array<User_Tos>;
};

/** aggregate fields of "user_tos" */
export type User_Tos_Aggregate_Fields = {
  __typename?: 'user_tos_aggregate_fields';
  avg?: Maybe<User_Tos_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<User_Tos_Max_Fields>;
  min?: Maybe<User_Tos_Min_Fields>;
  stddev?: Maybe<User_Tos_Stddev_Fields>;
  stddev_pop?: Maybe<User_Tos_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Tos_Stddev_Samp_Fields>;
  sum?: Maybe<User_Tos_Sum_Fields>;
  var_pop?: Maybe<User_Tos_Var_Pop_Fields>;
  var_samp?: Maybe<User_Tos_Var_Samp_Fields>;
  variance?: Maybe<User_Tos_Variance_Fields>;
};


/** aggregate fields of "user_tos" */
export type User_Tos_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Tos_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_tos" */
export type User_Tos_Aggregate_Order_By = {
  avg?: InputMaybe<User_Tos_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Tos_Max_Order_By>;
  min?: InputMaybe<User_Tos_Min_Order_By>;
  stddev?: InputMaybe<User_Tos_Stddev_Order_By>;
  stddev_pop?: InputMaybe<User_Tos_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<User_Tos_Stddev_Samp_Order_By>;
  sum?: InputMaybe<User_Tos_Sum_Order_By>;
  var_pop?: InputMaybe<User_Tos_Var_Pop_Order_By>;
  var_samp?: InputMaybe<User_Tos_Var_Samp_Order_By>;
  variance?: InputMaybe<User_Tos_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_tos" */
export type User_Tos_Arr_Rel_Insert_Input = {
  data: Array<User_Tos_Insert_Input>;
  on_conflict?: InputMaybe<User_Tos_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Tos_Avg_Fields = {
  __typename?: 'user_tos_avg_fields';
  tos_version?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "user_tos" */
export type User_Tos_Avg_Order_By = {
  tos_version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_tos". All fields are combined with a logical 'AND'. */
export type User_Tos_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<User_Tos_Bool_Exp>>>;
  _not?: InputMaybe<User_Tos_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<User_Tos_Bool_Exp>>>;
  accepted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  tos_version?: InputMaybe<Int_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_tos" */
export enum User_Tos_Constraint {
  /** unique or primary key constraint */
  UserTosPkey = 'user_tos_pkey'
}

/** input type for incrementing integer column in table "user_tos" */
export type User_Tos_Inc_Input = {
  tos_version?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "user_tos" */
export type User_Tos_Insert_Input = {
  accepted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  tos_version?: InputMaybe<Scalars['Int']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type User_Tos_Max_Fields = {
  __typename?: 'user_tos_max_fields';
  accepted_at?: Maybe<Scalars['timestamptz']['output']>;
  tos_version?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "user_tos" */
export type User_Tos_Max_Order_By = {
  accepted_at?: InputMaybe<Order_By>;
  tos_version?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Tos_Min_Fields = {
  __typename?: 'user_tos_min_fields';
  accepted_at?: Maybe<Scalars['timestamptz']['output']>;
  tos_version?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "user_tos" */
export type User_Tos_Min_Order_By = {
  accepted_at?: InputMaybe<Order_By>;
  tos_version?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_tos" */
export type User_Tos_Mutation_Response = {
  __typename?: 'user_tos_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<User_Tos>;
};

/** input type for inserting object relation for remote table "user_tos" */
export type User_Tos_Obj_Rel_Insert_Input = {
  data: User_Tos_Insert_Input;
  on_conflict?: InputMaybe<User_Tos_On_Conflict>;
};

/** on conflict condition type for table "user_tos" */
export type User_Tos_On_Conflict = {
  constraint: User_Tos_Constraint;
  update_columns: Array<User_Tos_Update_Column>;
  where?: InputMaybe<User_Tos_Bool_Exp>;
};

/** ordering options when selecting data from "user_tos" */
export type User_Tos_Order_By = {
  accepted_at?: InputMaybe<Order_By>;
  tos_version?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "user_tos" */
export type User_Tos_Pk_Columns_Input = {
  tos_version: Scalars['Int']['input'];
  user_id: Scalars['uuid']['input'];
};

/** select columns of table "user_tos" */
export enum User_Tos_Select_Column {
  /** column name */
  AcceptedAt = 'accepted_at',
  /** column name */
  TosVersion = 'tos_version',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_tos" */
export type User_Tos_Set_Input = {
  accepted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  tos_version?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type User_Tos_Stddev_Fields = {
  __typename?: 'user_tos_stddev_fields';
  tos_version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "user_tos" */
export type User_Tos_Stddev_Order_By = {
  tos_version?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Tos_Stddev_Pop_Fields = {
  __typename?: 'user_tos_stddev_pop_fields';
  tos_version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "user_tos" */
export type User_Tos_Stddev_Pop_Order_By = {
  tos_version?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Tos_Stddev_Samp_Fields = {
  __typename?: 'user_tos_stddev_samp_fields';
  tos_version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "user_tos" */
export type User_Tos_Stddev_Samp_Order_By = {
  tos_version?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Tos_Sum_Fields = {
  __typename?: 'user_tos_sum_fields';
  tos_version?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "user_tos" */
export type User_Tos_Sum_Order_By = {
  tos_version?: InputMaybe<Order_By>;
};

/** update columns of table "user_tos" */
export enum User_Tos_Update_Column {
  /** column name */
  AcceptedAt = 'accepted_at',
  /** column name */
  TosVersion = 'tos_version',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type User_Tos_Var_Pop_Fields = {
  __typename?: 'user_tos_var_pop_fields';
  tos_version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "user_tos" */
export type User_Tos_Var_Pop_Order_By = {
  tos_version?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Tos_Var_Samp_Fields = {
  __typename?: 'user_tos_var_samp_fields';
  tos_version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "user_tos" */
export type User_Tos_Var_Samp_Order_By = {
  tos_version?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Tos_Variance_Fields = {
  __typename?: 'user_tos_variance_fields';
  tos_version?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "user_tos" */
export type User_Tos_Variance_Order_By = {
  tos_version?: InputMaybe<Order_By>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An object relationship */
  activity?: Maybe<Users_Activity>;
  /** An array relationship */
  api_keys: Array<Api_Keys>;
  /** An aggregated array relationship */
  api_keys_aggregate: Api_Keys_Aggregate;
  auth_id?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  collaborators: Array<Collaborators>;
  /** An aggregated array relationship */
  collaborators_aggregate: Collaborators_Aggregate;
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregated array relationship */
  comments_aggregate: Comments_Aggregate;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  default_workspace_id?: Maybe<Scalars['uuid']['output']>;
  /** A computed field, executes function "user_domain" */
  domain?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  internal: Scalars['Boolean']['output'];
  /** An array relationship */
  invitations: Array<Invitations>;
  /** An aggregated array relationship */
  invitations_aggregate: Invitations_Aggregate;
  invited: Scalars['Boolean']['output'];
  nags: Scalars['jsonb']['output'];
  name?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  preferences: Scalars['jsonb']['output'];
  priority: Scalars['Int']['output'];
  /** An array relationship */
  recordings: Array<Recordings>;
  /** An aggregated array relationship */
  recordings_aggregate: Recordings_Aggregate;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregated array relationship */
  sessions_aggregate: Sessions_Aggregate;
  test?: Maybe<Scalars['Boolean']['output']>;
  unsubscribed_email_types: Scalars['jsonb']['output'];
  use_recordings_in_stress_testing: Scalars['Boolean']['output'];
  /** An object relationship */
  user_settings?: Maybe<User_Settings>;
  /** An array relationship */
  user_tos: Array<User_Tos>;
  /** An aggregated array relationship */
  user_tos_aggregate: User_Tos_Aggregate;
  /** An array relationship */
  workspaces: Array<Workspaces>;
  /** An aggregated array relationship */
  workspaces_aggregate: Workspaces_Aggregate;
  /** An array relationship */
  workspaces_subscriptions: Array<Workspaces_Subscription>;
  /** An aggregated array relationship */
  workspaces_subscriptions_aggregate: Workspaces_Subscription_Aggregate;
  /** An array relationship */
  workspaces_users: Array<Workspaces_User>;
  /** An aggregated array relationship */
  workspaces_users_aggregate: Workspaces_User_Aggregate;
};


/** columns and relationships of "users" */
export type UsersApi_KeysArgs = {
  distinct_on?: InputMaybe<Array<Api_Keys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Api_Keys_Order_By>>;
  where?: InputMaybe<Api_Keys_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersApi_Keys_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Api_Keys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Api_Keys_Order_By>>;
  where?: InputMaybe<Api_Keys_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersCollaboratorsArgs = {
  distinct_on?: InputMaybe<Array<Collaborators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaborators_Order_By>>;
  where?: InputMaybe<Collaborators_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersCollaborators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Collaborators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collaborators_Order_By>>;
  where?: InputMaybe<Collaborators_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersCommentsArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersComments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersInvitationsArgs = {
  distinct_on?: InputMaybe<Array<Invitations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitations_Order_By>>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersInvitations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitations_Order_By>>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersNagsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "users" */
export type UsersPreferencesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "users" */
export type UsersRecordingsArgs = {
  distinct_on?: InputMaybe<Array<Recordings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recordings_Order_By>>;
  where?: InputMaybe<Recordings_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRecordings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recordings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recordings_Order_By>>;
  where?: InputMaybe<Recordings_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUnsubscribed_Email_TypesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "users" */
export type UsersUser_TosArgs = {
  distinct_on?: InputMaybe<Array<User_Tos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Tos_Order_By>>;
  where?: InputMaybe<User_Tos_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUser_Tos_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Tos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Tos_Order_By>>;
  where?: InputMaybe<User_Tos_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersWorkspacesArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Order_By>>;
  where?: InputMaybe<Workspaces_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersWorkspaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Order_By>>;
  where?: InputMaybe<Workspaces_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersWorkspaces_SubscriptionsArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Subscription_Order_By>>;
  where?: InputMaybe<Workspaces_Subscription_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersWorkspaces_Subscriptions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_Subscription_Order_By>>;
  where?: InputMaybe<Workspaces_Subscription_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersWorkspaces_UsersArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_User_Order_By>>;
  where?: InputMaybe<Workspaces_User_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersWorkspaces_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_User_Order_By>>;
  where?: InputMaybe<Workspaces_User_Bool_Exp>;
};

/** columns and relationships of "users_activity" */
export type Users_Activity = {
  __typename?: 'users_activity';
  last_active_date?: Maybe<Scalars['timestamptz']['output']>;
  last_comment_date?: Maybe<Scalars['timestamptz']['output']>;
  last_recording_date?: Maybe<Scalars['timestamptz']['output']>;
  last_session_date?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "users_activity" */
export type Users_Activity_Aggregate = {
  __typename?: 'users_activity_aggregate';
  aggregate?: Maybe<Users_Activity_Aggregate_Fields>;
  nodes: Array<Users_Activity>;
};

/** aggregate fields of "users_activity" */
export type Users_Activity_Aggregate_Fields = {
  __typename?: 'users_activity_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Users_Activity_Max_Fields>;
  min?: Maybe<Users_Activity_Min_Fields>;
};


/** aggregate fields of "users_activity" */
export type Users_Activity_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Activity_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "users_activity" */
export type Users_Activity_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Users_Activity_Max_Order_By>;
  min?: InputMaybe<Users_Activity_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "users_activity". All fields are combined with a logical 'AND'. */
export type Users_Activity_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Users_Activity_Bool_Exp>>>;
  _not?: InputMaybe<Users_Activity_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Users_Activity_Bool_Exp>>>;
  last_active_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  last_comment_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  last_recording_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  last_session_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Users_Activity_Max_Fields = {
  __typename?: 'users_activity_max_fields';
  last_active_date?: Maybe<Scalars['timestamptz']['output']>;
  last_comment_date?: Maybe<Scalars['timestamptz']['output']>;
  last_recording_date?: Maybe<Scalars['timestamptz']['output']>;
  last_session_date?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "users_activity" */
export type Users_Activity_Max_Order_By = {
  last_active_date?: InputMaybe<Order_By>;
  last_comment_date?: InputMaybe<Order_By>;
  last_recording_date?: InputMaybe<Order_By>;
  last_session_date?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Activity_Min_Fields = {
  __typename?: 'users_activity_min_fields';
  last_active_date?: Maybe<Scalars['timestamptz']['output']>;
  last_comment_date?: Maybe<Scalars['timestamptz']['output']>;
  last_recording_date?: Maybe<Scalars['timestamptz']['output']>;
  last_session_date?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "users_activity" */
export type Users_Activity_Min_Order_By = {
  last_active_date?: InputMaybe<Order_By>;
  last_comment_date?: InputMaybe<Order_By>;
  last_recording_date?: InputMaybe<Order_By>;
  last_session_date?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** ordering options when selecting data from "users_activity" */
export type Users_Activity_Order_By = {
  last_active_date?: InputMaybe<Order_By>;
  last_comment_date?: InputMaybe<Order_By>;
  last_recording_date?: InputMaybe<Order_By>;
  last_session_date?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "users_activity" */
export enum Users_Activity_Select_Column {
  /** column name */
  LastActiveDate = 'last_active_date',
  /** column name */
  LastCommentDate = 'last_comment_date',
  /** column name */
  LastRecordingDate = 'last_recording_date',
  /** column name */
  LastSessionDate = 'last_session_date',
  /** column name */
  UserId = 'user_id'
}

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  avg?: Maybe<Users_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
  stddev?: Maybe<Users_Stddev_Fields>;
  stddev_pop?: Maybe<Users_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Users_Stddev_Samp_Fields>;
  sum?: Maybe<Users_Sum_Fields>;
  var_pop?: Maybe<Users_Var_Pop_Fields>;
  var_samp?: Maybe<Users_Var_Samp_Fields>;
  variance?: Maybe<Users_Variance_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  avg?: InputMaybe<Users_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Users_Max_Order_By>;
  min?: InputMaybe<Users_Min_Order_By>;
  stddev?: InputMaybe<Users_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Users_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Users_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Users_Sum_Order_By>;
  var_pop?: InputMaybe<Users_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Users_Var_Samp_Order_By>;
  variance?: InputMaybe<Users_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Users_Append_Input = {
  nags?: InputMaybe<Scalars['jsonb']['input']>;
  preferences?: InputMaybe<Scalars['jsonb']['input']>;
  unsubscribed_email_types?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields';
  priority?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "users" */
export type Users_Avg_Order_By = {
  priority?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Users_Bool_Exp>>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Users_Bool_Exp>>>;
  activity?: InputMaybe<Users_Activity_Bool_Exp>;
  api_keys?: InputMaybe<Api_Keys_Bool_Exp>;
  auth_id?: InputMaybe<String_Comparison_Exp>;
  collaborators?: InputMaybe<Collaborators_Bool_Exp>;
  comments?: InputMaybe<Comments_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  default_workspace_id?: InputMaybe<Uuid_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  internal?: InputMaybe<Boolean_Comparison_Exp>;
  invitations?: InputMaybe<Invitations_Bool_Exp>;
  invited?: InputMaybe<Boolean_Comparison_Exp>;
  nags?: InputMaybe<Jsonb_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nickname?: InputMaybe<String_Comparison_Exp>;
  picture?: InputMaybe<String_Comparison_Exp>;
  preferences?: InputMaybe<Jsonb_Comparison_Exp>;
  priority?: InputMaybe<Int_Comparison_Exp>;
  recordings?: InputMaybe<Recordings_Bool_Exp>;
  sessions?: InputMaybe<Sessions_Bool_Exp>;
  test?: InputMaybe<Boolean_Comparison_Exp>;
  unsubscribed_email_types?: InputMaybe<Jsonb_Comparison_Exp>;
  use_recordings_in_stress_testing?: InputMaybe<Boolean_Comparison_Exp>;
  user_settings?: InputMaybe<User_Settings_Bool_Exp>;
  user_tos?: InputMaybe<User_Tos_Bool_Exp>;
  workspaces?: InputMaybe<Workspaces_Bool_Exp>;
  workspaces_subscriptions?: InputMaybe<Workspaces_Subscription_Bool_Exp>;
  workspaces_users?: InputMaybe<Workspaces_User_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersAuthIdKey = 'users_auth_id_key',
  /** unique or primary key constraint */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Users_Delete_At_Path_Input = {
  nags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  preferences?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  unsubscribed_email_types?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Users_Delete_Elem_Input = {
  nags?: InputMaybe<Scalars['Int']['input']>;
  preferences?: InputMaybe<Scalars['Int']['input']>;
  unsubscribed_email_types?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Users_Delete_Key_Input = {
  nags?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<Scalars['String']['input']>;
  unsubscribed_email_types?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing integer column in table "users" */
export type Users_Inc_Input = {
  priority?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  api_keys?: InputMaybe<Api_Keys_Arr_Rel_Insert_Input>;
  auth_id?: InputMaybe<Scalars['String']['input']>;
  collaborators?: InputMaybe<Collaborators_Arr_Rel_Insert_Input>;
  comments?: InputMaybe<Comments_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  default_workspace_id?: InputMaybe<Scalars['uuid']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  internal?: InputMaybe<Scalars['Boolean']['input']>;
  invitations?: InputMaybe<Invitations_Arr_Rel_Insert_Input>;
  invited?: InputMaybe<Scalars['Boolean']['input']>;
  nags?: InputMaybe<Scalars['jsonb']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<Scalars['jsonb']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  recordings?: InputMaybe<Recordings_Arr_Rel_Insert_Input>;
  sessions?: InputMaybe<Sessions_Arr_Rel_Insert_Input>;
  test?: InputMaybe<Scalars['Boolean']['input']>;
  unsubscribed_email_types?: InputMaybe<Scalars['jsonb']['input']>;
  use_recordings_in_stress_testing?: InputMaybe<Scalars['Boolean']['input']>;
  user_settings?: InputMaybe<User_Settings_Obj_Rel_Insert_Input>;
  user_tos?: InputMaybe<User_Tos_Arr_Rel_Insert_Input>;
  workspaces?: InputMaybe<Workspaces_Arr_Rel_Insert_Input>;
  workspaces_subscriptions?: InputMaybe<Workspaces_Subscription_Arr_Rel_Insert_Input>;
  workspaces_users?: InputMaybe<Workspaces_User_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  auth_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  default_workspace_id?: Maybe<Scalars['uuid']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  auth_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  default_workspace_id?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  auth_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  default_workspace_id?: Maybe<Scalars['uuid']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  auth_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  default_workspace_id?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  activity?: InputMaybe<Users_Activity_Order_By>;
  api_keys_aggregate?: InputMaybe<Api_Keys_Aggregate_Order_By>;
  auth_id?: InputMaybe<Order_By>;
  collaborators_aggregate?: InputMaybe<Collaborators_Aggregate_Order_By>;
  comments_aggregate?: InputMaybe<Comments_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  default_workspace_id?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  internal?: InputMaybe<Order_By>;
  invitations_aggregate?: InputMaybe<Invitations_Aggregate_Order_By>;
  invited?: InputMaybe<Order_By>;
  nags?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
  preferences?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
  recordings_aggregate?: InputMaybe<Recordings_Aggregate_Order_By>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Order_By>;
  test?: InputMaybe<Order_By>;
  unsubscribed_email_types?: InputMaybe<Order_By>;
  use_recordings_in_stress_testing?: InputMaybe<Order_By>;
  user_settings?: InputMaybe<User_Settings_Order_By>;
  user_tos_aggregate?: InputMaybe<User_Tos_Aggregate_Order_By>;
  workspaces_aggregate?: InputMaybe<Workspaces_Aggregate_Order_By>;
  workspaces_subscriptions_aggregate?: InputMaybe<Workspaces_Subscription_Aggregate_Order_By>;
  workspaces_users_aggregate?: InputMaybe<Workspaces_User_Aggregate_Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Users_Prepend_Input = {
  nags?: InputMaybe<Scalars['jsonb']['input']>;
  preferences?: InputMaybe<Scalars['jsonb']['input']>;
  unsubscribed_email_types?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  AuthId = 'auth_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DefaultWorkspaceId = 'default_workspace_id',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Internal = 'internal',
  /** column name */
  Invited = 'invited',
  /** column name */
  Nags = 'nags',
  /** column name */
  Name = 'name',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Picture = 'picture',
  /** column name */
  Preferences = 'preferences',
  /** column name */
  Priority = 'priority',
  /** column name */
  Test = 'test',
  /** column name */
  UnsubscribedEmailTypes = 'unsubscribed_email_types',
  /** column name */
  UseRecordingsInStressTesting = 'use_recordings_in_stress_testing'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  auth_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  default_workspace_id?: InputMaybe<Scalars['uuid']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  internal?: InputMaybe<Scalars['Boolean']['input']>;
  invited?: InputMaybe<Scalars['Boolean']['input']>;
  nags?: InputMaybe<Scalars['jsonb']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<Scalars['jsonb']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  test?: InputMaybe<Scalars['Boolean']['input']>;
  unsubscribed_email_types?: InputMaybe<Scalars['jsonb']['input']>;
  use_recordings_in_stress_testing?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields';
  priority?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "users" */
export type Users_Stddev_Order_By = {
  priority?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields';
  priority?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "users" */
export type Users_Stddev_Pop_Order_By = {
  priority?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields';
  priority?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "users" */
export type Users_Stddev_Samp_Order_By = {
  priority?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields';
  priority?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "users" */
export type Users_Sum_Order_By = {
  priority?: InputMaybe<Order_By>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  AuthId = 'auth_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DefaultWorkspaceId = 'default_workspace_id',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Internal = 'internal',
  /** column name */
  Invited = 'invited',
  /** column name */
  Nags = 'nags',
  /** column name */
  Name = 'name',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Picture = 'picture',
  /** column name */
  Preferences = 'preferences',
  /** column name */
  Priority = 'priority',
  /** column name */
  Test = 'test',
  /** column name */
  UnsubscribedEmailTypes = 'unsubscribed_email_types',
  /** column name */
  UseRecordingsInStressTesting = 'use_recordings_in_stress_testing'
}

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields';
  priority?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "users" */
export type Users_Var_Pop_Order_By = {
  priority?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields';
  priority?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "users" */
export type Users_Var_Samp_Order_By = {
  priority?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields';
  priority?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "users" */
export type Users_Variance_Order_By = {
  priority?: InputMaybe<Order_By>;
};

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

/** columns and relationships of "workspace_sourcemaps" */
export type Workspace_Sourcemaps = {
  __typename?: 'workspace_sourcemaps';
  content_hash: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  filename: Scalars['String']['output'];
  group: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  workspace: Workspaces;
  workspace_id: Scalars['uuid']['output'];
};

/** aggregated selection of "workspace_sourcemaps" */
export type Workspace_Sourcemaps_Aggregate = {
  __typename?: 'workspace_sourcemaps_aggregate';
  aggregate?: Maybe<Workspace_Sourcemaps_Aggregate_Fields>;
  nodes: Array<Workspace_Sourcemaps>;
};

/** aggregate fields of "workspace_sourcemaps" */
export type Workspace_Sourcemaps_Aggregate_Fields = {
  __typename?: 'workspace_sourcemaps_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Workspace_Sourcemaps_Max_Fields>;
  min?: Maybe<Workspace_Sourcemaps_Min_Fields>;
};


/** aggregate fields of "workspace_sourcemaps" */
export type Workspace_Sourcemaps_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Workspace_Sourcemaps_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "workspace_sourcemaps" */
export type Workspace_Sourcemaps_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Workspace_Sourcemaps_Max_Order_By>;
  min?: InputMaybe<Workspace_Sourcemaps_Min_Order_By>;
};

/** input type for inserting array relation for remote table "workspace_sourcemaps" */
export type Workspace_Sourcemaps_Arr_Rel_Insert_Input = {
  data: Array<Workspace_Sourcemaps_Insert_Input>;
  on_conflict?: InputMaybe<Workspace_Sourcemaps_On_Conflict>;
};

/** Boolean expression to filter rows from the table "workspace_sourcemaps". All fields are combined with a logical 'AND'. */
export type Workspace_Sourcemaps_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Workspace_Sourcemaps_Bool_Exp>>>;
  _not?: InputMaybe<Workspace_Sourcemaps_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Workspace_Sourcemaps_Bool_Exp>>>;
  content_hash?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  filename?: InputMaybe<String_Comparison_Exp>;
  group?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  workspace?: InputMaybe<Workspaces_Bool_Exp>;
  workspace_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "workspace_sourcemaps" */
export enum Workspace_Sourcemaps_Constraint {
  /** unique or primary key constraint */
  WorkspaceSourcemapsPkey = 'workspace_sourcemaps_pkey'
}

/** input type for inserting data into table "workspace_sourcemaps" */
export type Workspace_Sourcemaps_Insert_Input = {
  content_hash?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  group?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  workspace?: InputMaybe<Workspaces_Obj_Rel_Insert_Input>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Workspace_Sourcemaps_Max_Fields = {
  __typename?: 'workspace_sourcemaps_max_fields';
  content_hash?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  group?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "workspace_sourcemaps" */
export type Workspace_Sourcemaps_Max_Order_By = {
  content_hash?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  group?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Workspace_Sourcemaps_Min_Fields = {
  __typename?: 'workspace_sourcemaps_min_fields';
  content_hash?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  group?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "workspace_sourcemaps" */
export type Workspace_Sourcemaps_Min_Order_By = {
  content_hash?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  group?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "workspace_sourcemaps" */
export type Workspace_Sourcemaps_Mutation_Response = {
  __typename?: 'workspace_sourcemaps_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Workspace_Sourcemaps>;
};

/** input type for inserting object relation for remote table "workspace_sourcemaps" */
export type Workspace_Sourcemaps_Obj_Rel_Insert_Input = {
  data: Workspace_Sourcemaps_Insert_Input;
  on_conflict?: InputMaybe<Workspace_Sourcemaps_On_Conflict>;
};

/** on conflict condition type for table "workspace_sourcemaps" */
export type Workspace_Sourcemaps_On_Conflict = {
  constraint: Workspace_Sourcemaps_Constraint;
  update_columns: Array<Workspace_Sourcemaps_Update_Column>;
  where?: InputMaybe<Workspace_Sourcemaps_Bool_Exp>;
};

/** ordering options when selecting data from "workspace_sourcemaps" */
export type Workspace_Sourcemaps_Order_By = {
  content_hash?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  group?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  workspace?: InputMaybe<Workspaces_Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "workspace_sourcemaps" */
export type Workspace_Sourcemaps_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "workspace_sourcemaps" */
export enum Workspace_Sourcemaps_Select_Column {
  /** column name */
  ContentHash = 'content_hash',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Filename = 'filename',
  /** column name */
  Group = 'group',
  /** column name */
  Id = 'id',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** input type for updating data in table "workspace_sourcemaps" */
export type Workspace_Sourcemaps_Set_Input = {
  content_hash?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  group?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "workspace_sourcemaps" */
export enum Workspace_Sourcemaps_Update_Column {
  /** column name */
  ContentHash = 'content_hash',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Filename = 'filename',
  /** column name */
  Group = 'group',
  /** column name */
  Id = 'id',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** columns and relationships of "workspace_tests" */
export type Workspace_Tests = {
  __typename?: 'workspace_tests';
  created_at: Scalars['timestamptz']['output'];
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  scope: Scalars['jsonb']['output'];
  source_path: Scalars['String']['output'];
  test_id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  workspace_id: Scalars['uuid']['output'];
};


/** columns and relationships of "workspace_tests" */
export type Workspace_TestsScopeArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "workspace_tests" */
export type Workspace_Tests_Aggregate = {
  __typename?: 'workspace_tests_aggregate';
  aggregate?: Maybe<Workspace_Tests_Aggregate_Fields>;
  nodes: Array<Workspace_Tests>;
};

/** aggregate fields of "workspace_tests" */
export type Workspace_Tests_Aggregate_Fields = {
  __typename?: 'workspace_tests_aggregate_fields';
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Workspace_Tests_Max_Fields>;
  min?: Maybe<Workspace_Tests_Min_Fields>;
};


/** aggregate fields of "workspace_tests" */
export type Workspace_Tests_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Workspace_Tests_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "workspace_tests" */
export type Workspace_Tests_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Workspace_Tests_Max_Order_By>;
  min?: InputMaybe<Workspace_Tests_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Workspace_Tests_Append_Input = {
  scope?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "workspace_tests" */
export type Workspace_Tests_Arr_Rel_Insert_Input = {
  data: Array<Workspace_Tests_Insert_Input>;
  on_conflict?: InputMaybe<Workspace_Tests_On_Conflict>;
};

/** Boolean expression to filter rows from the table "workspace_tests". All fields are combined with a logical 'AND'. */
export type Workspace_Tests_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Workspace_Tests_Bool_Exp>>>;
  _not?: InputMaybe<Workspace_Tests_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Workspace_Tests_Bool_Exp>>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  scope?: InputMaybe<Jsonb_Comparison_Exp>;
  source_path?: InputMaybe<String_Comparison_Exp>;
  test_id?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  workspace_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "workspace_tests" */
export enum Workspace_Tests_Constraint {
  /** unique or primary key constraint */
  WorkspaceTestsPkey = 'workspace_tests_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Workspace_Tests_Delete_At_Path_Input = {
  scope?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Workspace_Tests_Delete_Elem_Input = {
  scope?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Workspace_Tests_Delete_Key_Input = {
  scope?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "workspace_tests" */
export type Workspace_Tests_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  scope?: InputMaybe<Scalars['jsonb']['input']>;
  source_path?: InputMaybe<Scalars['String']['input']>;
  test_id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Workspace_Tests_Max_Fields = {
  __typename?: 'workspace_tests_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  source_path?: Maybe<Scalars['String']['output']>;
  test_id?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "workspace_tests" */
export type Workspace_Tests_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  source_path?: InputMaybe<Order_By>;
  test_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Workspace_Tests_Min_Fields = {
  __typename?: 'workspace_tests_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  source_path?: Maybe<Scalars['String']['output']>;
  test_id?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "workspace_tests" */
export type Workspace_Tests_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  source_path?: InputMaybe<Order_By>;
  test_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "workspace_tests" */
export type Workspace_Tests_Mutation_Response = {
  __typename?: 'workspace_tests_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Workspace_Tests>;
};

/** input type for inserting object relation for remote table "workspace_tests" */
export type Workspace_Tests_Obj_Rel_Insert_Input = {
  data: Workspace_Tests_Insert_Input;
  on_conflict?: InputMaybe<Workspace_Tests_On_Conflict>;
};

/** on conflict condition type for table "workspace_tests" */
export type Workspace_Tests_On_Conflict = {
  constraint: Workspace_Tests_Constraint;
  update_columns: Array<Workspace_Tests_Update_Column>;
  where?: InputMaybe<Workspace_Tests_Bool_Exp>;
};

/** ordering options when selecting data from "workspace_tests" */
export type Workspace_Tests_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  source_path?: InputMaybe<Order_By>;
  test_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "workspace_tests" */
export type Workspace_Tests_Pk_Columns_Input = {
  test_id: Scalars['String']['input'];
  workspace_id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Workspace_Tests_Prepend_Input = {
  scope?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "workspace_tests" */
export enum Workspace_Tests_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Scope = 'scope',
  /** column name */
  SourcePath = 'source_path',
  /** column name */
  TestId = 'test_id',
  /** column name */
  Title = 'title',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** input type for updating data in table "workspace_tests" */
export type Workspace_Tests_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  scope?: InputMaybe<Scalars['jsonb']['input']>;
  source_path?: InputMaybe<Scalars['String']['input']>;
  test_id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "workspace_tests" */
export enum Workspace_Tests_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Scope = 'scope',
  /** column name */
  SourcePath = 'source_path',
  /** column name */
  TestId = 'test_id',
  /** column name */
  Title = 'title',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** columns and relationships of "workspaces" */
export type Workspaces = {
  __typename?: 'workspaces';
  /** An array relationship */
  api_keys: Array<Api_Keys>;
  /** An aggregated array relationship */
  api_keys_aggregate: Api_Keys_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  deleted_at?: Maybe<Scalars['String']['output']>;
  domain: Scalars['String']['output'];
  features: Scalars['jsonb']['output'];
  id: Scalars['uuid']['output'];
  invitation_code: Scalars['uuid']['output'];
  is_domain_limited_code: Scalars['Boolean']['output'];
  is_organization: Scalars['Boolean']['output'];
  is_test: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  organization?: Maybe<Organizations>;
  organization_id?: Maybe<Scalars['uuid']['output']>;
  primary?: Maybe<Scalars['Boolean']['output']>;
  /** An array relationship */
  recordings: Array<Recordings>;
  /** An aggregated array relationship */
  recordings_aggregate: Recordings_Aggregate;
  retention_limit?: Maybe<Scalars['interval']['output']>;
  retention_limit_days?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  test_runs: Array<Test_Runs>;
  /** An aggregated array relationship */
  test_runs_aggregate: Test_Runs_Aggregate;
  /** An array relationship */
  test_runs_news: Array<Test_Runs_New>;
  /** An aggregated array relationship */
  test_runs_news_aggregate: Test_Runs_New_Aggregate;
  use_recordings_in_stress_testing_sampled?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
  /** An array relationship */
  workspace_sourcemaps: Array<Workspace_Sourcemaps>;
  /** An aggregated array relationship */
  workspace_sourcemaps_aggregate: Workspace_Sourcemaps_Aggregate;
  /** An array relationship */
  workspaces_users: Array<Workspaces_User>;
  /** An aggregated array relationship */
  workspaces_users_aggregate: Workspaces_User_Aggregate;
};


/** columns and relationships of "workspaces" */
export type WorkspacesApi_KeysArgs = {
  distinct_on?: InputMaybe<Array<Api_Keys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Api_Keys_Order_By>>;
  where?: InputMaybe<Api_Keys_Bool_Exp>;
};


/** columns and relationships of "workspaces" */
export type WorkspacesApi_Keys_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Api_Keys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Api_Keys_Order_By>>;
  where?: InputMaybe<Api_Keys_Bool_Exp>;
};


/** columns and relationships of "workspaces" */
export type WorkspacesFeaturesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "workspaces" */
export type WorkspacesRecordingsArgs = {
  distinct_on?: InputMaybe<Array<Recordings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recordings_Order_By>>;
  where?: InputMaybe<Recordings_Bool_Exp>;
};


/** columns and relationships of "workspaces" */
export type WorkspacesRecordings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recordings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recordings_Order_By>>;
  where?: InputMaybe<Recordings_Bool_Exp>;
};


/** columns and relationships of "workspaces" */
export type WorkspacesTest_RunsArgs = {
  distinct_on?: InputMaybe<Array<Test_Runs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Runs_Order_By>>;
  where?: InputMaybe<Test_Runs_Bool_Exp>;
};


/** columns and relationships of "workspaces" */
export type WorkspacesTest_Runs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Runs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Runs_Order_By>>;
  where?: InputMaybe<Test_Runs_Bool_Exp>;
};


/** columns and relationships of "workspaces" */
export type WorkspacesTest_Runs_NewsArgs = {
  distinct_on?: InputMaybe<Array<Test_Runs_New_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Runs_New_Order_By>>;
  where?: InputMaybe<Test_Runs_New_Bool_Exp>;
};


/** columns and relationships of "workspaces" */
export type WorkspacesTest_Runs_News_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Test_Runs_New_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Test_Runs_New_Order_By>>;
  where?: InputMaybe<Test_Runs_New_Bool_Exp>;
};


/** columns and relationships of "workspaces" */
export type WorkspacesWorkspace_SourcemapsArgs = {
  distinct_on?: InputMaybe<Array<Workspace_Sourcemaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspace_Sourcemaps_Order_By>>;
  where?: InputMaybe<Workspace_Sourcemaps_Bool_Exp>;
};


/** columns and relationships of "workspaces" */
export type WorkspacesWorkspace_Sourcemaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspace_Sourcemaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspace_Sourcemaps_Order_By>>;
  where?: InputMaybe<Workspace_Sourcemaps_Bool_Exp>;
};


/** columns and relationships of "workspaces" */
export type WorkspacesWorkspaces_UsersArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_User_Order_By>>;
  where?: InputMaybe<Workspaces_User_Bool_Exp>;
};


/** columns and relationships of "workspaces" */
export type WorkspacesWorkspaces_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspaces_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspaces_User_Order_By>>;
  where?: InputMaybe<Workspaces_User_Bool_Exp>;
};

/** aggregated selection of "workspaces" */
export type Workspaces_Aggregate = {
  __typename?: 'workspaces_aggregate';
  aggregate?: Maybe<Workspaces_Aggregate_Fields>;
  nodes: Array<Workspaces>;
};

/** aggregate fields of "workspaces" */
export type Workspaces_Aggregate_Fields = {
  __typename?: 'workspaces_aggregate_fields';
  avg?: Maybe<Workspaces_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Workspaces_Max_Fields>;
  min?: Maybe<Workspaces_Min_Fields>;
  stddev?: Maybe<Workspaces_Stddev_Fields>;
  stddev_pop?: Maybe<Workspaces_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Workspaces_Stddev_Samp_Fields>;
  sum?: Maybe<Workspaces_Sum_Fields>;
  var_pop?: Maybe<Workspaces_Var_Pop_Fields>;
  var_samp?: Maybe<Workspaces_Var_Samp_Fields>;
  variance?: Maybe<Workspaces_Variance_Fields>;
};


/** aggregate fields of "workspaces" */
export type Workspaces_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Workspaces_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "workspaces" */
export type Workspaces_Aggregate_Order_By = {
  avg?: InputMaybe<Workspaces_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Workspaces_Max_Order_By>;
  min?: InputMaybe<Workspaces_Min_Order_By>;
  stddev?: InputMaybe<Workspaces_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Workspaces_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Workspaces_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Workspaces_Sum_Order_By>;
  var_pop?: InputMaybe<Workspaces_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Workspaces_Var_Samp_Order_By>;
  variance?: InputMaybe<Workspaces_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Workspaces_Append_Input = {
  features?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "workspaces" */
export type Workspaces_Arr_Rel_Insert_Input = {
  data: Array<Workspaces_Insert_Input>;
  on_conflict?: InputMaybe<Workspaces_On_Conflict>;
};

/** aggregate avg on columns */
export type Workspaces_Avg_Fields = {
  __typename?: 'workspaces_avg_fields';
  retention_limit_days?: Maybe<Scalars['Float']['output']>;
  use_recordings_in_stress_testing_sampled?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "workspaces" */
export type Workspaces_Avg_Order_By = {
  retention_limit_days?: InputMaybe<Order_By>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "workspaces". All fields are combined with a logical 'AND'. */
export type Workspaces_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Workspaces_Bool_Exp>>>;
  _not?: InputMaybe<Workspaces_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Workspaces_Bool_Exp>>>;
  api_keys?: InputMaybe<Api_Keys_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<String_Comparison_Exp>;
  domain?: InputMaybe<String_Comparison_Exp>;
  features?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitation_code?: InputMaybe<Uuid_Comparison_Exp>;
  is_domain_limited_code?: InputMaybe<Boolean_Comparison_Exp>;
  is_organization?: InputMaybe<Boolean_Comparison_Exp>;
  is_test?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  organization_id?: InputMaybe<Uuid_Comparison_Exp>;
  primary?: InputMaybe<Boolean_Comparison_Exp>;
  recordings?: InputMaybe<Recordings_Bool_Exp>;
  retention_limit?: InputMaybe<Interval_Comparison_Exp>;
  retention_limit_days?: InputMaybe<Int_Comparison_Exp>;
  test_runs?: InputMaybe<Test_Runs_Bool_Exp>;
  test_runs_news?: InputMaybe<Test_Runs_New_Bool_Exp>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Int_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  workspace_sourcemaps?: InputMaybe<Workspace_Sourcemaps_Bool_Exp>;
  workspaces_users?: InputMaybe<Workspaces_User_Bool_Exp>;
};

/** unique or primary key constraints on table "workspaces" */
export enum Workspaces_Constraint {
  /** unique or primary key constraint */
  WorkspacesInvitationCodeKey = 'workspaces_invitation_code_key',
  /** unique or primary key constraint */
  WorkspacesPkey = 'workspaces_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Workspaces_Delete_At_Path_Input = {
  features?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Workspaces_Delete_Elem_Input = {
  features?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Workspaces_Delete_Key_Input = {
  features?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing integer column in table "workspaces" */
export type Workspaces_Inc_Input = {
  retention_limit_days?: InputMaybe<Scalars['Int']['input']>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "workspaces" */
export type Workspaces_Insert_Input = {
  api_keys?: InputMaybe<Api_Keys_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['String']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_code?: InputMaybe<Scalars['uuid']['input']>;
  is_domain_limited_code?: InputMaybe<Scalars['Boolean']['input']>;
  is_organization?: InputMaybe<Scalars['Boolean']['input']>;
  is_test?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>;
  organization_id?: InputMaybe<Scalars['uuid']['input']>;
  primary?: InputMaybe<Scalars['Boolean']['input']>;
  recordings?: InputMaybe<Recordings_Arr_Rel_Insert_Input>;
  retention_limit?: InputMaybe<Scalars['interval']['input']>;
  retention_limit_days?: InputMaybe<Scalars['Int']['input']>;
  test_runs?: InputMaybe<Test_Runs_Arr_Rel_Insert_Input>;
  test_runs_news?: InputMaybe<Test_Runs_New_Arr_Rel_Insert_Input>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Scalars['Int']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workspace_sourcemaps?: InputMaybe<Workspace_Sourcemaps_Arr_Rel_Insert_Input>;
  workspaces_users?: InputMaybe<Workspaces_User_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Workspaces_Max_Fields = {
  __typename?: 'workspaces_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['String']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_code?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  organization_id?: Maybe<Scalars['uuid']['output']>;
  retention_limit_days?: Maybe<Scalars['Int']['output']>;
  use_recordings_in_stress_testing_sampled?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "workspaces" */
export type Workspaces_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  domain?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_code?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  retention_limit_days?: InputMaybe<Order_By>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Workspaces_Min_Fields = {
  __typename?: 'workspaces_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['String']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_code?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  organization_id?: Maybe<Scalars['uuid']['output']>;
  retention_limit_days?: Maybe<Scalars['Int']['output']>;
  use_recordings_in_stress_testing_sampled?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "workspaces" */
export type Workspaces_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  domain?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_code?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  retention_limit_days?: InputMaybe<Order_By>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "workspaces" */
export type Workspaces_Mutation_Response = {
  __typename?: 'workspaces_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Workspaces>;
};

/** input type for inserting object relation for remote table "workspaces" */
export type Workspaces_Obj_Rel_Insert_Input = {
  data: Workspaces_Insert_Input;
  on_conflict?: InputMaybe<Workspaces_On_Conflict>;
};

/** on conflict condition type for table "workspaces" */
export type Workspaces_On_Conflict = {
  constraint: Workspaces_Constraint;
  update_columns: Array<Workspaces_Update_Column>;
  where?: InputMaybe<Workspaces_Bool_Exp>;
};

/** ordering options when selecting data from "workspaces" */
export type Workspaces_Order_By = {
  api_keys_aggregate?: InputMaybe<Api_Keys_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  domain?: InputMaybe<Order_By>;
  features?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_code?: InputMaybe<Order_By>;
  is_domain_limited_code?: InputMaybe<Order_By>;
  is_organization?: InputMaybe<Order_By>;
  is_test?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  organization_id?: InputMaybe<Order_By>;
  primary?: InputMaybe<Order_By>;
  recordings_aggregate?: InputMaybe<Recordings_Aggregate_Order_By>;
  retention_limit?: InputMaybe<Order_By>;
  retention_limit_days?: InputMaybe<Order_By>;
  test_runs_aggregate?: InputMaybe<Test_Runs_Aggregate_Order_By>;
  test_runs_news_aggregate?: InputMaybe<Test_Runs_New_Aggregate_Order_By>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  workspace_sourcemaps_aggregate?: InputMaybe<Workspace_Sourcemaps_Aggregate_Order_By>;
  workspaces_users_aggregate?: InputMaybe<Workspaces_User_Aggregate_Order_By>;
};

/** primary key columns input for table: "workspaces" */
export type Workspaces_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Workspaces_Prepend_Input = {
  features?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "workspaces" */
export enum Workspaces_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Domain = 'domain',
  /** column name */
  Features = 'features',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationCode = 'invitation_code',
  /** column name */
  IsDomainLimitedCode = 'is_domain_limited_code',
  /** column name */
  IsOrganization = 'is_organization',
  /** column name */
  IsTest = 'is_test',
  /** column name */
  Name = 'name',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  Primary = 'primary',
  /** column name */
  RetentionLimit = 'retention_limit',
  /** column name */
  RetentionLimitDays = 'retention_limit_days',
  /** column name */
  UseRecordingsInStressTestingSampled = 'use_recordings_in_stress_testing_sampled',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "workspaces" */
export type Workspaces_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['String']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_code?: InputMaybe<Scalars['uuid']['input']>;
  is_domain_limited_code?: InputMaybe<Scalars['Boolean']['input']>;
  is_organization?: InputMaybe<Scalars['Boolean']['input']>;
  is_test?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organization_id?: InputMaybe<Scalars['uuid']['input']>;
  primary?: InputMaybe<Scalars['Boolean']['input']>;
  retention_limit?: InputMaybe<Scalars['interval']['input']>;
  retention_limit_days?: InputMaybe<Scalars['Int']['input']>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Workspaces_Stddev_Fields = {
  __typename?: 'workspaces_stddev_fields';
  retention_limit_days?: Maybe<Scalars['Float']['output']>;
  use_recordings_in_stress_testing_sampled?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "workspaces" */
export type Workspaces_Stddev_Order_By = {
  retention_limit_days?: InputMaybe<Order_By>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Workspaces_Stddev_Pop_Fields = {
  __typename?: 'workspaces_stddev_pop_fields';
  retention_limit_days?: Maybe<Scalars['Float']['output']>;
  use_recordings_in_stress_testing_sampled?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "workspaces" */
export type Workspaces_Stddev_Pop_Order_By = {
  retention_limit_days?: InputMaybe<Order_By>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Workspaces_Stddev_Samp_Fields = {
  __typename?: 'workspaces_stddev_samp_fields';
  retention_limit_days?: Maybe<Scalars['Float']['output']>;
  use_recordings_in_stress_testing_sampled?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "workspaces" */
export type Workspaces_Stddev_Samp_Order_By = {
  retention_limit_days?: InputMaybe<Order_By>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Order_By>;
};

/** columns and relationships of "workspaces_subscription" */
export type Workspaces_Subscription = {
  __typename?: 'workspaces_subscription';
  available_seat_count?: Maybe<Scalars['Int']['output']>;
  billing_id: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  created_by?: Maybe<Scalars['uuid']['output']>;
  effective_from?: Maybe<Scalars['timestamptz']['output']>;
  effective_until?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  organization?: Maybe<Organizations>;
  organization_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  plan: Plans;
  plan_id: Scalars['uuid']['output'];
  seat_count: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  trial_ends?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user?: Maybe<Users>;
};

/** aggregated selection of "workspaces_subscription" */
export type Workspaces_Subscription_Aggregate = {
  __typename?: 'workspaces_subscription_aggregate';
  aggregate?: Maybe<Workspaces_Subscription_Aggregate_Fields>;
  nodes: Array<Workspaces_Subscription>;
};

/** aggregate fields of "workspaces_subscription" */
export type Workspaces_Subscription_Aggregate_Fields = {
  __typename?: 'workspaces_subscription_aggregate_fields';
  avg?: Maybe<Workspaces_Subscription_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Workspaces_Subscription_Max_Fields>;
  min?: Maybe<Workspaces_Subscription_Min_Fields>;
  stddev?: Maybe<Workspaces_Subscription_Stddev_Fields>;
  stddev_pop?: Maybe<Workspaces_Subscription_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Workspaces_Subscription_Stddev_Samp_Fields>;
  sum?: Maybe<Workspaces_Subscription_Sum_Fields>;
  var_pop?: Maybe<Workspaces_Subscription_Var_Pop_Fields>;
  var_samp?: Maybe<Workspaces_Subscription_Var_Samp_Fields>;
  variance?: Maybe<Workspaces_Subscription_Variance_Fields>;
};


/** aggregate fields of "workspaces_subscription" */
export type Workspaces_Subscription_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Workspaces_Subscription_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "workspaces_subscription" */
export type Workspaces_Subscription_Aggregate_Order_By = {
  avg?: InputMaybe<Workspaces_Subscription_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Workspaces_Subscription_Max_Order_By>;
  min?: InputMaybe<Workspaces_Subscription_Min_Order_By>;
  stddev?: InputMaybe<Workspaces_Subscription_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Workspaces_Subscription_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Workspaces_Subscription_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Workspaces_Subscription_Sum_Order_By>;
  var_pop?: InputMaybe<Workspaces_Subscription_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Workspaces_Subscription_Var_Samp_Order_By>;
  variance?: InputMaybe<Workspaces_Subscription_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "workspaces_subscription" */
export type Workspaces_Subscription_Arr_Rel_Insert_Input = {
  data: Array<Workspaces_Subscription_Insert_Input>;
  on_conflict?: InputMaybe<Workspaces_Subscription_On_Conflict>;
};

/** aggregate avg on columns */
export type Workspaces_Subscription_Avg_Fields = {
  __typename?: 'workspaces_subscription_avg_fields';
  available_seat_count?: Maybe<Scalars['Float']['output']>;
  seat_count?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "workspaces_subscription" */
export type Workspaces_Subscription_Avg_Order_By = {
  available_seat_count?: InputMaybe<Order_By>;
  seat_count?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "workspaces_subscription". All fields are combined with a logical 'AND'. */
export type Workspaces_Subscription_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Workspaces_Subscription_Bool_Exp>>>;
  _not?: InputMaybe<Workspaces_Subscription_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Workspaces_Subscription_Bool_Exp>>>;
  available_seat_count?: InputMaybe<Int_Comparison_Exp>;
  billing_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_by?: InputMaybe<Uuid_Comparison_Exp>;
  effective_from?: InputMaybe<Timestamptz_Comparison_Exp>;
  effective_until?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  organization_id?: InputMaybe<Uuid_Comparison_Exp>;
  plan?: InputMaybe<Plans_Bool_Exp>;
  plan_id?: InputMaybe<Uuid_Comparison_Exp>;
  seat_count?: InputMaybe<Int_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  trial_ends?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "workspaces_subscription" */
export enum Workspaces_Subscription_Constraint {
  /** unique or primary key constraint */
  WorkspacesSubscriptionPkey = 'workspaces_subscription_pkey'
}

/** input type for incrementing integer column in table "workspaces_subscription" */
export type Workspaces_Subscription_Inc_Input = {
  available_seat_count?: InputMaybe<Scalars['Int']['input']>;
  seat_count?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "workspaces_subscription" */
export type Workspaces_Subscription_Insert_Input = {
  available_seat_count?: InputMaybe<Scalars['Int']['input']>;
  billing_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_by?: InputMaybe<Scalars['uuid']['input']>;
  effective_from?: InputMaybe<Scalars['timestamptz']['input']>;
  effective_until?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>;
  organization_id?: InputMaybe<Scalars['uuid']['input']>;
  plan?: InputMaybe<Plans_Obj_Rel_Insert_Input>;
  plan_id?: InputMaybe<Scalars['uuid']['input']>;
  seat_count?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  trial_ends?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Workspaces_Subscription_Max_Fields = {
  __typename?: 'workspaces_subscription_max_fields';
  available_seat_count?: Maybe<Scalars['Int']['output']>;
  billing_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  created_by?: Maybe<Scalars['uuid']['output']>;
  effective_from?: Maybe<Scalars['timestamptz']['output']>;
  effective_until?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  organization_id?: Maybe<Scalars['uuid']['output']>;
  plan_id?: Maybe<Scalars['uuid']['output']>;
  seat_count?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  trial_ends?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "workspaces_subscription" */
export type Workspaces_Subscription_Max_Order_By = {
  available_seat_count?: InputMaybe<Order_By>;
  billing_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by?: InputMaybe<Order_By>;
  effective_from?: InputMaybe<Order_By>;
  effective_until?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
  seat_count?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  trial_ends?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Workspaces_Subscription_Min_Fields = {
  __typename?: 'workspaces_subscription_min_fields';
  available_seat_count?: Maybe<Scalars['Int']['output']>;
  billing_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  created_by?: Maybe<Scalars['uuid']['output']>;
  effective_from?: Maybe<Scalars['timestamptz']['output']>;
  effective_until?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  organization_id?: Maybe<Scalars['uuid']['output']>;
  plan_id?: Maybe<Scalars['uuid']['output']>;
  seat_count?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  trial_ends?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "workspaces_subscription" */
export type Workspaces_Subscription_Min_Order_By = {
  available_seat_count?: InputMaybe<Order_By>;
  billing_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by?: InputMaybe<Order_By>;
  effective_from?: InputMaybe<Order_By>;
  effective_until?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
  seat_count?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  trial_ends?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "workspaces_subscription" */
export type Workspaces_Subscription_Mutation_Response = {
  __typename?: 'workspaces_subscription_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Workspaces_Subscription>;
};

/** input type for inserting object relation for remote table "workspaces_subscription" */
export type Workspaces_Subscription_Obj_Rel_Insert_Input = {
  data: Workspaces_Subscription_Insert_Input;
  on_conflict?: InputMaybe<Workspaces_Subscription_On_Conflict>;
};

/** on conflict condition type for table "workspaces_subscription" */
export type Workspaces_Subscription_On_Conflict = {
  constraint: Workspaces_Subscription_Constraint;
  update_columns: Array<Workspaces_Subscription_Update_Column>;
  where?: InputMaybe<Workspaces_Subscription_Bool_Exp>;
};

/** ordering options when selecting data from "workspaces_subscription" */
export type Workspaces_Subscription_Order_By = {
  available_seat_count?: InputMaybe<Order_By>;
  billing_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by?: InputMaybe<Order_By>;
  effective_from?: InputMaybe<Order_By>;
  effective_until?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  organization_id?: InputMaybe<Order_By>;
  plan?: InputMaybe<Plans_Order_By>;
  plan_id?: InputMaybe<Order_By>;
  seat_count?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  trial_ends?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: "workspaces_subscription" */
export type Workspaces_Subscription_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "workspaces_subscription" */
export enum Workspaces_Subscription_Select_Column {
  /** column name */
  AvailableSeatCount = 'available_seat_count',
  /** column name */
  BillingId = 'billing_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  EffectiveFrom = 'effective_from',
  /** column name */
  EffectiveUntil = 'effective_until',
  /** column name */
  Id = 'id',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  PlanId = 'plan_id',
  /** column name */
  SeatCount = 'seat_count',
  /** column name */
  Status = 'status',
  /** column name */
  TrialEnds = 'trial_ends'
}

/** input type for updating data in table "workspaces_subscription" */
export type Workspaces_Subscription_Set_Input = {
  available_seat_count?: InputMaybe<Scalars['Int']['input']>;
  billing_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_by?: InputMaybe<Scalars['uuid']['input']>;
  effective_from?: InputMaybe<Scalars['timestamptz']['input']>;
  effective_until?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  organization_id?: InputMaybe<Scalars['uuid']['input']>;
  plan_id?: InputMaybe<Scalars['uuid']['input']>;
  seat_count?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  trial_ends?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Workspaces_Subscription_Stddev_Fields = {
  __typename?: 'workspaces_subscription_stddev_fields';
  available_seat_count?: Maybe<Scalars['Float']['output']>;
  seat_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "workspaces_subscription" */
export type Workspaces_Subscription_Stddev_Order_By = {
  available_seat_count?: InputMaybe<Order_By>;
  seat_count?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Workspaces_Subscription_Stddev_Pop_Fields = {
  __typename?: 'workspaces_subscription_stddev_pop_fields';
  available_seat_count?: Maybe<Scalars['Float']['output']>;
  seat_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "workspaces_subscription" */
export type Workspaces_Subscription_Stddev_Pop_Order_By = {
  available_seat_count?: InputMaybe<Order_By>;
  seat_count?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Workspaces_Subscription_Stddev_Samp_Fields = {
  __typename?: 'workspaces_subscription_stddev_samp_fields';
  available_seat_count?: Maybe<Scalars['Float']['output']>;
  seat_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "workspaces_subscription" */
export type Workspaces_Subscription_Stddev_Samp_Order_By = {
  available_seat_count?: InputMaybe<Order_By>;
  seat_count?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Workspaces_Subscription_Sum_Fields = {
  __typename?: 'workspaces_subscription_sum_fields';
  available_seat_count?: Maybe<Scalars['Int']['output']>;
  seat_count?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "workspaces_subscription" */
export type Workspaces_Subscription_Sum_Order_By = {
  available_seat_count?: InputMaybe<Order_By>;
  seat_count?: InputMaybe<Order_By>;
};

/** update columns of table "workspaces_subscription" */
export enum Workspaces_Subscription_Update_Column {
  /** column name */
  AvailableSeatCount = 'available_seat_count',
  /** column name */
  BillingId = 'billing_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  EffectiveFrom = 'effective_from',
  /** column name */
  EffectiveUntil = 'effective_until',
  /** column name */
  Id = 'id',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  PlanId = 'plan_id',
  /** column name */
  SeatCount = 'seat_count',
  /** column name */
  Status = 'status',
  /** column name */
  TrialEnds = 'trial_ends'
}

/** aggregate var_pop on columns */
export type Workspaces_Subscription_Var_Pop_Fields = {
  __typename?: 'workspaces_subscription_var_pop_fields';
  available_seat_count?: Maybe<Scalars['Float']['output']>;
  seat_count?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "workspaces_subscription" */
export type Workspaces_Subscription_Var_Pop_Order_By = {
  available_seat_count?: InputMaybe<Order_By>;
  seat_count?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Workspaces_Subscription_Var_Samp_Fields = {
  __typename?: 'workspaces_subscription_var_samp_fields';
  available_seat_count?: Maybe<Scalars['Float']['output']>;
  seat_count?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "workspaces_subscription" */
export type Workspaces_Subscription_Var_Samp_Order_By = {
  available_seat_count?: InputMaybe<Order_By>;
  seat_count?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Workspaces_Subscription_Variance_Fields = {
  __typename?: 'workspaces_subscription_variance_fields';
  available_seat_count?: Maybe<Scalars['Float']['output']>;
  seat_count?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "workspaces_subscription" */
export type Workspaces_Subscription_Variance_Order_By = {
  available_seat_count?: InputMaybe<Order_By>;
  seat_count?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Workspaces_Sum_Fields = {
  __typename?: 'workspaces_sum_fields';
  retention_limit_days?: Maybe<Scalars['Int']['output']>;
  use_recordings_in_stress_testing_sampled?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "workspaces" */
export type Workspaces_Sum_Order_By = {
  retention_limit_days?: InputMaybe<Order_By>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Order_By>;
};

/** update columns of table "workspaces" */
export enum Workspaces_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Domain = 'domain',
  /** column name */
  Features = 'features',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationCode = 'invitation_code',
  /** column name */
  IsDomainLimitedCode = 'is_domain_limited_code',
  /** column name */
  IsOrganization = 'is_organization',
  /** column name */
  IsTest = 'is_test',
  /** column name */
  Name = 'name',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  Primary = 'primary',
  /** column name */
  RetentionLimit = 'retention_limit',
  /** column name */
  RetentionLimitDays = 'retention_limit_days',
  /** column name */
  UseRecordingsInStressTestingSampled = 'use_recordings_in_stress_testing_sampled',
  /** column name */
  UserId = 'user_id'
}

/**
 * This is a bridge table for workspaces and users. See here: https://hasura.io/docs/latest/graphql/core/guides/data-modelling/many-to-many.html#many-to-many-modelling. TODO: 1) add more restrictive insert permissions (role: user) to handle creating new workspaces, and adding new members to an existing workspace.
 *
 *
 * columns and relationships of "workspaces_user"
 */
export type Workspaces_User = {
  __typename?: 'workspaces_user';
  date_created: Scalars['timestamptz']['output'];
  inviter_user_id?: Maybe<Scalars['uuid']['output']>;
  pending: Scalars['Boolean']['output'];
  roles: Scalars['Int']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
  /** An object relationship */
  workspace: Workspaces;
  workspace_id: Scalars['uuid']['output'];
};

/** aggregated selection of "workspaces_user" */
export type Workspaces_User_Aggregate = {
  __typename?: 'workspaces_user_aggregate';
  aggregate?: Maybe<Workspaces_User_Aggregate_Fields>;
  nodes: Array<Workspaces_User>;
};

/** aggregate fields of "workspaces_user" */
export type Workspaces_User_Aggregate_Fields = {
  __typename?: 'workspaces_user_aggregate_fields';
  avg?: Maybe<Workspaces_User_Avg_Fields>;
  count?: Maybe<Scalars['Int']['output']>;
  max?: Maybe<Workspaces_User_Max_Fields>;
  min?: Maybe<Workspaces_User_Min_Fields>;
  stddev?: Maybe<Workspaces_User_Stddev_Fields>;
  stddev_pop?: Maybe<Workspaces_User_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Workspaces_User_Stddev_Samp_Fields>;
  sum?: Maybe<Workspaces_User_Sum_Fields>;
  var_pop?: Maybe<Workspaces_User_Var_Pop_Fields>;
  var_samp?: Maybe<Workspaces_User_Var_Samp_Fields>;
  variance?: Maybe<Workspaces_User_Variance_Fields>;
};


/** aggregate fields of "workspaces_user" */
export type Workspaces_User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Workspaces_User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "workspaces_user" */
export type Workspaces_User_Aggregate_Order_By = {
  avg?: InputMaybe<Workspaces_User_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Workspaces_User_Max_Order_By>;
  min?: InputMaybe<Workspaces_User_Min_Order_By>;
  stddev?: InputMaybe<Workspaces_User_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Workspaces_User_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Workspaces_User_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Workspaces_User_Sum_Order_By>;
  var_pop?: InputMaybe<Workspaces_User_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Workspaces_User_Var_Samp_Order_By>;
  variance?: InputMaybe<Workspaces_User_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "workspaces_user" */
export type Workspaces_User_Arr_Rel_Insert_Input = {
  data: Array<Workspaces_User_Insert_Input>;
  on_conflict?: InputMaybe<Workspaces_User_On_Conflict>;
};

/** aggregate avg on columns */
export type Workspaces_User_Avg_Fields = {
  __typename?: 'workspaces_user_avg_fields';
  roles?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "workspaces_user" */
export type Workspaces_User_Avg_Order_By = {
  roles?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "workspaces_user". All fields are combined with a logical 'AND'. */
export type Workspaces_User_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Workspaces_User_Bool_Exp>>>;
  _not?: InputMaybe<Workspaces_User_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Workspaces_User_Bool_Exp>>>;
  date_created?: InputMaybe<Timestamptz_Comparison_Exp>;
  inviter_user_id?: InputMaybe<Uuid_Comparison_Exp>;
  pending?: InputMaybe<Boolean_Comparison_Exp>;
  roles?: InputMaybe<Int_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  workspace?: InputMaybe<Workspaces_Bool_Exp>;
  workspace_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "workspaces_user" */
export enum Workspaces_User_Constraint {
  /** unique or primary key constraint */
  WorkspacesTagPkey = 'workspaces_tag_pkey'
}

/** input type for incrementing integer column in table "workspaces_user" */
export type Workspaces_User_Inc_Input = {
  roles?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "workspaces_user" */
export type Workspaces_User_Insert_Input = {
  date_created?: InputMaybe<Scalars['timestamptz']['input']>;
  inviter_user_id?: InputMaybe<Scalars['uuid']['input']>;
  pending?: InputMaybe<Scalars['Boolean']['input']>;
  roles?: InputMaybe<Scalars['Int']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workspace?: InputMaybe<Workspaces_Obj_Rel_Insert_Input>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Workspaces_User_Max_Fields = {
  __typename?: 'workspaces_user_max_fields';
  date_created?: Maybe<Scalars['timestamptz']['output']>;
  inviter_user_id?: Maybe<Scalars['uuid']['output']>;
  roles?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "workspaces_user" */
export type Workspaces_User_Max_Order_By = {
  date_created?: InputMaybe<Order_By>;
  inviter_user_id?: InputMaybe<Order_By>;
  roles?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Workspaces_User_Min_Fields = {
  __typename?: 'workspaces_user_min_fields';
  date_created?: Maybe<Scalars['timestamptz']['output']>;
  inviter_user_id?: Maybe<Scalars['uuid']['output']>;
  roles?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  workspace_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "workspaces_user" */
export type Workspaces_User_Min_Order_By = {
  date_created?: InputMaybe<Order_By>;
  inviter_user_id?: InputMaybe<Order_By>;
  roles?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "workspaces_user" */
export type Workspaces_User_Mutation_Response = {
  __typename?: 'workspaces_user_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data of the affected rows by the mutation */
  returning: Array<Workspaces_User>;
};

/** input type for inserting object relation for remote table "workspaces_user" */
export type Workspaces_User_Obj_Rel_Insert_Input = {
  data: Workspaces_User_Insert_Input;
  on_conflict?: InputMaybe<Workspaces_User_On_Conflict>;
};

/** on conflict condition type for table "workspaces_user" */
export type Workspaces_User_On_Conflict = {
  constraint: Workspaces_User_Constraint;
  update_columns: Array<Workspaces_User_Update_Column>;
  where?: InputMaybe<Workspaces_User_Bool_Exp>;
};

/** ordering options when selecting data from "workspaces_user" */
export type Workspaces_User_Order_By = {
  date_created?: InputMaybe<Order_By>;
  inviter_user_id?: InputMaybe<Order_By>;
  pending?: InputMaybe<Order_By>;
  roles?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  workspace?: InputMaybe<Workspaces_Order_By>;
  workspace_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "workspaces_user" */
export type Workspaces_User_Pk_Columns_Input = {
  user_id: Scalars['uuid']['input'];
  workspace_id: Scalars['uuid']['input'];
};

/** select columns of table "workspaces_user" */
export enum Workspaces_User_Select_Column {
  /** column name */
  DateCreated = 'date_created',
  /** column name */
  InviterUserId = 'inviter_user_id',
  /** column name */
  Pending = 'pending',
  /** column name */
  Roles = 'roles',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** input type for updating data in table "workspaces_user" */
export type Workspaces_User_Set_Input = {
  date_created?: InputMaybe<Scalars['timestamptz']['input']>;
  inviter_user_id?: InputMaybe<Scalars['uuid']['input']>;
  pending?: InputMaybe<Scalars['Boolean']['input']>;
  roles?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workspace_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Workspaces_User_Stddev_Fields = {
  __typename?: 'workspaces_user_stddev_fields';
  roles?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "workspaces_user" */
export type Workspaces_User_Stddev_Order_By = {
  roles?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Workspaces_User_Stddev_Pop_Fields = {
  __typename?: 'workspaces_user_stddev_pop_fields';
  roles?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "workspaces_user" */
export type Workspaces_User_Stddev_Pop_Order_By = {
  roles?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Workspaces_User_Stddev_Samp_Fields = {
  __typename?: 'workspaces_user_stddev_samp_fields';
  roles?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "workspaces_user" */
export type Workspaces_User_Stddev_Samp_Order_By = {
  roles?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Workspaces_User_Sum_Fields = {
  __typename?: 'workspaces_user_sum_fields';
  roles?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "workspaces_user" */
export type Workspaces_User_Sum_Order_By = {
  roles?: InputMaybe<Order_By>;
};

/** update columns of table "workspaces_user" */
export enum Workspaces_User_Update_Column {
  /** column name */
  DateCreated = 'date_created',
  /** column name */
  InviterUserId = 'inviter_user_id',
  /** column name */
  Pending = 'pending',
  /** column name */
  Roles = 'roles',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WorkspaceId = 'workspace_id'
}

/** aggregate var_pop on columns */
export type Workspaces_User_Var_Pop_Fields = {
  __typename?: 'workspaces_user_var_pop_fields';
  roles?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "workspaces_user" */
export type Workspaces_User_Var_Pop_Order_By = {
  roles?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Workspaces_User_Var_Samp_Fields = {
  __typename?: 'workspaces_user_var_samp_fields';
  roles?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "workspaces_user" */
export type Workspaces_User_Var_Samp_Order_By = {
  roles?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Workspaces_User_Variance_Fields = {
  __typename?: 'workspaces_user_variance_fields';
  roles?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "workspaces_user" */
export type Workspaces_User_Variance_Order_By = {
  roles?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Workspaces_Var_Pop_Fields = {
  __typename?: 'workspaces_var_pop_fields';
  retention_limit_days?: Maybe<Scalars['Float']['output']>;
  use_recordings_in_stress_testing_sampled?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "workspaces" */
export type Workspaces_Var_Pop_Order_By = {
  retention_limit_days?: InputMaybe<Order_By>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Workspaces_Var_Samp_Fields = {
  __typename?: 'workspaces_var_samp_fields';
  retention_limit_days?: Maybe<Scalars['Float']['output']>;
  use_recordings_in_stress_testing_sampled?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "workspaces" */
export type Workspaces_Var_Samp_Order_By = {
  retention_limit_days?: InputMaybe<Order_By>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Workspaces_Variance_Fields = {
  __typename?: 'workspaces_variance_fields';
  retention_limit_days?: Maybe<Scalars['Float']['output']>;
  use_recordings_in_stress_testing_sampled?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "workspaces" */
export type Workspaces_Variance_Order_By = {
  retention_limit_days?: InputMaybe<Order_By>;
  use_recordings_in_stress_testing_sampled?: InputMaybe<Order_By>;
};

export type AddCollaboratorMutationVariables = Exact<{
  email: Scalars['String']['input'];
  recordingId: Scalars['ID']['input'];
}>;


export type AddCollaboratorMutation = { __typename?: 'mutation_root', addRecordingCollaborator: { __typename?: 'AddRecordingCollaborator', success?: boolean | null } };

export type DeleteRecordingMutationVariables = Exact<{
  recordingId: Scalars['ID']['input'];
}>;


export type DeleteRecordingMutation = { __typename?: 'mutation_root', deleteRecording: { __typename?: 'DeleteRecording', success?: boolean | null } };

export type DeleteCollaboratorMutationVariables = Exact<{
  collaborationId: Scalars['ID']['input'];
}>;


export type DeleteCollaboratorMutation = { __typename?: 'mutation_root', removeRecordingCollaborator: { __typename?: 'RemoveRecordingCollaborator', success?: boolean | null } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'query_root', viewer?: { __typename?: 'AuthenticatedUser', email: string, internal: boolean, nags: Array<string>, user: { __typename?: 'User', name?: string | null, picture?: string | null, id: string } } | null };

export type GetNonPendingWorkspacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNonPendingWorkspacesQuery = { __typename?: 'query_root', viewer?: { __typename?: 'AuthenticatedUser', workspaces: { __typename?: 'UserWorkspaceConnection', edges: Array<{ __typename?: 'UserWorkspaceEdge', node: { __typename?: 'Workspace', id: string, name: string, isTest: boolean } }> } } | null };

export type GetMyRecordingsQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMyRecordingsQuery = { __typename?: 'query_root', viewer?: { __typename?: 'AuthenticatedUser', recordings: { __typename?: 'UserRecordingConnection', edges: Array<{ __typename?: 'UserRecordingEdge', node: { __typename?: 'Recording', buildId?: string | null, duration?: number | null, createdAt: any, private: boolean, title?: string | null, url?: string | null, uuid: any, comments: Array<{ __typename?: 'Comment', id: string }>, owner?: { __typename?: 'User', id: string, name?: string | null, picture?: string | null } | null } }> } } | null };

export type GetOwnerAndCollaboratorsQueryVariables = Exact<{
  recordingId: Scalars['UUID']['input'];
}>;


export type GetOwnerAndCollaboratorsQuery = { __typename?: 'query_root', recording?: { __typename?: 'Recording', collaborators?: { __typename?: 'RecordingCollaboratorsConnection', edges: Array<{ __typename?: 'RecordingCollaboratorsEdge', node: { __typename?: 'RecordingPendingEmailCollaborator', id: string, email: string, createdAt: any } | { __typename?: 'RecordingPendingUserCollaborator', id: string, user: { __typename?: 'User', name?: string | null, picture?: string | null } } | { __typename?: 'RecordingUserCollaborator', id: string, user: { __typename?: 'User', name?: string | null, picture?: string | null } } }> } | null, collaboratorRequests?: { __typename?: 'RecordingCollaboratorRequestsConnection', edges: Array<{ __typename?: 'RecordingCollaboratorRequestsEdge', node: { __typename?: 'RecordingCollaboratorRequest', id: string, user: { __typename?: 'User', name?: string | null, picture?: string | null } } }> } | null } | null };

export type GetRecordingPhotoQueryVariables = Exact<{
  recordingId: Scalars['UUID']['input'];
}>;


export type GetRecordingPhotoQuery = { __typename?: 'query_root', recording?: { __typename?: 'Recording', thumbnail?: string | null } | null };

export type GetWorkspaceRecordingsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  filter?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetWorkspaceRecordingsQuery = { __typename?: 'query_root', node?: { __typename?: 'Recording' } | { __typename?: 'RootCauseAnalysis' } | { __typename?: 'Workspace', id: string, recordings?: { __typename?: 'WorkspaceRecordingConnection', edges: Array<{ __typename?: 'WorkspaceRecordingEdge', node: { __typename?: 'Recording', buildId?: string | null, createdAt: any, duration?: number | null, metadata?: any | null, private: boolean, title?: string | null, url?: string | null, uuid: any, comments: Array<{ __typename?: 'Comment', id: string }>, owner?: { __typename?: 'User', id: string, name?: string | null, picture?: string | null } | null } }> } | null } | null };


export const AddCollaboratorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCollaborator"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recordingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addRecordingCollaborator"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"recordingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recordingId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AddCollaboratorMutation, AddCollaboratorMutationVariables>;
export const DeleteRecordingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRecording"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recordingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRecording"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recordingId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteRecordingMutation, DeleteRecordingMutationVariables>;
export const DeleteCollaboratorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCollaborator"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collaborationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRecordingCollaborator"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collaborationId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteCollaboratorMutation, DeleteCollaboratorMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}},{"kind":"Field","name":{"kind":"Name","value":"nags"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetNonPendingWorkspacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNonPendingWorkspaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workspaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isTest"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetNonPendingWorkspacesQuery, GetNonPendingWorkspacesQueryVariables>;
export const GetMyRecordingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyRecordings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recordings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildId"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMyRecordingsQuery, GetMyRecordingsQueryVariables>;
export const GetOwnerAndCollaboratorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOwnerAndCollaborators"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recordingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recording"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recordingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordingPendingEmailCollaborator"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordingPendingUserCollaborator"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordingUserCollaborator"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaboratorRequests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordingCollaboratorRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOwnerAndCollaboratorsQuery, GetOwnerAndCollaboratorsQueryVariables>;
export const GetRecordingPhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRecordingPhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recordingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recording"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recordingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}}]}}]}}]} as unknown as DocumentNode<GetRecordingPhotoQuery, GetRecordingPhotoQueryVariables>;
export const GetWorkspaceRecordingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorkspaceRecordings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workspace"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"recordings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildId"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetWorkspaceRecordingsQuery, GetWorkspaceRecordingsQueryVariables>;
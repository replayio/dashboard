export type WorkspaceRecording = {
  buildId: string;
  createdAt: Date;
  duration: number;
  numComments: number;
  owner: WorkspaceRecordingOwner | null;
  private: boolean;
  title: string;
  url: string;
  uuid: string;
  workspaceId: string | null;
};

export type WorkspaceRecordingCollaborator = {
  accessRequested: boolean;
  collaborationId: string;
  name: string;
  picture: string;
};

export type WorkspaceRecordingOwner = {
  id: string;
  name: string;
  picture: string;
};

export type WorkspaceRecordingComments = {
  user: {
    id: string;
  };
};

export type User = {
  email: string;
  id: string;
  isInternal: boolean;
  nags: string[];
  name: string;
  picture: string;
};

export type TestRun = {
  branchName: string | null;
  commitId: string | null;
  commitTitle: string | null;
  date: Date;
  groupLabel: string | null;
  id: string;
  isPrimaryBranch: boolean;
  numFailed: number;
  numFlaky: number;
  numPassed: number;
  prNumber: number | null;
  prTitle: string | null;
  repository: string | null;
  triggerUrl: string | null;
  user: string | null;
};

export type TestSuiteTestStatus = "passed" | "failed" | "flaky";
export type TestSuiteTestAttemptResult =
  | "passed"
  | "failed"
  | "flaky"
  | "skipped"
  | "timedOut"
  | "unknown";

export type TestSuiteTestExecutionSummary = {
  recordings: TestSuiteTestRecording[];
  status: TestSuiteTestStatus;
};

export type TestSuiteTest = {
  durationMs: number;
  errors: string[] | null;
  executions: TestSuiteTestExecutionSummary[];
  id: string;
  scope: string[];
  sourcePath: string;
  status: TestSuiteTestStatus;
  title: string;
};

export type TestSuiteTestRecording = {
  buildId: string;
  createdAt: Date;
  duration: number;
  id: string;
  isProcessed: boolean;
  numComments: number;
};

export type WorkspaceMember = {
  id: string;
  isPending: boolean;
  membershipId: string;
  name: string;
  picture: string | null;
  roles: string[];
};

export type ApiKeyScope = "admin:all" | "write:sourcemap";

export type ApiKey = {
  id: string;
  createdAt: Date;
  label: string;
  maxRecordings: number;
  recordingCount: number;
  scopes: ApiKeyScope[];
};

export type UserSettings = {
  apiKeys: ApiKey[];
};

export type TestSuiteTestSummary = {
  id: string;
  scope: string[];
  stats: {
    failed: number;
    failureRate: number;
    flaky: number;
    flakyRate: number;
    passed: number;
    skipped: number;
    unknown: number;
  };
  title: string;
};

export type TestSuiteTestExecutionRecording = {
  buildId: string;
  createdAt: Date;
  duration: number;
  id: string;
  isProcessed: boolean;
  title: string;
  uuid: string;
};

export type TestSuiteTestExecution = {
  commitAuthor: string;
  commitTitle: string;
  createdAt: Date;
  errors: string[];
  id: string;
  recordings: TestSuiteTestExecutionRecording[];
  status: TestSuiteTestStatus;
};

export type WorkspaceSettings = {
  features: {
    recording: {
      allowList: string[];
      blockList: string[];
      public: boolean;
    };
    user: {
      autoJoin: number;
    };
  };
};

export type WorkspaceSettingsFeatures = Partial<WorkspaceSettings["features"]>;

export type Workspace = {
  hasPaymentMethod: boolean;
  id: string;
  invitationCode: string | null;
  isOrganization: boolean;
  isTest: boolean;
  name: string;
  retentionLimitDays: number;
  settings: WorkspaceSettings | null;
  subscriptionPlanKey: string | null;
};

export type PendingWorkspace = {
  id: string;
  inviterEmail: string | null;
  isOrganization: boolean;
  isTest: boolean;
  name: string;
};

export enum WorkspaceSubscriptionStatus {
  Active = "active",
  Canceled = "canceled",
  Incomplete = "incomplete",
  Trial = "trialing",
}

export type PlanKey =
  | "org-v1"
  | "team-v1"
  | "test-team-v1"
  | "beta-v1"
  | "test-beta-v1"
  | "ent-v1"
  | "team-annual-v1"
  | "org-annual-v1"
  | "org-annual-contract-v1"
  | "team-oss-v1"
  | "team-internal-v1"
  | "testsuites-v1";

export type Plan = {
  id: string;
  key: PlanKey;
  name: string;
};

export type SubscriptionStatus = `${WorkspaceSubscriptionStatus}`;

export type PaymentMethod = {
  default: boolean;
  card: {
    brand: string;
    last4: string;
  };
  id: string;
  type: "card";
};

export type WorkspaceSubscription = {
  effectiveFrom: Date;
  effectiveUntil: Date;
  id: string;
  paymentMethods: PaymentMethod[];
  plan: Plan | undefined;
  seatCount: number;
  status: SubscriptionStatus;
  trialEnds: Date;
};

export type BillingSchedule = "annual" | "monthly" | "contract";

export type PlanPricing = {
  billingSchedule: BillingSchedule | null;
  displayName: string;
  seatPrice: number;
  trial: boolean;
  discount: number;
};

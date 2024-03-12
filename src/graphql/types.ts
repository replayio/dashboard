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

export type TestSuiteTest = {
  durationMs: number;
  errors: string[] | null;
  id: string;
  recordings: TestSuiteTestRecording[];
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
  isPending: boolean;
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

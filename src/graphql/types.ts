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

export type TestSuiteTestRunWithRecordings = {
  durationMs: number;
  errors: string[] | null;
  recordings: TestSuiteTestRunRecording[];
  scope: string[];
  sourcePath: string;
  testId: string;
  title: string;
};

export type TestSuiteTestRunRecording = {
  createdAt: Date;
  duration: number;
  id: string;
  isProcessed: boolean;
  numComments: number;
};

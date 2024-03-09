export type WorkspaceRecording = {
  buildId: string;
  createdAt: Date;
  duration: number;
  numComments: number;
  owner: WorkspaceRecordingOwner | null;
  private: boolean;
  title: string;
  url: string;
  userRole: string;
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

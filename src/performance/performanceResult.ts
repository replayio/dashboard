import {
  PerformanceAnalysisResultFile,
  PerformanceAnalysisVersion,
  DependencyGraphVersion,
  WorkspacePerformanceMetadataVersion,
  AnalyzeDependenciesVersion,
  WorkspacePerformanceAnalysisEntry,
} from "./interfaceTypes";

export function getPerformanceCacheFilename(recordingId: string) {
  const filename = `performance/performance-v${PerformanceAnalysisVersion}-v${DependencyGraphVersion}-${recordingId}.json`;
  return filename;
}

export function getWorkspacePerformanceAnalysisFilename(workspaceId: string) {
  const filename = `performance/workspaces/${workspaceId}/workspace-performance-v${WorkspacePerformanceMetadataVersion}-v${PerformanceAnalysisVersion}-v${DependencyGraphVersion}-v${AnalyzeDependenciesVersion}.json`;
  return filename;
}

export async function client(
  endpoint: string,
  {
    body,
    ...customConfig
  }: Omit<Partial<RequestInit>, "body"> & {
    body?: string | Record<string, unknown>;
  }
) {
  const headers = { "Content-Type": "application/json" };

  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await fetch(endpoint, config);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint: string, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

export async function downloadWebsiteS3File<T>(key: string): Promise<T> {
  const jsonURL = `https://static.replay.io/${key}`;

  const json = await client.get(jsonURL);
  return json;
}

export async function fetchPerformanceResult(
  recordingId: string
): Promise<PerformanceAnalysisResultFile> {
  const filename = getPerformanceCacheFilename(recordingId);
  return downloadWebsiteS3File<PerformanceAnalysisResultFile>(filename);
}

export async function fetchWorkspacePerformanceAnalysis(
  workspaceId: string
): Promise<WorkspacePerformanceAnalysisEntry[]> {
  const filename = getWorkspacePerformanceAnalysisFilename(workspaceId);
  return downloadWebsiteS3File<WorkspacePerformanceAnalysisEntry[]>(filename);
}

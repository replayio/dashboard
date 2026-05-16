import { useEffect, useState } from "react";

export type GitHubRepositoryOwner = {
  avatarUrl?: string;
  canCreateRepositories?: boolean;
  installationId?: number;
  login: string;
  type: "Organization" | "User";
};

type GitHubRepositoryOwnersResponse = {
  connected: boolean;
  connectUrl: string;
  diagnostics?: Record<
    string,
    {
      acceptedGithubPermissions?: string;
      acceptedOauthScopes?: string;
      oauthScopes?: string;
      requestId?: string;
    }
  >;
  error?: string;
  owners: GitHubRepositoryOwner[];
  warning?: string;
};

export function useGithubRepositoryOwners() {
  const [data, setData] = useState<GitHubRepositoryOwnersResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepositoryOwners() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/github/repository-owners", {
          signal: controller.signal,
        });
        const payload = (await response.json()) as GitHubRepositoryOwnersResponse;

        if (!response.ok) {
          throw new Error(payload.error || "Unable to load GitHub workspaces.");
        }

        setData(payload);
        setError(payload.error ?? null);
      } catch (error) {
        if (controller.signal.aborted) return;
        setError(error instanceof Error ? error.message : "Unable to load GitHub workspaces.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadRepositoryOwners();

    return () => controller.abort();
  }, []);

  return {
    connectUrl: data?.connectUrl,
    error,
    isConnected: data?.connected === true,
    isLoading,
    owners: data?.owners,
    warning: data?.warning,
  };
}

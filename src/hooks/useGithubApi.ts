import { useEffect, useState } from "react";

export type GithubApiState<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

export function useGithubApi<T>(url: string | null): GithubApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(url));

  useEffect(() => {
    if (!url) {
      setData(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const requestUrl = url;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(requestUrl, {
          signal: controller.signal,
        });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || "Unable to load GitHub data.");
        }

        setData(payload as T);
      } catch (error) {
        if (controller.signal.aborted) return;
        setError(error instanceof Error ? error.message : "Unable to load GitHub data.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => controller.abort();
  }, [url]);

  return {
    data,
    error,
    isLoading,
  };
}

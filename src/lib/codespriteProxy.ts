const LOCAL_CODESPRITE_PROXY_SECRET = "local-codesprite-secret";

export function codespriteEndpointsUrl() {
  const configured = process.env.CODESPRITE_ENDPOINTS_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");
  if (process.env.NODE_ENV !== "production") return "http://localhost:4317";
  throw new Error("CODESPRITE_ENDPOINTS_URL is not configured on the dashboard server.");
}

export function codespriteProxySecret() {
  return (
    process.env.CODESPRITE_PROXY_SECRET ||
    (process.env.NODE_ENV !== "production" ? LOCAL_CODESPRITE_PROXY_SECRET : undefined)
  );
}

export async function forwardCodespriteRequest(
  path: "" | "/editor-fs" | "/ports" | "/tty-ticket",
  githubToken: string,
  body: unknown
) {
  const secret = codespriteProxySecret();
  if (!secret) {
    throw new Error("CODESPRITE_PROXY_SECRET is not configured on the dashboard server.");
  }

  const response = await fetch(`${codespriteEndpointsUrl()}/api/codesprite${path}`, {
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
      "x-codesprite-github-token": githubToken,
    },
    method: "POST",
  });

  const text = await response.text();
  const payload = parseResponsePayload(text);
  return { payload, status: response.status };
}

function parseResponsePayload(text: string) {
  if (!text) return {};
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { error: text };
  }
}

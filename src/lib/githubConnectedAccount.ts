import { COOKIES } from "@/constants";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import { getSession, updateSession } from "@auth0/nextjs-auth0";
import crypto from "crypto";
import cookie from "cookie";
import type { IncomingMessage, ServerResponse } from "http";
import type { NextApiRequest, NextApiResponse } from "next";

const DEFAULT_GITHUB_SCOPES = ["repo", "read:user", "read:org"];
const CONNECT_ACCOUNT_SCOPE = "create:me:connected_accounts";
const CONNECT_TRANSACTION_MAX_AGE_SECONDS = 10 * 60;
const GITHUB_ACCESS_TOKEN_TIMEOUT_MS = 8_000;
const AUTH0_TOKEN_EXCHANGE_GRANT =
  "urn:auth0:params:oauth:grant-type:token-exchange:federated-connection-access-token";
const AUTH0_REFRESH_TOKEN_SUBJECT = "urn:ietf:params:oauth:token-type:refresh_token";
const AUTH0_FEDERATED_ACCESS_TOKEN =
  "http://auth0.com/oauth/token-type/federated-connection-access-token";
const GITHUB_API_VERSION = process.env.GITHUB_API_VERSION?.trim() || "2022-11-28";
const GITHUB_API_TIMEOUT_MS = 12_000;
const GITHUB_MAX_PAGES = 10;

type Auth0TokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
};

type ConnectAccountResponse = {
  auth_session: string;
  connect_params?: {
    ticket?: string;
  };
  connect_uri?: string;
  expires_in?: number;
};

type ConnectTransaction = {
  authSession: string;
  codeVerifier: string;
  redirectUri: string;
  returnTo: string;
  state: string;
};

type GitHubApiViewer = {
  avatar_url?: string;
  html_url?: string;
  login: string;
};

type GitHubApiOwner = {
  avatar_url?: string;
  login?: string;
  type?: string;
};

type GitHubApiInstallation = {
  account?: GitHubApiOwner | null;
  id?: number;
  permissions?: Record<string, string | undefined>;
};

type GitHubApiRepository = {
  default_branch?: string;
  full_name: string;
  html_url: string;
  id: number;
  name: string;
  owner?: {
    avatar_url?: string;
    login?: string;
    type?: string;
  };
  private: boolean;
  pushed_at?: string | null;
  updated_at?: string | null;
};

export type GitHubRepositoryOwner = {
  avatarUrl?: string;
  canCreateRepositories?: boolean;
  installationId?: number;
  login: string;
  type: "Organization" | "User";
};

export type GitHubRepositorySummary = {
  defaultBranch?: string;
  fullName: string;
  htmlUrl: string;
  id: number;
  name: string;
  owner: string;
  private: boolean;
  pushedAt?: string | null;
  updatedAt?: string | null;
};

export type GitHubApiDiagnostics = {
  acceptedGithubPermissions?: string;
  acceptedOauthScopes?: string;
  oauthScopes?: string;
  requestId?: string;
};

export class GitHubApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly diagnostics: GitHubApiDiagnostics = {}
  ) {
    super(message);
  }
}

export function githubConnection() {
  return process.env.AUTH0_GITHUB_CONNECTION?.trim() || "github";
}

export function githubScopes() {
  const configured = process.env.AUTH0_GITHUB_SCOPES?.trim();
  if (!configured) return DEFAULT_GITHUB_SCOPES;
  return configured.split(/[,\s]+/).filter(Boolean);
}

export function githubConnectPath(returnTo: string) {
  const params = new URLSearchParams({
    connection: githubConnection(),
    returnTo: safeReturnTo(returnTo),
  });

  for (const scope of githubScopes()) {
    params.append("scopes", scope);
  }

  return `/api/auth/connect?${params.toString()}`;
}

export async function getConnectedGithubAccessToken(req: IncomingMessage, res: ServerResponse) {
  return resolveAfterTimeout(
    exchangeRefreshTokenForGithubAccessToken(req, res),
    GITHUB_ACCESS_TOKEN_TIMEOUT_MS
  )
    .catch(() => null)
    .then(token => token?.accessToken ?? null);
}

export async function fetchGithubRepositoryOwners(token: string) {
  const owners = new Map<string, GitHubRepositoryOwner>();
  const diagnostics: Record<string, GitHubApiDiagnostics | undefined> = {};
  let warning: string | undefined;

  const viewerResponse = await githubJsonWithDiagnostics<GitHubApiViewer>(
    "https://api.github.com/user",
    token
  );
  const viewer = viewerResponse.data;
  diagnostics.viewer = viewerResponse.diagnostics;

  mergeGithubOwner(owners, {
    avatarUrl: viewer.avatar_url,
    canCreateRepositories: true,
    login: viewer.login,
    type: "User",
  });

  try {
    const { diagnostics: installationDiagnostics, installations } =
      await fetchGithubUserInstallations(token);
    diagnostics.installations = installationDiagnostics;

    for (const installation of installations) {
      const owner = normalizeGithubOwner(installation.account);
      if (owner) {
        mergeGithubOwner(owners, {
          ...owner,
          canCreateRepositories: hasRepositoryAdministrationWrite(installation.permissions),
          installationId: installation.id,
        });
      }
    }
  } catch (error) {
    warning = bestEffortGithubWarning(error) ?? warning;
  }

  try {
    const { diagnostics: organizationDiagnostics, organizations } =
      await fetchGithubUserOrganizations(token);
    diagnostics.organizations = organizationDiagnostics;

    for (const organization of organizations) {
      const owner = normalizeGithubOwner({ ...organization, type: "Organization" });
      if (owner) {
        mergeGithubOwner(owners, owner);
      }
    }
  } catch (error) {
    warning = bestEffortGithubWarning(error) ?? warning;
  }

  try {
    const { diagnostics: repositoryDiagnostics, owners: repositoryOwners } =
      await fetchGithubRepositoryOwnersFromRepositories(token);
    diagnostics.repositories = repositoryDiagnostics;

    for (const owner of repositoryOwners) {
      mergeGithubOwner(owners, owner);
    }
  } catch (error) {
    warning = bestEffortGithubWarning(error) ?? warning;
  }

  return {
    diagnostics,
    owners: [...owners.values()].sort((a, b) => {
      if (a.type === b.type) return a.login.localeCompare(b.login);
      return a.type === "User" ? -1 : 1;
    }),
    warning,
  };
}

export async function fetchGithubRepositoriesForOwner(token: string, owner: string) {
  const repositories: GitHubRepositorySummary[] = [];

  for (let page = 1; page <= GITHUB_MAX_PAGES; page += 1) {
    const url = new URL("https://api.github.com/user/repos");
    url.searchParams.set("affiliation", "owner,collaborator,organization_member");
    url.searchParams.set("sort", "updated");
    url.searchParams.set("direction", "desc");
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));

    const pageRepositories = await githubJson<GitHubApiRepository[]>(url, token);
    repositories.push(
      ...pageRepositories
        .filter(repository => repository.owner?.login === owner)
        .map(repository => ({
          defaultBranch: repository.default_branch,
          fullName: repository.full_name,
          htmlUrl: repository.html_url,
          id: repository.id,
          name: repository.name,
          owner: repository.owner?.login ?? owner,
          private: repository.private,
          pushedAt: repository.pushed_at,
          updatedAt: repository.updated_at,
        }))
    );

    if (pageRepositories.length === 0) break;
  }

  return repositories;
}

export async function handleAuth0ConnectAccount(req: NextApiRequest, res: NextApiResponse) {
  const connection = getValueFromArrayOrString(req.query.connection);
  const returnTo = safeReturnTo(getValueFromArrayOrString(req.query.returnTo));
  const scopes = readQueryValues(req.query.scopes);

  if (!connection) {
    res.status(400).send("A connection is required.");
    return;
  }

  const myAccountToken = await getMyAccountAccessToken(req, res);
  if (!myAccountToken) {
    redirectToAuth0LoginForConnect(req, res);
    return;
  }

  const codeVerifier = base64Url(crypto.randomBytes(32));
  const state = base64Url(crypto.randomBytes(32));
  const redirectUri = `${requestOrigin(req)}/api/auth/callback`;

  const response = await fetch(`${auth0IssuerBaseUrl()}me/v1/connected-accounts/connect`, {
    body: JSON.stringify({
      code_challenge: base64Url(crypto.createHash("sha256").update(codeVerifier).digest()),
      code_challenge_method: "S256",
      connection,
      redirect_uri: redirectUri,
      scopes,
      state,
    }),
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${myAccountToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    res.status(response.status).send(body || "Unable to start the Auth0 connected-account flow.");
    return;
  }

  const payload = (await response.json()) as ConnectAccountResponse;
  const ticket = payload.connect_params?.ticket;
  if (!payload.connect_uri || !ticket || !payload.auth_session) {
    res.status(502).send("Auth0 did not return a valid connected-account ticket.");
    return;
  }

  setConnectTransaction(req, res, {
    authSession: payload.auth_session,
    codeVerifier,
    redirectUri,
    returnTo,
    state,
  });

  res.redirect(`${payload.connect_uri}?ticket=${encodeURIComponent(ticket)}`);
}

export async function handleAuth0ConnectAccountCallback(req: NextApiRequest, res: NextApiResponse) {
  const connectCode = getValueFromArrayOrString(req.query.connect_code);
  if (!connectCode) return false;

  const state = getValueFromArrayOrString(req.query.state);
  const transaction = readConnectTransaction(req);

  if (!state || !transaction || transaction.state !== state) {
    clearConnectTransaction(req, res);
    res.status(400).send("Invalid Auth0 connected-account callback.");
    return true;
  }

  const myAccountToken = await getMyAccountAccessToken(req, res);
  if (!myAccountToken) {
    clearConnectTransaction(req, res);
    res.status(401).send("Unable to retrieve an Auth0 connected-account token.");
    return true;
  }

  const response = await fetch(`${auth0IssuerBaseUrl()}me/v1/connected-accounts/complete`, {
    body: JSON.stringify({
      auth_session: transaction.authSession,
      code_verifier: transaction.codeVerifier,
      connect_code: connectCode,
      redirect_uri: transaction.redirectUri,
    }),
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${myAccountToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  clearConnectTransaction(req, res);

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    res
      .status(response.status)
      .send(body || "Unable to complete the Auth0 connected-account flow.");
    return true;
  }

  res.redirect(transaction.returnTo);
  return true;
}

async function exchangeRefreshTokenForGithubAccessToken(req: IncomingMessage, res: ServerResponse) {
  const session = await getSession(req, res);
  const refreshToken = session?.refreshToken;
  if (!refreshToken) return null;

  const payload = await auth0TokenRequest({
    connection: githubConnection(),
    grant_type: AUTH0_TOKEN_EXCHANGE_GRANT,
    requested_token_type: AUTH0_FEDERATED_ACCESS_TOKEN,
    subject_token: refreshToken,
    subject_token_type: AUTH0_REFRESH_TOKEN_SUBJECT,
  });

  return payload.access_token ? { accessToken: payload.access_token } : null;
}

async function getMyAccountAccessToken(req: IncomingMessage, res: ServerResponse) {
  const session = await getSession(req, res);
  if (!session?.refreshToken) return null;

  try {
    const payload = await auth0TokenRequest({
      audience: `${auth0IssuerBaseUrl()}me/`,
      grant_type: "refresh_token",
      refresh_token: session.refreshToken,
      scope: CONNECT_ACCOUNT_SCOPE,
    });

    if (payload.refresh_token && payload.refresh_token !== session.refreshToken) {
      await updateSession(req, res, {
        ...session,
        refreshToken: payload.refresh_token,
      });
    }

    return payload.access_token ?? null;
  } catch (error) {
    console.error("Unable to retrieve Auth0 My Account token", error);
    return null;
  }
}

async function auth0TokenRequest(params: Record<string, string>) {
  const response = await fetch(`${auth0IssuerBaseUrl()}oauth/token`, {
    body: new URLSearchParams({
      client_id: auth0ClientId(),
      client_secret: auth0ClientSecret(),
      ...params,
    }),
    cache: "no-store",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  const payload = (await response.json()) as Auth0TokenResponse;
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || "Auth0 token request failed.");
  }

  return payload;
}

async function githubJson<T>(url: URL | string, token: string) {
  return (await githubJsonWithDiagnostics<T>(url, token)).data;
}

async function githubJsonWithDiagnostics<T>(url: URL | string, token: string) {
  const response = await githubFetch(url, {
    cache: "no-store",
    headers: githubHeaders(token),
  });

  if (!response.ok) {
    throw await gitHubApiError(response);
  }

  return {
    data: (await response.json()) as T,
    diagnostics: githubDiagnostics(response),
  };
}

async function fetchGithubRepositoryOwnersFromRepositories(token: string) {
  const owners = new Map<string, GitHubRepositoryOwner>();
  let diagnostics: GitHubApiDiagnostics | undefined;

  for (let page = 1; page <= GITHUB_MAX_PAGES; page += 1) {
    const url = new URL("https://api.github.com/user/repos");
    url.searchParams.set("affiliation", "owner,collaborator,organization_member");
    url.searchParams.set("sort", "updated");
    url.searchParams.set("direction", "desc");
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));

    const response = await githubJsonWithDiagnostics<GitHubApiRepository[]>(url, token);
    diagnostics ??= response.diagnostics;

    for (const repository of response.data) {
      const owner = normalizeGithubOwner(repository.owner);
      if (owner) {
        mergeGithubOwner(owners, owner);
      }
    }

    if (response.data.length === 0) break;
  }

  return {
    diagnostics,
    owners: [...owners.values()],
  };
}

async function fetchGithubUserInstallations(token: string) {
  const installations: GitHubApiInstallation[] = [];
  let diagnostics: GitHubApiDiagnostics | undefined;

  for (let page = 1; page <= GITHUB_MAX_PAGES; page += 1) {
    const url = new URL("https://api.github.com/user/installations");
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));

    const response = await githubJsonWithDiagnostics<{
      installations?: GitHubApiInstallation[];
    }>(url, token);
    diagnostics ??= response.diagnostics;

    const pageInstallations = Array.isArray(response.data.installations)
      ? response.data.installations
      : [];
    installations.push(...pageInstallations);

    if (pageInstallations.length === 0) break;
  }

  return { diagnostics, installations };
}

async function fetchGithubUserOrganizations(token: string) {
  const organizations: GitHubApiOwner[] = [];
  let diagnostics: GitHubApiDiagnostics | undefined;

  for (let page = 1; page <= GITHUB_MAX_PAGES; page += 1) {
    const url = new URL("https://api.github.com/user/orgs");
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));

    const response = await githubJsonWithDiagnostics<GitHubApiOwner[]>(url, token);
    diagnostics ??= response.diagnostics;

    const pageOrganizations = response.data;
    organizations.push(...pageOrganizations);

    if (pageOrganizations.length === 0) break;
  }

  return { diagnostics, organizations };
}

async function githubFetch(input: URL | string, init: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GITHUB_API_TIMEOUT_MS);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function githubHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
  };
}

function githubDiagnostics(response: Response): GitHubApiDiagnostics {
  return {
    acceptedGithubPermissions:
      response.headers.get("x-accepted-github-permissions") ?? undefined,
    acceptedOauthScopes: response.headers.get("x-accepted-oauth-scopes") ?? undefined,
    oauthScopes: response.headers.get("x-oauth-scopes") ?? undefined,
    requestId: response.headers.get("x-github-request-id") ?? undefined,
  };
}

async function gitHubApiError(response: Response) {
  const body = await response.text().catch(() => "");
  const message = parseGithubErrorMessage(body) || `GitHub request failed with ${response.status}.`;
  return new GitHubApiError(response.status, message, githubDiagnostics(response));
}

function parseGithubErrorMessage(body: string) {
  if (!body) return null;

  try {
    const payload = JSON.parse(body) as {
      message?: unknown;
    };
    return typeof payload.message === "string" && payload.message.trim()
      ? payload.message.trim()
      : null;
  } catch {
    return body.trim() || null;
  }
}

function normalizeGithubOwner(
  owner: GitHubApiOwner | null | undefined
): GitHubRepositoryOwner | null {
  if (!owner?.login) return null;

  return {
    avatarUrl: owner.avatar_url,
    login: owner.login,
    type: owner.type === "User" ? "User" : "Organization",
  };
}

function mergeGithubOwner(
  owners: Map<string, GitHubRepositoryOwner>,
  owner: GitHubRepositoryOwner
) {
  const existing = owners.get(owner.login);
  owners.set(owner.login, {
    ...existing,
    ...owner,
    canCreateRepositories: owner.canCreateRepositories ?? existing?.canCreateRepositories,
    installationId: owner.installationId ?? existing?.installationId,
  });
}

function hasRepositoryAdministrationWrite(
  permissions: Record<string, string | undefined> | undefined
) {
  const permission = permissions?.administration;
  return permission === "write" || permission === "admin";
}

function bestEffortGithubWarning(error: unknown) {
  if (!(error instanceof GitHubApiError)) return null;
  if (error.status !== 401 && error.status !== 403) return null;

  return ["Reconnect GitHub to refresh organization access.", error.message].join(" ");
}

function resolveAfterTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  return new Promise<T | null>((resolve, reject) => {
    const timeout = setTimeout(() => resolve(null), timeoutMs);
    promise.then(
      value => {
        clearTimeout(timeout);
        resolve(value);
      },
      error => {
        clearTimeout(timeout);
        reject(error);
      }
    );
  });
}

function auth0IssuerBaseUrl() {
  const issuer = process.env.AUTH0_ISSUER_BASE_URL?.trim();
  if (!issuer) throw new Error("AUTH0_ISSUER_BASE_URL is required.");
  return issuer.endsWith("/") ? issuer : `${issuer}/`;
}

function auth0ClientId() {
  const clientId = process.env.AUTH0_CLIENT_ID?.trim();
  if (!clientId) throw new Error("AUTH0_CLIENT_ID is required.");
  return clientId;
}

function auth0ClientSecret() {
  const clientSecret = process.env.AUTH0_CLIENT_SECRET?.trim();
  if (!clientSecret) throw new Error("AUTH0_CLIENT_SECRET is required.");
  return clientSecret;
}

function requestOrigin(req: NextApiRequest) {
  const origin = getValueFromArrayOrString(req.query.origin);
  if (origin) return origin;

  const configured = process.env.AUTH0_BASE_URL?.trim();
  if (configured) return configured;

  const host = req.headers.host;
  if (!host) return "http://localhost:8080";

  const forwardedProtocol = getValueFromArrayOrString(req.headers["x-forwarded-proto"]);
  const protocol =
    forwardedProtocol ||
    (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
  return `${protocol}://${host}`;
}

function redirectToAuth0LoginForConnect(req: NextApiRequest, res: NextApiResponse) {
  const returnTo = req.url && req.url.startsWith("/") ? req.url : "/api/auth/connect";
  const loginUrl = new URL("/api/auth/login", requestOrigin(req));
  loginUrl.searchParams.set("returnTo", returnTo);
  res.redirect(loginUrl.toString());
}

function readQueryValues(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return value ? [value] : githubScopes();
}

export function safeReturnTo(value: string | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }
  return value;
}

function setConnectTransaction(
  req: NextApiRequest,
  res: NextApiResponse,
  transaction: ConnectTransaction
) {
  appendSetCookie(
    res,
    cookie.serialize(COOKIES.auth0ConnectAccount, encryptCookie(transaction), {
      httpOnly: true,
      maxAge: CONNECT_TRANSACTION_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
      secure: requestOrigin(req).startsWith("https://"),
    })
  );
}

function readConnectTransaction(req: NextApiRequest) {
  const raw = req.cookies[COOKIES.auth0ConnectAccount];
  if (!raw) return null;

  const value = decryptCookie<ConnectTransaction>(raw);
  if (!value?.state || !value.codeVerifier || !value.authSession || !value.redirectUri) {
    return null;
  }

  return value;
}

function clearConnectTransaction(req: NextApiRequest, res: NextApiResponse) {
  appendSetCookie(
    res,
    cookie.serialize(COOKIES.auth0ConnectAccount, "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
      sameSite: "lax",
      secure: requestOrigin(req).startsWith("https://"),
    })
  );
}

function appendSetCookie(res: NextApiResponse, serializedCookie: string) {
  const existing = res.getHeader("Set-Cookie");
  if (!existing) {
    res.setHeader("Set-Cookie", serializedCookie);
  } else if (Array.isArray(existing)) {
    res.setHeader("Set-Cookie", [...existing, serializedCookie]);
  } else {
    res.setHeader("Set-Cookie", [existing.toString(), serializedCookie]);
  }
}

function encryptCookie(value: unknown) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", cookieSecret(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

function decryptCookie<T>(value: string) {
  try {
    const buffer = Buffer.from(value, "base64url");
    const iv = buffer.subarray(0, 12);
    const tag = buffer.subarray(12, 28);
    const encrypted = buffer.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", cookieSecret(), iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return JSON.parse(decrypted.toString("utf8")) as T;
  } catch {
    return null;
  }
}

function cookieSecret() {
  const secret = process.env.AUTH0_SECRET;
  if (!secret) {
    throw new Error("AUTH0_SECRET is required.");
  }

  return crypto.createHash("sha256").update(secret).digest();
}

function base64Url(buffer: Buffer) {
  return buffer.toString("base64url");
}

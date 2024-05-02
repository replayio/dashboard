import { createHash } from "crypto";
import { closeAuthRequest } from "@/graphql/queries/closeAuthRequest";

// the functions in this file were copied from packages/replayio/src/utils/
// in the replay-cli repo and slightly modified

export function hashValue(value: string) {
  const hash = createHash("sha256");
  hash.write(value);
  return hash.digest("hex").toString();
}

export async function pollForAuthentication(key: string) {
  let refreshToken: string | undefined = undefined;
  while (!refreshToken) {
    try {
      refreshToken = await fetchRefreshTokenFromGraphQLOrThrow(key);
    } catch (error: any) {
      if (error?.id === "missing-request") {
        await timeoutAfter(2_500);
      } else {
        throw error;
      }
    }
  }

  const accessToken = await refreshAccessTokenOrThrow(refreshToken);

  return { accessToken, refreshToken };
}

async function fetchRefreshTokenFromGraphQLOrThrow(key: string) {
  try {
    return await closeAuthRequest(key);
  } catch (error: any) {
    if (error.message === "Authentication request does not exist") {
      throw {
        id: "missing-request",
      };
    }
    throw {
      id: "close-graphql-error",
      message: error.message,
    };
  }
}

async function refreshAccessTokenOrThrow(refreshToken: string): Promise<string> {
  const resp = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      audience: "https://api.replay.io",
      scope: "openid profile",
      grant_type: "refresh_token",
      client_id: process.env.AUTH0_CLIENT_ID,
      refresh_token: refreshToken,
    }),
  });

  const json: any = await resp.json();

  if (json.error) {
    throw new AuthenticationError("auth0-error", json.error);
  }

  if (!json.access_token) {
    throw new AuthenticationError("no-access-token", "No access token in response");
  }

  return json.access_token as string;
}

type TimeoutResult = { timedOutAfter: number };

async function timeoutAfter(
  duration: number,
  throwOnTimeout: boolean = false
): Promise<TimeoutResult> {
  const startTime = Date.now();
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      const endTime = Date.now();

      if (throwOnTimeout) {
        reject(new Error(`Timed out after ${endTime - startTime}ms`));
      } else {
        resolve({ timedOutAfter: endTime - startTime });
      }
    }, duration)
  );
}

class AuthenticationError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);

    this.code = code;
  }
}

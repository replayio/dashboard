import { URLS } from "@/constants";
import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * DEV ONLY — GET /api/dev/register-user
 *
 * Reads the current Auth0 session and calls ensureUserForAuth on the local
 * backend to create the user row in the dev DB. Equivalent to what the
 * Auth0 Post-Login Action does in production (which can't reach localhost).
 *
 * Visit this URL while logged in as the user you want to register.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).end();
  }

  const session = await getSession(req, res);
  if (!session) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const { sub, email, name, nickname, picture } = session.user;

  const body = JSON.stringify({
    query: `mutation EnsureUser($authId: String!, $email: String!, $name: String!, $nickname: String, $picture: String, $secret: String!) {
      ensureUserForAuth(input: { authId: $authId, email: $email, name: $name, nickname: $nickname, picture: $picture, secret: $secret }) {
        id
      }
    }`,
    variables: {
      authId: sub,
      email: email ?? "",
      name: name ?? email ?? "",
      nickname: nickname ?? null,
      picture: picture ?? null,
      secret: "supersecretpassword123",
    },
  });

  const gqlRes = await fetch(`${URLS.api}/v1/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const data = await gqlRes.json();

  if (data.errors) {
    return res.status(500).json({ error: data.errors[0]?.message, sub, email });
  }

  return res.status(200).json({
    ok: true,
    id: data.data?.ensureUserForAuth?.id,
    sub,
    email,
  });
}

import { getCurrentUser } from "@/graphql/queries/getCurrentUser";
import { getAccessTokenFromRequest } from "@/utils/intakeAuthServer";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

const SECRET = process.env.INTERCOM_IDENTITY_VERIFICATION_SECRET;

/** Per Intercom's recommendation; short-lived to limit the impersonation window. */
const EXPIRES_IN_SECONDS = 60 * 60;

type Body =
  | { jwt: string; expiresAt: number }
  | { jwt: null }
  | { error: string };

/**
 * Issues an HS256 JWT identifying the viewer to the Intercom Messenger.
 * The Messenger sends this as `intercom_user_jwt` so Intercom can verify
 * the user is who the page claims they are (Settings → Channels → Messenger
 * → Security → "Secure for web").
 *
 * Returns `{ jwt: null }` (200) — letting the Messenger boot without IV — when:
 *   - the viewer is not signed in, or
 *   - identity verification is not configured (fine for local/staging; the user
 *     is still identified to Intercom, just not cryptographically verified).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Body>) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "private, no-store");

  if (!SECRET) {
    return res.status(200).json({ jwt: null });
  }

  const accessToken = getAccessTokenFromRequest(req);
  if (!accessToken) {
    return res.status(200).json({ jwt: null });
  }

  let user: Awaited<ReturnType<typeof getCurrentUser>> = null;
  try {
    user = await getCurrentUser(accessToken, null);
  } catch {
    return res.status(200).json({ jwt: null });
  }

  if (!user) {
    return res.status(200).json({ jwt: null });
  }

  const token = jwt.sign(
    {
      user_id: user.id,
      email: user.email,
    },
    SECRET,
    { algorithm: "HS256", expiresIn: EXPIRES_IN_SECONDS }
  );

  return res.status(200).json({
    jwt: token,
    expiresAt: Math.floor(Date.now() / 1000) + EXPIRES_IN_SECONDS,
  });
}

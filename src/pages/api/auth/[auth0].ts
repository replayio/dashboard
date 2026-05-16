import { COOKIES } from "@/constants";
import {
  handleAuth0ConnectAccount,
  handleAuth0ConnectAccountCallback,
  githubConnection,
  githubScopes,
} from "@/lib/githubConnectedAccount";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import { handleAuth, handleCallback, handleLogin, handleLogout } from "@auth0/nextjs-auth0";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default handleAuth({
  connect: handleAuth0ConnectAccount,

  login: (req: NextApiRequest, res: NextApiResponse) => {
    const { origin, returnTo } = handleOriginAndReturnTo(req, res);
    const connection = getValueFromArrayOrString(req.query.connection);
    const connectionScope =
      connection === githubConnection() ? githubScopes().join(" ") : undefined;

    return handleLogin(req, res, {
      authorizationParams: {
        audience: "https://api.replay.io",
        code_challenge_method: "S256",
        response_type: "code" as "code",
        scope: "openid offline_access",
        prompt: getValueFromArrayOrString(req.query.prompt),
        connection,
        connection_scope: connectionScope,
        redirect_uri: `${origin}/api/auth/callback`,
        // ad attribution - forwarded to auth0 /authorize as custom query
        // params so the post-login action can read them from
        // event.request.query and pass to ensureUserForAuth.
        ...pickAdAttributionParams(req),
      },
      returnTo,
    });
  },

  logout: (req: NextApiRequest, res: NextApiResponse) => {
    const { returnTo } = handleOriginAndReturnTo(req, res);
    return handleLogout(req, res, { returnTo });
  },

  callback: async (req: NextApiRequest, res: NextApiResponse) => {
    if (await handleAuth0ConnectAccountCallback(req, res)) {
      return;
    }

    if (req.query.error_description) {
      const searchParams = new URLSearchParams({
        type: "auth",
        message: getValueFromArrayOrString(req.query.error_description)!,
      });
      res.redirect(`/browser/error?${searchParams.toString()}`);
    } else {
      return handleCallback(req, res, {
        redirectUri: req.cookies[COOKIES.authReturnTo],
      });
    }
  },
});

// extracts ad-attribution query params that the devtools /login handler
// forwarded here. these become custom /authorize query params that the
// auth0 post-login action reads and passes to the backend.
const AD_ATTR_KEYS = [
  "li_fat_id",
  "twclid",
  "rdt_cid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

function pickAdAttributionParams(req: NextApiRequest) {
  const out: Record<string, string> = {};
  for (const k of AD_ATTR_KEYS) {
    const v = getValueFromArrayOrString(req.query[k]);
    if (v) out[k] = v;
  }
  return out;
}

// This app also handles auth for the domain of the devtools app.
function handleOriginAndReturnTo(req: NextApiRequest, res: NextApiResponse) {
  const origin = getValueFromArrayOrString(req.query.origin) || process.env.AUTH0_BASE_URL!;
  const returnTo = origin + (getValueFromArrayOrString(req.query.returnTo) || "/");
  const redirectUri = `${origin}/api/auth/callback`;

  // We'll need to pass the origin-specific redirect URI to the callback handler, otherwise
  // Auth0 will reject login requests for the domains of other apps.
  // We store it in a cookie so that it's available when the callback handler is called.
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(COOKIES.authReturnTo, redirectUri, {
      secure: origin.startsWith("https://"),
      httpOnly: true,
      path: "/",
      maxAge: 5 * 60 * 1000,
      sameSite: "lax",
    })
  );

  return { origin, returnTo };
}

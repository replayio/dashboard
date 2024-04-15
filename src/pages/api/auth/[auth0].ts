import { COOKIES } from "@/constants";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import { handleAuth, handleCallback, handleLogin, handleLogout } from "@auth0/nextjs-auth0";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default handleAuth({
  login: (req: NextApiRequest, res: NextApiResponse) => {
    const { origin, returnTo } = handleOriginAndReturnTo(req, res);
    handleLogin(req, res, {
      authorizationParams: {
        audience: "https://api.replay.io",
        code_challenge_method: "S256",
        response_type: "code" as "code",
        scope: "openid profile offline_access",
        prompt: getValueFromArrayOrString(req.query.prompt),
        connection: getValueFromArrayOrString(req.query.connection),
        redirect_uri: `${origin}/api/auth/callback`,
      },
      returnTo
    });
  },

  logout: (req: NextApiRequest, res: NextApiResponse) => {
    const { returnTo } = handleOriginAndReturnTo(req, res);
    handleLogout(req, res, { returnTo });
  },

  callback: (req: NextApiRequest, res: NextApiResponse) => {
    if (req.query.error_description) {
      const searchParams = new URLSearchParams({
        type: "auth",
        message: getValueFromArrayOrString(req.query.error_description)!,
      });
      res.redirect(`/browser/error?${searchParams.toString()}`);
    } else {
      handleCallback(req, res, { redirectUri: req.cookies[COOKIES.authReturnTo] });
    }
  },
});

// This app also handles auth for the domain of the devtools app.
function handleOriginAndReturnTo(req: NextApiRequest, res: NextApiResponse) {
  const origin = getValueFromArrayOrString(req.query.origin) || process.env.AUTH0_BASE_URL!;

  const returnTo = origin + (getValueFromArrayOrString(req.query.returnTo) || "/");

  // We'll need to pass returnTo to the callback handler, otherwise
  // Auth0 will reject login requests for the domains of other apps.
  // We store it in a cookie so that it's available when the callback handler is called.
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(COOKIES.authReturnTo, returnTo, {
      secure: origin.startsWith("https://"),
      httpOnly: true,
      path: "/",
      maxAge: 5 * 60 * 1000,
    })
  );
  
  return { origin, returnTo };
}

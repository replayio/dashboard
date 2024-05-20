import { Cookies, URLS } from "@/constants";
import { fulfillAuthRequest } from "@/graphql/queries/fulfillAuthRequest";
import { initAuthRequest } from "@/graphql/queries/initAuthRequest";
import { NextApiRequest } from "@/pages/types";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import cookie from "cookie";
import type { NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest<{
    key: string;
    source?: string;
  }>,
  res: NextApiResponse
) {
  const key = getValueFromArrayOrString(req.query.key);
  const source = getValueFromArrayOrString(req.query.source) || "browser";

  try {
    if (key) {
      const { id } = await initAuthRequest(key, source);

      res.setHeader(
        "Set-Cookie",
        cookie.serialize(Cookies.browserAuth, id, {
          secure: URLS.app.startsWith("https://"),
          httpOnly: true,
          path: "/",
          maxAge: 5 * 60 * 1000,
          sameSite: "lax",
        })
      );

      res.redirect("/login?returnTo=/api/browser/auth");
    } else {
      const browserAuth = req.cookies[Cookies.browserAuth];

      if (!browserAuth) {
        res.statusCode = 400;
        res.statusMessage = "Missing cookie";
        res.send("");

        return;
      }

      const session = await getSession(req, res);
      if (session?.refreshToken) {
        const source = await fulfillAuthRequest(browserAuth, session.refreshToken);

        // We have just sent our refresh token to the Replay CLI or Browser,
        // which will use it to get new access and refresh tokens.
        // Due to refresh token rotation, this refresh token will be invalidated
        // after a short reuse interval (currently configured to be 2 minutes),
        // so when our access token expires we wouldn't be able to refresh it
        // and the user would have to login again.
        // So we use the refresh token now to get new refresh and access tokens
        // as long as we still can.
        await getAccessToken(req, res, { refresh: true });

        res.redirect(`/browser/authenticated?source=${source}`);
      } else {
        res.statusCode = 400;
        res.statusMessage = "Missing refresh token";
        res.send("");
      }
    }
  } catch (e: any) {
    console.error(e);

    res.statusCode = 500;
    res.send("");
  }
}

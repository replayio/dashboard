import { COOKIES, URLS } from "@/constants";
import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { initAuthRequest } from "@/graphql/queries/initAuthRequest";
import { fulfillAuthRequest } from "@/graphql/queries/fulfillAuthRequest";

const getQueryValue = (query: string | string[] | undefined) => (Array.isArray(query) ? query[0] : query);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = getQueryValue(req.query.key);
  const source = getQueryValue(req.query.source) || "browser";

  try {
    if (key) {
      const { id } = await initAuthRequest(key, source);

      res.setHeader(
        "Set-Cookie",
        cookie.serialize(COOKIES.browserAuth, id, {
          secure: URLS.app.startsWith("https://"),
          httpOnly: true,
          path: "/",
          maxAge: 5 * 60 * 1000,
        })
      );

      res.redirect("/login?returnTo=/api/browser/auth");
    } else {
      const browserAuth = req.cookies[COOKIES.browserAuth];

      if (!browserAuth) {
        res.statusCode = 400;
        res.statusMessage = "Missing cookie";
        res.send("");

        return;
      }

      const session = await getSession(req, res);
      if (session?.refreshToken) {
        const source = await fulfillAuthRequest(browserAuth, session.refreshToken);
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
};

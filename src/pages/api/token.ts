import { COOKIES } from "@/constants";
import { AccessTokenCookie } from "@/utils/cookie";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    res.status(200).send(accessToken);
  } catch {
    // An active auth0 session should always take precedence
    const accessTokenCookie = req.cookies[COOKIES.accessToken];
    if (accessTokenCookie) {
      const tokenWithSource: AccessTokenCookie = JSON.parse(accessTokenCookie);
      if (typeof tokenWithSource === "object" && tokenWithSource.token) {
        res.status(200).send(tokenWithSource.token);
        return;
      }
    }

    res.status(401).send("Not logged in");
  }
}

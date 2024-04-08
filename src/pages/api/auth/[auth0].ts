import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import { handleAuth, handleCallback, handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default handleAuth({
  login: (req: NextApiRequest, res: NextApiResponse) => {
    handleLogin(req, res, {
      authorizationParams: {
        audience: "https://api.replay.io",
        code_challenge_method: "S256",
        response_type: "code" as "code",
        scope: "openid profile offline_access",
        prompt: getValueFromArrayOrString(req.query.prompt),
        connection: getValueFromArrayOrString(req.query.connection),
      }
    });
  },
  callback: (req: NextApiRequest, res: NextApiResponse) => {
    if (req.query.error_description) {
      const searchParams = new URLSearchParams({
        type: "auth",
        message: getValueFromArrayOrString(req.query.error_description)!,
      });
      res.redirect(`/browser/error?${searchParams.toString()}`);
    } else {
      handleCallback(req, res);
    }
  },
});

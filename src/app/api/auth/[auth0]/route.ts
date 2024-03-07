import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: "https://api.replay.io",
      code_challenge_method: "S256",
      response_type: "code",
      scope: "openid profile offline_access",
    },
  }),
});

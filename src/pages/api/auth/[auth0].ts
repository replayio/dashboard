import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

const authorizationParams = {
  audience: "https://api.replay.io",
  code_challenge_method: "S256",
  response_type: "code" as "code",
  scope: "openid profile offline_access",
};

export default handleAuth({
  login: handleLogin({ authorizationParams }),
  switchAccount: handleLogin({
    authorizationParams: {
      ...authorizationParams,
      prompt: "login",
    },
  }),
});

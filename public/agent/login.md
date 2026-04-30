# Replay Dashboard — Login

**Route:** `/login`

Authentication is handled with **Auth0** via Next.js Auth0 SDK (`/api/auth/*`).

## Hints for agents

- OIDC discovery for the tenant is linked from this site at `/.well-known/openid-configuration` (redirects to the Auth0 issuer).
- Protected APIs use the resource identifier `https://api.replay.io` (see `/.well-known/oauth-protected-resource`).
- User-facing documentation: https://docs.replay.io

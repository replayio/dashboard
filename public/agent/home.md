# Replay Dashboard (home)

**Canonical URL:** Derived from deployment (see `APP_URL` / `NEXT_PUBLIC_VERCEL_URL`).

The Replay **Dashboard** is the authenticated web application for Replay.io: teams, test runs, recordings, and settings. Most routes require login via Auth0.

## Entry points

- `/login` — Sign in
- `/home` — Main dashboard (after auth)
- `/releases` — Release / download metadata for the Replay browser
- `/recording/` — Replay **DevTools** (recording viewer & upload); proxied from the devtools app on the same host

## API

- GraphQL: `{API_URL}/v1/graphql` (default API host `https://api.replay.io`; see app constants).
- Human documentation: https://docs.replay.io

## Agent discovery (this deployment)

- `/.well-known/api-catalog` — API catalog (RFC 9727 linkset)
- `/.well-known/openid-configuration` — Redirects to Auth0 OIDC discovery
- `/.well-known/oauth-protected-resource` — Resource metadata for `https://api.replay.io`
- `/.well-known/agent-skills/index.json` — Declared skills for this repo
- `/robots.txt`, `/sitemap.xml`

Request `Accept: text/markdown` on supported pages for a markdown mirror of key routes.

# Replay Dashboard — Agent context

This skill summarizes the Replay **Dashboard** web app for AI agents.

## What this repo is

- Next.js (Pages Router) frontend for Replay.io: recordings, tests, teams, billing integration, browser extension flows.
- Auth: Auth0; GraphQL API at `https://api.replay.io/v1/graphql` (configurable via `NEXT_PUBLIC_API_URL`).

## Discovery on the running site

Check the deployment’s:

- `/robots.txt` — Crawl policy and AI crawler blocks
- `/sitemap.xml` — Canonical URLs
- `/.well-known/api-catalog` — `application/linkset+json`
- `/.well-known/oauth-protected-resource` — OAuth resource metadata
- `/.well-known/agent-skills/index.json` — Skills index with digests

## Markdown mirrors

Send `Accept: text/markdown` for `/`, `/home`, `/login`, or `/releases` to receive static mirrors from `/agent/*.md`.

## Security

Do not assume unauthenticated access to `/team/*`, `/user/*`, or `/api/*` beyond documented public endpoints. Prefer official docs and GraphQL schema for API work.

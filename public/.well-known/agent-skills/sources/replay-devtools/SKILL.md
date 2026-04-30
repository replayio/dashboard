# Replay DevTools (web)

## Summary

The **Replay DevTools** app is the Next.js frontend for opening Replay **recordings** in the browser: debugger, console, elements, network, and React/Redux tooling. Repository: `recordreplay-devtools` (often checked out as `devtools`).

## URLs

- **Behind the dashboard (same origin):** `/recording/` — the dashboard rewrites `/recording/:path*` to the devtools deployment (`DEVTOOLS_URL` in dashboard config).
- **Standalone devtools deploy:** served with `basePath: "/recording"`; non-`/recording` paths may rewrite to `DASHBOARD_URL` (see devtools `next.config.js`).

## Stack (high level)

- Next.js (Pages Router), Apollo Client, Redux Toolkit, `@replayio/protocol`.
- Communicates with Replay backend via GraphQL and the record/replay protocol (see [Recording domain docs](https://static.replay.io/protocol/tot/Recording/)).

## When to use this skill

- Agents need to know where the **recording viewer** lives relative to the dashboard.
- Agents are integrating with **protocol** or **debugger** concepts tied to the web UI.

## Source of truth

Implementation details and file layout live in the devtools repo; this skill is a **routing and discovery** hint for agent indexes on the dashboard host.

# Replay DevTools (recording viewer)

**Canonical path on this host:** `/recording/`  

This URL is **proxied** from the dashboard to the **Replay DevTools** Next.js app (`recordreplay-devtools` in the devtools repo). That app uses `basePath: "/recording"` so paths align when embedded behind the dashboard.

## What it is

- Web UI to **view and debug** Replay recordings (time-travel debugger, Redux/React devtools integration, network monitor, etc.).
- Built on the **Record Replay Protocol** (see [Recording domain](https://static.replay.io/protocol/tot/Recording/) and [replay.io/protocol](https://replay.io/protocol)).
- **Upload** UI: `/recording/upload` (and dynamic recording routes such as `/recording/{id}`).

## Data & auth

- Uses the same **GraphQL** API as the dashboard (`/v1/graphql` on the configured API host).
- Most flows expect an authenticated Replay session (Auth0), same as the main dashboard.

## Related

- Product docs: https://docs.replay.io  
- Dashboard entry points: `/home`, `/login`; see also `/.well-known/api-catalog` on this host for a linkset that includes this anchor.

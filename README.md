# dashboard

Replay library hosted at [app.replay.io](https://app.replay.io)

## Getting started

```sh
# Setup environment variables
cp .env.sample .env.local

# Fill in .env.local (see Configuration below)

# Install dependencies
pnpm install

# Run dev server (localhost:8080)
pnpm dev
```

## Configuration

The server reads environment variables from different places depending on where it is running:

- The local server loads values from the `.env.local` file
- Preview and production deployments load values from [Vercel Environment variables](https://vercel.com/replayio/dashboard/settings/environment-variables)

Automated scripts that build preview and production deployments are configured using [GitHub secrets](https://github.com/replayio/dashboard/settings/secrets/actions).

The specific URLs (hosts and paths) that support authentication are configured in the [Auth0 "Replay" project](https://manage.auth0.com/dashboard/us/webreplay/applications/4FvFnJJW4XlnUyrXQF8zOLw6vNAH1MAo/settings).

The values required by the local `.env.local` file can be copied out of either [1Password](https://team-replay.1password.com/) or [Vercel Environment variables](https://vercel.com/replayio/dashboard/settings/environment-variables). When in doubt, reach out to one of the previous [contributors](https://github.com/replayio/dashboard/graphs/contributors).

## Running the server

In most cases, Library development can be done against the production version of [Replay DevTools](https://github.com/replayio/devtools/). However you can also run a local version of both Dashboard and DevTools.

### Developing against production

To run Dashboard locally, paired with the production [DevTools](https://github.com/replayio/devtools) project:

```sh
pnpm dev:prod
```

At this point the Dashboard will be accessible at [localhost:8080](http://localhost:8080/) and will open recordings using the production deployment of the DevTools application.

### Local development

To run both the DevTools and Dashboard projects locally:

```sh
# Dashboard root (this project)
pnpm dev:local

# DevTools root
yarn dev:local
```

At this point the Dashboard will be accessible at [localhost:8080](http://localhost:8080/) but it will not load recordings. To be able to test the end-to-end interaction of both apps, use [localhost:8081](http://localhost:8081/). It will serve both Dashboard and DevTools routes.

## Full-Stack Local Development (Billing & Subscriptions)

Testing billing flows end-to-end requires three services running simultaneously. This section covers how to wire them together.

### Services

| Service               | Repo               | Port | Purpose                        |
| --------------------- | ------------------ | ---- | ------------------------------ |
| GraphQL API           | `backend`          | 3001 | Database, subscriptions, plans |
| Dashboard (this repo) | `dashboard`        | 8080 | UI                             |
| Webhook relay         | `replay-endpoints` | 3002 | Stripe webhook processing      |

Start them in this order: backend → replay-endpoints → dashboard.

### 1. Start the backend GraphQL API

See the [backend README](../backend/README.md) for full setup instructions (PostgreSQL, schema migration, seed). The short version once the DB is ready:

```bash
# In the backend repo
npx ts-node --transpile-only src/graphql-api/main.ts
```

Confirm it's up at `http://localhost:3001/v1/graphql`.

### 2. Start replay-endpoints with Stripe webhook forwarding

See the [replay-endpoints README](../replay-endpoints/README.md) for full setup. Once configured:

```bash
# In the replay-endpoints repo — starts the server on port 3002
node --experimental-transform-types index.ts

# In a separate terminal — forwards Stripe events to the local server
stripe listen --forward-to http://localhost:3002/billing
```

Copy the `whsec_...` secret printed by `stripe listen` into `STRIPE_ENDPOINT_SECRET` in `replay-endpoints/.env`.

### 3. Configure .env.local for local backend

In this repo's `.env.local`, set the API URL to the local backend instead of production:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

All other values (`AUTH0_*`, `STRIPE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `FRONTEND_API_SECRET`) should be filled in from 1Password or Vercel environment variables. The Stripe keys should be test-mode (`pk_test_...` / `sk_test_...`).

`STRIPE_WEBHOOK_SECRET` in `.env.local` is used by the dashboard's own `/api/stripe/*` routes. It should match the `whsec_...` secret from `stripe listen` (same secret used by replay-endpoints).

### 4. Start the dashboard

```bash
pnpm dev
```

Open [localhost:8080](http://localhost:8080/). Sign in with one of the seed users (e.g. `strider.wilson@replay.io`). Auth0 will redirect back to localhost after authentication.

### Local secrets reference

The backend hardcodes several secrets in `src/graphql-api/secrets.ts` for local dev. These are not environment variables — they are fixed values that the other repos must match:

| Secret                     | Value                                                      |
| -------------------------- | ---------------------------------------------------------- |
| `FRONTEND_API_SECRET`      | `omNN-4K*GiHhqUH8-7mUB6Ecz8ZPBtcqH68V`                     |
| `MANUAL_ADMIN_API_SECRET`  | `secret used for manual operations run by the Replay org`  |
| `BACKEND_ADMIN_API_SECRET` | `backend secret that we use for backend-only graphQL APIs` |

These are dev-only values committed to the repo. Do not use them in production.

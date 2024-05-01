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

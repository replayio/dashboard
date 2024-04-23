# dashboard

Standalone Replay dashboard

## Getting started

```sh
# Setup environment variables
cp .env.sample .env.local

# Install dependencies
pnpm install

# Run dev server (localhost:8080)
pnpm dev
```

## Local development

To run both the DevTools and Dashboard projects locally:

```sh
# Dashboard root (this project)
DEVTOOLS_URL=http://localhost:8081 pnpm dev -- -p 8080

# DevTools root
DASHBOARD_URL=http://localhost:8080 npm exec next dev -- -p 8081
```

At this point the Dashboard will be accessible at [localhost:8080](http://localhost:8080/) but it will not load recordings. To be able to test the end-to-end interaction of both apps, use [localhost:8081](http://localhost:8081/). It will serve both Dashboard and DevTools routes.

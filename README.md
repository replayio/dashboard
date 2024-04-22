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
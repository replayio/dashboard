def dashboard(dashboard_directory=config.main_dir, api='https://api.replay.io/v1/graphql', resource_deps=[]):
  local_resource(
    "dashboard deps",
    os.path.join(config.main_dir, "scripts/bin/corepack") + " pnpm install",
    deps=["package.json"],
    dir=dashboard_directory,
    allow_parallel=True
  )
  local_resource(
    "dashboard dev server",
    serve_cmd=os.path.join(config.main_dir, "scripts/bin/pnpm") + " dev -- -p 8080",
    deps=[],
    resource_deps=["dashboard deps"] + resource_deps,
    serve_dir=dashboard_directory,
    serve_env={
        "DEVTOOLS_URL": "http://localhost:8081",
        "NEXT_PUBLIC_API_URL": api,
    }
  )

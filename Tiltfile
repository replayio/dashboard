def dashboard(working_directory=config.main_dir, resource_deps=[]):
  local_resource(
    "dashboard deps",
    "pnpm install",
    deps=["package.json"],
    dir=working_directory,
    allow_parallel=True
  )
  local_resource(
    "dashboard dev server",
    serve_cmd=" pnpm dev -- -p 8080",
    deps=[],
    resource_deps=["dashboard deps"] + resource_deps,
    serve_dir=working_directory,
    serve_env={"DEVTOOLS_URL": "http://localhost:8081"}
  )

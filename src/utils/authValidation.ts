/**
 * Build the set of origins that are allowed to use this app's auth endpoints.
 * Includes the dashboard itself and the devtools app.
 * Set AUTH0_ALLOWED_ORIGINS (comma-separated) to add additional origins.
 */
export function getAllowedAuthOrigins(): Set<string> {
  const origins = new Set<string>();

  if (process.env.AUTH0_BASE_URL) origins.add(process.env.AUTH0_BASE_URL);
  if (process.env.APP_URL) origins.add(process.env.APP_URL);

  const devtoolsUrl = process.env.DEVTOOLS_URL || "https://replay-devtools.vercel.app";
  origins.add(devtoolsUrl);

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    origins.add(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`);
  }

  const extra = process.env.AUTH0_ALLOWED_ORIGINS;
  if (extra) {
    for (const raw of extra.split(",")) {
      const trimmed = raw.trim();
      if (trimmed) origins.add(trimmed);
    }
  }

  return origins;
}

/**
 * Ensure the returnTo query param is a same-origin relative path.
 * Anything that isn't a simple "/" path gets replaced with "/".
 */
export function sanitizeReturnToPath(raw: string | undefined): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
}

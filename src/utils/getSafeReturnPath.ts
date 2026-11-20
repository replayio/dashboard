// resolves a return url against our origin and only lets it through as a path on that origin
export function getSafeReturnPath(
  raw: string | null | undefined,
  origin: string,
  fallback = "/"
): string {
  if (!raw) return fallback;
  try {
    const base = new URL(origin);
    const url = new URL(raw, base);
    const path = url.pathname + url.search + url.hash;
    // a path starting with "//" would be read as another host when it is used as a url again
    if (url.origin !== base.origin || !path.startsWith("/") || path.startsWith("//")) {
      return fallback;
    }
    return path;
  } catch {
    return fallback;
  }
}

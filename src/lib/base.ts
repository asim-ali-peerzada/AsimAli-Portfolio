/**
 * Prefixes an asset path or route with Astro's configured BASE_URL.
 * Supports both root-relative ('/') and subpath deployments (e.g. '/AsimAli-Portfolio/').
 */
export function withBase(path: string): string {
  if (!path) return path;
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:')
  ) {
    return path;
  }

  const rawBase = import.meta.env.BASE_URL ?? '/';
  const cleanBase = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;

  // Handle bare anchors like '#projects'
  if (path.startsWith('#')) {
    return `${cleanBase}/${path}`;
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Avoid double-prefixing if already prefixed
  if (cleanBase && (cleanPath === cleanBase || cleanPath.startsWith(cleanBase + '/'))) {
    return cleanPath;
  }

  return `${cleanBase}${cleanPath}`;
}

/**
 * Resolves a public asset path against Vite's base URL.
 * Works seamlessly across:
 * - Local development ('/')
 * - GitHub Pages subpath ('/SriVenkateswara-Earth-Movers/')
 * - Vercel / custom domains ('/')
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL)
    ? import.meta.env.BASE_URL
    : '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}${cleanPath}`;
}

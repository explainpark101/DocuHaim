/** Scheme prefix for in-app vault note hyperlinks (exact casing for builds). */
export const DOCUHAIM_SCHEME_PREFIX = 'docuhaim://';

/**
 * Normalize a vault storage path from a docuhaim URI body or raw path.
 * - Decode URI components
 * - Convert `\` → `/`
 * - Strip leading `/`
 */
export function normalizeDocuhaimPath(raw: string | null | undefined): string {
  let path = String(raw || '').trim();
  if (!path) return '';
  try {
    path = decodeURIComponent(path);
  } catch {
    // keep raw
  }
  path = path.replace(/\\/g, '/').replace(/^\/+/, '');
  return path;
}

/** True when href uses the `docuhaim://` scheme (case-insensitive). */
export function isDocuhaimHref(href: string | null | undefined): boolean {
  return String(href || '')
    .trim()
    .toLowerCase()
    .startsWith(DOCUHAIM_SCHEME_PREFIX);
}

/**
 * Parse `docuhaim://…` into a vault storage path.
 * Does **not** use URL host parsing — everything after the scheme is the path.
 */
export function parseDocuhaimHref(href: string | null | undefined): string | null {
  const raw = String(href || '').trim();
  if (!isDocuhaimHref(raw)) return null;
  const rest = raw.slice(DOCUHAIM_SCHEME_PREFIX.length);
  const path = normalizeDocuhaimPath(rest);
  return path || null;
}

/**
 * Build `docuhaim://` href from a vault storage path.
 * Encodes each path segment; keeps `/` separators.
 */
export function buildDocuhaimHref(storagePath: string | null | undefined): string {
  const path = normalizeDocuhaimPath(storagePath);
  if (!path) return DOCUHAIM_SCHEME_PREFIX;
  const encoded = path
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');
  return `${DOCUHAIM_SCHEME_PREFIX}${encoded}`;
}

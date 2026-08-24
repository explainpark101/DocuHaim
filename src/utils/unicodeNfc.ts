/**
 * Unicode NFC normalization for vault / upload / download file names.
 * macOS often exposes NFD (decomposed) names via File / File System Access;
 * storage keys and download names must stay on NFC so Korean (and other)
 * names match across platforms.
 */

/** Normalize a single string (file name or free text) to NFC. */
export function normalizeUnicodeNfc(value: string): string {
  const raw = String(value ?? '');
  if (!raw) return raw;
  try {
    return raw.normalize('NFC');
  } catch {
    return raw;
  }
}

/**
 * Normalize each path segment to NFC while preserving `/` structure
 * (and a trailing slash when present).
 */
export function normalizePathToNfc(path: string): string {
  const raw = String(path ?? '');
  if (!raw) return raw;
  const slashNormalized = raw.replace(/\\/g, '/');
  const trailingSlash = slashNormalized.endsWith('/') && slashNormalized !== '/';
  const parts = slashNormalized.split('/');
  const nfcParts = parts.map((part) => (part ? normalizeUnicodeNfc(part) : part));
  const joined = nfcParts.join('/');
  if (trailingSlash && !joined.endsWith('/')) return `${joined}/`;
  return joined;
}

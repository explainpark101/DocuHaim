/** True when the image src is already loadable without storage lookup. */
export function isInlineOrRemoteImageSrc(src: string): boolean {
  const value = String(src || '').trim();
  if (!value) return false;
  return /^(https?:|data:|blob:|\/\/)/i.test(value);
}

/**
 * Decode a vault/storage path or URL. Preserves spaces in the path.
 * Does not strip markdown image titles — use `decodeMarkdownImageSrc` for `![](dest)`.
 */
export function decodeStoragePath(src: string): string {
  const raw = String(src || '').trim();
  const unwrapped = raw.replace(/^</, '').replace(/>$/, '');
  if (!unwrapped) return '';
  try {
    return decodeURIComponent(unwrapped);
  } catch {
    return unwrapped;
  }
}

/**
 * Decode a markdown image destination.
 * Supports optional title after whitespace (`path "title"`) and angle-bracket
 * destinations that may contain spaces (`<path with spaces.png>`).
 */
export function decodeMarkdownImageSrc(src: string): string {
  return decodeStoragePath(extractMarkdownImageDestinationSrc(src));
}

/**
 * Pull the destination URL/path out of a markdown image `(...)` destination,
 * without decoding. Handles `<angle bracket>` form and optional titles.
 */
export function extractMarkdownImageDestinationSrc(destination: string): string {
  const trimmed = String(destination || '').trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('<')) {
    const end = trimmed.indexOf('>');
    if (end > 0) return trimmed.slice(1, end).trim();
  }
  return trimmed.split(/\s+/)[0] || '';
}

export function isStorageImageSrc(src: string): boolean {
  const value = decodeStoragePath(src);
  if (!value) return false;
  if (isInlineOrRemoteImageSrc(value)) return false;
  if (/^(#|mailto:|tel:|javascript:)/i.test(value)) return false;
  return true;
}

function noteDirectoryPrefix(notePath: string | null | undefined): string {
  const normalized = String(notePath || '').replace(/^\/+/, '');
  const lastSlash = normalized.lastIndexOf('/');
  if (lastSlash < 0) return '';
  return normalized.slice(0, lastSlash + 1);
}

/**
 * Resolve a markdown image destination to a vault/storage object key.
 * `./pictures/a.png` next to `docs/note.md` becomes `docs/pictures/a.png`.
 * `/pictures/a.png` is treated as vault-root relative.
 * Paths may contain spaces (cover / wiki vault keys).
 */
export function resolveStorageImagePath(
  src: string,
  currentNotePath?: string | null,
): string | null {
  const decoded = decodeStoragePath(src);
  if (!decoded || !isStorageImageSrc(decoded)) return null;

  if (decoded.startsWith('/')) {
    return decoded.replace(/^\/+/, '') || null;
  }

  // Vault-root image keys (wiki / cover uploads) — do not resolve relative to the note.
  const normalized = decoded.replace(/^\/+/, '');
  if (normalized.startsWith('.images/')) {
    return normalized;
  }

  const dir = noteDirectoryPrefix(currentNotePath);
  try {
    const resolved = new URL(decoded, `https://note.local/${dir}`);
    return decodeURIComponent(resolved.pathname.replace(/^\/+/, '')) || null;
  } catch {
    return `${dir}${decoded.replace(/^\.\//, '')}`.replace(/\/{2,}/g, '/') || null;
  }
}

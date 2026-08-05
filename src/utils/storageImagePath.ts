/** True when the image src is already loadable without storage lookup. */
export function isInlineOrRemoteImageSrc(src: string): boolean {
  const value = String(src || '').trim();
  if (!value) return false;
  return /^(https?:|data:|blob:|\/\/)/i.test(value);
}

export function decodeMarkdownImageSrc(src: string): string {
  const raw = String(src || '').trim().split(/\s+/)[0] || '';
  const unwrapped = raw.replace(/^</, '').replace(/>$/, '');
  try {
    return decodeURIComponent(unwrapped);
  } catch {
    return unwrapped;
  }
}

export function isStorageImageSrc(src: string): boolean {
  const value = decodeMarkdownImageSrc(src);
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
 */
export function resolveStorageImagePath(
  src: string,
  currentNotePath?: string | null,
): string | null {
  const decoded = decodeMarkdownImageSrc(src);
  if (!decoded || !isStorageImageSrc(decoded)) return null;

  if (decoded.startsWith('/')) {
    return decoded.replace(/^\/+/, '') || null;
  }

  const dir = noteDirectoryPrefix(currentNotePath);
  try {
    const resolved = new URL(decoded, `https://note.local/${dir}`);
    return decodeURIComponent(resolved.pathname.replace(/^\/+/, '')) || null;
  } catch {
    return `${dir}${decoded.replace(/^\.\//, '')}`.replace(/\/{2,}/g, '/') || null;
  }
}

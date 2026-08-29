export type PreviewHrefKind = 'hash' | 'external' | 'app';

export type PreviewHrefResolution = {
  kind: PreviewHrefKind;
  href: string;
  /** App-relative path for in-app navigation (`/view/...`, `/chat`, …). */
  pathname?: string;
  hash?: string;
  search?: string;
  /** Storage path when this is a `/view/...` note route. */
  viewPath?: string;
};

function appBasePrefix(): string {
  return (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '';
}

function stripAppBase(pathname: string): string {
  const base = appBasePrefix();
  let next = pathname || '/';
  if (base && (next === base || next.startsWith(`${base}/`))) {
    next = next.slice(base.length) || '/';
  }
  if (!next.startsWith('/')) next = `/${next}`;
  return next;
}

function decodePath(path: string): string {
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

export function parseViewPathFromAppPathname(pathname: string): string | null {
  const normalized = stripAppBase(pathname);
  const idx = normalized.indexOf('/view/');
  if (idx >= 0) {
    const rest = normalized.slice(idx + '/view/'.length);
    return rest ? decodePath(rest) : null;
  }
  return null;
}

/** Storage path from `/export-pdf/<path>` (same encoding as `/view/<path>`). */
export function parseExportPdfPathFromAppPathname(pathname: string): string | null {
  const normalized = stripAppBase(pathname);
  const idx = normalized.indexOf('/export-pdf/');
  if (idx >= 0) {
    const rest = normalized.slice(idx + '/export-pdf/'.length);
    return rest ? decodePath(rest) : null;
  }
  return null;
}

export function isExportPdfAppPathname(pathname: string): boolean {
  const normalized = stripAppBase(pathname);
  return normalized === '/export-pdf' || normalized.startsWith('/export-pdf/');
}

/** App pathname for print preview of a storage note (`/export-pdf/...`). */
export function exportPdfPathnameForStoragePath(storagePath: string | null | undefined): string {
  const p = String(storagePath || '').replace(/^\/+/, '');
  return p ? `/export-pdf/${p}` : '/export-pdf';
}

/** Open-note path from either `/view/...` or `/export-pdf/...`. */
export function parseOpenNotePathFromAppPathname(pathname: string): string | null {
  return (
    parseExportPdfPathFromAppPathname(pathname) ?? parseViewPathFromAppPathname(pathname)
  );
}

export function isChatAppPathname(pathname: string): boolean {
  const normalized = stripAppBase(pathname);
  return normalized === '/chat' || normalized.endsWith('/chat');
}

export function isSettingsAppPathname(pathname: string): boolean {
  const normalized = stripAppBase(pathname);
  return normalized === '/settings' || normalized.endsWith('/settings');
}

export function isContentSearchAppPathname(pathname: string): boolean {
  const normalized = stripAppBase(pathname);
  return normalized === '/search' || normalized.startsWith('/search?') || normalized.endsWith('/search');
}

/** App pathname for vault content search (`/search`, optional `?q=`). */
export function contentSearchPathname(query?: string | null): string {
  const q = String(query || '').trim();
  if (!q) return '/search';
  return `/search?q=${encodeURIComponent(q)}`;
}

export function resolveRelativeNotePath(currentViewPath: string | null | undefined, href: string): string {
  const currentDir = currentViewPath?.includes('/')
    ? currentViewPath.slice(0, currentViewPath.lastIndexOf('/') + 1)
    : '';
  const resolved = new URL(href, `https://note.local/${currentDir}`);
  return decodePath(resolved.pathname.replace(/^\/+/, ''));
}

export function shouldOpenPreviewLinkInNewTab(
  href: string,
  origin = typeof window !== 'undefined' ? window.location?.origin || '' : '',
): boolean {
  const raw = String(href || '').trim();
  if (!raw || raw.startsWith('#')) return false;
  if (!/^https?:\/\//i.test(raw)) return false;
  try {
    const url = new URL(raw);
    if (origin && url.origin === origin) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Classify a preview hyperlink for in-app navigation vs new tab.
 */
export function resolvePreviewHref(
  href: string,
  options: {
    currentViewPath?: string | null;
    origin?: string;
  } = {},
): PreviewHrefResolution {
  const raw = String(href || '').trim();
  if (!raw || raw.startsWith('#')) {
    return { kind: 'hash', href: raw };
  }
  if (/^(mailto:|tel:|javascript:)/i.test(raw)) {
    return { kind: 'external', href: raw };
  }

  const origin =
    options.origin ||
    (typeof window !== 'undefined' ? window.location?.origin : '') ||
    '';

  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw);
      if (origin && url.origin !== origin) {
        return { kind: 'external', href: raw };
      }
      const pathname = stripAppBase(url.pathname || '/');
      const viewPath = parseViewPathFromAppPathname(pathname);
      return {
        kind: 'app',
        href: raw,
        pathname,
        ...(url.search ? { search: url.search } : {}),
        ...(url.hash ? { hash: url.hash } : {}),
        ...(viewPath ? { viewPath } : {}),
      };
    } catch {
      return { kind: 'external', href: raw };
    }
  }

  if (raw.startsWith('/')) {
    try {
      const url = new URL(raw, origin || 'https://app.local');
      const pathname = stripAppBase(url.pathname || '/');
      const viewPath = parseViewPathFromAppPathname(pathname);
      return {
        kind: 'app',
        href: raw,
        pathname,
        ...(url.search ? { search: url.search } : {}),
        ...(url.hash ? { hash: url.hash } : {}),
        ...(viewPath ? { viewPath } : {}),
      };
    } catch {
      const pathname = stripAppBase(raw.split(/[?#]/)[0] || '/');
      const viewPath = parseViewPathFromAppPathname(pathname);
      return {
        kind: 'app',
        href: raw,
        pathname,
        ...(viewPath ? { viewPath } : {}),
      };
    }
  }

  const viewPath = resolveRelativeNotePath(options.currentViewPath, raw);
  if (!viewPath) return { kind: 'external', href: raw };
  return {
    kind: 'app',
    href: raw,
    pathname: `/view/${viewPath}`,
    viewPath,
  };
}

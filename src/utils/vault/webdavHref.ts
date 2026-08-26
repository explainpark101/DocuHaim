/** WebDAV XML namespace URIs used by different servers. */
export const DAV_XML_NAMESPACES = ['DAV:', 'urn:ietf:params:xml:ns:dav'] as const;

/**
 * Decode a URL pathname into a slash-separated storage path (no leading/trailing slashes).
 */
export function decodeWebdavPathSegments(pathname: string): string {
  if (!pathname || pathname === '/') return '';
  return pathname
    .replace(/\/+$/, '')
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    })
    .join('/');
}

/**
 * Join a parent storage directory key with a direct child key from PROPFIND.
 */
export function joinWebdavStorageKey(parentDir: string, childKey: string): string {
  const parent = String(parentDir || '').replace(/\/?$/, '/');
  const child = String(childKey || '').replace(/^\/+/, '');
  if (!parent) return child;
  if (!child) return parent;
  return `${parent}${child}`;
}

/**
 * Resolve a PROPFIND href to a storage key relative to the listed directory URL.
 * Returns null when the href is outside the listing; '' for the directory itself.
 */
export function webdavHrefToStorageKey(
  href: string,
  listingUrl: string,
  options: { directChildrenOnly?: boolean } = {},
): string | null {
  const trimmed = String(href || '').trim();
  if (!trimmed) return null;

  const listing = listingUrl.replace(/\/?$/, '/');
  let itemUrl: URL;
  let listingUrlParsed: URL;
  try {
    itemUrl = new URL(trimmed, listing);
    listingUrlParsed = new URL(listing);
  } catch {
    return null;
  }

  const listPath = decodeWebdavPathSegments(listingUrlParsed.pathname);
  const itemPath = decodeWebdavPathSegments(itemUrl.pathname);

  if (itemPath === listPath) return '';

  if (listPath) {
    if (!itemPath.startsWith(`${listPath}/`)) return null;
  }

  let rel = listPath ? itemPath.slice(listPath.length + 1) : itemPath;
  if (!rel) return '';

  if (options.directChildrenOnly) {
    const relCore = rel.replace(/\/$/, '');
    if (relCore.includes('/')) return null;
  }

  if (itemUrl.pathname.endsWith('/') && !rel.endsWith('/')) {
    rel = `${rel}/`;
  }

  return rel;
}

/**
 * Find the first DAV element with a given local name under parent.
 */
export function firstDavElement(parent: Element | Document, localName: string): Element | null {
  for (const ns of DAV_XML_NAMESPACES) {
    const elements = parent.getElementsByTagNameNS(ns, localName);
    if (elements.length > 0) return elements[0] ?? null;
  }

  const all = parent.getElementsByTagName('*');
  for (let i = 0; i < all.length; i++) {
    const el = all[i];
    if (el?.localName === localName) return el;
  }
  return null;
}

/** Whether a PROPFIND response node describes a collection. */
export function isDavCollection(response: Element, href: string): boolean {
  for (const ns of DAV_XML_NAMESPACES) {
    if (response.getElementsByTagNameNS(ns, 'collection').length > 0) return true;
  }

  const all = response.getElementsByTagName('*');
  for (let i = 0; i < all.length; i++) {
    if (all[i]?.localName === 'collection') return true;
  }

  return href.endsWith('/');
}

/** Collect PROPFIND response nodes across common DAV XML namespace variants. */
export function collectDavResponses(doc: Document): Element[] {
  const seen = new Set<Element>();
  const out: Element[] = [];

  const push = (node: Element) => {
    if (seen.has(node)) return;
    seen.add(node);
    out.push(node);
  };

  for (const ns of DAV_XML_NAMESPACES) {
    const nodes = doc.getElementsByTagNameNS(ns, 'response');
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node) push(node);
    }
  }

  const all = doc.getElementsByTagName('*');
  for (let i = 0; i < all.length; i++) {
    const node = all[i];
    if (node?.localName === 'response') push(node);
  }

  return out;
}

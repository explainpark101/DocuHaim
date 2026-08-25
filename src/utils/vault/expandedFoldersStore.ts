const EXPANDED_FOLDERS_KEY = 's3haim_expandedFolders';

export type ExpandedFolderPaths = {
  s3: Set<string>;
  local: Set<string>;
  webdav: Set<string>;
};

function emptyExpandedFolderPaths(): ExpandedFolderPaths {
  return { s3: new Set(), local: new Set(), webdav: new Set() };
}

function toStringSet(value: unknown): Set<string> {
  if (!Array.isArray(value)) return new Set();
  return new Set(value.filter((item): item is string => typeof item === 'string'));
}

export function loadExpandedFolderPaths(): ExpandedFolderPaths {
  try {
    if (typeof window === 'undefined') return emptyExpandedFolderPaths();
    const raw = window.localStorage.getItem(EXPANDED_FOLDERS_KEY);
    if (!raw) return emptyExpandedFolderPaths();
    const data = JSON.parse(raw) as { s3?: unknown; local?: unknown; webdav?: unknown };
    return {
      s3: toStringSet(data.s3),
      local: toStringSet(data.local),
      webdav: toStringSet(data.webdav),
    };
  } catch {
    return emptyExpandedFolderPaths();
  }
}

export function saveExpandedFolderPaths(expanded: ExpandedFolderPaths): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(
      EXPANDED_FOLDERS_KEY,
      JSON.stringify({
        s3: Array.from(expanded.s3),
        local: Array.from(expanded.local),
        webdav: Array.from(expanded.webdav),
      }),
    );
  } catch {
    // ignore quota / private mode
  }
}

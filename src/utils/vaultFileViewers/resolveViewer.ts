import { specialVaultFormatsLongestFirst } from '@/utils/vaultFileViewers/specialFormats';
import {
  BASE_EDITABLE_VIEWERS,
  type SpecialVaultFormat,
  type VaultTreeIconId,
  type VaultViewerFamily,
} from '@/utils/vaultFileViewers/types';

function normalizePath(path: string | null | undefined): string {
  return String(path || '')
    .trim()
    .toLowerCase()
    .replace(/\\/g, '/');
}

/** Longest composite extension match (e.g. `.kanban.json` before `.json`). */
export function matchSpecialVaultFormat(
  path: string | null | undefined,
): SpecialVaultFormat | null {
  const p = normalizePath(path);
  if (!p) return null;
  for (const fmt of specialVaultFormatsLongestFirst()) {
    if (p.endsWith(fmt.extension.toLowerCase())) return fmt;
  }
  return null;
}

/**
 * Resolve viewer for a vault text path before generic extension fallbacks.
 * Returns null when the path is not a registered composite format
 * (caller should use `ext === 'json'` / md / …).
 */
export function resolveSpecialViewerFromPath(
  path: string | null | undefined,
): string | null {
  return matchSpecialVaultFormat(path)?.viewer ?? null;
}

export function matchSpecialVaultFormatByViewer(
  viewer: string | null | undefined,
): SpecialVaultFormat | null {
  const v = String(viewer || '').trim();
  if (!v) return null;
  // Prefer formats whose viewer id is dedicated (not shared with generic markdown).
  const dedicated = SPECIAL_FORMATS_BY_VIEWER_DEDICATED.get(v);
  if (dedicated) return dedicated;
  return null;
}

const SPECIAL_FORMATS_BY_VIEWER_DEDICATED = (() => {
  const map = new Map<string, SpecialVaultFormat>();
  for (const fmt of specialVaultFormatsLongestFirst()) {
    // Skip formats that reuse the generic markdown/json viewer id for surface modes.
    if (fmt.viewer === 'markdown' || fmt.viewer === 'json') continue;
    if (!map.has(fmt.viewer)) map.set(fmt.viewer, fmt);
  }
  return map;
})();

/** Seed body for CreateItem when path matches a special format. */
export function seedContentForVaultPath(
  path: string | null | undefined,
): string | null {
  const fmt = matchSpecialVaultFormat(path);
  if (!fmt?.createSeed) return null;
  return fmt.createSeed();
}

/** Viewer to use when opening a newly created file. */
export function viewerForCreatePath(path: string | null | undefined): string {
  const fmt = matchSpecialVaultFormat(path);
  if (fmt) return fmt.viewer;
  const p = normalizePath(path);
  if (p.endsWith('.json')) return 'json';
  if (p.endsWith('.html') || p.endsWith('.htm')) return 'html';
  if (p.endsWith('.svg')) return 'svg';
  return 'markdown';
}

/** Content-Type for create/save of a path (special format or extension fallback). */
export function contentTypeForCreatePath(
  path: string | null | undefined,
): string {
  const fmt = matchSpecialVaultFormat(path);
  if (fmt) return fmt.contentType;
  const p = normalizePath(path);
  if (p.endsWith('.json')) return 'application/json';
  if (p.endsWith('.html') || p.endsWith('.htm')) return 'text/html';
  if (p.endsWith('.svg')) return 'image/svg+xml';
  return 'text/markdown';
}

/**
 * MIME for an open file's viewer id (special formats + built-in text viewers).
 */
export function contentTypeForViewer(viewer: string | null | undefined): string {
  const v = String(viewer || 'markdown').trim() || 'markdown';
  const byViewer = matchSpecialVaultFormatByViewer(v);
  if (byViewer) return byViewer.contentType;

  if (v === 'json') return 'application/json';
  if (v === 'raw') return 'text/plain';
  if (v === 'html') return 'text/html';
  if (v === 'svg') return 'image/svg+xml';
  return 'text/markdown';
}

/** Editable viewers: base set ∪ special format viewers marked editable. */
export function listEditableViewers(): string[] {
  const set = new Set<string>(BASE_EDITABLE_VIEWERS);
  for (const fmt of specialVaultFormatsLongestFirst()) {
    if (fmt.editable) set.add(fmt.viewer);
  }
  return [...set];
}

export function isEditableViewerId(viewer: string | null | undefined): boolean {
  const v = String(viewer || 'markdown').trim() || 'markdown';
  return listEditableViewers().includes(v);
}

/** True when open/save should pretty-print JSON bodies. */
export function viewerUsesPrettyJson(
  viewer: string | null | undefined,
): boolean {
  const v = String(viewer || '').trim();
  if (v === 'json') return true;
  const fmt = matchSpecialVaultFormatByViewer(v);
  return Boolean(fmt?.prettyJsonOnOpen ?? fmt?.family === 'json');
}

export function viewerFamily(
  viewer: string | null | undefined,
): VaultViewerFamily | null {
  const v = String(viewer || '').trim();
  if (v === 'json') return 'json';
  if (v === 'markdown') return 'markdown';
  return matchSpecialVaultFormatByViewer(v)?.family ?? null;
}

/**
 * Pretty-print JSON when valid and under size cap; otherwise return original.
 */
export function maybePrettyJsonText(
  text: string,
  maxLen = 100_000,
): string {
  if (text.length > maxLen) return text;
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text;
  }
}

/**
 * Prepare display/editor text for a viewer after reading from storage.
 */
export function prepareViewerText(
  text: string,
  viewer: string,
  maxPrettyLen = 100_000,
): string {
  if (viewerUsesPrettyJson(viewer)) {
    return maybePrettyJsonText(text, maxPrettyLen);
  }
  return text;
}

export function treeIconForVaultPath(
  path: string | null | undefined,
): VaultTreeIconId {
  return matchSpecialVaultFormat(path)?.treeIcon ?? 'default';
}

/**
 * Resolve the special-format viewer for a path, else null
 * (caller continues with generic ext branching).
 */
export function resolveTextOpenViewer(
  path: string | null | undefined,
  name?: string | null,
): { viewer: string; format: SpecialVaultFormat } | null {
  const fmt =
    matchSpecialVaultFormat(path) || matchSpecialVaultFormat(name);
  if (!fmt) return null;
  return { viewer: fmt.viewer, format: fmt };
}

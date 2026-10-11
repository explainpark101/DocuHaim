import { CHAT_FOLDER, EDITS_FOLDER } from '@/utils/chatWithMyself/paths.js';

export const VERSIONS_FOLDER = '.versions';

/** Max app-managed note snapshots per file (MVP). */
export const APP_NOTE_VERSION_MAX = 20;

export function versionsFolderPrefix(): string {
  return `${VERSIONS_FOLDER}/`;
}

export function normalizeVaultPath(path: string): string {
  return String(path || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')
    .trim();
}

/** True for `.versions` root or any descendant. */
export function isVersionsPath(path: string): boolean {
  const p = normalizeVaultPath(path);
  return p === VERSIONS_FOLDER || p.startsWith(`${VERSIONS_FOLDER}/`);
}

/**
 * Paths that must not receive note version snapshots / note version UI.
 */
export function isNoteVersionExcludedPath(path: string): boolean {
  const p = normalizeVaultPath(path);
  if (!p) return true;
  if (isVersionsPath(p)) return true;
  if (p === '.trash' || p.startsWith('.trash/')) return true;
  if (p === '.settings' || p.startsWith('.settings/')) return true;
  if (p === CHAT_FOLDER || p.startsWith(`${CHAT_FOLDER}/`)) return true;
  if (p === '.advanced-search' || p.startsWith('.advanced-search/')) return true;
  if (p === '.advanced_search' || p.startsWith('.advanced_search/')) return true;
  return false;
}

/** Simple stable hash for path → folder id (ASCII hex). */
export async function hashVaultPath(path: string): Promise<string> {
  const normalized = normalizeVaultPath(path);
  const data = new TextEncoder().encode(normalized);
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 32);
  }
  // Fallback (non-crypto environments)
  let h = 0;
  for (let i = 0; i < normalized.length; i++) {
    h = (Math.imul(31, h) + normalized.charCodeAt(i)) | 0;
  }
  return `p${(h >>> 0).toString(16)}`;
}

export function noteVersionEntryDir(pathHash: string, entryId: string): string {
  return `${VERSIONS_FOLDER}/${pathHash}/${entryId}`;
}

export function noteVersionMetaKey(pathHash: string, entryId: string): string {
  return `${noteVersionEntryDir(pathHash, entryId)}/meta.json`;
}

export function noteVersionBodyKey(pathHash: string, entryId: string): string {
  return `${noteVersionEntryDir(pathHash, entryId)}/body.md`;
}

export function noteVersionPathPrefix(pathHash: string): string {
  return `${VERSIONS_FOLDER}/${pathHash}/`;
}

/** Native S3 key for chat message edit archive (overwrite; versions accumulate). */
export function chatEditNativeCurrentKey(messageId: string): string {
  const id = String(messageId || '').replace(/[/\\]/g, '_').trim();
  return `${CHAT_FOLDER}/${EDITS_FOLDER}/${id}/current.md`;
}

export function newNoteVersionEntryId(at = new Date()): string {
  const iso = at.toISOString().replace(/:/g, '-');
  const rand =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(16).slice(2, 10);
  return `${iso}_${rand}`;
}

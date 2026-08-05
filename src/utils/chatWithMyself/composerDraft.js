import {
  clearComposerDraftImages,
  deleteComposerDraftImage,
  getComposerDraftImages,
  listComposerDraftImageIds,
  putComposerDraftImage,
} from './chatDb.js';
import { isS3StorageScope } from '@/utils/storageScope';

export const COMPOSER_DRAFT_LS_KEY = 's3haim_chat_composer_draft';

/**
 * @typedef {{
 *   body?: string,
 *   group?: string,
 *   replyTo?: object | null,
 *   imageIds?: string[],
 *   imageBackgrounds?: Record<string, string>,
 *   updatedAt?: number,
 * }} ComposerDraftMeta
 */

export function composerDraftStorageKey(scope) {
  return scope ? `${COMPOSER_DRAFT_LS_KEY}:${scope}` : COMPOSER_DRAFT_LS_KEY;
}

function parseDraftMeta(raw) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

/** @param {string} [scope] @returns {ComposerDraftMeta | null} */
export function readComposerDraftMeta(scope) {
  if (typeof window === 'undefined' || !scope) return null;
  try {
    const scoped = parseDraftMeta(window.localStorage.getItem(composerDraftStorageKey(scope)));
    if (scoped) return scoped;
    if (isS3StorageScope(scope)) {
      return parseDraftMeta(window.localStorage.getItem(COMPOSER_DRAFT_LS_KEY));
    }
    return null;
  } catch {
    return null;
  }
}

/** @param {string} scope @param {ComposerDraftMeta | null | undefined} meta */
export function writeComposerDraftMeta(scope, meta) {
  if (typeof window === 'undefined' || !scope) return;
  try {
    const body = String(meta?.body || '');
    const imageIds = Array.isArray(meta?.imageIds) ? meta.imageIds.filter(Boolean) : [];
    const imageBackgrounds =
      meta?.imageBackgrounds && typeof meta.imageBackgrounds === 'object'
        ? meta.imageBackgrounds
        : {};
    const replyTo = meta?.replyTo || null;
    const group = meta?.group || '';
    const empty = !body.trim() && imageIds.length === 0 && !replyTo;
    const key = composerDraftStorageKey(scope);
    if (empty) {
      window.localStorage.removeItem(key);
      if (isS3StorageScope(scope)) {
        window.localStorage.removeItem(COMPOSER_DRAFT_LS_KEY);
      }
      return;
    }
    window.localStorage.setItem(
      key,
      JSON.stringify({
        body,
        group,
        replyTo,
        imageIds,
        imageBackgrounds,
        updatedAt: Date.now(),
      }),
    );
    if (isS3StorageScope(scope)) {
      window.localStorage.removeItem(COMPOSER_DRAFT_LS_KEY);
    }
  } catch {
    // quota / private mode
  }
}

/** @param {string} [scope] */
export async function clearComposerDraft(scope) {
  if (typeof window !== 'undefined' && scope) {
    try {
      window.localStorage.removeItem(composerDraftStorageKey(scope));
      if (isS3StorageScope(scope)) {
        window.localStorage.removeItem(COMPOSER_DRAFT_LS_KEY);
      }
    } catch {
      /* ignore */
    }
  }
  try {
    if (scope) await clearComposerDraftImages(scope);
  } catch {
    /* ignore */
  }
}

/**
 * Persist image queue blobs to IndexedDB; drop orphans in this storage scope only.
 * @param {string} scope
 * @param {{ id: string, file: File|Blob }[]} queue
 */
export async function syncComposerDraftImages(scope, queue = []) {
  if (!scope) return;
  const items = Array.isArray(queue) ? queue : [];
  const keep = new Set(items.map((i) => i.id).filter(Boolean));

  try {
    const existingIds = await listComposerDraftImageIds(scope);
    for (const id of existingIds) {
      if (!keep.has(id)) await deleteComposerDraftImage(scope, id);
    }
  } catch {
    /* ignore */
  }

  for (const item of items) {
    if (!item?.id || !item.file) continue;
    try {
      await putComposerDraftImage({
        scope,
        id: item.id,
        blob: item.file,
        name: item.file.name || 'image.png',
        type: item.file.type || 'image/png',
        size: item.file.size || 0,
      });
    } catch {
      /* ignore single image failures */
    }
  }
}

/**
 * Rebuild preview queue from draft image ids.
 * @param {string} scope
 * @param {string[]} [imageIds]
 * @returns {Promise<{ id: string, file: File, previewUrl: string }[]>}
 */
export async function loadComposerDraftImageQueue(scope, imageIds = []) {
  if (!scope) return [];
  const ids = Array.isArray(imageIds) ? imageIds.filter(Boolean) : [];
  if (!ids.length) return [];
  const rows = await getComposerDraftImages(scope, ids);
  return rows.map((row) => {
    const blob = row.blob;
    const file =
      blob instanceof File
        ? blob
        : new File([blob], row.name || 'image.png', {
            type: row.type || 'image/png',
          });
    const isImage =
      (file.type && file.type.startsWith('image/')) ||
      /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(file.name || '');
    return {
      id: row.id,
      file,
      kind: isImage ? 'image' : 'file',
      previewUrl: isImage ? URL.createObjectURL(file) : null,
    };
  });
}

export function composerDraftHasContent(meta) {
  if (!meta) return false;
  if (String(meta.body || '').trim()) return true;
  if (Array.isArray(meta.imageIds) && meta.imageIds.length > 0) return true;
  if (meta.replyTo) return true;
  return false;
}

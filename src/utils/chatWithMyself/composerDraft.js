import {
  clearComposerDraftImages,
  deleteComposerDraftImage,
  getComposerDraftImages,
  listComposerDraftImageIds,
  putComposerDraftImage,
} from './chatDb.js';

export const COMPOSER_DRAFT_LS_KEY = 's3haim_chat_composer_draft';

/**
 * @typedef {{
 *   body?: string,
 *   group?: string,
 *   replyTo?: object | null,
 *   imageIds?: string[],
 *   updatedAt?: number,
 * }} ComposerDraftMeta
 */

/** @returns {ComposerDraftMeta | null} */
export function readComposerDraftMeta() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(COMPOSER_DRAFT_LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

/** @param {ComposerDraftMeta | null | undefined} meta */
export function writeComposerDraftMeta(meta) {
  if (typeof window === 'undefined') return;
  try {
    const body = String(meta?.body || '');
    const imageIds = Array.isArray(meta?.imageIds) ? meta.imageIds.filter(Boolean) : [];
    const replyTo = meta?.replyTo || null;
    const group = meta?.group || '';
    const empty = !body.trim() && imageIds.length === 0 && !replyTo;
    if (empty) {
      window.localStorage.removeItem(COMPOSER_DRAFT_LS_KEY);
      return;
    }
    window.localStorage.setItem(
      COMPOSER_DRAFT_LS_KEY,
      JSON.stringify({
        body,
        group,
        replyTo,
        imageIds,
        updatedAt: Date.now(),
      }),
    );
  } catch {
    // quota / private mode
  }
}

export async function clearComposerDraft() {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(COMPOSER_DRAFT_LS_KEY);
    } catch {
      /* ignore */
    }
  }
  try {
    await clearComposerDraftImages();
  } catch {
    /* ignore */
  }
}

/**
 * Persist image queue blobs to IndexedDB; drop orphans.
 * @param {{ id: string, file: File|Blob }[]} queue
 */
export async function syncComposerDraftImages(queue = []) {
  const items = Array.isArray(queue) ? queue : [];
  const keep = new Set(items.map((i) => i.id).filter(Boolean));

  try {
    const existingIds = await listComposerDraftImageIds();
    for (const id of existingIds) {
      if (!keep.has(id)) await deleteComposerDraftImage(id);
    }
  } catch {
    /* ignore */
  }

  for (const item of items) {
    if (!item?.id || !item.file) continue;
    try {
      await putComposerDraftImage({
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
 * @returns {Promise<{ id: string, file: File, previewUrl: string }[]>}
 */
export async function loadComposerDraftImageQueue(imageIds = []) {
  const ids = Array.isArray(imageIds) ? imageIds.filter(Boolean) : [];
  if (!ids.length) return [];
  const rows = await getComposerDraftImages(ids);
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

/**
 * Image crop modal undo/redo checkpoints (IndexedDB) while the modal is open.
 */
import Dexie from 'dexie';
import type { Area } from 'react-easy-crop';

export const imageCropUndoHistoryDb = new Dexie('s3haim-image-crop-undo-history');

imageCropUndoHistoryDb.version(1).stores({
  histories: 'key, updatedAt',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dexie table typing
const histories = (imageCropUndoHistoryDb as any).histories as {
  get: (key: string) => Promise<ImageCropUndoHistoryRecord | undefined>;
  put: (row: ImageCropUndoHistoryRecord) => Promise<string>;
  delete: (key: string) => Promise<void>;
};

export const MAX_IMAGE_CROP_UNDO_ENTRIES = 60;
export const IMAGE_CROP_UNDO_HISTORY_TTL_MS = 24 * 60 * 60 * 1000;
/** Coalesce continuous pan / zoom into one checkpoint. */
export const IMAGE_CROP_UNDO_RECORD_DELAY_MS = 350;

export type ImageCropUndoSnapshot = {
  crop: { x: number; y: number };
  zoom: number;
  cropSize: { width: number; height: number } | null;
  lockRatio: boolean;
  keepTransparency: boolean;
  croppedArea: Area | null;
};

export type ImageCropUndoHistoryRecord = {
  key: string;
  stack: string[];
  index: number;
  updatedAt: number;
};

export function createImageCropUndoSessionKey(imageSrc: string): string {
  const tag =
    imageSrc.length > 96
      ? `${imageSrc.slice(0, 48)}:${imageSrc.length}`
      : imageSrc;
  const id =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `crop:${tag}:${id}`;
}

export function serializeImageCropSnapshot(snapshot: ImageCropUndoSnapshot): string {
  return JSON.stringify(snapshot);
}

export function parseImageCropSnapshot(raw: string): ImageCropUndoSnapshot | null {
  try {
    const parsed = JSON.parse(raw) as ImageCropUndoSnapshot;
    if (!parsed || typeof parsed !== 'object') return null;
    if (
      !parsed.crop
      || typeof parsed.crop.x !== 'number'
      || typeof parsed.crop.y !== 'number'
      || typeof parsed.zoom !== 'number'
      || typeof parsed.lockRatio !== 'boolean'
      || typeof parsed.keepTransparency !== 'boolean'
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function trimImageCropUndoStack(stack: string[]): string[] {
  if (!Array.isArray(stack) || stack.length === 0) return [];
  if (stack.length <= MAX_IMAGE_CROP_UNDO_ENTRIES) return stack;
  return stack.slice(stack.length - MAX_IMAGE_CROP_UNDO_ENTRIES);
}

export async function getImageCropUndoHistory(
  key: string,
): Promise<ImageCropUndoHistoryRecord | null> {
  if (!key) return null;
  const record = await histories.get(key);
  if (!record) return null;
  if (
    typeof record.updatedAt === 'number'
    && Date.now() - record.updatedAt > IMAGE_CROP_UNDO_HISTORY_TTL_MS
  ) {
    await histories.delete(key);
    return null;
  }
  if (!Array.isArray(record.stack) || record.stack.length === 0) return null;
  return record;
}

export async function saveImageCropUndoHistory({
  key,
  stack,
  index,
}: {
  key: string;
  stack: string[];
  index: number;
}): Promise<void> {
  if (!key) return;
  const trimmed = trimImageCropUndoStack(stack);
  const safeIndex = Math.max(0, Math.min(index ?? trimmed.length - 1, trimmed.length - 1));
  await histories.put({
    key,
    stack: trimmed,
    index: safeIndex,
    updatedAt: Date.now(),
  });
}

export async function deleteImageCropUndoHistory(key: string): Promise<void> {
  if (!key) return;
  await histories.delete(key);
}

/** Drop every crop-modal undo session (call when the modal closes). */
export async function clearAllImageCropUndoHistories(): Promise<void> {
  await histories.clear();
}

export function pushImageCropUndoCheckpoint(
  stack: string[],
  index: number,
  snapshot: string,
): { stack: string[]; index: number; changed: boolean } {
  const safeStack = Array.isArray(stack) && stack.length > 0 ? stack : [];
  if (safeStack.length === 0) {
    return { stack: [snapshot], index: 0, changed: true };
  }
  const safeIndex = Math.max(0, Math.min(index, safeStack.length - 1));
  if (safeStack[safeIndex] === snapshot) {
    return { stack: safeStack, index: safeIndex, changed: false };
  }
  const next = safeStack.slice(0, safeIndex + 1);
  next.push(snapshot);
  const trimmed = trimImageCropUndoStack(next);
  return { stack: trimmed, index: trimmed.length - 1, changed: true };
}

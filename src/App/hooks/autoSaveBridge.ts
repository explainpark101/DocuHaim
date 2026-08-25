/**
 * Late-bound auto-save / auto-sync timestamp hooks
 * (AutoSaveProvider mounts after AppLogic compose / FileSession domain).
 */
let setLastAutoSaveAtRef: ((ts: number) => void) | null = null;
let setLastAutoSyncAtRef: ((ts: number) => void) | null = null;

export function registerAutoSaveTimestampSetter(fn: (ts: number) => void): () => void {
  setLastAutoSaveAtRef = fn;
  return () => {
    if (setLastAutoSaveAtRef === fn) setLastAutoSaveAtRef = null;
  };
}

export function registerAutoSaveSyncTimestampSetter(fn: (ts: number) => void): () => void {
  setLastAutoSyncAtRef = fn;
  return () => {
    if (setLastAutoSyncAtRef === fn) setLastAutoSyncAtRef = null;
  };
}

export function markAutoSaveTimestamp(now = Date.now()): void {
  setLastAutoSaveAtRef?.(now);
}

export function markAutoSaveSyncTimestamp(now = Date.now()): void {
  setLastAutoSyncAtRef?.(now);
}

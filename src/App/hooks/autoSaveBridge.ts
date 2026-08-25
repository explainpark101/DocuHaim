/**
 * Late-bound auto-save timestamp hook (AutoSaveProvider mounts after AppLogic compose).
 */
let setLastAutoSaveAtRef: ((ts: number) => void) | null = null;

export function registerAutoSaveTimestampSetter(fn: (ts: number) => void): () => void {
  setLastAutoSaveAtRef = fn;
  return () => {
    if (setLastAutoSaveAtRef === fn) setLastAutoSaveAtRef = null;
  };
}

export function markAutoSaveTimestamp(now = Date.now()): void {
  setLastAutoSaveAtRef?.(now);
}

export type NoteVersionHistoryRequest = {
  path: string;
  storageType: string;
  currentText?: string;
};

type Listener = (req: NoteVersionHistoryRequest | null) => void;
type SaveListener = (path: string) => void;

let current: NoteVersionHistoryRequest | null = null;
const listeners = new Set<Listener>();
const saveListeners = new Set<SaveListener>();

function notify(): void {
  for (const l of listeners) {
    try {
      l(current);
    } catch {
      // ignore
    }
  }
}

export function openNoteVersionHistory(req: NoteVersionHistoryRequest): void {
  current = req;
  notify();
}

export function closeNoteVersionHistory(): void {
  current = null;
  notify();
}

export function getNoteVersionHistoryRequest(): NoteVersionHistoryRequest | null {
  return current;
}

export function subscribeNoteVersionHistory(
  listener: Listener,
): () => void {
  listeners.add(listener);
  listener(current);
  return () => listeners.delete(listener);
}

/**
 * Call after a successful note save so an open version-history modal can refetch.
 */
export function notifyNoteVersionHistoryAfterSave(path: string): void {
  const p = String(path || '').trim();
  if (!p) return;
  for (const l of saveListeners) {
    try {
      l(p);
    } catch {
      // ignore
    }
  }
}

export function subscribeNoteVersionHistoryAfterSave(
  listener: SaveListener,
): () => void {
  saveListeners.add(listener);
  return () => {
    saveListeners.delete(listener);
  };
}

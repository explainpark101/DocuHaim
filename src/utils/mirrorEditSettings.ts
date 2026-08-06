const LOCAL_STORAGE_KEY = 's3haim_md_editor_mirror_edit';

type Listener = (enabled: boolean) => void;

const listeners = new Set<Listener>();

/** Default off: opt-in preview double-click edit. */
export function loadMirrorEditEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw === null) return false;
    return raw === '1';
  } catch {
    return false;
  }
}

export function saveMirrorEditEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, enabled ? '1' : '0');
  } catch {
    // ignore quota / private mode
  }
}

function notify(enabled: boolean): void {
  for (const listener of listeners) {
    try {
      listener(enabled);
    } catch {
      // ignore
    }
  }
}

export function setMirrorEditEnabled(enabled: boolean): void {
  const next = Boolean(enabled);
  saveMirrorEditEnabled(next);
  notify(next);
}

export function toggleMirrorEditEnabled(): boolean {
  const next = !loadMirrorEditEnabled();
  setMirrorEditEnabled(next);
  return next;
}

export function subscribeMirrorEdit(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

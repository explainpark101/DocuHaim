const LOCAL_STORAGE_KEY = 's3haim_editor_autocomplete';

type Listener = (enabled: boolean) => void;

const listeners = new Set<Listener>();

/** Default on: matches md-editor-rt built-in completion behavior. */
export function loadEditorAutocompleteEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw === null) return true;
    return raw === '1';
  } catch {
    return true;
  }
}

export function saveEditorAutocompleteEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, enabled ? '1' : '0');
  } catch {
    // ignore quota / private mode
  }
}

/** Toggle document class used to hide CM autocomplete tooltips while off. */
export function applyEditorAutocompleteDomFlag(enabled: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle(
    's3haim-editor-autocomplete-off',
    !enabled,
  );
}

function notify(enabled: boolean): void {
  applyEditorAutocompleteDomFlag(enabled);
  for (const listener of listeners) {
    try {
      listener(enabled);
    } catch {
      // ignore
    }
  }
}

export function setEditorAutocompleteEnabled(enabled: boolean): void {
  const next = Boolean(enabled);
  saveEditorAutocompleteEnabled(next);
  notify(next);
}

export function toggleEditorAutocompleteEnabled(): boolean {
  const next = !loadEditorAutocompleteEnabled();
  setEditorAutocompleteEnabled(next);
  return next;
}

export function subscribeEditorAutocomplete(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Call once on app boot so CSS flag matches storage before editors mount. */
export function initEditorAutocompleteDomFlag(): void {
  applyEditorAutocompleteDomFlag(loadEditorAutocompleteEnabled());
}

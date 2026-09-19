import { CHAT_PREF_PREFIX } from '@/utils/chatWithMyself/composerPrefs.js';

/** Matches `editorId` on ChatComposerMdEditor. */
export const CHAT_COMPOSER_MD_EDITOR_ID = 'chat-with-myself-composer';

const LOCAL_STORAGE_KEY = `${CHAT_PREF_PREFIX}composer_autocomplete`;

type Listener = (enabled: boolean) => void;

const listeners = new Set<Listener>();

/** Default on: matches md-editor-rt built-in completion behavior. */
export function loadChatComposerAutocompleteEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw === null) return true;
    return raw === '1' || raw === 'true';
  } catch {
    return true;
  }
}

export function saveChatComposerAutocompleteEnabled(enabled: boolean): void {
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

export function setChatComposerAutocompleteEnabled(enabled: boolean): void {
  const next = Boolean(enabled);
  saveChatComposerAutocompleteEnabled(next);
  notify(next);
}

export function subscribeChatComposerAutocomplete(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

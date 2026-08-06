/** Request opening Advanced Search from anywhere (e.g. Sidebar icon). */

type Listener = (detail?: { source?: string }) => void;

const listeners = new Set<Listener>();

export function requestOpenAdvancedSearch(detail?: { source?: string }): void {
  for (const listener of listeners) {
    try {
      listener(detail);
    } catch (err) {
      console.warn('[advancedSearch] open request listener failed', err);
    }
  }
}

export function subscribeOpenAdvancedSearch(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

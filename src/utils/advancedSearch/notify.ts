/** Cross-cutting notify so saves/chat writes can trigger incremental index updates. */

export type AdvancedSearchChangeEvent =
  | { type: 'file'; path: string; content: string }
  | { type: 'chatDay'; dateStr: string; content: string }
  | { type: 'rebuild' }
  | { type: 'clear' };

type Listener = (event: AdvancedSearchChangeEvent) => void;

const listeners = new Set<Listener>();

export function subscribeAdvancedSearchChanges(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function notifyAdvancedSearchChange(event: AdvancedSearchChangeEvent): void {
  for (const listener of listeners) {
    try {
      listener(event);
    } catch (err) {
      console.warn('[advancedSearch] notify listener failed', err);
    }
  }
}

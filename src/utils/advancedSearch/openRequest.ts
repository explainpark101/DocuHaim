/** Request opening Advanced Search from anywhere (e.g. Sidebar icon). */

export type AdvancedSearchOpenMode =
  | 'default'
  | 'print-paper'
  | 'browse-directory'
  | 'chat-groups'
  | 'footnote-insert'
  | 'footnote-existing'
  | 'circle-number';

export type AdvancedSearchOpenDetail = {
  source?: string;
  mode?: AdvancedSearchOpenMode;
};

type Listener = (detail?: AdvancedSearchOpenDetail) => void;

const listeners = new Set<Listener>();

export function requestOpenAdvancedSearch(
  detail?: AdvancedSearchOpenDetail,
): void {
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

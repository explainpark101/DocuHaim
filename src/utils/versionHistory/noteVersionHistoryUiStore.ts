import { useSyncExternalStore } from 'react';
import type { VersionEntry } from '@/utils/versionHistory/types';

export type NoteVersionHistoryUiState = {
  path: string | null;
  entries: VersionEntry[];
  selectedIds: readonly string[];
  loading: boolean;
  busy: boolean;
  error: string;
};

const EMPTY_SELECTED: readonly string[] = Object.freeze([]);

let state: NoteVersionHistoryUiState = {
  path: null,
  entries: [],
  selectedIds: EMPTY_SELECTED,
  loading: false,
  busy: false,
  error: '',
};

const listeners = new Set<() => void>();

function emit(): void {
  for (const l of listeners) {
    try {
      l();
    } catch {
      // ignore
    }
  }
}

function setState(partial: Partial<NoteVersionHistoryUiState>): void {
  const next: NoteVersionHistoryUiState = { ...state, ...partial };
  if (
    next.path === state.path &&
    next.entries === state.entries &&
    next.selectedIds === state.selectedIds &&
    next.loading === state.loading &&
    next.busy === state.busy &&
    next.error === state.error
  ) {
    return;
  }
  state = next;
  emit();
}

function entriesSignature(list: VersionEntry[]): string {
  return list
    .map(
      (e) =>
        `${e.id}\0${e.at}\0${e.size}\0${e.source}\0${e.protectCurrent ? 1 : 0}\0${e.isLatest ? 1 : 0}`,
    )
    .join('\n');
}

function pruneSelected(
  selectedIds: readonly string[],
  entries: VersionEntry[],
): readonly string[] {
  if (!selectedIds.length) return EMPTY_SELECTED;
  const allowed = new Set(
    entries.filter((e) => !e.protectCurrent && !e.isDeleteMarker).map((e) => e.id),
  );
  const next = selectedIds.filter((id) => allowed.has(id));
  if (
    next.length === selectedIds.length &&
    next.every((id, i) => id === selectedIds[i])
  ) {
    return selectedIds;
  }
  return next.length ? Object.freeze(next) : EMPTY_SELECTED;
}

export const noteVersionHistoryUiStore = {
  getState(): NoteVersionHistoryUiState {
    return state;
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  /** Start / switch session for a path. Clears selection only when path changes. */
  beginSession(path: string): void {
    const p = String(path || '');
    if (state.path === p) return;
    setState({
      path: p,
      entries: [],
      selectedIds: EMPTY_SELECTED,
      loading: false,
      busy: false,
      error: '',
    });
  },

  endSession(): void {
    if (state.path == null && state.entries.length === 0) return;
    setState({
      path: null,
      entries: [],
      selectedIds: EMPTY_SELECTED,
      loading: false,
      busy: false,
      error: '',
    });
  },

  setLoading(loading: boolean): void {
    if (state.loading === loading) return;
    setState({ loading });
  },

  setBusy(busy: boolean): void {
    if (state.busy === busy) return;
    setState({ busy });
  },

  setError(error: string): void {
    if (state.error === error) return;
    setState({ error });
  },

  /**
   * Replace entry list. Keeps selection for ids that still exist.
   * No-op when list signature is unchanged (avoids DOM thrash).
   */
  setEntries(list: VersionEntry[]): void {
    const next = Array.isArray(list) ? list : [];
    if (
      state.entries.length === next.length &&
      entriesSignature(state.entries) === entriesSignature(next)
    ) {
      return;
    }
    setState({
      entries: next,
      selectedIds: pruneSelected(state.selectedIds, next),
    });
  },

  toggleSelected(id: string): void {
    const key = String(id || '');
    if (!key || key === '__current__') return;
    const entry = state.entries.find((e) => e.id === key);
    if (entry?.protectCurrent || entry?.isDeleteMarker) return;
    const has = state.selectedIds.includes(key);
    const next = has
      ? state.selectedIds.filter((x) => x !== key)
      : [...state.selectedIds, key];
    setState({
      selectedIds: next.length ? Object.freeze(next) : EMPTY_SELECTED,
    });
  },

  clearSelected(): void {
    if (!state.selectedIds.length) return;
    setState({ selectedIds: EMPTY_SELECTED });
  },

  /** Select every deletable (non-current) entry. */
  selectAllDeletable(): void {
    const ids = state.entries
      .filter((e) => !e.protectCurrent && !e.isDeleteMarker)
      .map((e) => e.id);
    const next = ids.length ? Object.freeze(ids) : EMPTY_SELECTED;
    if (
      next.length === state.selectedIds.length &&
      next.every((id, i) => id === state.selectedIds[i])
    ) {
      return;
    }
    setState({ selectedIds: next });
  },

  isSelected(id: string): boolean {
    return state.selectedIds.includes(id);
  },
};

export function useNoteVersionHistoryUi<T>(
  selector: (s: NoteVersionHistoryUiState) => T,
): T {
  return useSyncExternalStore(
    noteVersionHistoryUiStore.subscribe,
    () => selector(noteVersionHistoryUiStore.getState()),
    () => selector(noteVersionHistoryUiStore.getState()),
  );
}

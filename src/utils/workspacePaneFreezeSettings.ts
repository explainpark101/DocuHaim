/**
 * Unfocused split-pane freeze (isSurfaceLive=false) for md-editor-rt / editor panes.
 * Default: off — freezing can mix content when toggling focus between panes.
 */

const LOCAL_STORAGE_KEY = 's3haim_workspace_pane_freeze';

/** Fired on `window` when the freeze preference changes. */
export const WORKSPACE_PANE_FREEZE_CHANGED_EVENT = 's3haim-workspace-pane-freeze';

/**
 * Default: off. Explicit `'1'` enables pausing heavy work on visible but unfocused panes.
 */
export function loadWorkspacePaneFreezeEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveWorkspacePaneFreezeEnabled(value: boolean): void {
  if (typeof window === 'undefined') return;
  const next = Boolean(value);
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, next ? '1' : '0');
  } catch {
    // ignore
  }
  try {
    window.dispatchEvent(
      new CustomEvent(WORKSPACE_PANE_FREEZE_CHANGED_EVENT, {
        detail: { enabled: next },
      }),
    );
  } catch {
    // ignore
  }
}

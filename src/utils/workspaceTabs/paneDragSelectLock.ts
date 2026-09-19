const PANE_DRAG_SELECT_LOCK_CLASS = 'workspace-pane-dragging';

/**
 * Block text selection (incl. md-editor-rt / CodeMirror) while a pane
 * resize handle or header is being dragged.
 */
export function lockPaneDragSelection(): () => void {
  if (typeof document === 'undefined') return () => {};

  document.documentElement.classList.add(PANE_DRAG_SELECT_LOCK_CLASS);
  const onSelectStart = (e: Event) => {
    e.preventDefault();
  };
  document.addEventListener('selectstart', onSelectStart, true);
  try {
    window.getSelection()?.removeAllRanges();
  } catch {
    // ignore
  }

  return () => {
    document.removeEventListener('selectstart', onSelectStart, true);
    document.documentElement.classList.remove(PANE_DRAG_SELECT_LOCK_CLASS);
  };
}

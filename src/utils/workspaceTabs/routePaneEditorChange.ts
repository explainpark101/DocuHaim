/**
 * Route a split-pane editor onChange to the tab that owns the editor.
 *
 * After collapse / focus switch, a dismissed leaf may still flush on unmount.
 * That flush must patch its own tab — never the newly active first leaf.
 */

export function routePaneEditorChange(options: {
  paneTabId: string;
  activeTabId: string | null | undefined;
  value: string;
  onActiveChange?: ((value: string) => void) | undefined;
  onInactiveChange?: ((tabId: string, value: string) => void) | undefined;
}): void {
  const { paneTabId, activeTabId, value, onActiveChange, onInactiveChange } = options;
  if (paneTabId && activeTabId && paneTabId === activeTabId) {
    onActiveChange?.(value);
    return;
  }
  onInactiveChange?.(paneTabId, value);
}

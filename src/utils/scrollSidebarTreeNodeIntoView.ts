export type ScrollSidebarTreeNodeOptions = {
  /** Max rAF retries while the expanded tree mounts the row. */
  attempts?: number;
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
};

/**
 * Scroll the sidebar tree so the row for `storageType` + `path` is visible.
 * Retries briefly because expandPaths is async relative to the DOM.
 */
export function scrollSidebarTreeNodeIntoView(
  storageType: string,
  path: string,
  options: ScrollSidebarTreeNodeOptions = {},
): void {
  if (typeof document === 'undefined' || !storageType || !path) return;

  const attempts = options.attempts ?? 24;
  const behavior = options.behavior ?? 'smooth';
  const block = options.block ?? 'nearest';

  const tryScroll = (left: number) => {
    const root = document.querySelector('[data-sidebar-tree-scroll]');
    if (!root) {
      if (left > 0) requestAnimationFrame(() => tryScroll(left - 1));
      return;
    }

    const pathEsc =
      typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
        ? CSS.escape(path)
        : path.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const typeEsc =
      typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
        ? CSS.escape(storageType)
        : String(storageType).replace(/\\/g, '\\\\').replace(/"/g, '\\"');

    const row = root.querySelector(
      `[data-tree-node-row][data-tree-path="${pathEsc}"][data-tree-storage="${typeEsc}"]`,
    );
    if (
      row &&
      typeof (row as HTMLElement).scrollIntoView === 'function'
    ) {
      (row as HTMLElement).scrollIntoView({ block, behavior });
      return;
    }
    if (left > 0) requestAnimationFrame(() => tryScroll(left - 1));
  };

  requestAnimationFrame(() => tryScroll(attempts));
}

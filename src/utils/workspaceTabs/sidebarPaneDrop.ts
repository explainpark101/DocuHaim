import type { PaneSplitEdge } from '@/utils/workspaceTabs/paneLayout';

/** Draggable id for the sidebar 「나와의 채팅」 row. */
export const CHAT_WITH_MYSELF_DRAG_ID = 'sidebar:chat-with-myself';

export function isChatWithMyselfDragId(id: string): boolean {
  return id === CHAT_WITH_MYSELF_DRAG_ID;
}

/** Tree / chat items that can open into a workspace split pane. */
export type SidebarPaneDropItem = {
  storageType: string;
  path: string;
  nodeType: string;
  name?: string;
};

export function isPointInsideSidebarRoot(clientX: number, clientY: number): boolean {
  if (typeof document === 'undefined') return false;
  const root = document.querySelector('[data-sidebar-root]');
  if (!root) return false;
  const rect = root.getBoundingClientRect();
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
}

/**
 * Prefer the actively dragged tree row for workspace pane opens.
 * Multi-select is kept for folder moves; pane join must not swallow every
 * selected file (often already-open orphan tabs) into the split group.
 */
export function primarySidebarPaneDropItem(
  activeDragId: string,
  items: SidebarPaneDropItem[],
): SidebarPaneDropItem | null {
  if (isChatWithMyselfDragId(activeDragId)) {
    return items.find((item) => item.nodeType === 'chat') ?? null;
  }
  const match = items.find((item) => {
    if (item.nodeType !== 'file' && item.nodeType !== 'chat') return false;
    // Tree drag ids are `${storageType}:${path}` (see toTreeSelectKey).
    return `${item.storageType}:${item.path}` === activeDragId;
  });
  if (match) return match;
  const firstOpenable = items.find(
    (item) => item.nodeType === 'file' || item.nodeType === 'chat',
  );
  return firstOpenable ?? null;
}

export type SidebarPaneDropHandler = (
  items: SidebarPaneDropItem[],
  leafId: string,
  zone: PaneSplitEdge | 'center',
  opts?: { workspaceEdge?: boolean },
) => void | Promise<void>;

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

export type SidebarPaneDropHandler = (
  items: SidebarPaneDropItem[],
  leafId: string,
  zone: PaneSplitEdge | 'center',
) => void | Promise<void>;

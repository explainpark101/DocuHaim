import { resolvePaneDropAt } from '@/utils/workspaceTabs/paneDropGeometry';

type WorkspaceTabDragSnapshot = {
  tabId: string;
  /** When set, the drag relocates a whole pane via its header (not a single tab). */
  paneLeafId?: string;
  clientX: number;
  clientY: number;
};

type Listener = (snap: WorkspaceTabDragSnapshot | null) => void;

let current: WorkspaceTabDragSnapshot | null = null;
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) listener(current);
}

export function setWorkspaceTabDrag(snap: WorkspaceTabDragSnapshot | null): void {
  current = snap;
  emit();
}

export function updateWorkspaceTabDragPoint(clientX: number, clientY: number): void {
  if (!current) return;
  current = { ...current, clientX, clientY };
  emit();
}

export function getWorkspaceTabDrag(): WorkspaceTabDragSnapshot | null {
  return current;
}

export function subscribeWorkspaceTabDrag(listener: Listener): () => void {
  listeners.add(listener);
  listener(current);
  return () => {
    listeners.delete(listener);
  };
}

/** Resolve pane drop under the pointer via leaf geometry (stable; no overlay gaps). */
export function hitTestPaneDropAt(
  clientX: number,
  clientY: number,
): { leafId: string; zone: string } | null {
  return resolvePaneDropAt(clientX, clientY);
}

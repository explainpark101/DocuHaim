type WorkspaceTabDragSnapshot = {
  tabId: string;
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

/** Resolve `[data-pane-drop="pane-drop:leaf:zone"]` under the pointer. */
export function hitTestPaneDropAt(
  clientX: number,
  clientY: number,
): { leafId: string; zone: string } | null {
  if (typeof document === 'undefined') return null;
  const stack =
    typeof document.elementsFromPoint === 'function'
      ? document.elementsFromPoint(clientX, clientY)
      : ([document.elementFromPoint(clientX, clientY)].filter(Boolean) as Element[]);
  for (const el of stack) {
    const node = el.closest?.('[data-pane-drop]') as HTMLElement | null;
    if (!node) continue;
    const raw = node.getAttribute('data-pane-drop') || '';
    if (!raw.startsWith('pane-drop:')) continue;
    const rest = raw.slice('pane-drop:'.length);
    const idx = rest.lastIndexOf(':');
    if (idx < 0) continue;
    return { leafId: rest.slice(0, idx), zone: rest.slice(idx + 1) };
  }
  return null;
}

import {
  resetPaneDropZoneHistory,
  resolvePaneDropAt,
  type PaneDropHit,
  type PaneDropZone,
} from '@/utils/workspaceTabs/paneDropGeometry';

type WorkspaceTabDragSnapshot = {
  tabId: string;
  /** When set, the drag relocates a whole pane via its header (not a single tab). */
  paneLeafId?: string;
  clientX: number;
  clientY: number;
};

/** Last zone painted by the drop overlay — commit must match what the user saw. */
export type PaneDropOverlayHit = {
  leafId: string;
  zone: PaneDropZone;
  workspaceEdge: boolean;
};

type Listener = (snap: WorkspaceTabDragSnapshot | null) => void;

let current: WorkspaceTabDragSnapshot | null = null;
let overlayHit: PaneDropOverlayHit | null = null;
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) listener(current);
}

function toOverlayHit(hit: PaneDropHit | null): PaneDropOverlayHit | null {
  if (!hit) return null;
  return {
    leafId: hit.leafId,
    zone: hit.zone,
    workspaceEdge: hit.workspaceEdge,
  };
}

export function setWorkspaceTabDrag(snap: WorkspaceTabDragSnapshot | null): void {
  if (!snap) {
    resetPaneDropZoneHistory();
    overlayHit = null;
  } else if (!current) {
    // New drag session — start without leftover hysteresis from a prior drag.
    resetPaneDropZoneHistory();
    overlayHit = null;
  }
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

/**
 * Record the hit currently shown by WorkspacePaneDropOverlay.
 * Drop handlers must prefer this over a fresh hit-test after drag teardown.
 */
export function setPaneDropOverlayHit(hit: PaneDropOverlayHit | null): void {
  overlayHit = hit;
}

export function getPaneDropOverlayHit(): PaneDropOverlayHit | null {
  return overlayHit;
}

export function subscribeWorkspaceTabDrag(listener: Listener): () => void {
  listeners.add(listener);
  listener(current);
  return () => {
    listeners.delete(listener);
  };
}

/** Resolve pane drop under the pointer via leaf geometry (stable; no overlay gaps). */
export function hitTestPaneDropAt(clientX: number, clientY: number): PaneDropHit | null {
  return resolvePaneDropAt(clientX, clientY);
}

/**
 * Prefer the overlay hit (what the user saw). Fall back to geometry at (x,y).
 * Call before clearing the drag session.
 */
export function resolvePaneDropForCommit(
  clientX: number,
  clientY: number,
): PaneDropOverlayHit | null {
  if (overlayHit) return overlayHit;
  return toOverlayHit(resolvePaneDropAt(clientX, clientY));
}

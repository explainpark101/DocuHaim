import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion as Motion } from 'motion/react';
import { PANE_SPLIT_ROOT_ATTR } from '@/utils/workspaceTabs/paneBoundarySnap';
import type { PaneSplitEdge } from '@/utils/workspaceTabs/paneLayout';
import {
  PANE_CENTER_PREVIEW_INSET_PCT,
  PANE_CENTER_PREVIEW_SCALE,
  PANE_LEAF_ATTR,
  PANE_SPLIT_PREVIEW_PCT,
  type PaneDropZone,
} from '@/utils/workspaceTabs/paneDropGeometry';
import {
  registerPaneDropOverlayFlush,
  setPaneDropOverlayHit,
} from '@/utils/workspaceTabs/workspaceTabDragBridge';

type WorkspacePaneDropOverlayProps = {
  leafId: string | null;
  visible: boolean;
  activeZone: PaneSplitEdge | 'center' | null;
  /** Preview against the whole workspace root (full-height / full-width strip). */
  workspaceEdge?: boolean;
};

/** How often the overlay may retarget after the previous move finishes. */
export const PANE_DROP_OVERLAY_MOVE_MS = 500;

const PREVIEW_TRANSITION = {
  type: 'tween' as const,
  ease: [0.22, 1, 0.36, 1] as const,
  duration: PANE_DROP_OVERLAY_MOVE_MS / 1000,
};

type PaneBox = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/** Pixel rect relative to the pane box (Motion interpolates numbers reliably). */
type PxRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
};

type OverlayTarget = {
  leafId: string | null;
  zone: PaneDropZone;
  workspaceEdge: boolean;
  box: PaneBox;
};

function sameBox(a: PaneBox | null, b: PaneBox | null): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  return (
    a.left === b.left &&
    a.top === b.top &&
    a.width === b.width &&
    a.height === b.height
  );
}

function sameTarget(a: OverlayTarget | null, b: OverlayTarget | null): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  return (
    a.leafId === b.leafId &&
    a.zone === b.zone &&
    a.workspaceEdge === b.workspaceEdge &&
    sameBox(a.box, b.box)
  );
}

function escapeAttrValue(value: string): string {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
    return CSS.escape(value);
  }
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/** Resolve the on-screen box for the workspace split root. */
export function measurePaneSplitRootBox(): PaneBox | null {
  if (typeof document === 'undefined') return null;
  const node = document.querySelector<HTMLElement>(`[${PANE_SPLIT_ROOT_ATTR}]`);
  if (!node) return null;
  const rect = node.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return null;
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

/** Resolve the on-screen box for a leaf (smallest matching node if duplicates exist). */
export function measurePaneLeafBox(leafId: string): PaneBox | null {
  if (typeof document === 'undefined' || !leafId) return null;
  const nodes = document.querySelectorAll<HTMLElement>(
    `[${PANE_LEAF_ATTR}="${escapeAttrValue(leafId)}"]`,
  );
  let best: PaneBox | null = null;
  let bestArea = Infinity;
  for (const node of nodes) {
    const rect = node.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) continue;
    const area = rect.width * rect.height;
    if (area >= bestArea) continue;
    bestArea = area;
    best = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
  }
  return best;
}

function measureTargetBox(
  leafId: string | null,
  workspaceEdge: boolean,
): PaneBox | null {
  if (workspaceEdge) return measurePaneSplitRootBox();
  if (!leafId) return null;
  return measurePaneLeafBox(leafId);
}

function halfSize(box: PaneBox, axis: 'x' | 'y'): number {
  const full = axis === 'x' ? box.width : box.height;
  return (PANE_SPLIT_PREVIEW_PCT / 100) * full;
}

/**
 * Target rects for the preview layers. One component tree for all zones so
 * Motion can spring between center ↔ edges without remounting.
 */
function previewRects(
  zone: PaneDropZone,
  box: PaneBox,
): { incoming: PxRect; remaining: PxRect } {
  const w = box.width;
  const h = box.height;
  const halfW = halfSize(box, 'x');
  const halfH = halfSize(box, 'y');
  const insetX = (PANE_CENTER_PREVIEW_INSET_PCT / 100) * w;
  const insetY = (PANE_CENTER_PREVIEW_INSET_PCT / 100) * h;
  const centerW = PANE_CENTER_PREVIEW_SCALE * w;
  const centerH = PANE_CENTER_PREVIEW_SCALE * h;

  switch (zone) {
    case 'left':
      return {
        incoming: { left: 0, top: 0, width: halfW, height: h, opacity: 1 },
        remaining: { left: halfW, top: 0, width: halfW, height: h, opacity: 1 },
      };
    case 'right':
      return {
        remaining: { left: 0, top: 0, width: halfW, height: h, opacity: 1 },
        incoming: { left: halfW, top: 0, width: halfW, height: h, opacity: 1 },
      };
    case 'top':
      return {
        incoming: { left: 0, top: 0, width: w, height: halfH, opacity: 1 },
        remaining: { left: 0, top: halfH, width: w, height: halfH, opacity: 1 },
      };
    case 'bottom':
      return {
        remaining: { left: 0, top: 0, width: w, height: halfH, opacity: 1 },
        incoming: { left: 0, top: halfH, width: w, height: halfH, opacity: 1 },
      };
    case 'center':
      return {
        incoming: {
          left: insetX,
          top: insetY,
          width: centerW,
          height: centerH,
          opacity: 1,
        },
        // Hide the "remaining" layer while swapping panes (center).
        remaining: {
          left: insetX,
          top: insetY,
          width: centerW,
          height: centerH,
          opacity: 0,
        },
      };
  }
}

function PreviewLayers({ zone, box }: { zone: PaneDropZone; box: PaneBox }) {
  const { incoming, remaining } = previewRects(zone, box);
  return (
    <>
      <Motion.div
        className="pointer-events-none absolute bg-blue-500/55 ring-2 ring-inset ring-blue-400 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.85)]"
        initial={false}
        animate={incoming}
        transition={PREVIEW_TRANSITION}
      />
      <Motion.div
        className="pointer-events-none absolute overflow-hidden rounded-sm bg-white/30 ring-2 ring-inset ring-white/80 dark:bg-odp-surface/35 dark:ring-white/40"
        initial={false}
        animate={remaining}
        transition={PREVIEW_TRANSITION}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(59,130,246,0.14)_100%)]" />
      </Motion.div>
    </>
  );
}

/**
 * Visual-only drop preview. Stays mounted while dragging; retargets at most
 * every {@link PANE_DROP_OVERLAY_MOVE_MS} once the previous move has finished
 * (no per-frame remount / reload).
 */
export default function WorkspacePaneDropOverlay({
  leafId,
  visible,
  activeZone,
  workspaceEdge = false,
}: WorkspacePaneDropOverlayProps) {
  /** Committed visual target (throttled). */
  const [display, setDisplay] = useState<OverlayTarget | null>(null);
  const displayRef = useRef<OverlayTarget | null>(null);
  displayRef.current = display;

  const pendingRef = useRef<OverlayTarget | null>(null);
  const movingRef = useRef(false);
  const moveTimerRef = useRef<number | null>(null);
  const lastZoneRef = useRef<PaneDropZone | null>(null);

  if (activeZone) lastZoneRef.current = activeZone;
  const liveZone = activeZone ?? lastZoneRef.current;

  const clearMoveTimer = () => {
    if (moveTimerRef.current != null) {
      window.clearTimeout(moveTimerRef.current);
      moveTimerRef.current = null;
    }
  };

  const applyTarget = (next: OverlayTarget) => {
    if (sameTarget(displayRef.current, next)) {
      movingRef.current = false;
      setPaneDropOverlayHit({
        leafId: next.leafId ?? '',
        zone: next.zone,
        workspaceEdge: next.workspaceEdge,
      });
      return;
    }
    movingRef.current = true;
    setDisplay(next);
    setPaneDropOverlayHit({
      leafId: next.leafId ?? '',
      zone: next.zone,
      workspaceEdge: next.workspaceEdge,
    });
    clearMoveTimer();
    moveTimerRef.current = window.setTimeout(() => {
      moveTimerRef.current = null;
      movingRef.current = false;
      const pending = pendingRef.current;
      pendingRef.current = null;
      if (pending) applyTarget(pending);
    }, PANE_DROP_OVERLAY_MOVE_MS);
  };

  const queueTarget = (next: OverlayTarget | null) => {
    if (!next) {
      pendingRef.current = null;
      clearMoveTimer();
      movingRef.current = false;
      setDisplay(null);
      return;
    }
    if (!movingRef.current) {
      applyTarget(next);
      return;
    }
    // Wait until the current 500ms move finishes, then jump to latest intent.
    pendingRef.current = next;
  };

  const flushPending = () => {
    const pending = pendingRef.current;
    if (!pending) return;
    pendingRef.current = null;
    clearMoveTimer();
    movingRef.current = false;
    applyTarget(pending);
  };

  useEffect(() => {
    registerPaneDropOverlayFlush(() => {
      const pending = pendingRef.current;
      if (!pending) return;
      pendingRef.current = null;
      if (moveTimerRef.current != null) {
        window.clearTimeout(moveTimerRef.current);
        moveTimerRef.current = null;
      }
      movingRef.current = false;
      // Apply via queue with moving cleared so it commits immediately.
      setDisplay(pending);
      displayRef.current = pending;
      setPaneDropOverlayHit({
        leafId: pending.leafId ?? '',
        zone: pending.zone,
        workspaceEdge: pending.workspaceEdge,
      });
    });
    return () => registerPaneDropOverlayFlush(null);
  }, []);

  // Build the latest desired target from live props; schedule a throttled apply.
  useLayoutEffect(() => {
    if (!visible || !liveZone || (!leafId && !workspaceEdge)) {
      queueTarget(null);
      return undefined;
    }

    const push = () => {
      const box = measureTargetBox(leafId, workspaceEdge);
      if (!box || !liveZone) return;
      queueTarget({
        leafId,
        zone: liveZone,
        workspaceEdge,
        box,
      });
    };

    push();
    // Re-measure only on scroll/resize — not every pointermove.
    window.addEventListener('scroll', push, true);
    window.addEventListener('resize', push);
    return () => {
      window.removeEventListener('scroll', push, true);
      window.removeEventListener('resize', push);
    };
  }, [visible, leafId, liveZone, workspaceEdge]);

  useEffect(() => {
    if (!visible) {
      lastZoneRef.current = null;
      pendingRef.current = null;
      clearMoveTimer();
      movingRef.current = false;
      setDisplay(null);
    }
    return () => {
      clearMoveTimer();
    };
  }, [visible]);

  if (!visible || !display) return null;
  if (typeof document === 'undefined') return null;

  const { box, zone, leafId: shownLeafId, workspaceEdge: shownWorkspace } = display;

  return createPortal(
    <Motion.div
      className="pointer-events-none fixed z-100020"
      initial={false}
      animate={{
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
      }}
      transition={PREVIEW_TRANSITION}
      aria-hidden
      data-pane-drop-overlay={shownWorkspace ? 'workspace' : shownLeafId}
      data-pane-drop-zone={zone}
      data-pane-drop-workspace-edge={shownWorkspace ? '1' : undefined}
    >
      <PreviewLayers zone={zone} box={box} />
    </Motion.div>,
    document.body,
  );
}

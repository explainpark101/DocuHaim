import { useLayoutEffect, useRef, useState } from 'react';
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

type WorkspacePaneDropOverlayProps = {
  leafId: string | null;
  visible: boolean;
  activeZone: PaneSplitEdge | 'center' | null;
  /** Preview against the whole workspace root (full-height / full-width strip). */
  workspaceEdge?: boolean;
};

const PREVIEW_TRANSITION = {
  type: 'spring' as const,
  bounce: 0.12,
  duration: 0.32,
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
 * Visual-only drop preview anchored to the highlighted leaf's live screen box.
 * Portaled + fixed; inner rects use pixel springs so zone changes animate inside splits.
 */
export default function WorkspacePaneDropOverlay({
  leafId,
  visible,
  activeZone,
  workspaceEdge = false,
}: WorkspacePaneDropOverlayProps) {
  const [box, setBox] = useState<PaneBox | null>(null);
  /** Keep last zone so Motion stays mounted across brief nulls / leaf switches. */
  const lastZoneRef = useRef<PaneDropZone | null>(null);
  if (activeZone) lastZoneRef.current = activeZone;
  const zone = activeZone ?? lastZoneRef.current;

  useLayoutEffect(() => {
    if (!visible || (!leafId && !workspaceEdge)) {
      setBox(null);
      return undefined;
    }

    const sync = () => {
      const next = workspaceEdge ? measurePaneSplitRootBox() : leafId ? measurePaneLeafBox(leafId) : null;
      setBox((prev) => (sameBox(prev, next) ? prev : next));
    };
    sync();

    window.addEventListener('pointermove', sync);
    window.addEventListener('scroll', sync, true);
    window.addEventListener('resize', sync);
    return () => {
      window.removeEventListener('pointermove', sync);
      window.removeEventListener('scroll', sync, true);
      window.removeEventListener('resize', sync);
    };
  }, [visible, leafId, workspaceEdge]);

  useLayoutEffect(() => {
    if (!visible) lastZoneRef.current = null;
  }, [visible]);

  if (!visible || !zone || !box) return null;
  if (!workspaceEdge && !leafId) return null;
  if (typeof document === 'undefined') return null;

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
      data-pane-drop-overlay={workspaceEdge ? 'workspace' : leafId}
      data-pane-drop-zone={zone}
      data-pane-drop-workspace-edge={workspaceEdge ? '1' : undefined}
    >
      <PreviewLayers zone={zone} box={box} />
    </Motion.div>,
    document.body,
  );
}

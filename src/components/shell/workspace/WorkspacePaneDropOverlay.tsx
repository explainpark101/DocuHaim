import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion as Motion } from 'motion/react';
import type { PaneSplitEdge } from '@/utils/workspaceTabs/paneLayout';
import {
  PANE_CENTER_PREVIEW_INSET_PCT,
  PANE_LEAF_ATTR,
  PANE_SPLIT_PREVIEW_PCT,
} from '@/utils/workspaceTabs/paneDropGeometry';
type WorkspacePaneDropOverlayProps = {
  leafId: string | null;
  visible: boolean;
  activeZone: PaneSplitEdge | 'center' | null;
};

const PREVIEW_TRANSITION = {
  type: 'spring' as const,
  bounce: 0.1,
  duration: 0.28,
};

type RectAnim = {
  left: string;
  top: string;
  width: string;
  height: string;
};

type PaneBox = {
  left: number;
  top: number;
  width: number;
  height: number;
};

function splitRects(zone: PaneSplitEdge): { incoming: RectAnim; remaining: RectAnim } {
  const half = `${PANE_SPLIT_PREVIEW_PCT}%`;
  switch (zone) {
    case 'left':
      return {
        incoming: { left: '0%', top: '0%', width: half, height: '100%' },
        remaining: { left: half, top: '0%', width: half, height: '100%' },
      };
    case 'right':
      return {
        remaining: { left: '0%', top: '0%', width: half, height: '100%' },
        incoming: { left: half, top: '0%', width: half, height: '100%' },
      };
    case 'top':
      return {
        incoming: { left: '0%', top: '0%', width: '100%', height: half },
        remaining: { left: '0%', top: half, width: '100%', height: half },
      };
    case 'bottom':
      return {
        remaining: { left: '0%', top: '0%', width: '100%', height: half },
        incoming: { left: '0%', top: half, width: '100%', height: half },
      };
  }
}

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

/**
 * Motion preview of how the current pane shrinks when an edge split is created.
 * Uses absolute rect animation (no remount) so the preview stays solid while dragging.
 */
function EdgeSplitPreview({ zone }: { zone: PaneSplitEdge }) {
  const { incoming, remaining } = splitRects(zone);
  return (
    <div className="pointer-events-none absolute inset-0">
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
    </div>
  );
}

function CenterJoinPreview() {
  const inset = `${PANE_CENTER_PREVIEW_INSET_PCT}%`;
  return (
    <div
      className="pointer-events-none absolute bg-blue-500/55 ring-2 ring-inset ring-blue-400 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.85)]"
      style={{ left: inset, top: inset, right: inset, bottom: inset }}
    />
  );
}

/**
 * Visual-only drop preview anchored to the highlighted leaf's live screen box.
 * Portaled + `position: fixed` so vertical/horizontal splits never inherit the
 * first pane's containing block (percentage overlays inside nested flex leaves).
 */
export default function WorkspacePaneDropOverlay({
  leafId,
  visible,
  activeZone,
}: WorkspacePaneDropOverlayProps) {
  const [box, setBox] = useState<PaneBox | null>(null);

  useLayoutEffect(() => {
    if (!visible || !leafId || !activeZone) {
      setBox(null);
      return undefined;
    }

    const sync = () => {
      const next = measurePaneLeafBox(leafId);
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
  }, [visible, leafId, activeZone]);

  if (!visible || !activeZone || !leafId || !box) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="pointer-events-none fixed z-100020"
      style={{
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
      }}
      aria-hidden
      data-pane-drop-overlay={leafId}
    >
      {activeZone === 'center' ? (
        <CenterJoinPreview />
      ) : (
        <EdgeSplitPreview key={leafId} zone={activeZone} />
      )}
    </div>,
    document.body,
  );
}

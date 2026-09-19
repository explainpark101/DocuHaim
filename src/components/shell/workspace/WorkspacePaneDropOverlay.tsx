import { motion as Motion } from 'motion/react';
import type { PaneSplitEdge } from '@/utils/workspaceTabs/paneLayout';
import { PANE_SPLIT_PREVIEW_PCT } from '@/utils/workspaceTabs/paneDropGeometry';
import { paneDropZoneStyle } from '@/components/shell/workspace/WorkspacePaneDropTargets';

type WorkspacePaneDropOverlayProps = {
  leafId: string;
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
  return (
    <div
      className="pointer-events-none absolute bg-blue-500/45 ring-2 ring-inset ring-blue-400"
      style={paneDropZoneStyle('center')}
    />
  );
}

/**
 * Visual-only drop preview. Zone resolution is geometric on `[data-pane-leaf]`
 * (see resolvePaneDropAt) — no fragile hit-target gaps.
 */
export default function WorkspacePaneDropOverlay({
  visible,
  activeZone,
}: WorkspacePaneDropOverlayProps) {
  if (!visible || !activeZone) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden>
      {activeZone === 'center' ? (
        <CenterJoinPreview />
      ) : (
        <EdgeSplitPreview zone={activeZone} />
      )}
    </div>
  );
}

import { useDroppable } from '@dnd-kit/core';
import type { CSSProperties } from 'react';
import type { PaneSplitEdge } from '@/utils/workspaceTabs/paneLayout';

export function paneDropId(leafId: string, zone: PaneSplitEdge | 'center'): string {
  return `pane-drop:${leafId}:${zone}`;
}

export function parsePaneDropId(
  id: string,
): { leafId: string; zone: PaneSplitEdge | 'center' } | null {
  if (!id.startsWith('pane-drop:')) return null;
  const rest = id.slice('pane-drop:'.length);
  const idx = rest.lastIndexOf(':');
  if (idx < 0) return null;
  const leafId = rest.slice(0, idx);
  const zone = rest.slice(idx + 1) as PaneSplitEdge | 'center';
  if (!leafId) return null;
  if (
    zone !== 'left' &&
    zone !== 'right' &&
    zone !== 'top' &&
    zone !== 'bottom' &&
    zone !== 'center'
  ) {
    return null;
  }
  return { leafId, zone };
}

/** Edge zone thickness as a percent of the pane. */
export const PANE_DROP_EDGE_PCT = 40;

/** Empty strip between edge and center zones (corners stay empty; no overlap). */
export const PANE_DROP_GUTTER_PCT = 0;

/** Distance from pane edge to center start / cross-axis inset for edge zones. */
export const PANE_DROP_INNER_PCT = PANE_DROP_EDGE_PCT + PANE_DROP_GUTTER_PCT;

/** Absolute layout for one drop zone, derived from the % constants above. */
export function paneDropZoneStyle(zone: PaneSplitEdge | 'center'): CSSProperties {
  const edge = `${PANE_DROP_EDGE_PCT}%`;
  const inner = `${PANE_DROP_INNER_PCT}%`;
  switch (zone) {
    case 'left':
      return { left: 0, top: inner, bottom: inner, width: edge };
    case 'right':
      return { right: 0, top: inner, bottom: inner, width: edge };
    case 'top':
      return { top: 0, left: inner, right: inner, height: edge };
    case 'bottom':
      return { bottom: 0, left: inner, right: inner, height: edge };
    case 'center':
      return { inset: inner };
  }
}

function Zone({
  leafId,
  zone,
}: {
  leafId: string;
  zone: PaneSplitEdge | 'center';
}) {
  const { setNodeRef, isOver } = useDroppable({ id: paneDropId(leafId, zone) });
  return (
    <div
      ref={setNodeRef}
      style={paneDropZoneStyle(zone)}
      className={`absolute ${
        isOver ? 'bg-blue-500/60 ring-2 ring-inset ring-blue-400' : 'bg-blue-500/20'
      }`}
      data-pane-drop={paneDropId(leafId, zone)}
    />
  );
}

/** Edge/center droppables for one leaf while a workspace tab is dragged. */
export default function WorkspacePaneDropTargets({
  leafId,
  enabled,
}: {
  leafId: string;
  enabled: boolean;
}) {
  if (!enabled) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden>
      <div className="pointer-events-auto absolute inset-0">
        <Zone leafId={leafId} zone="left" />
        <Zone leafId={leafId} zone="right" />
        <Zone leafId={leafId} zone="top" />
        <Zone leafId={leafId} zone="bottom" />
        <Zone leafId={leafId} zone="center" />
      </div>
    </div>
  );
}

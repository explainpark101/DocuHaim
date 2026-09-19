import { useDroppable } from '@dnd-kit/core';
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

/** Edge 30%, gutter 3% → inner start 33%. Corners stay empty (no overlap). */
export const PANE_DROP_ZONE_POS: Record<PaneSplitEdge | 'center', string> = {
  left: 'left-0 top-[33%] bottom-[33%] w-[30%]',
  right: 'right-0 top-[33%] bottom-[33%] w-[30%]',
  top: 'top-0 left-[33%] right-[33%] h-[30%]',
  bottom: 'bottom-0 left-[33%] right-[33%] h-[30%]',
  center: 'inset-[33%]',
};

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
      className={`absolute ${PANE_DROP_ZONE_POS[zone]} ${
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

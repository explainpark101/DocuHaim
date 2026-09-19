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

function Zone({
  leafId,
  zone,
  className,
}: {
  leafId: string;
  zone: PaneSplitEdge | 'center';
  className: string;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: paneDropId(leafId, zone) });
  return (
    <div
      ref={setNodeRef}
      className={`${className} ${
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
        <Zone leafId={leafId} zone="left" className="absolute inset-y-0 left-0 w-[22%]" />
        <Zone leafId={leafId} zone="right" className="absolute inset-y-0 right-0 w-[22%]" />
        <Zone leafId={leafId} zone="top" className="absolute inset-x-0 top-0 h-[22%]" />
        <Zone leafId={leafId} zone="bottom" className="absolute inset-x-0 bottom-0 h-[22%]" />
        <Zone leafId={leafId} zone="center" className="absolute inset-[22%]" />
      </div>
    </div>
  );
}

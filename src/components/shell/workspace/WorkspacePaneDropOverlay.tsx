import type { PaneSplitEdge } from '@/utils/workspaceTabs/paneLayout';
import { paneDropId } from '@/components/shell/workspace/WorkspacePaneDropTargets';

type WorkspacePaneDropOverlayProps = {
  leafId: string;
  visible: boolean;
  activeZone: PaneSplitEdge | 'center' | null;
};

const ZONE_BASE = 'absolute transition-colors';

/**
 * Visual + hit-test targets for tab→pane drops (works across separate DndContext trees).
 */
export default function WorkspacePaneDropOverlay({
  leafId,
  visible,
  activeZone,
}: WorkspacePaneDropOverlayProps) {
  if (!visible) return null;

  const hl = (zone: PaneSplitEdge | 'center') =>
    activeZone === zone
      ? 'bg-blue-500/60 ring-2 ring-inset ring-blue-400 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.9)]'
      : 'bg-blue-500/25';

  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden>
      <div className="absolute inset-0 bg-slate-900/25 dark:bg-black/40" />
      <div
        data-pane-drop={paneDropId(leafId, 'left')}
        className={`${ZONE_BASE} pointer-events-auto inset-y-0 left-0 w-[22%] ${hl('left')}`}
      />
      <div
        data-pane-drop={paneDropId(leafId, 'right')}
        className={`${ZONE_BASE} pointer-events-auto inset-y-0 right-0 w-[22%] ${hl('right')}`}
      />
      <div
        data-pane-drop={paneDropId(leafId, 'top')}
        className={`${ZONE_BASE} pointer-events-auto inset-x-0 top-0 h-[22%] ${hl('top')}`}
      />
      <div
        data-pane-drop={paneDropId(leafId, 'bottom')}
        className={`${ZONE_BASE} pointer-events-auto inset-x-0 bottom-0 h-[22%] ${hl('bottom')}`}
      />
      <div
        data-pane-drop={paneDropId(leafId, 'center')}
        className={`${ZONE_BASE} pointer-events-auto inset-[22%] ${hl('center')}`}
      />
    </div>
  );
}

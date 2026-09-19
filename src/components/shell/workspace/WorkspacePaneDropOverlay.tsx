import type { PaneSplitEdge } from '@/utils/workspaceTabs/paneLayout';
import {
  PANE_DROP_ZONE_POS,
  paneDropId,
} from '@/components/shell/workspace/WorkspacePaneDropTargets';

type WorkspacePaneDropOverlayProps = {
  leafId: string;
  visible: boolean;
  activeZone: PaneSplitEdge | 'center' | null;
};

const ZONE_BASE = 'absolute transition-colors';

/**
 * Visual + hit-test targets for tab→pane drops (works across separate DndContext trees).
 * Zones do not overlap; corners and gutters between zones stay empty.
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

  const zones: (PaneSplitEdge | 'center')[] = ['left', 'right', 'top', 'bottom', 'center'];

  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden>
      <div className="absolute inset-0 bg-slate-900/25 dark:bg-black/40" />
      {zones.map((zone) => (
        <div
          key={zone}
          data-pane-drop={paneDropId(leafId, zone)}
          className={`${ZONE_BASE} pointer-events-auto ${PANE_DROP_ZONE_POS[zone]} ${hl(zone)}`}
        />
      ))}
    </div>
  );
}

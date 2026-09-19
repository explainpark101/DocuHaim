import type { PaneSplitEdge } from '@/utils/workspaceTabs/paneLayout';
import {
  paneDropId,
  paneDropZoneStyle,
  paneSplitPreviewStyle,
} from '@/components/shell/workspace/WorkspacePaneDropTargets';

type WorkspacePaneDropOverlayProps = {
  leafId: string;
  visible: boolean;
  activeZone: PaneSplitEdge | 'center' | null;
};

/**
 * Hit-test targets for tab→pane drops + a blue preview only on the space
 * the new split pane will occupy (no full-pane dim / no idle zone fill).
 */
export default function WorkspacePaneDropOverlay({
  leafId,
  visible,
  activeZone,
}: WorkspacePaneDropOverlayProps) {
  if (!visible) return null;

  const zones: (PaneSplitEdge | 'center')[] = ['left', 'right', 'top', 'bottom', 'center'];
  const previewStyle = activeZone ? paneSplitPreviewStyle(activeZone) : null;
  const showCenterPreview = activeZone === 'center';

  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden>
      {/* Invisible hit targets (pointer only). */}
      {zones.map((zone) => (
        <div
          key={zone}
          data-pane-drop={paneDropId(leafId, zone)}
          style={paneDropZoneStyle(zone)}
          className="absolute pointer-events-auto"
        />
      ))}
      {/* Blue only on the future split pane region (edge) or center join target. */}
      {previewStyle ? (
        <div
          style={previewStyle}
          className="absolute bg-blue-500/55 ring-2 ring-inset ring-blue-400 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.9)]"
        />
      ) : null}
      {showCenterPreview ? (
        <div
          style={paneDropZoneStyle('center')}
          className="absolute bg-blue-500/45 ring-2 ring-inset ring-blue-400"
        />
      ) : null}
    </div>
  );
}

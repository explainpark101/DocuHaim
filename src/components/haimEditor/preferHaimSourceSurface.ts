import type { EditorView } from '@codemirror/view';
import {
  HAIM_VIEW_MODE_SOURCE,
  type HaimViewMode,
} from '@/utils/haimViewModeSettings';
import type { HaimDualSyncAuthor } from '@/components/haimEditor/haimDualSyncApply';

export type PreferHaimSourceSurfaceOptions = {
  cm: EditorView | null | undefined;
  /** TipTap ProseMirror DOM has focus. */
  tipTapFocused?: boolean | undefined;
  /** Last dual-pane keyboard author (survives toolbar mousedown blur). */
  lastAuthor?: HaimDualSyncAuthor | undefined;
  effectiveMode: HaimViewMode;
  showSource: boolean;
  showWysiwyg: boolean;
};

/**
 * Whether format / insert actions should target CodeMirror (source) vs TipTap.
 * Prefer live CM focus; if neither pane is focused (toolbar click), use lastAuthor.
 */
export function preferHaimSourceSurface(
  options: PreferHaimSourceSurfaceOptions,
): boolean {
  const cm = options.cm;
  if (!cm) return false;

  if (options.effectiveMode === HAIM_VIEW_MODE_SOURCE) return true;
  if (options.showSource && !options.showWysiwyg) return true;
  if (cm.hasFocus) return true;

  const tipTapFocused = Boolean(options.tipTapFocused);
  if (!tipTapFocused && options.lastAuthor === 'cm') return true;

  return false;
}

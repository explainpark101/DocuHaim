import {
  loadTreeFileOpenClickMode,
  TREE_FILE_OPEN_CLICK,
  type TreeFileOpenClickMode,
} from '@/utils/treeFileOpenClickModeSettings';

export type TreeFileOpenGesture = {
  /** Pointer Events pointerType from the gesture that produced the click. */
  pointerType: string;
  /** UIEvent.detail. Touch uses 1 for a tap; a second tap in a double-tap is 2. */
  clickDetail: number;
  hasModifier: boolean;
  source: 'click' | 'dblclick';
  /** Override preference (tests). Defaults to loadTreeFileOpenClickMode(). */
  mode?: TreeFileOpenClickMode;
};

/**
 * Whether a TreeNode file gesture should open the tab.
 * - click mode: first click/tap opens; ignore the synthetic second click of a double-tap.
 * - dblclick mode: only double-click / second tap opens (mouse/pen/touch).
 */
export function treeFileGestureOpensTab({
  pointerType,
  clickDetail,
  hasModifier,
  source,
  mode: modeOverride,
}: TreeFileOpenGesture): boolean {
  if (hasModifier) return false;
  const mode = modeOverride ?? loadTreeFileOpenClickMode();

  if (mode === TREE_FILE_OPEN_CLICK) {
    if (pointerType === 'touch') {
      return source === 'click' && clickDetail <= 1;
    }
    return source === 'click' && clickDetail <= 1;
  }

  // Double-click mode
  if (pointerType === 'touch') {
    return (
      (source === 'click' && clickDetail >= 2) ||
      (source === 'dblclick' && clickDetail >= 2)
    );
  }
  return source === 'dblclick';
}

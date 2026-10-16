export type TreeFileOpenGesture = {
  /** Pointer Events pointerType from the gesture that produced the click. */
  pointerType: string;
  /** UIEvent.detail. Touch uses 1 for a tap; a second tap in a double-tap is 2. */
  clickDetail: number;
  hasModifier: boolean;
  source: 'click' | 'dblclick';
};

/**
 * Mouse/pen: a click only selects; double-click opens the file tab.
 * Touch: one tap opens (same as a double-click). A following detail=2 click does not open again.
 */
export function treeFileGestureOpensTab({
  pointerType,
  clickDetail,
  hasModifier,
  source,
}: TreeFileOpenGesture): boolean {
  if (hasModifier) return false;
  if (pointerType === 'touch') {
    return source === 'click' && clickDetail <= 1;
  }
  return source === 'dblclick';
}

import {
  isTouchLikePointer,
  vibrateLongPressAction,
  wasLongPressHapticRecent,
} from '@/utils/hapticFeedback';

/**
 * Global touch long-press haptics for native `contextmenu` (e.g. sidebar tree).
 * Custom long-press handlers should call `vibrateLongPressAction()` directly;
 * this listener is a safety net when they do not.
 */
export function initTouchLongPressHaptics(): void {
  if (typeof document === 'undefined') return;

  let activeTouchPointers = 0;
  let lastTouchPointerAt = 0;

  const onPointerDown = (event: PointerEvent) => {
    if (!isTouchLikePointer(event.pointerType)) return;
    activeTouchPointers += 1;
    lastTouchPointerAt = Date.now();
  };

  const onPointerUp = (event: PointerEvent) => {
    if (!isTouchLikePointer(event.pointerType)) return;
    activeTouchPointers = Math.max(0, activeTouchPointers - 1);
    lastTouchPointerAt = Date.now();
  };

  const onContextMenu = (event: Event) => {
    const mouseEvent = event as MouseEvent;
    // macOS Ctrl+click is not a touch long-press.
    if (mouseEvent.ctrlKey && mouseEvent.button !== 2) return;

    const touchDerived =
      activeTouchPointers > 0 || Date.now() - lastTouchPointerAt < 700;
    if (!touchDerived) return;
    if (wasLongPressHapticRecent()) return;

    vibrateLongPressAction();
  };

  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('pointerup', onPointerUp, true);
  document.addEventListener('pointercancel', onPointerUp, true);
  document.addEventListener('contextmenu', onContextMenu, true);
}

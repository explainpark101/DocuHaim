import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { vibrateLongPressAction } from '@/utils/shared/hapticFeedback';

/** Hold this long on tree rows to open the mobile context menu modal. */
export const TREE_TOUCH_CONTEXT_MENU_MS = 500;

const MOVE_TOLERANCE_PX = 10;

type UseTreeNodeTouchGestureOptions = {
  enabled?: boolean;
  onContextMenu: () => void;
};

/**
 * Mobile tree row touch: 500ms hold opens context menu (+ haptic). Movement cancels.
 */
export function useTreeNodeTouchGesture({
  enabled = true,
  onContextMenu,
}: UseTreeNodeTouchGestureOptions) {
  const menuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const contextMenuOpenedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (menuTimerRef.current) {
      clearTimeout(menuTimerRef.current);
      menuTimerRef.current = null;
    }
  }, []);

  const endGesture = useCallback(() => {
    clearTimer();
    startRef.current = null;
  }, [clearTimer]);

  useEffect(() => () => endGesture(), [endGesture]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent) => {
      if (!enabled) return;
      if (event.pointerType === 'mouse') return;
      if (event.button !== 0 && event.button !== -1) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest?.('button, a, input, textarea')) return;

      contextMenuOpenedRef.current = false;
      clearTimer();
      startRef.current = { x: event.clientX, y: event.clientY };

      menuTimerRef.current = setTimeout(() => {
        menuTimerRef.current = null;
        contextMenuOpenedRef.current = true;
        vibrateLongPressAction();
        onContextMenu();
      }, TREE_TOUCH_CONTEXT_MENU_MS);
    },
    [enabled, clearTimer, onContextMenu],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent) => {
      const start = startRef.current;
      if (!start) return;

      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (dx * dx + dy * dy <= MOVE_TOLERANCE_PX * MOVE_TOLERANCE_PX) return;

      endGesture();
    },
    [endGesture],
  );

  const onPointerUp = useCallback(() => {
    endGesture();
  }, [endGesture]);

  const onPointerCancel = useCallback(() => {
    endGesture();
  }, [endGesture]);

  return {
    contextMenuOpenedRef,
    bindTouchGesture: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
}

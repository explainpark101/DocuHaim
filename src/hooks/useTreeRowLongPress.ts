import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { PRESSABLE_CARD_MENU_MS } from '@/components/chatWithMyself/usePressableCardMenu';
import { vibrateLongPressAction } from '@/utils/hapticFeedback';

const MOVE_TOLERANCE_PX = 10;

type UseTreeRowLongPressOptions = {
  enabled?: boolean;
  onLongPress: () => void;
};

/**
 * Touch long-press on sidebar tree rows (opens context menu on coarse pointers).
 */
export function useTreeRowLongPress({
  enabled = true,
  onLongPress,
}: UseTreeRowLongPressOptions) {
  const menuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const longPressOpenedRef = useRef(false);

  const clearLongPress = useCallback(() => {
    if (menuTimerRef.current) {
      clearTimeout(menuTimerRef.current);
      menuTimerRef.current = null;
    }
    startRef.current = null;
  }, []);

  useEffect(() => () => clearLongPress(), [clearLongPress]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent) => {
      if (!enabled) return;
      if (event.pointerType === 'mouse') return;
      if (event.button !== 0 && event.button !== -1) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest?.('button, a, input, textarea')) return;

      longPressOpenedRef.current = false;
      clearLongPress();
      startRef.current = { x: event.clientX, y: event.clientY };
      menuTimerRef.current = setTimeout(() => {
        menuTimerRef.current = null;
        longPressOpenedRef.current = true;
        vibrateLongPressAction();
        onLongPress();
      }, PRESSABLE_CARD_MENU_MS);
    },
    [enabled, clearLongPress, onLongPress],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent) => {
      const start = startRef.current;
      if (!start || !menuTimerRef.current) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (dx * dx + dy * dy > MOVE_TOLERANCE_PX * MOVE_TOLERANCE_PX) {
        clearLongPress();
      }
    },
    [clearLongPress],
  );

  const onPointerUp = useCallback(() => {
    clearLongPress();
  }, [clearLongPress]);

  const onPointerCancel = useCallback(() => {
    clearLongPress();
  }, [clearLongPress]);

  return {
    longPressOpenedRef,
    bindLongPress: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
}

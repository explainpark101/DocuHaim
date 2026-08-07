import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { vibrateLongPressAction } from '@/utils/hapticFeedback';

/** Hold this long on tree rows before touch drag can start (mobile). */
export const TREE_TOUCH_DRAG_READY_MS = 500;
/** Keep holding after drag-ready haptic to open the context menu modal (mobile). */
export const TREE_TOUCH_CONTEXT_MENU_MS = 2000;

const MOVE_TOLERANCE_PX = 10;

type UseTreeNodeTouchGestureOptions = {
  enabled?: boolean;
  onContextMenu: () => void;
};

/**
 * Mobile tree row touch: 500ms haptic (drag ready) → move to drag, or hold to 2s for menu + haptic.
 */
export function useTreeNodeTouchGesture({
  enabled = true,
  onContextMenu,
}: UseTreeNodeTouchGestureOptions) {
  const dragReadyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const dragReadyRef = useRef(false);
  const contextMenuOpenedRef = useRef(false);
  const [dragBlockedByMenuGesture, setDragBlockedByMenuGesture] = useState(false);
  const [dragReady, setDragReady] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  const clearTimers = useCallback(() => {
    if (dragReadyTimerRef.current) {
      clearTimeout(dragReadyTimerRef.current);
      dragReadyTimerRef.current = null;
    }
    if (menuTimerRef.current) {
      clearTimeout(menuTimerRef.current);
      menuTimerRef.current = null;
    }
  }, []);

  const endPointerGesture = useCallback(() => {
    clearTimers();
    startRef.current = null;
    targetRef.current = null;
    pointerIdRef.current = null;
    dragReadyRef.current = false;
    setDragReady(false);
    setIsPressing(false);
    setDragBlockedByMenuGesture(false);
  }, [clearTimers]);

  useEffect(() => () => endPointerGesture(), [endPointerGesture]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent) => {
      if (!enabled) return;
      if (event.pointerType === 'mouse') return;
      if (event.button !== 0 && event.button !== -1) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest?.('button, a, input, textarea')) return;

      contextMenuOpenedRef.current = false;
      dragReadyRef.current = false;
      setDragReady(false);
      setDragBlockedByMenuGesture(false);
      clearTimers();
      startRef.current = { x: event.clientX, y: event.clientY };
      targetRef.current = event.currentTarget as HTMLElement;
      pointerIdRef.current = event.pointerId;
      setIsPressing(true);

      dragReadyTimerRef.current = setTimeout(() => {
        dragReadyTimerRef.current = null;
        dragReadyRef.current = true;
        setDragReady(true);
        vibrateLongPressAction();
        const el = targetRef.current;
        const pointerId = pointerIdRef.current;
        if (el && pointerId != null) {
          try {
            el.setPointerCapture(pointerId);
          } catch {
            /* ignore */
          }
        }
      }, TREE_TOUCH_DRAG_READY_MS);

      menuTimerRef.current = setTimeout(() => {
        menuTimerRef.current = null;
        if (!dragReadyRef.current) return;
        contextMenuOpenedRef.current = true;
        setDragBlockedByMenuGesture(true);
        setDragReady(false);
        vibrateLongPressAction();
        onContextMenu();
      }, TREE_TOUCH_CONTEXT_MENU_MS);
    },
    [enabled, clearTimers, onContextMenu],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent) => {
      const start = startRef.current;
      if (!start) return;

      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (dx * dx + dy * dy <= MOVE_TOLERANCE_PX * MOVE_TOLERANCE_PX) return;

      if (menuTimerRef.current) {
        clearTimeout(menuTimerRef.current);
        menuTimerRef.current = null;
      }

      if (!dragReadyRef.current) {
        endPointerGesture();
        return;
      }

      // After drag-ready haptic, block native scroll so TouchSensor can take over.
      event.preventDefault();
      event.stopPropagation();
    },
    [endPointerGesture],
  );

  const onPointerUp = useCallback(() => {
    endPointerGesture();
  }, [endPointerGesture]);

  const onPointerCancel = useCallback(() => {
    endPointerGesture();
  }, [endPointerGesture]);

  return {
    contextMenuOpenedRef,
    dragBlockedByMenuGesture,
    dragReady,
    isPressing,
    bindTouchGesture: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
}

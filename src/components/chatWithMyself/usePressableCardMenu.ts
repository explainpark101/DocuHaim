import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { vibrateLongPressAction } from '@/utils/shared/hapticFeedback';

/** Shrink feedback starts at this hold duration. */
export const PRESSABLE_CARD_THRESHOLD_MS = 250;
/** Context menu opens after this total hold duration. */
export const PRESSABLE_CARD_MENU_MS = 500;

export const PRESSABLE_CARD_SHAPE_SPRING = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 28,
  mass: 0.85,
};

export const PRESSABLE_CARD_RADIUS = '0.75rem';
export const PRESSABLE_CARD_RADIUS_PRESSED = '0.9rem';

type UsePressableCardMenuOptions = {
  /** When false, long-press / menu open are disabled. */
  enabled?: boolean;
  /** Coarse pointer (touch) — custom long-press opens the menu. */
  coarse?: boolean;
};

/**
 * Shared press morph + long-press / context-menu open state for result cards
 * (모아보기, 검색, 수정 기록, etc.).
 */
export function usePressableCardMenu({
  enabled = true,
  coarse = false,
}: UsePressableCardMenuOptions = {}) {
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [pressing, setPressing] = useState(false);
  const longPressThresholdTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const longPressMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressOpenedRef = useRef(false);
  const pressStartRef = useRef<{ x: number; y: number } | null>(null);

  const shapeActive = pressing || contextMenuOpen;

  const clearLongPress = useCallback(() => {
    if (longPressThresholdTimer.current) {
      clearTimeout(longPressThresholdTimer.current);
      longPressThresholdTimer.current = null;
    }
    if (longPressMenuTimer.current) {
      clearTimeout(longPressMenuTimer.current);
      longPressMenuTimer.current = null;
    }
    pressStartRef.current = null;
  }, []);

  const endPressVisual = useCallback(() => {
    if (!longPressOpenedRef.current && !contextMenuOpen) {
      setPressing(false);
    }
  }, [contextMenuOpen]);

  const openMenuFromLongPress = useCallback(() => {
    longPressOpenedRef.current = true;
    longPressMenuTimer.current = null;
    vibrateLongPressAction();
    setPressing(true);
    setContextMenuOpen(true);
  }, []);

  useEffect(() => {
    if (!contextMenuOpen) {
      longPressOpenedRef.current = false;
      setPressing(false);
    }
  }, [contextMenuOpen]);

  useEffect(() => () => clearLongPress(), [clearLongPress]);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent) => {
      if (!enabled || !coarse) return;
      if (e.pointerType === 'mouse') return;
      if (e.button !== 0 && e.button !== -1) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest?.('button, a, input, textarea')) return;
      longPressOpenedRef.current = false;
      clearLongPress();
      pressStartRef.current = { x: e.clientX, y: e.clientY };
      longPressThresholdTimer.current = setTimeout(() => {
        setPressing(true);
      }, PRESSABLE_CARD_THRESHOLD_MS);
      longPressMenuTimer.current = setTimeout(() => {
        openMenuFromLongPress();
      }, PRESSABLE_CARD_MENU_MS);
    },
    [enabled, coarse, clearLongPress, openMenuFromLongPress],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent) => {
      const start = pressStartRef.current;
      if (
        !start ||
        (!longPressThresholdTimer.current && !longPressMenuTimer.current)
      ) {
        return;
      }
      if (
        Math.abs(e.clientX - start.x) > 10 ||
        Math.abs(e.clientY - start.y) > 10
      ) {
        clearLongPress();
        endPressVisual();
      }
    },
    [clearLongPress, endPressVisual],
  );

  const onPointerUp = useCallback(() => {
    clearLongPress();
    endPressVisual();
  }, [clearLongPress, endPressVisual]);

  const onPointerCancel = useCallback(() => {
    clearLongPress();
    endPressVisual();
  }, [clearLongPress, endPressVisual]);

  const onContextMenu = useCallback(
    (e: ReactMouseEvent) => {
      if (coarse) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [coarse],
  );

  const handleContextMenuOpenChange = useCallback((next: boolean) => {
    setContextMenuOpen(next);
    if (!next) setPressing(false);
  }, []);

  const motionAnimate = {
    scale: shapeActive ? 0.97 : 1,
    borderRadius: shapeActive
      ? PRESSABLE_CARD_RADIUS_PRESSED
      : PRESSABLE_CARD_RADIUS,
    filter: pressing ? 'brightness(0.92)' : 'brightness(1)',
  };

  const interactiveClass = enabled
    ? [
        'hover:bg-black/10 dark:hover:bg-white/10 cursor-context-menu',
        shapeActive
          ? 'bg-sky-500/20 hover:bg-sky-500/25 dark:bg-sky-400/20 dark:hover:bg-sky-400/25'
          : '',
      ]
        .filter(Boolean)
        .join(' ')
    : '';

  return {
    pressing,
    contextMenuOpen,
    setContextMenuOpen: handleContextMenuOpenChange,
    shapeActive,
    longPressOpenedRef,
    motionAnimate,
    motionTransition: PRESSABLE_CARD_SHAPE_SPRING,
    interactiveClass,
    bindPress: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onContextMenu,
    },
  };
}

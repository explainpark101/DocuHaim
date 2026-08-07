/** Brief pulse when a touch long-press action fires (context menu, sheet, etc.). */
export const LONG_PRESS_HAPTIC_MS = 12;

/** Short error pulse (e.g. path escapes vault root). */
export const ERROR_HAPTIC_PATTERN_MS: number[] = [40, 40, 40];

const HAPTIC_DEDUP_MS = 150;

let lastLongPressHapticAt = 0;

function canVibrate(): boolean {
  return (
    typeof navigator !== 'undefined'
    && typeof navigator.vibrate === 'function'
  );
}

export function isCoarsePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

export function isTouchLikePointer(
  pointerType: string | undefined | null,
): boolean {
  return pointerType === 'touch' || pointerType === 'pen';
}

/** True when a long-press haptic fired very recently (dedup guard). */
export function wasLongPressHapticRecent(): boolean {
  return Date.now() - lastLongPressHapticAt < HAPTIC_DEDUP_MS;
}

/**
 * Vibrate once for a touch long-press action.
 * Prefer this over raw `navigator.vibrate` so duration and dedup stay consistent.
 */
export function vibrateLongPressAction(
  durationMs: number = LONG_PRESS_HAPTIC_MS,
): void {
  if (!canVibrate()) return;
  try {
    navigator.vibrate(durationMs);
    lastLongPressHapticAt = Date.now();
  } catch {
    /* ignore */
  }
}

/** Vibrate once for validation / hard-block feedback. */
export function vibrateErrorFeedback(
  pattern: number | number[] = ERROR_HAPTIC_PATTERN_MS,
): void {
  if (!canVibrate()) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* ignore */
  }
}

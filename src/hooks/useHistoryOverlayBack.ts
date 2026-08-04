import { useEffect, useRef } from 'react';

const OVERLAY_STATE_KEY = 's3haimOverlay';

function isOverlayHistoryState(overlayId: string): boolean {
  const state = history.state;
  return (
    !!state &&
    typeof state === 'object' &&
    (state as Record<string, unknown>)[OVERLAY_STATE_KEY] === overlayId
  );
}

/**
 * Tie overlay open state to `history.pushState` so mobile browser back closes
 * the overlay instead of leaving the page.
 *
 * When the overlay closes because of an in-flight `navigate()`, do not call
 * `history.back()` — React Router may have already pushed the new entry while
 * React location is still deferred via `startTransition`. Rewinding would cancel
 * that navigation.
 */
export function useHistoryOverlayBack(
  open: boolean,
  onClose: () => void,
  enabled: boolean,
  overlayId = 'overlay',
) {
  const pushedRef = useRef(false);
  const closingFromPopRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      // Leaving the gated route/context: drop bookkeeping without rewinding.
      pushedRef.current = false;
      closingFromPopRef.current = false;
      return;
    }
    if (open && !pushedRef.current) {
      history.pushState({ [OVERLAY_STATE_KEY]: overlayId }, '');
      pushedRef.current = true;
    }
  }, [open, enabled, overlayId]);

  useEffect(() => {
    if (!enabled) return undefined;

    const onPopState = () => {
      if (!pushedRef.current) return;
      pushedRef.current = false;
      closingFromPopRef.current = true;
      onClose();
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [enabled, onClose]);

  useEffect(() => {
    if (!enabled) return;
    if (!open && pushedRef.current) {
      if (closingFromPopRef.current) {
        closingFromPopRef.current = false;
        pushedRef.current = false;
        return;
      }
      pushedRef.current = false;
      // Only rewind while still on our overlay entry. If navigate() already
      // pushed a new location, history.state no longer carries our key.
      if (isOverlayHistoryState(overlayId)) {
        history.back();
      }
    }
  }, [open, enabled, overlayId]);
}

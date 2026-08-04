import { useEffect, useRef } from 'react';

const OVERLAY_STATE_KEY = 's3haimOverlay';

/**
 * Tie overlay open state to `history.pushState` so mobile browser back closes
 * the overlay instead of leaving the page.
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
    if (!enabled) return;
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
      history.back();
    }
  }, [open, enabled]);
}

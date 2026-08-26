import { useCallback, useRef } from 'react';

const DEDUPE_MS = 400;

/**
 * Desktop WebKit (Tauri): the first mouse press inside overflow:auto panes can be
 * consumed by scroll-focus handoff, so click may not fire. Run on mousedown instead
 * and dedupe the follow-up keyboard click (detail === 0).
 */
export function useReliableButtonAction(
  action: (() => void) | undefined,
  disabled = false,
) {
  const actionRef = useRef(action);
  actionRef.current = action;
  const lastAtRef = useRef(0);

  const invoke = useCallback(() => {
    if (disabled) return;
    const now = Date.now();
    if (now - lastAtRef.current < DEDUPE_MS) return;
    lastAtRef.current = now;
    actionRef.current?.();
  }, [disabled]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  }, []);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled || e.button !== 0) return;
      e.preventDefault();
      invoke();
    },
    [disabled, invoke],
  );

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (e.detail === 0) invoke();
    },
    [invoke],
  );

  return { onPointerDown, onMouseDown, onClick };
}

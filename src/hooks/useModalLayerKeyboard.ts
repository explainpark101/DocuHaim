import { useEffect, useRef } from 'react';
import {
  ensureModalLayerKeyboardInstalled,
  popModalLayer,
  pushModalLayer,
  type ModalLayerHandlers,
} from '@/utils/modalLayerStack';

export type UseModalLayerKeyboardOptions = ModalLayerHandlers & {
  /** When false, this layer is not on the stack. */
  open: boolean;
};

/**
 * Register Esc/Enter handlers on the global modal stack while `open`.
 * Only the topmost open layer receives the shortcut; the event is consumed
 * so nested / background modals and other app key handlers do not also fire.
 */
export function useModalLayerKeyboard({
  open,
  onCancel,
  onConfirm,
  ignoreEnterInFields = false,
}: UseModalLayerKeyboardOptions): void {
  const handlersRef = useRef<ModalLayerHandlers>({
    onCancel,
    onConfirm,
    ignoreEnterInFields,
  });
  handlersRef.current = { onCancel, onConfirm, ignoreEnterInFields };

  useEffect(() => {
    ensureModalLayerKeyboardInstalled();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const id = pushModalLayer(() => handlersRef.current);
    return () => {
      popModalLayer(id);
    };
  }, [open]);
}

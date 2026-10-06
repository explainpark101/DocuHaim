import {
  useEffect,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion as Motion, type MotionStyle } from 'motion/react';
import Button from '@/components/Button';
import { IconBack, IconCheck, IconTrash } from '@/components/icons';
import { useModalLayerKeyboard } from '@/hooks/useModalLayerKeyboard';
import {
  ModalCornerResizeHandles,
  useModalCornerResize,
} from '@/components/modals/modalCornerResize';

const OVERLAY_TRANSITION = { duration: 0.18 };
const PANEL_TRANSITION = { type: 'spring' as const, stiffness: 420, damping: 32 };

export type ConfirmModalVariant = 'default' | 'danger';

export type ConfirmModalProps = {
  isOpen: boolean;
  title?: string | undefined;
  message?: string | undefined;
  confirmLabel?: string | undefined;
  cancelLabel?: string | undefined;
  discardLabel?: string | undefined;
  variant?: ConfirmModalVariant | undefined;
  onConfirm?: (() => void) | undefined;
  onCancel?: (() => void) | undefined;
  onDiscard?: (() => void) | undefined;
  children?: ReactNode | undefined;
  confirmDisabled?: boolean | undefined;
  /** When true, the cancel button is non-interactive (e.g. in-progress apply). */
  cancelDisabled?: boolean | undefined;
  resizable?: boolean | undefined;
  /** Root fixed layer (z-index); default `z-100000`. */
  overlayClassName?: string | undefined;
};

function isDangerConfirm(
  variant: ConfirmModalVariant | undefined,
  confirmLabel: string | undefined,
): boolean {
  if (variant === 'danger') return true;
  const label = String(confirmLabel ?? '');
  return /삭제|비우기/.test(label);
}

/**
 * Yes/no (and optional discard) confirm dialog with Motion open/close.
 * Portaled to document.body so z-index stacks above Radix Dialog overlays.
 */
export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = '확인',
  cancelLabel = '취소',
  discardLabel,
  variant = 'default',
  onConfirm,
  onCancel,
  onDiscard,
  children,
  confirmDisabled = false,
  cancelDisabled = false,
  resizable = true,
  overlayClassName = 'z-100000',
}: ConfirmModalProps) {
  const hasDiscard = Boolean(discardLabel && onDiscard);
  const danger = isDangerConfirm(variant, confirmLabel);
  const {
    panelRef,
    beginResize,
    resetBox,
    pinToCurrentRect,
    positioned,
    positionedStyle,
  } = useModalCornerResize(resizable, { resizeHeight: false });

  useModalLayerKeyboard({
    open: isOpen,
    onCancel: cancelDisabled ? undefined : onCancel,
    onConfirm: confirmDisabled ? undefined : onConfirm,
    ignoreEnterInFields: true,
  });

  useEffect(() => {
    if (!isOpen) return undefined;
    // Pull focus into the dialog so Enter is not ignored while a leftover
    // input (e.g. tree rename field) outside the modal still has focus.
    const frame = window.requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const active = document.activeElement;
      if (active instanceof HTMLElement && !panel.contains(active)) {
        active.blur();
      }
      if (active instanceof Node && panel.contains(active)) return;
      panel.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isOpen, panelRef]);

  useEffect(() => {
    if (!isOpen) {
      resetBox();
      return undefined;
    }
    // After Motion enter spring settles, pin fixed so resize does not
    // switch layout mode mid-drag (pointercancel).
    const timer = window.setTimeout(() => {
      pinToCurrentRect();
    }, 280);
    return () => window.clearTimeout(timer);
  }, [isOpen, resetBox, pinToCurrentRect]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <Motion.div
          key="confirm-modal"
          className={`fixed inset-0 ${overlayClassName} ${positioned ? '' : 'flex items-center justify-center p-4'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={OVERLAY_TRANSITION}
        >
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <Motion.div
            ref={panelRef as RefObject<HTMLDivElement | null>}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'confirm-modal-title' : undefined}
            tabIndex={-1}
            className={`relative z-10 flex w-full max-w-md max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white text-gray-800 shadow-2xl outline-none dark:bg-odp-surface dark:text-odp-fgStrong ${
              positioned ? 'max-w-none!' : ''
            }`}
            style={positionedStyle as MotionStyle}
            initial={positioned ? false : { opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={PANEL_TRANSITION}
          >
            <div className="overflow-y-auto p-6">
              {title ? (
                <h2
                  id="confirm-modal-title"
                  className="mb-2 text-lg font-bold text-gray-800 dark:text-odp-fgStrong"
                >
                  {title}
                </h2>
              ) : null}
              {message ? (
                <p className="mb-4 whitespace-pre-line text-sm text-gray-600 dark:text-gray-400">
                  {message}
                </p>
              ) : null}
              {children ? <div className="mb-4">{children}</div> : null}
              <div className="flex flex-wrap justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={onCancel}
                  disabled={cancelDisabled || !onCancel}
                >
                  <IconBack size={16} />
                  {cancelLabel}
                </Button>
                {hasDiscard ? (
                  <Button type="button" variant="secondary" size="md" onClick={onDiscard}>
                    {discardLabel}
                  </Button>
                ) : null}
                <Button
                  type="button"
                  variant={danger ? 'danger' : 'primary'}
                  size="md"
                  onClick={onConfirm}
                  disabled={confirmDisabled}
                >
                  {danger ? <IconTrash size={16} /> : <IconCheck size={16} />}
                  {confirmLabel}
                </Button>
              </div>
            </div>
            {resizable ? (
              <ModalCornerResizeHandles onBeginResize={beginResize} resizeHeight={false} />
            ) : null}
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

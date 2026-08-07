import { useEffect } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import Button from '@/components/Button';
import { IconBack, IconCheck, IconTrash } from '@/components/icons';
import { useModalLayerKeyboard } from '@/hooks/useModalLayerKeyboard';
import {
  ModalCornerResizeHandles,
  useModalCornerResize,
} from '@/components/modals/modalCornerResize';

const OVERLAY_TRANSITION = { duration: 0.18 };
const PANEL_TRANSITION = { type: 'spring', stiffness: 420, damping: 32 };

function isDangerConfirm(variant, confirmLabel) {
  if (variant === 'danger') return true;
  const label = String(confirmLabel ?? '');
  return /삭제|비우기/.test(label);
}

/**
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {string} [props.title]
 * @param {string} [props.message]
 * @param {string} [props.confirmLabel]
 * @param {string} [props.cancelLabel]
 * @param {string} [props.discardLabel]
 * @param {'default' | 'danger'} [props.variant]
 * @param {() => void} [props.onConfirm]
 * @param {() => void} [props.onCancel]
 * @param {() => void} [props.onDiscard]
 * @param {import('react').ReactNode} [props.children]
 * @param {boolean} [props.confirmDisabled]
 * @param {boolean} [props.resizable]
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
  resizable = true,
}) {
  const hasDiscard = discardLabel && typeof onDiscard === 'function';
  const danger = isDangerConfirm(variant, confirmLabel);
  const {
    panelRef,
    beginResize,
    resetBox,
    positioned,
    positionedStyle,
  } = useModalCornerResize(resizable, { minHeight: 200 });

  useModalLayerKeyboard({
    open: isOpen,
    onCancel,
    onConfirm: confirmDisabled ? undefined : onConfirm,
    ignoreEnterInFields: true,
  });

  useEffect(() => {
    if (!isOpen) resetBox();
  }, [isOpen, resetBox]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <Motion.div
          key="confirm-modal"
          className={`fixed inset-0 z-100000 ${positioned ? '' : 'flex items-center justify-center p-4'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={OVERLAY_TRANSITION}
        >
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <Motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'confirm-modal-title' : undefined}
            className={`relative z-10 flex w-full max-w-md max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white text-gray-800 shadow-2xl dark:bg-odp-surface dark:text-odp-fgStrong ${
              positioned ? 'max-w-none!' : ''
            }`}
            style={positionedStyle}
            initial={positioned ? false : { opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={PANEL_TRANSITION}
          >
            <div className="overflow-y-auto p-6">
              {title && (
                <h2
                  id="confirm-modal-title"
                  className="mb-2 text-lg font-bold text-gray-800 dark:text-odp-fgStrong"
                >
                  {title}
                </h2>
              )}
              {message && (
                <p className="mb-4 whitespace-pre-line text-sm text-gray-600 dark:text-gray-400">
                  {message}
                </p>
              )}
              {children ? <div className="mb-4">{children}</div> : null}
              <div className="flex flex-wrap justify-end gap-2">
                <Button type="button" variant="secondary" size="md" onClick={onCancel}>
                  <IconBack size={16} />
                  {cancelLabel}
                </Button>
                {hasDiscard && (
                  <Button type="button" variant="secondary" size="md" onClick={onDiscard}>
                    {discardLabel}
                  </Button>
                )}
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
            {resizable ? <ModalCornerResizeHandles onBeginResize={beginResize} /> : null}
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
}

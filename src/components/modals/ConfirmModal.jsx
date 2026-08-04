import { useEffect } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import Button from '@/components/Button';
import { IconBack, IconCheck, IconTrash } from '@/components/icons';

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
}) {
  const hasDiscard = discardLabel && typeof onDiscard === 'function';
  const danger = isDangerConfirm(variant, confirmLabel);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (typeof onCancel === 'function') {
          event.preventDefault();
          onCancel();
        }
        return;
      }
      if (event.key !== 'Enter' || typeof onConfirm !== 'function' || confirmDisabled) return;
      if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;
      const targetTag = event.target?.tagName?.toLowerCase?.() ?? '';
      if (targetTag === 'textarea' || targetTag === 'input' || targetTag === 'select') return;
      if (event.target?.isContentEditable) return;
      event.preventDefault();
      onConfirm();
    };
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, onCancel, onConfirm, confirmDisabled]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <Motion.div
          key="confirm-modal"
          className="fixed inset-0 z-100000 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={OVERLAY_TRANSITION}
        >
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <Motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'confirm-modal-title' : undefined}
            className="relative bg-white dark:bg-odp-surface text-gray-800 dark:text-odp-fgStrong rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={PANEL_TRANSITION}
          >
            <div className="p-6 overflow-y-auto">
              {title && (
                <h2
                  id="confirm-modal-title"
                  className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong mb-2"
                >
                  {title}
                </h2>
              )}
              {message && (
                <p className="text-sm whitespace-pre-line text-gray-600 dark:text-gray-400 mb-4">
                  {message}
                </p>
              )}
              {children ? <div className="mb-4">{children}</div> : null}
              <div className="flex justify-end gap-2">
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
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
}

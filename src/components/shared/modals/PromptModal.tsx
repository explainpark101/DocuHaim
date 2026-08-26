import { useEffect, useId, useRef, useState } from 'react';
import Button from '@/components/Button';
import { IconBack, IconCheck, IconKey } from '@/components/icons';
import Modal from '@/components/shared/modals/Modal';

export type PromptModalProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  /** Input placeholder. */
  placeholder?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** `password` (default) or plain `text`. */
  inputType?: 'password' | 'text';
  /** When true, empty trimmed value cannot confirm. Default true. */
  required?: boolean;
  /** Inline error under the input (e.g. wrong password). */
  error?: string;
  /** Reset when reopened; omit to clear each open. */
  initialValue?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
};

/**
 * Text prompt dialog (Esc cancel, Enter confirm).
 * Prefer this over `window.prompt` for in-app password / short text entry.
 */
export default function PromptModal({
  isOpen,
  title = '입력',
  message,
  placeholder = '',
  confirmLabel = '확인',
  cancelLabel = '취소',
  inputType = 'password',
  required = true,
  error = '',
  initialValue = '',
  onConfirm,
  onCancel,
}: PromptModalProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (!isOpen) return;
    setValue(initialValue);
    const t = window.setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 40);
    return () => window.clearTimeout(t);
  }, [isOpen, initialValue]);

  const trimmed = value.trim();
  const canConfirm = !required || Boolean(trimmed);

  const submit = () => {
    if (!canConfirm) return;
    onConfirm(required ? trimmed : value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      onConfirm={canConfirm ? submit : undefined}
      ignoreEnterInFields={false}
      contentClassName="max-w-md max-h-[90vh]"
    >
      <div className="p-6">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300">
            <IconKey size={28} />
          </div>
        </div>
        <h2
          id={inputId + '-title'}
          className="mb-2 text-center text-lg font-bold text-gray-800 dark:text-odp-fgStrong"
        >
          {title}
        </h2>
        {message ? (
          <p className="mb-4 text-center text-sm whitespace-pre-line text-gray-600 dark:text-gray-400">
            {message}
          </p>
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <label htmlFor={inputId} className="sr-only">
            {placeholder || title}
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type={inputType}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete={inputType === 'password' ? 'current-password' : 'off'}
            placeholder={placeholder}
            className="mb-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-center text-gray-800 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:focus:ring-blue-800"
          />
          {error ? (
            <p className="mb-3 text-center text-xs text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          ) : (
            <div className="mb-3" aria-hidden />
          )}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" size="md" onClick={onCancel}>
              <IconBack size={16} />
              {cancelLabel}
            </Button>
            <Button type="submit" variant="primary" size="md" disabled={!canConfirm}>
              <IconCheck size={16} />
              {confirmLabel}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

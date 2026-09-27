import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import Button from '@/components/Button';
import { IconBack, IconCheck, IconKey } from '@/components/icons';
import Modal from '@/components/modals/Modal';

export type ChangeEncMdPasswordModalProps = {
  isOpen: boolean;
  /** File path shown in the message (optional). */
  fileLabel?: string;
  isSubmitting?: boolean;
  error?: string;
  onConfirm: (currentPassword: string, newPassword: string) => void | Promise<void>;
  onCancel: () => void;
};

/**
 * Change password for an `.enc.md` note: current + new (+ confirm).
 */
export default function ChangeEncMdPasswordModal({
  isOpen,
  fileLabel = '',
  isSubmitting = false,
  error = '',
  onConfirm,
  onCancel,
}: ChangeEncMdPasswordModalProps) {
  const currentId = useId();
  const nextId = useId();
  const confirmId = useId();
  const currentRef = useRef<HTMLInputElement>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setLocalError('');
    const t = window.setTimeout(() => {
      currentRef.current?.focus();
    }, 40);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  const displayError = localError || error;
  const canSubmit =
    !isSubmitting &&
    Boolean(currentPassword.trim()) &&
    Boolean(newPassword.trim()) &&
    Boolean(confirmPassword.trim());

  const submit = () => {
    if (!canSubmit) return;
    const current = currentPassword.trim();
    const next = newPassword.trim();
    const confirm = confirmPassword.trim();
    if (next !== confirm) {
      setLocalError('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (current === next) {
      setLocalError('새 비밀번호가 현재 비밀번호와 같습니다.');
      return;
    }
    setLocalError('');
    void onConfirm(current, next);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSubmitting ? () => {} : onCancel}
      onConfirm={canSubmit ? submit : undefined}
      ignoreEnterInFields={false}
      contentClassName="max-w-md max-h-[90vh]"
    >
      <div className="p-6">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300">
            <IconKey size={28} />
          </div>
        </div>
        <h2 className="mb-2 text-center text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
          파일 비밀번호 변경
        </h2>
        <p className="mb-4 text-center text-sm whitespace-pre-line text-gray-600 dark:text-gray-400">
          {fileLabel
            ? `「${fileLabel}」의 암호화 비밀번호를 변경합니다.`
            : '이 노트의 암호화 비밀번호를 변경합니다.'}
          {'\n'}
          현재 비밀번호와 새 비밀번호를 입력하세요.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label
              htmlFor={currentId}
              className="mb-1 block text-xs font-medium text-gray-600 dark:text-odp-muted"
            >
              현재 비밀번호
            </label>
            <input
              ref={currentRef}
              id={currentId}
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-60 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:focus:ring-blue-800"
            />
          </div>
          <div>
            <label
              htmlFor={nextId}
              className="mb-1 block text-xs font-medium text-gray-600 dark:text-odp-muted"
            >
              새 비밀번호
            </label>
            <input
              id={nextId}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-60 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:focus:ring-blue-800"
            />
          </div>
          <div>
            <label
              htmlFor={confirmId}
              className="mb-1 block text-xs font-medium text-gray-600 dark:text-odp-muted"
            >
              새 비밀번호 확인
            </label>
            <input
              id={confirmId}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-60 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:focus:ring-blue-800"
            />
          </div>
          {displayError ? (
            <p className="text-center text-xs text-red-600 dark:text-red-400" role="alert">
              {displayError}
            </p>
          ) : (
            <div className="h-4" aria-hidden />
          )}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              <IconBack size={16} />
              취소
            </Button>
            <Button type="submit" variant="primary" size="md" disabled={!canSubmit}>
              <IconCheck size={16} />
              {isSubmitting ? '변경 중…' : '변경'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Check, X } from 'lucide-react';
import Modal from '@/components/modals/Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (payload: { line1: string; line2: string }) => void;
};

/**
 * Two-line footnote source composer (title + URL). Insert with Ctrl/Cmd+Enter.
 */
export default function FootnoteComposeModal({ isOpen, onClose, onConfirm }: Props) {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [error, setError] = useState('');
  const firstRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLine1('');
    setLine2('');
    setError('');
    const t = window.setTimeout(() => firstRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  const handleConfirm = () => {
    const a = line1.trim();
    const b = line2.trim();
    if (!a && !b) {
      setError('각주 제목 또는 URL을 입력하세요.');
      return;
    }
    onConfirm({ line1: a, line2: b });
    onClose();
  };

  const onFieldKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return;
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
    event.preventDefault();
    event.stopPropagation();
    handleConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} ignoreEnterInFields>
      <div className="flex flex-col gap-4 p-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">각주 삽입</h2>
        <p className="text-xs leading-5 text-gray-500 dark:text-odp-muted">
          첫 줄은 제목, 둘째 줄은 URL입니다. 본문 커서에{' '}
          <code className="rounded bg-gray-100 px-1 dark:bg-odp-bgSoft">[^N]</code>이 들어가고,
          문서 하단 Sources에 두 줄이 추가됩니다. Ctrl+Enter 또는 ⌘+Enter로 삽입합니다.
        </p>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
            제목 (1줄)
          </span>
          <input
            ref={firstRef}
            type="text"
            value={line1}
            onChange={(event) => {
              setLine1(event.target.value);
              if (error) setError('');
            }}
            onKeyDown={onFieldKeyDown}
            placeholder="예: docs.docker.com - Compose services"
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
            URL (2줄)
          </span>
          <input
            type="text"
            value={line2}
            onChange={(event) => {
              setLine2(event.target.value);
              if (error) setError('');
            }}
            onKeyDown={onFieldKeyDown}
            placeholder="https://…"
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
        </label>
        {error ? <p className="text-xs text-red-600 dark:text-red-300">{error}</p> : null}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
          >
            <X size={16} />
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Check size={16} />
            삽입
          </button>
        </div>
      </div>
    </Modal>
  );
}

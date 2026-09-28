import { useEffect, useState } from 'react';
import { ArrowDownToLine, Check, Link2Off, X } from 'lucide-react';
import Button from '@/components/Button';
import Modal from '@/components/modals/Modal';
import type { HaimInsertPlacement } from '@/utils/haimEditorInsertRange';

export type HaimUrlLinkConfirm = {
  url: string;
  text: string;
  placement: HaimInsertPlacement;
  /** Empty URL while editing an existing link → remove the link mark. */
  unset?: boolean;
};

export type HaimUrlLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (payload: HaimUrlLinkConfirm) => void;
  /** Prefill display text (e.g. current editor selection). */
  initialText?: string | null | undefined;
  /** Prefill URL when the caret is already on a link. */
  initialUrl?: string | null | undefined;
};

/**
 * Insert / edit a standard Markdown hyperlink in Haim Editor (modal, not prompt).
 */
export default function HaimUrlLinkModal({
  isOpen,
  onClose,
  onConfirm,
  initialText = '',
  initialUrl = '',
}: HaimUrlLinkModalProps) {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const canUnset = Boolean(String(initialUrl || '').trim());

  useEffect(() => {
    if (!isOpen) return;
    setUrl(String(initialUrl || '').trim() || 'https://');
    setText(String(initialText || '').trim());
    setError('');
  }, [isOpen, initialText, initialUrl]);

  const submit = (placement: HaimInsertPlacement) => {
    const nextUrl = url.trim();
    if (!nextUrl) {
      if (canUnset) {
        onConfirm({ url: '', text: '', placement, unset: true });
        onClose();
        return;
      }
      setError('URL을 입력하세요.');
      return;
    }
    onConfirm({
      url: nextUrl,
      text: text.trim(),
      placement,
    });
    onClose();
  };

  const handleUnset = () => {
    if (!canUnset) return;
    onConfirm({ url: '', text: '', placement: 'cursor', unset: true });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => submit('cursor')}
      ignoreEnterInFields
      contentClassName="flex max-h-[90vh] max-w-md flex-col overflow-hidden"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderStrong">
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            링크 삽입
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-odp-muted">
            URL과 표시 텍스트를 입력합니다. 선택이 있으면 해당 구간에 링크를
            겁니다.
          </p>
        </header>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fg">
              표시 텍스트
            </span>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="선택 사항 (비우면 선택 텍스트 또는 URL)"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fgStrong"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fg">
              URL
            </span>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              placeholder="https://…"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fgStrong"
            />
          </label>

          {error ? (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          ) : null}
        </div>

        <footer className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderStrong">
          <Button type="button" variant="secondary" onClick={onClose}>
            <X size={14} />
            취소
          </Button>
          {canUnset ? (
            <Button type="button" variant="tertiary" onClick={handleUnset}>
              <Link2Off size={14} />
              링크 제거
            </Button>
          ) : null}
          <Button
            type="button"
            variant="secondary"
            onClick={() => submit('end')}
          >
            <ArrowDownToLine size={14} />
            최하단에 추가
          </Button>
          <Button type="button" variant="primary" onClick={() => submit('cursor')}>
            <Check size={14} />
            삽입
          </Button>
        </footer>
      </div>
    </Modal>
  );
}

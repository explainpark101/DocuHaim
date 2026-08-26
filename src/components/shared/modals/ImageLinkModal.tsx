import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import Modal from '@/components/shared/modals/Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (payload: { desc: string; url: string }) => void;
};

/**
 * Markdown image-by-URL form (replaces md-editor-rt built-in image link modal).
 */
export default function ImageLinkModal({ isOpen, onClose, onConfirm }: Props) {
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setDesc('');
    setUrl('');
    setError('');
  }, [isOpen]);

  const handleConfirm = () => {
    const nextUrl = url.trim();
    if (!nextUrl) {
      setError('이미지 URL을 입력하세요.');
      return;
    }
    onConfirm({ desc: desc.trim(), url: nextUrl });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onConfirm={handleConfirm} ignoreEnterInFields>
      <div className="flex flex-col gap-4 p-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">이미지 링크</h2>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
            설명 (alt)
          </span>
          <input
            type="text"
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
            placeholder="선택"
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
            URL
          </span>
          <input
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
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

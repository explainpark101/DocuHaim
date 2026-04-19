import { useMemo, useState } from 'react';
import Modal from '@/components/modals/Modal';
import { normalizeSizeValue } from '@/utils/wikiImageSyntax';

function formatInputSize(value) {
  if (!value) return '';
  return value.endsWith('px') ? value.slice(0, -2) : value;
}

function validateSizeInput(raw) {
  const value = String(raw ?? '').trim();
  if (!value) return { normalized: null, error: null };
  const normalized = normalizeSizeValue(value);
  if (!normalized) {
    return { normalized: null, error: '숫자, px, %, vh, vw 형식만 입력할 수 있습니다. (예: 320, 320px, 50%, 40vh, 60vw)' };
  }
  return { normalized, error: null };
}

export default function WikiImageSizeModal({
  isOpen,
  onClose,
  path,
  initialWidth,
  initialHeight,
  onApply,
}) {
  const [widthInput, setWidthInput] = useState(() => formatInputSize(initialWidth));
  const [heightInput, setHeightInput] = useState(() => formatInputSize(initialHeight));
  const [error, setError] = useState('');

  const previewText = useMemo(() => {
    if (!path) return '';
    const w = validateSizeInput(widthInput).normalized;
    const h = validateSizeInput(heightInput).normalized;
    const size = [];
    if (w) size.push(`w=${w}`);
    if (h) size.push(`h=${h}`);
    return size.length ? `![[${path}|${size.join(' ')}]]` : `![[${path}]]`;
  }, [path, widthInput, heightInput]);

  const handleApply = () => {
    const w = validateSizeInput(widthInput);
    if (w.error) {
      setError(w.error);
      return;
    }
    const h = validateSizeInput(heightInput);
    if (h.error) {
      setError(h.error);
      return;
    }
    setError('');
    onApply?.({ width: w.normalized, height: h.normalized });
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onConfirm={handleApply}>
      <div className="p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">위키 이미지 크기</h2>
        <p className="text-xs text-gray-500 dark:text-odp-muted break-all">
          {path || ''}
        </p>

        <label className="block">
          <span className="block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1">
            너비 (비우면 기본)
          </span>
          <input
            type="text"
            value={widthInput}
            onChange={(e) => setWidthInput(e.target.value)}
            placeholder="예: 320 / 320px / 50% / 60vw"
            className="w-full rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1">
            높이 (비우면 기본)
          </span>
          <input
            type="text"
            value={heightInput}
            onChange={(e) => setHeightInput(e.target.value)}
            placeholder="예: 240 / 240px / 40% / 40vh"
            className="w-full rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </label>

        <p className="text-xs text-gray-500 dark:text-odp-muted break-all">
          {previewText}
        </p>
        {error ? (
          <p className="text-xs text-red-600 dark:text-red-300">{error}</p>
        ) : null}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition"
          >
            적용
          </button>
        </div>
      </div>
    </Modal>
  );
}


import { useEffect, useMemo, useState } from 'react';
import { Check, Crop, Scaling, X } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import NoteImageCropPanel from '@/components/modals/NoteImageCropPanel';
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
  kind = 'wiki',
  initialWidth,
  initialHeight,
  imageSrc = '',
  onApply,
  onStartFreeTransform,
  onCrop,
}) {
  const [widthInput, setWidthInput] = useState(() => formatInputSize(initialWidth));
  const [heightInput, setHeightInput] = useState(() => formatInputSize(initialHeight));
  const [error, setError] = useState('');
  const [cropMode, setCropMode] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setWidthInput(formatInputSize(initialWidth));
    setHeightInput(formatInputSize(initialHeight));
    setError('');
    setCropMode(false);
  }, [isOpen, initialWidth, initialHeight, path, imageSrc]);

  const previewText = useMemo(() => {
    if (!path) return '';
    const w = validateSizeInput(widthInput).normalized;
    const h = validateSizeInput(heightInput).normalized;
    if (kind === 'markdown') {
      const size = [];
      if (w) size.push(`w=${w}`);
      if (h) size.push(`h=${h}`);
      return size.length ? `![](${path}){${size.join(' ')}}` : `![](${path})`;
    }
    const size = [];
    if (w) size.push(`w=${w}`);
    if (h) size.push(`h=${h}`);
    return size.length ? `![[${path}|${size.join(' ')}]]` : `![[${path}]]`;
  }, [path, kind, widthInput, heightInput]);

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

  const canCrop = Boolean(imageSrc) && typeof onCrop === 'function';

  return (
    <Modal
      isOpen={isOpen}
      onClose={cropMode ? () => setCropMode(false) : onClose}
      onConfirm={cropMode ? undefined : handleApply}
      contentClassName="max-w-lg"
    >
      {cropMode ? (
        <NoteImageCropPanel
          imageSrc={imageSrc}
          fileName={path}
          onCancel={() => setCropMode(false)}
          onConfirm={async (file, area) => {
            await onCrop?.({
              file,
              widthPx: area.width,
              heightPx: area.height,
            });
            setCropMode(false);
            onClose?.();
          }}
        />
      ) : (
        <div className="p-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">이미지 크기</h2>
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

          <div className="flex flex-wrap justify-end gap-2">
            {canCrop ? (
              <button
                type="button"
                onClick={() => setCropMode(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition"
              >
                <Crop size={16} />
                자르기
              </button>
            ) : null}
            {typeof onStartFreeTransform === 'function' ? (
              <button
                type="button"
                onClick={() => {
                  onStartFreeTransform();
                  onClose?.();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition"
              >
                <Scaling size={16} />
                자유변형
              </button>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition"
            >
              <X size={16} />
              취소
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition"
            >
              <Check size={16} />
              적용
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

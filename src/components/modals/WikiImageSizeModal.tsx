import { useEffect, useMemo, useState } from 'react';
import { Check, Crop, ImagePlus, Loader2, Scaling, X } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import NoteImageCropPanel from '@/components/modals/NoteImageCropPanel';
import { isDataImageUri } from '@/utils/markdownImageExport';
import { normalizeSizeValue } from '@/utils/wikiImageSyntax';

const BASE64_DISPLAY_CHARS = 30;

function formatInputSize(value: string | null | undefined): string {
  if (!value) return '';
  return value.endsWith('px') ? value.slice(0, -2) : value;
}

function validateSizeInput(raw: string | null | undefined): {
  normalized: string | null;
  error: string | null;
} {
  const value = String(raw ?? '').trim();
  if (!value) return { normalized: null, error: null };
  const normalized = normalizeSizeValue(value);
  if (!normalized) {
    return {
      normalized: null,
      error: '숫자, px, %, vh, vw 형식만 입력할 수 있습니다. (예: 320, 320px, 50%, 40vh, 60vw)',
    };
  }
  return { normalized, error: null };
}

/** Truncate long data:image URIs so the modal does not dump the full base64 payload. */
function displayPathValue(path: string): string {
  if (!path) return '';
  if (isDataImageUri(path) && path.length > BASE64_DISPLAY_CHARS) {
    return path.slice(0, BASE64_DISPLAY_CHARS);
  }
  return path;
}

export type WikiImageSizeModalKind = 'wiki' | 'markdown';

export type WikiImageSizeApplyPayload = {
  width: string | null;
  height: string | null;
};

export type WikiImageSizeCropPayload = {
  file: File;
  widthPx: number;
  heightPx: number;
};

export type WikiImageSizeConvertToWikiPayload = {
  width: string | null;
  height: string | null;
};

type WikiImageSizeModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  path?: string;
  kind?: WikiImageSizeModalKind;
  initialWidth?: string | null;
  initialHeight?: string | null;
  imageSrc?: string;
  onApply?: (payload: WikiImageSizeApplyPayload) => void;
  onStartFreeTransform?: () => void;
  onCrop?: (payload: WikiImageSizeCropPayload) => void | Promise<void>;
  onConvertToWiki?: (payload: WikiImageSizeConvertToWikiPayload) => void | Promise<void>;
};

export default function WikiImageSizeModal({
  isOpen,
  onClose,
  path = '',
  kind = 'wiki',
  initialWidth,
  initialHeight,
  imageSrc = '',
  onApply,
  onStartFreeTransform,
  onCrop,
  onConvertToWiki,
}: WikiImageSizeModalProps) {
  const [widthInput, setWidthInput] = useState(() => formatInputSize(initialWidth));
  const [heightInput, setHeightInput] = useState(() => formatInputSize(initialHeight));
  const [error, setError] = useState('');
  const [cropMode, setCropMode] = useState(false);
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setWidthInput(formatInputSize(initialWidth));
    setHeightInput(formatInputSize(initialHeight));
    setError('');
    setCropMode(false);
    setConverting(false);
  }, [isOpen, initialWidth, initialHeight, path, imageSrc]);

  const pathDisplay = useMemo(() => displayPathValue(path), [path]);
  const showConvertToWiki = kind === 'markdown' && typeof onConvertToWiki === 'function';

  const previewText = useMemo(() => {
    if (!path) return '';
    const displaySrc = displayPathValue(path);
    const w = validateSizeInput(widthInput).normalized;
    const h = validateSizeInput(heightInput).normalized;
    if (kind === 'markdown') {
      const size: string[] = [];
      if (w) size.push(`w=${w}`);
      if (h) size.push(`h=${h}`);
      return size.length ? `![](${displaySrc}){${size.join(' ')}}` : `![](${displaySrc})`;
    }
    const size: string[] = [];
    if (w) size.push(`w=${w}`);
    if (h) size.push(`h=${h}`);
    return size.length ? `![[${displaySrc}|${size.join(' ')}]]` : `![[${displaySrc}]]`;
  }, [path, kind, widthInput, heightInput]);

  const resolveSizes = (): WikiImageSizeApplyPayload | null => {
    const w = validateSizeInput(widthInput);
    if (w.error) {
      setError(w.error);
      return null;
    }
    const h = validateSizeInput(heightInput);
    if (h.error) {
      setError(h.error);
      return null;
    }
    setError('');
    return { width: w.normalized, height: h.normalized };
  };

  const handleApply = () => {
    const sizes = resolveSizes();
    if (!sizes) return;
    onApply?.(sizes);
    onClose?.();
  };

  const handleConvertToWiki = async () => {
    if (!showConvertToWiki || converting) return;
    const sizes = resolveSizes();
    if (!sizes) return;
    setConverting(true);
    setError('');
    try {
      await onConvertToWiki?.(sizes);
      onClose?.();
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : 'wiki image로 변경하지 못했습니다.';
      setError(message);
    } finally {
      setConverting(false);
    }
  };

  const canCrop = Boolean(imageSrc) && typeof onCrop === 'function';

  return (
    <Modal
      isOpen={isOpen}
      onClose={cropMode ? () => setCropMode(false) : onClose}
      onConfirm={cropMode || converting ? undefined : handleApply}
      contentClassName={
        cropMode ? 'max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]' : 'max-w-lg'
      }
      resizeHeight={cropMode}
      layoutKey={cropMode ? 'crop' : 'size'}
    >
      {cropMode ? (
        <NoteImageCropPanel
          imageSrc={imageSrc}
          fileName={isDataImageUri(path) ? 'image' : path}
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
          <p className="text-xs text-gray-500 dark:text-odp-muted break-all">{pathDisplay}</p>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1">
              너비 (비우면 기본)
            </span>
            <input
              type="text"
              value={widthInput}
              onChange={(e) => setWidthInput(e.target.value)}
              placeholder="예: 320 / 320px / 50% / 60vw"
              disabled={converting}
              className="w-full rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60"
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
              disabled={converting}
              className="w-full rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60"
            />
          </label>

          <p className="text-xs text-gray-500 dark:text-odp-muted break-all">{previewText}</p>
          {error ? (
            <p className="text-xs text-red-600 dark:text-red-300">{error}</p>
          ) : null}

          <div className="flex flex-wrap justify-end gap-2">
            {showConvertToWiki ? (
              <button
                type="button"
                onClick={() => {
                  void handleConvertToWiki();
                }}
                disabled={converting}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60"
              >
                {converting ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
                wiki image로 변경
              </button>
            ) : null}
            {canCrop ? (
              <button
                type="button"
                onClick={() => setCropMode(true)}
                disabled={converting}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60"
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
                disabled={converting}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60"
              >
                <Scaling size={16} />
                자유변형
              </button>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              disabled={converting}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60"
            >
              <X size={16} />
              취소
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={converting}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition disabled:opacity-60"
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

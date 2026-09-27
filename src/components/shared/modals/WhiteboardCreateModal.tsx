import { useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import { Check, Loader2, Presentation, X } from 'lucide-react';
import { HexAlphaColorPicker, HexColorInput } from 'react-colorful';
import Modal from '@/components/modals/Modal';
import { createWhiteboardPngFile } from '@/utils/createWhiteboardPng';
import {
  CSS_HEX_CHECKER_STYLE,
  cssHexToInputValue,
  normalizeCssHexColor,
} from '@/utils/cssColor';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  /** Upload PNG as wiki image and insert into the note. */
  onConfirm: (file: File) => void | Promise<void>;
  disabled?: boolean | undefined;
};

const SIZE_PRESETS = [
  { id: 'hd', label: '1280×720', width: 1280, height: 720 },
  { id: 'fhd', label: '1920×1080', width: 1920, height: 1080 },
  { id: 'sq', label: '1080×1080', width: 1080, height: 1080 },
  { id: 'a4', label: 'A4~', width: 794, height: 1123 },
] as const;

const COLOR_PRESETS = [
  { id: 'white', label: '흰색', value: '#ffffffff' },
  { id: 'paper', label: '크림', value: '#fff8e7ff' },
  { id: 'gray', label: '회색', value: '#f3f4f6ff' },
  { id: 'black', label: '검정', value: '#111827ff' },
  { id: 'clear', label: '투명', value: '#00000000' },
] as const;

/**
 * Width/height + background → blank PNG whiteboard → wiki image upload.
 */
export default function WhiteboardCreateModal({
  isOpen,
  onClose,
  onConfirm,
  disabled = false,
}: Props) {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [background, setBackground] = useState('#ffffffff');
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setWidth(1920);
    setHeight(1080);
    setBackground('#ffffffff');
    setSubmitError('');
    setSubmitting(false);
  }, [isOpen]);

  const hex = cssHexToInputValue(normalizeCssHexColor(background) || '#ffffffff');

  useEffect(() => {
    if (!isOpen) {
      setPreviewUrl('');
      return undefined;
    }
    let cancelled = false;
    let objectUrl = '';
    void (async () => {
      try {
        const file = await createWhiteboardPngFile({
          width,
          height,
          background,
        });
        if (cancelled) return;
        objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      } catch {
        if (!cancelled) setPreviewUrl('');
      }
    })();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [isOpen, width, height, background]);

  const previewStyle = useMemo(() => {
    const max = 220;
    const scale = Math.min(1, max / Math.max(width, height, 1));
    return {
      width: Math.max(24, Math.round(width * scale)),
      height: Math.max(24, Math.round(height * scale)),
    } as const;
  }, [width, height]);

  const handleConfirm = async () => {
    if (disabled || submitting) return;
    if (width < 16 || height < 16) {
      setSubmitError('크기는 16px 이상이어야 합니다.');
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      const file = await createWhiteboardPngFile({ width, height, background });
      await onConfirm(file);
      onClose();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : '화이트보드를 넣는 데 실패했습니다.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onFieldKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return;
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
    event.preventDefault();
    event.stopPropagation();
    void handleConfirm();
  };

  const busy = submitting || disabled;

  return (
    <Modal isOpen={isOpen} onClose={onClose} ignoreEnterInFields>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-2">
          <Presentation
            size={20}
            className="text-gray-700 dark:text-odp-fgStrong"
            aria-hidden
          />
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            화이트보드 만들기
          </h2>
        </div>
        <p className="text-xs leading-5 text-gray-500 dark:text-odp-muted">
          빈 캔버스 PNG를 만들어 노트에{' '}
          <code className="rounded bg-gray-100 px-1 dark:bg-odp-bgSoft">![[path]]</code>{' '}
          로 넣은 뒤, 크게 보기(더블클릭)에서 바로 그릴 수 있습니다.
        </p>

        <div className="flex flex-wrap gap-1.5">
          {SIZE_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              disabled={busy}
              className={`rounded-md border px-2 py-1 text-[11px] ${
                width === p.width && height === p.height
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft'
              }`}
              onClick={() => {
                setWidth(p.width);
                setHeight(p.height);
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
              너비 (px)
            </span>
            <input
              type="number"
              min={16}
              max={8192}
              value={width}
              disabled={busy}
              onChange={(e) => setWidth(Number(e.target.value) || 16)}
              onKeyDown={onFieldKeyDown}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
              높이 (px)
            </span>
            <input
              type="number"
              min={16}
              max={8192}
              value={height}
              disabled={busy}
              onChange={(e) => setHeight(Number(e.target.value) || 16)}
              onKeyDown={onFieldKeyDown}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            />
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
            배경색
          </span>
          <div className="flex flex-wrap gap-1.5">
            {COLOR_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                disabled={busy}
                aria-label={p.label}
                className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-2 text-[11px] ${
                  background.toLowerCase() === p.value
                    ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/40'
                    : 'border-gray-300 dark:border-odp-borderStrong'
                }`}
                onClick={() => setBackground(p.value)}
              >
                <span
                  className="inline-block h-4 w-4 overflow-hidden rounded border border-black/10"
                  style={CSS_HEX_CHECKER_STYLE}
                >
                  <span
                    className="block h-full w-full"
                    style={{ backgroundColor: p.value }}
                  />
                </span>
                {p.label}
              </button>
            ))}
          </div>
          <div className="rounded-md border border-gray-200 p-3 dark:border-odp-borderStrong">
            <div className="[&_.react-colorful]:h-36 [&_.react-colorful]:w-full">
              <HexAlphaColorPicker
                color={hex}
                onChange={(next) => {
                  const color = normalizeCssHexColor(
                    next.startsWith('#') ? next : `#${next}`,
                  );
                  if (color) setBackground(color);
                }}
              />
            </div>
            <HexColorInput
              alpha
              prefixed
              color={hex}
              onChange={(next) => {
                const color = normalizeCssHexColor(
                  next.startsWith('#') ? next : `#${next}`,
                );
                if (color) setBackground(color);
              }}
              className="mt-2 w-full rounded border border-gray-300 bg-white px-2 py-1.5 font-mono text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            />
          </div>
        </div>

        <div
          className="flex flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 p-4 dark:border-odp-borderStrong"
          style={CSS_HEX_CHECKER_STYLE}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="화이트보드 미리보기"
              style={{
                width: previewStyle.width,
                height: previewStyle.height,
              }}
              className="object-contain shadow-sm"
            />
          ) : (
            <div className="flex h-28 w-40 items-center justify-center text-xs text-gray-400">
              미리보기
            </div>
          )}
          <span className="text-[10px] text-gray-500 dark:text-odp-muted">
            {width} × {height}px
          </span>
        </div>

        {submitError ? (
          <p className="text-xs text-red-600 dark:text-red-400">{submitError}</p>
        ) : null}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
          >
            <X size={14} aria-hidden />
            취소
          </button>
          <button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 size={14} className="animate-spin" aria-hidden />
            ) : (
              <Check size={14} aria-hidden />
            )}
            삽입
          </button>
        </div>
      </div>
    </Modal>
  );
}

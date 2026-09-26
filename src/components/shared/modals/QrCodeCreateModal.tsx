import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Check, Loader2, QrCode, X } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import { generateQrCodeSvg, qrCodeSvgToFile } from '@/utils/qrCodeSvg';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  /** Upload SVG as wiki image and insert into the note. */
  onConfirm: (file: File) => void | Promise<void>;
  disabled?: boolean | undefined;
};

const PREVIEW_DEBOUNCE_MS = 220;

/**
 * Compose text → high-quality SVG QR → upload as wiki image (![[path]]).
 */
export default function QrCodeCreateModal({
  isOpen,
  onClose,
  onConfirm,
  disabled = false,
}: Props) {
  const [text, setText] = useState('');
  const [svg, setSvg] = useState('');
  const [previewError, setPreviewError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [previewing, setPreviewing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const genSeqRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return;
    setText('');
    setSvg('');
    setPreviewError('');
    setSubmitError('');
    setPreviewing(false);
    setSubmitting(false);
    const t = window.setTimeout(() => textareaRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const trimmed = text.trim();
    if (!trimmed) {
      setSvg('');
      setPreviewError('');
      setPreviewing(false);
      return undefined;
    }

    const seq = ++genSeqRef.current;
    setPreviewing(true);
    setPreviewError('');
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const next = await generateQrCodeSvg(trimmed);
          if (genSeqRef.current !== seq) return;
          setSvg(next);
          setPreviewError('');
        } catch (err) {
          if (genSeqRef.current !== seq) return;
          setSvg('');
          setPreviewError(
            err instanceof Error ? err.message : 'QR 코드를 만들 수 없습니다.',
          );
        } finally {
          if (genSeqRef.current === seq) setPreviewing(false);
        }
      })();
    }, PREVIEW_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [isOpen, text]);

  useEffect(() => {
    if (!svg) {
      setPreviewUrl('');
      return undefined;
    }
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [svg]);

  const handleConfirm = async () => {
    if (disabled || submitting) return;
    const trimmed = text.trim();
    if (!trimmed) {
      setSubmitError('QR로 만들 텍스트를 입력하세요.');
      return;
    }
    if (!svg) {
      setSubmitError(previewError || '미리보기가 준비될 때까지 기다려 주세요.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');
    try {
      const file = qrCodeSvgToFile(svg, trimmed);
      await onConfirm(file);
      onClose();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : '노트에 QR 이미지를 넣는 데 실패했습니다.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onFieldKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter') return;
    if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return;
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
    event.preventDefault();
    event.stopPropagation();
    void handleConfirm();
  };

  const busy = submitting || disabled;
  const canInsert = Boolean(svg) && !previewing && !busy;

  return (
    <Modal isOpen={isOpen} onClose={onClose} ignoreEnterInFields>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-2">
          <QrCode size={20} className="text-gray-700 dark:text-odp-fgStrong" aria-hidden />
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            QRCode 만들기
          </h2>
        </div>
        <p className="text-xs leading-5 text-gray-500 dark:text-odp-muted">
          텍스트·URL을 고화질 SVG QR로 만든 뒤 노트에{' '}
          <code className="rounded bg-gray-100 px-1 dark:bg-odp-bgSoft">![[path]]</code>{' '}
          wiki image로 삽입합니다. Ctrl+Enter 또는 ⌘+Enter로 삽입합니다.
        </p>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
            내용
          </span>
          <textarea
            ref={textareaRef}
            value={text}
            rows={4}
            disabled={busy}
            onChange={(event) => {
              setText(event.target.value);
              if (submitError) setSubmitError('');
            }}
            onKeyDown={onFieldKeyDown}
            placeholder="https://example.com 또는 임의의 텍스트"
            className="w-full resize-y rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
        </label>

        <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 bg-white p-4 dark:border-odp-borderStrong dark:bg-odp-bgSoft">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="QR 미리보기"
              className="h-48 w-48 object-contain"
            />
          ) : (
            <div className="flex h-48 w-48 items-center justify-center text-xs text-gray-400 dark:text-odp-muted">
              {previewing ? (
                <span className="inline-flex items-center gap-1.5">
                  <Loader2 size={14} className="animate-spin" aria-hidden />
                  생성 중…
                </span>
              ) : (
                '미리보기'
              )}
            </div>
          )}
          {previewError ? (
            <p className="text-xs text-red-600 dark:text-red-300">{previewError}</p>
          ) : null}
        </div>

        {submitError ? (
          <p className="text-xs text-red-600 dark:text-red-300">{submitError}</p>
        ) : null}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 disabled:opacity-50 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
          >
            <X size={16} />
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              void handleConfirm();
            }}
            disabled={!canInsert}
            className="inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 size={16} className="animate-spin" aria-hidden />
            ) : (
              <Check size={16} />
            )}
            노트에 삽입
          </button>
        </div>
      </div>
    </Modal>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, ImagePlus, Loader2, ScanLine, X } from 'lucide-react';
import { decodeQrCodeFromFile } from '@/utils/qrCodeDecode';

type Props = {
  disabled?: boolean | undefined;
  /** Insert decoded plain text into the note. */
  onInsertText?: ((text: string) => void | Promise<void>) | undefined;
  onClose: () => void;
};

/**
 * Attach a QR image → decode payload → show text below.
 */
export default function QrCodeDecodeTab({
  disabled = false,
  onInsertText,
  onClose,
}: Props) {
  const [imageUrl, setImageUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [decoded, setDecoded] = useState('');
  const [decoding, setDecoding] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const decodeSeqRef = useRef(0);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const applyFile = (file: File | null | undefined) => {
    if (!file || disabled || submitting) return;
    if (!file.type.startsWith('image/') && !/\.svg$/i.test(file.name)) {
      setError('이미지 파일을 선택하세요.');
      return;
    }

    const seq = ++decodeSeqRef.current;
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setFileName(file.name || 'qr-image');
    setDecoded('');
    setError('');
    setCopied(false);
    setDecoding(true);

    void (async () => {
      try {
        const text = await decodeQrCodeFromFile(file);
        if (decodeSeqRef.current !== seq) return;
        setDecoded(text);
        setError('');
      } catch (err) {
        if (decodeSeqRef.current !== seq) return;
        setDecoded('');
        setError(
          err instanceof Error ? err.message : 'QR 코드를 읽을 수 없습니다.',
        );
      } finally {
        if (decodeSeqRef.current === seq) setDecoding(false);
      }
    })();
  };

  const handleCopy = async () => {
    const text = decoded.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setError('클립보드에 복사하지 못했습니다.');
    }
  };

  const handleInsert = async () => {
    if (!onInsertText || submitting || disabled) return;
    const text = decoded.trim();
    if (!text) {
      setError('삽입할 텍스트가 없습니다.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await onInsertText(text);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '노트에 텍스트를 넣는 데 실패했습니다.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const busy = disabled || submitting;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs leading-5 text-gray-500 dark:text-odp-muted">
        QR 이미지가 담긴 파일을 첨부하면 코드 안의 텍스트를 읽어 아래에 표시합니다.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,.svg"
        className="hidden"
        disabled={busy}
        onChange={(event) => {
          applyFile(event.target.files?.[0]);
          event.target.value = '';
        }}
      />

      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!busy) setDragOver(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!busy) setDragOver(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setDragOver(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setDragOver(false);
          applyFile(event.dataTransfer.files?.[0]);
        }}
        className={`flex flex-col items-center justify-center gap-2 rounded-md border border-dashed px-4 py-8 text-sm transition disabled:opacity-50 ${
          dragOver
            ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30'
            : 'border-gray-300 bg-white hover:bg-gray-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:hover:bg-odp-focusBg'
        }`}
      >
        <ImagePlus size={22} className="text-gray-500 dark:text-odp-muted" aria-hidden />
        <span className="font-medium text-gray-700 dark:text-odp-fgStrong">
          이미지 선택 또는 끌어다 놓기
        </span>
        <span className="text-[11px] text-gray-500 dark:text-odp-muted">
          PNG · JPEG · WebP · SVG
        </span>
      </button>

      {(imageUrl || decoding) && (
        <div className="flex flex-col items-center gap-2 rounded-md border border-gray-200 bg-white p-4 dark:border-odp-borderStrong dark:bg-odp-bgSoft">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={fileName || 'QR 이미지'}
              className="max-h-48 max-w-full object-contain"
            />
          ) : (
            <div className="flex h-32 w-full items-center justify-center text-xs text-gray-400">
              …
            </div>
          )}
          {fileName ? (
            <span className="max-w-full truncate text-[11px] text-gray-500 dark:text-odp-muted">
              {fileName}
            </span>
          ) : null}
          {decoding ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-odp-muted">
              <Loader2 size={14} className="animate-spin" aria-hidden />
              읽는 중…
            </span>
          ) : null}
        </div>
      )}

      <label className="block">
        <span className="mb-1 inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
          <ScanLine size={14} aria-hidden />
          읽은 텍스트
        </span>
        <textarea
          value={decoded}
          rows={4}
          readOnly
          placeholder={decoding ? '읽는 중…' : '첨부한 QR에서 읽은 내용이 여기에 표시됩니다'}
          className="w-full resize-y rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
      </label>

      {error ? (
        <p className="text-xs text-red-600 dark:text-red-300">{error}</p>
      ) : null}

      <div className="flex flex-wrap justify-end gap-2">
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
            void handleCopy();
          }}
          disabled={!decoded.trim() || busy}
          className="inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 disabled:opacity-50 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? '복사됨' : '복사'}
        </button>
        {onInsertText ? (
          <button
            type="button"
            onClick={() => {
              void handleInsert();
            }}
            disabled={!decoded.trim() || busy || decoding}
            className="inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 size={16} className="animate-spin" aria-hidden />
            ) : (
              <Check size={16} />
            )}
            노트에 삽입
          </button>
        ) : null}
      </div>
    </div>
  );
}

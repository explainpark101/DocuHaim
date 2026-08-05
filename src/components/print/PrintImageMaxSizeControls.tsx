import { useEffect, useState } from 'react';
import { normalizePrintSizeValue } from '@/utils/printPageLayout';

type Props = {
  maxWidth: string;
  maxHeight: string;
  onChange: (next: { maxWidth: string; maxHeight: string }) => void;
};

export default function PrintImageMaxSizeControls({
  maxWidth,
  maxHeight,
  onChange,
}: Props) {
  const [widthInput, setWidthInput] = useState(maxWidth);
  const [heightInput, setHeightInput] = useState(maxHeight);
  const [widthError, setWidthError] = useState(false);
  const [heightError, setHeightError] = useState(false);

  useEffect(() => {
    setWidthInput(maxWidth);
    setWidthError(false);
  }, [maxWidth]);

  useEffect(() => {
    setHeightInput(maxHeight);
    setHeightError(false);
  }, [maxHeight]);

  const isLiveSizeInput = (raw: string, normalized: string) => {
    if (normalized === '') return raw.trim() === '';
    return /(?:px|%|vh|vw|mm|cm|in)$/i.test(raw.trim());
  };

  const commitWidth = (raw: string) => {
    const normalized = normalizePrintSizeValue(raw);
    if (normalized === null) {
      setWidthError(true);
      return;
    }
    setWidthError(false);
    setWidthInput(normalized);
    if (normalized !== maxWidth) onChange({ maxWidth: normalized, maxHeight });
  };

  const commitHeight = (raw: string) => {
    const normalized = normalizePrintSizeValue(raw);
    if (normalized === null) {
      setHeightError(true);
      return;
    }
    setHeightError(false);
    setHeightInput(normalized);
    if (normalized !== maxHeight) onChange({ maxWidth, maxHeight: normalized });
  };

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      <span className="shrink-0 text-xs text-gray-500 dark:text-odp-muted">이미지 최대</span>
      <label className="flex items-center gap-1">
        <span className="text-xs text-gray-500 dark:text-odp-muted">W</span>
        <input
          type="text"
          value={widthInput}
          onChange={(event) => {
            const next = event.target.value;
            setWidthInput(next);
            const normalized = normalizePrintSizeValue(next);
            setWidthError(normalized === null);
            if (
              normalized !== null &&
              isLiveSizeInput(next, normalized) &&
              normalized !== maxWidth
            ) {
              onChange({ maxWidth: normalized, maxHeight });
            }
          }}
          onBlur={(event) => commitWidth(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              commitWidth(event.currentTarget.value);
            }
          }}
          placeholder="100%"
          aria-label="모든 이미지 max-width"
          aria-invalid={widthError}
          className={`h-8 w-24 rounded-md border bg-white px-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:bg-odp-surface dark:text-odp-fgStrong ${
            widthError
              ? 'border-red-400 dark:border-red-500'
              : 'border-gray-300 dark:border-odp-borderStrong'
          }`}
        />
      </label>
      <label className="flex items-center gap-1">
        <span className="text-xs text-gray-500 dark:text-odp-muted">H</span>
        <input
          type="text"
          value={heightInput}
          onChange={(event) => {
            const next = event.target.value;
            setHeightInput(next);
            const normalized = normalizePrintSizeValue(next);
            setHeightError(normalized === null);
            if (
              normalized !== null &&
              isLiveSizeInput(next, normalized) &&
              normalized !== maxHeight
            ) {
              onChange({ maxWidth, maxHeight: normalized });
            }
          }}
          onBlur={(event) => commitHeight(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              commitHeight(event.currentTarget.value);
            }
          }}
          placeholder="페이지 높이"
          aria-label="모든 이미지 max-height"
          aria-invalid={heightError}
          className={`h-8 w-28 rounded-md border bg-white px-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:bg-odp-surface dark:text-odp-fgStrong ${
            heightError
              ? 'border-red-400 dark:border-red-500'
              : 'border-gray-300 dark:border-odp-borderStrong'
          }`}
        />
      </label>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { normalizePrintImageMaxPx, stepPrintImageMaxPx } from '@/utils/print/printPageLayout';

type Props = {
  maxWidth: string;
  maxHeight: string;
  widthFallback?: string;
  heightFallback?: string;
  onChange: (next: { maxWidth: string; maxHeight: string }) => void;
};

export default function PrintImageMaxSizeControls({
  maxWidth,
  maxHeight,
  widthFallback = '718px',
  heightFallback = '1047px',
  onChange,
}: Props) {
  const [widthInput, setWidthInput] = useState(maxWidth);
  const [heightInput, setHeightInput] = useState(maxHeight);
  const [widthError, setWidthError] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const widthRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const wheelStateRef = useRef({
    maxWidth,
    maxHeight,
    onChange,
    widthFallback,
    heightFallback,
  });
  wheelStateRef.current = {
    maxWidth,
    maxHeight,
    onChange,
    widthFallback,
    heightFallback,
  };

  useEffect(() => {
    setWidthInput(maxWidth);
    setWidthError(false);
  }, [maxWidth]);

  useEffect(() => {
    setHeightInput(maxHeight);
    setHeightError(false);
  }, [maxHeight]);

  const isLivePxInput = (raw: string) => /^\d+px$/i.test(raw.trim());

  const commitWidth = (raw: string) => {
    const normalized = normalizePrintImageMaxPx(raw);
    if (normalized === null) {
      setWidthError(true);
      return;
    }
    setWidthError(false);
    setWidthInput(normalized);
    if (normalized !== maxWidth) onChange({ maxWidth: normalized, maxHeight });
  };

  const commitHeight = (raw: string) => {
    const normalized = normalizePrintImageMaxPx(raw);
    if (normalized === null) {
      setHeightError(true);
      return;
    }
    setHeightError(false);
    setHeightInput(normalized);
    if (normalized !== maxHeight) onChange({ maxWidth, maxHeight: normalized });
  };

  useEffect(() => {
    const widthEl = widthRef.current;
    const heightEl = heightRef.current;
    if (!widthEl || !heightEl) return undefined;

    const bind = (
      el: HTMLInputElement,
      axis: 'width' | 'height',
    ) => {
      const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const direction: 1 | -1 = event.deltaY < 0 ? 1 : -1;
        const {
          maxWidth: currentMaxWidth,
          maxHeight: currentMaxHeight,
          onChange: commit,
          widthFallback: widthEmptyFallback,
          heightFallback: heightEmptyFallback,
        } = wheelStateRef.current;
        const current = el.value;
        const fallback = axis === 'width' ? widthEmptyFallback : heightEmptyFallback;
        const next = stepPrintImageMaxPx(current, direction, {
          shiftKey: event.shiftKey,
          altKey: event.altKey,
          emptyFallback: fallback,
        });
        if (next === null) return;
        if (axis === 'width') {
          setWidthInput(next);
          setWidthError(false);
          if (next !== currentMaxWidth) {
            commit({ maxWidth: next, maxHeight: currentMaxHeight });
          }
          return;
        }
        setHeightInput(next);
        setHeightError(false);
        if (next !== currentMaxHeight) {
          commit({ maxWidth: currentMaxWidth, maxHeight: next });
        }
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    };

    const offWidth = bind(widthEl, 'width');
    const offHeight = bind(heightEl, 'height');
    return () => {
      offWidth();
      offHeight();
    };
  }, []);

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      <span className="shrink-0 text-xs text-gray-500 dark:text-odp-muted">이미지 최대 (px)</span>
      <label className="flex items-center gap-1">
        <span className="text-xs text-gray-500 dark:text-odp-muted">W</span>
        <input
          ref={widthRef}
          type="text"
          inputMode="numeric"
          data-print-toolbar="image-max"
          value={widthInput}
          onChange={(event: any) => {
            const next = event.target.value;
            setWidthInput(next);
            const normalized = normalizePrintImageMaxPx(next);
            setWidthError(normalized === null);
            if (
              normalized !== null &&
              isLivePxInput(next) &&
              normalized !== maxWidth
            ) {
              onChange({ maxWidth: normalized, maxHeight });
            }
          }}
          onBlur={(event: any) => commitWidth(event.target.value)}
          onKeyDown={(event: any) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              commitWidth(event.currentTarget.value);
            }
          }}
          placeholder="718px"
          aria-label="모든 이미지 max-width (px)"
          title="휠: 10px / Shift+휠: 50px / Alt+휠: 1px"
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
          ref={heightRef}
          type="text"
          inputMode="numeric"
          value={heightInput}
          onChange={(event: any) => {
            const next = event.target.value;
            setHeightInput(next);
            const normalized = normalizePrintImageMaxPx(next);
            setHeightError(normalized === null);
            if (
              normalized !== null &&
              isLivePxInput(next) &&
              normalized !== maxHeight
            ) {
              onChange({ maxWidth, maxHeight: normalized });
            }
          }}
          onBlur={(event: any) => commitHeight(event.target.value)}
          onKeyDown={(event: any) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              commitHeight(event.currentTarget.value);
            }
          }}
          placeholder="1047px"
          aria-label="모든 이미지 max-height (px)"
          title="휠: 10px / Shift+휠: 50px / Alt+휠: 1px"
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

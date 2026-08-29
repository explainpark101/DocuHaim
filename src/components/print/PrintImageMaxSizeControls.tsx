import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { usePretextFitWidth } from '@/hooks/usePretextFitWidth';
import { normalizePrintImageMaxPx, stepPrintImageMaxPx } from '@/utils/printPageLayout';

type Props = {
  maxWidth: string;
  maxHeight: string;
  widthFallback?: string;
  heightFallback?: string;
  onChange: (next: { maxWidth: string; maxHeight: string }) => void;
};

const HINT =
  '↑↓/휠: 1px · Shift: 10px · ⌘/Ctrl: 50px · ⌘/Ctrl+Shift: 100px';

/** Horizontal padding (px-2) + border breathing room for pretext fit. */
const INPUT_EXTRA_PX = 22;

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
  const stateRef = useRef({
    maxWidth,
    maxHeight,
    onChange,
    widthFallback,
    heightFallback,
  });
  stateRef.current = {
    maxWidth,
    maxHeight,
    onChange,
    widthFallback,
    heightFallback,
  };

  const widthFit = usePretextFitWidth(widthInput || widthFallback, {
    extraPx: INPUT_EXTRA_PX,
    minPx: 52,
  });
  const heightFit = usePretextFitWidth(heightInput || heightFallback, {
    extraPx: INPUT_EXTRA_PX,
    minPx: 52,
  });

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

  const applyStep = (
    axis: 'width' | 'height',
    el: HTMLInputElement,
    direction: 1 | -1,
    modifiers: { shiftKey: boolean; ctrlKey: boolean; metaKey: boolean },
  ) => {
    const {
      maxWidth: currentMaxWidth,
      maxHeight: currentMaxHeight,
      onChange: commit,
      widthFallback: widthEmptyFallback,
      heightFallback: heightEmptyFallback,
    } = stateRef.current;
    const fallback = axis === 'width' ? widthEmptyFallback : heightEmptyFallback;
    const next = stepPrintImageMaxPx(el.value, direction, {
      shiftKey: modifiers.shiftKey,
      ctrlKey: modifiers.ctrlKey,
      metaKey: modifiers.metaKey,
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

  useEffect(() => {
    const widthEl = widthRef.current;
    const heightEl = heightRef.current;
    if (!widthEl || !heightEl) return undefined;

    const bindWheel = (el: HTMLInputElement, axis: 'width' | 'height') => {
      const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const direction: 1 | -1 = event.deltaY < 0 ? 1 : -1;
        applyStep(axis, el, direction, {
          shiftKey: event.shiftKey,
          ctrlKey: event.ctrlKey,
          metaKey: event.metaKey,
        });
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    };

    const offWidth = bindWheel(widthEl, 'width');
    const offHeight = bindWheel(heightEl, 'height');
    return () => {
      offWidth();
      offHeight();
    };
  }, []);

  const onAxisKeyDown = (
    axis: 'width' | 'height',
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (axis === 'width') commitWidth(event.currentTarget.value);
      else commitHeight(event.currentTarget.value);
      return;
    }
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    const direction: 1 | -1 = event.key === 'ArrowUp' ? 1 : -1;
    applyStep(axis, event.currentTarget, direction, {
      shiftKey: event.shiftKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
    });
  };

  const setWidthEl = (el: HTMLInputElement | null) => {
    widthRef.current = el;
    widthFit.ref(el);
  };
  const setHeightEl = (el: HTMLInputElement | null) => {
    heightRef.current = el;
    heightFit.ref(el);
  };

  const inputClass = (error: boolean) =>
    `h-8 rounded-md border bg-white px-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:bg-odp-surface dark:text-odp-fgStrong ${
      error
        ? 'border-red-400 dark:border-red-500'
        : 'border-gray-300 dark:border-odp-borderStrong'
    }`;

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      <span className="shrink-0 text-xs text-gray-500 dark:text-odp-muted">이미지 최대 (px)</span>
      <label className="flex items-center gap-1">
        <span className="text-xs text-gray-500 dark:text-odp-muted">W</span>
        <input
          ref={setWidthEl}
          type="text"
          inputMode="numeric"
          data-print-toolbar="image-max"
          value={widthInput}
          style={widthFit.style}
          onChange={(event) => {
            const next = event.target.value;
            setWidthInput(next);
            const normalized = normalizePrintImageMaxPx(next);
            setWidthError(normalized === null);
            if (
              normalized !== null
              && isLivePxInput(next)
              && normalized !== maxWidth
            ) {
              onChange({ maxWidth: normalized, maxHeight });
            }
          }}
          onBlur={(event) => commitWidth(event.target.value)}
          onKeyDown={(event) => onAxisKeyDown('width', event)}
          placeholder="718px"
          aria-label="모든 이미지 max-width (px)"
          title={HINT}
          aria-invalid={widthError}
          className={inputClass(widthError)}
        />
      </label>
      <label className="flex items-center gap-1">
        <span className="text-xs text-gray-500 dark:text-odp-muted">H</span>
        <input
          ref={setHeightEl}
          type="text"
          inputMode="numeric"
          value={heightInput}
          style={heightFit.style}
          onChange={(event) => {
            const next = event.target.value;
            setHeightInput(next);
            const normalized = normalizePrintImageMaxPx(next);
            setHeightError(normalized === null);
            if (
              normalized !== null
              && isLivePxInput(next)
              && normalized !== maxHeight
            ) {
              onChange({ maxWidth, maxHeight: normalized });
            }
          }}
          onBlur={(event) => commitHeight(event.target.value)}
          onKeyDown={(event) => onAxisKeyDown('height', event)}
          placeholder="1047px"
          aria-label="모든 이미지 max-height (px)"
          title={HINT}
          aria-invalid={heightError}
          className={inputClass(heightError)}
        />
      </label>
    </div>
  );
}

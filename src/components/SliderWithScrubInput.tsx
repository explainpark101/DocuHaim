import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import {
  clampNumber,
  getChromeDevToolsNumberStep,
  getPercentScrubStep,
  roundScrubValue,
} from '@/utils/scrubNumberStep';

export type SliderScrubUnit = 'percent' | 'css';

type SliderWithScrubInputProps = {
  value: number;
  onChange: (next: number) => void;
  min: number;
  max: number;
  /** Native range step (slider granularity). */
  step?: number;
  /**
   * `percent` → wheel/arrow always ±1.
   * `css` → Chrome DevTools steps (1 / Alt 0.1 / Shift 10 / Ctrl·Cmd 100).
   */
  unit: SliderScrubUnit;
  /** Optional suffix shown after the input (e.g. `%`, `px`). */
  suffix?: string;
  id?: string;
  'aria-label'?: string;
  className?: string;
  disabled?: boolean;
};

function scrubStepForEvent(
  unit: SliderScrubUnit,
  mods: { altKey: boolean; shiftKey: boolean; ctrlKey: boolean; metaKey: boolean },
): number {
  if (unit === 'percent') return getPercentScrubStep();
  return getChromeDevToolsNumberStep(mods);
}

/**
 * Range slider with a compact numeric input on the right.
 * Wheel / ArrowUp·Down on the input scrub values (DevTools-style for `css`).
 */
export default function SliderWithScrubInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  suffix,
  id: idProp,
  'aria-label': ariaLabel,
  className = '',
  disabled = false,
}: SliderWithScrubInputProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  valueRef.current = value;
  onChangeRef.current = onChange;

  const [draft, setDraft] = useState(() => String(value));

  useEffect(() => {
    if (document.activeElement === inputRef.current) return;
    setDraft(String(value));
  }, [value]);

  const commit = (raw: string) => {
    const n = Number(raw);
    if (!Number.isFinite(n)) {
      setDraft(String(valueRef.current));
      return;
    }
    const next = clampNumber(n, min, max);
    setDraft(String(next));
    if (next !== valueRef.current) onChangeRef.current(next);
  };

  const nudge = (
    direction: 1 | -1,
    mods: { altKey: boolean; shiftKey: boolean; ctrlKey: boolean; metaKey: boolean },
  ) => {
    const scrubStep = scrubStepForEvent(unit, mods);
    const next = clampNumber(
      roundScrubValue(valueRef.current + direction * scrubStep, scrubStep),
      min,
      max,
    );
    setDraft(String(next));
    if (next !== valueRef.current) onChangeRef.current(next);
  };

  // Non-passive wheel so preventDefault can block page scroll while scrubbing.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const onWheelNative = (event: globalThis.WheelEvent) => {
      if (disabled) return;
      event.preventDefault();
      event.stopPropagation();
      const direction: 1 | -1 = event.deltaY < 0 ? 1 : -1;
      const scrubStep = scrubStepForEvent(unit, event);
      const next = clampNumber(
        roundScrubValue(valueRef.current + direction * scrubStep, scrubStep),
        min,
        max,
      );
      setDraft(String(next));
      if (next !== valueRef.current) onChangeRef.current(next);
    };
    el.addEventListener('wheel', onWheelNative, { passive: false });
    return () => el.removeEventListener('wheel', onWheelNative);
  }, [disabled, unit, min, max]);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    const direction: 1 | -1 = event.key === 'ArrowUp' ? 1 : -1;
    nudge(direction, event);
  };

  const onRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = clampNumber(Number(event.target.value), min, max);
    setDraft(String(next));
    onChange(next);
  };

  return (
    <div className={`flex min-w-0 items-center gap-1.5 ${className}`}>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={clampNumber(value, min, max)}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={onRangeChange}
        className="min-w-0 flex-1"
      />
      <div className="flex shrink-0 items-center gap-0.5">
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          disabled={disabled}
          aria-label={ariaLabel ? `${ariaLabel} 값` : undefined}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => commit(draft)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
              return;
            }
            onKeyDown(e);
          }}
          className="h-7 w-12 rounded border border-gray-300 bg-white px-1 text-center text-[11px] tabular-nums text-gray-800 outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg"
        />
        {suffix ? (
          <span className="w-4 text-[10px] text-gray-400 dark:text-odp-fgMuted">{suffix}</span>
        ) : null}
      </div>
    </div>
  );
}

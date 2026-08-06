import { useEffect, useRef, useState } from 'react';
import { Minus, Plus } from 'lucide-react';

function clampStep(value: number, min: number, max: number, step: number): number {
  if (!Number.isFinite(value)) return min;
  const clamped = Math.min(max, Math.max(min, value));
  if (step <= 0) return clamped;
  const stepped = Math.round(clamped / step) * step;
  return Math.min(max, Math.max(min, stepped));
}

type Props = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Shown after the number (e.g. `px`, `%`). */
  suffix?: string;
  disabled?: boolean;
  /** Double-click the value to jump here (optional). */
  resetValue?: number;
  'aria-label'?: string;
  decreaseLabel?: string;
  increaseLabel?: string;
  className?: string;
};

/**
 * Compact − / value / + control (same layout as print preview zoom).
 */
export default function NumberStepControls({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  suffix = '',
  disabled = false,
  resetValue,
  'aria-label': ariaLabel = '값',
  decreaseLabel = '감소',
  increaseLabel = '증가',
  className = '',
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);
  const ignoreBlurCommitRef = useRef(false);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const display = `${value}${suffix}`;

  useEffect(() => () => {
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
  }, []);

  useEffect(() => {
    if (!editing) setDraft(String(value));
  }, [editing, value]);

  useEffect(() => {
    if (!editing) return;
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    el.select();
  }, [editing]);

  const commitDraft = () => {
    const cleaned = draft.replace(new RegExp(`${suffix}$`, 'i'), '').replace(/%/g, '').trim();
    const parsed = Number.parseFloat(cleaned);
    if (!Number.isFinite(parsed)) {
      setDraft(String(value));
      setEditing(false);
      return;
    }
    onChange(clampStep(parsed, min, max, step));
    setEditing(false);
  };

  const stepBy = (dir: -1 | 1) => {
    onChange(clampStep(value + dir * step, min, max, step));
  };

  return (
    <div
      className={`inline-flex h-8 items-center gap-0.5 rounded-md border border-gray-300 bg-white dark:border-odp-borderStrong dark:bg-odp-surface ${className}`}
    >
      <button
        type="button"
        disabled={disabled || value <= min}
        onClick={() => stepBy(-1)}
        className="inline-flex h-full w-7 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-focusBg"
        aria-label={decreaseLabel}
        title={decreaseLabel}
      >
        <Minus size={14} />
      </button>
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          disabled={disabled}
          value={draft}
          aria-label={ariaLabel}
          className="h-full w-14 border-x border-gray-200 bg-transparent px-1 text-center text-xs tabular-nums text-gray-800 outline-none dark:border-odp-borderSoft dark:text-odp-fgStrong"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              ignoreBlurCommitRef.current = true;
              commitDraft();
            } else if (e.key === 'Escape') {
              e.preventDefault();
              ignoreBlurCommitRef.current = true;
              setDraft(String(value));
              setEditing(false);
            }
          }}
          onBlur={() => {
            if (ignoreBlurCommitRef.current) {
              ignoreBlurCommitRef.current = false;
              return;
            }
            commitDraft();
          }}
        />
      ) : (
        <button
          type="button"
          disabled={disabled}
          className="inline-flex h-full w-14 items-center justify-center border-x border-gray-200 px-1 text-xs tabular-nums text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
          aria-label={`${ariaLabel} ${display}`}
          title={
            resetValue != null
              ? `클릭하여 입력, 더블클릭으로 ${resetValue}${suffix}`
              : '클릭하여 입력'
          }
          onClick={() => {
            if (disabled) return;
            if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
            clickTimerRef.current = setTimeout(() => {
              clickTimerRef.current = null;
              setDraft(String(value));
              setEditing(true);
            }, 220);
          }}
          onDoubleClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (disabled || resetValue == null) return;
            if (clickTimerRef.current) {
              clearTimeout(clickTimerRef.current);
              clickTimerRef.current = null;
            }
            setEditing(false);
            onChange(clampStep(resetValue, min, max, step));
          }}
        >
          {display}
        </button>
      )}
      <button
        type="button"
        disabled={disabled || value >= max}
        onClick={() => stepBy(1)}
        className="inline-flex h-full w-7 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-focusBg"
        aria-label={increaseLabel}
        title={increaseLabel}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

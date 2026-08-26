import { useEffect, useRef, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import {
  clampZoomPercent,
  PRINT_ZOOM_MAX,
  PRINT_ZOOM_MIN,
  stepZoomPercent,
} from '@/utils/print/printPreviewView';

type Props = {
  value: number;
  onChange: (next: number) => void;
  disabled?: boolean;
};

export default function PrintPreviewZoomControls({
  value,
  onChange,
  disabled = false,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);
  const ignoreBlurCommitRef = useRef(false);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    const parsed = Number.parseFloat(draft.replace(/%/g, '').trim());
    if (!Number.isFinite(parsed)) {
      setDraft(String(value));
      setEditing(false);
      return;
    }
    onChange(clampZoomPercent(parsed));
    setEditing(false);
  };

  return (
    <div
      className="inline-flex h-8 items-center gap-0.5 rounded-md border border-gray-300 bg-white dark:border-odp-borderStrong dark:bg-odp-surface"
      data-print-toolbar="zoom"
    >
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      <button
        type="button"
        disabled={disabled || value <= PRINT_ZOOM_MIN}
        onClick={() => onChange(stepZoomPercent(value, -1))}
        className="inline-flex h-full w-7 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-focusBg"
        aria-label="축소"
        title="축소"
      >
        <Minus size={14} />
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      </button>
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          disabled={disabled}
          value={draft}
          aria-label="확대 비율"
          className="h-full w-14 border-x border-gray-200 bg-transparent px-1 text-center text-xs tabular-nums text-gray-800 outline-none dark:border-odp-borderSoft dark:text-odp-fgStrong"
          onChange={(e: any) => setDraft(e.target.value)}
          onKeyDown={(e: any) => {
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
          aria-label={`확대 비율 ${value}%`}
          title="클릭하여 입력, 더블클릭으로 100%"
          onClick={() => {
            if (disabled) return;
            if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
            clickTimerRef.current = setTimeout(() => {
              clickTimerRef.current = null;
              setDraft(String(value));
              setEditing(true);
            }, 220);
          }}
          onDoubleClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            if (disabled) return;
            if (clickTimerRef.current) {
              clearTimeout(clickTimerRef.current);
              clickTimerRef.current = null;
            }
            setEditing(false);
            onChange(100);
          }}
        >
          {value}%
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        </button>
      )}
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      <button
        type="button"
        disabled={disabled || value >= PRINT_ZOOM_MAX}
        onClick={() => onChange(stepZoomPercent(value, 1))}
        className="inline-flex h-full w-7 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-focusBg"
        aria-label="확대"
        title="확대"
      >
        <Plus size={14} />
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      </button>
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}

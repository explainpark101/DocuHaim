import { useEffect, useState } from 'react';
import type { ChangeEvent, FocusEvent } from 'react';
import {
  CHECKPOINT_EVERY_BOUNDS,
  DEFAULT_CHECKPOINT_EVERY,
  normalizeCheckpointEvery,
} from '@/utils/advancedSearch/settings';

type AdvancedSearchCheckpointEveryFieldProps = {
  value: number;
  disabled?: boolean;
  onChange: (next: number) => void;
};

/** How often rebuild writes a resume checkpoint (every N sources). */
export default function AdvancedSearchCheckpointEveryField({
  value,
  disabled = false,
  onChange,
}: AdvancedSearchCheckpointEveryFieldProps) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  const commit = (raw: string) => {
    const parsed = Number.parseInt(raw.trim(), 10);
    const next = normalizeCheckpointEvery(
      Number.isFinite(parsed) ? parsed : value,
    );
    setDraft(String(next));
    if (next !== value) onChange(next);
  };

  return (
    <div className="mt-3 space-y-2 rounded-md border border-gray-200 bg-white px-3 py-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
      <div>
        <p className="text-xs font-semibold text-gray-800 dark:text-odp-fgStrong">
          체크포인트 주기
        </p>
        <p className="mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted">
          다시 색인 중 N개 파일(또는 채팅 day)마다 중간 저장합니다. 작을수록 중단 시 손실이
          적고, 클수록 저장 오버헤드가 줄어듭니다. 기본 {DEFAULT_CHECKPOINT_EVERY}.
        </p>
      </div>
      <div className="max-w-[12rem]">
        <label className="mb-1 block text-[11px] font-semibold text-gray-600 dark:text-odp-muted">
          파일 수마다
          <span className="ml-1 font-normal text-gray-400 dark:text-odp-muted">
            ({CHECKPOINT_EVERY_BOUNDS.min}–{CHECKPOINT_EVERY_BOUNDS.max})
          </span>
        </label>
        <input
          type="number"
          inputMode="numeric"
          min={CHECKPOINT_EVERY_BOUNDS.min}
          max={CHECKPOINT_EVERY_BOUNDS.max}
          value={draft}
          disabled={disabled}
          aria-label="체크포인트 주기"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setDraft(e.target.value);
          }}
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            commit(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
          }}
          className="w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft disabled:opacity-50"
        />
      </div>
    </div>
  );
}

import { useEffect, useState, type ChangeEvent, type FocusEvent } from 'react';
import type { AdvancedSearchLiveScanLimits } from '@/utils/advancedSearch/settings';
import {
  DEFAULT_LIVE_SCAN_LIMITS,
  LIVE_SCAN_LIMIT_BOUNDS,
  LIVE_SCAN_UNLIMITED,
  normalizeLiveScanLimits,
} from '@/utils/advancedSearch/settings';

type AdvancedSearchLiveScanLimitsFieldsProps = {
  limits: AdvancedSearchLiveScanLimits;
  disabled?: boolean;
  onChange: (next: AdvancedSearchLiveScanLimits) => void;
};

const FIELDS: Array<{
  key: keyof AdvancedSearchLiveScanLimits;
  label: string;
  hint: string;
}> = [
  {
    key: 'maxFiles',
    label: '파일 상한',
    hint: '쿼리당 읽을 노트·기타 파일 수',
  },
  {
    key: 'maxChatDays',
    label: '채팅 day 상한',
    hint: '쿼리당 읽을 채팅 day 파일 수 (최신순)',
  },
  {
    key: 'maxHits',
    label: '히트 상한',
    hint: '라이브 스캔에서 반환할 본문 매치 수',
  },
];

/**
 * Caps for web live vault body scan when Lucivy is unavailable.
 * Enter `-1` for no limit on that dimension.
 */
export default function AdvancedSearchLiveScanLimitsFields({
  limits,
  disabled = false,
  onChange,
}: AdvancedSearchLiveScanLimitsFieldsProps) {
  const [drafts, setDrafts] = useState<Record<keyof AdvancedSearchLiveScanLimits, string>>(
    () => ({
      maxFiles: String(limits.maxFiles),
      maxChatDays: String(limits.maxChatDays),
      maxHits: String(limits.maxHits),
    }),
  );

  useEffect(() => {
    setDrafts({
      maxFiles: String(limits.maxFiles),
      maxChatDays: String(limits.maxChatDays),
      maxHits: String(limits.maxHits),
    });
  }, [limits.maxFiles, limits.maxChatDays, limits.maxHits]);

  const commitKey = (key: keyof AdvancedSearchLiveScanLimits, raw: string) => {
    const parsed = Number.parseInt(raw.trim(), 10);
    const next = normalizeLiveScanLimits({
      ...limits,
      [key]: Number.isFinite(parsed) ? parsed : limits[key],
    });
    setDrafts((prev) => ({ ...prev, [key]: String(next[key]) }));
    if (next[key] !== limits[key]) onChange(next);
  };

  return (
    <div className="mt-3 space-y-3 rounded-md border border-gray-200 bg-white px-3 py-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
      <div>
        <p className="text-xs font-semibold text-gray-800 dark:text-odp-fgStrong">
          라이브 스캔 제한 (웹 폴백)
        </p>
        <p className="mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted">
          Lucivy를 쓸 수 없을 때(COOP/COEP 없음·색인 없음) 적용됩니다. 값을 올리면 더 많이
          읽지만 느려질 수 있습니다. -1은 제한 없음. 기본:{' '}
          {DEFAULT_LIVE_SCAN_LIMITS.maxFiles} /{' '}
          {DEFAULT_LIVE_SCAN_LIMITS.maxChatDays} / {DEFAULT_LIVE_SCAN_LIMITS.maxHits}.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {FIELDS.map(({ key, label, hint }) => {
          const bounds = LIVE_SCAN_LIMIT_BOUNDS[key];
          const isUnlimited = limits[key] === LIVE_SCAN_UNLIMITED;
          return (
            <div key={key}>
              <label className="mb-1 block text-[11px] font-semibold text-gray-600 dark:text-odp-muted">
                {label}
                <span className="ml-1 font-normal text-gray-400 dark:text-odp-muted">
                  ({bounds.min}–{bounds.max}, -1=무제한)
                </span>
              </label>
              <input
                type="number"
                inputMode="numeric"
                value={drafts[key]}
                disabled={disabled}
                aria-label={label}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setDrafts((prev) => ({ ...prev, [key]: e.target.value }));
                }}
                onBlur={(e: FocusEvent<HTMLInputElement>) => {
                  commitKey(key, e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur();
                  }
                }}
                className="w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft disabled:opacity-50"
              />
              <p className="mt-1 text-[10px] text-gray-500 dark:text-odp-muted">
                {hint}
                {isUnlimited ? ' · 현재 무제한' : ''}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { RadioGroup, Select } from 'radix-ui';
import {
  convertAutoSaveAmount,
  isAutoSaveDelayUnit,
  isAutoSaveMode,
  isTimedAutoSaveMode,
  loadAutoSavePolicy,
  saveAutoSavePolicy,
  WORKSPACE_TABS_AUTO_SAVE_CHANGED_EVENT,
  WORKSPACE_TABS_AUTO_SAVE_OPTIONS,
  AUTO_SAVE_DELAY_MS_MAX,
  AUTO_SAVE_DELAY_MS_MIN,
  AUTO_SAVE_DELAY_S_MAX,
  AUTO_SAVE_DELAY_S_MIN,
  type AutoSaveDelayUnit,
  type AutoSavePolicy,
} from '@/utils/workspaceTabsSettings';

/**
 * Global auto-save style (focus, window, elapsed delay, idle debounce, off).
 */
export default function AutoSaveSettings() {
  const [policy, setPolicy] = useState<AutoSavePolicy>(() => loadAutoSavePolicy());
  const [draft, setDraft] = useState(() => String(loadAutoSavePolicy().amount));

  useEffect(() => {
    const sync = () => {
      const next = loadAutoSavePolicy();
      setPolicy(next);
      setDraft(String(next.amount));
    };
    window.addEventListener(WORKSPACE_TABS_AUTO_SAVE_CHANGED_EVENT, sync);
    return () => window.removeEventListener(WORKSPACE_TABS_AUTO_SAVE_CHANGED_EVENT, sync);
  }, []);

  const timed = isTimedAutoSaveMode(policy.mode);
  const amountMin = policy.unit === 's' ? AUTO_SAVE_DELAY_S_MIN : AUTO_SAVE_DELAY_MS_MIN;
  const amountMax = policy.unit === 's' ? AUTO_SAVE_DELAY_S_MAX : AUTO_SAVE_DELAY_MS_MAX;

  const commitAmount = () => {
    const n = Number(draft.trim());
    if (!Number.isFinite(n)) {
      setDraft(String(policy.amount));
      return;
    }
    const saved = saveAutoSavePolicy({ ...policy, amount: n });
    setPolicy(saved);
    setDraft(String(saved.amount));
  };

  return (
    <div
      id="settings-auto-save"
      tabIndex={-1}
      className="scroll-mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface"
    >
      <h3 className="mb-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong">자동 저장</h3>
      <p className="mb-4 text-xs text-gray-600 dark:text-odp-muted">
        노트 변경을 언제 저장할지 고릅니다. 탭 기능과 관계없이 적용됩니다.
        암호화된 .enc.md 는 자동 저장하지 않습니다.
      </p>
      <RadioGroup.Root
        className="flex flex-col gap-2"
        value={policy.mode}
        onValueChange={(next) => {
          if (!isAutoSaveMode(next)) return;
          const saved = saveAutoSavePolicy({ ...policy, mode: next });
          setPolicy(saved);
        }}
        aria-label="자동 저장"
      >
        {WORKSPACE_TABS_AUTO_SAVE_OPTIONS.map((opt) => {
          const selected = policy.mode === opt.value;
          return (
            <RadioGroup.Item
              key={opt.value}
              value={opt.value}
              className={[
                'w-full max-w-xl origin-left rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200',
                'focus-visible:ring-2 focus-visible:ring-blue-500/40',
                selected
                  ? 'scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30'
                  : 'scale-[0.98] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400',
              ].join(' ')}
            >
              <div className={selected ? '' : 'opacity-70'}>
                <div className="text-sm font-medium text-gray-800 dark:text-odp-fgStrong">
                  {opt.label}
                </div>
                <div className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
                  {opt.description}
                </div>
              </div>
            </RadioGroup.Item>
          );
        })}
      </RadioGroup.Root>
      {timed ? (
        <div className="mt-3 flex max-w-xl flex-wrap items-center justify-between gap-x-3 gap-y-1.5 rounded-lg border border-gray-200 bg-white/80 px-3 py-2.5 dark:border-odp-borderStrong dark:bg-odp-bg/80">
          <label
            htmlFor="settings-auto-save-delay"
            className="shrink-0 whitespace-nowrap text-xs font-medium text-gray-700 dark:text-odp-fg"
          >
            대기 시간
          </label>
          <div className="flex items-center gap-1.5">
            <input
              id="settings-auto-save-delay"
              type="number"
              inputMode="numeric"
              min={amountMin}
              max={amountMax}
              step={1}
              value={draft}
              aria-label="자동 저장 대기 시간"
              onChange={(event) => setDraft(event.target.value)}
              onBlur={commitAmount}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  commitAmount();
                }
              }}
              className="h-8 w-24 rounded-md border border-gray-300 bg-white px-2 text-right text-xs text-gray-800 outline-none focus:border-blue-500 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg"
            />
            <Select.Root
              value={policy.unit}
              onValueChange={(next) => {
                if (!isAutoSaveDelayUnit(next) || next === policy.unit) return;
                const amount = convertAutoSaveAmount(policy.amount, policy.unit, next);
                const saved = saveAutoSavePolicy({ ...policy, amount, unit: next });
                setPolicy(saved);
                setDraft(String(saved.amount));
              }}
            >
              <Select.Trigger
                aria-label="대기 시간 단위"
                className="inline-flex h-8 items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2.5 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
              >
                <Select.Value />
                <Select.Icon className="text-gray-500">
                  <ChevronDown size={14} />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className="z-50 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                  position="popper"
                  sideOffset={4}
                >
                  <Select.Viewport className="p-1">
                    {(
                      [
                        ['ms', '밀리초 (ms)'],
                        ['s', '초 (s)'],
                      ] as const satisfies ReadonlyArray<readonly [AutoSaveDelayUnit, string]>
                    ).map(([unit, label]) => (
                      <Select.Item
                        key={unit}
                        value={unit}
                        className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pr-3 pl-7 text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg"
                      >
                        <Select.ItemIndicator className="absolute left-1.5 inline-flex items-center">
                          <Check size={12} />
                        </Select.ItemIndicator>
                        <Select.ItemText>{label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>
      ) : null}
    </div>
  );
}

import { useEffect, useState, type ReactNode } from 'react';
import { RadioGroup, Tooltip } from 'radix-ui';
import {
  SettingsCollapsibleContent,
} from '@/components/settings/SettingsCollapsible';
import { setSettingsToggle, subscribeSettingsToggles } from '@/utils/advancedSearch/settingsToggles';
import {
  formatStatusBarClock,
  loadStatusBarClockCustomPattern,
  loadStatusBarClockEnabled,
  loadStatusBarClockFormat,
  loadStatusBarClockShowDate,
  setStatusBarClockCustomPattern,
  setStatusBarClockFormat,
  STATUS_BAR_CLOCK_DISPLAY_CHANGED_EVENT,
  STATUS_BAR_CLOCK_FORMAT_OPTIONS,
  STATUS_BAR_CLOCK_PATTERN_EXAMPLES,
  STATUS_BAR_CLOCK_PATTERN_TOKEN_ROWS,
  type StatusBarClockFormat,
} from '@/utils/statusBarClockSettings';

const tooltipContentClass =
  'z-100001 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong';

const switchClass = (on: boolean) =>
  [
    'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200',
    on
      ? 'border-blue-500 bg-blue-500 shadow-sm'
      : 'border-gray-300 bg-gray-300 dark:border-odp-borderSoft dark:bg-odp-bgSoft',
    'group-hover:border-blue-400 group-hover:brightness-105',
  ].join(' ');

function BottomTooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="bottom"
          sideOffset={6}
          className={tooltipContentClass}
        >
          {label}
          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export default function StatusBarClockSettings() {
  const [enabled, setEnabled] = useState(() => loadStatusBarClockEnabled());
  const [showDate, setShowDate] = useState(() => loadStatusBarClockShowDate());
  const [format, setFormatState] = useState<StatusBarClockFormat>(() =>
    loadStatusBarClockFormat(),
  );
  const [customPattern, setCustomPatternState] = useState(() =>
    loadStatusBarClockCustomPattern(),
  );
  const [previewNow, setPreviewNow] = useState(() => Date.now());

  useEffect(() => {
    return subscribeSettingsToggles((id, next) => {
      if (id === 'settings-status-bar-clock') setEnabled(next);
      else if (id === 'settings-status-bar-clock-date') setShowDate(next);
    });
  }, []);

  useEffect(() => {
    const onDisplay = (event: Event) => {
      const detail = (event as CustomEvent<{
        format?: StatusBarClockFormat;
        showDate?: boolean;
        customPattern?: string;
      }>).detail;
      setFormatState(detail?.format ?? loadStatusBarClockFormat());
      setShowDate(
        typeof detail?.showDate === 'boolean'
          ? detail.showDate
          : loadStatusBarClockShowDate(),
      );
      setCustomPatternState(
        typeof detail?.customPattern === 'string'
          ? detail.customPattern
          : loadStatusBarClockCustomPattern(),
      );
    };
    window.addEventListener(STATUS_BAR_CLOCK_DISPLAY_CHANGED_EVENT, onDisplay);
    return () => {
      window.removeEventListener(STATUS_BAR_CLOCK_DISPLAY_CHANGED_EVENT, onDisplay);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const id = window.setInterval(() => setPreviewNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [enabled]);

  const preview = formatStatusBarClock(previewNow, {
    format,
    showDate,
    customPattern,
  });

  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      <div className="mt-4">
        <label className="group flex cursor-pointer items-center gap-3 text-xs text-gray-700 dark:text-odp-fg">
          <BottomTooltip label="앱 하단 상태바 우측 끝에 시계 아이콘과 현재 시각을 표시합니다. 기본값: 켜짐.">
            <button
              type="button"
              onClick={() => setSettingsToggle('settings-status-bar-clock', !enabled)}
              className={switchClass(enabled)}
              aria-pressed={enabled}
              aria-label="상태바 현재 시각 표시"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  enabled ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </BottomTooltip>
          <span className="select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong">
            상태바 오른쪽에 현재 시각 표시
            <span className="mt-0.5 block text-[11px] text-gray-500 dark:text-odp-muted">
              앱 하단 상태바 우측 끝에 시계 아이콘과 로컬 시각을 1초 단위로 갱신합니다.
              (기본값: 켜짐)
            </span>
          </span>
        </label>

        <SettingsCollapsibleContent
          open={enabled}
          contentKey="settings-status-bar-clock-format"
        >
          <div className="mt-3 space-y-4 pl-12">
            <label className="group flex cursor-pointer items-center gap-3 text-xs text-gray-700 dark:text-odp-fg">
              <BottomTooltip label="24H/12H 프리셋에 날짜(yyyy-MM-dd)를 앞에 붙입니다. 직접 입력 패턴에는 영향 없음. 기본값: 꺼짐.">
                <button
                  type="button"
                  onClick={() =>
                    setSettingsToggle('settings-status-bar-clock-date', !showDate)
                  }
                  className={switchClass(showDate)}
                  aria-pressed={showDate}
                  aria-label="상태바 시계 날짜 표시"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                      showDate ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </BottomTooltip>
              <span className="select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong">
                날짜도 함께 표시
                <span className="mt-0.5 block text-[11px] text-gray-500 dark:text-odp-muted">
                  프리셋(24H/12H)에 yyyy-MM-dd를 붙입니다. 직접 입력 패턴에는 영향을 주지
                  않습니다. (기본값: 꺼짐)
                </span>
              </span>
            </label>

            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-700 dark:text-odp-fg">
                시각 표시 형식
              </p>
              <p className="text-[11px] leading-relaxed text-gray-500 dark:text-odp-muted">
                프리셋을 고르거나 「직접 입력」에서 패턴 문자열을 작성합니다. 패턴은 아래 토큰을
                조합하며, 그 외 문자는 그대로 표시됩니다 (예: <code className="rounded bg-gray-100 px-1 dark:bg-odp-bgSoft">-</code>,{' '}
                <code className="rounded bg-gray-100 px-1 dark:bg-odp-bgSoft">:</code>,{' '}
                <code className="rounded bg-gray-100 px-1 dark:bg-odp-bgSoft">/</code>).
              </p>
              <RadioGroup.Root
                className="flex flex-col gap-2"
                value={format}
                onValueChange={(next) => {
                  if (next !== '24h' && next !== '12h' && next !== 'custom') return;
                  setStatusBarClockFormat(next);
                  setFormatState(next);
                }}
                aria-label="상태바 시계 표시 형식"
              >
                {STATUS_BAR_CLOCK_FORMAT_OPTIONS.map((opt) => {
                  const selected = format === opt.value;
                  const tip =
                    opt.value === '24h'
                      ? '24시간제 프리셋. 예: 15:04:05 (날짜 켜면 2026-01-15 15:04:05)'
                      : opt.value === '12h'
                        ? '12시간제 + AM/PM 프리셋. 예: 03:04:05 PM (날짜 켜면 앞에 yyyy-MM-dd)'
                        : '직접 패턴 입력. yyyy/MM/dd/HH/hh/mm/ss/A/a 토큰을 조합합니다.';
                  return (
                    <BottomTooltip key={opt.value} label={tip}>
                      <RadioGroup.Item
                        value={opt.value}
                        className={[
                          'w-90 origin-left rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200',
                          'focus-visible:ring-2 focus-visible:ring-blue-500/40',
                          selected
                            ? 'scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30'
                            : 'scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400',
                        ].join(' ')}
                      >
                        <div className={selected ? '' : 'opacity-50'}>
                          <div className="text-sm font-medium text-gray-800 dark:text-odp-fgStrong">
                            {opt.label}
                          </div>
                          <div className="mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted">
                            {opt.description}
                          </div>
                        </div>
                      </RadioGroup.Item>
                    </BottomTooltip>
                  );
                })}
              </RadioGroup.Root>
            </div>

            {format === 'custom' ? (
              <div className="space-y-3 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/40">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-gray-700 dark:text-odp-fg">
                    커스텀 패턴
                  </p>
                  <p className="text-[11px] leading-relaxed text-gray-500 dark:text-odp-muted">
                    아래 토큰을 원하는 순서·구분자로 이어 적습니다. 빈 칸이면 기본값{' '}
                    <code className="rounded bg-gray-100 px-1 font-mono dark:bg-odp-bgSoft">
                      yyyy-MM-dd HH:mm:ss
                    </code>
                    로 표시됩니다.
                  </p>
                  <BottomTooltip label="상태바에 그대로 적용할 날짜/시각 패턴입니다. 토큰 표와 예시를 참고하세요.">
                    <input
                      type="text"
                      value={customPattern}
                      onChange={(e) => {
                        const next = e.target.value;
                        setCustomPatternState(next);
                        setStatusBarClockCustomPattern(next);
                      }}
                      spellCheck={false}
                      className="w-full max-w-md rounded border border-gray-300 bg-white px-2.5 py-1.5 font-mono text-xs text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
                      aria-label="상태바 시계 커스텀 패턴"
                      placeholder="yyyy-MM-dd HH:mm:ss"
                    />
                  </BottomTooltip>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[280px] border-collapse text-left text-[11px]">
                    <caption className="mb-1.5 caption-top text-left text-[11px] font-medium text-gray-600 dark:text-odp-muted">
                      사용 가능한 토큰
                    </caption>
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-600 dark:border-odp-borderSoft dark:text-odp-muted">
                        <th className="py-1 pr-3 font-semibold">토큰</th>
                        <th className="py-1 pr-3 font-semibold">의미</th>
                        <th className="py-1 font-semibold">예</th>
                      </tr>
                    </thead>
                    <tbody>
                      {STATUS_BAR_CLOCK_PATTERN_TOKEN_ROWS.map((row) => (
                        <tr
                          key={row.token}
                          className="border-b border-gray-100 text-gray-700 dark:border-odp-borderSoft/60 dark:text-odp-fg"
                        >
                          <td className="py-1 pr-3 font-mono font-semibold">{row.token}</td>
                          <td className="py-1 pr-3">{row.meaning}</td>
                          <td className="py-1 font-mono">{row.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <p className="mb-1 text-[11px] font-medium text-gray-600 dark:text-odp-muted">
                    작성 예시
                  </p>
                  <ul className="space-y-1 text-[11px] text-gray-600 dark:text-odp-muted">
                    {STATUS_BAR_CLOCK_PATTERN_EXAMPLES.map((ex) => (
                      <li key={ex.pattern} className="font-mono">
                        <span className="text-gray-800 dark:text-odp-fg">{ex.pattern}</span>
                        <span className="mx-1.5 text-gray-400">→</span>
                        <span>{ex.result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            <p className="text-[11px] text-gray-500 dark:text-odp-muted">
              미리보기:{' '}
              <span className="font-mono text-gray-700 dark:text-odp-fg">{preview}</span>
            </p>
          </div>
        </SettingsCollapsibleContent>
      </div>
    </Tooltip.Provider>
  );
}

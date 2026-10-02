import { useEffect, useState } from 'react';
import { RadioGroup } from 'radix-ui';
import { IconMaximize, IconSmartphone } from '@/components/icons';
import { isTauriAndroid } from '@/utils/tauriPlatform';
import {
  loadAndroidSystemStatusBarVisible,
  type AndroidChromeMode,
} from '@/utils/androidSystemStatusBarSettings';
import {
  setSettingsToggle,
  subscribeSettingsToggles,
} from '@/utils/advancedSearch/settingsToggles';
import { settingsSectionCardClass } from '@/utils/settingsSectionCard';

const MODES: Array<{
  value: AndroidChromeMode;
  title: string;
  description: string;
  icon: 'fullscreen' | 'status';
}> = [
  {
    value: 'fullscreen',
    title: '전체화면 (상태 표시줄 덮기)',
    description:
      '상단 시계·배터리를 가리고 화면을 끝까지 씁니다. 위에서 아래로 쓸면 잠시 나타날 수 있습니다.',
    icon: 'fullscreen',
  },
  {
    value: 'status-bar',
    title: '상태 표시줄 보이기',
    description:
      '시스템 상태 표시줄을 항상 보이게 하고, 앱 내용이 그 아래부터 배치됩니다.',
    icon: 'status',
  },
];

function modeFromVisible(visible: boolean): AndroidChromeMode {
  return visible ? 'status-bar' : 'fullscreen';
}

/**
 * Android-only: choose fullscreen (cover status bar) vs status-bar-visible chrome.
 */
export default function AndroidSystemStatusBarSettings() {
  const [mode, setMode] = useState<AndroidChromeMode>(() =>
    modeFromVisible(loadAndroidSystemStatusBarVisible()),
  );

  useEffect(() => {
    if (!isTauriAndroid()) return undefined;
    return subscribeSettingsToggles((id, next) => {
      if (id === 'settings-android-system-status-bar') {
        setMode(modeFromVisible(next));
      }
    });
  }, []);

  if (!isTauriAndroid()) return null;

  return (
    <section
      id="settings-android-system-status-bar"
      tabIndex={-1}
      aria-label="Android 화면 모드"
      className={`scroll-mt-4 ${settingsSectionCardClass('sky')}`}
    >
      <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong">
        <IconSmartphone size={16} />
        Android 화면 모드
      </h3>
      <p className="mb-3 text-xs text-gray-600 dark:text-odp-muted">
        Android 전용입니다. 상태 표시줄을 덮는 전체화면과, 상태 표시줄을 남기고 쓰는 모드 중
        하나를 고릅니다.
      </p>
      <RadioGroup.Root
        className="flex flex-col gap-2"
        value={mode}
        onValueChange={(value) => {
          const next = value === 'fullscreen' ? 'fullscreen' : 'status-bar';
          setMode(next);
          // Toggle id stores "status bar visible" (true = status-bar mode).
          setSettingsToggle(
            'settings-android-system-status-bar',
            next === 'status-bar',
          );
        }}
        aria-label="Android 화면 모드"
      >
        {MODES.map((opt) => {
          const selected = mode === opt.value;
          return (
            <RadioGroup.Item
              key={opt.value}
              value={opt.value}
              className={[
                'flex w-full cursor-pointer items-start gap-3 rounded-md border px-3 py-2.5 text-left outline-none transition',
                'focus-visible:ring-2 focus-visible:ring-blue-400',
                selected
                  ? 'border-blue-500 bg-white/90 shadow-sm dark:border-blue-400 dark:bg-odp-bgSoft/80'
                  : 'border-gray-200/90 bg-white/70 hover:border-blue-300 dark:border-odp-borderSoft dark:bg-odp-bgSoft/40 dark:hover:border-blue-500/50',
              ].join(' ')}
            >
              <span
                className={[
                  'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md',
                  selected
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600 dark:bg-odp-borderStrong dark:text-odp-muted',
                ].join(' ')}
                aria-hidden
              >
                {opt.icon === 'fullscreen' ? (
                  <IconMaximize size={16} />
                ) : (
                  <IconSmartphone size={16} />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-gray-800 dark:text-odp-fgStrong">
                  {opt.title}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
                  {opt.description}
                </span>
              </span>
              <span
                className={[
                  'mt-1 h-4 w-4 shrink-0 rounded-full border-2',
                  selected
                    ? 'border-blue-500 bg-blue-500 shadow-[inset_0_0_0_2px_white]'
                    : 'border-gray-300 dark:border-odp-borderStrong',
                ].join(' ')}
                aria-hidden
              />
            </RadioGroup.Item>
          );
        })}
      </RadioGroup.Root>
    </section>
  );
}

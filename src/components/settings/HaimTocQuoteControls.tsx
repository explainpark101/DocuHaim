import { Switch } from 'radix-ui';
import { setSettingsToggle } from '@/utils/advancedSearch/settingsToggles';

const switchRootClass = (checked: boolean) =>
  [
    'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400',
    checked
      ? 'border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500'
      : 'border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong',
  ].join(' ');

const switchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

type HaimTocQuoteControlsProps = {
  enabled: boolean;
  compact?: boolean;
};

export default function HaimTocQuoteControls({
  enabled,
  compact = false,
}: HaimTocQuoteControlsProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
      <div className="min-w-0">
        <p className="shrink-0 whitespace-nowrap text-xs font-medium text-gray-700 dark:text-odp-fg">
          인용 제목 숨기기
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
          {compact
            ? '켜면 인용 블록 안의 제목은 목차에 나오지 않습니다.'
            : '켜면 인용(blockquote) 안에 있는 제목은 Haim 목차에서 빠집니다. 본문 인용은 그대로입니다.'}
        </p>
      </div>
      <Switch.Root
        className={switchRootClass(enabled)}
        checked={enabled}
        onCheckedChange={(next) => {
          setSettingsToggle('settings-haim-toc-hide-quotes', next);
        }}
        aria-label="인용 제목 숨기기"
      >
        <Switch.Thumb className={switchThumbClass} />
      </Switch.Root>
    </div>
  );
}

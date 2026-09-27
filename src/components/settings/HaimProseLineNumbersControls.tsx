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

type HaimProseLineNumbersControlsProps = {
  enabled: boolean;
  /** Compact copy for floating panel. */
  compact?: boolean;
};

export default function HaimProseLineNumbersControls({
  enabled,
  compact = false,
}: HaimProseLineNumbersControlsProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
      <div className="min-w-0">
        <p className="shrink-0 whitespace-nowrap text-xs font-medium text-gray-700 dark:text-odp-fg">
          WYSIWYG 줄 번호
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
          {compact
            ? '문서 왼쪽에 줄 번호를 표시합니다(기본 켜짐).'
            : 'WYSIWYG 문서 왼쪽에 줄 번호를 표시합니다(기본 켜짐).'}
        </p>
      </div>
      <Switch.Root
        className={switchRootClass(enabled)}
        checked={enabled}
        onCheckedChange={(next) => {
          setSettingsToggle('settings-haim-prose-line-numbers', next);
        }}
        aria-label="WYSIWYG 줄 번호"
      >
        <Switch.Thumb className={switchThumbClass} />
      </Switch.Root>
    </div>
  );
}

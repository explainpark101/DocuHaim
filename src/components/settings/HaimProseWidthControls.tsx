import { Switch } from 'radix-ui';
import SliderWithScrubInput from '@/components/SliderWithScrubInput';
import { setSettingsToggle } from '@/utils/advancedSearch/settingsToggles';
import {
  HAIM_PROSE_MAX_WIDTH_PX_MAX,
  HAIM_PROSE_MAX_WIDTH_PX_MIN,
  saveHaimProseMaxWidthPx,
  type HaimProseWidthSettings,
} from '@/utils/haimProseWidthSettings';

const switchRootClass = (checked: boolean) =>
  [
    'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400',
    checked
      ? 'border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500'
      : 'border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong',
  ].join(' ');

const switchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

type HaimProseWidthControlsProps = {
  settings: HaimProseWidthSettings;
  /** Compact copy for floating panel. */
  compact?: boolean;
};

export default function HaimProseWidthControls({
  settings,
  compact = false,
}: HaimProseWidthControlsProps) {
  return (
    <div className={compact ? 'space-y-2' : 'space-y-2'}>
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
        <div className="min-w-0">
          <p className="shrink-0 whitespace-nowrap text-xs font-medium text-gray-700 dark:text-odp-fg">
            WYSIWYG 본문 너비 제한
          </p>
          {!compact ? (
            <p className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
              켜면 노트 Haim Editor WYSIWYG 본문을 max-width로 가운데 정렬합니다.
            </p>
          ) : (
            <p className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
              슬라이더를 움직이면 노트에 바로 반영됩니다.
            </p>
          )}
        </div>
        <Switch.Root
          className={switchRootClass(settings.enabled)}
          checked={settings.enabled}
          onCheckedChange={(next) => {
            setSettingsToggle('settings-haim-prose-width-clamp', next);
          }}
          aria-label="WYSIWYG 본문 너비 제한"
        >
          <Switch.Thumb className={switchThumbClass} />
        </Switch.Root>
      </div>
      <label
        className={`block space-y-1 ${settings.enabled ? '' : 'opacity-50'}`}
      >
        <span className="text-[10px] text-gray-400">최대 너비</span>
        <SliderWithScrubInput
          unit="css"
          suffix="px"
          min={HAIM_PROSE_MAX_WIDTH_PX_MIN}
          max={HAIM_PROSE_MAX_WIDTH_PX_MAX}
          step={10}
          value={settings.maxWidthPx}
          disabled={!settings.enabled}
          aria-label="WYSIWYG 본문 최대 너비"
          onChange={(v) => saveHaimProseMaxWidthPx(v)}
        />
      </label>
    </div>
  );
}

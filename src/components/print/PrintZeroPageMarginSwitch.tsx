import { Switch, Tooltip } from 'radix-ui';

const switchRootClass = (checked: boolean) =>
  `relative h-5 w-9 shrink-0 cursor-pointer rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 ${
    checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-odp-borderStrong'
  }`;

const switchThumbClass =
  'block size-4 translate-x-0.5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[18px]';

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

/**
 * Toggle paged.js / @page margin to 0 so printed pages fill the sheet
 * without stacking browser print margins on top of paged margins.
 */
export default function PrintZeroPageMarginSwitch({ checked, onCheckedChange }: Props) {
  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      <div className="flex min-w-0 items-center gap-2">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <label className="flex min-w-0 cursor-pointer items-center gap-2">
              <span className="shrink-0 text-xs text-gray-500 dark:text-odp-muted">여백 없음</span>
              <Switch.Root
                className={switchRootClass(checked)}
                checked={checked}
                onCheckedChange={onCheckedChange}
                aria-label="페이지 여백 없음"
                data-print-toolbar="zero-margin"
              >
                <Switch.Thumb className={switchThumbClass} />
              </Switch.Root>
            </label>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="bottom"
              sideOffset={6}
              className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
            >
              페이지 나뉨은 유지하고 내부 여백을 없앱니다. 인쇄 대화상자 여백도 「없음」으로
              맞추세요.
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  );
}

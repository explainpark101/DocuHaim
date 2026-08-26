import { Switch } from 'radix-ui';

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
};

const switchRootClass = (checked: boolean) =>
  [
    'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50',
    checked
      ? 'border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500'
      : 'border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong',
  ].join(' ');

const switchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

export default function PrintPreviewFirstPageSingleSwitch({
  checked,
  onCheckedChange,
  disabled = false,
}: Props) {
  return (
    <label className="inline-flex items-center gap-2">
      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      <span className="shrink-0 text-xs text-gray-500 dark:text-odp-muted">첫장 단면</span>
      <Switch.Root
        className={switchRootClass(checked)}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        aria-label="첫장 단면으로 보기"
        data-print-toolbar="first-page-single"
      >
        <Switch.Thumb className={switchThumbClass} />
      </Switch.Root>
    // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
    </label>
  );
}

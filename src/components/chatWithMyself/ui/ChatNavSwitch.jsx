import { Switch } from 'radix-ui';

const rootClass =
  'relative h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent bg-gray-300 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:bg-blue-600 dark:bg-odp-borderStrong dark:data-[state=checked]:bg-blue-500';

const thumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

/**
 * Compact labeled switch for the chat top nav.
 */
export default function ChatNavSwitch({
  checked = false,
  onCheckedChange,
  label,
  title,
  id,
}) {
  const switchId = id || undefined;
  return (
    <label
      className="inline-flex max-w-full cursor-pointer items-center gap-1.5 rounded-md px-1 py-0.5 hover:bg-gray-50 dark:hover:bg-odp-focusBg"
      title={title || label}
    >
      <span className="select-none text-[11px] font-medium text-gray-600 dark:text-gray-300">
        {label}
      </span>
      <Switch.Root
        id={switchId}
        className={rootClass}
        checked={Boolean(checked)}
        onCheckedChange={(next) => onCheckedChange?.(Boolean(next))}
        aria-label={label}
      >
        <Switch.Thumb className={thumbClass} />
      </Switch.Root>
    </label>
  );
}

import { Check, ChevronDown } from 'lucide-react';
import { Select } from 'radix-ui';

export const formInputClassName =
  'w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-800 outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:placeholder:text-odp-muted';

export const formInputCompactClassName =
  'rounded-md border border-gray-300 bg-white px-1.5 py-1 text-[11px] text-gray-800 outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg';

export const selectTriggerClassName =
  'inline-flex h-8 min-w-0 items-center justify-between gap-1.5 rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-gray-400 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:data-placeholder:text-odp-muted';

export const selectContentClassName =
  'z-100050 max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft';

export const selectItemClassName =
  'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg';

export type RadixSelectOption = {
  value: string;
  label: string;
};

type RadixSelectFieldProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly RadixSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  'aria-label'?: string;
  id?: string;
  className?: string;
  triggerClassName?: string;
};

/**
 * Shared Radix Select used by table/webfont form UIs.
 */
export function RadixSelectField({
  value,
  onValueChange,
  options,
  placeholder,
  disabled,
  id,
  className = '',
  triggerClassName = '',
  'aria-label': ariaLabel,
}: RadixSelectFieldProps) {
  return (
    <Select.Root
      value={value}
      onValueChange={onValueChange}
      {...(disabled !== undefined ? { disabled } : {})}
    >
      <Select.Trigger
        {...(id !== undefined ? { id } : {})}
        {...(ariaLabel !== undefined ? { 'aria-label': ariaLabel } : {})}
        className={`${selectTriggerClassName} ${className} ${triggerClassName}`.trim()}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="shrink-0 text-gray-500">
          <ChevronDown size={14} aria-hidden />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={selectContentClassName}
          position="popper"
          sideOffset={4}
        >
          <Select.Viewport className="p-1">
            {options.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className={selectItemClassName}
              >
                <Select.ItemIndicator className="absolute left-1.5 inline-flex items-center">
                  <Check size={12} aria-hidden />
                </Select.ItemIndicator>
                <Select.ItemText>{opt.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

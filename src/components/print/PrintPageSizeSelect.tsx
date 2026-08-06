import { Check, ChevronDown } from 'lucide-react';
import { Select } from 'radix-ui';
import {
  PRINT_PAGE_SIZES,
  type PrintPageSizeId,
} from '@/utils/printPageLayout';

type Props = {
  value: PrintPageSizeId;
  onValueChange: (value: PrintPageSizeId) => void;
};

export default function PrintPageSizeSelect({ value, onValueChange }: Props) {
  return (
    <label className="flex min-w-0 items-center gap-2">
      <span className="shrink-0 text-xs text-gray-500 dark:text-odp-muted">용지</span>
      <Select.Root
        value={value}
        onValueChange={(next) => {
          const match = PRINT_PAGE_SIZES.find((size) => size.id === next);
          if (match) onValueChange(match.id);
        }}
      >
        <Select.Trigger
          aria-label="인쇄 용지 크기"
          data-print-toolbar="paper"
          className="inline-flex h-8 min-w-36 items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
        >
          <Select.Value />
          <Select.Icon className="text-gray-500">
            <ChevronDown size={14} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="z-100010 max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            position="popper"
            sideOffset={4}
          >
            <Select.Viewport className="p-1">
              {PRINT_PAGE_SIZES.map((size) => (
                <Select.Item
                  key={size.id}
                  value={size.id}
                  className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg"
                >
                  <Select.ItemIndicator className="absolute left-1.5 inline-flex items-center">
                    <Check size={12} />
                  </Select.ItemIndicator>
                  <Select.ItemText>{size.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </label>
  );
}

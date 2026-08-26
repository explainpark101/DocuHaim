import { Check, ChevronDown, Columns2, File } from 'lucide-react';
import { Select } from 'radix-ui';
import type { PrintPreviewPageCount } from '@/utils/print/printPreviewView';

type Props = {
  value: PrintPreviewPageCount;
  onValueChange: (value: PrintPreviewPageCount) => void;
  disabled?: boolean;
};

const OPTIONS: {
  value: PrintPreviewPageCount;
  label: string;
  Icon: typeof File;
}[] = [
  { value: 1, label: '1페이지', Icon: File },
  { value: 2, label: '2페이지', Icon: Columns2 },
];

export default function PrintPreviewPagesSelect({
  value,
  onValueChange,
  disabled = false,
}: Props) {
  const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0]!;

  return (
    <label className="flex min-w-0 items-center gap-2">
      <span className="shrink-0 text-xs text-gray-500 dark:text-odp-muted">페이지</span>
      <Select.Root
        value={String(value)}
        disabled={disabled}
        onValueChange={(next: any) => {
          if (next === '1') onValueChange(1);
          else if (next === '2') onValueChange(2);
        }}
      >
        <Select.Trigger
          aria-label="미리보기 1페이지/2페이지"
          data-print-toolbar="view-pages"
          className="inline-flex h-8 min-w-32 items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
        >
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <current.Icon size={14} className="shrink-0 text-gray-500 dark:text-odp-muted" aria-hidden />
            <Select.Value />
          </span>
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
              {OPTIONS.map(({ value: optionValue, label, Icon }) => (
                <Select.Item
                  key={optionValue}
                  value={String(optionValue)}
                  className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg"
                >
                  <Select.ItemIndicator className="absolute left-1.5 inline-flex items-center">
                    <Check size={12} />
                  </Select.ItemIndicator>
                  <Icon size={14} className="shrink-0 text-gray-500 dark:text-odp-muted" aria-hidden />
                  <Select.ItemText>{label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </label>
  );
}

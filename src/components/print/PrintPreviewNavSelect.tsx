import { Check, ChevronDown, GalleryHorizontalEnd, ScrollText } from 'lucide-react';
import { Select } from 'radix-ui';
import type { PrintPreviewNavigation } from '@/utils/printPreviewView';

type Props = {
  value: PrintPreviewNavigation;
  onValueChange: (value: PrintPreviewNavigation) => void;
  disabled?: boolean;
};

const OPTIONS: {
  value: PrintPreviewNavigation;
  label: string;
  Icon: typeof ScrollText;
}[] = [
  { value: 'scroll', label: '스크롤', Icon: ScrollText },
  { value: 'flip', label: '넘기기', Icon: GalleryHorizontalEnd },
];

export default function PrintPreviewNavSelect({
  value,
  onValueChange,
  disabled = false,
}: Props) {
  const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0]!;

  return (
    <label className="flex min-w-0 items-center gap-2">
      <span className="shrink-0 text-xs text-gray-500 dark:text-odp-muted">보기</span>
      <Select.Root
        value={value}
        disabled={disabled}
        onValueChange={(next) => {
          if (next === 'scroll' || next === 'flip') onValueChange(next);
        }}
      >
        <Select.Trigger
          aria-label="미리보기 스크롤/넘기기"
          data-print-toolbar="view-nav"
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
                  value={optionValue}
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

import { useState } from 'react';
import { Popover } from 'radix-ui';
import { HexAlphaColorPicker, HexColorInput } from 'react-colorful';
import {
  CSS_HEX_CHECKER_STYLE,
  cssHexToInputValue,
  normalizeCssHexColor,
} from '@/utils/cssColor';

const PRESETS: { id: string; label: string; value: string | null; swatch?: string }[] = [
  { id: 'none', label: '없음', value: null },
  { id: 'white', label: '흰색', value: '#ffffff', swatch: '#ffffff' },
  { id: 'black', label: '검정', value: '#000000', swatch: '#000000' },
  { id: 'gray', label: '회색', value: '#e5e7eb', swatch: '#e5e7eb' },
];

export const CHAT_COLOR_PICKER_ATTR = 'data-chat-color-picker';

type ChatImageBackgroundPickerProps = {
  value?: string | null;
  onChange?: (next: string | null) => void;
  compact?: boolean;
  label?: string;
  className?: string;
  tone?: 'light' | 'dark';
  allowNone?: boolean;
  noneLabel?: string;
};

/**
 * Preset + react-colorful custom hex picker for chat image backgrounds.
 */
export default function ChatImageBackgroundPicker({
  value = null,
  onChange,
  compact = false,
  label = '배경색',
  className = '',
  tone = 'light',
  allowNone = true,
  noneLabel = '없음',
}: ChatImageBackgroundPickerProps) {
  const [open, setOpen] = useState(false);
  const normalized = normalizeCssHexColor(value);
  const hex = cssHexToInputValue(normalized);
  const presets = allowNone ? PRESETS : PRESETS.filter((p) => p.value != null);
  const isDark = tone === 'dark';
  const textClass = isDark ? 'text-white/80' : 'text-gray-600 dark:text-gray-300';
  const chipBase = compact
    ? 'h-7 min-w-7 px-1.5 text-[10px]'
    : 'h-8 min-w-8 px-2 text-[11px]';
  const chipIdle = isDark
    ? 'border-white/25 text-white/80 hover:bg-white/10'
    : 'border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-odp-borderStrong dark:text-gray-300 dark:hover:bg-odp-focusBg';
  const chipActive = isDark
    ? 'border-white bg-white/15 text-white'
    : 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200';
  const customActive =
    Boolean(normalized) && !presets.some((p) => p.value === normalized);

  const setHex = (next: string) => {
    const color = normalizeCssHexColor(next.startsWith('#') ? next : `#${next}`);
    if (color) onChange?.(color);
  };

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <span className={`shrink-0 text-[11px] ${textClass}`}>{label}</span>
      {presets.map((preset) => {
        const active =
          preset.value == null ? !normalized : normalized === preset.value;
        return (
          <button
            key={preset.id}
            type="button"
            className={`${chipBase} inline-flex items-center justify-center gap-1 rounded-md border ${
              active ? chipActive : chipIdle
            }`}
            onClick={() => {
              setOpen(false);
              onChange?.(preset.value);
            }}
            aria-pressed={active}
          >
            {preset.swatch ? (
              <span
                className="h-3 w-3 rounded-sm border border-black/20"
                style={{ backgroundColor: preset.swatch }}
              />
            ) : (
              <span
                className="h-3 w-3 rounded-sm border border-black/20"
                style={CSS_HEX_CHECKER_STYLE}
              />
            )}
            {preset.value == null ? noneLabel : preset.label}
          </button>
        );
      })}
      <Popover.Root open={open} onOpenChange={setOpen} modal>
        <Popover.Trigger asChild>
          <button
            type="button"
            className={`${chipBase} inline-flex items-center justify-center gap-1 rounded-md border ${
              customActive || open ? chipActive : chipIdle
            }`}
            aria-label="배경색 직접 선택"
            aria-expanded={open}
          >
            <span className="relative h-3 w-3 overflow-hidden rounded-sm border border-black/20">
              <span
                aria-hidden
                className="absolute inset-0"
                style={CSS_HEX_CHECKER_STYLE}
              />
              <span
                aria-hidden
                className="absolute inset-0"
                style={{ backgroundColor: hex }}
              />
            </span>
            직접
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            {...{ [CHAT_COLOR_PICKER_ATTR]: '' }}
            side="top"
            align="start"
            sideOffset={8}
            collisionPadding={12}
            className={`z-[400] w-[13.5rem] rounded-xl border p-2.5 shadow-xl outline-none ${
              isDark
                ? 'border-white/15 bg-[#1a2333] text-white'
                : 'border-gray-200 bg-white text-gray-800 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg'
            }`}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div className="[&_.react-colorful]:h-40 [&_.react-colorful]:w-full">
              <HexAlphaColorPicker color={hex} onChange={setHex} />
            </div>
            <HexColorInput
              color={hex}
              onChange={setHex}
              prefixed
              alpha
              aria-label="HEX 색상"
              className={`mt-2 w-full rounded-md border px-2 py-1 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                isDark
                  ? 'border-white/20 bg-black/30 text-white'
                  : 'border-gray-300 bg-transparent dark:border-odp-borderStrong dark:text-odp-fgStrong'
              }`}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

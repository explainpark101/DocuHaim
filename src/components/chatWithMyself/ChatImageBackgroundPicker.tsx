import { cssHexToInputValue, normalizeCssHexColor } from '@/utils/cssColor';

const PRESETS: { id: string; label: string; value: string | null; swatch?: string }[] = [
  { id: 'none', label: '없음', value: null },
  { id: 'white', label: '흰색', value: '#ffffff', swatch: '#ffffff' },
  { id: 'black', label: '검정', value: '#000000', swatch: '#000000' },
  { id: 'gray', label: '회색', value: '#e5e7eb', swatch: '#e5e7eb' },
];

type ChatImageBackgroundPickerProps = {
  value?: string | null;
  onChange?: (next: string | null) => void;
  compact?: boolean;
  label?: string;
  className?: string;
  tone?: 'light' | 'dark';
  allowNone?: boolean;
};

/**
 * Preset + custom hex background picker for chat image display / crop flatten.
 */
export default function ChatImageBackgroundPicker({
  value = null,
  onChange,
  compact = false,
  label = '배경색',
  className = '',
  tone = 'light',
  allowNone = true,
}: ChatImageBackgroundPickerProps) {
  const normalized = normalizeCssHexColor(value);
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
            onClick={() => onChange?.(preset.value)}
            aria-pressed={active}
          >
            {preset.swatch ? (
              <span
                className="h-3 w-3 rounded-sm border border-black/20"
                style={{ backgroundColor: preset.swatch }}
              />
            ) : null}
            {preset.label}
          </button>
        );
      })}
      <label
        className={`${chipBase} relative inline-flex cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-md border ${
          normalized && !presets.some((p) => p.value === normalized)
            ? chipActive
            : chipIdle
        }`}
      >
        <span
          className="h-3 w-3 rounded-sm border border-black/20"
          style={{ backgroundColor: cssHexToInputValue(normalized) }}
        />
        직접
        <input
          type="color"
          className="absolute inset-0 cursor-pointer opacity-0"
          value={cssHexToInputValue(normalized)}
          onChange={(e) => onChange?.(normalizeCssHexColor(e.target.value))}
          aria-label="배경색 직접 선택"
        />
      </label>
    </div>
  );
}

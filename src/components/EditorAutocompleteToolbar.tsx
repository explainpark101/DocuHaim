import { Switch } from 'radix-ui';

type Props = {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  theme?: string;
};

/** md-editor-rt defToolbars: toggle built-in autocomplete suggestions. */
export default function EditorAutocompleteToolbar({
  checked = true,
  onChange,
  theme = 'light',
}: Props) {
  const isDark = theme === 'dark';
  return (
    <span className="md-editor-toolbar-item inline-flex items-center !w-auto !min-w-0 px-1">
      <label
        className="inline-flex shrink-0 cursor-pointer select-none items-center gap-1.5"
        title={checked ? '자동완성 추천 켜짐' : '자동완성 추천 꺼짐'}
      >
        <span
          className={`text-[10px] font-medium leading-none ${
            isDark ? 'text-odp-muted' : 'text-gray-500'
          }`}
        >
          자동완성
        </span>
        <Switch.Root
          checked={checked}
          onCheckedChange={(next) => onChange?.(Boolean(next))}
          aria-label="자동완성 추천"
          className={[
            'relative h-4 w-7 rounded-full border-0 outline-none transition-colors',
            'focus-visible:ring-2 focus-visible:ring-blue-400',
            checked
              ? 'bg-blue-600 dark:bg-blue-500'
              : isDark
                ? 'bg-odp-borderStrong'
                : 'bg-gray-300',
          ].join(' ')}
        >
          <Switch.Thumb
            className={[
              'block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform',
              'data-[state=checked]:translate-x-3.5',
            ].join(' ')}
          />
        </Switch.Root>
      </label>
    </span>
  );
}

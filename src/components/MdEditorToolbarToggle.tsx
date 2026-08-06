import type { LucideIcon } from 'lucide-react';
import { Switch } from 'radix-ui';

type Props = {
  checked?: boolean;
  onChange?: ((next: boolean) => void) | undefined;
  theme?: string;
  /** Tooltip / aria label (harvested by MdEditorToolbarTooltips). */
  title: string;
  ariaLabel?: string;
  icon: LucideIcon;
};

/**
 * Compact md-editor-rt defToolbar control: icon + Radix Switch.
 * Native `title` is converted to Radix Tooltip by MdEditorToolbarTooltips.
 */
export default function MdEditorToolbarToggle({
  checked = false,
  onChange,
  theme = 'light',
  title,
  ariaLabel,
  icon: Icon,
}: Props) {
  const isDark = theme === 'dark';
  const label = ariaLabel || title;

  return (
    <span
      className="md-editor-toolbar-item inline-flex items-center !w-auto !min-w-0 px-1"
      title={title}
    >
      <label
        className="inline-flex shrink-0 cursor-pointer select-none items-center gap-1"
        onMouseDown={(e) => {
          // Keep focus/selection in the editor panes when toggling.
          e.preventDefault();
        }}
      >
        <Icon
          className={`md-editor-icon shrink-0 ${
            isDark ? 'text-odp-muted' : 'text-gray-500'
          }`}
          size={16}
          aria-hidden
        />
        <Switch.Root
          checked={checked}
          onCheckedChange={(next) => onChange?.(Boolean(next))}
          aria-label={label}
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

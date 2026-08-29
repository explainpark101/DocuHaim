import type { ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useSettingsCollapsible } from '@/components/settings/SettingsCollapsible/context';

type SettingsCollapsibleHeadingProps = {
  children: ReactNode;
  subtitle?: string | undefined;
  className?: string;
  titleClassName?: string;
  titleAs?: 'h3' | 'span';
  chevronSize?: number;
  id?: string;
  controlsId?: string;
  align?: 'center' | 'start';
  /** Render children as-is (no title wrapper). Use for custom title components. */
  unstyled?: boolean;
  /** Optional trailing chrome in the header row (e.g. collapsed hint). */
  trailing?: ReactNode | undefined;
};

const DEFAULT_BUTTON_CLASS =
  'flex w-full items-center gap-2 text-left';
const DEFAULT_TITLE_CLASS =
  'text-sm font-bold text-gray-700 dark:text-odp-fgStrong';

export default function SettingsCollapsibleHeading({
  children,
  subtitle,
  className = DEFAULT_BUTTON_CLASS,
  titleClassName = DEFAULT_TITLE_CLASS,
  titleAs: TitleTag = 'h3',
  chevronSize = 16,
  id,
  controlsId,
  align = 'center',
  unstyled = false,
  trailing = null,
}: SettingsCollapsibleHeadingProps) {
  const { open, toggle } = useSettingsCollapsible();
  const itemsClass = align === 'start' ? 'items-start' : 'items-center';
  const chevronOffset = align === 'start' ? 'mt-0.5' : '';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={open}
      {...(id ? { id } : {})}
      {...(controlsId ? { 'aria-controls': controlsId } : {})}
      className={[className, itemsClass].filter(Boolean).join(' ')}
    >
      {open ? (
        <ChevronDown
          size={chevronSize}
          className={`${chevronOffset} shrink-0 text-gray-500 dark:text-odp-muted`}
        />
      ) : (
        <ChevronRight
          size={chevronSize}
          className={`${chevronOffset} shrink-0 text-gray-500 dark:text-odp-muted`}
        />
      )}
      {subtitle ? (
        <span className="min-w-0">
          {unstyled ? (
            children
          ) : (
            <TitleTag className={`block ${titleClassName}`}>{children}</TitleTag>
          )}
          <span className="mt-0.5 block text-[10px] leading-snug text-gray-500 dark:text-odp-muted">
            {subtitle}
          </span>
        </span>
      ) : unstyled ? (
        children
      ) : (
        <TitleTag className={titleClassName}>{children}</TitleTag>
      )}
      {trailing}
    </button>
  );
}

import type { ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SettingsCollapsibleContent from '@/components/settings/SettingsCollapsibleContent';

type LlamaCppCollapsibleSectionProps = {
  title: string;
  subtitle?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function LlamaCppCollapsibleSection({
  title,
  subtitle,
  open,
  onOpenChange,
  children,
  className = '',
  contentClassName = 'space-y-3 p-3 pt-0',
}: LlamaCppCollapsibleSectionProps) {
  return (
    <div
      className={[
        'rounded-md border border-sky-200/80 bg-white/60 dark:border-sky-900/40 dark:bg-odp-bgSoft/40',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        className="flex w-full items-start gap-2 px-3 py-2.5 text-left transition hover:bg-sky-50/60 dark:hover:bg-sky-950/20"
      >
        {open ? (
          <ChevronDown size={14} className="mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted" />
        ) : (
          <ChevronRight size={14} className="mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted" />
        )}
        <span className="min-w-0">
          <span className="block text-xs font-semibold text-gray-800 dark:text-odp-fgStrong">
            {title}
          </span>
          {subtitle ? (
            <span className="mt-0.5 block text-[10px] leading-snug text-gray-500 dark:text-odp-muted">
              {subtitle}
            </span>
          ) : null}
        </span>
      </button>
      <SettingsCollapsibleContent open={open} contentKey={title}>
        <div className={contentClassName}>{children}</div>
      </SettingsCollapsibleContent>
    </div>
  );
}

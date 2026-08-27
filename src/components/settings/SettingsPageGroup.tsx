import type { ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

type SettingsPageGroupProps = {
  id: string;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

export default function SettingsPageGroup({
  id,
  title,
  open,
  onOpenChange,
  children,
}: SettingsPageGroupProps) {
  return (
    <section
      id={`settings-group-${id}`}
      aria-labelledby={`settings-group-${id}-title`}
      className="scroll-mt-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50/80 dark:border-odp-borderStrong dark:bg-odp-surface/80"
    >
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-controls={`settings-group-${id}-panel`}
        id={`settings-group-${id}-title`}
        className="flex w-full items-center gap-2 px-4 py-3 text-left transition hover:bg-gray-100/80 dark:hover:bg-odp-focusBg/40"
      >
        {open ? (
          <ChevronDown size={16} className="shrink-0 text-gray-500 dark:text-odp-muted" />
        ) : (
          <ChevronRight size={16} className="shrink-0 text-gray-500 dark:text-odp-muted" />
        )}
        <span className="text-sm font-bold text-gray-800 dark:text-odp-fgStrong">{title}</span>
      </button>
      {open ? (
        <div
          id={`settings-group-${id}-panel`}
          className="space-y-4 border-t border-gray-200 px-4 pb-4 pt-3 dark:border-odp-borderStrong"
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}

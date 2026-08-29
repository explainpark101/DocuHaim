import type { ReactNode } from 'react';
import {
  SettingsCollapsibleContainer,
  SettingsCollapsibleContent,
  SettingsCollapsibleHeading,
} from '@/components/settings/SettingsCollapsible';

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
    <SettingsCollapsibleContainer
      contentKey={title}
      open={open}
      onOpenChange={onOpenChange}
      className={[
        'rounded-md border border-sky-200/80 bg-white/60 dark:border-sky-900/40 dark:bg-odp-bgSoft/40',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <SettingsCollapsibleHeading
        subtitle={subtitle}
        align="start"
        chevronSize={14}
        titleAs="span"
        className="flex w-full items-start gap-2 px-3 py-2.5 text-left transition hover:bg-sky-50/60 dark:hover:bg-sky-950/20"
        titleClassName="text-xs font-semibold text-gray-800 dark:text-odp-fgStrong"
      >
        {title}
      </SettingsCollapsibleHeading>
      <SettingsCollapsibleContent>
        <div className={contentClassName}>{children}</div>
      </SettingsCollapsibleContent>
    </SettingsCollapsibleContainer>
  );
}

import type { ReactNode } from 'react';
import {
  SettingsCollapsibleContainer,
  SettingsCollapsibleContent,
  SettingsCollapsibleHeading,
} from '@/components/settings/SettingsCollapsible';

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
  const groupId = `settings-group-${id}`;
  const panelId = `${groupId}-panel`;
  const titleId = `${groupId}-title`;

  return (
    <SettingsCollapsibleContainer
      as="section"
      id={groupId}
      contentKey={groupId}
      open={open}
      onOpenChange={onOpenChange}
      aria-labelledby={titleId}
      className="scroll-mt-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50/80 dark:border-odp-borderStrong dark:bg-odp-surface/80"
    >
      <SettingsCollapsibleHeading
        id={titleId}
        controlsId={panelId}
        titleAs="span"
        className="flex w-full items-center gap-2 px-4 py-3 text-left transition hover:bg-gray-100/80 dark:hover:bg-odp-focusBg/40"
        titleClassName="text-sm font-bold text-gray-800 dark:text-odp-fgStrong"
      >
        {title}
      </SettingsCollapsibleHeading>
      <SettingsCollapsibleContent>
        <div
          id={panelId}
          className="space-y-4 border-t border-gray-200 px-4 pb-4 pt-3 dark:border-odp-borderStrong"
        >
          {children}
        </div>
      </SettingsCollapsibleContent>
    </SettingsCollapsibleContainer>
  );
}

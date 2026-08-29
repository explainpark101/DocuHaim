import { AnimatePresence, motion as Motion } from 'motion/react';
import type { ReactNode } from 'react';
import { SETTINGS_COLLAPSE_TRANSITION } from '@/components/settings/SettingsCollapsible/constants';
import { useSettingsCollapsibleOptional } from '@/components/settings/SettingsCollapsible/context';

type SettingsCollapsibleContentProps = {
  children: ReactNode;
  className?: string;
  open?: boolean;
  contentKey?: string;
};

/**
 * Height + opacity expand/collapse for Settings page disclosure panels.
 * Inherits open/contentKey from SettingsCollapsibleContainer when omitted.
 */
export default function SettingsCollapsibleContent({
  open: openProp,
  contentKey: contentKeyProp,
  children,
  className = '',
}: SettingsCollapsibleContentProps) {
  const ctx = useSettingsCollapsibleOptional();
  const open = openProp ?? ctx?.open ?? false;
  const contentKey = contentKeyProp ?? ctx?.contentKey ?? 'settings-collapse';

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <Motion.div
          key={contentKey}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={SETTINGS_COLLAPSE_TRANSITION}
          className={`overflow-hidden ${className}`}
        >
          {children}
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
}

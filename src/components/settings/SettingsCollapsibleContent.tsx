import { AnimatePresence, motion as Motion } from 'motion/react';
import type { ReactNode } from 'react';

const COLLAPSE_EASE = [0.4, 0, 0.2, 1] as const;

export const SETTINGS_COLLAPSE_TRANSITION = {
  duration: 0.24,
  ease: COLLAPSE_EASE,
} as const;

type SettingsCollapsibleContentProps = {
  open: boolean;
  children: ReactNode;
  className?: string;
  contentKey?: string;
};

/**
 * Height + opacity expand/collapse for Settings page disclosure panels.
 */
export default function SettingsCollapsibleContent({
  open,
  children,
  className = '',
  contentKey = 'settings-collapse',
}: SettingsCollapsibleContentProps) {
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

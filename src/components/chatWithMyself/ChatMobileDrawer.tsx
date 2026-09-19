import { AnimatePresence, motion as Motion } from 'motion/react';
import type { ReactNode } from 'react';

const SPRING = { type: 'spring', stiffness: 380, damping: 36 } as const;

type ChatMobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  /** Width of the sliding panel; capped by the containing chat surface. */
  width?: string;
  zClass?: string;
  label?: string;
  children?: ReactNode;
};

/**
 * Compact-layout drawer (backdrop + slide). Positioned absolute inside the chat
 * surface so split panes do not cover the rest of the workspace.
 */
export default function ChatMobileDrawer({
  open,
  onClose,
  width = 'min(80%, 22rem)',
  zClass = 'z-70',
  label = '패널',
  children,
}: ChatMobileDrawerProps) {
  return (
    <AnimatePresence>
      {open ? (
        <Motion.div
          key={`chat-drawer-${label}`}
          className={`absolute inset-0 ${zClass}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/35"
            aria-label={`${label} 닫기`}
            onClick={onClose}
          />
          <Motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="absolute inset-y-0 right-0 flex max-w-full flex-col overflow-hidden border-l border-gray-200 bg-white shadow-xl dark:border-odp-borderSoft dark:bg-odp-bgSoft"
            style={{ width }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={SPRING}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
}

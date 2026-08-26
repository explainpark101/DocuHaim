import { AnimatePresence, motion as Motion } from 'motion/react';
import type { ReactNode } from 'react';

const COLLAPSE_EASE = [0.4, 0, 0.2, 1] as const;

type LlmAssistCollapsibleProps = {
  open: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Height + opacity expand/collapse for LLM Assist disclosure sections.
 */
export default function LlmAssistCollapsible({
  open,
  children,
  className = '',
}: LlmAssistCollapsibleProps) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <Motion.div
          key="llm-assist-collapse"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.24, ease: COLLAPSE_EASE }}
          className={`overflow-hidden ${className}`}
        >
          {children}
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
}

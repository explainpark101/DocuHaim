import { motion as Motion } from 'motion/react';

const ENTER: any = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1],
};

const STAGGER = 0.045;
const STAGGER_CAP = 0.54;

/**
 * Sequential rise + fade-in for search / collection result rows.
 * @param {{ index: number, children: import('react').ReactNode, className?: string }} props
 */
export default function ChatResultEnter({
  index = 0,
  children,
  className = ''
}: any) {
  const delay = Math.min(Math.max(0, index) * STAGGER, STAGGER_CAP);
  return (
    <Motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...ENTER, delay }}
    >
      {children}
    </Motion.div>
  );
}

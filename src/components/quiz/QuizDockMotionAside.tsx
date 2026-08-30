import { AnimatePresence, motion as Motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useQuizDockUsesLayoutWidthAnim } from '@/hooks/useQuizDockUsesLayoutWidthAnim';
import {
  getQuizDockAsideMotionProps,
  type QuizDockSlideEdge,
} from '@/utils/quiz/quizDockMotion';

export type QuizDockMotionAsideProps = {
  motionKey: string;
  open: boolean;
  width: number;
  isResizing?: boolean;
  edge?: QuizDockSlideEdge;
  className?: string;
  'aria-label': string;
  children: ReactNode;
};

/**
 * Side dock shell with settings-translated motion (optional width spring vs translateX slide).
 */
export default function QuizDockMotionAside({
  motionKey,
  open,
  width,
  isResizing = false,
  edge = 'right',
  className,
  'aria-label': ariaLabel,
  children,
}: QuizDockMotionAsideProps) {
  const useLayoutWidthAnim = useQuizDockUsesLayoutWidthAnim();
  const motionProps = getQuizDockAsideMotionProps(width, {
    isResizing,
    edge,
    useLayoutWidthAnim,
  });

  return (
    <AnimatePresence initial={false}>
      {open ? (
        useLayoutWidthAnim ? (
          <Motion.aside
            key={motionKey}
            role="complementary"
            aria-label={ariaLabel}
            className={className}
            initial={motionProps.initial}
            animate={motionProps.animate}
            exit={motionProps.exit}
            transition={motionProps.transition}
          >
            {children}
          </Motion.aside>
        ) : (
          <Motion.aside
            key={motionKey}
            role="complementary"
            aria-label={ariaLabel}
            className={className}
            style={{
              width,
              flexShrink: 0,
              overflow: 'hidden',
              willChange: 'transform',
            }}
            initial={motionProps.initial}
            animate={motionProps.animate}
            exit={motionProps.exit}
            transition={motionProps.transition}
          >
            {children}
          </Motion.aside>
        )
      ) : null}
    </AnimatePresence>
  );
}

import { AnimatePresence, motion as Motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useQuizDockUsesLayoutWidthAnim } from '@/hooks/useQuizDockUsesLayoutWidthAnim';
import { useQuizLayoutAnimReady } from '@/hooks/useQuizLayoutAnimReady';
import {
  getQuizDockAsideMotionProps,
  getQuizDockLayoutOriginX,
  getQuizDockTransformOrigin,
  QUIZ_DOCK_RESIZE_TRANSITION,
  QUIZ_LAYOUT_TRANSITION,
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
 * Side dock shell: layout width spring (pane siblings animate via layout) or translateX slide.
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
  const layoutAnimReady = useQuizLayoutAnimReady();
  const layoutTransition = isResizing
    ? QUIZ_DOCK_RESIZE_TRANSITION
    : QUIZ_LAYOUT_TRANSITION;
  const transformOrigin = getQuizDockTransformOrigin(edge);
  const layoutOriginX = getQuizDockLayoutOriginX(edge);

  if (useLayoutWidthAnim) {
    return (
      <Motion.aside
        layout={layoutAnimReady ? 'size' : false}
        role="complementary"
        aria-label={ariaLabel}
        aria-hidden={!open}
        className={`min-w-0 shrink-0 overflow-hidden ${!open ? 'pointer-events-none' : ''} ${className ?? ''}`}
        initial={false}
        animate={{
          width: open ? width : 0,
          opacity: open ? 1 : 0,
        }}
        transition={layoutTransition}
        style={{
          originX: layoutOriginX,
          transformOrigin,
        }}
      >
        <div className="h-full min-h-0" style={{ width }}>
          {children}
        </div>
      </Motion.aside>
    );
  }

  const motionProps = getQuizDockAsideMotionProps(width, {
    isResizing,
    edge,
    useLayoutWidthAnim: false,
  });

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <Motion.aside
          key={motionKey}
          role="complementary"
          aria-label={ariaLabel}
          className={className ?? ''}
          style={{
            width,
            flexShrink: 0,
            overflow: 'hidden',
            willChange: 'transform',
            originX: layoutOriginX,
            transformOrigin,
          }}
          initial={motionProps.initial}
          animate={motionProps.animate}
          exit={motionProps.exit}
          transition={motionProps.transition}
        >
          <div className="h-full min-h-0" style={{ width }}>
            {children}
          </div>
        </Motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

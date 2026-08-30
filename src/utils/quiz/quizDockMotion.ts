import type { CSSProperties } from 'react';
import type { Transition, TargetAndTransition } from 'motion/react';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import { quizDockUsesLayoutWidthAnim } from '@/utils/quiz/quizSettingsStore';

const SLIDE_EASE_OUT: [number, number, number, number] = [0.32, 0.72, 0, 1];

export const QUIZ_DOCK_RESIZE_TRANSITION: Transition = { duration: 0 };

/** Shared spring for quiz pane layout + dock width (settings: dockWidthSpringAnim). */
export const QUIZ_LAYOUT_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 36,
};

function dockOpenTransition(useLayoutWidthAnim: boolean): Transition {
  return useLayoutWidthAnim
    ? QUIZ_LAYOUT_TRANSITION
    : { type: 'tween', duration: 0.22, ease: SLIDE_EASE_OUT };
}

/** Floating panels — transform (y/scale/opacity); tween on Tauri, spring on web. */
export const QUIZ_FLOATING_PANEL_TRANSITION: Transition = isTauriDesktopPlatform()
  ? { type: 'tween', duration: 0.2, ease: SLIDE_EASE_OUT }
  : { type: 'spring', stiffness: 420, damping: 34 };

export type QuizDockSlideEdge = 'left' | 'right';

/** Transform origin for dock width/layout motion (right docks grow from the screen edge). */
export function getQuizDockTransformOrigin(edge: QuizDockSlideEdge): string {
  return edge === 'right' ? 'right center' : 'left center';
}

/** Motion layout originX (0 = left, 1 = right) for size/layout animations. */
export function getQuizDockLayoutOriginX(edge: QuizDockSlideEdge): number {
  return edge === 'right' ? 1 : 0;
}

export type QuizDockAsideMotionProps = {
  style: CSSProperties | undefined;
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
  transition: Transition;
};

/**
 * Maps dock open/close motion: layout width spring (default) vs translateX slide.
 */
export function getQuizDockAsideMotionProps(
  width: number,
  options: {
    isResizing?: boolean;
    edge?: QuizDockSlideEdge;
    useLayoutWidthAnim?: boolean;
  } = {},
): QuizDockAsideMotionProps {
  const { isResizing = false, edge = 'right' } = options;
  const useLayoutWidthAnim =
    options.useLayoutWidthAnim ?? quizDockUsesLayoutWidthAnim();
  const transition: Transition = isResizing
    ? QUIZ_DOCK_RESIZE_TRANSITION
    : dockOpenTransition(useLayoutWidthAnim);

  if (useLayoutWidthAnim) {
    return {
      style: undefined,
      initial: { width: 0, opacity: 0.85 },
      animate: { width, opacity: 1 },
      exit: { width: 0, opacity: 0.85 },
      transition,
    };
  }

  const offscreenX = edge === 'right' ? '100%' : '-100%';
  return {
    style: { width, flexShrink: 0, overflow: 'hidden', willChange: 'transform' },
    initial: { x: offscreenX, opacity: 0.92 },
    animate: { x: 0, opacity: 1 },
    exit: { x: offscreenX, opacity: 0.92 },
    transition,
  };
}

export type QuizFloatingPanelMotionProps = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
  transition: Transition;
};

/** Bottom-right queue panel — y/scale/opacity only (compositor-friendly). */
export function getQuizFloatingPanelMotionProps(): QuizFloatingPanelMotionProps {
  return {
    initial: { y: 48, opacity: 0, scale: 0.98 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: { y: 48, opacity: 0, scale: 0.98 },
    transition: QUIZ_FLOATING_PANEL_TRANSITION,
  };
}

export type QuizTocItemMotionProps = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
};

/** TOC row enter — opacity-only when width spring off; opacity+x when on. */
export function getQuizTocItemMotionProps(
  index: number,
  useLayoutWidthAnim?: boolean,
): QuizTocItemMotionProps {
  const richMotion = useLayoutWidthAnim ?? quizDockUsesLayoutWidthAnim();
  if (!richMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.14, delay: Math.min(index, 8) * 0.02 },
    };
  }
  return {
    initial: { opacity: 0, x: 12 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: Math.min(index, 12) * 0.03, duration: 0.18 },
  };
}

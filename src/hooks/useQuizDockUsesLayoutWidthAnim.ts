import { useEffect, useState } from 'react';
import {
  QUIZ_SETTINGS_CHANGED_EVENT,
  quizDockUsesLayoutWidthAnim,
} from '@/utils/quiz/quizSettingsStore';

/** Subscribes to quiz dock width-spring setting (false = cheap translateX slide). */
export function useQuizDockUsesLayoutWidthAnim(): boolean {
  const [enabled, setEnabled] = useState(() => quizDockUsesLayoutWidthAnim());

  useEffect(() => {
    const sync = () => setEnabled(quizDockUsesLayoutWidthAnim());
    window.addEventListener(QUIZ_SETTINGS_CHANGED_EVENT, sync);
    return () => window.removeEventListener(QUIZ_SETTINGS_CHANGED_EVENT, sync);
  }, []);

  return enabled;
}

import { useCallback, useEffect, useRef, useState } from 'react';

const COMMIT_DEBOUNCE_MS = 400;

/**
 * Keeps subjective answer typing local so QuizPane does not re-render on every keystroke.
 * Commits to parent on blur, debounce, or explicit flush (e.g. before grading).
 */
export function useQuizSubjectiveAnswerDraft(
  questionId: string,
  committedValue: string,
  onCommit: (questionId: string, value: string) => void,
) {
  const [draft, setDraft] = useState(committedValue);
  const committedRef = useRef(committedValue);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (committedValue !== committedRef.current) {
      committedRef.current = committedValue;
      setDraft(committedValue);
    }
  }, [committedValue]);

  const flush = useCallback(() => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (draft === committedRef.current) return;
    committedRef.current = draft;
    onCommit(questionId, draft);
  }, [draft, onCommit, questionId]);

  const handleChange = useCallback(
    (value: string) => {
      setDraft(value);
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        if (value === committedRef.current) return;
        committedRef.current = value;
        onCommit(questionId, value);
      }, COMMIT_DEBOUNCE_MS);
    },
    [onCommit, questionId],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { draft, handleChange, flush };
}

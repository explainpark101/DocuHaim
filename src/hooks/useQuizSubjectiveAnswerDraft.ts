import { useCallback, useEffect, useRef, useState } from 'react';

const COMMIT_DEBOUNCE_MS = 400;

/**
 * Keeps subjective answer typing local so QuizPane does not re-render on every keystroke.
 * Commits to parent on blur, debounce, or unmount flush (virtualized cards unmount off-screen).
 */
export function useQuizSubjectiveAnswerDraft(
  questionId: string,
  committedValue: string,
  onCommit: (questionId: string, value: string) => void,
) {
  const [draft, setDraft] = useState(committedValue);
  const committedRef = useRef(committedValue);
  const draftRef = useRef(committedValue);
  const questionIdRef = useRef(questionId);
  const onCommitRef = useRef(onCommit);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  questionIdRef.current = questionId;
  onCommitRef.current = onCommit;
  draftRef.current = draft;

  useEffect(() => {
    if (committedValue !== committedRef.current) {
      committedRef.current = committedValue;
      draftRef.current = committedValue;
      setDraft(committedValue);
    }
  }, [committedValue]);

  const flush = useCallback(() => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const next = draftRef.current;
    if (next === committedRef.current) return;
    committedRef.current = next;
    onCommitRef.current(questionIdRef.current, next);
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      draftRef.current = value;
      setDraft(value);
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        if (value === committedRef.current) return;
        committedRef.current = value;
        onCommitRef.current(questionIdRef.current, value);
      }, COMMIT_DEBOUNCE_MS);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      const next = draftRef.current;
      if (next === committedRef.current) return;
      committedRef.current = next;
      onCommitRef.current(questionIdRef.current, next);
    };
  }, []);

  return { draft, handleChange, flush };
}

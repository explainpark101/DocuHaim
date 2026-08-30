import { useCallback, useEffect, useRef, type RefObject } from 'react';
import {
  appendQuizQuestionTimeEntry,
  QUIZ_QUESTION_TIME_MIN_MS,
  type QuizQuestionTimeEntry,
  type QuizTimeLog,
} from '@/utils/quiz/quizTimeLog';

const QUESTION_TRACK_ATTR = 'data-quiz-q-track';
const VISIBILITY_THRESHOLD = 0.12;

export type QuizQuestionTimeTrackItem = {
  id: string;
  displayLabel: string;
};

export type UseQuizQuestionTimeLogOptions = {
  scrollRootRef: RefObject<HTMLElement | null>;
  questions: QuizQuestionTimeTrackItem[];
  running: boolean;
  getElapsedMs: () => number;
  timeLog: QuizTimeLog;
  onLogChange: (log: QuizTimeLog) => void;
};

type OpenSegment = {
  questionId: string;
  displayLabel: string;
  at: string;
  elapsedMs: number;
};

export function useQuizQuestionTimeLog({
  scrollRootRef,
  questions,
  running,
  getElapsedMs,
  timeLog,
  onLogChange,
}: UseQuizQuestionTimeLogOptions): void {
  const timeLogRef = useRef(timeLog);
  const onLogChangeRef = useRef(onLogChange);
  const getElapsedMsRef = useRef(getElapsedMs);
  const questionsRef = useRef(questions);
  const openSegmentRef = useRef<OpenSegment | null>(null);
  const activeQuestionRef = useRef<string | null>(null);
  const visibilityRef = useRef(new Map<string, number>());

  timeLogRef.current = timeLog;
  onLogChangeRef.current = onLogChange;
  getElapsedMsRef.current = getElapsedMs;
  questionsRef.current = questions;

  const flushOpenSegment = useCallback((endedAt?: string) => {
    const seg = openSegmentRef.current;
    if (!seg) return;
    openSegmentRef.current = null;
    activeQuestionRef.current = null;

    const endElapsed = getElapsedMsRef.current();
    const durationMs = Math.max(0, endElapsed - seg.elapsedMs);
    if (durationMs < QUIZ_QUESTION_TIME_MIN_MS) return;

    const entry: QuizQuestionTimeEntry = {
      questionId: seg.questionId,
      displayLabel: seg.displayLabel,
      at: seg.at,
      endedAt: endedAt ?? new Date().toISOString(),
      durationMs,
    };
    const next = appendQuizQuestionTimeEntry(timeLogRef.current, entry);
    onLogChangeRef.current(next);
  }, []);

  const startSegment = useCallback((questionId: string, displayLabel: string) => {
    if (openSegmentRef.current?.questionId === questionId) return;
    openSegmentRef.current = {
      questionId,
      displayLabel,
      at: new Date().toISOString(),
      elapsedMs: getElapsedMsRef.current(),
    };
    activeQuestionRef.current = questionId;
  }, []);

  const pickMostVisibleQuestion = useCallback((): string | null => {
    let bestId: string | null = null;
    let bestRatio = 0;
    for (const [id, ratio] of visibilityRef.current) {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = id;
      }
    }
    return bestRatio >= VISIBILITY_THRESHOLD ? bestId : null;
  }, []);

  const applyActiveQuestion = useCallback(
    (nextId: string | null) => {
      if (!running) return;
      if (nextId === activeQuestionRef.current) return;
      flushOpenSegment();
      if (!nextId) {
        activeQuestionRef.current = null;
        return;
      }
      const q = questionsRef.current.find((item) => item.id === nextId);
      if (!q) return;
      startSegment(q.id, q.displayLabel);
    },
    [flushOpenSegment, running, startSegment],
  );

  useEffect(() => {
    if (!running) {
      flushOpenSegment();
      visibilityRef.current.clear();
      return;
    }
    applyActiveQuestion(pickMostVisibleQuestion());
  }, [running, flushOpenSegment, applyActiveQuestion, pickMostVisibleQuestion]);

  const questionIdsKey = questions.map((q) => q.id).join('\0');

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root || !running) return;

    const questionIds = new Set(questionsRef.current.map((q) => q.id));
    visibilityRef.current = new Map(
      [...visibilityRef.current.entries()].filter(([id]) => questionIds.has(id)),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute(QUESTION_TRACK_ATTR);
          if (!id) continue;
          visibilityRef.current.set(id, entry.intersectionRatio);
        }
        applyActiveQuestion(pickMostVisibleQuestion());
      },
      {
        root,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    const nodes = root.querySelectorAll(`[${QUESTION_TRACK_ATTR}]`);
    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
    };
  }, [
    scrollRootRef,
    questionIdsKey,
    running,
    applyActiveQuestion,
    pickMostVisibleQuestion,
  ]);
}

export const QUIZ_QUESTION_TRACK_ATTR = QUESTION_TRACK_ATTR;

import { useCallback, useRef, useState } from 'react';
import {
  buildSimilarJobSteps,
  buildSourceJobSteps,
  truncateQuizPreview,
  type QuizGenJob,
  type QuizGenStepUpdate,
} from '@/utils/quiz/quizGenerationQueueTypes';

const SIZE_STORAGE_KEY = 's3haim_quiz_gen_queue_panel_size';

const MIN_PANEL_W = 280;
const MIN_PANEL_H = 180;
const DEFAULT_PANEL_W = 380;
const DEFAULT_PANEL_H = 320;

export type QuizGenPanelSize = { width: number; height: number };

function clampPanelSize(size: QuizGenPanelSize): QuizGenPanelSize {
  const maxW = Math.min(window.innerWidth * 0.92, 720);
  const maxH = Math.min(window.innerHeight * 0.72, 640);
  return {
    width: Math.min(maxW, Math.max(MIN_PANEL_W, Math.round(size.width))),
    height: Math.min(maxH, Math.max(MIN_PANEL_H, Math.round(size.height))),
  };
}

function loadPanelSize(): QuizGenPanelSize {
  try {
    const raw =
      typeof window !== 'undefined'
        ? window.localStorage.getItem(SIZE_STORAGE_KEY)
        : null;
    if (!raw) return { width: DEFAULT_PANEL_W, height: DEFAULT_PANEL_H };
    const parsed = JSON.parse(raw) as Partial<QuizGenPanelSize>;
    return clampPanelSize({
      width: Number(parsed.width) || DEFAULT_PANEL_W,
      height: Number(parsed.height) || DEFAULT_PANEL_H,
    });
  } catch {
    return { width: DEFAULT_PANEL_W, height: DEFAULT_PANEL_H };
  }
}

function savePanelSize(size: QuizGenPanelSize) {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SIZE_STORAGE_KEY, JSON.stringify(size));
    }
  } catch {
    // ignore
  }
}

function patchJobStep(job: QuizGenJob, update: QuizGenStepUpdate): QuizGenJob {
  const steps = job.steps.map((s) => {
    if (s.id !== update.step) return s;
    const next = { ...s, status: update.status };
    if (update.detail !== undefined) next.detail = update.detail;
    if (update.error !== undefined) next.error = update.error;
    if (update.llmInstruction !== undefined) next.llmInstruction = update.llmInstruction;
    if (update.llmResponse !== undefined) next.llmResponse = update.llmResponse;
    if (update.systemPrompt !== undefined) next.systemPrompt = update.systemPrompt;
    if (update.status === 'running') {
      delete next.error;
    }
    return next;
  });
  return { ...job, steps };
}

function newJobId(): string {
  return `quiz-gen-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useQuizGenerationQueue() {
  const [jobs, setJobs] = useState<QuizGenJob[]>([]);
  const jobsRef = useRef(jobs);
  jobsRef.current = jobs;

  const [panelOpen, setPanelOpen] = useState(false);
  const [panelSize, setPanelSizeState] = useState<QuizGenPanelSize>(() => loadPanelSize());

  const setPanelSize = useCallback((next: QuizGenPanelSize) => {
    const clamped = clampPanelSize(next);
    setPanelSizeState(clamped);
    savePanelSize(clamped);
  }, []);

  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);

  const getJob = useCallback((jobId: string) => {
    return jobsRef.current.find((j) => j.id === jobId) ?? null;
  }, []);

  const createSimilarJob = useCallback(
    (params: { displayLabel: string; preview: string; hasRag: boolean }) => {
      const id = newJobId();
      const job: QuizGenJob = {
        id,
        kind: 'similar',
        questionLabel: params.displayLabel,
        questionPreview: truncateQuizPreview(params.preview),
        status: 'running',
        steps: buildSimilarJobSteps(params.hasRag),
        createdAt: Date.now(),
      };
      setJobs((prev) => [job, ...prev]);
      setPanelOpen(true);
      return id;
    },
    [],
  );

  const createSourceJob = useCallback((params: { preview: string; topic?: string }) => {
    const id = newJobId();
    const preview =
      params.topic?.trim() ||
      truncateQuizPreview(params.preview) ||
      '근거 기반 출제';
    const job: QuizGenJob = {
      id,
      kind: 'source',
      questionPreview: truncateQuizPreview(preview),
      status: 'running',
      steps: buildSourceJobSteps(),
      createdAt: Date.now(),
    };
    setJobs((prev) => [job, ...prev]);
    setPanelOpen(true);
    return id;
  }, []);

  const updateJobStep = useCallback((jobId: string, update: QuizGenStepUpdate) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === jobId ? patchJobStep(job, update) : job)),
    );
  }, []);

  const setJobLogPath = useCallback((jobId: string, logPath: string) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, logPath } : job)),
    );
  }, []);

  const setJobResultQuestionId = useCallback((jobId: string, questionId: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, resultQuestionId: questionId } : job,
      ),
    );
  }, []);

  const completeJob = useCallback((jobId: string, resultLabel?: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: 'done',
              ...(resultLabel ? { resultLabel } : {}),
            }
          : job,
      ),
    );
  }, []);

  const failJob = useCallback((jobId: string, error: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: 'error', error } : job,
      ),
    );
  }, []);

  const removeJob = useCallback((jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  }, []);

  const clearFinishedJobs = useCallback(() => {
    setJobs((prev) => prev.filter((j) => j.status === 'running'));
  }, []);

  const hasActiveJobs = jobs.some((j) => j.status === 'running');

  return {
    jobs,
    panelOpen,
    panelSize,
    setPanelSize,
    openPanel,
    closePanel,
    setPanelOpen,
    getJob,
    createSimilarJob,
    createSourceJob,
    updateJobStep,
    setJobLogPath,
    setJobResultQuestionId,
    completeJob,
    failJob,
    removeJob,
    clearFinishedJobs,
    hasActiveJobs,
  };
}

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  buildDerivedJobSteps,
  buildSimilarJobSteps,
  buildSourceJobSteps,
  patchQuizGenJobStep,
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
  return patchQuizGenJobStep(job, update);
}

function newJobId(): string {
  return `quiz-gen-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useQuizGenerationQueue() {
  const [jobs, setJobs] = useState<QuizGenJob[]>([]);
  const jobsRef = useRef<QuizGenJob[]>(jobs);

  const applyJobs = useCallback((updater: (prev: QuizGenJob[]) => QuizGenJob[]) => {
    const next = updater(jobsRef.current);
    jobsRef.current = next;
    setJobs(next);
    return next;
  }, []);

  const [panelOpen, setPanelOpen] = useState(false);
  const [panelSize, setPanelSizeState] = useState<QuizGenPanelSize>(() => loadPanelSize());
  const panelUserOpenedRef = useRef(false);
  const panelPointerEngagedRef = useRef(false);
  const panelFocusEngagedRef = useRef(false);
  const prevRunningCountRef = useRef(0);

  const setPanelSize = useCallback((next: QuizGenPanelSize) => {
    const clamped = clampPanelSize(next);
    setPanelSizeState(clamped);
    savePanelSize(clamped);
  }, []);

  const markPanelUserEngaged = useCallback(() => {
    panelUserOpenedRef.current = true;
  }, []);

  const markPanelPointerEngaged = useCallback((engaged: boolean) => {
    panelPointerEngagedRef.current = engaged;
  }, []);

  const markPanelFocusEngaged = useCallback((engaged: boolean) => {
    panelFocusEngagedRef.current = engaged;
  }, []);

  const isPanelEngaged = useCallback(() => {
    return panelPointerEngagedRef.current || panelFocusEngagedRef.current;
  }, []);

  const openPanel = useCallback(() => {
    panelUserOpenedRef.current = true;
    setPanelOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    panelUserOpenedRef.current = false;
    panelPointerEngagedRef.current = false;
    panelFocusEngagedRef.current = false;
    setPanelOpen(false);
  }, []);

  const openPanelForJob = useCallback(() => {
    setPanelOpen(true);
  }, []);

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
      applyJobs((prev) => [job, ...prev]);
      openPanelForJob();
      return id;
    },
    [applyJobs, openPanelForJob],
  );

  const createDerivedJob = useCallback(
    (params: { displayLabel: string; preview: string; hasRag: boolean }) => {
      const id = newJobId();
      const job: QuizGenJob = {
        id,
        kind: 'derived',
        questionLabel: params.displayLabel,
        questionPreview: truncateQuizPreview(params.preview),
        status: 'running',
        steps: buildDerivedJobSteps(params.hasRag),
        createdAt: Date.now(),
      };
      applyJobs((prev) => [job, ...prev]);
      openPanelForJob();
      return id;
    },
    [applyJobs, openPanelForJob],
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
    applyJobs((prev) => [job, ...prev]);
    openPanelForJob();
    return id;
  }, [applyJobs, openPanelForJob]);

  const updateJobStep = useCallback((jobId: string, update: QuizGenStepUpdate): QuizGenJob | null => {
    let patched: QuizGenJob | null = null;
    applyJobs((prev) =>
      prev.map((job) => {
        if (job.id !== jobId) return job;
        patched = patchJobStep(job, update);
        return patched;
      }),
    );
    return patched;
  }, [applyJobs]);

  const setJobLogPath = useCallback((jobId: string, logPath: string) => {
    applyJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, logPath } : job)),
    );
  }, [applyJobs]);

  const setJobResultQuestionId = useCallback((jobId: string, questionId: string) => {
    applyJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, resultQuestionId: questionId } : job,
      ),
    );
  }, [applyJobs]);

  const completeJob = useCallback((jobId: string, resultLabel?: string) => {
    applyJobs((prev) =>
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
  }, [applyJobs]);

  const failJob = useCallback((jobId: string, error: string) => {
    applyJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: 'error', error } : job,
      ),
    );
  }, [applyJobs]);

  const removeJob = useCallback((jobId: string) => {
    applyJobs((prev) => prev.filter((j) => j.id !== jobId));
  }, [applyJobs]);

  const clearFinishedJobs = useCallback(() => {
    applyJobs((prev) => prev.filter((j) => j.status === 'running'));
  }, [applyJobs]);

  const hasActiveJobs = jobs.some((j) => j.status === 'running');

  useEffect(() => {
    const runningCount = jobs.filter((j) => j.status === 'running').length;
    const hadRunning = prevRunningCountRef.current > 0;
    prevRunningCountRef.current = runningCount;

    if (!panelOpen || !hadRunning || runningCount > 0) return undefined;
    if (panelUserOpenedRef.current || isPanelEngaged()) return undefined;

    const frameId = window.requestAnimationFrame(() => {
      if (panelUserOpenedRef.current || isPanelEngaged()) return;
      closePanel();
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [closePanel, isPanelEngaged, jobs, panelOpen]);

  return {
    jobs,
    panelOpen,
    panelSize,
    setPanelSize,
    openPanel,
    closePanel,
    setPanelOpen,
    markPanelUserEngaged,
    markPanelPointerEngaged,
    markPanelFocusEngaged,
    getJob,
    createSimilarJob,
    createDerivedJob,
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

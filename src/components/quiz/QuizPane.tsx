import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import {
  BookOpen,
  CheckCheck,
  ChevronDown,
  ClipboardList,
  FilePlus2,
  Library,
  List,
  PenLine,
  Plus,
  RotateCcw,
  Sparkles,
  Wand2,
  X,
} from 'lucide-react';
import { DropdownMenu } from 'radix-ui';
import Button from '@/components/Button';
import QuizMdPreview from '@/components/quiz/QuizMdPreview';
import QuizAddQuestionModal from '@/components/quiz/QuizAddQuestionModal';
import QuizBulkImportModal from '@/components/quiz/QuizBulkImportModal';
import QuizSourcePickerModal from '@/components/quiz/QuizSourcePickerModal';
import QuizSourcePathsChips from '@/components/quiz/QuizSourcePathsChips';
import QuizGenerationQueuePanel from '@/components/quiz/QuizGenerationQueuePanel';
import QuizStopwatchToolbar from '@/components/quiz/QuizStopwatchToolbar';
import QuizTimeLogPanel from '@/components/quiz/QuizTimeLogPanel';
import {
  isQuizSessionEmpty,
  nextDisplayLabel,
  normalizeQuizPersistedSession,
  parseQuizDocument,
  resolveEffectiveSourcePaths,
  serializeQuizDocument,
  getQuizQuestionStyleTemplate,
  resolveQuestionChoiceCount,
  resizeChoiceOptions,
  syncQuizFileChoiceCount,
} from '@/utils/quiz';
import { computeQuizScoreBoard } from '@/utils/quiz/quizScoring';
import {
  checkQuizLlmReady,
  generateQuestionsFromSources,
  generateFixedQuizQuestion,
  generateSimilarChoiceQuestion,
  generateWrongChoiceExplanation,
  gradeSubjectiveAnswer,
  isQuizLlmSetupIssue,
} from '@/utils/quiz/quizLlmService';
import type {
  QuizAddQuestionForm,
  QuizDocument,
  QuizPersistedSession,
  QuizQuestion,
  SubjectiveGradeResult,
} from '@/utils/quiz/quizTypes';
import { formToQuizQuestion } from '@/utils/quiz/buildQuestionMarkdown';
import type { LlmProviderProfile } from '@/utils/llm/llmProviderProfiles';
import type { QuizVaultTextReader } from '@/utils/quiz/quizVaultSourceLoader';
import { writeQuizGenerationLog } from '@/utils/quiz/quizGenerationLog';
import type { QuizGenStepUpdate } from '@/utils/quiz/quizGenerationQueueTypes';
import { useToast } from '@/contexts/ToastContext';
import { useAlertModal } from '@/contexts/AlertModalContext';
import { useLlmAssistSessionOptional } from '@/contexts/LlmAssistSessionContext';
import { useVault } from '@/App/hooks/useVault';
import { useChromeOwned } from '@/App/providers/AppChromeStateProvider';
import { useQuizGenerationQueue } from '@/hooks/useQuizGenerationQueue';
import { useQuizStopwatch } from '@/hooks/useQuizStopwatch';
import {
  QUIZ_QUESTION_TRACK_ATTR,
  useQuizQuestionTimeLog,
} from '@/hooks/useQuizQuestionTimeLog';
import { findFileNodeByPath, findNodeByPath } from '@/utils/s3Tree';
import { resolveQuizSourceMdPaths } from '@/utils/quiz/quizTreeSourceDrop';
import type { TreeAttachSourceItem } from '@/utils/chatWithMyself/treeAttachDrop';
import { STORAGE_MODE_LOCAL, STORAGE_MODE_WEBDAV } from '@/utils/storageSettings';
import {
  createEmptyQuizTimeLog,
  isQuizTimeLogEmpty,
  normalizeQuizTimeLog,
  type QuizTimeLog,
} from '@/utils/quiz/quizTimeLog';

const SOURCES_DOCK_WIDTH = 320;
const QUIZ_AUTOSAVE_DEBOUNCE_MS = 20_000;

type TreeNode = {
  name: string;
  type: string;
  path: string;
  children?: TreeNode[];
};

const QUIZ_ADD_MENU_CONTENT_CLASS =
  'z-100010 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft';

const QUIZ_ADD_MENU_ITEM_CLASS =
  'flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-gray-800 outline-none hover:bg-gray-100 focus:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg dark:focus:bg-odp-focusBg';

export type QuizPaneProps = {
  content: string;
  onChange: (markdown: string) => void;
  currentFile?: { id?: string; name?: string; type?: string } | null;
  llmProviderProfiles?: LlmProviderProfile[];
  isActiveFile?: boolean;
  registerToolbar?: (node: ReactNode | null) => void;
};

type FilterMode = 'all' | 'wrong' | 'unanswered';

export default function QuizPane({
  content,
  onChange,
  currentFile,
  llmProviderProfiles = [],
  isActiveFile = true,
  registerToolbar,
}: QuizPaneProps) {
  const { showToast } = useToast();
  const { showAlert } = useAlertModal();
  const llmAssist = useLlmAssistSessionOptional();
  const genQueue = useQuizGenerationQueue();
  const {
    storageMode,
    s3Tree,
    localTree,
    webdavTree,
    getBackendForType,
    loadLocalFolderChildren,
    loadWebdavFolderChildren,
  } = useVault();

  const openLlmAssistForSetup = useCallback(
    (message: string) => {
      llmAssist?.openAssist();
      showToast({
        message:
          message ||
          'AI 도우미에서 모델을 로드·선택한 뒤 다시 시도하세요.',
        durationMs: 3500,
      });
    },
    [llmAssist, showToast],
  );

  const ensureQuizLlmReady = useCallback(async (): Promise<boolean> => {
    const result = await checkQuizLlmReady(llmProviderProfiles);
    if (result.ready) return true;
    openLlmAssistForSetup(result.message);
    return false;
  }, [llmProviderProfiles, openLlmAssistForSetup]);

  const reportQuizError = useCallback(
    (title: string, err: unknown, fallback: string) => {
      const message =
        (err instanceof Error ? err.message : '') || fallback;
      if (isQuizLlmSetupIssue(message)) {
        openLlmAssistForSetup(message);
        return;
      }
      // Long / multi-line errors (LLM, API) → Alert Modal; short tips stay toast.
      if (message.length >= 48 || message.includes('\n')) {
        showAlert({ title, message });
        return;
      }
      showToast({ message, durationMs: 4000 });
    },
    [openLlmAssistForSetup, showAlert, showToast],
  );

  const vaultTree = useMemo(() => {
    if (storageMode === STORAGE_MODE_LOCAL) return localTree;
    if (storageMode === STORAGE_MODE_WEBDAV) return webdavTree;
    return s3Tree;
  }, [storageMode, localTree, webdavTree, s3Tree]);

  const storageType =
    storageMode === STORAGE_MODE_LOCAL
      ? 'local'
      : storageMode === STORAGE_MODE_WEBDAV
        ? 'webdav'
        : 's3';

  const readText: QuizVaultTextReader = useCallback(
    async (path: string) => {
      const backend = getBackendForType(storageType);
      if (!backend?.readText) return null;
      const { text } = await backend.readText(path);
      return typeof text === 'string' ? text : null;
    },
    [getBackendForType, storageType],
  );

  const persistGenerationLog = useCallback(
    async (jobId: string, logKey: string) => {
      const quizPath = currentFile?.id;
      if (!quizPath) return;
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 0);
      });
      const job = genQueue.getJob(jobId);
      if (!job) return;
      const backend = getBackendForType(storageType);
      if (!backend?.writeText) return;
      try {
        const path = await writeQuizGenerationLog({
          quizFilePath: quizPath,
          logKey,
          job,
          writeText: (p, t) =>
            backend.writeText(p, t, 'text/markdown; charset=utf-8'),
        });
        genQueue.setJobLogPath(jobId, path);
      } catch {
        // Log persistence is best-effort.
      }
    },
    [currentFile?.id, genQueue, getBackendForType, storageType],
  );

  const handleGenerationStep = useCallback(
    (jobId: string, logKey: string, update: QuizGenStepUpdate) => {
      genQueue.updateJobStep(jobId, update);
      void persistGenerationLog(jobId, logKey);
    },
    [genQueue, persistGenerationLog],
  );

  const onExpandFolder = useCallback(
    async (node: TreeNode) => {
      if (storageMode === STORAGE_MODE_LOCAL) {
        await loadLocalFolderChildren?.(node);
      } else if (storageMode === STORAGE_MODE_WEBDAV) {
        await loadWebdavFolderChildren?.(node);
      }
    },
    [storageMode, loadLocalFolderChildren, loadWebdavFolderChildren],
  );
  const [doc, setDoc] = useState<QuizDocument>(() => parseQuizDocument(content));
  const contentRef = useRef(content);
  const skipContentSessionHydrateRef = useRef(false);
  const sessionHydratedRef = useRef(false);
  const docRef = useRef(doc);
  docRef.current = doc;
  const [userAnswers, setUserAnswers] = useState<Record<string, number | string>>({});
  const [graded, setGraded] = useState<Record<string, boolean>>({});
  const [expVisible, setExpVisible] = useState<Record<string, boolean>>({});
  const [wrongExps, setWrongExps] = useState<Record<string, string>>({});
  const [subjGrades, setSubjGrades] = useState<Record<string, SubjectiveGradeResult>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filter, setFilter] = useState<FilterMode>('all');
  const [tocOpen, setTocOpen] = useState(false);
  const [sourcesDockOpen, setSourcesDockOpen] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editQ, setEditQ] = useState<QuizQuestion | null>(null);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [sourcePicker, setSourcePicker] = useState<{
    paths: string[];
    scope: 'file' | 'question';
    questionId?: string;
    onDone?: (paths: string[]) => void;
  } | null>(null);
  const [genTopic, setGenTopic] = useState('');
  const [freshQuestionIds, setFreshQuestionIds] = useState<Record<string, true>>(
    {},
  );
  const abortRef = useRef<AbortController | null>(null);
  const quizScrollRef = useRef<HTMLDivElement>(null);
  const contentProgressRef = useRef<HTMLDivElement>(null);
  const contentScoreRef = useRef<HTMLDivElement>(null);
  const [contentProgressInView, setContentProgressInView] = useState(true);
  const [contentScoreInView, setContentScoreInView] = useState(true);
  const [timeLog, setTimeLog] = useState<QuizTimeLog>(() => createEmptyQuizTimeLog());
  const [stopwatchHydrateKey, setStopwatchHydrateKey] = useState(0);

  const stopwatch = useQuizStopwatch({
    initialLog: timeLog,
    hydrateKey: stopwatchHydrateKey,
    onLogChange: setTimeLog,
  });

  const getElapsedMsRef = useRef<() => number>(() => 0);
  getElapsedMsRef.current = () => stopwatch.displayMs;

  useQuizQuestionTimeLog({
    scrollRootRef: quizScrollRef,
    questions: doc.questions.map((q) => ({
      id: q.id,
      displayLabel: q.displayLabel,
    })),
    running: stopwatch.running,
    getElapsedMs: () => getElapsedMsRef.current(),
    timeLog,
    onLogChange: setTimeLog,
  });

  const buildSessionFromState = useCallback((): QuizPersistedSession => {
    return normalizeQuizPersistedSession({
      version: 1,
      userAnswers,
      gradedQuestions: graded,
      subjectiveGrades: subjGrades,
      isSubmitted,
      ...(isQuizTimeLogEmpty(timeLog) ? {} : { timeLog }),
    });
  }, [userAnswers, graded, subjGrades, isSubmitted, timeLog]);

  const applySessionToState = useCallback((session: QuizPersistedSession | null | undefined) => {
    const nextTimeLog = normalizeQuizTimeLog(session?.timeLog);
    setTimeLog(nextTimeLog);
    setStopwatchHydrateKey((k) => k + 1);
    if (!session || isQuizSessionEmpty(session)) {
      setUserAnswers({});
      setGraded({});
      setExpVisible({});
      setWrongExps({});
      setSubjGrades({});
      setIsSubmitted(false);
      return;
    }
    setUserAnswers({ ...session.userAnswers });
    setGraded({ ...session.gradedQuestions });
    setSubjGrades({ ...session.subjectiveGrades });
    setIsSubmitted(session.isSubmitted);
    setWrongExps({});
    const nextExp: Record<string, boolean> = {};
    for (const [qid, done] of Object.entries(session.gradedQuestions)) {
      if (done) nextExp[qid] = true;
    }
    setExpVisible(nextExp);
  }, []);

  const persistDocument = useCallback(
    (nextDoc: QuizDocument, session: QuizPersistedSession) => {
      const md = serializeQuizDocument(nextDoc.config, nextDoc.questions, session);
      skipContentSessionHydrateRef.current = true;
      contentRef.current = md;
      onChange(md);
    },
    [onChange],
  );

  // Sync from external content when file changes / reload
  useEffect(() => {
    if (content === contentRef.current) return;
    contentRef.current = content;
    if (skipContentSessionHydrateRef.current) {
      skipContentSessionHydrateRef.current = false;
      return;
    }
    const parsed = parseQuizDocument(content);
    setDoc(parsed);
    applySessionToState(parsed.session);
  }, [content, applySessionToState]);

  // Hydrate persisted session from the vault file once on mount.
  useEffect(() => {
    const parsed = parseQuizDocument(contentRef.current);
    applySessionToState(parsed.session);
    sessionHydratedRef.current = true;
  }, [applySessionToState]);

  // Debounced persist of user answers / grades into the vault markdown.
  useEffect(() => {
    if (!sessionHydratedRef.current) return;
    const session = buildSessionFromState();
    const t = window.setTimeout(() => {
      persistDocument(docRef.current, session);
    }, QUIZ_AUTOSAVE_DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [userAnswers, graded, subjGrades, isSubmitted, timeLog, buildSessionFromState, persistDocument]);

  useEffect(() => {
    if (!isActiveFile || !registerToolbar) return;
    registerToolbar(<QuizStopwatchToolbar stopwatch={stopwatch} />);
    return () => registerToolbar(null);
  }, [
    isActiveFile,
    registerToolbar,
    stopwatch.displayMs,
    stopwatch.running,
    stopwatch.started,
    stopwatch.start,
    stopwatch.pause,
    stopwatch.resume,
    stopwatch.stop,
  ]);

  const commitDoc = useCallback(
    (next: QuizDocument) => {
      const synced: QuizDocument = {
        ...next,
        config: syncQuizFileChoiceCount(next.config, next.questions),
      };
      setDoc(synced);
      const session = buildSessionFromState();
      persistDocument(synced, session);
    },
    [buildSessionFromState, persistDocument],
  );

  const {
    setQuizSourceDropActive,
    setQuizSourceDropHost,
    handleRegisterQuizSourceDrop,
  } = useChromeOwned();

  const modalDropHostRef = useRef<HTMLElement | null>(null);
  const dockDropHostRef = useRef<HTMLElement | null>(null);
  const mergeModalPathsRef = useRef<((paths: string[]) => void) | null>(null);
  const sourcePickerRef = useRef(sourcePicker);
  sourcePickerRef.current = sourcePicker;

  const syncQuizDropHost = useCallback(() => {
    setQuizSourceDropHost(modalDropHostRef.current ?? dockDropHostRef.current);
  }, [setQuizSourceDropHost]);

  const handleModalDropHostChange = useCallback(
    (node: HTMLElement | null) => {
      modalDropHostRef.current = node;
      syncQuizDropHost();
    },
    [syncQuizDropHost],
  );

  const handleDockDropHostChange = useCallback(
    (node: HTMLElement | null) => {
      dockDropHostRef.current = node;
      syncQuizDropHost();
    },
    [syncQuizDropHost],
  );

  useEffect(() => {
    return () => setQuizSourceDropHost(null);
  }, [setQuizSourceDropHost]);

  const findVaultNode = useCallback(
    (itemStorageType: string, path: string) => {
      if (itemStorageType !== storageType) return null;
      return (
        findFileNodeByPath(vaultTree, path) || findNodeByPath(vaultTree, path)
      );
    },
    [storageType, vaultTree],
  );

  const excludeQuizPath = currentFile?.id || null;

  const mergeSourcePaths = useCallback(
    (incoming: string[]) => {
      if (!incoming.length) return;
      const picker = sourcePickerRef.current;
      if (picker?.onDone) {
        const base = new Set(picker.paths);
        for (const p of incoming) base.add(p);
        picker.onDone([...base].sort((a, b) => a.localeCompare(b)));
        showToast({
          message: `근거 문서 ${incoming.length}개 추가`,
          durationMs: 2500,
        });
        return;
      }
      if (picker) {
        mergeModalPathsRef.current?.(incoming);
        showToast({
          message: `근거 문서 ${incoming.length}개 추가`,
          durationMs: 2500,
        });
        return;
      }
      const current = docRef.current;
      const merged = [...new Set([...current.config.sourcePaths, ...incoming])].sort(
        (a, b) => a.localeCompare(b),
      );
      commitDoc({
        ...current,
        config: { ...current.config, sourcePaths: merged },
      });
      showToast({
        message: `근거 문서 ${incoming.length}개 추가`,
        durationMs: 2500,
      });
    },
    [commitDoc, showToast],
  );

  const handleTreeSourceDrop = useCallback(
    (items: TreeAttachSourceItem[]) => {
      const paths = resolveQuizSourceMdPaths(items, findVaultNode, {
        excludePath: excludeQuizPath,
      });
      if (!paths.length) return;
      mergeSourcePaths(paths);
    },
    [excludeQuizPath, findVaultNode, mergeSourcePaths],
  );

  useEffect(() => {
    handleRegisterQuizSourceDrop(handleTreeSourceDrop);
    return () => handleRegisterQuizSourceDrop(null);
  }, [handleRegisterQuizSourceDrop, handleTreeSourceDrop]);

  useEffect(() => {
    const active = isActiveFile && (Boolean(sourcePicker) || sourcesDockOpen);
    setQuizSourceDropActive(active);
    return () => setQuizSourceDropActive(false);
  }, [isActiveFile, sourcePicker, sourcesDockOpen, setQuizSourceDropActive]);

  const scoreBoard = useMemo(
    () =>
      computeQuizScoreBoard({
        questions: doc.questions,
        userAnswers,
        gradedQuestions: graded,
        isSubmitted,
        subjectiveGrades: subjGrades,
      }),
    [doc.questions, userAnswers, graded, isSubmitted, subjGrades],
  );

  const addQuestionStyleTemplate = useMemo(
    () => getQuizQuestionStyleTemplate(doc.questions, doc.config.choiceCount),
    [doc.questions, doc.config.choiceCount],
  );

  useEffect(() => {
    if (!isActiveFile || scoreBoard.total <= 0) {
      setContentProgressInView(true);
      return;
    }
    const root = quizScrollRef.current;
    const target = contentProgressRef.current;
    if (!root || !target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setContentProgressInView(entry.isIntersecting);
      },
      { root, threshold: 0.12 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [isActiveFile, scoreBoard.total, doc.questions.length]);

  useEffect(() => {
    if (!isActiveFile || scoreBoard.total <= 0) {
      setContentScoreInView(true);
      return;
    }
    const root = quizScrollRef.current;
    const target = contentScoreRef.current;
    if (!root || !target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setContentScoreInView(entry.isIntersecting);
      },
      { root, threshold: 0.12 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [isActiveFile, scoreBoard.total, doc.questions.length]);

  const profiles = llmProviderProfiles;

  const resetSession = () => {
    setUserAnswers({});
    setGraded({});
    setExpVisible({});
    setWrongExps({});
    setSubjGrades({});
    setIsSubmitted(false);
    setTimeLog(createEmptyQuizTimeLog());
    setStopwatchHydrateKey((k) => k + 1);
    persistDocument(docRef.current, normalizeQuizPersistedSession({ version: 1 }));
  };

  const retryQuestion = (q: QuizQuestion) => {
    setGraded((prev) => {
      const next = { ...prev };
      delete next[q.id];
      return next;
    });
    setSubjGrades((prev) => {
      const next = { ...prev };
      delete next[q.id];
      return next;
    });
    setExpVisible((prev) => {
      const next = { ...prev };
      delete next[q.id];
      return next;
    });
    setWrongExps((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        if (key === q.id || key.startsWith(`${q.id}_`)) {
          delete next[key];
        }
      }
      return next;
    });
  };

  const selectOption = (qid: string, opt: number) => {
    if (graded[qid]) return;
    setUserAnswers((prev) => ({ ...prev, [qid]: opt }));
  };

  const gradeChoice = (q: QuizQuestion) => {
    setGraded((prev) => ({ ...prev, [q.id]: true }));
    setExpVisible((prev) => ({ ...prev, [q.id]: true }));
  };

  const gradeSubjective = async (q: QuizQuestion) => {
    const ans = String(userAnswers[q.id] || '').trim();
    if (!ans) {
      showToast({ message: '답안을 입력하세요.', durationMs: 2200 });
      return;
    }
    if (!(await ensureQuizLlmReady())) return;
    setBusyId(q.id);
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const result = await gradeSubjectiveAnswer({
        profiles,
        question: q,
        userAnswer: ans,
        signal: ac.signal,
      });
      setSubjGrades((prev) => ({ ...prev, [q.id]: result }));
      setGraded((prev) => ({ ...prev, [q.id]: true }));
      setExpVisible((prev) => ({ ...prev, [q.id]: true }));
      showToast({ message: '주관식 채점 완료', durationMs: 2200 });
    } catch (err) {
      reportQuizError('채점 실패', err, '채점 실패');
    } finally {
      setBusyId(null);
    }
  };

  const submitAll = async () => {
    setIsSubmitted(true);
    const nextGraded = { ...graded };
    const nextExp = { ...expVisible };
    for (const q of doc.questions) {
      if (q.kind === 'choice') {
        nextGraded[q.id] = true;
        nextExp[q.id] = true;
      }
    }
    setGraded(nextGraded);
    setExpVisible(nextExp);
    const subjective = doc.questions.filter((q) => q.kind === 'subjective');
    const needsAi = subjective.some((q) => {
      const ans = String(userAnswers[q.id] || '').trim();
      return Boolean(ans) && !subjGrades[q.id];
    });
    if (needsAi && !(await ensureQuizLlmReady())) {
      return;
    }
    for (const q of subjective) {
      const ans = String(userAnswers[q.id] || '').trim();
      if (!ans) continue;
      if (subjGrades[q.id]) {
        setExpVisible((prev) => ({ ...prev, [q.id]: true }));
        continue;
      }
      try {
        const result = await gradeSubjectiveAnswer({
          profiles,
          question: q,
          userAnswer: ans,
        });
        setSubjGrades((prev) => ({ ...prev, [q.id]: result }));
        setGraded((prev) => ({ ...prev, [q.id]: true }));
        setExpVisible((prev) => ({ ...prev, [q.id]: true }));
      } catch {
        // continue others
      }
    }
    showToast({ message: '전체 채점 완료', durationMs: 2200 });
  };

  const handleSimilar = async (q: QuizQuestion) => {
    if (!(await ensureQuizLlmReady())) return;
    setBusyId(`sim-${q.id}`);
    const sources = resolveEffectiveSourcePaths(doc.config, q);
    const jobId = genQueue.createSimilarJob({
      displayLabel: String(q.displayLabel || q.id),
      preview: q.question,
      hasRag: sources.length > 0,
    });
    const logKey = jobId;
    try {
      const generated = await generateSimilarChoiceQuestion({
        profiles,
        question: q,
        config: doc.config,
        sourcePaths: sources,
        readText,
        onStep: (update) => handleGenerationStep(jobId, logKey, update),
      });
      const labelBase = String(q.displayLabel || q.id).split('-유사')[0] || '1';
      let max = 0;
      const re = new RegExp(
        `^${labelBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-유사(\\d+)$`,
      );
      for (const item of doc.questions) {
        const m = String(item.displayLabel).match(re);
        if (m?.[1]) max = Math.max(max, Number.parseInt(m[1], 10));
      }
      const displayLabel = `${labelBase}-유사${max + 1}`;
      const newQ: QuizQuestion = {
        ...generated,
        id: `gen-${Date.now()}`,
        displayLabel,
        isGenerated: true,
        similarOf: {
          id: q.id,
          displayLabel: String(q.displayLabel || q.id),
        },
        ...(sources.length ? { sourcePaths: sources } : {}),
      };
      genQueue.updateJobStep(jobId, {
        step: 'finalize',
        status: 'running',
        detail: '문서에 추가 중…',
      });
      void persistGenerationLog(jobId, newQ.id);
      const idx = doc.questions.findIndex((x) => x.id === q.id);
      const questions = [...doc.questions];
      questions.splice(idx + 1, 0, newQ);
      setFilter('all');
      setFreshQuestionIds((prev) => ({ ...prev, [newQ.id]: true }));
      commitDoc({ ...doc, questions });
      genQueue.setJobResultQuestionId(jobId, newQ.id);
      genQueue.updateJobStep(jobId, {
        step: 'finalize',
        status: 'done',
        detail: displayLabel,
        llmResponse: JSON.stringify(newQ, null, 2),
      });
      genQueue.completeJob(jobId, displayLabel);
      void persistGenerationLog(jobId, newQ.id);
      showToast({ message: `${displayLabel} 유사문제 추가`, durationMs: 2500 });
      window.setTimeout(() => {
        document
          .getElementById(`q-card-${newQ.id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 80);
    } catch (err) {
      const message =
        (err instanceof Error ? err.message : '') || '유사문제 생성 실패';
      genQueue.failJob(jobId, message);
      void persistGenerationLog(jobId, logKey);
      reportQuizError('유사문제 생성 실패', err, '유사문제 생성 실패');
    } finally {
      setBusyId(null);
    }
  };

  const handleWrongExp = async (q: QuizQuestion, selected: number) => {
    if (!(await ensureQuizLlmReady())) return;
    const key = `${q.id}_${selected}`;
    setBusyId(key);
    setWrongExps((prev) => ({ ...prev, [key]: '' }));
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const text = await generateWrongChoiceExplanation({
        profiles,
        question: q,
        selectedOption: selected,
        signal: ac.signal,
        onChunk: (accumulated) => {
          setWrongExps((prev) => ({ ...prev, [key]: accumulated }));
        },
      });
      setWrongExps((prev) => ({ ...prev, [key]: text }));
    } catch (err) {
      if (ac.signal.aborted) return;
      setWrongExps((prev) => {
        const next = { ...prev };
        if (!String(next[key] || '').trim()) delete next[key];
        return next;
      });
      reportQuizError('오답 해설 실패', err, '오답 해설 실패');
    } finally {
      setBusyId(null);
    }
  };

  const handleGenerateFromSources = async () => {
    const sources = doc.config.sourcePaths || [];
    if (!sources.length) {
      setSourcesDockOpen(true);
      showToast({ message: '파일 근거 문서를 먼저 선택하세요.', durationMs: 2800 });
      return;
    }
    if (!(await ensureQuizLlmReady())) return;
    setBusyId('gen-sources');
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    const jobId = genQueue.createSourceJob({
      preview: doc.questions[0]?.question || '근거 기반 출제',
      topic: genTopic,
    });
    const logKey = jobId;
    try {
      const generated = await generateQuestionsFromSources({
        profiles,
        config: doc.config,
        sourcePaths: sources,
        topic: genTopic,
        kind: 'choice',
        count: 1,
        exampleQuestions: doc.questions,
        readText,
        signal: ac.signal,
        onStep: (update) => handleGenerationStep(jobId, logKey, update),
      });
      if (!generated.length) {
        throw new Error('생성된 문항이 없습니다.');
      }
      const labelBase = Number.parseInt(nextDisplayLabel(doc.questions), 10) || 1;
      const stamp = Date.now();
      const added = generated.map((g, i) => ({
        ...g,
        id: `gen-src-${stamp}-${i}`,
        displayLabel: String(labelBase + i),
        isGenerated: true as const,
        ...(sources.length ? { sourcePaths: [...sources] } : {}),
      }));
      const firstId = added[0]?.id;
      const resultLabels = added.map((q) => q.displayLabel).join(', ');
      const persistKey = firstId || jobId;
      genQueue.updateJobStep(jobId, {
        step: 'finalize',
        status: 'running',
        detail: '문서에 추가 중…',
      });
      void persistGenerationLog(jobId, persistKey);
      const questions = [...doc.questions, ...added];
      setFilter('all');
      if (firstId) {
        setFreshQuestionIds((prev) => {
          const next = { ...prev };
          for (const q of added) next[q.id] = true;
          return next;
        });
      }
      commitDoc({ ...doc, questions });
      if (firstId) {
        genQueue.setJobResultQuestionId(jobId, firstId);
      }
      genQueue.updateJobStep(jobId, {
        step: 'finalize',
        status: 'done',
        detail: resultLabels,
        llmResponse: JSON.stringify(added, null, 2),
      });
      genQueue.completeJob(jobId, resultLabels);
      void persistGenerationLog(jobId, persistKey);
      showToast({
        message: `근거 기반 문제 ${added.length}개 추가`,
        durationMs: 2500,
      });
      if (firstId) {
        window.setTimeout(() => {
          document
            .getElementById(`q-card-${firstId}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 80);
      }
    } catch (err) {
      if (ac.signal.aborted) {
        genQueue.failJob(jobId, '취소됨');
        void persistGenerationLog(jobId, logKey);
        return;
      }
      const message = (err instanceof Error ? err.message : '') || '문제 생성 실패';
      genQueue.failJob(jobId, message);
      void persistGenerationLog(jobId, logKey);
      reportQuizError('문제 생성 실패', err, '문제 생성 실패');
    } finally {
      setBusyId(null);
    }
  };

  const handleFixWithAi = useCallback(
    async ({
      instructions,
      form,
    }: {
      instructions: string;
      form: QuizAddQuestionForm;
    }): Promise<QuizAddQuestionForm | null> => {
      if (!editQ) return null;
      if (!(await ensureQuizLlmReady())) return null;
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;
      const draft = formToQuizQuestion(form, editQ.displayLabel);
      draft.id = editQ.id;
      draft.displayLabel = editQ.displayLabel;
      if (editQ.similarOf) draft.similarOf = editQ.similarOf;
      if (editQ.isGenerated) draft.isGenerated = editQ.isGenerated;
      const sources = resolveEffectiveSourcePaths(doc.config, draft);
      try {
        const fixed = await generateFixedQuizQuestion({
          profiles,
          question: draft,
          config: doc.config,
          userInstructions: instructions,
          sourcePaths: sources,
          readText,
          signal: ac.signal,
        });
        const choiceCount = resolveQuestionChoiceCount(draft, doc.config.choiceCount);
        const next: QuizAddQuestionForm = {
          kind: fixed.kind,
          displayLabel: editQ.displayLabel,
          question: fixed.question,
          point: fixed.point,
          explanation: fixed.explanation,
          ...(form.sourcePaths?.length ? { sourcePaths: form.sourcePaths } : {}),
        };
        if (fixed.kind === 'subjective') {
          next.answerStyle = fixed.answerStyle === 'essay' ? 'essay' : 'short';
          next.modelAnswer = fixed.modelAnswer || '';
        } else {
          const opts = [...(fixed.options || [])];
          next.options = resizeChoiceOptions(opts, choiceCount);
          next.answer = fixed.answer && fixed.answer >= 1 ? fixed.answer : 1;
        }
        showToast({ message: '문항을 교정했습니다. 내용을 확인한 뒤 저장하세요.', durationMs: 3200 });
        return next;
      } catch (err) {
        if (ac.signal.aborted) return null;
        reportQuizError('문제 고치기 실패', err, '문제 고치기 실패');
        return null;
      }
    },
    [
      doc.config,
      editQ,
      ensureQuizLlmReady,
      profiles,
      readText,
      reportQuizError,
      showToast,
    ],
  );

  if (!isActiveFile) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
        탭을 선택하면 퀴즈가 열립니다
      </div>
    );
  }

  const progressPct =
    scoreBoard.total > 0
      ? Math.round((scoreBoard.answered / scoreBoard.total) * 100)
      : 0;
  const showHeaderProgress = scoreBoard.total > 0 && !contentProgressInView;
  const showHeaderScore = scoreBoard.total > 0 && !contentScoreInView;

  const headerScoreStrip = (
    <div
      className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-odp-muted"
      aria-label={`정답 ${scoreBoard.correct}, 부분정답 ${scoreBoard.partial}, 오답 ${scoreBoard.wrong}`}
    >
      <span>
        정답{' '}
        <span className="font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
          {scoreBoard.correct}
        </span>
      </span>
      <span className="text-slate-300 dark:text-odp-borderSoft" aria-hidden>
        |
      </span>
      <span>
        부분{' '}
        <span className="font-bold tabular-nums text-amber-600 dark:text-amber-400">
          {scoreBoard.partial}
        </span>
      </span>
      <span className="text-slate-300 dark:text-odp-borderSoft" aria-hidden>
        |
      </span>
      <span>
        오답{' '}
        <span className="font-bold tabular-nums text-rose-500 dark:text-rose-400">
          {scoreBoard.wrong}
        </span>
      </span>
    </div>
  );

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-slate-50 dark:bg-odp-bg">
      <div className="shrink-0 border-b border-slate-200 bg-white/90 px-4 py-3 dark:border-odp-borderSoft dark:bg-odp-surface">
        <div className="flex flex-wrap items-center gap-2">
          <div className="mr-auto flex min-w-0 flex-1 basis-full items-center gap-2 sm:basis-auto sm:gap-3">
            <ClipboardList className="shrink-0 text-blue-600" size={18} />
            <span className="shrink-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong">
              퀴즈 모드
            </span>
            <AnimatePresence initial={false}>
              {showHeaderProgress ? (
                <Motion.div
                  key="quiz-header-progress"
                  className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden sm:gap-3"
                  initial={{ opacity: 0, maxWidth: 0 }}
                  animate={{ opacity: 1, maxWidth: 560 }}
                  exit={{ opacity: 0, maxWidth: 0 }}
                  transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p className="hidden shrink-0 text-xs text-slate-600 dark:text-odp-muted md:inline">
                    총{' '}
                    <span className="font-semibold text-slate-800 dark:text-odp-fgStrong">
                      {scoreBoard.total}
                    </span>
                    문항 중{' '}
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {scoreBoard.answered}
                    </span>
                    문항 풀이
                  </p>
                  <span className="shrink-0 text-xs font-semibold tabular-nums text-slate-600 dark:text-odp-muted md:hidden">
                    {scoreBoard.answered}/{scoreBoard.total}
                  </span>
                  <div
                    className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-odp-bgSoft"
                    role="progressbar"
                    aria-valuenow={scoreBoard.answered}
                    aria-valuemin={0}
                    aria-valuemax={scoreBoard.total}
                    aria-label={`풀이 진행 ${scoreBoard.answered} / ${scoreBoard.total}`}
                  >
                    <Motion.div
                      className="h-full rounded-full bg-blue-500"
                      initial={false}
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="shrink-0 text-[11px] font-medium tabular-nums text-slate-500 dark:text-odp-muted">
                    {progressPct}%
                  </span>
                </Motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <AnimatePresence initial={false}>
            {showHeaderScore ? (
              <Motion.div
                key="quiz-header-score"
                initial={{ opacity: 0, maxWidth: 0 }}
                animate={{ opacity: 1, maxWidth: 220 }}
                exit={{ opacity: 0, maxWidth: 0 }}
                transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                {headerScoreStrip}
              </Motion.div>
            ) : null}
          </AnimatePresence>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button type="button" variant="secondary" size="sm">
                <Plus size={14} />
                문제 추가
                <ChevronDown size={14} className="opacity-70" aria-hidden />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className={QUIZ_ADD_MENU_CONTENT_CLASS}
                sideOffset={6}
                align="start"
              >
                <DropdownMenu.Item
                  className={QUIZ_ADD_MENU_ITEM_CLASS}
                  onSelect={() => {
                    setEditQ(null);
                    setAddOpen(true);
                  }}
                >
                  <PenLine size={14} aria-hidden />
                  직접추가
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className={QUIZ_ADD_MENU_ITEM_CLASS}
                  onSelect={() => setBulkOpen(true)}
                >
                  <FilePlus2 size={14} aria-hidden />
                  마크다운 가져오기
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          <Button type="button" variant="secondary" size="sm" onClick={resetSession}>
            <RotateCcw size={14} />
            초기화
          </Button>
          <Button type="button" variant="primary" size="sm" onClick={() => void submitAll()}>
            <CheckCheck size={14} />
            전체 채점
          </Button>
          <Button
            type="button"
            variant={sourcesDockOpen ? 'primary' : 'secondary'}
            size="sm"
            aria-pressed={sourcesDockOpen}
            onClick={() => {
              setSourcesDockOpen((v) => !v);
              if (!sourcesDockOpen) setTocOpen(false);
            }}
          >
            <Library size={14} />
            근거
            {doc.config.sourcePaths.length > 0 ? (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  sourcesDockOpen
                    ? 'bg-white/20 text-white'
                    : 'bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-200'
                }`}
              >
                {doc.config.sourcePaths.length}
              </span>
            ) : null}
          </Button>
          <Button
            type="button"
            variant="tertiary"
            size="sm"
            aria-label="목차"
            onClick={() => {
              setTocOpen((v) => !v);
              if (!tocOpen) setSourcesDockOpen(false);
            }}
          >
            <List size={14} />
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="relative min-h-0 min-w-0 flex-1">
          <div ref={quizScrollRef} className="h-full min-h-0 overflow-y-auto px-4 py-4">
            <div className="mx-auto max-w-3xl space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-odp-borderSoft dark:bg-odp-surface">
            <div ref={contentProgressRef}>
            <div className="mb-2 flex justify-between text-xs font-semibold text-slate-600 dark:text-odp-muted">
              <span>풀이 진행률</span>
              <span>
                {scoreBoard.answered} / {scoreBoard.total}
              </span>
            </div>
            <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-odp-bgSoft">
              <Motion.div
                className="h-full rounded-full bg-blue-500"
                initial={false}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-4 text-center text-xs">
                <div>
                  <div className="text-xl font-black text-slate-800 dark:text-odp-fgStrong">
                    {scoreBoard.scorePercent != null ? `${scoreBoard.scorePercent}점` : '-'}
                  </div>
                  <div className="text-[10px] text-slate-400">점수</div>
                </div>
                <div ref={contentScoreRef} className="flex gap-4 text-center text-xs">
                  <div>
                    <div className="text-lg font-bold text-emerald-600">{scoreBoard.correct}</div>
                    <div className="text-[10px] text-slate-400">정답</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-amber-600">{scoreBoard.partial}</div>
                    <div className="text-[10px] text-slate-400">부분</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-rose-500">{scoreBoard.wrong}</div>
                    <div className="text-[10px] text-slate-400">오답</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 rounded-xl bg-slate-100 p-1 text-xs dark:bg-odp-bgSoft">
                {(
                  [
                    ['all', '전체'],
                    ['wrong', '오답만'],
                    ['unanswered', '미풀이'],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    className={`rounded-lg px-2.5 py-1 font-medium ${
                      filter === id
                        ? 'bg-white shadow-sm dark:bg-odp-surface'
                        : 'text-slate-600 dark:text-odp-muted'
                    }`}
                    onClick={() => setFilter(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <QuizTimeLogPanel log={timeLog} />
          </div>

          {doc.questions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-odp-borderSoft dark:bg-odp-surface">
              <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-odp-fgStrong">
                등록된 문제가 없습니다
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button type="button" variant="primary" onClick={() => setAddOpen(true)}>
                  <Plus size={14} />
                  문제 추가
                </Button>
                <Button type="button" variant="secondary" onClick={() => setBulkOpen(true)}>
                  마크다운 가져오기
                </Button>
              </div>
            </div>
          ) : null}

          {doc.questions.map((q) => {
            const answered = userAnswers[q.id] !== undefined && String(userAnswers[q.id]).trim() !== '';
            const isGraded = isSubmitted || graded[q.id];
            let isWrong = false;
            let isCorrect = false;
            if (q.kind === 'choice' && isGraded && answered) {
              isCorrect = userAnswers[q.id] === q.answer;
              isWrong = !isCorrect;
            }
            if (q.kind === 'subjective' && isGraded) {
              const g = subjGrades[q.id];
              isCorrect = g?.verdict === 'correct';
              isWrong = g?.verdict === 'wrong';
            }
            if (filter === 'wrong' && !(isGraded && isWrong)) return null;
            if (filter === 'unanswered' && answered) return null;

            const showExp = expVisible[q.id];
            const selected = userAnswers[q.id];
            const isFreshQuestion = Boolean(freshQuestionIds[q.id]);
            let gradeLabel: string | null = null;
            if (isGraded) {
              if (q.kind === 'choice') {
                if (!answered) gradeLabel = '미채점';
                else if (isCorrect) gradeLabel = '정답';
                else gradeLabel = '오답';
              } else {
                const verdict = subjGrades[q.id]?.verdict;
                if (verdict === 'correct') gradeLabel = '정답';
                else if (verdict === 'partial') gradeLabel = '부분정답';
                else if (verdict === 'wrong') gradeLabel = '오답';
              }
            }

            return (
              <Motion.div
                key={q.id}
                id={`q-card-${q.id}`}
                {...{ [QUIZ_QUESTION_TRACK_ATTR]: q.id }}
                initial={
                  isFreshQuestion
                    ? { opacity: 0, y: 36, scale: 0.96 }
                    : false
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={
                  isFreshQuestion
                    ? { type: 'spring', stiffness: 340, damping: 26 }
                    : { duration: 0 }
                }
                onAnimationComplete={() => {
                  if (!isFreshQuestion) return;
                  setFreshQuestionIds((prev) => {
                    if (!prev[q.id]) return prev;
                    const next = { ...prev };
                    delete next[q.id];
                    return next;
                  });
                }}
                className={`relative rounded-2xl border bg-white p-5 pr-16 shadow-xs dark:bg-odp-surface ${
                  isGraded
                    ? isCorrect
                      ? 'border-emerald-300'
                      : isWrong
                        ? 'border-rose-300'
                        : 'border-slate-200 dark:border-odp-borderSoft'
                    : 'border-slate-200 dark:border-odp-borderSoft'
                } ${
                  q.isGenerated
                    ? 'border-purple-300 dark:border-purple-700'
                    : ''
                } ${
                  isFreshQuestion
                    ? 'ring-2 ring-purple-300/70 dark:ring-purple-500/50'
                    : ''
                }`}
              >
                <Button
                  type="button"
                  variant="tertiary"
                  size="sm"
                  className="absolute top-3 right-3 z-10"
                  onClick={() => {
                    setEditQ(q);
                    setAddOpen(true);
                  }}
                >
                  <PenLine size={14} />
                  수정
                </Button>
                <div className="mb-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-odp-fgStrong">
                    <span className="mr-1.5 inline-flex items-center gap-1.5 align-middle">
                      <span>{q.displayLabel}.</span>
                      {gradeLabel ? (
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                            gradeLabel === '정답'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200'
                              : gradeLabel === '오답'
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200'
                                : gradeLabel === '부분정답'
                                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200'
                                  : 'bg-slate-100 text-slate-700 dark:bg-odp-bgSoft dark:text-odp-muted'
                          }`}
                        >
                          {gradeLabel}
                        </span>
                      ) : null}
                    </span>
                    {q.kind === 'subjective'
                      ? q.answerStyle === 'essay'
                        ? '[주관식] '
                        : '[단답형] '
                      : ''}
                    <span className="font-medium">
                      <QuizMdPreview
                        text={q.question}
                        previewId={`qq-${q.id}`}
                        className="inline"
                      />
                    </span>
                  </h3>
                </div>

                {q.kind === 'choice' ? (
                  <div className="space-y-2">
                    {(q.options || []).map((opt, idx) => {
                      const n = idx + 1;
                      const isSel = selected === n;
                      const reveal = isGraded;
                      const isRight = q.answer === n;
                      let cls =
                        'border-slate-200 bg-white hover:bg-slate-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft';
                      if (isSel && !reveal) {
                        cls = 'border-blue-500 bg-blue-50 ring-1 ring-blue-500 dark:bg-blue-950/30';
                      }
                      if (reveal && isRight) {
                        cls =
                          'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:bg-emerald-950/30';
                      } else if (reveal && isSel && !isRight) {
                        cls = 'border-rose-400 bg-rose-50 dark:bg-rose-950/30';
                      }
                      return (
                        <button
                          key={n}
                          type="button"
                          className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm ${cls}`}
                          onClick={() => selectOption(q.id, n)}
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold">
                            {n}
                          </span>
                          <div className="min-w-0 flex-1">
                            <QuizMdPreview text={opt} previewId={`qo-${q.id}-${n}`} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {q.answerStyle === 'essay' ? (
                      <textarea
                        className="min-h-24 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                        value={String(userAnswers[q.id] || '')}
                        disabled={isGraded}
                        onChange={(e) =>
                          setUserAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        placeholder="답안을 입력하세요"
                      />
                    ) : (
                      <input
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                        value={String(userAnswers[q.id] || '')}
                        disabled={isGraded}
                        onChange={(e) =>
                          setUserAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        placeholder="단답 입력"
                      />
                    )}
                    {subjGrades[q.id] ? (
                      <div
                        className={`rounded-xl border p-3 text-xs ${
                          subjGrades[q.id]?.verdict === 'correct'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/45 dark:text-emerald-100'
                            : subjGrades[q.id]?.verdict === 'partial'
                              ? 'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-800/70 dark:bg-amber-950/45 dark:text-amber-100'
                              : 'border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100'
                        }`}
                      >
                        <div className="mb-1 font-bold">
                          {subjGrades[q.id]?.verdict} · {subjGrades[q.id]?.score}점
                        </div>
                        <div className="[&_.md-editor-preview]:text-inherit [&_.md-editor-preview]:!bg-transparent [&_.md-editor]:!bg-transparent">
                          <QuizMdPreview
                            text={subjGrades[q.id]?.feedback || ''}
                            previewId={`qg-${q.id}`}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {!isGraded ? (
                    q.kind === 'choice' ? (
                      <Button
                        type="button"
                        size="sm"
                        disabled={!answered}
                        onClick={() => gradeChoice(q)}
                        className="!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700"
                      >
                        <CheckCheck size={14} />
                        채점
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        disabled={busyId === q.id || !answered}
                        onClick={() => void gradeSubjective(q)}
                        className="!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700"
                      >
                        <Sparkles size={14} />
                        AI 채점
                      </Button>
                    )
                  ) : (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => retryQuestion(q)}
                    >
                      <RotateCcw size={14} />
                      다시풀기
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      setExpVisible((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                    }
                  >
                    <BookOpen size={14} />
                    {showExp ? '해설 접기' : '해설 보기'}
                  </Button>
                  {q.kind === 'choice' ? (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      disabled={busyId === `sim-${q.id}`}
                      onClick={() => void handleSimilar(q)}
                    >
                      <Wand2 size={14} />
                      유사문제
                    </Button>
                  ) : null}
                </div>

                {isGraded && q.kind === 'choice' && isWrong && typeof selected === 'number' ? (
                  <div className="mt-3">
                    {wrongExps[`${q.id}_${selected}`] !== undefined ? (
                      <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100">
                        <div className="mb-1.5 flex items-center gap-2 font-bold text-rose-800 dark:text-rose-200">
                          <span>오답 분석</span>
                          {busyId === `${q.id}_${selected}` ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-rose-500 dark:text-rose-300">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500 dark:bg-rose-300" />
                              생성 중
                            </span>
                          ) : null}
                        </div>
                        <div className="text-rose-950 dark:text-rose-50 [&_.md-editor-preview]:text-inherit [&_.md-editor-preview]:!bg-transparent [&_.md-editor]:!bg-transparent">
                          {wrongExps[`${q.id}_${selected}`] ? (
                            <QuizMdPreview
                              text={wrongExps[`${q.id}_${selected}`] || ''}
                              previewId={`wx-${q.id}`}
                            />
                          ) : (
                            <p className="text-[11px] text-rose-400 dark:text-rose-300/80">
                              분석을 생성하는 중…
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        disabled={busyId === `${q.id}_${selected}`}
                        onClick={() => void handleWrongExp(q, selected)}
                      >
                        <Wand2 size={14} />
                        오답 분석 생성
                      </Button>
                    )}
                  </div>
                ) : null}

                {showExp ? (
                  <div className="mt-2 space-y-2 rounded-xl bg-slate-50 p-3 text-xs dark:bg-odp-bgSoft">
                    <div>
                      <div className="mb-1 font-bold text-amber-800">접근 Point!</div>
                      <QuizMdPreview text={q.point} previewId={`qp-${q.id}`} />
                    </div>
                    <div>
                      <div className="mb-1 font-bold text-slate-800 dark:text-odp-fgStrong">
                        해설
                      </div>
                      <QuizMdPreview text={q.explanation} previewId={`qe-${q.id}`} />
                    </div>
                    {q.kind === 'subjective' && q.modelAnswer ? (
                      <div>
                        <div className="mb-1 font-bold">모범 답안</div>
                        <QuizMdPreview text={q.modelAnswer} previewId={`qm-${q.id}`} />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </Motion.div>
            );
          })}
            </div>
          </div>

          <AnimatePresence>
            {tocOpen ? (
              <Motion.aside
                key="quiz-toc"
                role="complementary"
                aria-label="문제 목차"
                className="absolute inset-y-0 right-0 z-20 flex w-72 flex-col border-l border-slate-200 bg-white shadow-xl dark:border-odp-borderSoft dark:bg-odp-surface"
                initial={{ x: '100%', opacity: 0.6 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0.6 }}
                transition={{ type: 'spring', stiffness: 380, damping: 36 }}
              >
                <div className="flex items-center justify-between border-b border-slate-200 p-3 dark:border-odp-borderSoft">
                  <span className="text-sm font-bold">문제 목차</span>
                  <button type="button" aria-label="닫기" onClick={() => setTocOpen(false)}>
                    <X size={16} />
                  </button>
                </div>
                <ul className="flex-1 space-y-1 overflow-y-auto p-3 text-xs">
                  {doc.questions.map((q, i) => {
                    const isSimilarChild = Boolean(q.similarOf);
                    return (
                      <Motion.li
                        key={q.id}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: Math.min(i, 12) * 0.03, duration: 0.18 }}
                      >
                        <button
                          type="button"
                          className={`w-full truncate rounded py-1.5 text-left hover:bg-slate-100 dark:hover:bg-odp-focusBg ${
                            isSimilarChild
                              ? 'ml-3 border-l-2 border-violet-300 pl-2.5 text-[11px] text-violet-900 dark:border-violet-600 dark:text-violet-200'
                              : 'px-2'
                          }`}
                          title={
                            isSimilarChild
                              ? `${q.similarOf?.displayLabel || q.similarOf?.id}의 유사문제`
                              : undefined
                          }
                          onClick={() => {
                            document
                              .getElementById(`q-card-${q.id}`)
                              ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            setFilter('all');
                          }}
                        >
                          {isSimilarChild ? (
                            <span className="mr-1 text-violet-400 dark:text-violet-500">↳</span>
                          ) : null}
                          {q.displayLabel}. {q.question.slice(0, 40)}
                        </button>
                      </Motion.li>
                    );
                  })}
                </ul>
              </Motion.aside>
            ) : null}
          </AnimatePresence>
        </div>

        <AnimatePresence initial={false}>
          {sourcesDockOpen ? (
            <Motion.aside
              key="quiz-sources-dock"
              role="complementary"
              aria-label="파일 근거 문서"
              className="flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface"
              initial={{ width: 0, opacity: 0.85 }}
              animate={{ width: SOURCES_DOCK_WIDTH, opacity: 1 }}
              exit={{ width: 0, opacity: 0.85 }}
              transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            >
              <div
                className="flex h-full min-h-0 flex-col"
                style={{ width: SOURCES_DOCK_WIDTH }}
              >
                <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2.5 dark:border-odp-borderSoft">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-odp-fgStrong">
                    <Library size={16} className="text-violet-600 dark:text-violet-400" />
                    파일 근거
                  </div>
                  <button
                    type="button"
                    aria-label="근거 패널 닫기"
                    className="rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg"
                    onClick={() => setSourcesDockOpen(false)}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div
                  ref={handleDockDropHostChange}
                  className="relative min-h-0 flex-1 space-y-4 overflow-y-auto p-3"
                >
                  <QuizSourcePathsChips
                    paths={doc.config.sourcePaths}
                    label="선택된 문서"
                    onRemove={(p) =>
                      commitDoc({
                        ...doc,
                        config: {
                          ...doc.config,
                          sourcePaths: doc.config.sourcePaths.filter((x) => x !== p),
                        },
                      })
                    }
                    onOpenPicker={() =>
                      setSourcePicker({
                        paths: doc.config.sourcePaths,
                        scope: 'file',
                      })
                    }
                  />
                  <div className="space-y-2 border-t border-slate-100 pt-3 dark:border-odp-borderSoft">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-odp-fgStrong">
                      근거로 문제 생성
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                      placeholder="주제 (선택)"
                      value={genTopic}
                      onChange={(e) => setGenTopic(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      disabled={busyId === 'gen-sources'}
                      onClick={() => void handleGenerateFromSources()}
                    >
                      <Sparkles size={14} />
                      근거로 문제 추가
                    </Button>
                  </div>
                </div>
              </div>
            </Motion.aside>
          ) : null}
        </AnimatePresence>
      </div>

      {addOpen ? (
        <QuizAddQuestionModal
          isOpen={addOpen}
          onClose={() => {
            setAddOpen(false);
            setEditQ(null);
          }}
          styleTemplate={addQuestionStyleTemplate}
          initial={editQ}
          nextLabel={nextDisplayLabel(doc.questions)}
          onSubmit={(q) => {
            if (editQ) {
              commitDoc({
                ...doc,
                questions: doc.questions.map((x) => (x.id === editQ.id ? q : x)),
              });
            } else {
              commitDoc({ ...doc, questions: [...doc.questions, q] });
            }
            setEditQ(null);
          }}
          onOpenSourcePicker={(paths, onDone) =>
            setSourcePicker({ paths, scope: 'question', onDone })
          }
          {...(editQ ? { onFixWithAi: handleFixWithAi } : {})}
        />
      ) : null}

      {bulkOpen ? (
        <QuizBulkImportModal
          isOpen={bulkOpen}
          onClose={() => setBulkOpen(false)}
          current={doc}
          onApply={(next, mode) => {
            commitDoc(next);
            if (mode === 'replace') resetSession();
            showToast({
              message: `문제 ${next.questions.length}개 적용`,
              durationMs: 2500,
            });
          }}
        />
      ) : null}

      {sourcePicker ? (
        <QuizSourcePickerModal
          isOpen
          onClose={() => setSourcePicker(null)}
          tree={vaultTree}
          selected={sourcePicker.paths}
          excludePath={currentFile?.id || null}
          onExpandFolder={onExpandFolder}
          onDropHostChange={handleModalDropHostChange}
          onRegisterDropPathsMerge={(fn) => {
            mergeModalPathsRef.current = fn;
          }}
          onConfirm={(paths) => {
            if (sourcePicker.onDone) {
              sourcePicker.onDone(paths);
            } else if (sourcePicker.scope === 'file') {
              commitDoc({
                ...doc,
                config: { ...doc.config, sourcePaths: paths },
              });
            }
            setSourcePicker(null);
          }}
        />
      ) : null}

      <QuizGenerationQueuePanel
        jobs={genQueue.jobs}
        isOpen={genQueue.panelOpen}
        size={genQueue.panelSize}
        onClose={genQueue.closePanel}
        onResize={genQueue.setPanelSize}
        onRemoveJob={genQueue.removeJob}
        onClearFinished={genQueue.clearFinishedJobs}
      />

      {!genQueue.panelOpen && genQueue.jobs.length > 0 ? (
        <button
          type="button"
          className="fixed bottom-4 right-4 z-10049 flex items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-2 text-xs font-semibold text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 dark:border-violet-700/60"
          onClick={genQueue.openPanel}
          aria-label="문제 생성 대기열 열기"
        >
          <Sparkles size={14} />
          생성 대기열
          {genQueue.hasActiveJobs ? (
            <span className="rounded-full bg-violet-400/30 px-1.5 py-0.5 text-[10px] font-bold">
              진행
            </span>
          ) : null}
        </button>
      ) : null}
    </div>
  );
}

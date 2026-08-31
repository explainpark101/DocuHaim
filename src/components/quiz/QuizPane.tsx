import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import {
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
} from "lucide-react";
import { DropdownMenu, Tooltip } from "radix-ui";
import Button from "@/components/Button";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { QuizImageHydrationProvider } from "@/components/quiz/QuizImageHydrationContext";
import QuizDerivedQuestionDock from "@/components/quiz/QuizDerivedQuestionDock";
import QuizAddQuestionModal from "@/components/quiz/QuizAddQuestionModal";
import QuizBulkImportModal from "@/components/quiz/QuizBulkImportModal";
import QuizSourcePickerModal from "@/components/quiz/QuizSourcePickerModal";
import QuizGenerationQueuePanel from "@/components/quiz/QuizGenerationQueuePanel";
import QuizStopwatchToolbar from "@/components/quiz/QuizStopwatchToolbar";
import QuizTimeLogPanel from "@/components/quiz/QuizTimeLogPanel";
import type { QuizQuestionSectionsTarget } from "@/components/quiz/QuizQuestionSectionsPanel";
import QuizQuestionList, {
  type QuizQuestionListHandle,
} from "@/components/quiz/QuizQuestionList";
import QuizChoiceAnalysisDock, {
  type QuizChoiceAnalysisDockMode,
} from "@/components/quiz/QuizChoiceAnalysisDock";
import QuizSourcesDock, {
  readQuizSourceRemoveConfirm,
} from "@/components/quiz/QuizSourcesDock";
import QuizSourcePreviewDock from "@/components/quiz/QuizSourcePreviewDock";
import QuizTocDock from "@/components/quiz/QuizTocDock";
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
  countQuizSourcePathUsage,
  getActiveSourcePaths,
  removeQuizSourcePathFromConfig,
  setQuizSourcePathEnabled,
} from "@/utils/quiz";
import {
  computeQuizScoreBoard,
} from "@/utils/quiz/quizScoring";
import {
  checkQuizLlmReady,
  generateQuestionsFromSources,
  generateFixedQuizQuestion,
  generateSimilarChoiceQuestion,
  generateDerivedQuestion,
  generateWrongChoiceExplanation,
  generateChoiceAnalysisFollowUp,
  generateQuestionSections,
  gradeSubjectiveAnswer,
  isQuizLlmSetupIssue,
} from "@/utils/quiz/quizLlmService";
import type {
  QuizAddQuestionForm,
  QuizDocument,
  QuizPersistedSession,
  QuizQuestion,
  SubjectiveGradeResult,
} from "@/utils/quiz/quizTypes";
import {
  remapChoiceAnalysisDockOption,
  shuffleQuizChoiceOptions,
} from "@/utils/quiz/shuffleQuizChoiceOptions";
import { formToQuizQuestion } from "@/utils/quiz/buildQuestionMarkdown";
import type { LlmProviderProfile } from "@/utils/llm/llmProviderProfiles";
import { useQuizLlmSelection } from "@/hooks/useQuizLlmSelection";
import { useQuizScrollSectionInView } from "@/hooks/useQuizScrollSectionInView";
import QuizLlmSessionBar from "@/components/quiz/QuizLlmSessionBar";
import type { QuizVaultTextReader } from "@/utils/quiz/quizVaultSourceLoader";
import "@/styles/quiz-pane.css";
import { writeQuizGenerationLog } from "@/utils/quiz/quizGenerationLog";
import type { QuizGenStepUpdate } from "@/utils/quiz/quizGenerationQueueTypes";
import { useToast } from "@/contexts/ToastContext";
import { useAlertModal } from "@/contexts/AlertModalContext";
import { useLlmAssistSessionOptional } from "@/contexts/LlmAssistSessionContext";
import { useFileSession } from "@/App/hooks/useFileSession";
import { useVault } from "@/App/hooks/useVault";
import { useChromeOwned } from "@/App/providers/AppChromeStateProvider";
import { useQuizGenerationQueue } from "@/hooks/useQuizGenerationQueue";
import { useQuizStopwatch } from "@/hooks/useQuizStopwatch";
import {
  useQuizQuestionTimeLog,
} from "@/hooks/useQuizQuestionTimeLog";
import { findFileNodeByPath, findNodeByPath } from "@/utils/s3Tree";
import { resolveQuizSourceMdPaths } from "@/utils/quiz/quizTreeSourceDrop";
import type { TreeAttachSourceItem } from "@/utils/chatWithMyself/treeAttachDrop";
import {
  STORAGE_MODE_LOCAL,
  STORAGE_MODE_WEBDAV,
} from "@/utils/storageSettings";
import {
  createEmptyQuizTimeLog,
  appendQuizTimeLogEvent,
  isQuizTimeLogEmpty,
  normalizeQuizTimeLog,
  type QuizTimeLog,
} from "@/utils/quiz/quizTimeLog";
import { buildWrongQuestionsExtractQuiz } from "@/utils/quiz/buildWrongQuestionsExtractQuiz";
import { resolveWrongQuizExtractPath } from "@/utils/quiz/quizWrongExtractPath";
import {
  appendRegeneratedChoiceAnalysis,
  appendFollowUpChoiceAnalysis,
  ensureChoiceAnalysisFollowUpHeader,
  flatWrongChoiceExplanations,
  mergeStreamingRegeneratedChoiceAnalysis,
  mergeStreamingFollowUpChoiceAnalysis,
  nestWrongChoiceExplanations,
  resolveChoiceAnalysisUserInstructions,
  wrongChoiceExplanationKey,
} from "@/utils/quiz/quizWrongChoiceExplanations";
import { loadQuizSettings } from "@/utils/quiz/quizSettingsStore";
import {
  isWeakSimilarQuestionExplanation,
  isWeakSimilarQuestionPoint,
} from "@/utils/quiz/similarQuestionAnalysis";
import type { QuizDerivedQuestionTarget } from "@/utils/quiz/derivedQuestionAnalysis";
import { nextDerivedDisplayLabel } from "@/utils/quiz/derivedQuestionAnalysis";
import { isQuestionMemosEmpty } from "@/utils/quiz/quizQuestionMemos";
import {
  areQuizPersistedSessionsEqual,
  buildQuizSessionForPersist,
  hasQuizInProgressSession,
  hasQuizSessionAnswer,
} from "@/utils/quiz/quizSessionBuild";
import { loadVaultDocumentPreview } from "@/utils/vault/loadVaultDocumentPreview";
import {
  resolveVaultFileNode,
  type VaultStorageType,
} from "@/utils/vault/resolveVaultFileNode";
import { isTauriDesktopPlatform } from "@/utils/tauriPlatform";

const QUIZ_AUTOSAVE_DEBOUNCE_MS = 20_000;

/** Fixed-height slots in the quiz header so progress/score fade does not resize the bar. */
const QUIZ_HEADER_INLINE_SLOT_CLASS =
  "flex h-6 max-h-6 min-w-0 items-center overflow-hidden";

type TreeNode = {
  name: string;
  type: string;
  path: string;
  children?: TreeNode[];
};

const QUIZ_ADD_MENU_CONTENT_CLASS =
  "z-100010 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft";

const QUIZ_ADD_MENU_ITEM_CLASS =
  "flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-gray-800 outline-none hover:bg-gray-100 focus:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg dark:focus:bg-odp-focusBg";

export type QuizFileManagementActions = {
  extractWrongQuestions: () => void | Promise<void>;
  shuffleChoiceOptions?: () => void;
  hasUnsavedProgress?: () => boolean;
  /** Flush quiz-session into editor markdown immediately (e.g. before vault save). */
  flushBeforeSave?: () => void;
};

export type QuizPaneProps = {
  content: string;
  onChange: (markdown: string) => void;
  onSave?:
    | ((
        fileOverride?: unknown,
        options?: {
          skipCoverChangeCheck?: boolean;
          skipSuffixCheck?: boolean;
          contentOverride?: string;
        },
      ) => void | Promise<void>)
    | undefined;
  currentFile?: {
    id?: string;
    name?: string;
    type?: string;
    content?: string;
  } | null;
  onResolveWikiImageUrl?:
    | ((path: string) => Promise<string | null>)
    | undefined;
  llmProviderProfiles?: LlmProviderProfile[];
  isActiveFile?: boolean;
  registerToolbar?: (node: ReactNode | null) => void;
  registerFileManagement?: (actions: QuizFileManagementActions | null) => void;
};

type FilterMode = "all" | "wrong" | "unanswered";

export default function QuizPane({
  content,
  onChange,
  onSave,
  currentFile,
  onResolveWikiImageUrl,
  llmProviderProfiles = [],
  isActiveFile = true,
  registerToolbar,
  registerFileManagement,
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
    localRootHandle,
    getBackendForType,
    loadLocalFolderChildren,
    loadWebdavFolderChildren,
  } = useVault();
  const { openAdvancedSearchFile, selectFileRaw } = useFileSession();

  const openLlmAssistForSetup = useCallback(
    (message: string) => {
      llmAssist?.openAssist();
      showToast({
        message:
          message || "AI 도우미에서 모델을 로드·선택한 뒤 다시 시도하세요.",
        durationMs: 3500,
      });
    },
    [llmAssist, showToast],
  );

  const quizLlm = useQuizLlmSelection(llmProviderProfiles);

  const ensureQuizLlmReady = useCallback(
    async (overrides?: {
      profileId?: string;
      model?: string;
    }): Promise<boolean> => {
      const result = await checkQuizLlmReady(llmProviderProfiles, {
        ...quizLlm.llmOpts,
        ...overrides,
      });
      if (result.ready) return true;
      openLlmAssistForSetup(result.message);
      return false;
    },
    [llmProviderProfiles, openLlmAssistForSetup, quizLlm.llmOpts],
  );

  const reportQuizError = useCallback(
    (title: string, err: unknown, fallback: string) => {
      const message = (err instanceof Error ? err.message : "") || fallback;
      if (isQuizLlmSetupIssue(message)) {
        openLlmAssistForSetup(message);
        return;
      }
      // Long / multi-line errors (LLM, API) → Alert Modal; short tips stay toast.
      if (message.length >= 48 || message.includes("\n")) {
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
      ? "local"
      : storageMode === STORAGE_MODE_WEBDAV
        ? "webdav"
        : "s3";

  const vaultStorageType = storageType as VaultStorageType;

  const loadVaultPreviewDocument = useCallback(
    async (path: string) => {
      const backend = getBackendForType(storageType);
      return loadVaultDocumentPreview({
        backend,
        storageType: vaultStorageType,
        path,
      });
    },
    [getBackendForType, storageType, vaultStorageType],
  );

  const openSourceDocument = useCallback(
    (path: string) => {
      void openAdvancedSearchFile(path);
    },
    [openAdvancedSearchFile],
  );

  const openSourceInNewTab = useCallback(
    async (path: string) => {
      const node = await resolveVaultFileNode(path, {
        storageType: vaultStorageType,
        localTree,
        webdavTree,
        s3Tree,
        localRootHandle,
      });
      if (node) {
        await selectFileRaw(storageType, node, { background: true });
        return;
      }
      void openAdvancedSearchFile(path);
    },
    [
      vaultStorageType,
      localTree,
      webdavTree,
      s3Tree,
      localRootHandle,
      selectFileRaw,
      storageType,
      openAdvancedSearchFile,
    ],
  );

  const handlePreviewSource = useCallback((path: string) => {
    setSourcesDockOpen(true);
    setPreviewSourcePath(path);
  }, []);

  const closeSourcesDock = useCallback(() => {
    setSourcesDockOpen(false);
    setPreviewSourcePath(null);
  }, []);

  const readText: QuizVaultTextReader = useCallback(
    async (path: string) => {
      const backend = getBackendForType(storageType);
      if (!backend?.readText) return null;
      const { text } = await backend.readText(path);
      return typeof text === "string" ? text : null;
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
            backend.writeText(p, t, "text/markdown; charset=utf-8"),
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
  const [doc, setDoc] = useState<QuizDocument>(() =>
    parseQuizDocument(content),
  );
  const contentRef = useRef(content);
  const skipContentSessionHydrateRef = useRef(false);
  const sessionHydratedRef = useRef(false);
  const sessionAutosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const docRef = useRef(doc);
  docRef.current = doc;
  const [userAnswers, setUserAnswers] = useState<
    Record<string, number | string>
  >({});
  const [graded, setGraded] = useState<Record<string, boolean>>({});
  const gradedRef = useRef(graded);
  gradedRef.current = graded;
  const [expVisible, setExpVisible] = useState<Record<string, boolean>>({});
  const [questionMemos, setQuestionMemos] = useState<Record<string, string>>(
    {},
  );
  const [wrongExps, setWrongExps] = useState<Record<string, string>>({});
  const wrongExpsRef = useRef(wrongExps);
  wrongExpsRef.current = wrongExps;
  const [wrongExpFocus, setWrongExpFocus] = useState<Record<string, number>>(
    {},
  );
  const [choiceAnalysisDock, setChoiceAnalysisDock] = useState<{
    questionId: string;
    option: number;
    mode: QuizChoiceAnalysisDockMode;
  } | null>(null);
  const [subjGrades, setSubjGrades] = useState<
    Record<string, SubjectiveGradeResult>
  >({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filter, setFilter] = useState<FilterMode>("all");
  const [tocOpen, setTocOpen] = useState(false);
  const [sourcesDockOpen, setSourcesDockOpen] = useState(false);
  const [previewSourcePath, setPreviewSourcePath] = useState<string | null>(
    null,
  );
  const [examStartConfirmOpen, setExamStartConfirmOpen] = useState(false);
  const [pendingSourceRemove, setPendingSourceRemove] = useState<string | null>(
    null,
  );
  const [busyId, setBusyId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editQ, setEditQ] = useState<QuizQuestion | null>(null);
  const [derivedSourceQ, setDerivedSourceQ] = useState<QuizQuestion | null>(
    null,
  );
  const [bulkOpen, setBulkOpen] = useState(false);
  const [sourcePicker, setSourcePicker] = useState<{
    paths: string[];
    scope: "file" | "question";
    questionId?: string;
    onDone?: (paths: string[]) => void;
  } | null>(null);
  const [freshQuestionIds, setFreshQuestionIds] = useState<
    Record<string, true>
  >({});
  const questionListRef = useRef<QuizQuestionListHandle | null>(null);
  const pendingScrollQuestionIdRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const quizScrollRef = useRef<HTMLDivElement>(null);
  const contentProgressRef = useRef<HTMLDivElement>(null);
  const contentScoreRef = useRef<HTMLDivElement>(null);
  const [timeLog, setTimeLog] = useState<QuizTimeLog>(() =>
    createEmptyQuizTimeLog(),
  );
  const [stopwatchHydrateKey, setStopwatchHydrateKey] = useState(0);

  const stopwatch = useQuizStopwatch({
    initialLog: timeLog,
    hydrateKey: stopwatchHydrateKey,
    onLogChange: setTimeLog,
  });

  const getElapsedMsRef = useRef<() => number>(() => 0);
  getElapsedMsRef.current = () => stopwatch.displayMs;

  const questionTimeTrackItems = useMemo(
    () =>
      doc.questions.map((q) => ({
        id: q.id,
        displayLabel: q.displayLabel,
      })),
    [doc.questions],
  );

  useQuizQuestionTimeLog({
    scrollRootRef: quizScrollRef,
    questions: questionTimeTrackItems,
    running: stopwatch.running,
    getElapsedMs: () => getElapsedMsRef.current(),
    timeLog,
    onLogChange: setTimeLog,
  });

  const buildSessionFromState = useCallback((): QuizPersistedSession => {
    return buildQuizSessionForPersist({
      questions: docRef.current.questions,
      userAnswers,
      gradedQuestions: graded,
      subjectiveGrades: subjGrades,
      isSubmitted,
      ...(isQuizTimeLogEmpty(timeLog) ? {} : { timeLog }),
      wrongChoiceExplanations: nestWrongChoiceExplanations(wrongExps),
      ...(isQuestionMemosEmpty(questionMemos) ? {} : { questionMemos }),
    });
  }, [
    userAnswers,
    graded,
    subjGrades,
    isSubmitted,
    timeLog,
    wrongExps,
    questionMemos,
  ]);

  const hasUnsavedQuizProgress = useCallback((): boolean => {
    if (!sessionHydratedRef.current || !isActiveFile) return false;
    const current = buildSessionFromState();
    if (!hasQuizInProgressSession(current)) return false;

    const editorSession = parseQuizDocument(contentRef.current).session;
    if (!areQuizPersistedSessionsEqual(current, editorSession)) return true;

    const savedContent =
      typeof currentFile?.content === "string" ? currentFile.content : "";
    if (!savedContent) return true;
    const savedSession = parseQuizDocument(savedContent).session;
    return !areQuizPersistedSessionsEqual(current, savedSession);
  }, [buildSessionFromState, currentFile?.content, isActiveFile]);

  const applySessionToState = useCallback(
    (session: QuizPersistedSession | null | undefined) => {
      const nextTimeLog = normalizeQuizTimeLog(session?.timeLog);
      setTimeLog(nextTimeLog);
      setStopwatchHydrateKey((k) => k + 1);
      if (!session || isQuizSessionEmpty(session)) {
        setUserAnswers({});
        setGraded({});
        setExpVisible({});
        setWrongExps({});
        setWrongExpFocus({});
        setChoiceAnalysisDock(null);
        setQuestionMemos({});
        setSubjGrades({});
        setIsSubmitted(false);
        return;
      }
      setUserAnswers({ ...session.userAnswers });
      setGraded({ ...session.gradedQuestions });
      setSubjGrades({ ...session.subjectiveGrades });
      setIsSubmitted(session.isSubmitted);
      setWrongExps(
        flatWrongChoiceExplanations(session.wrongChoiceExplanations),
      );
      setQuestionMemos({ ...(session.questionMemos ?? {}) });
      setWrongExpFocus({});
      setChoiceAnalysisDock(null);
      const nextExp: Record<string, boolean> = {};
      for (const [qid, done] of Object.entries(session.gradedQuestions)) {
        if (done) nextExp[qid] = true;
      }
      setExpVisible(nextExp);
    },
    [],
  );

  const persistDocument = useCallback(
    (nextDoc: QuizDocument, session: QuizPersistedSession) => {
      const md = serializeQuizDocument(
        nextDoc.config,
        nextDoc.questions,
        session,
      );
      skipContentSessionHydrateRef.current = true;
      contentRef.current = md;
      onChange(md);
    },
    [onChange],
  );

  const flushSessionToEditor = useCallback(() => {
    if (!sessionHydratedRef.current) return;
    if (sessionAutosaveTimerRef.current != null) {
      clearTimeout(sessionAutosaveTimerRef.current);
      sessionAutosaveTimerRef.current = null;
    }
    const session = buildSessionFromState();
    persistDocument(docRef.current, session);
  }, [buildSessionFromState, persistDocument]);

  const saveAfterAiGenerate = useCallback(
    async (wrongExpsSnapshot?: Record<string, string>) => {
      if (
        !loadQuizSettings().autoSaveOnAiGenerate ||
        typeof onSave !== "function"
      )
        return;
      if (wrongExpsSnapshot) {
        const session = buildQuizSessionForPersist({
          questions: docRef.current.questions,
          userAnswers,
          gradedQuestions: graded,
          subjectiveGrades: subjGrades,
          isSubmitted,
          ...(isQuizTimeLogEmpty(timeLog) ? {} : { timeLog }),
          wrongChoiceExplanations:
            nestWrongChoiceExplanations(wrongExpsSnapshot),
          ...(isQuestionMemosEmpty(questionMemos) ? {} : { questionMemos }),
        });
        persistDocument(docRef.current, session);
      } else {
        flushSessionToEditor();
      }
      await onSave(null, {
        skipCoverChangeCheck: true,
        skipSuffixCheck: true,
        contentOverride: contentRef.current,
      });
    },
    [
      flushSessionToEditor,
      graded,
      isSubmitted,
      onSave,
      persistDocument,
      subjGrades,
      timeLog,
      userAnswers,
      questionMemos,
    ],
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
    if (sessionAutosaveTimerRef.current != null) {
      clearTimeout(sessionAutosaveTimerRef.current);
    }
    sessionAutosaveTimerRef.current = setTimeout(() => {
      sessionAutosaveTimerRef.current = null;
      persistDocument(docRef.current, session);
    }, QUIZ_AUTOSAVE_DEBOUNCE_MS);
    return () => {
      if (sessionAutosaveTimerRef.current != null) {
        clearTimeout(sessionAutosaveTimerRef.current);
        sessionAutosaveTimerRef.current = null;
      }
    };
  }, [
    userAnswers,
    graded,
    subjGrades,
    isSubmitted,
    timeLog,
    wrongExps,
    questionMemos,
    buildSessionFromState,
    persistDocument,
  ]);

  const handleExtractWrongQuestions = useCallback(async () => {
    const built = buildWrongQuestionsExtractQuiz(docRef.current, {
      questions: docRef.current.questions,
      userAnswers,
      gradedQuestions: graded,
      isSubmitted,
      subjectiveGrades: subjGrades,
    });
    if (!built) {
      showToast({
        message: "추출할 틀린 문제가 없습니다. 채점 후 다시 시도하세요.",
        durationMs: 3500,
      });
      return;
    }

    const sourcePath = currentFile?.id;
    if (!sourcePath) return;

    const backend = getBackendForType(storageType);
    if (!backend?.writeText) {
      showToast({ message: "저장소에 쓸 수 없습니다.", durationMs: 3000 });
      return;
    }

    try {
      const newPath = await resolveWrongQuizExtractPath(
        sourcePath,
        async (path) => {
          if (!backend.head) return false;
          try {
            await backend.head(path);
            return true;
          } catch {
            return false;
          }
        },
      );
      await backend.writeText(
        newPath,
        built.markdown,
        "text/markdown; charset=utf-8",
      );
      await openAdvancedSearchFile(newPath);
      showToast({
        message: `틀린 문제 ${built.questions.length}개를 새 퀴즈로 추출했습니다.`,
        durationMs: 4000,
      });
    } catch (err) {
      reportQuizError("틀린문제 추출", err, "파일을 생성하지 못했습니다.");
    }
  }, [
    userAnswers,
    graded,
    isSubmitted,
    subjGrades,
    currentFile?.id,
    getBackendForType,
    storageType,
    openAdvancedSearchFile,
    showToast,
    reportQuizError,
  ]);

  useEffect(() => {
    if (!isActiveFile) return undefined;
    // Tauri: desktop close guard owns quit; WebView2 beforeunload can block window close.
    if (isTauriDesktopPlatform()) return undefined;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasUnsavedQuizProgress()) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isActiveFile, hasUnsavedQuizProgress]);

  const commitDoc = useCallback(
    (next: QuizDocument) => {
      const synced: QuizDocument = {
        ...next,
        config: syncQuizFileChoiceCount(next.config, next.questions),
      };
      docRef.current = synced;
      setDoc(synced);
      const session = buildSessionFromState();
      persistDocument(synced, session);
    },
    [buildSessionFromState, persistDocument],
  );

  const handleShuffleChoiceOptions = useCallback(() => {
    const current = docRef.current;
    const result = shuffleQuizChoiceOptions({
      questions: current.questions,
      userAnswers,
      wrongExps,
      wrongExpFocus,
    });
    if (result.shuffledQuestionCount <= 0) {
      showToast({
        message: "선택지가 2개 이상인 문제가 없습니다.",
        durationMs: 2800,
      });
      return;
    }

    setUserAnswers(result.userAnswers);
    setWrongExps(result.wrongExps);
    setWrongExpFocus(result.wrongExpFocus);
    setChoiceAnalysisDock((prev) => {
      if (!prev) return null;
      const nextOption = remapChoiceAnalysisDockOption(
        prev.questionId,
        prev.option,
        result.optionMapsByQuestionId,
      );
      if (nextOption == null) return null;
      return { ...prev, option: nextOption };
    });

    const synced: QuizDocument = {
      ...current,
      questions: result.questions,
      config: syncQuizFileChoiceCount(current.config, result.questions),
    };
    setDoc(synced);
    const session = buildQuizSessionForPersist({
      questions: synced.questions,
      userAnswers: result.userAnswers,
      gradedQuestions: graded,
      subjectiveGrades: subjGrades,
      isSubmitted,
      ...(isQuizTimeLogEmpty(timeLog) ? {} : { timeLog }),
      wrongChoiceExplanations: result.wrongChoiceExplanations,
      ...(isQuestionMemosEmpty(questionMemos) ? {} : { questionMemos }),
    });
    persistDocument(synced, session);

    showToast({
      message: `${result.shuffledQuestionCount}개 문항의 선택지 순서를 변경했습니다.`,
      durationMs: 3200,
    });
  }, [
    userAnswers,
    wrongExps,
    wrongExpFocus,
    graded,
    subjGrades,
    isSubmitted,
    timeLog,
    questionMemos,
    persistDocument,
    showToast,
  ]);

  useEffect(() => {
    if (!isActiveFile || !registerFileManagement) return;
    registerFileManagement({
      extractWrongQuestions: handleExtractWrongQuestions,
      shuffleChoiceOptions: handleShuffleChoiceOptions,
      hasUnsavedProgress: hasUnsavedQuizProgress,
      flushBeforeSave: flushSessionToEditor,
    });
    return () => registerFileManagement(null);
  }, [
    isActiveFile,
    registerFileManagement,
    handleExtractWrongQuestions,
    handleShuffleChoiceOptions,
    hasUnsavedQuizProgress,
    flushSessionToEditor,
  ]);

  const removeSourcePath = useCallback(
    (path: string) => {
      const current = docRef.current;
      commitDoc({
        ...current,
        config: removeQuizSourcePathFromConfig(current.config, path),
      });
      setPreviewSourcePath((prev) => (prev === path ? null : prev));
    },
    [commitDoc],
  );

  const handleToggleSourcePathEnabled = useCallback(
    (path: string, enabled: boolean) => {
      const current = docRef.current;
      commitDoc({
        ...current,
        config: setQuizSourcePathEnabled(current.config, path, enabled),
      });
    },
    [commitDoc],
  );

  const handleSourceRemove = useCallback(
    (path: string) => {
      if (readQuizSourceRemoveConfirm()) {
        setPendingSourceRemove(path);
        return;
      }
      removeSourcePath(path);
    },
    [removeSourcePath],
  );

  const {
    setQuizSourceDropActive,
    setQuizSourceDropHost,
    handleRegisterQuizSourceDrop,
  } = useChromeOwned();

  const modalDropHostRef = useRef<HTMLElement | null>(null);
  const dockDropHostRef = useRef<HTMLElement | null>(null);
  const quizDropHostRef = useRef<HTMLElement | null>(null);
  const mergeModalPathsRef = useRef<((paths: string[]) => void) | null>(null);
  const sourcePickerRef = useRef(sourcePicker);
  sourcePickerRef.current = sourcePicker;

  const syncQuizDropHost = useCallback(() => {
    const next = modalDropHostRef.current ?? dockDropHostRef.current;
    if (quizDropHostRef.current === next) return;
    quizDropHostRef.current = next;
    setQuizSourceDropHost(next);
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
      const merged = [
        ...new Set([...current.config.sourcePaths, ...incoming]),
      ].sort((a, b) => a.localeCompare(b));
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

  const headerMirrorEnabled = isActiveFile && scoreBoard.total > 0;
  const contentProgressInView = useQuizScrollSectionInView(
    quizScrollRef,
    contentProgressRef,
    headerMirrorEnabled,
    doc.questions.length,
  );
  const contentScoreInView = useQuizScrollSectionInView(
    quizScrollRef,
    contentScoreRef,
    headerMirrorEnabled,
    doc.questions.length,
  );

  const addQuestionStyleTemplate = useMemo(
    () => getQuizQuestionStyleTemplate(doc.questions, doc.config.choiceCount),
    [doc.questions, doc.config.choiceCount],
  );

  const sourcePathUsage = useMemo(
    () => countQuizSourcePathUsage(doc.config),
    [doc.config.sourcePaths, doc.config.disabledSourcePaths],
  );

  const wrongExpsByQuestion = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};
    for (const [key, value] of Object.entries(wrongExps)) {
      const underscore = key.indexOf("_");
      const questionId = underscore >= 0 ? key.slice(0, underscore) : key;
      const bucket = map[questionId] ?? (map[questionId] = {});
      bucket[key] = value;
    }
    return map;
  }, [wrongExps]);

  const choiceAnalysisQuestion = useMemo(() => {
    if (!choiceAnalysisDock) return null;
    return (
      doc.questions.find((q) => q.id === choiceAnalysisDock.questionId) || null
    );
  }, [choiceAnalysisDock, doc.questions]);

  const openChoiceAnalysisDock = useCallback(
    (questionId: string, option: number, mode: QuizChoiceAnalysisDockMode) => {
      setChoiceAnalysisDock({ questionId, option, mode });
    },
    [],
  );

  const profiles = llmProviderProfiles;

  const resetSession = useCallback(() => {
    setUserAnswers({});
    setGraded({});
    setExpVisible({});
    setWrongExps({});
    setWrongExpFocus({});
    setChoiceAnalysisDock(null);
    setSubjGrades({});
    setIsSubmitted(false);
    setTimeLog(createEmptyQuizTimeLog());
    setStopwatchHydrateKey((k) => k + 1);
    persistDocument(
      docRef.current,
      normalizeQuizPersistedSession({
        version: 1,
        ...(isQuestionMemosEmpty(questionMemos) ? {} : { questionMemos }),
      }),
    );
  }, [persistDocument, questionMemos]);

  const resetSessionAndStartExam = useCallback(() => {
    setUserAnswers({});
    setGraded({});
    setExpVisible({});
    setWrongExps({});
    setWrongExpFocus({});
    setChoiceAnalysisDock(null);
    setSubjGrades({});
    setIsSubmitted(false);
    const startedLog = appendQuizTimeLogEvent(
      createEmptyQuizTimeLog(),
      "start",
      0,
    );
    setTimeLog(startedLog);
    setStopwatchHydrateKey((k) => k + 1);
    persistDocument(
      docRef.current,
      normalizeQuizPersistedSession({
        version: 1,
        timeLog: startedLog,
        ...(isQuestionMemosEmpty(questionMemos) ? {} : { questionMemos }),
      }),
    );
  }, [persistDocument, questionMemos]);

  const hasAnsweredQuestions = useMemo(
    () => doc.questions.some((q) => hasQuizSessionAnswer(userAnswers[q.id])),
    [doc.questions, userAnswers],
  );

  const handleRequestExamStart = useCallback(() => {
    if (hasAnsweredQuestions) {
      setExamStartConfirmOpen(true);
      return;
    }
    stopwatch.start();
  }, [hasAnsweredQuestions, stopwatch]);

  useEffect(() => {
    if (!isActiveFile || !registerToolbar) return;
    registerToolbar(
      <QuizStopwatchToolbar
        stopwatch={stopwatch}
        onRequestStart={handleRequestExamStart}
      />,
    );
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
    handleRequestExamStart,
  ]);

  const retryQuestion = useCallback((q: QuizQuestion) => {
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
  }, []);

  const selectOption = useCallback((qid: string, opt: number) => {
    if (gradedRef.current[qid]) return;
    setUserAnswers((prev) => ({ ...prev, [qid]: opt }));
  }, []);

  const gradeChoice = useCallback(
    (q: QuizQuestion) => {
      if (stopwatch.examInProgress) return;
      setGraded((prev) => ({ ...prev, [q.id]: true }));
      setExpVisible((prev) => ({ ...prev, [q.id]: true }));
    },
    [stopwatch.examInProgress],
  );

  const gradeSubjective = useCallback(
    async (q: QuizQuestion, answerOverride?: string) => {
      if (stopwatch.examInProgress) return;
      const ans = String(
        answerOverride ?? userAnswers[q.id] ?? "",
      ).trim();
      if (!ans) {
        showToast({ message: "답안을 입력하세요.", durationMs: 2200 });
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
        if (answerOverride !== undefined) {
          setUserAnswers((prev) => ({ ...prev, [q.id]: answerOverride }));
        }
        showToast({ message: "주관식 채점 완료", durationMs: 2200 });
      } catch (err) {
        reportQuizError("채점 실패", err, "채점 실패");
      } finally {
        setBusyId(null);
      }
    },
    [
      ensureQuizLlmReady,
      profiles,
      reportQuizError,
      showToast,
      stopwatch.examInProgress,
      userAnswers,
    ],
  );

  const handleAnswerCommit = useCallback((questionId: string, value: string) => {
    setUserAnswers((prev) => {
      if (prev[questionId] === value) return prev;
      return { ...prev, [questionId]: value };
    });
  }, []);

  const handleEditQuestion = useCallback((question: QuizQuestion) => {
    setEditQ(question);
    setAddOpen(true);
  }, []);

  const handleToggleExplanation = useCallback((questionId: string) => {
    setExpVisible((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  }, []);

  const handleDerivedQuestion = useCallback((question: QuizQuestion) => {
    setDerivedSourceQ(question);
  }, []);

  const handleWrongExpFocusChange = useCallback(
    (questionId: string, option: number) => {
      setWrongExpFocus((prev) => ({ ...prev, [questionId]: option }));
    },
    [],
  );

  const handleMemoSave = useCallback((questionId: string, next: string) => {
    setQuestionMemos((prev) => {
      const trimmed = next.trim();
      if (!trimmed) {
        const { [questionId]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [questionId]: next };
    });
  }, []);

  const handleClearFreshQuestion = useCallback((questionId: string) => {
    setFreshQuestionIds((prev) => {
      if (!prev[questionId]) return prev;
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  }, []);

  const scrollToQuestionId = useCallback((questionId: string) => {
    if (questionListRef.current?.scrollToQuestionId(questionId)) return;
    pendingScrollQuestionIdRef.current = questionId;
  }, []);

  useEffect(() => {
    const pendingId = pendingScrollQuestionIdRef.current;
    if (!pendingId) return;
    if (!questionListRef.current?.scrollToQuestionId(pendingId)) return;
    pendingScrollQuestionIdRef.current = null;
  }, [doc.questions, filter, userAnswers, graded, isSubmitted, subjGrades]);


  const submitAll = async () => {
    if (stopwatch.examInProgress) {
      stopwatch.stop();
    }

    const pending = doc.questions.filter((q) => {
      if (!hasQuizSessionAnswer(userAnswers[q.id])) return false;
      if (graded[q.id]) return false;
      if (q.kind === "subjective" && subjGrades[q.id]) return false;
      return true;
    });

    if (pending.length === 0) {
      showToast({ message: "채점할 항목이 없습니다.", durationMs: 2200 });
      return;
    }

    const choicePending = pending.filter((q) => q.kind === "choice");
    const subjectivePending = pending.filter((q) => q.kind === "subjective");

    if (choicePending.length > 0) {
      setGraded((prev) => {
        const next = { ...prev };
        for (const q of choicePending) next[q.id] = true;
        return next;
      });
      setExpVisible((prev) => {
        const next = { ...prev };
        for (const q of choicePending) next[q.id] = true;
        return next;
      });
    }

    if (subjectivePending.length > 0) {
      if (!(await ensureQuizLlmReady())) return;
      for (const q of subjectivePending) {
        const ans = String(userAnswers[q.id] || "").trim();
        if (!ans) continue;
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
    }

    showToast({
      message: `${pending.length}개 항목 채점 완료`,
      durationMs: 2200,
    });
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
      const labelBase = String(q.displayLabel || q.id).split("-유사")[0] || "1";
      let max = 0;
      const re = new RegExp(
        `^${labelBase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-유사(\\d+)$`,
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
        step: "finalize",
        status: "running",
        detail: "문서에 추가 중…",
      });
      void persistGenerationLog(jobId, newQ.id);
      const idx = doc.questions.findIndex((x) => x.id === q.id);
      const questions = [...doc.questions];
      questions.splice(idx + 1, 0, newQ);
      setFilter("all");
      setFreshQuestionIds((prev) => ({ ...prev, [newQ.id]: true }));
      commitDoc({ ...doc, questions });
      genQueue.setJobResultQuestionId(jobId, newQ.id);
      genQueue.updateJobStep(jobId, {
        step: "finalize",
        status: "done",
        detail: displayLabel,
        llmResponse: JSON.stringify(newQ, null, 2),
      });
      genQueue.completeJob(jobId, displayLabel);
      void persistGenerationLog(jobId, newQ.id);
      showToast({ message: `${displayLabel} 유사문제 추가`, durationMs: 2500 });
      await saveAfterAiGenerate();
      window.setTimeout(() => {
        scrollToQuestionId(newQ.id);
      }, 80);
    } catch (err) {
      const message =
        (err instanceof Error ? err.message : "") || "유사문제 생성 실패";
      genQueue.failJob(jobId, message);
      void persistGenerationLog(jobId, logKey);
      reportQuizError("유사문제 생성 실패", err, "유사문제 생성 실패");
    } finally {
      setBusyId(null);
    }
  };

  const handleGenerateQuestionSections = async (
    q: QuizQuestion,
    target: QuizQuestionSectionsTarget,
  ) => {
    const llmOpts = quizLlm.llmOpts;
    if (!(await ensureQuizLlmReady(llmOpts))) return;

    const missingPoint =
      (target === "point" || target === "both") &&
      isWeakSimilarQuestionPoint(q.point || "");
    const missingExplanation =
      (target === "explanation" || target === "both") &&
      isWeakSimilarQuestionExplanation(q.explanation || "");
    if (!missingPoint && !missingExplanation) {
      showToast({
        message: "이미 접근 Point와 해설이 있습니다.",
        durationMs: 2200,
      });
      return;
    }

    const busyKey = `sections-${q.id}`;
    setBusyId(busyKey);
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const sources = resolveEffectiveSourcePaths(doc.config, q);
      const result = await generateQuestionSections({
        profiles,
        question: q,
        missingPoint,
        missingExplanation,
        sourcePaths: sources,
        readText,
        ...llmOpts,
        signal: ac.signal,
      });
      if (!result.point && !result.explanation) {
        showToast({
          message: "생성된 내용이 없습니다. 다시 시도하세요.",
          durationMs: 2500,
        });
        return;
      }
      const questions = doc.questions.map((item) => {
        if (item.id !== q.id) return item;
        return {
          ...item,
          ...(result.point ? { point: result.point } : {}),
          ...(result.explanation ? { explanation: result.explanation } : {}),
        };
      });
      commitDoc({ ...doc, questions });
      setExpVisible((prev) => ({ ...prev, [q.id]: true }));
      const parts: string[] = [];
      if (result.point) parts.push("접근 Point");
      if (result.explanation) parts.push("해설");
      showToast({
        message: `${parts.join("·")} 생성 완료`,
        durationMs: 2200,
      });
      await saveAfterAiGenerate();
    } catch (err) {
      if (ac.signal.aborted) return;
      reportQuizError("접근 Point·해설 생성 실패", err, "생성 실패");
    } finally {
      setBusyId(null);
    }
  };

  const handleDerivedGenerate = async (
    q: QuizQuestion,
    target: QuizDerivedQuestionTarget,
  ) => {
    if (!(await ensureQuizLlmReady())) return;
    setBusyId(`derived-${q.id}`);
    const sources = resolveEffectiveSourcePaths(doc.config, q);
    const jobId = genQueue.createDerivedJob({
      displayLabel: String(q.displayLabel || q.id),
      preview: q.question,
      hasRag: sources.length > 0,
    });
    const logKey = jobId;
    try {
      const generated = await generateDerivedQuestion({
        profiles,
        question: q,
        config: doc.config,
        target,
        sourcePaths: sources,
        readText,
        onStep: (update) => handleGenerationStep(jobId, logKey, update),
      });
      const displayLabel = nextDerivedDisplayLabel(
        doc.questions,
        String(q.displayLabel || q.id),
      );
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
        step: "finalize",
        status: "running",
        detail: "문서에 추가 중…",
      });
      void persistGenerationLog(jobId, newQ.id);
      const idx = doc.questions.findIndex((x) => x.id === q.id);
      const questions = [...doc.questions];
      questions.splice(idx + 1, 0, newQ);
      setFilter("all");
      setFreshQuestionIds((prev) => ({ ...prev, [newQ.id]: true }));
      commitDoc({ ...doc, questions });
      genQueue.setJobResultQuestionId(jobId, newQ.id);
      genQueue.updateJobStep(jobId, {
        step: "finalize",
        status: "done",
        detail: displayLabel,
        llmResponse: JSON.stringify(newQ, null, 2),
      });
      genQueue.completeJob(jobId, displayLabel);
      void persistGenerationLog(jobId, newQ.id);
      setDerivedSourceQ(null);
      showToast({ message: `${displayLabel} 파생문제 추가`, durationMs: 2500 });
      await saveAfterAiGenerate();
      window.setTimeout(() => {
        scrollToQuestionId(newQ.id);
      }, 80);
    } catch (err) {
      const message =
        (err instanceof Error ? err.message : "") || "파생문제 생성 실패";
      genQueue.failJob(jobId, message);
      void persistGenerationLog(jobId, logKey);
      reportQuizError("파생문제 생성 실패", err, "파생문제 생성 실패");
    } finally {
      setBusyId(null);
    }
  };

  const resolveWrongExpFocusOption = useCallback(
    (q: QuizQuestion, userSelected?: number): number => {
      const stored = wrongExpFocus[q.id];
      const max = q.options?.length || 0;
      if (stored != null && stored >= 1 && stored <= max) return stored;
      if (userSelected != null && userSelected >= 1 && userSelected <= max) {
        return userSelected;
      }
      return 1;
    },
    [wrongExpFocus],
  );

  const handleWrongExp = async (
    q: QuizQuestion,
    selected: number,
    userInstructions: string,
    mode: QuizChoiceAnalysisDockMode = "create",
  ) => {
    const isCorrectOption = selected === q.answer;
    const llmOpts = quizLlm.llmOpts;
    if (mode === "followup") {
      const userQuestion = String(userInstructions || "").trim();
      if (!userQuestion) {
        showToast({ message: "추가 질문을 입력하세요.", durationMs: 2200 });
        return;
      }
      if (!(await ensureQuizLlmReady(llmOpts))) return;
      const key = wrongChoiceExplanationKey(q.id, selected);
      const previous = String(wrongExpsRef.current[key] || "").trim();
      if (!previous) {
        showToast({ message: "먼저 분석을 생성하세요.", durationMs: 2200 });
        return;
      }
      setBusyId(key);
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;
      const fallbackTitle = userQuestion.slice(0, 60);
      try {
        const text = await generateChoiceAnalysisFollowUp({
          profiles,
          question: q,
          selectedOption: selected,
          existingAnalysis: previous,
          userQuestion,
          ...llmOpts,
          signal: ac.signal,
          onChunk: (accumulated) => {
            const merged = mergeStreamingFollowUpChoiceAnalysis(
              previous,
              accumulated,
            );
            setWrongExps((prev) => ({ ...prev, [key]: merged }));
          },
        });
        const block = ensureChoiceAnalysisFollowUpHeader(text, fallbackTitle);
        const finalText = appendFollowUpChoiceAnalysis(
          previous,
          block,
          fallbackTitle,
        );
        const nextWrongExps = { ...wrongExpsRef.current, [key]: finalText };
        wrongExpsRef.current = nextWrongExps;
        setWrongExps(nextWrongExps);
        setChoiceAnalysisDock(null);
        await saveAfterAiGenerate(nextWrongExps);
      } catch (err) {
        if (ac.signal.aborted) return;
        setWrongExps((prev) => ({ ...prev, [key]: previous }));
        reportQuizError("추가 질문 답변 실패", err, "추가 질문 답변 실패");
      } finally {
        setBusyId(null);
      }
      return;
    }

    const instructions = resolveChoiceAnalysisUserInstructions(
      userInstructions,
      isCorrectOption,
    );
    if (!(await ensureQuizLlmReady(llmOpts))) return;
    const key = wrongChoiceExplanationKey(q.id, selected);
    const previous =
      mode === "regenerate"
        ? String(wrongExpsRef.current[key] || "").trim()
        : "";
    setBusyId(key);
    if (mode !== "regenerate") {
      setWrongExps((prev) => ({ ...prev, [key]: "" }));
    }
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const text = await generateWrongChoiceExplanation({
        profiles,
        question: q,
        selectedOption: selected,
        userInstructions: instructions,
        ...llmOpts,
        signal: ac.signal,
        onChunk: (accumulated) => {
          const merged =
            mode === "regenerate"
              ? mergeStreamingRegeneratedChoiceAnalysis(previous, accumulated)
              : accumulated;
          setWrongExps((prev) => ({ ...prev, [key]: merged }));
        },
      });
      const finalText =
        mode === "regenerate"
          ? appendRegeneratedChoiceAnalysis(previous, text)
          : text;
      const nextWrongExps = { ...wrongExpsRef.current, [key]: finalText };
      wrongExpsRef.current = nextWrongExps;
      setWrongExps(nextWrongExps);
      setChoiceAnalysisDock(null);
      await saveAfterAiGenerate(nextWrongExps);
    } catch (err) {
      if (ac.signal.aborted) return;
      setWrongExps((prev) => {
        const next = { ...prev };
        if (mode === "regenerate" && previous) {
          next[key] = previous;
        } else if (!String(next[key] || "").trim()) {
          delete next[key];
        }
        return next;
      });
      reportQuizError("오답 해설 실패", err, "오답 해설 실패");
    } finally {
      setBusyId(null);
    }
  };

  const handleGenerateFromSources = async (topic: string) => {
    const total = doc.config.sourcePaths.length;
    const sources = getActiveSourcePaths(doc.config);
    if (!total) {
      setSourcesDockOpen(true);
      showToast({
        message: "파일 근거 문서를 먼저 선택하세요.",
        durationMs: 2800,
      });
      return;
    }
    if (!sources.length) {
      setSourcesDockOpen(true);
      showToast({
        message:
          "사용 중인 근거 문서가 없습니다. 체크박스로 근거를 활성화하세요.",
        durationMs: 3200,
      });
      return;
    }
    if (!(await ensureQuizLlmReady())) return;
    setBusyId("gen-sources");
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    const jobId = genQueue.createSourceJob({
      preview: doc.questions[0]?.question || "근거 기반 출제",
      topic,
    });
    const logKey = jobId;
    try {
      const generated = await generateQuestionsFromSources({
        profiles,
        config: doc.config,
        sourcePaths: sources,
        topic,
        kind: "choice",
        count: 1,
        exampleQuestions: doc.questions,
        readText,
        signal: ac.signal,
        onStep: (update) => handleGenerationStep(jobId, logKey, update),
      });
      if (!generated.length) {
        throw new Error("생성된 문항이 없습니다.");
      }
      const labelBase =
        Number.parseInt(nextDisplayLabel(doc.questions), 10) || 1;
      const stamp = Date.now();
      const added = generated.map((g, i) => ({
        ...g,
        id: `gen-src-${stamp}-${i}`,
        displayLabel: String(labelBase + i),
        isGenerated: true as const,
        ...(sources.length ? { sourcePaths: [...sources] } : {}),
      }));
      const firstId = added[0]?.id;
      const resultLabels = added.map((q) => q.displayLabel).join(", ");
      const persistKey = firstId || jobId;
      genQueue.updateJobStep(jobId, {
        step: "finalize",
        status: "running",
        detail: "문서에 추가 중…",
      });
      void persistGenerationLog(jobId, persistKey);
      const questions = [...doc.questions, ...added];
      setFilter("all");
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
        step: "finalize",
        status: "done",
        detail: resultLabels,
        llmResponse: JSON.stringify(added, null, 2),
      });
      genQueue.completeJob(jobId, resultLabels);
      void persistGenerationLog(jobId, persistKey);
      showToast({
        message: `근거 기반 문제 ${added.length}개 추가`,
        durationMs: 2500,
      });
      await saveAfterAiGenerate();
      if (firstId) {
        window.setTimeout(() => {
          scrollToQuestionId(firstId);
        }, 80);
      }
    } catch (err) {
      if (ac.signal.aborted) {
        genQueue.failJob(jobId, "취소됨");
        void persistGenerationLog(jobId, logKey);
        return;
      }
      const message =
        (err instanceof Error ? err.message : "") || "문제 생성 실패";
      genQueue.failJob(jobId, message);
      void persistGenerationLog(jobId, logKey);
      reportQuizError("문제 생성 실패", err, "문제 생성 실패");
    } finally {
      setBusyId(null);
    }
  };

  const handleGenerateFromSourcesRef = useRef(handleGenerateFromSources);
  handleGenerateFromSourcesRef.current = handleGenerateFromSources;
  const handleSourceTopicGenerate = useCallback((topic: string) => {
    void handleGenerateFromSourcesRef.current(topic);
  }, []);

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
        const choiceCount = resolveQuestionChoiceCount(
          draft,
          doc.config.choiceCount,
        );
        const next: QuizAddQuestionForm = {
          kind: fixed.kind,
          displayLabel: editQ.displayLabel,
          question: fixed.question,
          point: fixed.point,
          explanation: fixed.explanation,
          ...(form.sourcePaths?.length
            ? { sourcePaths: form.sourcePaths }
            : {}),
        };
        if (fixed.kind === "subjective") {
          next.answerStyle = fixed.answerStyle === "essay" ? "essay" : "short";
          next.modelAnswer = fixed.modelAnswer || "";
        } else {
          const opts = [...(fixed.options || [])];
          next.options = resizeChoiceOptions(opts, choiceCount);
          next.answer = fixed.answer && fixed.answer >= 1 ? fixed.answer : 1;
        }
        showToast({
          message: "문항을 교정했습니다. 내용을 확인한 뒤 저장하세요.",
          durationMs: 3200,
        });
        return next;
      } catch (err) {
        if (ac.signal.aborted) return null;
        reportQuizError("문제 고치기 실패", err, "문제 고치기 실패");
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

  const imageHydrationValue = useMemo(
    () => ({
      getPresignedUrl: onResolveWikiImageUrl,
      currentNotePath: currentFile?.id ?? null,
    }),
    [currentFile?.id, onResolveWikiImageUrl],
  );

  const handleWrongExpRef = useRef(handleWrongExp);
  handleWrongExpRef.current = handleWrongExp;
  const handleSimilarRef = useRef(handleSimilar);
  handleSimilarRef.current = handleSimilar;
  const handleGenerateQuestionSectionsRef = useRef(handleGenerateQuestionSections);
  handleGenerateQuestionSectionsRef.current = handleGenerateQuestionSections;
  const choiceAnalysisQuestionRef = useRef(choiceAnalysisQuestion);
  choiceAnalysisQuestionRef.current = choiceAnalysisQuestion;
  const choiceAnalysisDockRef = useRef(choiceAnalysisDock);
  choiceAnalysisDockRef.current = choiceAnalysisDock;
  const derivedSourceQRef = useRef(derivedSourceQ);
  derivedSourceQRef.current = derivedSourceQ;
  const handleDerivedGenerateRef = useRef(handleDerivedGenerate);
  handleDerivedGenerateRef.current = handleDerivedGenerate;

  const onSimilarQuestion = useCallback((question: QuizQuestion) => {
    void handleSimilarRef.current(question);
  }, []);

  const onGenerateQuestionSections = useCallback(
    (question: QuizQuestion, target: QuizQuestionSectionsTarget) => {
      void handleGenerateQuestionSectionsRef.current(question, target);
    },
    [],
  );

  const handleChoiceAnalysisGenerate = useCallback((prompt: string) => {
    const question = choiceAnalysisQuestionRef.current;
    const dock = choiceAnalysisDockRef.current;
    if (!question || !dock) return;
    void handleWrongExpRef.current(question, dock.option, prompt, dock.mode);
  }, []);

  const closeChoiceAnalysisDock = useCallback(() => {
    const dock = choiceAnalysisDockRef.current;
    if (!dock) return;
    const busyKey = wrongChoiceExplanationKey(dock.questionId, dock.option);
    if (busyId === busyKey) return;
    setChoiceAnalysisDock(null);
  }, [busyId]);

  const closeDerivedDock = useCallback(() => {
    const q = derivedSourceQRef.current;
    if (q && busyId === `derived-${q.id}`) return;
    setDerivedSourceQ(null);
  }, [busyId]);

  const onDerivedSubmit = useCallback((target: QuizDerivedQuestionTarget) => {
    const q = derivedSourceQRef.current;
    if (!q) return;
    void handleDerivedGenerateRef.current(q, target);
  }, []);

  const closeTocDock = useCallback(() => setTocOpen(false), []);

  const handleTocNavigate = useCallback(
    (questionId: string) => {
      setFilter("all");
      scrollToQuestionId(questionId);
    },
    [scrollToQuestionId],
  );

  const handleOpenFileSourcePicker = useCallback(() => {
    setSourcePicker({
      paths: docRef.current.config.sourcePaths,
      scope: "file",
    });
  }, []);

  const handleClosePreviewDock = useCallback(() => {
    setPreviewSourcePath(null);
  }, []);

  if (!isActiveFile) {
    return (
      <div className="quiz-pane flex flex-1 items-center justify-center text-sm text-gray-400">
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
  const examInProgress = stopwatch.examInProgress;

  const headerScoreStrip = (
    <div
      className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-odp-muted"
      aria-label={`정답 ${scoreBoard.correct}, 부분정답 ${scoreBoard.partial}, 오답 ${scoreBoard.wrong}`}
    >
      <span>
        정답{" "}
        <span className="font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
          {scoreBoard.correct}
        </span>
      </span>
      <span className="text-slate-300 dark:text-odp-borderSoft" aria-hidden>
        |
      </span>
      <span>
        부분{" "}
        <span className="font-bold tabular-nums text-amber-600 dark:text-amber-400">
          {scoreBoard.partial}
        </span>
      </span>
      <span className="text-slate-300 dark:text-odp-borderSoft" aria-hidden>
        |
      </span>
      <span>
        오답{" "}
        <span className="font-bold tabular-nums text-rose-500 dark:text-rose-400">
          {scoreBoard.wrong}
        </span>
      </span>
    </div>
  );

  return (
    <QuizImageHydrationProvider value={imageHydrationValue}>
      <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
        <div className="quiz-pane relative flex min-h-0 min-w-0 max-w-full flex-1 flex-col overflow-hidden bg-slate-50 dark:bg-odp-bg">
          <div className="min-w-0 shrink-0 border-b border-slate-200 bg-white/90 px-4 py-3 dark:border-odp-borderSoft dark:bg-odp-surface">
            <div className="flex min-w-0 flex-wrap items-center gap-2 overflow-hidden">
              <div className="mr-auto flex min-w-0 flex-1 basis-full items-center gap-2 sm:basis-auto sm:gap-3">
                <ClipboardList className="shrink-0 text-blue-600" size={18} />
                <span className="shrink-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong">
                  퀴즈 모드
                </span>
                {scoreBoard.total > 0 ? (
                  <div
                    className={`${QUIZ_HEADER_INLINE_SLOT_CLASS} flex-1`}
                    aria-hidden={!showHeaderProgress}
                  >
                    <AnimatePresence initial={false}>
                      {showHeaderProgress ? (
                        <Motion.div
                          key="quiz-header-progress"
                          className="flex w-full min-w-0 items-center gap-2 overflow-hidden sm:gap-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <p className="hidden shrink-0 overflow-hidden text-xs whitespace-nowrap text-slate-600 dark:text-odp-muted md:inline">
                            총{" "}
                            <span className="font-semibold text-slate-800 dark:text-odp-fgStrong">
                              {scoreBoard.total}
                            </span>
                            문항 중{" "}
                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                              {scoreBoard.answered}
                            </span>
                            문항 풀이
                          </p>
                          <span className="shrink-0 text-xs font-semibold whitespace-nowrap tabular-nums text-slate-600 dark:text-odp-muted md:hidden">
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
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                          </div>
                          <span className="shrink-0 text-[11px] font-medium whitespace-nowrap tabular-nums text-slate-500 dark:text-odp-muted">
                            {progressPct}%
                          </span>
                        </Motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : null}
              </div>
              {scoreBoard.total > 0 ? (
                <div
                  className={`${QUIZ_HEADER_INLINE_SLOT_CLASS} shrink-0`}
                  aria-hidden={!showHeaderScore}
                >
                  <AnimatePresence initial={false}>
                    {showHeaderScore ? (
                      <Motion.div
                        key="quiz-header-score"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        {headerScoreStrip}
                      </Motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ) : null}
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
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={resetSession}
              >
                <RotateCcw size={14} />
                초기화
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => void submitAll()}
              >
                <CheckCheck size={14} />
                전체 채점
              </Button>
              <Button
                type="button"
                variant={sourcePathUsage.active > 0 ? "primary" : "secondary"}
                size="sm"
                aria-pressed={sourcesDockOpen}
                onClick={() => {
                  setSourcesDockOpen((open) => {
                    if (open) setPreviewSourcePath(null);
                    return !open;
                  });
                }}
              >
                <Library size={14} />
                근거
              </Button>
              <Button
                type="button"
                variant={tocOpen ? "primary" : "tertiary"}
                size="sm"
                aria-label="목차"
                aria-pressed={tocOpen}
                onClick={() => setTocOpen((v) => !v)}
              >
                <List size={14} />
              </Button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 overflow-hidden">
            <div className="relative min-h-0 min-w-0 flex-1">
              <div
                ref={quizScrollRef}
                className="h-full min-h-0 overflow-y-auto px-4 py-4"
              >
                <div className="mx-auto max-w-3xl space-y-4">
                  <QuizLlmSessionBar
                    profiles={profiles}
                    profileId={quizLlm.profileId}
                    model={quizLlm.model}
                    onProfileIdChange={quizLlm.onProfileIdChange}
                    onModelChange={quizLlm.onModelChange}
                  />
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
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex gap-4 text-center text-xs">
                        <div>
                          <div className="text-xl font-black text-slate-800 dark:text-odp-fgStrong">
                            {scoreBoard.scorePercent != null
                              ? `${scoreBoard.scorePercent}점`
                              : "-"}
                          </div>
                          <div className="text-[10px] text-slate-400">점수</div>
                        </div>
                        <div
                          ref={contentScoreRef}
                          className="flex gap-4 text-center text-xs"
                        >
                          <div>
                            <div className="text-lg font-bold text-emerald-600">
                              {scoreBoard.correct}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              정답
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-amber-600">
                              {scoreBoard.partial}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              부분
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-rose-500">
                              {scoreBoard.wrong}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              오답
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 rounded-xl bg-slate-100 p-1 text-xs dark:bg-odp-bgSoft">
                        {(
                          [
                            ["all", "전체"],
                            ["wrong", "오답만"],
                            ["unanswered", "미풀이"],
                          ] as const
                        ).map(([id, label]) => (
                          <button
                            key={id}
                            type="button"
                            className={`rounded-lg px-2.5 py-1 font-medium ${
                              filter === id
                                ? "bg-white shadow-sm dark:bg-odp-surface"
                                : "text-slate-600 dark:text-odp-muted"
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
                        <Button
                          type="button"
                          variant="primary"
                          onClick={() => setAddOpen(true)}
                        >
                          <Plus size={14} />
                          문제 추가
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setBulkOpen(true)}
                        >
                          마크다운 가져오기
                        </Button>
                      </div>
                    </div>
                  ) : null}

                  {doc.questions.length > 0 ? (
                    <QuizQuestionList
                      ref={questionListRef}
                      questions={doc.questions}
                      filter={filter}
                      scrollRef={quizScrollRef}
                      userAnswers={userAnswers}
                      graded={graded}
                      subjGrades={subjGrades}
                      isSubmitted={isSubmitted}
                      expVisible={expVisible}
                      wrongExpsByQuestion={wrongExpsByQuestion}
                      questionMemos={questionMemos}
                      freshQuestionIds={freshQuestionIds}
                      busyId={busyId}
                      examInProgress={examInProgress}
                      resolveWrongExpFocusOption={resolveWrongExpFocusOption}
                      onAnswerCommit={handleAnswerCommit}
                      onSelectOption={selectOption}
                      onEditQuestion={handleEditQuestion}
                      onGradeChoice={gradeChoice}
                      onGradeSubjective={gradeSubjective}
                      onRetry={retryQuestion}
                      onToggleExplanation={handleToggleExplanation}
                      onSimilar={onSimilarQuestion}
                      onDerived={handleDerivedQuestion}
                      onGenerateSections={onGenerateQuestionSections}
                      onWrongExpFocusChange={handleWrongExpFocusChange}
                      onOpenAnalysisDock={openChoiceAnalysisDock}
                      onMemoSave={handleMemoSave}
                      onClearFresh={handleClearFreshQuestion}
                    />
                  ) : null}
                </div>
              </div>
            </div>

            <QuizDerivedQuestionDock
              open={derivedSourceQ != null}
              question={derivedSourceQ}
              defaultChoiceCount={doc.config.choiceCount || 4}
              busy={
                derivedSourceQ != null &&
                busyId === `derived-${derivedSourceQ.id}`
              }
              onClose={closeDerivedDock}
              onSubmit={onDerivedSubmit}
            />

            <QuizChoiceAnalysisDock
              open={Boolean(choiceAnalysisDock && choiceAnalysisQuestion)}
              question={choiceAnalysisQuestion}
              option={choiceAnalysisDock?.option ?? null}
              mode={choiceAnalysisDock?.mode ?? "create"}
              existingAnalysis={
                choiceAnalysisDock && choiceAnalysisDock.mode === "followup"
                  ? String(
                      wrongExps[
                        wrongChoiceExplanationKey(
                          choiceAnalysisDock.questionId,
                          choiceAnalysisDock.option,
                        )
                      ] || "",
                    )
                  : ""
              }
              llmProfiles={profiles}
              profileId={quizLlm.profileId}
              model={quizLlm.model}
              onProfileIdChange={quizLlm.onProfileIdChange}
              onModelChange={quizLlm.onModelChange}
              busy={
                choiceAnalysisDock != null &&
                busyId ===
                  wrongChoiceExplanationKey(
                    choiceAnalysisDock.questionId,
                    choiceAnalysisDock.option,
                  )
              }
              onClose={closeChoiceAnalysisDock}
              onGenerate={handleChoiceAnalysisGenerate}
            />

            <QuizSourcePreviewDock
              path={previewSourcePath}
              onClose={handleClosePreviewDock}
              loadDocument={loadVaultPreviewDocument}
              onOpenDocument={openSourceDocument}
              onOpenInNewTab={openSourceInNewTab}
            />

            <QuizSourcesDock
              open={sourcesDockOpen}
              docConfig={doc.config}
              sourcePathUsage={sourcePathUsage}
              busyGenSources={busyId === "gen-sources"}
              onClose={closeSourcesDock}
              onPreview={handlePreviewSource}
              onRemove={handleSourceRemove}
              onToggleEnabled={handleToggleSourcePathEnabled}
              onOpenPicker={handleOpenFileSourcePicker}
              onGenerateFromTopic={handleSourceTopicGenerate}
              onDropHostChange={handleDockDropHostChange}
            />

            <QuizTocDock
              open={tocOpen}
              questions={doc.questions}
              userAnswers={userAnswers}
              gradedQuestions={graded}
              isSubmitted={isSubmitted}
              subjectiveGrades={subjGrades}
              onClose={closeTocDock}
              onNavigate={handleTocNavigate}
            />
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
                    questions: doc.questions.map((x) =>
                      x.id === editQ.id ? q : x,
                    ),
                  });
                } else {
                  commitDoc({ ...doc, questions: [...doc.questions, q] });
                }
                setEditQ(null);
              }}
              onOpenSourcePicker={(paths, onDone) =>
                setSourcePicker({ paths, scope: "question", onDone })
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
                if (mode === "replace") resetSession();
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
                } else if (sourcePicker.scope === "file") {
                  commitDoc({
                    ...doc,
                    config: { ...doc.config, sourcePaths: paths },
                  });
                }
                setSourcePicker(null);
              }}
            />
          ) : null}

          <ConfirmModal
            isOpen={examStartConfirmOpen}
            title="시험 시작"
            message="초기화하고 시험을 시작하시겠습니까?"
            confirmLabel="시작"
            cancelLabel="취소"
            variant="danger"
            onConfirm={() => {
              setExamStartConfirmOpen(false);
              resetSessionAndStartExam();
            }}
            onCancel={() => setExamStartConfirmOpen(false)}
          />

          <ConfirmModal
            isOpen={pendingSourceRemove != null}
            title="근거 문서 제거"
            message={
              pendingSourceRemove
                ? `「${pendingSourceRemove}」을(를) 파일 근거에서 제거할까요?`
                : ""
            }
            confirmLabel="제거"
            cancelLabel="취소"
            variant="danger"
            onConfirm={() => {
              if (pendingSourceRemove) removeSourcePath(pendingSourceRemove);
              setPendingSourceRemove(null);
            }}
            onCancel={() => setPendingSourceRemove(null)}
          />

          <QuizGenerationQueuePanel
            jobs={genQueue.jobs}
            isOpen={genQueue.panelOpen}
            size={genQueue.panelSize}
            onClose={genQueue.closePanel}
            onResize={genQueue.setPanelSize}
            onRemoveJob={genQueue.removeJob}
            onClearFinished={genQueue.clearFinishedJobs}
            onUserEngage={genQueue.markPanelUserEngaged}
            onPointerEngageChange={genQueue.markPanelPointerEngaged}
            onFocusEngageChange={genQueue.markPanelFocusEngaged}
          />

          {!genQueue.panelOpen && genQueue.jobs.length > 0 ? (
            <button
              type="button"
              className="fixed bottom-4 right-4 z-10049 flex items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-2 text-xs font-semibold text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 dark:border-violet-700/60"
              onClick={genQueue.openPanel}
              onMouseEnter={() => genQueue.markPanelPointerEngaged(true)}
              onMouseLeave={() => genQueue.markPanelPointerEngaged(false)}
              onFocus={() => genQueue.markPanelFocusEngaged(true)}
              onBlur={() => genQueue.markPanelFocusEngaged(false)}
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
      </Tooltip.Provider>
    </QuizImageHydrationProvider>
  );
}

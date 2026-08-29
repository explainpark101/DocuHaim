import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAlertModal } from '@/contexts/AlertModalContext';
import { useUnsavedNavigationGuard } from '@/hooks/useUnsavedNavigationGuard';
import { parseExportPdfPathFromAppPathname } from '@/utils/appHref';
import {
  DEFAULT_DOCUMENT_SETTINGS_META,
  parseDocumentSettingsMeta,
} from '@/utils/documentSettingsMeta';
import {
  formatNoteCoverIssues,
  parseNoteCover,
  stripNoteCoverComment,
} from '@/utils/noteCover';
import { setPendingPrintReturnState } from '@/utils/printNavigationState';
import { savePrintMarkdownToStorage } from '@/utils/printMarkdownSave';
import type { PrintPageLayout } from '@/utils/printPageLayout';
import { savePrintPageLayout } from '@/utils/printPageLayout';
import type { ExportPdfPreviewRefs } from '@/pages/exportPdf/hooks/useExportPdfPreviewRefs';
import type {
  ExportPdfDocumentFile,
  ExportPDFPageProps,
} from '@/pages/exportPdf/exportPdfTypes';

type UseExportPdfDocumentArgs = ExportPDFPageProps & {
  refs: Pick<ExportPdfPreviewRefs, 'previewValueRef' | 'currentFileRef'>;
  printLayoutRef: React.RefObject<PrintPageLayout>;
};

export function useExportPdfDocument({
  documentValue = '',
  documentFile = null,
  openCoverEdit: openCoverEditProp = false,
  refs,
  printLayoutRef,
}: UseExportPdfDocumentArgs) {
  const location = useLocation();
  const navigate = useNavigate();
  const { showAlert } = useAlertModal();

  const locationState =
    location.state && typeof location.state === 'object'
      ? (location.state as Record<string, unknown>)
      : null;
  const routeExportPath = parseExportPdfPathFromAppPathname(location.pathname);
  const initialValue =
    typeof locationState?.value === 'string'
      ? locationState.value
      : typeof documentValue === 'string'
        ? documentValue
        : '';
  const initialFile =
    (locationState?.currentFile as ExportPdfDocumentFile | undefined) ??
    documentFile ??
    null;
  const openCoverEdit = Boolean(locationState?.openCoverEdit ?? openCoverEditProp);

  const [previewValue, setPreviewValue] = useState(() => initialValue);
  const coverIssuesAlertSigRef = useRef('');
  const [savedValue, setSavedValue] = useState(() => initialValue);
  const [currentFile, setCurrentFile] = useState<ExportPdfDocumentFile>(() => initialFile);
  const handoffWrittenRef = useRef(false);
  const { previewValueRef, currentFileRef } = refs;
  previewValueRef.current = previewValue;
  currentFileRef.current = currentFile;

  const [isSaving, setIsSaving] = useState(false);
  const hydratedFileIdRef = useRef<string | null>(
    locationState?.value != null ? (initialFile?.id ?? null) : null,
  );

  useEffect(() => {
    if (locationState?.value != null) return;
    if (!documentFile?.id) return;
    if (hydratedFileIdRef.current === documentFile.id) return;
    hydratedFileIdRef.current = documentFile.id;
    setCurrentFile(documentFile);
    const nextValue = typeof documentValue === 'string' ? documentValue : '';
    setPreviewValue(nextValue);
    setSavedValue(nextValue);
  }, [documentFile, documentValue, locationState]);

  const documentSettings = useMemo(() => {
    const { meta } = parseDocumentSettingsMeta(previewValue);
    return meta ?? DEFAULT_DOCUMENT_SETTINGS_META;
  }, [previewValue]);

  const bodyMarkdown = useMemo(
    () => stripNoteCoverComment(previewValue),
    [previewValue],
  );

  const parsedCoverResult = useMemo(
    () => parseNoteCover(previewValue),
    [previewValue],
  );
  const parsedCover = parsedCoverResult.cover;
  const activeCover = parsedCover;
  const hasEnabledCover = Boolean(activeCover?.enabled);

  useEffect(() => {
    const { issues } = parsedCoverResult;
    if (!issues.length) {
      coverIssuesAlertSigRef.current = '';
      return;
    }
    const sig = formatNoteCoverIssues(issues);
    if (sig === coverIssuesAlertSigRef.current) return;
    coverIssuesAlertSigRef.current = sig;
    showAlert({
      title: '표지 데이터 오류',
      message: `표지(note-cover) 데이터에 문제가 있습니다.\n\n${sig}`,
    });
  }, [parsedCoverResult, showAlert]);

  const writeEditorHandoff = useCallback(
    (editorContent: string, file: ExportPdfDocumentFile = currentFileRef.current) => {
      handoffWrittenRef.current = true;
      setPendingPrintReturnState({
        currentFile: file,
        editorContent: typeof editorContent === 'string' ? editorContent : '',
      });
    },
    [currentFileRef],
  );

  useLayoutEffect(() => {
    handoffWrittenRef.current = false;
    return () => {
      if (handoffWrittenRef.current) return;
      setPendingPrintReturnState({
        currentFile: currentFileRef.current,
        editorContent: previewValueRef.current ?? '',
      });
    };
  }, [currentFileRef, previewValueRef]);

  useEffect(() => {
    if (location.state == null) {
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

  const isDirty = previewValue !== savedValue;
  const isDirtyRef = useRef(isDirty);
  isDirtyRef.current = isDirty;
  const isPrintDirty = useCallback(() => isDirtyRef.current, []);
  const {
    isBlocked: isLeaveBlocked,
    proceed: proceedLeave,
    reset: resetLeave,
  } = useUnsavedNavigationGuard({ isDirty: isPrintDirty });

  const handleSave = useCallback(async () => {
    if (!currentFile?.id || isSaving) return false;
    setIsSaving(true);
    try {
      const printLayout = printLayoutRef.current;
      savePrintPageLayout(printLayout);
      const nextFile = {
        ...currentFile,
        content: previewValue,
      };
      writeEditorHandoff(previewValue, nextFile);
      setCurrentFile(nextFile);
      const result = await savePrintMarkdownToStorage(currentFile, previewValue);
      setSavedValue(previewValue);
      if (result.mode === 'pending-only') {
        alert('세션 노트는 뒤로 가면 편집기에 반영됩니다.');
      }
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      alert(`저장 실패: ${message}`);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [currentFile, isSaving, previewValue, printLayoutRef, writeEditorHandoff]);

  const handleBack = useCallback(() => {
    if (!isDirtyRef.current) {
      writeEditorHandoff(previewValueRef.current, currentFileRef.current);
    }
    const path = currentFileRef.current?.id || routeExportPath;
    if (path) {
      navigate(`/view/${path}`);
      return;
    }
    navigate(-1);
  }, [currentFileRef, navigate, previewValueRef, routeExportPath, writeEditorHandoff]);

  const handleNavGuardSaveAndLeave = useCallback(async () => {
    const ok = await handleSave();
    if (!ok) return;
    proceedLeave();
  }, [handleSave, proceedLeave]);

  const handleNavGuardDiscardAndLeave = useCallback(() => {
    writeEditorHandoff(savedValue, currentFile);
    proceedLeave();
  }, [currentFile, proceedLeave, savedValue, writeEditorHandoff]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 's') return;
      event.preventDefault();
      void handleSave();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSave]);

  return {
    locationState,
    routeExportPath,
    openCoverEdit,
    previewValue,
    setPreviewValue,
    savedValue,
    currentFile,
    setCurrentFile,
    previewValueRef,
    currentFileRef,
    isSaving,
    isDirty,
    documentSettings,
    bodyMarkdown,
    parsedCoverResult,
    parsedCover,
    activeCover,
    hasEnabledCover,
    writeEditorHandoff,
    handleSave,
    handleBack,
    isLeaveBlocked,
    resetLeave,
    handleNavGuardSaveAndLeave,
    handleNavGuardDiscardAndLeave,
  };
}

export type ExportPdfDocumentState = ReturnType<typeof useExportPdfDocument>;

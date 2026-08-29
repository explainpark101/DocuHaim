import { useRef, useState, useEffect, useLayoutEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { motion as Motion, useReducedMotion } from 'motion/react';
import {
  IconCloud,
  IconChevronDown,
  IconDownload,
  IconFileCode,
  IconFilePlus,
  IconFolder,
  IconMenu,
  IconMessage,
  IconRefresh,
  IconSave,
  IconTrash,
  IconEye,
} from '@/components/icons';
import AudioLevelIndicator from '@/components/AudioLevelIndicator';
import RecordingDropdownButton from '@/components/RecordingDropdownButton';
import { EDITOR_TYPE_NOVEL, loadEditorType } from '@/utils/editorTypeSettings';
import RecordingSyncView from '@/components/RecordingSyncView';
import RecordingPlayer from '@/components/RecordingPlayer';
import Button from '@/components/Button';
import { Tooltip } from 'radix-ui';
import { ArrowLeftRight, ClipboardCopy, ClipboardList, FileText, ImagePlus, ListTree, Loader2, PenLine, Settings, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import PrintButton from '@/components/PrintButton';
import SessionOpenPanel from '@/components/SessionOpenPanel';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import DocumentSettingsModal from '@/components/DocumentSettingsModal';
import { useAlertModal } from '@/contexts/AlertModalContext';
import {
  convertAllMarkdownImagesToWiki,
  countStandardMarkdownImages,
  hasStandardMarkdownImages,
} from '@/utils/convertMarkdownImagesToWiki';
import { copyCurrentPageAsFormattedHtml } from '@/utils/copyFormattedPageHtml';
import {
  collectImgbbCopyCandidates,
  ensureMermaidSvgMarkup,
  findMermaidHostByReplaceKey,
} from '@/utils/imgbbCopyCandidates';
import { uploadImageToImgbb } from '@/utils/imgbbUpload';
import {
  batchUpsertRemoteImageComments,
  lookupRemoteImageUrl,
} from '@/utils/remoteImageComment';
import { convertSvgToPngFile } from '@/utils/svgToPng';
import {
  DEFAULT_DOCUMENT_SETTINGS_META,
  parseDocumentSettingsMeta,
  upsertDocumentSettingsMeta,
} from '@/utils/documentSettingsMeta';
import {
  emptyHomeContainerVariants,
  emptyHomeItemVariants,
  emptyHomeMenuContainerVariants,
} from '@/components/emptyHomeMotion';
import { isQuizMdPath } from '@/utils/quiz/quizPath';
import {
  isQuizAppPathname,
  quizPathnameForStoragePath,
  viewPathnameForStoragePath,
} from '@/utils/appHref';

const MarkdownEditor = lazy(() => import('@/components/MarkdownEditor'));
const NovelMarkdownEditor = lazy(() => import('@/components/NovelMarkdownEditor'));
const MonacoTextEditor = lazy(() => import('@/components/MonacoTextEditor'));
const HtmlSvgPreviewEditor = lazy(() => import('@/components/HtmlSvgPreviewEditor'));
const QuizPane = lazy(() => import('@/components/quiz/QuizPane'));

function EditorPaneSuspenseFallback() {
  return (
    <div className="flex h-full min-h-0 flex-1 items-center justify-center bg-white text-sm text-gray-400 dark:bg-odp-surface dark:text-odp-muted">
      에디터 로딩 중…
    </div>
  );
}

const QUIZ_MODE_TOGGLE_BTN_CLASS =
  '!bg-amber-500 !text-white hover:!bg-amber-600 focus-visible:!ring-amber-500 dark:!bg-amber-600 dark:hover:!bg-amber-500';

export default function EditorPane({
  currentFile,
  editorContent,
  onChangeEditor,
  onSave,
  isSaving,
  onRefreshFromDisk,
  isRefreshingFromDisk = false,
  onPullFromRemote,
  isPullingFromRemote = false,
  onRequestDelete,
  editedFileName = '',
  setEditedFileName,
  onRenameFullName,
  onRequestSuffixChangeConfirmForBlur,
  onRequestClose,
  onRequestMove,
  onViewUnsupportedAsText,
  onRequestDownload,
  onShareToChatWithMyself,
  theme = 'light',
  previewOnly = false,
  isMobileLayout = false,
  sidebarOpen = true,
  sidebarCollapsed = false,
  onOpenSidebar,
  onRequestCreateFile,
  onOpenChatWithMyself,
  onOpenSessionFiles,
  onOpenSessionDirectory,
  onDropSessionTransfer,
  onDropSessionPaths,
  isOpeningSession = false,
  onSaveSessionToNote,
  onRequestSessionTransformDownload,
  isRecording = false,
  audioLevel = 0,
  onToggleRecording,
  recordingPipelineStatus = '',
  recordingsList = [],
  selectedRecordingKey = null,
  onSelectRecording,
  recordingAudioUrl = '',
  recordingSyncData = [],
  onUploadImage,
  isUploadingEditorImage = false,
  uploadImagePercent = 0,
  onCancelUploadImage,
  onResolveWikiImageUrl,
  onOpenViewPath,
  snippetConfig = { snippets: [] },
  editorType,
  hideRecordingCompanions = false,
  llmProviderProfiles = [],
  getImgbbApiKey,
  isActiveFile = true,
}) {
  const effectiveEditorType = editorType ?? loadEditorType();
  const [pdfIframeKey, setPdfIframeKey] = useState(0);
  const pdfIframeRef = useRef(null);
  const [recordingViewMode, setRecordingViewMode] = useState(false);
  const [showRecordingToolbar, setShowRecordingToolbar] = useState(false);
  const recordingAudioRef = useRef(null);
  const [fileManagementOpen, setFileManagementOpen] = useState(false);
  const fileManagementRef = useRef(null);
  const [novelTocVisible, setNovelTocVisible] = useState(true);
  const editorTopChromeRef = useRef(null);
  const novelFlushBeforeSaveRef = useRef(null);
  const convertAllImagesToWikiRef = useRef(null);
  const [convertAllImagesConfirmOpen, setConvertAllImagesConfirmOpen] = useState(false);
  const [convertingAllImages, setConvertingAllImages] = useState(false);
  const [copyingFormattedHtml, setCopyingFormattedHtml] = useState(false);
  const [imgbbCopyConfirmOpen, setImgbbCopyConfirmOpen] = useState(false);
  const [imgbbCopyCandidates, setImgbbCopyCandidates] = useState([]);
  const [imgbbCopyUploading, setImgbbCopyUploading] = useState(false);
  const [mobileTocOverlayTopPx, setMobileTocOverlayTopPx] = useState(null);
  const [documentSettingsOpen, setDocumentSettingsOpen] = useState(false);
  const [quizToolbarNode, setQuizToolbarNode] = useState(null);
  const { showAlert } = useAlertModal();
  const location = useLocation();
  const navigate = useNavigate();

  const isQuizFile = isQuizMdPath(currentFile?.id || currentFile?.name);
  const quizMode = isQuizFile && isQuizAppPathname(location.pathname);

  const toggleQuizEditMode = useCallback(() => {
    const path = currentFile?.id;
    if (!path || !isQuizFile) return;
    if (quizMode) {
      navigate(viewPathnameForStoragePath(path));
    } else {
      navigate(quizPathnameForStoragePath(path));
    }
  }, [currentFile?.id, isQuizFile, quizMode, navigate]);

  useEffect(() => {
    if (!quizMode) setQuizToolbarNode(null);
  }, [quizMode, currentFile?.id]);

  const documentSettings = useMemo(() => {
    const { meta } = parseDocumentSettingsMeta(editorContent ?? '');
    return meta ?? DEFAULT_DOCUMENT_SETTINGS_META;
  }, [editorContent]);

  const handleToolbarSave = useCallback(() => {
    novelFlushBeforeSaveRef.current?.();
    onSave?.();
  }, [onSave]);

  const handleToolbarRefreshFromDisk = useCallback(() => {
    novelFlushBeforeSaveRef.current?.();
    onRefreshFromDisk?.();
  }, [onRefreshFromDisk]);

  const handlePullFromRemote = useCallback(() => {
    novelFlushBeforeSaveRef.current?.();
    onPullFromRemote?.();
  }, [onPullFromRemote]);

  const handleApplyDocumentSettings = useCallback((nextSettings) => {
    const nextMarkdown = upsertDocumentSettingsMeta(editorContent ?? '', nextSettings);
    onChangeEditor?.(nextMarkdown);
    setDocumentSettingsOpen(false);
    setFileManagementOpen(false);
  }, [editorContent, onChangeEditor]);

  const finishCopyFormattedHtml = useCallback(async (imageSrcReplacements = null) => {
    await copyCurrentPageAsFormattedHtml(document, {
      imageSrcReplacements: imageSrcReplacements || undefined,
    });
    setFileManagementOpen(false);
    showAlert({
      title: '서식 유지 복사',
      message: imageSrcReplacements?.size
        ? 'ImgBB 업로드 후 원본에 원격 링크를 저장하고, 페이지를 HTML 서식으로 복사했습니다.'
        : '현재 페이지를 HTML 서식과 이미지 포함 형태로 복사했습니다.',
    });
  }, [showAlert]);

  const handleCopyFormattedHtml = useCallback(async () => {
    if (copyingFormattedHtml || imgbbCopyUploading) return;
    setCopyingFormattedHtml(true);
    try {
      novelFlushBeforeSaveRef.current?.();
      const candidates = collectImgbbCopyCandidates();
      if (candidates.length > 0) {
        setImgbbCopyCandidates(candidates);
        setImgbbCopyConfirmOpen(true);
        return;
      }
      await finishCopyFormattedHtml();
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : '서식 유지 복사에 실패했습니다.';
      showAlert({ title: '서식 유지 복사', message });
    } finally {
      setCopyingFormattedHtml(false);
    }
  }, [copyingFormattedHtml, finishCopyFormattedHtml, imgbbCopyUploading, showAlert]);

  const handleConfirmImgbbCopyUpload = useCallback(async () => {
    if (imgbbCopyUploading) return;
    setImgbbCopyUploading(true);
    try {
      const apiKey =
        typeof getImgbbApiKey === 'function'
          ? String((await Promise.resolve(getImgbbApiKey())) || '').trim()
          : '';
      if (!apiKey) {
        throw new Error('ImgBB API 키가 없습니다. 설정에서 키를 저장하세요.');
      }
      const markdown = String(editorContent ?? '');
      const replacements = new Map();
      /** @type {Array<{ kind: import('@/utils/remoteImageComment').RemoteImageKind, key: string, occurrence: number, url: string }>} */
      const sidecarItems = [];

      for (const candidate of imgbbCopyCandidates) {
        const cached = await lookupRemoteImageUrl(markdown, {
          kind: candidate.remoteKind,
          key: candidate.remoteKey,
          occurrence: candidate.occurrence,
        });
        if (cached) {
          replacements.set(candidate.replaceKey, cached);
          continue;
        }

        let uploadImage = candidate.fetchSrc;
        if (candidate.kind === 'mermaid') {
          const host = findMermaidHostByReplaceKey(document, candidate.replaceKey);
          if (!host) {
            throw new Error(`Mermaid 차트를 찾지 못했습니다: ${candidate.label}`);
          }
          const svgMarkup = await ensureMermaidSvgMarkup(host);
          const pngFile = await convertSvgToPngFile(svgMarkup, 'mermaid.png');
          uploadImage = pngFile;
        }

        const uploaded = await uploadImageToImgbb({
          apiKey,
          image: uploadImage,
          name:
            candidate.kind === 'base64' || candidate.kind === 'mermaid'
              ? 'image'
              : undefined,
        });
        replacements.set(candidate.replaceKey, uploaded.url);
        sidecarItems.push({
          kind: candidate.remoteKind,
          key: candidate.remoteKey,
          occurrence: candidate.occurrence,
          url: uploaded.url,
        });
      }

      if (sidecarItems.length > 0 && typeof onChangeEditor === 'function') {
        const patched = await batchUpsertRemoteImageComments(markdown, sidecarItems);
        if (patched.updated) {
          onChangeEditor(patched.markdown);
        }
      }

      setImgbbCopyConfirmOpen(false);
      setImgbbCopyCandidates([]);
      await finishCopyFormattedHtml(replacements);
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : 'ImgBB 업로드 후 복사에 실패했습니다.';
      showAlert({ title: '서식 유지 복사', message });
    } finally {
      setImgbbCopyUploading(false);
    }
  }, [
    editorContent,
    finishCopyFormattedHtml,
    getImgbbApiKey,
    imgbbCopyCandidates,
    imgbbCopyUploading,
    onChangeEditor,
    showAlert,
  ]);

  const handleSkipImgbbCopyUpload = useCallback(async () => {
    if (imgbbCopyUploading) return;
    setImgbbCopyConfirmOpen(false);
    setImgbbCopyCandidates([]);
    setCopyingFormattedHtml(true);
    try {
      await finishCopyFormattedHtml();
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : '서식 유지 복사에 실패했습니다.';
      showAlert({ title: '서식 유지 복사', message });
    } finally {
      setCopyingFormattedHtml(false);
    }
  }, [finishCopyFormattedHtml, imgbbCopyUploading, showAlert]);

  const handleCancelImgbbCopy = useCallback(() => {
    if (imgbbCopyUploading) return;
    setImgbbCopyConfirmOpen(false);
    setImgbbCopyCandidates([]);
  }, [imgbbCopyUploading]);

  const openConvertAllImagesConfirm = useCallback(() => {
    setFileManagementOpen(false);
    setConvertAllImagesConfirmOpen(true);
  }, []);

  const handleConfirmConvertAllImages = useCallback(async () => {
    if (convertingAllImages) return;
    setConvertingAllImages(true);
    try {
      let result;
      if (typeof convertAllImagesToWikiRef.current === 'function') {
        result = await convertAllImagesToWikiRef.current();
      } else {
        novelFlushBeforeSaveRef.current?.();
        if (typeof onUploadImage !== 'function') {
          throw new Error('이미지 업로드를 사용할 수 없습니다.');
        }
        result = await convertAllMarkdownImagesToWiki(editorContent ?? '', {
          currentNotePath: currentFile?.id ?? null,
          uploadFiles: onUploadImage,
        });
        if (result.markdown !== editorContent) {
          onChangeEditor?.(result.markdown);
        }
      }
      setConvertAllImagesConfirmOpen(false);
      const failedCount = result?.failed?.length ?? 0;
      const converted = result?.converted ?? 0;
      if (converted === 0 && failedCount === 0) {
        showAlert({
          title: 'wiki image 변환',
          message: '변환할 일반 이미지가 없습니다.',
        });
      } else if (failedCount > 0) {
        showAlert({
          title: 'wiki image 변환',
          message: `${converted}개 변환 완료, ${failedCount}개는 실패했습니다.`,
        });
      } else {
        showAlert({
          title: 'wiki image 변환',
          message: `${converted}개 이미지를 wiki image로 바꿨습니다.`,
        });
      }
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : 'wiki image로 변환하지 못했습니다.';
      showAlert({ title: 'wiki image 변환', message });
    } finally {
      setConvertingAllImages(false);
    }
  }, [
    convertingAllImages,
    currentFile?.id,
    editorContent,
    onChangeEditor,
    onUploadImage,
    showAlert,
  ]);

  useLayoutEffect(() => {
    if (!isMobileLayout) return;
    const el = editorTopChromeRef.current;
    if (!el) return;
    const update = () => {
      const node = editorTopChromeRef.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      setMobileTocOverlayTopPx(r.bottom);
    };
    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [
    isMobileLayout,
    currentFile?.viewer,
    showRecordingToolbar,
    recordingsList.length,
    recordingViewMode,
    effectiveEditorType,
    novelTocVisible,
    currentFile?.id,
  ]);

  useEffect(() => {
    if (!fileManagementOpen) return;
    const handleClickOutside = (e) => {
      if (fileManagementRef.current && !fileManagementRef.current.contains(e.target)) {
        setFileManagementOpen(false);
      }
    };
    const t = window.setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [fileManagementOpen]);

  useEffect(() => {
    if (!hideRecordingCompanions) return;
    setShowRecordingToolbar(false);
    setRecordingViewMode(false);
  }, [hideRecordingCompanions]);

  const formatRecordingLabel = (r) => {
    const d = new Date(r.timestamp);
    return d.toLocaleString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getExt = (fileName) => {
    if (!fileName || typeof fileName !== 'string') return '';
    const lastDot = fileName.lastIndexOf('.');
    return lastDot > 0 ? fileName.slice(lastDot) : '';
  };

  const showMobileSidebarOpen =
    isMobileLayout && !sidebarOpen && typeof onOpenSidebar === 'function';
  const desktopCollapsedTopBarPaddingClass =
    !isMobileLayout && sidebarCollapsed ? 'md:pl-14' : '';
  const reduceMotion = useReducedMotion();
  if (!currentFile) {
    return (
      <div className="flex min-h-0 flex-1 flex-col text-gray-400">
        {showMobileSidebarOpen && (
          <div className="flex shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-3 py-2 dark:border-odp-bgSofter dark:bg-odp-surface">
            <button
              type="button"
              aria-label="사이드바 열기"
              onClick={onOpenSidebar}
              className="inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
            >
              <IconMenu size={22} />
            </button>
          </div>
        )}
        <Motion.div
          className="flex flex-1 flex-col items-center justify-center px-4"
          variants={emptyHomeContainerVariants}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
        >
          <Motion.div
            className="flex items-center gap-3 sm:gap-4"
            variants={emptyHomeItemVariants}
          >
            <img
              src={`${import.meta.env.BASE_URL}vite.svg`}
              alt=""
              width={56}
              height={56}
              className="h-12 w-12 shrink-0 drop-shadow-[0_8px_18px_rgba(15,23,42,0.28)] sm:h-14 sm:w-14 dark:drop-shadow-[0_0_22px_rgba(56,189,248,0.55)]"
              decoding="async"
            />
            <h1 className="font-display text-3xl font-bold tracking-tight text-gray-800 dark:text-odp-fgStrong sm:text-4xl">
              Docu Haim
            </h1>
          </Motion.div>
          <Motion.p
            className="mt-4 text-center text-gray-400 dark:text-odp-muted"
            variants={emptyHomeItemVariants}
          >
            사이드바에서 파일을 선택하거나, 로컬 파일을 열어 편집하세요.
          </Motion.p>
          <Motion.div
            className="mt-6 flex w-full justify-center"
            variants={emptyHomeMenuContainerVariants}
          >
            {typeof onOpenSessionFiles === 'function' && typeof onDropSessionTransfer === 'function' ? (
              <SessionOpenPanel
                onOpenFiles={onOpenSessionFiles}
                onOpenDirectoryHandle={onOpenSessionDirectory}
                onDropTransfer={onDropSessionTransfer}
                onDropPaths={onDropSessionPaths}
                onRequestCreateFile={onRequestCreateFile}
                onOpenSidebar={onOpenSidebar}
                onOpenChatWithMyself={onOpenChatWithMyself}
                isBusy={isOpeningSession}
              />
            ) : (
              <Motion.div
                className="mx-auto flex w-full max-w-xs flex-col gap-2"
                variants={emptyHomeMenuContainerVariants}
              >
                {typeof onRequestCreateFile === 'function' ? (
                  <Motion.div variants={emptyHomeItemVariants}>
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={onRequestCreateFile}
                    >
                      <IconFilePlus size={16} />
                      파일 생성
                    </Button>
                  </Motion.div>
                ) : null}
                {typeof onOpenSidebar === 'function' ? (
                  <Motion.div variants={emptyHomeItemVariants}>
                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      className="w-full"
                      onClick={onOpenSidebar}
                    >
                      <IconMenu size={16} />
                      사이드바 열기
                    </Button>
                  </Motion.div>
                ) : null}
                {typeof onOpenChatWithMyself === 'function' ? (
                  <Motion.div variants={emptyHomeItemVariants}>
                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      className="w-full"
                      onClick={onOpenChatWithMyself}
                    >
                      <IconMessage size={16} />
                      나와의 채팅 열기
                    </Button>
                  </Motion.div>
                ) : null}
              </Motion.div>
            )}
          </Motion.div>
        </Motion.div>
      </div>
    );
  }

  const viewer = currentFile.viewer || 'markdown';
  const isSessionMarkdown =
    currentFile.type === 'session' &&
    (viewer === 'markdown' || /\.(md|markdown)$/i.test(currentFile.name || currentFile.id || ''));
  const isEditableViewer =
    viewer === 'markdown' || viewer === 'json' || viewer === 'raw' || viewer === 'html' || viewer === 'svg';
  const hasUnsavedChanges = isEditableViewer && currentFile.content !== editorContent;
  const showConvertAllImagesToWiki =
    viewer === 'markdown' &&
    !previewOnly &&
    hasStandardMarkdownImages(editorContent);

  const currentName = currentFile.name || '';

  // Keep-alive inactive tabs: defer heavy viewers until the tab is active.
  // Background tab restore used to mount every CodeMirror/Monaco at once when loads finished.
  if (!isActiveFile && viewer !== 'loading') {
    const label = (editedFileName ?? '').trim() || currentName || currentFile.id || '';
    return (
      <div className="flex min-h-0 min-w-0 max-h-full flex-1 flex-col overflow-hidden bg-white dark:bg-odp-surface">
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 px-4 text-center">
          <FileText size={20} className="text-gray-400 dark:text-odp-muted" aria-hidden />
          {label ? (
            <p className="max-w-full truncate text-sm font-medium text-gray-700 dark:text-odp-fg">
              {label}
            </p>
          ) : null}
          <p className="text-xs text-gray-500 dark:text-odp-muted">
            탭을 선택하면 편집기가 열립니다
          </p>
        </div>
      </div>
    );
  }

  const handleFileNameBlur = () => {
    if (!currentFile || typeof setEditedFileName !== 'function') return;
    const trimmed = (editedFileName ?? '').trim();
    if (!trimmed) {
      setEditedFileName(currentName);
      return;
    }
    if (trimmed.includes('/')) {
      alert("파일명에는 '/' 문자를 사용할 수 없습니다.");
      setEditedFileName(currentName);
      return;
    }
    if (trimmed === currentName) return;
    if (getExt(trimmed) !== getExt(currentName)) {
      onRequestSuffixChangeConfirmForBlur?.();
      return;
    }
    onRenameFullName?.(trimmed);
  };

  const handlePdfRefresh = () => {
    try {
      if (pdfIframeRef.current?.contentWindow) {
        pdfIframeRef.current.contentWindow.location.reload();
      }
    } catch {
      setPdfIframeKey((k) => k + 1);
    }
  };
  
  return (
    <div className="flex min-h-0 min-w-0 max-h-full flex-1 flex-col overflow-hidden">
      <div ref={editorTopChromeRef} className="shrink-0 flex flex-col">
      <div
        data-app-editor-navbar=""
        className={`relative z-10100 flex min-h-14 w-full shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-white px-3 dark:border-odp-bgSofter dark:bg-odp-surface sm:px-6 pointer-events-auto transition-[padding] duration-300 ease-in-out ${desktopCollapsedTopBarPaddingClass}`}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 font-medium text-gray-700 dark:text-odp-fgStrong sm:gap-3">
          {showMobileSidebarOpen && (
            <button
              type="button"
              aria-label="사이드바 열기"
              onClick={onOpenSidebar}
              className="inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
            >
              <IconMenu size={22} />
            </button>
          )}
          {isRecording ? (
            <AudioLevelIndicator level={audioLevel} size={16} />
          ) : currentFile.type === 's3' || currentFile.type === 'webdav' ? (
            typeof onPullFromRemote === 'function' && isEditableViewer ? (
              <button
                type="button"
                onClick={handlePullFromRemote}
                disabled={isSaving || isPullingFromRemote}
                aria-label={isPullingFromRemote ? '원격 동기화 중' : '원격에서 가져오기'}
                className="inline-flex shrink-0 touch-manipulation items-center justify-center rounded-md p-0.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:text-odp-muted dark:hover:bg-odp-bgSoft dark:hover:text-odp-fg"
              >
                <IconCloud className={isPullingFromRemote ? 'animate-pulse' : undefined} />
              </button>
            ) : (
              <IconCloud />
            )
          ) : currentFile.type === 'session' ? (
            <IconDownload />
          ) : (
            <IconFolder />
          )}
          <div className="flex min-w-0 flex-1 items-baseline gap-1">
            {hasUnsavedChanges && <span className="text-red-500 text-xl leading-none shrink-0">*</span>}
            <input
              className="min-w-[3em] w-full border-none bg-transparent text-sm font-medium outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 md:text-base"
              value={editedFileName ?? ''}
              onChange={(e) => setEditedFileName?.(e.target.value)}
              onBlur={handleFileNameBlur}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === 's') {
                  e.preventDefault();
                  handleToolbarSave();
                }
              }}
              placeholder="파일명"
            />
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 overflow-visible touch-manipulation">
          {quizMode && quizToolbarNode ? (
            quizToolbarNode
          ) : (
            typeof onToggleRecording === 'function' && (
            <RecordingDropdownButton
              isRecording={isRecording}
              audioLevel={audioLevel}
              hasRecordings={recordingsList.length > 0}
              recordingPipelineStatus={recordingPipelineStatus}
              onStartRecording={onToggleRecording}
              onStopRecording={onToggleRecording}
              onShowToolbar={() => setShowRecordingToolbar(true)}
            />
            )
          )}
          {viewer === 'pdf' && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handlePdfRefresh}
              title="PDF 뷰어 새로고침"
            >
              <IconRefresh size={14} />
              <span className="hidden md:inline"> 새로고침</span>
            </Button>
          )}
          {typeof onRefreshFromDisk === 'function' && isEditableViewer && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleToolbarRefreshFromDisk}
              disabled={isSaving || isRefreshingFromDisk}
              title={isRefreshingFromDisk ? '새로고침 중...' : '디스크에서 새로고침'}
              className="shrink-0 touch-manipulation max-md:min-h-[44px] max-md:min-w-[44px] max-md:px-3 max-md:py-2.5"
            >
              <IconRefresh size={14} className={isRefreshingFromDisk ? 'animate-spin' : undefined} />
              <span className="hidden md:inline"> {isRefreshingFromDisk ? '새로고침 중...' : '새로고침'}</span>
            </Button>
          )}
          {(currentFile.type !== 'session' || isSessionMarkdown || onRequestDownload) && (
          <div ref={fileManagementRef} className="relative">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setFileManagementOpen((v) => !v)}
              title="파일 관리"
            >
              <IconMenu size={14} />
              <span className="hidden md:inline"> 파일 관리</span>
              <IconChevronDown size={12} className="ml-0.5" />
            </Button>
            {fileManagementOpen && (
              <div
                className="absolute right-0 top-full z-100 mt-1 min-w-[200px] rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface"
                role="menu"
              >
                {currentFile.type === 'session' && isEditableViewer && typeof onSaveSessionToNote === 'function' ? (
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-bgSoft"
                    onClick={() => {
                      onSaveSessionToNote();
                      setFileManagementOpen(false);
                    }}
                  >
                    <IconSave size={14} />
                    내 Haim에 저장
                  </button>
                ) : null}
                {isSessionMarkdown && typeof onRequestSessionTransformDownload === 'function' ? (
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-bgSoft"
                    onClick={() => {
                      onRequestSessionTransformDownload();
                      setFileManagementOpen(false);
                    }}
                  >
                    <ArrowLeftRight size={14} />
                    변형 다운로드
                  </button>
                ) : null}
                {currentFile.type === 'session' && onRequestDownload ? (
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-bgSoft"
                    onClick={() => {
                      onRequestDownload();
                      setFileManagementOpen(false);
                    }}
                  >
                    <IconDownload size={14} />
                    다운로드
                  </button>
                ) : null}
                {currentFile.type !== 'session' ? (
                <button
                  type="button"
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-bgSoft flex items-center gap-2"
                  onClick={() => {
                    onRequestMove?.();
                    setFileManagementOpen(false);
                  }}
                >
                  <IconFolder size={14} />
                  파일 이동
                </button>
                ) : null}
                {onRequestDownload && currentFile.type !== 'session' && (
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-bgSoft flex items-center gap-2"
                    onClick={() => {
                      onRequestDownload?.();
                      setFileManagementOpen(false);
                    }}
                  >
                    <IconDownload size={14} />
                    다운로드
                  </button>
                )}
                {viewer === 'markdown' ? (
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-bgSoft flex items-center gap-2"
                    onClick={() => {
                      void handleCopyFormattedHtml();
                    }}
                    disabled={copyingFormattedHtml}
                  >
                    {copyingFormattedHtml ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <ClipboardCopy size={14} />
                    )}
                    서식 유지 복사
                  </button>
                ) : null}
                {currentFile.type !== 'session' ? (
                <button
                  type="button"
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-bgSoft flex items-center gap-2"
                  onClick={() => {
                    setDocumentSettingsOpen(true);
                    setFileManagementOpen(false);
                  }}
                >
                  <Settings size={14} />
                  문서 설정
                </button>
                ) : null}
                {onShareToChatWithMyself && currentFile.type !== 'session' && (
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-bgSoft flex items-center gap-2"
                    onClick={() => {
                      onShareToChatWithMyself?.();
                      setFileManagementOpen(false);
                    }}
                  >
                    <IconMessage size={14} />
                    나와의 채팅에 공유하기
                  </button>
                )}
                {showConvertAllImagesToWiki ? (
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-bgSoft flex items-center gap-2"
                    onClick={openConvertAllImagesConfirm}
                    disabled={convertingAllImages || isUploadingEditorImage}
                  >
                    {convertingAllImages || isUploadingEditorImage ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <ImagePlus size={14} />
                    )}
                    모든 image를 wiki image로
                  </button>
                ) : null}
                {currentFile.type !== 'session' ? (
                <button
                  type="button"
                  className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                  onClick={() => {
                    onRequestDelete?.();
                    setFileManagementOpen(false);
                  }}
                >
                  <IconTrash size={14} />
                  삭제
                </button>
                ) : null}
              </div>
            )}
          </div>
          )}
          {isQuizFile && !previewOnly ? (
            <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={toggleQuizEditMode}
                    aria-label={quizMode ? '마크다운 편집' : '퀴즈 모드'}
                    className={`shrink-0 ${QUIZ_MODE_TOGGLE_BTN_CLASS}`}
                  >
                    {quizMode ? <PenLine size={14} /> : <ClipboardList size={14} />}
                    <span className="hidden md:inline">
                      {quizMode ? '편집' : '퀴즈'}
                    </span>
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="bottom"
                    sideOffset={6}
                    className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
                  >
                    {quizMode ? '마크다운 편집' : '퀴즈 모드'}
                    <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          ) : null}
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleToolbarSave}
            disabled={isSaving || !isEditableViewer}
            title={
              isSaving
                ? '저장 중...'
                : currentFile.type === 'session'
                  ? '저장 방식 선택'
                  : '저장'
            }
            className="shrink-0 touch-manipulation max-md:min-h-[44px] max-md:min-w-[44px] max-md:px-3 max-md:py-2.5"
          >
            <IconSave />
            <span className="hidden md:inline">
              {' '}
              {isSaving ? '저장 중...' : '저장'}
            </span>
          </Button>
          {!previewOnly && typeof onRequestClose === 'function' && (
            <Button
              type="button"
              variant="tertiary"
              size="sm"
              onClick={() => onRequestClose()}
              title="닫기"
              aria-label="파일 닫기"
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>
      {viewer === 'markdown' && showRecordingToolbar && recordingsList.length > 0 && (
        <div className="shrink-0 px-4 py-2 border-b border-gray-200 dark:border-odp-borderSoft bg-gray-50 dark:bg-odp-bgSoft flex flex-wrap items-center gap-2 w-full">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 dark:hover:text-odp-fgStrong p-1 shrink-0"
            onClick={() => {
              setShowRecordingToolbar(false);
              setRecordingViewMode(false);
            }}
            title="툴바 닫기"
            aria-label="녹음 툴바 닫기"
          >
            <X size={16} />
          </button>
          <select
            className="text-sm rounded border border-gray-300 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft px-2 py-1 shrink-0"
            value={selectedRecordingKey ?? ''}
            onChange={(e) => onSelectRecording?.(e.target.value || null)}
          >
            {recordingsList.map((r) => (
              <option key={r.key} value={r.key}>
                {formatRecordingLabel(r)}
              </option>
            ))}
          </select>
          <Button
            type="button"
            variant={recordingViewMode ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setRecordingViewMode((v) => !v)}
            title={recordingViewMode ? '편집 모드' : '녹음 동기화 보기'}
            className="shrink-0"
          >
            <IconEye size={14} />
            <span className="hidden md:inline">
              {recordingViewMode ? '편집' : '동기화 보기'}
            </span>
          </Button>
          {recordingViewMode && recordingAudioUrl && (
            <RecordingPlayer audioUrl={recordingAudioUrl} audioRef={recordingAudioRef} />
          )}
        </div>
      )}
      {viewer === 'markdown' && effectiveEditorType === EDITOR_TYPE_NOVEL && !recordingViewMode && (
        <div
          className="shrink-0 flex items-center justify-between gap-3 px-4 py-2 border-b border-gray-200 dark:border-odp-borderSoft bg-gray-50/90 dark:bg-odp-bgSoft/90"
          role="toolbar"
          aria-label="Markdown 편집기"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-white dark:bg-odp-surface px-2 py-0.5 text-xs font-semibold text-gray-800 dark:text-odp-fgStrong border border-gray-200 dark:border-odp-borderSoft shadow-sm shrink-0">
              <PenLine className="size-3.5 opacity-85" aria-hidden />
              Markdown
            </span>
            <span className="text-xs text-gray-500 dark:text-odp-muted truncate hidden sm:inline">
              `/` 로 커맨드 입력
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PrintButton
              value={editorContent}
              theme={theme}
              currentFile={currentFile}
            />
            <button
              type="button"
              className={`shrink-0 inline-flex items-center justify-center rounded-md border p-1.5 shadow-sm transition dark:border-odp-borderSoft ${
                novelTocVisible
                  ? 'border-gray-300 bg-gray-100 text-gray-900 dark:bg-odp-bg dark:text-odp-fgStrong'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:bg-odp-surface dark:text-odp-muted dark:hover:bg-odp-bgSoft dark:hover:text-odp-fgStrong'
              }`}
              onClick={() => setNovelTocVisible((v) => !v)}
              title={novelTocVisible ? '목차 숨기기' : '목차 보이기'}
              aria-pressed={novelTocVisible}
              aria-label={novelTocVisible ? '목차 숨기기' : '목차 보이기'}
            >
              <ListTree className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      )}
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-odp-surface h-full">
        {viewer === 'loading' ? (
          <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3">
            <Loader2 size={18} className="animate-spin text-gray-400 dark:text-gray-500" aria-hidden />
            <div className="text-sm text-gray-500 dark:text-odp-muted">파일 불러오는 중…</div>
          </div>
        ) : viewer === 'markdown' ? (
          quizMode ? (
            <Suspense fallback={<EditorPaneSuspenseFallback />}>
              <QuizPane
                content={editorContent}
                onChange={onChangeEditor}
                currentFile={currentFile}
                llmProviderProfiles={llmProviderProfiles}
                isActiveFile={isActiveFile}
                registerToolbar={setQuizToolbarNode}
              />
            </Suspense>
          ) : (
          <>
            <div className="flex-1 min-h-0">
              {recordingViewMode && recordingAudioUrl ? (
                <RecordingSyncView
                  content={editorContent}
                  syncData={recordingSyncData}
                  audioRef={recordingAudioRef}
                  theme={theme}
                />
              ) : (
                <Suspense fallback={<EditorPaneSuspenseFallback />}>
                  {effectiveEditorType === EDITOR_TYPE_NOVEL ? (
                    <NovelMarkdownEditor
                      key={currentFile?.id ?? 'novel-md'}
                      documentKey={currentFile?.id ?? ''}
                      value={editorContent}
                      onChange={onChangeEditor}
                      onSave={onSave}
                      theme={theme}
                      currentFile={currentFile}
                      previewOnly={previewOnly}
                      tocVisible={novelTocVisible}
                      onTocRequestClose={() => setNovelTocVisible(false)}
                      mobileTocOverlayTopPx={isMobileLayout ? mobileTocOverlayTopPx : null}
                      onRegisterFlushBeforeSave={(fn) => {
                        novelFlushBeforeSaveRef.current = fn;
                      }}
                      onRegisterConvertAllImagesToWiki={(fn) => {
                        convertAllImagesToWikiRef.current = fn;
                      }}
                      onUploadImage={onUploadImage}
                      isUploadingEditorImage={isUploadingEditorImage}
                      uploadImagePercent={uploadImagePercent}
                      onCancelUploadImage={onCancelUploadImage}
                      onResolveWikiImageUrl={onResolveWikiImageUrl}
                      getImgbbApiKey={getImgbbApiKey}
                    />
                  ) : (
                    <MarkdownEditor
                      value={editorContent}
                      onChange={onChangeEditor}
                      onSave={onSave}
                      theme={theme}
                      currentFile={currentFile}
                      previewOnly={previewOnly}
                      isMobileLayout={isMobileLayout}
                      isActiveFile={isActiveFile}
                      onUploadImage={onUploadImage}
                      isUploadingEditorImage={isUploadingEditorImage}
                      uploadImagePercent={uploadImagePercent}
                      onCancelUploadImage={onCancelUploadImage}
                      onResolveWikiImageUrl={onResolveWikiImageUrl}
                      onOpenViewPath={onOpenViewPath}
                      snippetConfig={snippetConfig}
                      llmProviderProfiles={llmProviderProfiles}
                      getImgbbApiKey={getImgbbApiKey}
                      onRequestConvertAllImagesToWiki={openConvertAllImagesConfirm}
                      onRegisterConvertAllImagesToWiki={(fn) => {
                        convertAllImagesToWikiRef.current = fn;
                      }}
                    />
                  )}
                </Suspense>
              )}
            </div>
          </>
          )
        ) : viewer === 'image' && currentFile.objectUrl ? (
          <div className="flex-1 flex items-center justify-center overflow-auto p-4">
            <img
              src={currentFile.objectUrl}
              alt={currentFile.name}
              className="max-w-full max-h-full object-contain rounded border border-gray-200 dark:border-odp-borderSoft bg-black/5 dark:bg-black/20"
            />
          </div>
        ) : viewer === 'pdf' && currentFile.objectUrl ? (
          <div className="flex-1 overflow-hidden">
            <iframe
              ref={pdfIframeRef}
              key={pdfIframeKey}
              src={currentFile.objectUrl}
              title={currentFile.name}
              className="w-full h-full border-0 bg-white dark:bg-black"
            />
          </div>
        ) : viewer === 'json' ? (
          <div className="flex-1 flex flex-col overflow-hidden min-h-0 p-4">
            <Suspense fallback={<EditorPaneSuspenseFallback />}>
              <MonacoTextEditor
                value={editorContent}
                language="json"
                theme={theme}
                readOnly={false}
                onChange={onChangeEditor}
                onSave={onSave}
              />
            </Suspense>
          </div>
        ) : viewer === 'html' || viewer === 'svg' ? (
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            <Suspense fallback={<EditorPaneSuspenseFallback />}>
              <HtmlSvgPreviewEditor
                key={currentFile?.id ?? 'html-svg'}
                value={editorContent}
                mode={viewer === 'svg' ? 'svg' : 'html'}
                theme={theme}
                readOnly={previewOnly}
                onChange={onChangeEditor}
                onSave={onSave}
              />
            </Suspense>
          </div>
        ) : viewer === 'audio' && currentFile.objectUrl ? (
          <div className="flex-1 flex items-center justify-center overflow-auto p-4">
            <audio
              src={currentFile.objectUrl}
              controls
              className="w-full max-w-lg"
            />
          </div>
        ) : viewer === 'video' && currentFile.objectUrl ? (
          <div className="flex-1 flex items-center justify-center overflow-auto p-4">
            <video
              src={currentFile.objectUrl}
              controls
              className="max-w-full max-h-full rounded border border-gray-200 dark:border-odp-borderSoft"
            />
          </div>
        ) : viewer === 'raw' ? (
          <div className="flex-1 flex flex-col overflow-hidden min-h-0 p-4">
            <Suspense fallback={<EditorPaneSuspenseFallback />}>
              <MonacoTextEditor
                value={editorContent}
                language="plaintext"
                theme={theme}
                readOnly={false}
                onChange={onChangeEditor}
                onSave={onSave}
              />
            </Suspense>
          </div>
        ) : viewer === 'unsupported' ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <p className="text-sm text-gray-500 dark:text-odp-muted">
              이 파일 형식은 에디터에서 미리보기를 지원하지 않습니다.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={onViewUnsupportedAsText}
              >
                <IconFileCode size={16} /> 텍스트 에디터로 보기
              </Button>
              {onRequestDownload && (
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={onRequestDownload}
                >
                  <IconDownload size={16} /> 다운로드
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-gray-500 dark:text-odp-muted">
            이 파일 형식은 에디터에서 미리보기를 지원하지 않습니다.
          </div>
        )}
      </div>
      <DocumentSettingsModal
        isOpen={documentSettingsOpen}
        onClose={() => setDocumentSettingsOpen(false)}
        settings={documentSettings}
        onApply={handleApplyDocumentSettings}
      />
      <ConfirmModal
        isOpen={convertAllImagesConfirmOpen}
        title="모든 image를 wiki image로"
        message={
          convertingAllImages
            ? '이미지를 변환하는 중입니다…'
            : `문서의 일반 마크다운 이미지 ${countStandardMarkdownImages(editorContent)}개를 wiki image(![[path]])로 바꿉니다. base64·원격 이미지는 업로드됩니다.`
        }
        confirmLabel={convertingAllImages ? '변환 중…' : '변환'}
        cancelLabel="취소"
        confirmDisabled={convertingAllImages || isUploadingEditorImage}
        onConfirm={() => {
          void handleConfirmConvertAllImages();
        }}
        onCancel={() => {
          if (convertingAllImages) return;
          setConvertAllImagesConfirmOpen(false);
        }}
      />
      <ConfirmModal
        isOpen={imgbbCopyConfirmOpen}
        title="ImgBB로 업로드할까요?"
        message={
          imgbbCopyUploading
            ? '이미지를 ImgBB에 업로드하는 중입니다…'
            : `wiki·base64·이미지·Mermaid ${imgbbCopyCandidates.length}개를 ImgBB에 올린 뒤 원본에 링크를 저장하고 복사할 수 있습니다.`
        }
        confirmLabel={imgbbCopyUploading ? '업로드 중…' : '업로드 후 복사'}
        cancelLabel="취소"
        discardLabel="업로드 없이 복사"
        confirmDisabled={imgbbCopyUploading || imgbbCopyCandidates.length === 0}
        onConfirm={() => {
          void handleConfirmImgbbCopyUpload();
        }}
        onCancel={handleCancelImgbbCopy}
        onDiscard={() => {
          void handleSkipImgbbCopyUpload();
        }}
      >
        <div className="max-h-[min(50vh,320px)] overflow-y-auto rounded-lg border border-gray-200 dark:border-odp-borderSoft">
          <ul className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3">
            {imgbbCopyCandidates.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-1 rounded-md border border-gray-100 bg-gray-50 p-1.5 dark:border-odp-borderSoft dark:bg-odp-bgSoft"
              >
                <div className="flex h-20 items-center justify-center overflow-hidden rounded bg-white dark:bg-odp-surface">
                  {item.previewSrc ? (
                    <img
                      src={item.previewSrc}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-[10px] text-gray-400">미리보기 없음</span>
                  )}
                </div>
                <p className="truncate text-[10px] text-gray-600 dark:text-odp-muted" title={item.label}>
                  {item.kind} · {item.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </ConfirmModal>
    </div>
  );
}

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
import RecordingDropdownButton from '@/components/recording/RecordingDropdownButton';
import { EDITOR_TYPE_NOVEL, loadEditorType } from '@/utils/editorTypeSettings';
import RecordingSyncView from '@/components/recording/RecordingSyncView';
import RecordingPlayer from '@/components/recording/RecordingPlayer';
import Button from '@/components/Button';
import { ArrowLeftRight, ClipboardCopy, ImagePlus, ListTree, Loader2, PenLine, Settings, X } from 'lucide-react';
import PrintButton from '@/components/print/PrintButton';
import SessionOpenPanel from '@/components/shell/SessionOpenPanel';
import { ConfirmModal } from '@/components/shared/modals/ConfirmModal';
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

const MarkdownEditor = lazy(() => import('@/components/editor/MarkdownEditor'));
const NovelMarkdownEditor = lazy(() => import('@/components/editor/NovelMarkdownEditor'));
const MonacoTextEditor = lazy(() => import('@/components/editor/MonacoTextEditor'));
const HtmlSvgPreviewEditor = lazy(() => import('@/components/editor/HtmlSvgPreviewEditor'));

function EditorPaneSuspenseFallback() {
  return (
    <div className="flex h-full min-h-0 flex-1 items-center justify-center bg-white text-sm text-gray-400 dark:bg-odp-surface dark:text-odp-muted">
      에디터 로딩 중…
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}

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
  getImgbbApiKey
}: any) {
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
  const [imgbbCopyCandidates, setImgbbCopyCandidates] = useState<any[]>([]);
  const [imgbbCopyUploading, setImgbbCopyUploading] = useState(false);
  const [mobileTocOverlayTopPx, setMobileTocOverlayTopPx] = useState(null);
  const [documentSettingsOpen, setDocumentSettingsOpen] = useState(false);
  const { showAlert } = useAlertModal();

  const documentSettings = useMemo(() => {
    const { meta } = parseDocumentSettingsMeta(editorContent ?? '');
    return meta ?? DEFAULT_DOCUMENT_SETTINGS_META;
  }, [editorContent]);

  const handleToolbarSave = useCallback(() => {
    // @ts-expect-error TS(2349): This expression is not callable.
    novelFlushBeforeSaveRef.current?.();
    onSave?.();
  }, [onSave]);

  const handleToolbarRefreshFromDisk = useCallback(() => {
    // @ts-expect-error TS(2349): This expression is not callable.
    novelFlushBeforeSaveRef.current?.();
    onRefreshFromDisk?.();
  }, [onRefreshFromDisk]);

  const handlePullFromRemote = useCallback(() => {
    // @ts-expect-error TS(2349): This expression is not callable.
    novelFlushBeforeSaveRef.current?.();
    onPullFromRemote?.();
  }, [onPullFromRemote]);

  const handleApplyDocumentSettings = useCallback((nextSettings: any) => {
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
      // @ts-expect-error TS(2339): Property 'size' does not exist on type 'never'.
      message: imageSrcReplacements?.size
        ? 'ImgBB 업로드 후 원본에 원격 링크를 저장하고, 페이지를 HTML 서식으로 복사했습니다.'
        : '현재 페이지를 HTML 서식과 이미지 포함 형태로 복사했습니다.',
    });
  }, [showAlert]);

  const handleCopyFormattedHtml = useCallback(async () => {
    if (copyingFormattedHtml || imgbbCopyUploading) return;
    setCopyingFormattedHtml(true);
    try {
      // @ts-expect-error TS(2349): This expression is not callable.
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

        // @ts-expect-error TS(2379): Argument of type '{ apiKey: string; image: any; na... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2345): Argument of type 'Map<any, any>' is not assignable... Remove this comment to see the full error message
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
        // @ts-expect-error TS(2349): This expression is not callable.
        result = await convertAllImagesToWikiRef.current();
      } else {
        // @ts-expect-error TS(2349): This expression is not callable.
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
      // @ts-expect-error TS(2339): Property 'getBoundingClientRect' does not exist on... Remove this comment to see the full error message
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
    const handleClickOutside = (e: any) => {
      // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
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

  const formatRecordingLabel = (r: any) => {
    const d = new Date(r.timestamp);
    return d.toLocaleString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getExt = (fileName: any) => {
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
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            <button
              type="button"
              aria-label="사이드바 열기"
              onClick={onOpenSidebar}
              className="inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
            >
              <IconMenu size={22} />
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </button>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
            // @ts-expect-error TS(2339): Property 'img' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <img
              src={`${import.meta.env.BASE_URL}vite.svg`}
              alt=""
              width={56}
              height={56}
              className="h-12 w-12 shrink-0 drop-shadow-[0_8px_18px_rgba(15,23,42,0.28)] sm:h-14 sm:w-14 dark:drop-shadow-[0_0_22px_rgba(56,189,248,0.55)]"
              decoding="async"
            />
            // @ts-expect-error TS(2339): Property 'h1' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            <h1 className="font-display text-3xl font-bold tracking-tight text-gray-800 dark:text-odp-fgStrong sm:text-4xl">
              Docu Haim
            // @ts-expect-error TS(2339): Property 'h1' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2339): Property 'contentWindow' does not exist on type 'n... Remove this comment to see the full error message
      if (pdfIframeRef.current?.contentWindow) {
        // @ts-expect-error TS(2339): Property 'contentWindow' does not exist on type 'n... Remove this comment to see the full error message
        pdfIframeRef.current.contentWindow.location.reload();
      }
    } catch {
      setPdfIframeKey((k) => k + 1);
    }
  };
  
  return (
    <div className="flex min-h-0 min-w-0 max-h-full flex-1 flex-col overflow-hidden">
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div ref={editorTopChromeRef} className="shrink-0 flex flex-col">
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div className={`relative z-10100 flex min-h-14 w-full shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-white px-3 dark:border-odp-bgSofter dark:bg-odp-surface sm:px-6 pointer-events-auto transition-[padding] duration-300 ease-in-out ${desktopCollapsedTopBarPaddingClass}`}>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="flex min-w-0 flex-1 items-center gap-2 font-medium text-gray-700 dark:text-odp-fgStrong sm:gap-3">
          {showMobileSidebarOpen && (
            <button
              type="button"
              aria-label="사이드바 열기"
              onClick={onOpenSidebar}
              className="inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
            >
              <IconMenu size={22} />
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
              // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              </button>
            ) : (
              <IconCloud />
            )
          ) : currentFile.type === 'session' ? (
            <IconDownload />
          ) : (
            <IconFolder />
          )}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="flex min-w-0 flex-1 items-baseline gap-1">
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            {hasUnsavedChanges && <span className="text-red-500 text-xl leading-none shrink-0">*</span>}
            // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
            <input
              className="min-w-[3em] w-full border-none bg-transparent text-sm font-medium outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 md:text-base"
              value={editedFileName ?? ''}
              onChange={(e: any) => setEditedFileName?.(e.target.value)}
              onBlur={handleFileNameBlur}
              onKeyDown={(e: any) => {
                if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === 's') {
                  e.preventDefault();
                  handleToolbarSave();
                }
              }}
              placeholder="파일명"
            />
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 overflow-visible touch-manipulation">
          {typeof onToggleRecording === 'function' && (
            <RecordingDropdownButton
              isRecording={isRecording}
              audioLevel={audioLevel}
              hasRecordings={recordingsList.length > 0}
              recordingPipelineStatus={recordingPipelineStatus}
              onStartRecording={onToggleRecording}
              onStopRecording={onToggleRecording}
              onShowToolbar={() => setShowRecordingToolbar(true)}
            />
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
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
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
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
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
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
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
                    내 노트에 저장
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                </button>
                ) : null}
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
            )}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
          )}
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
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="hidden md:inline">
              {' '}
              {isSaving ? '저장 중...' : '저장'}
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            </span>
          </Button>
          {!previewOnly && (
            <Button
              type="button"
              variant="tertiary"
              size="sm"
              onClick={() => onRequestClose?.()}
              title="닫기"
              aria-label="파일 닫기"
            >
              <X size={16} />
            </Button>
          )}
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
      {viewer === 'markdown' && showRecordingToolbar && recordingsList.length > 0 && (
        <div className="shrink-0 px-4 py-2 border-b border-gray-200 dark:border-odp-borderSoft bg-gray-50 dark:bg-odp-bgSoft flex flex-wrap items-center gap-2 w-full">
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          </button>
          // @ts-expect-error TS(2339): Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          <select
            className="text-sm rounded border border-gray-300 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft px-2 py-1 shrink-0"
            value={selectedRecordingKey ?? ''}
            onChange={(e: any) => onSelectRecording?.(e.target.value || null)}
          >
            // @ts-expect-error TS(7006): Parameter 'r' implicitly has an 'any' type.
            {recordingsList.map((r: any) => (
              <option key={r.key} value={r.key}>
                {formatRecordingLabel(r)}
              // @ts-expect-error TS(2339): Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              </option>
            ))}
          // @ts-expect-error TS(2339): Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="hidden md:inline">
              {recordingViewMode ? '편집' : '동기화 보기'}
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            </span>
          </Button>
          {recordingViewMode && recordingAudioUrl && (
            <RecordingPlayer audioUrl={recordingAudioUrl} audioRef={recordingAudioRef} />
          )}
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      )}
      {viewer === 'markdown' && effectiveEditorType === EDITOR_TYPE_NOVEL && !recordingViewMode && (
        <div
          className="shrink-0 flex items-center justify-between gap-3 px-4 py-2 border-b border-gray-200 dark:border-odp-borderSoft bg-gray-50/90 dark:bg-odp-bgSoft/90"
          role="toolbar"
          aria-label="Markdown 편집기"
        >
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="flex items-center gap-2 min-w-0">
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="inline-flex items-center gap-1.5 rounded-md bg-white dark:bg-odp-surface px-2 py-0.5 text-xs font-semibold text-gray-800 dark:text-odp-fgStrong border border-gray-200 dark:border-odp-borderSoft shadow-sm shrink-0">
              <PenLine className="size-3.5 opacity-85" aria-hidden />
              Markdown
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            </span>
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="text-xs text-gray-500 dark:text-odp-muted truncate hidden sm:inline">
              `/` 로 커맨드 입력
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            </span>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="flex items-center gap-2">
            <PrintButton
              value={editorContent}
              theme={theme}
              currentFile={currentFile}
            />
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </button>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      )}
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-odp-surface h-full">
        {viewer === 'loading' ? (
          <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3">
            <Loader2 size={18} className="animate-spin text-gray-400 dark:text-gray-500" aria-hidden />
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <div className="text-sm text-gray-500 dark:text-odp-muted">파일 불러오는 중…</div>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        ) : viewer === 'markdown' ? (
          <>
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
                      onRegisterFlushBeforeSave={(fn: any) => {
                        novelFlushBeforeSaveRef.current = fn;
                      }}
                      onRegisterConvertAllImagesToWiki={(fn: any) => {
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
                      onRegisterConvertAllImagesToWiki={(fn: any) => {
                        convertAllImagesToWikiRef.current = fn;
                      }}
                    />
                  )}
                </Suspense>
              )}
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            </div>
          </>
        ) : viewer === 'image' && currentFile.objectUrl ? (
          <div className="flex-1 flex items-center justify-center overflow-auto p-4">
            // @ts-expect-error TS(2339): Property 'img' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <img
              src={currentFile.objectUrl}
              alt={currentFile.name}
              className="max-w-full max-h-full object-contain rounded border border-gray-200 dark:border-odp-borderSoft bg-black/5 dark:bg-black/20"
            />
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        ) : viewer === 'pdf' && currentFile.objectUrl ? (
          <div className="flex-1 overflow-hidden">
            // @ts-expect-error TS(2339): Property 'iframe' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            <iframe
              ref={pdfIframeRef}
              key={pdfIframeKey}
              src={currentFile.objectUrl}
              title={currentFile.name}
              className="w-full h-full border-0 bg-white dark:bg-black"
            />
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        ) : viewer === 'audio' && currentFile.objectUrl ? (
          <div className="flex-1 flex items-center justify-center overflow-auto p-4">
            // @ts-expect-error TS(2339): Property 'audio' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
            <audio
              src={currentFile.objectUrl}
              controls
              className="w-full max-w-lg"
            />
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        ) : viewer === 'video' && currentFile.objectUrl ? (
          <div className="flex-1 flex items-center justify-center overflow-auto p-4">
            // @ts-expect-error TS(2339): Property 'video' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
            <video
              src={currentFile.objectUrl}
              controls
              className="max-w-full max-h-full rounded border border-gray-200 dark:border-odp-borderSoft"
            />
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        ) : viewer === 'unsupported' ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
            <p className="text-sm text-gray-500 dark:text-odp-muted">
              이 파일 형식은 에디터에서 미리보기를 지원하지 않습니다.
            // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
            </p>
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            </div>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-gray-500 dark:text-odp-muted">
            이 파일 형식은 에디터에서 미리보기를 지원하지 않습니다.
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        )}
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="max-h-[min(50vh,320px)] overflow-y-auto rounded-lg border border-gray-200 dark:border-odp-borderSoft">
          // @ts-expect-error TS(2339): Property 'ul' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          <ul className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3">
            {imgbbCopyCandidates.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-1 rounded-md border border-gray-100 bg-gray-50 p-1.5 dark:border-odp-borderSoft dark:bg-odp-bgSoft"
              >
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                <div className="flex h-20 items-center justify-center overflow-hidden rounded bg-white dark:bg-odp-surface">
                  // @ts-expect-error TS(2339): Property 'previewSrc' does not exist on type 'neve... Remove this comment to see the full error message
                  {item.previewSrc ? (
                    <img
                      src={item.previewSrc}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-[10px] text-gray-400">미리보기 없음</span>
                  )}
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                </div>
                // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
                <p className="truncate text-[10px] text-gray-600 dark:text-odp-muted" title={item.label}>
                  // @ts-expect-error TS(2339): Property 'kind' does not exist on type 'never'.
                  {item.kind} · {item.label}
                // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
                </p>
              // @ts-expect-error TS(2339): Property 'li' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
              </li>
            ))}
          // @ts-expect-error TS(2339): Property 'ul' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          </ul>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      </ConfirmModal>
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}

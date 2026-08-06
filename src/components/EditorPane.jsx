import { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
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
import MarkdownEditor from '@/components/MarkdownEditor';
import NovelMarkdownEditor from '@/components/NovelMarkdownEditor';
import { EDITOR_TYPE_NOVEL, loadEditorType } from '@/utils/editorTypeSettings';
import RecordingSyncView from '@/components/RecordingSyncView';
import RecordingPlayer from '@/components/RecordingPlayer';
import MonacoTextEditor from '@/components/MonacoTextEditor';
import HtmlSvgPreviewEditor from '@/components/HtmlSvgPreviewEditor';
import Button from '@/components/Button';
import { ArrowLeftRight, ListTree, PenLine, X } from 'lucide-react';
import PrintButton from '@/components/PrintButton';
import SessionOpenPanel from '@/components/SessionOpenPanel';

export default function EditorPane({
  currentFile,
  editorContent,
  onChangeEditor,
  onSave,
  isSaving,
  onRefreshFromDisk,
  isRefreshingFromDisk = false,
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
  getGeminiApiKey,
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
  const [mobileTocOverlayTopPx, setMobileTocOverlayTopPx] = useState(null);

  const handleToolbarSave = useCallback(() => {
    novelFlushBeforeSaveRef.current?.();
    onSave?.();
  }, [onSave]);

  const handleToolbarRefreshFromDisk = useCallback(() => {
    novelFlushBeforeSaveRef.current?.();
    onRefreshFromDisk?.();
  }, [onRefreshFromDisk]);

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
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <IconFolder />
          <p className="mt-4 text-center">사이드바에서 파일을 선택하거나, 로컬 파일을 열어 편집하세요.</p>
          <div className="mt-6 flex w-full justify-center">
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
              <div className="mx-auto flex w-full max-w-xs flex-col gap-2">
                {typeof onRequestCreateFile === 'function' ? (
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
                ) : null}
                {typeof onOpenSidebar === 'function' ? (
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
                ) : null}
                {typeof onOpenChatWithMyself === 'function' ? (
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
                ) : null}
              </div>
            )}
          </div>
        </div>
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
      <div className={`relative z-10100 flex min-h-14 w-full shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-white px-3 dark:border-odp-bgSofter dark:bg-odp-surface sm:px-6 pointer-events-auto transition-[padding] duration-300 ease-in-out ${desktopCollapsedTopBarPaddingClass}`}>
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
            <IconCloud />
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
          {(currentFile.type !== 'session' || isSessionMarkdown) && (
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
                {isSessionMarkdown && typeof onSaveSessionToNote === 'function' ? (
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
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleToolbarSave}
            disabled={isSaving || !isEditableViewer}
            title={
              isSaving
                ? currentFile.type === 'session'
                  ? '다운로드 중...'
                  : '저장 중...'
                : currentFile.type === 'session'
                  ? '다운로드로 저장'
                  : '저장'
            }
            className="shrink-0 touch-manipulation max-md:min-h-[44px] max-md:min-w-[44px] max-md:px-3 max-md:py-2.5"
          >
            {currentFile.type === 'session' ? <IconDownload /> : <IconSave />}
            <span className="hidden md:inline">
              {' '}
              {isSaving
                ? currentFile.type === 'session'
                  ? '다운로드 중...'
                  : '저장 중...'
                : currentFile.type === 'session'
                  ? '다운로드'
                  : '저장'}
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
        {viewer === 'markdown' ? (
          <>
            <div className="flex-1 min-h-0">
              {recordingViewMode && recordingAudioUrl ? (
                <RecordingSyncView
                  content={editorContent}
                  syncData={recordingSyncData}
                  audioRef={recordingAudioRef}
                  theme={theme}
                />
              ) : effectiveEditorType === EDITOR_TYPE_NOVEL ? (
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
                  onUploadImage={onUploadImage}
                  isUploadingEditorImage={isUploadingEditorImage}
                  uploadImagePercent={uploadImagePercent}
                  onCancelUploadImage={onCancelUploadImage}
                  onResolveWikiImageUrl={onResolveWikiImageUrl}
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
                  getGeminiApiKey={getGeminiApiKey}
                />
              )}
            </div>
          </>
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
            <MonacoTextEditor
              value={editorContent}
              language="json"
              theme={theme}
              readOnly={false}
              onChange={onChangeEditor}
              onSave={onSave}
            />
          </div>
        ) : viewer === 'html' || viewer === 'svg' ? (
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            <HtmlSvgPreviewEditor
              key={currentFile?.id ?? 'html-svg'}
              value={editorContent}
              mode={viewer === 'svg' ? 'svg' : 'html'}
              theme={theme}
              readOnly={previewOnly}
              onChange={onChangeEditor}
              onSave={onSave}
            />
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
            <MonacoTextEditor
              value={editorContent}
              language="plaintext"
              theme={theme}
              readOnly={false}
              onChange={onChangeEditor}
              onSave={onSave}
            />
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
    </div>
  );
}

import type { CSSProperties, ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, LayoutTemplate, ListTree, Printer, Save, Settings } from 'lucide-react';
import PrintFontOptionsModal from '@/components/PrintFontOptionsModal';
import PrintImageMaxSizeControls from '@/components/print/PrintImageMaxSizeControls';
import PrintPageSizeSelect from '@/components/print/PrintPageSizeSelect';
import PrintPreviewZoomControls from '@/components/print/PrintPreviewZoomControls';
import PrintVisiblePageBadge from '@/components/print/PrintVisiblePageBadge';
import { HaimTableBoxResizeLayer } from '@/components/haimTable/HaimTableBoxResizeLayer';
import { PreviewTableContextMenu } from '@/components/haimTable/PreviewTableContextMenu';
import { TableEditModal } from '@/components/haimTable/TableEditModal';
import WikiImageSizeModal from '@/components/modals/WikiImageSizeModal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import PreviewFootnoteTooltips from '@/components/PreviewFootnoteTooltips';
import TocResizeHandle from '@/components/TocResizeHandle';
import TocTitleWrapToggle from '@/components/TocTitleWrapToggle';
import { PrintPgbrContextMenu } from '@/components/print/PrintPgbrContextMenu';
import { tocTitleTextClass } from '@/hooks/useTocTitleWrap';
import { buildPrintPageAtRule } from '@/utils/printPageLayout';
import type { PrintPageLayout } from '@/utils/printPageLayout';
import type { PrintPreviewViewState } from '@/utils/printPreviewView';
import { setPendingPrintReturnState } from '@/utils/printNavigationState';
import { findExportPdfOverlayPortal } from '@/utils/cssZoom';
import { findHaimTablePreviewRoot } from '@/utils/haimTable';
import { printFontStyles } from '@/pages/exportPdf/exportPdfPrintStyles';
import type { HaimTableEditState } from '@/hooks/useHaimTableEdit';
import type {
  ExportPdfDocumentFile,
  ExportPdfFreeTransformState,
  ExportPdfHeadingPgbrModalState,
  ExportPdfOverlayRect,
  ExportPdfTocItem,
  ExportPdfWikiImageModalState,
} from '@/pages/exportPdf/exportPdfTypes';
import type {
  WikiImageSizeApplyPayload,
  WikiImageSizeConvertToImgbbPayload,
  WikiImageSizeConvertToWikiPayload,
} from '@/components/modals/WikiImageSizeModal';
import type { NoteCover } from '@/utils/noteCover';
import { DEFAULT_PRINT_FONTS } from '@/utils/printSettingsStore';

type PrintFontsState = typeof DEFAULT_PRINT_FONTS;

type HaimTableEditApi = {
  editState: HaimTableEditState | null;
  isOpen: boolean;
  close: () => void;
  apply: (
    meta: NonNullable<HaimTableEditState>['meta'],
    grid: NonNullable<HaimTableEditState>['grid'],
  ) => void;
  openPreviewTable: (table: HTMLTableElement, previewRoot: Element) => boolean;
};

export type ExportPdfShellProps = {
  isDocumentLoading: boolean;
  hasNavigationSession: boolean;
  locationState: Record<string, unknown> | null;
  routeExportPath: string | null;
  previewValue: string;
  handleBack: () => void;
  fontStyleVars: CSSProperties;
  documentSettings: { webfontCss?: string | null; fonts?: Record<string, string | undefined> };
  printLayout: PrintPageLayout;
  printPageInnerPx: { widthPx: number; heightPx: number };
  headerRef: RefObject<HTMLDivElement | null>;
  setPreviewContainerRef: (node: HTMLDivElement | null) => void;
  previewContainerRef: RefObject<HTMLDivElement | null>;
  previewPanRoot: HTMLDivElement | null;
  paperContentRef: RefObject<HTMLDivElement | null>;
  previewValueRef: RefObject<string>;
  currentFileRef: RefObject<ExportPdfDocumentFile>;
  setPreviewValue: (value: string | ((prev: string) => string)) => void;
  handleSave: () => Promise<boolean>;
  handleExport: () => void;
  isSaving: boolean;
  isDirty: boolean;
  currentFile: ExportPdfDocumentFile;
  setFontModalOpen: (open: boolean) => void;
  fontModalOpen: boolean;
  fonts: PrintFontsState;
  setFonts: React.Dispatch<React.SetStateAction<PrintFontsState>>;
  toggleCoverEditMode: () => void;
  coverEditMode: boolean;
  parsedCover: NoteCover | null | undefined;
  updatePrintLayout: (partial: Partial<PrintPageLayout>) => void;
  updatePreviewView: (partial: Partial<PrintPreviewViewState>) => void;
  previewView: PrintPreviewViewState;
  tocVisible: boolean;
  setTocVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLiveScroll1: boolean;
  coverChromeWidth: number;
  tocWidth: number;
  tocTopPx: number;
  tocResizing: boolean;
  tocResizeHandleProps: Record<string, unknown>;
  tocListRef: RefObject<HTMLUListElement | null>;
  tocProgrammaticScrollRef: RefObject<boolean>;
  tocAutoFollowPausedUntilRef: RefObject<number>;
  wrapTitles: boolean;
  setWrapTitles: (value: boolean) => void;
  tocItems: ExportPdfTocItem[];
  visibleHeadingIds: string[];
  handleTocItemClick: (id: string) => void;
  setHeadingPgbrModalState: React.Dispatch<React.SetStateAction<ExportPdfHeadingPgbrModalState>>;
  pagesHostRef: RefObject<HTMLDivElement | null>;
  coverPageRef: RefObject<HTMLDivElement | null>;
  hasEnabledCover: boolean;
  bodyPageCount: number;
  stageVisiblePages: number[] | null;
  previewContent: ReactNode;
  coverSidebar: ReactNode;
  wikiImageModalState: ExportPdfWikiImageModalState;
  setWikiImageModalState: React.Dispatch<React.SetStateAction<ExportPdfWikiImageModalState>>;
  handleApplyWikiImageSize: (payload: WikiImageSizeApplyPayload) => void;
  startFreeTransform: () => void;
  handleCropWikiImage: (args: { file: File }) => Promise<void>;
  handleConvertMarkdownToWiki: (
    payload: WikiImageSizeConvertToWikiPayload,
  ) => Promise<void>;
  handleConvertToImgbb: (payload: WikiImageSizeConvertToImgbbPayload) => Promise<void>;
  freeTransformState: ExportPdfFreeTransformState;
  freeTransformOverlayRect: ExportPdfOverlayRect;
  freeTransformConfirmOpen: boolean;
  setFreeTransformConfirmOpen: (open: boolean) => void;
  isLeaveBlocked: boolean;
  handleNavGuardSaveAndLeave: () => Promise<void>;
  resetLeave: () => void;
  handleNavGuardDiscardAndLeave: () => void;
  handleConfirmTransformApply: () => void;
  handleConfirmTransformReset: () => void;
  headingPgbrModalState: ExportPdfHeadingPgbrModalState;
  handleInsertPgbrBeforeHeading: () => void;
  haimTableEdit: HaimTableEditApi;
  onHaimTableEditFailed: () => void;
};

export function ExportPdfShell({
  isDocumentLoading,
  hasNavigationSession,
  locationState,
  routeExportPath,
  previewValue,
  handleBack,
  fontStyleVars,
  documentSettings,
  printLayout,
  printPageInnerPx,
  headerRef,
  setPreviewContainerRef,
  previewContainerRef,
  previewPanRoot,
  paperContentRef,
  previewValueRef,
  currentFileRef,
  setPreviewValue,
  handleSave,
  handleExport,
  isSaving,
  isDirty,
  currentFile,
  setFontModalOpen,
  fontModalOpen,
  fonts,
  setFonts,
  toggleCoverEditMode,
  coverEditMode,
  parsedCover,
  updatePrintLayout,
  updatePreviewView,
  previewView,
  tocVisible,
  setTocVisible,
  isLiveScroll1,
  coverChromeWidth,
  tocWidth,
  tocTopPx,
  tocResizing,
  tocResizeHandleProps,
  tocListRef,
  tocProgrammaticScrollRef,
  tocAutoFollowPausedUntilRef,
  wrapTitles,
  setWrapTitles,
  tocItems,
  visibleHeadingIds,
  handleTocItemClick,
  setHeadingPgbrModalState,
  pagesHostRef,
  coverPageRef,
  hasEnabledCover,
  bodyPageCount,
  stageVisiblePages,
  previewContent,
  coverSidebar,
  wikiImageModalState,
  setWikiImageModalState,
  handleApplyWikiImageSize,
  startFreeTransform,
  handleCropWikiImage,
  handleConvertMarkdownToWiki,
  handleConvertToImgbb,
  freeTransformState,
  freeTransformOverlayRect,
  freeTransformConfirmOpen,
  setFreeTransformConfirmOpen,
  isLeaveBlocked,
  handleNavGuardSaveAndLeave,
  resetLeave,
  handleNavGuardDiscardAndLeave,
  handleConfirmTransformApply,
  handleConfirmTransformReset,
  headingPgbrModalState,
  handleInsertPgbrBeforeHeading,
  haimTableEdit,
  onHaimTableEditFailed,
}: ExportPdfShellProps) {
  if (isDocumentLoading) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3 bg-neutral-200 px-4 dark:bg-neutral-800">
        <p className="text-sm text-gray-600 dark:text-odp-fg">문서를 불러오는 중…</p>
      </div>
    );
  }

  if (!hasNavigationSession && locationState == null && !routeExportPath && !previewValue) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3 bg-neutral-200 px-4 dark:bg-neutral-800">
        <p className="text-sm text-gray-600 dark:text-odp-fg">
          인쇄 미리보기 세션이 없습니다. 편집기에서 다시 열어 주세요.
        </p>
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg"
        >
          <ArrowLeft size={18} />
          뒤로 가기
        </button>
      </div>
    );
  }

  return (
    <div
      className="export-pdf-page flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden bg-neutral-200 print:h-auto print:min-h-0 print:overflow-visible print:bg-white dark:bg-neutral-800"
      style={fontStyleVars}
    >
      {documentSettings.webfontCss ? (
        <style data-s3haim-document-webfonts="1">{documentSettings.webfontCss}</style>
      ) : null}
      <style data-export-pdf-shell-style="1">{printFontStyles}</style>
      <style data-export-pdf-shell-style="1">{buildPrintPageAtRule(printLayout.pageSizeId)}</style>
      <div
        ref={headerRef}
        className="export-pdf-toolbar sticky top-0 z-20 flex w-full shrink-0 flex-col gap-2 border-b border-gray-200 bg-white print:hidden dark:border-odp-borderSoft dark:bg-odp-bgSoft"
      >
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            data-print-toolbar="back"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg px-3 py-2 rounded transition"
            aria-label="뒤로 가기"
          >
            <ArrowLeft size={18} />
            뒤로 가기
          </button>
          <h2
            data-tauri-drag-region
            className="font-semibold text-gray-800 dark:text-odp-fg truncate flex-1 text-center select-none"
          >
            PDF로 내보내기
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFontModalOpen(true)}
              data-print-toolbar="font"
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg rounded transition"
              aria-label="폰트 설정"
            >
              <Settings size={16} />
              폰트 설정
            </button>
            <button
              type="button"
              onClick={() => void handleSave()}
              data-print-toolbar="save"
              disabled={!currentFile?.id || isSaving || !isDirty}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded transition disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-600 hover:bg-blue-700"
              aria-label="저장"
              title="이미지 크기와 페이지 나누기를 노트에 저장 (Ctrl+S)"
            >
              <Save size={16} />
              {isSaving ? '저장 중…' : '저장'}
            </button>
            <button
              type="button"
              className="md-editor-btn inline-flex items-center gap-1.5"
              data-print-toolbar="export"
              onClick={handleExport}
              aria-label="내보내기"
            >
              <Printer size={16} />
              내보내기
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="button"
              onClick={toggleCoverEditMode}
              data-print-toolbar="cover"
              className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded transition ${
                coverEditMode
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200'
                  : 'text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg'
              }`}
              aria-label={parsedCover ? '표지 편집' : '표지 추가'}
              aria-pressed={coverEditMode}
              title={parsedCover ? '표지 편집' : '표지 추가'}
            >
              <LayoutTemplate size={16} />
              {parsedCover ? '표지 편집' : '표지 추가'}
            </button>
            <PrintPageSizeSelect
              value={printLayout.pageSizeId}
              onValueChange={(pageSizeId) => updatePrintLayout({ pageSizeId })}
            />
            <PrintPreviewZoomControls
              value={previewView.zoomPercent}
              onChange={(zoomPercent) => updatePreviewView({ zoomPercent })}
            />
            <PrintImageMaxSizeControls
              maxWidth={printLayout.imageMaxWidth}
              maxHeight={printLayout.imageMaxHeight}
              widthFallback={`${printPageInnerPx.widthPx}px`}
              heightFallback={`${printPageInnerPx.heightPx}px`}
              onChange={({ maxWidth, maxHeight }) =>
                updatePrintLayout({
                  imageMaxWidth: maxWidth,
                  imageMaxHeight: maxHeight,
                })
              }
            />
          </div>
          <button
            type="button"
            onClick={() => setTocVisible((v) => !v)}
            data-print-toolbar="toc"
            className="flex shrink-0 items-center gap-1.5 px-3 py-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg rounded transition"
            aria-label={tocVisible ? '목차 숨기기' : '목차 보이기'}
            aria-pressed={tocVisible}
            title={tocVisible ? '목차 숨기기' : '목차 보이기'}
          >
            <ListTree size={16} />
            목차
          </button>
        </div>
      </div>

      <div
        className="relative flex min-h-0 flex-1 flex-col"
        style={{
          '--export-toc-width': `${tocWidth}px`,
          '--export-cover-sidebar-width': `${coverChromeWidth}px`,
        } as CSSProperties}
      >
        <div
          ref={setPreviewContainerRef}
          className={`export-pdf-preview-scroll relative px-4 py-6 min-h-0 flex-1 bg-neutral-200 dark:bg-neutral-800 text-gray-900 print:bg-white print:h-auto print:max-h-none print:overflow-visible print:p-0 ${
            isLiveScroll1 ? 'overflow-auto' : 'overflow-hidden'
          } ${tocVisible ? 'md:pr-(--export-toc-width)' : ''} ${
            coverEditMode ? 'md:pl-(--export-cover-sidebar-width)' : ''
          }`}
        >
          {previewContent}
        </div>
        <PrintVisiblePageBadge
          pagesHostRef={pagesHostRef}
          scrollRef={previewContainerRef}
          coverRef={coverPageRef}
          hasCover={hasEnabledCover}
          bodyPageCount={bodyPageCount}
          overridePages={isLiveScroll1 ? null : stageVisiblePages}
        />
        {coverSidebar}
        {tocVisible ? (
          <aside
            className="hidden md:flex fixed right-0 bottom-0 border-l border-gray-200 dark:border-odp-borderSoft bg-white/95 dark:bg-odp-bgSoft/95 backdrop-blur-sm z-30 print:hidden"
            style={{ top: tocTopPx, width: tocWidth }}
          >
            {/* TocResizeHandle is JS; edge prop typing is a string-literal overload artifact. */}
            {/* @ts-expect-error js resize handle prop types */}
            <TocResizeHandle
              edge="left"
              handleProps={tocResizeHandleProps}
              isResizing={tocResizing}
              visibleOnHover
              label="목차 너비 조절"
            />
            <div className="relative flex flex-col w-full min-h-0 p-2 pl-2.5">
              <div className="flex items-center justify-between gap-2 px-1.5 py-1">
                <div className="text-xs font-semibold tracking-wide text-gray-700 dark:text-odp-fgStrong uppercase">
                  목차
                </div>
                <TocTitleWrapToggle
                  checked={wrapTitles}
                  onChange={setWrapTitles}
                  isDark={
                    typeof document !== 'undefined' &&
                    document.documentElement.classList.contains('dark')
                  }
                />
              </div>
              <ul
                ref={tocListRef}
                onScroll={() => {
                  if (!tocProgrammaticScrollRef.current) {
                    tocAutoFollowPausedUntilRef.current = Date.now() + 900;
                  }
                }}
                onWheel={() => {
                  tocAutoFollowPausedUntilRef.current = Date.now() + 900;
                }}
                onTouchMove={() => {
                  tocAutoFollowPausedUntilRef.current = Date.now() + 900;
                }}
                className="mt-1 flex-1 min-h-0 overflow-y-auto space-y-1"
              >
                {tocItems.length === 0 ? (
                  <li className="px-1.5 text-xs text-gray-500 dark:text-odp-muted">제목 없음</li>
                ) : (
                  tocItems.map((item, i) => (
                    <li
                      key={`${item.id}-${i}`}
                      style={{ paddingLeft: `${Math.min(item.level - 1, 5) * 0.45}rem` }}
                    >
                      <button
                        type="button"
                        data-toc-id={item.id}
                        onClick={() => handleTocItemClick(item.id)}
                        onContextMenu={(event) => {
                          event.preventDefault();
                          const idMatch = String(item.id || '').match(/^pdf-ex-heading-(\d+)$/i);
                          const fromId = idMatch?.[1] ? Number(idMatch[1]) : null;
                          const headingIndex =
                            fromId != null && Number.isInteger(fromId) && fromId >= 1
                              ? fromId
                              : i + 1;
                          setHeadingPgbrModalState({
                            headingIndex,
                            headingText: item.text || '',
                          });
                        }}
                        className={`group relative w-full text-left rounded px-1.5 py-1 text-sm transition ${tocTitleTextClass(wrapTitles)} ${
                          visibleHeadingIds.includes(item.id)
                            ? 'font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-odp-focusBg'
                            : 'text-gray-700 dark:text-odp-fg hover:bg-gray-100 dark:hover:bg-odp-focusBg'
                        }`}
                        title={item.text}
                      >
                        <span
                          className={`absolute left-0 w-0.5 rounded ${
                            wrapTitles ? 'top-2 h-4' : 'top-1/2 h-4 -translate-y-1/2'
                          } ${
                            visibleHeadingIds.includes(item.id) ? 'bg-red-500' : 'bg-transparent'
                          }`}
                          aria-hidden
                        />
                        {item.text}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </aside>
        ) : null}
      </div>

      <PrintFontOptionsModal
        isOpen={fontModalOpen}
        onClose={() => setFontModalOpen(false)}
        fonts={fonts}
        onFontsChange={(next: PrintFontsState) => setFonts(next)}
      />
      <WikiImageSizeModal
        key={
          wikiImageModalState
            ? `${wikiImageModalState.kind}|${wikiImageModalState.key}|${wikiImageModalState.width ?? ''}|${wikiImageModalState.height ?? ''}|${wikiImageModalState.occurrence ?? 0}`
            : 'wiki-image-size-modal'
        }
        isOpen={Boolean(wikiImageModalState)}
        onClose={() => setWikiImageModalState(null)}
        path={wikiImageModalState?.key ?? ''}
        kind={wikiImageModalState?.kind ?? 'wiki'}
        initialWidth={wikiImageModalState?.width ?? ''}
        initialHeight={wikiImageModalState?.height ?? ''}
        imageSrc={wikiImageModalState?.imageSrc ?? ''}
        onApply={handleApplyWikiImageSize}
        onStartFreeTransform={startFreeTransform}
        onCrop={handleCropWikiImage}
        onConvertToWiki={handleConvertMarkdownToWiki}
        onConvertToImgbb={handleConvertToImgbb}
      />
      <HaimTableBoxResizeLayer
        containerRef={previewContainerRef}
        getMarkdown={() => previewValueRef.current ?? ''}
        setMarkdown={(next) => setPreviewValue(next)}
        enabled={!haimTableEdit.isOpen}
      />
      <PreviewTableContextMenu
        containerRef={previewContainerRef}
        getMarkdown={() => previewValueRef.current ?? ''}
        setMarkdown={(next) => setPreviewValue(next)}
        onEditTable={haimTableEdit.openPreviewTable}
        onEditFailed={onHaimTableEditFailed}
        findPreviewRoot={findHaimTablePreviewRoot}
        mobileMenuTitle="PDF 표"
        mobileMenuSubtitle="표 편집"
      />
      <TableEditModal
        isOpen={haimTableEdit.isOpen}
        initialMeta={haimTableEdit.editState?.meta ?? null}
        initialGrid={haimTableEdit.editState?.grid ?? { rows: [['']], aligns: [null] }}
        onClose={haimTableEdit.close}
        onSave={haimTableEdit.apply}
      />
      {freeTransformState && freeTransformOverlayRect && typeof document !== 'undefined'
        ? (() => {
            const overlayPortal = findExportPdfOverlayPortal(
              previewPanRoot ?? previewContainerRef.current,
            );
            const useZoomRootOverlay =
              freeTransformOverlayRect.positioning === 'zoom-root-absolute' && overlayPortal;
            return createPortal(
              <div
                className={`pointer-events-none z-100040 border-2 border-blue-500 print:hidden ${
                  useZoomRootOverlay ? 'absolute' : 'fixed'
                }`}
                style={{
                  left: `${freeTransformOverlayRect.left}px`,
                  top: `${freeTransformOverlayRect.top}px`,
                  width: `${freeTransformOverlayRect.width}px`,
                  height: `${freeTransformOverlayRect.height}px`,
                }}
              >
                {(['nw', 'ne', 'sw', 'se'] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    data-transform-handle={dir}
                    className="pointer-events-auto absolute h-3 w-3 rounded-full border border-white bg-blue-600"
                    style={{
                      left: dir.includes('w') ? '-7px' : 'auto',
                      right: dir.includes('e') ? '-7px' : 'auto',
                      top: dir.includes('n') ? '-7px' : 'auto',
                      bottom: dir.includes('s') ? '-7px' : 'auto',
                      cursor: dir === 'nw' || dir === 'se' ? 'nwse-resize' : 'nesw-resize',
                    }}
                    aria-label={`transform-${dir}`}
                  />
                ))}
              </div>,
              useZoomRootOverlay ? overlayPortal : document.body,
            );
          })()
        : null}
      {freeTransformState ? (
        <button
          type="button"
          onClick={() => setFreeTransformConfirmOpen(true)}
          className="fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm print:hidden"
        >
          <span className="block font-semibold mb-1">자유변형 안내</span>
          <span className="block">- Shift + 드래그: 원본 비율 유지 / 일반 드래그: 비율 무시</span>
          <span className="block">- 터치 드래그: 원본 비율 유지</span>
          <span className="block">- 다른 곳 클릭(이 토스트 포함): 변형 완료 확인</span>
        </button>
      ) : null}
      <ConfirmModal
        isOpen={isLeaveBlocked}
        title="저장하지 않은 변경사항"
        message="저장하지 않은 변경사항이 있습니다. 이동하면 변경사항이 사라집니다."
        confirmLabel="저장 후 이동"
        cancelLabel="취소"
        discardLabel="저장 안 하고 이동"
        onConfirm={() => {
          void handleNavGuardSaveAndLeave();
        }}
        onCancel={resetLeave}
        onDiscard={handleNavGuardDiscardAndLeave}
        confirmDisabled={!currentFile?.id || isSaving}
      />
      <ConfirmModal
        isOpen={freeTransformConfirmOpen}
        title="자유변형 저장"
        message="현재 변형을 어떻게 처리할까요?"
        confirmLabel="적용"
        cancelLabel="계속 수정"
        discardLabel="변형 초기화"
        onConfirm={handleConfirmTransformApply}
        onCancel={() => setFreeTransformConfirmOpen(false)}
        onDiscard={handleConfirmTransformReset}
      />
      <ConfirmModal
        isOpen={Boolean(headingPgbrModalState)}
        title="페이지 나누기 삽입"
        message={`아래 heading 앞에 <pgbr/> 를 삽입합니다.\n\n${headingPgbrModalState?.headingText || '(제목 텍스트 없음)'}`}
        confirmLabel="삽입"
        cancelLabel="취소"
        onConfirm={handleInsertPgbrBeforeHeading}
        onCancel={() => setHeadingPgbrModalState(null)}
      />
      <PrintPgbrContextMenu
        containerEl={previewPanRoot}
        containerRef={previewContainerRef}
        paperContentRef={paperContentRef}
        getMarkdown={() => previewValueRef.current ?? ''}
        setMarkdown={(next) => {
          setPreviewValue(next);
          setPendingPrintReturnState({
            currentFile: currentFileRef.current,
            editorContent: next,
          });
        }}
      />
      <PreviewFootnoteTooltips containerRef={previewContainerRef} rootEl={previewPanRoot} />
    </div>
  );
}

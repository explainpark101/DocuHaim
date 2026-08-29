import { useRef, type ReactNode, type RefObject } from 'react';
import { MdPreview } from 'md-editor-rt';
import '@/styles/md-editor-rt/style.css';
import CoverSlide from '@/components/noteCover/CoverSlide';
import PrintPreviewStage from '@/components/print/PrintPreviewStage';
import { MD_EDITOR_EXPORT_PDF_CODE_THEME } from '@/utils/mdEditorCodeTheme';
import { MD_EDITOR_CUSTOM_ICONS } from '@/utils/mdEditorCustomIcons';
import type { NoteCover } from '@/utils/noteCover';
import type { PrintPageSizeId } from '@/utils/printPageLayout';
import type {
  PrintPreviewNavigation,
  PrintPreviewPageCount,
} from '@/utils/printPreviewView';
import {
  EDITOR_ID,
  headingId,
} from '@/pages/exportPdf/exportPdfPrintStyles';
import { useExportPdfPreviewZoomClip } from '@/pages/exportPdf/hooks/useExportPdfPreviewZoomClip';

export type ExportPdfBodyPreviewProps = {
  coverPages: ReactNode;
  isLiveScroll1: boolean;
  tocVisible: boolean;
  previewViewZoomPercent: number;
  effectiveNavigation: PrintPreviewNavigation;
  effectivePages: PrintPreviewPageCount;
  firstPageSingle: boolean;
  onStageZoomChange: (zoomPercent: number) => void;
  pageSizeId: PrintPageSizeId;
  bodyPageCount: number;
  packLayoutKey: string;
  activeCover: NoteCover | null | undefined;
  getPresignedUrl: ((path: string) => Promise<string | null>) | null | undefined;
  flipIndex: number;
  setFlipIndex: (index: number) => void;
  setStageVisiblePages: (pages: number[] | null) => void;
  pagesHostRef: RefObject<HTMLDivElement | null>;
  paperContentRef: RefObject<HTMLDivElement | null>;
  imageMaxProbeRef: RefObject<HTMLDivElement | null>;
  metricRef: RefObject<HTMLDivElement | null>;
  bodyMarkdown: string;
  previewFootnotesRenderKey: number;
};

export function ExportPdfBodyPreview({
  coverPages,
  isLiveScroll1,
  tocVisible,
  previewViewZoomPercent,
  effectiveNavigation,
  effectivePages,
  firstPageSingle,
  onStageZoomChange,
  pageSizeId,
  bodyPageCount,
  packLayoutKey,
  activeCover,
  getPresignedUrl,
  flipIndex,
  setFlipIndex,
  setStageVisiblePages,
  pagesHostRef,
  paperContentRef,
  imageMaxProbeRef,
  metricRef,
  bodyMarkdown,
  previewFootnotesRenderKey,
}: ExportPdfBodyPreviewProps) {
  const coverStackRef = useRef<HTMLDivElement | null>(null);
  const zoomClipHeight = useExportPdfPreviewZoomClip(
    coverStackRef,
    previewViewZoomPercent,
    packLayoutKey,
    isLiveScroll1,
  );

  return (
    <>
      {!isLiveScroll1 ? (
        <div
          className={`absolute inset-0 print:hidden ${
            tocVisible ? 'md:right-(--export-toc-width)' : ''
          }`}
        >
          <PrintPreviewStage
            navigation={effectiveNavigation}
            pages={effectivePages}
            firstPageSingle={firstPageSingle}
            zoomPercent={previewViewZoomPercent}
            onZoomChange={onStageZoomChange}
            pageSizeId={pageSizeId}
            bodyPageCount={bodyPageCount}
            pagesHostRef={pagesHostRef}
            packLayoutKey={packLayoutKey}
            hasCover={Boolean(activeCover?.enabled)}
            coverNode={
              activeCover?.enabled ? (
                <CoverSlide
                  cover={activeCover}
                  getPresignedUrl={getPresignedUrl}
                  className="h-full w-full shadow-none"
                />
              ) : null
            }
            flipIndex={flipIndex}
            onFlipIndexChange={setFlipIndex}
            onVisibleLogicalPagesChange={setStageVisiblePages}
          />
        </div>
      ) : null}
      <div
        className={`export-pdf-zoom-clip mx-auto w-full ${isLiveScroll1 ? '' : 'h-auto'}`}
        style={
          isLiveScroll1 && zoomClipHeight != null
            ? { height: zoomClipHeight }
            : undefined
        }
      >
        <div
          ref={coverStackRef}
          className={`export-pdf-cover-stack relative mx-auto w-full print:mx-0 ${
            isLiveScroll1 ? '' : 'export-pdf-source-measure'
          }`}
          style={isLiveScroll1 ? { zoom: previewViewZoomPercent / 100 } : undefined}
          aria-hidden={isLiveScroll1 ? undefined : true}
        >
        {isLiveScroll1 ? (
          <div
            className="export-pdf-overlay-portal pointer-events-none absolute inset-0 z-100040 print:hidden"
            aria-hidden
          />
        ) : null}
        {coverPages}
        <div
          ref={pagesHostRef}
          data-export-pdf-pages="1"
          className="export-pdf-pages w-full"
        />
        {/* Staging: continuous MdPreview for measure/fit; paged.js clones into pagesHost. */}
        <div
          className="export-pdf-paper export-pdf-staging relative mx-auto bg-white text-gray-900 print:hidden"
          style={{
            width: 'var(--print-page-width)',
            minHeight: 'var(--print-page-height)',
            padding: 'var(--print-page-margin)',
            position: 'absolute',
            left: 0,
            top: 0,
            visibility: 'hidden',
            pointerEvents: 'none',
            zIndex: -1,
          }}
          aria-hidden
        >
          <div
            ref={metricRef}
            className="export-pdf-paper-metric pointer-events-none absolute top-0 left-0 -z-10 w-px opacity-0"
            aria-hidden
          />
          <div ref={paperContentRef} className="export-pdf-paper-content relative">
            <div
              ref={imageMaxProbeRef}
              className="pointer-events-none absolute top-0 left-0 -z-10 opacity-0"
              style={{
                width: 'var(--print-img-max-width)',
                height: 'var(--print-img-max-height)',
              }}
              aria-hidden
            />
            <MdPreview
              key={`footnotes-${previewFootnotesRenderKey}`}
              id={EDITOR_ID}
              theme="light"
              language="ko-KR"
              codeTheme={MD_EDITOR_EXPORT_PDF_CODE_THEME}
              customIcon={MD_EDITOR_CUSTOM_ICONS}
              value={bodyMarkdown}
              mdHeadingId={headingId}
              noMermaid
              codeFoldable={false}
              showCodeRowNumber
            />
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

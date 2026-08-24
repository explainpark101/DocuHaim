/**
 * Export PDF: markdown render → Paged.js pagination → display.
 */

import { renderAppMarkdown } from '@/utils/createAppMarkdownIt';
import { renderAllLazyMermaidsInRoot } from '@/utils/lazyMermaid';
import {
  copyPrintMermaidCanvases,
  rasterizeAllPrintMermaidsToCanvas,
} from '@/utils/printMermaidCanvas';
import {
  debugExportPdf,
  debugExportPdfError,
  capturePagedJsWarnings,
  pagedOutputStats,
  previewContentStats,
} from '@/utils/printExportDebug';
import {
  assignPrintHeadingIds,
  defaultPrintHeadingId,
  type PrintHeadingIdFn,
} from '@/utils/printHeadingIds';
import { fitPrintImagesInRoot } from '@/utils/printImageAspectFit';
import {
  buildPagedJsStylesheet,
  injectPrintPreviewStylesForPaging,
  setPrintPagingActive,
} from '@/utils/printPagedCss';
import {
  clearStalePagedJsDom,
  ensureNoUnsafeSvgBeforePagedJs,
  getPrintPreviewRoot,
  mountPrintFlowInPagesHost,
  releasePrintPagingSourceDom,
  rewriteMermaidIdsInClone,
  sanitizePrintFlowForPaging,
  stampPagedJsBodyPages,
  transferHeadingIdsToPagedPages,
} from '@/utils/printPagedDom';
import {
  coercePrintImageMaxToPx,
  getPrintPageInnerSizePx,
  type PrintPageSizeId,
} from '@/utils/printPageLayout';
import { fitPrintTablesInRoot } from '@/utils/printTableFit';
import {
  waitForBrowserLayoutSettle,
  waitForPrintMermaidReady,
  waitForPrintStagingReady,
} from '@/utils/printStagingReady';
import { hydrateStorageImagesInRoot } from '@/utils/storageImageHydration';

export {
  PRINT_BODY_PAGE_ATTR,
  PRINT_PAGES_HOST_ATTR,
  buildPrintPreviewThemeVarsCss,
  scopeExportPdfPreviewStyles,
} from '@/utils/printPagedCss';

export {
  assignPrintHeadingIds,
  defaultPrintHeadingId,
  type PrintHeadingIdFn,
} from '@/utils/printHeadingIds';

export type RenderMarkdownToPagedPreviewOptions = {
  markdown: string;
  pagesHost: HTMLElement;
  pageSizeId: PrintPageSizeId;
  contentStyles: string;
  headingId?: PrintHeadingIdFn;
  getPresignedUrl?: (path: string) => Promise<string | null>;
  currentNotePath?: string | null;
  imageMaxWidth?: string;
  imageMaxHeight?: string;
};

/** Serialize Paged.js renders — overlapping preview() calls break page layout. */
let pagedJsPreviewChain: Promise<unknown> = Promise.resolve();

function withPagedJsPreviewLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = pagedJsPreviewChain.then(fn, fn);
  pagedJsPreviewChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function parsePrintImageMaxPx(
  raw: string | undefined,
  fallbackPx: number,
  percentBasePx: number,
): number {
  const pxStr = coercePrintImageMaxToPx(raw ?? '', fallbackPx, percentBasePx);
  const parsed = parseInt(pxStr, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallbackPx;
}

function createMarkdownPreviewRoot(markdown: string, headingId: PrintHeadingIdFn): HTMLElement {
  const preview = document.createElement('div');
  preview.id = 'export-pdf-preview';
  preview.className = 'md-editor-preview';
  preview.innerHTML = renderAppMarkdown(String(markdown ?? ''), 'preview');
  assignPrintHeadingIds(preview, headingId);
  return preview;
}

/** Phase 1: render markdown and wait for mermaid / images / table fit. */
async function renderMarkdownFlow(
  previewRoot: HTMLElement,
  options: {
    contentWidthPx: number;
    imageMaxWidthPx: number;
    imageMaxHeightPx: number;
    getPresignedUrl?: (path: string) => Promise<string | null>;
    currentNotePath?: string | null;
  },
): Promise<void> {
  const { contentWidthPx, imageMaxWidthPx, imageMaxHeightPx, getPresignedUrl, currentNotePath } = options;

  if (getPresignedUrl) {
    hydrateStorageImagesInRoot(previewRoot, { getPresignedUrl, currentNotePath: currentNotePath ?? null });
    await waitForBrowserLayoutSettle();
    hydrateStorageImagesInRoot(previewRoot, { getPresignedUrl, currentNotePath: currentNotePath ?? null });
  }

  await renderAllLazyMermaidsInRoot(previewRoot);
  await waitForPrintMermaidReady(previewRoot, 'svg');

  fitPrintTablesInRoot(previewRoot, contentWidthPx);
  fitPrintImagesInRoot(previewRoot, imageMaxWidthPx, imageMaxHeightPx, contentWidthPx);

  await waitForPrintStagingReady(previewRoot);

  fitPrintTablesInRoot(previewRoot, contentWidthPx);
  fitPrintImagesInRoot(previewRoot, imageMaxWidthPx, imageMaxHeightPx, contentWidthPx);
  await waitForBrowserLayoutSettle();
}

/** Phase 2: Paged.js pagination on a rendered flow root. */
async function paginateRenderedFlow(
  pagesHost: HTMLElement,
  previewRoot: HTMLElement,
  options: {
    pageSizeId: PrintPageSizeId;
    contentStyles: string;
    contentWidthPx: number;
    imageMaxHeightPx: number;
  },
): Promise<{ pageCount: number }> {
  const { pageSizeId, contentStyles, contentWidthPx, imageMaxHeightPx } = options;
  const t0 = performance.now();
  const maxWidth = contentWidthPx;
  const maxHeight = imageMaxHeightPx;

  const { Previewer } = await import('pagedjs');

  let prePagedStyle: HTMLStyleElement | null = null;
  let sourceReleased = false;

  const flowRoot = mountPrintFlowInPagesHost(pagesHost, previewRoot);
  const flowPreview = getPrintPreviewRoot(pagesHost) ?? flowRoot;

  prePagedStyle = injectPrintPreviewStylesForPaging(pagesHost, pageSizeId, contentStyles);
  pagesHost.style.width = `${Math.max(1, Math.round(maxWidth))}px`;
  void pagesHost.offsetHeight;

  try {
    if (flowPreview) {
      rewriteMermaidIdsInClone(flowPreview);
      await rasterizeAllPrintMermaidsToCanvas(flowPreview, maxWidth, maxHeight);
      void pagesHost.offsetHeight;
      await waitForPrintMermaidReady(flowPreview, 'print-img');
      await waitForBrowserLayoutSettle();
      sanitizePrintFlowForPaging(flowPreview);
      await ensureNoUnsafeSvgBeforePagedJs(flowPreview, maxWidth, maxHeight);
    } else {
      await waitForBrowserLayoutSettle();
    }

    const stylesheet = buildPagedJsStylesheet(pageSizeId, contentStyles);
    const previewer = new Previewer();

    if (!pagesHost.isConnected) {
      throw new Error('Export PDF pagesHost is not connected to the document');
    }

    await waitForBrowserLayoutSettle(50);

    debugExportPdf('pagedjs', 'Previewer.preview() start', {
      flowChildCount: flowRoot.childElementCount,
      pagesHostConnected: pagesHost.isConnected,
      preview: previewContentStats(flowPreview),
    });

    let flow;
    try {
      flow = await capturePagedJsWarnings(() => previewer.preview(pagesHost, [stylesheet], pagesHost));
    } catch (err) {
      debugExportPdfError('pagedjs', 'Previewer.preview() threw', err, {
        elapsedMs: Math.round(performance.now() - t0),
      });
      throw err;
    }

    const pageCount = Math.max(1, flow.total);

    if (flowPreview) {
      copyPrintMermaidCanvases(flowPreview, pagesHost);
      debugExportPdf('pagedjs', 'mermaid synced source→pages', pagedOutputStats(pagesHost));
    }

    stampPagedJsBodyPages(pagesHost);
    transferHeadingIdsToPagedPages(previewRoot, pagesHost);

    debugExportPdf('pagedjs', 'Previewer.preview() done', {
      pageCount,
      elapsedMs: Math.round(performance.now() - t0),
      ...pagedOutputStats(pagesHost),
    });

    await releasePrintPagingSourceDom(pagesHost, prePagedStyle);
    sourceReleased = true;
    prePagedStyle = null;

    return { pageCount };
  } finally {
    if (!sourceReleased) {
      await releasePrintPagingSourceDom(pagesHost, prePagedStyle);
    }
  }
}

/**
 * Full pipeline: markdown → render (mermaid/tables/images) → Paged.js → display in pagesHost.
 */
export async function renderMarkdownToPagedPreview(
  options: RenderMarkdownToPagedPreviewOptions,
): Promise<{ pageCount: number }> {
  return withPagedJsPreviewLock(async () => {
    const {
      markdown,
      pagesHost,
      pageSizeId,
      contentStyles,
      headingId = defaultPrintHeadingId,
      getPresignedUrl,
      currentNotePath,
      imageMaxWidth,
      imageMaxHeight,
    } = options;

    const t0 = performance.now();
    debugExportPdf('paged-preview', 'pipeline start', { pageSizeId });

    clearStalePagedJsDom(pagesHost);
    pagesHost.replaceChildren();
    setPrintPagingActive(pagesHost, true);

    const inner = getPrintPageInnerSizePx(pageSizeId);
    const contentWidthPx = inner.widthPx;
    const imageMaxWidthPx = parsePrintImageMaxPx(imageMaxWidth, inner.widthPx, inner.widthPx);
    const imageMaxHeightPx = parsePrintImageMaxPx(imageMaxHeight, inner.heightPx, inner.heightPx);

    const previewRoot = createMarkdownPreviewRoot(markdown, headingId);

    const measureShell = document.createElement('div');
    measureShell.className = 'export-pdf-staging-measure';
    measureShell.style.cssText = [
      'position:absolute',
      'left:0',
      'top:0',
      'visibility:hidden',
      'pointer-events:none',
      'width:' + `${contentWidthPx}px`,
    ].join(';');
    pagesHost.appendChild(measureShell);
    measureShell.appendChild(previewRoot);

    try {
      await renderMarkdownFlow(previewRoot, {
        contentWidthPx,
        imageMaxWidthPx,
        imageMaxHeightPx,
        ...(getPresignedUrl ? { getPresignedUrl, currentNotePath } : {}),
      });

      debugExportPdf('paged-preview', 'phase 1 render done', {
        elapsedMs: Math.round(performance.now() - t0),
        preview: previewContentStats(previewRoot),
      });

      measureShell.remove();

      const result = await paginateRenderedFlow(pagesHost, previewRoot, {
        pageSizeId,
        contentStyles,
        contentWidthPx,
        imageMaxHeightPx,
      });

      debugExportPdf('paged-preview', 'pipeline complete', {
        pageCount: result.pageCount,
        elapsedMs: Math.round(performance.now() - t0),
      });

      return result;
    } finally {
      measureShell.remove();
    }
  });
}

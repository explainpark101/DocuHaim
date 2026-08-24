import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import {
  defaultPrintHeadingId,
  renderMarkdownToPagedPreview,
  type PrintHeadingIdFn,
} from '@/utils/printPagedJs';
import { debugExportPdf, debugExportPdfError, pagedOutputStats } from '@/utils/printExportDebug';
import type { PrintPageSizeId } from '@/utils/printPageLayout';

export function usePagedJsPreview(
  markdown: string,
  pagesHostRef: RefObject<HTMLElement | null>,
  layoutKey: string,
  options: {
    pageSizeId: PrintPageSizeId;
    contentStyles: string;
    headingId?: PrintHeadingIdFn;
    getPresignedUrl?: (path: string) => Promise<string | null>;
    currentNotePath?: string | null;
    imageMaxWidth?: string;
    imageMaxHeight?: string;
  },
) {
  const [pageCount, setPageCount] = useState(1);
  const renderedLayoutKeyRef = useRef<string | null>(null);
  const packGenerationRef = useRef(0);

  useLayoutEffect(() => {
    const pagesHost = pagesHostRef.current;
    if (!pagesHost) {
      setPageCount(1);
      renderedLayoutKeyRef.current = null;
      return undefined;
    }

    if (renderedLayoutKeyRef.current === layoutKey) {
      return undefined;
    }

    let cancelled = false;
    const generation = (packGenerationRef.current += 1);

    void (async () => {
      debugExportPdf('paged-preview', 'layout start', { layoutKey, generation });
      const t0 = performance.now();

      try {
        const renderOptions = {
          markdown,
          pagesHost,
          pageSizeId: options.pageSizeId,
          contentStyles: options.contentStyles,
          headingId: options.headingId ?? defaultPrintHeadingId,
          ...(options.getPresignedUrl ? {
            getPresignedUrl: options.getPresignedUrl,
            currentNotePath: options.currentNotePath ?? null,
          } : {}),
          ...(options.imageMaxWidth != null && options.imageMaxWidth !== ''
            ? { imageMaxWidth: options.imageMaxWidth }
            : {}),
          ...(options.imageMaxHeight != null && options.imageMaxHeight !== ''
            ? { imageMaxHeight: options.imageMaxHeight }
            : {}),
        };
        const { pageCount: count } = await renderMarkdownToPagedPreview(renderOptions);
        if (cancelled || generation !== packGenerationRef.current) return;
        renderedLayoutKeyRef.current = layoutKey;
        setPageCount(count);
        debugExportPdf('paged-preview', 'complete', {
          pageCount: count,
          elapsedMs: Math.round(performance.now() - t0),
          output: pagedOutputStats(pagesHost),
        });
      } catch (err) {
        debugExportPdfError('paged-preview', 'renderMarkdownToPagedPreview failed', err, {
          layoutKey,
          elapsedMs: Math.round(performance.now() - t0),
        });
        if (!cancelled) setPageCount(1);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    layoutKey,
    markdown,
    options.contentStyles,
    options.currentNotePath,
    options.getPresignedUrl,
    options.headingId,
    options.imageMaxHeight,
    options.imageMaxWidth,
    options.pageSizeId,
    pagesHostRef,
  ]);

  return {
    pageCount,
    contentHeight: pageCount,
  };
}

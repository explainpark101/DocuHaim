import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { renderAllLazyMermaidsInRoot } from '@/utils/lazyMermaid';
import { renderPagedJsPreview } from '@/utils/printPagedJs';
import { waitForPrintStagingReady } from '@/utils/printStagingReady';
import { debugExportPdf, debugExportPdfError, pagedOutputStats, previewContentStats } from '@/utils/printExportDebug';
import type { PrintPageSizeId } from '@/utils/printPageLayout';

export function usePagedJsPreview(
  stagingRootRef: RefObject<HTMLElement | null>,
  pagesHostRef: RefObject<HTMLElement | null>,
  imageMaxProbeRef: RefObject<HTMLElement | null>,
  layoutKey: string,
  options: {
    pageSizeId: PrintPageSizeId;
    contentStyles: string;
  },
) {
  const [pageCount, setPageCount] = useState(1);
  const renderedLayoutKeyRef = useRef<string | null>(null);
  const packGenerationRef = useRef(0);

  useLayoutEffect(() => {
    const staging = stagingRootRef.current;
    const pagesHost = pagesHostRef.current;
    if (!staging || !pagesHost) {
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

      await renderAllLazyMermaidsInRoot(staging);
      if (cancelled || generation !== packGenerationRef.current) return;
      const afterLazy = [...staging.querySelectorAll('.md-editor-mermaid')].map((el, i) => ({
        i,
        hasSvg: Boolean(el.querySelector('svg')),
        error: el.getAttribute('data-haim-mermaid-error'),
      }));
      debugExportPdf('lazy-mermaid', 'renderAllLazyMermaidsInRoot done', {
        count: afterLazy.length,
        hosts: afterLazy,
        elapsedMs: Math.round(performance.now() - t0),
      });

      const stagingReady = await waitForPrintStagingReady(staging);
      if (cancelled || generation !== packGenerationRef.current) return;
      debugExportPdf('paged-preview', 'staging ready', { stagingReady, elapsedMs: Math.round(performance.now() - t0) });

      const preview = staging.querySelector('.md-editor-preview');
      if (!preview) {
        debugExportPdf('paged-preview', 'abort — no .md-editor-preview');
        setPageCount(1);
        pagesHost.replaceChildren();
        return;
      }

      try {
        const { pageCount: count } = await renderPagedJsPreview({
          stagingRoot: staging,
          pagesHost,
          pageSizeId: options.pageSizeId,
          contentStyles: options.contentStyles,
          imageMaxProbe: imageMaxProbeRef.current,
        });
        if (cancelled || generation !== packGenerationRef.current) return;
        renderedLayoutKeyRef.current = layoutKey;
        setPageCount(count);
        debugExportPdf('paged-preview', 'complete', {
          pageCount: count,
          elapsedMs: Math.round(performance.now() - t0),
          staging: previewContentStats(preview),
          output: pagedOutputStats(pagesHost),
        });
      } catch (err) {
        debugExportPdfError('paged-preview', 'renderPagedJsPreview failed', err, {
          layoutKey,
          elapsedMs: Math.round(performance.now() - t0),
        });
        if (!cancelled) setPageCount(1);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [imageMaxProbeRef, layoutKey, options.contentStyles, options.pageSizeId, pagesHostRef, stagingRootRef]);

  return {
    pageCount,
    contentHeight: pageCount,
  };
}

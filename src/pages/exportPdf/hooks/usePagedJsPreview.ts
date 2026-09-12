import { useEffect, useRef, useState, type RefObject } from 'react';
import { PRINT_BODY_PAGE_ATTR } from '@/utils/print/printBodyPage';
import { applyExportPdfCodeBlockFragmentChrome } from '@/utils/exportPdf/applyExportPdfCodeBlockFragmentChrome';
import { prepareExportPdfCodeBlocksForPaging } from '@/utils/exportPdf/prepareExportPdfCodeBlocksForPaging';
import { sanitizeExportPdfPagedSource } from '@/utils/exportPdf/sanitizeExportPdfPagedSource';
import { splitExportPdfCodeBlocksByPageHeight } from '@/utils/exportPdf/splitExportPdfCodeBlocksByPageHeight';
import {
  exportPdfLoadDebug,
  exportPdfLoadDebugElapsed,
} from '@/pages/exportPdf/exportPdfLoadDebug';
import { buildExportPdfPagedStyles } from '@/pages/exportPdf/exportPdfPagedStyles';
import type { ExportPdfPagedStatus } from '@/pages/exportPdf/exportPdfPagedStatus';
import {
  getPrintPageInnerSizePx,
  type PrintPageMarginsMm,
  type PrintPageSizeId,
} from '@/utils/printPageLayout';

type Args = {
  sourceRef: RefObject<HTMLElement | null>;
  outputRef: RefObject<HTMLElement | null>;
  layoutKey: string;
  pageSizeId: PrintPageSizeId;
  /** paged.js @page margin in mm (0 = full-bleed; object = TRBL). */
  marginMm?: number | PrintPageMarginsMm;
  bodyLineHeight?: string;
  headingLineHeight?: string;
  baseFontSizePx?: string;
};

type PagedPreviewer = {
  preview: (
    content?: HTMLElement | DocumentFragment | string | null,
    stylesheets?: Array<string | Record<string, string>> | null,
    renderTo?: HTMLElement | null,
  ) => Promise<{ total?: number }>;
  polisher?: { destroy?: () => void };
};

/** Settle delay so MdPreview + fit/mermaid hooks finish before first paginate. */
const SETTLE_MS = 280;
/** One follow-up pass for late image/mermaid paint after the first successful run. */
const FOLLOW_UP_MS = 700;
/** Retry interval while waiting for MdPreview to mount. */
const PREVIEW_RETRY_MS = 120;
const PREVIEW_RETRY_MAX_MS = 12_000;

function destroyPreviewer(previewer: PagedPreviewer | null): void {
  previewer?.polisher?.destroy?.();
}

function cleanupPagedJsStyles(): void {
  for (const el of document.querySelectorAll('style[data-pagedjs-inserted-styles]')) {
    el.remove();
  }
}

function waitForImages(root: ParentNode): Promise<{
  total: number;
  pending: number;
  alreadyComplete: number;
}> {
  const images = [...root.querySelectorAll('img')];
  if (!images.length) {
    return Promise.resolve({ total: 0, pending: 0, alreadyComplete: 0 });
  }
  let alreadyComplete = 0;
  let pending = 0;
  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            alreadyComplete += 1;
            resolve();
            return;
          }
          pending += 1;
          const done = () => resolve();
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
        }),
    ),
  ).then(() => ({ total: images.length, pending, alreadyComplete }));
}

function afterPaint(): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
}

function tagBodyPages(root: HTMLElement): number {
  const pages = [...root.querySelectorAll<HTMLElement>('.pagedjs_page')];
  pages.forEach((page, index) => {
    page.setAttribute(PRINT_BODY_PAGE_ATTR, String(index));
    page.classList.add('export-pdf-page');
  });
  return Math.max(1, pages.length);
}

function buildPagedSourceFromPreview(
  preview: Element,
  options: {
    pageSizeId: PrintPageSizeId;
    marginMm?: number | PrintPageMarginsMm;
    bodyLineHeight?: string;
    headingLineHeight?: string;
    baseFontSizePx?: string;
  },
): HTMLElement | null {
  const html = preview.innerHTML?.trim() ?? '';
  if (!html) return null;

  const wrapper = document.createElement('div');
  wrapper.className = 'export-pdf-paged-source';
  wrapper.setAttribute('data-export-pdf-preview', '1');
  wrapper.style.width = '100%';
  wrapper.style.boxSizing = 'border-box';
  wrapper.innerHTML = html;

  // Drop code-block / mermaid chrome (copy, pin, lang head) from the print flow.
  for (const el of wrapper.querySelectorAll(
    '.md-editor-code-head, .md-editor-copy-button, .md-editor-code-action, .md-editor-mermaid-action',
  )) {
    el.remove();
  }

  prepareExportPdfCodeBlocksForPaging(wrapper);
  sanitizeExportPdfPagedSource(wrapper);

  // Split tall fences into page-sized sibling chunks so paged.js never resumes
  // mid-fence (Layout repeated aborts and drops the remainder).
  const inner = getPrintPageInnerSizePx(options.pageSizeId, options.marginMm);
  const measureCss = buildExportPdfPagedStyles(options.pageSizeId, {
    ...(options.bodyLineHeight != null
      ? { bodyLineHeight: options.bodyLineHeight }
      : {}),
    ...(options.headingLineHeight != null
      ? { headingLineHeight: options.headingLineHeight }
      : {}),
    ...(options.baseFontSizePx != null
      ? { baseFontSizePx: options.baseFontSizePx }
      : {}),
    ...(options.marginMm != null ? { marginMm: options.marginMm } : {}),
  });
  splitExportPdfCodeBlocksByPageHeight(wrapper, {
    maxHeightPx: inner.heightPx,
    widthPx: inner.widthPx,
    measureCss,
  });

  return wrapper;
}

function formatPagedError(error: unknown): string {
  if (error instanceof Error && error.message.trim()) return error.message.trim();
  if (typeof error === 'string' && error.trim()) return error.trim();
  return 'Unknown pagination error';
}

function summarizeLayoutKey(layoutKey: string): string {
  if (layoutKey.length <= 120) return layoutKey;
  return `${layoutKey.slice(0, 80)}…(${layoutKey.length} chars)`;
}

function marginMmDepKey(marginMm: number | PrintPageMarginsMm | undefined): string {
  if (marginMm == null) return '';
  if (typeof marginMm === 'number') return String(marginMm);
  return `${marginMm.top},${marginMm.right},${marginMm.bottom},${marginMm.left}`;
}

/**
 * Run paged.js Previewer from staging MdPreview into outputRef.
 * Re-runs only when `layoutKey` / `pageSizeId` change — not on every fit-hook style mutation
 * (that caused flicker / raw-text flashes).
 */
export function usePagedJsPreview({
  sourceRef,
  outputRef,
  layoutKey,
  pageSizeId,
  marginMm,
  bodyLineHeight,
  headingLineHeight,
  baseFontSizePx,
}: Args) {
  const [pageCount, setPageCount] = useState(1);
  const [packLayoutKey, setPackLayoutKey] = useState(layoutKey);
  const [status, setStatus] = useState<ExportPdfPagedStatus>('settling');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasPages, setHasPages] = useState(false);
  const generationRef = useRef(0);
  const previewerRef = useRef<PagedPreviewer | null>(null);
  const runSeqRef = useRef(0);
  /** Object margins are new each render — depend on a stable key, not identity. */
  const marginKey = marginMmDepKey(marginMm);

  useEffect(() => {
    let cancelled = false;
    const generation = (generationRef.current += 1);
    const effectStartedAt = Date.now();
    const timers: number[] = [];
    const pendingDelayResolvers = new Set<() => void>();
    setStatus('settling');
    setErrorMessage(null);

    exportPdfLoadDebug('paged:effect-start', {
      generation,
      pageSizeId,
      marginMm: marginMm ?? null,
      settleMs: SETTLE_MS,
      followUpMs: FOLLOW_UP_MS,
      layoutKey: summarizeLayoutKey(layoutKey),
      bodyLineHeight,
      headingLineHeight,
      baseFontSizePx,
    });

    const isCurrent = () => !cancelled && generation === generationRef.current;

    const setStatusLogged = (next: ExportPdfPagedStatus, detail?: Record<string, unknown>) => {
      setStatus(next);
      exportPdfLoadDebug('paged:status', {
        generation,
        status: next,
        ...detail,
      });
    };

    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        const finish = () => {
          pendingDelayResolvers.delete(finish);
          resolve();
        };
        pendingDelayResolvers.add(finish);
        timers.push(window.setTimeout(finish, ms));
      });

    const waitForPreviewEl = async (
      runId: number,
      isActive: () => boolean,
    ): Promise<Element | null> => {
      const started = Date.now();
      let attempts = 0;
      let loggedWaitingStatus = false;
      while (isActive()) {
        const source = sourceRef.current;
        const preview = source?.querySelector('.md-editor-preview') ?? null;
        attempts += 1;
        if (preview) {
          exportPdfLoadDebugElapsed('paged:preview-ready', started, {
            generation,
            runId,
            attempts,
            htmlLength: preview.innerHTML?.length ?? 0,
          });
          return preview;
        }
        if (Date.now() - started >= PREVIEW_RETRY_MAX_MS) {
          exportPdfLoadDebugElapsed('paged:preview-timeout', started, {
            generation,
            runId,
            attempts,
            maxMs: PREVIEW_RETRY_MAX_MS,
            hasSource: Boolean(source),
          });
          return null;
        }
        if (!loggedWaitingStatus) {
          loggedWaitingStatus = true;
          setStatusLogged('waiting-preview', { generation, runId, attempts });
        }
        if (attempts === 1 || attempts % 10 === 0) {
          exportPdfLoadDebug('paged:preview-waiting', {
            generation,
            runId,
            attempts,
            waitedMs: Math.round(Date.now() - started),
            hasSource: Boolean(source),
          });
        }
        setStatus('waiting-preview');
        await delay(PREVIEW_RETRY_MS);
      }
      return null;
    };

    /**
     * Only one pagination pass may own the previewer at a time.
     * Overlapping settle + follow-up used to destroy the in-flight Previewer and
     * surface paged.js crashes like: Cannot read properties of null (reading 'getAttribute').
     */
    let activeRunId = 0;

    const run = async (pass: 'settle' | 'follow-up') => {
      if (!isCurrent()) {
        exportPdfLoadDebug('paged:run-skip-stale', { generation, pass });
        return;
      }

      const runId = (runSeqRef.current += 1);
      activeRunId = runId;
      const isActive = () => isCurrent() && activeRunId === runId;
      const runStartedAt = Date.now();
      setErrorMessage(null);
      exportPdfLoadDebug('paged:run-start', {
        generation,
        runId,
        pass,
        pageSizeId,
        layoutKey: summarizeLayoutKey(layoutKey),
      });

      const source = sourceRef.current;
      const output = outputRef.current;
      if (!source || !output) {
        if (!isActive()) return;
        exportPdfLoadDebug('paged:missing-containers', {
          generation,
          runId,
          pass,
          hasSource: Boolean(source),
          hasOutput: Boolean(output),
        });
        setPageCount(1);
        setPackLayoutKey(`${layoutKey}|empty`);
        setHasPages(false);
        setStatusLogged('error', { generation, runId, reason: 'missing-containers' });
        setErrorMessage('미리보기 컨테이너를 찾지 못했습니다.');
        return;
      }

      setStatusLogged('waiting-preview', { generation, runId, pass });
      const preview = await waitForPreviewEl(runId, isActive);
      if (!isActive()) {
        exportPdfLoadDebug('paged:run-aborted-after-preview-wait', {
          generation,
          runId,
          pass,
        });
        return;
      }
      if (!preview) {
        setStatusLogged('error', { generation, runId, reason: 'preview-not-ready' });
        setErrorMessage('마크다운 미리보기가 준비되지 않았습니다. 페이지를 새로고침해 보세요.');
        return;
      }

      setStatusLogged('waiting-images', { generation, runId, pass });
      let scratch: HTMLDivElement | null = null;
      let ownedPreviewer: PagedPreviewer | null = null;
      try {
        const imageStats = await waitForImages(preview);
        exportPdfLoadDebugElapsed('paged:images-ready', runStartedAt, {
          generation,
          runId,
          pass,
          ...imageStats,
        });
        await afterPaint();
        if (!isActive()) {
          exportPdfLoadDebug('paged:run-aborted-after-images', {
            generation,
            runId,
            pass,
          });
          return;
        }

        const wrapper = buildPagedSourceFromPreview(preview, {
          pageSizeId,
          ...(marginMm != null ? { marginMm } : {}),
          ...(bodyLineHeight != null ? { bodyLineHeight } : {}),
          ...(headingLineHeight != null ? { headingLineHeight } : {}),
          ...(baseFontSizePx != null ? { baseFontSizePx } : {}),
        });
        if (!wrapper) {
          exportPdfLoadDebug('paged:empty-source', {
            generation,
            runId,
            pass,
            previewHtmlLength: preview.innerHTML?.length ?? 0,
          });
          // Empty markdown — treat as a single blank page, not a failure.
          output.replaceChildren();
          setPageCount(1);
          setPackLayoutKey(`${layoutKey}|empty`);
          setHasPages(false);
          setStatusLogged('idle', { generation, runId, reason: 'empty-source' });
          setErrorMessage(null);
          return;
        }

        exportPdfLoadDebug('paged:source-built', {
          generation,
          runId,
          pass,
          sourceHtmlLength: wrapper.innerHTML.length,
          imgCount: wrapper.querySelectorAll('img').length,
          mermaidCount: wrapper.querySelectorAll('.md-editor-mermaid').length,
          codeBlockCount: wrapper.querySelectorAll('.md-editor-code').length,
          tableCount: wrapper.querySelectorAll('table').length,
        });

        scratch = document.createElement('div');
        scratch.className = 'export-pdf-pages-scratch';
        scratch.setAttribute('aria-hidden', 'true');
        scratch.style.cssText =
          'position:absolute;left:-10000px;top:0;width:var(--print-page-width,210mm);visibility:hidden;pointer-events:none;';
        document.body.appendChild(scratch);

        destroyPreviewer(previewerRef.current);
        previewerRef.current = null;
        cleanupPagedJsStyles();

        setStatusLogged('loading-engine', { generation, runId, pass });
        const engineImportStartedAt = Date.now();
        const { loadPagedJsPreviewer } = await import(
          '@/utils/exportPdf/loadPagedJsPreviewer'
        );
        const Previewer = await loadPagedJsPreviewer();
        exportPdfLoadDebugElapsed('paged:engine-imported', engineImportStartedAt, {
          generation,
          runId,
          pass,
        });
        if (!isActive()) {
          exportPdfLoadDebug('paged:run-aborted-after-engine-import', {
            generation,
            runId,
            pass,
          });
          return;
        }

        const stylesCss = buildExportPdfPagedStyles(pageSizeId, {
          ...(bodyLineHeight != null ? { bodyLineHeight } : {}),
          ...(headingLineHeight != null ? { headingLineHeight } : {}),
          ...(baseFontSizePx != null ? { baseFontSizePx } : {}),
          ...(marginMm != null ? { marginMm } : {}),
        });
        const paged = new Previewer() as PagedPreviewer;
        ownedPreviewer = paged;
        previewerRef.current = paged;

        setStatusLogged('paginating', {
          generation,
          runId,
          pass,
          stylesCssLength: stylesCss.length,
        });
        const paginateStartedAt = Date.now();
        const flow = await paged.preview(
          wrapper,
          [{ [`${window.location.origin}/export-pdf-paged.css`]: stylesCss }],
          scratch,
        );
        exportPdfLoadDebugElapsed('paged:paginate-done', paginateStartedAt, {
          generation,
          runId,
          pass,
          flowTotal: flow?.total ?? null,
          scratchPageCount: scratch.querySelectorAll('.pagedjs_page').length,
        });

        if (!isActive()) {
          exportPdfLoadDebug('paged:run-aborted-after-paginate', {
            generation,
            runId,
            pass,
          });
          return;
        }

        const count = tagBodyPages(scratch);
        applyExportPdfCodeBlockFragmentChrome(scratch);
        const total =
          typeof flow?.total === 'number' && flow.total > 0 ? flow.total : count;

        // Atomic swap — previous pages stay visible until the new flow is ready.
        output.replaceChildren(...Array.from(scratch.childNodes));

        setPageCount(Math.max(1, total));
        setPackLayoutKey(`${layoutKey}|paged|${total}`);
        setHasPages(true);
        setStatusLogged('idle', {
          generation,
          runId,
          pass,
          pageCount: Math.max(1, total),
        });
        setErrorMessage(null);
        exportPdfLoadDebugElapsed('paged:run-success', runStartedAt, {
          generation,
          runId,
          pass,
          pageCount: Math.max(1, total),
          effectElapsedMs: Math.round(Date.now() - effectStartedAt),
        });
      } catch (error) {
        if (!isActive()) {
          // Superseded / unmounted — paged.js often throws getAttribute-on-null when
          // its Previewer was destroyed mid-flight. Do not treat as a user-facing failure.
          exportPdfLoadDebugElapsed('paged:run-aborted-with-throw', runStartedAt, {
            generation,
            runId,
            pass,
            error: formatPagedError(error),
          });
          return;
        }
        console.warn('[usePagedJsPreview] pagination failed', error);
        exportPdfLoadDebugElapsed('paged:run-error', runStartedAt, {
          generation,
          runId,
          pass,
          error: formatPagedError(error),
        });
        const outputEl = outputRef.current;
        const stillHasPages = Boolean(outputEl?.querySelector('.pagedjs_page'));
        setHasPages(stillHasPages);
        if (!stillHasPages) {
          setPageCount(1);
          setPackLayoutKey(`${layoutKey}|error`);
        }
        setStatusLogged('error', {
          generation,
          runId,
          pass,
          stillHasPages,
          error: formatPagedError(error),
        });
        setErrorMessage(formatPagedError(error));
      } finally {
        scratch?.remove();
        if (ownedPreviewer && previewerRef.current === ownedPreviewer && !isActive()) {
          destroyPreviewer(ownedPreviewer);
          previewerRef.current = null;
        }
      }
    };

    // First pass after settle, then a follow-up — never overlapping (overlap broke paged.js).
    timers.push(
      window.setTimeout(() => {
        void (async () => {
          if (!isCurrent()) return;
          exportPdfLoadDebug('paged:schedule-settle', { generation });
          await run('settle');
          if (!isCurrent()) return;
          exportPdfLoadDebug('paged:schedule-follow-up-wait', {
            generation,
            followUpMs: FOLLOW_UP_MS,
          });
          await delay(FOLLOW_UP_MS);
          if (!isCurrent()) return;
          exportPdfLoadDebug('paged:schedule-follow-up', { generation });
          await run('follow-up');
        })();
      }, SETTLE_MS),
    );

    exportPdfLoadDebug('paged:timers-scheduled', {
      generation,
      settleAtMs: SETTLE_MS,
      followUpAfterSettleMs: FOLLOW_UP_MS,
    });

    return () => {
      cancelled = true;
      exportPdfLoadDebugElapsed('paged:effect-cleanup', effectStartedAt, {
        generation,
      });
      for (const id of timers) window.clearTimeout(id);
      for (const resolve of pendingDelayResolvers) resolve();
      pendingDelayResolvers.clear();
      destroyPreviewer(previewerRef.current);
      previewerRef.current = null;
      cleanupPagedJsStyles();
      for (const el of document.querySelectorAll('.export-pdf-pages-scratch')) {
        el.remove();
      }
    };
  }, [
    baseFontSizePx,
    bodyLineHeight,
    headingLineHeight,
    layoutKey,
    marginKey,
    outputRef,
    pageSizeId,
    sourceRef,
  ]);

  return {
    pageCount,
    packLayoutKey,
    status,
    errorMessage,
    hasPages,
    isRendering: status !== 'idle' && status !== 'error',
  };
}

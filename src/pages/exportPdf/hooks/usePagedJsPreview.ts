import { useEffect, useRef, useState, type RefObject } from 'react';
import { PRINT_BODY_PAGE_ATTR } from '@/utils/print/printBodyPage';
import { applyExportPdfCodeBlockFragmentChrome } from '@/utils/exportPdf/applyExportPdfCodeBlockFragmentChrome';
import { prepareExportPdfCodeBlocksForPaging } from '@/utils/exportPdf/prepareExportPdfCodeBlocksForPaging';
import { buildExportPdfPagedStyles } from '@/pages/exportPdf/exportPdfPagedStyles';
import type { ExportPdfPagedStatus } from '@/pages/exportPdf/exportPdfPagedStatus';
import type { PrintPageSizeId } from '@/utils/printPageLayout';

type Args = {
  sourceRef: RefObject<HTMLElement | null>;
  outputRef: RefObject<HTMLElement | null>;
  layoutKey: string;
  pageSizeId: PrintPageSizeId;
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

function waitForImages(root: ParentNode): Promise<void> {
  const images = [...root.querySelectorAll('img')];
  if (!images.length) return Promise.resolve();
  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          const done = () => resolve();
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
        }),
    ),
  ).then(() => undefined);
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

function buildPagedSourceFromPreview(preview: Element): HTMLElement | null {
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

  return wrapper;
}

function formatPagedError(error: unknown): string {
  if (error instanceof Error && error.message.trim()) return error.message.trim();
  if (typeof error === 'string' && error.trim()) return error.trim();
  return 'Unknown pagination error';
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

  useEffect(() => {
    let cancelled = false;
    const generation = (generationRef.current += 1);
    const timers: number[] = [];
    const pendingDelayResolvers = new Set<() => void>();
    setStatus('settling');
    setErrorMessage(null);

    const isCurrent = () => !cancelled && generation === generationRef.current;

    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        const finish = () => {
          pendingDelayResolvers.delete(finish);
          resolve();
        };
        pendingDelayResolvers.add(finish);
        timers.push(window.setTimeout(finish, ms));
      });

    const waitForPreviewEl = async (): Promise<Element | null> => {
      const started = Date.now();
      while (isCurrent()) {
        const source = sourceRef.current;
        const preview = source?.querySelector('.md-editor-preview') ?? null;
        if (preview) return preview;
        if (Date.now() - started >= PREVIEW_RETRY_MAX_MS) return null;
        setStatus('waiting-preview');
        await delay(PREVIEW_RETRY_MS);
      }
      return null;
    };

    const run = async () => {
      if (!isCurrent()) return;

      const source = sourceRef.current;
      const output = outputRef.current;
      if (!source || !output) {
        setPageCount(1);
        setPackLayoutKey(`${layoutKey}|empty`);
        setHasPages(false);
        setStatus('error');
        setErrorMessage('미리보기 컨테이너를 찾지 못했습니다.');
        return;
      }

      setStatus('waiting-preview');
      const preview = await waitForPreviewEl();
      if (!isCurrent()) return;
      if (!preview) {
        setStatus('error');
        setErrorMessage('마크다운 미리보기가 준비되지 않았습니다. 페이지를 새로고침해 보세요.');
        return;
      }

      setStatus('waiting-images');
      let scratch: HTMLDivElement | null = null;
      try {
        await waitForImages(preview);
        await afterPaint();
        if (!isCurrent()) return;

        const wrapper = buildPagedSourceFromPreview(preview);
        if (!wrapper) {
          // Empty markdown — treat as a single blank page, not a failure.
          output.replaceChildren();
          setPageCount(1);
          setPackLayoutKey(`${layoutKey}|empty`);
          setHasPages(false);
          setStatus('idle');
          setErrorMessage(null);
          return;
        }

        scratch = document.createElement('div');
        scratch.className = 'export-pdf-pages-scratch';
        scratch.setAttribute('aria-hidden', 'true');
        scratch.style.cssText =
          'position:absolute;left:-10000px;top:0;width:var(--print-page-width,210mm);visibility:hidden;pointer-events:none;';
        document.body.appendChild(scratch);

        destroyPreviewer(previewerRef.current);
        previewerRef.current = null;
        cleanupPagedJsStyles();

        setStatus('loading-engine');
        const { Previewer } = await import('pagedjs');
        if (!isCurrent()) return;

        const stylesCss = buildExportPdfPagedStyles(pageSizeId, {
          ...(bodyLineHeight != null ? { bodyLineHeight } : {}),
          ...(headingLineHeight != null ? { headingLineHeight } : {}),
          ...(baseFontSizePx != null ? { baseFontSizePx } : {}),
        });
        const paged = new Previewer() as PagedPreviewer;
        previewerRef.current = paged;

        setStatus('paginating');
        const flow = await paged.preview(
          wrapper,
          [{ [`${window.location.origin}/export-pdf-paged.css`]: stylesCss }],
          scratch,
        );

        if (!isCurrent()) return;

        const count = tagBodyPages(scratch);
        applyExportPdfCodeBlockFragmentChrome(scratch);
        const total =
          typeof flow?.total === 'number' && flow.total > 0 ? flow.total : count;

        // Atomic swap — previous pages stay visible until the new flow is ready.
        output.replaceChildren(...Array.from(scratch.childNodes));

        setPageCount(Math.max(1, total));
        setPackLayoutKey(`${layoutKey}|paged|${total}`);
        setHasPages(true);
        setStatus('idle');
        setErrorMessage(null);
      } catch (error) {
        console.warn('[usePagedJsPreview] pagination failed', error);
        if (isCurrent()) {
          const outputEl = outputRef.current;
          const stillHasPages = Boolean(outputEl?.querySelector('.pagedjs_page'));
          setHasPages(stillHasPages);
          if (!stillHasPages) {
            setPageCount(1);
            setPackLayoutKey(`${layoutKey}|error`);
          }
          setStatus('error');
          setErrorMessage(formatPagedError(error));
        }
      } finally {
        scratch?.remove();
      }
    };

    // Debounced first pass after settle (MdPreview + fit/mermaid).
    timers.push(
      window.setTimeout(() => {
        if (isCurrent()) void run();
      }, SETTLE_MS),
    );
    // Follow-up for late-loading images / mermaid SVG.
    timers.push(
      window.setTimeout(() => {
        if (isCurrent()) void run();
      }, SETTLE_MS + FOLLOW_UP_MS),
    );

    return () => {
      cancelled = true;
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
  }, [baseFontSizePx, bodyLineHeight, headingLineHeight, layoutKey, outputRef, pageSizeId, sourceRef]);

  return {
    pageCount,
    packLayoutKey,
    status,
    errorMessage,
    hasPages,
    isRendering: status !== 'idle' && status !== 'error',
  };
}

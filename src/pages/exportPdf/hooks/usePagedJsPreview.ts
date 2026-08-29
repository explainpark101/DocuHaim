import { useEffect, useRef, useState, type RefObject } from 'react';
import { PRINT_BODY_PAGE_ATTR } from '@/utils/print/printBodyPage';
import { buildExportPdfPagedStyles } from '@/pages/exportPdf/exportPdfPagedStyles';
import type { PrintPageSizeId } from '@/utils/printPageLayout';

type Args = {
  sourceRef: RefObject<HTMLElement | null>;
  outputRef: RefObject<HTMLElement | null>;
  layoutKey: string;
  pageSizeId: PrintPageSizeId;
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

  // Drop code-block chrome (copy / lang head) from the print flow.
  for (const el of wrapper.querySelectorAll(
    '.md-editor-code-head, .md-editor-copy-button, .md-editor-code-action',
  )) {
    el.remove();
  }

  return wrapper;
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
}: Args) {
  const [pageCount, setPageCount] = useState(1);
  const [packLayoutKey, setPackLayoutKey] = useState(layoutKey);
  const [isRendering, setIsRendering] = useState(false);
  const generationRef = useRef(0);
  const previewerRef = useRef<PagedPreviewer | null>(null);

  useEffect(() => {
    let cancelled = false;
    const generation = (generationRef.current += 1);
    const timers: number[] = [];

    const run = async () => {
      if (cancelled || generation !== generationRef.current) return;

      const source = sourceRef.current;
      const output = outputRef.current;
      if (!source || !output) {
        setPageCount(1);
        setPackLayoutKey(`${layoutKey}|empty`);
        setIsRendering(false);
        return;
      }

      const preview = source.querySelector('.md-editor-preview');
      if (!preview) return;

      setIsRendering(true);
      let scratch: HTMLDivElement | null = null;
      try {
        await waitForImages(preview);
        await afterPaint();
        if (cancelled || generation !== generationRef.current) return;

        const wrapper = buildPagedSourceFromPreview(preview);
        if (!wrapper) return;

        scratch = document.createElement('div');
        scratch.className = 'export-pdf-pages-scratch';
        scratch.setAttribute('aria-hidden', 'true');
        scratch.style.cssText =
          'position:absolute;left:-10000px;top:0;width:var(--print-page-width,210mm);visibility:hidden;pointer-events:none;';
        document.body.appendChild(scratch);

        destroyPreviewer(previewerRef.current);
        previewerRef.current = null;
        cleanupPagedJsStyles();

        const { Previewer } = await import('pagedjs');
        if (cancelled || generation !== generationRef.current) return;

        const stylesCss = buildExportPdfPagedStyles(pageSizeId);
        const paged = new Previewer() as PagedPreviewer;
        previewerRef.current = paged;

        const flow = await paged.preview(
          wrapper,
          [{ [`${window.location.origin}/export-pdf-paged.css`]: stylesCss }],
          scratch,
        );

        if (cancelled || generation !== generationRef.current) return;

        const count = tagBodyPages(scratch);
        const total =
          typeof flow?.total === 'number' && flow.total > 0 ? flow.total : count;

        // Atomic swap — previous pages stay visible until the new flow is ready.
        output.replaceChildren(...Array.from(scratch.childNodes));

        setPageCount(Math.max(1, total));
        setPackLayoutKey(`${layoutKey}|paged|${total}`);
      } catch (error) {
        console.warn('[usePagedJsPreview] pagination failed', error);
        if (!cancelled && generation === generationRef.current) {
          const outputEl = outputRef.current;
          if (outputEl && !outputEl.querySelector('.pagedjs_page')) {
            setPageCount(1);
            setPackLayoutKey(`${layoutKey}|error`);
          }
        }
      } finally {
        scratch?.remove();
        if (!cancelled && generation === generationRef.current) {
          setIsRendering(false);
        }
      }
    };

    // Debounced first pass after settle (MdPreview + fit/mermaid).
    timers.push(
      window.setTimeout(() => {
        if (!cancelled && generation === generationRef.current) void run();
      }, SETTLE_MS),
    );
    // Follow-up for late-loading images / mermaid SVG.
    timers.push(
      window.setTimeout(() => {
        if (!cancelled && generation === generationRef.current) void run();
      }, SETTLE_MS + FOLLOW_UP_MS),
    );

    return () => {
      cancelled = true;
      for (const id of timers) window.clearTimeout(id);
      destroyPreviewer(previewerRef.current);
      previewerRef.current = null;
      cleanupPagedJsStyles();
      for (const el of document.querySelectorAll('.export-pdf-pages-scratch')) {
        el.remove();
      }
    };
  }, [layoutKey, outputRef, pageSizeId, sourceRef]);

  return { pageCount, packLayoutKey, isRendering };
}

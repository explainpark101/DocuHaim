/** Filter DevTools console with: export-pdf */
const LOG_PREFIX = '[export-pdf]';

export type PrintExportDebugPhase =
  | 'paged-preview'
  | 'staging-ready'
  | 'lazy-mermaid'
  | 'pagedjs'
  | 'mermaid-canvas';

export function debugExportPdf(
  phase: PrintExportDebugPhase,
  step: string,
  detail?: Record<string, unknown>,
): void {
  if (detail && Object.keys(detail).length > 0) {
    console.debug(`${LOG_PREFIX} ${phase} · ${step}`, detail);
    return;
  }
  console.debug(`${LOG_PREFIX} ${phase} · ${step}`);
}

export function debugExportPdfWarn(
  phase: PrintExportDebugPhase,
  step: string,
  detail?: Record<string, unknown>,
): void {
  if (detail && Object.keys(detail).length > 0) {
    console.warn(`${LOG_PREFIX} ${phase} · ${step}`, detail);
    return;
  }
  console.warn(`${LOG_PREFIX} ${phase} · ${step}`);
}

export function debugExportPdfError(
  phase: PrintExportDebugPhase,
  step: string,
  err: unknown,
  detail?: Record<string, unknown>,
): void {
  console.error(`${LOG_PREFIX} ${phase} · ${step}`, {
    ...detail,
    error: err instanceof Error ? { name: err.name, message: err.message, stack: err.stack } : err,
  });
}

/** Short mermaid host summary for logs (no full diagram source). */
export function mermaidHostDebugInfo(host: HTMLElement, index?: number): Record<string, unknown> {
  const svg = host.querySelector('svg');
  const canvas = host.querySelector('canvas');
  return {
    index,
    tag: host.tagName,
    line: host.getAttribute('data-line'),
    processed: host.getAttribute('data-processed'),
    canvasState: host.getAttribute('data-print-mermaid-canvas-state'),
    hasSvg: Boolean(svg),
    hasCanvas: Boolean(canvas),
    contentPreview: (host.getAttribute('data-content') || host.textContent || '').trim().slice(0, 60),
    box:
      host.isConnected
        ? {
            w: Math.round(host.getBoundingClientRect().width),
            h: Math.round(host.getBoundingClientRect().height),
          }
        : null,
  };
}

/** Element counts + tail snapshot — spot where content disappears after Mermaid. */
export function previewContentStats(root: ParentNode | null | undefined): Record<string, unknown> {
  if (!root) return { missing: true };

  const preview =
    root instanceof HTMLElement && root.classList.contains('md-editor-preview')
      ? root
      : (root.querySelector('.md-editor-preview') as HTMLElement | null)
        ?? (root instanceof HTMLElement ? root : null);

  if (!preview) return { missing: true, reason: 'no preview root' };

  const childTags = [...preview.children].map((el) => el.tagName.toLowerCase());
  const headings = [...preview.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
    (h.textContent || '').trim().slice(0, 48),
  );
  const mermaids = [...preview.querySelectorAll('img[data-print-mermaid-img], .md-editor-mermaid')].map((el, i) => ({
    i,
    line: el.getAttribute('data-line'),
    state: el.getAttribute('data-print-mermaid-canvas-state'),
    hasSvg: Boolean(el.querySelector('svg')),
    hasCanvas: Boolean(el.querySelector('canvas')),
  }));

  const last = preview.lastElementChild as HTMLElement | null;
  return {
    childCount: preview.childElementCount,
    childTags: childTags.length <= 24 ? childTags : [...childTags.slice(0, 12), '…', ...childTags.slice(-8)],
    textLen: (preview.textContent || '').length,
    headingCount: headings.length,
    headings: headings.slice(0, 6),
    mermaidCount: mermaids.length,
    mermaids,
    lastChild: last
      ? {
          tag: last.tagName,
          class: last.className?.toString?.().slice(0, 80) || '',
          preview: (last.textContent || '').trim().slice(0, 80),
        }
      : null,
  };
}

/** Per-page + totals for Paged.js output (mermaid often lands on page 2+). */
export function pagedOutputStats(pagesHost: HTMLElement): Record<string, unknown> {
  const pages = [...pagesHost.querySelectorAll('.pagedjs_page')].map((page, pageIndex) => {
    const content = page.querySelector('.pagedjs_page_content');
    const mermaids = [...page.querySelectorAll('img[data-print-mermaid-img], .md-editor-mermaid')].map((el, i) => ({
      i,
      line: el.getAttribute('data-line'),
      state: el.getAttribute('data-print-mermaid-canvas-state'),
      tag: el.tagName,
      hasSvg: Boolean(el.querySelector('svg')),
      hasImg: el.tagName === 'IMG',
      box: {
        w: Math.round((el as HTMLElement).getBoundingClientRect().width),
        h: Math.round((el as HTMLElement).getBoundingClientRect().height),
      },
    }));
    return {
      pageIndex,
      bodyPage: page.getAttribute('data-print-body-page'),
      ...previewContentStats(content),
      mermaids,
    };
  });
  return {
    pages,
    totalMermaid: pagesHost.querySelectorAll('img[data-print-mermaid-img], .md-editor-mermaid').length,
    totalWithImg: [...pagesHost.querySelectorAll('img[data-print-mermaid-img]')].length,
  };
}

/** Forward Paged.js / chunker console.warn while preview runs (DevTools filter: export-pdf). */
export function capturePagedJsWarnings<T>(run: () => Promise<T>): Promise<T> {
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    const first = typeof args[0] === 'string' ? args[0] : String(args[0]);
    if (/pagedjs|chunker|overflow|break/i.test(first)) {
      debugExportPdfWarn('pagedjs', 'browser warn', { message: first, extra: args.slice(1) });
    }
    origWarn.apply(console, args);
  };
  return run().finally(() => {
    console.warn = origWarn;
  });
}

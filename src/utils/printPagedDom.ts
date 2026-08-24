import { debugExportPdf } from '@/utils/printExportDebug';
import { waitForBrowserLayoutSettle } from '@/utils/printStagingReady';
import {
  PRINT_BODY_PAGE_ATTR,
  PRINT_PAGEDJS_WRAPPER_CLASS,
  PRINT_PAGED_SOURCE_ATTR,
  setPrintPagingActive,
} from '@/utils/printPagedCss';

const STALE_PAGEDJS_SELECTORS = [
  ':scope > .pagedjs_pages',
  ':scope > .pagedjs_margin',
  ':scope > .pagedjs_area',
] as const;

/** Remove leftover Paged.js output before a fresh preview run. */
export function clearStalePagedJsDom(root: ParentNode): void {
  const scopes = new Set<ParentNode>([root]);
  if (root instanceof HTMLElement) {
    const pagesShell = root.closest('.export-pdf-pages');
    if (pagesShell) scopes.add(pagesShell);
  }

  for (const scope of scopes) {
    if (!(scope instanceof Element)) continue;
    for (const selector of STALE_PAGEDJS_SELECTORS) {
      for (const el of [...scope.querySelectorAll(selector)]) {
        el.remove();
      }
    }
  }
}

/** Drop empty blocks / comments / whitespace text nodes that confuse Paged.js data-ref tracking. */
export function sanitizePrintFlowForPaging(root: HTMLElement): void {
  const commentWalker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT);
  const comments: Comment[] = [];
  while (commentWalker.nextNode()) {
    comments.push(commentWalker.currentNode as Comment);
  }
  for (const comment of comments) {
    comment.remove();
  }

  for (const el of [...root.querySelectorAll('p, div, span')]) {
    if (!(el instanceof HTMLElement)) continue;
    if (!el.textContent?.trim() && el.children.length === 0) {
      el.remove();
    }
  }

  const containers: HTMLElement[] = [root];
  if (!root.classList.contains('md-editor-preview')) {
    const preview = root.querySelector<HTMLElement>('.md-editor-preview');
    if (preview) containers.push(preview);
  }
  const wrapper = root.closest<HTMLElement>(`.${PRINT_PAGEDJS_WRAPPER_CLASS}`);
  if (wrapper && !containers.includes(wrapper)) containers.push(wrapper);

  for (const container of containers) {
    for (const child of [...container.childNodes]) {
      if (child.nodeType !== Node.TEXT_NODE) continue;
      const text = child.textContent ?? '';
      if (!text.trim()) {
        child.remove();
        continue;
      }
      const p = document.createElement('p');
      p.textContent = text;
      container.replaceChild(p, child);
    }
  }
}

/** Last-resort: img-replace or strip any Mermaid SVG before Chunker runs. */
export async function ensureNoUnsafeSvgBeforePagedJs(
  root: HTMLElement,
  maxWidth: number,
  maxHeight: number,
): Promise<void> {
  const { rasterizeMermaidHostToCanvas } = await import('@/utils/printMermaidCanvas');

  for (let pass = 0; pass < 3; pass += 1) {
    const hosts = [...root.querySelectorAll<HTMLElement>('.md-editor-mermaid')].filter(
      (host) => host.querySelector('svg') && !host.matches('img[data-print-mermaid-img]'),
    );
    if (hosts.length === 0) break;

    debugExportPdf('pagedjs', 'coerce remaining mermaid svg', { pass, count: hosts.length });
    for (const host of hosts) {
      await rasterizeMermaidHostToCanvas(host, maxWidth, maxHeight);
    }
  }

  const leftover = [...root.querySelectorAll<SVGElement>('.md-editor-mermaid svg')];
  if (leftover.length > 0) {
    debugExportPdf('pagedjs', 'strip leftover mermaid svg (Paged.js safety)', {
      count: leftover.length,
    });
    for (const svg of leftover) {
      svg.remove();
    }
  }
}

export function getPrintPreviewRoot(stagingRoot: HTMLElement): HTMLElement {
  if (stagingRoot.classList.contains('md-editor-preview')) return stagingRoot;
  return (
    stagingRoot.querySelector<HTMLElement>('.md-editor-preview')
    ?? stagingRoot.querySelector<HTMLElement>('[id$="-preview"]')
    ?? stagingRoot
  );
}

let printMermaidIdSeq = 0;

/** Remap Mermaid SVG ids so cloned diagrams keep theme fills. */
export function rewriteMermaidIdsInClone(root: HTMLElement): void {
  const hosts = root.classList?.contains('md-editor-mermaid')
    ? [root]
    : [...root.querySelectorAll<HTMLElement>('.md-editor-mermaid')];

  for (const host of hosts) {
    const svg = host.querySelector('svg');
    if (!svg) continue;

    printMermaidIdSeq += 1;
    const prefix = `pm${printMermaidIdSeq}-`;
    const idMap = new Map<string, string>();
    const withIds = [svg, ...svg.querySelectorAll('[id]')];
    for (const el of withIds) {
      const oldId = el.id;
      if (!oldId) continue;
      const next = `${prefix}${oldId}`;
      idMap.set(oldId, next);
      el.id = next;
    }
    if (idMap.size === 0) continue;

    const replaceIds = (text: string): string => {
      let out = text;
      const entries = [...idMap.entries()].sort((a, b) => b[0].length - a[0].length);
      for (const [oldId, newId] of entries) {
        out = out.split(oldId).join(newId);
      }
      return out;
    };

    for (const styleEl of svg.querySelectorAll('style')) {
      if (styleEl.textContent) styleEl.textContent = replaceIds(styleEl.textContent);
    }
    for (const el of [svg, ...svg.querySelectorAll('*')]) {
      for (const attr of [...el.attributes]) {
        if (!attr.value.includes('#')) continue;
        const next = replaceIds(attr.value);
        if (next !== attr.value) el.setAttribute(attr.name, next);
      }
    }
  }
}

export function preparePrintPreviewSourceForPaging(content: HTMLElement): void {
  content.setAttribute(PRINT_PAGED_SOURCE_ATTR, '1');
  content.setAttribute('data-export-pdf-preview', '1');
  if (!content.classList.contains('md-editor-preview')) {
    content.classList.add('md-editor-preview');
  }
}

export function stampPagedJsBodyPages(pagesHost: HTMLElement): void {
  const pagesRoot = pagesHost.querySelector('.pagedjs_pages');
  if (pagesRoot instanceof HTMLElement) {
    pagesRoot.setAttribute('data-export-pdf-preview', '1');
  }
  const pages = pagesHost.querySelectorAll('.pagedjs_page');
  pages.forEach((page, index) => {
    if (page instanceof HTMLElement) {
      page.setAttribute(PRINT_BODY_PAGE_ATTR, String(index));
    }
  });
  for (const slot of pagesHost.querySelectorAll('.pagedjs_page_content')) {
    if (slot instanceof HTMLElement) {
      slot.classList.add('md-editor-preview');
    }
  }
}

/** Prefer heading ids on visible paged output for TOC / scroll targets. */
export function transferHeadingIdsToPagedPages(
  sourceRoot: HTMLElement,
  pagesHost: HTMLElement,
): void {
  const packedIds = new Set<string>();
  for (const el of pagesHost.querySelectorAll<HTMLElement>('[id]')) {
    if (el.id) packedIds.add(el.id);
  }
  for (const el of sourceRoot.querySelectorAll<HTMLElement>('[id]')) {
    if (packedIds.has(el.id)) el.removeAttribute('id');
  }
}

/** Wrap flow root so Paged.js never sees stray top-level text nodes. */
export function wrapPrintFlowInPagedJsWrapper(flowRoot: HTMLElement): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = PRINT_PAGEDJS_WRAPPER_CLASS;

  if (flowRoot.hasAttribute(PRINT_PAGED_SOURCE_ATTR)) {
    wrapper.setAttribute(PRINT_PAGED_SOURCE_ATTR, flowRoot.getAttribute(PRINT_PAGED_SOURCE_ATTR)!);
    flowRoot.removeAttribute(PRINT_PAGED_SOURCE_ATTR);
  }
  if (flowRoot.hasAttribute('data-export-pdf-preview')) {
    wrapper.setAttribute('data-export-pdf-preview', flowRoot.getAttribute('data-export-pdf-preview')!);
    flowRoot.removeAttribute('data-export-pdf-preview');
  }

  wrapper.appendChild(flowRoot);
  return wrapper;
}

/** Mount rendered preview flow as a direct child of pagesHost. */
export function mountPrintFlowInPagesHost(
  pagesHost: HTMLElement,
  flowRoot: HTMLElement,
): HTMLElement {
  preparePrintPreviewSourceForPaging(flowRoot);
  sanitizePrintFlowForPaging(flowRoot);
  const wrapper = wrapPrintFlowInPagedJsWrapper(flowRoot);
  pagesHost.appendChild(wrapper);
  return wrapper;
}

/** Remove source flow after Paged.js; keep `.pagedjs_pages` output. */
export function detachPrintFlowFromPagesHost(pagesHost: HTMLElement): void {
  for (const el of pagesHost.querySelectorAll(
    `[${PRINT_PAGED_SOURCE_ATTR}], .${PRINT_PAGEDJS_WRAPPER_CLASS}`,
  )) {
    el.remove();
  }
}

/** Remove source flow + measure styles after Paged.js output is fully materialized. */
export async function releasePrintPagingSourceDom(
  pagesHost: HTMLElement,
  prePagedStyle?: HTMLStyleElement | null,
): Promise<void> {
  await waitForBrowserLayoutSettle(50);

  const pagesRoot = pagesHost.querySelector('.pagedjs_pages');
  debugExportPdf('pagedjs', 'release source dom', {
    hasPagesRoot: Boolean(pagesRoot),
    pageCount: pagesHost.querySelectorAll('.pagedjs_page').length,
    sourceStillMounted: Boolean(
      pagesHost.querySelector(`[${PRINT_PAGED_SOURCE_ATTR}], .${PRINT_PAGEDJS_WRAPPER_CLASS}`),
    ),
  });

  detachPrintFlowFromPagesHost(pagesHost);
  prePagedStyle?.remove();
  for (const el of document.querySelectorAll('[data-export-pdf-paged-source-styles]')) {
    el.remove();
  }
  pagesHost.style.width = '';
  setPrintPagingActive(pagesHost, false);
}

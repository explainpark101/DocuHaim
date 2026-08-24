/**
 * Prepare Mermaid for Export PDF + Paged.js: sized SVG data-URL <img> (atomic flow node).
 */

import {
  isLazyMermaidPlaceholder,
  renderLazyMermaidElement,
} from '@/utils/lazyMermaid';
import { debugExportPdf, debugExportPdfError, mermaidHostDebugInfo } from '@/utils/printExportDebug';

export const PRINT_MERMAID_CANVAS_ATTR = 'data-print-mermaid-canvas';
export const PRINT_MERMAID_CANVAS_STATE_ATTR = 'data-print-mermaid-canvas-state';

export type PrintMermaidCanvasState = 'loading' | 'ready' | 'error' | 'svg' | 'img';

function buildSvgDataUrl(svg: SVGSVGElement, cssWidth: number, cssHeight: number): string {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  clone.setAttribute('width', String(cssWidth));
  clone.setAttribute('height', String(cssHeight));

  if (!clone.getAttribute('viewBox')) {
    const box = svg.getBBox();
    if (box.width > 0 && box.height > 0) {
      clone.setAttribute('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
    }
  }

  const serialized = new XMLSerializer().serializeToString(clone);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(serialized)}`;
}

export const PRINT_MERMAID_IMG_ATTR = 'data-print-mermaid-img';

export function isPrintMermaidOutputNode(el: Element): el is HTMLElement {
  return el instanceof HTMLElement
    && (el.classList.contains('md-editor-mermaid') || el.hasAttribute(PRINT_MERMAID_IMG_ATTR));
}

function parseLength(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const m = String(raw).trim().match(/^([0-9.]+)/);
  if (!m?.[1]) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Scale to page inner max width; optional max height cap for very tall charts. */
export function scaleMermaidDimensions(
  natural: { width: number; height: number },
  maxWidth: number,
  maxHeight?: number,
): { width: number; height: number } {
  if (natural.width < 1 || natural.height < 1) {
    return { width: 1, height: 1 };
  }
  let scale = maxWidth > 0 ? Math.min(maxWidth / natural.width, 1) : 1;
  let width = natural.width * scale;
  let height = natural.height * scale;
  if (maxHeight && maxHeight > 0 && height > maxHeight) {
    scale *= maxHeight / height;
    width = natural.width * scale;
    height = natural.height * scale;
  }
  return {
    width: Math.max(1, Math.round(width)),
    height: Math.max(1, Math.round(height)),
  };
}

/** Natural diagram size in CSS pixels (SVG must be connected to the document). */
export function measureMermaidSvgSize(svg: SVGSVGElement): { width: number; height: number } {
  const attrW = parseLength(svg.getAttribute('width'));
  const attrH = parseLength(svg.getAttribute('height'));
  if (attrW && attrH) return { width: attrW, height: attrH };

  const rect = svg.getBoundingClientRect();
  if (rect.width > 1 && rect.height > 1) {
    return { width: rect.width, height: rect.height };
  }

  const box = svg.getBBox();
  if (box.width > 1 && box.height > 1) {
    return { width: box.width, height: box.height };
  }

  const vb = svg.viewBox.baseVal;
  if (vb.width > 1 && vb.height > 1) {
    return { width: vb.width, height: vb.height };
  }

  return { width: 400, height: 300 };
}

/** Legacy <p> hosts must become block wrappers for valid layout + explicit height. */
export function ensureBlockMermaidHost(host: HTMLElement): HTMLElement {
  if (host.tagName !== 'P') return host;
  const div = document.createElement('div');
  for (const attr of [...host.attributes]) {
    div.setAttribute(attr.name, attr.value);
  }
  while (host.firstChild) div.appendChild(host.firstChild);
  host.replaceWith(div);
  return div;
}

function applyMermaidHostBox(host: HTMLElement, width: number, height: number): void {
  host.style.display = 'block';
  host.style.width = `${width}px`;
  host.style.height = `${height}px`;
  host.style.maxWidth = '100%';
  host.style.lineHeight = '0';
  host.style.margin = '0';
  host.style.padding = '0';
  host.style.boxSizing = 'content-box';
  host.style.overflow = 'hidden';
  host.setAttribute(PRINT_MERMAID_CANVAS_ATTR, '1');
}

function setMermaidCanvasState(host: HTMLElement, state: PrintMermaidCanvasState): void {
  host.setAttribute(PRINT_MERMAID_CANVAS_STATE_ATTR, state);
}

function mermaidHostMatchKey(host: HTMLElement): string {
  const content = (host.getAttribute('data-content') || '').trim();
  if (content) return `c:${content.slice(0, 120)}`;
  const line = host.getAttribute('data-line');
  if (line != null) return `l:${line}`;
  return '';
}

function markMermaidCanvasError(host: HTMLElement, width: number): void {
  setMermaidCanvasState(host, 'error');
  host.replaceChildren();
  const label = document.createElement('div');
  label.className = 'print-mermaid-canvas-error';
  label.textContent = 'Mermaid diagram failed to render';
  host.appendChild(label);
  host.style.width = `${Math.min(width, 320)}px`;
  host.style.height = '40px';
}

function applyMermaidImgBox(img: HTMLImageElement, width: number, height: number): void {
  img.style.setProperty('display', 'block', 'important');
  img.style.setProperty('width', `${width}px`, 'important');
  img.style.setProperty('height', `${height}px`, 'important');
  img.style.setProperty('max-width', '100%', 'important');
  img.style.margin = '0';
  img.style.padding = '0';
  img.width = width;
  img.height = height;
  img.setAttribute(PRINT_MERMAID_CANVAS_ATTR, '1');
}

/** Replace host with sized <img> — Paged.js treats IMG as atomic (not a container DIV). */
function replaceHostWithMermaidImg(
  host: HTMLElement,
  svg: SVGSVGElement,
  cssWidth: number,
  cssHeight: number,
): HTMLImageElement {
  const img = document.createElement('img');
  img.src = buildSvgDataUrl(svg, cssWidth, cssHeight);
  img.alt = '';
  img.className = 'print-mermaid-img';
  img.setAttribute(PRINT_MERMAID_IMG_ATTR, '1');
  for (const name of ['data-line', 'data-content', 'data-haim-imgbb-replace-key'] as const) {
    const val = host.getAttribute(name);
    if (val != null) img.setAttribute(name, val);
  }
  applyMermaidImgBox(img, cssWidth, cssHeight);
  setMermaidCanvasState(img, 'img');
  host.replaceWith(img);
  return img;
}

/**
 * Measure and box a Mermaid SVG host for Paged.js (state: svg).
 * Returns false when the host has no renderable SVG.
 */
export async function rasterizeMermaidHostToCanvas(
  host: HTMLElement,
  maxWidth: number,
  maxHeight?: number,
  index?: number,
): Promise<boolean> {
  debugExportPdf('mermaid-canvas', 'rasterize start', {
    ...mermaidHostDebugInfo(host, index),
    maxWidth,
    maxHeight,
  });

  const blockHost = ensureBlockMermaidHost(host);
  if (blockHost !== host) {
    debugExportPdf('mermaid-canvas', 'converted p→div host', mermaidHostDebugInfo(blockHost, index));
  }
  setMermaidCanvasState(blockHost, 'loading');

  let svg = blockHost.querySelector('svg');
  if (!svg && isLazyMermaidPlaceholder(blockHost)) {
    debugExportPdf('mermaid-canvas', 'lazy render placeholder', mermaidHostDebugInfo(blockHost, index));
    await renderLazyMermaidElement(blockHost);
    svg = blockHost.querySelector('svg');
    debugExportPdf('mermaid-canvas', 'lazy render result', {
      ...mermaidHostDebugInfo(blockHost, index),
      gotSvg: svg instanceof SVGSVGElement,
    });
  }
  if (!(svg instanceof SVGSVGElement)) {
    debugExportPdfError('mermaid-canvas', 'no SVG — marking error', new Error('missing svg'), {
      ...mermaidHostDebugInfo(blockHost, index),
    });
    markMermaidCanvasError(blockHost, maxWidth);
    return false;
  }

  const natural = measureMermaidSvgSize(svg);
  const { width: cssWidth, height: cssHeight } = scaleMermaidDimensions(
    natural,
    maxWidth,
    maxHeight,
  );
  debugExportPdf('mermaid-canvas', 'measured', {
    index,
    natural,
    cssWidth,
    cssHeight,
    svgConnected: svg.isConnected,
  });

  const img = replaceHostWithMermaidImg(blockHost, svg, cssWidth, cssHeight);
  debugExportPdf('mermaid-canvas', 'rasterize img-ready', {
    index,
    css: { w: cssWidth, h: cssHeight },
    srcLen: img.src.length,
  });
  return true;
}

/** Rasterize every Mermaid diagram under root before Paged.js layout. */
export async function rasterizeAllPrintMermaidsToCanvas(
  root: ParentNode,
  maxWidth: number,
  maxHeight?: number,
): Promise<void> {
  debugExportPdf('mermaid-canvas', 'batch start', {
    count: root.querySelectorAll('.md-editor-mermaid').length,
    maxWidth,
    maxHeight,
  });
  const results: Array<{ index: number; ok: boolean; state: string | null }> = [];
  let index = 0;
  while (index < 64) {
    const host = root.querySelector<HTMLElement>('.md-editor-mermaid:not([data-print-mermaid-canvas-state])');
    if (!host) break;
    const ok = await rasterizeMermaidHostToCanvas(host, maxWidth, maxHeight, index);
    const line = host.getAttribute('data-line');
    const finalHost =
      (line ? root.querySelector<HTMLElement>(`img[${PRINT_MERMAID_IMG_ATTR}][data-line="${line}"]`) : null)
      ?? (line ? root.querySelector<HTMLElement>(`.md-editor-mermaid[data-line="${line}"]`) : null)
      ?? host;
    results.push({
      index,
      ok,
      state: finalHost.getAttribute(PRINT_MERMAID_CANVAS_STATE_ATTR),
    });
    index += 1;
  }
  debugExportPdf('mermaid-canvas', 'batch done', { results });
}

function findMatchingMermaidHost(
  target: HTMLElement,
  sourceHosts: HTMLElement[],
  used: Set<HTMLElement>,
): HTMLElement | undefined {
  const key = mermaidHostMatchKey(target);
  if (key) {
    const match = sourceHosts.find((h) => !used.has(h) && mermaidHostMatchKey(h) === key);
    if (match) return match;
  }
  return sourceHosts.find((h) => !used.has(h));
}

/** Copy mermaid bitmaps / img src after cloneNode (pixels and data URLs are not cloned). */
export function copyPrintMermaidCanvases(sourceRoot: ParentNode, targetRoot: ParentNode): void {
  const sourceSelector = `img[${PRINT_MERMAID_IMG_ATTR}], .md-editor-mermaid`;
  const sourceHosts = [...sourceRoot.querySelectorAll<HTMLElement>(sourceSelector)];
  const targetHosts = [...targetRoot.querySelectorAll<HTMLElement>(sourceSelector)];
  const used = new Set<HTMLElement>();

  for (const dstHost of targetHosts) {
    const srcHost = findMatchingMermaidHost(dstHost, sourceHosts, used);
    if (!srcHost) continue;
    used.add(srcHost);

    const state = srcHost.getAttribute(PRINT_MERMAID_CANVAS_STATE_ATTR);
    if (state) dstHost.setAttribute(PRINT_MERMAID_CANVAS_STATE_ATTR, state);

    const srcImg = srcHost.matches(`img[${PRINT_MERMAID_IMG_ATTR}]`)
      ? srcHost as HTMLImageElement
      : srcHost.querySelector('img');
    const dstImg = dstHost.matches(`img[${PRINT_MERMAID_IMG_ATTR}]`)
      ? dstHost as HTMLImageElement
      : dstHost.querySelector('img');

    if (srcImg instanceof HTMLImageElement && dstImg instanceof HTMLImageElement && state === 'img') {
      dstImg.src = srcImg.src;
      dstImg.width = srcImg.width;
      dstImg.height = srcImg.height;
      dstImg.style.cssText = srcImg.style.cssText;
      dstImg.className = srcImg.className;
      dstImg.setAttribute(PRINT_MERMAID_IMG_ATTR, '1');
      continue;
    }

    const srcCanvas = srcHost.querySelector('canvas');
    const dstCanvas = dstHost.querySelector('canvas');
    if (srcCanvas instanceof HTMLCanvasElement && dstCanvas instanceof HTMLCanvasElement) {
      dstCanvas.width = srcCanvas.width;
      dstCanvas.height = srcCanvas.height;
      dstCanvas.style.width = srcCanvas.style.width;
      dstCanvas.style.height = srcCanvas.style.height;
      const ctx = dstCanvas.getContext('2d');
      if (ctx) ctx.drawImage(srcCanvas, 0, 0);
      const cssW = Math.round(parseLength(srcCanvas.style.width) ?? srcCanvas.getBoundingClientRect().width);
      const cssH = Math.round(parseLength(srcCanvas.style.height) ?? srcCanvas.getBoundingClientRect().height);
      applyMermaidHostBox(dstHost, cssW, cssH);
      continue;
    }

    if (state === 'error') {
      dstHost.replaceChildren(...[...srcHost.childNodes].map((n) => n.cloneNode(true)));
      dstHost.style.cssText = srcHost.style.cssText;
    }
  }
}

/** Attach clone off-screen at page width so SVG layout + drawImage work. */
export function attachPrintPreviewMeasureRoot(
  content: HTMLElement,
  widthPx: number,
): HTMLElement {
  const measureRoot = document.createElement('div');
  measureRoot.setAttribute('aria-hidden', 'true');
  measureRoot.style.cssText = [
    'position:fixed',
    'left:-10000px',
    'top:0',
    'pointer-events:none',
    'z-index:-1',
    `width:${Math.max(1, Math.round(widthPx))}px`,
  ].join(';');
  measureRoot.appendChild(content);
  document.body.appendChild(measureRoot);
  debugExportPdf('mermaid-canvas', 'measure root attached', { widthPx, connected: content.isConnected });
  return measureRoot;
}

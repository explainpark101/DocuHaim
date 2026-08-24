/**
 * Rasterize Mermaid SVG hosts to <canvas> for Export PDF + Paged.js layout.
 * Canvas CSS size matches the diagram (scaled to page inner max width).
 */

import {
  isLazyMermaidPlaceholder,
  renderLazyMermaidElement,
} from '@/utils/lazyMermaid';

export const PRINT_MERMAID_CANVAS_ATTR = 'data-print-mermaid-canvas';
export const PRINT_MERMAID_CANVAS_STATE_ATTR = 'data-print-mermaid-canvas-state';

const RASTER_ATTR = 'data-print-mermaid-raster';

export type PrintMermaidCanvasState = 'loading' | 'ready' | 'error';

function parseLength(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const m = String(raw).trim().match(/^([0-9.]+)/);
  if (!m?.[1]) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Mermaid SVG image load failed'));
    img.src = src;
  });
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

function canvasHasPixels(canvas: HTMLCanvasElement): boolean {
  const ctx = canvas.getContext('2d');
  if (!ctx || canvas.width < 1 || canvas.height < 1) return false;
  const sampleW = Math.min(canvas.width, 16);
  const sampleH = Math.min(canvas.height, 16);
  const data = ctx.getImageData(0, 0, sampleW, sampleH).data;
  for (let i = 3; i < data.length; i += 4) {
    if ((data[i] ?? 0) > 0) return true;
  }
  return false;
}

async function svgElementToCanvas(
  svg: SVGSVGElement,
  cssWidth: number,
  cssHeight: number,
): Promise<HTMLCanvasElement> {
  const dataUrl = buildSvgDataUrl(svg, cssWidth, cssHeight);
  const img = await loadImage(dataUrl);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(cssWidth * dpr));
  canvas.height = Math.max(1, Math.round(cssHeight * dpr));
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  canvas.style.display = 'block';
  canvas.setAttribute(PRINT_MERMAID_CANVAS_ATTR, '1');

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);
  ctx.drawImage(img, 0, 0, cssWidth, cssHeight);

  if (!canvasHasPixels(canvas)) {
    throw new Error('Mermaid canvas raster is blank');
  }
  return canvas;
}

/** Mermaid lazy hosts are <p>; canvas must live in a block wrapper for valid layout. */
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
  applyMermaidHostBox(host, Math.min(width, 320), 40);
}

/**
 * Replace a processed Mermaid SVG host with a same-size canvas.
 * Returns false when the host has no renderable SVG.
 */
export async function rasterizeMermaidHostToCanvas(
  host: HTMLElement,
  maxWidth: number,
  maxHeight?: number,
): Promise<boolean> {
  const blockHost = ensureBlockMermaidHost(host);
  setMermaidCanvasState(blockHost, 'loading');

  let svg = blockHost.querySelector('svg');
  if (!svg && isLazyMermaidPlaceholder(blockHost)) {
    await renderLazyMermaidElement(blockHost);
    svg = blockHost.querySelector('svg');
  }
  if (!(svg instanceof SVGSVGElement)) {
    markMermaidCanvasError(blockHost, maxWidth);
    return false;
  }

  try {
    const natural = measureMermaidSvgSize(svg);
    const { width: cssWidth, height: cssHeight } = scaleMermaidDimensions(
      natural,
      maxWidth,
      maxHeight,
    );

    const canvas = await svgElementToCanvas(svg, cssWidth, cssHeight);
    try {
      blockHost.setAttribute(RASTER_ATTR, canvas.toDataURL('image/png'));
    } catch {
      // Layout still uses explicit host/canvas size.
    }

    blockHost.replaceChildren(canvas);
    applyMermaidHostBox(blockHost, cssWidth, cssHeight);
    setMermaidCanvasState(blockHost, 'ready');
    return true;
  } catch (err) {
    console.warn('[printMermaidCanvas] rasterize failed', err);
    markMermaidCanvasError(blockHost, maxWidth);
    return false;
  }
}

/** Rasterize every Mermaid diagram under root before Paged.js layout. */
export async function rasterizeAllPrintMermaidsToCanvas(
  root: ParentNode,
  maxWidth: number,
  maxHeight?: number,
): Promise<void> {
  const hosts = [...root.querySelectorAll<HTMLElement>('.md-editor-mermaid')];
  for (const host of hosts) {
    await rasterizeMermaidHostToCanvas(host, maxWidth, maxHeight);
  }
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

/** Copy canvas bitmaps after cloneNode (canvas pixels are not cloned). */
export function copyPrintMermaidCanvases(sourceRoot: ParentNode, targetRoot: ParentNode): void {
  const sourceHosts = [
    ...sourceRoot.querySelectorAll<HTMLElement>(`.md-editor-mermaid[${PRINT_MERMAID_CANVAS_ATTR}]`),
  ];
  const targetHosts = [
    ...targetRoot.querySelectorAll<HTMLElement>(`.md-editor-mermaid[${PRINT_MERMAID_CANVAS_ATTR}]`),
  ];
  const used = new Set<HTMLElement>();

  for (const dstHost of targetHosts) {
    const srcHost = findMatchingMermaidHost(dstHost, sourceHosts, used);
    if (!srcHost) continue;
    used.add(srcHost);

    const state = srcHost.getAttribute(PRINT_MERMAID_CANVAS_STATE_ATTR);
    if (state) dstHost.setAttribute(PRINT_MERMAID_CANVAS_STATE_ATTR, state);

    const srcCanvas = srcHost.querySelector('canvas');
    const dstCanvas = dstHost.querySelector('canvas');
    if (!(srcCanvas instanceof HTMLCanvasElement) || !(dstCanvas instanceof HTMLCanvasElement)) {
      if (state === 'error') {
        dstHost.replaceChildren(...[...srcHost.childNodes].map((n) => n.cloneNode(true)));
        dstHost.style.cssText = srcHost.style.cssText;
      }
      continue;
    }

    dstCanvas.width = srcCanvas.width;
    dstCanvas.height = srcCanvas.height;
    dstCanvas.style.width = srcCanvas.style.width;
    dstCanvas.style.height = srcCanvas.style.height;
    const ctx = dstCanvas.getContext('2d');
    if (ctx) ctx.drawImage(srcCanvas, 0, 0);

    const cssW = Math.round(parseLength(srcCanvas.style.width) ?? srcCanvas.getBoundingClientRect().width);
    const cssH = Math.round(parseLength(srcCanvas.style.height) ?? srcCanvas.getBoundingClientRect().height);
    applyMermaidHostBox(dstHost, cssW, cssH);
  }
}

/**
 * Lazy Mermaid: dynamic import + render one placeholder element.
 * Used when MdEditor/MdPreview has noMermaid so built-in useMermaid does not
 * render every diagram at once.
 */
import { patchMermaidRender } from '@/utils/mermaidFixLabelNewlines';
import {
  getCachedMermaidSvg,
  setCachedMermaidSvg,
} from '@/utils/mermaidRenderCache';
import { resolveMermaidThemeForHost, type MermaidThemeName } from '@/utils/mermaidTheme';

type MermaidModule = {
  default: {
    initialize: (config: Record<string, unknown>) => void;
    render: (
      id: string,
      text: string,
      container?: Element,
    ) => Promise<{ svg: string; bindFunctions?: (el: Element) => void }>;
  };
};

let mermaidPromise: Promise<MermaidModule['default']> | null = null;
let initializedTheme: string | null = null;
let renderSeq = 0;

function nextRenderId(): string {
  renderSeq += 1;
  return `haim-mermaid-${Date.now().toString(36)}-${renderSeq}`;
}

/** Load mermaid once, patch label/math render, cache the instance. */
export async function getMermaidInstance(): Promise<MermaidModule['default']> {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((mod) => {
      const instance = (mod as MermaidModule).default ?? (mod as unknown as MermaidModule['default']);
      patchMermaidRender(instance);
      return instance;
    });
  }
  return mermaidPromise;
}

function resolveTheme(el: Element): MermaidThemeName {
  return resolveMermaidThemeForHost(el);
}

async function ensureInitialized(theme: 'dark' | 'default'): Promise<MermaidModule['default']> {
  const mermaid = await getMermaidInstance();
  if (initializedTheme !== theme) {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme,
    });
    initializedTheme = theme;
  }
  return mermaid;
}

export function isLazyMermaidPlaceholder(el: Element): boolean {
  if (!(el instanceof HTMLElement)) return false;
  if (!el.classList.contains('md-editor-mermaid')) return false;
  if (el.getAttribute('data-processed') != null) return false;
  if (el.getAttribute('data-haim-mermaid-image') === '1') return false;
  if (el.getAttribute('data-closed') === 'false') return false;
  if (el.tagName !== 'DIV' && el.tagName !== 'P') return false;
  if (el.closest('[data-haim-mermaid-embed]')) return true;
  return Boolean((el.textContent || el.innerText || '').trim());
}

function readEmbedPreSource(el: HTMLElement): string {
  const embed = el.closest('[data-haim-mermaid-embed]');
  if (!embed) return '';
  const pre = embed.querySelector('.haim-mermaid-embed-pre');
  return (pre?.textContent || '').trim();
}

export function getMermaidSourceFromElement(el: HTMLElement): string {
  const fromAttr = (el.getAttribute('data-content') || '').trim();
  if (fromAttr) return fromAttr;
  const fromEmbedPre = readEmbedPreSource(el);
  if (fromEmbedPre) return fromEmbedPre;
  // Prefer textContent: innerText collapses newlines when white-space is not
  // `pre` (e.g. offscreen/print hosts). That turns `subgraph 고객 영역` into a
  // single-line parse error while simple `A --> B` diagrams still work.
  return (el.textContent || el.innerText || '').trim();
}

function buildProcessedMermaidHost(
  svg: string,
  source: string,
  theme: MermaidThemeName,
  el: HTMLElement,
  bindFunctions?: (element: Element) => void,
): HTMLElement {
  const host = document.createElement('p');
  host.className = 'md-editor-mermaid';
  host.setAttribute('data-processed', '');
  host.setAttribute('data-content', source);
  host.setAttribute('data-haim-mermaid-lazy', '1');
  host.setAttribute('data-mermaid-theme', theme);
  const line = el.getAttribute('data-line');
  if (line != null) host.setAttribute('data-line', line);
  const replaceKey = el.getAttribute('data-haim-imgbb-replace-key');
  if (replaceKey) host.setAttribute('data-haim-imgbb-replace-key', replaceKey);
  host.innerHTML = svg;
  host.children[0]?.removeAttribute('height');
  bindFunctions?.(host);
  return host;
}

/**
 * Replace a lazy placeholder with a cached SVG when source + theme match.
 * Synchronous — safe to run on every preview DOM mutation.
 */
export function restoreCachedMermaidElement(el: HTMLElement): HTMLElement | null {
  if (!isLazyMermaidPlaceholder(el)) return null;
  const source = getMermaidSourceFromElement(el);
  if (!source) return null;
  const theme = resolveTheme(el);
  const cached = getCachedMermaidSvg(theme, source);
  if (!cached) return null;
  const host = buildProcessedMermaidHost(cached, source, theme, el);
  el.replaceWith(host);
  return host;
}

/** Restore every cacheable placeholder under root (preview re-parse). */
export function restoreCachedMermaidsInRoot(
  root: ParentNode | null | undefined,
): number {
  if (!root) return 0;
  let restored = 0;
  const nodes = [...root.querySelectorAll('.md-editor-mermaid')].filter(
    (node): node is HTMLElement => isLazyMermaidPlaceholder(node),
  );
  for (const el of nodes) {
    if (restoreCachedMermaidElement(el)) restored += 1;
  }
  return restored;
}

/**
 * Render a single lazy placeholder into a processed SVG host (same shape as md-editor-rt).
 * Returns the replacement element, or null if skipped / failed.
 */
export async function renderLazyMermaidElement(
  el: HTMLElement,
): Promise<HTMLElement | null> {
  if (!isLazyMermaidPlaceholder(el)) return null;
  const source = getMermaidSourceFromElement(el);
  if (!source) return null;

  const theme = resolveTheme(el);
  const cached = getCachedMermaidSvg(theme, source);
  if (cached) {
    const host = buildProcessedMermaidHost(cached, source, theme, el);
    el.replaceWith(host);
    return host;
  }

  const mermaid = await ensureInitialized(theme);

  const offscreen = document.createElement('div');
  const w = Math.max(document.body.offsetWidth, 1366);
  const h = Math.max(document.body.offsetHeight, 768);
  offscreen.style.cssText = `width:${w}px;height:${h}px;position:fixed;z-index:-10000;top:-10000px;left:0;`;
  document.body.appendChild(offscreen);

  try {
    const { svg, bindFunctions } = await mermaid.render(nextRenderId(), source, offscreen);
    setCachedMermaidSvg(theme, source, svg);
    const host = buildProcessedMermaidHost(svg, source, theme, el, bindFunctions);
    el.replaceWith(host);
    return host;
  } catch (err) {
    console.warn('[lazyMermaid] render failed', err);
    el.setAttribute('data-haim-mermaid-error', '1');
    return null;
  } finally {
    offscreen.remove();
  }
}

/** Render every pending placeholder under root (Export PDF / blog copy). */
export async function renderAllLazyMermaidsInRoot(
  root: ParentNode | null | undefined,
): Promise<void> {
  if (!root) return;
  restoreCachedMermaidsInRoot(root);
  const nodes = [...root.querySelectorAll('.md-editor-mermaid')].filter(
    (el): el is HTMLElement => isLazyMermaidPlaceholder(el),
  );
  for (const el of nodes) {
    await renderLazyMermaidElement(el);
  }
}

/**
 * Lazy Mermaid: dynamic import + render one placeholder element.
 * Used when MdEditor/MdPreview has noMermaid so built-in useMermaid does not
 * render every diagram at once.
 */
import { patchMermaidRender } from '@/utils/mermaidFixLabelNewlines';

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

function resolveTheme(el: Element): 'dark' | 'default' {
  const attr = (el.getAttribute('data-mermaid-theme') || '').trim();
  if (attr === 'dark') return 'dark';
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return 'dark';
  }
  return 'default';
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
  if (el.getAttribute('data-closed') === 'false') return false;
  return el.tagName === 'DIV' || el.tagName === 'P';
}

export function getMermaidSourceFromElement(el: HTMLElement): string {
  const fromAttr = (el.getAttribute('data-content') || '').trim();
  if (fromAttr) return fromAttr;
  return (el.innerText || el.textContent || '').trim();
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
  const mermaid = await ensureInitialized(theme);

  const offscreen = document.createElement('div');
  const w = Math.max(document.body.offsetWidth, 1366);
  const h = Math.max(document.body.offsetHeight, 768);
  offscreen.style.cssText = `width:${w}px;height:${h}px;position:fixed;z-index:-10000;top:-10000px;left:0;`;
  document.body.appendChild(offscreen);

  try {
    const { svg, bindFunctions } = await mermaid.render(nextRenderId(), source, offscreen);
    const host = document.createElement('p');
    host.className = 'md-editor-mermaid';
    host.setAttribute('data-processed', '');
    host.setAttribute('data-content', source);
    host.setAttribute('data-haim-mermaid-lazy', '1');
    const line = el.getAttribute('data-line');
    if (line != null) host.setAttribute('data-line', line);
    const replaceKey = el.getAttribute('data-haim-imgbb-replace-key');
    if (replaceKey) host.setAttribute('data-haim-imgbb-replace-key', replaceKey);
    host.innerHTML = svg;
    host.children[0]?.removeAttribute('height');
    el.replaceWith(host);
    bindFunctions?.(host);
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
  const nodes = [...root.querySelectorAll('.md-editor-mermaid')].filter(
    (el): el is HTMLElement => isLazyMermaidPlaceholder(el),
  );
  for (const el of nodes) {
    await renderLazyMermaidElement(el);
  }
}

/**
 * Mirror Edit: double-click a preview [data-line] block to edit it with
 * contentEditable, then write the change back into CodeMirror as Markdown.
 */

import type { EditorView } from '@codemirror/view';
import TurndownService from 'turndown';
import {
  findDataLineElement,
  getSourceBoundsForLineRange,
} from '@/utils/previewSelectionSync';
import { wikiImageMarkupFromAttrs } from '@/utils/wikiImageSyntax';

export const MIRROR_EDIT_INPUT_ATTR = 'data-mirror-edit';
export const MIRROR_EDIT_ACTIVE_ATTR = 'data-mirror-edit-active';

const IGNORE_CLOSEST =
  `a, button, input, textarea, select, label, .md-editor-code-action, [data-transform-handle], table, .md-editor-mermaid, .md-editor-katex, .md-editor-code, pre, [data-note-cover]`;

export function isMirrorEditTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(`[${MIRROR_EDIT_ACTIVE_ATTR}]`)
    || target.closest(`[${MIRROR_EDIT_INPUT_ATTR}]`),
  );
}

export function isMirrorEditActiveIn(previewRoot: Element | null | undefined): boolean {
  return Boolean(previewRoot?.querySelector(`[${MIRROR_EDIT_ACTIVE_ATTR}]`));
}

function normalizeEditableSource(sourceSlice: string): {
  body: string;
  trailing: string;
} {
  const match = sourceSlice.match(/^(.*?)(\n*)$/s);
  return {
    body: match?.[1] ?? sourceSlice,
    trailing: match?.[2] ?? '',
  };
}

function splitSourceStructure(body: string): { prefix: string; content: string } {
  const patterns = [
    /^(#{1,6}[ \t]+)/,
    /^([ \t]*[-*+][ \t]+\[[ xX]\][ \t]+)/,
    /^([ \t]*[-*+][ \t]+)/,
    /^([ \t]*\d+\.[ \t]+)/,
    /^(>[ \t]?)/,
  ];
  for (const re of patterns) {
    const m = body.match(re);
    const prefix = m?.[1];
    if (prefix) return { prefix, content: body.slice(prefix.length) };
  }
  return { prefix: '', content: body };
}

function shouldIgnoreDoubleClickTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return true;
  // Allow re-entering / caret moves inside an active mirror-edit block.
  if (target.closest(`[${MIRROR_EDIT_ACTIVE_ATTR}]`)) return false;
  return Boolean(target.closest(IGNORE_CLOSEST));
}

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
  strongDelimiter: '**',
});

turndown.keep(['u', 'sub', 'sup']);

turndown.addRule('wikiImageData', {
  filter: (node) => {
    if (node.nodeName !== 'IMG') return false;
    return Boolean((node as HTMLElement).getAttribute?.('data-wiki-path'));
  },
  replacement: (_content, node) => {
    const el = node as HTMLElement;
    return wikiImageMarkupFromAttrs({
      path: el.getAttribute('data-wiki-path'),
      width: el.getAttribute('data-wiki-width'),
      height: el.getAttribute('data-wiki-height'),
      background: el.getAttribute('data-wiki-bg'),
    });
  },
});

turndown.addRule('deepHeading', {
  filter: (node) => {
    if (!node?.nodeName) return false;
    const dataLevel = Number((node as HTMLElement).getAttribute?.('data-heading-level'));
    if (Number.isInteger(dataLevel) && dataLevel >= 7) return true;
    return false;
  },
  replacement: (content, node) => {
    const dataLevel = Number((node as HTMLElement).getAttribute?.('data-heading-level'));
    const level = Number.isInteger(dataLevel) && dataLevel >= 1 ? dataLevel : 6;
    return `${'#'.repeat(level)} ${content.trim()}`;
  },
});

function stripDuplicateBlockMarkers(md: string, prefix: string): string {
  let next = md.trim();
  if (!prefix) return next;

  if (/^#{1,6}[ \t]+/.test(prefix)) {
    next = next.replace(/^#{1,6}[ \t]+/, '');
  } else if (/\[[ xX]\]/.test(prefix)) {
    next = next.replace(/^([-*+]|\d+\.)[ \t]+\[[ xX]\][ \t]+/, '');
  } else if (/^([ \t]*[-*+][ \t]+)/.test(prefix) || /^([ \t]*\d+\.[ \t]+)/.test(prefix)) {
    next = next.replace(/^([-*+]|\d+\.)[ \t]+/, '');
  } else if (/^>[ \t]?/.test(prefix)) {
    next = next.replace(/^(>[ \t]?)+/gm, '').trim();
  }
  return next;
}

function syncTaskPrefix(
  prefix: string,
  clone: HTMLElement,
): string {
  if (!/\[[ xX]\]/.test(prefix)) return prefix;
  const checkbox = clone.querySelector('input[type="checkbox"]');
  if (!(checkbox instanceof HTMLInputElement)) return prefix;
  const checked = checkbox.checked;
  return prefix.replace(/\[[ xX]\]/, checked ? '[x]' : '[ ]');
}

/**
 * Convert an edited preview block DOM back to a Markdown source body
 * (without trailing blank lines of the original slice).
 */
export function mirrorEditBlockToMarkdown(
  block: HTMLElement,
  sourceBody: string,
): string {
  const { prefix } = splitSourceStructure(sourceBody);
  const clone = block.cloneNode(true) as HTMLElement;
  clone.removeAttribute(MIRROR_EDIT_ACTIVE_ATTR);
  clone.removeAttribute(MIRROR_EDIT_INPUT_ATTR);
  clone.removeAttribute('contenteditable');
  clone.removeAttribute('spellcheck');

  const nextPrefix = syncTaskPrefix(prefix, clone);
  clone.querySelectorAll('input[type="checkbox"]').forEach((el) => el.remove());
  // Fold chrome / non-content UI injected into preview headings.
  clone.querySelectorAll(
    '.md-preview-heading-fold-chevron, .md-heading-fold, .md-editor-code-action, [data-transform-handle], button',
  ).forEach((el) => el.remove());

  const tag = block.tagName.toLowerCase();
  const useInner =
    /^h[1-6]$/.test(tag)
    || tag === 'p'
    || tag === 'li'
    || tag === 'blockquote'
    || tag === 'td'
    || tag === 'th';

  const html = useInner ? clone.innerHTML : clone.outerHTML;
  let md = turndown.turndown(html || '');
  md = md.replace(/^\n+|\n+$/g, '');
  md = stripDuplicateBlockMarkers(md, nextPrefix);

  // Deep headings (h6[data-heading-level]): rebuild prefix from attribute.
  const dataLevel = Number(block.getAttribute('data-heading-level'));
  if (Number.isInteger(dataLevel) && dataLevel >= 7) {
    return `${'#'.repeat(dataLevel)} ${md.replace(/^#{1,6}[ \t]+/, '').trim()}`;
  }

  if (nextPrefix) return `${nextPrefix}${md}`;
  return md;
}

type Session = {
  block: HTMLElement;
  snapshotHtml: string;
  snapshotBody: string;
  from: number;
  to: number;
  trailing: string;
  cleanup: () => void;
};

let activeSession: Session | null = null;

function endSession(restoreHtml: boolean): void {
  const session = activeSession;
  activeSession = null;
  if (!session) return;
  session.cleanup();
  if (!session.block.isConnected) return;

  session.block.removeAttribute(MIRROR_EDIT_ACTIVE_ATTR);
  session.block.removeAttribute(MIRROR_EDIT_INPUT_ATTR);
  session.block.removeAttribute('contenteditable');
  session.block.removeAttribute('spellcheck');

  if (restoreHtml) {
    session.block.innerHTML = session.snapshotHtml;
  }
}

function commitSession(view: EditorView): void {
  const session = activeSession;
  if (!session) return;

  const nextBody = mirrorEditBlockToMarkdown(session.block, session.snapshotBody);
  const insert = `${nextBody}${session.trailing}`;
  const { from, to } = session;
  const previous = view.state.doc.sliceString(from, to);

  if (insert === previous) {
    endSession(true);
    return;
  }

  endSession(false);
  view.dispatch({
    changes: { from, to, insert },
    selection: { anchor: from + insert.length },
  });
}

function placeCaretAtPoint(block: HTMLElement, clientX: number, clientY: number): void {
  const sel = window.getSelection?.();
  if (!sel) return;

  try {
    const doc = document as Document & {
      caretRangeFromPoint?: (x: number, y: number) => Range | null;
      caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
    };

    if (typeof doc.caretRangeFromPoint === 'function') {
      const range = doc.caretRangeFromPoint(clientX, clientY);
      if (range && block.contains(range.startContainer)) {
        sel.removeAllRanges();
        sel.addRange(range);
        return;
      }
    }

    if (typeof doc.caretPositionFromPoint === 'function') {
      const pos = doc.caretPositionFromPoint(clientX, clientY);
      if (pos?.offsetNode && block.contains(pos.offsetNode)) {
        const range = document.createRange();
        range.setStart(pos.offsetNode, pos.offset);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return;
      }
    }
  } catch {
    // fall through
  }

  // Fallback: end of block
  const range = document.createRange();
  range.selectNodeContents(block);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}

function beginSession(
  block: HTMLElement,
  view: EditorView,
  previewRoot: Element,
  clientX: number,
  clientY: number,
): boolean {
  if (activeSession) {
    if (activeSession.block === block) {
      placeCaretAtPoint(block, clientX, clientY);
      return true;
    }
    commitSession(view);
  }

  const line0 = Number(block.getAttribute('data-line'));
  if (!Number.isFinite(line0)) return false;

  const { from, to } = getSourceBoundsForLineRange(view, previewRoot, line0, line0);
  const sourceSlice = view.state.doc.sliceString(from, to);
  if (!sourceSlice && from === to) return false;

  const { body, trailing } = normalizeEditableSource(sourceSlice);
  const snapshotHtml = block.innerHTML;

  block.setAttribute(MIRROR_EDIT_ACTIVE_ATTR, '1');
  block.setAttribute(MIRROR_EDIT_INPUT_ATTR, '1');
  block.setAttribute('contenteditable', 'true');
  block.setAttribute('spellcheck', 'true');
  block.setAttribute('aria-label', 'Mirror Edit');

  // Keep fold chevrons / chrome out of the editable region.
  block.querySelectorAll('.md-preview-heading-fold-chevron, button').forEach((el) => {
    if (el instanceof HTMLElement) el.contentEditable = 'false';
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      endSession(true);
      return;
    }

    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      e.stopPropagation();
      commitSession(view);
      return;
    }

    // Headings stay single-line: Enter commits.
    const tag = block.tagName.toLowerCase();
    if (e.key === 'Enter' && !e.shiftKey && /^h[1-6]$/.test(tag)) {
      e.preventDefault();
      e.stopPropagation();
      commitSession(view);
    }
  };

  const onPaste = (e: ClipboardEvent) => {
    const text = e.clipboardData?.getData('text/plain');
    if (text == null) return;
    e.preventDefault();
    // Prefer plain text so pasted HTML does not invent unexpected structure.
    document.execCommand('insertText', false, text);
  };

  const onBlur = () => {
    window.setTimeout(() => {
      if (activeSession?.block !== block) return;
      // Focus moved into a child control (rare) — keep editing.
      if (block.contains(document.activeElement)) return;
      commitSession(view);
    }, 0);
  };

  block.addEventListener('keydown', onKeyDown);
  block.addEventListener('paste', onPaste);
  block.addEventListener('blur', onBlur);

  activeSession = {
    block,
    snapshotHtml,
    snapshotBody: body,
    from,
    to,
    trailing,
    cleanup: () => {
      block.removeEventListener('keydown', onKeyDown);
      block.removeEventListener('paste', onPaste);
      block.removeEventListener('blur', onBlur);
    },
  };

  requestAnimationFrame(() => {
    block.focus();
    placeCaretAtPoint(block, clientX, clientY);
  });

  return true;
}

export type AttachPreviewMirrorEditOptions = {
  getPreviewRoot: () => Element | null;
  getView: () => EditorView | null | undefined;
  /** When false, double-click is ignored (and any open session is cancelled). */
  isEnabled: () => boolean;
};

/**
 * Attach dblclick listener on the editor container. Returns cleanup.
 */
export function attachPreviewMirrorEdit(
  root: HTMLElement,
  options: AttachPreviewMirrorEditOptions,
): () => void {
  const onDblClick = (e: MouseEvent) => {
    if (!options.isEnabled()) return;
    if (shouldIgnoreDoubleClickTarget(e.target)) return;

    const previewRoot = options.getPreviewRoot();
    if (!previewRoot || !(e.target instanceof Node) || !previewRoot.contains(e.target)) {
      return;
    }

    const block = findDataLineElement(e.target, previewRoot);
    if (!block) return;

    const view = options.getView();
    if (!view) return;

    e.preventDefault();
    e.stopPropagation();
    beginSession(block, view, previewRoot, e.clientX, e.clientY);
  };

  root.addEventListener('dblclick', onDblClick, true);

  return () => {
    root.removeEventListener('dblclick', onDblClick, true);
    if (activeSession) endSession(true);
  };
}

/** Cancel an open session without writing (e.g. toggle off / unmount). */
export function cancelPreviewMirrorEdit(): void {
  endSession(true);
}

/** Drop a session whose editable node was destroyed by a preview re-render. */
export function abandonDetachedPreviewMirrorEdit(): void {
  if (!activeSession) return;
  if (activeSession.block.isConnected) return;
  activeSession.cleanup();
  activeSession = null;
}

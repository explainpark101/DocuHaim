/**
 * In-note `#fragment` links: scroll to a heading in the same document
 * instead of opening a new tab / leaving the editor.
 */

import type { Editor } from '@tiptap/core';
import type { EditorView as CmEditorView } from '@codemirror/view';
import { findPreviewScrollContainer } from '@/utils/previewSelectionSync';
import { scrollWithinContainer } from '@/utils/settingsPageScroll';
import { isPreviewFootnoteHash } from '@/utils/previewFootnoteScroll';

const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6';
const SCROLL_OFFSET_TOP_PX = 2;
const FOLDED_CLASS = 'md-preview-heading-folded';
const SECTION_HIDDEN_CLASS = 'md-preview-heading-section-hidden';

export type HaimHeadingHashMatch = {
  pos: number;
  level: number;
  text: string;
};

/** True for in-document hrefs like `#`, `#intro`, `#제목`. */
export function isNoteDocumentHashHref(href: string): boolean {
  const raw = String(href || '').trim();
  if (!raw.startsWith('#')) return false;
  // Footnote hashes use a separate in-preview navigation path.
  if (isPreviewFootnoteHash(raw)) return false;
  return true;
}

/** Strip leading `#` and decode the fragment (empty → ''). */
export function noteHashFragment(href: string): string {
  const raw = String(href || '').trim();
  if (!raw.startsWith('#')) return '';
  const body = raw.slice(1);
  if (!body) return '';
  try {
    return decodeURIComponent(body);
  } catch {
    return body;
  }
}

/**
 * GitHub-ish heading slug for hash matching (keeps letters/numbers/CJK/Hangul).
 */
export function slugifyHeadingForHash(text: string): string {
  // NFC keeps Hangul syllables composed (NFKD would split to jamo).
  return String(text || '')
    .trim()
    .toLowerCase()
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeHeadingCompareKey(text: string): string {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

/**
 * Whether a heading matches `#fragment` (id, slug, or plain text).
 */
export function headingMatchesHashFragment(
  headingText: string,
  fragment: string,
  elementId?: string | null,
): boolean {
  const frag = String(fragment || '').trim();
  if (!frag) return false;

  const id = String(elementId || '').trim();
  if (id && (id === frag || id === encodeURIComponent(frag))) return true;

  const text = String(headingText || '').trim();
  if (!text) return false;

  if (normalizeHeadingCompareKey(text) === normalizeHeadingCompareKey(frag)) {
    return true;
  }

  const fragSlug = slugifyHeadingForHash(frag);
  const textSlug = slugifyHeadingForHash(text);
  if (fragSlug && textSlug && fragSlug === textSlug) return true;

  return false;
}

function smoothScrollBehavior(): ScrollBehavior {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return 'auto';
  }
  return 'smooth';
}

function expandFoldedAncestors(heading: HTMLElement): void {
  for (let guard = 0; guard < 8; guard += 1) {
    const style = getComputedStyle(heading);
    const stillHidden =
      heading.classList.contains(SECTION_HIDDEN_CLASS) ||
      heading.hasAttribute('hidden') ||
      style.display === 'none';
    if (!stillHidden) break;

    let expanded = false;
    let node: Element | null = heading;
    while (node && !expanded) {
      const hidden =
        node instanceof HTMLElement &&
        (node.classList.contains(SECTION_HIDDEN_CLASS) ||
          node.hasAttribute('hidden'));
      if (hidden) {
        let prev: Element | null = node.previousElementSibling;
        while (prev) {
          if (prev instanceof HTMLElement && prev.classList.contains(FOLDED_CLASS)) {
            const chevron = prev.querySelector(
              ':scope > .md-preview-heading-fold-chevron',
            );
            if (chevron instanceof HTMLButtonElement) {
              chevron.click();
              expanded = true;
            }
            break;
          }
          prev = prev.previousElementSibling;
        }
      }
      node = node.parentElement;
    }
    if (!expanded) break;
  }
}

function scrollElementIntoNoteScroller(target: HTMLElement): void {
  expandFoldedAncestors(target);
  const behavior = smoothScrollBehavior();
  const previewScroller = findPreviewScrollContainer(target);
  if (previewScroller) {
    const marginStart = target.previousElementSibling
      ? 0
      : Number.parseFloat(getComputedStyle(target).marginBlockStart || '0') || 0;
    const elRect = target.getBoundingClientRect();
    const scrollerRect = previewScroller.getBoundingClientRect();
    const top =
      previewScroller.scrollTop +
      (elRect.top - scrollerRect.top) -
      SCROLL_OFFSET_TOP_PX -
      marginStart;
    previewScroller.scrollTo({ top: Math.max(0, top), behavior });
    return;
  }

  let parent: HTMLElement | null = target.parentElement;
  while (parent) {
    const oy = getComputedStyle(parent).overflowY;
    if (oy === 'auto' || oy === 'scroll' || oy === 'overlay') {
      scrollWithinContainer(parent, target, { behavior });
      return;
    }
    parent = parent.parentElement;
  }
  target.scrollIntoView({ block: 'start', behavior });
}

/**
 * Find the first heading element under `root` that matches `#fragment`.
 * Empty fragment → null (caller may scroll to top).
 */
export function findHeadingElementByHash(
  root: ParentNode | null | undefined,
  href: string,
): HTMLElement | null {
  if (!root || typeof root.querySelectorAll !== 'function') return null;
  const fragment = noteHashFragment(href);
  if (!fragment) return null;

  try {
    const byId = root.querySelector(`#${CSS.escape(fragment)}`);
    if (byId instanceof HTMLElement) return byId;
  } catch {
    // invalid id selector — fall through to text match
  }

  const headings = root.querySelectorAll(HEADING_SELECTOR);
  for (const el of headings) {
    if (!(el instanceof HTMLElement)) continue;
    if (el.closest('[data-note-cover-placeholder], [data-note-cover-preview]')) {
      continue;
    }
    if (headingMatchesHashFragment(el.textContent || '', fragment, el.id || null)) {
      return el;
    }
  }
  return null;
}

/**
 * Scroll preview / HTML surface to `#fragment`. Empty `#` → scroll container top.
 * @returns true when handled
 */
export function scrollPreviewToDocumentHash(
  href: string,
  previewRoot: ParentNode | null | undefined,
): boolean {
  if (!isNoteDocumentHashHref(href)) return false;
  const fragment = noteHashFragment(href);

  if (!fragment) {
    const rootEl =
      previewRoot instanceof Element
        ? previewRoot
        : previewRoot && 'firstElementChild' in previewRoot
          ? (previewRoot as ParentNode).firstElementChild
          : null;
    const scroller =
      rootEl instanceof Element ? findPreviewScrollContainer(rootEl) : null;
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: smoothScrollBehavior() });
      return true;
    }
    return false;
  }

  const heading = findHeadingElementByHash(previewRoot, href);
  if (!heading) return false;
  scrollElementIntoNoteScroller(heading);
  return true;
}

/**
 * Walk TipTap doc for the first heading / deepHeading matching `#fragment`.
 */
export function findHaimHeadingByHash(
  editor: Editor | null | undefined,
  href: string,
): HaimHeadingHashMatch | null {
  if (!editor || editor.isDestroyed) return null;
  const fragment = noteHashFragment(href);
  if (!fragment) return null;

  let match: HaimHeadingHashMatch | null = null;
  editor.state.doc.descendants((node, pos) => {
    if (match) return false;
    if (node.type.name === 'heading') {
      const level = Number(node.attrs.level) || 1;
      const text = node.textContent.trim();
      const id = node.attrs.id != null ? String(node.attrs.id) : null;
      if (headingMatchesHashFragment(text, fragment, id)) {
        match = { pos, level: Math.min(6, Math.max(1, level)), text };
        return false;
      }
      return false;
    }
    if (node.type.name === 'deepHeading') {
      const level = Number(node.attrs.level) || 7;
      const text = node.textContent.trim();
      const id = node.attrs.id != null ? String(node.attrs.id) : null;
      if (headingMatchesHashFragment(text, fragment, id)) {
        match = {
          pos,
          level: Math.min(10, Math.max(7, level)),
          text,
        };
        return false;
      }
      return false;
    }
    return undefined;
  });
  return match;
}

/**
 * Scroll Haim WYSIWYG to the heading for `#fragment`.
 * Empty `#` scrolls the nearest overflow parent of the editor to top.
 */
export function scrollHaimEditorToDocumentHash(
  editor: Editor | null | undefined,
  href: string,
  scroller?: HTMLElement | null,
): boolean {
  if (!editor || editor.isDestroyed) return false;
  if (!isNoteDocumentHashHref(href)) return false;

  const fragment = noteHashFragment(href);
  const behavior = smoothScrollBehavior();

  if (!fragment) {
    const el = scroller || editor.view.dom.parentElement;
    let node: HTMLElement | null =
      el instanceof HTMLElement ? el : editor.view.dom;
    while (node) {
      const oy = getComputedStyle(node).overflowY;
      if (oy === 'auto' || oy === 'scroll' || oy === 'overlay') {
        node.scrollTo({ top: 0, behavior });
        return true;
      }
      node = node.parentElement;
    }
    return false;
  }

  const match = findHaimHeadingByHash(editor, href);
  if (!match) return false;

  try {
    editor.chain().focus().setTextSelection(match.pos + 1).run();
    const dom = editor.view.nodeDOM(match.pos);
    const heading =
      dom instanceof HTMLElement
        ? dom
        : dom instanceof Node && dom.parentElement
          ? dom.parentElement
          : null;
    if (!heading) return false;

    if (scroller) {
      scrollWithinContainer(scroller, heading, { behavior });
    } else {
      scrollElementIntoNoteScroller(heading);
    }
    return true;
  } catch {
    return false;
  }
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Scroll CodeMirror source pane to the ATX heading matching `#fragment`.
 */
export function scrollCodeMirrorToDocumentHash(
  cm: CmEditorView | null | undefined,
  href: string,
): boolean {
  if (!cm) return false;
  if (!isNoteDocumentHashHref(href)) return false;

  const fragment = noteHashFragment(href);
  const behavior = smoothScrollBehavior();
  const scroller = cm.scrollDOM;

  if (!fragment) {
    scroller.scrollTo({ top: 0, behavior });
    return true;
  }

  const doc = cm.state.doc;
  for (let i = 1; i <= doc.lines; i += 1) {
    const line = doc.line(i);
    const m = /^(#{1,10})\s+(.+?)\s*$/.exec(line.text);
    if (!m) continue;
    const text = (m[2] || '').trim();
    if (!headingMatchesHashFragment(text, fragment)) continue;

    cm.dispatch({ selection: { anchor: line.from } });
    const coords = cm.coordsAtPos(line.from);
    if (coords) {
      const scrollerRect = scroller.getBoundingClientRect();
      const top =
        scroller.scrollTop + (coords.top - scrollerRect.top) - SCROLL_OFFSET_TOP_PX;
      scroller.scrollTo({ top: Math.max(0, top), behavior });
    } else {
      const block = cm.lineBlockAt(line.from);
      scroller.scrollTo({
        top: Math.max(0, block.top - SCROLL_OFFSET_TOP_PX),
        behavior,
      });
    }
    return true;
  }

  // Fallback: any line that equals the fragment as plain text (no ATX).
  const plainRe = new RegExp(`^${escapeRegExp(fragment)}\\s*$`, 'i');
  for (let i = 1; i <= doc.lines; i += 1) {
    const line = doc.line(i);
    if (!plainRe.test(line.text.trim())) continue;
    cm.dispatch({ selection: { anchor: line.from } });
    const block = cm.lineBlockAt(line.from);
    scroller.scrollTo({
      top: Math.max(0, block.top - SCROLL_OFFSET_TOP_PX),
      behavior,
    });
    return true;
  }

  return false;
}

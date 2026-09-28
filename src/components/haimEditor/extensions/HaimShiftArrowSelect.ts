import { Extension } from '@tiptap/core';
import { NodeSelection, TextSelection } from '@tiptap/pm/state';
import type { Node as ProseMirrorNode, ResolvedPos } from '@tiptap/pm/model';
import type { EditorView } from '@tiptap/pm/view';

function lineHeightAtPos(view: EditorView, pos: number): number {
  try {
    const dom = view.domAtPos(pos);
    const el =
      dom.node instanceof Element ? dom.node : dom.node.parentElement;
    if (!el) return 22;
    const style = window.getComputedStyle(el);
    const lh = parseFloat(style.lineHeight);
    if (Number.isFinite(lh) && lh > 0) return lh;
    const fs = parseFloat(style.fontSize);
    if (Number.isFinite(fs) && fs > 0) return fs * 1.4;
  } catch {
    // ignore
  }
  return 22;
}

function textblockDepth($pos: ResolvedPos): number {
  for (let d = $pos.depth; d > 0; d -= 1) {
    if ($pos.node(d).isTextblock) return d;
  }
  return -1;
}

/**
 * Head position in the adjacent textblock (same visual column when possible).
 */
function adjacentTextblockHead(
  view: EditorView,
  $head: ResolvedPos,
  direction: 'up' | 'down',
  preferredLeft: number,
): number | null {
  const depth = textblockDepth($head);
  if (depth < 0) return null;

  const dir = direction === 'down' ? 1 : -1;
  const edge =
    direction === 'down' ? $head.after(depth) : $head.before(depth);

  let probe: number;
  try {
    const near = TextSelection.near(
      $head.doc.resolve(Math.max(0, Math.min($head.doc.content.size, edge))),
      dir,
    );
    probe = near.head;
  } catch {
    return null;
  }

  // Same textblock → nothing adjacent in that direction.
  const $probe = $head.doc.resolve(probe);
  if (textblockDepth($probe) === depth) {
    const probeBlock = $probe.before(textblockDepth($probe));
    const headBlock = $head.before(depth);
    if (probeBlock === headBlock) return null;
  }

  try {
    const c = view.coordsAtPos(probe);
    const midY = (c.top + c.bottom) / 2;
    const hit = view.posAtCoords({ left: preferredLeft, top: midY });
    if (hit && hit.pos !== $head.pos) return hit.pos;
  } catch {
    // ignore coords failure (e.g. jsdom)
  }
  return probe !== $head.pos ? probe : null;
}

/**
 * Extend the selection head one visual line up/down (Shift+Arrow).
 * Uses coords when available; falls back to adjacent textblock so selection
 * crosses paragraphs even when NodeViews / empty hit-testing stall native
 * Shift+Arrow.
 */
export function extendSelectionVertically(
  view: EditorView,
  direction: 'up' | 'down',
): boolean {
  const { state } = view;
  const { selection, doc } = state;
  const dir = direction === 'down' ? 1 : -1;

  // Normalize non-text selections to a text caret we can extend.
  let anchor = selection.anchor;
  let head = selection.head;
  if (selection instanceof NodeSelection) {
    const near = TextSelection.near(
      doc.resolve(direction === 'down' ? selection.to : selection.from),
      dir,
    );
    anchor = near.anchor;
    head = near.head;
  }

  let coords: { left: number; top: number; bottom: number };
  try {
    coords = view.coordsAtPos(head);
  } catch {
    coords = { left: 0, top: 0, bottom: 22 };
  }

  const lineHeight = lineHeightAtPos(view, head);
  const x = coords.left;
  let nextHead = head;

  const yFactors = [0.2, 0.55, 1, 1.5, 2, 2.75, 3.5];
  for (const factor of yFactors) {
    const y =
      direction === 'down'
        ? coords.bottom + Math.max(2, lineHeight * factor)
        : coords.top - Math.max(2, lineHeight * factor);
    let hit: { pos: number } | null = null;
    try {
      hit = view.posAtCoords({ left: x, top: y });
    } catch {
      hit = null;
    }
    if (!hit) continue;
    if (direction === 'down' && hit.pos > head) {
      nextHead = hit.pos;
      break;
    }
    if (direction === 'up' && hit.pos < head) {
      nextHead = hit.pos;
      break;
    }
  }

  if (nextHead === head) {
    const adjacent = adjacentTextblockHead(
      view,
      doc.resolve(head),
      direction,
      x,
    );
    if (adjacent != null) nextHead = adjacent;
  }

  if (nextHead === head) {
    // Last resort: step one position in direction within doc.
    const stepped = Math.max(1, Math.min(doc.content.size, head + dir));
    if (stepped !== head) {
      try {
        nextHead = TextSelection.near(doc.resolve(stepped), dir).head;
      } catch {
        return false;
      }
    }
  }

  nextHead = Math.max(0, Math.min(doc.content.size, nextHead));
  if (nextHead === head) return false;

  try {
    const tr = state.tr.setSelection(
      TextSelection.create(doc, anchor, nextHead),
    );
    tr.scrollIntoView();
    view.dispatch(tr);
    return true;
  } catch {
    try {
      const near = TextSelection.near(doc.resolve(nextHead), dir);
      const tr = state.tr.setSelection(
        TextSelection.create(doc, anchor, near.head),
      );
      tr.scrollIntoView();
      view.dispatch(tr);
      return true;
    } catch {
      return false;
    }
  }
}

/** Exported for unit tests — walk to adjacent textblock without coords. */
export function findAdjacentTextblockPos(
  doc: ProseMirrorNode,
  head: number,
  direction: 'up' | 'down',
): number | null {
  const $head = doc.resolve(head);
  const depth = textblockDepth($head);
  if (depth < 0) return null;
  const dir = direction === 'down' ? 1 : -1;
  const edge =
    direction === 'down' ? $head.after(depth) : $head.before(depth);
  try {
    const near = TextSelection.near(
      doc.resolve(Math.max(0, Math.min(doc.content.size, edge))),
      dir,
    );
    if (near.head === head) return null;
    const $near = doc.resolve(near.head);
    const nearDepth = textblockDepth($near);
    if (nearDepth < 0) return null;
    if ($near.before(nearDepth) === $head.before(depth)) return null;
    return near.head;
  } catch {
    return null;
  }
}

/**
 * Reliable Shift+ArrowUp/Down text selection across paragraphs / NodeViews.
 * Priority above NodeRange so block-range shortcuts cannot steal these keys.
 */
export const HaimShiftArrowSelect = Extension.create({
  name: 'haimShiftArrowSelect',
  priority: 1000,

  addKeyboardShortcuts() {
    return {
      'Shift-ArrowDown': ({ editor }) =>
        extendSelectionVertically(editor.view, 'down'),
      'Shift-ArrowUp': ({ editor }) =>
        extendSelectionVertically(editor.view, 'up'),
    };
  },
});

export default HaimShiftArrowSelect;

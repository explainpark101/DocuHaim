import type { EditorScrollSnapshot } from '@/utils/editorScrollMemory';

export type HaimScrollPaneVisibility = {
  showWysiwyg: boolean;
  showSource: boolean;
};

export type HaimScrollRead = HaimScrollPaneVisibility & {
  wysiwygTop: number | null;
  wysiwygLeft: number | null;
  sourceTop: number | null;
  sourceLeft: number | null;
};

export type HaimScrollAxis = {
  top: number;
  left: number;
};

export type HaimScrollRestorePlan = {
  wysiwyg: HaimScrollAxis | null;
  source: HaimScrollAxis | null;
};

/**
 * Pack live pane scroll into the shared snapshot.
 * WYSIWYG is `editor*`. Source is `preview*` when both panes are open,
 * otherwise the only visible pane is stored in `editor*`.
 * Returns null when a visible pane has not mounted yet.
 */
export function haimScrollReadToSnapshot(read: HaimScrollRead): EditorScrollSnapshot | null {
  if (read.showWysiwyg && read.showSource) {
    if (read.wysiwygTop == null || read.sourceTop == null) return null;
    return {
      editorTop: read.wysiwygTop,
      editorLeft: read.wysiwygLeft ?? 0,
      previewTop: read.sourceTop,
      previewLeft: read.sourceLeft ?? 0,
    };
  }
  if (read.showWysiwyg) {
    if (read.wysiwygTop == null) return null;
    return {
      editorTop: read.wysiwygTop,
      editorLeft: read.wysiwygLeft ?? 0,
      previewTop: 0,
      previewLeft: 0,
    };
  }
  if (read.showSource) {
    if (read.sourceTop == null) return null;
    return {
      editorTop: read.sourceTop,
      editorLeft: read.sourceLeft ?? 0,
      previewTop: 0,
      previewLeft: 0,
    };
  }
  return null;
}

/** Which scroller receives which saved offset for the panes now on screen. */
export function haimScrollRestorePlan(
  snap: EditorScrollSnapshot,
  panes: HaimScrollPaneVisibility,
): HaimScrollRestorePlan {
  if (panes.showWysiwyg && panes.showSource) {
    return {
      wysiwyg: { top: snap.editorTop, left: snap.editorLeft },
      source: { top: snap.previewTop, left: snap.previewLeft },
    };
  }
  if (panes.showWysiwyg) {
    return {
      wysiwyg: { top: snap.editorTop, left: snap.editorLeft },
      source: null,
    };
  }
  if (panes.showSource) {
    return {
      wysiwyg: null,
      source: { top: snap.editorTop, left: snap.editorLeft },
    };
  }
  return { wysiwyg: null, source: null };
}

/**
 * True when `scrollTop` already matches `target`, or the document is not
 * tall enough yet (caller should retry after layout).
 */
export function haimScrollApplyStuck(
  scrollTop: number,
  target: number,
  maxScroll: number,
): boolean {
  if (target <= 1) return scrollTop <= 1;
  if (maxScroll + 1 < target) return false;
  const clamped = Math.min(target, maxScroll);
  return Math.abs(scrollTop - clamped) <= 2;
}

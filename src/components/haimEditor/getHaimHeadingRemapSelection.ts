/**
 * Snapshot the active Haim selection as vault markdown for HeadingRemapModal.
 * TipTap textBetween strips ATX markers — serialize blocks instead.
 */

import type { Editor, JSONContent } from '@tiptap/core';
import type { Node as PMNode } from '@tiptap/pm/model';
import type { EditorView as CmEditorView } from '@codemirror/view';
import { scrubEmptyParagraphNbsp } from '@/components/haimEditor/markdownIo';
import { restoreCustomMarkdown } from '@/components/haimEditor/protectCustomMarkdown';

export type HaimHeadingRemapRange =
  | { kind: 'tiptap'; from: number; to: number }
  | { kind: 'cm'; from: number; to: number };

export type HaimHeadingRemapSelection = {
  markdown: string;
  range: HaimHeadingRemapRange;
};

type MarkdownSerialize = (doc: JSONContent) => string;

function getMarkdownSerialize(editor: Editor): MarkdownSerialize | null {
  const md = editor.storage.markdown as
    | { manager?: { serialize?: MarkdownSerialize } }
    | undefined;
  const manager = md?.manager;
  if (!manager || typeof manager.serialize !== 'function') return null;
  return (doc: JSONContent) => manager.serialize!(doc);
}

/**
 * Top-level blocks that intersect [from, to], plus the contiguous PM range
 * covering those blocks (so replace can delete whole headings).
 */
export function collectTopLevelBlocksInRange(
  doc: PMNode,
  from: number,
  to: number,
): { from: number; to: number; nodes: PMNode[] } | null {
  if (from >= to) return null;
  const nodes: PMNode[] = [];
  let rangeFrom = Number.POSITIVE_INFINITY;
  let rangeTo = -1;

  doc.forEach((node, pos) => {
    const nodeEnd = pos + node.nodeSize;
    if (nodeEnd > from && pos < to) {
      nodes.push(node);
      rangeFrom = Math.min(rangeFrom, pos);
      rangeTo = Math.max(rangeTo, nodeEnd);
    }
  });

  if (!nodes.length || !Number.isFinite(rangeFrom) || rangeTo < 0) return null;
  return { from: rangeFrom, to: rangeTo, nodes };
}

function serializeTipTapBlocks(
  serialize: MarkdownSerialize,
  nodes: PMNode[],
): string {
  const content = nodes.map((node) => node.toJSON() as JSONContent);
  const raw = serialize({ type: 'doc', content });
  return scrubEmptyParagraphNbsp(restoreCustomMarkdown(raw)).replace(/\n+$/, '');
}

function snapshotTipTapSelection(
  editor: Editor,
): HaimHeadingRemapSelection | null {
  const { from, to, empty } = editor.state.selection;
  if (empty || from === to) return null;

  const collected = collectTopLevelBlocksInRange(editor.state.doc, from, to);
  if (!collected) return null;

  const serialize = getMarkdownSerialize(editor);
  if (!serialize) return null;

  const markdown = serializeTipTapBlocks(serialize, collected.nodes);
  if (!markdown) return null;

  return {
    markdown,
    range: { kind: 'tiptap', from: collected.from, to: collected.to },
  };
}

function snapshotCmSelection(
  cmView: CmEditorView,
): HaimHeadingRemapSelection | null {
  const { from, to } = cmView.state.selection.main;
  if (from === to) return null;
  const markdown = cmView.state.doc.sliceString(from, to);
  if (!markdown) return null;
  return {
    markdown,
    range: { kind: 'cm', from, to },
  };
}

export type GetHaimHeadingRemapSelectionOptions = {
  sourceVisible?: boolean | undefined;
  /** Prefer CM when true (source-only / CM focused), matching other Haim actions. */
  preferSource?: boolean | undefined;
};

/**
 * Prefer focused / preferSource CodeMirror (raw markdown offsets).
 * Otherwise TipTap: serialize intersecting top-level blocks (keeps ATX #).
 */
export function getHaimHeadingRemapSelection(
  editor: Editor | null | undefined,
  cmView: CmEditorView | null | undefined,
  options?: GetHaimHeadingRemapSelectionOptions,
): HaimHeadingRemapSelection | null {
  const sourceVisible = options?.sourceVisible !== false;
  const preferSource = Boolean(options?.preferSource);

  const cmSnap =
    cmView && sourceVisible ? snapshotCmSelection(cmView) : null;
  const tipTapSnap = editor ? snapshotTipTapSelection(editor) : null;

  if (preferSource && cmSnap) return cmSnap;
  if (cmView?.hasFocus && cmSnap) return cmSnap;
  if (editor?.isFocused && tipTapSnap) return tipTapSnap;
  return tipTapSnap ?? cmSnap;
}

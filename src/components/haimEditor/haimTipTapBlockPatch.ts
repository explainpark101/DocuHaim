/**
 * Fence-aware top-level markdown blocks and a small TipTap patch.
 * A full setContent while the source pane is focused stalls keystrokes.
 */

import type { Editor } from '@tiptap/react';
import type { JSONContent } from '@tiptap/core';
import { Node as PMNode } from '@tiptap/pm/model';
import { splitLeadingMetaComments } from '@/components/haimEditor/metaCommentGuard';

const MAX_PATCHED_BLOCKS = 3;

export function splitTopLevelMarkdownBlocks(markdown: string): string[] {
  const body = splitLeadingMetaComments(markdown).body.replace(/\s+$/, '');
  if (!body) return [];
  const lines = body.split('\n');
  const blocks: string[] = [];
  let current: string[] = [];
  let fence: string | null = null;

  const push = () => {
    const text = current.join('\n').replace(/\s+$/, '');
    current = [];
    if (text) blocks.push(text);
  };

  for (const line of lines) {
    const fenceMatch = /^(```+|~~~+)/.exec(line.trimStart());
    if (fence) {
      current.push(line);
      if (fenceMatch && fenceMatch[1] === fence) fence = null;
      continue;
    }
    if (fenceMatch && current.length === 0) {
      fence = fenceMatch[1] ?? null;
      current.push(line);
      continue;
    }
    if (line.trim() === '') {
      push();
      continue;
    }
    current.push(line);
  }
  push();
  return blocks;
}

export function changedBlockIndexes(
  before: readonly string[],
  after: readonly string[],
): number[] | null {
  if (before.length !== after.length) return null;
  const changed: number[] = [];
  for (let i = 0; i < after.length; i += 1) {
    if (before[i] !== after[i]) changed.push(i);
  }
  if (changed.length === 0) return [];
  if (changed.length > MAX_PATCHED_BLOCKS) return null;
  return changed;
}

type MarkdownManager = {
  parse?: (markdown: string) => JSONContent;
};

function parseSingleBlock(editor: Editor, markdown: string): PMNode | null {
  const manager = (editor.storage as { markdown?: { manager?: MarkdownManager } })
    .markdown?.manager;
  if (!manager || typeof manager.parse !== 'function') return null;
  let json: JSONContent;
  try {
    json = manager.parse(markdown);
  } catch {
    return null;
  }
  const content = json.content;
  if (!content || content.length !== 1) return null;
  const block = content[0];
  if (!block) return null;
  try {
    return PMNode.fromJSON(editor.schema, block);
  } catch {
    return null;
  }
}

/**
 * Replace up to three unchanged-count top-level blocks.
 * Returns false when the doc shape does not match (caller may full-replace later).
 */
export function tryPatchTipTapTopLevelBlocks(
  editor: Editor,
  beforeMarkdown: string,
  afterMarkdown: string,
): boolean {
  if (editor.isDestroyed) return false;
  const beforeBlocks = splitTopLevelMarkdownBlocks(beforeMarkdown);
  const afterBlocks = splitTopLevelMarkdownBlocks(afterMarkdown);
  const indexes = changedBlockIndexes(beforeBlocks, afterBlocks);
  if (!indexes) return false;
  if (indexes.length === 0) return true;

  const doc = editor.state.doc;
  if (doc.childCount !== afterBlocks.length) return false;

  const positions: number[] = [];
  doc.forEach((_node, pos) => {
    positions.push(pos);
  });

  let tr = editor.state.tr;
  const ordered = [...indexes].sort((a, b) => b - a);
  for (const index of ordered) {
    const markdown = afterBlocks[index];
    const pos = positions[index];
    const child = doc.child(index);
    if (markdown == null || pos == null || !child) return false;
    const parsed = parseSingleBlock(editor, markdown);
    if (!parsed) return false;
    tr = tr.replaceWith(pos, pos + child.nodeSize, parsed);
  }
  if (!tr.docChanged) return true;
  editor.view.dispatch(tr);
  return true;
}

export function shouldAbortScheduledApply(options: {
  scheduledDocLength: number;
  currentDocLength: number;
  scheduledInputAt: number;
  currentInputAt: number;
}): boolean {
  return (
    options.currentDocLength !== options.scheduledDocLength ||
    options.currentInputAt !== options.scheduledInputAt
  );
}

/** Full setContent only after the source pane blurs or input has rested. */
export function shouldUseFullTipTapReplace(options: {
  sourceFocused: boolean;
  forceFull: boolean;
}): boolean {
  if (options.forceFull) return true;
  return !options.sourceFocused;
}

/** Parent value must not rewrite the source doc the user is editing. */
export function shouldRewriteCmFromParentValue(options: {
  fileChanged: boolean;
  authorIsSource: boolean;
  sourceFocused: boolean;
}): boolean {
  if (options.fileChanged) return true;
  if (options.authorIsSource && options.sourceFocused) return false;
  return true;
}

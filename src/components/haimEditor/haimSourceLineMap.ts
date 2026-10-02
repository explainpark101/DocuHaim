/**
 * Map TipTap top-level blocks to 0-based vault markdown line numbers
 * for [data-line] scroll sync with the source CodeMirror pane.
 *
 * Perf: full mapping does 1 doc serialize + N block serializes. Prefer
 * `remapTopLevelBlocksToSourceLines` so unchanged PM child identity reuses
 * prior line numbers and only re-serializes changed blocks.
 */

import type { JSONContent } from '@tiptap/core';
import type { Node as PMNode } from '@tiptap/pm/model';
import { joinMetaPrefix } from '@/components/haimEditor/metaCommentGuard';

export type HaimSourceLineEntry = {
  /** ProseMirror position of the block node. */
  pos: number;
  /** Inclusive end = pos + nodeSize. */
  to: number;
  /** 0-based line in the full vault markdown (CM doc). */
  line0: number;
  /** Newline count inside this block's serialized markdown (incremental). */
  blockNewlines: number;
};

type MarkdownSerialize = (doc: JSONContent) => string;

/** Max changed top-level blocks before falling back to a full remap. */
export const HAIM_SOURCE_LINE_INCREMENTAL_MAX_CHANGED = 3;

function countNewlines(text: string): number {
  let n = 0;
  for (let i = 0; i < text.length; i += 1) {
    if (text.charCodeAt(i) === 10) n += 1;
  }
  return n;
}

/**
 * Build an O(log n) line-index lookup for a string (0-based line at offset).
 */
export function createLineIndexAt(text: string): (charOffset: number) => number {
  const starts: number[] = [0];
  for (let i = 0; i < text.length; i += 1) {
    if (text.charCodeAt(i) === 10) starts.push(i + 1);
  }
  return (charOffset: number) => {
    const end = Math.min(Math.max(0, charOffset), text.length);
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      const at = starts[mid] ?? 0;
      if (at <= end) lo = mid;
      else hi = mid - 1;
    }
    return lo;
  };
}

function lineIndexAt(text: string, charOffset: number): number {
  return createLineIndexAt(text)(charOffset);
}

/** 0-based vault line where TipTap body markdown begins (after meta prefix). */
export function bodyStartLine0(metaPrefix: string): number {
  if (!metaPrefix) return 0;
  const marker = '\0';
  const joined = joinMetaPrefix(metaPrefix, marker);
  const idx = joined.indexOf(marker);
  return idx < 0 ? 0 : lineIndexAt(joined, idx);
}

function serializeBlock(serialize: MarkdownSerialize, node: PMNode): string {
  try {
    return serialize({ type: 'doc', content: [node.toJSON()] }).replace(/\n+$/, '');
  } catch {
    return node.textContent || '';
  }
}

function canIncrementalRemap(
  doc: PMNode,
  prevDoc: PMNode | null | undefined,
  prevEntries: ReadonlyArray<HaimSourceLineEntry> | null | undefined,
): boolean {
  if (!prevDoc || !prevEntries || prevEntries.length === 0) return false;
  if (prevDoc.childCount !== doc.childCount) return false;
  if (prevEntries.length !== doc.childCount) return false;
  for (let i = 0; i < doc.childCount; i += 1) {
    if (doc.child(i)?.type.name !== prevDoc.child(i)?.type.name) return false;
  }
  let changed = 0;
  for (let i = 0; i < doc.childCount; i += 1) {
    if (doc.child(i) !== prevDoc.child(i)) {
      changed += 1;
      if (changed > HAIM_SOURCE_LINE_INCREMENTAL_MAX_CHANGED) return false;
    }
  }
  return true;
}

/**
 * Fast path when most top-level PM children keep identity (typical typing).
 * Re-serializes only changed blocks; adjusts subsequent line0 by newline delta.
 */
export function incrementalMapTopLevelBlocksToSourceLines(
  doc: PMNode,
  prevDoc: PMNode,
  prevEntries: ReadonlyArray<HaimSourceLineEntry>,
  serialize: MarkdownSerialize,
): HaimSourceLineEntry[] {
  const out: HaimSourceLineEntry[] = [];
  let lineDelta = 0;
  let index = 0;

  doc.forEach((node, pos) => {
    const prevNode = prevDoc.child(index);
    const prev = prevEntries[index];
    const to = pos + node.nodeSize;

    if (!prev || !prevNode) {
      const chunk = serializeBlock(serialize, node);
      const blockNewlines = countNewlines(chunk);
      out.push({
        pos,
        to,
        line0: prev?.line0 ?? 0,
        blockNewlines,
      });
      index += 1;
      return;
    }

    if (node.type.name === 'noteCover') {
      out.push({ pos, to, line0: 0, blockNewlines: 0 });
      index += 1;
      return;
    }

    if (node === prevNode) {
      out.push({
        pos,
        to,
        line0: prev.line0 + lineDelta,
        blockNewlines: prev.blockNewlines,
      });
      index += 1;
      return;
    }

    const chunk = serializeBlock(serialize, node);
    const blockNewlines = countNewlines(chunk);
    const oldNewlines =
      typeof prev.blockNewlines === 'number'
        ? prev.blockNewlines
        : countNewlines(serializeBlock(serialize, prevNode));
    out.push({
      pos,
      to,
      // Block start line is stable when editing inside the block.
      line0: prev.line0 + lineDelta,
      blockNewlines,
    });
    lineDelta += blockNewlines - oldNewlines;
    index += 1;
  });

  return out;
}

/**
 * Assign a vault source line to each top-level TipTap block by locating its
 * serialized markdown inside the full body serialization.
 */
export function mapTopLevelBlocksToSourceLines(
  doc: PMNode,
  serialize: MarkdownSerialize,
  metaPrefix: string,
): HaimSourceLineEntry[] {
  const bodyStart = bodyStartLine0(metaPrefix);
  let fullBody = '';
  try {
    fullBody = serialize(doc.toJSON());
  } catch {
    fullBody = '';
  }

  const lineAt = createLineIndexAt(fullBody);
  const entries: HaimSourceLineEntry[] = [];
  let cursor = 0;

  doc.forEach((node, pos) => {
    const to = pos + node.nodeSize;

    // Display-only cover host — align with the leading note-cover meta comment.
    if (node.type.name === 'noteCover') {
      entries.push({ pos, to, line0: 0, blockNewlines: 0 });
      return;
    }

    const chunk = serializeBlock(serialize, node);
    const blockNewlines = countNewlines(chunk);
    let idx = -1;
    if (chunk.length > 0 && fullBody) {
      idx = fullBody.indexOf(chunk, cursor);
      if (idx < 0) {
        let c = cursor;
        while (c < fullBody.length && fullBody.charCodeAt(c) === 10) c += 1;
        idx = fullBody.indexOf(chunk, c);
      }
    }

    let line0: number;
    if (idx >= 0) {
      line0 = bodyStart + lineAt(idx);
      cursor = idx + Math.max(chunk.length, 1);
    } else {
      while (cursor < fullBody.length && fullBody.charCodeAt(cursor) === 10) {
        cursor += 1;
      }
      line0 = bodyStart + lineAt(cursor);
      cursor = Math.min(
        fullBody.length,
        cursor + Math.max(chunk.length, chunk ? 0 : 1),
      );
    }

    entries.push({ pos, to, line0, blockNewlines });
  });

  return entries;
}

/**
 * Remap with incremental reuse when possible; otherwise full serialize map.
 */
export function remapTopLevelBlocksToSourceLines(
  doc: PMNode,
  serialize: MarkdownSerialize,
  metaPrefix: string,
  prevDoc?: PMNode | null,
  prevEntries?: ReadonlyArray<HaimSourceLineEntry> | null,
): HaimSourceLineEntry[] {
  if (canIncrementalRemap(doc, prevDoc, prevEntries) && prevDoc && prevEntries) {
    return incrementalMapTopLevelBlocksToSourceLines(
      doc,
      prevDoc,
      prevEntries,
      serialize,
    );
  }
  return mapTopLevelBlocksToSourceLines(doc, serialize, metaPrefix);
}

/**
 * While the WYSIWYG surface has focus, TipTap should map existing decorations
 * instead of rebuilding (N+1 serialize). Scroll sync already defers layout
 * remasure while focused — stale data-line values are OK until idle remap.
 */
export function shouldDeferSourceLineRemap(options: {
  enabled: boolean;
  docChanged: boolean;
  tipTapFocused: boolean;
}): boolean {
  if (!options.enabled) return false;
  if (!options.docChanged) return false;
  return options.tipTapFocused;
}

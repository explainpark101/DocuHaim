/**
 * Map TipTap top-level blocks to 0-based vault markdown line numbers
 * for [data-line] scroll sync with the source CodeMirror pane.
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
};

type MarkdownSerialize = (doc: JSONContent) => string;

function lineIndexAt(text: string, charOffset: number): number {
  let line = 0;
  const end = Math.min(Math.max(0, charOffset), text.length);
  for (let i = 0; i < end; i += 1) {
    if (text.charCodeAt(i) === 10) line += 1;
  }
  return line;
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

  const entries: HaimSourceLineEntry[] = [];
  let cursor = 0;

  doc.forEach((node, pos) => {
    const to = pos + node.nodeSize;

    // Display-only cover host — align with the leading note-cover meta comment.
    if (node.type.name === 'noteCover') {
      entries.push({ pos, to, line0: 0 });
      return;
    }

    const chunk = serializeBlock(serialize, node);
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
      line0 = bodyStart + lineIndexAt(fullBody, idx);
      cursor = idx + Math.max(chunk.length, 1);
    } else {
      while (cursor < fullBody.length && fullBody.charCodeAt(cursor) === 10) {
        cursor += 1;
      }
      line0 = bodyStart + lineIndexAt(fullBody, cursor);
      cursor = Math.min(
        fullBody.length,
        cursor + Math.max(chunk.length, chunk ? 0 : 1),
      );
    }

    entries.push({ pos, to, line0 });
  });

  return entries;
}

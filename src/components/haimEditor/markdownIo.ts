import type { Editor } from '@tiptap/react';
import {
  splitLeadingMetaComments,
  joinMetaPrefix,
} from '@/components/haimEditor/metaCommentGuard';
import {
  protectCustomMarkdown,
  restoreCustomMarkdown,
} from '@/components/haimEditor/protectCustomMarkdown';
import { migrateMathStringsOutsideCode } from '@/components/haimEditor/migrateMathOutsideCode';
import { getCachedMarkdown, invalidateMarkdownCache } from '@/components/haimEditor/markdownCache';
import { trimCodeBlocksInEditor } from '@/components/haimEditor/trimCodeBlockEdges';
import { noteCoverPlaceholderProtectedHtml } from '@/components/haimEditor/extensions/NoteCover';

/**
 * Prepare vault markdown for TipTap (meta strip + protect custom blocks).
 * Leading note-cover comment stays in prefix; a WYSIWYG host is injected into content.
 */
export function markdownToEditorContent(markdown: string): {
  prefix: string;
  content: string;
} {
  const { prefix, body } = splitLeadingMetaComments(markdown);
  let content = protectCustomMarkdown(body);
  if (/<!--\s*note-cover\b/i.test(prefix)) {
    content = `${noteCoverPlaceholderProtectedHtml()}${content}`;
  }
  return {
    prefix,
    content,
  };
}

/**
 * Serialize TipTap doc back to vault markdown (restore + meta prefix).
 * Strips TipTap empty-paragraph `&nbsp;` markers so they never hit vault source.
 */
export function editorToVaultMarkdown(
  editor: Editor | null | undefined,
  metaPrefix: string,
): string {
  if (!editor) return metaPrefix || '';
  const raw = getCachedMarkdown(editor);
  const restored = scrubEmptyParagraphNbsp(restoreCustomMarkdown(raw));
  return joinMetaPrefix(metaPrefix, restored);
}

/** Drop stock TipTap empty-paragraph markers (`&nbsp;` / U+00A0-only lines). */
export function scrubEmptyParagraphNbsp(markdown: string): string {
  let out = typeof markdown === 'string' ? markdown : '';
  // Standalone lines that are only &nbsp; or NBSP (optional spaces around)
  out = out.replace(/^[ \t]*(?:&nbsp;|\u00A0)+[ \t]*$/gm, '');
  // Inline leftover entity after a newline (e.g. "\n&nbsp;" mid-doc)
  out = out.replace(/(^|\n)[ \t]*&nbsp;[ \t]*(?=\n|$)/g, '$1');
  out = out.replace(/(^|\n)[ \t]*\u00A0+[ \t]*(?=\n|$)/g, '$1');
  // Collapse runs of blank lines left by removals (keep at most one blank)
  out = out.replace(/\n{3,}/g, '\n\n');
  return out;
}

export function setEditorMarkdown(
  editor: Editor,
  markdown: string,
  metaPrefixRef: { current: string },
  options?: { emitUpdate?: boolean },
): void {
  const { prefix, content } = markdownToEditorContent(markdown);
  metaPrefixRef.current = prefix;
  invalidateMarkdownCache(editor);
  editor.commands.setContent(content, {
    contentType: 'markdown',
    emitUpdate: options?.emitUpdate ?? false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
  // Convert leftover $…$ text to inlineMath (skip code marks / codeBlock)
  try {
    migrateMathStringsOutsideCode(editor);
  } catch {
    // ignore if Mathematics not registered
  }
  // Drop leading/trailing blank lines inside fenced code blocks for WYSIWYG
  try {
    trimCodeBlocksInEditor(editor, { skipSelectionBlock: false });
  } catch {
    // ignore if codeBlock extension absent (composer)
  }
}

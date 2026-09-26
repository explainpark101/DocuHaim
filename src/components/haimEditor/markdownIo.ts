import type { Editor } from '@tiptap/react';
import {
  splitLeadingMetaComments,
  joinMetaPrefix,
} from '@/components/haimEditor/metaCommentGuard';
import {
  protectCustomMarkdown,
  restoreCustomMarkdown,
} from '@/components/haimEditor/protectCustomMarkdown';
import { getCachedMarkdown, invalidateMarkdownCache } from '@/components/haimEditor/markdownCache';

/**
 * Prepare vault markdown for TipTap (meta strip + protect custom blocks).
 */
export function markdownToEditorContent(markdown: string): {
  prefix: string;
  content: string;
} {
  const { prefix, body } = splitLeadingMetaComments(markdown);
  return {
    prefix,
    content: protectCustomMarkdown(body),
  };
}

/**
 * Serialize TipTap doc back to vault markdown (restore + meta prefix).
 */
export function editorToVaultMarkdown(
  editor: Editor | null | undefined,
  metaPrefix: string,
): string {
  if (!editor) return metaPrefix || '';
  const raw = getCachedMarkdown(editor);
  const restored = restoreCustomMarkdown(raw);
  return joinMetaPrefix(metaPrefix, restored);
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
}

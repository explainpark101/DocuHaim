import { Markdown } from '@tiptap/markdown';
import { patchMarkdownManagerPreserveRawText } from '@/components/haimEditor/patchMarkdownManagerPreserveRawText';

/**
 * TipTap Markdown with vault-friendly serialization:
 * do not auto-backslash-escape or HTML-entity-encode plain text.
 */
export const HaimMarkdown = Markdown.extend({
  onBeforeCreate() {
    this.parent?.();
    const manager = this.storage?.manager;
    if (manager) {
      patchMarkdownManagerPreserveRawText(manager);
    }
    if (this.editor?.markdown) {
      patchMarkdownManagerPreserveRawText(this.editor.markdown);
    }
  },
});

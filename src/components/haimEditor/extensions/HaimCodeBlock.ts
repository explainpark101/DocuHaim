import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { common, createLowlight } from 'lowlight';
import { createCodeBlockBracketPairsPlugin } from '@/components/haimEditor/codeBlockBracketPairs';
import {
  tryHandleCodeBlockEnter,
  tryHandleCodeBlockShiftEnter,
} from '@/components/haimEditor/codeBlockEnter';
import { createCodeBlockIndentPlugin } from '@/components/haimEditor/codeBlockIndent';
import HaimCodeBlockView from '@/components/haimEditor/extensions/HaimCodeBlockView';
import { createTrimCodeBlockEdgesPlugin } from '@/components/haimEditor/trimCodeBlockEdges';

const lowlight = createLowlight(common);

/**
 * CodeBlockLowlight + React node view:
 * - language=mermaid → chart preview
 * - other languages → lowlight token classes (needs highlight.js CSS)
 * - trim leading/trailing blank lines when leaving the block
 * - code-editor bracket/quote pairing + Tab indent inside the block
 * - Enter preserves indent; third Enter after two blank lines exits + trims
 * - Shift-Enter inserts a blank line above (does not hard-break out of the block)
 */
export const HaimCodeBlock = CodeBlockLowlight.extend({
  // Win over HardBreak Shift-Enter while the caret is in a code block.
  priority: 1000,

  addNodeView() {
    return ReactNodeViewRenderer(HaimCodeBlockView);
  },
  addKeyboardShortcuts() {
    const parent = this.parent?.() ?? {};
    return {
      ...parent,
      Enter: ({ editor }) => tryHandleCodeBlockEnter(editor),
      'Shift-Enter': ({ editor }) => tryHandleCodeBlockShiftEnter(editor),
    };
  },
  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() ?? []),
      createTrimCodeBlockEdgesPlugin(),
      createCodeBlockBracketPairsPlugin(),
      createCodeBlockIndentPlugin(),
    ];
  },
}).configure({
  lowlight,
  languageClassPrefix: 'language-',
  // Dynamic per-language width is handled by createCodeBlockIndentPlugin.
  enableTabIndentation: false,
  // Custom Enter (indent + ws-tolerant triple-enter exit) lives in tryHandleCodeBlockEnter.
  exitOnTripleEnter: false,
});

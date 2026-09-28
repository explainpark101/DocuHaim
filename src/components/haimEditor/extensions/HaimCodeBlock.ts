import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { common, createLowlight } from 'lowlight';
import { createCodeBlockBracketPairsPlugin } from '@/components/haimEditor/codeBlockBracketPairs';
import HaimCodeBlockView from '@/components/haimEditor/extensions/HaimCodeBlockView';
import { createTrimCodeBlockEdgesPlugin } from '@/components/haimEditor/trimCodeBlockEdges';

const lowlight = createLowlight(common);

/**
 * CodeBlockLowlight + React node view:
 * - language=mermaid → chart preview
 * - other languages → lowlight token classes (needs highlight.js CSS)
 * - trim leading/trailing blank lines when leaving the block
 * - code-editor bracket/quote pairing inside the block
 */
export const HaimCodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(HaimCodeBlockView);
  },
  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() ?? []),
      createTrimCodeBlockEdgesPlugin(),
      createCodeBlockBracketPairsPlugin(),
    ];
  },
}).configure({
  lowlight,
  languageClassPrefix: 'language-',
});

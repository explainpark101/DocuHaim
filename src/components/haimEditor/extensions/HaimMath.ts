import { BlockMath, InlineMath } from '@tiptap/extension-mathematics';
import { ReactNodeViewRenderer } from '@tiptap/react';
import {
  HaimBlockMathView,
  HaimInlineMathView,
} from '@/components/haimEditor/extensions/HaimMathViews';

/**
 * TipTap BlockMath with React NodeView (KaTeX + double-click source edit).
 */
export const HaimBlockMath = BlockMath.extend({
  addNodeView() {
    return ReactNodeViewRenderer(HaimBlockMathView);
  },
}).configure({
  katexOptions: {
    throwOnError: false,
    displayMode: true,
  },
});

/**
 * TipTap InlineMath with React NodeView (KaTeX + double-click source edit).
 */
export const HaimInlineMath = InlineMath.extend({
  addNodeView() {
    return ReactNodeViewRenderer(HaimInlineMathView);
  },
}).configure({
  katexOptions: {
    throwOnError: false,
    displayMode: false,
  },
});

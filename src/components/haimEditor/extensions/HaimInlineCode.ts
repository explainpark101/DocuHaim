import Code from '@tiptap/extension-code';

/**
 * StarterKit's code mark sets `excludes: '_'`, which drops every other
 * mark. `**`code`**` then stores only code, so the span never renders bold.
 * Exclude the code mark itself and keep bold / italic / strike.
 * Characters inside a code span stay literal; the markdown parser does
 * not create emphasis marks for them.
 */
export const HaimInlineCode = Code.extend({
  excludes: 'code',
});

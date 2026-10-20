import Heading, { type Level } from '@tiptap/extension-heading';
import type { Editor } from '@tiptap/core';
import type { Node as ProseMirrorNode, NodeType } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';

type HeadingMarkdownNode = {
  attrs?: { level?: unknown } | null;
  content?: unknown;
};

/**
 * Empty TipTap headings omit `content`. Stock renderMarkdown then returns ''
 * and the ATX marks never reach vault markdown.
 */
export function renderHaimHeadingMarkdown(
  node: HeadingMarkdownNode,
  renderChildren: (content: unknown) => string,
): string {
  const raw = Number(node.attrs?.level ?? 1);
  const level = Number.isFinite(raw) ? Math.min(6, Math.max(1, Math.trunc(raw))) : 1;
  const content = node.content ? renderChildren(node.content) : '';
  return `${'#'.repeat(level)} ${content}`;
}

const CONVERTIBLE_BLOCK = new Set(['paragraph', 'heading', 'deepHeading']);

type TextblockHit = { pos: number; node: ProseMirrorNode };

function selectedTextblocks(state: EditorState): TextblockHit[] {
  const { from, to } = state.selection;
  const blocks: TextblockHit[] = [];
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (!node.isTextblock) return undefined;
    blocks.push({ pos, node });
    return false;
  });
  return blocks;
}

function emptyHeadingBlock(editor: Editor): number | null {
  const { $from } = editor.state.selection;
  const parent = $from.parent;
  if (!parent.isTextblock || parent.content.size !== 0) return null;
  if (parent.type.name !== 'paragraph' && parent.type.name !== 'heading') return null;
  return $from.before($from.depth);
}

function attrsFor(
  type: NodeType,
  source: ProseMirrorNode,
  extra: Record<string, unknown>,
): Record<string, unknown> {
  const spec = type.spec.attrs ?? {};
  const attrs: Record<string, unknown> = {};
  for (const key of Object.keys(spec)) {
    if (Object.prototype.hasOwnProperty.call(extra, key)) {
      attrs[key] = extra[key];
    } else if (source.attrs[key] != null) {
      attrs[key] = source.attrs[key];
    }
  }
  return attrs;
}

/**
 * Multi-block selection: heading-ify only textblocks that contain text.
 * Blank paragraphs stay blank.
 */
function applyMultiLineHeading(
  state: EditorState,
  tr: Transaction,
  dispatch: unknown,
  level: Level,
): boolean {
  const headingType = state.schema.nodes.heading;
  const paragraphType = state.schema.nodes.paragraph;
  if (!headingType || !paragraphType) return false;

  let any = false;
  for (const block of selectedTextblocks(state)) {
    if (!CONVERTIBLE_BLOCK.has(block.node.type.name)) continue;
    if (block.node.textContent.trim() === '') continue;
    const $pos = state.doc.resolve(block.pos);
    const index = $pos.index();
    const isSame =
      block.node.type === headingType && Number(block.node.attrs.level) === level;
    const nextType = isSame ? paragraphType : headingType;
    if (!$pos.parent.canReplaceWith(index, index + 1, nextType)) continue;
    any = true;
    if (dispatch) {
      tr.setNodeMarkup(
        block.pos,
        nextType,
        attrsFor(nextType, block.node, isSame ? {} : { level }),
      );
    }
  }
  return any;
}

/** Toggle h1–h6. On an empty block, leave the caret at the end of that line. */
export function toggleHaimHeadingLevel(editor: Editor, level: Level): boolean {
  if (selectedTextblocks(editor.state).length > 1) {
    let applied = false;
    editor
      .chain()
      .focus()
      .command(({ state, tr, dispatch }) => {
        applied = applyMultiLineHeading(state, tr, dispatch, level);
        return applied;
      })
      .run();
    return applied;
  }

  const blockPos = emptyHeadingBlock(editor);
  const ok = editor.chain().focus().toggleHeading({ level }).run();
  if (!ok || blockPos == null) return ok;

  const node = editor.state.doc.nodeAt(blockPos);
  if (!node?.isTextblock) return true;
  const end = blockPos + node.nodeSize - 1;
  const selection = editor.state.selection;
  if (selection.empty && selection.from === end) return true;
  editor.commands.setTextSelection(end);
  return true;
}

/**
 * StarterKit heading plus Ctrl/Cmd+1…6 (source-pane parity) and empty-heading
 * markdown that still emits the `#` prefix.
 */
export const HaimHeading = Heading.extend({
  renderMarkdown(node, helpers) {
    return renderHaimHeadingMarkdown(node, (content) =>
      helpers.renderChildren(content as Parameters<typeof helpers.renderChildren>[0]),
    );
  },

  addKeyboardShortcuts() {
    const parent = this.parent?.() ?? {};
    const shortcuts: Record<string, () => boolean> = { ...parent };
    for (const level of this.options.levels) {
      shortcuts[`Mod-${level}`] = () => toggleHaimHeadingLevel(this.editor, level);
    }
    return shortcuts;
  },
});

import {
  Node,
  mergeAttributes,
  canInsertNode,
  isNodeSelection,
} from '@tiptap/core';
import { NodeSelection, TextSelection } from '@tiptap/pm/state';

/** Match vault / protected forms: `<pgbr/>`, `<pgbr>`, `<pgbr></pgbr>`. */
const PGBR_TOKEN_RE = /^<pgbr\s*\/?\s*>(?:\s*<\/pgbr>)?(?:\r?\n)*/i;

/**
 * Page break token `<pgbr/>` (print / preview divider).
 * See docs/custom-markdown/page-break.md
 *
 * TipTap Markdown treats unknown HTML as inline and strips block atoms via
 * toInlineContent — so we tokenize `<pgbr/>` as a block before that path.
 */
export const PageBreak = Node.create({
  name: 'pageBreak',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  parseHTML() {
    return [
      { tag: 'pgbr' },
      { tag: 'div[data-haim-pgbr]' },
      { tag: 'div.md-pgbr' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-haim-pgbr': '1',
        'data-md-pgbr': '1',
        class: 'haim-pgbr md-pgbr',
      }),
    ];
  },

  markdownTokenizer: {
    name: 'pageBreak',
    level: 'block',
    start: (src: string) => {
      const m = /<pgbr\s*\/?\s*>/i.exec(src);
      return m ? m.index : -1;
    },
    tokenize: (src: string) => {
      const match = PGBR_TOKEN_RE.exec(src);
      if (!match) return undefined;
      return {
        type: 'pageBreak',
        raw: match[0],
      };
    },
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseMarkdown: (_token: any, helpers: any) => {
    return helpers.createNode('pageBreak');
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderMarkdown: () => '<pgbr/>\n\n',

  addCommands() {
    return {
      setPageBreak:
        () =>
        ({ chain, state }) => {
          const type = state.schema.nodes[this.name];
          if (!type || !canInsertNode(state, type)) return false;

          const { selection } = state;
          const { $to: $originTo } = selection;
          const currentChain = chain();

          if (isNodeSelection(selection)) {
            currentChain.insertContentAt($originTo.pos, { type: this.name });
          } else {
            currentChain.insertContent({ type: this.name });
          }

          return currentChain
            .command(({ state: chainState, tr, dispatch }) => {
              if (dispatch) {
                const { $to } = tr.selection;
                const posAfter = $to.end();
                if ($to.nodeAfter) {
                  if ($to.nodeAfter.isTextblock) {
                    tr.setSelection(TextSelection.create(tr.doc, $to.pos + 1));
                  } else if ($to.nodeAfter.isBlock) {
                    tr.setSelection(NodeSelection.create(tr.doc, $to.pos));
                  } else {
                    tr.setSelection(TextSelection.create(tr.doc, $to.pos));
                  }
                } else {
                  const nodeType =
                    chainState.schema.nodes.paragraph ||
                    $to.parent.type.contentMatch.defaultType;
                  const node = nodeType?.create();
                  if (node) {
                    tr.insert(posAfter, node);
                    tr.setSelection(TextSelection.create(tr.doc, posAfter + 1));
                  }
                }
                tr.scrollIntoView();
              }
              return true;
            })
            .run();
        },
    };
  },
});

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pageBreak: {
      /** Insert a `<pgbr/>` atom at the current selection (splits textblocks). */
      setPageBreak: () => ReturnType;
    };
  }
}

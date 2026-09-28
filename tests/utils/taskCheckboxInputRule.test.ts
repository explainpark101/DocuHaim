import { describe, expect, it } from 'vitest';
import { createChainableState, Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { ListKit } from '@tiptap/extension-list';
import { HaimMarkdown } from '@/components/haimEditor/extensions/HaimMarkdown';
import {
  applyHaimTaskCheckboxInputRule,
  haimTaskMarkdownPrefixInputRegex,
  haimTaskShortInputRegex,
  HaimTaskItem,
} from '@/components/haimEditor/extensions/HaimTaskItem';
import { HaimTaskList } from '@/components/haimEditor/extensions/HaimTaskList';
import { parseTaskCheckboxMarker } from '@/utils/taskCheckboxStatus';

function createEd(content: object) {
  return new Editor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      ListKit.configure({ taskItem: false, taskList: false }),
      HaimTaskItem.configure({ nested: true }),
      HaimTaskList,
      HaimMarkdown,
    ],
    content,
  });
}

function paragraphWithText(text: string) {
  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: text ? [{ type: 'text', text }] : [],
      },
    ],
  };
}

function collectTypes(ed: Editor): string[] {
  const acc: string[] = [];
  const walk = (n: {
    type?: string;
    attrs?: { status?: string };
    content?: unknown[];
  }) => {
    if (n.type) {
      acc.push(n.attrs?.status ? `${n.type}:${n.attrs.status}` : n.type);
    }
    for (const c of n.content ?? []) walk(c as typeof n);
  };
  walk(ed.getJSON() as {
    type?: string;
    attrs?: { status?: string };
    content?: unknown[];
  });
  return acc;
}

function placeCaretAtEnd(ed: Editor) {
  ed.commands.setTextSelection(ed.state.doc.content.size - 1);
}

function runMatchedTaskRule(ed: Editor, matched: string): boolean {
  const short = haimTaskShortInputRegex.exec(matched);
  const prefix = haimTaskMarkdownPrefixInputRegex.exec(matched);
  const match = prefix ?? short;
  if (!match) return false;

  const marker = prefix ? match[1] : match[2];
  const status = parseTaskCheckboxMarker(
    marker === undefined || marker === '' ? ' ' : marker,
  );

  const $from = ed.state.selection.$from;
  const from = $from.pos - matched.length;
  const to = $from.pos;
  const tr = ed.state.tr;
  const chainState = createChainableState({
    state: ed.state,
    transaction: tr,
  });
  const result = applyHaimTaskCheckboxInputRule(
    chainState as unknown as typeof ed.state,
    { from, to },
    {
      status,
      checked: status === 'done',
      kind: status === 'doing' ? 'status' : 'check',
    },
  );
  if (result === null || tr.steps.length === 0) return false;
  ed.view.dispatch(tr);
  return true;
}

describe('Haim task WYSIWYG input rules', () => {
  it('converts -[ ] / -[~] / -[x] + space into task items', () => {
    for (const [typed, status] of [
      ['-[ ] ', 'todo'],
      ['-[~] ', 'doing'],
      ['-[x] ', 'done'],
    ] as const) {
      const ed = createEd(paragraphWithText(typed));
      try {
        placeCaretAtEnd(ed);
        expect(runMatchedTaskRule(ed, typed)).toBe(true);
        expect(collectTypes(ed)).toEqual(
          expect.arrayContaining(['taskList', `taskItem:${status}`]),
        );
      } finally {
        ed.destroy();
      }
    }
  });

  it('converts - [ ] + space (spaced dash) on a plain paragraph', () => {
    const typed = '- [ ] ';
    const ed = createEd(paragraphWithText(typed));
    try {
      placeCaretAtEnd(ed);
      expect(runMatchedTaskRule(ed, typed)).toBe(true);
      expect(collectTypes(ed)).toEqual(
        expect.arrayContaining(['taskList', 'taskItem:todo']),
      );
    } finally {
      ed.destroy();
    }
  });

  it('promotes an existing bullet when the short form [~] + space is applied', () => {
    const ed = createEd({
      type: 'doc',
      content: [
        {
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: '[~] ' }],
                },
              ],
            },
          ],
        },
      ],
    });
    try {
      expect(collectTypes(ed)).toContain('bulletList');
      placeCaretAtEnd(ed);
      expect(runMatchedTaskRule(ed, '[~] ')).toBe(true);
      expect(collectTypes(ed)).toEqual(
        expect.arrayContaining(['taskList', 'taskItem:doing']),
      );
      expect(collectTypes(ed)).not.toContain('bulletList');
    } finally {
      ed.destroy();
    }
  });
});

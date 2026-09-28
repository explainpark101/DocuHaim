import { describe, expect, it } from 'vitest';
import { renderAppMarkdown } from '@/utils/createAppMarkdownIt';
import {
  haimTaskMarkdownPrefixInputRegex,
  haimTaskShortInputRegex,
} from '@/components/haimEditor/extensions/HaimTaskItem';

describe('markdownItTaskListPlugin 3-state', () => {
  it('renders [~] as status kind with data-status=doing', () => {
    const html = renderAppMarkdown('- [~] in progress\n');
    expect(html).toContain('data-status="doing"');
    expect(html).toContain('data-kind="status"');
    expect(html).toContain('aria-checked="mixed"');
    expect(html).toContain('task-list-item-checkbox--status');
    expect(html).not.toContain('checked=""');
  });

  it('renders [ ] / [x] as check kind', () => {
    const html = renderAppMarkdown('- [ ] todo\n- [x] done\n- [X] also done\n');
    expect(html).toContain('data-status="todo"');
    expect(html).toContain('data-status="done"');
    expect(html).toContain('data-kind="check"');
    expect(html).toContain('aria-checked="false"');
    expect(html).toContain('aria-checked="true"');
    expect(html).toContain('contains-task-list');
  });
});

describe('Haim task input rules', () => {
  it('matches short and markdown-prefix forms including ~', () => {
    expect(haimTaskShortInputRegex.test('[ ] ')).toBe(true);
    expect(haimTaskShortInputRegex.test('[~] ')).toBe(true);
    expect(haimTaskShortInputRegex.test('[x] ')).toBe(true);
    expect(haimTaskMarkdownPrefixInputRegex.test('- [ ] ')).toBe(true);
    expect(haimTaskMarkdownPrefixInputRegex.test('-[ ] ')).toBe(true);
    expect(haimTaskMarkdownPrefixInputRegex.test('-[~] ')).toBe(true);
    expect(haimTaskMarkdownPrefixInputRegex.test('-[x] ')).toBe(true);
    expect(haimTaskMarkdownPrefixInputRegex.test('* [~] ')).toBe(true);
    expect(haimTaskMarkdownPrefixInputRegex.test('+ [x] ')).toBe(true);
  });

  it('does not match bare bullet prefix', () => {
    expect(haimTaskMarkdownPrefixInputRegex.test('- ')).toBe(false);
    expect(haimTaskMarkdownPrefixInputRegex.test('-')).toBe(false);
    expect(haimTaskMarkdownPrefixInputRegex.test('- [')).toBe(false);
    expect(haimTaskMarkdownPrefixInputRegex.test('-[')).toBe(false);
  });
});

describe('HaimTaskItem MD round-trip', () => {
  it('preserves [ ] / [~] / [x] through TipTap markdown I/O', async () => {
    const { Editor } = await import('@tiptap/core');
    const StarterKit = (await import('@tiptap/starter-kit')).default;
    const { ListKit } = await import('@tiptap/extension-list');
    const { HaimMarkdown } = await import(
      '@/components/haimEditor/extensions/HaimMarkdown'
    );
    const { HaimTaskItem } = await import(
      '@/components/haimEditor/extensions/HaimTaskItem'
    );
    const { HaimTaskList } = await import(
      '@/components/haimEditor/extensions/HaimTaskList'
    );

    const src = `- [ ] todo item
- [~] doing item
- [x] done item
- [X] also done
`;

    const ed = new Editor({
      extensions: [
        StarterKit.configure({
          // ListKit owns lists
          bulletList: false,
          orderedList: false,
          listItem: false,
        }),
        ListKit.configure({
          taskItem: false,
          taskList: false,
        }),
        HaimTaskItem.configure({ nested: true }),
        HaimTaskList,
        HaimMarkdown,
      ],
      content: src,
      contentType: 'markdown',
    });

    try {
      const out = ed.getMarkdown();
      expect(out).toMatch(/-\s+\[\s\]\s+todo item/);
      expect(out).toMatch(/-\s+\[~\]\s+doing item/);
      expect(out).toMatch(/-\s+\[x\]\s+done item/);
      expect(out).toMatch(/-\s+\[x\]\s+also done/);
      expect(out).not.toMatch(/\[X\]/);

      const json = ed.getJSON();
      const statuses: string[] = [];
      const kinds: string[] = [];
      const walk = (node: {
        type?: string;
        attrs?: { status?: string; kind?: string };
        content?: unknown[];
      }) => {
        if (node.type === 'taskItem' && node.attrs?.status) {
          statuses.push(node.attrs.status);
          kinds.push(node.attrs.kind ?? 'check');
        }
        for (const child of node.content ?? []) {
          walk(child as typeof node);
        }
      };
      walk(json as {
        type?: string;
        attrs?: { status?: string; kind?: string };
        content?: unknown[];
      });
      expect(statuses).toEqual(['todo', 'doing', 'done', 'done']);
      expect(kinds).toEqual(['check', 'status', 'check', 'check']);
    } finally {
      ed.destroy();
    }
  });
});

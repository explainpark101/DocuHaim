import {
  TaskItem,
  type TaskItemOptions,
} from '@tiptap/extension-list';
import {
  mergeAttributes,
  renderNestedMarkdownContent,
  wrappingInputRule,
} from '@tiptap/core';
import {
  cycleTaskCheckboxStatus,
  parseTaskCheckboxMarker,
  serializeTaskCheckboxMarker,
  taskCheckboxStatusFromAttrs,
  type TaskCheckboxStatus,
} from '@/utils/taskCheckboxStatus';

/** Short form: `[ ]` / `[]` / `[~]` / `[x]` + trailing space at line start. */
export const haimTaskShortInputRegex = /^\s*(\[([ xX~]?)\])\s$/;

/**
 * Full markdown prefix: `- [ ]` / `* [~]` / `+ [x]` + trailing space.
 * Does not match `- ` alone (bullet wrapping stays intact).
 */
export const haimTaskMarkdownPrefixInputRegex =
  /^\s*[-*+]\s+\[([ xX~])\]\s$/;

function statusFromMatchChar(ch: string | undefined): TaskCheckboxStatus {
  return parseTaskCheckboxMarker(ch === undefined || ch === '' ? ' ' : ch);
}

function applyCheckboxDom(
  checkbox: HTMLInputElement,
  listItem: HTMLElement,
  status: TaskCheckboxStatus,
): void {
  listItem.dataset.status = status;
  listItem.dataset.checked = status === 'done' ? 'true' : 'false';
  checkbox.checked = status === 'done';
  checkbox.indeterminate = status === 'doing';
  checkbox.setAttribute(
    'aria-checked',
    status === 'doing' ? 'mixed' : status === 'done' ? 'true' : 'false',
  );
}

/**
 * Task item with three-state checkbox: `[ ]` / `[~]` / `[x]`.
 * Click cycles todo → doing → done → todo.
 */
export const HaimTaskItem = TaskItem.extend<TaskItemOptions>({
  addAttributes() {
    return {
      status: {
        default: 'todo' satisfies TaskCheckboxStatus,
        keepOnSplit: false,
        parseHTML: (element) => {
          const raw = element.getAttribute('data-status');
          if (raw === 'todo' || raw === 'doing' || raw === 'done') return raw;
          const dataChecked = element.getAttribute('data-checked');
          return dataChecked === '' || dataChecked === 'true' ? 'done' : 'todo';
        },
        renderHTML: (attributes) => {
          const status = taskCheckboxStatusFromAttrs(attributes);
          return {
            'data-status': status,
            'data-checked': status === 'done' ? 'true' : 'false',
          };
        },
      },
      checked: {
        default: false,
        keepOnSplit: false,
        parseHTML: (element) => {
          const raw = element.getAttribute('data-status');
          if (raw === 'done') return true;
          if (raw === 'doing' || raw === 'todo') return false;
          const dataChecked = element.getAttribute('data-checked');
          return dataChecked === '' || dataChecked === 'true';
        },
        renderHTML: (attributes) => ({
          'data-checked':
            taskCheckboxStatusFromAttrs(attributes) === 'done' ? 'true' : 'false',
        }),
      },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    const status = taskCheckboxStatusFromAttrs(node.attrs);
    return [
      'li',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': this.name,
        'data-status': status,
        'data-checked': status === 'done' ? 'true' : 'false',
      }),
      [
        'label',
        [
          'input',
          {
            type: 'checkbox',
            class: 'task-list-item-checkbox',
            checked: status === 'done' ? 'checked' : null,
            'data-status': status,
            'aria-checked':
              status === 'doing' ? 'mixed' : status === 'done' ? 'true' : 'false',
          },
        ],
        ['span'],
      ],
      ['div', 0],
    ];
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseMarkdown: (token: any, h: any) => {
    const content = [];
    if (token.tokens && token.tokens.length > 0) {
      content.push(h.createNode('paragraph', {}, h.parseInline(token.tokens)));
    } else if (token.text) {
      content.push(
        h.createNode('paragraph', {}, [
          h.createNode('text', { text: token.text }),
        ]),
      );
    } else {
      content.push(h.createNode('paragraph', {}, []));
    }
    if (token.nestedTokens && token.nestedTokens.length > 0) {
      content.push(...h.parseChildren(token.nestedTokens));
    }
    const status: TaskCheckboxStatus =
      token.status === 'todo' ||
      token.status === 'doing' ||
      token.status === 'done'
        ? token.status
        : token.checked
          ? 'done'
          : 'todo';
    return h.createNode(
      'taskItem',
      { status, checked: status === 'done' },
      content,
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderMarkdown: (node: any, h: any) => {
    const status = taskCheckboxStatusFromAttrs(node?.attrs);
    const marker = serializeTaskCheckboxMarker(status);
    const prefix = `- [${marker}] `;
    return renderNestedMarkdownContent(node, h, prefix);
  },

  addNodeView() {
    return ({ node, HTMLAttributes, getPos, editor }) => {
      const listItem = document.createElement('li');
      const checkboxWrapper = document.createElement('label');
      const checkbox = document.createElement('input');
      const content = document.createElement('div');

      checkboxWrapper.contentEditable = 'false';
      checkbox.type = 'checkbox';
      checkbox.className = 'task-list-item-checkbox';

      const setStatus = (status: TaskCheckboxStatus) => {
        applyCheckboxDom(checkbox, listItem, status);
        checkbox.setAttribute(
          'aria-label',
          status === 'doing'
            ? 'Task in progress'
            : status === 'done'
              ? 'Task completed'
              : 'Task not started',
        );
      };

      setStatus(taskCheckboxStatusFromAttrs(node.attrs));

      checkbox.addEventListener('mousedown', (event) => event.preventDefault());
      checkbox.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!editor.isEditable && !this.options.onReadOnlyChecked) {
          setStatus(taskCheckboxStatusFromAttrs(node.attrs));
          return;
        }

        const current = taskCheckboxStatusFromAttrs(
          typeof getPos === 'function'
            ? editor.state.doc.nodeAt(getPos() ?? -1)?.attrs
            : node.attrs,
        );
        const next = cycleTaskCheckboxStatus(current);

        if (editor.isEditable && typeof getPos === 'function') {
          editor
            .chain()
            .focus(undefined, { scrollIntoView: false })
            .command(({ tr }) => {
              const position = getPos();
              if (typeof position !== 'number') return false;
              const currentNode = tr.doc.nodeAt(position);
              tr.setNodeMarkup(position, undefined, {
                ...currentNode?.attrs,
                status: next,
                checked: next === 'done',
              });
              return true;
            })
            .run();
        } else if (!editor.isEditable && this.options.onReadOnlyChecked) {
          const ok = this.options.onReadOnlyChecked(node, next === 'done');
          if (!ok) setStatus(current);
          else setStatus(next);
        }
      });

      Object.entries(this.options.HTMLAttributes).forEach(([key, value]) => {
        listItem.setAttribute(key, String(value));
      });
      listItem.append(checkboxWrapper, content);
      checkboxWrapper.append(checkbox);
      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        listItem.setAttribute(key, String(value));
      });

      return {
        dom: listItem,
        contentDOM: content,
        update: (updatedNode) => {
          if (updatedNode.type !== this.type) return false;
          setStatus(taskCheckboxStatusFromAttrs(updatedNode.attrs));
          return true;
        },
      };
    };
  },

  addInputRules() {
    const type = this.type;
    return [
      wrappingInputRule({
        find: haimTaskShortInputRegex,
        type,
        getAttributes: (match) => {
          const status = statusFromMatchChar(match[2]);
          return { status, checked: status === 'done' };
        },
      }),
      wrappingInputRule({
        find: haimTaskMarkdownPrefixInputRegex,
        type,
        getAttributes: (match) => {
          const status = statusFromMatchChar(match[1]);
          return { status, checked: status === 'done' };
        },
      }),
    ];
  },
});

export default HaimTaskItem;

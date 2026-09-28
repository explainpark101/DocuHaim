import {
  TaskItem,
  type TaskItemOptions,
} from '@tiptap/extension-list';
import {
  InputRule,
  mergeAttributes,
  renderNestedMarkdownContent,
} from '@tiptap/core';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import type { EditorState } from '@tiptap/pm/state';
import { canJoin, findWrapping } from '@tiptap/pm/transform';
import {
  advanceTaskCheckboxStatus,
  parseTaskCheckboxKind,
  serializeTaskCheckboxMarkerForKind,
  taskCheckboxKindFromAttrs,
  taskCheckboxStatusFromAttrs,
  taskItemAttrsFromMarker,
  type TaskCheckboxKind,
  type TaskCheckboxStatus,
} from '@/utils/taskCheckboxStatus';

/** Short form: `[ ]` / `[]` / `[~]` / `[x]` + trailing space at line start. */
export const haimTaskShortInputRegex = /^\s*(\[([ xX~]?)\])\s$/;

/**
 * Full markdown prefix: `-[ ]` / `- [ ]` / `*[~]` / `+ [x]` + trailing space.
 * Space between list mark and `[` is optional. Does not match `- ` alone.
 */
export const haimTaskMarkdownPrefixInputRegex =
  /^\s*[-*+]\s*\[([ xX~])\]\s$/;

type TaskItemAttrs = {
  status: TaskCheckboxStatus;
  checked: boolean;
  kind: TaskCheckboxKind;
};

function attrsFromMatchChar(ch: string | undefined): TaskItemAttrs {
  return taskItemAttrsFromMarker(ch === undefined || ch === '' ? ' ' : ch);
}

function readTaskItemAttrs(
  attrs: Record<string, unknown> | null | undefined,
): TaskItemAttrs {
  const status = taskCheckboxStatusFromAttrs(attrs);
  const kind = taskCheckboxKindFromAttrs(attrs);
  return {
    status,
    checked: status === 'done',
    kind: status === 'doing' ? 'status' : kind,
  };
}

/**
 * Turn matched checkbox typing into a task item.
 * - Plain paragraph → wrap in taskList/taskItem (stock wrappingInputRule path).
 * - Inside bullet/ordered listItem → promote that list to taskList (schema forbids mix).
 * Exported for unit tests (TipTap view is unmounted in node).
 */
export function applyHaimTaskCheckboxInputRule(
  state: EditorState,
  range: { from: number; to: number },
  attrs: TaskItemAttrs,
): null | undefined {
  const taskItemType = state.schema.nodes.taskItem;
  const taskListType = state.schema.nodes.taskList;
  if (!taskItemType || !taskListType) return null;

  const $from = state.doc.resolve(range.from);
  let itemDepth = -1;
  let listDepth = -1;
  for (let d = $from.depth; d >= 1; d -= 1) {
    const name = $from.node(d).type.name;
    if (itemDepth < 0 && name === 'listItem') itemDepth = d;
    if (
      listDepth < 0 &&
      (name === 'bulletList' || name === 'orderedList')
    ) {
      listDepth = d;
    }
  }

  const tr = state.tr.delete(range.from, range.to);

  if (itemDepth > 0 && listDepth > 0) {
    const listPos = $from.before(listDepth);
    const itemIndex = $from.index(listDepth);
    const mappedListPos = tr.mapping.map(listPos);
    const listNode = tr.doc.nodeAt(mappedListPos);
    if (!listNode) return null;

    const newItems: ProseMirrorNode[] = [];
    listNode.forEach((child, _offset, index) => {
      const childAttrs: TaskItemAttrs =
        index === itemIndex
          ? attrs
          : child.type.name === 'taskItem'
            ? readTaskItemAttrs(child.attrs)
            : { status: 'todo', checked: false, kind: 'check' };
      newItems.push(taskItemType.create(childAttrs, child.content, child.marks));
    });

    const newList = taskListType.create(listNode.attrs, newItems);
    tr.replaceWith(mappedListPos, mappedListPos + listNode.nodeSize, newList);

    if (
      canJoin(tr.doc, mappedListPos) &&
      tr.doc.resolve(mappedListPos).nodeBefore?.type === taskListType
    ) {
      tr.join(mappedListPos);
    }
    const joinedList = tr.doc.nodeAt(mappedListPos);
    if (joinedList) {
      const afterPos = mappedListPos + joinedList.nodeSize;
      if (
        canJoin(tr.doc, afterPos) &&
        tr.doc.nodeAt(afterPos)?.type === taskListType
      ) {
        tr.join(afterPos);
      }
    }
    return undefined;
  }

  const blockRange = tr.doc.resolve(range.from).blockRange();
  const wrapping =
    blockRange && findWrapping(blockRange, taskItemType, attrs);
  if (!wrapping) return null;
  tr.wrap(blockRange, wrapping);

  const before = tr.doc.resolve(range.from - 1).nodeBefore;
  if (
    before &&
    before.type === taskItemType &&
    canJoin(tr.doc, range.from - 1)
  ) {
    tr.join(range.from - 1);
  }
  return undefined;
}

function applyCheckboxDom(
  checkbox: HTMLInputElement,
  listItem: HTMLElement,
  status: TaskCheckboxStatus,
  kind: TaskCheckboxKind,
): void {
  listItem.dataset.status = status;
  listItem.dataset.kind = kind;
  listItem.dataset.checked = status === 'done' ? 'true' : 'false';
  checkbox.dataset.status = status;
  checkbox.dataset.kind = kind;
  checkbox.className =
    kind === 'status'
      ? 'task-list-item-checkbox task-list-item-checkbox--status'
      : 'task-list-item-checkbox';
  checkbox.checked = status === 'done';
  checkbox.indeterminate = status === 'doing';
  checkbox.setAttribute(
    'aria-checked',
    status === 'doing' ? 'mixed' : status === 'done' ? 'true' : 'false',
  );
  checkbox.setAttribute(
    'aria-label',
    kind === 'status'
      ? status === 'doing'
        ? 'Status task in progress'
        : status === 'done'
          ? 'Status task completed'
          : 'Status task not started'
      : status === 'done'
        ? 'Task completed'
        : 'Task not started',
  );
}

/**
 * Task item with regular (`check`) or status (`status`) checkboxes.
 * Document setting `taskCheckbox` (via storage.preferredKind) chooses click cycle.
 */

type HaimTaskItemStorage = {
  preferredKind: TaskCheckboxKind;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    taskItem: {
      setHaimTaskCheckboxPreferredKind: (kind: TaskCheckboxKind) => ReturnType;
    };
  }

  interface Storage {
    taskItem: HaimTaskItemStorage;
  }
}

export const HaimTaskItem = TaskItem.extend<TaskItemOptions, HaimTaskItemStorage>({
  addStorage() {
    return {
      preferredKind: 'check' satisfies TaskCheckboxKind,
    };
  },

  addCommands() {
    return {
      setHaimTaskCheckboxPreferredKind:
        (kind: TaskCheckboxKind) =>
        () => {
          this.storage.preferredKind = kind === 'status' ? 'status' : 'check';
          return true;
        },
    };
  },

  addAttributes() {
    return {
      kind: {
        default: 'check' satisfies TaskCheckboxKind,
        keepOnSplit: false,
        parseHTML: (element) => {
          const raw = element.getAttribute('data-kind');
          const statusRaw = element.getAttribute('data-status');
          const status =
            statusRaw === 'todo' || statusRaw === 'doing' || statusRaw === 'done'
              ? statusRaw
              : undefined;
          return parseTaskCheckboxKind(raw, status);
        },
        renderHTML: (attributes) => ({
          'data-kind': taskCheckboxKindFromAttrs(attributes),
        }),
      },
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
    const kind = taskCheckboxKindFromAttrs(node.attrs);
    return [
      'li',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': this.name,
        'data-status': status,
        'data-kind': kind,
        'data-checked': status === 'done' ? 'true' : 'false',
      }),
      [
        'label',
        [
          'input',
          {
            type: 'checkbox',
            class:
              kind === 'status'
                ? 'task-list-item-checkbox task-list-item-checkbox--status'
                : 'task-list-item-checkbox',
            checked: status === 'done' ? 'checked' : null,
            'data-status': status,
            'data-kind': kind,
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
    const kind: TaskCheckboxKind =
      token.kind === 'status' || token.kind === 'check'
        ? parseTaskCheckboxKind(token.kind, status)
        : status === 'doing'
          ? 'status'
          : 'check';
    return h.createNode(
      'taskItem',
      { status, checked: status === 'done', kind },
      content,
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderMarkdown: (node: any, h: any) => {
    const status = taskCheckboxStatusFromAttrs(node?.attrs);
    const kind = taskCheckboxKindFromAttrs(node?.attrs);
    const marker = serializeTaskCheckboxMarkerForKind(status, kind);
    const prefix = `- [${marker}] `;
    return renderNestedMarkdownContent(node, h, prefix);
  },

  addNodeView() {
    return ({ node, HTMLAttributes, getPos, editor }) => {
      const listItem = document.createElement('li');
      const checkboxWrapper = document.createElement('label');
      const checkbox = document.createElement('input');
      const content = document.createElement('div');

      let currentNode: ProseMirrorNode = node;

      checkboxWrapper.contentEditable = 'false';
      checkbox.type = 'checkbox';

      const syncDom = (n: ProseMirrorNode) => {
        const attrs = readTaskItemAttrs(n.attrs);
        applyCheckboxDom(checkbox, listItem, attrs.status, attrs.kind);
      };

      syncDom(node);

      const commitAttrs = (next: TaskItemAttrs) => {
        if (typeof getPos !== 'function') return;
        const position = getPos();
        if (typeof position !== 'number') return;
        const { state, dispatch } = editor.view;
        const at = state.doc.nodeAt(position);
        if (!at || at.type !== this.type) return;
        dispatch(
          state.tr.setNodeMarkup(position, undefined, {
            ...at.attrs,
            status: next.status,
            checked: next.checked,
            kind: next.kind,
          }),
        );
      };

      const onToggle = (event: Event) => {
        event.preventDefault();
        event.stopPropagation();

        const attrs = readTaskItemAttrs(currentNode.attrs);
        const preferred: TaskCheckboxKind =
          editor.storage.taskItem?.preferredKind === 'status'
            ? 'status'
            : 'check';

        if (!editor.isEditable && !this.options.onReadOnlyChecked) {
          syncDom(currentNode);
          return;
        }

        const nextStatus = advanceTaskCheckboxStatus(attrs.status, preferred);
        const next: TaskItemAttrs = {
          status: nextStatus,
          checked: nextStatus === 'done',
          kind: preferred,
        };

        if (editor.isEditable) {
          // Optimistic DOM so the click feels instant before PM update.
          applyCheckboxDom(checkbox, listItem, next.status, next.kind);
          commitAttrs(next);
          return;
        }

        if (this.options.onReadOnlyChecked) {
          const ok = this.options.onReadOnlyChecked(currentNode, next.checked);
          if (!ok) syncDom(currentNode);
          else applyCheckboxDom(checkbox, listItem, next.status, next.kind);
        }
      };

      // pointerdown: run before ProseMirror selection handling; ignoreMutation
      // prevents checkbox attr churn from recreating the NodeView.
      checkboxWrapper.addEventListener('pointerdown', (event) => {
        if (event.button !== 0) return;
        onToggle(event);
      });
      checkbox.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
      checkbox.addEventListener('change', (event) => {
        event.preventDefault();
        syncDom(currentNode);
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
        stopEvent: (event) => {
          const target = event.target as Node | null;
          return Boolean(target && checkboxWrapper.contains(target));
        },
        ignoreMutation: (mutation) =>
          mutation.type === 'selection' ||
          checkboxWrapper.contains(mutation.target),
        update: (updatedNode) => {
          if (updatedNode.type !== this.type) return false;
          currentNode = updatedNode;
          syncDom(updatedNode);
          return true;
        },
      };
    };
  },

  addInputRules() {
    return [
      new InputRule({
        find: haimTaskShortInputRegex,
        handler: ({ state, range, match }) => {
          const preferred: TaskCheckboxKind =
            this.editor.storage.taskItem?.preferredKind === 'status'
              ? 'status'
              : 'check';
          const fromMarker = attrsFromMatchChar(match[2]);
          return applyHaimTaskCheckboxInputRule(state, range, {
            status: fromMarker.status,
            checked: fromMarker.checked,
            kind: preferred,
          });
        },
      }),
      new InputRule({
        find: haimTaskMarkdownPrefixInputRegex,
        handler: ({ state, range, match }) => {
          const preferred: TaskCheckboxKind =
            this.editor.storage.taskItem?.preferredKind === 'status'
              ? 'status'
              : 'check';
          const fromMarker = attrsFromMatchChar(match[1]);
          return applyHaimTaskCheckboxInputRule(state, range, {
            status: fromMarker.status,
            checked: fromMarker.checked,
            kind: preferred,
          });
        },
      }),
    ];
  },
});

export default HaimTaskItem;

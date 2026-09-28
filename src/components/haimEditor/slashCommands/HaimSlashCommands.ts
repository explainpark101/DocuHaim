import { createElement, type RefObject } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { Extension } from '@tiptap/core';
import { PluginKey, type EditorState } from '@tiptap/pm/state';
import Suggestion, {
  exitSuggestion,
  type SuggestionKeyDownProps,
  type SuggestionProps,
} from '@tiptap/suggestion';
import {
  filterHaimSlashCommands,
  HAIM_SLASH_COMMANDS,
  type HaimSlashAppActions,
  type HaimSlashCommandItem,
} from '@/components/haimEditor/slashCommands/haimSlashCommandItems';
import HaimSlashCommandList, {
  type HaimSlashCommandListHandle,
} from '@/components/haimEditor/slashCommands/HaimSlashCommandList';

export const haimSlashCommandsPluginKey = new PluginKey('haimSlashCommands');

export type HaimSlashCommandsStorage = {
  getAppActions: () => HaimSlashAppActions | null;
};

declare module '@tiptap/core' {
  interface Storage {
    haimSlashCommands: HaimSlashCommandsStorage;
  }
}

function isInCodeContext(state: EditorState): boolean {
  const { $from } = state.selection;
  for (let d = $from.depth; d > 0; d -= 1) {
    const name = $from.node(d).type.name;
    if (name === 'codeBlock' || name === 'rawMarkdownBlock') return true;
  }
  return false;
}

type SlashMenuRuntime = {
  el: HTMLElement;
  root: Root;
  listRef: RefObject<HaimSlashCommandListHandle | null>;
  unmountFloating: (() => void) | null;
};

function renderSlashMenu(
  runtime: SlashMenuRuntime,
  props: SuggestionProps<HaimSlashCommandItem>,
): void {
  flushSync(() => {
    runtime.root.render(
      createElement(HaimSlashCommandList, {
        ref: (handle: HaimSlashCommandListHandle | null) => {
          runtime.listRef.current = handle;
        },
        items: props.items,
        command: (item: HaimSlashCommandItem) => {
          props.command(item);
        },
      }),
    );
  });
}

/**
 * `/` slash command palette for Haim WYSIWYG — toolbar-parity actions.
 *
 * Renders with React `createRoot` (not TipTap ReactRenderer portals) so the
 * floating menu is not empty when EditorContent portal wiring lags, and uses
 * Floating UI `fixed` strategy so scroll containers do not hide it.
 */
export const HaimSlashCommands = Extension.create({
  name: 'haimSlashCommands',

  addStorage() {
    return {
      getAppActions: () => null,
    } satisfies HaimSlashCommandsStorage;
  },

  addProseMirrorPlugins() {
    return [
      Suggestion<HaimSlashCommandItem, HaimSlashCommandItem>({
        pluginKey: haimSlashCommandsPluginKey,
        editor: this.editor,
        char: '/',
        allowSpaces: true,
        startOfLine: false,
        allowedPrefixes: [' '],
        decorationClass: 'haim-slash-decoration',
        placement: 'bottom-start',
        offset: { mainAxis: 6, crossAxis: 0 },
        dismissOnOutsideClick: true,
        floatingUi: { strategy: 'fixed' },
        // Show full catalog immediately; async filter replaces on query.
        initialItems: [...HAIM_SLASH_COMMANDS],
        allow: ({ state, editor }) =>
          editor.isEditable && !isInCodeContext(state),
        items: ({ query }) => filterHaimSlashCommands(query),
        command: ({ editor, range, props: item }) => {
          editor.chain().focus().deleteRange(range).run();
          const app =
            editor.storage.haimSlashCommands?.getAppActions?.() ?? null;
          item.run({ editor, app });
        },
        render: () => {
          let runtime: SlashMenuRuntime | null = null;

          return {
            onStart: (props) => {
              const el = document.createElement('div');
              el.className = 'haim-slash-menu-root';
              el.style.zIndex = '100010';
              const listRef: RefObject<HaimSlashCommandListHandle | null> = {
                current: null,
              };
              const root = createRoot(el);
              runtime = {
                el,
                root,
                listRef,
                unmountFloating: null,
              };
              renderSlashMenu(runtime, props);
              // Mount after first paint so Floating UI measures non-empty content.
              runtime.unmountFloating = props.mount(el);
            },
            onUpdate: (props) => {
              if (!runtime) return;
              renderSlashMenu(runtime, props);
            },
            onKeyDown: (props: SuggestionKeyDownProps) => {
              if (props.event.key === 'Escape') {
                exitSuggestion(props.view, haimSlashCommandsPluginKey);
                return true;
              }
              return runtime?.listRef.current?.onKeyDown(props) ?? false;
            },
            onExit: () => {
              const current = runtime;
              runtime = null;
              current?.unmountFloating?.();
              if (current?.root) {
                queueMicrotask(() => {
                  current.root.unmount();
                });
              }
            },
          };
        },
      }),
    ];
  },
});

export default HaimSlashCommands;

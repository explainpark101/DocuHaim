import Link from '@tiptap/extension-link';
import { getAttributes } from '@tiptap/core';
import type { Editor } from '@tiptap/core';
import type { MarkType } from '@tiptap/pm/model';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { loadHaimLinkOpenOnClick } from '@/utils/haimLinkOpenSettings';

function resolveAnchor(
  editor: Editor,
  event: MouseEvent,
): HTMLAnchorElement | null {
  let link: HTMLAnchorElement | null = null;

  if (event.target instanceof HTMLAnchorElement) {
    link = event.target;
  } else {
    const target = event.target as HTMLElement | null;
    if (!target) return null;
    link = target.closest<HTMLAnchorElement>('a');
  }

  if (!link) return null;
  if (!editor.view.dom.contains(link)) return null;
  return link;
}

/**
 * Live click policy for Haim links (reads settings on each click).
 * TipTap stock openOnClick is kept false so the option is not baked into the plugin.
 */
function haimLinkClickPlugin(editor: Editor, type: MarkType): Plugin {
  return new Plugin({
    key: new PluginKey('haimLinkClick'),
    props: {
      handleClick: (view, _pos, event) => {
        if (event.button !== 0) return false;
        if (!view.editable) return false;

        const link = resolveAnchor(editor, event);
        if (!link) return false;

        const openOnClick = loadHaimLinkOpenOnClick();
        const mod = event.metaKey || event.ctrlKey;

        if (!openOnClick && !mod) return false;
        if (openOnClick && mod) {
          // Allow native mod+click (new tab) without double-open.
          return false;
        }

        const attrs = getAttributes(view.state, type.name);
        const href = (link.href || attrs.href || '').trim();
        if (!href) return false;

        const target =
          link.target || (attrs.target as string | undefined) || '_blank';

        event.preventDefault();
        window.open(href, target);
        return true;
      },
    },
  });
}

/**
 * TipTap Link with settings-aware open (click vs Ctrl/Cmd+click).
 */
export const HaimLink = Link.extend({
  addProseMirrorPlugins() {
    const parent = this.parent?.() ?? [];
    return [...parent, haimLinkClickPlugin(this.editor, this.type)];
  },
}).configure({
  openOnClick: false,
  autolink: true,
  HTMLAttributes: {
    rel: 'noopener noreferrer',
    target: '_blank',
  },
});

import Link from '@tiptap/extension-link';
import { getAttributes } from '@tiptap/core';
import type { Editor } from '@tiptap/core';
import type { MarkType } from '@tiptap/pm/model';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import { loadHaimLinkOpenOnClick } from '@/utils/haimLinkOpenSettings';

/** Applied to the ProseMirror root while Ctrl/Cmd is held (CSS cursor:pointer on links). */
export const HAIM_MOD_HELD_CLASS = 'haim-mod-held';

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

/** Same browsing-context behavior as clicking `<a target="_blank" rel="noopener noreferrer">`. */
function openHrefLikeAnchor(href: string, link: HTMLAnchorElement): void {
  const rawTarget = (link.getAttribute('target') || link.target || '_blank').trim();
  const target = !rawTarget || rawTarget === '_self' ? '_blank' : rawTarget;
  window.open(href, target, 'noopener,noreferrer');
}

/**
 * Track Ctrl/Cmd so CSS can show pointer over links while the mod key is held.
 */
function haimLinkModCursorPlugin(): Plugin {
  return new Plugin({
    key: new PluginKey('haimLinkModCursor'),
    view(view) {
      const setHeld = (held: boolean) => {
        view.dom.classList.toggle(HAIM_MOD_HELD_CLASS, held);
      };

      const syncFromEvent = (event: KeyboardEvent | MouseEvent) => {
        setHeld(Boolean(event.ctrlKey || event.metaKey));
      };

      const onKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === 'Control' ||
          event.key === 'Meta' ||
          event.ctrlKey ||
          event.metaKey
        ) {
          setHeld(true);
        }
      };

      const onKeyUp = (event: KeyboardEvent) => {
        syncFromEvent(event);
      };

      const onBlur = () => setHeld(false);

      const onMouseMove = (event: MouseEvent) => {
        syncFromEvent(event);
      };

      window.addEventListener('keydown', onKeyDown, true);
      window.addEventListener('keyup', onKeyUp, true);
      window.addEventListener('blur', onBlur);
      view.dom.addEventListener('mousemove', onMouseMove);

      return {
        destroy() {
          window.removeEventListener('keydown', onKeyDown, true);
          window.removeEventListener('keyup', onKeyUp, true);
          window.removeEventListener('blur', onBlur);
          view.dom.removeEventListener('mousemove', onMouseMove);
          view.dom.classList.remove(HAIM_MOD_HELD_CLASS);
        },
      };
    },
  });
}

function tryOpenLinkFromEvent(
  editor: Editor,
  type: MarkType,
  view: EditorView,
  event: MouseEvent,
): boolean {
  if (event.button !== 0) return false;
  if (!view.editable) return false;

  const link = resolveAnchor(editor, event);
  if (!link) return false;

  const openOnClick = loadHaimLinkOpenOnClick();
  const mod = event.metaKey || event.ctrlKey;

  // Mod+click always opens; plain click only when the setting allows.
  if (!mod && !openOnClick) return false;

  const attrs = getAttributes(view.state, type.name);
  const href = (link.href || attrs.href || '').trim();
  if (!href) return false;

  event.preventDefault();
  openHrefLikeAnchor(href, link);
  return true;
}

/**
 * Live click policy for Haim links (reads settings on each click).
 * TipTap stock openOnClick stays false; we own open behavior here.
 */
function haimLinkClickPlugin(editor: Editor, type: MarkType): Plugin {
  return new Plugin({
    key: new PluginKey('haimLinkClick'),
    props: {
      // Prefer DOM click so Ctrl/Cmd modifiers are always present on the event.
      handleDOMEvents: {
        click: (view, event) =>
          tryOpenLinkFromEvent(editor, type, view, event),
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
    return [
      ...parent,
      haimLinkModCursorPlugin(),
      haimLinkClickPlugin(this.editor, this.type),
    ];
  },
}).configure({
  openOnClick: false,
  autolink: true,
  HTMLAttributes: {
    rel: 'noopener noreferrer',
    target: '_blank',
  },
});

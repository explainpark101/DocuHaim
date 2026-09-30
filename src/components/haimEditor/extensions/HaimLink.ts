import Link from '@tiptap/extension-link';
import { getAttributes, mergeAttributes } from '@tiptap/core';
import type { Editor } from '@tiptap/core';
import type { MarkType } from '@tiptap/pm/model';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import { isDocuhaimHref, parseDocuhaimHref } from '@/utils/docuhaimLink';
import { loadHaimLinkOpenOnClick } from '@/utils/haimLinkOpenSettings';
import { openHaimLinkHref } from '@/utils/openHaimLinkHref';
import { openHaimViewPath } from '@/utils/haimOpenViewPath';

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

/** Prefer TipTap mark attrs — DOM `link.href` may rewrite custom schemes. */
function resolveHref(view: EditorView, type: MarkType, link: HTMLAnchorElement): string {
  const attrs = getAttributes(view.state, type.name) as { href?: string };
  const fromAttrs = String(attrs.href || '').trim();
  if (fromAttrs) return fromAttrs;
  return String(link.getAttribute('href') || link.href || '').trim();
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

  const link = resolveAnchor(editor, event);
  if (!link) return false;

  const href = resolveHref(view, type, link);
  if (!href) return false;

  const docuhaimPath = parseDocuhaimHref(href);
  const openOnClick = loadHaimLinkOpenOnClick();
  const mod = event.metaKey || event.ctrlKey;

  // Editable: always prevent browser navigation; open via setting, Mod+click, or hover 「열기」.
  if (view.editable) {
    event.preventDefault();
    if (!mod && !openOnClick) return true;

    if (docuhaimPath) {
      event.stopPropagation();
      openHaimViewPath(docuhaimPath);
      return true;
    }

    const rawTarget = (link.getAttribute('target') || link.target || '_blank').trim();
    openHaimLinkHref(href, { target: rawTarget });
    return true;
  }

  // Preview / read-only: docuhaim opens in-app; leave http(s) to the host.
  if (docuhaimPath) {
    event.preventDefault();
    event.stopPropagation();
    openHaimViewPath(docuhaimPath);
    return true;
  }

  return false;
}

/**
 * Live click policy for Haim links.
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
 * TipTap Link: open via plain click (setting), Mod+click, or hover-card 「열기」.
 */
export const HaimLink = Link.extend({
  renderHTML({ HTMLAttributes }) {
    const href = String(HTMLAttributes.href || '');
    const docuhaim = isDocuhaimHref(href);
    return [
      'a',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: docuhaim ? 'haim-docuhaim-link' : null,
      }),
      0,
    ];
  },
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
  protocols: ['docuhaim'],
  HTMLAttributes: {
    rel: 'noopener noreferrer',
    target: '_blank',
  },
});

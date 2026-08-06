import {
  codeFolding,
  foldEffect,
  foldGutter,
  foldService,
  foldedRanges,
  unfoldEffect,
} from '@codemirror/language';
import {
  Compartment,
  EditorState,
  Facet,
  type Extension,
  type Text,
} from '@codemirror/state';
import { EditorView, ViewPlugin, lineNumbers, type ViewUpdate } from '@codemirror/view';
import { animate } from 'motion';
import { findNoteCoverCommentRange } from '@/utils/noteCover/parse';
import {
  getNoteCoverFoldCollapsed,
  saveNoteCoverFoldCollapsed,
} from '@/utils/noteCover/noteCoverFoldStateDb';

function findNoteCoverDocRange(doc: Text): { from: number; to: number } | null {
  const prefixLen = Math.min(doc.length, 2_000_000);
  return findNoteCoverCommentRange(doc.sliceString(0, prefixLen));
}

/** Range to hide when folding cover to a single visible line (end of first → end of comment). */
export function getNoteCoverFoldRange(
  state: EditorState,
): { from: number; to: number } | null {
  const cover = findNoteCoverDocRange(state.doc);
  if (!cover) return null;
  const firstLine = state.doc.lineAt(cover.from);
  if (firstLine.to >= cover.to) return null;
  return { from: firstLine.to, to: cover.to };
}

function isCoverRangeFolded(
  state: EditorState,
  fold: { from: number; to: number },
): boolean {
  let folded = false;
  foldedRanges(state).between(fold.from, fold.to, () => {
    folded = true;
  });
  return folded;
}

export const noteCoverFoldDocKeyFacet = Facet.define<string | null, string | null>({
  combine: (values) => values[values.length - 1] ?? null,
});

export const noteCoverFoldDocKeyCompartment = new Compartment();

export function noteCoverFoldDocKeyExtension(key: string | null): Extension {
  return noteCoverFoldDocKeyCompartment.of(noteCoverFoldDocKeyFacet.of(key));
}

export function setNoteCoverFoldDocKey(
  view: EditorView,
  key: string | null,
): void {
  view.dispatch({
    effects: noteCoverFoldDocKeyCompartment.reconfigure(
      noteCoverFoldDocKeyFacet.of(key),
    ),
  });
}

function createChevronMarker(open: boolean): HTMLElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'cm-note-cover-fold-chevron cursor-pointer';
  button.setAttribute('aria-label', open ? '표지 접기' : '표지 펼치기');
  button.title = open ? '표지 접기' : '표지 펼치기';
  button.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const svg = button.querySelector('svg');
  if (svg) {
    svg.style.transform = open ? 'rotate(0deg)' : 'rotate(-90deg)';
    svg.style.transformOrigin = '50% 50%';
  }
  return button;
}

let foldAnimToken = 0;

function buildFoldOverlay(
  view: EditorView,
  fold: { from: number; to: number },
): HTMLElement | null {
  const start = view.coordsAtPos(fold.from);
  const end = view.coordsAtPos(fold.to);
  if (!start || !end) return null;

  const contentRect = view.contentDOM.getBoundingClientRect();
  const top = Math.min(start.top, end.top);
  const bottom = Math.max(start.bottom, end.bottom);
  const height = Math.max(0, bottom - top);
  if (height < 2) return null;

  const overlay = document.createElement('div');
  overlay.className = 'cm-note-cover-fold-motion';
  overlay.style.cssText = [
    'position:fixed',
    `top:${top}px`,
    `left:${contentRect.left}px`,
    `width:${Math.max(0, contentRect.width)}px`,
    `height:${height}px`,
    'overflow:hidden',
    'pointer-events:none',
    'z-index:6',
    'background:var(--md-bk-color, var(--cm-background, #fff))',
  ].join(';');
  document.body.appendChild(overlay);
  return overlay;
}

async function animateCollapse(view: EditorView, fold: { from: number; to: number }): Promise<void> {
  const token = ++foldAnimToken;
  const overlay = buildFoldOverlay(view, fold);
  if (!overlay) {
    view.dispatch({ effects: foldEffect.of(fold) });
    return;
  }
  try {
    await animate(overlay, { height: 0, opacity: 0.35 }, { duration: 0.22, ease: 'easeInOut' });
  } catch {
    /* ignore */
  }
  if (token === foldAnimToken && getNoteCoverFoldRange(view.state)) {
    view.dispatch({ effects: foldEffect.of(fold) });
  }
  overlay.remove();
}

async function animateExpand(view: EditorView, fold: { from: number; to: number }): Promise<void> {
  const token = ++foldAnimToken;
  view.dispatch({ effects: unfoldEffect.of(fold) });
  const next = getNoteCoverFoldRange(view.state);
  if (!next) return;
  const overlay = buildFoldOverlay(view, next);
  if (!overlay) return;
  try {
    await animate(overlay, { height: 0, opacity: 0 }, { duration: 0.22, ease: 'easeInOut' });
  } catch {
    /* ignore */
  }
  if (token === foldAnimToken) {
    overlay.remove();
  } else {
    overlay.remove();
  }
}

function animateChevron(marker: Element | null, open: boolean): void {
  const svg = marker?.querySelector?.('svg');
  if (!(svg instanceof SVGElement)) return;
  void animate(
    svg,
    { transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' },
    { duration: 0.18, ease: 'easeInOut' },
  );
}

export function toggleNoteCoverFold(view: EditorView): boolean {
  const fold = getNoteCoverFoldRange(view.state);
  if (!fold) return false;
  const folded = isCoverRangeFolded(view.state, fold);
  const collapsing = !folded;

  const gutter = view.dom.querySelector('.cm-note-cover-fold-chevron');
  animateChevron(gutter, !collapsing);

  void (async () => {
    if (collapsing) {
      await animateCollapse(view, fold);
    } else {
      await animateExpand(view, fold);
    }

    const key = view.state.facet(noteCoverFoldDocKeyFacet);
    if (key) {
      void saveNoteCoverFoldCollapsed(key, collapsing);
    }
  })();

  return true;
}

function applyFoldState(view: EditorView, collapsed: boolean): void {
  const fold = getNoteCoverFoldRange(view.state);
  if (!fold) return;
  const folded = isCoverRangeFolded(view.state, fold);
  if (collapsed && !folded) {
    view.dispatch({ effects: foldEffect.of(fold) });
  } else if (!collapsed && folded) {
    view.dispatch({ effects: unfoldEffect.of(fold) });
  }
}

/**
 * Restore persisted fold when the document key changes or cover first appears.
 */
function createNoteCoverFoldPersistPlugin(): Extension {
  return ViewPlugin.fromClass(
    class {
      private lastKey: string | null = null;
      private hadCover = false;
      private loadGen = 0;

      constructor(private readonly view: EditorView) {
        this.syncKeyAndMaybeRestore(true);
      }

      update(update: ViewUpdate): void {
        const keyChanged =
          update.state.facet(noteCoverFoldDocKeyFacet) !== this.lastKey;
        const cover = findNoteCoverDocRange(update.state.doc);
        const hasCover = Boolean(cover);
        const coverAppeared = hasCover && !this.hadCover;
        this.hadCover = hasCover;
        if (keyChanged || coverAppeared) {
          this.syncKeyAndMaybeRestore(false);
        }
      }

      private syncKeyAndMaybeRestore(_initial: boolean): void {
        const key = this.view.state.facet(noteCoverFoldDocKeyFacet);
        this.lastKey = key;
        const cover = findNoteCoverDocRange(this.view.state.doc);
        this.hadCover = Boolean(cover);
        if (!key || !cover) return;
        const gen = ++this.loadGen;
        void getNoteCoverFoldCollapsed(key).then((collapsed) => {
          if (gen !== this.loadGen) return;
          if (collapsed == null) return;
          applyFoldState(this.view, collapsed);
        });
      }
    },
  );
}

/**
 * Code folding + fold gutter chevron (left of line numbers) for note-cover JSON.
 */
export function createNoteCoverFoldExtension(): Extension {
  return [
    noteCoverFoldDocKeyExtension(null),
    codeFolding({
      placeholderText: '…표지…',
    }),
    foldService.of((state, lineStart) => {
      const cover = findNoteCoverDocRange(state.doc);
      if (!cover) return null;
      const firstLine = state.doc.lineAt(cover.from);
      if (lineStart !== firstLine.from) return null;
      return getNoteCoverFoldRange(state);
    }),
    // foldGutter must be registered before lineNumbers so the chevron sits to the left.
    foldGutter({
      markerDOM: (open) => createChevronMarker(open),
      foldingChanged: (update) =>
        update.docChanged
        || update.transactions.some((tr) =>
          tr.effects.some((e) => e.is(foldEffect) || e.is(unfoldEffect)),
        ),
      domEventHandlers: {
        mousedown(view, line, event) {
          if (!(event instanceof MouseEvent) || event.button !== 0) return false;
          const cover = findNoteCoverDocRange(view.state.doc);
          if (!cover) return false;
          const firstLine = view.state.doc.lineAt(cover.from);
          if (line.from !== firstLine.from) return false;
          if (!toggleNoteCoverFold(view)) return false;
          event.preventDefault();
          event.stopPropagation();
          return true;
        },
      },
    }),
    lineNumbers({
      domEventHandlers: {
        mousedown(view, line, event) {
          if (!(event instanceof MouseEvent) || event.button !== 0) return false;
          const cover = findNoteCoverDocRange(view.state.doc);
          if (!cover) return false;
          if (line.from < cover.from || line.from >= cover.to) return false;
          if (!toggleNoteCoverFold(view)) return false;
          event.preventDefault();
          return true;
        },
      },
    }),
    createNoteCoverFoldPersistPlugin(),
    EditorView.theme({
      '.cm-foldGutter': {
        width: '1.1rem',
      },
      '.cm-foldGutter .cm-gutterElement': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
      },
      '.cm-note-cover-fold-chevron': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1rem',
        height: '1rem',
        padding: '0',
        margin: '0',
        border: 'none',
        background: 'transparent',
        color: 'inherit',
        opacity: '0.65',
        cursor: 'pointer',
        lineHeight: '1',
      },
      '.cm-note-cover-fold-chevron:hover': {
        opacity: '1',
      },
      '.cm-note-cover-fold-chevron svg': {
        display: 'block',
      },
    }),
  ];
}

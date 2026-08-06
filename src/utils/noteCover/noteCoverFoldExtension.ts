import {
  codeFolding,
  foldEffect,
  foldService,
  foldable,
  foldedRanges,
  syntaxTree,
  unfoldEffect,
} from '@codemirror/language';
import {
  Compartment,
  EditorState,
  Facet,
  type Extension,
  type Text,
} from '@codemirror/state';
import {
  EditorView,
  GutterMarker,
  ViewPlugin,
  gutter,
  lineNumbers,
  type ViewUpdate,
} from '@codemirror/view';
import { animate } from 'motion';
import { findNoteCoverCommentRange } from '@/utils/noteCover/parse';
import {
  getNoteCoverFoldCollapsed,
  saveNoteCoverFoldCollapsed,
} from '@/utils/noteCover/noteCoverFoldStateDb';

type FoldKind = 'cover' | 'heading';

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

function isSameFoldRange(
  a: { from: number; to: number },
  b: { from: number; to: number },
): boolean {
  return a.from === b.from && a.to === b.to;
}

function isMarkdownHeadingLine(state: EditorState, lineFrom: number): boolean {
  const line = state.doc.lineAt(lineFrom);
  let found = false;
  syntaxTree(state).iterate({
    from: line.from,
    to: Math.min(line.to, line.from + 1),
    enter(node) {
      const name = node.type.name;
      if (name.startsWith('ATXHeading') || name.startsWith('SetextHeading')) {
        found = true;
        return false;
      }
      return undefined;
    },
  });
  return found;
}

/**
 * Only the leading note-cover block and markdown heading sections are foldable in the gutter.
 * Code fences / lists / other language folds are ignored.
 */
function getAllowedFoldAtLine(
  state: EditorState,
  lineFrom: number,
): { from: number; to: number; kind: FoldKind } | null {
  const coverDoc = findNoteCoverDocRange(state.doc);
  if (coverDoc) {
    const firstLine = state.doc.lineAt(coverDoc.from);
    if (lineFrom === firstLine.from) {
      const coverFold = getNoteCoverFoldRange(state);
      if (coverFold) return { ...coverFold, kind: 'cover' };
    }
    // Inside the cover JSON comment — never treat as heading folds.
    if (lineFrom >= coverDoc.from && lineFrom < coverDoc.to) {
      return null;
    }
  }

  if (!isMarkdownHeadingLine(state, lineFrom)) return null;
  const line = state.doc.lineAt(lineFrom);
  const range = foldable(state, line.from, line.to);
  if (!range || range.from >= range.to) return null;
  return { ...range, kind: 'heading' };
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

function createChevronMarker(open: boolean, kind: FoldKind): HTMLElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${kind}`;
  const label =
    kind === 'cover'
      ? (open ? '표지 접기' : '표지 펼치기')
      : (open ? '헤딩 접기' : '헤딩 펼치기');
  button.setAttribute('aria-label', label);
  button.title = label;
  button.dataset.foldKind = kind;
  button.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const svg = button.querySelector('svg');
  if (svg) {
    svg.style.transform = open ? 'rotate(0deg)' : 'rotate(-90deg)';
    svg.style.transformOrigin = '50% 50%';
  }
  return button;
}

class AllowedFoldMarker extends GutterMarker {
  constructor(
    readonly open: boolean,
    readonly kind: FoldKind,
  ) {
    super();
  }

  eq(other: AllowedFoldMarker): boolean {
    return this.open === other.open && this.kind === other.kind;
  }

  toDOM(): HTMLElement {
    return createChevronMarker(this.open, this.kind);
  }
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
  overlay.remove();
  void token;
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

function toggleHeadingFold(
  view: EditorView,
  fold: { from: number; to: number },
): boolean {
  const folded = isCoverRangeFolded(view.state, fold);
  view.dispatch({
    effects: folded ? unfoldEffect.of(fold) : foldEffect.of(fold),
  });
  return true;
}

export function toggleNoteCoverFold(view: EditorView): boolean {
  const fold = getNoteCoverFoldRange(view.state);
  if (!fold) return false;
  const folded = isCoverRangeFolded(view.state, fold);
  const collapsing = !folded;

  const gutterEl = view.dom.querySelector(
    '.cm-note-cover-fold-chevron[data-fold-kind="cover"]',
  );
  animateChevron(gutterEl, !collapsing);

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
        this.syncKeyAndMaybeRestore();
      }

      update(update: ViewUpdate): void {
        const keyChanged =
          update.state.facet(noteCoverFoldDocKeyFacet) !== this.lastKey;
        const cover = findNoteCoverDocRange(update.state.doc);
        const hasCover = Boolean(cover);
        const coverAppeared = hasCover && !this.hadCover;
        this.hadCover = hasCover;
        if (keyChanged || coverAppeared) {
          this.syncKeyAndMaybeRestore();
        }
      }

      private syncKeyAndMaybeRestore(): void {
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

function foldEffectsInUpdate(update: ViewUpdate): boolean {
  return update.transactions.some((tr) =>
    tr.effects.some((e) => e.is(foldEffect) || e.is(unfoldEffect)),
  );
}

/**
 * Fold gutter limited to leading note-cover + markdown heading sections only.
 */
export function createNoteCoverFoldExtension(): Extension {
  return [
    noteCoverFoldDocKeyExtension(null),
    codeFolding({
      preparePlaceholder(state, range) {
        const cover = getNoteCoverFoldRange(state);
        if (cover && isSameFoldRange(cover, range)) return 'cover';
        return 'heading';
      },
      placeholderDOM(_view, onclick, prepared) {
        const span = document.createElement('span');
        span.className = 'cm-foldPlaceholder';
        span.textContent = prepared === 'cover' ? '…표지…' : '…';
        span.setAttribute('aria-hidden', 'true');
        span.onclick = onclick;
        return span;
      },
    }),
    foldService.of((state, lineStart) => {
      const cover = findNoteCoverDocRange(state.doc);
      if (!cover) return null;
      const firstLine = state.doc.lineAt(cover.from);
      if (lineStart !== firstLine.from) return null;
      return getNoteCoverFoldRange(state);
    }),
    // Custom gutter before lineNumbers — only cover + heading chevrons.
    gutter({
      class: 'cm-note-cover-fold-gutter',
      lineMarker(view, line) {
        const allowed = getAllowedFoldAtLine(view.state, line.from);
        if (!allowed) return null;
        const open = !isCoverRangeFolded(view.state, allowed);
        return new AllowedFoldMarker(open, allowed.kind);
      },
      lineMarkerChange: (update) =>
        update.docChanged || update.viewportChanged || foldEffectsInUpdate(update),
      initialSpacer: () => new AllowedFoldMarker(true, 'heading'),
      domEventHandlers: {
        mousedown(view, line, event) {
          if (!(event instanceof MouseEvent) || event.button !== 0) return false;
          const allowed = getAllowedFoldAtLine(view.state, line.from);
          if (!allowed) return false;
          if (allowed.kind === 'cover') {
            if (!toggleNoteCoverFold(view)) return false;
          } else {
            const lineMarker = (event.target instanceof Element)
              ? event.target.closest('.cm-note-cover-fold-chevron')
              : null;
            animateChevron(lineMarker, isCoverRangeFolded(view.state, allowed));
            toggleHeadingFold(view, allowed);
          }
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
          if (cover && line.from >= cover.from && line.from < cover.to) {
            if (!toggleNoteCoverFold(view)) return false;
            event.preventDefault();
            return true;
          }
          const allowed = getAllowedFoldAtLine(view.state, line.from);
          if (!allowed || allowed.kind !== 'heading') return false;
          toggleHeadingFold(view, allowed);
          event.preventDefault();
          return true;
        },
      },
    }),
    createNoteCoverFoldPersistPlugin(),
    EditorView.theme({
      '.cm-note-cover-fold-gutter': {
        width: '1.1rem',
      },
      '.cm-note-cover-fold-gutter .cm-gutterElement': {
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

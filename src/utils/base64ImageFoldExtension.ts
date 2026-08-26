import { Compartment, StateEffect, StateField } from '@codemirror/state';
import { Decoration, EditorView, WidgetType } from '@codemirror/view';
import type { DecorationSet } from '@codemirror/view';

import type { EditorState, Extension, Range } from '@codemirror/state';

const MIN_PAYLOAD_LENGTH = 48;
const DATA_IMAGE_BASE64_RE = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi;

type FoldRange = { from: number; to: number };

const expandBase64Image = StateEffect.define<FoldRange>();
const collapseExpandedBase64Images = StateEffect.define<null>();

export const base64ImageFoldCompartment = new Compartment();

function findPayloadRanges(lineText: string): Array<{ from: number; to: number; mime: string }> {
  const found: Array<{ from: number; to: number; mime: string }> = [];
  DATA_IMAGE_BASE64_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = DATA_IMAGE_BASE64_RE.exec(lineText)) !== null) {
    const mime = match[1] ?? 'image';
    const payload = match[2] ?? '';
    if (payload.length < MIN_PAYLOAD_LENGTH) continue;
    const full = match[0];
    const prefixLen = full.length - payload.length;
    const from = match.index + prefixLen;
    found.push({ from, to: match.index + full.length, mime });
  }
  return found;
}

function formatFoldLabel(mime: string, payloadLength: number): string {
  const bytes = Math.round((payloadLength * 3) / 4);
  const size =
    bytes >= 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(1)}MB`
      : bytes >= 1024
        ? `${Math.max(1, Math.round(bytes / 1024))}KB`
        : `${bytes}B`;
  return `…${mime} ${size}…`;
}

class FoldedBase64Widget extends WidgetType {
  constructor(
    readonly label: string,
    readonly from: number,
    readonly to: number,
  ) {
    super();
  }

  toDOM(view: EditorView): HTMLElement {
    const span = document.createElement('span');
    span.textContent = this.label;
    span.className = 'cm-base64-image-fold';
    span.title = 'Click to expand base64 image data';
    span.addEventListener('mousedown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      view.dispatch({
        selection: { anchor: this.from },
        effects: expandBase64Image.of({ from: this.from, to: this.to }),
      });
      view.focus();
    });
    span.addEventListener('click', (event) => {
      event.preventDefault();
    });
    return span;
  }

  ignoreEvent(): boolean {
    return false;
  }

  eq(other: FoldedBase64Widget): boolean {
    return this.label === other.label && this.from === other.from && this.to === other.to;
  }
}

function isSameRange(ranges: readonly FoldRange[], from: number, to: number): boolean {
  return ranges.some((range) => range.from === from && range.to === to);
}

function buildFoldState(state: EditorState, expanded: readonly FoldRange[]): {
  deco: DecorationSet;
  expanded: FoldRange[];
} {
  const widgets: Range<Decoration>[] = [];
  const nextExpanded: FoldRange[] = [];

  for (let lineNumber = 1; lineNumber <= state.doc.lines; lineNumber += 1) {
    const line = state.doc.line(lineNumber);
    for (const match of findPayloadRanges(line.text)) {
      const from = line.from + match.from;
      const to = line.from + match.to;
      if (isSameRange(expanded, from, to)) {
        nextExpanded.push({ from, to });
        continue;
      }
      widgets.push(
        Decoration.replace({
          widget: new FoldedBase64Widget(
            formatFoldLabel(match.mime, to - from),
            from,
            to,
          ),
        }).range(from, to),
      );
    }
  }

  return {
    deco: Decoration.set(widgets, true),
    expanded: nextExpanded,
  };
}

const base64ImageFoldField = StateField.define<{ deco: DecorationSet; expanded: FoldRange[] }>({
  create(state: any) {
    return buildFoldState(state, []);
  },
  update(value: any, tr: any) {
    let expanded = value.expanded;
    if (tr.docChanged && expanded.length) {
      expanded = expanded
        .map(({
        from,
        to
      }: any) => ({
          from: tr.changes.mapPos(from, 1),
          to: tr.changes.mapPos(to, -1),
        }))
        .filter(({
        from,
        to
      }: any) => from < to);
    }

    let expandedChanged = expanded !== value.expanded;
    for (const effect of tr.effects) {
      if (effect.is(expandBase64Image)) {
        expanded = [{ from: effect.value.from, to: effect.value.to }];
        expandedChanged = true;
      } else if (effect.is(collapseExpandedBase64Images) && expanded.length > 0) {
        expanded = [];
        expandedChanged = true;
      }
    }

    if (tr.docChanged || expandedChanged) {
      return buildFoldState(tr.state, expanded);
    }
    return value;
  },
  provide: (field: any) => EditorView.decorations.from(field, (value: any) => value.deco),
});

const collapseOnOutsideClick = EditorView.domEventHandlers({
  mousedown(event: any, view: any) {
    const field = view.state.field(base64ImageFoldField, false);
    if (!field || field.expanded.length === 0) return false;
    const target = event.target;
    if (!(target instanceof Node) || !view.dom.contains(target)) return false;
    const pos = view.posAtDOM(target, 0);
    if (
      pos !== -1 &&
      field.expanded.some(({
        from,
        to
      }: any) => pos >= from && pos <= to)
    ) {
      return false;
    }
    view.dispatch({ effects: collapseExpandedBase64Images.of(null) });
    return false;
  },
});

export function createBase64ImageFoldExtension(): Extension {
  return [base64ImageFoldField, collapseOnOutsideClick];
}

export function base64ImageFoldExtension(enabled: boolean): Extension {
  return base64ImageFoldCompartment.of(enabled ? createBase64ImageFoldExtension() : []);
}

export function applyBase64ImageFoldEnabled(
  view: EditorView | null | undefined,
  enabled: boolean,
): void {
  if (!view) return;
  try {
    view.dispatch({
      effects: base64ImageFoldCompartment.reconfigure(
        enabled ? createBase64ImageFoldExtension() : [],
      ),
    });
  } catch {
    // Editor may still be mounting before the compartment is installed.
  }
}

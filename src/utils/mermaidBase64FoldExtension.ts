import {
  codeFolding,
  foldEffect,
  foldService,
  foldedRanges,
  syntaxTree,
  unfoldEffect,
} from '@codemirror/language';
import { Compartment, EditorState, StateEffect, StateField, type Extension } from '@codemirror/state';
import { EditorView, ViewPlugin, type ViewUpdate } from '@codemirror/view';
import { mermaidBase64FenceInnerRange } from '@/utils/mermaidBase64Fence';

type FoldRange = { from: number; to: number };

export const mermaidBase64FoldCompartment = new Compartment();

function isRangeFolded(state: EditorState, from: number, to: number): boolean {
  let folded = false;
  foldedRanges(state).between(from, to, () => {
    folded = true;
  });
  return folded;
}

function collectMermaidBase64FoldRanges(state: EditorState): FoldRange[] {
  const found: FoldRange[] = [];
  const docText = state.doc.toString();
  syntaxTree(state).iterate({
    enter(node: any) {
      if (node.name !== 'FencedCode') return;
      const range = mermaidBase64FenceInnerRange(docText, node.from, node.to);
      if (range) found.push(range);
    },
  });
  return found;
}

function isSameRange(ranges: readonly FoldRange[], from: number, to: number): boolean {
  return ranges.some((range) => range.from === from && range.to === to);
}

const userUnfoldedField = StateField.define<FoldRange[]>({
  create() {
    return [];
  },
  update(value: any, tr: any) {
    let next = value;
    if (tr.docChanged && next.length) {
      next = next
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

    let changed = next !== value;
    for (const effect of tr.effects) {
      if (effect.is(unfoldEffect)) {
        if (!isSameRange(next, effect.value.from, effect.value.to)) {
          next = [...next, effect.value];
          changed = true;
        }
      } else if (effect.is(foldEffect)) {
        const filtered = next.filter(
          (range: any) => range.from !== effect.value.from || range.to !== effect.value.to,
        );
        if (filtered.length !== next.length) {
          next = filtered;
          changed = true;
        }
      }
    }

    return changed ? next : value;
  },
});

function autoFoldMermaidBase64Fences(view: EditorView): void {
  const userUnfolded = view.state.field(userUnfoldedField);
  const effects: StateEffect<unknown>[] = [];
  for (const range of collectMermaidBase64FoldRanges(view.state)) {
    if (isSameRange(userUnfolded, range.from, range.to)) continue;
    if (isRangeFolded(view.state, range.from, range.to)) continue;
    effects.push(foldEffect.of(range));
  }
  if (effects.length > 0) {
    view.dispatch({ effects });
  }
}

const autoFoldPlugin = ViewPlugin.fromClass(
  class {
    constructor(view: EditorView) {
      autoFoldMermaidBase64Fences(view);
    }

    update(update: ViewUpdate) {
      if (update.docChanged) {
        autoFoldMermaidBase64Fences(update.view);
      }
    }
  },
);

const mermaidBase64FoldService = foldService.of((state: any, lineStart: any) => {
  const docText = state.doc.toString();
  let found: FoldRange | null = null;
  syntaxTree(state).iterate({
    enter(node: any) {
      if (node.name !== 'FencedCode') return;
      const line = state.doc.lineAt(node.from);
      if (line.from !== lineStart) return;
      const range = mermaidBase64FenceInnerRange(docText, node.from, node.to);
      if (range) {
        found = range;
        return false;
      }
      return undefined;
    },
  });
  return found;
});

export function createMermaidBase64FoldExtension(): Extension {
  return [userUnfoldedField, codeFolding(), mermaidBase64FoldService, autoFoldPlugin];
}

export function mermaidBase64FoldExtension(enabled: boolean): Extension {
  return mermaidBase64FoldCompartment.of(enabled ? createMermaidBase64FoldExtension() : []);
}

export function applyMermaidBase64FoldEnabled(
  view: EditorView | null | undefined,
  enabled: boolean,
): void {
  if (!view) return;
  try {
    view.dispatch({
      effects: mermaidBase64FoldCompartment.reconfigure(
        enabled ? createMermaidBase64FoldExtension() : [],
      ),
    });
  } catch {
    // Editor may still be mounting before the compartment is installed.
  }
}

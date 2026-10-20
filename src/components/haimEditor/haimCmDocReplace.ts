/**
 * Apply a planned text change to CodeMirror without mapping a covering
 * replace through selection.map (that selects from the top of the doc).
 */

import { EditorSelection, type ChangeSpec } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import {
  lineDiffChanges,
  mapSelectionThroughChanges,
  prefixSuffixChange,
  shouldUseWasmLineDiff,
  dirtySpanBytes,
  HAIM_LINE_DIFF_WORKER_TIMEOUT_MS,
  type HaimTextChange,
} from '@/components/haimEditor/haimTextDiff';

type WorkerResponse = {
  id: number;
  changes: HaimTextChange[];
};

let worker: Worker | null = null;
let nextId = 1;

function lineDiffWorker(): Worker | null {
  if (typeof Worker === 'undefined') return null;
  if (worker) return worker;
  try {
    worker = new Worker(new URL('./haimLineDiffWorker.ts', import.meta.url), {
      type: 'module',
    });
    return worker;
  } catch {
    return null;
  }
}

function diffInWorker(before: string, after: string): Promise<HaimTextChange[] | null> {
  const handle = lineDiffWorker();
  if (!handle) return Promise.resolve(null);
  const id = nextId;
  nextId += 1;
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      handle.removeEventListener('message', onMessage);
      resolve(null);
    }, HAIM_LINE_DIFF_WORKER_TIMEOUT_MS);
    const onMessage = (event: MessageEvent<WorkerResponse>) => {
      if (event.data?.id !== id) return;
      clearTimeout(timer);
      handle.removeEventListener('message', onMessage);
      const changes = event.data.changes;
      resolve(Array.isArray(changes) ? changes : null);
    };
    handle.addEventListener('message', onMessage);
    handle.postMessage({ id, before, after });
  });
}

/** True while a pointer drag owns the source selection. */
export function isCmPointerSelecting(view: EditorView): boolean {
  const input = (view as unknown as {
    inputState?: { mouseSelection?: unknown };
  }).inputState;
  return Boolean(input?.mouseSelection);
}

export async function planCmDocChanges(
  before: string,
  after: string,
): Promise<HaimTextChange[]> {
  const span = prefixSuffixChange(before, after);
  if (!span) return [];
  if (!shouldUseWasmLineDiff(before, after, dirtySpanBytes(span))) {
    return [span];
  }
  const middleBefore = before.slice(span.from, span.to);
  const workerChanges = await diffInWorker(middleBefore, span.insert);
  const relative = workerChanges ?? lineDiffChanges(middleBefore, span.insert);
  if (relative.length === 0) return [span];
  return relative.map((change) => ({
    from: span.from + change.from,
    to: span.from + change.to,
    insert: change.insert,
  }));
}

export function replaceCmDocWithChanges(
  view: EditorView,
  before: string,
  changes: readonly HaimTextChange[],
): boolean {
  if (changes.length === 0) return false;
  if (isCmPointerSelecting(view)) return false;
  const scrollDom = view.scrollDOM;
  const savedTop = scrollDom.scrollTop;
  const savedLeft = scrollDom.scrollLeft;
  const main = view.state.selection.main;
  const nextLength =
    before.length +
    changes.reduce(
      (sum, change) => sum + change.insert.length - (change.to - change.from),
      0,
    );
  const mapped = mapSelectionThroughChanges(
    main.anchor,
    main.head,
    changes,
    nextLength,
  );
  const specs: ChangeSpec[] = changes.map((change) => ({
    from: change.from,
    to: change.to,
    insert: change.insert,
  }));
  view.dispatch({
    changes: specs,
    selection: EditorSelection.single(mapped.anchor, mapped.head),
    scrollIntoView: false,
  });
  scrollDom.scrollTop = savedTop;
  scrollDom.scrollLeft = savedLeft;
  return true;
}

/**
 * Replace the CM document. Defers (returns false) while a pointer selection
 * is active so the drag anchor is not remapped to 0.
 */
export async function replaceCmDocPreservingViewAsync(
  view: EditorView,
  md: string,
): Promise<boolean> {
  if (isCmPointerSelecting(view)) return false;
  const before = view.state.doc.toString();
  if (before === md) return false;
  const changes = await planCmDocChanges(before, md);
  if (view.state.doc.toString() !== before) return false;
  if (isCmPointerSelecting(view)) return false;
  return replaceCmDocWithChanges(view, before, changes);
}

/** Sync prefix/suffix replace. Same selection rule as the async path. */
export function replaceCmDocPreservingView(view: EditorView, md: string): boolean {
  if (isCmPointerSelecting(view)) return false;
  const before = view.state.doc.toString();
  if (before === md) return false;
  const span = prefixSuffixChange(before, md);
  if (!span) return false;
  return replaceCmDocWithChanges(view, before, [span]);
}

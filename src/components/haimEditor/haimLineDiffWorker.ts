/// <reference lib="webworker" />
import { lineDiffChanges, type HaimTextChange } from '@/components/haimEditor/haimTextDiff';

type RequestMessage = {
  id: number;
  before: string;
  after: string;
};

type WasmDiff = {
  diff_line_hunks: (before: string, after: string) => HaimTextChange[];
};

let wasmDiff: WasmDiff | null | undefined;

async function loadWasmDiff(): Promise<WasmDiff | null> {
  if (wasmDiff !== undefined) return wasmDiff;
  try {
    const mod = (await import(
      '@/components/haimEditor/wasm/haim_line_diff.js'
    )) as unknown as {
      default?: (input?: unknown) => Promise<unknown>;
      diff_line_hunks: WasmDiff['diff_line_hunks'];
    };
    if (typeof mod.default === 'function') {
      await mod.default();
    }
    wasmDiff = { diff_line_hunks: mod.diff_line_hunks };
    return wasmDiff;
  } catch {
    wasmDiff = null;
    return null;
  }
}

self.onmessage = (event: MessageEvent<RequestMessage>) => {
  const { id, before, after } = event.data;
  void (async () => {
    let changes: HaimTextChange[];
    const wasm = await loadWasmDiff();
    if (wasm) {
      try {
        const raw = wasm.diff_line_hunks(before, after);
        changes = Array.isArray(raw) ? raw : lineDiffChanges(before, after);
      } catch {
        changes = lineDiffChanges(before, after);
      }
    } else {
      changes = lineDiffChanges(before, after);
    }
    self.postMessage({ id, changes });
  })();
};

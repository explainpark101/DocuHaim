/**
 * Choose which registered editor receives LLM Assist insert.
 * Hover can re-register a split pane; that must not steal the target.
 * Keyboard caret focus wins, then the same editor instance / document.
 */

export type LlmAssistBridgePickMemory = {
  ownerId: number | null;
  documentKey: string | null;
  editorRef: object | null;
};

export type LlmAssistBridgePickCandidate<T> = {
  ownerId: number;
  bridge: T;
  documentKey?: string | null;
  editorRef?: object | null;
  keyboardFocused?: boolean;
};

export const EMPTY_LLM_ASSIST_BRIDGE_PICK_MEMORY: LlmAssistBridgePickMemory = {
  ownerId: null,
  documentKey: null,
  editorRef: null,
};

function memoryFrom<T>(candidate: LlmAssistBridgePickCandidate<T>): LlmAssistBridgePickMemory {
  return {
    ownerId: candidate.ownerId,
    documentKey: candidate.documentKey ?? null,
    editorRef: candidate.editorRef ?? null,
  };
}

/**
 * Pick the insert target among live editor bridges.
 * A newly registered, unfocused pane does not replace the keyboard-focused one.
 */
export function pickLlmAssistEditorBridge<T>(
  candidates: readonly LlmAssistBridgePickCandidate<T>[],
  memory: LlmAssistBridgePickMemory,
): { bridge: T | null; memory: LlmAssistBridgePickMemory } {
  const focused = candidates.filter((candidate) => candidate.keyboardFocused);
  if (focused.length > 0) {
    const chosen = focused[focused.length - 1]!;
    return { bridge: chosen.bridge, memory: memoryFrom(chosen) };
  }

  if (memory.ownerId != null) {
    const byOwner = candidates.find((candidate) => candidate.ownerId === memory.ownerId);
    if (byOwner) return { bridge: byOwner.bridge, memory };
  }

  if (memory.editorRef) {
    const byRef = candidates.filter(
      (candidate) => candidate.editorRef != null && candidate.editorRef === memory.editorRef,
    );
    if (byRef.length === 1) {
      const chosen = byRef[0]!;
      return { bridge: chosen.bridge, memory: memoryFrom(chosen) };
    }
  }

  if (memory.documentKey) {
    const byDoc = candidates.filter(
      (candidate) => candidate.documentKey != null && candidate.documentKey === memory.documentKey,
    );
    if (byDoc.length === 1) {
      const chosen = byDoc[0]!;
      return { bridge: chosen.bridge, memory: memoryFrom(chosen) };
    }
  }

  if (candidates.length === 1) {
    const chosen = candidates[0]!;
    return { bridge: chosen.bridge, memory: memoryFrom(chosen) };
  }

  if (candidates.length > 1) {
    let earliest = candidates[0]!;
    for (const candidate of candidates) {
      if (candidate.ownerId < earliest.ownerId) earliest = candidate;
    }
    return { bridge: earliest.bridge, memory: memoryFrom(earliest) };
  }

  return { bridge: null, memory };
}

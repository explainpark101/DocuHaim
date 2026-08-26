import type { LlmAssistRequestOptionEntry } from '@/utils/llm/llmAssistRequestOptions';

export const MAX_LLM_ASSIST_ADVANCED_OPTIONS_UNDO_ENTRIES = 80;
/** Coalesce continuous field typing into one checkpoint. */
export const LLM_ASSIST_ADVANCED_OPTIONS_UNDO_RECORD_DELAY_MS = 350;

export type LlmAssistAdvancedOptionsUndoSnapshot = {
  tab: 'fields' | 'json';
  entries: LlmAssistRequestOptionEntry[];
  jsonText: string;
};

export function serializeLlmAssistAdvancedOptionsSnapshot(
  snapshot: LlmAssistAdvancedOptionsUndoSnapshot,
): string {
  return JSON.stringify(snapshot);
}

export function parseLlmAssistAdvancedOptionsSnapshot(
  raw: string,
): LlmAssistAdvancedOptionsUndoSnapshot | null {
  try {
    const parsed = JSON.parse(raw) as LlmAssistAdvancedOptionsUndoSnapshot;
    if (!parsed || typeof parsed !== 'object') return null;
    if (parsed.tab !== 'fields' && parsed.tab !== 'json') return null;
    if (!Array.isArray(parsed.entries)) return null;
    if (typeof parsed.jsonText !== 'string') return null;
    return parsed;
  } catch {
    return null;
  }
}

function trimUndoStack(stack: string[]): string[] {
  if (!Array.isArray(stack) || stack.length === 0) return [];
  if (stack.length <= MAX_LLM_ASSIST_ADVANCED_OPTIONS_UNDO_ENTRIES) return stack;
  return stack.slice(stack.length - MAX_LLM_ASSIST_ADVANCED_OPTIONS_UNDO_ENTRIES);
}

export function pushLlmAssistAdvancedOptionsUndoCheckpoint(
  stack: string[],
  index: number,
  snapshot: string,
): { stack: string[]; index: number; changed: boolean } {
  const safeStack = Array.isArray(stack) && stack.length > 0 ? stack : [];
  if (safeStack.length === 0) {
    return { stack: [snapshot], index: 0, changed: true };
  }
  const safeIndex = Math.max(0, Math.min(index, safeStack.length - 1));
  if (safeStack[safeIndex] === snapshot) {
    return { stack: safeStack, index: safeIndex, changed: false };
  }
  const next = safeStack.slice(0, safeIndex + 1);
  next.push(snapshot);
  const trimmed = trimUndoStack(next);
  return { stack: trimmed, index: trimmed.length - 1, changed: true };
}

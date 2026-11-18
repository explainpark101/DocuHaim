/**
 * Sidebar/tree (+ tab) → LLM Assist chat file-reference drop bridge.
 * Droppable is registered inside Sidebar DndContext but portaled onto the assist host.
 */

export const LLM_ASSIST_REFERENCE_DROPPABLE_ID = 'llm-assist-reference-drop';

export function isLlmAssistReferenceDroppableId(
  id: string | number | null | undefined,
): boolean {
  return String(id || '') === LLM_ASSIST_REFERENCE_DROPPABLE_ID;
}

export type LlmAssistReferenceDropItem = {
  storageType: string;
  path: string;
  nodeType?: string;
  name?: string;
};

export type LlmAssistReferenceDropSnapshot = {
  host: HTMLElement | null;
  active: boolean;
};

type Handler = (items: LlmAssistReferenceDropItem[]) => void;

let snapshot: LlmAssistReferenceDropSnapshot = { host: null, active: false };
let handler: Handler | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function getLlmAssistReferenceDropSnapshot(): LlmAssistReferenceDropSnapshot {
  return snapshot;
}

export function subscribeLlmAssistReferenceDrop(listener: () => void): () => void {
  listeners.add(listener);
  listener();
  return () => {
    listeners.delete(listener);
  };
}

export function setLlmAssistReferenceDropHost(host: HTMLElement | null): void {
  if (snapshot.host === host) return;
  snapshot = { ...snapshot, host };
  emit();
}

export function setLlmAssistReferenceDropActive(active: boolean): void {
  if (snapshot.active === active) return;
  snapshot = { ...snapshot, active: Boolean(active) };
  emit();
}

export function registerLlmAssistReferenceDropHandler(next: Handler | null): void {
  handler = typeof next === 'function' ? next : null;
}

export function dispatchLlmAssistReferenceDrop(
  items: LlmAssistReferenceDropItem[] | null | undefined,
): boolean {
  if (!handler || !Array.isArray(items) || !items.length) return false;
  handler(items);
  return true;
}

/** Hit-test the registered host (for workspace tab drag end). */
export function isPointOnLlmAssistReferenceDropHost(
  clientX: number,
  clientY: number,
): boolean {
  const host = snapshot.host;
  if (!snapshot.active || !host) return false;
  try {
    const rect = host.getBoundingClientRect();
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  } catch {
    return false;
  }
}

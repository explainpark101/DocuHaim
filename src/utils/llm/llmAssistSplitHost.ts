/** DOM host for LLM Assist when presentation is `split` (workspace leaf). */

type Listener = () => void;

let hostEl: HTMLElement | null = null;
const listeners = new Set<Listener>();

export function setLlmAssistSplitHost(el: HTMLElement | null): void {
  if (hostEl === el) return;
  hostEl = el;
  for (const listener of listeners) listener();
}

export function getLlmAssistSplitHost(): HTMLElement | null {
  return hostEl;
}

export function subscribeLlmAssistSplitHost(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

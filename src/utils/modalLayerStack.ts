/**
 * Global modal layer stack for Esc/Enter.
 * Only the topmost registered layer receives cancel/confirm shortcuts;
 * the event is consumed so lower modals and other app handlers do not also run.
 */

export type ModalLayerHandlers = {
  /** Esc → cancel/close. */
  onCancel?: (() => void) | null | undefined;
  /** Enter → confirm (when allowed). */
  onConfirm?: (() => void) | null | undefined;
  /**
   * When true, Enter is ignored while focus is in input/select
   * (ConfirmModal-style). Textarea / contentEditable always skip Enter.
   */
  ignoreEnterInFields?: boolean;
};

type ModalLayerEntry = {
  id: number;
  getHandlers: () => ModalLayerHandlers;
};

let nextId = 1;
const stack: ModalLayerEntry[] = [];
let installed = false;

function isContentEditableTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  return Boolean(el?.isContentEditable);
}

function targetTagName(target: EventTarget | null): string {
  const el = target as HTMLElement | null;
  return el?.tagName?.toLowerCase?.() ?? '';
}

function shouldSkipEnter(
  event: KeyboardEvent,
  ignoreEnterInFields: boolean,
): boolean {
  if (isContentEditableTarget(event.target)) return true;
  const tag = targetTagName(event.target);
  if (tag === 'textarea') return true;
  if (ignoreEnterInFields && (tag === 'input' || tag === 'select')) return true;
  return false;
}

function consumeKeyEvent(event: KeyboardEvent): void {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}

function handleModalLayerKeyDown(event: KeyboardEvent): void {
  if (stack.length === 0) return;
  const top = stack[stack.length - 1];
  if (!top) return;
  const handlers = top.getHandlers();

  if (event.key === 'Escape') {
    // Always consume so lower modals / app overlays do not also handle Esc.
    consumeKeyEvent(event);
    handlers.onCancel?.();
    return;
  }

  if (event.key !== 'Enter') return;
  if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;

  const onConfirm = handlers.onConfirm;
  if (typeof onConfirm !== 'function') {
    // No confirm handler: do not consume — allow native form submit / button activation.
    return;
  }
  if (shouldSkipEnter(event, handlers.ignoreEnterInFields === true)) return;

  consumeKeyEvent(event);
  onConfirm();
}

/** Install the single capture-phase document listener (idempotent). */
export function ensureModalLayerKeyboardInstalled(): void {
  if (installed || typeof document === 'undefined') return;
  installed = true;
  document.addEventListener('keydown', handleModalLayerKeyDown, true);
}

export function pushModalLayer(getHandlers: () => ModalLayerHandlers): number {
  ensureModalLayerKeyboardInstalled();
  const id = nextId++;
  stack.push({ id, getHandlers });
  return id;
}

export function popModalLayer(id: number): void {
  const idx = stack.findIndex((entry) => entry.id === id);
  if (idx >= 0) stack.splice(idx, 1);
}

/** Test / debug helper. */
export function getModalLayerStackSize(): number {
  return stack.length;
}

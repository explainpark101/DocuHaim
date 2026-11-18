import type { LlmAssistEditorBridge } from '@/contexts/LlmAssistSessionContext';
import { isMarkdownFileName } from '@/utils/markdownImageExport';

export type LlmAssistChatReferenceKind = 'selection' | 'file';

export type LlmAssistChatReference = {
  id: string;
  text: string;
  /** selection = highlighted snippet; file = whole note body. */
  kind?: LlmAssistChatReferenceKind;
  /** Vault storage backend id (s3 / local / …). */
  storageType?: string;
  /** Vault-relative path without storage prefix. */
  path?: string;
  /** Basename for compact badges. */
  fileName?: string;
  /** 1-based inclusive start line in the note. */
  lineStart?: number;
  /** 1-based inclusive end line in the note. */
  lineEnd?: number;
};

export type LlmAssistChatReferenceDraft = {
  text: string;
  kind?: LlmAssistChatReferenceKind;
  storageType?: string;
  path?: string;
  fileName?: string;
  lineStart?: number;
  lineEnd?: number;
  id?: string;
};

/** Soft cap so a single drop cannot blow the chat context. */
export const LLM_ASSIST_FILE_REFERENCE_MAX_CHARS = 200_000;

const AUTO_ACTIVE_TAB_KEY = 's3haim-llm-assist-auto-active-tab-ref';

export function loadLlmAssistAutoActiveTabReference(): boolean {
  try {
    return window.localStorage.getItem(AUTO_ACTIVE_TAB_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveLlmAssistAutoActiveTabReference(enabled: boolean): void {
  try {
    if (enabled) window.localStorage.setItem(AUTO_ACTIVE_TAB_KEY, '1');
    else window.localStorage.removeItem(AUTO_ACTIVE_TAB_KEY);
  } catch {
    // ignore
  }
}

export function isLlmAssistReferenceableFileName(name: string | null | undefined): boolean {
  const raw = String(name || '').trim();
  if (!raw) return false;
  if (isMarkdownFileName(raw)) return true;
  const lower = raw.toLowerCase();
  return lower.endsWith('.txt') || lower.endsWith('.mdx');
}

export function countTextLines(text: string): number {
  if (!text) return 0;
  let lines = 1;
  for (let i = 0; i < text.length; i += 1) {
    if (text.charCodeAt(i) === 10) lines += 1;
  }
  return lines;
}

export function truncateLlmAssistFileReferenceText(text: string): {
  text: string;
  truncated: boolean;
} {
  const raw = String(text || '');
  if (raw.length <= LLM_ASSIST_FILE_REFERENCE_MAX_CHARS) {
    return { text: raw, truncated: false };
  }
  return {
    text: `${raw.slice(0, LLM_ASSIST_FILE_REFERENCE_MAX_CHARS)}\n\n…[truncated]`,
    truncated: true,
  };
}

export function createLlmAssistReferenceId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `ref-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Parse `storageType:path/to/file.md` → path + fileName. */
export function parseLlmAssistDocumentKey(
  documentKey: string | null | undefined,
): { path: string; fileName: string } | null {
  const raw = String(documentKey || '').trim();
  if (!raw) return null;
  const colon = raw.indexOf(':');
  const path = (colon >= 0 ? raw.slice(colon + 1) : raw).replace(/\\/g, '/').replace(/^\/+/, '');
  if (!path) return null;
  const parts = path.split('/').filter(Boolean);
  const fileName = parts[parts.length - 1] || path;
  return { path, fileName };
}

/** 1-based line number for a character offset in a text document. */
export function offsetToLineNumber(text: string, offset: number): number {
  const safe = Math.max(0, Math.min(offset, text.length));
  let line = 1;
  for (let i = 0; i < safe; i += 1) {
    if (text.charCodeAt(i) === 10) line += 1;
  }
  return line;
}

/**
 * Resolve inclusive 1-based line range for a selection.
 * Prefer CM offsets when they match the markdown string length; otherwise locate text.
 */
export function resolveLineRangeFromMarkdown(
  markdown: string,
  selectedText: string,
  from?: number,
  to?: number,
): { lineStart: number; lineEnd: number } | null {
  const doc = String(markdown || '');
  const text = String(selectedText || '');
  if (!doc || !text.trim()) return null;

  if (
    typeof from === 'number' &&
    typeof to === 'number' &&
    from >= 0 &&
    to >= from &&
    to <= doc.length
  ) {
    const endPos = Math.max(from, to - (to > from ? 1 : 0));
    return {
      lineStart: offsetToLineNumber(doc, from),
      lineEnd: offsetToLineNumber(doc, endPos),
    };
  }

  const idx = doc.indexOf(text);
  if (idx < 0) return null;
  const endPos = Math.max(idx, idx + text.length - 1);
  return {
    lineStart: offsetToLineNumber(doc, idx),
    lineEnd: offsetToLineNumber(doc, endPos),
  };
}

function lineRangeFromCmView(
  view: { state: { doc: { length: number; lineAt: (pos: number) => { number: number } } } },
  from: number,
  to: number,
): { lineStart: number; lineEnd: number } | null {
  const len = view.state.doc.length;
  const safeFrom = Math.max(0, Math.min(from, len));
  const safeTo = Math.max(safeFrom, Math.min(to, len));
  if (safeFrom === safeTo && safeFrom >= len) return null;
  const endPos = Math.max(safeFrom, safeTo - (safeTo > safeFrom ? 1 : 0));
  try {
    return {
      lineStart: view.state.doc.lineAt(safeFrom).number,
      lineEnd: view.state.doc.lineAt(endPos).number,
    };
  } catch {
    return null;
  }
}

/** Build reference draft from live editor bridge + selected text. */
export function enrichLlmAssistChatReferenceFromBridge(
  bridge: LlmAssistEditorBridge | null | undefined,
  selectedText: string,
): LlmAssistChatReferenceDraft {
  const text = String(selectedText || '').trim();
  const draft: LlmAssistChatReferenceDraft = { text };
  if (!text) return draft;

  const parsed = parseLlmAssistDocumentKey(bridge?.documentKey);
  if (parsed) {
    draft.path = parsed.path;
    draft.fileName = parsed.fileName;
  }

  const snap = typeof bridge?.getSelection === 'function' ? bridge.getSelection() : null;
  const from = snap?.from;
  const to = snap?.to;
  const cm = bridge?.getEditorApi?.()?.getEditorView?.() ?? null;
  if (cm && typeof from === 'number' && typeof to === 'number') {
    const range = lineRangeFromCmView(cm, from, to);
    if (range) {
      draft.lineStart = range.lineStart;
      draft.lineEnd = range.lineEnd;
      return draft;
    }
  }

  const markdown =
    typeof bridge?.getMarkdown === 'function' ? String(bridge.getMarkdown() || '') : '';
  const range = resolveLineRangeFromMarkdown(
    markdown,
    text,
    typeof from === 'number' ? from : undefined,
    typeof to === 'number' ? to : undefined,
  );
  if (range) {
    draft.lineStart = range.lineStart;
    draft.lineEnd = range.lineEnd;
  }
  return draft;
}

export function createLlmAssistChatReference(
  draft: LlmAssistChatReferenceDraft | string,
): LlmAssistChatReference | null {
  const raw = typeof draft === 'string' ? { text: draft } : draft;
  const text = String(raw.text || '').trim();
  if (!text) return null;
  const kind: LlmAssistChatReferenceKind = raw.kind === 'file' ? 'file' : 'selection';
  const ref: LlmAssistChatReference = {
    id: typeof raw.id === 'string' && raw.id ? raw.id : createLlmAssistReferenceId(),
    text,
    kind,
  };
  if (typeof raw.storageType === 'string' && raw.storageType.trim()) {
    ref.storageType = raw.storageType.trim();
  }
  if (typeof raw.path === 'string' && raw.path.trim()) ref.path = raw.path.trim();
  if (typeof raw.fileName === 'string' && raw.fileName.trim()) {
    ref.fileName = raw.fileName.trim();
  } else if (ref.path) {
    const parts = ref.path.split('/').filter(Boolean);
    const name = parts[parts.length - 1];
    if (name) ref.fileName = name;
  }
  if (kind === 'file') {
    const lines = countTextLines(text);
    ref.lineStart = 1;
    ref.lineEnd = Math.max(1, lines);
  } else {
    if (typeof raw.lineStart === 'number' && Number.isFinite(raw.lineStart) && raw.lineStart >= 1) {
      ref.lineStart = Math.floor(raw.lineStart);
    }
    if (typeof raw.lineEnd === 'number' && Number.isFinite(raw.lineEnd) && raw.lineEnd >= 1) {
      ref.lineEnd = Math.floor(raw.lineEnd);
    }
    if (ref.lineStart != null && ref.lineEnd != null && ref.lineEnd < ref.lineStart) {
      ref.lineEnd = ref.lineStart;
    }
  }
  return ref;
}

export function createLlmAssistFileReference(input: {
  text: string;
  path: string;
  storageType?: string;
  fileName?: string;
  id?: string;
}): LlmAssistChatReference | null {
  const { text: clipped } = truncateLlmAssistFileReferenceText(input.text);
  return createLlmAssistChatReference({
    kind: 'file',
    text: clipped,
    path: input.path,
    ...(input.storageType ? { storageType: input.storageType } : {}),
    ...(input.fileName ? { fileName: input.fileName } : {}),
    ...(input.id ? { id: input.id } : {}),
  });
}

export function normalizeLlmAssistChatReference(value: unknown): LlmAssistChatReference | null {
  if (!value || typeof value !== 'object') return null;
  const rec = value as Record<string, unknown>;
  const draft: LlmAssistChatReferenceDraft = {
    text: typeof rec.text === 'string' ? rec.text : '',
  };
  if (typeof rec.id === 'string' && rec.id) draft.id = rec.id;
  if (rec.kind === 'file' || rec.kind === 'selection') draft.kind = rec.kind;
  if (typeof rec.storageType === 'string') draft.storageType = rec.storageType;
  if (typeof rec.path === 'string') draft.path = rec.path;
  if (typeof rec.fileName === 'string') draft.fileName = rec.fileName;
  if (typeof rec.lineStart === 'number') draft.lineStart = rec.lineStart;
  if (typeof rec.lineEnd === 'number') draft.lineEnd = rec.lineEnd;
  return createLlmAssistChatReference(draft);
}

/** Compact Cursor-style chip label, e.g. `note.md:12-18` or `note.md` (full file). */
export function formatLlmAssistReferenceBadge(ref: LlmAssistChatReference): string {
  const name = (ref.fileName || ref.path || '').trim() || '선택';
  if (ref.kind === 'file') return `${name} · 전체`;
  if (ref.lineStart == null) return name;
  if (ref.lineEnd == null || ref.lineEnd === ref.lineStart) {
    return `${name}:${ref.lineStart}`;
  }
  return `${name}:${ref.lineStart}-${ref.lineEnd}`;
}

/** Heading used inside the LLM user payload. */
export function formatLlmAssistReferenceHeading(
  ref: LlmAssistChatReference,
  index: number,
): string {
  const badge = formatLlmAssistReferenceBadge(ref);
  const pathBit = ref.path && ref.path !== ref.fileName ? ` (${ref.path})` : '';
  const scope = ref.kind === 'file' ? ' [full file]' : '';
  return `Reference ${index + 1}: ${badge}${scope}${pathBit}`;
}

export function sameLlmAssistFileReference(
  a: Pick<LlmAssistChatReference, 'kind' | 'storageType' | 'path'>,
  storageType: string,
  path: string,
): boolean {
  if (a.kind !== 'file') return false;
  const aPath = String(a.path || '').replace(/\\/g, '/');
  const bPath = String(path || '').replace(/\\/g, '/');
  if (!aPath || !bPath || aPath !== bPath) return false;
  const aType = String(a.storageType || '').trim();
  const bType = String(storageType || '').trim();
  if (!aType || !bType) return true;
  return aType === bType;
}

export function reorderLlmAssistChatReferences(
  refs: LlmAssistChatReference[],
  activeId: string,
  overId: string,
): LlmAssistChatReference[] {
  if (activeId === overId) return refs;
  const from = refs.findIndex((r) => r.id === activeId);
  const to = refs.findIndex((r) => r.id === overId);
  if (from < 0 || to < 0) return refs;
  const next = [...refs];
  const [moved] = next.splice(from, 1);
  if (!moved) return refs;
  next.splice(to, 0, moved);
  return next;
}

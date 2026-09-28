/**
 * Kanban board document (`.kanban.json`) parse / serialize / mutations.
 * Schema version 1 — hybrid cards (title/body + vault linkPaths + tags).
 * Legacy `linkPath` (singular) is migrated to `linkPaths` on read.
 */

export const KANBAN_DOCUMENT_VERSION = 1 as const;

export type KanbanColumn = {
  id: string;
  title: string;
  /** Native emoji glyph shown before the title; null = none. */
  icon: string | null;
  color: string | null;
  /** Column width in CSS pixels; null uses default (288). */
  width: number | null;
  cardIds: string[];
};

export type KanbanCard = {
  id: string;
  title: string;
  body: string;
  /** Vault POSIX paths opened from the card (ordered, unique). */
  linkPaths: string[];
  /** Free-form tags (ordered, unique case-insensitively). */
  tags: string[];
};

export type KanbanDocument = {
  version: typeof KANBAN_DOCUMENT_VERSION;
  columns: KanbanColumn[];
  cards: Record<string, KanbanCard>;
};

export type ParseKanbanDocumentResult = {
  ok: boolean;
  document: KanbanDocument;
  error: string | null;
};

export type KanbanCardDraft = {
  title: string;
  body: string;
  linkPaths: string[];
  tags: string[];
};

const DEFAULT_COLUMN_TITLES = ['To Do', 'Doing', 'Done'] as const;

/** Default column width (matches former Tailwind `w-72`). */
export const KANBAN_DEFAULT_COLUMN_WIDTH = 288;

export const KANBAN_MIN_COLUMN_WIDTH = 200;
export const KANBAN_MAX_COLUMN_WIDTH = 560;

function normalizeColumnWidth(value: unknown): number | null {
  if (value == null || value === '') return null;
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) return null;
  const rounded = Math.round(n);
  if (rounded <= 0) return null;
  return Math.min(
    KANBAN_MAX_COLUMN_WIDTH,
    Math.max(KANBAN_MIN_COLUMN_WIDTH, rounded),
  );
}

/** Resolved display width for a column. */
export function resolveKanbanColumnWidth(
  width: number | null | undefined,
): number {
  if (width == null || !Number.isFinite(width) || width <= 0) {
    return KANBAN_DEFAULT_COLUMN_WIDTH;
  }
  return Math.min(
    KANBAN_MAX_COLUMN_WIDTH,
    Math.max(KANBAN_MIN_COLUMN_WIDTH, Math.round(width)),
  );
}

function newId(prefix: string): string {
  const rand =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 12)
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  return `${prefix}_${rand}`;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function normalizeColor(value: unknown): string | null {
  if (value == null) return null;
  const s = String(value).trim();
  if (!s) return null;
  // Accept #RGB / #RRGGBB / #RRGGBBAA (optional leading #)
  const hex = s.startsWith('#') ? s : `#${s}`;
  if (!/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3}([0-9a-fA-F]{2})?)?$/.test(hex)) {
    return null;
  }
  return hex.toLowerCase();
}

/** Native emoji / short glyph for column headers (empty → null). */
function normalizeIcon(value: unknown): string | null {
  if (value == null) return null;
  const s = String(value).trim();
  if (!s) return null;
  // Cap length; ZWJ sequences can be multi-code-unit.
  if (s.length > 32) return s.slice(0, 32);
  return s;
}

function normalizeOneLinkPath(value: unknown): string | null {
  if (value == null) return null;
  const s = String(value).trim().replace(/\\/g, '/');
  return s || null;
}

/** Ordered unique vault paths; migrates legacy singular `linkPath`. */
export function normalizeLinkPaths(
  value: unknown,
  legacyLinkPath?: unknown,
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const push = (raw: unknown) => {
    const p = normalizeOneLinkPath(raw);
    if (!p || seen.has(p)) return;
    seen.add(p);
    out.push(p);
  };

  if (Array.isArray(value)) {
    for (const item of value) push(item);
  } else if (typeof value === 'string') {
    push(value);
  }

  if (out.length === 0 && legacyLinkPath != null) {
    push(legacyLinkPath);
  }

  return out;
}

/** Ordered unique tags (case-insensitive dedupe; keep first spelling). */
export function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const item of value) {
    const tag = String(item ?? '').trim();
    if (!tag) continue;
    const key = tag.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(tag);
  }
  return out;
}

export function cardDraftFromCard(card: KanbanCard): KanbanCardDraft {
  return {
    title: card.title,
    body: card.body,
    linkPaths: [...card.linkPaths],
    tags: [...card.tags],
  };
}

export function isKanbanCardDraftDirty(
  draft: KanbanCardDraft,
  card: KanbanCard,
): boolean {
  if (draft.title !== card.title) return true;
  if (draft.body !== card.body) return true;
  if (draft.linkPaths.length !== card.linkPaths.length) return true;
  if (draft.tags.length !== card.tags.length) return true;
  for (let i = 0; i < draft.linkPaths.length; i += 1) {
    if (draft.linkPaths[i] !== card.linkPaths[i]) return true;
  }
  for (let i = 0; i < draft.tags.length; i += 1) {
    if (draft.tags[i] !== card.tags[i]) return true;
  }
  return false;
}

/**
 * Case-insensitive substring match against title, body, and tags.
 * Empty / whitespace-only query matches nothing (caller shows all cards).
 */
export function matchKanbanCardQuery(
  card: KanbanCard,
  query: string,
): boolean {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return false;
  if (card.title.toLowerCase().includes(q)) return true;
  if (card.body.toLowerCase().includes(q)) return true;
  for (const tag of card.tags) {
    if (tag.toLowerCase().includes(q)) return true;
  }
  return false;
}

/** Card ids (column order) that match the query. */
export function searchKanbanCards(
  doc: KanbanDocument,
  query: string,
): string[] {
  const q = String(query || '').trim();
  if (!q) return [];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const col of doc.columns) {
    for (const id of col.cardIds) {
      if (seen.has(id)) continue;
      const card = doc.cards[id];
      if (!card) continue;
      if (!matchKanbanCardQuery(card, q)) continue;
      seen.add(id);
      out.push(id);
    }
  }
  return out;
}

/** All linkPaths currently used on the board (for drop dedupe). */
export function collectKanbanLinkedPaths(doc: KanbanDocument): Set<string> {
  const out = new Set<string>();
  for (const card of Object.values(doc.cards)) {
    for (const p of card.linkPaths) {
      if (p) out.add(p);
    }
  }
  return out;
}

function normalizeCard(raw: unknown, fallbackId: string): KanbanCard | null {
  const obj = asRecord(raw);
  if (!obj) return null;
  const id = String(obj.id || fallbackId).trim() || fallbackId;
  return {
    id,
    title: typeof obj.title === 'string' ? obj.title : '',
    body: typeof obj.body === 'string' ? obj.body : '',
    linkPaths: normalizeLinkPaths(obj.linkPaths, obj.linkPath),
    tags: normalizeTags(obj.tags),
  };
}

function normalizeColumn(raw: unknown, index: number): KanbanColumn | null {
  const obj = asRecord(raw);
  if (!obj) return null;
  const id =
    String(obj.id || '').trim() ||
    `col_${index}_${Date.now().toString(36)}`;
  const cardIdsRaw = Array.isArray(obj.cardIds) ? obj.cardIds : [];
  const cardIds: string[] = [];
  const seen = new Set<string>();
  for (const item of cardIdsRaw) {
    const cid = String(item || '').trim();
    if (!cid || seen.has(cid)) continue;
    seen.add(cid);
    cardIds.push(cid);
  }
  return {
    id,
    title:
      typeof obj.title === 'string' && obj.title.trim()
        ? obj.title
        : `Column ${index + 1}`,
    icon: normalizeIcon(obj.icon),
    color: normalizeColor(obj.color),
    width: normalizeColumnWidth(obj.width),
    cardIds,
  };
}

/** Empty board with To Do / Doing / Done columns. */
export function createEmptyKanbanDocument(): KanbanDocument {
  const columns: KanbanColumn[] = DEFAULT_COLUMN_TITLES.map((title, i) => ({
    id: `col_${['todo', 'doing', 'done'][i]}`,
    title,
    icon: null,
    color: null,
    width: null,
    cardIds: [],
  }));
  return {
    version: KANBAN_DOCUMENT_VERSION,
    columns,
    cards: {},
  };
}

/**
 * Parse vault JSON text. On failure returns a safe empty board + error banner message.
 */
export function parseKanbanDocument(
  text: string | null | undefined,
): ParseKanbanDocumentResult {
  const raw = String(text ?? '').trim();
  if (!raw) {
    return {
      ok: true,
      document: createEmptyKanbanDocument(),
      error: null,
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {
      ok: false,
      document: createEmptyKanbanDocument(),
      error: 'Invalid JSON — showing empty board.',
    };
  }

  const root = asRecord(parsed);
  if (!root) {
    return {
      ok: false,
      document: createEmptyKanbanDocument(),
      error: 'Kanban root must be an object — showing empty board.',
    };
  }

  const columnsRaw = Array.isArray(root.columns) ? root.columns : null;
  if (!columnsRaw) {
    return {
      ok: false,
      document: createEmptyKanbanDocument(),
      error: 'Missing columns array — showing empty board.',
    };
  }

  const columns: KanbanColumn[] = [];
  const columnIds = new Set<string>();
  for (let i = 0; i < columnsRaw.length; i += 1) {
    const col = normalizeColumn(columnsRaw[i], i);
    if (!col) continue;
    if (columnIds.has(col.id)) {
      col.id = `${col.id}_${i}`;
    }
    columnIds.add(col.id);
    columns.push(col);
  }

  if (columns.length === 0) {
    return {
      ok: false,
      document: createEmptyKanbanDocument(),
      error: 'No valid columns — showing empty board.',
    };
  }

  const cards: Record<string, KanbanCard> = {};
  const cardsRaw = asRecord(root.cards) || {};
  for (const [key, value] of Object.entries(cardsRaw)) {
    const card = normalizeCard(value, key);
    if (!card) continue;
    cards[card.id] = card;
  }

  // Drop cardIds that have no card entry; ensure every referenced card exists.
  for (const col of columns) {
    col.cardIds = col.cardIds.filter((id) => Boolean(cards[id]));
  }

  // Orphan cards (in map but not in any column) stay in `cards` but are invisible
  // until re-linked — keep them so data is not silently lost on round-trip.
  const version =
    typeof root.version === 'number' && Number.isFinite(root.version)
      ? Math.floor(root.version)
      : KANBAN_DOCUMENT_VERSION;

  if (version !== KANBAN_DOCUMENT_VERSION) {
    // Still accept; MVP only understands v1 shape after normalization.
  }

  return {
    ok: true,
    document: {
      version: KANBAN_DOCUMENT_VERSION,
      columns,
      cards,
    },
    error: null,
  };
}

/** Pretty-printed JSON for vault storage (`application/json`). */
export function serializeKanbanDocument(doc: KanbanDocument): string {
  const payload = {
    version: KANBAN_DOCUMENT_VERSION,
    columns: doc.columns.map((col) => ({
      id: col.id,
      title: col.title,
      icon: col.icon,
      color: col.color,
      width: col.width,
      cardIds: [...col.cardIds],
    })),
    cards: Object.fromEntries(
      Object.entries(doc.cards).map(([id, card]) => [
        id,
        {
          id: card.id,
          title: card.title,
          body: card.body,
          linkPaths: [...card.linkPaths],
          tags: [...card.tags],
        },
      ]),
    ),
  };
  return `${JSON.stringify(payload, null, 2)}\n`;
}

export function cloneKanbanDocument(doc: KanbanDocument): KanbanDocument {
  return parseKanbanDocument(serializeKanbanDocument(doc)).document;
}

// --- Pure mutations (for UI + unit tests) ---

export function addColumn(
  doc: KanbanDocument,
  title = 'New column',
  color: string | null = null,
): KanbanDocument {
  const next = cloneKanbanDocument(doc);
  const col: KanbanColumn = {
    id: newId('col'),
    title: String(title || 'New column'),
    icon: null,
    color: normalizeColor(color),
    width: null,
    cardIds: [],
  };
  next.columns.push(col);
  return next;
}

export function updateColumn(
  doc: KanbanDocument,
  columnId: string,
  patch: Partial<Pick<KanbanColumn, 'title' | 'icon' | 'color' | 'width'>>,
): KanbanDocument {
  const next = cloneKanbanDocument(doc);
  const col = next.columns.find((c) => c.id === columnId);
  if (!col) return doc;
  if (typeof patch.title === 'string') col.title = patch.title;
  if ('icon' in patch) col.icon = normalizeIcon(patch.icon);
  if ('color' in patch) col.color = normalizeColor(patch.color);
  if ('width' in patch) col.width = normalizeColumnWidth(patch.width);
  return next;
}

export function removeColumn(
  doc: KanbanDocument,
  columnId: string,
): KanbanDocument {
  const next = cloneKanbanDocument(doc);
  const idx = next.columns.findIndex((c) => c.id === columnId);
  if (idx < 0) return doc;
  const [removed] = next.columns.splice(idx, 1);
  if (!removed) return doc;
  for (const cardId of removed.cardIds) {
    delete next.cards[cardId];
  }
  return next;
}

export function reorderColumns(
  doc: KanbanDocument,
  activeId: string,
  overId: string,
): KanbanDocument {
  if (activeId === overId) return doc;
  const next = cloneKanbanDocument(doc);
  const from = next.columns.findIndex((c) => c.id === activeId);
  const to = next.columns.findIndex((c) => c.id === overId);
  if (from < 0 || to < 0) return doc;
  const [moved] = next.columns.splice(from, 1);
  if (!moved) return doc;
  next.columns.splice(to, 0, moved);
  return next;
}

export type KanbanCardPartial = Partial<
  Pick<KanbanCard, 'title' | 'body' | 'linkPaths' | 'tags'>
>;

export function addCard(
  doc: KanbanDocument,
  columnId: string,
  partial?: KanbanCardPartial,
): KanbanDocument {
  const next = cloneKanbanDocument(doc);
  const col = next.columns.find((c) => c.id === columnId);
  if (!col) return doc;
  const card: KanbanCard = {
    id: newId('card'),
    title: typeof partial?.title === 'string' ? partial.title : '',
    body: typeof partial?.body === 'string' ? partial.body : '',
    linkPaths: normalizeLinkPaths(partial?.linkPaths),
    tags: normalizeTags(partial?.tags),
  };
  next.cards[card.id] = card;
  col.cardIds.push(card.id);
  return next;
}

export function updateCard(
  doc: KanbanDocument,
  cardId: string,
  patch: KanbanCardPartial,
): KanbanDocument {
  const next = cloneKanbanDocument(doc);
  const card = next.cards[cardId];
  if (!card) return doc;
  if (typeof patch.title === 'string') card.title = patch.title;
  if (typeof patch.body === 'string') card.body = patch.body;
  if ('linkPaths' in patch) card.linkPaths = normalizeLinkPaths(patch.linkPaths);
  if ('tags' in patch) card.tags = normalizeTags(patch.tags);
  return next;
}

export function removeCard(
  doc: KanbanDocument,
  cardId: string,
): KanbanDocument {
  const next = cloneKanbanDocument(doc);
  if (!next.cards[cardId]) return doc;
  delete next.cards[cardId];
  for (const col of next.columns) {
    col.cardIds = col.cardIds.filter((id) => id !== cardId);
  }
  return next;
}

/**
 * Move a card within or across columns.
 * `toIndex` is the insertion index in the target column's cardIds
 * (after removing the card from its source when same-column).
 */
export function moveCard(
  doc: KanbanDocument,
  cardId: string,
  toColumnId: string,
  toIndex: number,
): KanbanDocument {
  const next = cloneKanbanDocument(doc);
  if (!next.cards[cardId]) return doc;
  const target = next.columns.find((c) => c.id === toColumnId);
  if (!target) return doc;

  let fromColumn: KanbanColumn | undefined;
  for (const col of next.columns) {
    const i = col.cardIds.indexOf(cardId);
    if (i >= 0) {
      fromColumn = col;
      col.cardIds.splice(i, 1);
      break;
    }
  }

  let insertAt = Math.max(0, Math.min(toIndex, target.cardIds.length));
  // When moving within the same column, toIndex was computed against the
  // pre-removal list — adjust if we removed an earlier index.
  if (fromColumn && fromColumn.id === target.id) {
    // toIndex from dnd-kit usually already accounts for removal; clamp only.
    insertAt = Math.max(0, Math.min(toIndex, target.cardIds.length));
  }
  target.cardIds.splice(insertAt, 0, cardId);
  return next;
}

/** Find which column owns a card id. */
export function findColumnIdForCard(
  doc: KanbanDocument,
  cardId: string,
): string | null {
  for (const col of doc.columns) {
    if (col.cardIds.includes(cardId)) return col.id;
  }
  return null;
}

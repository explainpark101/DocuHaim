/**
 * Kanban board document (`.kanban.json`) parse / serialize / mutations.
 * Schema version 2 — swimlanes, cover/folder paths, hybrid cards
 * (title/body + vault linkPaths + tags).
 *
 * v1 boards migrate on read: one default lane; column.cardIds →
 * cardIdsByLane[lane_default]; cards get laneId + coverPath null.
 * Legacy singular `linkPath` still migrates to `linkPaths`.
 */

export const KANBAN_DOCUMENT_VERSION = 2 as const;
export const KANBAN_DEFAULT_LANE_ID = 'lane_default';
export const KANBAN_DEFAULT_LANE_TITLE = 'Default';

export type KanbanLane = {
  id: string;
  title: string;
};

export type KanbanColumn = {
  id: string;
  title: string;
  /** Native emoji glyph shown before the title; null = none. */
  icon: string | null;
  color: string | null;
  /** Column width in CSS pixels; null uses default (288). */
  width: number | null;
  /** Vault image path for column header cover; null = none. */
  coverPath: string | null;
  /** Vault folder for quick-add notes; null = unbound. */
  folderPath: string | null;
  /** Per-lane ordered card ids. */
  cardIdsByLane: Record<string, string[]>;
};

export type KanbanCard = {
  id: string;
  title: string;
  body: string;
  /** Vault POSIX paths opened from the card (ordered, unique). */
  linkPaths: string[];
  /** Free-form tags (ordered, unique case-insensitively). */
  tags: string[];
  /** Vault image path for card cover; null = none. */
  coverPath: string | null;
  /** Owning swimlane id. */
  laneId: string;
};

export type KanbanDocument = {
  version: typeof KANBAN_DOCUMENT_VERSION;
  settings: KanbanBoardSettings;
  lanes: KanbanLane[];
  columns: KanbanColumn[];
  cards: Record<string, KanbanCard>;
};

/** Per-board feature flags and capacity limits (stored in `.kanban.json`). */
export type KanbanBoardSettings = {
  swimlanesEnabled: boolean;
  columnIconsEnabled: boolean;
  coversEnabled: boolean;
  columnFoldersEnabled: boolean;
  columnColorsEnabled: boolean;
  tagsEnabled: boolean;
  linksEnabled: boolean;
  /** Max swimlane rows; null = unlimited. */
  maxLanes: number | null;
  /** Max columns; null = unlimited. */
  maxColumns: number | null;
  /** Max cards per column×lane cell; null = unlimited. */
  maxCardsPerCell: number | null;
};

/** Absolute caps when a numeric limit is set (guards against abuse). */
export const KANBAN_LIMIT_LANES_CAP = 50;
export const KANBAN_LIMIT_COLUMNS_CAP = 50;
export const KANBAN_LIMIT_CARDS_PER_CELL_CAP = 500;

export const DEFAULT_KANBAN_BOARD_SETTINGS: KanbanBoardSettings = {
  swimlanesEnabled: false,
  columnIconsEnabled: true,
  coversEnabled: true,
  columnFoldersEnabled: true,
  columnColorsEnabled: true,
  tagsEnabled: true,
  linksEnabled: true,
  maxLanes: null,
  maxColumns: null,
  maxCardsPerCell: null,
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
  coverPath: string | null;
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
  const hex = s.startsWith('#') ? s : `#${s}`;
  if (!/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3}([0-9a-fA-F]{2})?)?$/.test(hex)) {
    return null;
  }
  return hex.toLowerCase();
}

function normalizeIcon(value: unknown): string | null {
  if (value == null) return null;
  const s = String(value).trim();
  if (!s) return null;
  if (s.length > 32) return s.slice(0, 32);
  return s;
}

function normalizeOneLinkPath(value: unknown): string | null {
  if (value == null) return null;
  const s = String(value).trim().replace(/\\/g, '/');
  return s || null;
}

/** Vault path for covers / folders (empty → null). */
export function normalizeVaultPath(value: unknown): string | null {
  return normalizeOneLinkPath(value);
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

function normalizeIdList(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    const id = String(item || '').trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

/** Card ids for a column×lane cell (missing bucket → []). */
export function getLaneCardIds(
  column: KanbanColumn,
  laneId: string,
): string[] {
  return column.cardIdsByLane[laneId] ?? [];
}

/** Total cards in a column across all lanes. */
export function countColumnCards(column: KanbanColumn): number {
  let n = 0;
  for (const ids of Object.values(column.cardIdsByLane)) {
    n += ids.length;
  }
  return n;
}

/** Ensure every lane id has a cardIdsByLane bucket on the column. */
export function ensureColumnLaneBuckets(
  column: KanbanColumn,
  laneIds: string[],
): void {
  for (const laneId of laneIds) {
    if (!Array.isArray(column.cardIdsByLane[laneId])) {
      column.cardIdsByLane[laneId] = [];
    }
  }
}

function normalizeLimit(
  value: unknown,
  cap: number,
): number | null {
  if (value == null || value === '') return null;
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) return null;
  const rounded = Math.floor(n);
  if (rounded <= 0) return null;
  return Math.min(cap, rounded);
}

export function normalizeKanbanBoardSettings(
  raw: unknown,
): KanbanBoardSettings {
  const obj = asRecord(raw) || {};
  const bool = (key: keyof KanbanBoardSettings, fallback: boolean): boolean => {
    if (typeof obj[key] === 'boolean') return obj[key] as boolean;
    return fallback;
  };
  return {
    swimlanesEnabled: bool('swimlanesEnabled', false),
    columnIconsEnabled: bool('columnIconsEnabled', true),
    coversEnabled: bool('coversEnabled', true),
    columnFoldersEnabled: bool('columnFoldersEnabled', true),
    columnColorsEnabled: bool('columnColorsEnabled', true),
    tagsEnabled: bool('tagsEnabled', true),
    linksEnabled: bool('linksEnabled', true),
    maxLanes: normalizeLimit(obj.maxLanes, KANBAN_LIMIT_LANES_CAP),
    maxColumns: normalizeLimit(obj.maxColumns, KANBAN_LIMIT_COLUMNS_CAP),
    maxCardsPerCell: normalizeLimit(
      obj.maxCardsPerCell,
      KANBAN_LIMIT_CARDS_PER_CELL_CAP,
    ),
  };
}

export function canAddKanbanLane(doc: KanbanDocument): boolean {
  const max = doc.settings.maxLanes;
  if (max == null) return true;
  return doc.lanes.length < max;
}

export function canAddKanbanColumn(doc: KanbanDocument): boolean {
  const max = doc.settings.maxColumns;
  if (max == null) return true;
  return doc.columns.length < max;
}

export function canAddKanbanCard(
  doc: KanbanDocument,
  columnId: string,
  laneId: string,
): boolean {
  const max = doc.settings.maxCardsPerCell;
  if (max == null) return true;
  const col = doc.columns.find((c) => c.id === columnId);
  if (!col) return false;
  return getLaneCardIds(col, laneId).length < max;
}

function defaultLane(): KanbanLane {
  return { id: KANBAN_DEFAULT_LANE_ID, title: KANBAN_DEFAULT_LANE_TITLE };
}

function emptyCardIdsByLane(laneIds: string[]): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const id of laneIds) out[id] = [];
  return out;
}

export function cardDraftFromCard(card: KanbanCard): KanbanCardDraft {
  return {
    title: card.title,
    body: card.body,
    linkPaths: [...card.linkPaths],
    tags: [...card.tags],
    coverPath: card.coverPath,
  };
}

export function isKanbanCardDraftDirty(
  draft: KanbanCardDraft,
  card: KanbanCard,
): boolean {
  if (draft.title !== card.title) return true;
  if (draft.body !== card.body) return true;
  if (draft.coverPath !== card.coverPath) return true;
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

/** Card ids in board order (lanes × columns) that match the query. */
export function searchKanbanCards(
  doc: KanbanDocument,
  query: string,
): string[] {
  const q = String(query || '').trim();
  if (!q) return [];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const lane of doc.lanes) {
    for (const col of doc.columns) {
      for (const id of getLaneCardIds(col, lane.id)) {
        if (seen.has(id)) continue;
        const card = doc.cards[id];
        if (!card) continue;
        if (!matchKanbanCardQuery(card, q)) continue;
        seen.add(id);
        out.push(id);
      }
    }
  }
  return out;
}

export function collectKanbanLinkedPaths(doc: KanbanDocument): Set<string> {
  const out = new Set<string>();
  for (const card of Object.values(doc.cards)) {
    for (const p of card.linkPaths) {
      if (p) out.add(p);
    }
  }
  return out;
}

function normalizeLane(raw: unknown, index: number): KanbanLane | null {
  const obj = asRecord(raw);
  if (!obj) return null;
  const id =
    String(obj.id || '').trim() ||
    (index === 0 ? KANBAN_DEFAULT_LANE_ID : `lane_${index}`);
  const title =
    typeof obj.title === 'string' && obj.title.trim()
      ? obj.title
      : index === 0
        ? KANBAN_DEFAULT_LANE_TITLE
        : `Lane ${index + 1}`;
  return { id, title };
}

function normalizeCard(
  raw: unknown,
  fallbackId: string,
  fallbackLaneId: string,
): KanbanCard | null {
  const obj = asRecord(raw);
  if (!obj) return null;
  const id = String(obj.id || fallbackId).trim() || fallbackId;
  const laneId =
    String(obj.laneId || '').trim() || fallbackLaneId || KANBAN_DEFAULT_LANE_ID;
  return {
    id,
    title: typeof obj.title === 'string' ? obj.title : '',
    body: typeof obj.body === 'string' ? obj.body : '',
    linkPaths: normalizeLinkPaths(obj.linkPaths, obj.linkPath),
    tags: normalizeTags(obj.tags),
    coverPath: normalizeVaultPath(obj.coverPath),
    laneId,
  };
}

function normalizeColumn(
  raw: unknown,
  index: number,
  laneIds: string[],
  defaultLaneId: string,
): KanbanColumn | null {
  const obj = asRecord(raw);
  if (!obj) return null;
  const id =
    String(obj.id || '').trim() ||
    `col_${index}_${Date.now().toString(36)}`;

  const cardIdsByLane: Record<string, string[]> = emptyCardIdsByLane(laneIds);

  const byLaneRaw = asRecord(obj.cardIdsByLane);
  if (byLaneRaw) {
    for (const [laneKey, list] of Object.entries(byLaneRaw)) {
      const lid = String(laneKey || '').trim();
      if (!lid) continue;
      cardIdsByLane[lid] = normalizeIdList(list);
    }
  } else {
    // v1: flat cardIds → default lane
    cardIdsByLane[defaultLaneId] = normalizeIdList(obj.cardIds);
  }

  for (const lid of laneIds) {
    if (!Array.isArray(cardIdsByLane[lid])) cardIdsByLane[lid] = [];
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
    coverPath: normalizeVaultPath(obj.coverPath),
    folderPath: normalizeVaultPath(obj.folderPath),
    cardIdsByLane,
  };
}

/** Empty board with To Do / Doing / Done + one default lane. */
export function createEmptyKanbanDocument(): KanbanDocument {
  const lane = defaultLane();
  const columns: KanbanColumn[] = DEFAULT_COLUMN_TITLES.map((title, i) => ({
    id: `col_${['todo', 'doing', 'done'][i]}`,
    title,
    icon: null,
    color: null,
    width: null,
    coverPath: null,
    folderPath: null,
    cardIdsByLane: emptyCardIdsByLane([lane.id]),
  }));
  return {
    version: KANBAN_DOCUMENT_VERSION,
    settings: { ...DEFAULT_KANBAN_BOARD_SETTINGS },
    lanes: [lane],
    columns,
    cards: {},
  };
}

/**
 * Parse vault JSON text. On failure returns a safe empty board + error banner.
 * Always normalizes to version 2 (migrates v1).
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

  let lanes: KanbanLane[] = [];
  const laneIdsSeen = new Set<string>();
  const lanesRaw = Array.isArray(root.lanes) ? root.lanes : null;
  if (lanesRaw && lanesRaw.length > 0) {
    for (let i = 0; i < lanesRaw.length; i += 1) {
      const lane = normalizeLane(lanesRaw[i], i);
      if (!lane) continue;
      if (laneIdsSeen.has(lane.id)) {
        lane.id = `${lane.id}_${i}`;
      }
      laneIdsSeen.add(lane.id);
      lanes.push(lane);
    }
  }
  if (lanes.length === 0) {
    lanes = [defaultLane()];
    laneIdsSeen.add(lanes[0]!.id);
  }
  const laneIds = lanes.map((l) => l.id);
  const defaultLaneId = lanes[0]!.id;

  const columns: KanbanColumn[] = [];
  const columnIds = new Set<string>();
  for (let i = 0; i < columnsRaw.length; i += 1) {
    const col = normalizeColumn(columnsRaw[i], i, laneIds, defaultLaneId);
    if (!col) continue;
    if (columnIds.has(col.id)) {
      col.id = `${col.id}_${i}`;
    }
    columnIds.add(col.id);
    ensureColumnLaneBuckets(col, laneIds);
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
    const card = normalizeCard(value, key, defaultLaneId);
    if (!card) continue;
    if (!laneIdsSeen.has(card.laneId)) {
      card.laneId = defaultLaneId;
    }
    cards[card.id] = card;
  }

  // Drop unknown card ids; sync card.laneId from membership when possible.
  for (const col of columns) {
    for (const laneId of Object.keys(col.cardIdsByLane)) {
      const list = col.cardIdsByLane[laneId] ?? [];
      col.cardIdsByLane[laneId] = list.filter((id) => Boolean(cards[id]));
      for (const id of col.cardIdsByLane[laneId]!) {
        const card = cards[id];
        if (card) card.laneId = laneId;
      }
    }
    // Drop buckets for removed lanes
    for (const key of Object.keys(col.cardIdsByLane)) {
      if (!laneIdsSeen.has(key)) delete col.cardIdsByLane[key];
    }
    ensureColumnLaneBuckets(col, laneIds);
  }

  return {
    ok: true,
    document: {
      version: KANBAN_DOCUMENT_VERSION,
      settings: normalizeKanbanBoardSettings(root.settings),
      lanes,
      columns,
      cards,
    },
    error: null,
  };
}

/** Pretty-printed JSON for vault storage (`application/json`). */
export function serializeKanbanDocument(doc: KanbanDocument): string {
  const settings = normalizeKanbanBoardSettings(doc.settings);
  const payload = {
    version: KANBAN_DOCUMENT_VERSION,
    settings: {
      swimlanesEnabled: settings.swimlanesEnabled,
      columnIconsEnabled: settings.columnIconsEnabled,
      coversEnabled: settings.coversEnabled,
      columnFoldersEnabled: settings.columnFoldersEnabled,
      columnColorsEnabled: settings.columnColorsEnabled,
      tagsEnabled: settings.tagsEnabled,
      linksEnabled: settings.linksEnabled,
      maxLanes: settings.maxLanes,
      maxColumns: settings.maxColumns,
      maxCardsPerCell: settings.maxCardsPerCell,
    },
    lanes: doc.lanes.map((lane) => ({
      id: lane.id,
      title: lane.title,
    })),
    columns: doc.columns.map((col) => {
      const cardIdsByLane: Record<string, string[]> = {};
      for (const lane of doc.lanes) {
        cardIdsByLane[lane.id] = [...(col.cardIdsByLane[lane.id] ?? [])];
      }
      return {
        id: col.id,
        title: col.title,
        icon: col.icon,
        color: col.color,
        width: col.width,
        coverPath: col.coverPath,
        folderPath: col.folderPath,
        cardIdsByLane,
      };
    }),
    cards: Object.fromEntries(
      Object.entries(doc.cards).map(([id, card]) => [
        id,
        {
          id: card.id,
          title: card.title,
          body: card.body,
          linkPaths: [...card.linkPaths],
          tags: [...card.tags],
          coverPath: card.coverPath,
          laneId: card.laneId,
        },
      ]),
    ),
  };
  return `${JSON.stringify(payload, null, 2)}\n`;
}

export function cloneKanbanDocument(doc: KanbanDocument): KanbanDocument {
  return parseKanbanDocument(serializeKanbanDocument(doc)).document;
}

export function updateBoardSettings(
  doc: KanbanDocument,
  patch: Partial<KanbanBoardSettings>,
): KanbanDocument {
  const next = cloneKanbanDocument(doc);
  next.settings = normalizeKanbanBoardSettings({
    ...next.settings,
    ...patch,
  });
  return next;
}

// --- Pure mutations ---

export function addColumn(
  doc: KanbanDocument,
  title = 'New column',
  color: string | null = null,
): KanbanDocument {
  if (!canAddKanbanColumn(doc)) return doc;
  const next = cloneKanbanDocument(doc);
  const laneIds = next.lanes.map((l) => l.id);
  const col: KanbanColumn = {
    id: newId('col'),
    title: String(title || 'New column'),
    icon: null,
    color: normalizeColor(color),
    width: null,
    coverPath: null,
    folderPath: null,
    cardIdsByLane: emptyCardIdsByLane(laneIds),
  };
  next.columns.push(col);
  return next;
}

export function updateColumn(
  doc: KanbanDocument,
  columnId: string,
  patch: Partial<
    Pick<
      KanbanColumn,
      'title' | 'icon' | 'color' | 'width' | 'coverPath' | 'folderPath'
    >
  >,
): KanbanDocument {
  const next = cloneKanbanDocument(doc);
  const col = next.columns.find((c) => c.id === columnId);
  if (!col) return doc;
  if (typeof patch.title === 'string') col.title = patch.title;
  if ('icon' in patch) col.icon = normalizeIcon(patch.icon);
  if ('color' in patch) col.color = normalizeColor(patch.color);
  if ('width' in patch) col.width = normalizeColumnWidth(patch.width);
  if ('coverPath' in patch) col.coverPath = normalizeVaultPath(patch.coverPath);
  if ('folderPath' in patch) {
    col.folderPath = normalizeVaultPath(patch.folderPath);
  }
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
  for (const ids of Object.values(removed.cardIdsByLane)) {
    for (const cardId of ids) {
      delete next.cards[cardId];
    }
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

export function addLane(
  doc: KanbanDocument,
  title = 'New lane',
): KanbanDocument {
  if (!canAddKanbanLane(doc)) return doc;
  if (!doc.settings.swimlanesEnabled) return doc;
  const next = cloneKanbanDocument(doc);
  const lane: KanbanLane = {
    id: newId('lane'),
    title: String(title || 'New lane'),
  };
  next.lanes.push(lane);
  for (const col of next.columns) {
    col.cardIdsByLane[lane.id] = [];
  }
  return next;
}

export function updateLane(
  doc: KanbanDocument,
  laneId: string,
  patch: Partial<Pick<KanbanLane, 'title'>>,
): KanbanDocument {
  const next = cloneKanbanDocument(doc);
  const lane = next.lanes.find((l) => l.id === laneId);
  if (!lane) return doc;
  if (typeof patch.title === 'string') lane.title = patch.title;
  return next;
}

/**
 * Remove a lane. Refuses if it is the last lane.
 * Cards move into `fallbackLaneId` (or the first remaining lane).
 */
export function removeLane(
  doc: KanbanDocument,
  laneId: string,
  fallbackLaneId?: string,
): KanbanDocument {
  if (doc.lanes.length <= 1) return doc;
  const next = cloneKanbanDocument(doc);
  const idx = next.lanes.findIndex((l) => l.id === laneId);
  if (idx < 0) return doc;
  next.lanes.splice(idx, 1);
  const targetLaneId =
    (fallbackLaneId && next.lanes.some((l) => l.id === fallbackLaneId)
      ? fallbackLaneId
      : next.lanes[0]?.id) || KANBAN_DEFAULT_LANE_ID;

  for (const col of next.columns) {
    const moving = col.cardIdsByLane[laneId] ?? [];
    delete col.cardIdsByLane[laneId];
    const dest = col.cardIdsByLane[targetLaneId] ?? [];
    for (const cardId of moving) {
      if (!dest.includes(cardId)) dest.push(cardId);
      const card = next.cards[cardId];
      if (card) card.laneId = targetLaneId;
    }
    col.cardIdsByLane[targetLaneId] = dest;
    ensureColumnLaneBuckets(
      col,
      next.lanes.map((l) => l.id),
    );
  }
  return next;
}

export function reorderLanes(
  doc: KanbanDocument,
  activeId: string,
  overId: string,
): KanbanDocument {
  if (activeId === overId) return doc;
  const next = cloneKanbanDocument(doc);
  const from = next.lanes.findIndex((l) => l.id === activeId);
  const to = next.lanes.findIndex((l) => l.id === overId);
  if (from < 0 || to < 0) return doc;
  const [moved] = next.lanes.splice(from, 1);
  if (!moved) return doc;
  next.lanes.splice(to, 0, moved);
  return next;
}

export type KanbanCardPartial = Partial<
  Pick<KanbanCard, 'title' | 'body' | 'linkPaths' | 'tags' | 'coverPath' | 'laneId'>
>;

export function addCard(
  doc: KanbanDocument,
  columnId: string,
  partial?: KanbanCardPartial,
  laneId?: string,
): KanbanDocument {
  const next = cloneKanbanDocument(doc);
  const col = next.columns.find((c) => c.id === columnId);
  if (!col) return doc;
  const resolvedLane =
    (!next.settings.swimlanesEnabled
      ? next.lanes[0]?.id
      : null) ||
    (laneId && next.lanes.some((l) => l.id === laneId) ? laneId : null) ||
    (partial?.laneId && next.lanes.some((l) => l.id === partial.laneId)
      ? partial.laneId
      : null) ||
    next.lanes[0]?.id ||
    KANBAN_DEFAULT_LANE_ID;

  if (!canAddKanbanCard(next, columnId, resolvedLane)) return doc;

  const card: KanbanCard = {
    id: newId('card'),
    title: typeof partial?.title === 'string' ? partial.title : '',
    body: typeof partial?.body === 'string' ? partial.body : '',
    linkPaths: next.settings.linksEnabled
      ? normalizeLinkPaths(partial?.linkPaths)
      : [],
    tags: next.settings.tagsEnabled ? normalizeTags(partial?.tags) : [],
    coverPath: next.settings.coversEnabled
      ? normalizeVaultPath(partial?.coverPath)
      : null,
    laneId: resolvedLane,
  };
  next.cards[card.id] = card;
  ensureColumnLaneBuckets(
    col,
    next.lanes.map((l) => l.id),
  );
  const list = col.cardIdsByLane[resolvedLane] ?? [];
  list.push(card.id);
  col.cardIdsByLane[resolvedLane] = list;
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
  if ('coverPath' in patch) card.coverPath = normalizeVaultPath(patch.coverPath);
  // laneId changes should go through moveCard so column buckets stay in sync.
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
    for (const laneId of Object.keys(col.cardIdsByLane)) {
      col.cardIdsByLane[laneId] = (col.cardIdsByLane[laneId] ?? []).filter(
        (id) => id !== cardId,
      );
    }
  }
  return next;
}

/**
 * Move a card within or across columns/lanes.
 * `toIndex` is the insertion index in the target cell after source removal
 * when same cell; callers may pass pre-removal index and adjust.
 */
export function moveCard(
  doc: KanbanDocument,
  cardId: string,
  toColumnId: string,
  toIndex: number,
  toLaneId?: string,
): KanbanDocument {
  const next = cloneKanbanDocument(doc);
  const card = next.cards[cardId];
  if (!card) return doc;
  const target = next.columns.find((c) => c.id === toColumnId);
  if (!target) return doc;

  const destLaneId =
    (toLaneId && next.lanes.some((l) => l.id === toLaneId)
      ? toLaneId
      : null) ||
    card.laneId ||
    next.lanes[0]?.id ||
    KANBAN_DEFAULT_LANE_ID;

  let fromColumnId: string | null = null;
  let fromLaneId: string | null = null;
  for (const col of next.columns) {
    for (const [laneId, ids] of Object.entries(col.cardIdsByLane)) {
      const i = ids.indexOf(cardId);
      if (i >= 0) {
        fromColumnId = col.id;
        fromLaneId = laneId;
        ids.splice(i, 1);
        break;
      }
    }
    if (fromColumnId) break;
  }

  ensureColumnLaneBuckets(
    target,
    next.lanes.map((l) => l.id),
  );
  const destList = target.cardIdsByLane[destLaneId] ?? [];
  const sameCell =
    fromColumnId === target.id && fromLaneId === destLaneId;
  if (!sameCell) {
    const max = next.settings.maxCardsPerCell;
    if (max != null && destList.length >= max) {
      return doc;
    }
  }
  let insertAt = Math.max(0, Math.min(toIndex, destList.length));
  if (sameCell) {
    insertAt = Math.max(0, Math.min(toIndex, destList.length));
  }
  destList.splice(insertAt, 0, cardId);
  target.cardIdsByLane[destLaneId] = destList;
  card.laneId = destLaneId;
  return next;
}

/** Find which column owns a card id. */
export function findColumnIdForCard(
  doc: KanbanDocument,
  cardId: string,
): string | null {
  for (const col of doc.columns) {
    for (const ids of Object.values(col.cardIdsByLane)) {
      if (ids.includes(cardId)) return col.id;
    }
  }
  return null;
}

/** Find column + lane for a card. */
export function findCardPlacement(
  doc: KanbanDocument,
  cardId: string,
): { columnId: string; laneId: string } | null {
  for (const col of doc.columns) {
    for (const [laneId, ids] of Object.entries(col.cardIdsByLane)) {
      if (ids.includes(cardId)) return { columnId: col.id, laneId };
    }
  }
  return null;
}

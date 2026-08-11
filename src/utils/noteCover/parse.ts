import {
  NOTE_COVER_VERSION,
  DEFAULT_COVER_PAGE_SIZE_ID,
  createDefaultNoteCover,
  isCoverShapeType,
  type CoverAlign,
  type CoverBackground,
  type CoverBorderStyle,
  type CoverElement,
  type CoverGroup,
  type CoverImageElement,
  type CoverLayout,
  type CoverShapeElement,
  type CoverShapeType,
  type CoverTextAlign,
  type CoverTextElement,
  type CoverTextVAlign,
  type NoteCover,
  type NoteCoverWebfont,
} from '@/utils/noteCover/types';
import { ensureLayerTree } from '@/utils/noteCover/layerTree';
import { isPrintPageSizeId, type PrintPageSizeId } from '@/utils/printPageLayout';
import { syncNoteCoverWebfonts } from '@/utils/noteCover/webfonts';

const COVER_COMMENT_RE =
  /^[\uFEFF\s]*<!--\s*note-cover\s*([\s\S]*?)-->/;

/** Escape `--` so JSON never prematurely closes an HTML comment. */
export function escapeCoverJsonForComment(json: string): string {
  return String(json).replace(/--/g, '\\u002d\\u002d');
}

export function unescapeCoverJsonFromComment(raw: string): string {
  return String(raw).replace(/\\u002d\\u002d/g, '--');
}

function clampPct(n: unknown, fallback: number, min = 0, max = 100): number {
  const v = typeof n === 'number' ? n : Number(n);
  if (!Number.isFinite(v)) return fallback;
  return Math.min(max, Math.max(min, v));
}

function isAlign(v: unknown): v is CoverAlign {
  return v === 'left' || v === 'center' || v === 'right';
}

function isTextAlign(v: unknown): v is CoverTextAlign {
  return v === 'left' || v === 'center' || v === 'right';
}

function isTextVAlign(v: unknown): v is CoverTextVAlign {
  return v === 'top' || v === 'middle' || v === 'bottom';
}

function normalizePageSizeId(raw: unknown): PrintPageSizeId {
  return isPrintPageSizeId(raw) ? raw : DEFAULT_COVER_PAGE_SIZE_ID;
}

function normalizeLayout(raw: unknown): CoverLayout {
  const base = createDefaultNoteCover().layout;
  if (!raw || typeof raw !== 'object') return base;
  const o = raw as Record<string, unknown>;
  let gapPx = base.gapPx;
  if (typeof o.gapPx === 'number' && Number.isFinite(o.gapPx)) {
    gapPx = Math.min(400, Math.max(0, o.gapPx));
  } else if (typeof o.gapPct === 'number' && Number.isFinite(o.gapPct)) {
    // Legacy: gap was % of page height. Approximate with A4 height at 96dpi.
    const a4HeightPx = (297 * 96) / 25.4;
    gapPx = Math.min(400, Math.max(0, (o.gapPct / 100) * a4HeightPx));
  }
  return {
    align: isAlign(o.align) ? o.align : base.align,
    containerWidthPct: 100,
    gapPx,
  };
}

function normalizeBg(raw: unknown): CoverBackground {
  const base = createDefaultNoteCover().bg;
  if (!raw || typeof raw !== 'object') return base;
  const o = raw as Record<string, unknown>;
  const color = typeof o.color === 'string' && o.color.trim() ? o.color.trim() : base.color;
  const imagePath = typeof o.imagePath === 'string' ? o.imagePath.trim() : '';
  return { color, imagePath };
}

function applyElementMeta<T extends CoverElement>(
  el: T,
  o: Record<string, unknown>,
): T {
  const next = { ...el };
  if (typeof o.name === 'string' && o.name.trim()) next.name = o.name.trim();
  if (typeof o.groupId === 'string' && o.groupId.trim()) next.groupId = o.groupId.trim();
  if (o.locked === true) next.locked = true;
  return next;
}

function normalizeFontWeight(v: unknown): number | 'normal' | 'bold' {
  if (v === 'bold' || v === 'normal') return v;
  const n = typeof v === 'number' ? v : typeof v === 'string' ? Number(v) : NaN;
  if (Number.isFinite(n)) {
    return Math.min(900, Math.max(100, Math.round(n)));
  }
  return 'normal';
}

function normalizeTextElement(o: Record<string, unknown>, id: string): CoverTextElement | null {
  return applyElementMeta(
    {
      id,
      type: 'text',
      x: clampPct(o.x, 10),
      y: clampPct(o.y, 20),
      w: clampPct(o.w, 80, 1, 100),
      h: clampPct(o.h, 12, 1, 100),
      text: typeof o.text === 'string' ? o.text : '제목',
      fontSize: clampPct(o.fontSize, 36, 6, 400),
      textAlign: isTextAlign(o.textAlign) ? o.textAlign : 'center',
      color: typeof o.color === 'string' && o.color.trim() ? o.color.trim() : '#111111',
      fontWeight: normalizeFontWeight(o.fontWeight),
      ...(typeof o.fontFamily === 'string' && o.fontFamily.trim()
        ? { fontFamily: o.fontFamily.trim() }
        : {}),
    },
    o,
  );
}

function normalizeImageElement(o: Record<string, unknown>, id: string): CoverImageElement | null {
  const path = typeof o.path === 'string' ? o.path.trim() : '';
  if (!path) return null;
  const naturalAspect =
    typeof o.naturalAspect === 'number' && Number.isFinite(o.naturalAspect) && o.naturalAspect > 0
      ? o.naturalAspect
      : undefined;
  return applyElementMeta(
    {
      id,
      type: 'image',
      path,
      x: clampPct(o.x, 20),
      y: clampPct(o.y, 40),
      w: clampPct(o.w, 50, 1, 100),
      h: clampPct(o.h, 35, 1, 100),
      ...(o.lockAspect === true ? { lockAspect: true } : {}),
      ...(naturalAspect != null ? { naturalAspect } : {}),
    },
    o,
  );
}

function isBorderStyle(v: unknown): v is CoverBorderStyle {
  return v === 'solid' || v === 'dashed' || v === 'dotted';
}

function normalizeShapeElement(
  o: Record<string, unknown>,
  id: string,
  type: CoverShapeType,
): CoverShapeElement {
  const text = typeof o.text === 'string' ? o.text : undefined;
  const fontFamily =
    typeof o.fontFamily === 'string' && o.fontFamily.trim()
      ? o.fontFamily.trim()
      : undefined;
  const el: CoverShapeElement = {
    id,
    type,
    x: clampPct(o.x, 10),
    y: clampPct(o.y, 20),
    w: clampPct(o.w, 80, 1, 100),
    h: clampPct(o.h, 30, 1, 100),
    fill: typeof o.fill === 'string' && o.fill.trim() ? o.fill.trim() : '#e0f2fe',
    borderColor:
      typeof o.borderColor === 'string' && o.borderColor.trim()
        ? o.borderColor.trim()
        : '#0284c7',
    borderWidth: clampPct(o.borderWidth, 2, 0, 40),
    borderStyle: isBorderStyle(o.borderStyle) ? o.borderStyle : 'solid',
  };
  if (type === 'roundRect') {
    el.cornerRadiusPct = clampPct(o.cornerRadiusPct, 4, 0, 50);
  }
  if (text != null) el.text = text;
  if (isTextAlign(o.textAlign)) el.textAlign = o.textAlign;
  if (isTextVAlign(o.textVAlign)) el.textVAlign = o.textVAlign;
  if (o.fontSize != null) el.fontSize = clampPct(o.fontSize, 24, 6, 400);
  if (typeof o.color === 'string' && o.color.trim()) el.color = o.color.trim();
  if (o.fontWeight != null) el.fontWeight = normalizeFontWeight(o.fontWeight);
  if (fontFamily) el.fontFamily = fontFamily;
  if (o.paddingPct != null) el.paddingPct = clampPct(o.paddingPct, 2, 0, 40);
  return applyElementMeta(el, o);
}

function normalizeElement(raw: unknown, index: number): {
  element: CoverElement | null;
  issue: NoteCoverIssue | null;
} {
  if (!raw || typeof raw !== 'object') {
    return {
      element: null,
      issue: {
        kind: 'invalid_element',
        index,
        detail: '개체가 객체가 아닙니다.',
      },
    };
  }
  const o = raw as Record<string, unknown>;
  const id =
    typeof o.id === 'string' && o.id.trim()
      ? o.id.trim()
      : `cover-el-${index}`;
  if (o.type === 'text') {
    return { element: normalizeTextElement(o, id), issue: null };
  }
  if (o.type === 'image') {
    const el = normalizeImageElement(o, id);
    if (el) return { element: el, issue: null };
    return {
      element: null,
      issue: {
        kind: 'invalid_element',
        index,
        detail: '이미지 경로(path)가 없거나 올바르지 않습니다.',
      },
    };
  }
  if (isCoverShapeType(o.type)) {
    return { element: normalizeShapeElement(o, id, o.type), issue: null };
  }
  const typeLabel =
    o.type === undefined || o.type === null ? '(없음)' : String(o.type);
  return {
    element: null,
    issue: {
      kind: 'unknown_element',
      index,
      detail: `알 수 없는 개체 유형: ${typeLabel}`,
    },
  };
}

function normalizeGroups(raw: unknown, elements: CoverElement[]): CoverGroup[] {
  const used = new Set(
    elements.map((el) => el.groupId).filter(Boolean) as string[],
  );
  const out: CoverGroup[] = [];
  const seen = new Set<string>();
  if (Array.isArray(raw)) {
    for (const item of raw) {
      if (!item || typeof item !== 'object') continue;
      const o = item as Record<string, unknown>;
      const id = typeof o.id === 'string' ? o.id.trim() : '';
      if (!id || seen.has(id)) continue;
      seen.add(id);
      const name =
        typeof o.name === 'string' && o.name.trim() ? o.name.trim() : '그룹';
      const parentGroupId =
        typeof o.parentGroupId === 'string' && o.parentGroupId.trim()
          ? o.parentGroupId.trim()
          : undefined;
      const childIds = Array.isArray(o.childIds)
        ? o.childIds.filter((x): x is string => typeof x === 'string' && Boolean(x.trim()))
        : [];
      const group: CoverGroup = { id, name, childIds };
      if (parentGroupId && parentGroupId !== id) group.parentGroupId = parentGroupId;
      if (o.locked === true) group.locked = true;
      out.push(group);
      used.add(id);
    }
  }
  // Ensure orphan groupIds still have a folder entry.
  let orphanIndex = 1;
  for (const gid of used) {
    if (seen.has(gid)) continue;
    // only element-referenced orphans
    if (!elements.some((el) => el.groupId === gid)) continue;
    out.push({ id: gid, name: `그룹 ${orphanIndex}`, childIds: [] });
    orphanIndex += 1;
  }
  return out;
}

function normalizeRootLayerIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((x): x is string => typeof x === 'string' && Boolean(x.trim()));
}

function normalizeWebfonts(raw: unknown): NoteCoverWebfont[] {
  if (!Array.isArray(raw)) return [];
  const out: NoteCoverWebfont[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const o = item as Record<string, unknown>;
    const family = typeof o.family === 'string' ? o.family.trim() : '';
    const css = typeof o.css === 'string' ? o.css.trim() : '';
    if (!family || !css) continue;
    const key = family.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const entry: NoteCoverWebfont = { family, css };
    if (o.source === 'builtin' || o.source === 'user') entry.source = o.source;
    out.push(entry);
  }
  return out;
}

export type NoteCoverIssueKind =
  | 'json_parse'
  | 'not_object'
  | 'unknown_element'
  | 'invalid_element';

export type NoteCoverIssue = {
  kind: NoteCoverIssueKind;
  /** Human-readable detail. */
  detail: string;
  /** Element index when relevant. */
  index?: number;
};

export type NormalizeNoteCoverResult = {
  cover: NoteCover;
  issues: NoteCoverIssue[];
};

export function normalizeNoteCoverWithIssues(raw: unknown): NormalizeNoteCoverResult {
  const defaults = createDefaultNoteCover();
  const issues: NoteCoverIssue[] = [];
  if (!raw || typeof raw !== 'object') {
    issues.push({
      kind: 'not_object',
      detail: '표지 JSON 루트가 객체가 아닙니다.',
    });
    return { cover: defaults, issues };
  }
  const o = raw as Record<string, unknown>;
  const elementsRaw = Array.isArray(o.elements) ? o.elements : [];
  const elements: CoverElement[] = [];
  for (let i = 0; i < elementsRaw.length; i += 1) {
    const { element, issue } = normalizeElement(elementsRaw[i], i);
    if (issue) issues.push(issue);
    if (element) elements.push(element);
  }
  const groups = normalizeGroups(o.groups, elements);
  const rootLayerIds = normalizeRootLayerIds(o.rootLayerIds);
  const webfonts = normalizeWebfonts(o.webfonts);
  const base: NoteCover = {
    v: NOTE_COVER_VERSION,
    enabled: o.enabled !== false,
    pageSizeId: normalizePageSizeId(o.pageSizeId),
    layout: normalizeLayout(o.layout),
    bg: normalizeBg(o.bg),
    rootLayerIds,
    groups,
    elements,
    ...(webfonts.length ? { webfonts } : {}),
  };
  return { cover: ensureLayerTree(base), issues };
}

export function normalizeNoteCover(raw: unknown): NoteCover {
  return normalizeNoteCoverWithIssues(raw).cover;
}

export type ParseNoteCoverResult = {
  cover: NoteCover | null;
  body: string;
  match: RegExpMatchArray | null;
  /** Problems found while reading the note-cover comment (empty if none / no comment). */
  issues: NoteCoverIssue[];
};

export function formatNoteCoverIssues(issues: ReadonlyArray<NoteCoverIssue>): string {
  if (!issues.length) return '';
  return issues
    .map((issue, i) => {
      const where =
        typeof issue.index === 'number' ? ` (elements[${issue.index}])` : '';
      return `${i + 1}. ${issue.detail}${where}`;
    })
    .join('\n');
}

/** Raw leading `<!-- note-cover ... -->` comment, or null. */
export function getNoteCoverCommentRaw(markdown: string): string | null {
  const text = String(markdown ?? '');
  const match = text.match(COVER_COMMENT_RE);
  return match ? match[0] : null;
}

/** Character range of the leading note-cover comment in `markdown`. */
export function findNoteCoverCommentRange(
  markdown: string,
): { from: number; to: number } | null {
  const text = String(markdown ?? '');
  const match = text.match(COVER_COMMENT_RE);
  if (!match || match.index == null) return null;
  return { from: match.index, to: match.index + match[0].length };
}

export function noteCoverCommentChanged(a: string, b: string): boolean {
  return getNoteCoverCommentRaw(a) !== getNoteCoverCommentRaw(b);
}

/**
 * Replace editor cover comment with the saved document's cover (body edits kept).
 * If saved had no cover, removes the editor cover comment.
 */
export function revertNoteCoverComment(
  editorMarkdown: string,
  savedMarkdown: string,
): string {
  const editor = parseNoteCover(editorMarkdown);
  const savedRaw = getNoteCoverCommentRaw(savedMarkdown);
  if (!savedRaw) return editor.body;
  const saved = parseNoteCover(savedMarkdown);
  if (saved.cover) {
    return upsertNoteCoverComment(editor.body, saved.cover);
  }
  // Preserve broken/unknown saved comment bytes as-is.
  if (!editor.body) return `${savedRaw}\n`;
  return `${savedRaw}\n${editor.body.replace(/^\uFEFF/, '')}`;
}

export function parseNoteCover(markdown: string): ParseNoteCoverResult {
  const text = String(markdown ?? '');
  const match = text.match(COVER_COMMENT_RE);
  if (!match) {
    return { cover: null, body: text, match: null, issues: [] };
  }
  // Always strip the comment from body, even when JSON is broken.
  const body = text.slice(match[0].length).replace(/^\r?\n/, '');
  const rawJson = unescapeCoverJsonFromComment(String(match[1] ?? '').trim());
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch (err) {
    const detail =
      err instanceof Error && err.message
        ? `표지 JSON을 파싱할 수 없습니다: ${err.message}`
        : '표지 JSON을 파싱할 수 없습니다.';
    return {
      cover: null,
      body,
      match,
      issues: [{ kind: 'json_parse', detail }],
    };
  }
  const { cover, issues } = normalizeNoteCoverWithIssues(parsed);
  return { cover, body, match, issues };
}

export function stripNoteCoverComment(markdown: string): string {
  return parseNoteCover(markdown).body;
}

export function serializeNoteCoverComment(cover: NoteCover): string {
  // Refresh portable webfont CSS from current element families before write.
  const normalized = syncNoteCoverWebfonts(normalizeNoteCover(cover));
  const json = JSON.stringify(normalized);
  return `<!-- note-cover\n${escapeCoverJsonForComment(json)}\n-->`;
}

/**
 * Insert or replace the leading note-cover comment.
 * When cover is null, removes any existing cover comment.
 */
export function upsertNoteCoverComment(
  markdown: string,
  cover: NoteCover | null,
): string {
  const { body } = parseNoteCover(markdown);
  if (!cover) return body;
  const comment = serializeNoteCoverComment(cover);
  if (!body) return `${comment}\n`;
  return `${comment}\n${body.replace(/^\uFEFF/, '')}`;
}

/**
 * Ensure leading note-cover JSON includes up-to-date `webfonts` for download / export.
 * No-op when the document has no cover comment.
 */
export function ensureNoteCoverWebfontsInMarkdown(markdown: string): string {
  const { cover } = parseNoteCover(markdown);
  if (!cover) return markdown;
  return upsertNoteCoverComment(markdown, syncNoteCoverWebfonts(cover));
}

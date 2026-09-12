import type { NoteCover } from '@/utils/noteCover/types';
import { serializeNoteCoverComment } from '@/utils/noteCover/parse';
import {
  DEFAULT_PRINT_CHROME_DOC,
  DEFAULT_PRINT_CHROME_PAGE_NUMBER_FORMAT,
  PRINT_CHROME_FONT_SIZE_MAX,
  PRINT_CHROME_FONT_SIZE_MIN,
  PRINT_CHROME_IMAGE_SIZE_MAX,
  PRINT_CHROME_IMAGE_SIZE_MIN,
  PRINT_CHROME_POSITIONS,
  clampPrintChromePlacement,
  createPrintChromeId,
  type PrintChromeDoc,
  type PrintChromeImageTemplate,
  type PrintChromeNumbering,
  type PrintChromePageNumberTemplate,
  type PrintChromePlacement,
  type PrintChromePosition,
  type PrintChromeTemplate,
  type PrintChromeTemplateBase,
  type PrintChromeTextTemplate,
} from '@/utils/printChrome/types';

const PRINT_CHROME_COMMENT_RE = /<!--\s*print-chrome\s*([\s\S]*?)-->/i;

const POSITION_SET = new Set<string>(PRINT_CHROME_POSITIONS);

/** Escape `--` so JSON never prematurely closes an HTML comment. */
export function escapePrintChromeJsonForComment(json: string): string {
  return String(json).replace(/--/g, '\\u002d\\u002d');
}

export function unescapePrintChromeJsonFromComment(raw: string): string {
  return String(raw).replace(/\\u002d\\u002d/g, '--');
}

function clampInt(n: unknown, fallback: number, min: number, max: number): number {
  const v = typeof n === 'number' ? n : Number(n);
  if (!Number.isFinite(v)) return fallback;
  return Math.min(max, Math.max(min, Math.round(v)));
}

function isPosition(v: unknown): v is PrintChromePosition {
  return typeof v === 'string' && POSITION_SET.has(v);
}

function isNumbering(v: unknown): v is PrintChromeNumbering {
  return v === 'document' || v === 'body';
}

function normalizePagePlacements(
  raw: unknown,
): Record<string, PrintChromePlacement> | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const out: Record<string, PrintChromePlacement> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    const k = String(key || '').trim();
    if (!k) continue;
    const place = clampPrintChromePlacement(value);
    if (place) out[k] = place;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function normalizePlacementFields(
  o: Record<string, unknown>,
): Pick<PrintChromeTemplateBase, 'placement' | 'pagePlacements'> {
  const placement = clampPrintChromePlacement(o.placement);
  const pagePlacements = normalizePagePlacements(o.pagePlacements);
  return {
    ...(placement ? { placement } : {}),
    ...(pagePlacements ? { pagePlacements } : {}),
  };
}

function normalizePageNumber(
  o: Record<string, unknown>,
  id: string,
): PrintChromePageNumberTemplate {
  return {
    id,
    type: 'page-number',
    enabled: o.enabled !== false,
    position: isPosition(o.position) ? o.position : 'bottom-center',
    fontFamily: typeof o.fontFamily === 'string' ? o.fontFamily.trim() : '',
    fontSizePx: clampInt(
      o.fontSizePx,
      10,
      PRINT_CHROME_FONT_SIZE_MIN,
      PRINT_CHROME_FONT_SIZE_MAX,
    ),
    format:
      typeof o.format === 'string' && o.format.trim()
        ? o.format
        : DEFAULT_PRINT_CHROME_PAGE_NUMBER_FORMAT,
    ...normalizePlacementFields(o),
  };
}

function normalizeText(o: Record<string, unknown>, id: string): PrintChromeTextTemplate {
  return {
    id,
    type: 'text',
    enabled: o.enabled !== false,
    position: isPosition(o.position) ? o.position : 'top-center',
    fontFamily: typeof o.fontFamily === 'string' ? o.fontFamily.trim() : '',
    fontSizePx: clampInt(
      o.fontSizePx,
      10,
      PRINT_CHROME_FONT_SIZE_MIN,
      PRINT_CHROME_FONT_SIZE_MAX,
    ),
    text: typeof o.text === 'string' ? o.text : '',
    ...normalizePlacementFields(o),
  };
}

function normalizeImage(o: Record<string, unknown>, id: string): PrintChromeImageTemplate {
  return {
    id,
    type: 'image',
    enabled: o.enabled !== false,
    position: isPosition(o.position) ? o.position : 'top-right',
    path: typeof o.path === 'string' ? o.path.trim() : '',
    widthPx: clampInt(
      o.widthPx,
      48,
      PRINT_CHROME_IMAGE_SIZE_MIN,
      PRINT_CHROME_IMAGE_SIZE_MAX,
    ),
    heightPx: clampInt(
      o.heightPx,
      48,
      PRINT_CHROME_IMAGE_SIZE_MIN,
      PRINT_CHROME_IMAGE_SIZE_MAX,
    ),
    ...normalizePlacementFields(o),
  };
}

function normalizeTemplate(raw: unknown): PrintChromeTemplate | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const id =
    typeof o.id === 'string' && o.id.trim() ? o.id.trim() : createPrintChromeId();
  if (o.type === 'page-number') return normalizePageNumber(o, id);
  if (o.type === 'text') return normalizeText(o, id);
  if (o.type === 'image') return normalizeImage(o, id);
  return null;
}

export function normalizePrintChromeDoc(parsed: unknown): PrintChromeDoc {
  const obj = parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
  const templatesRaw = Array.isArray(obj.templates) ? obj.templates : [];
  const templates: PrintChromeTemplate[] = [];
  for (const item of templatesRaw) {
    const t = normalizeTemplate(item);
    if (t) templates.push(t);
  }
  return {
    v: 1,
    showOnCover: obj.showOnCover === true,
    numbering: isNumbering(obj.numbering) ? obj.numbering : 'body',
    templates,
  };
}

/**
 * True when `before` is only BOM, whitespace, and/or known leading meta comments
 * (note-cover / print-chrome / footnotes / document-settings).
 */
export function isPrintChromeLeadingMetaRegion(before: string): boolean {
  const rest = String(before || '')
    .replace(/^\uFEFF/, '')
    .replace(/<!--\s*note-cover\b[\s\S]*?-->/gi, '')
    .replace(/<!--\s*print-chrome\b[\s\S]*?-->/gi, '')
    .replace(/<!--\s*footnotes\b[\s\S]*?-->/gi, '')
    .replace(/<!--\s*document-settings\b[\s\S]*?-->/gi, '')
    .trim();
  return rest === '';
}

export type ParsePrintChromeResult = {
  chrome: PrintChromeDoc | null;
  /** Markdown with the print-chrome comment removed. */
  body: string;
  range: { start: number; end: number } | null;
};

/**
 * Find `<!-- print-chrome … -->` in the leading metadata region.
 */
export function parsePrintChrome(markdown: string): ParsePrintChromeResult {
  const src = String(markdown ?? '');
  const match = PRINT_CHROME_COMMENT_RE.exec(src);
  if (!match || match.index === undefined) {
    return { chrome: null, body: src, range: null };
  }

  const before = src.slice(0, match.index);
  if (!isPrintChromeLeadingMetaRegion(before)) {
    return { chrome: null, body: src, range: null };
  }

  let chrome: PrintChromeDoc | null = null;
  try {
    const json = unescapePrintChromeJsonFromComment(match[1] ?? '').trim();
    chrome = normalizePrintChromeDoc(JSON.parse(json || '{}'));
  } catch {
    chrome = { ...DEFAULT_PRINT_CHROME_DOC, templates: [] };
  }

  const start = match.index;
  const end = start + match[0].length;
  let body = `${src.slice(0, start)}${src.slice(end)}`;
  body = body.replace(/^\uFEFF?[\t ]*\n/, '');
  return { chrome, body, range: { start, end } };
}

export function stripPrintChromeComment(markdown: string): string {
  return parsePrintChrome(markdown).body;
}

export function serializePrintChromeComment(chrome: PrintChromeDoc): string {
  const normalized = normalizePrintChromeDoc(chrome);
  const json = JSON.stringify(normalized);
  return `<!-- print-chrome\n${escapePrintChromeJsonForComment(json)}\n-->`;
}

/**
 * Insert/replace leading print-chrome comment (after optional note-cover).
 * When chrome is null or has no templates and default flags, removes the comment.
 */
export function upsertPrintChromeComment(
  markdown: string,
  chrome: PrintChromeDoc | null,
): string {
  const src = String(markdown ?? '');
  const { body } = parsePrintChrome(src);

  if (!chrome || !shouldPersistPrintChrome(chrome)) {
    return body;
  }

  const comment = serializePrintChromeComment(chrome);
  const coverMatch = /^[\uFEFF\s]*<!--\s*note-cover\b[\s\S]*?-->/.exec(body);
  if (coverMatch) {
    const head = coverMatch[0];
    const rest = body.slice(head.length).replace(/^\n*/, '\n');
    return `${head}\n${comment}${rest}`;
  }

  const stripped = body.replace(/^\uFEFF/, '').replace(/^\n+/, '');
  return `${comment}\n${stripped}`;
}

export function shouldPersistPrintChrome(chrome: PrintChromeDoc): boolean {
  const n = normalizePrintChromeDoc(chrome);
  if (n.templates.length > 0) return true;
  if (n.showOnCover) return true;
  if (n.numbering !== 'body') return true;
  return false;
}

/**
 * Rebuild leading note-cover + print-chrome, then body (may still contain
 * footnotes / document-settings / markdown).
 */
export function rebuildLeadingMeta(
  cover: NoteCover | null,
  chrome: PrintChromeDoc | null,
  bodyWithoutCoverAndChrome: string,
): string {
  const rest = String(bodyWithoutCoverAndChrome ?? '')
    .replace(/^\uFEFF/, '')
    .replace(/^\n+/, '');
  const parts: string[] = [];
  if (cover) parts.push(serializeNoteCoverComment(cover));
  if (chrome && shouldPersistPrintChrome(chrome)) {
    parts.push(serializePrintChromeComment(chrome));
  }
  if (parts.length === 0) return rest;
  if (!rest) return `${parts.join('\n')}\n`;
  return `${parts.join('\n')}\n${rest}`;
}

/** Format page-number template tokens. */
export function formatPrintChromePageLabel(
  format: string,
  page: number,
  total: number,
): string {
  return String(format || DEFAULT_PRINT_CHROME_PAGE_NUMBER_FORMAT)
    .replace(/\{page\}/g, String(page))
    .replace(/\{total\}/g, String(total));
}

/** Resolve display page index for a body page (0-based bodyIndex). */
export function resolvePrintChromePageNumber(opts: {
  numbering: PrintChromeNumbering;
  bodyIndex: number;
  bodyPageCount: number;
  hasCover: boolean;
  /** When true, this call is for the cover surface. */
  isCover?: boolean;
}): { page: number; total: number; showPageNumber: boolean } {
  const hasCover = Boolean(opts.hasCover);
  const coverCount = hasCover ? 1 : 0;
  const total = coverCount + Math.max(0, opts.bodyPageCount);

  if (opts.isCover) {
    if (opts.numbering === 'document' && hasCover) {
      return { page: 1, total, showPageNumber: true };
    }
    return { page: 0, total, showPageNumber: false };
  }

  if (opts.numbering === 'document' && hasCover) {
    return {
      page: opts.bodyIndex + 2,
      total,
      showPageNumber: true,
    };
  }
  return {
    page: opts.bodyIndex + 1,
    total: opts.numbering === 'document' ? total : Math.max(0, opts.bodyPageCount),
    showPageNumber: true,
  };
}

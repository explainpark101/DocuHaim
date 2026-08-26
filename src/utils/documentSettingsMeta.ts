import { DEFAULT_PRINT_FONTS } from '@/utils/print/printSettingsStore';

export type DocumentFontSettings = {
  body: string;
  heading: string;
  bold: string;
  code: string;
};

export type DocumentSettingsMeta = {
  v: 1;
  sourceList: {
    show: boolean;
    title: string;
  };
  fonts: DocumentFontSettings;
  webfontCss: string;
};

export const DEFAULT_SOURCE_LIST_TITLE = 'Sources';

export const DEFAULT_DOCUMENT_SETTINGS_META: DocumentSettingsMeta = {
  v: 1,
  sourceList: {
    show: true,
    title: DEFAULT_SOURCE_LIST_TITLE,
  },
  fonts: { ...DEFAULT_PRINT_FONTS },
  webfontCss: '',
};

const DOCUMENT_SETTINGS_COMMENT_RE = /<!--\s*document-settings\s*([\s\S]*?)-->/i;

function escapeJsonForComment(json: string): string {
  return String(json || '').replace(/--/g, '\\u002d\\u002d');
}

function unescapeJsonFromComment(raw: string): string {
  return String(raw || '').replace(/\\u002d\\u002d/g, '--');
}

function normalizeFonts(value: unknown): DocumentFontSettings {
  const obj = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  return {
    body: typeof obj.body === 'string' ? obj.body : DEFAULT_PRINT_FONTS.body,
    heading: typeof obj.heading === 'string' ? obj.heading : DEFAULT_PRINT_FONTS.heading,
    bold: typeof obj.bold === 'string' ? obj.bold : DEFAULT_PRINT_FONTS.bold,
    code: typeof obj.code === 'string' ? obj.code : DEFAULT_PRINT_FONTS.code,
  };
}

function normalizeMeta(parsed: unknown): DocumentSettingsMeta {
  const obj = parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
  const sourceList =
    obj.sourceList && typeof obj.sourceList === 'object'
      ? (obj.sourceList as Record<string, unknown>)
      : {};
  const title =
    typeof sourceList.title === 'string' && sourceList.title.trim()
      ? sourceList.title.trim()
      : DEFAULT_SOURCE_LIST_TITLE;

  return {
    v: 1,
    sourceList: {
      show: sourceList.show === false ? false : true,
      title,
    },
    fonts: normalizeFonts(obj.fonts),
    webfontCss: typeof obj.webfontCss === 'string' ? obj.webfontCss : '',
  };
}

export type ParseDocumentSettingsMetaResult = {
  meta: DocumentSettingsMeta | null;
  body: string;
  range: { start: number; end: number } | null;
};

export function parseDocumentSettingsMeta(markdown: string): ParseDocumentSettingsMetaResult {
  const src = String(markdown ?? '');
  const match = DOCUMENT_SETTINGS_COMMENT_RE.exec(src);
  if (!match || match.index === undefined) {
    return { meta: null, body: src, range: null };
  }

  const before = src.slice(0, match.index);
  if (!isLeadingMetaRegion(before)) {
    return { meta: null, body: src, range: null };
  }

  let meta: DocumentSettingsMeta | null = null;
  try {
    const json = unescapeJsonFromComment(match[1] ?? '').trim();
    meta = normalizeMeta(JSON.parse(json || '{}'));
  } catch {
    meta = { ...DEFAULT_DOCUMENT_SETTINGS_META, fonts: { ...DEFAULT_PRINT_FONTS } };
  }

  const start = match.index;
  const end = start + match[0].length;
  let body = `${src.slice(0, start)}${src.slice(end)}`;
  body = body.replace(/^\uFEFF?[\t ]*\n/, '');
  return { meta, body, range: { start, end } };
}

function isLeadingMetaRegion(before: string): boolean {
  const rest = String(before || '')
    .replace(/^\uFEFF/, '')
    .replace(/<!--\s*note-cover\b[\s\S]*?-->/i, '')
    .replace(/<!--\s*footnotes\b[\s\S]*?-->/i, '')
    .trim();
  return rest === '';
}

export function serializeDocumentSettingsComment(meta: DocumentSettingsMeta): string {
  const normalized = normalizeMeta(meta);
  const json = JSON.stringify(normalized);
  return `<!-- document-settings\n${escapeJsonForComment(json)}\n-->`;
}

export function upsertDocumentSettingsMeta(
  markdown: string,
  meta: DocumentSettingsMeta | null,
): string {
  const src = String(markdown ?? '');
  const { body } = parseDocumentSettingsMeta(src);

  if (!meta) return body;

  const comment = serializeDocumentSettingsComment(meta);
  const leadingMetaRe = /^[\uFEFF\s]*(?:<!--\s*note-cover\b[\s\S]*?-->\s*)?(?:<!--\s*footnotes\b[\s\S]*?-->\s*)?/i;
  const match = leadingMetaRe.exec(body);
  const insertAt = match?.[0]?.length ?? 0;
  const head = body.slice(0, insertAt).replace(/\s*$/, '');
  const rest = body.slice(insertAt).replace(/^\n*/, '\n');

  if (head) return `${head}\n${comment}${rest}`;
  const stripped = body.replace(/^\uFEFF/, '').replace(/^\n+/, '');
  return `${comment}\n${stripped}`;
}

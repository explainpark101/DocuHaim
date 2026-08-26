import { SELF_GROUP } from '@/utils/chatWithMyself/paths';

const VERSION_START = /<!--\s*chat-edit-version\s+([^>]*?)-->\s*/;

function parseAttrs(attrStr: string) {
  const attrs: Record<string, string> = {};
  const re = /([\w-]+)="([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(attrStr))) {
    attrs[m[1]!] = m[2]!;
  }
  return attrs;
}

function escapeAttr(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/\r\n/g, '\n')
    .replace(/\n/g, '&#10;')
    .replace(/\r/g, '');
}

function unescapeAttr(value: unknown) {
  return String(value ?? '')
    .replace(/&#10;/g, '\n')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
}

export type ChatEditVersion = {
  at: string;
  body: string;
  group: string;
  key?: string;
};

/**
 * Serialize one previous message version to markdown.
 */
export function serializeEditVersion(entry: {
  at?: string;
  body?: string;
  group?: string;
}): string {
  const at = escapeAttr(entry?.at || new Date().toISOString());
  const group = escapeAttr(entry?.group || SELF_GROUP);
  const body = String(entry?.body ?? '').replace(/\n+$/, '');
  return `<!-- chat-edit-version at="${at}" group="${group}" -->\n${body}\n`;
}

/**
 * Parse a version markdown file.
 */
export function parseEditVersion(
  raw: string,
  meta: { key?: string } = {},
): ChatEditVersion | null {
  const text = String(raw ?? '');
  if (!text.trim()) return null;
  const match = text.match(VERSION_START);
  if (!match) {
    return {
      at: '',
      group: SELF_GROUP,
      body: text.replace(/\n+$/, ''),
      ...(meta.key ? { key: meta.key } : {}),
    };
  }
  const attrs = parseAttrs(match[1] || '');
  const body = text
    .slice((match.index ?? 0) + match[0].length)
    .replace(/^\n/, '')
    .replace(/\n+$/, '');
  return {
    at: attrs.at || '',
    group: unescapeAttr(attrs.group || SELF_GROUP),
    body,
    ...(meta.key ? { key: meta.key } : {}),
  };
}

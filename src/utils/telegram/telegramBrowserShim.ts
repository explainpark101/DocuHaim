export type TelegramNodeStub = 'empty' | 'os' | 'path';

const EMPTY_FILES = [
  '/node_modules/telegram/extensions/net',
  '/node_modules/telegram/extensions/socks',
  '/node_modules/telegram/client/fs',
];

function clean(id: string): string {
  return id.split('?')[0]?.replace(/\\/g, '/') ?? '';
}

function kindFromPath(file: string): TelegramNodeStub | null {
  const base = file.replace(/\.js$/, '');
  if (EMPTY_FILES.some((suffix) => base.endsWith(suffix))) return 'empty';
  if (base.endsWith('/node_modules/telegram/client/os')) return 'os';
  if (base.endsWith('/node_modules/telegram/client/path')) return 'path';
  return null;
}

function joinRelative(importer: string, source: string): string {
  const dir = clean(importer).replace(/\/[^/]*$/, '');
  const parts = `${dir}/${source}`.split('/');
  const stack: string[] = [];
  for (const part of parts) {
    if (!part || part === '.') continue;
    if (part === '..') {
      stack.pop();
      continue;
    }
    stack.push(part);
  }
  const prefix = clean(importer).startsWith('/') ? '/' : '';
  return `${prefix}${stack.join('/')}`;
}

/** Which gramjs Node wrapper to replace before it loads `net`, `fs`, `os`, or `path`. */
export function classifyTelegramNodeStub(source: string, importer?: string): TelegramNodeStub | null {
  const direct = kindFromPath(clean(source));
  if (direct) return direct;
  if (!source.startsWith('.') || !importer) return null;
  if (!clean(importer).includes('/node_modules/telegram/')) return null;
  return kindFromPath(joinRelative(importer, source));
}

export type TelegramNodeStub = 'empty' | 'os' | 'path';

/**
 * Vite's commonjs plugin only transforms ids matching /node_modules/.
 * Virtual modules (\0…) are served as ESM, so `module.exports` throws
 * `module is not defined` in the browser.
 */
export const TELEGRAM_EMPTY_BROWSER_STUB = 'export {};\n';

export const TELEGRAM_OS_BROWSER_STUB = `function type() {
  return "Tauri";
}
function release() {
  return "1.0";
}
const os = { type, release };
export { type, release };
export default os;
`;

/**
 * gramjs class fields evaluate `inspect.custom` while the module loads.
 * Node `util.inspect` is missing in the browser, so replace `telegram/inspect.js`
 * with this CommonJS stub. Keep it CJS: the file stays under node_modules and
 * Vite's commonjs plugin turns `exports` into ESM.
 */
export const TELEGRAM_INSPECT_BROWSER_STUB = `"use strict";
var custom = Symbol.for("nodejs.util.inspect.custom");
function inspect(value) {
  if (value == null) return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return Object.prototype.toString.call(value);
  }
}
inspect.custom = custom;
exports.inspect = inspect;
`;

/**
 * Rollup's commonjs plugin loads a virtual ".../inspect.js?commonjs-exports" module and exports
 * `__exports` from it. That id still ends with `inspect.js` once the query is
 * stripped, so a path-only check would replace the helper and break the build.
 */
export function isTelegramRollupHelperId(id: string): boolean {
  return id.startsWith('\0') || id.includes('?commonjs-');
}

export function isTelegramInspectModule(id: string): boolean {
  if (isTelegramRollupHelperId(id)) return false;
  const clean = id.split('?')[0]?.replace(/\\/g, '/') ?? '';
  return clean.endsWith('/node_modules/telegram/inspect.js');
}

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

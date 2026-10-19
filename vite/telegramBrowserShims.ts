import path from 'node:path';
import type { Plugin } from 'vite';
import { rewriteTelegramBufferGlobals } from '../src/utils/telegram/rewriteTelegramBufferGlobals';
import { classifyTelegramNodeStub } from '../src/utils/telegram/telegramBrowserShim';

const EMPTY_STUB_ID = '\0telegram-browser-empty';
const OS_STUB_ID = '\0telegram-browser-os';

const EMPTY_STUB = 'module.exports = {};\n';
const OS_STUB = `module.exports = {
  type() { return "Tauri"; },
  release() { return "1.0"; },
};
`;

function isTelegramJs(id: string): boolean {
  const clean = id.split('?')[0]?.replace(/\\/g, '/') ?? '';
  return clean.includes('/node_modules/telegram/') && clean.endsWith('.js');
}

function isTelegramImporter(importer: string | undefined): boolean {
  return (importer ?? '').replace(/\\/g, '/').includes('/node_modules/telegram/');
}

/** Browser shims for gramjs: npm `buffer`, WebCrypto `crypto`, and Node-only wrappers. */
export function telegramBrowserShimsPlugin(rootDir: string): Plugin {
  const bufferEntry = path.resolve(rootDir, 'node_modules/buffer/index.js');
  const cryptoEntry = path.resolve(rootDir, 'node_modules/telegram/crypto/crypto.js');
  const pathEntry = path.resolve(rootDir, 'node_modules/path-browserify/index.js');
  return {
    name: 'telegram-browser-shims',
    enforce: 'pre',
    resolveId(source, importer) {
      if (source === 'buffer' || source === 'node:buffer') return bufferEntry;
      if ((source === 'crypto' || source === 'node:crypto') && isTelegramImporter(importer)) {
        return cryptoEntry;
      }
      const stub = classifyTelegramNodeStub(source, importer);
      if (stub === 'empty') return EMPTY_STUB_ID;
      if (stub === 'os') return OS_STUB_ID;
      if (stub === 'path') return pathEntry;
      return null;
    },
    load(id) {
      if (id === EMPTY_STUB_ID) return EMPTY_STUB;
      if (id === OS_STUB_ID) return OS_STUB;
      return null;
    },
    transform(code, id) {
      if (!isTelegramJs(id)) return null;
      const next = rewriteTelegramBufferGlobals(code);
      if (next == null) return null;
      return { code: next, map: null };
    },
  };
}
